/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块 - 左边部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-collapse {
    border-bottom: none !important
}
>>>.el-collapse-item__wrap {
    overflow visible !important
}
>>>.el-collapse-item {
    margin: 10px 0;
    &.is-active {
        box-shadow: 1px 1px 10px 1px #e8dede
    }
    // .el-collapse-item__wrap {
    //     background-color: #e8dede;
    //     padding: 10px;
    // }
}
>>>.el-button {
    padding 10px 2px !important
}
>>>.el-collapse-item__header {
    position: relative;
    padding-left: 10px;
    display flex;
    justify-content flex-start 
    align-items center
    &:before {
        position: absolute;
        content: '';
        width: 4px;
        height: 15px;
        left: 0px;
        background-color: red
    }
}
.leftCmp {
    width: 100%;
    .topContent {
        // border-bottom: 1px solid silver;
        min-height 80vh
        .item {
            width 40%
            height 40px
            margin 5px 5%;
            box-sizing: border-box;
            .badgeItem {
                width: 100%;
                .itemBtn {
                    position: relative;
                    width: 100%
                    text-align left                    
                    background rgba(249, 237, 222, 1)
                    &.click {
                        color: #409EFF
                        background: #ffffff                        
                    }
                }
            }
            .itemBtn {
                position: relative;
                width: 100%
                text-align: left
                &.click {
                    color: #409EFF
                    background: #ffffff
                }
            }            
        }
    }    
}
</style>
<template>
    <div class="leftCmp">
        <div class="topContent" v-loading="loading">
            <!-- objP: {{objP}} -->
            <el-collapse 
                :accordion="true"
                v-model="activeIndex"
            >      
                <el-collapse-item 
                    v-for="(cmpItem, index) in cmps"
                    :key="index"
                    :name="index"
                    class="collapseItem"
                >
                    <span slot="title">
                        {{cmpItem.controlName}}
                        <i class="header-icon el-icon-info"></i>
                    </span>

                    <div class="setCmpContentBox">
                        <vuedraggable 
                            class="wrapper u-f-jst u-f-wrap" 
                            data-flag="leftFlag"
                            v-model="cmpItem.childrenList"  
                            v-bind="dragOptions"
                            :group="{
                                name:'control',
                                pull:'clone',
                                put:false
                            }" 
                            :clone="cloneFuc"
                            @change="change"
                            @start="start"
                            @end="end"                
                            :move='allow'
                        >
                            <!-- <transition-group> -->
                                <li
                                    v-for="(controlItem, index) in cmpItem.childrenList"
                                    :key="controlItem.controlType"
                                    class="item u-f-s1"
                                    draggable="true"
                                    :class="controlItem.controlType"    
                                    :data-itemData="JSON.stringify(controlItem)"  
                                    @dragstart="dragstart($event, controlItem, index)"
                                    @dragend="dragend($event, controlItem, index)"                                          
                                >
                                    <el-badge 
                                        v-if="controlItem.flagNum"
                                        :value="controlItem.flagNum" 
                                        class="badgeItem"
                                    >
                                        <el-button 
                                            size="mini"
                                            @click.native="selectTag(controlItem, index)"
                                            :class="['itemBtn', 'ellipsis1', currentClickObjIndex === index ? 'click': ''] " 
                                        >
                                            {{controlItem.controlType}} - {{controlItem.controlName}} - {{controlItem.controlEnName}}
                                        </el-button>
                                    </el-badge>


                                    <el-button 
                                        v-else
                                        size="mini"
                                        @click.native="selectTag(controlItem, index)"
                                        :class="['itemBtn', 'ellipsis1', currentClickObjIndex === index ? 'click': ''] " 
                                    >
                                        {{controlItem.controlType}} - {{controlItem.controlName}} - {{controlItem.controlEnName}}
                                    </el-button>                            
                                </li>                    
                            <!-- </transition-group> -->
                        </vuedraggable>       
                    
                    </div>

                    <!-- <div class="setCmpContentBox">
                        <ul class="u-f-jst u-f-wrap">
                            <li
                                v-for="(controlItem, index) in cmpItem.childrenList"
                                :key="index"
                                class="item u-f-s1"
                                draggable="true"
                                :class="controlItem.controlType"
                                @dragstart="dragstart($event, controlItem, index)"
                                @dragend="dragend($event, controlItem, index)"             
                            >
                                <el-badge 
                                    v-if="controlItem.flagNum"
                                    :value="controlItem.flagNum" 
                                    class="badgeItem"
                                >
                                    <el-button 
                                        size="mini"
                                        @click.native="selectTag(controlItem, index)"
                                        :class="['itemBtn', 'ellipsis1', currentClickObjIndex === index ? 'click': ''] " 
                                    >
                                        {{controlItem.controlType}} - {{controlItem.controlName}} - {{controlItem.controlEnName}}
                                    </el-button>
                                </el-badge>


                                <el-button 
                                    v-else
                                    size="mini"
                                    @click.native="selectTag(controlItem, index)"
                                    :class="['itemBtn', 'ellipsis1', currentClickObjIndex === index ? 'click': ''] " 
                                >
                                    {{controlItem.controlType}} - {{controlItem.controlName}} - {{controlItem.controlEnName}}
                                </el-button>                            
                            </li>
                        </ul>
                    </div> -->
                </el-collapse-item>                        
            </el-collapse> 
        </div>        
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { 
        getControlInfo
    } from '@/api/systemManage'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'  
    import Vuedraggable from 'vuedraggable'    
    let that = null
    export default {
        props: {    
            objP: {
                type: Object,
                default: () => {
                    return {}
                }
            }     
        },
        components: {
            Vuedraggable
        },
        data(){
            return {
                loading: false,
                cmps: [],
                currentClickObjIndex: '',
                activeIndex: 0,
            }
        },
        computed: {
            dragOptions() {
                return {
                animation: 500,
                // group: "description",
                disabled: false,
                // ghostClass: "ghost"
                }
            }            
        },
        watch: {

        },
        created(){
            that = this      
            this.initData()  
            this.$nextTick(() => {
                debugger
                this.$bus.$on("changeBadageNum", (obj, flag) => {
                    debugger
                    let result = that.cmps.filter(item => {
                        return item.unicode === obj.pcode
                    })

                    let resArr = result[0].childrenList.filter((item, key) => {
                        return item.controlType === obj.controlType
                    })
                    that.changeBadageNum(resArr[0], flag)
                })
            })    
        },
        beforeDestroy(){
            this.offEvent()
        },
        methods: {
            offEvent(){
                this.$bus.$off("changeBadageNum")
            },
            initData(){
                this.getControlInfo()
            },                     
            cloneFuc(controlItem){
                // 处理 拖拽的元素
                // this.currentObj = controlItem
                // this.changeBadageNum(controlItem, true)              
                // return controlItem                 
            },
            //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
            change: function (evt) {
                console.log(evt)
            },
            //start ,end ,add,update, sort, remove 得到的都差不多
            start: function (evt) {
                console.log("--start---",evt)
            },
            end(evt) {
                // debugger
                console.log("----------------000---------------",evt)
                // evt.item //可以知道拖动的本身
                // evt.to    // 可以知道拖动的目标列表
                // evt.from  // 可以知道之前的列表
                // evt.oldIndex  // 可以知道拖动前的位置
                // evt.newIndex  // 可以知道拖动后的位置
                

            },            
            allow(evt, originalEvent){
                // debugger
                console.log(originalEvent) //鼠标位置
                console.log(evt.draggedContext.index)
                console.log(evt.draggedContext.element)
                console.log(evt.draggedContext.futureIndex)
                console.log(evt.relatedContext.index)
                console.log(evt.relatedContext.element)
                console.log(evt.relatedContext.list)
                console.log(evt.relatedContext.component)
                // 假如是左边自己的拖拽 就禁止
                if(evt.relatedContext.component && evt.relatedContext.component.$el.dataset.flag === 'leftFlag'){
                    return false
                }else {
                    return true
                }
            },            
            getControlInfo(){
                this.loading = true
                let params = {
                    commonCode: this.objP.relateb,
                    type: 1
                }
                getControlInfo(params).then(res => {
                    this.loading = false
                    this.cmps = res.data.Data.records
                })
            },    
            changeBadageNum(item, flag = true){
                if(flag){
                    // 加
                    item.flagNum = item.flagNum? ++item.flagNum: 1
                }else {
                    item.flagNum = item.flagNum? --item.flagNum: 0
                }
            },        
            selectTag(item, index){
                debugger
                this.$bus.$emit("leftClickItem", item, this.changeBadageNum)
                // this.changeBadageNum(item, true)
            },
            dragstart(event, sourceItem, index){
                // debugger
                let e = event || window.event
                console.log(e)
                console.log('开始拖拽');
                e.dataTransfer.setData('currentItemStr',JSON.stringify(sourceItem))
            },
            dragend(event, sourceId, index){
                // let e = event || window.event
                // e.preventDefault()
                // console.log("拖拽结束",e)      
                // this.currentClickObjIndex = index   
                // this.changeBadageNum(sourceId, true)       
                // debugger
            },            
        }
    }
</script>
