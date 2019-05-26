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
                :data="tableData"
                border
                style="width: 100%">

                <el-table-column
                    fixed
                    prop="name"
                    label="字段名"
                    width="150"
                    >
                    <template slot-scope="scope" v-if="true">
                        <el-select v-model="scope.row.name" placeholder="请选择" size="mini">
                            <el-option v-for="item in evaluationData" :key="item.value" :label="item.type" :value="item.value">

                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="statisticsType"
                    label="统计类型"
                    width="120">
                    <template slot-scope="scope">
                        <el-select v-model="selectCalculationType" placeholder="请选择" size="mini">
                            <el-option v-for="item in calculationType" :key="item.value" :label="item.type" :value="item.value">

                            </el-option>
                        </el-select>
                    </template>                    
                </el-table-column>
                <el-table-column
                    prop="assginToMain"
                    label="赋值给主字段">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.assginToMain" placeholder="请选择" size="mini">
                            <el-option v-for="item in calculationType" :key="item.value" :label="item.type" :value="item.value">

                            </el-option>
                        </el-select>
                    </template>                    
                </el-table-column>

                <div slot="append">
                    <!--在此处添加你想要插入在表格最后一行的内容-->
                  
                    <el-input
                        placeholder="请输入内容"
                        :disabled="true"
                        style="width:130px;margin:0 10px">
                    </el-input>
                    <el-input
                        placeholder="请输入内容"
                        :disabled="true"
                        style="width:100px;margin: 0 10px 0 5px">
                    </el-input>
                    <el-input
                        placeholder="请输入内容"
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
        <el-button type="primary" @click.native="handleFunctionControlSave()">保存</el-button>
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
      mainTableCode: {
          type: String,
          default: ''
      },
      detailTableCode: {
          type: String,
          default: ''
      }
    },
    data () {
      return {
        dailog_loading: false,
        flowId: '',
        evaluationData : {},// 接口返回的赋值的数据集合
        selectCalculationType: '' , // 所选取的 类型
        tableData: [
            {
                date: '2016-05-02',
                name: '王小虎',
                assginToMain: '上海市普陀区金沙江路 1518 弄',
            }
        ],
        calculationType: [
            {
                type: '合计',
                value: 0
            },
            {
                type: '平均',
                value: 1
            }
        ]
      }
    },
    created () {
      debugger
      // 获取

    },
    mounted () {
        this.$nextTick(() => {
            debugger
            console.log(this.mainTableCode,this.detailTableCode,this.$route.query.flowId)
            // try {
                this.flowId = this.$route.query.flowId
                debugger
                this._getEvaluation()
            // } catch (error) {
                
            // }
        })
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
        // 获取赋值
        _getEvaluation () {
            debugger
            GetEvaluation (this.flowId, this.nodeObj.nodeId,this.mainTableCode, this.detailTableCode).then((res) => {
                debugger
                if(res && res.data.State === REQ_OK) {
                    
                }
            })
        },
        // 保存赋值
        _saveEvaluation () {
            debugger
            SaveEvaluation(this.flowId, this.nodeObj.nodeId, this.mainTableCode, this.detailTableCode, this.selectCalculationType).then((res) => {
                debugger
                if(res && res.data.State === REQ_OK) {

                }
            })
        },
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
      handleFunctionControlSave () {
        this.dailog_loading = true
        debugger
        this._saveEvaluation()
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
