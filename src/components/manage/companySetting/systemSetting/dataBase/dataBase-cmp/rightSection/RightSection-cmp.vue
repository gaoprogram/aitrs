/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块 - 右边部分
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
.rightCmp {
    width: 100%;
    min-height 80vh
    .header {
       padding: 10px 
       border-bottom: 1px dotted silver 
    }
    .controlListWrap {
        // border-bottom: 1px solid red;
        margin-top: 10px;
    }

}
</style>
<template>
    <div class="rightCmp" v-loading="loading">
        <!-- contentCmpsList: {{contentCmpsList}} -->
        <!-- currentMiddleSelectObj: {{currentMiddleSelectObj}} -->
        <!-- <el-form 
            v-for="(cmp, key) in contentCmpsList"
            :key="key"
            :model="cmp"
        >
            <h3 class="header">
                <i class="header-icon el-icon-info"></i>                
                {{cmp.controlName}}
            </h3>
            <div class="setCmpContentBox">
                <component 
                    v-for="(obj, key) in cmp.allTeamControl"
                    :key="key"                
                    :is="currentFieldComponentMixin(obj.controltype)"
                    :obj.sync="obj"
                    :isNeedGetDataSource="true"
                    :disableFlag="false"
                ></component>
            </div>            
        </el-form> -->
        <!-- currentRightIndex: {{currentRightIndex}} -->
        <div
            v-for="(cmp, key) in contentCmpsList"
            :key="key"
            class="controlListWrap"
            v-show="key === currentRightIndex"
        >
            <h1>{{cmp.controlName}}</h1>
            <field-group-cmp
                :groupObj="cmp.rightAttributes"
            ></field-group-cmp>
        </div>
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { 
        getControlAttributes,
        saveControlAttributes
    } from '@/api/systemManage'
    import FieldGroupCmp from '@/base/NewStyle-cmp/common-cmp/FieldGroup-cmp/FieldGroup-cmp'
    import { fieldControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    let that = null
    export default {
        mixins: [ fieldControlTypeMixin ],
        props: {
            cmpsList: {
                type: Array,
                default: () => {
                    return []
                }
            },            
            showAllSetItem: {
                type: Boolean,
                default: () => {
                    return true
                }
            },
            objP: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            // setCmpShowF,
            // setCmpUpText,
            // setCmpUpBtn,
            // setCmpContent,
            // setCmpDownBtn,
            // setCmpDownText,
            // setCmpLink,
            // setCmpTail
            FieldGroupCmp
        },
        data(){
            return {
                loading: false,
                contentCmpsList: [],
                currentRightIndex: 0,
                currentControlIsSystem: false, // 左边拖过来的是自定义的, 添加的系统控件是 true
            }
        },
        computed: {
          
        },
        watch: {

        },
        created(){
            that = this
            this.$nextTick(() => {
                this.$bus.$on("rightDataArr", (arr) => {
                    this.contentCmpsList = arr
                })
                this.$bus.$on("middleClickEmit", (obj, index) => {
                    this.currentRightIndex = index
                    if(obj.isSystemAdd == 1){
                        // 系统字段
                        this.currentControlIsSystem = true
                    }else {
                        // 左边拖过来的控件(自定义字段)
                        this.currentControlIsSystem = false
                    }                    
                    // 获取当前点击控件的属性
                    this.getCurrentObjAttributes(obj)
                })
                this.$bus.$on("sortRightDataArr", (arr, index) => {
                    debugger
                    this.currentRightIndex = index
                    this.contentCmpsList = arr
                    if(arr[this.currentRightIndex].isSystemAdd == 1) {
                        // 系统字段
                        this.currentControlIsSystem = true                        
                    }else {
                        // 左边拖过来的控件(自定义字段)
                        this.currentControlIsSystem = false                        
                    }
                    this.getCurrentObjAttributes(arr[this.currentRightIndex])
                })
            })
        },
        beforeDestroy(){
            this.offEventBus()
        },
        methods: {
            offEventBus(){
                this.$bus.$off("rightDataArr")
                this.$bus.$off("middleClickEmit")
                this.$bus.$off("sortRightDataArr")
            },
            async getCurrentObjAttributes(obj){
                if(obj.rightAttributes){
                    if(Object.keys(obj.rightAttributes).length){

                    }else {
                        return await this.getControlAttributes(obj)
                    }
                }else {
                    this.addObjRightAttribute(obj)
                    return await this.getControlAttributes(obj)
                }                
            },
            // 添加 属性
            addObjRightAttribute(obj){
                debugger
                this.$set(obj, 'rightAttributes', {})
            },  
            async getControlAttributes (obj) {
                this.loading = true
                debugger
                let parmasObj = {
                    controlType: obj.controlType,
                    commonCode: this.objP.relateb,
                    type: 1,
                    sysControlUnicode: this.currentControlIsSystem ? obj.unicode: ''   // 添加的系统控件 需要传这个，左侧直接添加的控件此字段不需要传为空就好
                }                 
                return await getControlAttributes(parmasObj).then(res => {
                    this.loading = false
                    debugger
                    obj.rightAttributes = {
                        sysControlUnicode: obj.isSystemAdd == 1? obj.unicode : '',
                        unicode: obj.unicode,
                        controlName: obj.controlName,
                        controlType: obj.controlType,
                        pcode: obj.pcode,
                        groupAttributeArr: res.data.Data                        
                    } 
                    return obj
                    // this.$bus.$emit("rightLoading",false)
                }).catch(err => {
                    // this.$bus.$emit("rightLoading",false)
                })
            },             
            async changeData(arr){
                if(arr && arr.length){
                    for(let i =0,length=arr.length;i<length;i++){
                        let item = arr[i]
                        if(!item.rightAttributes) {
                           await this.getControlAttributes(item)                 
                        }else {
                            
                        } 
                    }
                }
                return arr
            },
            getFinalParamsData(arr){
                let list = []
                debugger
                arr.forEach((item, key) => {
                    let itemSysUnicode = item.sysControlUnicode
                    let itemGroupAttributeArr = item.rightAttributes.groupAttributeArr
                    if(itemGroupAttributeArr.length){
                        let controlValueListArr = []
                        itemGroupAttributeArr.forEach((value, index) => {
                            let itemTeamControlList = value.teamControlList
                            if(itemTeamControlList.length) {
                                itemTeamControlList.forEach((groupItem, groupItemKey) => {
                                    controlValueListArr.push({
                                        unicode: groupItem.unicode,
                                        convalue: groupItem.convalue
                                    })
                                })
                            }                               
                        })
                        list.push({
                            controlType: item.controlType,
                            sysControlUnicode: item.isSystemAdd == 1? item.unicode : '',
                            sortId: key,
                            controlValueList: controlValueListArr
                        }) 
                    } 
                })
                console.log("-------*******---------", list)
                return list               
            },
            async saveControlAttributes () {
                debugger
                that.loading = true
                let params = {
                    list: [],
                    type: 1,
                    commonCode: this.objP.relateb
                }
                let finalArr =  await that.changeData(that.contentCmpsList)
                // console.log("----finalArr----",finalArr)
                debugger
                params.list = this.getFinalParamsData(finalArr)
                debugger
                console.log("保存时 最终的 params", params)
                saveControlAttributes(params).then(res => {
                    that.loading = false
                    that.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                }).catch(err => {
                    that.loading = false
                })
            }
        }
    }
</script>
