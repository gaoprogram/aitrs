<!--
  User: gaol
  Date: 2019/6/12
  功能：审批流（待办，在途，我发起的，我审批的，抄送我的，我关注的） 页面中的 右侧信息展示区域
-->

<template>
  <transition name="move">
    <div class="right-fixed-container" v-loading="loading">
      <!-- form: {{form}} -->
      <!-- <el-tooltip class="item" effect="dark" content="关闭" placement="bottom"> -->
        <div class="close" @click="close">
          <i class="el-icon-circle-close-outline"></i>
        </div>
      <!-- </el-tooltip> -->
      <div class="content-container" v-if="form.Flow">
        <div class="btn-container">
          <!-- form.Buttons: {{form.Buttons}} -->
          <!-- form: {{form}} -->
          <div class="fn-btn">
            <el-button
              round
              size="small"
              v-for="(btn, index) in form.Buttons"
              :key="index"
              @click="handleFn(btn.Method)"
            >{{btn.Text}}
            </el-button>
            <el-button round size="small" type="primary" @click.native="_focus(focusTit)">{{focusTit}}</el-button>
            <el-button round size="small" type="primary" :disabled="!mainTables.length" @click.native="showExportSelectMainTable = true">导出</el-button>
            <el-button round size="small" type="primary" @click.native="handlePrintFlow">打印</el-button>
            <el-button round size="small" type="primary" @click.native="prev()">上一条</el-button>
            <el-button round size="small" type="primary" @click.native="next()">下一条</el-button>
          </div>
        </div>
        <!---右侧fixed 详情区域---start--->
        <div class="table-content">
          <div class="table-title">{{form.Flow.FlowName}}</div>
          <!-- form.Tags： {{form.Tags}} -->
          <!--tag标签区域--start--->
          <div style="margin-bottom: 10px">
            <el-tag v-for="(tag,idx) in form.Tags" :color="idx===currentTagIdx? 'rgba(230,162,60,1)': ''" effect="dark" :key="tag.Method" style="margin:1px" @click="clickTags(tag.Method, idx)">{{tag.Text}}</el-tag>
          </div>
          <!--tag标签区域--start--->

          <!--主表tabs显示区域----start--->
          <div class="main-content">
            <!-- mainTables： {{mainTables}} -->
            <el-tabs v-model="currentMainTableCode" type="card" @tab-click="handleClickMainTableTab">
              <el-tab-pane
                v-for="item in mainTables"
                :key="item.TableCode"
                :label="item.TableName"
                :name="item.TableCode"
              >
              </el-tab-pane>
            </el-tabs>
          <!--主表tabs显示区域----start--->

            <div>
              <el-scrollbar style="height: 100%;width: 100%">
                <!-- currentMainTableObj.Fields: {{currentMainTableObj.Fields}} -->
                <el-form :model="currentMainTableObj" ref="launchForm"
                         class="main_form">
                  <!--当前主表的内容区域--start--->                         
                  <div class="field" v-for="(field, index) in currentMainTableObj.Fields" :key="index">
                    <!--当前主表的详情区域--start--->
                    <template v-if="rightContentCurrentStr === 'GetForm'">
                      <div v-if="field.Role !== 4">
                        <!--注： 14 表示 图片上传 --15 表示 附件上传-->
                        <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                          {{field.FieldName}} : {{field.DisplayValue}}
                          <span class="field-edit">
                            <el-button
                              type="text"
                              v-if="field.Role === 2"
                              @click="field.showEdit = !field.showEdit"
                            >
                              {{field.showEdit ? '收起' : '修改'}}
                            </el-button>
                          </span>
                        </span>
                        <!-----为图片  或者 附件时---start-->
                        <span class="field-name" v-else>
                          {{field.FieldName}} :
                          <span style="color: #3B8BE3" v-for="val in field.DisplayValue" :key="val.Url">
                            {{val.Name}}
                            <span style="margin-left: 10px">
                              <a :href="val.Url" :download="val.Name">
                                <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                              </a>
                              <el-button type="text" :disabled="!attachmentRole.CanDelete">删除</el-button>
                              <span class="field-edit">
                                <el-button
                                  type="text"
                                  v-if="field.Role === 2"
                                  @click="field.showEdit = !field.showEdit"
                                >
                                  {{field.showEdit ? '收起' : '修改'}}
                                </el-button>
                              </span>
                            </span>
                          </span>
                        </span>
                        <!-----为图片  或者 附件时---end-->
                        <!--动态显示编辑的动态组件--start--->
                        <div v-if="field.showEdit">
                          <component
                            :is="currentRuleComponent(field.ControlType)"
                            :prop="'Fields.' + index + '.FieldValue'"
                            :obj="field"
                            :workId="form.Flow.WorkId"
                            :nodeId="form.Flow.FK_Node"
                            :attachmentRole="attachmentRole"
                            :isTitle="false"
                            @changeEmp="changeOrgMainCmp('launchForm', $event)"
                          ></component>
                        </div>
                        <!--动态显示编辑的动态组件--end--->
                      </div>
                    </template>
                    <!--当前主表的详情区域---end-->
                  </div>
                    <!--当前主表的非【显示详情】--start--->
                    <template v-if="rightContentCurrentStr !== 'GetForm'">
                      
                        <component
                          :is="currentContentComponents(rightContentCurrentStr)"
                          :rightContentCurrentStr="rightContentCurrentStr"
                          :obj.sync="currentMainTableObj"
                          :workId="form.Flow.WorkId"
                          :nodeId="form.Flow.FK_Node"
                          :form.sync="form"
                          :attachmentRole="attachmentRole"                      
                        >
                        </component>
                    </template>
                    <!--当前主表的非【显示详情】--end--->       
                    <!--当前主表的内容区域--end--->                               
                </el-form>

                <!--分组--start---->
                <template v-for="team in currentMainTableObj.Teams" v-if="rightContentCurrentStr === 'GetForm'">
                  <div style="border-bottom: 1px solid #dedede; padding-bottom: 10px;margin-bottom: 20px">
                    <span class="team-title" style="font-size: 16px">{{team.TeamName}}</span>
                    <el-form :model="team" :ref="`team${team.TeamCode}`"
                             class="main_form">
                      <div class="field" v-for="(field, index) in team.Fields" :key="index">

                        <div v-if="field.Role !== 4">
                          <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                            {{field.FieldName}} : {{field.DisplayValue}}
                            <span class="field-edit">
                              <el-button
                                type="text"
                                v-if="field.Role === 2"
                                @click="field.showEdit = !field.showEdit"
                              >
                                {{field.showEdit ? '收起' : '修改'}}
                              </el-button>
                            </span>
                          </span>

                          <span class="field-name" v-else>
                            {{field.FieldName}} :
                            <span style="color: #3B8BE3" v-for="val in field.DisplayValue" :key="val.Url">
                              {{val.Name}}
                              <span style="margin-left: 10px">
                                <a :href="val.Url" :download="val.Name">
                                  <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                                </a>
                                <el-button type="text" :disabled="!attachmentRole.CanDelete">删除</el-button>
                                <span class="field-edit">
                                  <el-button
                                    type="text"
                                    v-if="field.Role === 2"
                                    @click="field.showEdit = !field.showEdit"
                                  >
                                    {{field.showEdit ? '收起' : '修改'}}
                                  </el-button>
                                </span>
                              </span>
                            </span>
                          </span>

                          <div v-if="field.showEdit">
                            <component
                              :is="currentRuleComponent(field.ControlType)"
                              :prop="'Fields.' + index + '.FieldValue'"
                              :obj="field"
                              :workId="form.Flow.WorkId"
                              :nodeId="form.Flow.FK_Node"
                              :attachmentRole="attachmentRole"
                              :isTitle="false"
                              @changeEmp="changeOrgMainCmp(`team${team.TeamCode}`, $event)"
                            ></component>
                          </div>
                        </div>

                      </div>
                    </el-form>
                  </div>
                </template>
                <!--分组--end---->
              </el-scrollbar>
            </div>
          </div>

          <!--查看明细表btn--start--->
          <div class="detail-content" v-if="detailTables && detailTables.length && rightContentCurrentStr === 'GetForm'">
            <el-button type="text" @click="showDetailTable = true"><i class="el-icon-view" ></i>查看明细表</el-button>
            <el-button type="text" @click="handleDownLoadDetail" v-show="attachmentRole.DetailTableCanDownload"><i class="el-icon-download">下载</i></el-button>
            <!---上传明细表----start--->
            <div class="detail-upload">
              <el-button type="text" @click="handleUpLoadDetail" v-show="attachmentRole.DetailTableCanUpload"><i class="el-icon-upload2">明细表上传</i></el-button>
            </div>
            <!----上传明细表----end--->            
          </div>
          <!--查看明细表btn--end--->


          <!--审批进度---start-->
          <!-- <div class="tracks-container" v-if="form.Tracks.length">
            <div class="name">审批进度</div>
            <timeline>
              <li class="timeline-item" v-for="(track, index) in form.Tracks">
                <em class="timeline-icon"></em>
                <div>
                  <span>{{track.EmpName}}</span>
                  <span style="margin-left: 30px">状态：{{track.ActionTypeText}}</span>
                  <span style="margin-left: 30px">{{ track.CreateTime | replaceTime }}</span>
                </div>
                <div style="padding-left: 15px; padding-top: 15px">
                  建议：<span v-html="track.Opinion"></span>
                </div>
                <div style="margin-top: 10px;font-size: 12px" v-if="track.Msg && track.Msg !== '无'">
                  消息：{{track.Msg}}
                </div>
              </li>
            </timeline>
          </div> -->
          <!--审批进度---end-->

          <!---评论区域（节点意见区域（可填写节点意见，上传意见的附件，可删除附件等））---start-->
          <!-- <div class="comments-container" v-if="form.Comments.length"> -->
            <!-- flowFunctionRole: {{form.FunctionRole.ShowOpinion}} -->
          <div class="comments-container" v-if="rightContentCurrentStr==='GetForm'">
            <div class="content-tit" v-show="form.FunctionRole.ShowOpinion">节点意见名称-默认处理意见</div>
            <!---意见组件区域----start--->
            <option-cmp 
                  :form.sync="form" 
                  :workId="form.Flow.WorkId" 
                  :nodeId="form.Flow.FK_Node" 
                  :currentDetailTableObj="currentDetailTableObj"
                  :currentMainTableObj="currentMainTableObj"
                  :commentsList="commentsList"></option-cmp>  
            <!---意见组件区域----end--->

            <!--流程进度区域---start-->
            <!-- form: {{form}} -->
            <process-progress-cmp :form="form" :workId="form.Flow.WorkId" :nodeId="form.Flow.FK_Node"></process-progress-cmp>
            <!--流程进度区域---end-->

            <!--评论区域--start--->
            <!-- <div class="comment-item" v-for="comment in form.Comments">
              <div class="desc">
                {{comment.CreatorName}}
                <span style="display: inline-block;width: 50px"></span>
                {{comment.CreateTime | replaceTime}}
                <i class="el-icon-delete"></i>
              </div>
              <div class="content">评论：{{comment.Content}}</div>
            </div> -->
            <!--评论区域--end--->

            <!--评论区域---start-->
              <feedback-and-comment-cmp :form="form">   
              </feedback-and-comment-cmp>
            <!---评论区域---end-->
          </div>
          <!---评论区域（节点意见区域（可填写节点意见，上传意见的附件，可删除附件等））--end-->
        </div>
        <!---右侧fixed 详情区域---start--->
      </div>

      <!-- 明细表展示弹框 start-->
      <div v-if="showDetailTable">
        <detail-table
          :detailTableList="detailTables"
          :workId="flowObj.WorkId"
          :nodeId="flowObj.FK_Node"
          :attachmentRole="attachmentRole"
          @detailTableCancel="showDetailTable = false"
          @detailTableSure="showDetailTable = false">
        </detail-table>
      </div>
      <!-- 明细表展示弹框 end-->

      <!-- 明细表下载 ---start-->
      <el-dialog
        title="明细表选择"
        :visible="showDownDetailTable"
        width="600px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body>
        <el-table
          border
          ref="multipleTable"
          :data="detailTables"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="Name"
            label="名称"
          >
          </el-table-column>
        </el-table>
        <save-footer @save="handleSaveDownloadDetail" saveText="下载" @cancel="showDownDetailTable = false"></save-footer>
      </el-dialog>
      <!-- 明细表下载 ---end-->
 
      <!--明细表上传(包括明细表模板的下载)---start--->
      <div v-if="showUpDetailTable">
        <el-dialog
          :title="`【${currentDetailTableObj.Name}】明细表上传`"
          selectTit = '选择附件'
          :visible.sync="showUpDetailTable"
          width="600px"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="true"
          append-to-body>
          <!-- currentDetailTableObj: {{currentDetailTableObj}} -->
          <el-button type="text" @click="downLoadDetailTemplate"><i class="el-icon-download">下载【{{currentDetailTableObj.Name}}】明细表模版</i></el-button>        
          <upload-file 
            :workId="form.Flow.WorkId" 
            :nodeId="flowObj.FK_Node" 
            :detailTableCode="currentDetailTableObj.DetailTableCode" 
            :mainTableCode="currentMainTableObj.TableCode"
            :limitUploadDetailTableNum = "limitUploadDetailTableNum"
            @uploadDetailSuccess="uploadDetailSuccess">
          </upload-file>
          <!-- <save-footer @save="handleSaveUploadloadDetail" saveText="下载" @cancel="showUpDetailTable = false"></save-footer> -->
        </el-dialog>      
      </div>
      <!--明细表上传(包括明细表模板的下载)---end--->

      <!-- 按钮统一弹窗(提交、拒绝、移交，加签，会签等) ---start---->
      <el-dialog
        :title="dialogTitle"
        :visible="dialogVisible"
        width="600px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body>
        <component
          :is="currentComponent(str)"
          :form="form"
          :flow="form.Flow"
          :flowEditorContentValue = "flowEditorContentValue"
          @DialogCancel="dialogVisible = false"
          @success="emitSuccess"
        ></component>
      </el-dialog>
      <!-- 按钮统一弹窗(提交、拒绝、移交，加签，会签等)---end---->



      <!-- 导出word的dialog---start-->
      <!-- form: {{form}} -->
        <!-- <export-word-cmp ref="exportWordCmp" :form="form" :workId="form.Flow.WorkId" :nodeId="form.Flow.FK_Node"></export-word-cmp> -->
      <!-- 导出word---end-->
      <!-- mainTables: {{mainTables}} -->
      <!----start-->
      <template v-if="showExportSelectMainTable">
        <el-dialog 
          title= "选择主表"
          :visible="showExportSelectMainTable"
          width="600px"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false"
          append-to-body>

          <el-checkbox :indeterminate="isIndeterminate" v-model="exportAllMainTable" @change="handleCheckAllMainTableChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="selectedMainTableCode" @change="handleCheckedMainTableChange" v-loading="!mainTables.length">
            <el-checkbox v-for="(item,index) in mainTables" :key="item.TableCode + index" :label="item.TableCode">{{item.TableName}}</el-checkbox>
          </el-checkbox-group>   

          <save-footer
            :isCancel="true"
            saveText="导出"
            @cancel="showExportSelectMainTable = false"
            @save="_exportFlowWord">
          </save-footer>          
        </el-dialog>
      </template>
      <!--导出word的dialog--end--->

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    focus, // 关注
    send, // 提交
    unHungUp,
    unSend, 
    deleteFlow,
    saveMainValue,
    saveDetailValue,
    getInstructionByType,  // 获取常用批示语
    saveWork
  } from '@/api/approve'
  import Timeline from '@/base/Timeline/Timeline'
  import DetailTable from './detail-table'
  import { workFlowControlRuleMixin } from '@/utils/mixin'
  import { mapGetters } from 'vuex'

  import SendCmp from './send-cmp'
  import RefuseCmp from './refuse-cmp'
  import CommentCmp from './comment-cmp'
  import ShiftCmp from './shift-cmp'
  import AskForCmp from './ask-for-cmp'
  import ReturnCmp from './return-cmp'
  import HungUpCmp from './hung-up-cmp'
  import HuiQianCmp from './huiqian-cmp'
  import CcCmp from './cc-cmp'
  import NotGetformCmp from './notGetForm-cmp'
  import UploadFile from '@/base/flowUpload/uploadFile'
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import OptionCmp from './option-cmp'
  import ProcessProgressCmp from './processProgress-cmp'
  import FeedbackAndCommentCmp from './feedbackAndComment-cmp'
  import ExportWordCmp from './exportWord-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  const btnMap = {
    'send': SendCmp,   // 提交
    'refuse': RefuseCmp,  // 拒绝
    'comment': CommentCmp,  // 反馈
    'shift': ShiftCmp,   // 移交
    'askFor': AskForCmp, //  加签
    'return': ReturnCmp,  // 退回
    'hungUp': HungUpCmp,  // 挂起
    'huiqian': HuiQianCmp, // 会签
    'cc': CcCmp    // 抄送
  }
  const tabMap = {
    'ShowSchedule': NotGetformCmp,  // 显示流程进度
    'ShowFeedback': NotGetformCmp,  // 显示反馈
    'ShowFlowChart': NotGetformCmp,  // 显示流程图
    'ShowSubFlow': NotGetformCmp,   // 显示子流程
    'ShowInfluentState': NotGetformCmp, // 显示支流状态
    'ShowAttachment': NotGetformCmp,    // 显示相关附件
    'ShowRelatedFlow': NotGetformCmp,   // 显示相关流程
    'ShowFormChangeLog': NotGetformCmp  // 显示表单变更日志
  }
  export default {
    mixins: [workFlowControlRuleMixin],
    components: {
      Timeline,
      DetailTable,
      SendCmp,
      RefuseCmp,
      CommentCmp,
      ShiftCmp,
      AskForCmp,
      ReturnCmp,
      HungUpCmp,
      HuiQianCmp,
      CcCmp,
      NotGetformCmp,
      UploadFile,
      AitrsEditor,
      OptionCmp,
      ProcessProgressCmp,
      FeedbackAndCommentCmp,
      ExportWordCmp,
      SaveFooter
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      typeFlow: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        dialogVisible: false,
        dialogTitle: '',
        currentDialog: '',
        dialogEmp: false,
        currentMainTableCode: '',  // 当前主表的code
        currentDetailTableCode: '', // 当前明细表的code
        currentMainTableObj: {},  // 当前主表的数据集合
        currentDetailTableObj: {},  // 当前明细表的数据集合
        attachmentRole: {},     // 当前form的 功能权限的对象
        mainTables: [],    // 主表的数据集合
        detailTables: [],    // 明细表的数据集合
        showDetailTable: false,   // 控制查看明细表的 dialog 弹框的显示与隐藏
        str: '',
        showDownDetailTable: false,  // 控制 下载明细表弹框的显示/隐藏
        multipleSelection: [],   // 多选 选中的对象集合

        rightContentCurrentStr: '',  // 右侧的内容中间区域当前显示的内容 代号 "GetForm"(详情) "ShowSchedule"(显示流程进度) "ShowFeedback"（显示反馈） "ShowFlowChart"(显示流程图) "ShowSubFlow"(显示子流程) "ShowInfluentState"(显示支流) "ShowAttachment"(显示相关附件) "ShowRelatedFlow" (显示相关流程) "ShowFormChangeLog"(显示变更日志)
        currentTagIdx: 0, // 当前tag 标签的索引
        showUpDetailTable: false,   // 明细表的上传
        optionValue: '',  // 意见框中 填写的内容
        commentsList: [],   // 批示的下拉列表
        selectedMainTableCode: [], // 导出word 时选择的主表tablecode
        showExportSelectMainTable: false,  // 显示/隐藏导出主表时选择主表的弹框
        exportAllMainTable: false, // 控制 全选/取消全选 导出的主表
        isIndeterminate: true,
        
        limitUploadDetailTableNum: 1, // 一次允许上传的明细表的个数
        focusTit: '关注'   // right-fixed 中的  关注/取消关注
      }
    },
    computed: {
      ...mapGetters([
        'companyCode',
        'token',
        'userCode',
        'flowFunctionRole',
        'flowEditorContentValue'
      ])
    },
    created () {
    },
    mounted () {
      // 获取批示语的下拉列表
      this._getComments()
    },
    methods: {
      // 成功之后 触发父组件进行 刷新
      emitSuccess () {
        this.dialogVisible = false
        this.$emit('refreshForm')
      },
      // 关闭
      close () {
        this.$emit('closeRight')
      },
      // 下一条
      next () {
        this.$emit('next')
      },
      // 上一条
      prev () {
        this.$emit('prev')
      },
      // 点击组表上面的 详情、显示反馈、显示直流、显示流程图等按钮时
      currentContentComponents (tab) {
        return tabMap[tab] || ''
      },
      // 获取批示的下拉列表
      _getComments () {
        getInstructionByType ('Default').then(res => {
          if( res && res.data.State === REQ_OK ) {
            debugger
            this.commentsList = res.data.Data
          }
        })
      }, 
      // 提交
      async _send () {
        console.log("处理意见---->",this.flowEditorContentValue)
        debugger
        if(!this.flowEditorContentValue){
          this.$message({
            type: "warning",
            message: "请填写处理意见后再提交"
          })
          return 
        }

        function handleContent (html){
          //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
          let re1 = new RegExp("<.+?>","g")
          //执行替换成空字符
          let msg = html.replace(re1,'')
          return msg
        }       
        // 将编辑器中的 html带标签的内容提取 里面的 字符串内容
        let opinion = await handleContent(this.flowEditorContentValue)
        debugger
        send(this.form.Flow.FK_Flow, this.form.Flow.WorkId, this.form.Flow.FK_Node, opinion).then(res =>{
          debugger
          if(res && res.data.State === REQ_OK){
            this.$message({
              type: "success",
              message: "提交成功"
            })
          }else {
            this.$message({
              type: "warning",
              message: `提交失败err,${res.data.Error}`
            })
          }
        }).catch(err => {
          this.$message.error("提交失败err,请刷新后重试")
        })
      },  
      handleCheckAllMainTableChange (val) {
        debugger
        if(val) {
          this.selectedMainTableCode = this.mainTables.map((item, idx) => {
            return item.TableCode
          })
        }else {
          this.selectedMainTableCode = []
        }
        this.isIndeterminate = false;        
      },
      handleCheckedMainTableChange (value) {
        let checkedMainTableCount = value.length
        this.exportAllMainTable = checkedMainTableCount === this.mainTables.length 
        this.isIndeterminate = checkedMainTableCount > 0 && checkedMainTableCount < this.mainTables.length
      },   
      // 点击主表切换
      handleClickMainTableTab (tab, event) {
        this.currentMainTableObj = this.mainTables.find(item => {
          return item.TableCode === tab.name
        })
        if (this.currentMainTableObj.Fields.length) {
          this.currentMainTableObj.Fields.forEach(i => {
            this.$set(i, 'showEdit', false)
          })
        }
        if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
          this.currentMainTableObj.Teams.forEach(i => {
            if (i.Fields && i.Fields.length) {
              i.Fields.forEach(field => {
                this.$set(field, 'showEdit', false)
              })
            }
          })
        }
        this.detailTables = this.currentMainTableObj.DetailTableInfos
        if (!this.detailTables.length) return
        this.currentDetailTableObj = this.currentMainTableObj.DetailTableInfos[0]
        this.currentDetailTableCode = this.currentMainTableObj.DetailTableInfos[0].DetailTableCode
      },
      // 点击tab页切换明细表
      handleClickAddDetail () {
        this.currentDetailTableObj.Values.push(this.currentDetailTableObj.Fields)
      },
      // 保存主表
      _saveMainValue (obj) {
        return saveMainValue(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId, obj)
      },
      // 保存明细表
      _saveDetailValue (obj) {
        return saveDetailValue(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId, obj)
      },
      // 保存实例存为草稿
      _saveWork () {
        return saveWork(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId)
      },
      // 保存
      _save () {
        return new Promise((resolve, reject) => {
          this.$refs['launchForm'].validate((valid) => {
            if (valid) {
              let result = []
              if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
                this.currentMainTableObj.Teams.forEach(item => {
                  result.push(this.checkFormArray(`team${item.TeamCode}`))
                })
              }
              Promise.all(result).then(() => {
                let mainArr = []
                let detailArr = []
                if (this.mainTables && this.mainTables.length) {
                  this.mainTables.forEach((item) => {
                    let tableObj = {
                      TableCode: item.TableCode,
                      Fields: [],
                      Teams: []
                    }
                    item.Fields.forEach(field => {
                      tableObj.Fields.push({
                        FieldCode: field.FieldCode,
                        FieldName: field.FieldName,
                        FieldValue: field.FieldValue,
                        RowNo: field.RowNo
                      })
                    })
                    item.Teams.forEach(field => {
                      tableObj.Teams.push({
                        TeamCode: field.TeamCode,
                        TeamName: field.TeamName,
                        Fields: field.Fields
                      })
                    })
                    mainArr.push(tableObj)
                    item.DetailTableInfos.forEach(detail => {
                      let detailObj = {
                        TableCode: detail.DetailTableCode,
                        Fields: [],
                        MainTableCode: item.TableCode
                      }
                      detail.Values.forEach(val => {
                        let newField = []
                        val.forEach(field => {
                          newField.push({
                            FieldCode: field.FieldCode,
                            FieldName: field.FieldName,
                            FieldValue: field.FieldValue,
                            Unit: field.Unit
                          })
                        })
                        detailObj.Fields.push(newField)
                      })
                      detailArr.push(detailObj)
                    })
                  })
                }

                this.loading = true
                Promise.all([
                  // 保存主表
                  this._saveMainValue(JSON.stringify(mainArr)),
                  // 保存明细表
                  this._saveDetailValue(JSON.stringify(detailArr)),
                  this._saveWork()

                ]).then(([mainResp, detailResp, workResp]) => {
                  debugger
                  this.loading = false
                  if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK && workResp.data.State === REQ_OK) {
                    this.$message.success('保存成功')
                    debugger
                    resolve()
                  } else {
                    this.$message.error('保存失败，请重试')
                  }
                }).catch(() => {
                  this.loading = false
                  this.$message.error('保存失败，请重试')
                })
              }).catch(() => {
                this.$message.error('验证失败')
              })
            } else {
              this.$message.error('验证失败')
            }
          })
        })

      },
      // 关注/取消关注 1关注，0取消关注--ok
      _focus (focusTit) {
        debugger
        let num = focusTit=== '关注'? 1 : 0
        focus(this.form.Flow.WorkId, num).then(res => {
          if (res.data.State === REQ_OK) {
            if (num === 1) {
              // 将关注改为 “取消关注”
              this.focusTit = "取消关注"
              this.$message({
                type: 'success',
                message: '关注成功！'
              })
              // 触发 父级组件 进行 刷新table列表
              this.$emit('refreshForm')
            } else if (num === 0) {
              // 将取消关注 改为 “关注”
              this.focusTit = "关注"
              this.$message({
                type: 'success',
                message: '取消关注成功！'
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: '设置失败，请重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '设置失败，请重试！'
          })
        })
      },
      // 取消挂起
      _unHungUp (flowId, workId) {
        unHungUp(flowId, workId).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '取消挂起成功！'
            })
            this.loading = true
          } else {
            this.$message({
              type: 'error',
              message: '取消挂起失败，请重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '取消挂起失败，请重试！'
          })
        })
      },
      // 删除---ok
      _delete () {
        deleteFlow(this.form.Flow.FK_Flow, this.form.Flow.WorkId).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('操作成功')
          } else {
            this.$message.error('操作失败')
          }
        }).catch(() => {
          this.$message.error('操作失败')
        })
      },
      // 撤销--ok
      _unSend () {
        unSend(this.form.Flow.FK_Flow, this.form.Flow.WorkId, this.form.Flow.FK_Node).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '撤销成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.Error
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '撤销失败，请重试！'
          })
        })
      },
      // 打印
      handlePrintFlow () {
        let url = `/#/flow/print?no=${this.form.Flow.FK_Flow}&workId=${this.form.Flow.WorkId}&nodeId=${this.form.Flow.FK_Node}`
        window.open(url)
      },
      // 意见框中 编辑、填写意见后
      changeOptionContent (val) {
        console.log(val)
      },
      // 明细表上传
      downLoadDetailTemplate () {
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&UserId=${this.userCode}&CompanyCode=${this.companyCode}&workId=${this.workId}&detailTableCode=${this.currentDetailTableCode}&mainTableCode=${this.currentMainTableCode}&onlyTemplate=true`
        window.open(url)
      },
      // 明细表上传成功后
      uploadDetailSuccess () {
        console.log('明细表上传成功')
      },     
      // 导出excel--ok
      _exportFlow () {
        // if (this.typeFlow === 'copy') {
        //   let url = `${BASE_URL}/WorkFlow?Method=ExportSelectedWork&TokenId=&CompanyCode=${this.companyCode}&myPks=['${this.form.Flow.WorkId}']&userId=${this.userCode}`
        //   window.open(url)
        // } else {
        //   let url = `${BASE_URL}/WorkFlow?Method=ExportSelectedWork&TokenId=&CompanyCode=${this.companyCode}&workIds=[${this.form.Flow.WorkId}]&userId=${this.userCode}`
        //   window.open(url)
        // }

        // const th = ["姓名", "年龄", "年级", "分数"];
        // const filterVal = ["name", "age", "grade", "score"];
        // const dataSource = [
        //   { name: "小绵羊", age: "12", grade: "六年级", score: "100" },
        //   { name: "小猪猪", age: "23", grade: "五年级", score: "98" }
        // ]
        // var data = formatJson(filterVal, dataSource);
        // //data得到的值为[["小绵羊","12","六年级","100"],["小猪猪,"23","五年级","98"]]
        // //注意：二维数组里的每一个元素都应是字符串类型，否则导出的表格对应单元格为空
        // toExcel({ th, data, fileName: "设备导出数据", fileType: "xlsx", sheetName: "sheet名" })
        // //调用封装好的方法，秒下载，至此，事成了,导出文件:设备导出数据.xlsx
        // function formatJson (filterVal, jsonData) {
        //   return jsonData.map(v => filterVal.map(j => v[j]))
        // }

        const th = []
        const filterVal = []
        const dataSource = []
        const newObjOne = new Object()
        const newObjTwo = new Object()
        if (this.currentMainTableObj.Fields && this.currentMainTableObj.Fields.length) {
          this.currentMainTableObj.Fields.forEach((value) => {
            th.push(value.FieldName)
            filterVal.push(value.FieldCode)
            newObjOne[value.FieldCode] = value.FieldValue
          })
          dataSource.push(newObjOne)
        }

        if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
          this.currentMainTableObj.Teams.forEach((item) => {
            if (item.Fileds && item.Fileds.length) {
              item.forEach(val => {
                th.push(val.FieldName)
                filterVal.push(val.FieldCode)
                newObjTwo[item.FieldCode] = val.FieldValue
              })
            }
            dataSource.push(newObjTwo)
          })
        }

        const data = formatJson(filterVal, dataSource)
        debugger

        console.log(dataSource)
        this.$toExcel({th, data, fileName: `主表【${this.currentMainTableObj.TableName}】导出数据`, fileType: 'xlsx', sheetName: 'sheet名'})
        function formatJson (filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        }
      },

      // 导出word 
      _exportFlowWord () {
        debugger
        if(!this.selectedMainTableCode.length) {
          this.$message({
            type: "warning",
            message: "请先选择需要导处的主表"
          })
          return
        }else {
          let tableCodesStr = JSON.stringify(this.selectedMainTableCode)
          let url = `${BASE_URL}/WorkFlow?Method=exportDoc&TokenId=&CompanyCode=${this.companyCode}&workId=${this.form.Flow.WorkId}&nodeId=${this.form.Flow.FK_Node}&tableCodes=${tableCodesStr}&userId=${this.userCode}`
          window.open(url)   
        }
      },
      // 下载明细表弹窗勾选
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 下载明细表
      handleDownLoadDetail () {
        this.showDownDetailTable = true
      },
      // 上传明细表
      handleUpLoadDetail () {
        this.showUpDetailTable = true
      },
      // 明细表选择完毕后点下载
      handleSaveDownloadDetail () {
        debugger
        if (!this.multipleSelection.length) return this.$message.info('未选择任何明细表')
        if (this.multipleSelection.length > 1) return this.$message.info('每次只能下载一个明细表')
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&CompanyCode=${this.companyCode}&workId=${this.form.Flow.WorkId}&detailTableCode=${this.multipleSelection[0].DetailTableCode}&mainTableCode=${this.multipleSelection[0].mainTableCode}&userId=${this.userCode}`
        window.open(url)
      },
      // 明细表上传完成后 点击确认
      handleSaveUploadloadDetail () {

      },
      // 点击(提交、移交、加签、退回、挂起、拒绝、会签、评论、抄送)等按钮
      handleFn (method) {

        switch (method) {
          case 'Send':
            // this.dialogTitle = '提交'
            // this.dialogVisible = true
            // this.str = 'send'
            // 先验证表单的必填项，然后进行保存后提交
            this._save().then(() => {
              debugger
              this._send()
            })
            break
          case 'SaveMainValue,SaveDetailValue':
            debugger
            this._save()
            break
          case 'Shift':
            this.dialogTitle = '移交'
            this.dialogVisible = true
            this.str = 'shift'
            break
          case 'Askfor':
            this.dialogTitle = '加签'
            this.dialogVisible = true
            this.str = 'askFor'
            break
          // case 'Focus':  // 关注
          //   this._focus(this.form.Flow.WorkId, 1)
          //   break
          case 'ReturnBack':
            this.dialogTitle = '退回'
            this.dialogVisible = true
            this.str = 'return'
            break
          case 'HungUp':
            this.dialogTitle = '挂起'
            this.dialogVisible = true
            this.str = 'hungUp'
            break
          case 'Refuse':
            this.dialogTitle = '拒绝'
            this.dialogVisible = true
            this.str = 'refuse'
            break
          case 'HuiQianInit':
            this.dialogTitle = '会签 '
            this.dialogVisible = true
            this.str = 'huiqian'
            break
          case 'Delete':
            this.$confirm('确认删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this._delete()
            }).catch(() => {
            })
            break
          case 'UnSend':
            this.$confirm('确认撤销吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this._unSend()
            }).catch(() => {
            })
            break
          case 'AddComment':
            this.dialogTitle = '评论'
            this.dialogVisible = true
            this.str = 'comment'
            break
          case 'Cc':
            this.dialogTitle = '抄送'
            this.dialogVisible = true
            this.str = 'cc'
            break
        }
      },
      // 点击（详情，显示流程进度，显示反馈，显示流程图，显示子流程，显示支流状态，显示相关附件，显示相关流程，显示表单变更日志）
      clickTags (method, idx) {
        this.currentTagIdx = idx
  
        debugger
        switch (method) {
          case 'GetForm':
            // 显示详情
            this.rightContentCurrentStr = 'GetForm'
            break
            // 显示流程进度
          case 'ShowSchedule':
            this.rightContentCurrentStr = 'ShowSchedule'
            break
            // 显示反馈
          case 'ShowFeedback':
            this.rightContentCurrentStr = 'ShowFeedback'
            break
            // 显示流程图
          case 'ShowFlowChart':
            this.rightContentCurrentStr = 'ShowFlowChart'
            break
            // 显示子流程
          case 'ShowSubFlow':
            this.rightContentCurrentStr = 'ShowSubFlow'
            break
            // 显示支流状态
          case 'ShowInfluentState':
            this.rightContentCurrentStr = 'ShowInfluentState'
            break
            // 显示相关附件
          case 'ShowAttachment':
            this.rightContentCurrentStr = 'ShowAttachment'
            break
            // 显示相关流程
          case 'ShowRelatedFlow':
            this.rightContentCurrentStr = 'ShowRelatedFlow'
            break
            // 显示表单变更日志
          case 'ShowFormChangeLog':
            this.rightContentCurrentStr = 'ShowFormChangeLog'
            break
        }
      },
      // 动态组件
      currentComponent (str) {
        return btnMap[str] || ''
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
      // 动态表单字段组织选择回调验证
      changeOrgMainCmp (param, prop) {
        this.$refs[param].validateField(prop)
      }
    },
    watch: {
      form: {
        handler (newVal, oldVal) {
          this.flowObj = newVal.Flow
          this.mainTables = newVal.MainTableInfos

          // 当前功能权限
          this.attachmentRole = newVal.FunctionRole

          if (this.mainTables && this.mainTables.length) {
            this.currentMainTableObj = this.mainTables[0]
            this.currentMainTableCode = this.mainTables[0].TableCode
            this.rightContentCurrentStr = 'GetForm'
            if (this.currentMainTableObj.Fields && this.currentMainTableObj.Fields.length) {
              this.currentMainTableObj.Fields.forEach(i => {
                this.$set(i, 'showEdit', false)
              })
            }
            if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
              this.currentMainTableObj.Teams.forEach(i => {
                if (i.Fields && i.Fields.length) {
                  i.Fields.forEach(field => {
                    this.$set(field, 'showEdit', false)
                  })
                }
              })
            }
            if (this.mainTables[0].DetailTableInfos && !this.mainTables[0].DetailTableInfos.length) return
            this.detailTables = this.mainTables[0].DetailTableInfos
            this.currentDetailTableObj = this.mainTables[0].DetailTableInfos[0]
            this.currentDetailTableCode = this.mainTables[0].DetailTableInfos[0].DetailTableCode
          } else {
            this.currentMainTableObj = {}
            this.currentMainTableCode = ''
            this.detailTables = []
            this.currentDetailTableObj = {}
            this.currentDetailTableCode = ''
          }
        }
        // immediate: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .right-fixed-container
    position fixed
    top: 90px
    right 0
    bottom 0
    width 700px
    padding 10px
    background #ffffff
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    overflow-y scroll
    z-index 99
    &::-webkit-scrollbar
      display: none
    .close
      position absolute
      top 10px
      left 50%
      height 40px
      line-height 40px
      text-align center
      font-size 30px
      color #3B8BE3
      opacity 0.5
      i
        &:hover
          cursor pointer
    .content-container
      height 100%
      padding-top 40px
      border-top: 1px solid #ccc;
      box-sizing border-box
      .btn-container
        height 100px
        overflow-y auto
        .fn-btn
          font-size 0
          .el-button
            margin-right 5px
            margin-bottom 5px
            margin-left 0 !important
      .table-content
        height calc(100% - 100px)
        overflow-y auto
        .table-title
          text-align center
          padding 30px 0
          font-size 24px
        .main-content /deep/
          margin-bottom 20px
          .el-scrollbar__wrap
            height 380px !important
            overflow-x hidden !important
            .name
              margin-bottom 10px
              font-size 18px
            .field
              display block
              padding-left 15px
              margin-bottom 10px
              font-size 16px
              color #999999
              .field-name
                display block
                padding 10px 0
                button
                  padding 0
                .field-edit
                  margin-left 10px
                  display none
                  button
                    padding 0
                &:hover
                  .field-edit
                    display inline-block
        .tracks-container
          padding 20px 0
          .name
            font-size 18px
        .comments-container
          .content-tit
            margin-top 5px
            font-size 14px
            color #000000
            font-weight bold
          .name
            padding 10px 0
            font-size 18px
          .comment-item
            padding-left 15px
            padding-bottom 15px
            margin-bottom 15px
            font-size 16px
            color #999999
            border-bottom 1px solid #dedede
            .desc
              margin-bottom 10px
              i
                margin-left 15px
                &:hover
                  cursor pointer
                  color red
            .content
              font-size 14px

    .el-loading-mask
      top: 0 !important

  .move-enter-active, .move-leave-active
    enter-active()

  .move-enter, .move-leave-active
    leave-active()
</style>
