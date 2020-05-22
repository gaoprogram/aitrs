<!--
  User: gaol
  Date: 2019/8/9
  功能:  合同提醒 组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-table__empty-block
  min-height 120px !important
</style>
<template>
  <div class="contractRemind-cmp">
    <div class="marginB10">
      <span style="display:inline-block; width: 300px">
        <el-input 
          v-model="strSearchJson.EmpNo"
          placeholder="请输入员工号或者姓名，多个用逗号分隔">
        </el-input>
      </span>

      <!-- strSearchJson.ContractType: {{strSearchJson.ContractType}} -->
      <el-select
        v-model="strSearchJson.ContractType"
        multiple 
        placeholder="请选择"
      >
        <el-option 
          v-for="(item,key) in contractTypeList" 
          :key="key"
          :label="item.TableName"
          :value="item.TableCode"
        >
        </el-option>
      </el-select>

      <el-button type="primary" size="small" @click.native="clickSearch">搜索</el-button>
    </div>

    <!-- activeContractRemindCode: {{activeContractRemindCode}} -->
    <el-tabs v-model="activeContractRemindCode" type="card" @tab-click="handleClickTab">
      <el-tab-pane 
        v-for="(item, key) in contractRemindTypeList"
        :key="item.Code"
        :label="item.Name"
        :name="item.Code"
      ></el-tab-pane>
        <!-- <el-tab-pane label="试用期" name="first">试用期</el-tab-pane>
        <el-tab-pane label="试用期延长" name="second">试用期延长</el-tab-pane>
        <el-tab-pane label="合同到期" name="third">合同到期</el-tab-pane> -->
    </el-tabs>

    <!-- tableList: {{tableList}} -->
    <div :class="['tableBox', tableList.length<=0? 'not_found':'']" v-loading = "loading">
      <el-table
          :data="tableList"
          border
          empty-text=" "
          style="width: 100%">
          <el-table-column
              prop="EmpNo"
              label="员工号"
              width="180">
          </el-table-column>

          <el-table-column
              prop="EmpName"
              label="姓名"
              width="180">
          </el-table-column>

          <el-table-column
              prop="ContractTypeName"
              label="合同类型"
              width="180">
          </el-table-column>    

          <el-table-column
              prop="BeginDate"
              label="起始日期"
              width="180">
              <template
                slot-scope="scope"
              >
                {{scope.row.BeginDate | replaceTime}}
              </template>
          </el-table-column>     

          <el-table-column
              prop="EndDate"
              label="结束日期"
              width="180">
              <template
                slot-scope="scope"
              >
                {{scope.row.EndDate | replaceTime}}
              </template>            
          </el-table-column>  

          <el-table-column
              prop="ExpireDays"
              label="剩余天数"
              width="180">
          </el-table-column>                           

          <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click.native="handleDeal">处置</el-button>
                <el-button type="text" @click.native="handleApproval">发起审批</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>

    <!--分页--start-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryObj.pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryObj.total">
    </el-pagination>    
    <!---分页----end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getContractRemindList } from '@/api/employee'
  export default {
    props: {
      contractTypeList: {
        type: Array,
        default: () => {
          return []
        }
      },
      contractRemindTypeList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data(){
        return {
          loading: false, 
          strSearchJson: {
            EmpNo: '', // 员工号/姓名，若有多个以逗号分隔
            ContractType: '', // 合同类型，多选
            RemindType: '', // 提醒类型，单选
          },
          activeContractRemindIdx: 0, 
          queryObj: {
              pageSize: 10,
              pageIndex: 1,
              total: 0
          }, 
          tableList: [], //表格数据      
        }
    },
    watch: {

    },
    computed: {
      activeContractRemindCode(){
        return this.contractRemindTypeList[this.activeContractRemindIdx].Code
      }
    },
    created(){
      this._getContractRemindList()
    },
    methods: {
      // 获取表格数据
      _getComTables(){

      },
      // 切换合同类型tab
      handleClickTab(tab, event) {
        debugger
        this.activeContractRemindCode = tab.name
        this.activeContractRemindIdx = tab.index*1
      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getComTables()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageIndex = val
        this._getComTables()
      },
      // 处置
      handleDeal() {

      },
      //发起审批
      handleApproval() {
        
      },
      // 搜索
      clickSearch(){
        debugger 
        this.strSearchJson.RemindType = this.activeContractRemindCode
        // this.$emit("clickSearchBtn", this.strSearchJson)
        this._getContractRemindList()
      },
      // 获取合同提醒列表
      _getContractRemindList(){
        debugger
        this.loading = true
        getContractRemindList(JSON.stringify(this.strSearchJson), this.queryObj.pageIndex, this.queryObj.pageSize).then(res => {
          this.loading = false
          if(res && res.State === REQ_OK){
            this.tableList = JSON.parse(res.Data)
            this.queryObj.total = res.data.DataCount
          }else {
            this.$message.error(`获取合同列表数据失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("获取合同列表")
        })
      },      
    },
  }
</script>

