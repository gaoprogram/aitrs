<!---
    User:gaol
    Date: 2019/12/25
    功能：事件处理器——事件——搜索组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.item 
    padding 5px
    margin-bottom 0 !important
    box-sizing border-box
</style>
<template>
    <div class="eventScanSearchTool-cmp">
        <span class="item">
            <el-button type="text" class="tit">对象码:</el-button>
            <el-button type="text" class="titValue">ABCD-123456-78</el-button>
        </span>

        <span class="item">
            <el-button type="text" class="tit">对象名称:</el-button>
            <el-button type="text" class="titValue">xxxxxxx</el-button>
        </span>

        <span class="item">
            <el-button type="text" class="tit">事件名称:</el-button>
            <el-button type="text" class="titValue">入职</el-button>
        </span>

        <span class="item">
            <el-button type="text" class="tit">事件原因:</el-button>
            <el-button type="text" class="titValue">填补岗位空缺</el-button>
        </span>        
    </div>
</template>

<script>
  export default {
    props: {
        obj: {
            type: Object,
            default: ()=> {
                return {}
            }
        }
    },
    data() {
      return {

      }
    },
    created(){

    },
    methods: {

    }
  };
</script>
