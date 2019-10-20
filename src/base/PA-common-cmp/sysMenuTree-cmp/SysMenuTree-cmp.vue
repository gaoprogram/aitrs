<!--
  User: gaol
  Date: 2019/10/09
  功能： 显示列 组件 (区别于 自定义显示列组件(customerShowColumn-cmp))
--->

<style lang="stylus" rel="stylesheet/stylus" scoped>


</style>

<template>
    <div class="sysMenuTree-cmp" v-loading = 'loading'>


        <!--底部保存按钮区域--start-->
        <div class="footerBox">
            <save-footer @save="save" @cancel="cancel"></save-footer>
        </div>   
        <!--底部保存按钮区域--end-->

    </div>
</template>

<script>
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import Vuedraggable from 'vuedraggable'

    export default {
        props:{

        },
        components: {
            SaveFooter,
            Vuedraggable
        },
        data(){
            return {
                loading: false, // 控制loading的显示/隐藏
            }
        },
        watch: {

        },
        methods: {
            // 保存 
            save(){

            },
            // 取消
            cancel(){

            }
        }
    }
</script>

