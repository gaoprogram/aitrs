<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--用户管理
-->

<template>
    <div class="userManage">
        平台系统设置——用户角色--用户管理
      <el-row :gutter="20"> 
        <el-col :span="8">
          树形组件
        </el-col>
        <el-col :span="16">
          <user-manage-cmp></user-manage-cmp>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import UserManageCmp from './userManage-cmp/UserManageTable-cmp'
  export default {
    components: {
      userManageCmp
    },
    data(){
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
