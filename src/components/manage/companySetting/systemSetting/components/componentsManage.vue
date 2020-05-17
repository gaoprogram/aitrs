<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--显示组件 [企业]
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.componentsManage
  padding 0 20px
  box-sizing border-box
  .searchBox
    text-align left
  .top
    margin-bottom 10px
</style>

<template>
    <div class="componentsManage animated fadeIn">
      <!-- currentRowObj： {{currentRowObj}} -->
      <!-----搜索头--start--->
      <div class="searchBox">
        <el-input 
          v-model="queryObj.componentName"
          style="width:300px"
          clearable
          placeholder="组件名">
        </el-input>
        <el-select 
          placeholder="基模块"
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
        <el-button type="primary" size="small" @click.native="clickSearchBtn">搜索</el-button>
        <el-button type="primary" size="small" @click.native="clickClearBtn">重置</el-button>
      </div>
      <!---搜索头--end-->

      <!-- queryObj.sysType: {{queryObj.sysType}} -->
      <!---tab标签--->
      <el-tabs 
        v-model="queryObj.sysType" 
        class="marginT10"
        type="card" 
        @tab-click="handleClickTab"
      >
        <el-tab-pane label="系统组件" name="1"></el-tab-pane>
        <el-tab-pane label="企业组件" name="2"></el-tab-pane>
      </el-tabs>      

      <!---内容区--start-->
      <!-- multipleSelection: {{multipleSelection}} -->
      <div class="top clearfix">
        <el-checkbox
          style="float: left"
          @change="handlerSelectBtn"
        >
          停用
        </el-checkbox>  
        <el-button 
          v-if="queryObj.state==0"
          :disabled="!multipleSelection.length"
          style="float: right;margin-right:5px"
          type="primary"
          size="mini"
          @click.native="handlerBathchUsing">
          批量启用
        </el-button>
        <el-button
          v-if="queryObj.state==1"
          :disabled="!multipleSelection.length"
          style="float: right; margin-right:5px"
          type="primary"
          size="mini"
          @click.native="handlerBatchStopUsing"
        >
          批量停用
        </el-button>    
        <el-button 
          style="float: right"
          v-show="queryObj.sysType == 2"
          class="animated fadeIn marginR10"
          type="primary" 
          size="mini"
          @click.native="addNew"
        >
        新增
        </el-button>            
      </div>      

      <!-- tableData: {{tableData}} -->
      <div :class="['containerBox',tableData.length<=0?'not_found':'']" v-loading="loading">
        <el-table
          :data="tableData"
          border
          empty-text=" "
          max-height="450"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>

          <el-table-column
            label="基模块"
            prop="ModuleName"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>          

          <el-table-column
            label="组件名"
            prop="ComponentName"
            sortable
            show-overflow-tooltip            
          >
          </el-table-column>

          <el-table-column
            label="实义名"
            prop="ComponentRealName"
            sortable
            show-overflow-tooltip            
          >
          </el-table-column>         

          <el-table-column
            label="描述"
            prop="Description"
            sortable
            show-overflow-tooltip            
          >
          </el-table-column>

          <el-table-column
            label="状态"
            prop="State"
            sortable
            show-overflow-tooltip            
          >
            <template slot-scope="scope">
              <span v-if="scope.row.State == 1">启用</span>
              <span v-if="scope.row.State == 0">停用</span>
            </template>
          </el-table-column>                    

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button 
                v-show="queryObj.sysType == 2"
                type="text" 
                size="mini" 
                @click.native="handlerEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button 
                type="text" 
                size="mini" 
                @click.native="handlerSet(scope.row, scope.$index)"
              >设置</el-button>
              <el-button 
                v-if="scope.row.State == 1"
                type="text" 
                size="mini" 
                @click.native="handlerStopUsing(scope.row, 0)"
              >停用</el-button>
              <el-button 
                v-if="scope.row.State == 0"
                type="text" 
                size="mini" 
                @click.native="handlerUsing(scope.row, 1)"
              >启用</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页部分-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryObj.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryObj.total">
        </el-pagination>              

      </div>
      <!----内容区--end-->

      <!---新增组件的弹框---start-->
      <div class="addNewComponentsBox" v-if="showAddNewComponents">
        <!-- <el-dialog
          title="新增"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showAddNewComponents"
        > -->
        <atris-drawer-cmp
          v-if="showAddNewComponents"
          tit="新增"    
          :dialog.sync="showAddNewComponents"        
          @emitClickSureBtn="saveAddNew"
        >          
          <el-form  slot="container-slot" ref="currentRowObjForm" :model="addNewObj" :rules="currentRowObjRules" label-width="100px">
            <el-form-item  label="模块" prop="ModuleCode">
              <el-select 
                style="width:300px"
                placeholder="基模块"
                clearable
                v-model="addNewObj.ModuleCode">
                <el-option
                  v-for="(item, key) in moduleSource"
                  :key="key"
                  :label="item.ModuleName"
                  :value="item.ModuleCode"
                >
                </el-option>
              </el-select>              
            </el-form-item>

            <el-form-item  label="组件名" prop="ComponentName">
              <el-input v-model="addNewObj.ComponentName" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item  label="组件码" prop="ComponentCode">
              <el-input v-model="addNewObj.ComponentCode" style="width:300px"></el-input>
            </el-form-item>            

            <el-form-item label="实义名" prop="ComponentRealName">
              <el-input v-model="addNewObj.ComponentRealName" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="Description">
              <el-input  type="textarea" v-model="addNewObj.Description" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-switch 
                v-model="addNewObj.State"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>

            <!-- <div class="footerBox">
              <save-footer @save="saveAddNew" @cancel="cancelAddNew"></save-footer>
            </div>                 -->
          </el-form>          
        <!-- </el-dialog> -->
        </atris-drawer-cmp>
      </div>
      <!---新增组件的弹框--end--->

      <!---编辑组件的弹框---start-->
      <div class="editComponentsBox" v-if="showEditComponents">
        <!-- <el-dialog
          title="编辑"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showEditComponents"
        > -->
        <atris-drawer-cmp
          v-if="showEditComponents"
          tit="编辑"    
          :dialog.sync="showEditComponents"        
          @emitClickSureBtn="saveEdit"
        >          
          <el-form slot="container-slot" ref="currentRowObjForm" :model="currentRowObj" :rules="currentRowObjRules" label-width="100px">
            <el-form-item  label="模块" prop="ModuleCode">
              <el-select 
                style="width:300px"
                placeholder="基模块"
                clearable
                v-model="currentRowObj.ModuleCode">
                <el-option
                  v-for="(item, key) in moduleSource"
                  :key="key"
                  :label="item.ModuleName"
                  :value="item.ModuleCode"
                >
                </el-option>
              </el-select>              
            </el-form-item>

            <el-form-item  label="组件名" prop="ComponentName">
              <el-input v-model="currentRowObj.ComponentName" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item  label="组件码" prop="ComponentCode">
              <el-input v-model="currentRowObj.ComponentCode" style="width:300px"></el-input>
            </el-form-item>            

            <el-form-item label="实义名" prop="ComponentRealName">
              <el-input v-model="currentRowObj.ComponentRealName" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="Description">
              <el-input type="textarea" v-model="currentRowObj.Description" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-switch 
                v-model="currentRowObj.State"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>

            <!-- <div class="footerBox">
              <save-footer @save="saveEdit" @cancel="cancelEdit"></save-footer>
            </div>                 -->
          </el-form>
        <!-- </el-dialog> -->
        </atris-drawer-cmp>
      </div>
      <!---编辑组件的弹框--end--->


      <!--配置组件的弹框----start--->
      <div class="setComponentsBox" v-if="showSetComponents">
        <el-dialog
          title="配置"
          fullscreen
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showSetComponents"
          custom-class="setComponents"
        >
          <components-set-dialog-cmp 
            :obj="currentRowObj"
            :sysType="queryObj.sysType"
          ></components-set-dialog-cmp>
        </el-dialog>
      </div>
      <!--配置组件的弹框--end-->

    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import ComponentsSetDialogCmp from './ComponentsSetDialog-cmp'
  import { REQ_OK } from '@/api/config'
  import { 
    GetModuleList,
    CompComponList,
    SetComComponentInfoState,
    SaveComComponentInfo
  } from '@/api/systemManage'
  export default {
    components:{
      SaveFooter,
      // DisplayGroupCmp
      ComponentsSetDialogCmp
    },
    data(){
      return {
        loading: false, // loading状态
        activeTab: 'isSysCom',
        multipleSelection: [],
        showAddNewComponents: false, // 控制新增组件弹框的显示/隐藏
        showEditComponents:false, // 控制编辑组件弹框的显示/隐藏
        showSetComponents: false, // 控制配置弹窗的显示/隐藏
        currentRowObj: {
          id: 0,
          ModuleCode: '',
          ComponentName: '',
          ComponentCode:'',
          ComponentRealName: '',
          Description: '',
          state: '1'        
        }, // 操作的当前行的对象
        addNewObj: {
          Id: 0,
          ModuleCode: '',
          ComponentName: '',
          ComponentCode:'',
          ComponentRealName: '',
          Description: '',
          State: '1'  
        },        
        currentRowObjRules: {
          ModuleCode: [{required: true, trigger: ['change','blur'], message: '请选择模块'}],
          ComponentName: [{required: true, trigger: ['change','blur'], message: '请输入组件名'}],
          ComponentCode: [{required: true, trigger: ['change','blur'], message: '请输入组件码'}],
          ComponentRealName: [{required: true, trigger: ['change','blur'], message: '请输入组件实义名'}],
          Description: [{required: true, trigger: ['change','blur'], message: '请输入备注'}],
          // State: [{required: true, trigger: ['change','blur'], message: '请输入状态'}]
        },
        tableData:[],
        queryObj: {
          componentName: '',// 组件名
          moduleCode: '', // 模块code
          sysType: '2', // 1 系统  2 企业
          state: 1, // 状态  1启用 0 停用 默认启用
          pageSize: 10,
          pageNum: 1,
          total: 0,
        },
        moduleSource: [], // 基模块下拉源
      }
    },
    created(){
      // 获取table数据
      this._getComTables(this.queryObj.state)
      // 获取基模块下拉源
      this.GetModuleList()
    },
    watch: {
      'queryObj.componentName':{
        handler(newValue, oldValue){
          if(!newValue){
            this.queryObj.componentName = ""
            this._getComTables(this.queryObj.state)
          }
        }
      }
    },
    methods: {
      _getComTables(state){
        this._CompComponList(state)
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
      // 切换tab
      handleClickTab(tab){
        debugger
        this._getComTables(this.queryObj.state)
      },
      // 获取table数据
      _CompComponList(state){
        this.loading = true
        CompComponList(this.queryObj.sysType, this.queryObj.componentName, state, this.queryObj.pageSize, this.queryObj.pageNum, this.queryObj.moduleCode).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data  
            this.queryObj.total = res.data.Total
          }else {
            this.$message({
              type: 'error',
              message: `获取企业组件列表数据失败,${res.data.Error}`
            })
          }
        })
      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._CompComponList(this.queryObj.state)
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._CompComponList(this.queryObj.state)
      },
      // 搜索  
      clickSearchBtn(){
        this._CompComponList(this.queryObj.state)
      },  
      //  重置
      clickClearBtn(){
        this.queryObj.componentName = ""
        this.queryObj.moduleCode = ''
        this._getComTables()
      },
      // 启用/停用 筛选
      handlerSelectBtn(value){
        debugger
        if(value){
          this.queryObj.state = 0
          this.queryObj.pageNum = 1
        }else {
          this.queryObj.state = 1
          this.queryObj.pageNum = 1
        }
        this._getComTables(this.queryObj.state)        
      },         
      // 新增
      addNew(){
        debugger
        Object.assign(this.addNewObj, {
          Id: 0,
          ComponentName: '',
          ComponentCode: '',
          ComponentRealName: '',
          Description: '',
          State: '1'
        })
        this.showAddNewComponents = true
      },
      // 配置
      handlerSet(row, index){
        debugger
        this.currentRowObj = row
        this.showSetComponents = true
      },
      // 编辑
      handlerEdit(row, index){
        debugger
        if(row.State == 1){
          row.State = '1'
        }else if(row.State == 0){
          row.State = '0'
        }
        this.currentRowObj = row
        this.showEditComponents = true
      },
      // 编辑保存
      saveEdit(){
        // 先验证必填项
        this.$refs.currentRowObjForm.validate(valid => {
          if(valid){
            debugger
            SaveComComponentInfo(JSON.stringify(this.currentRowObj)).then(res => {
              if(res && res.data.State ===REQ_OK){
                this.$message.success("编辑组件保存成功")
                this.showEditComponents = false
                this._getComTables(this.queryObj.state)
              }else {
                this.$message.error(`编辑组件保存失败,${res.data.Error}`)
              }
            })   
          }else {

          }
        })     
      },
      // 编辑取消
      cancelEdit(){
        this.showEditComponents = false
      },
      // 新增保存
      _saveComponList(){
        SaveComComponentInfo(JSON.stringify(this.addNewObj)).then(res => {
          if(res && res.data.State ===REQ_OK){
            this.$message.success("新增组件保存成功")
            this.showAddNewComponents = false
            this._getComTables(this.queryObj.state)
          }else {
            this.$message.error(`新增组件保存失败,${res.data.Error}`)
          }
        })
      },
      // 新增保存
      saveAddNew(){
        this.$refs.currentRowObjForm.validate(valid => {
          if(valid){
            // 通过
            this._saveComponList()
          }else {
            // 验证失败
          }
        })
      },
      // 新增取消
      cancelAddNew(){
        this.showAddNewComponents = false
      },
      //启用/停用
      _SetComComponentInfoState(data, type){
        debugger
        let text = type === 1 ? '启用': '停用'
        SetComComponentInfoState(JSON.stringify(data), type, this.queryObj.sysType).then(res => {
            if(res && res.data.State === REQ_OK){
                this.$message.success(`${text}成功`)
                this._CompComponList(this.queryObj.state)
            }else {
                this.$message.error(`${text}失败,${res.data.Error}`)
            }
        }).catch(() => {
            this.$message.warning(`${text}失败`)
        })
      },
      handleSelectionChange(val){
         this.multipleSelection = val
      },
      // 批量启用
      handlerBathchUsing(){
        let str = '', length = this.multipleSelection.length
        if(length){
          this.multipleSelection.forEach((item, key) => {
            if(key != (length - 1)){
              str += item.ComponentName + ','
            }else {
              str += item.ComponentName
            }
          })
        }        
        this.$confirm(`确定要启用"${str}"吗?`, "提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          debugger
          this._SetComComponentInfoState(this.multipleSelection,1)
        }).catch(() => {
          this.$message.info("批量启用已取消")
        })
      },
      //批量停用
      handlerBatchStopUsing(){
        let str = '', length = this.multipleSelection.length
        if(length){
          this.multipleSelection.forEach((item, key) => {
            if(key != (length - 1)){
              str += item.ComponentName + ','
            }else {
              str += item.ComponentName
            }
          })
        }
        this.$confirm(`确定要停用"${str}"吗?`, "提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          debugger
          this._SetComComponentInfoState(this.multipleSelection,0)
        }).catch(() => {
          this.$message.info("批量停用已取消")
        })        
      },
      //启用
      handlerUsing(row, type){
        debugger

        this.currentSetComRow = JSON.parse(JSON.stringify(row))
        // this.currentSetComRow.Updated = new Date().getTime()
        // this.currentSetComRow.Created = new Date().getTime()
        this.$confirm(`确定要启用"${row.ComponentName}"吗?`,"提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            this._SetComComponentInfoState([this.currentSetComRow],1)
        }).catch(() => {
            this.$message.info("启用已取消")
        })
      },
      //停用
      handlerStopUsing(row, type){
        debugger
        this.currentSetComRow = JSON.parse(JSON.stringify(row))     
        // this.currentSetComRow.Updated = new Date().getTime()
        // this.currentSetComRow.Created = new Date().getTime()               
        this.$confirm(`确定要停用"${row.ComponentName}"吗?`,"提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {              
            this._SetComComponentInfoState([this.currentSetComRow],0)
        }).catch(() => {
            this.$message.info("停用已取消")
        })
      },      
    },
  }
</script>

