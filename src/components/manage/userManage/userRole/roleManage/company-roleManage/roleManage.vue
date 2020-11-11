<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--角色管理/企业角色 [企业]

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
    <div class="roleManage">
      <div class="containerWrap">
        <!-- queryObj: {{queryObj}} -->
        <div class="searchBox marginB10">
          <!-- <el-input 
            clearable
            v-model="queryObj.roleName" 
            placeholder="角色" 
            style="width: 300px"
          ></el-input> -->

          <!-- roleOptions: {{roleOptions}}
          ---
          queryObj.roleName: {{queryObj.roleName}} -->
          <!-- <el-cascader
            v-model="queryObj.roleName"
            placeholder="按角色查看"
            :options="roleOptions"
            filterable
            :props="{
              value: 'RoleGroupCode',
              label: 'RoleGroupName',
              children: 'children'
            }"
            :collapse-tags="true"
            clearable>
          </el-cascader>    -->
          <el-input 
            placeholder="角色名"
            clearable
            style="width: 220px"
            v-model="queryObj.roleName"
          ></el-input>


          <!-- roleGroupOptions: {{roleGroupOptions}}
          ---
          queryObj.roleGroupCode: {{queryObj.roleGroupCode}} -->
          <el-cascader 
            v-model="queryObj.roleGroupCode"
            placeholder="按角色组查看"
            :options="roleGroupOptions"
            filterable
            :props="{
              value: 'RoleGroupCode',
              label: 'RoleGroupName',
              children: 'children'
            }"
            :collapse-tags="true"
            clearable
          >
          </el-cascader>
          
          <el-button type="primary" @click.native="handlerSearch">搜索</el-button>
          <el-button type="primary" @click.native="handlerReset">重置</el-button>
        </div>

        <el-tabs v-model="queryObj.roleType" type="card" @tab-click="handleClickTabs">
          <el-tab-pane label="系统企业角色" name="1"></el-tab-pane>
          <el-tab-pane label="企业自定义角色" name="2"></el-tab-pane>
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
            v-if="queryObj.roleType == 2"
            type="primary" 
            size="mini" 
            @click.native="addNewRole"
          >
            新增角色
          </el-button>

          <el-button 
            :disabled="!multipleSelection.length || multipleSelection.length != 1"
            type="primary" 
            size="mini" 
            @click.native="copyRole"
          >
            复制角色
          </el-button>

          <el-button 
            type="primary" 
            size="mini" 
            @click.native="exportRole"
          >
          导出
          </el-button>
        </div>


        <!-- tableData: {{tableData}} -->
        <div 
          :class="['tableBox', tableData.length<=0?'not_found':'']" 
          v-loading="loading">
          <el-table 
            style="width: 100%"
            max-height="450px"
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
              label="描述"
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
                  @click.native="handlerScan(scope.row)"
                >查看</el-button>                
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
        <!-- <el-dialog
          title="新增角色"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showAddNewRole"
        > -->
        <atris-drawer-cmp
          v-if="showAddNewRole"
          tit="新增角色"    
          :dialog.sync="showAddNewRole"        
          @emitClickSureBtn="saveAdd"
        >            
          <!-- addRoleObj: {{addRoleObj}} -->
          <el-form slot="container-slot" ref="addRoleForm" label-width="120px" :model="addRoleObj" :rules="addRoleForm">
            <el-form-item label="角色名" prop="RoleName">
              <el-input 
                v-model="addRoleObj.RoleName"
                placeholder="请输入角色名称" 
                style="width:300px">
              </el-input>
            </el-form-item>

            <el-form-item label="编号">
              <el-button type="text">系统生成</el-button>
            </el-form-item>

            <el-form-item label="角色类型">
              <el-select style="width:300px" v-model="addRoleObj.RoleType">
                <el-option 
                  v-for="(item, key) in roleTypeOptions"
                  :key="key"
                  :value="item.value"
                  :label="item.label"
                >
                  
                </el-option>
              </el-select>
            </el-form-item>      

            <el-form-item label="角色级别">
              <el-select style="width:300px" v-model="addRoleObj.RoleLevel">
                <el-option 
                  v-for="(item, key) in roleLevelOptions"
                  :key="key"
                  :value="item.value"
                  :label="item.label"
                >
                  
                </el-option>
              </el-select>
            </el-form-item>                  

            <el-form-item label="描述" prop="Description">
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
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>            

          </el-form>

          <!-- <div>
            <save-footer @save="saveAdd" @cancel="cancelAdd"></save-footer>
          </div>
        </el-dialog> -->
        </atris-drawer-cmp>
      </div>
      <!---新增角色弹框--->

      <!--复制角色--->
      <div>
        <el-dialog 
          title="复制角色"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showCopyRole"        
        >
        <!-- copyRoleForm: {{copyRoleForm}} -->
          <el-form ref="copyRoleForm" :model="copyRoleForm" :rules="copyRoleRules" label-width="80px">
            <el-form-item label="角色名" prop="name">
              <el-input placeholder="角色名" clearable v-model="copyRoleForm.name">
              </el-input>
            </el-form-item>

            <div class="footer">
              <save-footer @save="saveCopy" @cancel="cancelCopy"></save-footer>
            </div>           
          </el-form>
        </el-dialog>
      </div>
      <!--复制角色-->

      <!--编辑角色弹框--->
      <div class="editRoleBox animated fadeIn" v-if="showEditRole">
        <el-dialog
          :title="editRoleDialogTit"
          fullscreen
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
  import { getToken, setToken, removeToken } from '@/utils/auth'
  import { 
    getSelectCompRole,
    getSelectCompRoleG,
    compRoleMgtList,
    addComRole,
    setComRoleState,
    CopyComRole
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
        showCopyRole: false, 
        roleOptions: [],  //搜索框中 角色下拉源
        roleGroupOptions: [], //搜索框中 角色组下拉源
        props: { multiple: true },
        tableData: [],
        currentRowObj: {},  
        copyRoleForm: {
          name: ''
        },
        copyRoleRules: {
          name: [{required: true, message: '请填写角色名称', trigger: 'blur'}],
        },
        addRoleObj: {
          "UserName":"",
          "CompanyCode":"",
          "Id":0,
          "RoleId":"",
          "RoleName":"",
          "RoleType": "2",
          "RoleLevel":"1",
          "MaxAuthNum":0,
          "Description":"",
          "State":'1',
          "Deleted":0
        },  
        roleTypeOptions: [
          // {
          //   value: 1,
          //   label: '系统角色'
          // },
          {
            value: '2',
            label: '企业自定义角色'
          }
        ],    
        roleLevelOptions: [
          {
            value: "1",
            label: '总部'
          },
          {
            value: "2",
            label: '分部'
          },
          {
            value: "3",
            label: '部门'
          }
        ],         
        multipleSelection: [],
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          total: 0,
          roleName: '',
          roleGroupCode: [],
          roleGroup: [],
          roleType: '2',
          state: 0,
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
      this.$store.dispatch("setCompanyRoleScan", false)
      this.$bus.$on("closeDialog", () => {
        this.showEditRole = false
      })
      // 获取 搜索条件中的 角色下拉源
      // this._getSelectCompRole()
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
        'companyCode',
        'token'
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
      _changeData(roleOptions){
        if(roleOptions && roleOptions.length){
          roleOptions.forEach((item, key) => {
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
      // 获取角色下拉源
      _getSelectCompRole(){
        getSelectCompRole("","",-1).then(res => {
          if(res && res.data.State === REQ_OK){
            this.roleOptions = res.data.Data
            this._changeData(this.roleOptions)
          }else {
            this.$message.error(`获取角色下拉源数据失败,${res.data.Error}`)
          }
        })
      },
      // 获取角色组下拉源
      _getSelectCompRoleG(){
        getSelectCompRoleG("",-1).then(res => {
          if(res && res.data.State === REQ_OK){
            this.roleGroupOptions = res.data.Data
            this._changeData(this.roleGroupOptions)
          }else {
            this.$message.error(`获取角色组下拉源数据失败,${res.data.Error}`)
          }
        })
      },
      // 获取列表数据
      _compRoleMgtList(){
        debugger
        this.loading = true
        let length_roleGroup = this.queryObj.roleGroupCode.length
        if(length_roleGroup){
          this.queryObj.roleGroupCode = this.queryObj.roleGroupCode[length_roleGroup-1]
        }
        let {
          pageSize,
          pageNum,
          roleName,
          roleGroupCode,
          roleType,
          state,          
        } = this.queryObj
        if(!state){
          state = 1
        }else {
          state = 0
        }
        compRoleMgtList(roleName, roleType, state, pageSize, pageNum, this.queryObj.roleGroupCode).then(res => {
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
      //重置
      handlerReset(){
        Object.assign(this.queryObj, {
          roleName: [],
          roleGroupCode: []
        })
        this._getComTables()
      },
      // 查看
      handlerScan(row){
        // store 中存入 点击查看的 标识 companyRoleScanFlag
        this.$store.dispatch("setCompanyRoleScan", true)
        this.currentRowObj = row
        this.strFlag = 'roleInfo'
        this.editRoleDialogTit = '查看角色'
        this.showEditRole = true        
      },
      // 编辑
      hanlderEdit(row){
        debugger
        this.$store.dispatch("setCompanyRoleScan", false)
        this.currentRowObj = row
        this.strFlag = 'roleInfo'
        this.editRoleDialogTit = '编辑角色'
        this.showEditRole = true
      },
      roleInfoSaveSuccess(){
        this._getComTables()
      },
      _CopyComRole(){
        CopyComRole(this.multipleSelection[0].Id, this.copyRoleForm.name,this.multipleSelection[0].RoleType).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success("复制成功")
            this.showCopyRole = false
            this._getComTables()
          }else {
            this.$message.error(`复制角色保存失败,${res.data.Error}`)
          }
        })  
      },
      // 复制保存
      saveCopy(){
        this.$refs.copyRoleForm.validate(valid => {
          if(valid){
            this._CopyComRole()
          }else {

          }
        })
      },
      // 复制取消
      cancelCopy(){
        this.showCopyRole = false
      },
      // 许可权限
      handlerPermitRights(row){
        // store 中存入 点击查看的 标识 companyRoleScanFlag
        this.$store.dispatch("setCompanyRoleScan", false)        
        this.currentRowObj = row
        this.strFlag = 'permitRights'
        this.editRoleDialogTit = '编辑许可权'
        this.showEditRole = true
      },
      // 用户/组
      handlerUserOrGroup(row){
        // store 中存入 点击查看的 标识 companyRoleScanFlag
        this.$store.dispatch("setCompanyRoleScan", false)        
        this.currentRowObj = row
        this.strFlag = 'userOrGroup'
        this.editRoleDialogTit = '编辑用户/组'
        this.showEditRole = true        
      },
      // 启用/停用
      _setComRoleState(type){
        debugger
        let text = type == 1 ? '启用':'停用'
        this.loading = true
        setComRoleState(this.currentRowObj.Id, type, this.currentRowObj.RoleType).then(res => {
          debugger
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.$message.success(`${text}成功`)
            this._getComTables()
          }else {
            this.$message.error(`${text}失败,${res.data.Error}`)
          }
        }).catch(() => {
          debugger
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
        Object.assign(this.addRoleObj, {
          RoleName: '',
          Description: '',
          State: '1'           
        })
        this.showAddNewRole = true
      },

      // 复制角色
      copyRole(){
        this.copyRoleForm.name = ''
        this.showCopyRole = true
      },
      // 导出
      exportRole(){
        debugger
        let strJson = JSON.stringify(this.multipleSelection)
        let roleType = this.queryObj.roleType
        let state = ''
        if(  this.queryObj.state == 1 ){
          state = 0
        }else {
          state = 1
        }
        let TokenId = getToken()
        let url = `${BASE_URL}/SystemManage/CompRoleMgtList?Method=ExportSelectedComRole&TokenId=${TokenId}&UserNo=${this.userCode}&CompanyCode=${this.companyCode}&strJson=${strJson}&roleType=${roleType}&state=${state}`
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
