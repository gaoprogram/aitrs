<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--组件管理 [系统]
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.componentsManage
  padding 0 20px
  box-sizing border-box
  .searchBox
    text-align left !important
  .containerBox
    .top
      margin-bottom 10px
      text-align right
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
          placeholder="请输入搜索条件">
        </el-input>
        <el-button type="primary" size="small" @click.native="clickSearchBtn">搜索</el-button>
      </div>
      <!---搜索头--end-->

      <!---内容区--start-->
      <div class="containerBox" v-loading="loading">
        <div class="top">
          <el-button 
            type="primary" 
            size="mini"
            @click.native="addNew"
          >
          新增
          </el-button>
        </div>

        <el-table
          :data="tableData"
          max-height="600"
          border
        >
          <!-- <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column> -->

          <el-table-column
            label="组件名"
            prop="ComponentName"
          >
          </el-table-column>

          <el-table-column
            label="组件码"
            prop="ComponentCode"
          >
          </el-table-column>

          <el-table-column
            label="描述"
            prop="Description"
          >
          </el-table-column>

          <el-table-column
            label="状态"
            prop="State"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.State == 1">
                  启用
              </span>
              <span v-if="scope.row.State == 0">
                  停用
              </span>              
            </template>
          </el-table-column>                    

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button 
                type="text" 
                size="mini" 
                @click.native="handlerEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button 
                type="text" 
                size="mini" 
                @click.native="handlerSet(scope.row, scope.$index)"
              >配置</el-button>
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
                @click.native="handlerStopUsing(scope.row, 0)"
              >停用</el-button>
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
        <el-dialog
          title="新增"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showAddNewComponents"
        >
          <el-form  ref="currentRowObjForm" :model="addNewObj" :rules="currentRowObjRules" label-width="100px">
            <el-form-item  label="组件名" prop="ComponentName">
              <el-input v-model="addNewObj.ComponentName" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="组件码" prop="ComponentCode">
              <el-input v-model="addNewObj.ComponentCode" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="Description">
              <el-input v-model="addNewObj.Description" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-switch 
                v-model="addNewObj.State"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>

            <div class="footerBox">
              <save-footer @save="saveAddNew" @cancel="cancelAddNew"></save-footer>
            </div>                
          </el-form>          
        </el-dialog>
      </div>
      <!---新增组件的弹框--end--->

      <!---编辑组件的弹框---start-->
      <div class="editComponentsBox" v-if="showEditComponents">
        <el-dialog
          title="编辑"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showEditComponents"
        >
          <el-form ref="currentRowObjForm" :model="currentRowObj" :rules="currentRowObjRules" label-width="100px">
            <el-form-item  label="组件名" prop="ComponentName">
              <el-input v-model="currentRowObj.ComponentName" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="组件码" prop="ComponentCode">
              <el-input v-model="currentRowObj.ComponentCode" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="Description">
              <el-input v-model="currentRowObj.Description" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-switch 
                v-model="currentRowObj.State"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>

            <div class="footerBox">
              <save-footer @save="saveEdit" @cancel="cancelEdit"></save-footer>
            </div>                
          </el-form>
        </el-dialog>
      </div>
      <!---编辑组件的弹框--end--->


      <!--配置组件的弹框----start--->
      <div class="setComponentsBox" v-if="showSetComponents">
        <el-dialog
          title="配置"
          width="80%"
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
    getSysComponList,
    setComponentsState,
    saveSysComponList
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
        showAddNewComponents: false, // 控制新增组件弹框的显示/隐藏
        showEditComponents:false, // 控制编辑组件弹框的显示/隐藏
        showSetComponents: false, // 控制配置弹窗的显示/隐藏
        currentRowObj: {
          comName: '',
          comCode: '',
          remark: '',
          status: ''          
        }, // 操作的当前行的对象
        addNewObj: {
          Id: 0,
          ComponentName: '',
          ComponentCode: '',
          Description: '',
          State: '1' 
        },
        currentRowObjRules: {
          ComponentName: [{required: true, trigger: ['change','blur'], message: '请输入组件名'}],
          ComponentCode: [{required: true, trigger: ['change','blur'], message: '请输入组件码'}],
          Description: [{required: true, trigger: ['change','blur'], message: '请输入备注'}],
          State: [{required: true, trigger: ['change','blur'], message: '请输入状态'}]
        },
        tableData:[],
        queryObj: {
          componentName: '',// 组件名
          state: 1, // 状态  1启用 0 停用 默认启用
          pageSize: 1,
          pageNum: 10,
          total: 0,
        }
      }
    },
    created(){
      // 获取table数据
      this._getSysComponList()
    },
    methods: {
      _getComTables(){
        this._getSysComponList()
      },
      // 获取table数据
      _getSysComponList(){
        this.loading = true
        getSysComponList().then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
            this.queryObj.total = res.data.Total
          }else {
            this.$message({
              type: 'error',
              message: `获取组件列表数据失败,${res.data.Error}`
            })
          }
        })
      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getSysComponList()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._getSysComponList()
      },
      // 搜索  
      clickSearchBtn(){
        this._getSysComponList()
      },     
      // 新增
      addNew(){
        debugger
        Object.assign(this.addNewObj, {
          Id: 0,
          ComponentName: '',
          ComponentCode: '',
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
        row.State = row.State == 1 ? '1': '0'
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        this.showEditComponents = true
      },
      // 编辑保存
      _saveEditComponList(){
        saveSysComponList(JSON.stringify(this.currentRowObj)).then(res => {
          if(res && res.data.State ===REQ_OK){
            this.$message.success("编辑组件保存成功")
            this.showEditComponents = false
            this._getComTables()
          }else {
            this.$message.error(`编辑组件保存失败,${res.data.Error}`)
          }
        })        
      },
      // 编辑保存
      saveEdit(){
        this._saveEditComponList()
      },
      // 编辑取消
      cancelEdit(){
        this.showEditComponents = false
      },
      // 新增保存
      _saveSysComponList(){
        debugger
        saveSysComponList(JSON.stringify(this.addNewObj)).then(res => {
          if(res && res.data.State ===REQ_OK){
            this.$message.success("新增组件保存成功")
            this.showAddNewComponents = false
            this._getComTables()
          }else {
            this.$message.error(`新增组件保存失败,${res.data.Error}`)
          }
        })
      },      
      // 新增保存
      saveAddNew(){
        debugger 
        this.$refs.currentRowObjForm.validate(valid => {
          if(valid){
            // 通过
            this._saveSysComponList()
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
      _setComponentsState(data, type){
        debugger
          let text = type === 1 ? '启用': '停用'
          setComponentsState(JSON.stringify(data), type).then(res => {
              if(res && res.data.State === REQ_OK){
                  this.$message.success(`${text}成功`)
                  this._getComTables()
              }else {
                  this.$message.error(`${text}失败,${res.data.Error}`)
              }
          }).catch(() => {
              this.$message.warning(`${text}失败`)
          })
      },
      //启用
      handlerUsing(row, type){
        debugger
        this.currentSetComRow = JSON.parse(JSON.stringify(row))
        this.$confirm(`确定要启用"${row.ComponentName}"吗?`,"提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            this._setComponentsState([this.currentSetComRow],type)
        }).catch(() => {
            this.$message.info(`"${row.ComponentName}"启用已取消`)
        })
      },
      //停用
      handlerStopUsing(row, type){
        this.currentSetComRow = JSON.parse(JSON.stringify(row))              
        this.$confirm(`确定要停用"${row.ComponentName}"吗?`,"提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {              
            this._setComponentsState([this.currentSetComRow],type)
        }).catch(() => {
            this.$message.info(`"${row.ComponentName}"停用已取消`)
        })
      },         
    },
  }
</script>

