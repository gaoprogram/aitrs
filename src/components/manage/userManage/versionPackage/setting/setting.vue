
<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——版本套包-设置
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.setting 
  padding 0 20px
  box-sizing border-box
</style>

<template>
    <div class="setting">
      平台系统设置——版本套包-设置
      <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab">
        <el-tab-pane label="人员规模等级" name="first"></el-tab-pane>
        <el-tab-pane label="月数等级" name="second"></el-tab-pane>

        <!--动态引用月数和人员的组件-start-->
        <component :is="currentCmp(activeName)"></component>        
        <!----动态引用月数和人员的组件---end-->
      </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import MonthSizeCmp from './setting-cmp/MonthSize-cmp'
  import PeopleSizeCmp from './setting-cmp/PeopleSize-cmp'
  export default {
    components: {
      MonthSizeCmp,
      PeopleSizeCmp
    },
    data(){
      return {
        activeName: 'first',
      }
    },
    methods: {
      handleClickTab(){

      },
      currentCmp(str){
        switch(str){
          case 'first':
            return PeopleSizeCmp
          case 'second':
            return MonthSizeCmp
        }
      }
    },
  }
</script>

