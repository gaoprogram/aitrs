<!--
  User: gaol
  Date: 2019/5/14
  功能： tab 切换组件
-->
<template>
    <el-row class="tabWrap">
        CESHI
    </el-row>
</template>

<script type="text/ecmascript-6">
  // 底部保存组件
  export default {
    props: {

    },
    data(){
        return {
            
        }
    },
    methods: {
        handleTabClick ( tab, event ) {
            console.log(tab, event)
            this.$bus.$emit("tabCmpClick", tab)
        },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
