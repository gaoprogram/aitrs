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
                // width: 45%;
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
        <!-- needRefesh: {{needRefesh}}-------- -->
        fieldsKeysData: {{fieldsKeysData}}------------------
        <el-row>
            <el-col :span="24">
                <el-form 
                    v-for="(groupItem, key) in fieldsKeysData.Children"
                    :key="key"
                    :model="groupItem" 
                    :ref="`ruleForm_${groupItem.MetaAttr.LogicMetaCode}`" 
                    :class="[
                        fieldsKeysData.Children && fieldsKeysData.Children.length>1 ?'line-bottom-dotted': '', 
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
                    >
                        <h3 class="marginT10">行号:{{row.RowNo}}</h3>
                        <div class="deletebtnWrap clearfix " >
                            <!-- <el-button 
                                type="primary" 
                                size="mini" 
                                class="rt"
                                @click.native="addGroup"
                            >新增</el-button> -->
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
                                @click.native="editGroup"
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
                    
                    <!-- <save-footer 
                        v-if="!isShowing"
                        @save="saveGroup"
                    ></save-footer>                             -->
                </el-form>
            </el-col> 
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { checkFormArray } from '@/utils/newStyleFieldValidate'
    import { deepCopyArr } from '@/utils/clone'
    import { setStorage, getStorage } from '@/utils/handlerStorage'
    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        teamField,
        teamFieldValue,
        deleteFieldValues
    } from '@/api/newStyle.js' 
    let that 
    export default {
        mixins: [ fieldGroupControlTypeMixin ],        
        components: {
            SaveFooter
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
            // 用于 新增编辑时 递归调用此组件，不必重新调用接口 用之前的数据即可
            needRefesh: {
                type: Boolean,
                default: () => {
                    return true
                }
            },
            isAddOrEditFlag: {
                type: [Number, String],
                default: () => {
                    return 0  // 0 编辑 1 新增
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
                fieldsKeysData: {},   
                ruleForm: {

                },
                showGroupFieldsDialog: false, // 控制 新增/编辑分组的弹框显示
            }
        },
        watch: {
            fieldItemObj: {
                handler (newValue, oldValue) {
                    // 每当obj的值改变则发送事件update:obj , 并且把值传过去
                    this.$emit('update:obj', newValue)
                    },
                deep: true
            },
        },        
        created () {
            that = this
            this.$nextTick(() => {
                if (0) {
                    // 版本 1、 2 基础版 没有字段的数据权限 新增 编辑 时 看缓存中有没有数据 有就直接用缓存的数据 没有就重新调用接口 
                    let newFieldData = getStorage(`fieldsKeysData_${this.LogicMetaCode}`)
                    if(Object.keys(newFieldData).length){
                        // 对象非空
                        this.fieldsKeysData = newFieldData
                    }else {
                        this._teamFieldValue( 1, this.LogicMetaCode, this.MetaCode, 0, this.dialogType )
                    }                    
                }else {
                    // 版本 3 、4  高级版  有字段的数据权限 新增 时 需要重新调用 字段的接口
                    // this._teamFieldValue( 1, this.LogicMetaCode, this.MetaCode, 0, this.dialogType )
                    window.alert(this.dialogType)
                    if(this.dialogType != 'Edit-TM' && this.dialogType != 'Add-TM') {
                        // 非编辑/新增界面 获取 分组字段名称集合 和 字段value集合
                        this._teamFieldValue( 1, this.LogicMetaCode, this.MetaCode, 0, this.dialogType )
                    }else {
                        if(this.dialogType === 'Add-TM'){
                            // 新增需要调用接口
                            this._teamFieldValue( 1, this.LogicMetaCode, this.MetaCode, 0, this.dialogType )
                        }else if (this.dialogType === 'Edit') {
                            window.alert(434444)
                            // 编辑 视图不需要调用接口
                            debugger
                            let newFieldData = getStorage(`fieldsKeysData_${this.LogicMetaCode}`)
                            // 编辑不需要 重新获取数据
                                // 编辑
                            if(Object.keys(newFieldData).length){
                                // 对象非空
                                this.fieldsKeysData = newFieldData
                            }else {
                                window.alert(566777)
                                this._teamFieldValue( 1, this.LogicMetaCode, this.MetaCode, 0, this.dialogType )
                            }
                        }
                    }                      
                }
              
            })
        },
        beforeDestroy () {
            // 销毁
            
        },
        methods: {  
            _refreshData(){
                debugger
                that._teamFieldValue( 1, that.LogicMetaCode, that.MetaCode, 0, that.dialogType )
            },
            _saveFieldkeysData(arr){
                setStorage(`fieldsKeysData_${this.LogicMetaCode}`, JSON.stringify(arr))                
            },
            _teamFieldValue ( PersonId, LogicMetaCode, MetaCode, RowNo, ActionAttr ) {
                debugger
                this.loading = true
                // 获取字段数据
                teamFieldValue(PersonId, LogicMetaCode, MetaCode, RowNo, ActionAttr).then(res => {
                    this.loading = false
                    debugger
                    if(res && res.data.State === REQ_OK) {   
                        this.fieldsKeysData = res.data.Data 
                        if(this.isShowing){
                            // 非新增、编辑弹窗页面  触发父组件进行 设置 新增按钮的显示/隐藏flag 
                            this.$emit("emitShowAddBtn", this.fieldsKeysData)
                        }
                        // 将数据缓存
                        this._saveFieldkeysData(res.data.Data)                          
                        // 编辑和新增不需要 重新获取数据
                        if (this.dialogType === 'Add-TM') {
                            // 新增 
                            // 新增 需要将field的fieldVlaue 清空
                            this.fieldsKeysData = this.clearFieldValue(res.data.Data)
                        }
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取字段失败,${res.data.Error}`
                        })                        
                    }
                })
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
            // 新增 组
            addGroup(team){
                debugger
                this.isAddOrEdit = 1
                this.showGroupFieldsDialog = true
            },
            // 编辑 组
            editGroup(team){
                debugger
                this.isAddOrEdit = 0
            },
            deleteField(TenantId, MetaCode, RowNo){
                this.loading = true
                deleteFieldValues(TenantId, MetaCode, RowNo).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message({
                            type: 'success',
                            message: `删除"${GroupObj.MetaAttr.ShortName}"分组的第"${rowObj.RowNo}"行成功`
                        })                        
                    }else {
                        this.$message({
                            type: 'error',
                            message: `删除"${GroupObj.MetaAttr.ShortName}"分组的第"${rowObj.RowNo}"行失败,${res.data.Error}`
                        })
                    }
                })
            },
            // 删除行 
            deleteFieldValues(rowObj, GroupObj){
                debugger
                this.$confirm(`确认要删除"${GroupObj.MetaAttr.ShortName}"分组的第"${rowObj.RowNo}"行吗?`,"提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.deleteField(1, GroupObj.LogicMetaCode, rowObj.RowNo)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消删除${GroupObj.MetaAttr.ShortName}分组的第"${rowObj.RowNo}"行`
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
