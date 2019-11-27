<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--角色管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.roleManage
  padding 0 20px
  box-sizing border-box
  .containerWrap
    .topBtnBox
      margin-bottom 10px
      text-align right
</style>

<template>
    <div class="roleManage" v-loading = 'loading'>
      <div class="containerWrap">

        <div class="searchBox marginB10">
          <el-input placeholder="角色" style="width: 300px"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClickTabs">
          <el-tab-pane label="平台业务角色" name="first">平台业务角色</el-tab-pane>
          <el-tab-pane label="系统企业角色" name="second">系统企业角色</el-tab-pane>
        </el-tabs>    


        <div class="topBtnBox">
          <el-button type="primary" size="mini" @click.native="addNewRole">新增角色</el-button>
          <el-button type="primary" size="mini" @click.native="copyRole">复制角色</el-button>
          <el-button type="primary" size="mini" @click.natvie="exportRole">导出</el-button>
        </div>

        <el-table 
          style="width: 100%"
          :data="tableData"
          border
        >
          <el-table-column
            prop="roleName"
            label="角色名称"
            sortable
          ></el-table-column>

          <el-table-column
            prop="roleType"
            label="角色类型"
            sortable
          ></el-table-column>

          <el-table-column
            prop="remarks"
            label="备注"
            show-overflow-tooltip
          ></el-table-column>    

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="mini">编辑</el-button>
              <el-button type="text" size="mini">启用/停用</el-button>
              <el-button type="text" size="mini">许可权限</el-button>
              <el-button type="text" size="mini">用户/组</el-button>
            </template>
          </el-table-column>      
        </el-table>    
      </div>


      <div class="addNewRole" v-if="showAddNewRole">
        <el-dialog
          title="新增角色"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showAddNewRole"
        >
          <el-form label-width="100">
            <el-form-item label="角色名">
              <el-input placeholder="请输入角色名称" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="角色编号">
              <el-button type="text">系统生成</el-button>
            </el-form-item>

            <el-form-item label="说明">
              <el-input
                style="width:300px"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              >
              </el-input>              
            </el-form-item>

            <el-form-item label="状态">
              <el-switch></el-switch>
            </el-form-item>            

          </el-form>

          <div>
            <save-footer @save="saveAdd" @cancel="cancelAdd"></save-footer>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    components:{
      SaveFooter
    },
    data(){
      return {
        loading: false, // loading状态
        activeName: 'first',
        showAddNewRole: false, // 控制新增角色弹框显示/隐藏
        tableData: [
          {
            roleName: '企业管理员',
            roleType: '系统角色',
            remarks: '备注内容'
          },
        ]
      }
    },
    methods: {
      // 切换tab
      handleClickTabs(tab){

      },
      // 新增角色
      addNewRole(){
        debugger
        this.showAddNewRole = true
      },
      // 复制角色
      copyRole(){

      },
      // 导出
      exportRole(){

      },
      // 保存新增
      saveAdd(){

      },
      // 取消新增
      cancelAdd(){

      },
    },
  }
</script>
