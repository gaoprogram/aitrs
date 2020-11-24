<!--
  User: gaol
  Date: 2019/8/06
  功能：分组 组件里面的 字段包裹组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.fields-wrap-cmp {
    min-height: 150px;
    .groupItemContentWrap {
        min-height: 100px;
        .groupItemFieldsWrap {
            >>>.el-form-item {
                min-width: 150px;
                margin:5px;                    
            }
        }
    }
}
</style>

<template>
    <div 
        class="fields-wrap-cmp" 
        v-loading="loading"
    >
        <!-- isAddOrEditFlag: {{isAddOrEditFlag}} -->
        <!-- comsData.fieldGroup: {{comsData.fieldGroup}} -->
         <!-- 字段包裹组件： fieldItemObj： {{fieldItemObj}} -->
       <!-- MetaCode: {{MetaCode}}
        -------
        获取接口的字段数据：fieldsKeysData: {{fieldsKeysData}} -->
        <!-- fieldsKeysData: {{fieldsKeysData}}------------------ -->
        <!-- fieldsKeysData: {{fieldsKeysData}}------------------ -->
        <!-- hasLineBottomBorder: {{hasLineBottomBorder}} -->
        <el-row>
            <el-col :span="24">
                <el-form 
                    v-if="fieldsKeysData.Children.length"
                    v-for="(groupItem, key) in fieldsKeysData.Children"
                    :key="key"
                    :model="groupItem" 
                    :ref="`ruleForm_${groupItem.MetaAttr.LogicMetaCode}`" 
                    :class="[
                        fieldsKeysData.Children && fieldsKeysData.Children.length>2 && hasLineBottomBorder?'line-bottom-dotted': '', 
                        'marginT20', 
                        groupItem.rowsTotalAdd<=0? 'not_found':'',
                        `ruleForm_${groupItem.MetaAttr.LogicMetaCode}`
                    ] "
                    >
                    <!-- currentFieldComponent( groupItem.Fields[0].ControlType ): {{currentFieldComponent( groupItem.Fields[0].ControlType )}} -->
                    <!-- groupItem.rowsTotalAdd: {{groupItem}} -->
                    <!-- <div v-if="groupItem.rowsTotalAdd>1">
                        <i class="lt el-icon-caret-left"  @click="handlerLeftBtn(groupItem)"></i>
                        <i class="rt el-icon-caret-right" @click="handlerRightBtn(groupItem)"></i>
                    </div>  -->
                    <div>一级分组的logincMetaCode: {{groupItem.MetaAttr.LogicMetaCode}}</div>
                    <!-- groupItem.Rows: {{groupItem.Rows}} -->
                    <div                         
                        v-for="(row,idx) in groupItem.Rows"
                        :key="idx"
                        class="groupItemContentWrap"
                        v-if="row.SNo!=-1"
                    >
                        <h3 class="marginT10">行号:{{row.SNo}}</h3>
                        <div class="deletebtnWrap clearfix " >
                            <!-- <el-button 
                                type="primary" 
                                size="mini" 
                                class="rt"
                                @click.native="addGroup"
                            >新增</el-button> -->
                            <!-- delAndEditBtnShowing: {{delAndEditBtnShowing}} -->
                            <el-button 
                                v-if="fieldsKeysData.Children.length >= 1 && delAndEditBtnShowing"                             
                                type="primary" 
                                size="mini" 
                                class="rt"
                                @click="deleteFieldValues(row, groupItem)"
                            >删除</el-button>                            
                            <el-button 
                                v-if="fieldsKeysData.Children.length >= 1 && delAndEditBtnShowing"                                 
                                type="primary" 
                                size="mini" 
                                class="rt marginR10"
                                @click.native="editLineField(row, groupItem, idx)"
                            >编辑</el-button>
                        </div>  

                        <div 
                            :class="[
                                'groupItemFieldsWrap', 
                                'u-f-jst', 
                                'u-f-wrap', 
                                groupItem.Rows.length>1 ? 'line-bottom-dotted':'',
                            ]"
                        >
                            <!-- row.Values: {{row.Values}} -->
                            <component 
                                class="animated fadeInDown"
                                v-for="(field, index) in row.Values"
                                :key="index"    
                                :style="fieldWrapStyle"                        
                                :is="currentFieldComponent( field.ControlType )"
                                :isNeedCheck = 'true'
                                :prop = "'Rows.'+ idx + '.Values.' + index + '.FieldValue'"
                                :viewType="dialogType"
                                :obj.sync = "field"
                                :isTitle = "true"
                                :isShowing = "isShowing"
                            >
                            </component>  

                        </div>
                    </div>
                </el-form>


                <!--------编辑单行分组弹框---------->
                <div v-if="showEditLineField">
                    <el-dialog
                        :title="`${currentFieldGroup.MetaAttr.ShortName}-第${currentLineFieldsObj.SNo}行`"
                        :visible.sync="showEditLineField"
                        fullscreen
                        append-to-body
                        :close-on-click-modal="false"
                    >
                        <edit-line-field
                            :formObj = "currentFieldGroup"
                            :formFieldsObj="currentLineFieldsObj"
                            :viewType="currentLineFieldsBtnStr"
                            @editSaveSucess="editSaveSucess"
                            @emitCancel="emitCancel"
                        ></edit-line-field>
                    </el-dialog>
                </div>
            </el-col> 
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import EditLineField from './Base-editLineField-cmp'
    import { checkFormArray } from '@/utils/newStyleFieldValidate'
    import { deepCopyArr } from '@/utils/clone'
    import { setStorage, getStorage } from '@/utils/handlerStorage'
    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        teamFieldValue,
        deleteFieldValues
    } from '@/api/newStyle.js' 
    let that 
    export default {
        mixins: [ fieldGroupControlTypeMixin ],        
        components: {
            SaveFooter,
            EditLineField
        },
        props: {
            fieldItemObj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            MetaCode: {
                type: String,
                default: () => {
                    return ''
                }
            },
            LogicMetaCode: {
                type: String,
                default: () => {
                    return ''
                }
            },
            // 是否是直接显示 还是 新增或者编辑(复用此组件且字段的个数会与权限相关)后复用此组件
            dialogType: {
                type: String,
                default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
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
            isShowing: {
                type: Boolean,
                default: () => {
                    return false
                }
            },
            isAddOrEditFlag: {
                type: [Number, String],
                default: () => {
                    return 0  // 0 编辑 1 新增
                }
            },
            hasLineBottomBorder: {
                type: Boolean,
                default: () => {
                    false
                }
            },
            showAddOrEditBtn: {
                type: Boolean,
                default: () => {
                    return true  // 
                }
            },
            delAndEditBtnShowing: { // 行上是否显示 编辑 、删除按钮 默认false不显示
                type: Boolean,
                default: () => {
                    return false
                }
            },
            fieldsKeysData: {
                type: Object,
                default: () => {
                    return {}
                }
            }            
        },
        computed: {
            fieldWrapStyle () {
                return `width: 45%`  // 一行可以显示2 列
            }
        },
        data () {
            return {
                loading: false,
                ruleForm: {

                },
                showGroupFieldsDialog: false, // 控制 新增/编辑分组的弹框显示
                showEditLineField: false, // 控制 编辑行的弹框显示、隐藏
                currentFieldGroup: {},  // 编辑的当前组的对象信息
                currentLineFieldsObj: {}, // 编辑的当前行的对象信息
                currentLineFieldsIndex: '',
                currentLineFieldsBtnStr: '', // 控制
            }
        },
        watch: {
            fieldItemObj: {
                handler (newValue, oldValue) {
                    // 每当obj的值改变则发送事件update:obj , 并且把值传过去
                    this.$emit('update:obj', newValue)
                    },
                deep: true
            }
        },        
        created () {
            that = this
        },
        beforeDestroy () {
            // 销毁
            
        },
        methods: {  
            _refreshData(){
                debugger
                that._teamFieldValue( 1, that.LogicMetaCode, that.MetaCode, 0, that.dialogType )
            },
            clearFieldValue(obj){
                debugger
                if(obj.Children && obj.Children.length){
                    obj.Children.forEach((item, key) => {
                        let Fields = item.addgao || []
                        let fieldLength = Fields.length
                        if(fieldLength){
                            Fields.forEach((lineItemObj, index) => {
                                if(lineItemObj.fieldConfigs.length){
                                    lineItemObj.fieldConfigs.forEach((field, idx) => {
                                        debugger
                                        try {
                                            let value = field.FieldValue
                                            // 简单类型
                                            let type = Object.prototype.toString.call(value)
                                            switch(type){
                                                case "[object Number]":
                                                case "[object String]":
                                                case "[object String]":
                                                case "[object Undefined]":
                                                case "[object Null]":
                                                    field.FieldValue = ''
                                                    break
                                                case "[object Boolean]":
                                                    if(value) {
                                                        field.FieldValue = true
                                                    }else {
                                                        field.FieldValue = false
                                                    }
                                                    break
                                                case "[object Object]":
                                                    field.FieldValue = {}
                                                    break
                                                case "[object Array]":
                                                    field.FieldValue = []
                                                    break
                                                default: 
                                                    field.FieldValue = null
                                            }
                                        } catch (error) {

                                        }
                                    })
                                }else {

                                }
                            })
                        }
                    })
                }
                return obj
            },
            // 判断该分组中是否有多行数据
            hasMoreLineData (groupItem) {
                let currentLogicMetaCode = groupItem.MetaAttr.LogicMetaCode || ''  
            },        
            // 新增 
            addGroup(team){
                debugger
                this.isAddOrEdit = 1
                this.showGroupFieldsDialog = true
            },
            closeEditLineFieldDailog(){
                this.showEditLineField = false
            },
            emitCancel(){
                this.closeEditLineFieldDailog()
            },
            editSaveSucess(){
                debugger
                this.closeEditLineFieldDailog()
                this.$emit("emitRefreshTeamFieldValue")
            },
            // 编辑行 
            editLineField(lineObj, teamObj, idx){
                debugger
                this.currentFieldGroup = JSON.parse(JSON.stringify(teamObj))
                this.currentLineFieldsObj = JSON.parse(JSON.stringify(lineObj))
                this.currentLineFieldsIndex = idx
                this.showEditLineField = true
                this.currentLineFieldsBtnStr = 'Edit-TM'
                // this.currentLineFieldsBtnStr = '3005'   // 行上面的 编辑按钮 标识
            },
            deleteField(LogicMetaCode, PersonId, SNo = 0,  IsParent, ){
                this.loading = true
                deleteFieldValues(LogicMetaCode, PersonId, SNo = 0,  IsParent).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message({
                            type: 'success',
                            message: `删除"${this.currentFieldGroup.MetaAttr.ShortName}"分组的第"${this.currentLineFieldsObj.SNo}"行成功`
                        })   
                        // 触发父组件刷新
                        this.$emit("emitRefreshTeamFieldValue")                     
                    }else {
                        this.$message({
                            type: 'error',
                            message: `删除"${this.currentFieldGroup.MetaAttr.ShortName}"分组的第"${this.currentLineFieldsObj.SNo}"行失败,${res.data.Error}`
                        })
                    }
                })
            },
            // 删除行 
            deleteFieldValues(rowObj, GroupObj){
                debugger
                this.currentLineFieldsObj = rowObj
                this.currentFieldGroup = GroupObj
                this.currentLineFieldsBtnStr = 'Del-TM'   // 行上面的 编辑按钮 标识                
                // this.currentLineFieldsBtnStr = '3006'   // 行上面的 编辑按钮 标识
                this.$confirm(`确认要删除"${GroupObj.MetaAttr.ShortName}"分组的第"${rowObj.SNo}"行吗?`,"提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.deleteField(GroupObj.MetaAttr.LogicMetaCode, 1, rowObj.SNo, false)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消删除${GroupObj.MetaAttr.ShortName}分组的第"${rowObj.SNo}"行`
                    })
                })
            },                                         
            saveGroup () {
                debugger
                // 特别要注意 saveGroup 方法 父组件在调用时 如果用this 这个this指向的是父组件中的this
                let result = []
                that.fieldsKeysData.Children.forEach((item,key) => {
                    let refForm = `ruleForm_${item.MetaAttr.LogicMetaCode}`
                    console.log(refForm)
                    result.push(checkFormArray(that, refForm, item, key))
                })
                console.log('保存时验证过的result', result)
                debugger
                return Promise.all(result).then(res => {
                    // 当前分组中每个分组里面的每行都验证pss了才触发父组件
                    return {
                        res: res,
                        data: that.fieldsKeysData
                    }
                    
                }).catch(error => {
                    debugger
        
                })
            }
        }
    }
</script>
