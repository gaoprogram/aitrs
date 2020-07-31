<!--
  User: gaol
  Date: 2019/8/06
  功能：分组 组件  controlType 为
-->

<template>
    <div class="fieldGroup-cmp-wrap">
        fieldGroup: {{fieldGroup}}
        <el-row>
            <el-col :span="24">
                <el-card 
                    class="box-card-fieldGroup" 
                    :style="{'width': groupWidth}"
                >
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>                    
                    <el-form 
                        v-for="(groupItem, key) in fieldGroup"
                        :key="key"
                        :model="ruleForm" 
                        :ref="`ruleForm_${groupItem.groupName}`" 
                        label-width="100px" 
                        >

                        <div 
                            class="groupItemWrap u-f-jst"
                            v-for="(field, index) in groupItem.Fields"
                            :key="index"
                        >
                            <div 
                                class="name"
                                :style="groupItemNameStyle"
                            >
                                {{groupItem.groupName}}
                            </div>
                            <div
                                class="value"
                                :style="fieldWrapStyle"
                            >
                                <component 
                                    :is="currentFieldComponent( field.ControlType )"
                                    :isNeedCheck = 'true'
                                    :prop="'Fields.'+ index + '.FieldValue'"
                                    :obj.sync="field"
                                    :isTitle="false"
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
 import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins.js'
  export default {
    mixins: [ fieldGroupControlTypeMixin ],
    props: {
      fieldGroup: {
        type: Array,
        default: []
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
