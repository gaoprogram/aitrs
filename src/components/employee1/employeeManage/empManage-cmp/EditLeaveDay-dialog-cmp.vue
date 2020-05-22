<!--
  User: gaol
  Date: 2019/9/29
  功能： 员工详情页面中 点击 [修改离职日]  弹框组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       
</style>
<template>
  <div class="editLeaveDay-cmp" v-loading= 'loading'>
    <!-- empObj: {{empObj}} -->
    <el-dialog
        title="修改离职日"
        width="50%"
        append-to-body
        custom-class="editDutyDate"
        :visible.sync="dialogVisible"
    > 
      <p class="tip">注：该操作将引发相关的数据生效日期发生变动，请谨慎操作</p>

      <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
              prop="date"
              label=""
              width="180">
          </el-table-column>
          <el-table-column
              prop="currentValue"
              label="当前值"
              width="180">
          </el-table-column>
          <el-table-column
              prop="afterValue"
              label="变更后"
          >
          <template slot-scope="scope">
              <el-date-picker
                  v-model="scope.row.afterValue"
                  type="datetime"
                  placeholder="选择日期时间">
              </el-date-picker>                
          </template>
          </el-table-column>
      </el-table> 

      <!---底部保存按钮区域--start-->
      <save-footer @save="saveLeaveDate" @cancel="cancelLeaveDate"></save-footer>        
      <!--底部保存按钮区域----end-->    
    </el-dialog> 
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  import { changeEmpLeaveDate } from '@/api/employee'
  export default {
    props: {
      showCommonDialog: {
        type: Boolean,
        default: false
      },
      empObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 员工头像、级别等信息
      empInfo: {
        type: Object,
        default: () => {
          return {}
        }
      }      
    },
    components:{
      SaveFooter
    },
    data(){
        return {
          loading: false,
          dialogVisible: this.showCommonDialog,
          tableData: [{
            date: '离职日期',
            currentValue: '',
            afterValue: ''
          }]            
        }
    },
    created() {
      debugger
      this.$nextTick(() => {
        this.tableData[0].currentValue = new Date().toLocaleString()
        console.log(this.tableData[0].currentValue)
      })           
    },
    watch: {
      dialogVisible: {
        handler(newValue, oldValue){
          debugger
          this.$emit("update:showCommonDialog", newValue)
        }
      }
    },
    methods: {
        // 修改离职日期
        _changeEmpLeaveDate() {
          changeEmpLeaveDate(this.empObj.EmpId, this.tableData[0].afterValue).then(res => {
            if(res && res.data.State === REQ_OK ){
              this.$message({
                type: 'success',
                message: '修改离职日期成功'
              })
              this.dialogVisible = false
              // 触发common-tableInfo组件
              this.$bus.$emit("emitCloseEmpInfoDialog")            
            }else {
              this.$message({
                type: 'error',
                message: `修改离职日期失败，${res.data.Error}`
              })
            }
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '修改离职日期出错'
            })
          })
        },      
        // 保存
        saveLeaveDate() {
          if(!this.tableData[0].afterValue){
            this.$message({
              type: 'warning',
              message: '请选择离职日期'
            })
            return
          }

          this._changeEmpLeaveDate()          
        },
        //取消
        cancelLeaveDate(){
          this.dialogVisible = false
        },
    }
  }
</script>
