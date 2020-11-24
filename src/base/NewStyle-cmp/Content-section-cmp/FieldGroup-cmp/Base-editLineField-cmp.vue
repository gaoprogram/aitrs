<!--
  User: gaol
  Date: 2019/5/14
  功能： 分组组件中 编辑 单行的组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .lineFieldsWrap {
        >>>.el-form-item {
            min-width: 150px;
            margin:5px;                    
        }
    }
</style>

<template>
    <el-row class="editLineField" v-loading="loading">
        <el-col :span="columnNum">   
            formObj： {{formObj}}
            <!-- --- -->
            <!-- formFieldsObj： {{formFieldsObj}} -->
            <el-form :model="lineFieldForm" :ref="`${formObj.MetaAttr.LogicMetaCode}`">
                <!-- row.formFieldsObj: {{row.Values}} -->
                <div 
                    :class="['lineFieldsWrap', 'u-f-jst', 'u-f-wrap']"
                >                
                    <component 
                        class="animated fadeInDown"
                        v-for="(field, index) in formFieldsObj.Values"
                        :key="index"    
                        :style="fieldWrapStyle"                        
                        :is="currentFieldComponent( field.ControlType )"
                        :prop="`Values.` + index + '.field'"
                        :isNeedCheck = 'true'
                        :viewType = "viewType"                        
                        :obj.sync = "field"
                        :isTitle = "true"
                        :isShowing = "false"
                    >
                    </component>    
                </div>              
            </el-form>
            <save-footer @save="saveFieldGroup" @cancel="cancelFieldGroup" :saveText="saveText" :cancelText="cancelText"></save-footer>
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    // import { deepCopyArr } from '@/utils/clone'
    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        saveTeamFieldValues,
    } from '@/api/newStyle.js'  
  // 底部保存组件
  export default {
    name: 'FieldEditLineCmp',
    mixins: [ fieldGroupControlTypeMixin ],
    components: {
        SaveFooter
    },
    props: {
        columnNum: {
            type: [String, Number],
            default: () => {
                return 24
            }
        },
        saveText: {
            type: String,
            default: () => {
                return '确定'
            }
        },
        cancelText: {
            type: String,
            default: () => {
                return '取消'
            }
        },
        formObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        formFieldsObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 是否是直接显示 还是 新增或者编辑 这个决定了 此字段组件 在不同视图场景下的正确权限显示
        viewType: {
            type: String,
            default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
        },      
    },
    computed:{
        fieldWrapStyle () {
            return `width: 45%`  // 一行可以显示2 列
        }  
    },
    data(){
        return {
            loading: false,
            lineFieldForm: this.formFieldsObj
        }
    },
    created(){
        
    },
    methods: {
        // 保存 所有分组的字段
        saveTeamFieldValues(PersonId, dataObj){
            debugger
            // 需要触发 fieldGroupItem 组件中的 loading
            this.loading = true
            let Data = dataObj
            saveTeamFieldValues( 1, Data ).then(res => {
                debugger
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message({
                        type: 'success',
                        message: `保存成功`
                    })
                    // 关闭弹窗
                    // this.closeComDialog()
                    // 触发 fieldGroupItem 组件重新获取数据
                    // console.log(this.currentLogicMetaCode)
                    // console.log(this.$refs[`group_${this.currentLogicMetaCode}`])
                    // 刷新分组组件 获取最新数据
                    // this._teamFieldValue( 1, this.currentLogicMetaCode, this.currentMetaCode, 0, this.dialogTypeStr )
                    // 触发 base-fieldGroup组件刷新
                    this.$emit("editSaveSucess", this.formObj)
                }else {
                    this.$message({
                        type: 'error',
                        message: `保存失败,${res.data.Error}`
                    })

                }
            })
        },  
        saveFieldGroup () {
            this.$refs[`${this.formObj.MetaAttr.LogicMetaCode}`].validate(valid => {
                if(valid) {
                    // 验证pass
                    this.saveTeamFieldValues(1, this.formObj)
                }else {
                    // 验证fail
                }
            })
        },
        cancelFieldGroup () {
            this.$emit("emitCancel")
        }
    }
  }
</script>
