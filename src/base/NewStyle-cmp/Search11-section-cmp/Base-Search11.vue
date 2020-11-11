<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 search11 组件区
-->
<template>
    <el-row class="search11Cmp">
        <el-col :span="columnNum">   
            页面search11组件区
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
  // 底部保存组件
  export default {
    props: {
        columnNum: {
            type: [String, Number],
            default: () => {
                return 24
            }
        },
    },
    components: {
        SaveFooter
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
