<!--
  User: xxxxxxx
  Date: 2019/5/2
  功能：表单管理—— 表单“编辑”dailog弹框中的 “表单配置”
-->

<template>
  <div class="table-design-container">

    <el-scrollbar style="height: 100%" :native="false">
      <!--表单模板，新增分组，分组排序 按钮区域-->
      <div class="btn-container">
        <!-- <el-button size="small" type="primary" @click="handleClickTableTemplate">表单模版</el-button> -->
        <!-- <el-button size="small" @click="dialogAddTeam = true">新增分组</el-button> -->
        <el-button size="small" type="primary" @click="dialogTeamSet()">设置分组</el-button>
        <!-- <el-button size="small" :disabled="tableObj.Teams.length < 2" @click="dialogTeamSort = true">分组排序</el-button> -->
      </div>

      <div class="content-container">
        <!--设置的左边区域--->
        <div class="left-container">
          <el-card>
            <!-- <div class="title">
              <el-button type="text" v-model="currentCtrl" @click="currentCtrl = '1'">表单</el-button>
              <span>/</span>
              <el-button type="text" v-model="currentCtrl" @click="currentCtrl = '2'">系统</el-button>
            </div> -->

            <!-- <el-radio-group v-model="activeName" style="margin-bottom: 30px;">
              <el-radio-button label="1">表单</el-radio-button>
              <el-radio-button label="2">系统</el-radio-button>
            </el-radio-group> -->

            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="表单" name="1">           
              </el-tab-pane>
              <el-tab-pane label="系统" name="2">
                activeName的值{{activeName}}  系统套件     
              </el-tab-pane>
            </el-tabs> 

            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="用户管理" name="first">用户管理activeName的值{{activeName}} </el-tab-pane>
              <el-tab-pane label="配置管理" name="second">配置管理activeName的值{{activeName}} </el-tab-pane>
            </el-tabs>             -->

            <div>
              <el-scrollbar style="height: 100%" :native="false">
                <!--表单-->
                <!-- controlType: {{controlType}} -->
                <template 
                  v-for="(item,key) in controlType" 
                  v-if="activeName==='1'">
                  <!-- <el-tooltip :content="item.Name" placement="top" effect="light"> -->
                    <div 
                      @dragstart="dragStart($event, item)" 
                      @dragend="dragEnd($event)" 
                      draggable="true"
                      style="margin-bottom: 10px" 
                      class="controlItemBox">
                      <el-tag style="width: 100%;text-align: center"  class="controlItem_text">{{item.Name}}</el-tag>
                    </div>
                  <!-- </el-tooltip> -->
                </template>

                <!--系统-->   
                <!-- <template v-for="" v-if="activeName=='second'">
                  <el-tooltip :content="item.Name" placement="top" effect="light">
                    <div @dragstart="dragStart($event, item)" @dragend="dragEnd($event)" draggable="true"
                        style="margin-bottom: 10px" class="controlItemBox">
                      <el-tag style="width: 100%;text-align: center"  class="controlItem_text">系统{{item.Name}}</el-tag>
                    </div>
                  </el-tooltip>
                </template> -->

              </el-scrollbar>
            </div>  

          </el-card>
        </div>

        <!--设置的中间区域--->
        <div class="mid-container">
          <el-card>
            <div class="mid-content">
              <el-scrollbar style="height: 100%" :native="false">
                <!--遍历输出 默认的表单控件-->
                <!-- tableObj.Fields： {{tableObj.Fields}} -->
                <div class="default-field-container">
                  <div class="group-item">
                    <span class="title">默认表单控件</span>
                  </div>
                  <template v-for="(item, index) in tableObj.Fields">
                    <div
                      class="field-item"
                      :draggable="isDrag"
                      @drop="drop(isDrag)($event, item)"
                      @dragover="dragOver($event)"
                      @dragenter="dragEnter(isDrag)($event)">
                      <!--下面为一个覆盖组件的一个div 通过 z-index 值来控制 层级，以免 移动组件时，移动到 编辑或者删除小按钮时造成异常-->
                      <div class="shade" style="position: absolute; top: 0; left: 0; z-index: 100;width: 100%;height: 100%"></div>
                        <!-- item.ControlType: {{item.ControlType}} -->
                        <!-- ----------------------- -->
                        <!-- {{currentTabComponent(item.ControlType)}} -->
                        <!--用的是动态组件渲染，通过 mixins中的 currentTabComponent() 方法来匹配需要的基础表单控件-->
                        <component
                          :is="currentTabComponent(item.ControlType)"
                          :showTitle="true"
                          :title="item.FieldName"
                          :obj="item"
                        ></component>   
                           
                        <span class="edit-icon">
                          <el-tooltip class="item" effect="dark" content="编辑此控件" placement="bottom">
                            <i class="el-icon-edit" @click="handleEditCmp($event, item)"
                              v-if="item.ControlType !== '0'"></i>
                          </el-tooltip>
                        </span>
                        <span class="del-icon">
                          <el-tooltip class="item" effect="dark" content="删除此控件" placement="bottom">
                            <i class="el-icon-delete" @click="handleDelTableFieldCmp(item, index)"></i>
                          </el-tooltip>
                        </span>                       


                      <!--gaol tianjia--start--因为涉及到 有多个基础组件组成一个套件的情况，故需要 循环遍历来匹配多个组件的情况-->
                      
                      <!-- <div v-for="(item, index) in item" class="controlTypeList_item">  -->
                        <!--用的是动态组件渲染，通过 mixins中的 currentTabComponent() 方法来匹配需要的基础表单控件-->
                        <!-- <component
                          :is="currentTabComponent(item.ControlType)"
                          :showTitle="true"
                          :title="item.FieldName"
                          :obj="item"
                        ></component>      
                        <span class="edit-icon">
                          <el-tooltip class="item" effect="dark" content="编辑此控件" placement="bottom">
                            <i class="el-icon-edit" @click="handleEditCmp($event, item)"
                              v-if="item.ControlType !== '0'"></i>
                          </el-tooltip>
                        </span>
                        <span class="del-icon">
                          <el-tooltip class="item" effect="dark" content="删除此控件" placement="bottom">
                            <i class="el-icon-delete" @click="handleDelTableFieldCmp(item, index)"></i>
                          </el-tooltip>
                        </span>                                          
                      </div> -->
                      <!--gaol tianjia--end-->


                      <!--gaolAdd--start-->
                      <!-- <span class="addRow-icon">
                        <el-tooltip class="item" effect="dark" content="新增一行" placement="bottom">
                          <i class="el-icon-circle-plus-outline" @click="handleAddCmp($event, item, index)"
                             v-if="item.ControlType !== '0'"></i>
                        </el-tooltip>
                      </span> -->
                      <!--gaolAdd--end-->


                      <span class="edit-icon">
                        <el-tooltip class="item" effect="dark" content="编辑此控件" placement="bottom">
                          <i class="el-icon-edit" @click="handleEditCmp($event, item)"
                             v-if="item.ControlType !== '0'"></i>
                        </el-tooltip>
                      </span>
                      <span class="del-icon">
                        <el-tooltip class="item" effect="dark" content="删除此控件" placement="bottom">
                          <i class="el-icon-delete" @click="handleDelTableFieldCmp(item, index)"></i>
                        </el-tooltip>
                      </span>
                    </div>
                  </template>

                  <div class="add-item">
                    <el-tooltip class="item" effect="dark" content="新增空控件" placement="bottom">
                      <i class="el-icon-circle-plus-outline" @click="handleAddField"></i>
                    </el-tooltip>
                  </div>
                </div>

                <!--渲染 非默认表单控件（分组控件）---start-->
                <div class="team-item" v-for="group in tableObj.Teams" :key="group.TeamCode">
                  <div class="group-item">
                    <span class="title">{{group.TeamName}}</span>
                    <span class="del-icon">
                      <el-tooltip class="item" effect="dark" content="删除此分组" placement="bottom">
                        <i class="el-icon-delete" @click="handleDelTeam(group.TeamCode)"></i>
                      </el-tooltip>
                    </span>
                  </div>
                  <!--如果 tableObj.Teams 数组有length，则分别遍历各个分组中含有的表单控件---start-->
                  <template v-for="(item, fieldIndex) in group.Fields">
                    <div
                      class="field-item"
                      draggable="false"
                      @drop="drop(isDrag)($event, item)"
                      @dragover="dragOver($event)"
                      @dragenter="dragEnter(isDrag)($event)">
                      <div style="position: absolute; top: 0; left: 0; z-index: 100;width: 350px;height: 100%"></div>

                      <!-- {{currentTabComponent(item.ControlType)}} -->
                      <!--用的是动态组件渲染，通过 mixins中的 currentTabComponent() 方法来匹配需要的基础表单控件-->
                      <component
                        :is="currentTabComponent(item.ControlType)"
                        :showTitle="true"
                        :title="item.FieldName"
                        :obj="item"
                      ></component>
                      <span class="edit-icon">
                        <el-tooltip class="item" effect="dark" content="编辑此控件" placement="bottom">
                          <i class="el-icon-edit" @click="handleEditCmp($event, item)"
                             v-if="item.ControlType !== '0'"></i>
                        </el-tooltip>
                      </span>
                      <span class="del-icon">
                        <el-tooltip class="item" effect="dark" content="删除此控件" placement="bottom">
                          <i class="el-icon-delete" @click="handleDelTeamFieldCmp(item, group, fieldIndex)"></i>
                        </el-tooltip>
                      </span>
                    </div>
                  </template>
                  <!---如果 tableObj.Teams 数组有length，则分别遍历各个分组中含有的表单控件----end--->
                  <div class="add-item">
                    <el-tooltip class="item" effect="dark" content="新增空控件" placement="bottom">
                      <i class="el-icon-circle-plus-outline" @click="handleAddTeamField(group.Fields)"></i>
                    </el-tooltip>
                  </div>
                </div>
                <!--渲染 非默认表单控件（分组控件）---end-->
              </el-scrollbar>
            </div>
          </el-card>
        </div>

        <!--设置的右边区域--->
        <div class="right-container">
          <!-- {{currentSetComponent(currentField.ControlType)}} -->
          <el-card>
            <div class="title">字段设置</div>
            <div class="right-content">
              <el-scrollbar style="height: 100%" :native="false">
                <!-- currentField.ControlType：{{currentField.ControlType}} -->
                <component
                  :is="currentSetComponent(currentField.ControlType)"
                  :tableObj="tableObj"
                  :setObj.sync="currentField"  
                  :textTypeList="textTypeList"
                  :moduleList="moduleList"
                  :timeBreakList="timeBreakList"
                  :dataFormatList="dataFormatList"
                  :currencyList="currencyList"
                ></component>
              </el-scrollbar>
            </div>
          </el-card>
        </div>

      </div>

      <!--引用 saveFooter 组件,这是 表单配置，左边、中间、右边页整体页面下的一个 保存按钮--start-->
      <save-footer
        :isCancel="true"
        cancelText="关闭"
        @cancel="handleClose"
        @save="handleTableConfigSave">
        class="footer"
      </save-footer>
      <!--引用 saveFooter 组件,这是 表单配置，左边、中间、右边页整体页面下的一个 保存按钮--end--->

    </el-scrollbar>

    <!--设置分组dialog-->
    <!-- <el-dialog
      title="设置分组"
      :visible.sync="dialogAddTeam"
      width="500px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :show-close="false"
      v-loading="loadingAddTeam"
    >
      <el-input v-model="newTeamName" placeholder="请输入新分组名称"></el-input>
      <span slot="footer" class=" editAndDelet">
        <el-button @click="dialogAddTeam = false">取 消</el-button>
        <el-button type="primary" @click="handleClickAddTeam">确 定</el-button>
      </span>
    </el-dialog> -->


    <!--新增分组dialog-olde-->
    <el-dialog
      title="新增分组"
      :visible.sync="dialogAddTeam"
      width="500px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :show-close="false"
      v-loading="loadingAddTeam"
    >
      <el-input v-model="newTeamName" placeholder="请输入新分组名称"></el-input>
      <span slot="footer" class=" editAndDelet">
        <el-button @click="dialogAddTeam = false">取 消</el-button>
        <el-button type="primary" @click="handleClickAddTeam">确 定</el-button>
      </span>
    </el-dialog>

    <!--分组排序--->
    <!-- <el-dialog
      title="分组排序"
      :visible.sync="dialogTeamSort"
      width="500px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :show-close="false"
      v-loading="loadingTeamSort"
    >
      <el-card
        v-for="team in tableObj.Teams"
        :key="team.TeamCode"
        v-dragging="{ item: team, list: tableObj.Teams, group: 'Teams' }"
        class="sort-cart-item"
      >
        {{team.TeamName}}
      </el-card>
      <span class=" editAndDelet" style="display: block; padding: 10px 0; text-align: center">
        <el-button @click="dialogTeamSort = false">取 消</el-button>
        <el-button type="primary" @click="handleClickSort">确 定</el-button>
      </span>
    </el-dialog> -->

    <!--设置分组dialog  gaoladd--start-->
    <div class="sortBox">
      <el-dialog
        title="设置分组"
        :visible.sync="dialogTeamSort"
        width="500px"
        :append-to-body="true"
        :close-on-click-modal="false"
        :show-close="false"
        v-loading="loadingTeamSort"
      >
        <div class="showTit">提示：删除分组将删除该分组下的所有子分组和字段信息</div>
        <div class="TipBox">
          <span class="sortTipTit">拖拽排序</span>
          <div class="addNewTeam">
            <span class="addTit" @click="addNewTeamInput = true">新增</span>
            <!-- <i class="el-icon-circle-plus-outline"></i> -->
          </div>
        </div>

        <!--设置分组dailog弹框中 新增分组名称的input框 - start-->
        <div class="newTeamInputBox" v-show="addNewTeamInput">
          <el-input v-model="newTeamName" placeholder="请输入新分组名称"></el-input>
          <div class="cancelAndSaveBox">
            <span class="cacelTit" @click="addNewTeamInput = false">取消</span>
            <span class="saveTit" @click="addNewTeam(tableObj.Teams.length)">保存</span>
          </div>
        </div>     
        <!--设置分组dailog弹框中 新增分组名称的input框 - end-->

        <!--设置分组中的 拖拽部分- start-->
        <vuedraggable class="wrapper" v-model="tableObj.Teams"  @update="datadragEnd" :options = "{animation:500}">
            <transition-group>
              <div  v-for="(team,index) in tableObj.Teams" :key="index+1" class="inputItemBox">

                <!-- <el-tag type="success" v-show="index != editTeamNameIndex">{{team.TeamName}}—— {{team.Fields.length}}</el-tag> -->
                    <el-menu
                      default-active="2"
                      class="el-menu-vertical-demo"
                    >
                      <!-- <el-submenu index="1"> -->
                        <!-- <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>{{team.TeamName}}({{team.Fields.length}})</span>
                        </template> -->
                        <el-menu-item index="2" v-show="index != editTeamNameIndex">
                          <i class="el-icon-menu"></i>
                          <span slot="title">{{team.TeamName}}({{team.Fields.length}})</span>
                        </el-menu-item>

                          <!-- <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                          </el-menu-item-group>
                          <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                          </el-menu-item-group>
                          <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                          </el-submenu> -->

                        <!-- </el-submenu> -->
                    </el-menu>

                <el-input 
                  v-show=" editTeamNameIndex!=-1 && index == editTeamNameIndex"
                  class="sort-cart-item"
                  v-model="team.TeamName"
                >
                  <!-- <i class="el-icon-s-unfold"></i> -->
                </el-input>
                <div class="editAndDelet">
                  <span class="edit" v-show="(index != editTeamNameIndex)" @click="handleEditTeam(team.TeamCode, index)">编辑</span>
                  <span class="delet" v-show="(index != editTeamNameIndex)" @click="handleDelTeam(team.TeamCode)">删除</span>
                  <span class=" EditCancel" v-show="(index == editTeamNameIndex)" @click="editTeamNameIndex = -1">取消</span>
                  <span class=" EditSave" v-show="(index == editTeamNameIndex)" @click="handleSaveTeamName">保存</span>
                </div>
              </div>
            </transition-group>              
        </vuedraggable>
        <!--设置分组中的 拖拽部分- end-->


        <div class="dialog-footer" style="display: block; padding: 10px 0; text-align: center">
          <el-button @click="dialogTeamSort = false">取 消</el-button>
          <el-button type="primary" @click="handleClickSort">确 定</el-button>
        </div>

      </el-dialog>  
    </div>
    <!--分组排序 gaoladd--end--->

    <!--gaolAdd引用的 表单模板 的 组件---此部分的功能暂时已经取消隐藏，故先注释掉--start-->
    <!-- <table-template
      v-if="dialogTableTemplate"
      @tableTemplateCancel="dialogTableTemplate = false"
      @tableTemplateSure="tableTemplateSure">
    </table-template> -->
    <!--gaolAdd引用的 表单模板 的 组件---此部分的功能暂时已经取消隐藏，故先注释掉--end-->

  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getComTeamsAndFields, 
          SaveComTeamsAndFields, 
          deleteComTeam,
          deleteComField } from '@/api/approve'
  import { getNewId } from '@/api/common-dic'
  import { getDicByKey } from '@/api/permission'
  import { flowBaseFn, workFlowControlTypeMixin, workFlowSetControlMixin } from '@/utils/mixin'
  import BaseInfoRouter from '@/components/platform/approval-flow/flow-config-router/flow-config-router'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import TableTemplate from './table-template'
  import { mapGetters } from 'vuex'
  import Vuedraggable from 'vuedraggable'

  const APP_CODE = 'SYS' // 业务领域
  const MODULE_CODE = 'SYS' // 模块类型
  const MODULE_CODE_PA = 'PA' // 模块类型-PA
  const DIC_TYPE = 'SYS' // 字典类型
  const DIC_TYPE_PA = 'PA' // 字典类型 -PA
  const DIC_CODE_CONTENT = 'ContentType' // ContentType--文本
  const DIC_CODE_MODULE = 'Module' // 字典编号 Module--模块
  const DIC_CODE_TIME_BREAK = 'TimeBreak' // TimeBreak--时间刻度
  const DIC_CODE_DATE_FORMAT = 'DateFormat'  // DateFormat--时间日期格式
  const DIC_CODE_CURRENCY = 'Currency' // Currency--币种

  export default {
    mixins: [flowBaseFn, workFlowControlTypeMixin, workFlowSetControlMixin],
    data () {
      return {
        activeName: '1', // 控件类型 1--表单，2--系统套件
        isDrag: false, // 是否可以拖动的元素
        tableObj: {   // 当前编辑的组件对象
          Fields: [],
          Teams: []
        },
        defaultField: {
          Id: 0,
          FieldCode: '', // 字段code
          FieldName: '', // 字段名
          BusinessTypeCode: '', // 业务类型
          IndustryCode: '', // 行业类型
          DataType: '', // 数据类型
          TextType: '0', // 文本类型
          ControlType: '0', // 控件类型
          DataSource: '', // 数据源
          DSType: 'SYS', // 字典表类型
          Depend: '', // 关联上级
          Ext: {
            DefaultOpt: [],
            LimitOpt: [],
            Opt: []
          }, // 数据源
          Tips: '', // 提醒
          Note: '', // 说明
          Required: false, // 是否必填
          MaxLength: 0, // 长度限制
          ModuleCode: '',
          DefaultValue: '', // 默认值
          TimeBreak: '00:10', // 时间刻度
          Format: 'date', // 日期格式
          Min: '', // 最小值
          Max: '', // 最大值
          ValidRule: '', // 验证逻辑
          CalculateRule: '', // 运算逻辑
          Unique: 0, // 是否唯一
          Display: 1, // 默认值选项， 1：默认 2、表单关联 3、计算公式
          Hidden: false, // 是否默认隐藏
          Lock: false, // 是否锁定列
          Attribute: {
            AutoCapital: false, // 是否显示大写
            Digit: 0, // 小数位
            ThousandBit: false // 是否千分位
          }, // 属性设置
          SortId: 0, // 序号
          Unit: '1', // 单位
          AutoCalcu: false
        },
        controlType: [
          {
            Name: '单行输入框',
            ControlType: '1'
          },
          {
            Name: '多行输入框',
            ControlType: '2'
          },
          {
            Name: '数字输入框',
            ControlType: '3'
          },
          {
            Name: '金额',
            ControlType: '4'
          },
          {
            Name: '单选下拉框',
            ControlType: '5'
          },
          {
            Name: '多选下拉框',
            ControlType: '6'
          },
          {
            Name: '时间（年月日）',
            ControlType: '7'
          },
          {
            Name: '时间区间',
            ControlType: '8'
          },
          {
            Name: '时分',
            ControlType: '9'
          },
          {
            Name: '月份选择',
            ControlType: '10'
          },
          {
            Name: '是否',
            ControlType: '11'
          },
          {
            Name: '单选框',
            ControlType: '12'
          },
          {
            Name: '复选框',
            ControlType: '13'
          },
          {
            Name: '图片',
            ControlType: '14'
          },
          {
            Name: '附件',
            ControlType: '15'
          },
          {
            Name: '计算公式',
            ControlType: '16'
          },
          {
            Name: '表单',
            ControlType: '17'
          },
          {
            Name: '列表',
            ControlType: '18'
          },
          {
            Name: '公司内联系人',
            ControlType: '19'
          },
          {
            Name: '公司组织',
            ControlType: '20'
          },
          {
            Name: '公司架构（组织与人）',
            ControlType: '21'
          },
          {
            Name: '地点',
            ControlType: '22'
          },
          {
            Name: '编辑器',
            ControlType: '23'
          },
          {
            Name: '说明',
            ControlType: '24'
          },
          {
            Name: '关联审批流',
            ControlType: '25'
          },
          {
            Name: '省市区',
            ControlType: '27'           
          }
        ],
        currentField: {},     // 表示当前正在编辑的 表单控件 
        textTypeList: [],
        moduleList: [],
        timeBreakList: [],
        dataFormatList: [],
        currencyList: [],
        loading: false,
        dialogAddTeam: false,
        loadingAddTeam: false,
        newTeamName: '',  // 新增的team 分组的名字
        dialogTeamSort: false,
        loadingTeamSort: false,
        dialogTableTemplate: false,
        editTeamNameIndex: -1,  // 分组排序dailog 中控制 编辑分组名称时，控制input框的 显示隐藏 索引
        addNewTeamInput: false  // 设置分组中 点击 新增 分组后 通过此标识来控制 input框的显示/隐藏
      }
    },
    computed: {
      ...mapGetters([
        'currentFieldStore',
        'currentFieldsStore'
      ])
    },
    created () {
      try {
        this.loading = true
        this.tableCode = this.$route.query.tableCode
        this._getAll()
      } catch (e) {
        this.loading = false
        this.$message({
          type: 'error',
          message: '获取失败，请刷新重试！'
        })
      }
    },
    mounted () {
      // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.$dragging.$on('dragged', ({value}) => {
        console.log('dragged', value)
      })
      this.$dragging.$on('dragend', (value) => {
        console.log('dragend', value)
      })
    },
    // 拖动结束后 的钩子函数
    updated () {
      debugger
      console.log(this.tableObj.Teams)
    },
    methods: {
      _getAll () {
        Promise.all([
          getDicByKey(APP_CODE, MODULE_CODE, DIC_TYPE, DIC_CODE_CONTENT),
          getDicByKey(APP_CODE, MODULE_CODE, DIC_TYPE, DIC_CODE_MODULE),
          getDicByKey(APP_CODE, MODULE_CODE, DIC_TYPE, DIC_CODE_TIME_BREAK),
          getDicByKey(APP_CODE, MODULE_CODE, DIC_TYPE, DIC_CODE_DATE_FORMAT),
          getDicByKey(APP_CODE, MODULE_CODE_PA, DIC_TYPE_PA, DIC_CODE_CURRENCY),
          getComTeamsAndFields(this.tableCode)]
        ).then(([textTypeRes, moduleTypeRes, timeBreakRes, dateFormatRes, currencyRes, tableConfigRes]) => {
          this.loading = false
          debugger
          if (textTypeRes.data.State === REQ_OK) {
            this.textTypeList = textTypeRes.data.Data
          }
          if (moduleTypeRes.data.State === REQ_OK) {
            this.moduleList = moduleTypeRes.data.Data
          }
          if (timeBreakRes.data.State === REQ_OK) {
            this.timeBreakList = timeBreakRes.data.Data
          }
          if (dateFormatRes.data.State === REQ_OK) {
            this.dataFormatList = dateFormatRes.data.Data
          }
          if (currencyRes.data.State === REQ_OK) {
            this.currencyList = currencyRes.data.Data
          }
          if (tableConfigRes.data.State === REQ_OK) {
            debugger
            // var gaolAdd = [
            //   [
            //     {
            //       Attribute: {AutoCapital: false, Digit: 0, ThousandBit: false},
            //       AutoCalcu: false,
            //       BusinessTypeCode: '7e7c9f0e-c415-d0bb-aee8-39e6e573b1f45',
            //       CalculateRule: '',
            //       ColNo: 0,
            //       CompanyCode: '052558594',
            //       ControlType: '3',
            //       ControlTypeName: '数字',
            //       CreateDate: '/Date(1556855488270)/',
            //       DSType: 'SYS',
            //       DataSource: '',
            //       DataType: '',
            //       DataTypeName: '文本',
            //       DefaultValue: '',
            //       Deleted: 0,
            //       Depend: '',
            //       Description: null,
            //       Display: false,
            //       DisplayValue: null,
            //       Event: 0,
            //       Ext: {},
            //       FieldCode: 'WFF0008002',
            //       FieldName: '数字输入框',
            //       FieldValue: null,
            //       Format: 'date',
            //       GroupCode: null,
            //       Hidden: false,
            //       Id: 391,
            //       IndustryCode: '',
            //       IsSystem: false,
            //       Layout: null,
            //       Lock: false,
            //       Max: '',
            //       MaxLength: 0,
            //       Min: '',
            //       ModuleCode: 'CA',
            //       Note: '',
            //       Required: false,
            //       Research: 0,
            //       Role: 0,
            //       RoleRange: '1,2,3,4',
            //       RowNo: 0,
            //       ShowCol: 0,
            //       SortId: 0,
            //       State: 1,
            //       SysCode: '',
            //       SysRequired: false,
            //       SysState: 1,
            //       TableCode: 'WFS0000508',
            //       TeamCode: '',
            //       TextType: '0',
            //       TextTypeName: '不限',
            //       TimeBreak: '00:10',
            //       Tips: '',
            //       Unique: 0,
            //       Unit: '',
            //       ValidRule: ''
            //     },
  
            //     {
            //       Attribute: {AutoCapital: false, Digit: 0, ThousandBit: false},
            //       AutoCalcu: false,
            //       BusinessTypeCode: '7e7c9f0e-c415-d0bb-aee8-39e6e573b1f435',
            //       CalculateRule: '',
            //       ColNo: 0,
            //       CompanyCode: '0525559784',
            //       ControlType: '3',
            //       ControlTypeName: '数字',
            //       CreateDate: '/Date(1556855488270)/',
            //       DSType: 'SYS',
            //       DataSource: '',
            //       DataType: '',
            //       DataTypeName: '文本',
            //       DefaultValue: '',
            //       Deleted: 0,
            //       Depend: '',
            //       Description: null,
            //       Display: false,
            //       DisplayValue: null,
            //       Event: 0,
            //       Ext: {},
            //       FieldCode: 'WFF0000302',
            //       FieldName: '数字输入框',
            //       FieldValue: null,
            //       Format: 'date',
            //       GroupCode: null,
            //       Hidden: false,
            //       Id: 3989,
            //       IndustryCode: '',
            //       IsSystem: false,
            //       Layout: null,
            //       Lock: false,
            //       Max: '',
            //       MaxLength: 0,
            //       Min: '',
            //       ModuleCode: 'CA',
            //       Note: '',
            //       Required: false,
            //       Research: 0,
            //       Role: 0,
            //       RoleRange: '1,2,3,4',
            //       RowNo: 0,
            //       ShowCol: 0,
            //       SortId: 0,
            //       State: 1,
            //       SysCode: '',
            //       SysRequired: false,
            //       SysState: 1,
            //       TableCode: 'WFS00033008',
            //       TeamCode: '',
            //       TextType: '0',
            //       TextTypeName: '不限',
            //       TimeBreak: '00:10',
            //       Tips: '',
            //       Unique: 0,
            //       Unit: '',
            //       ValidRule: ''
            //     }
            //   ],
            //   [
            //     {
            //       Attribute: {AutoCapital: false, Digit: 0, ThousandBit: false},
            //       AutoCalcu: false,
            //       BusinessTypeCode: '7e7c9f0e-c415-d0bb-aee8-39e6e573b1f7',
            //       CalculateRule: '',
            //       ColNo: 0,
            //       CompanyCode: '05255594',
            //       ControlType: '3',
            //       ControlTypeName: '数字',
            //       CreateDate: '/Date(1556855488270)/',
            //       DSType: 'SYS',
            //       DataSource: '',
            //       DataType: '',
            //       DataTypeName: '文本',
            //       DefaultValue: '',
            //       Deleted: 0,
            //       Depend: '',
            //       Description: null,
            //       Display: false,
            //       DisplayValue: null,
            //       Event: 0,
            //       Ext: {},
            //       FieldCode: 'WFF0000028',
            //       FieldName: '数字输入框',
            //       FieldValue: null,
            //       Format: 'date',
            //       GroupCode: null,
            //       Hidden: false,
            //       Id: 395,
            //       IndustryCode: '',
            //       IsSystem: false,
            //       Layout: null,
            //       Lock: false,
            //       Max: '',
            //       MaxLength: 0,
            //       Min: '',
            //       ModuleCode: 'CA',
            //       Note: '',
            //       Required: false,
            //       Research: 0,
            //       Role: 0,
            //       RoleRange: '1,2,3,4',
            //       RowNo: 0,
            //       ShowCol: 0,
            //       SortId: 0,
            //       State: 1,
            //       SysCode: '',
            //       SysRequired: false,
            //       SysState: 1,
            //       TableCode: 'WFS0000085',
            //       TeamCode: '',
            //       TextType: '0',
            //       TextTypeName: '不限',
            //       TimeBreak: '00:10',
            //       Tips: '',
            //       Unique: 0,
            //       Unit: '',
            //       ValidRule: ''
            //     }
            //   ]
            // ]
            debugger
            this.tableObj = tableConfigRes.data.Data
            // this.tableObj.Fields = gaolAdd
            console.log("------获取到的 tableObj-----------", this.tableObj.Fields)
            debugger
          } else {
            this.$message({
              type: 'error',
              message: '获取数据失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '获取数据失败，请刷新重试！'
          })
        })
      },
      // 获取表单配置
      _getComTeamsAndFields () {
        debugger
        this.loading = true
        getComTeamsAndFields(this.tableCode).then(res => {
          debugger
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.tableObj = res.data.Data
            this.currentField = {}
            debugger
            document.querySelectorAll('.field-item').forEach(item => {
              item.classList.remove('current-item')
            })
          } else {
            this.$message({
              type: 'error',
              message: '获取失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '获取失败，请刷新重试！'
          })
        })
      },
      // 判断数组中是否有相同项
      _getIsRepeat (dataArr) {
        if (dataArr && dataArr.length) {
          // 将 名称放入到 一个空数组中
          for (let i = 0, length = dataArr.length; i < length; i++) {
            if (dataArr.indexOf(dataArr[i]) === i) {
              // 没有重复项
            } else {
              // 有重复
              return dataArr[i]
            }
          }
        }
      },
      // 保存表单配置
      _SaveComTeamsAndFields () {
        this.loading = true
        // 先判断 默认分组和 自定义新增的分组中各自所包含的子组件名称不能相同，相同保存提交后后端未做验证会有问题
        debugger
        // this.tableObj.Fields[0].FieldName
        // this.tableObj.Teams[0].Fields[0].FieldName
        // 先判断 默认组里面是否有 重复的组件名称
        if (this.tableObj && this.tableObj.Fields && this.tableObj.Fields.length) {
          // 默认分组中有子组件
          let defaultTeamNameArr = []
          this.tableObj.Fields.forEach(item => {
            defaultTeamNameArr.push(item.FieldName)
          })
          // 开始调用_getIsRepeat
          let res_default = this._getIsRepeat(defaultTeamNameArr)

          if (res_default) {
            // 有重复
            this.$message({
              type: 'warning',
              message: '默认分组中:' + res_default + '项目重复,请检查后重新提交'
            })
            return
          }
        }

        // 再判断 自定义分组中每个组分别是否有相同的组件名称
        // 存放所有自定义分组 验证名称是否重复的验证结果集合
        let res_allCustomerTeams = []
        if (this.tableObj.Teams && this.tableObj.Teams.length) {
          this.tableObj.Teams.forEach(item => {
            let customerTeam_itemNameArr = []
            if (item.Fields && item.Fields.length) {
              item.Fields.forEach(_ => {
                customerTeam_itemNameArr.push(_.FieldName)
              })
            }
            // 调用_getIsRepeat
            let res_customer = this._getIsRepeat(customerTeam_itemNameArr)
            if (res_customer) {
              // 有重复 则提示
              this.$message({
                type: 'warning',
                message: item.TeamName + '分组中：' + res_customer + '项目重复,请检查后重新提交'
              })
              return false
            }
            // 验证没有重复时将结果放入到一个统一的数组中
            debugger
            res_allCustomerTeams.push(item.TeamName)
          })
        } else {
          // 没有自定义分组
          // 提交
          SaveComTeamsAndFields(JSON.stringify(this.tableObj)).then(res => {
            debugger
            this.loading = false
            this.editTeamNameIndex = -1
            if (res.data.State === REQ_OK) {
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
              // 重新获取表单的配置
              this._getComTeamsAndFields()
            } else {
              this.$message({
                type: 'error',
                message: res.data.Error
              })
            }
          }).catch(() => {
            this.loading = false
            this.$message({
              type: 'error',
              message: '保存失败，请刷新重试！'
            })
          })
        }

        // 判断 res_allCustomerTeams的长度是否等于 自定义分组的数组 this.tableObj.Teams的长度，相等则说明每个分组中都没有重复
        if (res_allCustomerTeams && res_allCustomerTeams.length) {
          debugger
          if (res_allCustomerTeams.length === this.tableObj.Teams.length) {
            // 提交
            SaveComTeamsAndFields(JSON.stringify(this.tableObj)).then(res => {
              debugger
              this.loading = false
              this.editTeamNameIndex = -1
              if (res.data.State === REQ_OK) {
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
                // 重新获取表单的配置
                this._getComTeamsAndFields()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.Error
                })
              }
            }).catch(() => {
              this.loading = false
              this.$message({
                type: 'error',
                message: '保存失败，请刷新重试！'
              })
            })
          }
        }
      },
      // 文本类型
      _getTextType () {
        getDicByKey('SYS', 'SYS', 'SYS', 'ContentType').then(res => {
          if (res.data.State === REQ_OK) {
            this.textTypeList = res.data.Data
          }
        })
      },
      // 模块类型
      _getModuleType () {
        getDicByKey('SYS', 'SYS', 'SYS', 'Module').then(res => {
          if (res.data.State === REQ_OK) {
            this.moduleList = res.data.Data
          }
        })
      },
      // 时间刻度
      _getTimeBreak () {
        getDicByKey('SYS', 'SYS', 'SYS', 'TimeBreak').then(res => {
          if (res.data.State === REQ_OK) {
            this.timeBreakList = res.data.Data
          }
        })
      },
      // 日期格式
      _getDateFormat () {
        getDicByKey('SYS', 'SYS', 'SYS', 'DateFormat').then(res => {
          if (res.data.State === REQ_OK) {
            this.dataFormatList = res.data.Data
          }
        })
      },
      // 删除表单字段
      _deleteComField (fieldCode, callback) {
        this.loading = true
        deleteComField(this.tableCode, fieldCode).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            callback()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '删除失败！'
          })
        })
      },

      handleClick (tab, event) {
        debugger
        console.log(tab, event)
      },
      // 点击 “设置分组” 的按钮
      dialogTeamSet () {
        this.dialogTeamSort = true
      },
      // 排序拖拽完成后
      datadragEnd (event) {
        event.preventDefault()
        console.log('拖动前的索引 :' + event.oldIndex)
        console.log('拖动后的索引 :' + event.newIndex)
        console.log(this.tableObj.Teams)
      },
      // 选择表单模版
      handleClickTableTemplate () {
        this.dialogTableTemplate = true
      },
      // 表单模版确认
      tableTemplateSure (tables) {
        // table-template.vue 组件中 传过来的 tables
        debugger
        if (tables && tables > 1) {
          this.$message({
            type: 'warning',
            message: '最多选择一个模版'
          })
          return
        }
        this.dialogTableTemplate = false
        let tableCode = tables[0].TableCode
        this.loading = true
        // 获取 企业组和字段——获取表单配置页面接口
        getComTeamsAndFields(tableCode).then(res => {
          debugger
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.tableObj.Fields = res.data.Data.Fields
            this.tableObj.Teams = res.data.Data.Teams
            this.$message({
              type: 'success',
              message: '复用模版成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message: '获取模版失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '获取模版失败，请刷新重试！'
          })
        })
      },

      // 设置分组中 新增分组的保存
      addNewTeam (idx) {
        debugger
        if (!this.newTeamName) {
          this.$message({
            type: 'warning',
            message: '请填写分组名称'
          })
          return
        }
        this.loading = true
        // 调用接口来进行新增分组的保存
        let newTeam = {
          TableCode: this.tableCode,
          TeamName: this.newTeamName,
          Fields: [],
          sortId: idx  // 保证新增的分组 按照sortId 可以排在最后面
        }
        this.addNewTeamInput = false
        this.tableObj.Teams.push(newTeam)
  
        // SaveComTeamsAndFields(JSON.stringify(this.tableObj)).then(res => {
        //   debugger
        //   this.loading = false
        //   if (res.data.State === REQ_OK) {
        //     this.$message({
        //       type: 'success',
        //       message: '保存成功！'
        //     })
        //     this._getComTeamsAndFields()
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: res.data.Error
        //     })
        //   }
        // }).catch(() => {
        //   this.loading = false
        //   this.$message({
        //     type: 'error',
        //     message: '保存失败，请刷新重试！'
        //   })
        // })
        // 需要去验证
        debugger
        // 将 此时的 this.tableObJ 中的 TeamName 验证重复性
        let teamNameArr = []
        this.tableObj.Teams.forEach(item => {
          teamNameArr.push(item.TeamName)
        })
        let res_teamNameIsSame = this._getIsRepeat(teamNameArr)
        if (res_teamNameIsSame) {
          // 重复了，将 this.tableObj.Teams中最后push进去的数据 删除
          this.tableObj.Teams.pop()
          this.$message({
            type: 'warning',
            message: res_teamNameIsSame + '分组名称重复,请重新填写后保存'
          })
          return
        }
        // 未重复 调用保存的接口
        this._SaveComTeamsAndFields()
      },

      // 新增分组(以前的新增分组方法)
      handleClickAddTeam () {
        debugger
        if (!this.newTeamName) {
          this.$message({
            type: 'warning',
            message: '请填写分组名称'
          })
          return
        }
        let newTeam = {
          TableCode: this.tableCode,
          TeamName: this.newTeamName,
          Fields: []
        }
        this.dialogAddTeam = false
        this.tableObj.Teams.push(newTeam)
      },
      // 设置分组中 取消添加分组
      cancelAddTeam () {
        dialogAddTeam = false
      },
      // 确认排序
      handleClickSort () {
        if (this.addNewTeamInput) {
          // 新增的分组名称没有保存
          this.$message({
            type: 'warning',
            message: '新增分组名称未保存,请先保存新增分组名称'
          })
          return
        }
        this.tableObj.Teams.forEach((item, index) => {
          item.SortId = index
        })
        this.dialogTeamSort = false
        this._SaveComTeamsAndFields()
      },
      // 编辑分组的名称
      handleEditTeam (teamCode, index) {
        debugger
        this.editTeamNameIndex = index
      },
      // 保存分组名称
      handleSaveTeamName () {
        this._SaveComTeamsAndFields()
      },
      // 删除分组
      handleDelTeam (teamCode) {
        debugger
        this.$confirm('确认删除此分组吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          debugger
          deleteComTeam(this.tableCode, teamCode).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this._getComTeamsAndFields()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败，请重试!'
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败，请重试!'
            })
          })
        }).catch(() => {
        })
      },
      // 控件中添加一行 --gaolAdd--
      handleAddCmp (e, item) {
        debugger
        getNewId().then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            let code = res.data.Data
            let newFiled = JSON.parse(JSON.stringify(this.defaultField))
            newFiled.FieldCode = code
            this.tableObj.Fields.push(newFiled)
          } else {
            this.$message.error('新增失败，请重试')
          }
        }).catch(() => {
          this.$message.error('新增失败，请重试')
        })
      },
      // 编辑此控件
      handleEditCmp (e, item) {
        debugger
        document.querySelectorAll('.field-item').forEach(item => {
          item.classList.remove('current-item')
        })
        // e.target.parentNode.parentNode.classList.add('current-item')
        e.target.parentNode.parentNode.classList.add('current-item')
        let arr = [...this.tableObj.Fields]
        if (this.tableObj.Teams && this.tableObj.Teams.length) {
          this.tableObj.Teams.forEach(item => {
            if (item.Fields && item.Fields.length) {
              arr.push(...item.Fields)
            }
          })
        }
        this.$store.dispatch('setCurrentFields', arr)
        // 右边区域的 表单设置部分中显示的 currentField  值为 item
        this.currentField = item
      },
      // 删除表单控件
      handleDelTableFieldCmp (field, index) {
        debugger
        if (field.Id) {
          this.$confirm('确认删除此控件吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._deleteComField(field.FieldCode, () => {
              this.tableObj.Fields.splice(index, 1)
            })
          }).catch(() => {
          })
        } else {
          this.tableObj.Fields.splice(index, 1)
        }
      },
      // 删除分组控件
      handleDelTeamFieldCmp (item, team, fieldIndex) {
        debugger
        if (item.Id) {
          this.$confirm('确认删除此控件吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._deleteComField(item.FieldCode, () => {
              this.tableObj.Teams.forEach(i => {
                i.Fields.forEach((f, index) => {
                  if (f.FieldCode === item.FieldCode) {
                    i.Fields.splice(index, 1)
                  }
                })
              })
            })
          }).catch(() => {
          })
        } else {
          console.log(fieldIndex, item)
          this.tableObj.Teams.forEach(i => {
            if (i.TeamCode === team.TeamCode) {
              i.Fields.splice(fieldIndex, 1)
            }
          })
        }
      },
      // 新增空的表单控件
      handleAddField () {
        getNewId().then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            let code = res.data.Data
            let newFiled = JSON.parse(JSON.stringify(this.defaultField))
            newFiled.FieldCode = code
            this.tableObj.Fields.push(newFiled)
          } else {
            this.$message.error('新增失败，请重试')
          }
        }).catch(() => {
          this.$message.error('新增失败，请重试')
        })
      },
      // 新增表单team控件
      handleAddTeamField (team) {
        debugger
        // 新添加一个空的控件
        getNewId().then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            let code = res.data.Data
            let newFiled = JSON.parse(JSON.stringify(this.defaultField))
            newFiled.FieldCode = code
            team.push(newFiled)
          } else {
            this.$message.error('新增失败，请重试')
          }
        }).catch(() => {
          this.$message.error('新增失败，请重试')
        })
      },
      // 点击保存
      handleTableConfigSave () {
        this._SaveComTeamsAndFields()
      },
      // 关闭表单配置页面
      handleClose () {
        this.$router.back()
      },
      // 当用户开始拖动一个元素或选中的文本时触发（见开始拖动操作）。此时的e.target为 被拖拽元素
      dragStart (event, item) {
        // event.preventDefault()
        debugger
        this.isDrag = true
        // 给拖拽的元素添加一个 cur属性，背景变为 红色
        event.target.className += ' cur'
        // 取消之前元素的  curEnd 属性，即取消上一次的 黄色背景
        document.querySelectorAll('.curEnd').forEach(item => {
          item.classList.remove('curEnd')
        })
        // 将 item 写入 拖拽元素中的属性中
        event.dataTransfer.setData('Text', JSON.stringify(item))
        debugger
      },

      // 当拖动元素或选中的文本进入一个可释放目标时触发（见指定释放目标）。此时的e.target 为目标元素
      dragEnter (bol = true) {
        // 判断是否可以拖动的元素
        this.isDrag = bol
        return (event) => {
          if (!this.isDrag) return false
          event.preventDefault()
          debugger
  
          if (event.target.classList[0] === 'field-item') {
            document.querySelectorAll('.field-item').forEach(item => {
              item.classList.remove('active-item')
            })
            event.target.classList.add('active-item')
          } else if ((event.target.classList[0] == 'edit-icon') || (event.target.classList[0] == 'del-icon')) {
            // 移动到了  编辑 或者  删除的 小图标按钮时，找到其 父级的上上级 加上 “active-item” 属性
            document.querySelectorAll('.field-item').forEach(item => {
              item.classList.remove('active-item')
            })
            let dom = event.target.parentNode.parentNode
            dom.classList.add('active-item')
          // } else {
          //   document.querySelectorAll('.field-item').forEach(item => {
          //     item.classList.remove('active-item')
          //   })
          //   let dom = event.target.offsetParent
          //   dom.classList.add('active-item')
          }
        }
      },

      // 事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
      drop (bol = true) {
        // 判断是否可以拖动的元素
        debugger
        this.isDrag = bol
        return (event, item) => {
          debugger
          if (!this.isDrag) return false
          event.preventDefault()
          // 从拖拽元素中 取出 写入的 item属性
          let res = JSON.parse(event.dataTransfer.getData('Text'))
          item.ControlType = res.ControlType
          item.FieldName = res.Name

          // item.push({
          //   ControlType: res.ControlType,
          //   FieldName: res.Name
          // })
        }
      },
      // 当元素或选中的文本在一个可释放目标内移动时触发（每100毫秒触发一次）。
      dragOver (event) {
        event.preventDefault()
        // console.log('dragOver', event)
      },

      // 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). (见结束拖拽)
      dragEnd (event) {
        debugger
        event.preventDefault()
        // 拖拽释放时，取消 cur属性，取消 红色背景
        event.target.classList.remove('cur')
      // 拖拽释放时， 增加 curEnd属性， 显示为 黄色背景
        event.target.className += ' curEnd'
        document.querySelectorAll('.field-item').forEach(item => {
          item.classList.remove('active-item')
        })
        this.isDrag = false
      }
    },
    components: {
      Vuedraggable,
      BaseInfoRouter,
      SaveFooter,
      TableTemplate
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/css/mixin.styl' 
  html,body
    height 100%
    width 100%
    overflow hidden !important
    .sort-cart-item
      margin-bottom  5px
      &:hover
        cursor move
    .table-design-container
      .el-scrollbar__view 
        // padding-bottom 30px !important
        // height 700px
        overflow hidden
        .btn-container
          text-align right
          margin-bottom 10px
        .content-container
          display flex
          height 650px
          overflow hidden
          .left-container
            height 650px
            overflow hidden
            flex 0 0 250px
            .el-card
              height 650px
              overflow hidden
              box-sizing border-box
              >>>.el-card__body
                height 100% !important
                padding 5px
                overflow hidden
                box-sizing border-box
                .el-scrollbar__wrap
                  margin-right 0 !important
                  .el-scrollbar__view
                    height 600px !important
                    overflow-y auto
                  .el-tabs__nav.is-top
                    width 100% !important
                    .el-tabs__active-bar
                      width 50% !important
                    .el-tabs__item 
                      width 50% !important
                      text-align center
                  .title
                    padding 5px 10px
                    background-color rgba(135, 141, 153, .1)
                    margin-bottom 10px
                    border-radius 5px
                    text-align: center
                  .controlItemBox 
                    display inline-block
                    width 47%
                    font-size 12px
                    margin-right 5px
                    no-wrap()
                    &.cur 
                      background rgba(209, 227, 250, .8)
                    &.curEnd
                      background rgba(157, 196, 250, .8)
                    .controlItem_text   
                      &:hover
                        cursor move           
          .mid-container
            height 650px
            overflow hidden
            flex 1
            .el-card
              height 100%     
              padding 10px
              box-sizing border-box                                                                                                                                                                                                                                                                                      
              >>>.el-card__body
                height 100%
                // box-sizing border-box
                .mid-content
                  height 100%
                  .el-scrollbar
                    .el-scrollbar__wrap
                      margin-right 0 !important
                      overflow hidden
                      .el-scrollbar__view
                        height 100%
                        overflow auto
                        .team-item, .default-field-container
                          margin-bottom 20px
                          .group-item
                            display flex
                            justify-content space-between
                            padding 5px 16px
                            background-color rgba(135, 141, 153, .1)
                            margin-bottom 10px
                            border-radius 5px
                            .del-icon
                              &:hover
                                color rgba(64, 158, 255, .8)
                                cursor pointer
                          .field-item
                            display: flex;
                            flex-wrap: wrap
                            align-items: center;
                            position relative
                            width 100%
                            min-height: 50px;
                            padding 5px 10px
                            border 1px dashed #cccccc
                            border-radius 10px
                            margin-bottom 10px
                            box-sizing border-box
                            .controlTypeList_item 
                              position: relative
                              margin-top 5px
                              .addRow-icon
                                position absolute
                                top 60%
                                left 10px
                                z-index 1001
                                &:hover 
                                  color rgba(64, 158, 255, .8)
                                  cursor pointer
                              &.current-item 
                                // width 100%
                                min-height: 50px
                                border 1px dashed #3B8BE3
                                border-radius 10px
                                margin 5px
                            // .addRow-icon
                            //   position absolute
                            //   top 60%
                            //   left 10px
                            //   z-index 1001
                            //   &:hover 
                            //     color rgba(64, 158, 255, .8)
                            //     cursor pointer
                            .edit-icon
                              position absolute
                              top: 50%
                              right: 45px
                              transform: translateY(-50%)
                              z-index: 1001 
                              &:hover
                                color rgba(64, 158, 255, .8)
                                cursor pointer
                            .del-icon
                              position absolute
                              top: 50%
                              right: 15px
                              transform: translateY(-50%)
                              z-index: 1001
                              &:hover
                                color rgba(64, 158, 255, .8)
                                cursor pointer
                          .active-item
                            width 100%
                            min-height: 50px
                            border 1px dashed red
                            border-radius 10px
                            margin-bottom 10px
                          .el-icon-circle-plus-outline
                            color #cccccc
                            &:hover
                              cursor pointer
          .right-container
            height 650px 
            // padding-bottom 20px
            box-sizing border-box
            overflow-y hidden
            flex 0 0 300px
            .el-card
              height 100%
              box-sizing border-box
              >>>.el-card__body
                height 100%
                box-sizing border-box
                .title
                  padding 5px 10px
                  background-color rgba(135, 141, 153, .1)
                  margin-bottom 10px
                  border-radius 5px
                  text-align: center
                .right-content
                  height 600px
                  padding-bottom 10px
                  box-sizing border-box
                  .el-scrollbar
                    height 100%
                    .el-scrollbar__wrap
                      height 100%
                      margin-right 0 !important
                      overflow hidden !important
                      .el-scrollbar__view
                        height 100%
                        overflow-y auto
        .el-dialog__footer
          margin-top 0 !important             
    
    .el-dialog
      overflow hidden !important
      .el-dialog__body
        box-sizing border-box !important
        .showTit
          color red
        .TipBox 
          margin-top 5px
          &::after
            display block
            content ''
            width 100%
            height 0
            clear both
          .sortTipTit
            float left
              color 
          .addNewTeam
            float right  
            &:hover 
              cursor pointer
              color #3b8be3
            .addTit 
              margin-right 4px
              &:hover 
                cursor pointer
                color #3B8BE3    
        .wrapper
          .inputItemBox
            position relative
            margin-top 10px
            .el-menu-vertical-demo
              border none!important
            .sort-cart-item
              width 300px
              .el-input__inner
                // border none   
            &.inputAbledEdit
              .el-input__inner
                border 1px solid red
            .editAndDelet
              position absolute
              top 50%
              right 0
              transform translateY(-50%)
              .edit 
                &:hover
                  cursor pointer
                  color #3b8be3 
              .delet
                &:hover
                  cursor pointer
                  color #3b8be3   
              .EditCancel       
                &:hover 
                  cursor pointer
                  color #3b8be3 
              .EditSave                 
                &:hover
                  cursor pointer
                  color #3b8be3           
        .newTeamInputBox 
          position relative 
          .el-input
            width 300px     
          .cancelAndSaveBox  
            position absolute
            top 50%
            right 0
            transform translateY(-50%)
            .cacelTit
              &:hover   
                cursor pointer
                color #3b8be3
            .saveTit
              &:hover 
                cursor pointer
                color #3b8be3
</style>
