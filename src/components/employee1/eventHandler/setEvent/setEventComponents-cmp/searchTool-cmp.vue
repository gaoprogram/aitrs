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
    <div class="searchTool-cmp">
        <el-form  label-width="100" class="u-f-ac">
            <el-form-item 
                label="关键词" 
                class="item u-f-ac"
            >
                <el-input placeholder="事件名称">

                </el-input>
            </el-form-item>

            <el-form-item 
                label="事件对象" 
                class="item u-f-ac"
            >
                <el-select placeholder="事件对象">

                </el-select>
            </el-form-item>     

            <el-form-item 
                label="事件类型" 
                class="item u-f-ac"
            >
                <el-select placeholder="事件类型">

                </el-select>
            </el-form-item>    

            <el-form-item 
                label="状态" 
                class="item u-f-ac"
            >
                <el-select placeholder="状态">

                </el-select>
            </el-form-item>    

            <el-button type="primary" size="small">搜索</el-button>
        </el-form>
    </div>
</template>

<script>
  export default {
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
