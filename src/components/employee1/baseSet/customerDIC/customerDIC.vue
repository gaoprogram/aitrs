<!--
  User: gaol
  Date: 2019/8/9
  功能：基础设置- 自定义字典表
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.customerDIC 
  padding 0 20px 
  box-sizing border-box
  .tableBox
    width 100%
</style>

<template>
  <div class="customerDIC">
    <el-tabs v-model="activeName" @tab-click="handleClickTab">
      <el-tab-pane label="全部" name="first">全部</el-tab-pane>
      <el-tab-pane label="已设置" name="second">已设置</el-tab-pane>
      <el-tab-pane label="未设置" name="third">未设置</el-tab-pane>
    </el-tabs>

    <div class="tableBox">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="fieldName"
          label="字段名"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template
            slot-scope="scope"
          >
            <el-button type="text" size="mini" @click.native="handleSet(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="setDicBox" v-if="setDicShow">
      <el-dialog
        title="设置字典表"
        width="30%"
        :visible.sync="setDicShow"
        append-to-body
      > 
        currentSetObj： {{currentSetObj}}
        <custom-table-cmp :customSetObj="currentSetObj" @cancel="cancel"></custom-table-cmp>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomTableCmp from '@/base/Table-set-control-cmp/custom-table-cmp'
  export default {
    components: {
      CustomTableCmp
    },
    data(){
      return {
        activeName: "first",
        setDicShow: false, // 控制 设置字典表弹框的显示/隐藏
        currentSetObj: {}, // 当前设置的对象
        tableData:[
          {
            fieldName: '地点',
            status: '已设置'
          },
          {
            fieldName: '月份',
            status: '未设置'
          }
        ]
      }
    },
    methods: {
      //切换tabl
      handleClickTab(){

      },
      // 设置字典表
      handleSet(row){
        debugger
        this.setDicShow = true
        this.currentSetObj = row
      },
      cancel(){
        this.setDicShow = false
      }
    },
  }
</script>

