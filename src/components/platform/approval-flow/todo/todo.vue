<!--
  User: gaol
  Date: 2019/6/12
  功能：审批流——待办
-->

<template>
  <div class="todo-container mglr-30">
    <tab-router></tab-router>
    <!--左边区域---start-->
    <div class="left-container" :class="{'isRight': showRight}">
      <!----搜索组件-start-->
      <search-cmp
        :isTodo="true"
        @handleSearch="handleSearch"
        @exportFlowSelectAll="_exportFlowSelectAll"
        @handleReset="handleReset"
      >
      </search-cmp>
      <!----搜索组件-end-->
      <!--表格内容区域--start--->
      <div class="table-container">
        <!-- activeName：{{activeName}}  -->
        <div class="tool-btn-container">
          <el-button 
            @click="dialogBatchAgree = true"  
            v-if="activeName == 'six' || 'first'" 
            size="mini"
            type="primary"
            :disabled="!multipleSelection.length">
            批量提交
          </el-button>
          <el-button 
            @click="dialogBatchRefuse = true" 
            v-if="activeName == 'first' || 'six'" 
            size="mini"
            type="primary"
            :disabled="!multipleSelection.length">
            批量拒绝
          </el-button>
          <el-button 
            @click="_exportFlowSelect()" 
            size="mini"
            type="primary"
            :disabled="!multipleSelection.length">
            选中导出
          </el-button>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="审批中" name="first"></el-tab-pane>
          <el-tab-pane label="草稿" name="second"></el-tab-pane>
          <el-tab-pane label="挂起" name="third"></el-tab-pane>
          <el-tab-pane label="全部" name="fourth"></el-tab-pane>
          <el-tab-pane label="任务池" name="five"></el-tab-pane>
          <el-tab-pane label="已领任务" name="six"></el-tab-pane>
          <el-tab-pane label="流转异常" name="seven"></el-tab-pane>
        </el-tabs>

        <!-- tableArr: {{tableArr}} -->
        <div :class="['table',!tableArr.length? 'not_found': '']" v-loading="loading">
          <el-table
            ref="multipleTable"
            border
            height="500"
            :data="tableArr"
            tooltip-effect="dark"
            style="width: 100%"
            empty-text=' '
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              fixed="left"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
              >
            </el-table-column>
            <el-table-column
              prop="FlowName"
              label="流程名"
              width="120"
              sortable
              show-overflow-tooltip>          
            </el-table-column>
            <el-table-column
              prop="Title"              
              label="标题"
            >
              <template slot-scope="scope">
                <!-- <el-badge is-dot class="item"> -->
                  <el-button class="share-button" icon="" style="padding:5px" :type="_EmergencyLevelColor(scope.row.EmergencyLevel)" size="mini" @click="editEmergencyLevel(scope)" v-text="_EmergencyLevel(scope.row.EmergencyLevel)"></el-button>
                <!-- </el-badge>      -->
                <el-tooltip effect="dark" :content="scope.row.Title">
                  <span>{{scope.row.Title}}</span>                  
                </el-tooltip>           
              </template>
            </el-table-column>
            <el-table-column
              prop="StarterName"
              label="申请人"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="DeptName"
              label="组织"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="NodeName"
              label="当前节点"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              label="当前处理人"
              width="120">
              <template slot-scope="scope">
                <div>
                  {{scope.row.TodoEmps }}
                </div>
              </template>
            </el-table-column>            
            <el-table-column
              prop="WFStateText"
              label="状态"
              width="120"
              sortable>
              <template slot-scope="scope">
                <!-- {{scope.row.SecurityClass}} -->
                <!-- <el-badge is-dot class="item"> -->
                  <el-button disabled class="share-button" icon="" style="padding:5px" :type="_securityClass(scope.row.SecurityClass)" size="mini" @click="editSecurityClassLevel(scope)" v-text="_securityLevel(scope.row.SecurityClass)"></el-button>
                <!-- </el-badge>      -->
                <el-tooltip effect="dark" :content="scope.row.WFStateText">
                  <span>{{scope.row.WFStateText}}</span>                  
                </el-tooltip>           
              </template>                  
            </el-table-column>
            <el-table-column
              prop="BusinessAreaName"
              label="业务领域"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="RDT"
              label="申请时间"
              sortable
              width="150"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.RDT | replaceTime }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="操作"
              fixed="right"
            >
              <template slot-scope="scope">
                <!-- dfjdk:{{scope.row.WFState === 1 || scope.row.WFState === 2 &&　activeName !== 'five' && !showRight}}
                scope.row.WFState: {{scope.row.WFState}}
                scope.row.WFState: {{scope.row.WFState}}
                activeName: {{activeName}}
                showRight: {{showRight}} -->
                <el-button
                  type="text"
                  size="small"
                  @click="handleShowDetail({currentFlow:scope.row, typeStr: 'todo', activeNameStr:activeName, WFState: scope.row.WFState }, scope.$index)"
                >查看
                </el-button>

                <el-button
                  type="text"
                  size="small"
                  v-if="(scope.row.WFState === 1 || scope.row.WFState === 2 &&　activeName !== 'five') && !showRight"
                  @click="handleFn(scope.row, 'Send', 'todoSend')"
                >提交
                </el-button>

                <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'five'"
                  @click="handleFn(scope.row,'applyTask')"
                >申领
                </el-button>   
                           
                
                <!-- <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'second'"
                  @click="handleFn(scope.row, 'Send')"
                >提交
                </el-button> -->
                <el-button
                  type="text"
                  size="small"
                  v-if= "scope.row.WFState === 2 && activeName !=='five'"
                  @click="handleFn(scope.row, 'Refuse')"
                >拒绝
                </el-button>

                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.WFState === 4"
                  @click="handleFn(scope.row, 'unHungUp')"
                >取消挂起
                </el-button>

              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="queryObj.pageNum"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="queryObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <!--表格内容区域--start--->
    </div>
    <!--左边区域---end-->

    <!--右边区域---start-->
    <div v-if="showRight" class="rightContentWrap">
      <right-fixed
        ref="rightFixed"
        v-if="showRight"
        @closeRight="closeRight"
        :form="currentForm"
        :currentTabNameStr = 'activeName'
        :loadingProp.sync="rightLoading"
        :versionId="versionId"
        :ccPk="ccPk"
        @next="next"
        @prev="prev"
        @refreshForm="refreshForm"
      >
      </right-fixed>
    </div>
    <!--右边区域---start-->

    <!---修改紧急状态---start--->
    <el-dialog 
      :title="levelTitle"
      :visible.sync="showTitleStatus"
      :show-close="true"
      width="500px"
      append-to-body>

      <!---紧急程度---->
      <el-select v-if="levelTitle === '修改紧急程度'" v-model="emergencyTitleStatus" placeholder="请选择" style="width:100%">
        <el-option
          v-for="(item,idx) in energencyLevelSource"
          :key="idx"
          :label="item.Name"
          :value="item.Code">
        </el-option>
      </el-select>   

      <!--保密级别------>
      <el-select v-if="levelTitle === '修改保密级别'" v-model="securityTitleStatus" placeholder="请选择" style="width:100%">
        <el-option
          v-for="(item,idx) in energencyLevelSource"
          :key="idx"
          :label="item.Name"
          :value="item.Code">
        </el-option>
      </el-select>       
      
      <div class="footer marginT20 center">
        <el-button @click="showTitleStatus = false">取 消</el-button>
        <el-button type="primary" @click="_clickEditSureBtn(levelTitle)">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改紧急状态-----end---->


    <!-- 按钮（提交，会签，加签，拒绝，移交，评论等）统一弹窗区域 --start--->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body>
      <component
        v-if="dialogVisible"
        :is="currentComponent(str)"
        :todoSendFlag = "todoSendFlag"
        :batchAgreeObj.sync = "batchAgreeObj"
        :flow="currentFlow"
        :nextStepAccepterEmpArr = "nextStepAccepterEmpArr"
        :isNotMust = "isNotMust"
        @DialogCancel="dialogVisible = false"
        @success="handleSuccess"
      ></component>
    </el-dialog>
    <!-- 按钮（提交，会签，加签，拒绝，评论等）统一弹窗区域 --end--->

    <!-- 批量同意弹窗区域 --start--->
    <el-dialog
      title="批量同意意见"
      :visible="dialogBatchAgree"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body>
      <div class="btn-component-container" v-loading="loading">
        <aitrs-editor
          v-if="dialogBatchAgree"
          ref="aitrsEditorAgree"
          @editor="changeContentAgree"
          :content="batchAgreeObj.opinion"
          :isShowImg="isShowImg"
          placeholder="请输入处理意见"
        >
        </aitrs-editor>
        <span class="footer">
          <el-button @click="dialogBatchAgree = false">取 消</el-button>
          <el-button type="primary" @click="handleBatchSend()">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 批量同意弹窗区域 --end--->

    <!--批量拒绝意见弹框区域--start--->
    <el-dialog
      title="批量拒绝意见"
      :visible="dialogBatchRefuse"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body>
      <div class="btn-component-container" v-loading="loading">
        <aitrs-editor
          v-if="dialogBatchRefuse"
          ref="aitrsEditorRefuse"
          @editor="changeContentRefuse"
          :content="batchRefuseObj.opinion"
          :isShowImg="isShowImg"
          placeholder="请输入处理意见"
        >
        </aitrs-editor>

        <span class="footer">
          <el-button @click="dialogBatchRefuse = false">取 消</el-button>
          <el-button type="primary" @click="handleBatchRefuse()">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!--批量拒绝意见弹窗区域--end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    todolist,
    batchSend,
    batchRefuse
  } from '@/api/approve'
  import tabRouter from '@/components/platform/approval-flow/tab-router/tab-router'
  import rightFixed from '@/components/platform/approval-flow/right-fixed/right-fixed'
  import SearchCmp from '../search-cmp/search-cmp'
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import { flowCommonFn } from '@/utils/mixin'

  export default {
    // 引用的mixin中的 flowCommonFn 方法进行 查看，取消挂起，获取form 表单数据等
    mixins: [flowCommonFn],
    components: {
      SearchCmp,
      tabRouter,
      rightFixed,
      AitrsEditor
    },
    data () {
      return {
        keyWord: '',
        activeName: 'fourth',
        queryObj: {
          key: '',
          no: '',
          flowSortNo: '',
          starter: '',
          days: '',
          begin: '',
          end: '',
          wfSta: -1,
          taskSta: '',
          pageSize: 10,
          pageNum: 1
        },
        todoSendFlag: '', // todo页面中 table表格中的 提交按钮  todoSend
        tableArr: [],
        total: 0,
        multipleSelection: [],  // 选中的 对象集合
        dialogBatchAgree: false,
        batchAgreeObj: {
          Works: [],
          opinion: ''
        },
        dialogBatchRefuse: false,
        batchRefuseObj: {
          Works: [],
          opinion: ''
        },
        isShowImg: false      
      }
    },
    created () {
      // 接收 rightfixed 中改变节点后，从新调用getform后，将结果返回来 改变 currentform值
      this.$bus.$on('rightFixedFormChange', (data) => {
        debugger
        console.log("rightFixedFormChange 触发成功")
        if(data){
          debugger
          this.currentform = data
        }
      })

      // 接收 rightfixed 中添加流程关联时，搜索条件的重置事件
      this.$bus.$on('rightRelationFlowSearchReset', () => {
        // 调用mixins  flowCommonFn中的handleReset 方法
        this.handleReset()
      })

    },
    beforeDestroy(){
      // 销毁busEvent
      this.$bus.$off('rightFixedFormChange')
      this.$bus.$off('rightRelationFlowSearchReset')
    },
    methods: {
      // 待办列表
      _getFlowTable () {
        debugger
        this.loading = true
        todolist(this.queryObj).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.tableArr = res.data.Data
            this.total = res.data.Total
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: '待办列表获取失败，请重试！'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '待办列表获取失败，请重试！'
          })
          this.loading = false
        })
      },
      // 批量提交按钮 批量提交
      _batchSend () {
        this.loading = true
        batchSend(this.batchAgreeObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '批量提交成功'
            })
            this.dialogBatchAgree = false
            // 成功了之后 重新获取表格的数据
            this._getFlowTable()
          } else {
            this.dialogBatchAgree = false
            // this.$message({
            //   duration: 0,
            //   showClose: true,
            //   dangerouslyUseHTMLString: true,
            //   message: `${res.data.Error}`              
            // })
            let tipStr = `<strong>注：</strong><p style="color:red">明细表必须增加行/明细表不能为空表，需对各单据进行查看，请点击“查看”，添加明细表内容后，在表单页提交;
                          <br>选择下一步处理人/需要填写处理意见，需对各单据单独进行提交</p>`
            let newError = res.data.Error + '<br>' + tipStr
            this.$notify({
              type:'warning',
              title: '提示',
              duration: 0,
              dangerouslyUseHTMLString: true,
              message: newError
            })

            // this.$message(`${res.data.Error}`, '提示', {
            //   dangerouslyUseHTMLString: true
            // })          
            // 失败了之后 也需要刷新页面（有些提交成功了，有些没有提交成功）
            this._getFlowTable()
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$message.error('设置失败，请重试！无法执行批量提交')
        })
      },
      // 批量拒绝
      _batchRefuse () {
        batchRefuse(this.batchRefuseObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success({
              type: 'success',
              message: '批量拒绝成功'
            })
            this.dialogBatchRefuse = false
            this._getFlowTable()
          } else {
            this.$message.error(res.data.Error)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$message.error('设置失败，请重试！无法执行批量提交')
        })
      },
      //
      // agreeEmit(opt){
      //   debugger
      //   if(!opt){
      //     //提交成功，没有下一步操作人
      //     this._getFlowTable()
      //     this.dialogVisible = false
      //   }else {
      //     let state = opt.state
      //     this.nextStepAccepterEmpArr = opt.nextStepAccepterEmpArr.Data || []
      //     if(state === 2){
      //       // 必须添加下一步操作人
      //       this.isNotMust = false
      //     }else if( state === 3 ){
      //       // 非必须添加下一步操作人
      //       this.isNotMust = true
      //     }
      //   }
      //   // 重新刷新table表格
      //   // this._getFlowTable()
      //   // 关闭弹框
      //   // this.dialogVisible = false
      // },
      // 切换表格类型
      handleTabClick (tab, event) {
        // 需要将right-fixed 关闭，否则 从 挂起或者任务池类目 点击了查看btn了后，再切换到其他类目下查看 right-fixed 不会重新渲染
        this.showRight = false
        // 将页码初始化为1
        this.queryObj.pageNum = 1
        switch (this.activeName) {
          case 'first':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 0, taskSta: ''})
            this._getFlowTable()
            return
          case 'second':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 2, taskSta: ''})
            this._getFlowTable()
            return
          case 'third':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 10, taskSta: ''})
            this._getFlowTable()
            return
          case 'fourth':
            this.queryObj = Object.assign(this.queryObj, {wfSta: -1, taskSta: ''})
            this._getFlowTable()
            return
          case 'five':
            this.queryObj = Object.assign(this.queryObj, {wfSta: -1, taskSta: 1})
            this._getFlowTable()
            return
          case 'six':
            this.queryObj = Object.assign(this.queryObj, {wfSta: -1, taskSta: 2})
            this._getFlowTable()
            return
          case 'seven':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 11, taskSta:''})
            this._getFlowTable()
        }
      },
  
      // 表格多选
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      changeContentAgree (val) {
        this.batchAgreeObj.opinion = val
      },
      changeContentRefuse (val) {
        this.batchRefuseObj.opinion = val
      },
      // 批量提交确定
      handleBatchSend () {
        debugger
        this.batchAgreeObj.Works = []
        this.multipleSelection.forEach(item => {
          this.batchAgreeObj.Works.push({
            WorkId: item.WorkId,
            FK_Flow: item.FK_Flow,
            FK_Node: item.FK_Node
          })
        })
        // if (!this.batchAgreeObj.opinion) return this.$message.info('请输入处理意见')
        this._batchSend()
      },
      // 批量拒绝
      handleBatchRefuse () {
        this.batchRefuseObj.Works = []
        this.multipleSelection.forEach(item => {
          this.batchRefuseObj.Works.push({
            WorkId: item.WorkId,
            FK_Flow: item.FK_Flow,
            FK_Node: item.FK_Node
          })
        })
        // if (!this.batchRefuseObj.opinion) return this.$message.info('请输入处理意见')
        this._batchRefuse()
      },
      // 导出全部
      _exportFlowSelectAll (param) {
        debugger
        this.queryObj = Object.assign(this.queryObj, param)
        let url = `${BASE_URL}/WorkFlow?Method=ExportTodolist&TokenId=&CompanyCode=${this.companyCode}&no=${this.queryObj.no}&key=${this.queryObj.key}&flowSortNo=${this.queryObj.flowSortNo}&starter=${this.queryObj.starter}&days=${this.queryObj.days}&begin=${this.queryObj.begin}&end=${this.queryObj.end}&wfSta=${this.queryObj.wfSta}&taskSta=${this.queryObj.taskSta}&userId=${this.userCode}`
        window.open(url)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .todo-container
    .left-container
      .table-container
        overflow hidden
        .tool-btn-container
          text-align right
        >>>.el-loading-mask
          background-color transparent !important          
      &.isRight
        margin-right 700px
        transition margin-right .1s ease-out
    .rightContentWrap
      .right-fixed-container
        .close
          margin-top 40px  
          color red   
    
  .btn-component-container
    .footer
      display block
      margin-top 20px
      text-align center
// >>>.el-table__empty-text
.el-notification.right
  height 80% !important
  >>>.el-notification__content
    max-height 90% !important
    overflow auto !important
</style>
