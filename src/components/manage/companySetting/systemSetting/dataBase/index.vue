<!--
  User: gaol
  Date: 2019/8/7
  功能：系统-系统设置-物理表
-->

<style lang="stylus" ref="stylesheet/stylus" scoped>
.dataBase
  padding 0 20px
  box-sizing border-box
.tableSetWrap
  >>>.el-dialog__body
    height calc(100vh - 80px)
    .tableSet
      height 100%
</style>
<template>
    <div class="dataBase">

      <!-- <el-tabs v-model="currentTab" type="card" @tab-click="handleClickTab">
        <el-tab-pane label="系统" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="企业自定义" name="second">配置管理</el-tab-pane>
      </el-tabs> -->

      <!--搜索部分--start-->
      <search-tools-cmp>
        <div slot="handlerBtnWrap"> 
          <el-checkbox 
            v-model="isStopFlag"
          >停用</el-checkbox>
          <el-button 
            type="primary" 
            size="mini"
            @click.native="handlerAddDataBase"
          >新增</el-button>
          <el-button type="primary" 
            v-if="isStopFlag"
            :disabled="!multipleSelection.length"
            size="mini"
            @click.native="batchUsing(1)"
          >批量启用</el-button>
          <el-button 
            v-if="!isStopFlag"
            :disabled="!multipleSelection.length"
            type="primary" 
            size="mini"
            @click.native="batchUsing(0)"
          >批量停用</el-button>
          <!-- <el-button type="primary" size="mini">日志</el-button> -->
        </div>

        <div slot="moreSearch">
          <el-select 
            clearable
            size="small"
            v-model="queryObj.moduleCode">
            <el-option
              v-for="(item, key) in moduleSource"
              :key="key"
              :label="item.ModuleName"
              :value="item.ModuleCode"
            >
            </el-option>
          </el-select>
          <el-button 
            type="primary" 
            size="small"
            @click.native="handlerSearch"
          >搜索</el-button>
          <el-button 
            type="primary" 
            size="small"
            @click.native="handlerReset"
          >重置</el-button>
        </div>
      </search-tools-cmp> 
      <!---搜索部分---end-->

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
            label="物理表名"
            prop="dbcode"
            width="200"
            show-overflow-tooltip
            sortable          
          >
            <template slot-scope="scope">
              <span>{{scope.row.dbcode}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="中文名"
            prop="name"
            width="200"
            show-overflow-tooltip
            sortable          
          >
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="主键"
            prop="pk"
            show-overflow-tooltip
            sortable     
            width="120"     
          >
            <template slot-scope="scope">
              <span>{{scope.row.pk}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="是否多行"
            prop="hasmore"
            show-overflow-tooltip
            sortable   
            width="120"       
          >
            <template slot-scope="scope">
              <span>{{scope.row.hasmore? '否':'是'}}</span>
            </template>
          </el-table-column>   

          <el-table-column
            label="状态"
            prop="state"
            width="120"
            show-overflow-tooltip
            sortable          
          >
            <template slot-scope="scope">
              <span>{{scope.row.state  == 1? '启用':'停用'}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="描述"
            show-overflow-tooltip
            prop="description"
          >
            <template slot-scope="scope">
              <span>{{scope.row.description}}</span>
            </template>
          </el-table-column>                  


          <el-table-column
            label="操作"
            width="250"
            fixed="right"
          >
            <template slot-scope="scope">
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
                @click.native="handleTableSet(scope.row, scope.$index)"
              >物理表设置</el-button>                       

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

      <!-- <common-table-cmp
        ref="display_commonTableCmp"
        :tableHeadData="tableHeadData"
        :tableHandlerData="tableHandlerData"
        :tableData = "tableData"
        :baseKey="baseKey"
        :stopOrUsingTitKey="stopOrUsingTitKey"
        :queryObj.sync = "queryObj"
        :multipleSelection.sync="multipleSelection"
        @refreshTableData = "refreshTableData"        
        @commonTableEmitHandler="commonTableEmitHandler"
      >
      </common-table-cmp> -->

      <!--编辑的弹框--start--->
      <div class="editGroupBox" v-if="showEditGroup">
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
                style="width: 200px"></el-input>
            </el-form-item>   
            <el-form-item label="模块" prop="ModuleCode">
              <el-select 
                :disabled="isAddOrEdit == 1"
                style="width: 200px"
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
                style="width: 200px"
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
                style="width: 200px"
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
            <el-form-item label="描述" prop="description">
              <el-input 
                v-model="formData.description"              
                style="width: 200px" 
                type="textarea" 
                autosize></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch
                v-model="formData.State"                
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-form>        
        </atris-drawer-cmp>
      </div>
      <!---编辑的弹框----end-->

      <!--新增的弹框--start--->
      <div class="addGroupBox" v-if="showAddGroup">
          <!-- formData: {{formData}} -->
          <atris-drawer-cmp
            :tit="dialogTit"    
            :dialog.sync="showAddGroup"  
            @emitClickSureBtn="saveAddDataBase"
          >
            <el-form 
              ref="formAddData" 
              :model="formAddData" 
              label-width="100px"
              slot="container-slot"
              :rules="formRules">
              <el-form-item label="物理表编号" prop="dbcode">
                <el-input 
                  v-model="formAddData.dbcode"
                  placeholder="只允许输入英文字母名称" 
                  style="width: 200px"></el-input>
              </el-form-item>  
              <el-form-item label="物理表名" prop="name">
                <el-input 
                  v-model="formAddData.name"
                  placeholder="输入名称" 
                  style="width: 200px"></el-input>
              </el-form-item>                
              <el-form-item label="描述" prop="description">
                <el-input 
                  v-model="formAddData.description"              
                  style="width: 200px" 
                  type="textarea" 
                  placeholder="输入描述"
                  autosize></el-input>
              </el-form-item>
              <el-form-item label="是否多行">
                <el-switch
                  v-model="formAddData.hasmore"                
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-form>
          </atris-drawer-cmp>
      </div>
      <!---新增的弹框----end-->  

      <!----表设置弹框-start-->
      <el-dialog
        title="物理表设置"
        append-to-body
        fullscreen
        :close-on-click-modal="false"
        v-if="showTableSetDialog"
        :visible.sync="showTableSetDialog"
        class="tableSetWrap"
        :destroy-on-close="true"
      >
        <div slot="title" class="header-title">
          <div class="u-f-jsb u-f-ac topTitleNav">
            <span class="title-age">物理表设置</span>
            <div>
              <save-footer 
                saveBtnSize="mini"
                :isCancel="false"
                @save="saveTableSet"
                @cancel="cancelTableSet"
              ></save-footer>
            </div>
          </div>
        </div>

        <table-set-cmp
          ref="tableSetCmp"
          :objP.sync="currentTableSetRow"
          class="tableSet"
        ></table-set-cmp>
      </el-dialog>
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
          <!-- <field-set-cmp
            :obj="currentFieldSetRow"
          ></field-set-cmp> -->
        </el-dialog>
      </div>
      <!----字段设置弹框---end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/index'
  import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
  import TableSetCmp from './dataBase-cmp/table-set'
  import CommonTableCmp from '@/base/NewStyle-cmp/common-cmp/tableCommon-cmp/tableCommon-cmp'
  import { REQ_OK } from '@/api/config'
  import { 
    getDataBaseList,
    addDataBase,
  } from '@/api/systemManage.js'
  export default {
    components: {
      TableSetCmp,
      CommonTableCmp,
      SearchToolsCmp,
      SaveFooter
    },
    data(){
      let validateDbcode = (rule, value, callback) => {
        debugger
        let reg = /^[A-Za-z]+$/
        if(!this.formAddData.dbcode){
          callback(new Error("物理表名称为空"))
        }else {
          let flag = reg.test(this.formAddData.dbcode)
          if(flag){
            callback()
          }else {
            callback(new Error('物理表名称需全英文'))
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
        multipleSelection: [], 
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
          dbcode:'',
          name: '',
          description: '',
          hasmore: 1
        },
        formRules: {
          name: [{required: true, message: '请输入名称', trigger: ['change','blur']}],
          dbcode: [{required: true, validator: validateDbcode, trigger: ['change','blur']}],
          description: [{required: true, message: '请填写描述', trigger: ['change','blur']}],
        },       
        tableData: [
            {
                property: 'TeamCode',
                TeamCode: '23'
            },
            {
                property: 'State',
                TeamCode: '1'                
            }
        ],
        currentEditRow: {},
        dialogTit: '',
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
      }           
    },
    created(){
        this.initData()
    },
    methods: {
      initData(){
        this._getCommTables() 
      },
      _getCommTables(){
        this.getDataBaseList()
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
      saveTableSet(){
        debugger
        // let resHtml = document.getElementById('middleCmpRef').innerHTML
        // test(document.getElementById('middleCmpRef').innerHTML)
        // this.loading = true
        // 触发 right 组件中的保存方法
        this.$debounce(this.$refs.tableSetCmp.$refs.setModuleCmp.$refs.rightCmpRef.saveControlAttributes())
      },
      cancelTableSet(){

      },
      // 获取物理表列表
      getDataBaseList(){
        this.loading = true
        getDataBaseList().then(res => {
            this.loading = false
            this.tableData = res.data.Data.records
            this.queryObj.total = res.data.Data.total
        })
      },
      closeEditDialog(){
        this.showEditGroup = false
      }, 
      closeAddDialog(){
        this.showAddGroup = false
      },  
      _addDataBase(data){
        addDataBase(data).then(res => {
          this.$message({
            type:'success',
            message:'新增保存成功'
          })
          this._getCommTables()
          this.closeAddDialog()
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
        let length = this.multipleSelection.length
        if(length){
          this.multipleSelection.forEach((item, key) => {
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
      // 物理表设置
      handleTableSet(row, index){
        debugger
        this.currentTableSetRow = JSON.parse(JSON.stringify(row))
        this.showTableSetDialog  = true
      },    
      // 字段设置
      handleFieldSet(row, index){
        this.currentFieldSetRow = JSON.parse(JSON.stringify(row))
        this.showFieldSetDialog  = true
      },
      handleSelectionChange(val){
        this.multipleSelection = val
      },
      // 新增物理表
      handlerAddDataBase(){
        debugger
        this.dialogTit = '新增'
        this.isAddOrEdit = 2 
        this.formAddData = {
          dbcode:'',
          name: '',
          description: '',
          hasmore: 1        
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
            this._addDataBase(this.formData)
          }else {

          }
        })
      },
      cancelGroup(){
        this.showEditGroup = false
      },
      saveAddDataBase(){
        this.$refs.formAddData.validate(valid => {
          if(valid){
            this._addDataBase(this.formAddData)
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
