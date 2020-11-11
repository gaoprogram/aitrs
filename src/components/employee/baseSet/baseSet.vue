<!--
  User: gaol
  Date: 2019/8/9
  功能：员工-基础设置
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-tabs__content
  min-height 300px !important
.baseSet
  padding 0 20px 20px 20px !important
  box-sizing border-box
</style>
<template>
  <div class="baseSet">
    <!-- <div class="setBox u-f-ac u-f-wrap">
      <div class="item">
        <el-card>
          人事档案地点
        </el-card>
      </div>
      <div class="item">
        <el-card>
          显示组表配置
        </el-card>
      </div>

      <div class="item">
        <el-card>
          组表字段权限
        </el-card>
      </div>

      <div class="item">
        <el-card>
          自定义字典表
        </el-card>
      </div>

      <div class="item">
        <el-card>
          员工号自动分配规则
        </el-card>
      </div>      
    </div> -->
    <el-tabs type="border-card"  v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="人事档案地点" name="personnelFile"></el-tab-pane>
      <el-tab-pane label="显示组表配置" name="showGroupSet"></el-tab-pane>
      <el-tab-pane label="组件字段权限" name="fieldAuthority"></el-tab-pane>
      <el-tab-pane label="自定义字典表" name="customerDIC"></el-tab-pane>
      <el-tab-pane label="工号分配规则" name="assignmentRules"></el-tab-pane>

      <div class="cmpBox" v-show="activeName == 'personnelFile'">
        <personnel-file-cmp></personnel-file-cmp>
      </div>

      <div class="cmpBox" v-show="activeName == 'showGroupSet'">
        <show-group-set-cmp></show-group-set-cmp>
      </div>

      <div class="cmpBox" v-show="activeName == 'fieldAuthority'">
        <field-authority-cmp></field-authority-cmp>
      </div>

      <div class="cmpBox" v-show="activeName == 'customerDIC'">
        <customer-dic-cmp></customer-dic-cmp>
      </div>

      <div class="cmpBox" v-show="activeName == 'assignmentRules'">
        <assignment-rules-cmp></assignment-rules-cmp>
      </div>                        
    </el-tabs>    
  </div>
</template>

<script type="text/ecmascript-6">
  import PersonnelFileCmp from './personnelFile/personnelFile'
  import ShowGroupSetCmp from './showGroupSet/showGroupSet'
  import FieldAuthorityCmp from './personnelFile/personnelFile'
  import CustomerDicCmp from './customerDIC/customerDIC'
  import AssignmentRulesCmp from './assignmentRules/assignmentRules'
  export default {
    components: {
      PersonnelFileCmp,
      ShowGroupSetCmp,
      FieldAuthorityCmp,
      CustomerDicCmp,
      AssignmentRulesCmp
    },
    data(){
      return {
        loading: false,
        activeName:'personnelFile'
      }
    },
    methods:{
      handleClick(){

      },

    },    
  }
</script>

