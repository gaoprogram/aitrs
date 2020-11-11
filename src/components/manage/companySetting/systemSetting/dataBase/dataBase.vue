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
            width="200"
            prop="TableCode"
            show-overflow-tooltip
            sortable          
          >
            <template slot-scope="scope">
              <span>{{scope.row.TableCode}}</span>
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
            prop="TableName"
            show-overflow-tooltip
            sortable   
            width="120"       
          >
            <template slot-scope="scope">
              <span>{{scope.row.TableName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="系统名"
            prop="SysName"
            show-overflow-tooltip
            sortable    
            width="100"      
          >
            <template slot-scope="scope">
              <span>{{scope.row.SysName}}</span>
            </template>
          </el-table-column>   

          <el-table-column
            label="所属表"
            prop="ParentTableName"
            show-overflow-tooltip
            sortable  
            width="100"      
          >
            <template slot-scope="scope">
              <span>{{scope.row.ParentTableName}}</span>
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
              <span  style="color: #409EFF" v-if="scope.row.IsSys == 1">
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
            width="200"
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
              </span> -->
              <!-- <span v-if="scope.row.IsSys == 1">
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
    

      <!--编辑组的弹框--start--->
      <div class="editGroupBox" v-if="showEditGroup">
        <!-- <el-dialog
          :title="dialogTit"
          width="30%"
          :visible.sync="showEditGroup"
          append-to-body
          :close-on-click-modal="false"
        > -->
        <atris-drawer-cmp
          :tit="dialogTit"    
          :dialog.sync="showEditGroup"        
          @emitClickSureBtn="saveGroup"
        >
          <!-- formData: {{formData}} -->
          <el-form 
            ref="formData" 
            slot="container-slot"
            :model="formData" 
            label-width="100px"
            :rules="formRules">
            <el-form-item label="项码">
              <el-button type="text" v-if="isAddOrEdit == 2">系统自动生成</el-button>
              <el-button type="text" v-if="isAddOrEdit == 1">{{formData.TableCode}}</el-button>
            </el-form-item>
            <el-form-item label="属性">
              <el-button 
                v-if="formData.IsSys == 0"
                type="text"
              >自定义</el-button>
              <el-button 
                v-if="formData.IsSys == 1 || isAddOrEdit == 2"
                type="text"
              >系统</el-button>              
            </el-form-item>  
            <el-form-item label="系统名">
              <el-button type="text">
                {{formData.SysName}}
              </el-button>
            </el-form-item> 
            <el-form-item label="自定义名" prop="TableName">
              <el-input 
                v-model="formData.TableName"
                placeholder="自定义名称" 
                style="width: 300px"></el-input>
            </el-form-item>   
            <el-form-item label="模块" prop="ModuleCode">
              <!-- formData.ModuleCode: {{formData.ModuleCode}} -->
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
             <!-- belongToTableOptions： {{belongToTableOptions}}                                 -->
            <el-form-item label="所属表" prop="ParentTableCode">
              <el-cascader
                :disabled="formData.IsSys == 1 && isAddOrEdit == 1"
                style="width: 300px"
                placeholder="选择表"
                v-model="formData.ParentTableCode"
                :options="belongToTableOptions"
                :props="{
                  value: 'TableCode',
                  label: 'TableName',
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

          <!-- <div style="margin-top:-35px">
            <save-footer @save="saveGroup" @cancel="cancelGroup"></save-footer>
          </div>
        </el-dialog> -->
        </atris-drawer-cmp>
      </div>
      <!---编辑组的弹框----end-->

      <!--新增组的弹框--start--->
      <div class="editGroupBox" v-if="showAddGroup">
        <!-- <el-dialog
          :title="dialogTit"
          width="30%"
          :visible.sync="showAddGroup"
          append-to-body
          :close-on-click-modal="false"
        > -->
        <atris-drawer-cmp
          :tit="dialogTit"    
          :dialog.sync="showAddGroup"        
          @emitClickSureBtn="saveAddGroup"
        >        
          <!-- formData: {{formData}} -->
          <el-form 
            ref="formAddData" 
            slot="container-slot"
            :model="formAddData" 
            label-width="100px"
            :rules="formAddRules">
            <el-form-item label="项码">
              <el-button type="text" v-if="isAddOrEdit == 2">系统自动生成</el-button>
              <el-button type="text" v-if="isAddOrEdit == 1">{{formAddData.TableCode}}</el-button>
            </el-form-item>
            <el-form-item label="属性">
              <el-button 
                v-if="formAddData.IsSys == 0"
                type="text"
              >系统</el-button>
              <el-button 
                v-if="formAddData.IsSys == 1 || isAddOrEdit == 2"
                type="text"
              >自定义</el-button>              
            </el-form-item>  
            <el-form-item label="系统名">
              <el-button type="text">
                自动生成
              </el-button>
            </el-form-item>              
            <el-form-item label="自定义名" prop="TableName">
              <el-input 
                v-model="formAddData.TableName"
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
            <!-- belongToTableOptions： {{belongToTableOptions}}                                 -->
            <el-form-item label="所属表" prop="ParentTableCode">
              <el-cascader
                style="width: 300px"
                placeholder="选择表"
                v-model="formAddData.ParentTableCode"
                :options="belongToTableOptions"
                :props="{
                  value: 'TableCode',
                  label: 'TableName',
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

          <!-- <div style="margin-top:-35px">
            <save-footer @save="saveAddGroup" @cancel="cancelAddGroup"></save-footer>
          </div>
        </el-dialog> -->
        </atris-drawer-cmp>
      </div>
      <!---新增组的弹框----end-->      


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
  import FieldSetCmp from './dataBase-cmp/fieldSet-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  import { 
    GetModuleList,
    CompTableDataSet,
    SetComTableConfigState,
    ComGroups,
    ComTableTree,
    SaveComTableConfig
  } from '@/api/systemManage.js'
  export default {
    components: {
      FieldSetCmp,
      SaveFooter
    },
    data(){
      return {
        loading: false, // loading 状态
        moduleSource: [], // 模块下拉源
        showEditGroup: false, // 控制编辑组的弹框显示/隐藏
        showAddGroup: false, // 控制编辑组的弹框显示/隐藏
        showFieldSetDialog: false, // 控制 字段设置的弹框显示/隐藏
        mutipleSelection: [], 
        isAddOrEdit: 1, // 1 是编辑 2 是新增
        isStopFlag: false, 
        currentFieldSetRow: {},
        currentRowObj: {},
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          state: 1,
          teamCode: '',
          moduleCode: ''
        },
        formData: {         
          belongAddToTable: '',
          // belongToQun: ''
        },
        formAddData: {
          Id:0,
          belongAddToTable: '',
          ParentTableCode:'',
          SysName: '',
          TableName: '',
          ModuleCode: '',
          Description: '',
          State: '1'
        },
        formRules: {
          TableName: [{required: true, message: '请输入自定义名称', trigger: ['change','blur']}],
          ModuleCode: [{required: true, message: '请选择模块', trigger: ['change','blur']}],
          belongAddToTable: [{required: true, message: '请选择所属组', trigger: ['change','blur']}],
          belongToQun: [{required: true, message: '请选择所属群', trigger: ['change','blur']}],
          Description: [{required: true, message: '请填写描述', trigger: ['change','blur']}],
        },
        formAddRules: {
          TableName: [{required: true, message: '请输入自定义名称', trigger: ['change','blur']}],
          ModuleCode: [{required: true, message: '请选择模块', trigger: ['change','blur']}],
          belongAddToTable: [{required: true, message: '请选择所属组', trigger: ['change','blur']}],
          // belongAddToQun: [{required: true, message: '请选择所属群', trigger: ['change','blur']}],
          Description: [{required: true, message: '请填写描述', trigger: ['change','blur']}],
        },        
        tableData: [],
        currentEditRow: {},
        dialogTit: '',
        belongToTableOptions: []
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
      'formData.ModuleCode': {
        handler(newValue, oldValue){
          debugger
          this.formData.belongToQun = ''
          this.formData.belongAddToTable = ''
          this.belongToTableOptions = []
          this.belongToQunOptions = []              
          if(newValue){           
            this._ComTableTree(newValue)
            // this._ComGroups(newValue)
          }else {
          }       
        },
        immediate: true
      },
      'formAddData.ModuleCode': {
        handler(newValue, oldValue){
          debugger
          this.formAddData.belongAddToTable = ''
          this.belongToTableOptions = []
          if(newValue){           
            this._ComTableTree(newValue)
          }else {
          }       
        },
        immediate: true
      }          
    },
    created(){
      this.GetModuleList()
      this._getCommTables()
    },
    methods: {
      _getCommTables(){
        this._CompTableDataSet()
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
      },
      // 获取所属表下拉源
      _ComTableTree(moduleCode, groupCode){
        debugger
        ComTableTree(moduleCode, groupCode).then(res => {
          if(res && res.data.State === REQ_OK){
            debugger
            this.belongToTableOptions = res.data.Data
            this._changeData(this.belongToTableOptions)
          }else {
            this.$message.error(`获取所属表下拉源数据失败，${res.data.Error}`)
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
      _SaveComTableConfig(data){
        SaveComTableConfig(JSON.stringify(data)).then(res => {
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
      // 获取数据库表列表数据
      _CompTableDataSet(){
        this.loading = true
        CompTableDataSet(this.queryObj.teamCode, this.queryObj.moduleCode, this.queryObj.state, this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
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
      _SetComTableConfigState(data, type){
        let text = type == 1 ? '启用':'停用'
        SetComTableConfigState(JSON.stringify(data), type).then(res => {
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
        this.$confirm(`确定要${text}"${row.TableName}"吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._SetComTableConfigState([this.currentRowObj], type)
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
              str += item.TableName + ','
            }else {
              str += item.TableName
            }
          })
        }
        debugger
        this.$confirm(`确定要${text}"${str}"吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._SetComTableConfigState([this.currentRowObj], type)
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
        this.formAddData = {
          Id:0,
          belongAddToTable: '',
          SysName: '',
          TableName: '',
          ModuleCode: '',
          Description: '',
          State: '1'
        },
        this.showAddGroup = true
      },
      // 编辑
      handleEdit(row){
        debugger
        this.dialogTit = '编辑'
        this.isAddOrEdit = 1
        this.currentEditRow = row
        this.formData = JSON.parse(JSON.stringify(row))
        this.formData.State += ''
        // if(!this.belongToTableOptions.length){
        //   this._ComTableTree(this.currentEditRow.ModuleCode,'')
        // }        
        // if(!this.belongToQunOptions.length){
        //   this._ComGroups(this.currentEditRow.ModuleCode)          
        // }
        this.showEditGroup = true
      },
      saveGroup(){
        this.$refs.formData.validate(valid => {
          if(valid){
            debugger
            if(this.$isArray(this.formData.ParentTableCode) && this.formData.ParentTableCode.length){
              let length = this.formData.ParentTableCode.length
              this.formData.ParentTableCode = this.formData.ParentTableCode[length-1]
            }else {
              this.formData.ParentTableCode = ''
            }            
            this._SaveComTableConfig(this.formData)
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
            if(this.$isArray(this.formAddData.ParentTableCode) && this.formAddData.ParentTableCode.length){
              let length = this.formAddData.ParentTableCode.length
              this.formAddData.ParentTableCode = this.formAddData.ParentTableCode[length-1]
            }else {
              this.formAddData.ParentTableCode = ''
            }
            this._SaveComTableConfig(this.formAddData)
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
