<!--
  User: gaol
  Date: 2019/10/25
  功能： 员工详情中 【离职】按钮弹框中的 字段显示组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.edit-groupfield-cmp
    width 100%
    min-height 200px
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-around
    align-items flex-start
    align-content flex-start
    .card-box
        max-height 400px
        overflow auto
        .el-form
            .listItemBox
                // width 48%
                margin 5px
                display flex
                flex-direction row
                justify-content flex-start
                flex-wrap wrap
                align-items flex-start
                .listItem
                    width 33%
                    padding 5px
                    box-sizing border-box
                    flex-grow 1
                    .itemBox 
                        display flex
                        justify-content flex-start
                        align-items flex-start
                        padding 5px 
                        box-sizing border-box-sizing 
                        .name
                            padding 13px 5px 0 0
                            font-weight bold
                            color #606266
                            box-sizing border-box
                        .value
                            color #909399
                    &:after
                        display block
                        content ''
                        width 100%
                        height 1px
                        background-color #EBEEF5
                        .name 
                        .value
                            color red
</style>
<template>
    <div :class="['edit-groupfield-cmp', 'animated', 'fadeIn', groupFieldData.FieldValueSet.length<=0? 'not_found': '']"  v-loading="loading">
        <!-- groupFieldData: {{groupFieldData}} -->
        <!-- ----- -->
        <!-- isAddField: {{isAddField}} -->
        <el-card class="card-box">
            <!--字段field部分-start-->
            <el-form 
                class="el-form"
                ref="fieldForm"
                :model="groupFieldData"
            >
                <div class="listItemBox">
                    <!-- groupFieldData: {{groupFieldData}} -->
                    <div 
                        class="listItem"
                        v-if="groupFieldData.FieldValueSet && groupFieldData.FieldValueSet.length" 
                        v-for="(field, index) in groupFieldData.FieldValueSet" :key="field.Id"
                    >
                        <!-- <h1 class="title">{{field.title}}</h1> -->
                        <div class="itemBox">
                                <!-- field: {{field}} -->
                                <!-- --- -->
                                <!-- isAddField: {{isAddField}} -->
                                <!-- field.Config.ControlType: {{field['Config']['ControlType']}} -->

                                <!-- field.ControlType: {{field.Config.ControlType}} -->
                            <span class="name">{{field.FieldName}}:</span>
                            <!--非新增编辑分组的value显示----start--->
                            <span class="value" v-if="!isAddField">{{field.FieldLabel}}</span>
                            <!--非新增编辑分组的value显示----end--->

                            <!---新增编辑分组的value显示-start--->
                            <span class="value" v-else>
                                 <!-- PAcurrentComponent(field.ControlType): {{PAcurrentComponent(5)}} -->
                                <!-- -------  -->
                                <!-- field: {{field}} -->
                                <component 
                                :is="PAcurrentComponent(field.Config.ControlType)"
                                :isNeedCheck = 'true'
                                :prop="'FieldValueSet.'+ index + '.FieldValue'"
                                :obj.sync="field"
                                :isTitle="false"
                                >
                                </component>
                            </span>
                            <!---新增编辑分组的value显示-end--->
                        </div>
                    </div>
                </div>
            </el-form>                    
            <!---字段field部分---end--->
        </el-card>  
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { saveLeaveJobFieldList } from '@/api/employee'
    import { PaControlAndRuleMixin } from '@/utils/PA-mixins'
    export default {
        mixins:[ PaControlAndRuleMixin ],
        props: {
            // 是否是新增或者编辑field
            isAddField: {
                type: Boolean,
                default: false
            },
            groupFieldData: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            SaveFooter
        },
        data(){
            return {
                loading: false,  // 控制loading 显示隐藏
            }
        },
        created() {
            debugger
            // 锚点定位
            // this.$bus.$on("anchorPoint", (dom) => {
            //     if(dom){
            //         // 锚点跳转
            //         this._gotoScrollView(dom)
            //     }
            // })
        },
        beforeDestroy(){
            // this.$bus.$off("anchorPoint")
        },
        watch: {
            groupFieldData(newValue, oldValue){
                this.$emit("update:groupFieldData", newValue)
            }
        },
        methods: {
            // 锚点定位到目标元素
            _gotoScrollView(dom){
                debugger
                let domId = `#teamItem_${dom}`
                console.log("----锚点定位到----：", domId)
                debugger
                // document.querySelectorAll('#teamItem_PWORKHIS')[0].scrollIntoView()                    
                try {
                    document.querySelectorAll(domId)[0].scrollIntoView()                    
                } catch (error) {
                    console.log("------锚点定位报错了-----")
                }
            },
            // 提交验证
            submitForm () {
                debugger
                this.$refs.fieldForm.validate((valid) => {
                    debugger
                    if(valid){
                        // 验证通过触发父组件
                        this.$emit('isSubmit',["subject",true])
                    }else {
                        // 验证失败
                        this.$emit('isSubmit',["subject",false])
                        return false
                    }
                })
            },
            //根据 teamCode 获取field 字段完整的属性（包含 controlType 属性，用于 编辑字段时用到）
            _getTeamCodeField(){
                
            },
        }
    }
</script>
