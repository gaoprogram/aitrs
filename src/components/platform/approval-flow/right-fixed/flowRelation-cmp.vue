<!--
  User: gaol
  Date: 2019/7/19
  功能： 选择流程关联的组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
#flowRelationContentWrap
  .search-container
    margin-top -20px
  .container
    height 350px
    .contentBox
      height 350px
      >>>.el-tabs__content
        height calc(100% - 40px) !important
        .el-table
          height 240px
          .el-table__body-wrapper
            overflow auto
            height 180px !important
  .dialog-footer
    margin-top 40px !important 
>>>.el-loading-mask
  top 0 !important
>>>.el-table .warning-row 
  // background: oldlace

>>>.el-table .success-row
  // background: #f0f9eb

.tableClass
  max-height 300px
  overflow auto

</style>

<template>
  <div id="flowRelationContentWrap">
    <!---搜索区----->
    <search-cmp
      @handleSearch="handleSearch($event)"
      @handleReset="handleReset"
      :isMyStart="isMyStart"
      :isMyDeal="isMyDeal"
      :isCopyWithMe="isCopyWithMe"
      :isHideExport="true"
    >
    </search-cmp>

    <!---container区域--->
    <div class="container">
      <el-tabs v-model="currentTabName" type="border-card" class="contentBox"  @tab-click="handleClickTab">
        <el-tab-pane name="myApprove" class="flowRelationList.length? '': 'not_found' ">
          <span slot="label"><i class="el-icon-document-checked"></i> 我审批的</span> 
        </el-tab-pane>
        <el-tab-pane label="我发起的" name="myStart">
          <!-- <span slot="label"><icon-svg :iconClass="myStart"></icon-svg>我发起的</span> -->
          <span slot="label"><i class="el-icon-document"></i> 我发起的</span> 
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="CC">
          <span slot="label"><i class="el-icon-s-promotion"></i> 抄送我的</span> 
        </el-tab-pane>

        <!--内容区--start--->
        <div v-show="currentTabName ==='myApprove' || currentTabName === 'myStart' ">
          <el-table
            ref="multipleTable"
            :data="flowRelationList"
            tooltip-effect="dark"
            style="width: 100%"
            class="tableClass"
            :row-class-name="tableRowClassName"
            v-loading="loading"
            @selection-change="handleSelectionChange">

            <el-table-column
              type="selection"
              width="30">
            </el-table-column>

            <el-table-column
              prop="FlowName"
              label="流程名"
              width="150"
              sortable
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              label="申请人"
              sortable
              width="100"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.StarterName }}</template>
            </el-table-column>

            <el-table-column
              label="部门"
              sortable
              width="100"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.DeptName }}</template>
            </el-table-column>

            <el-table-column
              prop="Title"
              label="标题"
              width="150"
              sortable
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="DeptName"
              label="组织"
              width="120"
              sortable
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="NodeName"
              label="当前节点"
              width="120"
              sortable
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              label="当前处理人"
              width="120"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
                  {{scope.row.TodoEmps }}
                </div>
              </template>
            </el-table-column>  

            <el-table-column
              prop="WFStateText"
              label="状态"
              width="150"
              sortable
              show-overflow-tooltip>
            </el-table-column>              

            <!-- <el-table-column
              prop="BusinessAreaName"
              label="业务领域"
              width="120"
              show-overflow-tooltip>
            </el-table-column> -->

            <el-table-column
              prop="RDT"
              label="时间"
              width="200"
              sortable
              show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.RDT | replaceTime}}</span>
                </template>
            </el-table-column>
          </el-table>  

          <!--分页start-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryObj.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <!--分页end-->
        </div>    

        <!---抄送我的---start--->
        <div v-show="currentTabName ==='CC'">
          <!-- flowRelationList: {{flowRelationList}} -->
          <el-table
            ref="multipleTable"
            :data="flowRelationList"
            tooltip-effect="dark"
            style="width: 100%"
            class="tableClass"
            :row-class-name="tableRowClassName"
            v-loading="loading"
            @selection-change="handleSelectionChange">

            <el-table-column
              type="selection"
              width="30">
            </el-table-column>

            <el-table-column
              prop="FlowName"
              label="流程名"
              width="150"
              sortable
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              label="标题"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.Title }}</template>
            </el-table-column>  

            <el-table-column
              prop="NodeName"
              label="抄送的节点"
              width="120">
              <template slot-scope="scope">{{ scope.row.NodeName }}</template>
            </el-table-column>   

            <el-table-column
              prop="RecName"
              label="抄送人员"
              width="100"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.RecName }}</template>
            </el-table-column>

            <el-table-column
              prop="RDT"
              label="送达时间"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.RDT | replaceTime }}</span>
              </template>
            </el-table-column>                      
          </el-table>  

          <!--分页start-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryObj.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <!--分页end-->
        </div>     
        <!---抄送我的---end--->

        <!--内容区--end--->
      </el-tabs>  
    </div>

    <div slot="footer" class="dialog-footer" v-show="hideFooterBtn">
      <el-button @click="handleCancelBtn">取 消</el-button>
      <el-button type="primary" @click="handleSureBtn">确 定</el-button>
    </div>     
  </div>
</template>

<script type="text/ecmascript-6">
//   import AitrsEditor from '@/base/editor/aitrs-editor'
//   import UploadFile from '@/base/flowUpload/uploadFile'
  import {mapGetters} from 'vuex'
  import SvgIcon from '@/base/Icon-svg'
  import {REQ_OK} from '@/api/config'
  import SearchCmp from '../search-cmp/search-cmp'
  import {
      getRelatedWorkList,
      addRelatedWork,
      myJoinFlow,
      myStartFlow,
      getCcList
  } from '@/api/approve'
  export default {
    components: {
      //UploadFile,
      //AitrsEditor
      SearchCmp
    },
    inheritAttrs: false,
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      currentMainTableObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      currentDetailTableObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      nodeId: {
        type: [String, Number],
        default: ''
      },
      workId: {
        type: String,
        default: ''
      },
      hideFooterBtn: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        loading: false,  // 加载loading
        total: 1,  // 总页数
        showRelativeFlow: false, // 控制相关流程的显示、隐藏
        currentTabName: 'myApprove', // 当前选择的 选项卡的名称
        currentIdx: 0, // 当前选项卡的索引
        flowRelationList: [],   // 关联流程list 列表
        multipleSelection: [],  // 已勾选的集合
        isMyStart: false,
        isMyDeal: true,
        isCopyWithMe: false, 
        queryObj: {
          key: '',
          no: '',
          CompanyApprovalId: '',
          businessAreaCode: '',
          flowSortNo: '',
          rec: '',
          starter: '',
          days: '',
          begin: '',
          end: '',
          sta: -1,
          wfSta: -1,
          pageSize: 10,
          pageNum: 1,
          type: 1   // 类型：1我审批的，2我发起的，3抄送我的
        }      
      }
    },
    computed: {
      ...mapGetters([
        'flowFunctionRole'
      ])
    },
    watch:{
      currentIdx: {
        handler (newValue, oldValue) {
          debugger
          // form 表单变化后 需要重新获取 评论内容
          this._getRelatedWorkList()
        },
        deep: true
      },
      form: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:detailTableList , 并且把值传过去
          console.log('form', newValue, oldValue)
          this.$emit('update:form', newValue)
        },
        deep: true
      }      
    },
    created () {
      // 获取GetRelatedWorkList
        this.$nextTick(()=>{
            this._getRelatedWorkList()
        })
    },
    mounted() {

    },
    methods: {
      tableRowClassName({row,rowIndex}) {
        debugger
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      // 重置搜索条件
      handleReset(data) {
        debugger
        //触发 todo 页面中的eventbus
        // this.$bus.$emit("rightRelationFlowSearchReset")
        this.queryObj = Object.assign(this.queryObj, data)
        this._getRelatedWorkList()
      },
      // 我审批的
      _getMyApprovalFlowTable () {
        debugger
        this.loading = true
        myJoinFlow(this.queryObj, 'globalLoading', '#flowRelationContentWrap').then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.flowRelationList = res.data.Data
            this.total = res.data.Total
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: '我审批的列表获取失败，请重试！'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '我审批的列表获取失败，请重试！'
          })
          this.loading = false
        })
      },
      // 抄送我的
      _getCopyToMeFlowTable () {
        debugger
        this.loading = true
        getCcList(this.queryObj, 'globalLoading', '#flowRelationContentWrap').then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.flowRelationList = res.data.Data
            this.total = res.data.Total
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: '抄送我的列表获取失败，请重试！'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '抄送我的列表获取失败，请重试！'
          })
          this.loading = false
        })
      },
      // 我发起的
      _getMyStartFlowTable () {
        debugger
        this.loading = true
        myStartFlow(this.queryObj,'globalLoading', '#flowRelationContentWrap').then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            debugger
            this.flowRelationList = res.data.Data
            this.total = res.data.Total
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: '我发起的列表获取失败，请重试！'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '我发起的列表获取失败，请重试！'
          })
          this.loading = false
        })
      },
      // 搜索
      handleSearch(params) {
        debugger
        // 触发 todo 页面中的 eventBus
        if(this.currentTabName === 'myApprove'){
          // 我审批的
          this.queryObj = Object.assign(this.queryObj, params)
          debugger
          this._getMyApprovalFlowTable()
        }else if( this.currentTabName === 'myStart'){
          // 我发起的
          this.queryObj = Object.assign(this.queryObj, params)
          debugger    
          this._getMyStartFlowTable()
        }else if (this.currentTabName === 'CC'){
          // 抄送我的
          this.queryObj = Object.assign(this.queryObj, params)
          debugger          
          this._getCopyToMeFlowTable()
        }
      },
      // 切换选项卡
      handleClickTab (tab, event) {
        debugger
        if(tab.index ==='0' ){
          // 我审批的
          this.currentIdx = 0
          this.isMyDeal = true
          this.isMyStart = false
          this.isCopyWithMe = false
          this.queryObj.type = 1
        }else if( tab.index ==='1'){
          // 我发起的
          this.currentIdx = 1
          this.isMyDeal = false
          this.isMyStart = true
          this.isCopyWithMe = false
          this.queryObj.type = 2
        }else if( tab.index ==='2'){
          // 抄送我的
          this.isMyDeal = false
          this.isMyStart = false
          this.isCopyWithMe = true
          this.currentIdx = 2
          this.queryObj.type = 3
        }
      },
      // 获取关联流程的list
      _getRelatedWorkList() {
          debugger
          if(this.currentIdx == 0 ){
            // 我审批的
            this._getMyApprovalFlowTable()
          }else if (this.currentIdx == 1){
            // 我发起的
            this._getMyStartFlowTable()
          }else if( this.currentIdx == 2){
            // 抄送我的
            this._getCopyToMeFlowTable()
          }

          // 下面的接口不用了
          // getRelatedWorkList(this.queryObj, this.currentMainTableObj.TableCode, 'globalLoading', '#flowRelationContentWrap' ).then(res => {
          //     this.loading = false
          //     if(res && res.data.State === REQ_OK){
          //       debugger
          //       this.flowRelationList = res.data.Data
          //       this.total = res.data.Total
          //     }else {
          //         this.$message({
          //             type: 'warning',
          //             message: `获取关联流程失败:${res.data.Error},请重试`
          //         })
          //     }
          // }).catch(err => {
          //     this.$message({
          //         type: 'error',
          //         message: '获取关联流程列表失败err'
          //     })
          // })
      },
      // 确定后添加关联
      _addRelatedWork () {
        this.loading = true
        return new Promise((resolve, reject) => {
          addRelatedWork(this.nodeId, this.workId, JSON.stringify(this.multipleSelection),'globalLoading', '#flowRelationContentWrap').then(res => {
            this.loading = false
            if(res && res.data.State === REQ_OK){
              this.$message({
                type: 'success',
                message: '流程关联成功'
              })
              resolve()
            }else {
              this.$message({
                type: 'error',
                message: `相关流程关联失败err:${res.data.Error},请重试`
              })
              reject(`addRelatedWork接口：${res.data.Error}`)
            }
          }).catch(error=>{
            this.$message({
              type: 'error',
              message: '相关流程关联失败err'
            })
            reject(`addRelatedWork接口：${res.data.Error}`)
          })
        })
      },
      // 勾选/取消勾选
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 取消
      handleCancelBtn(){
        // 触发父级页面的 事件
        this.$emit('handleCancelBtn')
      },
      // 选择后 确定
      handleSureBtn() {
        if(!this.multipleSelection.length ){
          // 未选择
          this.$message.info("未选择关联的流程,请先选择！")
          return
        }

        this._addRelatedWork().then(() => {
          // 触发父级页面的 确定事件
          this.$emit('handleSureBtn')
        })
      },

      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this.loading = true
        this._getRelatedWorkList()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this.loading = true
        this._getRelatedWorkList()
      },

      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      },
      changeOrgDetailCmp (prop) {
        this.$refs[`detailForm${this.currentDetailTableCode}`].validateField(prop)
      }
    }
  }
</script>

