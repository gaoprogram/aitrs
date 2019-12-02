<!--
  User: gaol
  Date: 2019/11/20
  功能：【系统用户 选择器】 组件
-->

<style lang="stylus" rel="stylesheet/stylus">
.roleSelectCmp
    padding 10px 20px
</style>

<template>
    <div class="roleSelectCmp">
        系统用户选择器组件
       <!--搜索框-start-->
       <div class="searchBox">
            <span style="display: inline-block; width: 300px">
              <el-input placeholder="用户名"></el-input>
            </span>
           <el-button type="primary" size="mini">搜索</el-button>
       </div>
       <!--搜索框--end-->
    </div> 
</template>

<script>
// import SaverFooter from '@/base/Save-footer/Save-footer'
export default {
    props: {
        currentCode: {
            type: String,
            default: () => {
                return ''
            }
        }            
    },
    components: {
        // SaverFooter
    },
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>
