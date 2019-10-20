<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--菜单管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.menuManage
  padding 0 20px 20px 20px
  // border 1px solid red
  border-bottom 1px solid #E4E7ED
  box-sizing border-box
</style>

<template>
    <div class="menuManage" v-loading="loading">
      <el-row>
        <!---左边tree-start-->
        <el-col :span="6">
          <div class="menuTreeCmpBox">
            <menu-tree-cmp ref="menuTreeCmp"></menu-tree-cmp>
          </div>
        </el-col>
        <!----左边tree---end-->          

        <!---右边设置区---START--->        
        <el-col :span="18">
          <div class="containerBox">
            <menu-content-set-cmp ref="menuContentSetCmp"></menu-content-set-cmp>
          </div>
        </el-col>
        <!---右边设置区---end--->
        
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import MenuTreeCmp from '@/base/Manage-common-cmp/MenuTree-cmp'
  import MenuContentSetCmp from './MenuContentSet-cmp'
  export default {
    components: {
      MenuTreeCmp,
      MenuContentSetCmp
    },
    data(){
      return {
        loading: false, // 加载loading
      }
    }
  }
</script>


