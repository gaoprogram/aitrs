<!--
  User: gaol
  Date: 2019/8/9
  功能：基础设置- 员工号自动分配规则
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.assignmentRules
    padding 0 20px
    box-sizing  border-box
</style>

<template>
  <div class="assignmentRules">
    <div class="tabBox">
      <div class="clearfix marginB10">
        <el-button 
          class="rt" 
          type="primary" 
          size="mini"
          @click.native="addNewRules"
        >
        新增规则
        </el-button>
      </div>

      <!-- tableList: {{tableList}} -->
      <!--table列表--start-->
      <div class="tableBox" v-loading="loading">
        <el-table
          style="width: 100%"
          border
          :data="tableList"
        >
          <el-table-column
            label="员工类型"
            sortable
            prop="EmpTypeRangeName"
          >
          </el-table-column>

          <el-table-column
            label="自动分配"
            sortable
            prop="AutoAssign"
          >
            <template slot-scope="scope">
              <span>
                {{scope.row.AutoAssign === 0 ? '否': '是'}}
              </span>
            </template>
          </el-table-column>      

          <el-table-column
            label="前缀"
            sortable
            prop="Prefix"
          >
            <template slot-scope="scope">
              <span>
                {{scope.row.Prefix}}
              </span>
            </template>
          </el-table-column>        

          <el-table-column
            label="最大长度"
            sortable
            prop="MaxLength"
          >
            <template slot-scope="scope">
              <span>
                {{scope.row.MaxLength}}
              </span>
            </template>
          </el-table-column>                   

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" @click.native="clickDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!--分页部分-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryObj.PageIndex"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryObj.total">
        </el-pagination>        
      </div>
      <!---table列表-end-->

      <!-- empStatusOptions: {{empStatusOptions}} -->
      <!--新增规则的弹框---start--->
      <div class="addNewRules" v-if="addRuleShow">
        <el-dialog
          title="新增规则"
          width="30%"
          :visible.sync="addRuleShow"
          append-to-body
          :close-on-click-modal="false"
        >
          <add-signment-rule-cmp 
            ref="signmentRuleCmp" 
            @formSubmit="formSubmit"
            :empStatusOptions="empStatusOptions">
          </add-signment-rule-cmp>

          <save-footer @save="save" @cancel="cancel"></save-footer>
        </el-dialog>
      </div>
      <!--新增规则的弹框---end--->
    </div>  
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { PaGetDicDataSourceList } from '@/api/dic'
  import AddSignmentRuleCmp from './assignmentRules-cmp/AddSignmentRule-cmp'
  import { getEmpNoCreateRule, saveEmpNoRule, deleteEmpNoRule } from '@/api/employee'
  export default {
    components: {
      SaveFooter,
      AddSignmentRuleCmp
    },
    data(){
      return {
        loading: false, 
        tableList: [],  // table 列表数据
        assignmentRules: {
          status: '', // 员工类型
          autoMode: true,  // 自动分配
          preFixInput: '', // 前缀
          length: '', // 最大长度
        },
        addRuleShow: false, // 控制新增规则弹框的显示/隐藏
        empStatusOptions: [],  // 员工类型
        queryObj: {
          PageIndex: 1,
          PageSize: 10,
          total: 0
        }
      }
    },
    created(){
      this._getEmpStatusOption()
      this._getEmpNoCreateRule()
    },
    methods:{
      // 获取员工类型下拉数据源
      _getEmpStatusOption(){
        // 员工类型
        const DicType_empType = 'SYS'
        const DicCode_empType = 'EmpType'

        // 员工状态
        const DicType_empStatus = 'CUS'
        const DicCode_empStatus = 'EmpStatus'          
        PaGetDicDataSourceList(DicType_empType, DicCode_empType).then(res => {
          debugger
          if(res && res.data.State ===REQ_OK){
            this.empStatusOptions = res.data.Data
          }else {
            this.$message.error(`获取员工类型下拉数据源失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("获取员工类型下拉数据源出错了")
        })
      },  
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getEmpNoCreateRule()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageIndex = val
        this._getEmpNoCreateRule()
      },          
      // 获取tablelist数据
      _getEmpNoCreateRule(){
        this.loading = true
        getEmpNoCreateRule(this.queryObj.PageIndex, this.queryObj.PageSize).then(res => {
          debugger
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableList = res.data.Data
            this.queryObj.total = res.data.DataCount
          }else {
            this.$message.error(`获取员工规则列表数据失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("获取员工规则列表出错了")
        })
      },
      // 新增规则
      addNewRules() {
        debugger
        this.addRuleShow = true
      },
      // 保存
      _saveAddRules(data){
        console.log(data)
        console.log(JSON.stringify(data))
        debugger
        saveEmpNoRule(JSON.stringify(data)).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success("保存成功")
            this._getEmpNoCreateRule()
          }else {
            this.$message.error(`保存数据失败,${res.data.Error}`)
          }
        }).catch(() => {
          // this.$message.warning("保存数据出错了")
        })
      },
      // 删除
      _deleteRules() {
        deleteEmpNoRule(this.currentDeleteRow.Id).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success("删除成功")
            this._getEmpNoCreateRule()
          }else {
            this.$message.error(`删除失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("删除出错了")
        })
      },
      // 删除
      clickDelete(row){
        this.currentDeleteRow = row
        this.$confirm("确定要删除此规则吗?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this._deleteRules()
        }).catch(() => {
          this.$message.info("删除已取消")
        })
      },
      // 确定
      save(){
        this.$refs.signmentRuleCmp.formSubmit()
      },
      formSubmit(flag,data) {
        if(flag){
          // 验证成功
          this._saveAddRules(data)
          this.addRuleShow = false
        }else {
          //验证失败
        }
      },
      // 取消
      cancel(){
        this.addRuleShow = false
      }
    }
  }
</script>
