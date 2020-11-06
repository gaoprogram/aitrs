<!--
  User: gaol
  Date: 2019/8/06
  功能：分组 组件  CombineType 为   0030303
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.fieldGroup-cmp-wrap {
    .btnWrap {
        text-align right
    }
}
</style>

<template>
    <div class="fieldGroup-cmp-wrap" v-loading="loading">
        <!-- comsData.fieldGroup: {{comsData.fieldGroup}} -->
        分组组件comsData: {{comsData}}----
        <!-- showGroupFieldsDialog: {{showGroupFieldsDialog}} -->
        <el-row>
            <el-col :span="24">
                <div class="btnWrap marginB10" v-show="showAddOrEditBtn && comsData.length>0">
                    <!-- <el-button 
                        type="primary" 
                        size="mini" 
                        class="rt"
                        @click.native="editGroup"
                    >编辑</el-button>                    
                    <el-button 
                        type="primary" 
                        size="mini" 
                        class="rt marginR10"
                        @click.native="addGroup"
                    >新增</el-button>   -->
                    <!-- sectionData.Btns： {{sectionData.Btns}} -->
                    <el-button
                        v-show="showAddBtn(btnItem)"
                        class="animated fadeIn"
                        v-for="(btnItem, key) in sectionData.Btns"
                        :key="key"
                        type="primary" 
                        size="mini" 
                        @click.native="handlerClickBtn(btnItem)"                        
                    >{{btnItem.RalateName}}</el-button>
                </div>   

                <el-card 
                    :class="['box-card-fieldGroup', comsData.length<=0 ? 'not_found':'']" 
                    :style="{'width': groupWidth}"
                    v-for="(com, key) in comsData"
                    :key="key"
                >
                    <div slot="header" class="clearfix">
                        <span class="u-f-ac" style="float: left">
                            <i class="el-icon-edit" style="color: red;margin-right:5px;"></i>               
                            <span class="tit" style="">
                                {{com.MetaAttr && com.MetaAttr.ShortName}}
                            </span>
                        </span>
                        <el-button 
                            style="float: right; padding: 3px 0" 
                            type="text"
                            @click.native="com.IsShow = !com.IsShow"
                        >
                            {{ com.IsShow ? '收起': '展开' }}
                        </el-button>
                    </div>  
                        <!----引用分组字段的组件----->
                        <field-group-item
                            v-show="com.IsShow"
                            class="animated fadeIn"
                            :ref="`group_${com.MetaAttr.LogicMetaCode}`"
                            :fieldItemObj="com"
                            :dialogType="dialogType"
                            :DataWithObject="DataWithObject"
                            :contentSectionTotalData="contentSectionTotalData"
                            :MetaCode = "com.MetaCode"
                            :showAddOrEditBtn="showAddOrEditBtn"
                            :LogicMetaCode = "com.MetaAttr.LogicMetaCode"
                            :isShowing="isShowing"
                            :needRefesh="needRefesh"
                            :isAddOrEditFlag="isAddOrEditFlag"
                            @emitShowAddBtn="emitShowAddBtn"
                        >
                        </field-group-item>
                </el-card>                   

                <!----分组/表 的新增/编辑 弹框------->   
                <div class="commonDialogWrap" v-if="comDialogVisible">
                    <common-dialog-cmp
                        :comDialogisAddOrEdit = "comDialogisAddOrEdit"
                        :comDialogTit="comDialogTit"
                        :comDialogVisible="comDialogVisible"
                        width="50%"
                        :fullscreen="true"
                        :appendToBody="true"
                        :closeOnClickModal="false"
                        @closeComDialog="closeComDialog"
                    >
                        <div slot="slotDialog" class="comdialogSlotWrap" v-loading="fieldGroupItemCmpLoading">
                            <!-- 这是 slotDialog 的内容 -->
                            <div class="dialogBox">
                                <!-- comDialogData: {{ comDialogData }}------ -->
                                <!-- currentDialogType()： {{currentDialogType(this.dialogTypeStr)}} -->
                                <component 
                                    v-if="comDialogVisible"
                                    :is="currentDialogType(this.dialogTypeStr)"
                                    :dialogType="dialogTypeStr"
                                    :comsData="comDialogData"
                                    :isShowing="false"
                                    :showAddOrEditBtn="false"
                                    :isAddOrEdit = comDialogisAddOrEdit    
                                >
                                </component>
                            </div>

                            <!-- comDialogisAddOrEdit: {{comDialogisAddOrEdit}} -->
                            <div class="saveFooterBox" v-if="comDialogisAddOrEdit === 0 || comDialogisAddOrEdit === 1">
                                <save-footer 
                                    @save="saveFieldGroup" 
                                    @cancel="cancelFieldGroup">

                                </save-footer>
                            </div> 
                        </div>
                    </common-dialog-cmp>
                </div>                               
            </el-col> 
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    // import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import FieldGroupItem from './Base-fieldGroupItem'
    import FieldAddoreditCmp from './field-addoredit-cmp'
    // 通用弹框组件
    import CommonDialogCmp from '@/base/NewStyle-cmp/Content-section-cmp/Base-comCmp-dialog-cmp'    
    import FieldGroupCmp from '@/base/NewStyle-cmp/Content-section-cmp/FieldGroup-cmp/Base-fieldGroup'
    import { checkFormArray } from '@/utils/newStyleFieldValidate'
    import { deepCopyArr } from '@/utils/clone'
    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        saveTeamFieldValues
    } from '@/api/newStyle.js'     
    export default {
        name:'FieldGroupCmp',
        components: {
            SaveFooter,
            FieldGroupItem,
            FieldAddoreditCmp,
            CommonDialogCmp,
            FieldGroupCmp
        },
        props: {
            showAddOrEditBtn: {
                type: Boolean,
                default: true
            },
            comsData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            contentSectionTotalData: {
                type: Object,
                default: () => {
                    return {}
                }                
            },
            DataWithObject: {
                type: Array,
                default: () => {
                    return []
                }
            },
            sectionData: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            // 是否是直接显示 还是 新增或者编辑(复用此组件且字段的个数会与权限相关)后复用此组件
            dialogType: {
                type: String,
                default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
            }, 
            isTitle: {
                type: Boolean,
                default: true
            },
            isShowing: {   // 是否是显示的界面 （非编辑、新增）
                type: Boolean,
                default: () => {
                    return true  // 初始时 是显示 所以初始值为 true
                }
            },
            // 用于 新增编辑时 递归调用此组件，不必重新调用接口 用之前的数据即可
            needRefesh: {
                type: Boolean,
                default: () => {
                    return true
                }
            },
            isAddOrEdit: {
                type: [Number, String],
                default: () => {
                    return 0
                }
            }            
        },
        computed: {
            groupWidth () {
                return '100%'
            },
            groupItemNameStyle () {
                return `color:"red"`
            },
            fieldWrapStyle () {
                return ``
            }
        },
        data () {
            return {
                loading: false,
                fieldGroupItemCmpLoading: false,
                groupsData: [],  
                isAddOrEditFlag: this.isAddOrEdit,  // 0 编辑  1新增
                showGroupFieldsDialog: false, // 控制 新增/编辑分组的弹框显示  
                showAddBtnFlag: false, 
                editGroupBoxTit: '新增',        
                ruleForm: {

                },
                currentLogicMetaCode: '',  // 当前分组组件的code
                dialogTypeStr: this.dialogType, // 
                comDialogisAddOrEdit: 1, // 0 编辑 1 是新增 
                comDialogTit: '',
                comDialogVisible: false,  // 新增、编辑等 弹框的显示/隐藏
                comFieldGroupLoading: false, 
                comDialogData: null,  // dialog 数据                
            }
        },
        watch:{

        },
        created () {
            // 深拷贝 comsData
            // this.$nextTick(() => {
            //     this._copyGroupsData(this.comsData)
            // })
        },
        beforeDestroy () {
        // 销毁
        },
        methods: {
            emitShowAddBtn(obj){
                debugger
                let arr = obj.Children || []
                let res = false  // 默认没有行
                if(arr && arr.length){
                    res = arr.some((item, key) => {
                        return item.Rows.length > 0
                    })
                }else {
                    res = false
                }
                this.showAddBtnFlag = res
                // return res
            }, 
            showAddBtn(obj){
                debugger
                if(this.contentSectionTotalData.CPMetaAttr.ActionAttr === 'Add'){
                    // 多行的 运行有新增按钮
                    return true
                }else {
                    // 单行的 
                    // window.alert(this.showAddBtnFlag)
                    if(obj.MetaAttr.ActionAttr === 'Add-TM'){
                        //新增按钮
                        return !this.showAddBtnFlag
                    }else {
                        return true
                    }
                }
            }, 
            _getComDialogData(obj){
                debugger
                if(obj.SectionData){
                    return  JSON.parse(JSON.stringify(obj.SectionData)) 
                }else {
                    return []
                }
                // tab 组件 需要遍历 UpSectionDatas 属性的对象
            }, 
            currentDialogType(dialogTypeStr){
                debugger
                switch(dialogTypeStr) {
                    case 'Add-TM':
                    case 'Add':
                        return FieldGroupCmp
                        break;
                    case 'Edit-TM':
                    case 'Edit':
                        return FieldGroupCmp
                        break
                    case 'Del-TM':
                        break
                    case 'View-TM':
                        break
                    case 'Add-SH':
                        break
                    case 'Edit-SH':
                        break
                    case 'Del-SH':
                        break   
                    case 'View-SH':
                        break                                                                
                    case 'Log':  // 日志
                        break;
                    default: 

                }
            },    
            // 点击 新增/编辑/日志 等日志按钮                   
            handlerClickBtn(btnItem){
                debugger
                this.comDialogTit = btnItem.RalateName
                let MetaCode = btnItem.MetaCode || ''
                this.currentLogicMetaCode = this.comsData[0].MetaAttr.LogicMetaCode || ''
                this.dialogTypeStr = btnItem.MetaAttr.ActionAttr
                switch(this.dialogTypeStr){
                    case 'Add-TM':
                    case 'Add':
                        this.comDialogisAddOrEdit = 1
                        this.comDialogData = this._getComDialogData(this.sectionData)
                        debugger
                        break
                    case 'Edit-TM':
                    case 'Edit':
                        this.comDialogisAddOrEdit = 0
                        this.comDialogData = this._getComDialogData(this.sectionData)
                        break
                    case 'Del-TM':
                        break
                    case 'View-TM':
                        break
                    case 'Add-SH':  
                        break
                    case 'Edit-SH':
                        break
                    case 'Del-SH':
                        break   
                    case 'View-SH':
                        break                                             
                    case 'Log':
                        // this.
                    default: 
                        this.comDialogisAddOrEdit = 0
                } 
                this.comDialogVisible = true
            },
            closeComDialog(){
                debugger
                this.comDialogVisible = false
            },
            saveTeamFieldValues(PersonId, dataObj){
                debugger
                // 需要触发 fieldGroupItem 组件中的 loading
                this.fieldGroupItemCmpLoading = true
                let Data = dataObj
                saveTeamFieldValues( 1, Data ).then(res => {
                    debugger
                    this.fieldGroupItemCmpLoading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message({
                            type: 'success',
                            message: `分组保存成功`
                        })
                        // 关闭弹窗
                        this.closeComDialog()
                        // 触发 fieldGroupItem 组件重新获取数据
                        // console.log(this.currentLogicMetaCode)
                        // console.log(this.$refs[`group_${this.currentLogicMetaCode}`])
                        this.$refs[`group_${this.currentLogicMetaCode}`][0]._refreshData()
                    }else {
                        this.$message({
                            type: 'error',
                            message: `分组保存失败,${res.data.Error}`
                        })

                    }
                })
            },    
            getFaileGroup(arr){
                let groupArr = this.comsData
                let groupLength = this.comsData.length
                let failGroupArr = []
                if(groupLength){
                    groupArr.forEach((item, key) => {
                        let res = arr.some((i, k) => {
                            return i.MetaAttr.LogicMetaCode === item.MetaAttr.LogicMetaCode
                        })
                        if(res){
                             
                        }else {
                            failGroupArr.push(item.MetaAttr.LogicMetaCode)
                        }
                    })
                }
                return failGroupArr.join()
            },  
            // 新增/编辑  分组字段 的 保存
            saveFieldGroup(){
                debugger
                // 循环遍历每个分组 然后进行 每个分组的必填项验证, 都验证通过后才提交数据
                let _this = this
                this.currentGroup
                let result = []
                let resGroup = {}
                let resData = new Promise((resolve, reject) => {
                    for(let i=0,length=_this.comsData.length;i<length; i++){
                        let item = _this.comsData[i]
                        let groupItemCmp = `group_${item.MetaAttr.LogicMetaCode}`
                        console.log(groupItemCmp)
                        console.log(_this.$refs[groupItemCmp])
                        // 调取子组件的 saveGroup 方法
                        _this.$refs[groupItemCmp][0].saveGroup().then(res => {
                            debugger
                            // 当前分组验证成功 调取保存接口
                            console.log(res)
                            result.push(res)
                            // 将所有子分组的数据复制给 resGroup
                            resGroup = res.data
                            resolve()
                        }).catch(error => {
                            // 验证失败
                            // result.push(error)
                            debugger
                            reject()
                        })                        
                    }
                })

                resData.then(res => {
                    debugger
                    if(result.length) {
                        // 判断 验证成功后的 form（子分组）个数 与 this.comsData.lenth (子分组个数) 的比较
                        result.length === this.comsData.length && this.saveTeamFieldValues(1, resGroup)
                    }else {
                        // 有未验证通过的子分组
                        // 找出未验证通过的分组
                        if(result.length === 0){
                            this.$message({
                                type: 'info',
                                message: `所有子分组必填项验证fail`
                            })
                            return
                        }
                        // 有部分 子分组 必填项验证fail
                        let failGroupCodes = this.getFaileGroup(result)
                            this.$message({
                                type: 'info',
                                message: `"${failGroupCodes}"子分组必填项验证fail`
                            })
                    }
                }).catch(error => {

                })

            },
            // 新增/编辑  分组字段的 取消保存
            cancelFieldGroup(){
                debugger
                this.comDialogVisible = false
            },            
            _copyGroupsData(arr){
                if(arr && arr.length){
                    this.groupsData = deepCopyArr(arr)
                }
            },            
            // 新增 组
            addGroup(team){
                debugger
                this.isAddOrEditFlag = 1
                this.editGroupBoxTit = '新增'
                this.showGroupFieldsDialog = true
                // 深拷贝 comsData
                this._copyGroupsData(this.comsData)
            },
            // 编辑 组
            editGroup(team){
                debugger
                this.isAddOrEditFlag = 0
                this.editGroupBoxTit = '编辑'
                this.showGroupFieldsDialog = true
                // 深拷贝 comsData
                this._copyGroupsData(this.comsData)
            },                                  
        },
        watch: {
            obj: {
                handler (newValue, oldValue) {
                // 每当obj的值改变则发送事件update:obj , 并且把值传过去
                this.$emit('update:obj', newValue)
                },
                deep: true
            }
        }
    }
</script>
