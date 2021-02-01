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
                <div class="btnWrap marginB10" v-show="showAddOrEditBtn && comsData1.length>0">
                    <!-- sectionData.Btns： {{sectionData.Btns}}
                    ------ -->
                    <!-- 是否有多行showAddBtnFlag: {{showAddBtnFlag}} -->
                    <el-button
                        v-if="btnItem.btnIsShowing"
                        class="animated fadeIn"
                        v-for="(btnItem, key) in sectionData.Btns"
                        :key="key"
                        type="primary" 
                        size="mini" 
                        @click.native="handlerClickBtn(btnItem)"                        
                    >{{btnItem.RalateName}}</el-button>
                </div>   

                <div 
                    :class="['box-card-fieldGroup', comsData.length<=0 ? 'not_found':'']" 
                    :style="{'width': groupWidth}"
                    v-for="(com, key) in comsData1"
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
                            @click.native="handlerClickIsShowBtn(com, key)"
                        >
                        {{com.IsShow? '收起':'展开'}}
                        </el-button>
                    </div>   

                    <!----引用分组字段的组件----->
                    <field-group-item
                        v-show="com.IsShow"
                        class="animated fadeIn"
                        :ref="`group_${comsData[0].MetaAttr.LogicMetaCode}`"
                        :fieldItemObj="comsData[0]"
                        :dialogType="dialogType"
                        :fieldsKeysData="fieldsKeysData"
                        :DataWithObject="DataWithObject"
                        :contentSectionTotalData="contentSectionTotalData"
                        :MetaCode = "comsData[0].MetaCode"
                        :LogicMetaCode = "comsData[0].MetaAttr.LogicMetaCode"                            
                        :showAddOrEditBtn="showAddOrEditBtn"
                        :isShowing="isShowing"
                        :isAddOrEditFlag="isAddOrEditFlag"
                        :hasLineBottomBorder="showAddBtnFlag"
                        :delAndEditBtnShowing = "delAndEditBtnShowing"
                        @emitShowAddBtn="emitShowAddBtn"
                        @emitRefreshTeamFieldValue="emitRefreshTeamFieldValue"
                    >
                    </field-group-item>
                </div>               

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
                                    :is="currentDialogType()"
                                    :dialogType="dialogTypeStr"
                                    :comsData="comDialogData"
                                    :MetaCode = "currentMetaCode"
                                    :LogicMetaCode = "currentLogicMetaCode"                                    
                                    :isShowing="false"
                                    :showAddOrEditBtn="false"
                                    :hasLineBottomBorder="showAddBtnFlag"
                                    :fieldsKeysData="fieldsKeysData"
                                    :isAddOrEdit = comDialogisAddOrEdit    
                                    :delAndEditBtnShowing = "delAndEditBtnShowing"

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
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import FieldGroupItem from './Base-fieldGroupItem'
    // 通用弹框组件
    import CommonDialogCmp from '@/base/NewStyle-cmp/Content-section-cmp/Base-comCmp-dialog-cmp'    
    import FieldGroupCmp from '@/base/NewStyle-cmp/Content-section-cmp/FieldGroup-cmp/Base-fieldGroup'
    import { checkFormArray } from '@/utils/newStyleFieldValidate'
    import { deepCopyArr } from '@/utils/clone'
    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        saveTeamFieldValues,
        teamFieldValue
    } from '@/api/newStyle.js'    
    import { setStorage, getStorage } from '@/utils/handlerStorage'
    export default {
        name:'FieldGroupCmp',
        components: {
            SaveFooter,
            FieldGroupItem,
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
            isAddOrEdit: {
                type: [Number, String],
                default: () => {
                    return 0
                }
            }         
        },
        data () {
            return {
                loading: false,
                comsData1: this.comsData,
                fieldGroupItemCmpLoading: false,
                forceRefresh: false,  // 控制 fieldGroupItem 组件是否更新
                groupsData: [],  
                isAddOrEditFlag: this.isAddOrEdit,  // 0 编辑  1新增
                showGroupFieldsDialog: false, // 控制 新增/编辑分组的弹框显示  
                showAddBtnFlag: false,  
                editGroupBoxTit: '新增',        
                ruleForm: {

                },
                fieldsKeysData: {},
                currentLogicMetaCode: '',  // 当前分组组件的code
                currentMetaCode: '',  // 当前分组组件的MetaCode
                dialogTypeStr: this.dialogType, // 
                comDialogisAddOrEdit: 1, // 0 编辑 1 是新增 
                comDialogTit: '',
                comDialogVisible: false,  // 新增、编辑等 弹框的显示/隐藏
                comFieldGroupLoading: false, 
                comDialogData: null,  // dialog 数据    
                delAndEditBtnShowing: false, // 行上面是否显示 新增 编辑 按钮 默认不显示            
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
        watch:{

        },
        created () {
            // 深拷贝 comsData
            // this.$nextTick(() => {
            //     this._copyGroupsData(this.comsData)
            // })

            this.currentLogicMetaCode = this.comsData[0].MetaAttr.LogicMetaCode || ''
            this.currentMetaCode = this.comsData[0].MetaCode || ''            
            // 处理 btns
            this._changeBtnItems() 

            // 获取 分组字段数据
            if(this.dialogTypeStr != 'Edit-TM' && this.dialogTypeStr != 'Add-TM' 
                && this.dialogTypeStr != '3003' && this.dialogTypeStr != '3002'
            ) {
                // 非编辑/新增界面 获取 分组字段名称集合 和 字段value集合
                this._teamFieldValue( 1, this.currentLogicMetaCode, this.currentMetaCode, 0, this.dialogTypeStr )
            }else {
                if(this.dialogTypeStr === 'Add-TM' || this.dialogTypeStr == '3002'){
                    // 新增需要调用接口
                    this._teamFieldValue( 1, this.currentLogicMetaCode, this.currentMetaCode, 0, this.dialogTypeStr )
                }else if (this.dialogTypeStr === 'Edit-TM' || this.dialogTypeStr == '3003') {
                    // window.alert(434444)
                    // 编辑 视图不需要调用接口
                    debugger
                    let newFieldData = getStorage(`fieldsKeysData_${this.currentLogicMetaCode}`)
                    // 编辑不需要 重新获取数据
                        // 编辑
                    if(Object.keys(newFieldData).length){
                        // 对象非空
                        this.fieldsKeysData = newFieldData
                    }else {
                        // window.alert(566777)
                        this._teamFieldValue( 1, this.currentLogicMetaCode, this.currentMetaCode, 0, this.dialogTypeStr )
                    }
                }
            } 
        },
        beforeDestroy () {
        // 销毁
        },
        methods: {
            // 展开、收起
            handlerClickIsShowBtn (obj, idx) {
                let that = this
                obj.IsShow = !obj.IsShow
            },           
            // 分组整体是否显示新增按钮
            emitShowAddBtn(obj){
                debugger
                let arr = obj.Children || []
                let res = false  // 默认没有行
                if(arr && arr.length){ // 有子分组
                    for(let i = 0; i< arr.length; i++){
                        let item = arr[i]
                        if(item.Rows.length>0){
                            let hasLine = item.Rows.some((i, indx) => {
                                return i.SNo > -1
                            })
                            hasLine && (res = true) 
                            break                       
                        }
                    }

                }else {
                    // 无子分组 情况下 即 没有行 
                    res = false
                }
                this.showAddBtnFlag = res
            },
            _changeBtnItems(){
                debugger
                if(this.sectionData && this.sectionData.Btns && this.sectionData.Btns.length){
                    // 遍历 btns
                    this.sectionData.Btns.forEach((item, key) => {
                        let item_ActionAttr = item.MetaAttr.CAR
                        console.log("item_ActionAttr-------------", item_ActionAttr)
                        this.$set(item, 'btnIsShowing', true)
                        switch(item_ActionAttr){
                            case 'Edit-TM': // 组上面有编辑按钮
                            case '3003': // 组上面有编辑按钮
                                // 则行上面 显示 编辑和 删除按钮
                                this.delAndEditBtnShowing = true 
                                if(this.contentSectionTotalData.CPMetaAttr.CAR === 1){
                                    // 多行的 组上 有新增、编辑、删除、日志按钮
                                    this.$set(item, 'btnIsShowing', true)
                                }else {
                                    // 单行  组上面不显示 编辑 、 删除按钮
                                    this.$set(item, 'btnIsShowing', false)
                                }
                                break
                            case 'Add-TM':  // 组上面有新增按钮  
                            case '3002':                          
                                if(this.contentSectionTotalData.CPMetaAttr.CAR === 1){
                                    // 多行的 组上 有新增、编辑、删除、日志按钮
                                    this.$set(item, 'btnIsShowing', true)
                                }else {
                                    // 单行  组上面不显示 编辑 、 删除按钮
                                    this.$set(item, 'btnIsShowing', false)
                                }                            
                                break
                            case 'Del-TM': // 组上面 删除按钮
                            case '3004':
                                if(this.contentSectionTotalData.CPMetaAttr.CAR === 1){
                                    // 多行的 组上 有新增、编辑、删除、日志按钮
                                    this.$set(item, 'btnIsShowing', true)
                                }else {
                                    // 单行  组上面不显示 编辑 、 删除按钮
                                    this.$set(item, 'btnIsShowing', false)
                                }
                                break                                                      
                            default :

                        }
                    })
 

                }else {
                    console.log(5555555555555)
                }
                 
            }, 
            _saveFieldkeysData(arr){
                setStorage(`fieldsKeysData_${this.currentLogicMetaCode}`, JSON.stringify(arr))                
            },  
            _showAddBtn(obj){
                debugger
                let arr = obj.Children || []
                let res = false  // 默认没有行
                if(arr && arr.length){ // 有子分组
                    for(let i = 0; i< arr.length; i++){
                        let item = arr[i]
                        if(item.Rows.length>0){
                            let hasLine = item.Rows.some((i, indx) => {
                                return i.SNo > -1
                            })
                            hasLine && (res = true) 
                            break                       
                        }
                    }

                }else {
                    // 无子分组 情况下 即 没有行 
                    res = false
                }
                this.showAddBtnFlag = res
            }, 
            emitRefreshTeamFieldValue(){
                this.refreshTeamFieldValue()
            },
            refreshTeamFieldValue(){
                this._teamFieldValue( 1, this.currentLogicMetaCode, this.currentMetaCode, 0, this.dialogTypeStr )
            },         
            _teamFieldValue ( PersonId, LogicMetaCode, MetaCode, SNo, CAR ) {
                debugger
                this.loading = true
                // 获取字段数据
                teamFieldValue(PersonId, LogicMetaCode, MetaCode, SNo, CAR).then(res => {
                    this.loading = false
                    debugger
                    if(res && res.data.State === REQ_OK) {   
                        this.fieldsKeysData = res.data.Data 
                        this.$forceUpdate()
                        if(this.isShowing){
                            // 非新增、编辑弹窗页面  触发父组件进行 设置 新增按钮的显示/隐藏flag 
                            // this.$emit("emitShowAddBtn", this.fieldsKeysData)
                            this._showAddBtn(this.fieldsKeysData)
                        }
                        // 将数据缓存
                        this._saveFieldkeysData(res.data.Data)                          
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取字段失败,${res.data.Error}`
                        })                        
                    }
                })
            },                           
            _getComDialogData (obj) {
                debugger
                if(obj.SectionData){
                    return  JSON.parse(JSON.stringify(obj.SectionData)) 
                }else {
                    return []
                }
                // tab 组件 需要遍历 UpSectionDatas 属性的对象
            }, 
            currentDialogType(){
                debugger
                switch(this.dialogTypeStr) {
                    case 'Add-TM':
                    case '3002':   // 新增
                    case 'Add':
                        return FieldGroupCmp
                        break;
                    case 'Edit-TM':
                    case '3003':   // 编辑                        
                    case 'Edit':
                        return FieldGroupCmp
                        break
                    case 'Del-TM':  
                    case '3004':   // 删除
                    case 'Del':  
                        break
                    case 'View-TM':
                        break
                    case 'Log-TM':  // 分组日志
                    case '3007':  // 分组日志
                    case 'Log':  // 分组日志
                        break;        
                    case '3008':  // 打印
                    case 'Print':  
                        break;                                         
                    case 'Add-SH':
                        break
                    case 'Edit-SH':
                        break
                    case 'Del-SH':
                        break   
                    case 'View-SH':
                        break                                                                
                    case 'Log-SH':  // 表日志
                        break;
                    default: 

                }
            },   
            _deleteFieldValues(LogicMetaCode, PersonId, SNo = 0,  IsParent){
                this.loading = true
                deleteFieldValues(LogicMetaCode, PersonId, SNo = 0,  IsParent).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message({
                            type: 'success',
                            message: `删除${this.comDialogTit}分组成功`
                        })
                        // 刷新
                        this.refreshTeamFieldValue()                     
                    }else {
                        this.$message({
                            type: 'error',
                            message: `删除${this.comDialogTit}分组失败,${res.data.Error}`
                        })
                    }
                })                
            },
            // 删除整个分组 
            _deleteFieldGroup(){
                debugger
                this.$confirm(`确定要删除${this.comDialogTit}分组吗？`, "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    this._deleteFieldValues(this.currentLogicMetaCode, 1, 0, true)
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: 删除已取消
                    })
                })
            },             
            // 点击 新增/编辑/ 删除 \日志 等按钮                   
            handlerClickBtn(btnItem){
                debugger
                this.comDialogTit = btnItem.RalateName
                let MetaCode = btnItem.MetaCode || ''
                this.dialogTypeStr = btnItem.MetaAttr.CAR
                switch(this.dialogTypeStr){
                    case 'Add-TM':
                    case 'Add':
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
                        this._deleteFieldGroup()
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
            // 保存 所有分组的字段
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
                        // 刷新分组组件 获取最新数据
                        this.refreshTeamFieldValue()
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
                let result = []
                let resGroup = {}
                let resData = new Promise((resolve, reject) => {
                    for(let i=0,length=_this.comsData.length;i<length; i++) {
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
