<!--
  User: gaol
  Date: 2019/10/25
  功能： 员工详情页面中 点击 [调转] btn后的  弹框组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
             
</style>
<template>
  <div class="turnJob-cmp" v-loading= 'loading'>
    <el-dialog
        title="调转"
        width="40%"
        append-to-body
        custom-class="turnJob"
        :visible.sync="dialogVisible"
    > 
      <!-- <div class="forceTime">
        <span>生效时间：</span>
        <el-date-picker
            v-model="tableData[0].afterValue"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>         
      </div> -->

      <p>注：该操作将引发相关的数据生效日期发生变动，请谨慎操作</p>

      <div class="expirationTimeBox u-f-ac marginT10">
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

            <el-cascader
              v-if="scope.$index == 1"
              v-model="scope.row.afterValue"
              clearable
              :options="depOptions"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChangeDep">
            </el-cascader>                

            <el-select 
              v-if="scope.$index == 2"
              v-model="scope.row.afterValue" 
              placeholder="请选择岗位">
                <el-option
                  v-for="(item, index) in positionOptions"
                  :key="item.Id"
                  :label="item.ItemName"
                  :value="item.ItemCode"
                >   
                </el-option>
            </el-select> 


            <el-select 
              v-if="scope.$index == 3"
              v-model="scope.row.afterValue" 
              placeholder="请选择职位">
                <el-option
                  v-for="(item, index) in dudyOptions"
                  :key="item.Id"
                  :label="item.ItemName"
                  :value="item.ItemCode"
                  clearable
                >   
                </el-option>
            </el-select> 

            <el-select 
              v-if="scope.$index == 4"
              v-model="scope.row.afterValue" 
              placeholder="请选择职级">
                <el-option
                  v-for="(item, index) in levelOptions"
                  :key="item.Id"
                  :label="item.ItemName"
                  :value="item.ItemCode"
                  clearable
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
    getEmpCurrentWorkState,
    empTransfer
  } from '@/api/employee'
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
          // depValue: [],  // 部门的绑定
          // 部门数据源
          expirationTime: '', // 生效时间
          depOptions: [
            {
              value: 'chanping',
              label: '产品部',
              children: [
                {
                  value: 'yanfa',
                  label: '研发部',
                  children: [
                    {
                      value: 'qianduan',
                      label: '前端'
                    }, 
                    {
                      value: 'houtai',
                      label: '后台'
                    }, 
                    {
                      value: 'ui',
                      label: '设计'
                    }, 
                    {
                      value: 'ceshi',
                      label: '测试'
                    }
                  ]
                }, 
                {
                  value: 'xiaoshou',
                  label: '销售部',
                  children: [
                    {
                      value: 'shouqian',
                      label: '售前'
                    }, 
                    {
                      value: 'shouhou',
                      label: '售后'
                    }
                  ]
                }
              ]
            }
          ],
          positionOptions: [], // 岗位下拉数据源
          dudyOptions: [], // 职务下拉数据源
          levelOptions: [], //职级下拉数据源
          tableData: [
            {
              tit: '部门',
              currentValue: '',
              afterValue: ''
            },               
            {
              tit: '岗位',
              currentValue: '',
              afterValue: ''
            },   
            {
              tit: '职务',
              currentValue: '',
              afterValue: ''
            },   
            {
              tit: '职级',
              currentValue: '',
              afterValue: ''
            },                           
          ]          
        }
    },
    created() {
      debugger
      this.$nextTick(() => {
        this._getEmpCurrentWorkState()
        if(this.empObj.PEntryDate){
          // 有生效时间
          debugger  
          this.expirationTime = parseTime( this.empObj.PEntryDate.replace("/Date(", "").replace(")/",""),"{y}-{m}-{d}" )
        }else {
          // 没有生效时间则取当前的时间
        }
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
      // 获取 部门、岗位、职务、职级
      _getEmpCurrentWorkState(){
        getEmpCurrentWorkState(this.empObj.EmpId).then(res => {
          debugger
          if( res && res.data.State === REQ_OK ){
            this.tableData[0].currentValue = res.data.Data.Org
            this.tableData[1].currentValue = res.data.Data.Pos
            this.tableData[2].currentValue = res.data.Data.Job
            this.tableData[3].currentValue = res.data.Data.JobLevel
          }else {
            this.$message({
              type: 'error',
              message: `获取员工部门岗位数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '获取员工部门岗位出错'
          })
        })
      },
      // 确定调转
      _empTransfer(){
        let newObj = {
          OrgCode: this.tableData[1].afterValue,
          PositonCode: this.tableData[2].afterValue,
          JobCode: this.tableData[3].afterValue,
          JobLevel: this.tableData[4].afterValue,
        }
        empTransfer(this.empObj.EmpId, this.tableData[0].afterValue, JSON.stringify(newObj)).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.$message({
              type: 'success',
              message: '调转保存数据成功'
            })
            // 关闭调转弹框
            this.dialogVisible = false
            this.$bus.$emit("emitCloseEmpInfoDialog")
          }else {
            this.$message({
              type: 'error',
              message: `调转保存数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '调转保存失败'
          })
        })
      },
      // 改变部门
      handleChangeDep(){

      },
      //取消
      cancel(){
        this.dialogVisible = false
      },
      // 保存
      save(){
        // if( !this.tableData[0].afterValue ){
        //   this.$message({
        //     type: 'warning',
        //     message: '请选择生效时间'
        //   })
        //   return
        // }

        if( !this.tableData[1].afterValue ){
          this.$message({
            type: 'warning',
            message: '请选择部门'
          })
          return
        }

        // if( !this.tableData[2].afterValue ){
        //   this.$message({
        //     type: 'warning',
        //     message: '请选择岗位'
        //   })
        //   return
        // }
        
        // if( !this.tableDatap[3].afterValue ){
        //   this.$message({
        //     type: 'warning',
        //     message: '请选择职务'
        //   })
        //   return
        // }
        

        // if( !this.tableData[4].afterValue ){
        //   this.$message({
        //     type: 'warning',
        //     message: '请选择职级'
        //   })
        //   return
        // }

        // 调取调转的接口
        this._empTransfer()
      }
    }
  }
</script>
