<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--企业角色 [企业]
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
        <!-- queryObj: {{queryObj}} -->
        <!-- <div class="searchBox marginB10">
          <el-input 
            clearable
            v-model="queryObj.roleName" 
            placeholder="角色" 
            style="width: 300px"
          ></el-input>

          <el-cascader
            v-model="queryObj.roleGroup"
            placeholder="请选择角色组"
            :options="roleGroupOpitions"
            :props="props"
            :collapse-tags="true"
            clearable>
          </el-cascader>          

          <el-button type="primary" @click.native="handlerSearch">搜索</el-button>
        </div> -->

        <el-tabs v-model="queryObj.roleType" type="card" @tab-click="handleClickTabs">
          <el-tab-pane label="系统企业角色" name="2"></el-tab-pane>
          <el-tab-pane label="企业自定义角色" name="1"></el-tab-pane>
        </el-tabs>    


        <div class="topBtnBox">
          <!-- queryObj.state: {{queryObj.state}} -->
          <el-checkbox 
            v-model="queryObj.state" 
            @change="handlerChangeSelect"
            style="float:left">
            停用
          </el-checkbox>

          <el-button 
            type="primary" 
            size="mini" 
            @click.native="addNewRole"
          >
            新增角色
          </el-button>
          <el-button 
            :disabled="!multipleSelection.length"
            type="primary" 
            size="mini" 
            @click.native="copyRole"
          >
            复制角色
          </el-button>
          <el-button 
            type="primary" 
            size="mini" 
            :disabled="!multipleSelection.length"
            @click.native="exportRole"
          >
          导出
          </el-button>
        </div>


        <!-- tableData: {{tableData}} -->
        <div :class="['tableBox', tableData.length<=0?'not_found':'']" v-loading="loading">
          <el-table 
            style="width: 100%"
            max-height="600px"
            :data="tableData"
            empty-text=" "
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            >

            </el-table-column>

            <el-table-column
              prop="RoleName"
              label="角色名称"
              sortable
            ></el-table-column>

            <el-table-column
              prop="RoleType"
              label="角色类型"
              sortable
            >
              <template slot-scope="scope">
                <span v-if="scope.row.RoleType == 1">
                  系统角色
                </span >
                <span v-if="scope.row.RoleType == 2">
                  企业自定义角色
                </span >                
              </template>
            </el-table-column>

            <el-table-column
              prop="Description"
              label="备注"
              show-overflow-tooltip
            ></el-table-column>    

            <el-table-column
              prop="State"
              label="状态"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span 
                  v-if="scope.row.State == 1"
                  @click.native="handlerStartUsing(scope.row)"
                >
                  启用
                </span>
                <span 
                  @click.native="handlerStopUsing(scope.row)"
                  v-if="scope.row.State == 0">
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
                  @click.native="hanlderEdit(scope.row)"
                >编辑</el-button>
                <el-button 
                  type="text" 
                  size="mini" 
                  v-if="scope.row.State == 0"
                  @click.native="handlerStartUsing(scope.row)"
                >
                启用
                </el-button>
                <el-button 
                  type="text" 
                  size="mini" 
                  v-if="scope.row.State == 1"
                  @click.native="handlerStopUsing(scope.row)"
                >停用</el-button>
                <el-button 
                  type="text" 
                  size="mini"
                  @click.native="handlerPermitRights(scope.row)"  
                >
                  许可权限
                </el-button>
                <el-button 
                  type="text" 
                  size="mini"
                  @click.native="handlerUserOrGroup(scope.row)">
                  用户/组
                </el-button>
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
       
      </div>

      <!---新增角色弹框---->
      <div class="addNewRole" v-if="showAddNewRole">
        <el-dialog
          title="新增角色"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showAddNewRole"
        >
          <!-- addRoleObj: {{addRoleObj}} -->
          <el-form ref="addRoleForm" label-width="120px" :model="addRoleObj" :rules="addRoleForm">
            <el-form-item label="角色名" prop="RoleName">
              <el-input 
                v-model="addRoleObj.RoleName"
                placeholder="请输入角色名称" 
                style="width:300px">
              </el-input>
            </el-form-item>

            <el-form-item label="角色编号">
              <el-button type="text">系统生成</el-button>
            </el-form-item>

            <el-form-item label="说明" prop="Description">
              <el-input
                v-model="addRoleObj.Description"
                style="width:300px"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              >
              </el-input>              
            </el-form-item>

            <el-form-item label="状态">
              <el-switch
                v-model="addRoleObj.State"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>            

          </el-form>

          <div>
            <save-footer @save="saveAdd" @cancel="cancelAdd"></save-footer>
          </div>
        </el-dialog>
      </div>
      <!---新增角色弹框--->

      <!--编辑角色弹框--->
      <div class="editRoleBox animated fadeIn" v-if="showEditRole">
        <el-dialog
          :title="editRoleDialogTit"
          width="40%"
          append-to-body
          :visible.sync="showEditRole"
          :close-on-click-modal="false"
        >
          <company-role-Edit-info-cmp
            ref="companyRoleEditInfoCmp"
            :obj="currentRowObj"
            :strFlag = 'strFlag'
            @roleInfoSaveSuccess="roleInfoSaveSuccess"
          >
          </company-role-Edit-info-cmp>

          <!-- <div class="footer">
            <save-footer @save="saveEdit" @cancel="cancelEdit"></save-footer>
          </div> -->
        </el-dialog>
      </div>
      <!---编辑角色弹框-->
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyRoleEditInfoCmp from './roleManage-cmp/common-roleEditInfo-cmp'
  import {  REQ_OK, BASE_URL } from '@/api/config'
  import { mapGetters } from 'vuex'
  import { 
    getSelectCompRoleG,
    compRoleMgtList,
    addComRole
  } from '@/api/systemManage'
  export default {
    components:{
      SaveFooter,
      CompanyRoleEditInfoCmp
    },
    data(){
      return {
        loading: false, // loading状态
        showAddNewRole: false, // 控制新增角色弹框显示/隐藏
        showEditRole: false, // 编辑角色的弹框 显示/隐藏
        roleGroupOpitions: [],  //搜索框中 角色组下拉源
        props: { multiple: true },
        tableData: [],
        currentRowObj: {},  
        addRoleObj: {
          RoleName: '',
          Description: '',
          State: '1'
        },
        multipleSelection: [],
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          roleName:'',
          roleGroup: [],
          roleType: '2',
          state: false,
        },
        addRoleForm: {
          RoleName: [{required: true, message: '请填写角色名称', trigger: 'blur'}],
          Description: [{required: true, message: '请填写备注', trigger: 'blur'}],
        },
        strFlag: '',  // 'roleInfo'  'permitRights'
        editRoleDialogTit: '', 
      }
    },
    created(){
      this.$bus.$on("closeDialog", () => {
        this.showEditRole = false
      })
      // 获取 搜索条件中的 角色组下拉源
      this._getSelectCompRoleG()
      // 获取table 列表数据
      this._getComTables()
    },
    beforeDestroy(){
      this.$bus.$off("closeDialog")
    },
    computed: {
      ...mapGetters([
        'userCode',
        'companyCode'
      ])
    },
    watch: {

    },
    methods: {
      _getComTables(){
        this._compRoleMgtList()
      },
      handleSelectionChange(val){
         this.multipleSelection = val
      },
      _changeData(roleGroupOpitions){
        if(roleGroupOpitions && roleGroupOpitions.length){
          roleGroupOpitions.forEach((item, key) => {
            this.$set(item, 'label', item.RoleGroupName)
            this.$set(item, 'value', item.RoleGroupCode)
            this.$set(item, 'children', item.Children)
            if(item.Children && item.Children.length){
              this._changeData(item.Children)
            }else {
              delete item.children
            }
          })
        }else {

        }
      },
      // 获取角色组下拉源
      _getSelectCompRoleG(){
        getSelectCompRoleG().then(res => {
          if(res && res.data.State === REQ_OK){
            this.roleGroupOpitions = res.data.Data
            this._changeData(this.roleGroupOpitions)
          }else {
            this.$message.error(`获取角色组下拉源数据失败,${res.data.Error}`)
          }
        })
      },
      // 获取列表数据
      _compRoleMgtList(){
        debugger
        this.loading = true
        let {
          pageSize,
          pageNum,
          roleName,
          roleType,
          state,          
        } = this.queryObj
        if(!state){
          state = 1
        }else {
          state = 0
        }
        compRoleMgtList(roleName, roleType, state, pageSize, pageNum).then(res => {
          debugger
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
            this.queryObj.total = res.data.Total
          }else {
            this.$message.error(`获取列表数据失败,${res.data.Error}`)
          }
        })
      },
      // 搜索
      handlerSearch(){
        this._getComTables()
      },
      // 编辑
      hanlderEdit(row){
        debugger
        this.currentRowObj = row
        this.strFlag = 'roleInfo'
        this.editRoleDialogTit = '编辑角色'
        this.showEditRole = true
      },
      roleInfoSaveSuccess(){
        this._getComTables()
      },
      // 许可权限
      handlerPermitRights(row){
        this.currentRowObj = row
        this.strFlag = 'permitRights'
        this.editRoleDialogTit = '编辑许可权'
        this.showEditRole = true
      },
      // 用户/组
      handlerUserOrGroup(row){
        this.currentRowObj = row
        this.strFlag = 'userOrGroup'
        this.editRoleDialogTit = '编辑用户/组'
        this.showEditRole = true        
      },
      // 启用/停用
      _setComRoleState(type){
        let text = type = 1 ? '启用':'停用'
        this.loading = true
        setComRoleState(this.currentRowObj.Id, type).then(res => {
          debugger
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.$message.success(`${text}成功`)
            this._getComTables()
          }else {
            this.$message.error(`${text}失败,${res.data.Error}`)
          }
        }).catch(() => {

        })
      },
      // 启用
      handlerStartUsing(row){
        this.currentRowObj = row
        this.$confirm(`确定要启用[${row.RoleName}]吗？`, "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._setComRoleState(1)
        }).catch(() => {
          this.$message.info("已取消")
        })
      },
      // 停用
      handlerStopUsing(row){
        this.currentRowObj = row
        this.$confirm(`确定要停用[${row.RoleName}]吗？`, "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          this._setComRoleState(0)
        }).catch(() => {
          this.$message.info("已取消")
        })        
      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getComTables()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._getComTables()
      },      
      // 切换tab
      handleClickTabs(tab){
        debugger
        this.queryObj.roleType = tab.name
        this._getComTables()
      },
      // 勾选/取消勾选
      handlerChangeSelect(value){
        debugger
        if( value ){
          // gouxuan
          this.queryObj.state = true
          this._getComTables()
        }else {
          // 取消勾选
          this.queryObj.state = false
          this._getComTables()
        }
      },
      // 新增角色
      addNewRole(){
        debugger
        this.addRoleObj = {
          RoleName: '',
          Description: '',
          State: '1'          
        }
        this.showAddNewRole = true
      },

      // 复制角色
      copyRole(){

      },
      // 导出
      exportRole(){
        debugger
        let roleName = ''
        let roleType = 2
        let state = 1
        let url = `${BASE_URL}/SystemManage/CompRoleMgtList?Method=ExportComRole&TokenId=&UserNo=${this.userCode}&CompanyCode=${this.companyCode}&roleName=${roleName}&roleType=${roleType}&state=${state}`
        window.open(url)        
      },
      // 新增角色保存
      _addComRole(){
        debugger
        addComRole(JSON.stringify(this.addRoleObj)).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.$message.success("新增角色保存成功")
            this.showAddNewRole = false
            this._getComTables()
          }else{
            this.$message.error(`新增角色保存失败,${res.data.Error}`)
          }
        })
      },
      // 保存新增
      saveAdd(){
        debugger
        this.$refs.addRoleForm.validate(valid => {
          if(valid){
            this._addComRole()
          }else {

          }
        })
      },
      // 取消新增
      cancelAdd(){
        this.showAddNewRole = false
      },
    },
  }
</script>
