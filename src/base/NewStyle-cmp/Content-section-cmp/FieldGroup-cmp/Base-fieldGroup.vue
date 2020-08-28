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
        分组组件
        comData: {{comData}}
        <el-row>
            <el-col :span="24">
                <el-card 
                    class="box-card-fieldGroup" 
                    :style="{'width': groupWidth}"
                >
                    <div slot="header" class="clearfix">
                        <span>字段分组组件</span>
                        <div class="uptextBox marginT10">
                            <div v-html="uptext"></div>
                        </div>
                        <div class="upBtnBox">
                            <el-button type="text">新增</el-button>
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">修改</el-button>
                            <el-button type="text">删除</el-button>
                        </div>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>  

                    <!-- <el-form 
                        v-for="(groupItem, key) in comsData.fieldGroup"
                        :key="key"
                        :model="groupItem" 
                        :ref="`ruleForm_${groupItem.groupCode}`" 
                        label-width="100px" 
                        class="line-bottom-dotted marginT20"
                        >

                        <div 
                            class="name"
                            :style="groupItemNameStyle"
                        >
                            {{groupItem.groupName}}
                        </div>

                        <div 
                            class="groupItemWrap u-f-jst"
                            v-for="(field, index) in groupItem.Fields"
                            :key="index"
                        >
                            <div
                                class="value"
                                :style="fieldWrapStyle"
                            >
                                <component 
                                    :is="currentFieldComponent( field.controlType )"
                                    :isNeedCheck = 'true'
                                    :prop="'Fields.'+ index + '.FieldValue'"
                                    :obj.sync="field"
                                    :isTitle="field.isTitle"
                                >
                                </component> 
                            </div>
                        </div>
                    </el-form> -->

                    <div class="downBtnBox marginT20">
                        <el-button type="text">新增</el-button>
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">修改</el-button>                        
                    </div>
                    <!-- <save-footer @save="save"></save-footer> -->
                </el-card>
            </el-col> 
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { checkFormArray } from '@/utils/newStyleFieldValidate'
    export default {
        mixins: [ fieldGroupControlTypeMixin ],
        components: {
            SaveFooter
        },
        props: {
            comsData: {
                fieldGroup: {
                    type: Array,
                    default: [
                        {
                            groupName: '分组1',
                            groupCode: 'team1',
                            Fields: [
                                {
                                    controlType: "1",
                                    FieldName: "字段1",
                                    FieldValue: "ceshi",
                                    Hidden: false,
                                    Tips: '这是tips内容',
                                    isTitle: true,
                                    Required: true
                                },
                                {
                                    controlType: "5",
                                    FieldName: "字段2",
                                    FieldValue: "ceshi",
                                    Hidden: false,
                                    Tips: '这是tips内容',
                                    isTitle: true,
                                    Required: false                                   
                                }
                            ]
                        },
                        {
                            groupName: '分组2',
                            groupCode: 'team2',
                            Fields: [
                                {
                                    controlType: "1",
                                    FieldName: "字段2",
                                    FieldValue: "test",
                                    Hidden: false,
                                    Tips: '999999999',
                                    isTitle: true,
                                    Required: false     
                                }
                            ]
                        },                        
                    ]
                },
            },
            comData: {
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
            }
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
