<!--
  User: gaol
  Date: 2019/10/24
  功能： 员工详情页面中 【修改状态】 dialog 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       
</style>
<template>
  <div class="editStatus-cmp" v-loading= 'loading'>
    <el-dialog
        title="修改状态"
        width="50%"
        append-to-body
        custom-class="editStatus"
        :visible.sync="dialogVisible"
    > 
      <div class="expirationTimeBox u-f-ac">
        <h4>生效时间:</h4>
        <div class="timeBox marginL10">
          <el-date-picker
            v-model="expirationTime"
            type="datetime"
            placeholder="选择生效时间">
          </el-date-picker>
        </div>
      </div>  

      <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
              prop="tit"
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
              <!-- <el-date-picker
                  v-if="scope.$index == 0"
                  v-model="scope.row.afterValue"
                  type="datetime"
                  placeholder="选择日期时间">
              </el-date-picker>    -->

              <el-select 
                v-if="scope.$index == 0"
                v-model="scope.row.afterValue" 
                placeholder="请选择员工状态">
                  <el-option
                      v-for="(item, index) in empStatusOptions"
                      :key="item.Id"
                      :label="item.ItemName"
                      :value="item.ItemCode"
                  >   
                  </el-option>
              </el-select>                                
          </template>
          </el-table-column>
      </el-table> 

      <!---底部保存按钮区域--start-->
      <save-footer @save="save" @cancel="cancel"></save-footer>        
      <!--底部保存按钮区域----end-->    
    </el-dialog> 
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  import { parseTime } from '@/filters/index'
  import { changeEmpStatus } from '@/api/employee' 
  import { PaGetDicDataSourceList } from '@/api/dic'

  // 员工类型
  const DicType_empType = 'SYS'
  const DicCode_empType = 'EmpType'

  // 员工状态
  const DicType_empStatus = 'CUS'
  const DicCode_empStatus = 'EmpStatus'   
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
          empStatusOptions: [],  // 员工状态
          expirationTime: '', // 生效时间
          tableData: [
            {
              tit: '员工状态',
              currentValue: this.empObj.PEEStatus || '',
              afterValue: ''
            },   
          ]            
        }
    },
    created() {
        debugger
        this.$nextTick(() => {
          this._getEmpDataSourceList_empStatus()
          this.expirationTime = new Date().getTime()
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
      // 获取员工状态的数据源
      _getEmpDataSourceList_empStatus(){
          PaGetDicDataSourceList(DicType_empStatus, DicCode_empStatus).then(res => {
              if( res && res.data.State === REQ_OK ){
                  this.empStatusOptions = res.data.Data
              }else {
                  this.$message({
                      type: 'error',
                      message: `获取员工状态数据源失败,${res.data.Error}`
                  })
              }
          }).catch(() => {
              this.$message({
                  type: 'warning',
                  message: '获取员工的状态数据源出错'
              })
          })                
      },      
      // 修改员工状态
      _changeEmpStatus(){
        // this.loading = true
        changeEmpStatus(this.empObj.EmpId, this.expirationTime, this.tableData[0].afterValue).then(res => {
          // this.loading = false
          if(res && res.data.State === REQ_OK){
            this.$message({
              type: 'success',
              message: '修改员工类型成功'
            })
            this.dialogVisible = false
            // 触发common-tableInfo组件
            this.$bus.$emit("emitCloseEmpInfoDialog")            
          }else {
            this.$message({
              type: 'error',
              message: `修改员工类型失败，${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '修改员工类型出错'
          })
        })
      },      
      // 保存
      save() {
        // if(!this.tableData[0].afterValue){
        //   this.$message({
        //     type: 'warning',
        //     message: '请填写生效时间后保存'
        //   })
        //   return 
        // }

        if(!this.tableData[0].afterValue){
          this.$message({
            type: 'warning',
            message: '请选择员工类型'
          })
          return             
        }
        this._changeEmpStatus()
      },
      //取消
      cancel(){
        this.dialogVisible = false
      },
    }
  }
</script>
