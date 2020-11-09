<!--
  User: gaol
  Date: 2019/5/14
  功能：页面中的 content区域 组件 中的 通用 弹框组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="com-dialog-cmp">
        <el-dialog
            :visible.sync="comDialogVisibleFlag"
            :title="comDialogTit"
            :width="comDialogWidth"
            :fullscreen="fullscreen"
            :close-on-click-modal="closeOnClickModal"
            :append-to-body="appendToBody"
            @close="closeComDialog"
        >
            <div class="slotWrap">
                <slot name="slotDialog"></slot>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import {
        REQ_OK
    } from '@/api/config.js' 
    // 底部保存组件
    export default {
        props: {
            comDialogisAddOrEdit:{
                type: Number,
                default: () => {
                    return 1  // 0 编辑  1 新增
                }
            },
            comDialogVisible: {
                type: Boolean,
                default: () => {
                    return false
                }
            },
            comDialogTit: {
                type: String,
                default: () => {
                    return ''
                }
            },
            comDialogWidth: {
                type: String,
                default: () => {
                    return '50%'
                }
            },
            fullscreen: {
                type: Boolean,
                default: () => {
                    return false
                }
            },
            closeOnClickModal: {
                type: Boolean,
                default: () => {
                    return false
                }
            },
            appendToBody: {
                type: Boolean,
                default: () => {
                    return true
                }
            }                       
        },
        components: {
            SaveFooter,          
        },
        data(){
            return {
                
            }
        },
        computed: {
            comDialogVisibleFlag(){
                return this.comDialogVisible
            }
        },
        created() {

        },
        methods: {
            closeComDialog(){
                this.$emit("closeComDialog")
            }
        }
    }
</script>

