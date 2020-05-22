<!--
  User: gaol
  Date: 2019/5/24
  功能: 流程配置——流程表單——表单赋值
-->
  <template>
    <transition name="el-zoom-in-center">
      <el-dialog
        title="表单赋值"
        width="30%"
        :append-to-body="true"
        :close-on-click-modal="false"
        :show-close="false"
        :visible.sync="tableAssignShow"
        :lock-scroll="true"
        show-close
        :before-close="cancelFunctionControl"
        class="dialog-container"
      >
      <div v-loading="dailog_loading">
        <el-card>
          <!--赋值 表格container部分--start-->
          <div class="containerBox">
            <h4>明细列表字段规则</h4>
            <!-- evaluationData: {{evaluationData}} -->
            <el-table
                :data="evaluationData"
                border
                style="width: 100%">

                <el-table-column
                    fixed
                    label="字段名"
                    width="150"
                    >
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.CurrentEvaluation.DetailFieldCode" placeholder="请选择" size="mini">
                            <el-option v-for="item in scope.row.DetailFieldCode" :key="item.FieldCode" :label="item.FieldName" :value="item.FieldCode">

                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    label="统计类型"
                    width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.CurrentEvaluation.CalculationType" placeholder="请选择" size="mini">
                            <el-option v-for="item in calculationType" :key="item.value" :label="item.type" :value="item.value">

                            </el-option>
                        </el-select>
                    </template>                    
                </el-table-column>
                <el-table-column
                    label="赋值给主字段">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.CurrentEvaluation.MainFieldCode" placeholder="请选择" size="mini">
                            <el-option v-for="item in scope.row.MainFieldCode" :key="item.FieldCode" :label="item.FieldName" :value="item.FieldCode">

                            </el-option>
                        </el-select>
                    </template>                    
                </el-table-column>

                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" :disabled="scope.$index== 0 && evaluationData.length == 1"   @click.native="deleteLine(scope.$index)">删除</el-button>
                    </template>                    
                </el-table-column>                

                <!-- <div slot="append" v-if="evaluationData.lenght>0"> -->
                    <!--在此处添加你想要插入在表格最后一行的内容-->    
                    <!-- <el-input
                        placeholder="evaluationData[0].DetailFieldCode"
                        :disabled="true"
                        style="width:130px;margin:0 10px">
                    </el-input>
                    <el-input
                        placeholder="evaluationData[0].CalculationType"
                        :disabled="true"
                        style="width:100px;margin: 0 10px 0 5px">
                    </el-input>
                    <el-input
                        placeholder="evaluationData[0].MainFieldCode"
                        :disabled="true"
                        style="width:130px;margin-left: 5px">
                    </el-input>
                </div>                 -->
            </el-table>
            
            <div class="addLineBox marginT10">
              <el-tooltip content="新增行">
                <el-button @click.native="addLine" size="mini"><i class="el-icon-plus"></i></el-button>
              </el-tooltip>
            </div>
          </div>
          <!--赋值 表格container--end-->          
        </el-card>
      </div>

      <!--保存取消部分---->
      <div class="dialog-footer" style="display: block; padding: 10px 0; text-align: center">
        <el-button @click.native="cancelFunctionControl()">取消</el-button>
        <el-button type="primary" @click.native="tableAssignSave()">保存</el-button>
      </div>

    </el-dialog>  
  </transition>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { GetEvaluation, SaveEvaluation } from '@/api/approve'
  import { flowAutoLogin, flowBaseFn, flowNodeSet } from '@/utils/mixin'
  export default {
    mixins: [flowBaseFn, flowAutoLogin, flowNodeSet],
    props: {
      tableAssignShow: {
        type: Boolean,
        default: false
      },
      EvaluationData_main: {
        type: Array,
        default: () => {
          return []
        }
      },
      EvaluationData_detail: {
        type: Array,
        default: () => {
          return []
        }
      },
      evaluationData: {
        type: Array,
        default: () => {
          return []
        }
      },
      calculationType: {
        type: Array,
        default: () => {
          return []
        }
      },
      dailog_loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        flowId: '',
        selectCalculationType: '' // 所选取的 类型
        // calculationType: [
        //   {
        //     type: '合计',
        //     value: 0
        //   },
        //   {
        //     type: '平均',
        //     value: 1
        //   }
        // ]
      }
    },
    created () {
      debugger
      // this.tableData.DetailFieldCode = this.EvaluationData_detail
      // this.tableData.MainFieldCode = this.EvaluationData_main
    },
    mounted () {
    },
    updated () {
  
    },
    components: {
    },
    computed: {
  
    },
    watch: {

    },
    methods: {
      // 获取roleRange
      _getRoleRange () {
        // getRoleRange('WorkFlow').then((res) => {
        //   if (res && res.data.State === REQ_OK) {
        //     debugger
        //     this.roleRange = res.data.Data
        //   }
        // })
      },
      // 保存、保存功能权限主表详情、保存功能权限明细表、保存功能权限附件
      tableAssignSave () {
        debugger
        let flag = true
        this.evaluationData.forEach((item, i) => {
          if ((item.CurrentEvaluation.DetailFieldCode === '--请选择--') || (item.CurrentEvaluation.MainFieldCode === '--请选择--') || (item.CurrentEvaluation.CalculationType === '--请选择--')) {
            this.$message({
              type: 'warning',
              message: `第${i + 1}行配置不完整,请填写完整后保存！`
            })
            flag = false
            return false
          }
        })

        flag && this.$emit('tableAssignSave')
      },
      cancelFunctionControl () {
        // 触发父级 隐藏 dailog 弹窗
        this.$emit('update:tableAssignShow', false)
      },
      // 添加行
      addLine() {
        debugger
        if(this.evaluationData ){
          let newObj = JSON.parse(JSON.stringify(this.evaluationData[this.evaluationData.length-1]))
          // 处理 newObj 将v-model 的值初始化为 空
          try{
              newObj.CurrentEvaluation.DetailFieldCode = ''
              newObj.CurrentEvaluation.DetailTableCode = ''
              newObj.CurrentEvaluation.CalculationType = ''
              newObj.CurrentEvaluation.MainFieldCode = ''
              newObj.CurrentEvaluation.MainTableCode = ''   
            }catch(err){

            }
          this.evaluationData.length && this.evaluationData.push(newObj)
          console.log(this.evaluationData)
          debugger
          // 没有行
          !this.evaluationData.length && this.evaluationData.push({
            DetailFieldCode: [],
            MainFieldCode: [],
            CurrentEvaluation: {}
          })
          console.log(this.evaluationData)
        }else {
          
        }
      },
      // 删除行
      deleteLine(idx) {
        debugger
        this.evaluationData.splice(idx,1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  
</style>
