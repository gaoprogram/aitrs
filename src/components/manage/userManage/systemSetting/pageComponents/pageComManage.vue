<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--页面组件管理 [企业]
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.componentsManage
  padding 0 20px
  box-sizing border-box
  .searchBox
  .containerBox
    .top
      margin-bottom 10px
</style>

<template>
    <div class="componentsManage animated fadeIn">
      <!-- currentRowObj： {{currentRowObj}} -->
      <!-----搜索头--start--->
      <!-- pageOptions: {{pageOptions}} -->
      <div class="searchBox">
        <el-input 
          clearable
          v-model="queryObj.key"
          style="width:200px"
          placeholder="页面名,组件名">
        </el-input>

        <el-select 
          clearable
          v-model="queryObj.pageCode" 
          placeholder="请选择">
          <el-option
            v-for="(item, key) in pageOptions"
            :key="key"
            :value="item.PageCode"
            :label="item.Title"
          >
          </el-option>
        </el-select>

        <el-button 
          type="primary" 
          @click.native="clickSearchBtn"
        >搜索</el-button>
      </div>
      <!---搜索头--end-->

      <!---内容区--start-->
      <div :class="['containerBox','marginT10',tableData.length<=0? 'not_found':'']" v-loading="loading">
        <div class="top">
          <el-checkbox
            @change="handlerSelectBtn"
          >
            停用
          </el-checkbox>

          <el-button 
            size="mini"
            type="primary" 
            @click.native="addNew"
          >
          新增
          </el-button>

          <el-button 
            style="float:right;margin-bottom:10px"
            v-show="queryObj.state ==1"
            type="primary" 
            size="mini"
            @click.native="batchStopUsing"
            >
            批量停用
          </el-button>

          <el-button 
            style="float:right;margin-bottom:10px"
            v-show="queryObj.state ==0"
            type="primary" 
            size="mini"
            @click.native="batchStartUsing"
            >
            批量启用
          </el-button>          
        </div>

        <el-table
          :data="tableData"
          max-height="600"
          empty-text=" "
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>

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
              <!-- <el-button type="text" size="mini" @click.native="handlerEdit(scope.row, scope.$index)">编辑</el-button> -->
              <el-button type="text" size="mini" 
                @click.native="handlerSet(scope.row, scope.$index)"
              >配置</el-button>
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
            :total="total">
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
              <el-switch v-model="currentRowObj.State"></el-switch>
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
          fullscreen
          title="配置"
          width="80%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showSetComponents"
          custom-class="setComponents"
        >
          <page-com-set-cmp :obj="currentRowObj"></page-com-set-cmp>
        </el-dialog>
      </div>
      <!--配置组件的弹框--end-->

    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import PageComSetCmp from './pageComSetDialog-cmp'
  import { REQ_OK } from '@/api/config'
  import { 
    getSysPageListOption,
    CompPageComponList,
    SetComPageComponentConfigState,
    SaveComPageComponentConfig
  } from '@/api/systemManage'
  export default {
    components:{
      SaveFooter,
      PageComSetCmp
    },
    data(){
      return {
        loading: false, // loading状态
        showAddNewComponents: false, // 控制新增组件弹框的显示/隐藏
        showEditComponents:false, // 控制编辑组件弹框的显示/隐藏
        showSetComponents: false, // 控制配置弹窗的显示/隐藏
        pageOptions: [],  // 搜索条件页面数据源下拉列表
        currentRowObj: {
          id: 0,
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
          State: 1  
        },        
        currentRowObjRules: {
          ComponentName: [{required: true, trigger: ['change','blur'], message: '请输入组件名'}],
          ComponentCode: [{required: true, trigger: ['change','blur'], message: '请输入组件码'}],
          Description: [{required: true, trigger: ['change','blur'], message: '请输入备注'}],
          State: [{required: true, trigger: ['change','blur'], message: '请输入状态'}]
        },
        tableData:[],
        multipleSelection: [],
        total: 0,
        queryObj: {
          key: '', // 搜索关键词
          pageCode: '', // 页面
          state: 1, // 状态  1启用 0 停用 默认启用
          pageSize: 10,
          pageNum: 1
        }
      }
    },
    created(){
      // 获取 搜索条件中的页面下拉源
      this._getSysPageListOption()
      // 获取table数据
      this._CompPageComponList()
    },
    methods: {
      _getComTables(){
        this._CompPageComponList()
      },
      handlerSelectBtn(value){
        if(value){
          this.queryObj.state = 0
          this.queryObj.pageNum = 1
        }else {
          this.queryObj.state = 1
          this.queryObj.pageNum = 1
        }
        this._getComTables()        
      },
      // 批量停用
      batchStopUsing(){
        if(!this.multipleSelection.length){
          return this.$message.warning("请先勾选要停用的页面组件")
        }
        this.$confirm("确定要批量停用吗？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._SetComPageComponentConfigState(this.multipleSelection, 0, this.multipleSelection[0].SysType)
        }).catch(() => {
          this.$message.info("批量停用已取消成功")
        })
      },
      // 批量启用
      batchStartUsing(){
        if(!this.multipleSelection.length){
          return this.$message.warning("请先勾选要启用的页面组件")
        }
        this.$confirm("确定要批量启用吗？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._SetComPageComponentConfigState(this.multipleSelection, 1, this.multipleSelection[0].SysType)
        }).catch(() => {
          this.$message.info("批量启用已取消成功")
        })
      },      
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 获取搜索条件中的页面下拉源
      _getSysPageListOption(){
        debugger
        getSysPageListOption().then(res => {
          if(res && res.data.State === REQ_OK){
            this.pageOptions = res.data.Data
            this.total = res.data.Total
          }else {
            this.$message.error(`获取页面搜索下拉源数据失败,${res.data.Error}`)
          }
        })
      },
      // 获取table数据
      _CompPageComponList(){
        this.loading = true
        debugger
        CompPageComponList(this.queryObj.key, this.queryObj.pageCode,this.queryObj.state,this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
          debugger
          // console.log(key)
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
            this.total = res.data.Total
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
        this._CompPageComponList()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._CompPageComponList()
      },
      // 搜索  
      clickSearchBtn(){
        this._CompPageComponList()
      },     
      // 新增
      addNew(){
        debugger
        this.addNewObj = {
          Id: 0,
          ComponentName: this.queryObj.pageCode,
          ComponentCode: '',
          Description: '',
          State: "1"
        }

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
        this.currentRowObj = row
        this.showEditComponents = true
      },
      // 编辑保存
      saveEdit(){

      },
      // 编辑取消
      cancelEdit(){
        this.showEditComponents = false
      },
      // 新增保存
      _saveComponList(){
        SaveComPageComponentConfig(JSON.stringify(this.addNewObj)).then(res => {
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
      _SetComPageComponentConfigState(data, type, sysType){
          let text = type === 1 ? '启用': '停用'
          SetComPageComponentConfigState(JSON.stringify(data), type, sysType).then(res => {
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
        this.$confirm("确定要启用吗?","提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            this._SetComPageComponentConfigState([this.currentSetComRow],1, this.currentSetComRow.SysType)
        }).catch(() => {
            this.$message.info("启用已取消")
        })
      },
      //停用
      handlerStopUsing(row, type){
        this.currentSetComRow = JSON.parse(JSON.stringify(row))              
        this.$confirm("确定要停用吗?","提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {              
            this._SetComPageComponentConfigState([this.currentSetComRow],0, this.currentSetComRow.SysType)
        }).catch(() => {
            this.$message.info("停用已取消")
        })
      },      
    },
  }
</script>

