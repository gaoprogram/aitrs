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
        fieldsKeysData: {{fieldsKeysData}}
        --------------------------
        fieldsValuesData: {{fieldsValuesData}}
        <el-row>
            <el-col :span="24">
                <el-form 
                    v-for="(groupItem, key) in fieldsKeysData.Children"
                    :key="key"
                    :model="groupItem" 
                    :ref="`ruleForm_${groupItem.MetaAttr.LogicMetaCode}`" 
                    :class="[fieldsKeysData.Children && fieldsKeysData.Children.length>1 ?'line-bottom-dotted': '', 'marginT20', `ruleForm_${groupItem.MetaAttr.LogicMetaCode}`] "
                    >
                    <!-- currentFieldComponent( groupItem.Fields[0].ControlType ): {{currentFieldComponent( groupItem.Fields[0].ControlType )}} -->
                    rowsTotal: {{rowsTotal}}
                    <div v-if="hasMoreLineData(groupItem)">
                        <i class="lt el-icon-caret-left"  @click="handlerLeftBtn(groupItem)"></i>
                        <i class="rt el-icon-caret-right" @click="handlerRightBtn(groupItem)"></i>
                    </div> 

                    <div>一级分组的logincMetaCode: {{groupItem.MetaAttr.LogicMetaCode}}</div>
                    <div 
                        class="groupItemWrap u-f-ac u-f-wrap"
                    >
                        <div 
                            :class="[
                                'fieldItemWrap', 
                                'u-f-ac', 
                                'u-f-jst', 
                                'u-f-wrap', 
                            ]"
                            v-for="(field, index) in groupItem.Fields"
                            :key="index"
                        >
                            <!-- <component 
                                :is="currentFieldComponent( field.ControlType )"
                                :isNeedCheck = 'true'
                                :prop = "'Fields.'+ index + '.DefaultValue'"
                                :obj.sync = "field"
                                :isTitle = "true"
                                :isShowing = "false"
                            >
                            </component>  -->
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
                    console.log("---------------------", keysRes, valuesRes )
                    if (valuesRes && valuesRes.data.State === REQ_OK) {
                        if( valuesRes && valuesRes.data.State === REQ_OK ) {
                            this.fieldsValuesData = valuesRes.data.Data
                            // this.rowsTotal = this.fieldsValuesData.length 
                            // 处理数据()
                        }else {
                            this.$message.success({
                                type: 'warning',
                                message: `${valuesRes.data.Error}`
                            })                        
                        } 
                    } else {     
                        return                                           
                    }

                    // window.alert(this.rowsTotal)

                    if ( keysRes && keysRes.data.State === REQ_OK ) {
                        if( keysRes && keysRes.data.State === REQ_OK ) {
                            this.fieldsKeysData = keysRes.data.Data

                            // 合并为一个数据
                            this._changeData()                            
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
                    window.alert(9090909090)
                }) 
            },
            _teamField( TeamCode ){
                this.loading = true
                return teamField( TeamCode ).then(res => {
                    this.loading = false
                    // if( res && res.data.State === REQ_OK ) {
                    //     this.fieldsKeysData = res.data.Data
                    // }else {
                    //     this.$message.success({
                    //         type: 'warning',
                    //         message: `${res.data.Error}`
                    //     })                        
                    // }
                    return res
                })
            }, 
            _fieldValues ( TeamCode, TenantId, RowNo ) {
                return fieldValues(TeamCode, TenantId, RowNo).then(res => {
                    // if( res && res.data.State === REQ_OK ) {
                    //     this.fieldsValuesData = res.data.Data
                    //     this.rowsTotal = this.fieldsValuesData.length 
                    // }else {
                    //     this.$message.success({
                    //         type: 'warning',
                    //         message: `${res.data.Error}`
                    //     })                        
                    // } 
                    return res                       
                })
            },
            // 判断该分组中是否有多行数据
            hasMoreLineData (groupItem) {
                let currentLogicMetaCode = groupItem.MetaAttr.LogicMetaCode || ''
                
            },            
            _changeData () {
                debugger
                // window.alert(this.rowsTotal)
                // let length = this.rowsTotal
                // let arr = []
                // console.log("-----fieldsKeysData--------",this.fieldsKeysData)

                // console.log("-------------",this.fieldsKeysData.Children.Fields)
                // if(length >0){
                //     for(let i = 0; i< length; i++ ) {
                //         arr = arr.concat(JSON.parse(JSON.stringify(this.fieldsKeysData.Children.Fields)))
                //     }
                //     console.log("--------908989-------", arr)
                // }
                // this.fieldsKeysData.Children.Fields = arr
                this.fieldsKeysData.Children.forEach((groupitem, key) => {
                    let LogicMetaCode = groupitem.MetaAttr.LogicMetaCode
                    let currentValues = this.fieldsValuesData.map((item, index) => {
                        if(item.TeamCode == LogicMetaCode) {
                            this.$set(groupitem, 'FieldsValuesAdd', item)
                            this.$set(groupitem, 'RowsDataAdd', item.Rows)
                            // 将 groupitem中的Fields 里面的每个对象
                        }
                    })
                })

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
