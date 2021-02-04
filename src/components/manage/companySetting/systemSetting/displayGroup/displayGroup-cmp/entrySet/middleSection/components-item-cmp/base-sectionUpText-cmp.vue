/
* Author: gaol
* Date: 2020/10/30
* Desc：UpText 显示区 
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <el-row class="base-UpText-cmp">
        <el-col 
            :span="showWith" 
            class="topWrap"
        >
            <component
                v-for="(field, key) in showfFields"
                :key="key"
                :is="currentFieldComponent(field.controlType)" 
            >
            </component>

            <el-button 
                type="text" 
                size="mini"
                style="color: #8c8c8c;font-size: 12px"
            >
                {{fieldExplain}}
            </el-button>
        </el-col>
    </el-row>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { 
        
    } from '@/api/newStyleConfig'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'
    import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    export default {
        mixin: [ fieldGroupControlTypeMixin ],
        props: {
            showfFields: {
                type: Array,
                default: () => {
                    return [
                        {
                            ControlType:1,
                            ControlName: '单行文本输入框', 
                            ControlEnName: 'BaseInput', 
                            checked: false
                        },
                        {
                            ControlType:2,
                            ControlName: '多行文本输入框', 
                            ControlEnName: 'TextareaInput', 
                            checked: false
                        },
                        {
                            ControlType:3,
                            ControlName: '数字输入框', 
                            ControlEnName: 'NumInput', 
                            checked: false
                        },
                        {
                            ControlType:4,
                            ControlName: '金额输入框', 
                            ControlEnName: 'MoneyInput', 
                            checked: false
                        },
                        {
                            ControlType:5,
                            ControlName: '单选下拉框', 
                            ControlEnName: 'BaseSelect', 
                            checked: false
                        },
                        {
                            ControlType:6,
                            ControlName: '多选下拉框', 
                            ControlEnName: 'MultipleSelect', 
                            checked: false
                        },
                        {
                            ControlType:7,
                            ControlName: '时间——年月日', 
                            ControlEnName: 'BaseDate', 
                            checked: false
                        },
                        {
                            ControlType:8,
                            ControlName: '时间区间', 
                            ControlEnName: 'RangeDate', 
                            checked: false
                        },
                        {
                            ControlType:9,
                            ControlName: '时分', 
                            ControlEnName: 'TimeDate', 
                            checked: false
                        },
                        {
                            ControlType:10,
                            ControlName: '月份', 
                            ControlEnName: 'MonthSelect', 
                            checked: false
                        },
                        {
                            ControlType:11,
                            ControlName: 'switch 选择器', 
                            ControlEnName: 'BaseSwitch', 
                            checked: false
                        },   
                        {
                            ControlType:12,
                            ControlName: '单选radio', 
                            ControlEnName: 'BaseRadio', 
                            checked: false
                        },
                        {
                            ControlType:13,
                            ControlName: '多选chekbox', 
                            ControlEnName: 'BaseCheckbox', 
                            checked: false
                        },
                        {
                            ControlType:14,
                            ControlName: '图片', 
                            ControlEnName: 'BaseImgUpload', 
                            checked: false
                        },
                        {
                            ControlType:15,
                            ControlName: '附件', 
                            ControlEnName: 'BaseFileUpload', 
                            checked: false
                        },
                        {
                            ControlType:16,
                            ControlName: '计算公式', 
                            ControlEnName: 'BaseCalculate', 
                            checked: false
                        },
                        {
                            ControlType:19,
                            ControlName: '人员选择器', 
                            ControlEnName: 'BaseEmpSelect', 
                            checked: false
                        },                        
                        {
                            ControlType:20,
                            ControlName: '组织选择器', 
                            ControlEnName: 'BaseOrgSelect', 
                            checked: false
                        },
                        {
                            ControlType:21,
                            ControlName: '组织和人员选择器', 
                            ControlEnName: 'OrgAndEmpSelect', 
                            checked: false
                        },                        
                        {
                            ControlType:22,
                            ControlName: '地图', 
                            ControlEnName: 'BaseMapSelect', 
                            checked: false
                        },
                        {
                            ControlType:23,
                            ControlName: '富文本编辑器', 
                            ControlEnName: 'BaseEditor', 
                            checked: false
                        },
                        {
                            ControlType:24,
                            ControlName: '说明', 
                            ControlEnName: 'BaseExplain', 
                            checked: false
                        },
                        {
                            ControlType:27,
                            ControlName: '省市区', 
                            ControlEnName: 'BaseProvinces', 
                            checked: false
                        },
                        {
                            ControlType:28,
                            ControlName: '字段选择器', 
                            ControlEnName: 'BaseFieldSelect', 
                            checked: false
                        },
                        {
                            ControlType:29,
                            ControlName: '字段设置器', 
                            ControlEnName: 'BaseFieldSet', 
                            checked: false
                        },
                        {
                            ControlType:30,
                            ControlName: '页面跳转字段', 
                            ControlEnName: 'BasePageLinkField', 
                            checked: false
                        },
                        {
                            ControlType:31,
                            ControlName: '数字区间', 
                            ControlEnName: 'RangeNum', 
                            checked: false
                        },
                        {
                            ControlType:32,
                            ControlName: '是否下拉选择', 
                            ControlEnName: 'BaseSwitchSelect', 
                            checked: false
                        },                                                                                                                 
                    ]
                }
            },
            showWith: {
                type: [Number, String],
                default: () => {
                    return 24
                }
            },
            placeholder: {
                type: String,
                default: () => {
                    return '请输入'
                }                
            },
            fieldExplain: {
                type: String,
                default: () => {
                    return '这是字段说明~'
                }
            }
        },
        components: {

        },
        data(){
            return {
            }
        },
        created(){
            
        },
        methods: {

        }
    }
</script>
