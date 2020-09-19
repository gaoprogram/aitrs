<!--
  User: gaol
  Date: 2019/8/06
  功能：分组 组件里面的 字段包裹组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.fields-wrap-cmp {
    min-height: 150px;
    .groupItemWrap {
        .fieldItemWrap {
            min-height: 150px;
            .fieldItemWrap {
                min-width: 160px;
                margin: 5px;
            }
        }
    }
}
</style>

<template>
    <div class="fields-wrap-cmp" v-loading="loading">
        <!-- comsData.fieldGroup: {{comsData.fieldGroup}} -->
        <!-- 字段包裹组件： fieldItemObj： {{fieldItemObj}}
        ------
        MetaCode: {{MetaCode}}
        -------
        获取接口的字段数据：fieldsKeysData: {{fieldsKeysData}} -->
        <!-- fieldsKeysData: {{fieldsKeysData}}
        --------------------------
        fieldsValuesData: {{fieldsValuesData}} -->
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

                    <!-- <div v-if="groupItem.rowsTotalAdd>1">
                        <i class="lt el-icon-caret-left"  @click="handlerLeftBtn(groupItem)"></i>
                        <i class="rt el-icon-caret-right" @click="handlerRightBtn(groupItem)"></i>
                    </div>  -->

                    <div>一级分组的logincMetaCode: {{groupItem.MetaAttr.LogicMetaCode}}</div>
                    <div 
                        class="groupItemWrap u-f-ac u-f-wrap"
                        v-for="(row,idx) in groupItem.addgao"
                        :key="idx"
                    >
                        <div 
                            :class="[
                                'fieldItemWrap', 
                                'u-f-ac', 
                                'u-f-jst', 
                                'u-f-wrap', 
                            ]"
                            v-for="(field, index) in row"
                            :key="index"
                        >
                             <component 
                                :is="currentFieldComponent( field.ControlType )"
                                :isNeedCheck = 'true'
                                :prop = "'addgao.'+ index + '.DefaultValue'"
                                :obj.sync = "field"
                                :isTitle = "true"
                                :isShowing = "false"
                            >
                            </component>  
                        </div>
                    </div>                     
                    <save-footer @save="save"></save-footer>                            
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
    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        teamField,
        fieldValues
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
                fieldsValuesData: [],
                rowsTotal: 0,  // 有多少行数据
                fieldsData: [], // 处理后最终的 fieldsData
                ruleForm: {

                }
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
            // 获取 分组字段名称集合 和 字段value集合
            this._getTeamFieldInfo()
            // this._teamField(this.MetaCode)
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
                Promise.all([this._teamField( this.MetaCode ), this._fieldValues( this.MetaCode, 1 , 0 )])
                .then(([keysRes, valuesRes]) => {
                    // console.log("---------------------", keysRes, valuesRes )
                    if (valuesRes && valuesRes.data.State === REQ_OK) {
                        if( valuesRes && valuesRes.data.State === REQ_OK ) {
                            this.fieldsValuesData = valuesRes.data.Data
                            // this.rowsTotal = this.fieldsValuesData.length 

                        }else {
                            this.$message.success({
                                type: 'warning',
                                message: `${valuesRes.data.Error}`
                            })                        
                        } 
                    } else {     
                        return                                           
                    }

                    if ( keysRes && keysRes.data.State === REQ_OK ) {
                        if( keysRes && keysRes.data.State === REQ_OK ) {
                            this.fieldsKeysData = keysRes.data.Data

                            // 合并为一个数据
                            this.changeFieldsKeysData(this.fieldsKeysData.Children)                           
                        }else {
                            this.$message.success({
                                type: 'warning',
                                message: `${keysRes.data.Error}`
                            })                        
                        }                        
                    } else { 
                        return                        
                    }


                }).catch(error => {
                    console.log("----error-----",error)
                    // window.alert(9090909090)
                }) 
            },
            _teamField( TeamCode ){
                this.loading = true
                return teamField( TeamCode ).then(res => {
                    this.loading = false
                    return res
                })
            }, 
            _fieldValues ( TeamCode, TenantId, RowNo ) {
                return fieldValues(TeamCode, TenantId, RowNo).then(res => {
                    return res                       
                })
            },
            // 判断该分组中是否有多行数据
            hasMoreLineData (groupItem) {
                let currentLogicMetaCode = groupItem.MetaAttr.LogicMetaCode || ''
                
            }, 
            changeFieldsKeysData(arr){
                if(arr && arr.length){
                    arr.forEach((item, key) => {
                        try {
                            this.fieldsValuesData.forEach((valueItem, index) => {
                                if(item.MetaAttr.LogicMetaCode === valueItem.TeamCode){
                                    if(valueItem.Rows && valueItem.Rows.length){
                                        let length = valueItem.Rows.length
                                        let newArrmap = []
                                        this.$set(item, 'rowsTotalAdd', length )
                                        console.log(`${item.MetaAttr.ShortName}(${item.MetaAttr.LogicMetaCode})的行数：`, length)
                                        for(let i = 0; i< length; i++ ) {
                                            // 克隆
                                            newArrmap.push(deepCopyArr(item.Fields))
                                        } 
                                        console.log("----克隆后的newArrmap---",newArrmap)
                                        // 将newArrmap 中添加 values的部分属性
                                        if(newArrmap && newArrmap.length){
                                            newArrmap.forEach((m, k) => {
                                                // console.log("--------------m-", m)
                                                if(m && m.length){
                                                    // console.log("---dddd---------",m)
                                                    m.forEach((a, num) => {
                                                        // 将行号合并到 属性中
                                                        // Object.assign(a, valueItem.Rows[K].RowNo)
                                                        // console.log("---333---------",a)
                                                        // console.log("---k----",k)
                                                        // console.log("valueItem.Rows[K].RowNo:",valueItem.Rows[k].RowNo)
                                                        this.$set(a, "RowNoAdd", valueItem.Rows[k].RowNo)
                                                        this.$set(a, "RowNo", valueItem.Rows[k].RowNo)
                                                        // console.log("---444---------",a)

                                                        console.log(`--合并前valueItem.Rows[${k}]--`,valueItem.Rows[k])
                                                        let fieldValuesArr = valueItem.Rows[k].Values || []
                                                        let fieldValuesLength = valueItem.Rows[k].Values.length
                                                        if(fieldValuesArr && fieldValuesLength){
                                                            // 将对应的 属性value值合并到 对应field属性中
                                                            for(let i = 0; i < fieldValuesLength; i++){
                                                                if(fieldValuesArr[i].FieldCode === a.FieldCode) {
                                                                    // 找到对应的字段
                                                                    // Object.assign(a, fieldValuesArr[i])
                                                                    this.$set(a, "valuesAdd", fieldValuesArr[i])
                                                                    this.$set(a, "FieldValue", fieldValuesArr[i].FieldValue)
                                                                    break;
                                                                }else {
                                                                    this.$set(a, "FieldValue", null)
                                                                }
                                                            }
                                                        }
                                                        // Object.assign(a, valueItem.Rows[k])

                                                        console.log("--合并value后的结果--",a)
                                                    })
                                                }
                                            })
                                        }
                                        this.$set(item, 'addgao', newArrmap)                                        
                                    }else {
                                        this.$set(item, 'rowsTotalAdd',  0)
                                    }
                                }
                            })
                        } catch (error) {
                            
                        }
                    })
                }
            },        
            // 查看上一条
            handlerLeftBtn(team){
                debugger

            },
            // 查看下一条
            handlerRightBtn(team){
                debugger
            },                                          
            save () {
                debugger
                let _this = this
                let result = []
                _this.fieldsData.Children.forEach(item => {
                    let refForm = `ruleForm_${item.MetaAttr.LogicMetaCode}`
                    console.log(refForm)
                    result.push(checkFormArray(_this, refForm))
                })
            }
        }
    }
</script>
