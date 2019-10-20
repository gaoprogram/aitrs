<!--
  User: gaol
  Date: 2019/6/12
  功能：审批流-发起
-->

<template>
  <div class="launch-container mg-30">
    <!---搜索框---start--->
    <div class="search-container">
      关键词：
      <el-input v-model="keyWord" placeholder="请输入关键词" @keyup.enter.native="search()" clearable @clear="search()"></el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
    </div>
    <!--搜索框---end-->

    <!---collapse 面板----start-->
    <div class="type-container">
      <!-- Flows: {{Flows}} -->
      <template v-for="(flow, index) in Flows">
        <el-collapse class="coll-item" v-if="flow.Flows && flow.Flows.length">
          <el-collapse-item :title="flow.Name" :name="index">
            <div class="name" v-for="(item,index) in flow.Flows" :key="item.No + item.Name + index" @click="handleStart(item)">
              <el-button class="share-button" icon="" style="padding:5px" :type="_securityClass(item.SecurityClass)" size="mini" @click.stop="editSecurityClassLevel(item)" v-text="_securityLevel(item.SecurityClass)"></el-button>
              {{item.Name}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </div>
    <!---collapse 面板----start-->

    <!---发起首页（还未调转到dialog页面）修改保密级别状态---start--->
    <el-dialog 
      title="修改保密级别"
      :visible.sync="showSecurityTitleStatus"
      :show-close="true"
      width="500px"
      append-to-body>
      <!-- securityTitleStatus: {{securityTitleStatus}}
      securityClassLevelSource: {{securityClassLevelSource}} -->
      <el-select v-model="securityTitleStatus" placeholder="请选择" style="width:100%">
        <el-option
          v-for="(item,idx) in securityClassLevelSource"
          :key="idx"
          :label="item.Name"
          :value="item.Code">
        </el-option>
      </el-select>   
      
      <div class="footer marginT20 center">
        <el-button @click="showSecurityTitleStatus = false">取 消</el-button>
        <el-button type="primary" @click="_clickEditSureBtn">确 定</el-button>
      </div>
    </el-dialog>
    <!--发起首页（还未调转到dialog页面）修改保密级别状态-----end---->  

    <!---发起dialog页面修改保密级别状态---start--->
    <el-dialog 
      title="修改保密级别"
      :visible.sync="showSecurityTitleStatus_dialog"
      :show-close="true"
      width="500px"
      append-to-body>
      <!-- flowInfo.SecurityClass: {{flowInfo.SecurityClass}}
      securityClassLevelSource: {{securityClassLevelSource}} -->
      <el-select v-model="securityClass_dialog" placeholder="请选择" style="width:100%">
        <el-option
          v-for="(item,idx) in securityClassLevelSource"
          :key="idx"
          :label="item.Name"
          :value="item.Code">
        </el-option>
      </el-select>   
      
      <div class="footer marginT20 center">
        <el-button @click="showSecurityTitleStatus_dialog = false">取 消</el-button>
        <el-button type="primary" @click="_clickEditSureBtn($event,'startDialog')">确 定</el-button>
      </div>
    </el-dialog>
    <!--发起dialog页面 修改保密级别状态-----end---->           

    <!---发起dialog页面修改紧急程度dialog弹框---start--->
    <el-dialog 
      title="修改紧急程度"
      :visible.sync="showEmergencyLevel_dialog"
      :show-close="true"
      width="500px"
      append-to-body>
      <el-select v-model="emergencyLevel_dialog" placeholder="请选择" style="width:100%">
        <el-option
          v-for="(item,idx) in securityClassLevelSource"
          :key="idx"
          :label="item.Name"
          :value="item.Code">
        </el-option>
      </el-select>   
      
      <div class="footer marginT20 center">
        <el-button @click="showEmergencyLevel_dialog = false">取 消</el-button>
        <el-button type="primary" @click="_clickEmergencySureBtn($event,'startDialog')">确 定</el-button>
      </div>
    </el-dialog>
    <!--发起dialog页面修改紧急程度dialog弹框-----end---->      

    <!---流程的发起 详情弹框---start--->
    <el-dialog
      :title="flowObj.FlowName"
      :visible.sync="isStart"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
      fullscreen
      custom-class="launch_dialog"
      v-if="isStart">

      <div class="btnWrap clearfix" style="text-align: right">
        <!----保密级别-----start--->
        <el-tooltip v-if="flowInfo.SecurityClass || flowInfo.SecurityClass== 0" effect="dark" content="保密级别" placement="top-start">
          <el-button 
            :type="_securityClass(flowInfo.SecurityClass)" 
            v-text="_securityLevel(flowInfo.SecurityClass)" 
            @click.stop="editSecurityClassLevel(flowInfo, 'startDialog')"
            style="float:left;margin:10px 0" 
            size="mini">
          </el-button>
        </el-tooltip>
        <!---保密级别---end-----> 

        <!----紧急程度-----start--->
        <el-tooltip v-if="flowInfo.EmergencyLevel || flowInfo.EmergencyLevel== 0" style="margin-left:10px" effect="dark" content="紧急程度" placement="top-start">
          <el-button 
            :type="_EmergencyLevelColor(flowInfo.EmergencyLevel)" 
            v-text="_EmergencyLevel(flowInfo.EmergencyLevel)" 
            @click.stop="editEmergencyLevel(flowInfo, 'startDialog')"
            style="float:left;margin:10px 0" 
            size="mini">
          </el-button>
        </el-tooltip>
        <!---紧急程度---end----->           

        <!--下载主表--start--->
        <!-- <template v-if="functionRole.MainTableCanDownload" style="float:right">
          <el-tooltip   effect="dark" content="下载主表" placement="top-start">

            <el-button
              v-if="_detailTableIsEmpty(currentMainTableObj)"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="showExportSelectMainTable = true"
              style="margin: 10px 0"
            >
              下载主表
            </el-button>
          </el-tooltip> 
        </template>   -->
        <!--下载主表--start--->
      </div>

      <!----内容区---->
      <el-card class="box-card" v-loading="loading" style="min-height: 500px">
        <!-- mainTables: {{mainTables}} -->
        <div style="height: 700px">
          <keep-alive>
          <el-scrollbar style="height: 100%" :native="true">
            <!---主表区域----start-->
            <div class="main-table-field-container" v-if="currentMainTableCode">
              <!----主表名称tab区域---start---->
              <el-tabs v-model="currentMainTableCode" type="card" @tab-click="handleClickMainTableTab">
                <el-tab-pane
                  v-for="(item, index) in mainTables"
                  :key="item.TableCode + item.TableName + index"
                  :label="item.TableName"
                  :name="item.TableCode"
                >
                </el-tab-pane>
              </el-tabs>
              <!----主表名称tab区域---end---->

              <!----主表表单字段显示区--start--->
              <!-- currentMainTableObj：{{currentMainTableObj}} -->
              <div class="table-item">
                <!--系统默认组的表单控件----start--->
                <el-form :model="currentMainTableObj" :ref="`${currentMainTableObj.TableCode}launchForm`" label-width="150px"
                         class="launch_form">
                  <div class="componetBox" v-for = "(obj, index) in currentMainTableObj.Fields" :key="obj.FiledCode + obj.fieldName">
                    <!-- obj: {{obj}} -->
                    <component
                      v-if="obj.Role !== 4"
                      :is="currentRuleComponent(obj.ControlType)"
                      :prop="'Fields.' + index + '.FieldValue'"
                      :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
                      :obj.sync="obj" 
                      :flowContent = "obj.DisplayValue"                
                      :currentFields="currentMainTableObj.Fields"
                      :workId="flowObj.WorkId"
                      :nodeId="flowObj.FK_Node"
                      :attachmentRole="functionRole"
                      @changeEmp="changeOrgMainCmp('launchForm', $event)"
                    ></component>
                    <!--此方格是用来控制无编辑权限的--start-->
                    <div class="shade" v-if="obj.Role === 1" title="无权限编辑"></div>
                    <!--此方格是用来控制无编辑权限的-end--->
                  </div>
                </el-form>
                <!--系统默认组的表单控件----end--->
                <!-- currentMainTableObj.Teams：{{currentMainTableObj.Teams}} -->
                <div v-for="team in currentMainTableObj.Teams" class="teamBox">
                  <div style="border-bottom: 1px solid #dedede; padding-bottom: 10px;margin-bottom: 20px">
                    <span class="team-title" style="padding-left: 20px; font-size: 16px">{{team.TeamName}}</span>
                    
                    <!--分组的表单控件----start--->
                    <el-form :model="team" :ref="`team${team.TeamCode}`" label-width="150px"
                             class="launch_form">
                             <!-- team.Fields: {{team.Fields}} -->
                      <div class="componentBox" v-for="(obj, index) in team.Fields" :key="index">
                          <!-- obj: {{obj.Role}} -->
                        <component
                          v-if="obj.Role !== 4"
                          :is="currentRuleComponent(obj.ControlType)"
                          :prop="'Fields.' + index + '.FieldValue'"
                          :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
                          :obj.sync="obj"
                          :flowContent="obj.DisplayValue"              
                          :currentFields="currentMainTableObj.Fields"
                          :workId="flowObj.WorkId"
                          :nodeId="flowObj.FK_Node"
                          :attachmentRole="functionRole"
                          @changeEmp="changeTeamOrgMainCmp(`team${team.TeamCode}`, $event)"
                        ></component>
                        <!---字段编辑权限----->
                        <div class="shade" v-if="obj.Role === 1" title="无权限编辑"></div>
                      </div>
                    </el-form>
                    <!--分组的表单控件----end--->
                  </div>
                </div>
              </div>
              <!----主表表单字段显示区--end--->
            </div>
            <!---主表区域----end-->

            <!---明细表区域-----start--->
            <div class="detail-table-field-container" v-if="currentDetailTableCode">
              <!--明细表的tab 显示区域--start-->
              <!-- detailTables: {{detailTables}} -->
              <el-tabs v-model="currentDetailTableCode" type="card" @tab-click="handleClickDetailTableTab">
                <el-tab-pane
                  v-for="(item,index) in detailTables"
                  :key="item.DetailTableCode + item.Name + index"
                  :label="item.Name"
                  :name="item.DetailTableCode"
                >
                </el-tab-pane>
              </el-tabs>
              <!--明细表的tab 显示区域--end-->

              <!----明细表的table表格区域----start--->
              <!-- detailTables: {{detailTables}} -->
              <div v-for="(item,index) in detailTables" :key="index">
                <el-form :model="item" :ref="`detailForm${item.DetailTableCode}`" label-width="0"
                         class="detail-form" v-show="currentDetailTableCode === item.DetailTableCode">
                  <div style="width: 100%">
                    <el-scrollbar style="width: 100%" :native="false" :noresize="false">
                      <div class="content-title">
                        <!-- alreadyCheckedNum: {{alreadyCheckedNum}} -->
                        <el-button style="margin-bottom:5px" :disabled="alreadyCheckedNum<=0" size="mini" @click.native="batchDeleteDetailLine">批量删除行</el-button>
                        <table width="100%">
                          <!---明细表表头---start--->
                          <tr>
                            <th>
                              <div>
                                <input 
                                  @click="clickAllChecked" 
                                  type="checkbox" 
                                  :checked="isAllChecked"
                                  id="allChecked"
                                  style="vertical-align:top;margin:2px 2px 0 0"
                                  >
                                </input><label for="allChecked"><span>全选/取消</span></label>
                              </div>
                            </th>
                            <th>
                              <div>选择</div>
                            </th>
                            <th>
                              <div>唯一码</div>
                            </th>
                            <th v-for="(field, index) in item.Fields" :key="index + field.FieldCode">
                              <div>{{field.FieldName}}</div>
                            </th>
                          </tr>
                          <!---明细表表头---end--->

                          <!-----明细表表内容----start---->
                          <tbody>
                            <tr class="trBox" v-if="item.Values.length" v-for="(value, index) in item.Values" :key="index">
                              <td style="text-align: center; min-width: 50px">
                                <!-- value.checked_set: {{value[0].checked_set}} -->
                                <input type="checkbox" :checked='value[0].checked_set' @click="checkedDetailLine(value, index)"></input>
                              </td>
                              <td  class="tdDelete" style="min-width: 50px;text-align: center">
                                <div>
                                  <!-- functionRole.DetailTableCanDelete: {{functionRole.DetailTableCanDelete}} -->
                                  <el-button type="text" @click="handleDelDetail(index, value)" :disabled="!functionRole.DetailTableCanDelete">删除</el-button>
                                </div>
                              </td>
                              <td class="tdOnlyCode">
                                {{value[0].RowNo}}
                              </td>
                              <td class="tdBox" v-for="(field, i) in value" :key="i">
                                  <!-- field.ControlType: {{field.ControlType}} ---- -->
                                  <!-- {{currentRuleComponent(field.ControlType)}} -->
                                  <!-- field: {{field}} -->
                                  <!-- trObj : {{value}} -->
                                <div class="componentBox" v-if="field.Role!=4">
                                  <component
                                    :is="currentRuleComponent(field.ControlType === '13' ? '6' : field.ControlType)"
                                    :prop="'Fields.' + i + '.FieldValue'"
                                    :orderProp="'Fields.' + i + '.FieldValue.parentIds'"
                                    :obj.sync="field"
                                    :flowContent="field.DisplayValue"    
                                    :trObj = "value"
                                    :tdIndex="i"
                                    :trIndex='index'
                                    :currentFields="currentMainTableObj.Fields"
                                    :workId="flowObj.WorkId"
                                    :nodeId="flowObj.FK_Node"
                                    :isTitle="false"
                                    :attachmentRole="functionRole"
                                    @changeEmp="changeTeamOrgDetailCmp(`detailForm${item.DetailTableCode}`, $event)"
                                  ></component>
                                  <!--此方格是否可编辑--start-->
                                  <div class="notCanEdit" v-if="field.Role==1" title="无权限编辑"></div>
                                  <!--此方格是否可编辑--end-->                                  
                                </div>
                              </td>
                            </tr>
                          </tbody>
                          <!-----明细表表内容----end---->
                        </table>
                      </div>
                    </el-scrollbar>
                  </div>
                </el-form>
              </div>

              <template v-if="functionRole.DetailTableCanAdd">
                <el-tooltip   effect="dark" content="增加一行" placement="top-start">
                  <el-button
                    v-if="currentDetailTableObj.Fields"
                    type="primary"
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleClickAddDetailLine"
                    style="margin-top: 10px">
                  </el-button>
                </el-tooltip>
              </template>
              <!----明细表的table表格区域----end--->
            </div>


            <!---明细表区域------end--->
          </el-scrollbar>
          </keep-alive>
        </div>
      </el-card>  
      
      <!--上传明细表、 下载明细表--start-->
      <template v-if="_detailTableIsEmpty(currentDetailTableObj)">
        <!-- currentDetailTableObj.Name: {{currentDetailTableObj.Name}} -->
        <el-tooltip   effect="dark" :content="'上传：'+ currentDetailTableObj.Name + '明细表'" placement="top-start">
          <el-button
            v-if="functionRole.DetailTableCanUpload"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="clickUpLoadDetailBtn"
            style="margin-top: 10px">上传当前明细表
          </el-button>
        </el-tooltip>

        <!-- <el-tooltip   effect="dark" :content="'下载：'+ currentDetailTableObj.Name + '明细表'" placement="top-start">
          <el-button
            v-if="functionRole.DetailTableCanDownload"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="showExportSelectDetailTable = true"
            style="margin-top: 10px">下载当前明细表
          </el-button>    
        </el-tooltip>      -->
      </template>
      <!--上传明细表、 下载明细表--end-->       

      <!--上传附件部分---start-->
      <!-- currentMainTableObj: {{currentMainTableObj}} -->
      <!-- flowObj.FK_Node: {{flowObj.FK_Node}} -->
      <!-- currentDetailTableObj： {{currentDetailTableObj}} -->
      <div v-if="showUploadDetail" v-loading="uploadDetailLoadingState">
        <el-dialog
          :title="`上传【${currentDetailTableObj.Name}】明细表`"
          :visible.sync="showUploadDetail"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="true"
          custom-class="launch_dialog"
          append-to-body
          width="30%">
          <!-- <div class="downLoadDetailTemplate"> -->
            <!-- <el-link type="primary"><i class="el-icon-download">下载明细表模版</i></el-link> -->
            <el-button type="text" @click="downLoadDetailTemplate"><i class="el-icon-download">下载【{{currentDetailTableObj.Name}}】明细表模版</i></el-button>
          <!-- </div> -->
          <div class="uploadBox marginT30">
            <upload-file ref="uploadDetailTable" 
              :workId="workId" 
              :nodeId="flowObj.FK_Node" 
              :detailTableCode="currentDetailTableObj.DetailTableCode" 
              :mainTableCode="currentMainTableObj.TableCode"
              @uploadDetailLoading = 'uploadDetailLoading'
              @uploadDetailFail = 'uploadDetailFail'
              @uploadDetailSuccess="uploadDetailSuccess">
            </upload-file>
          </div>
        </el-dialog>
      </div>
      <!--上传附件部分---end-->

      <!----导出主表word  dialog-----start-->
      <!-- <template v-if="showExportSelectMainTable && functionRole.MainTableCanDownload && _detailTableIsEmpty(currentMainTableObj)">
        <el-dialog 
          title= "选择主表"
          :visible="showExportSelectMainTable"
          width="600px"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false"
          append-to-body>

          <el-checkbox :indeterminate="isIndeterminate_mainTable" v-model="exportAllMainTable" @change="handleCheckAllMainTableChange">全选</el-checkbox>
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
      </template> -->
      <!----导出主表word  dialog-----end-->

      <!----下载 明细表dialog-----start-->
      <!-- <template v-if="showExportSelectDetailTable && functionRole.DetailTableCanDownload">
        <el-dialog 
          :title= "`选择【${currentDetailTableObj.Name}】明细表`"
          :visible="showExportSelectDetailTable"
          width="600px"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false"
          append-to-body>

          <div style="margin: 15px 0;"></div>

          <el-checkbox-group v-model="selectedDetailTableCode" @change="handleCheckedDetailTableChange" v-loading="!detailTables.length">
            <el-checkbox  :label="currentDetailTableObj.Name">{{currentDetailTableObj.Name}}</el-checkbox>
          </el-checkbox-group>   

          <save-footer
            :isCancel="true"
            saveText="导出"
            @cancel="showExportSelectDetailTable = false"
            @save="handleSaveDownloadDetail">
          </save-footer>          
        </el-dialog>
      </template> -->
      <!----下载 明细表dialog----end-->      

      <!-- flowObj: {{flowObj}} -->
      <!-- currentMainTableObj.TableCode: {{currentMainTableObj.TableCode}} -->
      <!---底部保存、关闭、存草稿区域----start--->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isStart = false">关闭</el-button>
        <el-tooltip class="item" effect="dark" :content="flowInfo.Draft == 0? '保存': '暂存到草稿'" placement="top">
          <el-button @click="handleSaveStart(`${currentMainTableObj.TableCode}launchForm`, 'save')" type="info">保存</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="提交并且发起" placement="top">
          <el-button @click="handleSaveStart(`${currentMainTableObj.TableCode}launchForm`, 'send')" type="primary" :disabled="sendBtnDisabled">提交</el-button>
        </el-tooltip>
      </div>
      <!---底部保存、关闭、存草稿区域----end--->

      <!---选择下一步操作人后提交的弹框start--->
      <el-dialog
        title="选择下一步操作人"
        :visible="nextStepAccepterDialog"
        width="600px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body>
        <!---引用下一步操人的组件--start--->
        <next-step-accepters-cmp
          :flow="flowObj"
          :isNotMust="isNotMust"
          :nextStepAccepterEmpArr="nextStepAccepterEmpArr"
          @DialogCancel="emitCancel"
          @success="emitSuccess">
        </next-step-accepters-cmp>
        <!---引用下一步操人的组件--end--->
      </el-dialog>
      <!---选择下一步操作人后提交的弹框end--->
    </el-dialog>
    <!---流程的发起 详情弹框---end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, REQ_ERR, BASE_URL } from '@/api/config'
  import { mapGetters } from 'vuex'
  import { workFlowControlRuleMixin, flowAutoLogin } from '@/utils/mixin'
  import UploadFile from '@/base/flowUpload/uploadFile'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import NextStepAcceptersCmp from '@/components/platform/approval-flow/right-fixed/nextStepAccepters-cmp'
  import {
    startList,
    start,
    saveMainValue,
    saveDetailValue,
    saveWork,
    saveFlowCustomSet,
    send,
    addNextStepAccepters, // 添加下一步操作人后提交
    getForm,
    exportDetail,
    saveWorkSet
  } from '@/api/approve'
  import { getDicByKey, getRoleRange} from '@/api/permission'

  let self = null

  export default {
    mixins: [flowAutoLogin, workFlowControlRuleMixin],
    data () {
      return {
        keyWord: '',
        no: '', // 当前点击发起的 流编号
        Flows: [],
        isStart: false,   // 控制 发起的 流程表单详情的显示/隐藏
        workId: '',     //
        versionId: '',  // 版本号roleRange
        pageType: 1,   // 调取getform 时传入的 页面类型发起页面 此参数传 1
        flowObj: {},   // 
        flowInfo: {},   // 
        currentMainTableObj: {},   // 当前的主表对象
        currentMainTableCode: '',   // 当前的主表tableCode
        currentMainTaleObjIdx: 0, // 当前主表的索引值
        currentDetailTaleObjIdx: 0, // 当前主表下的明细表的索引值
        currentDetailTableObj: {},   // 当前的明细表对象
        currentDetailTableCode: '',   // 当前的明细表tableCode
        functionRole: {},  // getform 接口返回的功能权限对象
        mainTables: [],    // getForm 接口获取的所有的 表的信息
        detailTables: [],  // 当前主表下面的 所有明细表集合
        allDetailTables: [],  // 所有主表明细的所有明细表集合
        allDetailTables_copy: [],  // 所有主表明细的所有明细表集合的副本
        loading: true,
        launchActiveNames: 0,

        latestTwoTableCode: [], // 存放最近的两次点击的主表code
        showUploadDetail: false, // 上传明细表的弹框显示/隐藏
        beforeUpLoadDetail: [],  // 点击 “上传明细表btn”时 存入当前明细表中 已有的非-1 行号的行数据
        selectedMainTableCode: [],  // 已经选择的多个主表的code集合
        showExportSelectMainTable: false, // 控制下载的主表的 dialog 的显示/隐藏
        isIndeterminate_mainTable: false,    //
        exportAllMainTable: true,  // 全选 导出的主表 的标识

        selectedDetailTableCode: [],  // 下载明细表时，已经选择的多个明细表的Name集合
        showExportSelectDetailTable: false, // 控制下载的明细表的 dialog 的显示/隐藏
        uploadDetailLoadingState: true, // 控制上传明细表的loading状态
        // isIndeterminate_detailTable: false,    //
        // exportAllDetailTable: true,  // 全选 导出的主表 的标识
        currentDetailTableObjChecked: true,  // 默认选中当前要下载的明细表
        sendBtnDisabled: false,   // 控制 提交 按钮的 disabled属性
        currentEditSecurityClassObj: {},  // 正在编辑的保密级别的对象
        securityClassLevelSource: [], // 保密级别的 数据源集合
        showSecurityTitleStatus: false,  // 发起页面还未调转到dialog页面时控制保密级别dialog弹框的显示/隐藏
        showSecurityTitleStatus_dialog: false, // 发起dialog页面中修改 保密级别弹框的 显示/隐藏
        showEmergencyLevel_dialog: false, // 发起dialog页面中修改 紧急程度弹框的 显示/隐藏
        securityTitleStatus: "", // 保密级别的状态
        currentStartObj: {},   // 点击的 发起的 流程对象
        workId_sendAgain: '', // 从再次提交页面进入的此页面
        no_sendAgain: '',  // 从再次提交进入的此页面
        securityClass_dialog: '',  // 进入到 发起的dialog 页面后的 保密级别状态值：“0”、“1”、“2”、“3”
        emergencyLevel_dialog: '',  // 进入到 发起的dialog 页面后的 紧急程度状态值：“0”、“1”、“2”
        isNotMust: false, // 下一步操作人是否必选 false非必选，true 必选
        nextStepAccepterDialog: false,  // 选择下一步操作人的弹框显示/隐藏 
        nextStepAccepterEmpArr: [],   // 下一步操作人的人员集合
        alreadyCheckedNum: 0,  // 记录已经选中的行数量
        isAllChecked: false // 明细表删除行的 全选/取消全选标识
      }
    },
    components: {
      UploadFile,
      SaveFooter,
      NextStepAcceptersCmp
    },
    created () {
      self = this 
      this.$nextTick(()=>{
        try{
          debugger
          this.workId_sendAgain = this.$route.query.workId_sendAgain
          this.no_sendAgain = this.$route.query.no_sendAgain
          this.currentStartObj.SecurityClass = this.$route.query.securityClass_sendAgain
        }catch(err){

        }

        if(this.workId_sendAgain && this.no_sendAgain) {
          // 获取版本 roleRange
          this._getRoleRange().then(res => {
            debugger
            // 从再次提交 页面进入的
            this.no = this.no_sendAgain
            this.workId = this.workId_sendAgain
            // 显示 发起的全屏弹框
            this.isStart = true
            // 获取发起的流程信息
            this._getFormInfo()
          })
        }else {
          // 不是从 再次提交页面进入的
          this._startList()
        }
      })
    },
    mounted () {
    },
    computed: {
      ...mapGetters([
        'companyCode',
        'token',
        'userCode'
      ])
    },
    methods: {
      // 获取版本号
      _getRoleRange () {
        return new Promise ((resolve, reject) => {
          getRoleRange('WorkFlow').then(res => {
            if (res.data.State === REQ_OK) {
              this.versionId = res.data.Data
              resolve()
            }else {
              this.$message({
                type: 'error',
                message: '版本号获取失败err'
              })
              reject()
            }
          })
        })
      },     
      // 获取发起流程字段列表
      _startList () {
        debugger
        this.$store.dispatch('setLoadingState', true)
        startList(this.keyWord).then(res => {
          this.$store.dispatch('setLoadingState', false)
          if (res.data.State === REQ_OK) {
            debugger
            this.Flows = res.data.Data
            this.$set(this.Flows, 'selectValue', '')
          } else {
            this.$message({
              type: 'error',
              message: '发起流程获取失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
          this.$message({
            type: 'error',
            message: '发起流程获取失败，请刷新重试！'
          })
        })
      },
      // 发起初始页面获取workId
      _start (no) {
        return start(no).then(res => {
          if (res.data.State === REQ_OK) {
            return res.data
          } else {
            return res.data
          }
        }).catch(() => {
          return false
        })
      },
      // 判断对象是否为空
      _detailTableIsEmpty (obj) {
        debugger
        // console.log(obj)
        if (obj) {
          if (Object.keys(obj).length === 0) {
            return false
          } else {
            return true
          }
        } else {
          return false
        }
      },
      // 获取 保密级别程度 字典表数据源数据
      _getDicByKey (type) {
        getDicByKey('WorkFlow', 'WorkFlow', 'CUS', type).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.securityClassLevelSource = res.data.Data
          }else {
            this.$message({
              type: 'error',
              message: '保密级别程度list集合数据获取失败,请重试'
            })
          }
        })
      }, 
      // 修改紧急程度
      editEmergencyLevel (obj, str) {
        // 调取 紧急程度下拉list 数据
        debugger
        if(!str){
          // 发起首页，还未调转到 dialog 页面
          this.showTitleStatus = true
        }else if(str ==='startDialog'){
          // 发起dailog 页面
          this.showEmergencyLevel_dialog = true
        }
        this.emergencyTitleStatus = ''
        this.currentEditObj = obj
        this.levelTitle = "修改紧急程度"
        this._getDicByKey('EmergencyLevel')
      }, 
      //修改紧急程度的 保存按钮
      _clickEmergencySureBtn($event, type) {
        debugger
        if(!type){
          // 紧急程度
          if (!this.emergencyTitleStatus){
            this.$message({
              type: 'warning',
              message: '未做任何设置,请设置后保存'
            })
            return 
          }          
          // 发起页面的首页，还未跳转到 发起的dialog 页面
          saveWorkSet(this.currentEditObj.WorkId, this.emergencyTitleStatus).then(res => {
            if( res && res.data.State === REQ_OK ){
              this.showTitleStatus = false
              this.$message({
                type: 'success',
                message: '紧急程度修改成功'
              })
              // 修改成功后，刷新获取最新数据
              this._getFlowTable()
            }else {
              this.$message({
                type: 'error',
                message: '紧急程度修改失败,请重试'
              })
            }
          })
        }else if(type === 'startDialog'){
          if(!this.emergencyLevel_dialog){
            this.$message({
              type: 'warning',
              message: '未做任何设置,请设置后保存'
            })
            return             
          }
          // 调取 修改紧急程度的接口
          debugger
          saveWorkSet(this.workId, this.emergencyLevel_dialog).then(res => {
            debugger
            if( res && res.data.State === REQ_OK ){
              this.flowInfo.EmergencyLevel = this.emergencyLevel_dialog
              this.$message({
                type: 'success',
                message: '紧急程度修改成功'
              })
              this.showEmergencyLevel_dialog = false
            }else {
              this.$message({
                type: 'error',
                message: '紧急程度修改失败,请重试'
              })
            }
          })          
        }
      },   
      // 紧急程度
      _EmergencyLevel (state) {
        if (state == 0) {
          return '正常'
        } else if (state == 1) {
          return '紧急'
        } else if (state == 2) {
          return '加急'
        } else {
          return '暂无紧急状态'
        }
      },
      // 紧急程度对应的颜色
      _EmergencyLevelColor (state) {
        if (state == 0) {
          return 'primary'
        } else if (state == 1) {
          return 'warning'
        } else if (state == 2) {
          return 'danger'
        } else {
          return 'info'
        }
      },                  
      // 修改保密级别
      editSecurityClassLevel (obj, str) {
        debugger
        if(!str){
          // 还未调转到 发起的dialog 页面时
          this.showSecurityTitleStatus = true
        }else if(str === 'startDialog'){
          // 发起的dialog 页面
          this.showSecurityTitleStatus_dialog = true
        }
        this.securityTitleStatus = ''
        this.currentEditSecurityClassObj = obj
        this.currentStartObj = obj
        this._getDicByKey('SecurityLevel')
      },  
      // 修改保密级别的 保存 按钮
      _clickEditSureBtn($event,type) {
        console.log(this.currentStartObj)
        debugger
        if(!type){          
          // 发起的首页还未调转到 发起的dialog页面
          if (!this.securityTitleStatus){
            this.$message({
              type: 'warning',
              message: '未做任何设置,请设置后保存'
            })
            return 
          }          
          saveFlowCustomSet(this.currentStartObj.No, this.workId, this.securityTitleStatus).then(res => {
            debugger
            if( res && res.data.State === REQ_OK ){
              this.showSecurityTitleStatus = false
              this.$message({
                type: 'success',
                message: '保密级别修改成功'
              })
              // 修改成功后，刷新获取最新数据
              this._startList()
            }else {
              this.$message({
                type: 'error',
                message: '保密级别修改失败,请重试'
              })
            }
          })
        }else if( type ==='startDialog'){
          //在发起的 dialog 页面   直接修改 this.flowInfo 中的 SecurityClass
          if(!this.securityClass_dialog){
            this.$message({
              type: 'warning',
              message: '未做任何设置,请设置后保存'
            })
            return             
          }
          // 调取 修改保密级别的接口

          saveWorkSet(this.workId, this.emergencyLevel_dialog, this.securityClass_dialog).then(res => {
            debugger
            if( res && res.data.State === REQ_OK ){
              this.flowInfo.SecurityClass = this.securityClass_dialog
              this.$message({
                type: 'success',
                message: '保密级别修改成功'
              })             
              this.showSecurityTitleStatus_dialog = false
            }else {
              this.$message({
                type: 'error',
                message: '保密级别修改失败,请重试'
              })
            }
          })          
        }
      },                 
      // 保密级别 的样式
      _securityClass(state) {
        // debugger
        if(state == 0){
          return ''
        }else if(state == 1){
          return 'primary'
        }else if(state == 2){
          return 'warning'
        }else if(state == 3){
          return 'danger'
        }
      },
      // 保密级别 文字
      _securityLevel(state) {
        // debugger
        if(state == 0){
          return '正常'
        }else if(state == 1){
          return '秘密'
        }else if(state == 2){
          return '机密'
        }else if(state == 3){
          return '绝密'
        }
      },
      // 保存主表
      _saveMainValue (obj) {
        debugger
        return saveMainValue(this.no, this.no + '001', this.workId, obj)
      },
      // 保存明细表
      _saveDetailValue (obj) {
        return saveDetailValue(this.no, this.no + '001', this.workId, obj)
      },
      // 保存实例存为草稿
      _saveWork () {
        return saveWork(this.no, this.no + '001', this.workId)
      },
      // 提交发起
      _send () {
        this.loading = true
        this.sendBtnDisabled = true
        return send(this.no, this.workId, this.no + '001')
      },
      // 搜索
      search () {
        this._startList()
      },
      // 进行表单必填项验证
      _checkFieldValidate (TableCode) {

      },
      // 切换 主表的 tabs 后需要对 上一个 tabs 中的表单进行 校验（因为 点击 保存并提交时 需要 对所有的表单中的必填项都进行校验通过后才能提交）
      _validate (formName_latestMainTableName) {
        debugger
        console.log("打印formName_latestMainTableName----------", formName_latestMainTableName)
        // 定义一个方法用于找到 对应的上一个 表单对象
        const getLatestMainTable = (mainTableCode) => {
          return this.mainTables.filter(item => {
            return item.TableCode === mainTableCode
          })
        }
  
        let latestMainTableObj = getLatestMainTable(formName_latestMainTableName.slice(0, -10))
        debugger
        // 先进行 主表的校验
        this.$refs[formName_latestMainTableName].validate((valid) => {
          debugger
          if (valid) {
            // 假如主表单校验pass 了 接下来 校验 此表单下面的 自定义分组 和 明细表的校验
            let result = []
            if (latestMainTableObj[0].DetailTableInfos && latestMainTableObj[0].DetailTableInfos.length) {
              latestMainTableObj[0].DetailTableInfos.forEach(item => {
                result.push(this.checkFormArray_latestMainTable(`detailForm${item.DetailTableCode}`, latestMainTableObj))
              })
            }
            if (latestMainTableObj[0].Teams && latestMainTableObj[0].Teams.length) {
              latestMainTableObj[0].Teams.forEach(item => {
                result.push(this.checkFormArray_latestMainTable(`team${item.TeamCode}`, latestMainTableObj))
              })
            }
            Promise.all(result).then(() => {
              // 将 上一次点击的 主表的 validateFlag 中的 validateFlag 属性 修改为 true
              // 通过 formName 去 this.mainTables 中查找    formLaunch 为 10个字符 后面才是tableCode 
              this.mainTables.forEach(item => {
                if (item.TableCode === formName_latestMainTableName.slice(0, -10)) {
                  // 找到了
                  item.validateFlag = true
                }else {
                  // 未找到
                  console.log("未找到对应的表")
                }
              })
            })
          } else {
            // 将 上一次点击的 主表的 validateFlag 中的 validateFlag 属性 修改为 false
            // 通过 formName 去 this.mainTables 中查找   formLaunch 为 10个字符 后面才是tableCode
            this.mainTables.forEach(item => {
              if (item.TableCode === formName_latestMainTableName.slice(0, -10)) {
                // 找到了
                item.validateFlag = false
              }
            })
            // this.$message.error(formName_latestMainTableName + '表单验证失败')
          }
        })
      },
      // 下载明细表模版
      _downLoadDetailTemplate () {
        debugger
        // exportDetail(this.workId, this.currentDetailTableCode, this.currentMainTableCode, true)
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&UserId=${this.userCode}&CompanyCode=${this.companyCode}&workId=${this.workId}&detailTableCode=${this.currentDetailTableCode}&mainTableCode=${this.currentMainTableCode}&nodeId=${this.flowObj.FK_Node}&onlyTemplate=true`
        window.open(url)
      },
      // 获取 getform
      _getFormInfo(){
        this.loading = true   
        getForm(this.no, this.workId, this.no + '001', this.versionId, this.pageType).then(res => {
          debugger
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.flowInfo = res.data.Data.FlowInfo
            // 将flowInfo 中的 SecurityClass 和 EmergencyLevel 复制给securityClass_dialog 和emergencyLevel_dialog  
            try{
              this.securityClass_dialog = ''+this.flowInfo.SecurityClass
              this.emergencyLevel_dialog = ''+this.flowInfo.EmergencyLevel
            }catch(error){

            }
            this.flowObj = res.data.Data.Flow

            this.mainTables = res.data.Data.MainTableInfos

            if (this.mainTables && this.mainTables.length) {
              // 给mainTables 中的　每个item 对象分别添加一个  validateFlag 的字段， 因为提交时候需要 保证 所有的主表 及其对应的明细表中必填项都验证通过了方能提交，否则不提交
              this.mainTables.forEach(item => {
                this.$set(item, 'validateFlag', false)
              })
              // 将 latestTwoTableCode 中存放第一个主表code
              this.latestTwoTableCode.push(this.mainTables[0].TableCode)
            }
            // 功能权限
            this.functionRole = res.data.Data.FunctionRole

            let allDetailTablesArr = this.mainTables.map((item,key)=>{
              return {
                mainTableName: item.TableName,
                detailTablesInfo: item.DetailTableInfos
              }
            })
            debugger
            this.allDetailTables = []
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

            // 复制一个 所有明细表的 副本集合 用于之后判断 新增行的校验
            // this.allDetailTables_copy = JSON.parse(JSON.stringify(this.allDetailTables))
            
            // console.log("处理后的所有明细表的集合", this.allDetailTables)

            // console.log("复制的所有明细表的副本集合allDetailTables_copy",this.allDetailTables_copy)
            debugger
            let allDetailTablesArr_res = allDetailTablesArr.map((item,key) => {
              return item
            })

            if (this.mainTables.length) {
              // 当前主表对象
              this.currentMainTableObj = res.data.Data.MainTableInfos[0]
              // 当前主表对象code
              this.currentMainTableCode = res.data.Data.MainTableInfos[0].TableCode
              // 当前主表对象名下的所有明细表对象集合
              this.detailTables = res.data.Data.MainTableInfos[0].DetailTableInfos
              if (this.detailTables.length) {
                // 当前单个明细表对象
                this.currentDetailTableObj = res.data.Data.MainTableInfos[0].DetailTableInfos[0]
                debugger
    
                this.selectedDetailTableCode.push(this.currentDetailTableObj.Name)

                // 当前单个明细表的code
                this.currentDetailTableCode = res.data.Data.MainTableInfos[0].DetailTableInfos[0].DetailTableCode

              } else {
                this.currentDetailTableObj = {}
                this.currentDetailTableCode = ''
              }
            } else {
              this.currentMainTableObj = {}
              this.currentMainTableCode = ''
              this.detailTables = []
              this.currentDetailTableObj = {}
              this.currentDetailTableCode = ''
            }
          } else {
            this.$message.error(`数据获取失败，${res.data.Error}`)
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '数据获取失败'
          })
        })
      },
      // 获取流信息 getform
      async _getForm () {
        // 获取流程编号
        let s = await this._start(this.no)
        // 将获取的返回值 复制给 workid
        debugger
        this.workId = s.Data

        if (s) {
          if(s.State !== REQ_OK){
            this.$message({
              type: "error",
              message: `发起失败err,${s.Error}`
            })
            return
          }
          // 显示 流程发起的 dialog 全屏弹框
          this.isStart = true

          // 获取 getform 的信息
          this._getFormInfo()

        } else {
          this.$message({
            type: 'error',
            message: `发起失败err，请重试！`
          })
        }        
      },
      // 点击发起
      async handleStart (item) {
        debugger
        let no = ''
        if( item ){
          this.currentStartObj = item
          no = item.No
        }
        debugger
        if (!no) {
          let flowNo = sessionStorage.getItem('flowNo-set')
          if (!flowNo) {
            this.$message({
              type: 'warning',
              message: '未选择任何流程'
            })
            return
          } else {
            this.no = flowNo
          }
        } else {
          // 将no 存入sessionStorage中
          sessionStorage.setItem('flowNo-set', no)
          this.no = no
        }

        // 获取getform
        this._getForm()
      },
      // 下一步操作人选择成功后
      emitSuccess() {
        debugger
        this.nextStepAccepterDialog = false
        this.loading = false
        this.sendBtnDisabled = false                          
        this.isStart = false        
      },
      // 下一步操作人选择取消后
      emitCancel () {
        debugger
        this.nextStepAccepterDialog = false
        this.loading = false
        this.sendBtnDisabled = false
        // this.isStart = false
      },
      // 全选/取消全选  导出的主表
      handleCheckAllMainTableChange (val) {
        debugger
        if(val) {
          this.selectedMainTableCode = this.mainTables.map((item, idx) => {
            return item.TableCode
          })
        }else {
          this.selectedMainTableCode = []
        }
        this.isIndeterminate_mainTable = false;        
      },
      // 单选导出的主表
      handleCheckedMainTableChange (value) {
        let checkedMainTableCount = value.length
        this.exportAllMainTable = checkedMainTableCount === this.mainTables.length 
        this.isIndeterminate_mainTable = checkedMainTableCount > 0 && checkedMainTableCount < this.mainTables.length
      },     
      
      // 全选/取消全选  导出的明细表
      handleCheckAllDetailTableChange (val) {
        debugger
        if(val) {
          this.selectedDetailTableCode = this.detailTables.map((item, idx) => {
            return item.TableCode
          })
        }else {
          this.selectedDetailTableCode = []
        }
        this.isIndeterminate_detailTable = false;        
      },
      // 单选导出的明细表
      handleCheckedDetailTableChange (value) {
        debugger
        // let checkedDetailTableCount = value.length
        // this.exportAllMainTable = checkedDetailTableCount === this.detailTables.length 
        // this.isIndeterminate_detailTable = checkedDetailTableCount > 0 && checkedDetailTableCount < this.detailTables.length

        this.currentDetailTableObjChecked = !this.currentDetailTableObjChecked

      },  
      // 获取当前的主表对象
      _getCurrentMainTableObj(){
        debugger
        this.currentMainTableObj = this.mainTables[this.currentMainTaleObjIdx]
        this.detailTables = this.currentMainTableObj.DetailTableInfos
        if (this.detailTables.length) {
          this.currentDetailTableObj = this.currentMainTableObj.DetailTableInfos[this.currentDetailTaleObjIdx]
          this.currentDetailTableCode = this.currentMainTableObj.DetailTableInfos[this.currentDetailTaleObjIdx].DetailTableCode
          this.selectedDetailTableCode.splice(0,1,this.currentDetailTableObj.Name)
        } else {
          this.currentDetailTableObj = {}
          this.currentDetailTableCode = ''
          this.selectedDetailTableCode.splice()
        }        
      },
      // 点击"上传当前明细表btn"
      clickUpLoadDetailBtn() {
        debugger
        if( this.beforeUpLoadDetail.length ){
          this.beforeUpLoadDetail = []
        }
        // 显示 上传明细表的dialog弹框
        this.showUploadDetail = true
        // 此时需要记录 当前明细表中 是否有含有 非-1 的行数据将其保存下来
        if( this.currentDetailTableObj.Values.length ){
          this.beforeUpLoadDetail = this.currentDetailTableObj.Values.filter((item) => {
            if( item[0].RowNo > 0 ){
              return item
            }
          })
        }
        console.log("上传明细表前记录的当前明细表中非-1行号的行数据beforeUpLoadDetail",this.beforeUpLoadDetail)
      },
      // 明细表上传中
      uploadDetailLoading(){
        debugger
        //显示 明细表上传的loading状态
        this.uploadDetailLoadingState = true
      },
      //上传明细表失败后
      uploadDetailFail() {
        debugger
        // 关闭 uploadDetailLoading 状态
        this.uploadDetailLoadingState = false
      },
      // 上传明细表成功后
      uploadDetailSuccess (detailData) {
        debugger
        // 关闭上传明细表的弹框
        this.showUploadDetail = false  
        // 关闭 上传明细表的loading状态
        this.uploadDetailLoadingState = false         

        if( detailData && detailData.Values.length ){
          if( detailData.DetailTableCode === this.currentDetailTableObj.DetailTableCode && 
            detailData.MainTableCode === this.currentDetailTableObj.MainTableCode ){
            // 比较 this.beforeUpLoadDetail 和 返回的此明细表的数据 去除 返回数据中 已经被删除的行数据
            if(this.beforeUpLoadDetail.length){
              // 上传前 当前明细表中 有非-1行号的行数据， 比较返回的行数据和 上传前的 非-1 行号的数据进行筛选
              detailData.Values = detailData.Values.filter((item, key) => {
                for( let i=0;i< this.beforeUpLoadDetail.length; i++ ){
                  let val = this.beforeUpLoadDetail[i]
                  if(item[0].RowNo === val[0].RowNo || item[0].IsNew ){
                    return item
                  }
                }
              })
            }else {
              // 上传前当前明细表中 没有非 -1 行号的 数据
            }
            debugger
            console.log("-------上传成功后打印处理完的--返回数据detailData------", detailData)
    
            // 处理完 返回的行数据后，将返回的数据 和当前的明细表对象的行数据中 行号为 -1 的数据进行 去重合并
            if(this.currentDetailTableObj.Values && this.currentDetailTableObj.Values.length){
              // let newAddLine = []
              this.currentDetailTableObj.Values = this.currentDetailTableObj.Values.filter((item, key) => {
                return item[0].RowNo === -1
              })
            }

            this.currentDetailTableObj.Values = this.currentDetailTableObj.Values.concat(detailData.Values)
            debugger
            console.log("----------处理完返回的行数据和当前明细表合并后的当前明细表对象--this.currentDetailTableObj.Values",this.currentDetailTableObj.Values)
            // 将上传的明细表数据 合并到对应主表名下的明细表中
            this.mainTables.forEach((item, key) => {
              if(item.DetailTableInfos.length){
                item.DetailTableInfos.forEach((detailItem, i) => {
                  if(detailItem.DetailTableCode === this.currentDetailTableObj.DetailTableCode && 
                    detailItem.MainTableCode === this.currentDetailTableObj.MainTableCode ){
                    // 主表和明细表都相同时 替换 之前的detailItem
                    let detailTableName = detailItem.Name
                    // 合并 上传之前的数据 和上传之后的数据 
                    Object.assign(detailItem, this.currentDetailTableObj)
                    if( !this.currentDetailTableObj.Name ){
                      detailItem.Name = detailTableName
                    }
                    console.log("上传明细表之后打印当前明细表对象-----------------",detailItem)
                    // 获取当前主表对象和当前的明细表对象
                    debugger
                    self._getCurrentMainTableObj()
                    return false
                  }
                })
              }          
            })
          }
        }
      },
      // 发起弹窗点击主表tab切换
      handleClickMainTableTab (tab, event) {
        // 每次切换主表后 将 将 最近两次的切换的 latestTwoTableCode 更新下数据
        debugger
        if (this.latestTwoTableCode[this.latestTwoTableCode.length - 1] !== tab.name) {
          // 点击的不是同一个tab
          this.latestTwoTableCode.push(tab.name)
        }
        if (this.latestTwoTableCode.length >= 3) {
          // 超过3个后 需要删掉一个
          this.latestTwoTableCode.splice(0, 1)
        }
  
        // 切换的当前的主表对象的 索引值
        this.currentMainTaleObjIdx = tab.index*1

        // 切换主表tab后重新获取当前的主表对象
        this.currentMainTableObj = this.mainTables.find(item => {
          return item.TableCode === tab.name
        })
        
        this.detailTables = this.currentMainTableObj.DetailTableInfos
        if (this.detailTables.length) {
          this.currentDetailTableObj = this.currentMainTableObj.DetailTableInfos[0]
          this.currentDetailTableCode = this.currentMainTableObj.DetailTableInfos[0].DetailTableCode
          this.selectedDetailTableCode.splice(0,1,this.currentDetailTableObj.Name)
        } else {
          this.currentDetailTableObj = {}
          this.currentDetailTableCode = ''
          this.selectedDetailTableCode.splice()
        }
  
        // 对上一个表单主动触发进行 必填项的验证
        let privMainTable = this.latestTwoTableCode[0]
        // 切换后切换前的表单主动触发 其 表单验证
        this._validate(privMainTable + 'launchForm')
        debugger
      },
      // 发起弹窗点击明细表tab切换
      handleClickDetailTableTab (tab, event) {
        debugger
        this.currentDetailTaleObjIdx = tab.index*1
        this.currentDetailTableObj = this.detailTables.find(item => {
          return item.DetailTableCode === tab.name
        })
        this.currentDetailTableCode = this.currentDetailTableObj.DetailTableCode
        this.selectedDetailTableCode.splice(0,1,this.currentDetailTableObj.Name)
      },
      // 点击增加明细表行数据（后台生成行号的情况，增加的行 前端默认将新增的行号传为 -1，由后台来处理行号）
      handleClickAddDetailLine(){
        debugger
        // 后台处理新增行的行号
        console.log("-----打印当前的明细表对象-------",this.currentDetailTableObj)
        console.log("-----打印最初的所有明细表对象----------", this.allDetailTables_copy)
        debugger
        // 当前该明细表没有行
        let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields]))
        console.log(newRowObj)
        // 将 行号统一改为  -1
        newRowObj.forEach((item, key) => {
          let ControlType = item.ControlType
          // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
          switch( ControlType ){
            
            case '1': //单行文本
            case '2': //多行文本
            case '3': //数字
            case '4': //金额
            case '9': //时分
              item.FieldValue = ''
              item.RowNo = -1
            break

            case '5': // 单选下拉框
            case '12': // 单选radio
              item.FieldValue = {
                parentIds: '',
                childIds: ''
              }
              item.RowNo = -1
            break

            case '6': // 多选下拉框
            case '13': // 复选框
              item.FieldValue = {
                parentIds: [],
                childIds: []
              }
              // 取消默认选中的value
              item.Ext.DefaultOpt = []        
              item.RowNo = -1
            break

            case '7': // 时间
              item.FieldValue = ''
              item.RowNo = -1
            break

            case '8': // 时间区间
              item.FieldValue = []
              item.RowNo = -1
            break

            case '10': // 月份选择
              item.FieldValue = ''
              item.RowNo = -1
            break

            case '11': // 是否
              item.FieldValue = false
              item.RowNo = -1
            break

            case '14': // 图片
            case '15': // 附件
              item.FieldValue = [
                // {
                //   Name: '',
                //   Url: '',
                //   AttachmentId: ''
                // }
              ]
              item.RowNo = -1
            break

            case '16': // 计算列
              item.FieldValue = ''
              item.RowNo = -1
            break

            case '19': // 公司内联系人
            case '20': // 公司组织
              item.FieldValue = [
                {
                  NodeId:'',
                  Id: '',
                  Name: '',
                  EmpNo: ''
                }
              ]
              item.RowNo = -1
            break 

            case '22': // 地点
              item.FieldValue = {
                LocationName: '',
                Longitude: '',
                Latitude: ''
              }
            item.RowNo = -1
            break

            case '23': // 编辑器
              item.FieldValue = ''
              item.DisplayValue = ''
              item.RowNo = -1
            break                      

            default: 
              item.FieldValue = ''
              item.RowNo = -1
          }
        })    

        console.log("----当前明细表中没有行，打印新增行的对象----",newRowObj)
        this.currentDetailTableObj.Values.push(newRowObj)           
        

        if(this.allDetailTables_copy && this.allDetailTables_copy.length){
          for(let i =0,length = this.allDetailTables_copy.length; i< length; i++){
            let item = this.allDetailTables_copy[i]
            if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode &&
              item.MainTableCode === this.currentDetailTableObj.MainTableCode ){
              // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
              // 最初对应的明细表中 有行
              // 将新的 Values 添加到对应的明细表中的values中
              item.Values.push(newRowObj)                
            }else {
              if( i = this.allDetailTables_copy.length-1){
                console.log("最初的明细表中 没有找到当前对应的明细表")
              }
            }
          }
        } 
      },

      // 点击增加明细表行数据(前端生成行号的情况，增加的行号 由前台来生成)
      // handleClickAddDetail () {
      //   console.log("-----打印当前的明细表对象-------",this.currentDetailTableObj)
      //   console.log("-----打印最初的所有明细表对象----------", this.allDetailTables_copy)
      //   debugger
      //   if(this.currentDetailTableObj && this.currentDetailTableObj.Values && !this.currentDetailTableObj.Values.length){
      //     // 当前该明细表没有行
      //     let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields]))
      //     console.log(newRowObj)
      //     if(this.allDetailTables_copy && this.allDetailTables_copy.length){
      //       for(let i =0,length = this.allDetailTables_copy.length; i< length; i++){
      //         let item = this.allDetailTables_copy[i]
      //         if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode ){
      //           // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
      //           if( item.Values && item.Values.length ){
      //             // 最初对应的明细表中 有行
      //             let  length_start = item.Values.length
      //             let  lastRowNo_start = item.Values[length_start-1][0].RowNo 
      //             newRowObj.forEach((item, key) => {
      //               let ControlType = item.ControlType
      //               // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
      //               switch( ControlType ){
                      
      //                 case '1': //单行文本
      //                 case '2': //多行文本
      //                 case '3': //数字
      //                 case '4': //金额
      //                 case '9': //时分
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '5': // 单选下拉框
      //                 case '12': // 单选radio
      //                   item.FieldValue = {
      //                     parentIds: '',
      //                     childIds: ''
      //                   }
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '6': // 多选下拉框
      //                 case '13': // 复选框
      //                   item.FieldValue = {
      //                     parentIds: [],
      //                     childIds: []
      //                   }
      //                   取消默认选中的value
      //                   item.Ext.DefaultOpt = []  
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '7': // 时间
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '8': // 时间区间
      //                   item.FieldValue = []
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '10': // 月份选择
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '11': // 是否
      //                   item.FieldValue = false
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '14': // 图片
      //                 case '15': // 附件
      //                   item.FieldValue = [
      //                     // {
      //                     //   Name: '',
      //                     //   Url: '',
      //                     //   AttachmentId: ''
      //                     // }
      //                   ]
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '16': // 计算列
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '19': // 公司内联系人
      //                 case '20': // 公司组织
      //                   item.FieldValue = [
      //                     {
      //                       NodeId:'',
      //                       Id: '',
      //                       Name: '',
      //                       EmpNo: ''
      //                     }
      //                   ]
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break 

      //                 case '22': // 地点
      //                   item.FieldValue = {
      //                     LocationName: '',
      //                     Longitude: '',
      //                     Latitude: ''
      //                   }
      //                 item.RowNo = lastRowNo_start*1 + 1
      //                 break

      //                 case '23': // 编辑器
      //                   item.FieldValue = ''
      //                   item.DisplayValue = ''
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                 break                      

      //                 default: 
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_start*1 + 1
      //               }
      //             })                  
      //           }else {
      //             // 最初的对应明细表就没有行,此时行号直接为 1
      //             newRowObj.forEach((item, key) => {
      //               let ControlType = item.ControlType
      //               // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
      //               switch( ControlType ){
      //                 // 
      //                 case '1': //单行文本
      //                 case '2': //多行文本
      //                 case '3': //数字
      //                 case '4': //金额
      //                 case '9': //时分
      //                   item.FieldValue = ''
      //                   item.RowNo = 1
      //                 break

      //                 case '5': // 单选下拉框
      //                 case '12': // 单选radio
      //                   item.FieldValue = {
      //                     parentIds: '',
      //                     childIds: ''
      //                   }
      //                   item.RowNo = 1
      //                 break

      //                 case '6': // 多选下拉框
      //                 case '13': // 复选框
      //                   item.FieldValue = {
      //                     parentIds: [],
      //                     childIds: []
      //                   }
      //                   item.RowNo = 1
      //                 break

      //                 case '7': // 时间
      //                   item.FieldValue = ''
      //                   item.RowNo = 1
      //                 break

      //                 case '8': // 时间区间
      //                   item.FieldValue = []
      //                   item.RowNo =  1
      //                 break

      //                 case '10': // 月份选择
      //                   item.FieldValue = ''
      //                   item.RowNo = 1
      //                 break

      //                 case '11': // 是否
      //                   item.FieldValue = false
      //                   item.RowNo = 1
      //                 break

      //                 case '14': // 图片
      //                 case '15': // 附件
      //                   item.FieldValue = [
      //                     // {
      //                     //   Name: '',
      //                     //   Url: '',
      //                     //   AttachmentId: ''
      //                     // }
      //                   ]
      //                   item.RowNo = 1
      //                 break

      //                 case '16': // 计算列
      //                   item.FieldValue = ''
      //                   item.RowNo = 1
      //                 break

      //                 case '19': // 公司内联系人
      //                 case '20': // 公司组织
      //                   item.FieldValue = [
      //                     {
      //                       NodeId:'',
      //                       Id: '',
      //                       Name: '',
      //                       EmpNo: ''
      //                     }
      //                   ]
      //                   item.RowNo = 1
      //                 break 

      //                 case '22': // 地点
      //                   item.FieldValue = {
      //                     LocationName: '',
      //                     Longitude: '',
      //                     Latitude: ''
      //                   }
      //                 item.RowNo =  1
      //                 break

      //                 case '23': // 编辑器
      //                   item.FieldValue = ''
      //                   item.DisplayValue = ''
      //                   item.RowNo = 1
      //                 break   

      //                 default: 
      //                   item.FieldValue = ''
      //                   item.RowNo = 1
      //               }
      //             })                
      //           }
      //           break
      //         }else {
      //           console.log("最初的明细表中 没有找到当前对应的明细表")
      //         }
      //       }

      //       // this.allDetailTables_copy.forEach((item, key) => {
      //       //   if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode ){
      //       //     // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
      //       //     if( item.Values && item.Values.length ){
      //       //       // 最初对应的明细表中 有行
      //       //       let  length_start = item.Values.length
      //       //       let  lastRowNo_start = item.Values[length_start-1][0].RowNo 
      //       //       newRowObj.map((item, key) => {
      //       //         item.FieldValue = '',
      //       //         item.RowNo = lastRowNo_start*1 + 1
      //       //       })                 
      //       //     }else {
      //       //       // 最初的对应明细表就没有行,此时新增时就直接在现在的明细表最大的一个行号上面加1
      //       //       newRowObj.map((item, key) => {
      //       //         item.FieldValue = ''
      //       //         item.RowNo = 1
      //       //       })
      //       //     }
      //       // return false
      //       //   }else {
      //       //     console.log("最初的明细表中 没有找到当前对应的明细表")
      //       //   }
      //       // })
      //     }
      //     console.log("----当前明细表中没有行，打印新增行的对象----",newRowObj)
      //     this.currentDetailTableObj.Values.push(newRowObj) 
      //   }else {
      //     // 该明细表中 有行
      //     let length_now = this.currentDetailTableObj.Values.length
      //     let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Values[length_now-1]]))
      //     let lastRowNo_now = this.currentDetailTableObj.Values[length_now-1][0].RowNo
      //     // let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields]))
      //     console.log("------当前明细表中有行-打印新增行复制的对象（行号未修改前）------",newRowObj)
      //     // 处理新增的这个数据，将每列的 FieldValue 值清空，将序号 在最新RowNo最大的的数据基础上面 增加1，到时通过 最后一行的行号的比较 来判断是否新增行的验证
      //     // 此处要特别注意，要比较现在最新的数据中的最后一行的rowNo 和 最开始数据中最后一行的 RowNo 谁大，在大的基础上面 新增的行 行号加1
      //     if(this.allDetailTables_copy && this.allDetailTables_copy.length){
      //       this.allDetailTables_copy.forEach((item, key) => {
      //         if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode ){
      //           // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
      //           // 修改 每行的对象中的  RowNo 的值
      //           if( item.Values && item.Values.length ){
      //             // 最初对应的明细表中 有行
      //             let  length_start = item.Values.length
      //             let  lastRowNo_start = item.Values[length_start-1][0].RowNo 
      //             if(lastRowNo_now >= lastRowNo_start){
      //               // 当前的对应明细表最大的行号 大于等于 开始时的明细表中最大的行号
      //               newRowObj.forEach((item, key) => {
      //                 let ControlType = item.ControlType
      //                 // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
      //                 switch( ControlType ){
      //                   case '1': //单行文本
      //                   case '2': //多行文本
      //                   case '3': //数字
      //                   case '4': //金额
      //                   case '9': //时分
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '5': // 单选下拉框
      //                   case '12': // 单选radio
      //                     item.FieldValue = {
      //                       parentIds: '',
      //                       childIds: ''
      //                     }
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '6': // 多选下拉框
      //                   case '13': // 复选框
      //                     item.FieldValue = {
      //                       parentIds: [],
      //                       childIds: []
      //                     }
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '7': // 时间
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '8': // 时间区间
      //                     item.FieldValue = []
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '10': // 月份选择
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '11': // 是否
      //                     item.FieldValue = false
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '14': // 图片
      //                   case '15': // 附件
      //                     item.FieldValue = [
      //                       // {
      //                       //   Name: '',
      //                       //   Url: '',
      //                       //   AttachmentId: ''
      //                       // }
      //                     ]
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '16': // 计算列
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '19': // 公司内联系人
      //                   case '20': // 公司组织
      //                     item.FieldValue = [
      //                       {
      //                         NodeId:'',
      //                         Id: '',
      //                         Name: '',
      //                         EmpNo: ''
      //                       }
      //                     ]
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break 

      //                   case '22': // 地点
      //                     item.FieldValue = {
      //                       LocationName: '',
      //                       Longitude: '',
      //                       Latitude: ''
      //                     }
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                   break

      //                   case '23': // 编辑器
      //                     item.FieldValue = ''
      //                     item.DisplayValue = ''
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                   break   

      //                   default: 
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_now*1 + 1
      //                 }                      
      //               })
      //             }else {
      //               // 当前的对应明细表最大的行号 小于 开始时的明细表中最大的行号
      //               newRowObj.forEach((item, key) => {
      //                 let ControlType = item.ControlType
      //                 // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
      //                 switch( ControlType ){
      //                   case '1': //单行文本
      //                   case '2': //多行文本
      //                   case '3': //数字
      //                   case '4': //金额
      //                   case '9': //时分
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '5': // 单选下拉框
      //                   case '12': // 单选radio
      //                     item.FieldValue = {
      //                       parentIds: '',
      //                       childIds: ''
      //                     }
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '6': // 多选下拉框
      //                   case '13': // 复选框
      //                     item.FieldValue = {
      //                       parentIds: [],
      //                       childIds: []
      //                     }
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '7': // 时间
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '8': // 时间区间
      //                     item.FieldValue = []
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '10': // 月份选择
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '11': // 是否
      //                     item.FieldValue = false
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '14': // 图片
      //                   case '15': // 附件
      //                     item.FieldValue = [
      //                       // {
      //                       //   Name: '',
      //                       //   Url: '',
      //                       //   AttachmentId: ''
      //                       // }
      //                     ]
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '16': // 计算列
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '19': // 公司内联系人
      //                   case '20': // 公司组织
      //                     item.FieldValue = [
      //                       {
      //                         NodeId:'',
      //                         Id: '',
      //                         Name: '',
      //                         EmpNo: ''
      //                       }
      //                     ]
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break 

      //                   case '22': // 地点
      //                     item.FieldValue = {
      //                       LocationName: '',
      //                       Longitude: '',
      //                       Latitude: ''
      //                     }
      //                   item.RowNo = lastRowNo_start*1 + 1
      //                   break

      //                   case '23': // 编辑器
      //                     item.FieldValue = ''
      //                     item.DisplayValue = ''
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                   break                           

      //                   default: 
      //                     item.FieldValue = ''
      //                     item.RowNo = lastRowNo_start*1 + 1
      //                 }  
      //               })                                      
      //             }
      //           }else {
      //             // 最初的对应明细表就没有行,此时新增时就直接在现在的明细表最大的一个行号上面加1
      //             newRowObj.forEach((item, key) => {
      //               let ControlType = item.ControlType
      //               // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
      //               switch( ControlType ){
      //                 case '1': //单行文本
      //                 case '2': //多行文本
      //                 case '3': //数字
      //                 case '4': //金额
      //                 case '9': //时分
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '5': // 单选下拉框
      //                 case '12': // 单选radio
      //                   item.FieldValue = {
      //                     parentIds: '',
      //                     childIds: ''
      //                   }
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '6': // 多选下拉框
      //                 case '13': // 复选框
      //                   item.FieldValue = {
      //                     parentIds: [],
      //                     childIds: []
      //                   }
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '7': // 时间
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '8': // 时间区间
      //                   item.FieldValue = []
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '10': // 月份选择
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '11': // 是否
      //                   item.FieldValue = false
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '14': // 图片
      //                 case '15': // 附件
      //                   item.FieldValue = [
      //                     // {
      //                     //   Name: '',
      //                     //   Url: '',
      //                     //   AttachmentId: ''
      //                     // }
      //                   ]
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '16': // 计算列
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break

      //                 case '19': // 公司内联系人
      //                 case '20': // 公司组织
      //                   item.FieldValue = [
      //                     {
      //                       NodeId:'',
      //                       Id: '',
      //                       Name: '',
      //                       EmpNo: ''
      //                     }
      //                   ]
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break 

      //                 case '22': // 地点
      //                   item.FieldValue = {
      //                     LocationName: '',
      //                     Longitude: '',
      //                     Latitude: ''
      //                   }
      //                 item.RowNo = lastRowNo_now*1 + 1
      //                 break


      //                 case '23': // 编辑器
      //                   item.FieldValue = ''
      //                   item.DisplayValue = ''
      //                   item.RowNo = lastRowNo_now*1 + 1
      //                 break                      

      //                 default: 
      //                   item.FieldValue = ''
      //                   item.RowNo = lastRowNo_now*1 + 1
      //               }  
      //             })                   
      //           }
      //           return false
      //         }else {
      //           console.log("最初的明细表中 没有找到当前对应的明细表")
      //         }
      //       })
      //     }
      //     console.log("-----当前明细表中有行-打印新增行复制的对象（行号修改后）------", newRowObj)
      //     console.log("---打印修改后的当前明细表的对象集合------", this.currentDetailTableObj)
      //     this.currentDetailTableObj.Values.push(newRowObj) 
      //   }
      // },
      // 全选行/取消全选行
      clickAllChecked() {
        debugger
        this.isAllChecked = !this.isAllChecked
        if(this.isAllChecked){
          this.currentDetailTableObj.Values.forEach((item, key) => {
            if(item[0].checked_set){
              item[0].checked_set = true
            }else {
              this.$set(item[0], 'checked_set', true)
            }
          })
          this.alreadyCheckedNum = this.currentDetailTableObj.Values.length
        }else {
          this.currentDetailTableObj.Values.forEach((item, key) => {
            if(item[0].checked_set){
              item[0].checked_set = false
            }else {
              this.$set(item[0], 'checked_set', false)
            }
          })
          this.alreadyCheckedNum = 0
        }
      },
      // 批量选中行
      checkedDetailLine (trObj, index) {
        debugger
        // 将该行对象中的第一列的数据添加一个 checked_set 的属性
        if(trObj[0].checked_set){
          trObj[0].checked_set = !trObj[0].checked_set
          if( this.alreadyCheckedNum > 0){
            this.alreadyCheckedNum -= 1 
          }
          if( this.alreadyCheckedNum === 0 ){
            this.isAllChecked = false
          }
        }else {
          this.$set(trObj[0], 'checked_set', true)
          this.alreadyCheckedNum += 1 
          if(this.alreadyCheckedNum>0){
            this.isAllChecked = true
          }
        }
      },
      // 批量删除已经勾选的行
      batchDeleteDetailLine () {
        debugger
        this.$confirm(`确认批量删除已勾选的[${this.alreadyCheckedNum}]行配置吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.currentDetailTableObj.Values = this.currentDetailTableObj.Values.filter((item, key) => {
            return !item[0].checked_set
          })
          this.currentDetailTableObj.Values.forEach((item, i) => {
            if(item[0].checked_set){
              item[0].checked_set = false
            }
          })
          this.alreadyCheckedNum = 0
          this.isAllChecked = false          
        }).catch(() => {

        })
      },
      // 删除明细表单行
      handleDelDetail (index, trObj) {
        debugger
        this.$confirm('确认删除此行配置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 主表对象中 
          debugger
          // 当前的明细表中删除此行
          this.currentDetailTableObj.Values.splice(index, 1)
          //将 删除的trObj 保存起来
          // this.mainTables.forEach((item, key) => {
          //   if(item.DetailTableInfos.length){
          //     item.DetailTableInfos.forEach((detailItem, i) => {
          //       if(detailItem.DetailTableCode === this.currentDetailTableObj.DetailTableCode && 
          //         detailItem.MainTableCode === this.currentDetailTableObj.MainTableCode ){
          //         // 主表和明细表都相同时 替换 之前的detailItem
          //         let detailTableName = detailItem.Name
          //         detailItem.Values.splice(index, 1)
          //         console.log("上传明细表之后打印当前明细表对象-----------------",detailItem)
          //         // 获取当前主表对象和当前的明细表对象
          //         self._getCurrentMainTableObj()
          //         return false
          //       }
          //     })
          //   }             
          // })
          console.log("删除明细表行后打印 此时的this.mainTables------------", this.mainTables)
        }).catch(() => {
        })
      },
      // 下载主表word 
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
          let url = `${BASE_URL}/WorkFlow?Method=exportDoc&TokenId=&CompanyCode=${this.companyCode}&workId=${this.flowObj.WorkId}&nodeId=${this.flowObj.FK_Node}&tableCodes=${tableCodesStr}&userId=${this.userCode}`
          window.open(url)   
        }
      },  
      // 下载明细表excel
      handleSaveDownloadDetail () {
        debugger
        // if (!this.selectedDetailTableCode.length) return this.$message.info('未选择任何明细表')
        // if (this.selectedDetailTableCode.length > 1) return this.$message.info('每次只能下载一个明细表')

        if(!this.currentDetailTableObjChecked){
          this.$message({
            type: "warning",
            message: "请选择明细表后导出"
          })
          return
        }
        console.log(`下载的当前明细表:【${this.currentDetailTableObj.Name}】`)
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&CompanyCode=${this.companyCode}&workId=${this.flowObj.WorkId}&detailTableCode=${this.currentDetailTableObj.DetailTableCode}&mainTableCode=${this.currentDetailTableObj.TableCode}&userId=${this.userCode}`
        window.open(url)
      },          
      // 下载明细表模版
      downLoadDetailTemplate () {
        this._downLoadDetailTemplate()
      },
      // 校验非空
      _checkTableNotEmpty () {
        // 循环校验 每个主表下的 每个明细表都必须 有行数量 即表示 非空校验通过
        return new Promise((resolve, reject) => {
          for(let i=0;i<this.allDetailTables.length; i++){
            let itemDetailTables = this.allDetailTables[i] 
            console.log("----------------",itemDetailTables)
            if(!itemDetailTables.Values.length){
              // 没有行则校验失败
              this.$message({
                type:'warning',
                message: `主表：【${itemDetailTables.mainName}】下的明细表:【${itemDetailTables.Name}】非空校验失败`
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
      // 校验 新增行（前端生成新增行时的 校验方法）
      _checkTableAddline () {
        // 明细表新增行校验即 校验 表的行数对比起初时候 有增加 就算作是  新增行校验了
        // 需要循环遍历所有主表下的 所有明细表都 做 新增行的校验  比较现在的明细表 this.allDetailTables 和 开始的明细表this.allDetailTables_copy 中的item 的 Values 中每行的 行号 RowNo 是否有变化，有变化证明新增行校验通过了
        //  注意发起时 只需要 校验 当前有行 就行
        return new Promise ((resolve, reject ) => {
          if( this.allDetailTables && this.allDetailTables.length ){
            for(let i = 0;i< this.allDetailTables.length; i++){
              let item = this.allDetailTables[i]
              if(!item.Values.length) {
                // 没有长度则说明 没有新增行
                this.$message({
                  type: "warning",
                  message: `主表：【${item.mainName}】下的明细表：【${item.Name} 】新增行 校验失败 `
                })
                resolve(true)
                break
              }else {
                // 现在的明细表有行数
                //  注意发起时 只需要 校验 当前有行 就行
                if( i === this.allDetailTables.length -1 ){
                  resolve(false)
                }
                // 比较现在的明细表中的最后一行的行号 和 最初的明细表中最后一行的行号比较， 现在的行号 大于 之前最后一行的行号 表示新增行了
                // let detaileValLength_now = item.Values.length
                // let detailValLength_start = this.allDetailTables_copy[i].Values.length
                // if(item.DetailTableCode === this.allDetailTables_copy[i].DetailTableCode){
                //   if( this.allDetailTables_copy[i].Values && this.allDetailTables_copy[i].Values.length){
                //     // 最初的对应的明细表有长度 则最接对比最后一行的行号
                //     if( item.Values[detaileValLength_now-1][0].RowNo > this.allDetailTables_copy[i].Values[detailValLength_start-1][0].RowNo ){
                //       // 表示新增行了
                //       resolve(false)
                //       break
                //     }else {
                //       // 表示没有新增行
                //       this.$message({
                //         type: "warning",
                //         message: `主表：【${item.mainName}】下的明细表：【${item.Name}】 新增行 校验失败 `
                //       })
                //       resolve(true)
                //       break                         
                //     }
                //   }else {
                //     // 最初的对应的明细表没有长度, 则 新增行pass
                //     resolve(false)
                //     break
                //   }
                // }else {
                //   // 没有找到对应的明细表
                //   console.log("----------没有找到对应的明细表--------")
                // }
              }
            }
          }   
        })     
      },
      // 校验 新增行 （后台生成新增行时的校验方法）
      _checkTableAddline_houtai () {
        // 明细表新增行校验(后台生成新增行的情况)即 前端校验 表的行中 -1 的行号 就算作是  新增行校验了
        // 需要循环遍历所有主表下的 所有明细表都做 新增行的校验  判断现在的明细表 this.allDetailTables  中的item 的 Values 中每行的 行号中 有 -1 的行号即表示新增行了
        //  注意发起时 只需要 校验 当前有行 就行
        return new Promise ((resolve, reject ) => {
          if( this.allDetailTables && this.allDetailTables.length ){
            for(let i = 0;i< this.allDetailTables.length; i++){
              let item = this.allDetailTables[i]
              if(!item.Values.length) {
                // 没有长度则说明 没有新增行
                this.$message({
                  type: "warning",
                  message: `主表：【${item.mainName}】下的明细表：【${item.Name} 】新增行 校验失败 `
                })
                resolve(true)
                break
              }else {
                // 现在的明细表有行数
                //  注意发起时 只需要 校验 当前有行 就行
                if( i === this.allDetailTables.length -1 ){
                  resolve(false)
                }

                // 比较现在的明细表中的 行号中 有 -1 的即 表示新增行了
                // for( let key = 0; key < item.Values.length; key++){
                //   let lineItem = item.Values[i]
                //   if( lineItem[0].RowNo === -1 ){
                //     // 表示新增行了
                //     resolve(false)
                //     break
                //   }else {
                //     if( key === item.Values.length-1 ){
                //       this.$message({
                //         type: "warning",
                //         message: `主表：【${item.mainName}】下的明细表：【${item.Name} 】新增行 校验失败 `
                //       })                          
                //     }
                //     resolve(true)
                //     break
                //   }
                // }
              }
            }
          }   
        })     
      },      
      // 发起保存提交
      async handleSaveStart (formName, type) {

        // console.log(this.$refs.formName.validateField(formName)
        // this.$refs[formName].validateField(formName)
        // console.log(this.functionRole.DetailTableHaveToAdd, this.currentMainTableObj.DetailTableInfos, !this.currentMainTableObj.DetailTableInfos)
        debugger
        console.log("------------->", formName)
        console.log("------------->",this.functionRole)

        // 判断明细表【非空的校验】  即校验每个明细表都至少有一行才算作是 非空了
        if(this.functionRole.DetailTableNotEmpty) {
          debugger
          // 校验非空
          let res_notEmpty = await this._checkTableNotEmpty()
          debugger
          if(res_notEmpty){
            // 非空校验失败
            return
          }
        }


        // 明细表需要【新增行校验】  即 校验 表的行号对比起初时候 有增加 就算作是  新增行校验了
        if( this.functionRole.DetailTableHaveToAdd ) {
          // let tableHaveToAddFlag = false
          // 新增行校验(前台生成的新增行进行校验)
          // let res_tableAddline = await this._checkTableAddline()
          // 新增行校验（后台生成的新增行进行校验）
          let res_tableAddline = await this._checkTableAddline_houtai()
          debugger

          if(res_tableAddline){
            debugger
            // 添加行 校验失败
            return
          }          
        }


        // 校验 必填项
        debugger
        // 假如 点击的 保存并提交 才需要 先进行校验
        // 先进行 默认主表的校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let result = []
            if (this.currentMainTableObj.DetailTableInfos && this.currentMainTableObj.DetailTableInfos.length) {
              this.currentMainTableObj.DetailTableInfos.forEach(item => {
                result.push(this.checkFormArray(`detailForm${item.DetailTableCode}`))
              })
            }
            if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
              this.currentMainTableObj.Teams.forEach(item => {
                result.push(this.checkFormArray(`team${item.TeamCode}`))
              })
            }
            // 校验
            Promise.all(result).then(() => {
              // 只有 promise 中的所有 promise对象都执行完成后才会进入到 下一步 的.then 中否则不会进入下一步操作
              debugger
              // console.log("++++++_______-------++++=>>>>>>>>>>>>>>",this)
              // 校验成功　一次就 将 this.currentMainTableObj 中的 validateFlag 字段修改为　　true
              this.currentMainTableObj['validateFlag'] = true

              debugger
              let mainArr = []
              let detailArr = []
              if (this.mainTables.length) {
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
                      MainTableCode: item.TableCode,
                      Values: []
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
              console.log("----------",mainArr, detailArr)
              // 保存主表，回调明细表
              // this.loading = true
              if (type === 'save') {
                if(this.flowInfo.Draft == '0'){
                  // 不设草稿  只保存主表和明细表
                  debugger
                  // 存草稿
                  Promise.all([
                    // 保存主表的数据
                    this._saveMainValue(JSON.stringify(mainArr)),
                    // 保存明细表的数据
                    this._saveDetailValue(JSON.stringify(detailArr)),
                    // 保存为草稿
                    // this._saveWork()
                  ]).then(([mainResp, detailResp]) => {
                    this.loading = false
                    if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK) {
                      this.$message.success('主表、明细表都保存成功')
                    } else {
                      if (mainResp.data.State === REQ_ERR) {
                        this.$message.error(`主表保存失败，${mainResp.data.Error}`)
                      }
                      if (detailResp.data.State === REQ_ERR) {
                        this.$message.error(`明细表保存失败，${detailResp.data.Error}`)
                      }
                      // if (workResp.data.State === REQ_ERR) {
                      //   this.$message.error(`草稿保存失败，${workResp.data.Error}`)
                      // }
                    }
                  }).catch(() => {
                    this.loading = false
                    this.$message.error('主表、明细表保存失败，请重试')
                  })
                }else if( this.flowInfo.Draft!='0' ){
                  // 设置了保存为草稿
                  debugger
                  // 存草稿
                  Promise.all([
                    // 保存主表的数据
                    this._saveMainValue(JSON.stringify(mainArr)),
                    // 保存明细表的数据
                    this._saveDetailValue(JSON.stringify(detailArr)),
                    // 保存为草稿
                    this._saveWork()
                  ]).then(([mainResp, detailResp, workResp]) => {
                    this.loading = false
                    if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK && workResp.data.State === REQ_OK) {
                      this.$message.success('草稿保存成功')
                    } else {
                      if (mainResp.data.State === REQ_ERR) {
                        this.$message.error(`草稿保存失败，${mainResp.data.Error}`)
                      }
                      if (detailResp.data.State === REQ_ERR) {
                        this.$message.error(`草稿保存失败，${detailResp.data.Error}`)
                      }
                      if (workResp.data.State === REQ_ERR) {
                        this.$message.error(`草稿保存失败，${workResp.data.Error}`)
                      }
                    }
                  }).catch(() => {
                    this.loading = false
                    this.$message.error('草稿保存失败，请重试')
                  })
                }
              }

              // 提交时，需要判断 所有的主表已经对应名下的明细表必填项表单都验证pass 之后才能提交
              if (type === 'send') {
                // 保存并提交
                debugger
                let flag = false
                let messageStr = ''
                // 提交时 需要保证 每个主表及每个主表下面的 所有明细表都验证通过后才能提交，通过验证每个主表对象下的 validateFlag 字段来达到验证所有的主表及其对应的明细表是否验证通过 
                for (let i = 0, length = this.mainTables.length; i < length; i++) {
                  let item = this.mainTables[i]
                  if (!item.validateFlag) {
                    messageStr = `第${i + 1}个表单：【${item.TableName}】 未填写完整,请先填写完整后保存!!`
                    console.log(`第${i + 1}个表单：【${item.TableName}】 验证fail, error submit!!`)
                    break
                    return false
                  }
                  if (i === length - 1 ) {
                    //循环到了最后一张表 
                    if( item.validateFlag ) {
                      // 并且最后一张主表及明细表都验证通过了
                      flag = true
                    }
                  }
                }

                // 所有表校验通过后 进行 提交
                // debugger
                if (flag) {
                  // 通过 functionRole.NeedConfirm 来确定流程提交时 是否需要确认一下
                  if( this.functionRole.NeedConfirm ) {
                    // 流程提交需要确认
                    this.$confirm('是否确认提交?', '提示', {
                      confirmButtonText: '提交',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      debugger
                      let that = this
                      send(that)
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消提提交'
                      })         
                    })
                  }else {
                    let that = this
                    // 流程提交不需要确认
                    send(that)
                  }

                  function send (_this) {
                    let self = _this
                    console.log(self)
                    debugger
                    Promise.all([
                      self._saveMainValue(JSON.stringify(mainArr)),
                      self._saveDetailValue(JSON.stringify(detailArr)),
                    ]).then(([mainResp, detailResp]) => {
                      console.log(mainResp, detailResp)
                      if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK ) {
                        // 明细表和主表都保存成功 才提交 
                        Promise.all([self._send()]).then(([workResp]) => {
                          if( workResp.data.State === REQ_OK ) {
                            // 提交成功
                            self.loading = false
                            self.sendBtnDisabled = false                          
                            self.isStart = false
                            self.$message.success('提交成功')
                          }else if( workResp && workResp.data.State === 2 ){
                            // 状态值为2 需要选择下一步操作人，必须新增选择了下一步操作人之后才能继续提交
                            debugger
                            self.nextStepAccepterDialog = true
                            self.isNotMust = false
                            self.nextStepAccepterEmpArr = workResp.data.Data || []
                          }else if (workResp && workResp.data.State ===3 ){
                            debugger
                            // 状态值为 3，会弹出下一步操作人，但是选择下一步操作人 不是必选 可以关闭后继续提交
                            self.nextStepAccepterDialog = true
                            // 选下一步操作人不是必选
                            self.isNotMust = true
                            self.nextStepAccepterEmpArr = workResp.data.Data || []                            
                          }
                        })
                      } else {
                        if (mainResp.data.State === REQ_ERR) {
                          return self.$message.error(`主表保存失败，未提交成功,${mainResp.data.Error}`)
                        }
                        if (detailResp.data.State === REQ_ERR) {
                          return self.$message.error(`明细表保存失败，未提交成功,${detailResp.data.Error}`)
                        }
                      }
                    }).catch(() => {
                      self.loading = false
                      self.sendBtnDisabled = false
                      self.$message.error('提交失败，请重试')
                    })
                  }
                } else {
                  this.$message({
                    type: 'warning',
                    message: messageStr
                  })
                }
              }
            }).catch(() => {
              this.$message.warning('验证失败,请检查所有表的信息是否填写完全')
            })
          } else {
            // 可以 通过 formName 找到对应的 表单名字
            let currentMainTable = this.mainTables.filter(item => {
              return item.TableCode === formName.slice(0, -10)
            })
            // console.log(currentMainTable)
            this.$message.warning(`【${currentMainTable[0].TableName}】表单未填写完整,请检查！`)
          }
        })
      },
      // 每次改变人员组织之后重新手动验证一次，不然会提示错误
      changeOrgMainCmp (param, prop) {
        this.$refs[param].validateField(prop)
      },
      // 每次改变人员组织之后重新手动验证一次，不然会提示错误
      changeTeamOrgMainCmp (param, prop) {
        this.$refs[param][0].validateField(prop)
      },
      changeTeamOrgDetailCmp (param, prop) {
        this.$refs[param][0].validateField(prop)
      },

      // 封装验证单一表单的函数
      checkForm (formName) {
        return new Promise((resolve, reject) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              resolve({
                name: formName,
                msg: `${this.currentMainTableObj.TableCode}中的：${formName} 验证pass`
              })
            } else {
              reject(new Error())
            }
          })
        })
      },

      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve({
                name: formName,
                msg: `${this.currentMainTableObj.TableCode}中的：${formName} 验证pass`
              })
            } else {
              // 将 this.currentMainTableObj 中的  validateFlag 属性改为  false
              this.currentMainTableObj.validateFlag = false
              reject(new Error())
            }
          })
        })
      },

      // 封装验证数组表单的函数(仅供 切换主表 tabs 后对切换前的表单进行 验证)
      checkFormArray_latestMainTable (formName, latestMainTableObj) {
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve({
                name: formName,
                msg: `${latestMainTableObj.TableCode}中的：${formName} 验证pass`
              })
            } else {
            // 将 上一次点击的 主表的 validateFlag 中的 validateFlag 属性 修改为 false
              latestMainTableObj.validateFlag = false
              reject(new Error())
            }
          })
        })
      },
      commonValue (obj) {
      }
    },
    watch: {
      'mainTables': {
        handler (newValue, oldValue) {
          // console.log(newValue, oldValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  @import "~common/css/variable.styl"
  .launch-container
    .search-container
      margin-bottom 10px
      .el-input
        display inline-block
        width 250px;
    .type-container
      &::after
        clear-float()
      width 1000px
      .coll-item /deep/
        display inline-block
        width 250px
        margin 5px 5px
        vertical-align top
        border-top 0
        border-bottom 0
        .el-collapse-item__header
          padding-left: 10px;
          color $color
          background-color: #ecf5ff;
          border-top 1px solid #b3d8ff
          border-bottom 1px solid #b3d8ff
        .el-collapse-item__content
          padding-top 10px
          padding-left 10px
          .name
            margin-bottom 5px
            &:hover
              color $color
              cursor pointer
    >>>.launch_dialog 
      .main-table-field-container
        .table-item
          .launch_form
            .componentBox
              position relative
              .shade
                position absolute
                top 0
                left 0
                right 0
                bottom 0
                margin auto
                background-color rgba(0,0,0,.018)
          .teamBox
            .launch_form
              .componentBox
                position relative
                .shade
                  position absolute
                  top 0
                  left 0
                  right 0
                  bottom 0
                  margin auto  
                  background-color rgba(0,0,0,.018)
      .detail-table-field-container /deep/
        .el-scrollbar__wrap
          margin-bottom: 0 !important
          .el-form-item
            margin-bottom: 0 !important
    >>>.el-dialog__body
        padding 0 20px !important
    >>>.el-dialog__footer   
        padding 0 !important
        .dialog-footer
          margin-top 10px !important   


  table {
    border: 1px solid #dfe4ed;
    tbody {
      .trBox {
        .tdDelete {
          min-width 50px
          text-align center
        }
        .tdOnlyCode {
          min-width 30px
          text-align center
        }
        .tdBox {
          .componentBox {
            position relative
            .notCanEdit {
              position absolute
              top 0
              left 0
              right 0
              bottom 0
              margin 0 auto
              width 100%
              height 100%
              background-color rgba(0,0,0,.018)
              &:hover {
                cursor pointer
              }
            }
          }
        }
      }      
    }
  }

  table tr th {
    padding 10px 0
    border: 1px solid #dfe4ed;
    border-top 2px solid #3b8be3
  }

  table tr td {
    min-width 300px
    padding 20px
    border: 1px solid #dfe4ed;
  }

  table {
    border-collapse: collapse
  }

</style>
