/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块 - 中间部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
.middleCmp {
    width: 100%;
    height: 100%;
    overflow auto;
    font-size: 14px;
    .containerBox {
        height: 100%;
        &.droping {
            border: 1px dotted red 
        }
    }
    .cmp-item {
        padding: 10px;
        box-sizing: border-box;
        background-color: #ffffff;
        &:hover {
            // cursor: pointer;
            background-color: #f5f5f5            
        }
        &.is-active {
            background-color: #f5f5f5;
            border-top: 1px dotted #000000;                      
            border-bottom: 1px dotted #000000;                      
        }
        .item-titwrap {
            .iconwrap {
                .el-icon-document-copy, .el-icon-delete {
                    &:hover {
                        cursor pointer
                    }
                }
                .el-icon-document-copy {
                    margin-right: 10px
                }
            }
        }
    }
}
</style>
<template>
    <div class="middleCmp">
        <div
            @dragover="overDrag($event)"
            @dragenter="enterDrag($event)"   
            @dragleave="leaveDrag($event)" 
            @drop="dropDrag($event)"        
            class="containerBox"    
            data-containerBox="middleCmpContainerBox"         
        >
            <!-- 配置板块——中间 -->    
            <!-- {{contentCmpsList}}  -->
            <el-form>
                <vuedraggable 
                    class="wrapper" 
                    v-model="contentCmpsList"  
                    v-bind="dragOptions"
                    :group="{
                        name:'control',
                        pull:'clone',
                        put:true
                    }"
                    sort:true
                    :clone="cloneFuc"
                    @change="change"
                    @start="start"
                    @end="end"  
                    @add="dragedAdd"  
                    @update="drageUpdate"                              
                    :move='checkMove'
                >
                    <transition-group>
                        <div  
                            v-for="(obj, index) in contentCmpsList" 
                            :key="index+1" 
                            class="inputItemBox"
                        >
                            <!-- <el-button type="primary" size="mini">{{obj.controlName}}</el-button> -->
                            <div 
                                :class="['cmp-item', index == currentClickItemObjIndex ? 'is-active': '']" 
                                @click="clickCmpItem(obj, index)"
                            >
                                <div class="item-titwrap u-f-jsb">
                                    <span class="tit">{{obj.controlName}}</span>
                                    <span class="iconwrap">
                                        <!-- <i 
                                            class="el-icon-document-copy"
                                            @click.stop="handlerClickCopy(obj, index)"
                                        ></i> -->
                                        <i 
                                            class="el-icon-delete"
                                            @click.stop="handlerClickDelete(obj, index)"
                                        ></i>
                                    </span>
                                </div>
                                <component 
                                    :is="currentFieldComponentMixin(obj.controlType)"
                                    :obj.sync="obj"
                                    :isTitle="false"
                                    :isNeedGetDataSource="false"
                                    :disableFlag="true"
                                >
                                </component>
                            </div>
                        </div>
                    </transition-group>              
                </vuedraggable>    
            </el-form>        
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { 
        REQ_OK
    } from '@/api/config'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'
    import {
        getMiddleSetData
    } from '@/api/systemManage.js'
    import Vuedraggable from 'vuedraggable'
    import { fieldControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    export default {
        mixins: [ fieldControlTypeMixin ],
        props:{
            objP: {
                type: Object,
                default: () => {
                    return {}
                }
            }             
        },
        components: {
            Vuedraggable,
        },
        data(){
            return {
                loading: false,
                contentCmpsList: [],
                currentClickItemObjIndex: '',
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
            currentClickItemObjIndex: {
                handler(newValue, oldValue){
                    debugger
                    let obj = this.contentCmpsList[newValue]
                    this.$bus.$emit("middleClickEmit", obj, newValue)
                },
                immediate: true
            },
            'contentCmpsList.length': {
                handler(newValue, oldValue){
                    this.$bus.$emit("rightDataArr", this.contentCmpsList)
                }
            }
        },
        created(){
            this.$nextTick(() => {
                this.$bus.$on("leftClickItem", (obj, callback) => {
                    this.contentCmpsList.push(obj)
                    this.currentClickItemObjIndex = (this.contentCmpsList.length)-1
                    if(callback){
                        callback(obj,true)
                    }
                })
            })
            this.getMiddleSetData()
        },
        beforeDestroy(){
            this.$bus.$off("leftClickItem")
        },
        mounted () {

        },
        methods: {
            getMiddleSetData(){
                this.loading = true
                let obj = {
                    commonCode: this.objP.relateb,
                    type: 1                    
                }
                // 获取中间部分的回显数据
                getMiddleSetData(obj).then(res => {
                    this.loading = false
                    this.contentCmpsList = res.data.Data
                    if(this.contentCmpsList.length){
                        this.currentClickItemObjIndex = 0                
                    }
                })
            },
            // 拖起来的元素进入到目标区域中时触发事件
            enterDrag(event, sourceId) {
                // debugger
                let e = event || window.event
                e.preventDefault()
                console.log("middleSection拖拽进入到目标元素",e)   
                // e.dataTransfer.dropEffect = "copy" // 允许拖放复制    
                document.getElementsByClassName('containerBox')[0].className += ' droping'                      
            },  
            // 拖动元素在目标区域中移动时触发事件
            overDrag(event){
                // debugger
                let e = event || window.event
                e.preventDefault()
                console.log("middleSection中拖拽进行中", e)
            }, 
            // 当拖动元素离开目标区域时触发事件
            leaveDrag(event, sourceId){
                // debugger
                let e = event || window.event
                console.log("middleSection拖拽离开目标元素",e)                
                // debugger
            },                
            // 拖拽释放时                    
            dropDrag(event){
                debugger
                let e = event || window.event
                e.preventDefault();
                console.log("middleSection中拖拽释放时", e)
                let data = JSON.parse(e.dataTransfer.getData("currentItemStr"));
                // this.$emit("middleDraggedEmit", this.contentCmpsList, JSON.parse(data))         
                // this.$emit("DraggedFromLeft", this.contentCmpsList)
                let str = e.currentTarget.dataset.containerbox
                if(str === 'middleCmpContainerBox'){
                    // 释放时 是在 middle 中
                    this.contentCmpsList.push(data)
                    this.$bus.$emit("changeBadageNum", data, true)
                    this.currentClickItemObjIndex = (this.contentCmpsList.length)-1
                }
                document.getElementsByClassName('containerBox')[0].classList.remove("droping")
            }, 
            cloneFuc(obj){
                // debugger
                console.log("-----------cloneFuc----")
            },                 
            clickCmpItem(obj, index){
                debugger
                this.currentClickItemObjIndex = index
            },
            // 点击 复制的图标
            handlerClickCopy(obj, index){
                debugger
                // this.$emit("middleCopyEmit", obj, index)
            },
            // 点击 删除的图标
            handlerClickDelete(obj, index){
                this.$confirm("确定要删除吗？","提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    this.contentCmpsList.splice(index,1)
                    this.$bus.$emit("changeBadageNum", obj, false)
                }).catch(err => {
                    // this.$message.info("删除已取消")
                })
            },            
            //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
            change: function (evt) {
                debugger
                console.log("vuedragable拖拽完成后打印", evt)
            },
            dragedAdd(evt){
                debugger
                // var itemEl = evt.item; // dragged HTMLElement
                // evt.to; // target list
                // evt.from; // previous list
                // evt.oldIndex; // tag's old index within old parent
                // evt.newIndex; // tag's new index within new parent
                // evt.clone; // the clone tag
                // evt.pullMode; // when item is in another sortable: `"clone"` if cloning, `true` if moving
                // console.log("移出子列表下标" + evt.oldIndex);
                // console.log("拖入子列表下标" + evt.newIndex);
                // this.evtoldIndex = evt.oldIndex;
                // this.evtnewIndex = evt.newIndex;
                console.log("0000000000000000000000",JSON.parse(evt.item.dataset.itemdata))
            },  
            drageUpdate(evt){
                // 排序后的更新操作
                debugger
                console.log("updated", evt)
                let evtoldIndex = evt.oldIndex;
                let evtnewIndex = evt.newIndex;
                this.currentClickItemObjIndex = evtnewIndex
                // console.log("updated", this.contentCmpsList)
                this.$bus.$emit("sortRightDataArr", this.contentCmpsList, evtnewIndex)

            },                       
            //start ,end ,add,update, sort, remove 得到的都差不多
            start: function (evt) {
                console.log("@@@@@@@@@@@",evt)
            },
            end(evt) {
                debugger
                console.log("----------------000---------------",evt)
                // evt.item //可以知道拖动的本身
                // evt.to    // 可以知道拖动的目标列表
                // evt.from  // 可以知道之前的列表
                // evt.oldIndex  // 可以知道拖动前的位置
                // evt.newIndex  // 可以知道拖动后的位置
                console.log("拖动结束后打印contentCmpsList", this.contentCmpsList)
                let oldIndex = evt.oldIndex, newIndex = evt.newIndex
                // this.$emit("middleDraggedEmitVueDraged", oldIndex, newIndex)
            },                       
            checkMove(evt, originalEvent){
                debugger
                console.log("---排序后contentCmpsList---", this.contentCmpsList)
                console.log(originalEvent) //鼠标位置
                console.log(evt.draggedContext.index)
                console.log(evt.draggedContext.element)
                console.log(evt.draggedContext.futureIndex)
                console.log(evt.relatedContext.index)
                console.log(evt.relatedContext.element)
                console.log(evt.relatedContext.list)
                console.log(evt.relatedContext.component)
                // 排序后
                // console.log("---排序后打印 evt.draggedContext.futureIndex---", evt.draggedContext.futureIndex)
                // this.currentClickItemObjIndex = evt.draggedContext.futureIndex
            }            
        }
    }
</script>
