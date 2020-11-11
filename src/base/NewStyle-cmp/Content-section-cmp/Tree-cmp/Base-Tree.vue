<!--
  User: gaol
  Date: 2019/5/14
  功能： Tree组件
-->
<template>
    <el-row class="tabWrap">
        <el-col :span="columnNum">
            Tree组件
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
  // 底部保存组件
  export default {
    props: {
        columnNum: {
            type: [String, Number],
            default: () => {
                return 24
            }
        }
    },
    data(){
        return {
        }
    },
    methods: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
