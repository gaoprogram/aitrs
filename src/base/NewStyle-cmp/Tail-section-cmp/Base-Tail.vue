<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 tailCmp 组件
-->
<template>
    <el-row class="tailCmp">
        <el-col :span="columnNum">   
            页面 tailCmp 组件
            <!-- sectionData: {{sectionData}} -->
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
        sectionData: {
            type: Object,
            default: () => {
                return  {}     
            }
        }
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
