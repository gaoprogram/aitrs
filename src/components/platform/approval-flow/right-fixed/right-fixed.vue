<!--
  User: gaol
  Date: 2019/6/12
  功能：审批流（待办，在途，我发起的，我审批的，抄送我的，我关注的） 页面中的 右侧信息展示区域
-->

<template>
  <transition name="move">
    <div class="right-fixed-container" v-loading="loadingProp">
      <!-- form: {{form}} -->
      <!-- <el-tooltip class="item" effect="dark" content="关闭" placement="bottom"> -->
        <div class="close" @click="close">
          <i class="el-icon-circle-close"></i>
        </div>
      <!-- </el-tooltip> -->
      <div class="content-container" v-if="form.Flow">
        <div class="btn-container">
          <!-- form.Buttons: {{form.Buttons}} -->
          <!-- form: {{form}} -->
          <div class="fn-btn">
            <span v-atris-flowRightFixedScan ="{styleBlock:'inline-block'}">
              <el-button
                round
                size="small"
                v-for="(btn, index) in form.Buttons"
                :key="index"
                @click="handleFn(btn.Method)"
              >{{btn.Text}}
              </el-button>
            </span>
            <span>
              <el-button round size="small" type="primary"  @click.native="_focus(form.Focus.IsFocus)" v-text="isFocus(form.Focus.IsFocus)"></el-button>
            </span>   
            <el-button round size="small" type="primary" :disabled="!mainTables.length" @click.native="showExportSelectMainTable = true">导出</el-button>
            <el-button round size="small" type="primary" @click.native="handlePrintFlow">打印</el-button>
            <el-button round size="small" type="primary" @click.native="prev()">上一条</el-button>
            <el-button round size="small" type="primary" @click.native="next()">下一条</el-button>
          </div>
        </div>
        <!---右侧fixed 详情区域---start--->
        <div class="table-content">

          <div class="table-title">
            <!---节点选择下拉框--start---->
            <div class="nodeSelector" v-if="form.NodeList && form.NodeList.length">
              <el-select v-model="form.Node.NodeId" placeholder="请选择" @change="changeNodeId(selectNodeId)">
                <el-option
                  v-for="(item, key) in form.NodeList"
                  :key="item.NodeId"
                  :label="item.Name"
                  :value="item.NodeId">
                </el-option>
              </el-select>              
            </div>
            <!---节点选择下拉框--end---->

            <!--紧急程度、保密级别、帮助网址块----start--->
            <div class="tit">

              <span>{{form.Flow.FlowName}}</span>

              <span class="tagFlagBox">
                <!-- <el-tooltip effect="dark" content="紧急程度"> -->
                  <el-tag 
                    title="紧急程度"
                    size="mini"
                    :type="_EmergencyLevelColor(form.FlowInfo.EmergencyLevel)"
                    v-text="_EmergencyLevel(form.FlowInfo.EmergencyLevel)">
                  </el-tag>
                <!-- </el-tooltip> -->
                <!-- <el-tooltip effect="dark" content="保密级别"> -->
                  <el-tag 
                    title="保密级别"
                    :type="_securityClass(form.FlowInfo.SecurityClass)" 
                    size="mini"
                    v-text="_securityLevel(form.FlowInfo.SecurityClass)">
                  </el-tag>
                <!-- </el-tooltip> -->
              </span>
              <!--帮助网址---start-->
              <span class="helpUrl" v-if="form.FlowInfo.HelpUrl">
                <el-link :href="form.FlowInfo.HelpUrl" target="_blank" type="warning">帮助{{form.FlowInfo.HelpUrl}}</el-link>
              </span>
              <!--帮助网址---end-->
            </div>
            <!--紧急程度、保密级别、帮助网址块----end---> 
          </div>


          <!--前台操作指引--start--->
          <div class="NodeTip" v-if="form.Node.Tip">
            <i class="el-icon-warning-outline" title="操作指引"></i>
            <span class="tit">{{form.Node.Tip}}</span>
          </div>
          <!--前台操作指引--end--->

          <!-- form.Tags： {{form.Tags}} -->
          <!--tag标签区域--start--->
          <div class="tagBtnBox" style="margin-bottom: 10px">
            <el-tag 
              v-for="(tag,idx) in form.Tags" 
              v-if="tag.Text!='显示反馈' && tag.Text!='显示流程进度'"
              :class="['tagBtn', idx===currentTagIdx? 'tagSelected': '']"
              effect="dark" 
              :key="tag.Method" 
              @click="clickTags(tag.Method, idx)">
              {{tag.Text}}
            </el-tag>
          </div>
          <!--tag标签区域--end--->


          <!--抄送提示显示区--start--->
          <div class="ccTextInfo" v-if="form.CcInfo.Doc">
            <i class="el-icon-warning-outline" title="抄送提示"></i>
            <span class="tit">{{form.CcInfo.Doc}}</span>
          </div>
          <!--抄送提示显示区--end--->


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
          <!--主表tabs显示区域----end--->

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
                        <!-----为图片  或者 附件时----->
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
                <!--当前主表的内容区域--end--->  
              </el-scrollbar>
            </div>
          </div>

          <!--查看明细表btn--start--->
          <div class="detail-content" v-if="detailTables && detailTables.length && rightContentCurrentStr === 'GetForm'">
            <el-button type="text" @click="showDetailTable = true"><i class="el-icon-view" ></i>查看明细表</el-button>
            <el-button type="text" @click="handleDownLoadDetail" v-show="attachmentRole.DetailTableCanDownload"><i class="el-icon-download">下载</i></el-button>
            <!---上传明细表----start--->
            <div class="detail-upload" v-atris-flowRightFixedScan="{styleBlock:'block'}">
              <el-button type="text" @click="handleUpLoadDetail" v-show="attachmentRole.DetailTableCanUpload"><i class="el-icon-upload2">明细表上传</i></el-button>
            </div>
            <!----上传明细表----end--->            
          </div>
          <!--查看明细表btn--end--->

          <!---评论区域（节点意见区域（可填写节点意见，上传意见的附件，可删除附件等））---start-->
          <!-- <div class="comments-container" v-if="form.Comments.length"> -->
            <!-- flowFunctionRole: {{form.FunctionRole.ShowOpinion}} -->
          <div class="comments-container" v-if="rightContentCurrentStr==='GetForm'">
            <!---意见组件区域----start--->
            <option-cmp 
                  :form.sync="form" 
                  :workId="form.Flow.WorkId" 
                  :nodeId="form.Flow.FK_Node" 
                  :currentDetailTableObj="currentDetailTableObj"
                  :currentMainTableObj="currentMainTableObj"
                  :commentsList.sync="commentsList"></option-cmp>  
            <!---意见组件区域----end--->

            <!--流程进度区域---start-->
            <!-- form: {{form}} -->
            <process-progress-cmp :form="form" :workId="form.Flow.WorkId" :nodeId="form.Flow.FK_Node"></process-progress-cmp>
            <!--流程进度区域---end-->


            <!--评论区域---start-->
            <feedback-and-comment-cmp :form="form">   
            </feedback-and-comment-cmp>
            <!---评论区域---end-->

            
            <!--recever接收人区域---start-->
            <template>
              <receiver-cmp :form="form"></receiver-cmp>
            </template>
            <!--recever接收人区域---end-->      

          </div>
          <!---评论区域（节点意见区域（可填写节点意见，上传意见的附件，可删除附件等））--end-->
        </div>
        <!---右侧fixed 详情区域---start--->
      </div>

      <!-- 查看明细表展示的dialog弹框 start-->
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
      <!-- 查看明细表展示的dialog弹框 end-->

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
          :title="!selectedDetailTable.Name?'明细表上传':`【${selectedDetailTable.Name}】明细表上传`"
          selectTit = '选择附件'
          :visible.sync="showUpDetailTable"
          width="600px"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="true"
          append-to-body>
          <!-- currentDetailTableObj: {{currentDetailTableObj}} -->
          <!-- detailTables: {{detailTables}} -->
          <!-- selectedDetailTable: {{selectedDetailTable}} -->
          <el-radio-group v-model="selectedDetailTable" v-loading="!detailTables.length">
            <el-radio v-for="(item,index) in detailTables" :key="item.DetailTableCode + index" :label="item">{{item.Name}}</el-radio>
          </el-radio-group>  

          <div>
            <el-button type="text" v-show="selectedDetailTable.Name" @click="downLoadDetailTemplate"><i class="el-icon-download">下载【{{selectedDetailTable.Name}}】明细表模版</i></el-button>        
          </div>
          <upload-file 
            v-show="selectedDetailTable.Name"
            :workId="form.Flow.WorkId" 
            :nodeId="flowObj.FK_Node" 
            :detailTableCode="selectedDetailTable.DetailTableCode" 
            :mainTableCode="currentMainTableObj.TableCode"
            :limitUploadDetailTableNum = "limitUploadDetailTableNum"
            @uploadDetailSuccess="uploadDetailSuccess">
          </upload-file>
          <!-- <save-footer @save="handleSaveUploadloadDetail" saveText="下载" @cancel="showUpDetailTable = false"></save-footer> -->
        </el-dialog>      
      </div>
      <!--明细表上传(包括明细表模板的下载)---end--->

      <!-- 按钮统一弹窗(提交、拒绝、移交，加签，会签等) ---start---->
      <!-- currentComponent(str)： {{currentComponent(str)}} -->
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
          :flowEditorContentVal = "flowEditorContentValue"
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
  import {flowCommonFnRightFixed} from '@/utils/mixin'
  import { Loading } from 'element-ui'
  import {
    focus, // 关注
    send, // 提交
    addNextStepAccepters, // 添加下一步操作人后提交
    unHungUp,
    unSend, 
    deleteFlow,
    saveMainValue,
    saveDetailValue,
    getInstructionByType,  // 根据类型来获取指定类型的常用批示语
    getInstructionList, // 获取所有类型的常用批示语
    saveWork
  } from '@/api/approve'
  import Timeline from '@/base/Timeline/Timeline'
  import DetailTable from './detail-table'
  import { workFlowControlRuleMixin } from '@/utils/mixin'
  import { mapGetters } from 'vuex'

  import SendCmp from './send-cmp'
  import AddnextstepacceptersCmp from './nextStepAccepters-cmp'
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
  import ReceiverCmp from './receiver-cmp'
  import ExportWordCmp from './exportWord-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  const btnMap = {
    'send': SendCmp,   // 提交
    'addNextStepAccepters': AddnextstepacceptersCmp, // 下一步提交操作人
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
    mixins: [workFlowControlRuleMixin, flowCommonFnRightFixed],
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
      ReceiverCmp,
      ExportWordCmp,
      SaveFooter
    },
    props: {
      loadingProp: {
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
      },
      versionId: {
        type: [String, Number],
        default: 0
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
        detailTables: [],    // 当前主表名下的明细表的数据集合
        allDetailTables: [],  // 所有主表明下的所有明细表集合
        allDetailTables_copy: [],  // 所有主表明下的所有明细表集合的副本        
        showDetailTable: false,   // 控制查看明细表的 dialog 弹框的显示与隐藏
        str: '',   
        showDownDetailTable: false,  // 控制 下载明细表弹框的显示/隐藏
        multipleSelection: [],   // 多选 选中的对象集合

        rightContentCurrentStr: '',  // 右侧的内容中间区域当前显示的内容 代号 "GetForm"(详情) "ShowSchedule"(显示流程进度) "ShowFeedback"（显示反馈） "ShowFlowChart"(显示流程图) "ShowSubFlow"(显示子流程) "ShowInfluentState"(显示支流) "ShowAttachment"(显示相关附件) "ShowRelatedFlow" (显示相关流程) "ShowFormChangeLog"(显示变更日志)
        currentTagIdx: 0, // 当前tag 标签的索引
        showUpDetailTable: false,   // 明细表的上传
        optionValue: '',  // 意见框中 填写的内容
        commentsList: [],   // 批示的下拉列表
        commentsListItem: [], // 批示语的分类
        selectedMainTableCode: [], // 导出word 时选择的主表tablecode
        selectedDetailTable: {},  // 导出excel 
        showExportSelectMainTable: false,  // 显示/隐藏导出主表时选择主表的弹框
        exportAllMainTable: false, // 控制 全选/取消全选 导出的主表
        isIndeterminate: true,
        
        limitUploadDetailTableNum: 1, // 一次允许上传的明细表的个数
        focusTit: '关注',   // right-fixed 中的  关注/取消关注

        selectNodeId: ''  // right-fixed 区域中选择的 节点
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
      // 初始化清空
      // this.$bus.$on('clearFlowEditor', () => {
      //   this.$store.dispatch("setEditorContentValue", '') 
      // })   
    },
    beforeDestroy(){
      // this.$bus.$off('clearFlowEditor')
    },
    mounted () {
      // 获取批示语的下拉列表
      this.$nextTick(() => {
        this._getComments()      
      })
    },
    methods: {
      // 成功之后 触发父组件进行 刷新
      emitSuccess () {
        this.dialogVisible = false
        // 关闭右窗
        this.$emit('closeRight')
        // 刷新列表
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
        getInstructionList({pageNum : 1, pageSize: 65535 }).then(res => {
          if( res && res.data.State === REQ_OK ) {
            debugger
            this.commentsList = res.data.Data
            console.log(this.commentsList)
            // this.commentsListItem

            // 处理数据结构，将commentsList 处理成 el-select有分类的下拉框数据格式
            let catObj = {}
            if(this.commentsList && this.commentsList.length){
              for(let i=0,len = this.commentsList.length;i<len;i++){
                debugger
                let item = this.commentsList[i]
                if( item.InstructType ) {
                  // 分类存在
                  if(catObj[item.InstructType]){
                    catObj[item.InstructType].push(item)
                  }else {
                    catObj[item.InstructType] = []
                    catObj[item.InstructType].push(item)
                  }
                }else {
                  //分类不存在 默认放在 Default 分类下
                  if(catObj["Default"]){
                    catObj["Default"].push(item)
                  }else {
                    catObj["Default"] = []
                    catObj["Default"].push(item)
                  }
                }  
                // console.log("catObj---", catObj)
              }
              debugger
              // 将对象转为数组
              // let catObjArr = Object.keys(catObj).map(key=> catObj[key])
              debugger
              console.log("处理之前的commentsList-------", this.commentsList)
              // console.log("处理之后的commentsList-------", catObj)
              let newArr = []
              let catObjName = []
              for(var i in catObj){
                catObjName.push(i)
              }   

              // 转化 分类为汉字的 方法
              function switchCat(str = 'Default') {
                return {
                  "Default": '处理类',
                  "Cc": '抄送类',
                  "Send": '提交类',
                  "Shift": '转发类',
                  "ReturnBack": '退回类',
                }[str]
              }
              // console.log("+++++",catObjName)
              for(var j=0; j<catObjName.length;j++ ){
                var item = catObjName[j]
                newArr.push({
                  label: switchCat(item),
                  children: catObj[item]
                })
              }
              this.commentsList = newArr
              // console.log("--------------", catObj)
              console.log("-----最终处理后的commentsList---------", this.commentsList)
            }
          }
        })
      }, 
      // 提交
      async _send () {
        console.log("处理意见---->",this.flowEditorContentValue)
        debugger

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

        this.loadingProp = true
        // 提交
        send(this.form.Flow.FK_Flow, this.form.Flow.WorkId, this.form.Flow.FK_Node, opinion).then(res =>{
          debugger
          this.loadingProp = false
          if(res && res.data.State === REQ_OK){
            debugger
            this.$message({
              type: "success",
              message: "提交成功"
            })
            // 成功后 关闭右侧 并且刷新 table
            this.close()
            // 刷新table列表
            this.emitSuccess()          
          }else if( res && res.data.State === 2){
            // 状态值为 2 需要选择下一步操作人 
            this.dialogTitle = '选择下一步操作人'
            this.dialogVisible = true
            this.str = 'addNextStepAccepters'  
          }else {
            this.$message({
              type: "warning",
              message: `提交失败err,${res.data.Error}`
            })
          }
        }).catch(err => {
          this.loadingProp = false
          this.$message.error("提交失败err,请刷新后重试")
        })
      },  
      // 切换主表
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
        // 将上一次的主表 复制一个副本
        let beforeMainTableObj_copy = JSON.parse(JSON.stringify(this.currentMainTableObj))

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

        debugger
        if(this.currentMainTableObj.TableCode !== beforeMainTableObj_copy.TableCode){
          debugger
          // 前后两次切换的不是同一个主表， 如果前后切换的是相同的主表则不会重新调取接口
          // 主表切换后 需要去动态调用  标签下的 数据
          switch(this.rightContentCurrentStr){
            // 显示反馈
            case 'ShowFeedback':
              this._showFeedback()
              break
            // 显示子流程
            case 'ShowSubFlow':
              this._showSubFlow()
              break
            // 流程进度
            case 'ShowSchedule':
              this._showSchedule()
              break
            // 显示表单变更日志
            case 'ShowFormChangeLog':
              this._showFormChangeLog()
              break
            // 显示相关流程
            case 'ShowRelatedFlow':
              this._showRelatedFlow()
              break
            // 显示相关附件
            case 'ShowAttachment':
              this._showAttachment()
              break
            // 显示支流状态
            case 'ShowInfluentState':
              this._showInfluentState()
              break
            // 显示流程图
            case '':
              break
          }
        }
      },
      // 点击tab页切换明细表
      handleClickAddDetail () {
        this.currentDetailTableObj.Values.push(this.currentDetailTableObj.Fields)
      },
      // 保存主表
      _saveMainValue (obj) {
        debugger
        return saveMainValue(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId, obj)
      },
      // 校验非空
      _checkTableNotEmpty () {
        debugger
        console.log("---------------",this.allDetailTables)
        // 循环校验 每个主表下的 每个明细表都必须 有行数量 即表示 非空校验通过
        return new Promise((resolve, reject) => {
          debugger
          for(let i=0;i<this.allDetailTables.length; i++){
            let itemDetailTables = this.allDetailTables[i] 
            if(!itemDetailTables.Values.length){
              // 没有行则校验失败
              this.$message({
                type:'warning',
                message: `主表：${itemDetailTables.MainTableCode}下的明细表:【${itemDetailTables.Name}】非空校验失败`
              })
              resolve(true) 
              break
            }else {
              if(i === this.allDetailTables.length-1 ){
                // 非空校验pass
                resolve(false)
              }
            }
          }
        })
      },
      // 校验 新增行
      _checkTableAddline () {
        console.log("---------------",this.allDetailTables)
        // 明细表新增行校验即 校验 表的行数对比起初时候 有增加 就算作是  新增行校验了
        // 需要循环遍历所有主表下的 所有明细表都 做 新增行的校验  比较 this.allDetailTables 和 this.allDetailTables_copy 中的item 的 Values 的长度是否有新增即表示 新增行了
        return new Promise ((resolve, reject ) => {
          if( this.allDetailTables && this.allDetailTables.length ){
            for(let i = 0;i< this.allDetailTables.length; i++){
              let item = this.allDetailTables[i]
              if(!item.Values.length) {
                // 没有长度则说明 没有新增行
                this.$message({
                  type: "warning",
                  message: `主表：${item.MainTableCode}下的明细表：【${item.Name}】 新增行 校验失败 `
                })
                resolve(true)
                break
              }else {
                if(item.DetailTableCode === this.allDetailTables_copy[i].DetailTableCode && item.Values.length <= this.allDetailTables_copy[i].Values.length) {
                  // 新增行 验证失败
                  this.$message({
                    type: "warning",
                    message: `主表：${item.MainTableCode}下的明细表：【${item.Name} 】新增行 校验失败 `
                  })
                  resolve(true)
                  break
                }else {
                  if(i === this.allDetailTables.length-1){
                    resolve(false)
                  }
                }
              }
            }
          }  
        })     
      },      
      // 保存明细表
      async _saveDetailValue (obj) {
        // 明细表 必须新增行 和 必须为非空的校验
        debugger
        // 判断明细表【非空的校验】  即校验每个明细表都至少有一行才算作是 非空了
        if(this.form.FunctionRole.DetailTableNotEmpty) {
          debugger
          // 校验非空
          let res_notEmpty = await this._checkTableNotEmpty()
          debugger
          if(res_notEmpty){
            // 非空校验失败
            return
          }else {
            console.log("明细表非空校验成功")
          }
        }

        // 判断明细表 新增行校验 
        debugger
        // 明细表需要【新增行校验】  即 校验 表的行数对比起初时候 有增加 就算作是  新增行校验了
        if( this.form.FunctionRole.DetailTableHaveToAdd ) {
          debugger
          // 新增行校验
          let res_tableAddline = await this._checkTableAddline()
          debugger
          if(res_tableAddline){
            debugger
            // 添加行 校验失败
            return
          }else {
            console.log("明细表 新增行校验成功")
          }        
        }        

        debugger
        return saveDetailValue(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId, obj)
      },
      // 保存实例存为草稿
      _saveWork () {
        return saveWork(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId)
      },
      // 保存按钮
      _save (method) {
        debugger
        return new Promise((resolve, reject) => {
          // 验证主表必填项的验证
          this.$refs['launchForm'].validate((valid) => {
            debugger
            if (valid) {
              let result = []
              if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
                this.currentMainTableObj.Teams.forEach(item => {
                  result.push(this.checkFormArray(`team${item.TeamCode}`))
                })
              }

              Promise.all(result).then(async() => {
                debugger
                // 主表、明细表 必填项验证成功后，进行主表、明细表的 保存
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

                this.loadingProp = true

                // 先保存主表 
                let saveMainTables_res = await this._saveMainValue(JSON.stringify(mainArr))

                debugger
                if(saveMainTables_res && saveMainTables_res.data.State === REQ_OK){
                  // 主表保存成功 后接着 保存明细表

                  let saveDetailTables_res = await this._saveDetailValue(JSON.stringify(detailArr))
                  if(saveDetailTables_res && saveDetailTables_res.data.State === REQ_OK ){
                    // 明细表保存也成功
                    // 主表 和 明细表都保存成功后才去调用 saveWork 接口
                    console.log("主表和明细表表单保存成功")
                    if(method && method === 'Send'){
                      this.loadingProp = false
                      // 提交按钮, 提交按钮不调用 _saveWork() 方法
                      resolve()
                    }else if(method && method === 'SaveMainValue,SaveDetailValue'){
                      // 保存按钮  保存按钮才调用 _saveWork() 方法
                      // 保存 意见等
                      this._saveWork().then((res)=>{
                        this.loadingProp = false
                        if(res && res.data.State === REQ_OK){
                          this.loadingProp = false
                          this.$message.success('主表、明细表都保存成功')
                        }else {
                          this.loadingProp = false
                          this.$message.error(`主表、明细表保存失败err,${res.data.Error}`)
                        }
                      }).catch(()=>{
                        this.loadingProp = false
                        this.$message.error(`主表、明细表保存失败`)
                      }) 
                    }            
                  }else {
                    debugger
                    // 明细表保存失败
                    this.$message({
                      type: 'warning',
                      message: `明细表保存失败err,${saveDetailTables_res.data.Error}`
                    })
                    this.loadingProp = false
                    reject(`明细表保存失败err,${saveDetailTables_res.data.Error}`)
                  }
                }else {
                  debugger
                  // 主表保存失败
                  this.$message({
                    type: 'warning',
                    message: `主表保存失败err,${saveMainTables_res.data.Error}`
                  })
                  
                  this.loadingProp = false
                  reject(`主表保存失败err,${saveMainTables_res.data.Error}`)
                }
              }).catch(() => {
                this.loadingProp = false
                // this.$message.error('表单分组必填项验证失败,请检查')
              })
            } else {
              this.loadingProp = false
              this.$message.error('主表/明细表 保存时必填项验证失败')
            }
          })
        })
      },
      // 判断是否是关注
      isFocus (flag) {
        if(flag){
          return "取消关注"
        }else {
          return "关注"
        }
      },
      // 关注/取消关注 1关注，0取消关注--ok
      _focus (focusFlag) {
        debugger
        let num = focusFlag? 0 : 1
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
              // 触发 父级组件 进行 刷新table列表
              this.$emit('refreshForm')
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
        debugger
        console.log(process.env)
        let url = ''
        if( process.env){
          if(process.env.NODE_ENV ==='development'){
            // 开发环境
           url = `/#/flow/print?no=${this.form.Flow.FK_Flow}&workId=${this.form.Flow.WorkId}&nodeId=${this.form.Flow.FK_Node}`
          }else if(process.env.NODE_ENV === 'production'){
            // 生产环境 
           url = `/WebNotice/index.html#/flow/print?no=${this.form.Flow.FK_Flow}&workId=${this.form.Flow.WorkId}&nodeId=${this.form.Flow.FK_Node}`
          }
        }else {
          console.log("---------process.env未配置--print.vue中打印出错--------")
        }
        window.open(url)
      },
      // 意见框中 编辑、填写意见后
      changeOptionContent (val) {
        console.log(val)
      },
      // 明细表下载
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
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&CompanyCode=${this.companyCode}&workId=${this.form.Flow.WorkId}&detailTableCode=${this.multipleSelection[0].DetailTableCode}&mainTableCode=${this.multipleSelection[0].MainTableCode}&userId=${this.userCode}`
        window.open(url)
      },
      // 明细表上传完成后 点击确认
      handleSaveUploadloadDetail () {

      },
      // 点击(提交、移交、加签、退回、挂起、拒绝、会签、评论、抄送)等按钮
      handleFn (method) {
        debugger
        switch (method) {
          case 'Send':
            // 提交按钮
            // this.dialogTitle = '提交'
            // this.dialogVisible = true
            // this.str = 'send'
            // 先验证表单的必填项，然后进行保存后提交
            this._save(method).then(() => {
              debugger
              this.loadingProp = false
              // 所有主表和明细表都保存成功后 才 提交
              console.log(this.attachmentRole)

              // 先根据权限判断 处理意见的必填项校验
              if(this.attachmentRole.OpinionRequired){
                // 意见必填
                if(!this.flowEditorContentValue){
                  this.$message({
                    type: "warning",
                    message: "请填写处理意见后再提交"
                  })
                  return 
                }
              }       
              // 判断提交前是否弹出确认的弹框
              if(this.form.FunctionRole.NeedConfirm){
                this.$confirm('是否确认提交?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // 确认后，提交
                  this._send()
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消提交'
                  })         
                })
              }else {
                // 不需要提交前确认 直接提交
                if(this.attachmentRole.OpinionRequired){
                  // 意见必填
                  if(!this.flowEditorContentValue){
                    this.$message({
                      type: "warning",
                      message: "请填写处理意见后再提交"
                    })
                    return 
                  }
                }  
                this._send()
              }
            })
            break
          case 'SaveMainValue,SaveDetailValue':
            // 保存按钮
            debugger
            this._save(method)
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
        debugger
        this.$refs[param].validateField(prop)
      }
    },
    watch: {
      form: {
        handler (newVal, oldVal) {
          debugger
          this.flowObj = newVal.Flow
          this.mainTables = newVal.MainTableInfos

          // 当前功能权限
          this.attachmentRole = newVal.FunctionRole

          // 将所有的明细表存储在一个复制的数组对象中 便于后续提交时 进行 是否 新增行的的校验
          debugger
          if(this.mainTables && this.mainTables.length){
            let allDetailTablesArr = this.mainTables.map((item,key)=>{
              return item.DetailTableInfos
            })
            // allDetailTablesArr 是一个二维数组,需要处理成一维数据
            this.allDetailTables = []
            if( allDetailTablesArr && allDetailTablesArr.length ){
              for(let i=0; i<allDetailTablesArr.length;i++){
                let itemAllDetailTable = allDetailTablesArr[i]
                if(itemAllDetailTable && itemAllDetailTable.length){
                  for(let j=0; j<itemAllDetailTable.length; j++){
                    let itemList = itemAllDetailTable[j]
                    this.allDetailTables.push(itemList)
                    // 复制一个 所有明细表的 副本集合 用于之后判断 新增行的校验
                    this.allDetailTables_copy = JSON.parse(JSON.stringify(this.allDetailTables))
                  }
                }
              }
            }      
          }


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
        padding 5px
        // border-bottom 1px solid rgba(0, 0, 0, .12)
        box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
        max-height 100px
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
          position relative
          .nodeSelector
            position absolute
            top 12px
            left 0
            width 130px
          .tit 
            display inline-block
            text-align center
            padding 20px 0
            font-size 24px
            margin-left 140px
            .tagFlagBox
              display inline-block
              vertical-align middle
              margin-top -10px
            .helpUrl
              font-size 12px
              margin-left 10px
              a
                >>>.el-link--inner
                  font-size 12px
        .NodeTip
          // text-align center
          color #909399
          font-size 12px
          line-height 18px
          letter-spacing 0.3px
          margin-bottom 5px
          .tit
            color #E6A23C
        .tagBtnBox
          display flex
          justify-content flex-start
          flex-wrap wrap
          .tagBtn
            margin 1px 
            &:hover
              backgound-color red     
            &.tagSelected
              background-color rgba(230, 162, 60,1)
              border none
        .ccTextInfo       
          color #909399 
          font-size 12px
          line-height 18px
          letter-spacing 0.3px
          margin 5px 0
          .tit
            color #E6A23C
        .main-content /deep/
          margin-bottom 20px
          .el-scrollbar__wrap
            // height 380px !important
            margin-bottom 0 !important
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

    >>>.el-loading-mask
      top 0 !important

  .move-enter-active, .move-leave-active
    enter-active()

  .move-enter, .move-leave-active
    leave-active()
</style>
