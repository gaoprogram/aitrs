<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统设置-显示组表
-->

<style lang="stylus" ref="stylesheet/stylus" scoped>
.el-form-item
  margin-bottom 17px !important
.displayGroup
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="displayGroup">

      <div class="searchWrap u-f-ac">
        <div class="search-item">
          模块
          <el-select 
            clearable
            v-model="queryObj.moduleCode">
            <el-option
              v-for="(item, key) in moduleSource"
              :key="key"
              :label="item.ModuleName"
              :value="item.ModuleCode"
            >
            </el-option>
          </el-select>
        </div>

        <div class="marginL10">
          <el-button type="primary" @click.native="handlerSearch">搜索</el-button>
          <el-button type="primary" @click.native="handlerReset">重置</el-button>
        </div>
      </div>

      <!-- <el-tabs v-model="currentTab" type="card" @tab-click="handleClickTab">
        <el-tab-pane label="系统" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="企业自定义" name="second">配置管理</el-tab-pane>
      </el-tabs> -->

      <div class="topBox marginB10 marginT10" style="text-align: right">
        <el-checkbox 
          v-model="isStopFlag"
          style="float: left"
        >停用</el-checkbox>
        <el-button 
          type="primary" 
          size="mini"
          @click.native="handlerAddGroup"
        >新增</el-button>
        <el-button type="primary" 
          v-if="isStopFlag"
          :disabled="!mutipleSelection.length"
          size="mini"
          @click.native="batchUsing(1)"
        >批量启用</el-button>
        <el-button 
          v-if="!isStopFlag"
          :disabled="!mutipleSelection.length"
          type="primary" 
          size="mini"
          @click.native="batchUsing(0)"
        >批量停用</el-button>
        <!-- <el-button type="primary" size="mini">日志</el-button> -->
      </div>

      <div
        :class="['tableBox', tableData.length<=0? 'not_found':'']"
        v-loading="loading">
        <!-- tableData: {{tableData}} -->
        <el-table
          :data="tableData"
          border
          max-height="500px"
          empty-text=" "
          @selection-change="handleSelectionChange"
        >

          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>

          <el-table-column
            label="项码"
            prop="TeamCode"
            width="200"
            show-overflow-tooltip
            sortable          
          >
            <template slot-scope="scope">
              <span>{{scope.row.TeamCode}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="模块"
            prop="ModuleName"
            show-overflow-tooltip
            sortable          
          >
            <template slot-scope="scope">
              <span>{{scope.row.ModuleName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="自定义名"
            prop="TeamName"
            show-overflow-tooltip
            sortable     
            width="120"     
          >
            <template slot-scope="scope">
              <span>{{scope.row.TeamName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="系统名"
            prop="SysName"
            show-overflow-tooltip
            sortable   
            width="120"       
          >
            <template slot-scope="scope">
              <span>{{scope.row.SysName}}</span>
            </template>
          </el-table-column>   

          <el-table-column
            label="所属群"
            prop="GroupName"
            show-overflow-tooltip
            sortable     
            width="120"     
          >
            <template slot-scope="scope">
              <span>{{scope.row.GroupName}}</span>
            </template>
          </el-table-column>            

          <el-table-column
            label="所属组"
            prop="ParentTeamName"
            show-overflow-tooltip
            sortable     
            width="120"     
          >
            <template slot-scope="scope">
              <span>{{scope.row.ParentTeamName}}</span>
            </template>
          </el-table-column>             

          <el-table-column
            label="引用组件"
            prop="RefComponentNames"
            show-overflow-tooltip
            sortable        
            width="120"  
          >
            <template slot-scope="scope">
              <span>{{scope.row.RefComponentNames}}</span>
            </template>
          </el-table-column>    

          <el-table-column
            label="系统配置"
            prop="IsSys"
            show-overflow-tooltip
            sortable
            width="120"
          >
            <template slot-scope="scope">
              <!-- scope.row.IsSys： {{scope.row.IsSys}} -->
              <span style="color: #409EFF" v-if="scope.row.IsSys == 1">
                是
              </span>
              <span style="color: #67C23A" v-if="scope.row.IsSys == 0">
                否
              </span>              
            </template>
          </el-table-column>


          <el-table-column
            label="描述"
            width="200"
            show-overflow-tooltip
            prop="Description"
          >
            <template slot-scope="scope">
              <span>{{scope.row.Description}}</span>
            </template>
          </el-table-column>         


          <el-table-column
            label="状态"
            show-overflow-tooltip
            sortable          
          >
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.IsSys == 0">
                <span v-if="scope.row.SysState == 0">无效</span>
                <span v-if="scope.row.SysState == 1">有效</span>
              </span>
              <span v-if="scope.row.IsSys == 1">
                <span v-if="scope.row.State == 0">无效</span>
                <span v-if="scope.row.State == 1">有效</span>
              </span> -->
              <span v-if="scope.row.State == 0">停用</span>
              <span v-if="scope.row.State == 1">启用</span>              
            </template>
          </el-table-column>            


          <el-table-column
            label="操作"
            width="250"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.IsSys == 0">
                <el-button 
                  v-if="scope.row.SysState == 0"
                  type="text" 
                  size="mini"
                  @click.native="handlerUsing(scope.row, 1)"
                >启用</el-button>
                <el-button 
                  v-if="scope.row.SysState == 1"
                  type="text" 
                  size="mini"
                  @click.native="handlerUsing(scope.row, 0)"
                >停用</el-button>                
              </span>
              <span v-if="scope.row.IsSys == 1">
                <el-button 
                  v-if="scope.row.State == 0"
                  type="text" 
                  size="mini"
                  @click.native="handlerUsing(scope.row, 1)"
                >启用</el-button>
                <el-button 
                  v-if="scope.row.State == 1"
                  type="text" 
                  size="mini"
                  @click.native="handlerUsing(scope.row, 0)"
                >停用</el-button>                
              </span>       -->

              <el-button 
                v-if="scope.row.State == 0"
                type="text" 
                size="mini"
                @click.native="handlerUsing(scope.row, 1)"
              >启用</el-button>
              <el-button 
                v-if="scope.row.State == 1"
                type="text" 
                size="mini"
                @click.native="handlerUsing(scope.row, 0)"
              >停用</el-button>      

              <!-- <el-button 
                type="text" 
                size="mini" 
                @click.native="handleTableSet(scope.row, scope.$index)"
              >表设置</el-button>                        -->

              <el-button 
                type="text" 
                size="mini" 
                @click.native="handleFieldSet(scope.row, scope.$index)"
              >字段设置</el-button>

              <el-button 
                type="text" 
                size="mini" 
                @click.native="handleEdit(scope.row, scope.$index)"
              >编辑</el-button>
            </template>
          </el-table-column>     
        </el-table>

        <!--分页部分--start--->
        <div class="pagination-container">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryObj.pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="queryObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryObj.total">
            </el-pagination>
        </div>
        <!---分页部分--end--->           
      </div>
    

      <!--编辑的弹框--start--->
      <div class="editGroupBox" v-if="showEditGroup">
        <!-- <el-dialog
          :title="dialogTit"
          width="30%"
          :visible.sync="showEditGroup"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-form 
            ref="formData" 
            :model="formData" 
            label-width="100px"
            :rules="formRules">
            <el-form-item label="项码">
              <el-button type="text" v-if="isAddOrEdit == 2">系统自动生成</el-button>
              <el-button type="text" v-if="isAddOrEdit == 1">{{formData.TeamCode}}</el-button>
            </el-form-item>
            <el-form-item label="属性">
              <el-button 
                v-if="formData.IsSys == 0"
                type="text"
              >自定义</el-button>
              <el-button 
                v-if="formData.IsSys == 1"
                type="text"
              >系统</el-button>              
            </el-form-item>   
            <el-form-item label="系统名">
              <el-button 
                type="text"
              >{{formData.SysName}}</el-button>              
            </el-form-item>               
            <el-form-item label="自定义名" prop="TeamName">
              <el-input 
                v-model="formData.TeamName"
                placeholder="自定义名称" 
                style="width: 300px"></el-input>
            </el-form-item>   
            <el-form-item label="模块" prop="ModuleCode">
              <el-select 
                :disabled="isAddOrEdit == 1"
                style="width: 300px"
                clearable
                v-model="formData.ModuleCode">
                <el-option
                  v-for="(item, key) in moduleSource"
                  :key="key"
                  :label="item.ModuleName"
                  :value="item.ModuleCode"
                >
                </el-option>
              </el-select>
            </el-form-item>                                  
            <el-form-item label="所属群" prop="GroupCode">
              <el-select 
                :disabled="formData.IsSys == 1 && isAddOrEdit ==1"
                style="width: 300px"
                clearable
                v-model="formData.GroupCode">
                <el-option
                  v-for="(item, key) in belongToQunOptions"
                  :key="key"
                  :label="item.GroupName"
                  :value="item.GroupCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属组" prop="ParentTeamCode">
              <el-cascader
                :disabled="formData.IsSys == 1 && isAddOrEdit ==1"              
                style="width: 300px"
                v-model="formData.ParentTeamCode"
                placeholder="选择所属组"
                :options="belongToGroupOptions"
                :props="{
                  value: 'TeamCode',
                  label: 'TeamName',
                  children: 'Children'
                }"
                filterable
                change-on-select
              ></el-cascader>              
            </el-form-item>
            <el-form-item label="描述" prop="Description">
              <el-input 
                v-model="formData.Description"              
                style="width: 300px" 
                type="textarea" 
                autosize></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch
                v-model="formData.State"                
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-form>

          <div style="margin-top:-35px">
            <save-footer @save="saveGroup" @cancel="cancelGroup"></save-footer>
          </div>
        </el-dialog> -->
        <atris-drawer-cmp
          :tit="dialogTit"
          :dialog.sync="showEditGroup"
          @emitClickSureBtn="saveGroup"
        >
          <el-form 
            slot="container-slot"
            ref="formData" 
            :model="formData" 
            label-width="100px"
            :rules="formRules">
            <el-form-item label="项码">
              <el-button type="text" v-if="isAddOrEdit == 2">系统自动生成</el-button>
              <el-button type="text" v-if="isAddOrEdit == 1">{{formData.TeamCode}}</el-button>
            </el-form-item>
            <el-form-item label="属性">
              <el-button 
                v-if="formData.IsSys == 0"
                type="text"
              >自定义</el-button>
              <el-button 
                v-if="formData.IsSys == 1"
                type="text"
              >系统</el-button>              
            </el-form-item>   
            <el-form-item label="系统名">
              <el-button 
                type="text"
              >{{formData.SysName}}</el-button>              
            </el-form-item>               
            <el-form-item label="自定义名" prop="TeamName">
              <el-input 
                v-model="formData.TeamName"
                placeholder="自定义名称" 
                style="width: 300px"></el-input>
            </el-form-item>   
            <el-form-item label="模块" prop="ModuleCode">
              <el-select 
                :disabled="isAddOrEdit == 1"
                style="width: 300px"
                clearable
                v-model="formData.ModuleCode">
                <el-option
                  v-for="(item, key) in moduleSource"
                  :key="key"
                  :label="item.ModuleName"
                  :value="item.ModuleCode"
                >
                </el-option>
              </el-select>
            </el-form-item>                                  
            <el-form-item label="所属群" prop="GroupCode">
              <el-select 
                :disabled="formData.IsSys == 1 && isAddOrEdit ==1"
                style="width: 300px"
                clearable
                v-model="formData.GroupCode">
                <el-option
                  v-for="(item, key) in belongToQunOptions"
                  :key="key"
                  :label="item.GroupName"
                  :value="item.GroupCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属组" prop="ParentTeamCode">
              <el-cascader
                :disabled="formData.IsSys == 1 && isAddOrEdit ==1"              
                style="width: 300px"
                v-model="formData.ParentTeamCode"
                placeholder="选择所属组"
                :options="belongToGroupOptions"
                :props="{
                  value: 'TeamCode',
                  label: 'TeamName',
                  children: 'Children'
                }"
                filterable
                change-on-select
              ></el-cascader>              
            </el-form-item>
            <el-form-item label="描述" prop="Description">
              <el-input 
                v-model="formData.Description"              
                style="width: 300px" 
                type="textarea" 
                autosize></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch
                v-model="formData.State"                
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-form>        
        </atris-drawer-cmp>
      </div>
      <!---编辑的弹框----end-->

      <!--新增的弹框--start--->
      <div class="addGroupBox" v-if="showAddGroup">
        <!-- <el-dialog
          :title="dialogTit"
          width="30%"
          :visible.sync="showAddGroup"
          append-to-body
          :close-on-click-modal="false"
        > -->
          <!-- formData: {{formData}} -->
          <atris-drawer-cmp
            :tit="dialogTit"    
            :dialog.sync="showAddGroup"        
            @emitClickSureBtn="saveAddGroup"
          >
            <el-form 
              ref="formAddData" 
              :model="formAddData" 
              label-width="100px"
              slot="container-slot"
              :rules="formRules">
              <el-form-item label="项码">
                <el-button type="text" v-if="isAddOrEdit == 2">系统自动生成</el-button>
                <el-button type="text" v-if="isAddOrEdit == 1">{{formAddData.TeamCode}}</el-button>
              </el-form-item>
              <el-form-item label="属性">
                <el-button type="text">自定义</el-button>
              </el-form-item>  
              <el-form-item label="系统名">
                <el-button type="text">
                  系统自动生成
                </el-button>
              </el-form-item>  
              <el-form-item label="自定义名" prop="TeamName">
                <el-input 
                  v-model="formAddData.TeamName"
                  placeholder="自定义名称" 
                  style="width: 300px"></el-input>
              </el-form-item>   
              <el-form-item label="模块" prop="ModuleCode">
                <!-- formAddData.ModuleCode: {{formAddData.ModuleCode}} -->
                <el-select 
                  style="width: 300px"
                  clearable
                  v-model="formAddData.ModuleCode">
                  <el-option
                    v-for="(item, key) in moduleSource"
                    :key="key"
                    :label="item.ModuleName"
                    :value="item.ModuleCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>                                  
              <el-form-item label="所属群" prop="GroupCode">
                <!-- belongToQunOptions: {{belongToQunOptions}} -->
                <!-- formAddData.belongAddToQun: {{formAddData.belongAddToQun}} -->
                <!-- formAddData.GroupCode: {{formAddData.GroupCode}} -->
                <el-select 
                  style="width: 300px"
                  clearable
                  v-model="formAddData.GroupCode">
                  <el-option
                    v-for="(item, key) in belongToQunOptions"
                    :key="key"
                    :label="item.GroupName"
                    :value="item.GroupCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属组" prop="ParentTeamCode">
                <!-- belongToGroupOptions: {{belongToGroupOptions}} -->
                <!-- <el-select 
                  style="width: 300px"
                  clearable
                  v-model="formAddData.belongToGroup">
                  <el-option
                    v-for="(item, key) in belongToGroupOptions"
                    :key="key"
                    :label="item.ModuleName"
                    :value="item.ModuleCode"
                  >
                  </el-option>
                </el-select> -->
                <!-- formAddData.ParentTeamCode: {{formAddData.ParentTeamCode}} -->
                <el-cascader
                  style="width: 300px"
                  v-model="formAddData.ParentTeamCode"
                  placeholder="选择所属组"
                  :options="belongToGroupOptions"
                  :props="{
                    value: 'TeamCode',
                    label: 'TeamName',
                    children: 'Children'
                  }"
                  filterable
                  change-on-select
                ></el-cascader>              
              </el-form-item>
              <el-form-item label="描述" prop="Description">
                <el-input 
                  v-model="formAddData.Description"              
                  style="width: 300px" 
                  type="textarea" 
                  autosize></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-switch
                  v-model="formAddData.State"                
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-form>
          </atris-drawer-cmp>
          <!-- <div style="margin-top:-35px">
            <save-footer @save="saveAddGroup" @cancel="cancelAddGroup"></save-footer>
          </div> -->
        <!-- </el-dialog> -->
      </div>
      <!---新增的弹框----end-->  

      <!----表设置弹框-start-->
      <div class="fieldSetWrap" v-if="showTableSetDialog">
        <el-dialog
          title="表设置"
          append-to-body
          fullscreen
          :close-on-click-modal="false"
          :visible.sync="showTableSetDialog"
        >
          <table-set-cmp
            :obj="currentTableSetRow"
            :moduleSource="moduleSource"
          ></table-set-cmp>
        </el-dialog>
      </div>
      <!----表设置弹框---end-->

      <!----字段设置弹框-start-->
      <div class="fieldSetWrap" v-if="showFieldSetDialog">
        <el-dialog
          title="字段设置"
          append-to-body
          fullscreen
          :close-on-click-modal="false"
          :visible.sync="showFieldSetDialog"
        >
          <field-set-cmp
            :obj="currentFieldSetRow"
          ></field-set-cmp>
        </el-dialog>
      </div>
      <!----字段设置弹框---end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import FieldSetCmp from './displayGroup-cmp/fieldSet-cmp'
  // import TableSetCmp from './displayGroup-cmp/dataBase'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  import { 
    GetModuleList,
    CompTeamDataSet,
    SetComTeamConfigState,
    ComGroups,
    ComTeamTree,
    SaveComTeamConfig
  } from '@/api/systemManage.js'
  export default {
    components: {
      FieldSetCmp,
      // TableSetCmp,
      SaveFooter
    },
    data(){
      let validBelongToQun = (rule, value, callback) => {
        debugger
        if(this.isAddOrEdit == 1){
          // 编辑
          if(!this.formData.GroupCode){
            callback(new Error('所属群为空'))
          }else {
            callback()
          }          
        }else if(this.isAddOrEdit == 2){
          // 新增
          if(!this.formAddData.GroupCode){
            callback(new Error('所属群为空'))
          }else {
            callback()
          }             
        }
      }
      let validBelongToGroup = (rule, value, callback) => {
        debugger
        if(this.isAddOrEdit == 1){
          // 编辑
          if(!this.formData.ParentTeamCode.length){
            callback(new Error('所属组为空'))
          }else {
            callback()
          }
        }else if(this.isAddOrEdit == 2){
          // 新增
          if(!this.formAddData.ParentTeamCode.length){
            callback(new Error('所属组为空'))
          }else {
            callback()
          }
        }
      }      
      return {
        loading: false, // loading 状态
        moduleSource: [], // 模块下拉源
        showEditGroup: false, // 控制编辑组的弹框显示/隐藏
        showAddGroup: false, // 控制 新增组的 弹框显示/隐藏
        showFieldSetDialog: false, // 控制 字段设置的弹框显示/隐藏
        showTableSetDialog: false, // 控制 表设置的弹框显示/隐藏
        mutipleSelection: [], 
        isAddOrEdit: 1, // 1 是编辑 2 是新增
        isStopFlag: false, 
        currentFieldSetRow: {},
        currentTableSetRow: {},
        currentRowObj: {},
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          state: 1,
          moduleCode: ''
        },
        formData: {     
          ModuleCode: '',    
        },
        formAddData: {
          Id: 0,
          SysName:'',
          TeamName: '',
          ParentTeamCode: '',
          ModuleName: '',
          Description: '',
          State: '1',
          TeamCode: '',
          GroupCode: ''
        },
        formRules: {
          TeamName: [{required: true, message: '请输入自定义名称', trigger: ['change','blur']}],
          ModuleCode: [{required: true, message: '请选择模块', trigger: ['change','blur']}],
          GroupCode: [{required: true, validator: validBelongToQun, trigger: ['change','blur']}],
          // TeamCode: [{required: true, validator: validBelongToGroup, trigger: ['change','blur']}],
          Description: [{required: true, message: '请填写描述', trigger: ['change','blur']}],
        },
        formAddRules: {
          TeamName: [{required: true, message: '请输入自定义名称', trigger: ['change','blur']}],
          ModuleCode: [{required: true, message: '请选择模块', trigger: ['change','blur']}],
          GroupCode: [{required: true, validator: validBelongToQun, trigger: ['change','blur']}],
          // TeamCode: [{required: true, validator: validBelongToGroup, trigger: ['change','blur']}],
          Description: [{required: true, message: '请填写描述', trigger: ['change','blur']}],
        },        
        tableData: [],
        currentEditRow: {},
        dialogTit: '',
        belongToGroupOptions: [],
        belongToQunOptions: [],
        belongToQun: '',
        belongToGroup: ''
      }
    },
    watch: {
      isStopFlag: {
        handler(newValue, oldValue){
          if(newValue){
            this.queryObj.state = 0
            this.queryObj.pageNum = 1
          }else {
            this.queryObj.state = 1
            this.queryObj.pageNum = 1
          }
          this._getCommTables()
        }
      },
      'formData.ParentTeamCode': {
        handler(newValue, oldValue){
          let isArray = Object.prototype.toString.apply(newValue) === '[object Array]'? true: false
          if(newValue.length && isArray){
            // this.$set(this.formData, 'belongToGroup', newValue[newValue.length-1])
            this.formData.ParentTeamCode = newValue[newValue.length-1]
          }
        }
      },
      'formAddData.ParentTeamCode': {
        handler(newValue, oldValue){
          debugger
          let isArray = Object.prototype.toString.apply(newValue) === '[object Array]'? true: false
          if(newValue.length && isArray){
            // this.$set(this.formAddData, 'belongToGroup', newValue[newValue.length-1])
            this.formAddData.ParentTeamCode = newValue[newValue.length-1]
          }
        }
      },      
      // belongToQun: {
      //   handler(newValue, oldValue){
      //     // if(newValue){
      //       this.$set(this.formData, 'belongToQun', newValue)
      //       // this.formData.belongToQun = newValue
      //     // }
      //   }
      // },
      'formData.ModuleCode': {
        handler(newValue, oldValue){
          debugger
          this.belongToQun = ''
          this.belongToGroup = ''
          this.formData.belongToQun = ''
          this.formData.belongToGroup = ''
          this.belongToGroupOptions = []
          this.belongToQunOptions = []              
          if(newValue){   
            this._ComTeamTree(newValue)
            this._ComGroups(newValue)
          }else {
            this.belongToQun = ''
            this.belongToGroup = ''
          }       
        },
        immediate: true
      },
      'formAddData.ModuleCode': {
        handler(newValue, oldValue){
          debugger
          this.belongAddToQun = ''
          this.belongAddToGroup = ''
          this.formAddData.ParentTeamCode = ''
          this.formAddData.GroupCode = ''
          this.belongToGroupOptions = []
          this.belongToQunOptions = []              
          if(newValue){           
            this._ComTeamTree(newValue)
            this._ComGroups(newValue)
          }else {
            this.belongAddToQun = ''
            this.belongAddToGroup = ''
          }       
        },
        immediate: true
      },  
      'formData.GroupCode': {
        handler(newValue, oldValue){
          // 所属群变化后 触发 所属组重新获取所属组数据下拉源
          if(this.isAddOrEdit == 1){
            // 编辑
            this._ComTeamTree(this.formData.ModuleCode, newValue)
          }else if(this.isAddOrEdit == 2){
            // 新增
            this._ComTeamTree(this.formAddData.ModuleCode, newValue)
          }
        }
      },
      'formAddData.GroupCode': {
        handler(newValue, oldValue){
          // 所属群变化后 触发 所属组重新获取所属组数据下拉源
          if(this.isAddOrEdit == 1){
            // 编辑
            this._ComTeamTree(this.formData.ModuleCode, newValue)
          }else if(this.isAddOrEdit == 2){
            // 新增
            this._ComTeamTree(this.formAddData.ModuleCode, newValue)
          }
        }
      }             
    },
    created(){
      this.GetModuleList()
      this._getCommTables()
    },
    methods: {
      _getCommTables(){
        this._CompTeamDataSet()
      },
      // 搜索
      handlerSearch(){
        this._getCommTables()
      },
      // 重置
      handlerReset(){
        Object.assign(this.queryObj, {
          moduleCode: ''
        })
        this._getCommTables()
      },
      _changeData(data){
        if(data && data.length){
          data.forEach((item, key) => {
            if(item.Children){
              if(!item.Children.length){
                delete item.Children
              }else {
                this._changeData(item.Children)
              }
            }
          })
        }
        // console.log(data)
      },
      // 获取所属组下拉源
      _ComTeamTree(moduleCode, groupCode, teamCode){
        let tCode = ''
        if(this.isAddOrEdit == 2){
          // 新增
          tCode = ''
        }else if(this.isAddOrEdit == 1){
          // 编辑
          tCode = this.formData.TeamCode
        }
        ComTeamTree(moduleCode, groupCode, tCode ).then(res => {
          if(res && res.data.State === REQ_OK){
            this.belongToGroupOptions = res.data.Data
            // 处理数据
            this._changeData(this.belongToGroupOptions)
          }else {
            this.$message.error(`获取所属组下拉源数据失败，${res.data.Error}`)
          }
        }).catch(() => {

        })
      },
      // 获取所属群下拉源
      _ComGroups(moduleCode){
        ComGroups(moduleCode).then(res => {
          if(res && res.data.State === REQ_OK){
            this.belongToQunOptions = res.data.Data
          }else {
            this.$message.error(`获取所属群下拉源数据失败，${res.data.Error}`)
          }
        }).catch(() => {

        })
      },
      // 获取模块下拉源
      GetModuleList(pageSize, pageNum){
        GetModuleList(65556).then(res => {
          if(res && res.data.State === REQ_OK){
            this.moduleSource = res.data.Data
          }else {
            this.$message({
                type: 'error',
                message: `获取模块下拉源失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          // this.$message({
          //     type: 'warning',
          //     message: '获取模块下拉源数据出错了'
          // })
        })
      }, 
      closeEditDialog(){
        this.showEditGroup = false
      }, 
      closeAddDialog(){
        this.showAddGroup = false
      },  
      _SaveComTeamConfig(data){
        SaveComTeamConfig(JSON.stringify(data)).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success('保存成功')
            if(this.isAddOrEdit == 1){
              this.closeEditDialog()
            }else {
              this.closeAddDialog()
            }
            this._getCommTables()
          }else {
            this.$message.error(`保存失败,${res.data.Error}`)
          }
        })
      },
      _CompTeamDataSet(){
        this.loading = true
        CompTeamDataSet(this.queryObj.moduleCode, this.queryObj.state, this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
            this.queryObj.total = res.data.Total
          }else {
            this.$message.error(`获取显示组表数据失败,${res.data.Error}`)
          }
        })
      },
      // 批量启用停用
      _SetComTeamConfigState(data, type){
        let text = type == 1 ? '启用':'停用'
        SetComTeamConfigState(JSON.stringify(data), type).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success(`${text}成功`)
            this._getCommTables()
          }else {
            this.$message.error(`${text}失败,${res.data.Error}`)
          }
        })
      },
      // 启用/停用
      handlerUsing(row, type){
        this.currentRowObj = row
        let text = type == 0? '停用':'启用'
        this.$confirm(`确定要${text}"${row.TeamName}"吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._SetComTeamConfigState([this.currentRowObj], type)
        }).catch(() => {
          this.$message.info(`${text}已取消`)
        })
      }, 
      // 批量启用/批量停用
      batchUsing(type){
        debugger
        let text = type == 0? '停用':'启用'
        let str = ''
        let length = this.mutipleSelection.length
        if(length){
          this.mutipleSelection.forEach((item, key) => {
            if(key != (length-1)){
              str += item.TeamName + ','
            }else {
              str += item.TeamName
            }
          })
        }
        debugger
        this.$confirm(`确定要${text}"${str}"吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._SetComTeamConfigState([this.currentRowObj], type)
        }).catch(() => {
          this.$message.info(`${text}已取消`)
        }) 
      },     
      // 分页--一页展示多少条
      handleSizeChange (val) {
          this.queryObj.pageSize = val
          this._getCommTables()
      },
      // 分页--上一页，下一页
      handleCurrentChange (val) {
          this.queryObj.pageNum = val
          this._getCommTables()
      },   
      // 表设置
      handleTableSet(row, index){
        this.currentTableSetRow = JSON.parse(JSON.stringify(row))
        this.showTableSetDialog  = true
      },    
      // 字段设置
      handleFieldSet(row, index){
        this.currentFieldSetRow = JSON.parse(JSON.stringify(row))
        this.showFieldSetDialog  = true
      },
      handleSelectionChange(val){
        this.mutipleSelection = val
      },
      // 新增
      handlerAddGroup(){
        debugger
        this.dialogTit = '新增'
        this.isAddOrEdit = 2 
        this.belongToGroupOptions = []
        this.belongToQunOptions = []
        this.formAddData = {
          Id: 0,
          SysName:'',
          TeamName: '',
          ModuleName: '',
          ParentTeamCode: '',
          Description: '',
          State: '1',
          TeamCode: '',
          GroupCode: ''          
        }
        this.showAddGroup = true
      },
      // 编辑
      handleEdit(row){
        debugger
        this.dialogTit = '编辑'
        this.isAddOrEdit = 1
        this.currentEditRow = row
        // Object.assign(this.formData, JSON.parse(JSON.stringify(row)))
        this.formData = JSON.parse(JSON.stringify(row))
        // this.formData.belongToQun = ''
        // this.formData.belongToGroup = ''
        this.formData.State += ''
        console.log("-------",this.formData)
        // if(!this.belongToGroupOptions.length){
        //   this._ComTeamTree(this.currentEditRow.ModuleCode,'')
        // }        
        // if(!this.belongToQunOptions.length){
        //   this._ComGroups(this.currentEditRow.ModuleCode)          
        // }
        this.showEditGroup = true
      },
      saveGroup(){
        this.$refs.formData.validate(valid => {
          if(valid){
            this._SaveComTeamConfig(this.formData)
          }else {

          }
        })
      },
      cancelGroup(){
        this.showEditGroup = false
      },
      saveAddGroup(){
        this.$refs.formAddData.validate(valid => {
          if(valid){
            this._SaveComTeamConfig(this.formAddData)
          }else {

          }
        })
      },
      cancelAddGroup(){
        this.showAddGroup = false
      },
    },
  }
</script>
