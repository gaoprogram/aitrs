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
            <div class="name" v-for="item in flow.Flows" :key="item.No + item.Name" @click="handleStart(item)">
              <el-button class="share-button" icon="" style="padding:5px" :type="_securityClass(item.SecurityClass)" size="mini" @click.stop="editSecurityClassLevel(item)" v-text="_securityLevel(item.SecurityClass)"></el-button>
              {{item.Name}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </div>
    <!---collapse 面板----start-->

    <!---修改保密级别状态---start--->
    <el-dialog 
      title="修改保密级别"
      :visible.sync="showSecurityTitleStatus"
      :show-close="true"
      width="500px"
      append-to-body>
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
    <!--修改保密级别状态-----end---->       

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

      <div class="btnWrap clearfix" style="text-align: right" >
        <!----保密级别-----start--->
        <el-tooltip effect="dark" content="保密级别" placement="top-start">
          <el-button :type="_securityClass(currentStartObj.SecurityClass)" v-text="_securityLevel(currentStartObj.SecurityClass)" style="float:left;margin:10px 0" size="mini"></el-button>
        </el-tooltip>
        <!---保密级别---end----->      

        <!--下载主表--start--->
        <template v-if="functionRole.MainTableCanDownload" style="float:right">
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
        </template>  
        <!--下载主表--start--->
      </div>

      <!----内容区---->
      <el-card class="box-card" v-loading="loading" style="min-height: 500px">
        <!-- mainTables: {{mainTables}} -->
        <div style="height: 700px">
          <el-scrollbar style="height: 100%" :native="true">
            <!---主表区域----start-->
            <div class="main-table-field-container" v-if="currentMainTableCode">
              <!----主表名称tab区域---start---->
              <el-tabs v-model="currentMainTableCode" type="card" @tab-click="handleClickMainTableTab">
                <el-tab-pane
                  v-for="(item, index) in mainTables"
                  :key="item.TableCode + item.TableName"
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
                  <component
                    v-for="(obj, index) in currentMainTableObj.Fields"
                    :key="obj.FieldCode + obj.fieldName"
                    :is="currentRuleComponent(obj.ControlType)"
                    :prop="'Fields.' + index + '.FieldValue'"
                    :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
                    :obj="obj"
                    :currentFields="currentMainTableObj.Fields"
                    :workId="flowObj.WorkId"
                    :nodeId="flowObj.FK_Node"
                    :attachmentRole="functionRole"
                    @changeEmp="changeOrgMainCmp('launchForm', $event)"
                  ></component>
                </el-form>
                <!--系统默认组的表单控件----end--->
                <!-- currentMainTableObj.Teams：{{currentMainTableObj.Teams}} -->
                <template v-for="team in currentMainTableObj.Teams">
                  <div style="border-bottom: 1px solid #dedede; padding-bottom: 10px;margin-bottom: 20px">
                    <span class="team-title" style="padding-left: 20px; font-size: 16px">{{team.TeamName}}</span>
                    
                    <!--自定义分组的表单控件----start--->
                    <el-form :model="team" :ref="`team${team.TeamCode}`" label-width="150px"
                             class="launch_form">
                      <component
                        v-for="(obj, index) in team.Fields"
                        :key="obj.FieldCode + obj.FieldName"
                        :is="currentRuleComponent(obj.ControlType)"
                        :prop="'Fields.' + index + '.FieldValue'"
                        :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
                        :obj="obj"
                        :currentFields="currentMainTableObj.Fields"
                        :workId="flowObj.WorkId"
                        :nodeId="flowObj.FK_Node"
                        :attachmentRole="functionRole"
                        @changeEmp="changeTeamOrgMainCmp(`team${team.TeamCode}`, $event)"
                      ></component>
                    </el-form>
                    <!--自定义分组的表单控件----end--->
                  </div>
                </template>
              </div>
              <!----主表表单字段显示区--end--->
            </div>
            <!---主表区域----end-->

            <!---明细表区域-----start--->
            <div class="detail-table-field-container" v-if="currentDetailTableCode">
              <!--明细表的tab 显示区域--start-->
              <el-tabs v-model="currentDetailTableCode" type="card" @tab-click="handleClickDetailTableTab">
                <el-tab-pane
                  v-for="item in detailTables"
                  :key="item.DetailTableCode + item.Name"
                  :label="item.Name"
                  :name="item.DetailTableCode"
                >
                </el-tab-pane>
              </el-tabs>
              <!--明细表的tab 显示区域--end-->

              <!----明细表的table表格区域----start--->
              <!-- detailTables: {{detailTables}} -->
              <template v-for="item in detailTables">
                <el-form :model="item" :ref="`detailForm${item.DetailTableCode}`" label-width="0"
                         class="detail-form" v-show="currentDetailTableCode === item.DetailTableCode">
                  <div style="width: 100%">
                    <el-scrollbar style="width: 100%" :native="false" :noresize="false">
                      <div class="content-title">
                        <table width="100%">

                          <!---明细表表头---start--->
                          <tr>
                            <th>
                              <div>选择</div>
                            </th>
                            <th v-for="(field, index) in item.Fields" :key="index + field.FieldName">
                              <div>{{field.FieldName}}</div>
                            </th>
                          </tr>
                          <!---明细表表头---end--->

                          <!-----明细表表内容----start---->
                          <tbody>
                            <tr v-for="(value, index) in item.Values" :key="index">
                              <td style="min-width: 50px;text-align: center">
                                <div>
                                  <!-- functionRole.DetailTableCanDelete: {{functionRole.DetailTableCanDelete}} -->
                                  <el-button type="text" @click="handleDelDetail(index)" :disabled="!functionRole.DetailTableCanDelete">删除</el-button>
                                </div>
                              </td>
                              <td v-for="(field, i) in value" :key="i">
                                  <!-- field: {{field}} -->
                                <div>
                                  <component
                                    :is="currentRuleComponent(field.ControlType === '13' ? '6' : field.ControlType)"
                                    :prop="'Fields.' + i + '.FieldValue'"
                                    :orderProp="'Fields.' + i + '.FieldValue.parentIds'"
                                    :obj.sync="field"
                                    :currentFields="currentMainTableObj.Fields"
                                    :workId="flowObj.WorkId"
                                    :nodeId="flowObj.FK_Node"
                                    :isTitle="false"
                                    :attachmentRole="functionRole"
                                    @changeEmp="changeTeamOrgDetailCmp(`detailForm${item.DetailTableCode}`, $event)"
                                  ></component>
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
              </template>

              <template v-if="functionRole.DetailTableCanAdd">
                <el-tooltip   effect="dark" content="增加一行" placement="top-start">
                  <el-button
                    v-if="currentDetailTableObj.Fields"
                    type="primary"
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleClickAddDetail"
                    style="margin-top: 10px">
                  </el-button>
                </el-tooltip>
              </template>
              <!----明细表的table表格区域----end--->
            </div>


            <!---明细表区域------end--->
          </el-scrollbar>
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
            @click="showUploadDetail = true"
            style="margin-top: 10px">上传当前明细表
          </el-button>
        </el-tooltip>

        <el-tooltip   effect="dark" :content="'下载：'+ currentDetailTableObj.Name + '明细表'" placement="top-start">
          <el-button
            v-if="functionRole.DetailTableCanDownload"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="showExportSelectDetailTable = true"
            style="margin-top: 10px">下载当前明细表
          </el-button>    
        </el-tooltip>     
      </template>
      <!--上传明细表、 下载明细表--end-->       

      <!--上传附件部分---start-->
      <!-- currentMainTableObj: {{currentMainTableObj}} -->
      <!-- flowObj.FK_Node: {{flowObj.FK_Node}} -->
      <!-- currentDetailTableObj： {{currentDetailTableObj}} -->
      <div v-if="showUploadDetail">
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
              @uploadDetailSuccess="uploadDetailSuccess">
            </upload-file>
          </div>
        </el-dialog>
      </div>
      <!--上传附件部分---end-->

      <!----导出主表word  dialog-----start-->
      <template v-if="showExportSelectMainTable && functionRole.MainTableCanDownload && _detailTableIsEmpty(currentMainTableObj)">
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
      </template>
      <!----导出主表word  dialog-----end-->

      <!----下载 明细表dialog-----start-->
      <template v-if="showExportSelectDetailTable && functionRole.DetailTableCanDownload">
        <el-dialog 
          :title= "`选择【${currentDetailTableObj.Name}】明细表`"
          :visible="showExportSelectDetailTable"
          width="600px"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :show-close="false"
          append-to-body>

          <!-- <el-checkbox :indeterminate="isIndeterminate_detailTable" v-model="exportAllDetailTable" @change="handleCheckAllDetailTableChange">全选</el-checkbox> -->
          <div style="margin: 15px 0;"></div>
          <!-- detailTables: {{detailTables}} -->
          <!-- selectedDetailTableCode： {{selectedDetailTableCode}} -->
          <el-checkbox-group v-model="selectedDetailTableCode" @change="handleCheckedDetailTableChange" v-loading="!detailTables.length">
            <!-- <el-checkbox v-for="(item,index) in detailTables" :key="item.DetailTableCode + index" :label="item.DetailTableCode">{{item.Name}}</el-checkbox> -->
            <el-checkbox  :label="currentDetailTableObj.Name">{{currentDetailTableObj.Name}}</el-checkbox>
          </el-checkbox-group>   

          <save-footer
            :isCancel="true"
            saveText="导出"
            @cancel="showExportSelectDetailTable = false"
            @save="handleSaveDownloadDetail">
          </save-footer>          
        </el-dialog>
      </template>
      <!----下载 明细表dialog----end-->      

      <!-- flowObj: {{flowObj}} -->
      <!-- currentMainTableObj.TableCode: {{currentMainTableObj.TableCode}} -->
      <!---底部保存、关闭、存草稿区域----start--->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isStart = false">关闭</el-button>
        <el-tooltip class="item" effect="dark" content="暂存为草稿" placement="top">
          <el-button @click="handleSaveStart(`${currentMainTableObj.TableCode}launchForm`, 'save')" type="info">存草稿</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="提交并且发起" placement="top">
          <el-button @click="handleSaveStart(`${currentMainTableObj.TableCode}launchForm`, 'send')" type="primary" :disabled="sendBtnDisabled">提交</el-button>
        </el-tooltip>
      </div>
      <!---底部保存、关闭、存草稿区域----end--->

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
  import {
    startList,
    start,
    saveMainValue,
    saveDetailValue,
    saveWork,
    saveFlowCustomSet,
    send,
    getForm,
    exportDetail,
    saveWorkSet
  } from '@/api/approve'
  import { getDicByKey, getRoleRange} from '@/api/permission'

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
        flowObj: {},
        currentMainTableObj: {},   // 当前的主表对象
        currentMainTableCode: '',   // 当前的主表tableCode
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
        selectedMainTableCode: [],  // 已经选择的多个主表的code集合
        showExportSelectMainTable: false, // 控制下载的主表的 dialog 的显示/隐藏
        isIndeterminate_mainTable: false,    //
        exportAllMainTable: true,  // 全选 导出的主表 的标识

        selectedDetailTableCode: [],  // 下载明细表时，已经选择的多个明细表的Name集合
        showExportSelectDetailTable: false, // 控制下载的明细表的 dialog 的显示/隐藏
        // isIndeterminate_detailTable: false,    //
        // exportAllDetailTable: true,  // 全选 导出的主表 的标识
        currentDetailTableObjChecked: true,  // 默认选中当前要下载的明细表
        sendBtnDisabled: false,   // 控制 提交 按钮的 disabled属性
        currentEditSecurityClassObj: {},  // 正在编辑的保密级别的对象
        securityClassLevelSource: [], // 保密级别的 数据源集合
        showSecurityTitleStatus: false,  // 控制保密级别dialog弹框的显示/隐藏
        securityTitleStatus: "", // 保密级别的状态
        currentStartObj: {},   // 点击的 发起的 流程对象
        workId_sendAgain: '', // 从再次提交页面进入的此页面
        no_sendAgain: ''  // 从再次提交进入的此页面
      }
    },
    components: {
      UploadFile,
      SaveFooter
    },
    created () {
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
        console.log(obj)
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
      _getDicByKey () {
        getDicByKey('WorkFlow', 'WorkFlow', 'CUS', 'SecurityLevel').then(res => {
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
      // 修改保密级别
      editSecurityClassLevel (obj) {
        // 调取 紧急程度下拉list 数据
        debugger
        this.securityTitleStatus = ''
        this.currentEditSecurityClassObj = obj
        this.showSecurityTitleStatus = true
        this._getDicByKey()
      },  
      // 修改保密级别的 保存 按钮
      _clickEditSureBtn() {
        debugger
        if (!this.securityTitleStatus){
          this.$message({
            type: 'warning',
            message: '未做任何设置,请设置后保存'
          })
          return 
        }
        console.log(this.currentEditSecurityClassObj)
        debugger
        saveFlowCustomSet(this.currentEditSecurityClassObj.No, this.workId, this.securityTitleStatus).then(res => {
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
      },                 
      // 保密级别 的样式
      _securityClass(state) {
        switch(state){
          case 0:
            return ""
            break
          case  1:
            return "primary"
            break
          case  2:
            return "warning"
            break
          case 3:
            return "danger"
            break
        } 
      },
      // 保密级别 文字
      _securityLevel(state) {
        switch(state){
          case 0:
            return "正常"
            break
          case  1:
            return "秘密"
            break
          case  2:
            return "机密"
            break
          case 3:
            return "绝密"
            break
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
        // 定义一个方法用于找到 对应的上一个 表单对象
        const getLatestMainTable = (mainTableCode) => {
          return this.mainTables.filter(item => {
            return item.TableCode === mainTableCode
          })
        }
  
        let latestMainTableObj = getLatestMainTable(formName_latestMainTableName.slice(0, -10))
        // 先进行 主表的校验
        this.$refs[formName_latestMainTableName].validate((valid) => {
          debugger
          if (valid) {
            // 假如主表单校验pass 了 接下来 校验 此表单下面的 自定义主表 和 明细表的校验
            let result = []
            if (latestMainTableObj.DetailTableInfos && latestMainTableObj.DetailTableInfos.length) {
              latestMainTableObj.DetailTableInfos.forEach(item => {
                result.push(this.checkFormArray_latestMainTable(`detailForm${item.DetailTableCode}`, latestMainTableObj))
              })
            }
            if (latestMainTableObj.Teams && latestMainTableObj.Teams.length) {
              latestMainTableObj.Teams.forEach(item => {
                result.push(this.checkFormArray_latestMainTable(`team${item.TeamCode}`, latestMainTableObj))
              })
            }
            Promise.all(result).then(() => {
              // 将 上一次点击的 主表的 validateFlag 中的 validateFlag 属性 修改为 false
              // 通过 formName 去 this.mainTables 中查找
              this.mainTables.forEach(item => {
                if (item.TableCode === formName_latestMainTableName.slice(0, -10)) {
                  // 找到了
                  item.validateFlag = true
                }
              })
            })
          } else {
            // 将 上一次点击的 主表的 validateFlag 中的 validateFlag 属性 修改为 false
            // 通过 formName 去 this.mainTables 中查找
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
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&UserId=${this.userCode}&CompanyCode=${this.companyCode}&workId=${this.workId}&detailTableCode=${this.currentDetailTableCode}&mainTableCode=${this.currentMainTableCode}&onlyTemplate=true`
        window.open(url)
      },
      // 获取 getform
      _getFormInfo(){
        this.loading = true   
        getForm(this.no, this.workId, this.no + '001', this.versionId, this.pageType).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
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

            // 将所有的明细表存储在一个复制的数组对象中 便于后续提交时 进行 是否 新增行的的校验
            let allDetailTablesArr = this.mainTables.map((item,key)=>{
              return item.DetailTableInfos
            })
            // allDetailTablesArr 是一个二位数组,需要处理成一维数据
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

            let allDetailTablesArr_res = allDetailTablesArr.map((item,key) => {
              return item
            })
            if (this.mainTables.length) {
              this.currentMainTableObj = res.data.Data.MainTableInfos[0]
              this.currentMainTableCode = res.data.Data.MainTableInfos[0].TableCode
              this.detailTables = res.data.Data.MainTableInfos[0].DetailTableInfos
              if (this.detailTables.length) {
                this.currentDetailTableObj = res.data.Data.MainTableInfos[0].DetailTableInfos[0]
                debugger
                this.selectedDetailTableCode.push(this.currentDetailTableObj.Name)
                console.log("fdf",this.currentDetailTableObj.Name)
                console.log("5gfdsgdfgsdfg", this.selectedDetailTableCode)
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
        this.currentStartObj = item
        let no = item.No
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

      // 上传明细表成功后
      uploadDetailSuccess () {
        // 关闭上传明细表的弹框
        this.showUploadDetail = false
        // 重新获取 数据信息
        this.handleStart()
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
  
        this.currentMainTableObj = this.mainTables.find(item => {
          return item.TableCode === tab.name
        })
        // debugger
        // 切换主表tab 时 主动触发 此表进行 表单验证
        // this._checkFieldValidate(this.currentMainTableObj.TableCode)
        
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
        this.currentDetailTableObj = this.detailTables.find(item => {
          return item.DetailTableCode === tab.name
        })
        this.currentDetailTableCode = this.currentDetailTableObj.DetailTableCode
        this.selectedDetailTableCode.splice(0,1,this.currentDetailTableObj.Name)

      },
      // 点击增加明细表行数据
      handleClickAddDetail () {
        this.currentDetailTableObj.Values.push(JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields])))
      },
      // 删除明细表单行
      handleDelDetail (index) {
        this.$confirm('确认删除此行配置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.currentDetailTableObj.Values.splice(index, 1)
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
                  message: `主表：${item.MainTableCode}下的明细表：【${item.Name} 新增行 校验失败 】`
                })
                resolve(true)
                break
              }else {
                if(item.DetailTableCode === this.allDetailTables_copy[i].DetailTableCode && item.Values.length <= this.allDetailTables_copy[i].Values.length) {
                  // 新增行 验证失败
                  this.$message({
                    type: "warning",
                    message: `主表：${item.MainTableCode}下的明细表：【${item.Name} 新增行 校验失败 】`
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
      // 发起保存提交
      async handleSaveStart (formName, type) {

        // console.log(this.$refs.formName.validateField(formName)
        // this.$refs[formName].validateField(formName)
        // console.log(this.functionRole.DetailTableHaveToAdd, this.currentMainTableObj.DetailTableInfos, !this.currentMainTableObj.DetailTableInfos)
        debugger
        console.log("------------->", formName)
        console.log("------------->",this.functionRole)

        // 判断明细表非空的校验  即校验每个明细表都至少有一行才算作是 非空了
        if(this.functionRole.DetailTableNotEmpty) {
          // let notEmptyFlag = false
          debugger
          // 校验非空
          let res_notEmpty = await this._checkTableNotEmpty()
          debugger
          if(res_notEmpty){
            // 非空校验失败
            return
          }
        }


        // 明细表需要新增行校验  即 校验 表的行数对比起初时候 有增加 就算作是  新增行校验了
        if( this.functionRole.DetailTableHaveToAdd ) {
          // let tableHaveToAddFlag = false
          // 新增行校验
          let res_tableAddline = await this._checkTableAddline()
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
              // 校验成功　一次就 将 this.currentMainTableObj 中的 validateFlag 字段修改为　　true
              this.currentMainTableObj['validateFlag'] = true

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

              // 保存主表，回调明细表
              // this.loading = true
              if (type === 'save') {
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
                    messageStr = `第${i + 1}个表单：${item.TableName} 未填写完整,请先填写完整后保存!!`
                    console.log(`第${i + 1}个表单：${item.TableName} 验证fail, error submit!!`)
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
                        message: '已取消提交'
                      })         
                    })
                  }else {
                    let that = this
                    // 流程提交不需要确认
                    send(that)
                  }

                  function send (obj) {
                    let self = obj
                    console.log(self)
                    debugger
                    Promise.all([
                      self._saveMainValue(JSON.stringify(mainArr)),
                      self._saveDetailValue(JSON.stringify(detailArr)),
                      self._send()
                    ]).then(([mainResp, detailResp, workResp]) => {
                      console.log(mainResp, detailResp, workResp)
                      self.loading = false
                      obj.sendBtnDisabled = false
                      if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK && workResp.data.State === REQ_OK) {
                        self.$message.success('提交成功')
                        self.isStart = false
                      } else {
                        if (mainResp.data.State === REQ_ERR) {
                          return self.$message.error(`提交失败,${mainResp.data.Error}`)
                        }
                        if (detailResp.data.State === REQ_ERR) {
                          return self.$message.error(`提交失败,${detailResp.data.Error}`)
                        }
                        if (workResp.data.State === REQ_ERR) {
                          self.$message.error(`提交失败,${workResp.data.Error}`)
                        }
                      }
                    }).catch(() => {
                      self.loading = false
                      obj.sendBtnDisabled = false
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
    .launch_dialog
      .main-table-field-container
        .table-item
          .fieldItem
            margin-bottom 10px
      .detail-table-field-container /deep/
        .el-scrollbar__wrap
          margin-bottom: 0 !important
          .el-form-item
            margin-bottom: 0 !important
    >>>.el-dialog__footer   
        padding 0 !important    


  table {
    border: 1px solid #dfe4ed;
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
