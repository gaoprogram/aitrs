<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--组件管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.componentsManage
  padding 0 20px
  box-sizing border-box
  .searchBox
  .containerBox
    .top
      margin-bottom 10px
      text-align right
</style>

<template>
    <div class="componentsManage">
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
          </el-table-column>                    

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click.native="handlerEdit(scope.row, scope.$index)">编辑</el-button>
              <el-button type="text" size="mini" @click.native="handlerSet(scope.row, scope.$index)">配置</el-button>
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
          <el-form  ref="currentRowObjForm" :model="currentRowObj" :rules="currentRowObjRules" label-width="100px">
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
          title="配置"
          width="80%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showSetComponents"
          custom-class="setComponents"
        >
          <display-group-cmp ref="displayGroupCmp"></display-group-cmp>
        </el-dialog>
      </div>
      <!--配置组件的弹框--end-->

    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import DisplayGroupCmp from '@/components/manage/companySetting/systemSetting/displayGroup/displayGroup'
  import { REQ_OK } from '@/api/config'
  import { 
    getSysComponList 
  } from '@/api/systemManage'
  export default {
    components:{
      SaveFooter,
      DisplayGroupCmp
    },
    data(){
      return {
        loading: false, // loading状态
        showAddNewComponents: false, // 控制新增组件弹框的显示/隐藏
        showEditComponents:false, // 控制编辑组件弹框的显示/隐藏
        showSetComponents: false, // 控制配置弹窗的显示/隐藏
        currentRowObj: {}, // 操作的当前行的对象
        currentRowObjRules: {
          ComponentName: [{required: true, trigger: ['change','blur'], message: '请输入组件名'}],
          ComponentCode: [{required: true, trigger: ['change','blur'], message: '请输入组件码'}],
          Description: [{required: true, trigger: ['change','blur'], message: '请输入备注'}],
          State: [{required: true, trigger: ['change','blur'], message: '请输入状态'}]
        },
        tableData:[
          {
            ComponentName: '菜单详情列表',
            ComponentCode: '78898989-jfdk-32',
            Description: '这是描述文字',
            State: '启用'
          }
        ],
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
      // 获取table数据
      _getSysComponList(){
        this.loading = true
        getSysComponList().then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
            this.queryObj.total = res.data.DataCount
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
        Object.assign(this.currentRowObj, {
          comName: '',
          comCode: '',
          remark: '',
          status: ''
        })
        this.showAddNewComponents = true
      },
      // 配置
      handlerSet(row, index){
        debugger
        this.showSetComponents = true
      },
      // 编辑
      handlerEdit(row, index){
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
      saveAddNew(){

      },
      // 新增取消
      cancelAddNew(){
        this.showAddNewComponents = false
      }
    },
  }
</script>

