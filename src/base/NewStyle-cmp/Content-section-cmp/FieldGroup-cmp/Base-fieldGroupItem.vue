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
            .fieldItemWrap {
                width: 40%;
                min-width: 150px;
                // min-height: 150px;
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
        <!-- fieldsKeysData: {{fieldsKeysData}}------------------ -->
        <!-- fieldsValuesData: {{fieldsValuesData}}  -->
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
                    <div                         
                        v-for="(row,idx) in groupItem.Rows"
                        :key="idx"
                        class="groupItemContentWrap"
                    >
                        <h3 class="marginT10">行号:{{row.RowNo}}</h3>
                        <div class="deletebtnWrap clearfix" >
                            <!-- <el-button 
                                type="primary" 
                                size="mini" 
                                class="rt"
                                @click.native="addGroup"
                            >新增</el-button>
                            <el-button 
                                type="primary" 
                                size="mini" 
                                class="rt"
                                @click.native="editGroup"
                            >编辑</el-button> -->
                            <el-button 
                                v-if="fieldsKeysData.Children.length = 1" 
                                type="primary" 
                                size="mini" 
                                class="rt"
                                @click="deleteFieldValues(row, groupItem)"
                            >删除</el-button>
                        </div>  

                        <div 
                            :class="[
                                'groupItemFieldsWrap', 
                                'u-f-ac', 
                                'u-f-wrap', 
                                groupItem.Rows.length>1? 'line-bottom-dotted':'',
                            ]"
                        >
                            <div 
                                :class="[
                                    'fieldItemWrap', 
                                    'u-f-ac', 
                                    'u-f-jsr', 
                                    'u-f-wrap', 
                                ]"
                                v-for="(field, index) in row.Values"
                                :key="index"
                            >
                                <!-- field.ControlType: {{field.ControlType}}------ -->
                                <!-- fieldObj: {{field}} -->
                                <component 
                                    :is="currentFieldComponent( field.ControlType )"
                                    :isNeedCheck = 'true'
                                    :prop = "'Values.'+ index + '.FieldValue'"
                                    :obj.sync = "field"
                                    :isTitle = "true"
                                    :isShowing = "isShowing"
                                >
                                </component>  
                            </div>
                        </div>
                    </div>
                    
                    <save-footer 
                        v-if="!isShowing"
                        @save="save"
                    ></save-footer>                            
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
        fieldValues,
        deleteFieldValues
    } from '@/api/newStyle.js' 
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
            }
        },
        computed: {
            rowfieldWrapStyle () {
                return ``
            }
        },
        data () {
            return {
                loading: false,
                fieldsKeysData: [],   
                // fieldsValuesData: [], 
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
            this.$bus.$on("a",(res) => {
                window.alert(res)
            })
            
            this.$nextTick(() => {
                if(this.needRefesh) {
                    // 获取 分组字段名称集合 和 字段value集合
                    // this._getTeamFieldInfo()
                    this._teamField(this.LogicMetaCode, this.MetaCode)
                }else {
                    let newFieldData = getStorage(`fieldsKeysData_${this.LogicMetaCode}`)
                    // 编辑和新增不需要 重新获取数据
                    if(this.isAddOrEditFlag == 0) {
                        // 编辑
                        this.fieldsKeysData = newFieldData
                    }else if (this.isAddOrEditFlag == 1) {
                        // 新增 需要将field的fieldVlaue 清空
                        this.fieldsKeysData = this.clearFieldValue(newFieldData)
                    }
                }
            })
        },
        beforeDestroy () {
            // 销毁
            
        },
        methods: {  
            _getTeamFieldInfo(){
                let _this = this
                console.log(this.$store)
                // let tenantId = this.$store.getters.userCode
                // let tenantId = this.$store.getters.companyCode
                Promise.all([this._teamField( this.LogicMetaCode, this.MetaCode ), this._fieldValues( this.LogicMetaCode, this.MetaCode, 1 , 0 )])
                .then(([keysRes, valuesRes]) => {
                    // console.log("---------------------", keysRes, valuesRes )
                    if (valuesRes && valuesRes.data.State === REQ_OK) {
                        this.fieldsValuesData = valuesRes.data.Data
                    } else {  
                        this.$message({
                            type: 'error',
                            message: `获取字段value属性失败,${valuesRes.data.Error}`
                        })  
                        return                                           
                    }

                    if ( keysRes && keysRes.data.State === REQ_OK ) {
                            this.fieldsKeysData = keysRes.data.Data

                            // 合并为一个数据
                            this.changeFieldsKeysData(this.fieldsKeysData.Children)                                            
                    } else { 
                        this.$message({
                            type: 'error',
                            message: `获取字段key属性失败,${keysRes.data.Error}`
                        })  
                        return                        
                    }


                }).catch(error => {
                    console.log("----error-----",error)
                    // window.alert(9090909090)
                }) 
            },
            _teamField( LogicMetaCode, MetaCode ){
                this.loading = true
                return teamField( LogicMetaCode, MetaCode ).then(res => {
                    this.loading = false
                    // console.log("---1-----",res)
                    if(res && res.data.State === REQ_OK){
                        this.fieldsKeysData = res.data.Data     
                        // 将数据缓存
                        this._save()
                        setStorage(`fieldsKeysData_${this.LogicMetaCode}`, JSON.stringify(this.fieldsKeysData))                
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取字段失败,${res.data.Error}`
                        })                          
                    }                    
                    return res
                })
            }, 
            _fieldValues ( LogicMetaCode, MetaCode, TenantId, RowNo ) {
                this.loading = true
                return fieldValues(LogicMetaCode, MetaCode, TenantId, RowNo).then(res => {
                    console.log("---2-----",res)
                    return res                       
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
            // 调取 字段属性  和 字段value相关属性后进行 处理成最终的数据
            changeFieldsKeysData(arr){
                if(arr && arr.length){
                    arr.forEach((item, key) => {
                        try {
                            if(this.fieldsValuesData.length){
                                this.fieldsValuesData.forEach((valueItem, index) => {
                                    if(item.MetaAttr.LogicMetaCode === valueItem.MetaCode){
                                        if(valueItem.Rows && valueItem.Rows.length){
                                            let length = valueItem.Rows.length 
                                            let newArrmap = []
                                            this.$set(item, 'rowsTotalAdd', length )
                                            console.log(`${item.MetaAttr.ShortName}(${item.MetaAttr.LogicMetaCode})的行数：`, length)
                                            for(let i = 0; i< length; i++ ) {
                                                // 克隆
                                                newArrmap.push({
                                                    RowNo: valueItem.Rows[i].RowNo,
                                                    fieldConfigs: deepCopyArr(item.Fields)
                                                })
                                            } 
                                            console.log("----克隆后的newArrmap---",newArrmap)
                                            console.log("---444---------",valueItem)
                                            // 将newArrmap 中添加 values的部分属性
                                            if(newArrmap && newArrmap.length){
                                                newArrmap.forEach((lineKey, lineNum) => {
                                                    if(lineKey.fieldConfigs && lineKey.fieldConfigs.length){                                                   
                                                        lineKey.fieldConfigs.forEach((fieldKeyArr, k) => {
                                                            // console.log("---fieldKeyArr----",fieldKeyArr)
                                                            // console.log(`--合并前valueItem.Rows[${k}]--`,valueItem.Rows[k])
                                                            let relatedVal = valueItem.Rows.filter((val, idx) => {
                                                                return val.RowNo === lineKey.RowNo
                                                            })
                                                            // console.log("-----------relatedVal----------", relatedVal) 
                                                            if(relatedVal && relatedVal.length) {
                                                                let fieldValuesArr = relatedVal[0].Values || []
                                                                let fieldValuesLength = relatedVal[0].Values.length
                                                                if(fieldValuesArr && fieldValuesLength){
                                                                    // 将对应的 属性value值合并到 对应field属性中
                                                                    for(let i = 0; i < fieldValuesLength; i++){
                                                                        if( fieldValuesArr[i].FieldCode === fieldKeyArr.FieldCode ) {
                                                                            // 找到对应的字段
                                                                            // 合并字段的属性
                                                                            Object.assign(fieldKeyArr, fieldValuesArr[i])
                                                                            this.$set( fieldKeyArr, "valuesAdd", fieldValuesArr[i] )
                                                                            this.$set( fieldKeyArr, "FieldValue", fieldValuesArr[i].FieldValue )
                                                                            break;
                                                                        }else {
                                                                            this.$set(fieldKeyArr, "FieldValue", null)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            console.log("--合并value后的结果--",fieldKeyArr)
                                                        })
                                                    }
                                                })





                                            }
                                            this.$set(item, 'addgao', newArrmap)                                        
                                        }else {
                                            this.$set(item, 'rowsTotalAdd', 0)
                                        }
                                    }
                                })
                            }else {
                                // 获取的 value值相关属性为空
                                this.$set(item, 'rowsTotalAdd', 0 )
                                this.$set(item, 'addgao', [])
                            }
                        } catch (error) {
                            
                        }
                        // 将 this.fieldsValuesData 缓存
                        setStorage(`fieldsKeysData_${this.LogicMetaCode}`, JSON.stringify(this.fieldsKeysData))
                    })
                }else {

                }
                this.loading = false
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
            save () {
                debugger
                let _this = this
                let result = []
                _this.fieldsKeysData.Children.forEach(item => {
                    let refForm = `ruleForm_${item.MetaAttr.LogicMetaCode}`
                    console.log(refForm)
                    result.push(checkFormArray(_this, refForm))
                })
            }
        }
    }
</script>
