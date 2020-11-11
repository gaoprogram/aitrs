<!--
  User: gaol
  Date: 2019/9/29
  功能： 员工详情页面中 【修改类型】 dialog 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       
</style>
<template>
  <div class="editType-cmp" v-loading= 'loading'>
    <el-dialog
      title="修改类型"
      width="50%"
      append-to-body
      custom-class="editType"
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
      <!-- tableData: {{tableData}} -->
      <el-table
          :data="tableData"
          style="width: 100%"
          max-height="300"
          size="mini">
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
              </el-date-picker>   -->

              <el-select 
                v-if="scope.$index == 0"
                v-model="scope.row.afterValue" 
                placeholder="请选择员工类型">
                  <el-option
                      v-for="(item, index) in empTypeOptions"
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
  import { 
    changeEmpType
  } from '@/api/employee'    
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
          empTypeOptions: [],  // 员工类型
          expirationTime: '', // 生效时间
          tableData: [
            {
              tit: '员工类型',
              currentValue: this.empObj.PEEType || '',
              afterValue: ''
            },            
          ]            
        }
    },
    created() {
        debugger
        this.$nextTick(() => {
          this._getEmpDataSourceList_empType()
          // console.log(this.tableData[0].currentValue)
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
        // 获取员工类型的数据源
        _getEmpDataSourceList_empType(){
            PaGetDicDataSourceList(DicType_empType, DicCode_empType).then(res => {
                if( res && res.data.State === REQ_OK ){
                    this.empTypeOptions = res.data.Data
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取员工类型数据源失败，${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '获取员工类型数据出错'
                })
            })
        },      
        // 修改员工类型
        _changeEmpType(){
          // this.loading = true
          changeEmpType(this.empObj.EmpId, this.expirationTime, this.tableData[0].afterValue).then(res => {
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

          this._changeEmpType()
        },
        //取消
        cancel(){
            this.dialogVisible = false
        },
    }
  }
</script>
