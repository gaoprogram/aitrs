<!--
  User: gaol
  Date: 2019/9/25
  功能： 基础分组 field 信息组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.basic-groupfield-cmp
    width 100%
    min-height 100px
    // display flex
    // flex-direction column
    // flex-wrap wrap
    // justify-content space-between
    // align-items flex-start
    // align-content space-between
    .list
        position relative
        width 100%
        margin-bottom 10px
        .addNewGroupBox
            position absolute
            top 10px 
            right 50px
            &:hover 
                cursor pointer
                color #409EFF
        .leftRightBox
            position absolute
            top 10px
            right 10px
            .lt
                font-size 16px
                &:hover 
                    cursor pointer
                    color #409EFF
            .rt
                font-size 16px
                &:hover
                    cursor pointer
                    color #409EFF
        .scanEditLog
            position absolute 
            top 10px 
            right 80px
        .listItemBox
            display flex
            flex-direction row
            justify-content flex-start
            flex-wrap wrap
            align-items flex-start
            .listItem
                width 48%
                padding 5px
                box-sizing border-box
                flex-grow 1
                .itemBox 
                    padding 5px 
                    box-sizing border-box-sizing 
                    .name
                        font-weight bold
                        color #606266
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
    <div :class="['basic-groupfield-cmp', groupFieldData.length<=0? 'not_found': '']"  v-loading="loading">
        <!-- groupFieldData: {{groupFieldData}} -->
        isAddField: {{isAddField}}
        <div class="list">
            
            <!--增加分组区--start--->
            <div class="addNewGroupBox" v-if="!isAddField">
                <!-- <el-button icon="el-icon-plus"></el-button> -->
                <i class="el-icon-circle-plus-outline" @click= "clickAddNewGroup"></i>
            </div>
            <!----增加分组区----end--->

            <!--左右查看历史版本箭头区--start--->
            <div class="leftRightBox" v-show="!isAddField && groupFieldData.length>0">
                <i class="lt el-icon-caret-left"></i>
                <i class="rt el-icon-caret-right"></i>
            </div>
            <!--左右查看历史版本箭头区--end--->

            <!--查看操作记录---start-->
            <div class="scanEditLog">
                <!-- <el-button type="primary" sizi="mini" @click.native="scanEditLog">查看记录</el-button> -->
            </div>
            <!---查看操作记录--end-->

            <!--field分组区form区--start--->
            <el-form  ref="fieldForm" label-width="150px" class="field_form">
                <div class="listItemBox">
                <!-- <div v-for="(listItem,i) in groupFieldData" :key="i"> -->
                    <div 
                        class="listItem"
                        v-if="groupFieldData && groupFieldData.length" 
                        v-for="(field, key) in groupFieldData" :key="field.TeamCode + key"
                    >
                        <!-- <h1 class="title">{{field.title}}</h1> -->
                        <div class="itemBox">
                            <span class="name">{{field.FieldName}}:</span>
                            <!--非新增编辑分组的value显示----start--->
                            <span class="value" v-if="!isAddField">{{field.FieldCode}}</span>
                            <!--非新增编辑分组的value显示----end--->

                            <!---新增编辑分组的value显示-start--->
                            <span v-else>
                                PAcurrentComponent(field.ControlType): {{PAcurrentComponent(5)}}
                                field.ControlType: {{field.ControlType}}
                                <component 
                                :is="PAcurrentComponent(field.ControlType)"
                                isNeedCheck = true
                                :prop="'Fields.' + key + '.FieldName'"
                                :orderProp="'Fields.' + key + '.FieldName'"
                                :obj.sync="field"
                                :isTitle="false"
                                >
                                </component>
                            </span>
                            <!---新增编辑分组的value显示-end--->
                        </div>
                    </div>
                <!-- </div> -->
                </div>
            </el-form>
            <!--field分组区form区--end--->
        </div>    
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
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
                type: Array,
                default: () => {
                    return []
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
            
        },
        methods: {
            // 点击了新增分组按钮
            clickAddNewGroup(){
                debugger
                this.$emit("clickAddNewGroup")
            },

            // 查看操作记录
            scanEditLog(){
                debugger
                this.$emit("emitScanLog")
            }
        }
    }
</script>
