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
    <div class="componentsManage" v-loading="loading">
      <!-----搜索头--start--->
      <div class="searchBox">
        <el-input 
          style="width:300px"
          placeholder="请输入搜索条件">
        </el-input>
        <el-button type="primary" size="small">搜索</el-button>
      </div>
      <!---搜索头--end-->

      <!---内容区--start-->
      <div class="containerBox">
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

          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>

          <el-table-column
            label="组件名"
            prop="comName"
          >
          </el-table-column>

          <el-table-column
            label="组件码"
            prop="comCode"
          >
          </el-table-column>

          <el-table-column
            label="描述"
            prop="remark"
          >
          </el-table-column>

          <el-table-column
            label="状态"
            prop="status"
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
          <el-form  v-model="currentRowObj">
            <el-form-item  label-width="100">
              <span style="margin-right:10px">组件名</span>
              <el-input v-model="currentRowObj.comName" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label-width="100">
              <span style="margin-right:10px">组件码</span>
              <el-input v-model="currentRowObj.comCode" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label-width="100">
              <span style="margin-right:20px">描述</span>
              <el-input v-model="currentRowObj.remark" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label-width="100">
              <span style="margin-right:20px">状态</span>
              <el-switch v-model="currentRowObj.status"></el-switch>
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
          <el-form  v-model="currentRowObj">
            <el-form-item  label-width="100">
              <span style="margin-right:10px">组件名</span>
              <el-input v-model="currentRowObj.comName" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label-width="100">
              <span style="margin-right:10px">组件码</span>
              <el-input v-model="currentRowObj.comCode" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label-width="100">
              <span style="margin-right:20px">描述</span>
              <el-input v-model="currentRowObj.remark" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label-width="100">
              <span style="margin-right:20px">状态</span>
              <el-switch v-model="currentRowObj.status"></el-switch>
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
        tableData:[
          {
            comName: '菜单详情列表',
            comCode: '78898989-jfdk-32',
            remark: '这是描述文字',
            status: '启用'
          }
        ]
      }
    },
    methods: {
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

