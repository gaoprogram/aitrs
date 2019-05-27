<!--
  User: gaol
  Date: 2019/5/24
  功能: 流程配置——流程表單——表单赋值
-->
  <template>
    <transition name="el-zoom-in-center">
      <el-dialog
        title="表单赋值"
        width="500px"
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
            <!-- {{tableData}} -->
            <el-table
                :data="evaluationData"
                border
                style="width: 100%">

                <el-table-column
                    fixed
                    prop="name"
                    label="字段名"
                    width="150"
                    >
                    <template slot-scope="scope" v-if="true">
                        <el-select v-model="scope.row.DetailFieldCode" placeholder="请选择" size="mini" @change="">
                            <el-option v-for="item in EvaluationData_main" :key="item.value" :label="item.type" :value="item.value">

                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="statisticsType"
                    label="统计类型"
                    width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.CalculationType" placeholder="请选择" size="mini">
                            <el-option v-for="item in calculationType" :key="item.value" :label="item.type" :value="item.value">

                            </el-option>
                        </el-select>
                    </template>                    
                </el-table-column>
                <el-table-column
                    prop="assginToMain"
                    label="赋值给主字段">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.MainFieldCode" placeholder="请选择" size="mini">
                            <el-option v-for="item in EvaluationData_detail" :key="item.value" :label="item.type" :value="item.value">

                            </el-option>
                        </el-select>
                    </template>                    
                </el-table-column>

                <div slot="append" v-if="evaluationData.lenght>0">
                    <!--在此处添加你想要插入在表格最后一行的内容-->
                  
                    <el-input
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
                </div>                
            </el-table>
          </div>
          <!--赋值 表格container--start-->          
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
      }
    },
    data () {
      return {
        dailog_loading: false,
        flowId: '',
        selectCalculationType: '', // 所选取的 类型
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            assginToMain: '上海市普陀区金沙江路 1518 弄'
          }
        ]
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
        this.dailog_loading = true
        debugger
        this.$emit('tableAssignSave', this.selectCalculationType)
      },
      cancelFunctionControl () {
        this.$emit('update:tableAssignShow', false)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  
</style>
