<!--
  User: gaol
  Date: 2019/6/12
  功能：审批流（待办，在途，我发起的，我审批的，抄送我的，我关注的） 页面中的 右侧信息展示区域
-->

<template>
  <div class="rightBox">
    <div class="model" @click.native="clickModel">
      
    </div>
    <div class="right-fixed-container animated fadeInRight fast" v-loading="rightBoxLoading">
      <!-- form.Node.NodeId: {{form.Node.NodeId}}
      ----------
      flowCurrentFormObj.Node.NodeId: {{flowCurrentFormObj.Node.NodeId}} -->
      <!-- rightBoxLoading: {{rightBoxLoading}} -->
      <!-- versionId: {{versionId}} -->
      <!-- form: {{form}} -->
      <!-- <el-tooltip class="item" effect="dark" content="关闭" placement="bottom"> -->
        <div class="close" @click="close"> 
          <i class="el-icon-circle-close"></i>
        </div>
      <!-- </el-tooltip> -->
      <div class="content-container" v-if="flowCurrentFormObj.Flow">
        <div class="btn-container">
          <!-- form.Buttons: {{form.Buttons}} -->
          <!-- form: {{form}} -->
          <div class="fn-btn">
            <span v-atris-flowRightFixedScan ="{styleBlock:'inline-block'}">
              <el-button
                round
                size="small"
                v-for="(btn, index) in flowCurrentFormObj.Buttons"
                :key="index"
                @click="handleFn(btn.Method)"
              >{{btn.Text}}
              </el-button>
            </span>
            <span>
              <el-button round size="small" type="primary"  @click.native="_focus(flowCurrentFormObj.Focus.IsFocus)" v-text="isFocus(flowCurrentFormObj.Focus.IsFocus)"></el-button>
            </span>   
            <el-button round size="small" type="primary" v-show="attachmentRole.MainTableCanDownload" :disabled="!mainTables.length" @click.native="showExportSelectMainTable = true">导出</el-button>
            <el-button round size="small" type="primary" @click.native="handlePrintFlow">打印</el-button>
            <el-button round size="small" type="primary" @click.native="prev()">上一条</el-button>
            <el-button round size="small" type="primary" @click.native="next()">下一条</el-button>
          </div>
        </div>
        <!---右侧fixed 详情区域---start--->
        <div class="table-content">

          <div class="table-title">
            <!---节点切换--start---->
            <!-- form.Node.NodeId: {{form.Node.NodeId}}
            ----------
            flowCurrentFormObj.Node.NodeId: {{flowCurrentFormObj.Node.NodeId}} -->

            <div class="nodeSelector" v-if="flowCurrentFormObj.NodeList && flowCurrentFormObj.NodeList.length">
              <el-select v-model="flowCurrentFormObj.Node.NodeId" placeholder="请选择" @change="changeNodeId(flowCurrentFormObj.Node.NodeId)">
                <el-option
                  v-for="(item, key) in flowCurrentFormObj.NodeList"
                  :key="item.NodeId"
                  :label="item.Name"
                  :value="item.NodeId">
                </el-option>
              </el-select>              
            </div>
            <!---节点切换--end---->


            <!--紧急程度、保密级别、帮助网址块----start--->
            <div class="tit">

              <span>{{flowCurrentFormObj.Flow.FlowName}}</span>

              <span class="tagFlagBox">
                <!-- <el-tooltip effect="dark" content="紧急程度"> -->
                  <el-tag 
                    title="紧急程度"
                    size="mini"
                    :type="_EmergencyLevelColor(flowCurrentFormObj.FlowInfo.EmergencyLevel)"
                    v-text="_EmergencyLevel(flowCurrentFormObj.FlowInfo.EmergencyLevel)">
                  </el-tag>
                <!-- </el-tooltip> -->
                <!-- <el-tooltip effect="dark" content="保密级别"> -->
                  <el-tag 
                    title="保密级别"
                    :type="_securityClass(flowCurrentFormObj.FlowInfo.SecurityClass)" 
                    size="mini"
                    v-text="_securityLevel(flowCurrentFormObj.FlowInfo.SecurityClass)">
                  </el-tag>
                <!-- </el-tooltip> -->
              </span>
              <!--帮助网址---start-->
              <span class="helpUrl" v-if="flowCurrentFormObj.FlowInfo.HelpUrl">
                <el-link :href="flowCurrentFormObj.FlowInfo.HelpUrl" target="_blank" type="warning">帮助{{flowCurrentFormObj.FlowInfo.HelpUrl}}</el-link>
              </span>
              <!--帮助网址---end-->
            </div>
            <!--紧急程度、保密级别、帮助网址块----end---> 
          </div>


          <!--前台操作指引--start--->
          <div class="NodeTip" v-if="flowCurrentFormObj.Node.Tip">
            <i class="el-icon-warning-outline" title="操作指引"></i>
            <span class="tit">{{flowCurrentFormObj.Node.Tip}}</span>
          </div>
          <!--前台操作指引--end--->

          <!-- form.Tags： {{form.Tags}} -->
          <!--tag标签区域--start--->
          <div class="tagBtnBox" style="margin-bottom: 10px">
            <el-tag 
              v-for="(tag,idx) in flowCurrentFormObj.Tags" 
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
          <div class="ccTextInfo" v-if="flowCurrentFormObj.CcInfo.Doc">
            <i class="el-icon-warning-outline" title="抄送提示"></i>
            <span class="tit">{{flowCurrentFormObj.CcInfo.Doc}}</span>
          </div>
          <!--抄送提示显示区--end--->

          <div class="main-content">
            <!-- mainTables： {{mainTables}} -->
            <!-- currentMainTableCode_clickMainTab： {{currentMainTableCode_clickMainTab}} -->
            <!-- ------- -->
            <!-- currentMainTableCode: {{currentMainTableCode}} -->
            <!--主表tabs标签显示区域(详情和日志需要显示主表tab)----start--->
            <el-tabs 
              v-if="rightContentCurrentStr === 'GetForm' || (rightContentCurrentStr === 'ShowFormChangeLog' && flowCurrentFormObj.FunctionRole.MainTableCanSeeChangeLog)"
              v-model="currentMainTableCode" 
              type="card" 
              @tab-click="handleClickMainTableTab">
              <el-tab-pane
                v-for="item in mainTables"
                :key="item.TableCode"
                :label="item.TableName"
                :name="item.TableCode"
              >
              </el-tab-pane>
            </el-tabs>
            <!--主表tabs标签显示区域(详情和日志需要显示主表tab)----end--->
      
            <!---主表表单区域--start---->
            <div class="mainTableDetailInfo">
              <el-scrollbar style="height: 100%;width: 100%">
                <!-- currentMainTableObj.Fields: {{currentMainTableObj.Fields}} -->
                <!--当前主表的内容区域--start--->  
                <el-form :model="currentMainTableObj" ref="launchForm"
                        class="main_form">                       
                  <div class="field" v-for="(field, index) in currentMainTableObj.Fields" :key="index">
                    <!--当前主表的详情区域--start--->
                    <div class="isGetForm" v-if="rightContentCurrentStr === 'GetForm'">
                      <!---注：field.Role 有3种状态：1表示只读，2 表示读写， 4 表示隐藏------>
                      <div class="fieldItemBox" v-if="field.Role !== 4">
                        <!--注： 14 表示 图片上传 --15 表示 附件上传-->
                        <!-- <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
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
                        </span> -->

                        <!-- flowCurrentTabStr: {{flowCurrentTabStr}} -->
                        <!--注： 14 表示 图片上传 --15 表示 附件上传-->
                        <div :class="['field-name-displayValue', (field.Role===2 && flowCurrentTabStr==='todo' && currentTabNameStr !=='third' && currentTabNameStr !=='five')? 'line' :'']" 
                              v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                          <div class="nameAndDisplayValue">
                            <span class="name">{{field.FieldName}} :</span>
                            <!--注：23 为编辑器----->
                            <span class="displayValue" v-if="field.ControlType !== '23'">{{field.DisplayValue}}</span>
                            <span class="displayValue" v-if="field.ControlType === '23'" v-html="field.DisplayValue"></span>
                          </div>
                        </div>                        
                        <!-----为图片  或者 附件时----->
                        <div v-else :class="['field-name-displayValue', (field.Role===2 && flowCurrentTabStr==='todo' && currentTabNameStr !=='third' && currentTabNameStr !=='five')? 'line' :'']">
                          <!---注：field.Role 有3种状态：1表示只读，2 表示读写， 4 表示隐藏------>
                          <div class="nameAndDisplayValue">
                            <span class="name">{{field.FieldName}} :</span>
                            <span class="displayValue" v-for="val in field.DisplayValue" :key="val.Url">
                              <span class="downName">{{val.Name}}</span>
                              <span class="downAndDel">
                                <a :href="val.Url" :download="val.Name" target="_blank">
                                  <el-button type="text">下载</el-button>
                                </a>
                                <el-button type="text" 
                                  v-if="field.Role===2 && 
                                  flowCurrentTabStr === 'todo' || 
                                  flowCurrentTabStr === 'onTheWay' || 
                                  flowCurrentTabStr ==='myStart' || 
                                  flowCurrentTabStr === 'myApproval' && 
                                  val.UserNo == userCode" 
                                  @click.native.stop="_deletePic(val, field,currentMainTableCode)">
                                  删除
                                </el-button>
                              </span>
                            </span>
                          </div>
                        </div>   
                        <!-----为图片  或者 附件时---end-->
                        <!--动态显示编辑的动态组件(待办页面、有编辑权限、除了 挂起 和 任务池中的)--start--->
                        <div class="field-edit-fieldValue" 
                          v-if="flowCurrentTabStr === 'todo' && 
                          field.Role === 2 &&
                          currentTabNameStr !=='third' &&
                          currentTabNameStr !=='five'">                        
                          <!-- <span>修改后的值：</span> -->
                          <!-- field.ControlType: {{field.ControlType}} -->
                          <!-- field: {{field}} -->
                          <keep-alive>
                            <component
                              :is="currentRuleComponent(field.ControlType)"
                              :prop="'Fields.' + index + '.FieldValue'"
                              :orderProp="'Fields.' + index + '.FieldValue'"
                              :obj.sync="field"
                              :flowContent="field.DisplayValue"                
                              :workId="flowCurrentFormObj.Flow.WorkId"
                              :nodeId="flowCurrentFormObj.Flow.FK_Node"
                              :attachmentRole="attachmentRole"
                              :isTitle="false"
                              @changeEmp="changeOrgMainCmp('launchForm', $event)"
                            ></component>
                          </keep-alive>
                        </div>
                        <!--动态显示编辑的动态组件--end--->
                      </div>
                    </div>
                    <!--当前主表的详情区域---end-->
                  </div>                      
                </el-form>

                <!-- -------rightContentCurrentStr: {{rightContentCurrentStr}} -->
                <!--主表的分组表单区域--start---->
                <div v-for="team in currentMainTableObj.Teams" v-if="rightContentCurrentStr === 'GetForm'">
                  <div style="border-bottom: 1px solid #dedede; padding-bottom: 10px;margin-bottom: 20px">
                    <span class="team-title" style="font-size: 15px; margin-left: 20px;color:#303133; font-weight:bold">{{team.TeamName}}</span>
                    <el-form :model="team" :ref="`team${team.TeamCode}`"
                            class="main_form">
                      <div class="field" v-for="(field, index) in team.Fields" :key="index">
                        <div class="isGetForm">
                          <div class="fieldItemBox" v-if="field.Role !== 4">
                            <template>
                              <!--注： 14 表示 图片上传 --15 表示 附件上传-->
                              <div 
                                  :class="['field-name-displayValue', (field.Role===2 && flowCurrentTabStr==='todo' && currentTabNameStr !=='third' && currentTabNameStr !=='five')? 'line' :'']" 
                                  v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                                <!---注：field.Role 有3种状态：1表示只读，2 表示读写， 4 表示隐藏------>
                                <div class="nameAndDisplayValue">
                                  <span class="name">{{field.FieldName}} :</span>
                                  <!--注：23 为编辑器----->
                                  <span class="displayValue" v-if="field.ControlType!= '23'">{{field.DisplayValue}}</span>
                                  <span class="displayValue" v-if="field.ControlType === '23'" v-html="field.DisplayValue"></span>
                                </div>
                              </div>                        
                              <!-----为图片  或者 附件时----->
                              <div v-else :class="['field-name-displayValue', (field.Role===2 && flowCurrentTabStr==='todo' && currentTabNameStr !=='third' && currentTabNameStr !=='five')? 'line' :'']">
                                <!---注：field.Role 有3种状态：1表示只读，2 表示读写， 4 表示隐藏------>
                                <div class="nameAndDisplayValue">
                                  <span class="name">{{field.FieldName}} :</span>
                                  <span class="displayValue" v-for="val in field.DisplayValue" :key="val.Url">
                                    <span class="downName">{{val.Name}}</span>
                                    <span class="downAndDel">
                                      <a :href="val.Url" :download="val.Name" target="_blank">
                                        <el-button type="text">下载</el-button>
                                      </a>
                                      <!-- userCode: {{userCode}} -->
                                      <el-button type="text" 
                                        v-if="field.Role===2 && 
                                        flowCurrentTabStr === 'todo' || 
                                        flowCurrentTabStr === 'onTheWay' || 
                                        flowCurrentTabStr ==='myStart' || 
                                        flowCurrentTabStr === 'myApproval' && 
                                        val.UserNo == userCode" 
                                        @click.native.stop="_deletePic(val,field,currentMainTableCode)">
                                        删除
                                      </el-button>
                                    </span>
                                  </span>
                                </div>
                              </div>   
                              <!-----为图片  或者 附件时---end-->

                              <!-- flowCurrentTabStr: {{flowCurrentTabStr}} -->
                              <!--动态显示编辑的动态组件(待办页面、有编辑权限、除了 挂起 和 任务池中的)--start--->
                              <div class="field-edit-fieldValue" 
                                  v-if="flowCurrentTabStr === 'todo' && 
                                  field.Role === 2 &&
                                  currentTabNameStr !=='third' &&
                                  currentTabNameStr !=='five'">
                                <!-- <span>修改后的值：</span> -->
                                <!-- field: {{field}} -->
                                <!-- field.ControlType: {{field.ControlType}} -->
                                <!-- {{currentRuleComponent('6')}} -->
                                <!-- field.DisplayValue: {{field.DisplayValue}} -->
                                <keep-alive>
                                  <component
                                    :is="currentRuleComponent(field.ControlType)"
                                    :prop="'Fields.' + index + '.FieldValue'"
                                    :orderProp="'Fields.' + index + '.FieldValue'"
                                    :obj.sync="field"
                                    :flowContent="field.DisplayValue"                
                                    :workId="flowCurrentFormObj.Flow.WorkId"
                                    :nodeId="flowCurrentFormObj.Flow.FK_Node"
                                    :attachmentRole="attachmentRole"
                                    :isTitle="false"
                                    @changeEmp="changeOrgMainCmp('launchForm', $event)"
                                  ></component>
                                </keep-alive>
                              </div>
                            </template>
                            <!--动态显示编辑的动态组件--end--->
                          </div>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </div>
                <!--分组的分组表单区域--end---->
                <!--当前主表的内容区域--end--->  

                <!--当前主表的【非显示详情】--start--->
                <!-- -------rightContentCurrentStr: {{rightContentCurrentStr}} -->
                <div class="isNotGetForm" v-if="rightContentCurrentStr !== 'GetForm'">
                  <component
                    ref="notGetFormComponent"
                    :is="currentContentComponents(rightContentCurrentStr)"
                    :rightContentCurrentStr="rightContentCurrentStr"
                    :obj.sync="currentMainTableObj"
                    :workId="flowCurrentFormObj.Flow.WorkId"
                    :nodeId="flowCurrentFormObj.Flow.FK_Node"
                    :form="flowCurrentFormObj"
                    :attachmentRole="attachmentRole"  
                    :currentMainTableIndex = "currentMainTableIndex" 
                    :mainTables = "mainTables"            
                  >
                  </component>
                </div>
                <!--当前主表的非【显示详情】--end--->                    
              </el-scrollbar>
            </div>
            <!---主表表单区域--end---->            

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
                  :form="flowCurrentFormObj"
                  :workId="flowCurrentFormObj.Flow.WorkId" 
                  :nodeId="flowCurrentFormObj.Flow.FK_Node" 
                  :currentDetailTableObj="currentDetailTableObj"
                  :currentMainTableObj="currentMainTableObj"
                  :commentsList.sync="commentsList"></option-cmp>  
            <!---意见组件区域----end--->

            <!--流程进度区域---start-->
            <!-- form: {{form}} -->
            <process-progress-cmp 
              v-if="flowCurrentFormObj.Tracks.length"
              :form="flowCurrentFormObj" 
              :workId="flowCurrentFormObj.Flow.WorkId" 
              :nodeId="flowCurrentFormObj.Flow.FK_Node">
            </process-progress-cmp>
            <!--流程进度区域---end-->


            <!--评论区域---start-->
            <feedback-and-comment-cmp ref="feedbackAndCommentComponent" :form="flowCurrentFormObj">   
            </feedback-and-comment-cmp>
            <!---评论区域---end-->

            
            <!--recever接收人区域---start-->
            <template>
              <receiver-cmp ref="receiverComponent" :form="flowCurrentFormObj"></receiver-cmp>
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
          :detailTableList.sync="detailTables"
          :allDetailTables.sync="allDetailTables"
          :workId="flowObj.WorkId"
          :nodeId="flowObj.FK_Node"
          :attachmentRole="attachmentRole"
          @detailTableCancel="detailTableCancel"
          @detailTableSure="detailTableSure">
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
            <el-button type="text" v-if="selectedDetailTable.Name" @click="downLoadDetailTemplate"><i class="el-icon-download">下载【{{selectedDetailTable.Name}}】明细表模版</i></el-button>        
          </div>
          <upload-file 
            v-show="selectedDetailTable.Name"
            :workId="flowCurrentFormObj.Flow.WorkId" 
            :nodeId="flowObj.FK_Node" 
            :detailTableCode="selectedDetailTable.DetailTableCode" 
            :mainTableCode="currentMainTableObj.TableCode"
            :limitUploadDetailTableNum = "limitUploadDetailTableNum"
            @uploadDetailSuccess="uploadDetailSuccess"
            @emitDelDetail="emitDelDetail(selectedDetailTable, currentMainTableObj)">
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
          :form="flowCurrentFormObj"
          :flow="flowCurrentFormObj.Flow"
          :isNotMust = "isNotMust"
          :flowEditorContentVal = "flowEditorContentValue"
          :nextStepAccepterEmpArr = "nextStepAccepterEmpArr"
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
  </div>
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
      // todo 页面中的 审批中 、草稿、挂起、全部、任务池、已领任务、流转异常栏目
      currentTabNameStr: {
        type: String,
        default: ''
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
      },
      ccPk: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        showModel: false,
        dialogVisible: false,
        dialogTitle: '',
        currentDialog: '',
        dialogEmp: false,
        currentMainTableIndex: 0, // 当前主表的 索引
        currentMainTableCode: '',  // 当前主表的code
        currentMainTableCode_clickMainTab: '', 
        currentDetailTableCode: '', // 当前明细表的code
        currentMainTableObj: {},  // 当前主表的数据集合
        currentDetailTableObj: {},  // 当前明细表的数据集合
        attachmentRole: {},     // 当前form的 功能权限的对象
        mainTables: [],    // 所有主表的数据集合
        mainTables_copy: [],  // 所有主表的数据集合的副本
        detailTables: [],    // 当前主表名下的明细表的数据集合
        allDetailTables: [],  // 所有主表明下的所有明细表集合
        allDetailTables_copy: [],  // 所有主表明下的所有明细表集合的副本        
        allDetailTables_added: [],  // 新增行之后的 所有明细表的集合

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
        nextStepAccepterEmpArr: []  // 提交后下一步操作人的对象集合

      }
    },
    computed: {
      ...mapGetters([
        'companyCode',
        'token',
        'userCode',
        'flowFunctionRole',
        'flowEditorContentValue',
        'flowCurrentFormObj'
      ])
    },
    watch: {
      form: {
        handler (newVal, oldVal) {
        //   debugger
        //   // 触发父级form变化
        //   // this.$emit("update:form", newVal)
        //   // 获取当前的主表对象
          // this._getCurrentMainTableObj()
        },
        immediate: true,
        deep: true
      },
      // getForm接口调用后得到的 大的集合对象
      flowCurrentFormObj: {
        handler (newVal, oldVal) {
          this._getCurrentMainTableObj()
        }
      },
      currentMainTableCode_clickMainTab: {
        handler (newVal, oldVal) {
          debugger
          if(newVal){
            if( this.mainTables && this.mainTables.length){

              this.currentMainTableObj = this.mainTables.find(item => {
                return item.TableCode === newVal
              })
              console.log("------切换主表后，打印切换后当前的主表对象currentMainTableObj------", this.currentMainTableObj)
              debugger
              this.detailTables = this.currentMainTableObj.DetailTableInfos
              debugger
              if (!this.detailTables.length) return
              this.currentDetailTableObj = this.currentMainTableObj.DetailTableInfos[0]
              this.currentDetailTableCode = this.currentMainTableObj.DetailTableInfos[0].DetailTableCode            
            }
          }        
        },
        immediate: true,
        deep: true
      },
      loadingProp: {
        handler(newValue, oldValue){
          this.rightBoxLoading = newValue
        }
      },
      rightBoxLoading: {
        handler(newValue, oldValue){
          // 每当rightBoxLoading 变化后 触发 loadingProp的改变
          this.$emit('update:loadingProp', newValue)
        }
      },
      // 切换节点后
      selectNodeId: {
        handler(newValue, oldValue){
        }
      }
    },    
    created () {
      debugger
      // 初始化将 rightContentCurrentStr 设置为 “GetForm” 
      this.rightContentCurrentStr = 'GetForm'
      this.rightBoxLoading = this.loadingProp
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
        debugger
        this.dialogVisible = false
        // 关闭右窗
        this.$emit('closeRight')
        // 刷新form列表
        
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
      clickModel(){
        // this.showModel = !this.showModel
        this.close()
      },     
      // 获取当前的主要对象
      _getCurrentMainTableObj() {
        debugger
        console.log("99999999999999999999999", this.flowCurrentFormObj)
        this.rightContentCurrentStr = "GetForm"
        this.currentTagIdx = 0
        //清空 localStorage 中的 allDetailTables_copy_detailPage
        localStorage.getItem("allDetailTables_copy_detailPage") && localStorage.removeItem("allDetailTables_copy_detailPage")

        this.flowObj = this.flowCurrentFormObj.Flow
        this.mainTables = this.flowCurrentFormObj.MainTableInfos

        // 当前功能权限
        this.attachmentRole = this.flowCurrentFormObj.FunctionRole

        // 将所有的明细表存储在一个复制的数组对象中 便于后续提交时 进行 是否 新增行的的校验
        debugger
        if(this.mainTables && this.mainTables.length){
          let allDetailTablesArr = this.mainTables.map((item,key)=>{
            return {
              mainTableName: item.TableName,
              detailTablesInfo: item.DetailTableInfos
            }
          })
          debugger
          // allDetailTablesArr 是一个二维数组,需要处理成一维数据
          this.allDetailTables = []

          debugger
          if( allDetailTablesArr && allDetailTablesArr.length ){
            for(let i=0; i<allDetailTablesArr.length;i++){
              let itemAllDetailTable = allDetailTablesArr[i]
              // itemAllDetailTable.detailTablesInfo 是一个二维数组,需要处理成一维数据
              if(itemAllDetailTable && itemAllDetailTable.detailTablesInfo && itemAllDetailTable.detailTablesInfo.length){
                for(let j=0; j<itemAllDetailTable.detailTablesInfo.length; j++){
                  itemAllDetailTable.detailTablesInfo[j].mainName = itemAllDetailTable.mainTableName
                  let itemList = itemAllDetailTable.detailTablesInfo[j]
                  this.allDetailTables.push(itemList)
                  // 复制一个 所有明细表的 副本集合 用于之后判断 新增行的校验
                  this.allDetailTables_copy = JSON.parse(JSON.stringify(this.allDetailTables))
                }
              }
            }
          }    
        }
          debugger
          console.log("所有主表名下的所有明细表的集合allDetailTables", this.allDetailTables)
          console.log("复制的所有主表名下的所有明细表的副本集合allDetailTables_copy",this.allDetailTables_copy)

        if (this.mainTables && this.mainTables.length) {
          debugger
          this.currentMainTableObj = this.mainTables[this.currentMainTableIndex]
          this.currentMainTableCode = this.mainTables[this.currentMainTableIndex].TableCode

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

          if (this.mainTables[this.currentMainTableIndex].DetailTableInfos && !this.mainTables[this.currentMainTableIndex].DetailTableInfos.length) return
          this.detailTables = this.mainTables[this.currentMainTableIndex].DetailTableInfos
          this.currentDetailTableObj = this.mainTables[this.currentMainTableIndex].DetailTableInfos[this.currentMainTableIndex]
          if(this.mainTables[this.currentMainTableIndex].DetailTableInfos && this.mainTables[this.currentMainTableIndex].DetailTableInfos.length){
            try{
              // 有可能 detailTableCode 不存在
              this.currentDetailTableCode = this.mainTables[this.currentMainTableIndex].DetailTableInfos[this.currentMainTableIndex].DetailTableCode
            }catch(error){}
          }
        } else {
          this.currentMainTableObj = {}
          this.currentMainTableCode = ''
          this.detailTables = []
          this.currentDetailTableObj = {}
          this.currentDetailTableCode = ''
        }
      },
      // 点击组表上面的 详情、显示反馈、显示直流、显示流程图等按钮时
      currentContentComponents (tab) {
        return tabMap[tab] || ''
      },
      // 将 明细表新增行后的最新数据 替换到 最初的 所有的this.mainTables 中
      changeMainTablesData(allDetailTablesObj){
        debugger
        // 先复制一个 所有主表的数据
        this.mainTables_copy = JSON.parse(JSON.stringify(this.mainTables))

        if(allDetailTablesObj && allDetailTablesObj.length){
          this.mainTables_copy.forEach((item, key) => {
            let newDetailTableInfos = []
            item.DetailTableInfos.forEach((item1, i) => {
              // 循环明细表新增修改之后的 所有明细表的对象  allDetailTablesObj
              allDetailTablesObj.forEach((item2, j) => {
                if( item1.MainTableCode === item2.MainTableCode && item1.DetailTableCode === item2.DetailTableCode ){
                  newDetailTableInfos.push(item2)
                }
              })
              debugger
              // console.log("newDetailTableInfos------", newDetailTableInfos)
              console.log("------------",newDetailTableInfos)
              console.log("打印item1",item1)
              debugger
            })
            debugger
            item.DetailTableInfos = JSON.parse(JSON.stringify(newDetailTableInfos))
            console.log("newDetailTableInfos------", newDetailTableInfos)
            console.log("---明细表新增行或者修改后最新的所有主表信息 this.mainTables_copy-------",this.mainTables_copy)
          })
        }
        debugger
        console.log("明细表新增行或者修改后最新的所有主表信息 this.mainTables_copy-------",this.mainTables_copy)
      },
      // 明细表 确定后
      detailTableSure (obj) {
        debugger
        // this.allDetailTables = obj
        this.changeMainTablesData(obj)
        this.allDetailTables_added = obj
        this.showDetailTable = false
      },
      //明细表 取消后
      detailTableCancel (obj) {
        debugger
        // this.allDetailTables = obj
        this.changeMainTablesData(obj)
        this.allDetailTables_added = obj
        this.showDetailTable = false
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
        // let opinion = await handleContent(this.flowEditorContentValue)
        let opinion = this.flowEditorContentValue
        debugger

        this.rightBoxLoading = true
        // 提交
        send(this.flowCurrentFormObj.Flow.FK_Flow, this.flowCurrentFormObj.Flow.WorkId, this.flowCurrentFormObj.Flow.FK_Node, opinion).then(res =>{
          debugger
          this.rightBoxLoading = false
          if(res && res.data.State === REQ_OK){
            debugger
            this.$message({
              type: "success",
              message: "提交成功"
            })
            // 成功后 关闭右侧  清除localStorage 中的 并且刷新 table
            try{
              localStorage.removeItem("allDetailTables_copy_detailPage")
            }catch (error) {
            }
            this.close()
            // 刷新table列表
            this.emitSuccess()          
          }else if( res && res.data.State === 2){
            // 状态值为 2 需要选择下一步操作人 必须新增选择了下一步操作人之后才能继续提交
            this.dialogTitle = '选择下一步操作人'
            this.dialogVisible = true
            this.isNotMust = false
            this.str = 'addNextStepAccepters'  
            this.nextStepAccepterEmpArr = res.data.Data || []
          }else if( res && res.data.State === 3 ){
            // 状态值为 3，会弹出下一步操作人，但是选择下一步操作人 不是必选 可以关闭后继续提交
            this.dialogTitle = '选择下一步操作人'
            this.dialogVisible = true
            // 选下一步操作人不是必选
            this.isNotMust = true
            this.str = 'addNextStepAccepters' 
            this.nextStepAccepterEmpArr = res.data.Data || []
          }else {
            this.$message({
              type: "warning",
              message: `提交失败err,${res.data.Error}`
            })
          }
        }).catch(err => {
          this.rightBoxLoading = false
          this.$message.error("提交失败err,请刷新后重试")
        })
      },  
      // 导出时切换主表
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
        debugger
        this.currentMainTableIndex = tab.index*1
        debugger
        this.currentMainTableCode_clickMainTab = tab.name
        // console.log("------切换主表后，打印切换前 的主表对象------", this.currentMainTableObj)
        // 将上一次的主表 复制一个副本
        let beforeMainTableObj_copy = JSON.parse(JSON.stringify(this.currentMainTableObj))
        let newTableCode = tab.name
        debugger
        // 前后两次切换的不是同一个主表
        // if( newTableCode !== beforeMainTableObj_copy.TableCode){
          debugger
          this.currentMainTableObj = this.mainTables.find(item => {
            return item.TableCode === tab.name
          })
          // console.log("------切换主表后，打印切换后当前的主表对象currentMainTableObj------", this.currentMainTableObj)
          this.detailTables = this.currentMainTableObj.DetailTableInfos
          if (!this.detailTables.length) return
          this.currentDetailTableObj = this.currentMainTableObj.DetailTableInfos[0]
          this.currentDetailTableCode = this.currentMainTableObj.DetailTableInfos[0].DetailTableCode          
          // 前后两次切换的不是同一个主表， 如果前后切换的是相同的主表则不会重新调取接口
          // 主表切换后 需要去动态调用  标签下的 数据
          // switch(this.rightContentCurrentStr){
          //   // 显示反馈
          //   case 'ShowFeedback':
          //     this._showFeedback()
          //     break
          //   // 显示子流程
          //   case 'ShowSubFlow':
          //     this._showSubFlow()
          //     break
          //   // 流程进度
          //   case 'ShowSchedule':
          //     this._showSchedule()
          //     break
          //   // 显示表单变更日志
          //   case 'ShowFormChangeLog':
          //     this._showFormChangeLog()
          //     break
          //   // 显示相关流程
          //   case 'ShowRelatedFlow':
          //     this._showRelatedFlow()
          //     break
          //   // 显示相关附件
          //   case 'ShowAttachment':
          //     this._showAttachment()
          //     break
          //   // 显示支流状态
          //   case 'ShowInfluentState':
          //     this._showInfluentState()
          //     break
          //   // 显示流程图
          //   case '':
          //     break
          // }
        // }
      },
      // 点击tab页切换明细表
      handleClickAddDetail () {
        this.currentDetailTableObj.Values.push(this.currentDetailTableObj.Fields)
      },
      // 保存主表
      _saveMainValue (obj) {
        debugger
        return saveMainValue(this.flowCurrentFormObj.Flow.FK_Flow, this.flowCurrentFormObj.Node.NodeId, this.flowCurrentFormObj.Flow.WorkId, obj)
      },
      // 校验非空
      _checkTableNotEmpty () {
        debugger
        if( !this.allDetailTables_added || !this.allDetailTables_added.length){
          this.allDetailTables_added = this.allDetailTables_copy
        }        
        // console.log("---------------",this.allDetailTables_added)
        // 循环校验 每个主表下的 每个明细表都必须 有行数量 即表示 非空校验通过
        return new Promise((resolve, reject) => {
          debugger
          for(let i=0;i<this.allDetailTables_added.length; i++) {
            let itemDetailTables = this.allDetailTables_added[i] 
            if(!itemDetailTables.Values.length){
              // 没有行则校验失败
              this.$message({
                type:'warning',
                message: `主表：【${itemDetailTables.mainName}】下的明细表:【${itemDetailTables.Name}】非空校验失败`
              })
              resolve(true) 
              break
            }else {
              if(i === this.allDetailTables_added.length-1 ){
                // 非空校验pass
                resolve(false)
              }
            }
          }
        })
      },
      // 校验 新增行（前端生成新增行时的 校验方法）
      _checkTableAddline () {
        debugger
        // 明细表新增行校验即 校验 表的行数对比起初时候 有增加 就算作是  新增行校验了
        // 需要循环遍历所有主表下的 所有明细表都 做 新增行的校验  比较现在的明细表 this.allDetailTables 和 开始的明细表this.allDetailTables_copy 中的item 的 Values 中每行的 行号 RowNo 是否有变化，有变化证明新增行校验通过了
        if( !this.allDetailTables_added || !this.allDetailTables_added.length){
          this.allDetailTables_added = this.allDetailTables_copy
        }
        // console.log("---------------",this.allDetailTables_added)
        return new Promise ((resolve, reject ) => {
          debugger
          let isPass = false
          if( this.allDetailTables_added && this.allDetailTables_added.length ){
            for(let i = 0;i< this.allDetailTables_added.length; i++){
              let item = this.allDetailTables_added[i]
              if(!item.Values.length) {
                // 现在的没有长度则说明 没有新增行
                this.$message({
                  type: "warning",
                  message: `主表：【${item.mainName}】下的明细表：【${item.Name} 】新增行 校验失败 `
                })
                isPass = false
                resolve(isPass)
                break
              }else {
                debugger
                // 现在的明细表有行数
                // 比较现在的明细表中的最后一行的行号 和 最初的明细表中最后一行的行号比较， 现在的行号 大于 之前最后一行的行号 表示新增行了
                let detaileValLength_now = item.Values.length
                // 循环 最初的 所有的明细表 对象
                for(let j=0;j<this.allDetailTables_copy.length;j++){
                  let item_start = this.allDetailTables_copy[j]
                  let detailValLength_start = this.allDetailTables_copy[j].Values.length
                  if(item.DetailTableCode === item_start.DetailTableCode && item.MainTableCode === item_start.MainTableCode){
                    // 主表code 和明细表code 都相同
                    if( item_start.Values && item_start.Values.length ){
                      // 最初的对应明细表中 values有值 （有行）
                      if(item.Values[detaileValLength_now-1][0].RowNo > item_start.Values[detailValLength_start-1][0].RowNo){
                        // 表示新增行了
                        isPass = true
                        // resolve(true)
                        break
                      }else {
                        // 表示没有新增行
                        this.$message({
                          type: "warning",
                          message: `主表：【${item.mainName}】下的明细表：【${item.Name}】 新增行 校验失败 `
                        }) 
                        isPss = false
                        resolve(isPss)    
                        break
                      }
                    }else {
                      // 最初的对应明细表中 values没有值 （没有行）
                      isPass = true
                      break
                    }
                  }else {
                    debugger
                    if(j === this.allDetailTables_copy.length-1){
                      console.log(`-----【${item.mainName}-${item.MainTableCode}】下-【${item.DetailTableCode}-${item.Name}】------在最初的所有明细表对象${this.allDetailTables_copy}中没有找到对应的明细表--------`)
                      // isPss = false
                      // resolve(false)
                      // return false    
                      isPass = true
                    }
                  }   
                }
              }
            }
          }else {
            debugger
            // 初始时就没有明细表
            console.log("初始就没有明细表。。。")
            isPass = true
          }
          debugger
          console.log("----最终的---isPass-----------", isPass)
          resolve(isPass)
        })  
      },  
      // 校验 新增行 （后台生成新增行时的校验方法）
      _checkTableAddline_houtai () {
        // 明细表新增行校验即 校验 表的行数对比起初时候 有增加 就算作是  新增行校验了
        // 需要循环遍历所有主表下的 所有明细表都 做 新增行的校验  比较现在的明细表 this.allDetailTables_added 和 开始的明细表this.allDetailTables_copy 中的item 的 Values 中每行的 行号 RowNo 是否有变化，有变化证明新增行校验通过了
        if( !this.allDetailTables_added || !this.allDetailTables_added.length){
          this.allDetailTables_added = this.allDetailTables_copy
        }
        console.log("------新增行后打印所有明细表的对象---------",this.allDetailTables_added)
        debugger
        return new Promise ((resolve, reject ) => {
          debugger
          let isPass = false
          if( this.allDetailTables_added && this.allDetailTables_added.length ){
            for(let i = 0;i< this.allDetailTables_added.length; i++){
              let item = this.allDetailTables_added[i]
              if(!item.Values.length) {
                // 现在的没有长度则说明 没有新增行
                this.$message({
                  type: "warning",
                  message: `主表：【${item.mainName}】下的明细表：【${item.Name} 】新增行 校验失败 `
                })
                isPass = false
                resolve(isPass)
                return
              }else {
                debugger
                // 现在的明细表有行数
                // 循环 当前的 所有的明细表 对象
                // 比较现在的明细表中的 行号中 有 -1 的即 表示新增行了
                for( let key = 0; key < item.Values.length; key++){
                  let lineItem = item.Values[key]
                  if( lineItem[0].RowNo === -1 ){
                    // 表示新增行了
                    isPass = true
                    break
                  }else {
                    if( key === item.Values.length-1 ){
                      this.$message({
                        type: "warning",
                        message: `主表：【${item.mainName}】下的明细表：【${item.Name} 】新增行 校验失败 `
                      })    
                      isPass = false
                      resolve(isPass)
                      return                                        
                    }
                  }
                }
              }
            }
          }else {
            debugger
            // 初始时就没有明细表
            console.log("初始就没有明细表。。。")
            isPass = true
          }
          debugger
          console.log("----最终的---isPass-----------", isPass)
          resolve(isPass)
        })  
      },          
      // 保存明细表
      async _saveDetailValue (obj) {
        // 明细表 必须新增行 和 必须为非空的校验
        debugger
        // 判断明细表【非空的校验】  即校验每个明细表都至少有一行才算作是 非空了
        if(this.flowCurrentFormObj.FunctionRole.DetailTableNotEmpty) {
          debugger
          // 校验非空
          let res_notEmpty = await this._checkTableNotEmpty()
          debugger
          if(res_notEmpty){
            // 非空校验失败
            this.rightBoxLoading = false
            return
          }else {
            console.log("明细表非空校验成功")
          }
        }

        // 判断明细表 新增行校验 
        debugger
        // 明细表需要【新增行校验】  即 校验 表的行数对比起初时候 有增加 就算作是  新增行校验了
        if( this.flowCurrentFormObj.FunctionRole.DetailTableHaveToAdd ) {
          debugger
          // // 新增行校验(前台生成的行号)
          // let res_tableAddline = await this._checkTableAddline()
          // 新增行校验（后台生成的行号）
          let res_tableAddline = await this._checkTableAddline_houtai()
          debugger
          if(res_tableAddline){
            debugger
            // 新增行 校验成功
            console.log("明细表 新增行校验成功")
          }else {
            debugger
            console.log("明细表 新增行校验失败")
            // 新增行校验失败
            this.rightBoxLoading = false
            return
          }        
        }        
        debugger
        return saveDetailValue(this.flowCurrentFormObj.Flow.FK_Flow, this.flowCurrentFormObj.Node.NodeId, this.flowCurrentFormObj.Flow.WorkId, obj)
      },
      // 保存实例存为草稿
      _saveWork () {
        return saveWork(this.flowCurrentFormObj.Flow.FK_Flow, this.flowCurrentFormObj.Node.NodeId, this.flowCurrentFormObj.Flow.WorkId)
      },
      // 保存按钮
      _save (method) {
        debugger
        return new Promise((resolve, reject) => {
          // 验证主表必填项的验证
          this.$refs['launchForm'].validate((valid) => {
            debugger
            if (valid) {
              // 主表验证成功后，进行主表 分组的 表单验证
              let result = []
              if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
                this.currentMainTableObj.Teams.forEach(item => {
                  result.push(this.checkFormArray(`team${item.TeamCode}`))
                })
              }

              Promise.all(result).then(async() => {
                debugger
                // 主表、明细表 必填项验证成功后，进行主表、明细表的 保存
                let mainTables_add = []
                let mainArr = []
                let detailArr = []
                // console.log(this.mainTables)
                // 加入 this.mainTables_copy 有长度 则
                if ( this.mainTables_copy && this.mainTables_copy.length ){
                  mainTables_add = this.mainTables_copy
                }else {
                  mainTables_add = this.mainTables
                }
                debugger
                if (mainTables_add && mainTables_add.length) {
                  mainTables_add.forEach((item) => {
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

                    // 处理保存明细表需要的明细表数据
                    item.DetailTableInfos.forEach(detail => {
                      let detailObj = {
                        TableCode: detail.DetailTableCode,
                        Fields: [],
                        MainTableCode: detail.MainTableCode,
                        Values:[]
                      }
                      
                      detail.Values.forEach(val => {
                        detailObj.Values.push(val)
                        let newField = []
                        val.forEach(field => {
                          newField.push({
                            FieldCode: field.FieldCode,
                            FieldName: field.FieldName,
                            FieldValue: field.FieldValue,
                            Unit: field.Unit,
                            RowNo: field.RowNo
                          })
                        })
                        detailObj.Fields.push(newField)
                      })
                      detailArr.push(detailObj)
                    })
                  })
                }
                debugger
                this.rightBoxLoading = true
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
                      debugger
                      this.rightBoxLoading = false
                      // 提交按钮, 提交按钮不调用 _saveWork() 方法
                      resolve()
                    }else if(method && method === 'SaveMainValue,SaveDetailValue'){
                      // 保存按钮  保存按钮才调用 _saveWork() 方法
                      // 保存 意见等
                      this._saveWork().then((res)=>{
                        debugger
                        this.rightBoxLoading = false
                        if(res && res.data.State === REQ_OK){
                          this.rightBoxLoading = false
                          this.$message.success('主表、明细表都保存成功')
                          // 触发父组件 进行 刷新
                          this.$emit("refreshForm")
                        }else {
                          this.rightBoxLoading = false
                          this.$message.error(`主表、明细表保存失败err,${res.data.Error}`)
                        }
                      }).catch(()=>{
                        this.rightBoxLoading = false
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
                    this.rightBoxLoading = false
                    reject(`明细表保存失败err,${saveDetailTables_res.data.Error}`)
                  }
                }else {
                  debugger
                  // 主表保存失败
                  this.$message({
                    type: 'warning',
                    message: `主表保存失败err,${saveMainTables_res.data.Error}`
                  })
                  
                  this.rightBoxLoading = false
                  reject(`主表保存失败err,${saveMainTables_res.data.Error}`)
                }
              }).catch(() => {
                this.rightBoxLoading = false
                // this.$message.error('表单分组必填项验证失败,请检查')
              })
            } else {
              this.rightBoxLoading = false
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
        focus(this.flowCurrentFormObj.Flow.WorkId, num).then(res => {
          if (res.data.State === REQ_OK) {
            if (num === 1) {
              // 将关注改为 “取消关注”
              this.focusTit = "取消关注"
              this.$message({
                type: 'success',
                message: '关注成功！'
              })
              // 触发 父级组件 关闭 右边right-fixed
              this.$emit('closeRight')
              // 触发 父级组件 进行 刷新table列表
              this.$emit('refreshForm')
            } else if (num === 0) {
              // 将取消关注 改为 “关注”
              this.focusTit = "关注"
              this.$message({
                type: 'success',
                message: '取消关注成功！'
              })
              // 触发 父级组件 关闭 右边right-fixed
              this.$emit('closeRight')              
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
        deleteFlow(this.flowCurrentFormObj.Flow.FK_Flow, this.flowCurrentFormObj.Flow.WorkId).then(res => {
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
        unSend(this.flowCurrentFormObj.Flow.FK_Flow, this.flowCurrentFormObj.Flow.WorkId, this.flowCurrentFormObj.Flow.FK_Node).then(res => {
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
           url = `/#/flow/print?no=${this.flowCurrentFormObj.Flow.FK_Flow}&workId=${this.flowCurrentFormObj.Flow.WorkId}&nodeId=${this.flowCurrentFormObj.Flow.FK_Node}&pageType=${this.pageTabType}&selectNodeId=${this.flowCurrentFormObj.Node.NodeId}`
          }else if(process.env.NODE_ENV === 'production'){
            // 生产环境 
           url = `/WebNotice/index.html#/flow/print?no=${this.flowCurrentFormObj.Flow.FK_Flow}&workId=${this.flowCurrentFormObj.Flow.WorkId}&nodeId=${this.flowCurrentFormObj.Flow.FK_Node}&pageType=${this.pageTabType}&selectNodeId=${this.flowCurrentFormObj.Node.NodeId}`
          }
        }else {
          console.log("---------process.env未配置--print.vue中打印出错--------")
        }
        window.open(url)
      },
      // 意见框中 编辑、填写意见后
      changeOptionContent (val) {
        // console.log(val)
      },
      // 明细表下载
      downLoadDetailTemplate () {
        let nodeId_jiedian = this.flowCurrentFormObj.Node.NodeId
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&UserId=${this.userCode}&CompanyCode=${this.companyCode}&workId=${this.workId}&detailTableCode=${this.currentDetailTableCode}&mainTableCode=${this.currentMainTableCode}&nodeId=${nodeId_jiedian}&onlyTemplate=true`
        window.open(url)
      },
      // 明细表上传成功后
      uploadDetailSuccess () {
        debugger
        // 明细表上传上传后 right-fixed 需要刷新一下
        this._getForm(this.flowCurrentObj.FK_Flow, this.flowCurrentObj.WorkId, this.flowCurrentObj.FK_Node, this.versionId, this.pageTabType, this.ccPk, this.selectNodeId)
        console.log('明细表上传成功')
      },  
      // 删除已上传的明细表
      emitDelDetail (currentDetailObj, currentMainObj) {
        debugger
        // 将currentMainObj 中对应的 明细表 中 的values 清空
        if( currentMainObj.DetailTableInfos && currentMainObj.DetailTableInfos.length ){
          currentMainObj.DetailTableInfos.forEach((item, i) => {
            if( item.DetailTableCode === currentDetailObj.DetailTableCode && item.MainTableCode === currentDetailObj.MainTableCode ){
              item.Values = []
            }
          })
        }
        debugger
      },   
      // 导出excel--ok
      _exportFlow () {
        // if (this.typeFlow === 'copy') {
        //   let url = `${BASE_URL}/WorkFlow?Method=ExportSelectedWork&TokenId=&CompanyCode=${this.companyCode}&myPks=['${this.flowCurrentFormObj.Flow.WorkId}']&userId=${this.userCode}`
        //   window.open(url)
        // } else {
        //   let url = `${BASE_URL}/WorkFlow?Method=ExportSelectedWork&TokenId=&CompanyCode=${this.companyCode}&workIds=[${this.flowCurrentFormObj.Flow.WorkId}]&userId=${this.userCode}`
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

        // console.log(dataSource)
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
          debugger
          let tableCodesStr = JSON.stringify(this.selectedMainTableCode)
          let nodeid_export = this.flowCurrentFormObj.Node.NodeId
          let url = `${BASE_URL}/WorkFlow?Method=exportDoc&TokenId=&CompanyCode=${this.companyCode}&workId=${this.flowCurrentFormObj.Flow.WorkId}&nodeId=${nodeid_export}&tableCodes=${tableCodesStr}&userId=${this.userCode}`
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
        debugger
        console.log(this.selectedDetailTable)
        this.selectedDetailTable.Name = ''
        this.showUpDetailTable = true
      },
      // 明细表选择完毕后点下载
      handleSaveDownloadDetail () {
        debugger
        if (!this.multipleSelection.length) return this.$message.info('未选择任何明细表')
        if (this.multipleSelection.length > 1) return this.$message.info('每次只能下载一个明细表')
        let nodeId_jiedian = this.flowCurrentFormObj.Node.NodeId
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&CompanyCode=${this.companyCode}&workId=${this.flowCurrentFormObj.Flow.WorkId}&detailTableCode=${this.multipleSelection[0].DetailTableCode}&mainTableCode=${this.multipleSelection[0].MainTableCode}&nodeId=${nodeId_jiedian}&userId=${this.userCode}`
        window.open(url)
      },
      // 明细表上传完成后 点击确认
      handleSaveUploadloadDetail () {

      },
      // right-fixed点击(提交、移交、加签、退回、挂起、拒绝、会签、评论、抄送)等按钮
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
              this.rightBoxLoading = false
              // 所有主表和明细表都保存成功后 才 提交
              // console.log(this.attachmentRole)
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
              if(this.flowCurrentFormObj.FunctionRole.NeedConfirm){
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
          //   this._focus(this.flowCurrentFormObj.Flow.WorkId, 1)
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .model
    position fixed
    background silver
    opacity .2
    top: 90px
    right 0
    left 0
    bottom 0
    z-index 98
    animation: mymove 5s 1;
    -webkit-animation:mymove 5s 1; /*Safari and Chrome*/
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
    box-sizing border-box
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
            &.tagSelected
              background-color rgba(230, 162, 60,1)
              border none            
          &:hover
            backgound-color red     
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
              padding 0 35px
              margin-bottom 10px
              font-size 16px
              color #999999
              box-sizing border-box
              .isGetForm
                .fieldItemBox
                  display flex
                  flex-direction row
                  justify-content flex-start
                  align-items center
                  .field-name-displayValue.line
                    position relative
                    // flex-grow 1
                    &::after
                      position absolute
                      top 0
                      right 0
                      dispaly block
                      content ''
                      width 1px
                      height 100%
                      background-color rgba(204,204,204,0.7)
                  .field-name-displayValue
                    min-width 270px
                    max-width 400px
                    .nameAndDisplayValue
                      .name
                        font-size 14px
                        font-weight bold
                        color #606266
                      .displayValue
                        font-size 12px
                        color #909399
                        margin-left 5px
                  .field-edit-fieldValue
                    margin-bottom -22px
                    margin-left 20px
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


  @keyframes mymove
  {
    0 {
      left: -200px;
      right: -200px;
      opacity: 0;
    }
    100% {
      left: 0;
      right: 0;
      opacity: .2
    }
  }

  @-webkit-keyframes mymove /*Safari and Chrome*/
  {
    0 {
      left: -200px;
      right: -200px;
      opacity: 0;
    }
    100% {
      left: 0;
      right: 0;
      opacity: .2
    }
  }
</style>
