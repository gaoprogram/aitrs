<!--
  User: gaol
  Date: 2019/8/06
  功能：分组 组件  controlType 为
-->

<template>
    <div class="comsData.fieldGroup-cmp-wrap">
        <!-- comsData.fieldGroup: {{comsData.fieldGroup}} -->
        <el-row>
            <el-col :span="24">
                <el-card 
                    class="box-card-comsData.fieldGroup" 
                    :style="{'width': groupWidth}"
                >
                    <div slot="header" class="clearfix">
                        <span>字段分组组件</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>                    
                    <el-form 
                        v-for="(groupItem, key) in comsData.fieldGroup"
                        :key="key"
                        :model="ruleForm" 
                        :ref="`ruleForm_${groupItem.groupName}`" 
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
                            <!-- field： {{field}} -->
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
                    </el-form>
                </el-card>
            </el-col> 
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
 import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
//   import { componentsControlTypeMixin } from '@/utils/newStyleMixins-com.js'

  export default {
    mixins: [ fieldGroupControlTypeMixin ],
    props: {
        comsData: {
            fieldGroup: {
                type: Array,
                default: [
                    {
                        groupName: '分组1',
                        Fields: [
                            {
                                controlType: "1",
                                FieldName: "字段1",
                                fieldValue: "ceshi",
                                Hidden: false,
                                Tips: '这是tips内容',
                                isTitle: true
                            },
                            {
                                controlType: "5",
                                FieldName: "字段2",
                                fieldValue: "ceshi",
                                Hidden: false,
                                Tips: '这是tips内容',
                                isTitle: true                                    
                            }
                        ]
                    },
                    {
                        groupName: '分组2',
                        Fields: [
                            {
                                controlType: "1",
                                FieldName: "字段2",
                                fieldValue: "test",
                                Hidden: false,
                                Tips: '999999999',
                                isTitle: true
                            }
                        ]
                    },                        
                ]
            },
        },
        isTitle: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        groupWidth(){
            return '100%'
        },
        groupItemNameStyle () {
            return `color:"red"`
        },
        fieldWrapStyle(){
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
    methods: {},
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

<style lang="stylus" rel="stylesheet/stylus">
</style>
