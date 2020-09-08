<!--
  User: gaol
  Date: 2019/5/14
  功能： tab 布局组件
-->
<template>
    <el-row class="tab-section-wrap">
        <el-col :span="columnNum">
          tab 布局组件
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      columnNum: {
        type: [String, Number],
        default: () => {
            return 24
        }
      },
      comData: {
        type: Object,
        default: () => {
            return {}
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
