<!--
  User: gaol
  Date: 2019/8/06
  功能：分组 组件  CombineType 为   0030303
-->
<style lang="stylus" rel="stylesheet/stylus">
</style>

<template>
    <div class="fieldGroup-cmp-wrap">
        <!-- comsData.fieldGroup: {{comsData.fieldGroup}} -->
        分组组件comsData: {{comsData}}
        <el-row>
            <el-col :span="24">
                <el-card 
                    class="box-card-fieldGroup" 
                    :style="{'width': groupWidth}"
                    v-for="(com, key) in comsData"
                    :key="key"
                >
                    <div slot="header" class="clearfix">
                        <span>{{com.MetaAttr && com.MetaAttr.ShortName}}</span>
                        <!-- <div class="upBtnBox">
                            <el-button type="text">新增</el-button>
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">修改</el-button>
                            <el-button type="text">删除</el-button>
                        </div> -->
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>  



                        <!----引用分组字段的组件----->
                        <field-group-item
                            :ref="`field_${com.MetaAttr.LogicMetaCode}`"
                            :fieldItemObj="com"
                            :MetaCode = "com.MetaCode"
                        >
                        </field-group-item>
                </el-card>
            </el-col> 
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    // import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import FieldGroupItem from './Base-fieldGroupItem'
    import { checkFormArray } from '@/utils/newStyleFieldValidate'
    export default {
        // mixins: [ fieldGroupControlTypeMixin ],
        components: {
            SaveFooter,
            FieldGroupItem
        },
        props: {
            comsData: {
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
            isTitle: {
                type: Boolean,
                default: true
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
            ruleForm: {

            }
        }
        },
        created () {

        },
        beforeDestroy () {
        // 销毁
        },
        methods: {        
            save () {
                let _this = this
                let result = []
                _this.comsData.fieldGroup.forEach(item => {
                    let refForm = `ruleForm_${item.groupCode}`
                    console.log(refForm)
                    result.push(checkFormArray(_this, refForm))
                })
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
