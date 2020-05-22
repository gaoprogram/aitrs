<!--
  User: gaol
  Date: 2020/5/14
  功能： 抽屉组件
-->
<template>
    <div class="drawerBox">
        <el-drawer
            :title="tit"
            :before-close="handleClose"
            :visible.sync="dialogShow"
            :direction="direction"
            :wrapperClosable="wrapperClosable"
            :size="size"
            :append-to-body="appendToBody"
            :modal-append-to-body="modalAppendToBody"
            custom-class="atris-drawer"
            ref="atrisDrawer"
        >
            <div class="content">
                <slot name="container-slot">
                </slot>
                <div
                    v-if="showFooterBox" 
                    class="drawer_footer u-f-ajc">
                    <el-button 
                        @click="cancelForm"
                    >
                        取 消
                    </el-button>
                    <el-button 
                        v-if="showSaveBtn"
                        type="primary" 
                        @click="clickSureBtn" 
                        :loading="loading"
                    >
                        {{ loading ? '提交中 ...' : '确 定' }}
                    </el-button>
                </div>
            </div>
        </el-drawer>        
    </div>
</template>

<script>
    export default {
        props: {
            // 标题
            tit: {
                type: String,
                default: ''
            },
            // 方向
            direction: {
                type: String,
                default: 'rtl'
            },
            // 控制抽屉的显示/隐藏
            dialog: {
                type: Boolean,
                default: false,
            },
            showFooterBox: {
                type: Boolean,
                default: true
            },
            showSaveBtn: {
                type: Boolean,
                default: true
            },
            wrapperClosable: {
                type: Boolean,
                default: false
            },
            size: {
                type: [String, Number],
                default: '30%'
            },
            appendToBody: {
                type: Boolean,
                default: true
            },
            modalAppendToBody: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loading: false,
                dialogShow: this.dialog
            }
        },
        computed: {

        },
        watch: {
            dialogShow:{
                handler(newValue, oldValue){
                    debugger
                    this.$emit("update:dialog", newValue)
                }
            }
        },
        methods: {
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.loading = false
                this.dialogShow = false                
                // this.$confirm('确定要提交表单吗？').then(_ => {
                //     this.loading = true
                //     this.timer = setTimeout(() => {
                //         done()
                //         // 动画关闭需要一定的时间
                //         setTimeout(() => {
                //             this.loading = false
                //         }, 400)
                //     }, 2000)
                //     }).catch(_ => {})
                },
                clickSureBtn(){
                    debugger
                    // 验证必填项
                    this.$emit('emitClickSureBtn')
                    // this.$refs.atrisDrawer.closeDrawer()                    
                },
                cancelForm() {
                    this.loading = false
                    this.dialogShow = false
                    // clearTimeout(this.timer)
                }
            }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.atris-drawer
    overflow auto
</style>