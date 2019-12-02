<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--用户管理
-->

<style lang="stylus" rel="stylesheet/syylus" scoped>
>>>.el-loading-mask
  background-color rgba(255,255,255,0.01) !important
.userManage
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="userManage animated fadeIn">
      <!--搜索区--start-->
      <div>
        <el-input 
          v-model="queryObj.key"
          :placeholder="searchPlaceholder" 
          style="width: 300px"
          clearable
        >
        </el-input>

        <span>
          角色
          <el-input list="role" v-model="queryObj.roleLevel" style="width:200px"></el-input>
          <datalist id="role">
            <option value="全部"></option>
            <option value="角色一"></option>
            <option value="角色二"></option>
          </datalist>             
        </span>

        <span>
          是否锁定
          <el-select clearable v-model="queryObj.isLock" placeholder="请选择">
            <el-option 
              v-for="item in options"
              :key="item.Id"
              :label="item.Name"
              :value="''+item.value"
            ></el-option>
          </el-select>
        </span>

        <el-button 
          type="primary" 
          @click.native="_getComTables">
          搜索
        </el-button>
      </div>      
      <!---搜索区---end--->

      <!--table表格区--start--->
      <div class="containerWrap marginT20">        
        <el-tabs v-model="isActive">
          <el-tab-pane label="激活" name="1"></el-tab-pane>
          <el-tab-pane label="冻结" name="0"></el-tab-pane>
          <el-tab-pane label="全部" name="-1"></el-tab-pane>
        </el-tabs>


        <el-button 
          type="primary" 
          size="mini"
          style="float:right;margin-bottom:10px;margin-left:10px" 
          @click.native="addOutUser">
          开通外部用户
        </el-button>

        <el-button 
          type="primary" 
          size="mini"
          style="float:right;margin-bottom:10px" 
          @click.native="addNewUser">
          新增用户
        </el-button>

        <!-- tableData： {{tableData}} -->
        <div :class="['tableBox', tableData.length<=0? 'not_found': '']" v-loading = "loading">
          <el-table 
            style="width:100%"
            :data="tableData"
            empty-text=" "
            border
          >
            <el-table-column
              type="selection"
              width="50"
            >
            </el-table-column>

            <el-table-column
              prop="CompanyCode"
              label="企业号"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="CompanyNameCn"
              label="企业名称"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="EmpId"
              label="企业员工号"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>            

            <el-table-column
              prop="EmployeeName"
              label="姓名"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="OrgName"
              label="组织"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="PositionName"
              label="岗位"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="UserName"
              label="用户名"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="AccountName"
              label="关联账户名"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="IsActive"
              label="激活"
              sortable
              show-overflow-tooltip
            >
              <template
                slot-scope="scope"
              >
                <span v-if="scope.row.IsActive === 1">冻结</span>
                <span v-if="scope.row.IsActive === 0">激活</span>
              </template>
            </el-table-column>   

            <el-table-column
              prop="IsLock"
              label="锁定"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span v-if="scope.row.IsLock === 1">解锁</span>
                <span v-if="scope.row.IsLock === 0">锁定</span>
              </template>
            </el-table-column>      

            <el-table-column
              prop="LoginDateTime"
              label="上次登录时间"
              sortable
              width="150"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
              <span>
                {{  scope.row.LoginDateTime | replaceTime }}
              </span>
            </template>
            </el-table-column>       

            <el-table-column
              prop="Created"
              label="创建时间"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{  scope.row.Created | replaceTime }}
                </span>
              </template>            
            </el-table-column>       

            <el-table-column
              prop="Updated"
              label="更新时间"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{  scope.row.Updated | replaceTime }}
                </span>
              </template>            
            </el-table-column>     

            <el-table-column
              prop="CompRole"
              label="企业自定义角色"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{  scope.row.CompRole }}
                </span>
              </template>            
            </el-table-column>     

            <el-table-column
              label="操作"
              width="150"
              fixed="right"
            >
              <template slot-scope="scope">
                <!-- scope.row.IsActive:{{scope.row.IsActive}}
                ----
                scope.row.IsLock:{{scope.row.IsLock}} -->
                <!-- <el-button type="text" size="mini" @click.native="hanlderResetSysAccountPwd(scope.row)">密码重置</el-button> -->
                <el-button type="text" size="mini" v-if="scope.row.IsActive===0" @click.native="handlerAccountActive(scope.row, 1)">激活</el-button>
                <el-button type="text" size="mini" v-if="scope.row.IsActive===1" @click.native="handlerAccountActive(scope.row, 0)">冻结</el-button>
                <!-- <el-button type="text" size="mini" v-if="scope.row.IsLock===1" @click.native="handlerAccountLock(scope.row,0)">解锁</el-button>
                <el-button type="text" size="mini" v-if="scope.row.IsLock===0" @click.native="handlerAccountLock(scope.row,1)">锁定</el-button> -->
                <el-button type="text" size="mini" @click.native="handlerAddtoUserGroup(scope.row)">添加到用户组</el-button>
                <el-button type="text" size="mini" @click.native="handlerAuthrize(scope.row)">授权</el-button>
                <el-button type="text" size="mini" @click.native="handlerEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="mini" @click.native="handlerDelete(scope.row)">删除</el-button>
              </template>

            </el-table-column>                                                   
          </el-table>

          <!--分页部分-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryObj.pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
       
      </div>      
      <!--table表格区--end---->

      <!--添加到用户组弹框-->
      <div v-if="showAddToUserGroupDialog">
        <el-dialog
          title="添加到用户组"
          width="40%"
          :visible.sync="showAddToUserGroupDialog"
          append-to-body
          :close-on-click-modal="false"
        >
          <add-to-user-group-cmp
            @closeDialog="closeDialog"
          >
          </add-to-user-group-cmp>
        </el-dialog>
      </div>
      <!--添加到用户组弹框--->

      <!--授权弹框--->
      <div v-if="showAuthrizeDialog">
        <el-dialog
          title="用户授权"
          width="40%"
          :visible.sync="showAuthrizeDialog"
          append-to-body
          :close-on-click-modal="false"
        >
          <company-authrize-cmp
            :obj="currentRowObj"
            @closeAuthrizeDialog="closeAuthrizeDialog"
          >
          </company-authrize-cmp>
        </el-dialog>
      </div>      
      <!--授权弹框--->

      <!--新增/编辑用户弹框---start-->
      <div class="addUserWrap" v-if="showAddUser">
        <el-dialog
          v-loading="dialogLoading"
          :title="dialogTit"
          width="30%"
          :visible.sync="showAddUser"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-form ref="dialogForm" :model="currentRowObj" :rules="formRules" label-width="120px">
            <el-form-item label="企业号" prop="CompanyCode">
              <el-input v-model="currentRowObj.CompanyCode" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="企业名" prop="CompanyNameCn">
              <el-input v-model="currentRowObj.CompanyNameCn" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="企业员工号" prop="EmpId">
              <el-input v-model="currentRowObj.EmpId" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="EmployeeName">
              <el-input  v-model="currentRowObj.EmployeeName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="组织" prop="OrgName">
              <el-input v-model="currentRowObj.OrgName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="岗位" prop="PositionName">
              <el-input v-model="currentRowObj.PositionName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="UserName">
              <el-input v-model="currentRowObj.UserName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="关联账户名" prop="AccountName">
              <el-input v-model="currentRowObj.AccountName" style="width:300px"></el-input>
            </el-form-item>
          </el-form>

          <save-footer @save="save" @cancel="cancel"></save-footer>                                   
        </el-dialog>      
      </div>
      <!---新增/编辑用户弹框----end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import { ManageAccountMixin } from '@/utils/Manage-mixins'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import AddToUserGroupCmp from '@/base/Manage-common-cmp/addToUsergroup-cmp/addToUsergroupWrap-cmp'
  import CompanyAuthrizeCmp from '@/base/Manage-common-cmp/authrize-cmp/company-authrize-cmp/authrize'
  import { REQ_OK  } from '@/api/config'
  import {
    getCompUserMgtList,
    getComUser,
    saveComUser,
    delComUser,
    setComUserState,
    setSysAccountLock,
    resetSysAccountPwd
  } from '@/api/systemManage'
  export default {
    mixins: [ManageAccountMixin],
    components: {
      SaveFooter,
      AddToUserGroupCmp,
      CompanyAuthrizeCmp
    },
    data(){
      return {
        loading: false,
        showAddUser: false, // 控制 新增弹框的显示/隐藏
        searchPlaceholder: '用户名、手机号、微信号、QQ号、邮箱、企业号、企业名',
        editOrAddFlag: 0, // 0 编辑 1  新增
        showAddToUserGroupDialog: false, // 添加到用户组的弹框显示/隐藏
        showAuthrizeDialog: false,  // 授权弹框的显示/隐藏
        options:[
          {
            NO: 1,
            Id: 1,
            Name: '全部',
            value: '-1'
          },
          {
            No: 2,
            Id: 2,
            Name: '已锁定',
            value: '0'
          },
          {
            No: 3,
            Id: 3,
            Name: '未锁定',
            value: '1'
          }          
        ],
        total: 0,
        isActive: '-1', // 激活1  全部-1  冻结 0        
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          roleLevel: '-1',
          key: '', // 多功能搜索关键字
          isLock: '-1', //是否锁定，0否 1是，默认-1全部
          state: '',  //状态，0停用 默认
        },
        tableData:[],
        currentRowObj: {},
        dialogLoading: false, 
        formRules: {
          CompanyCode: [{required: true, message: '请填写企业号', trigger: blur}],
          CompanyNameCn: [{required: true, message: '请填写企业名称', trigger: blur}],
          EmpId: [{required: true, message: '请填写员工号', trigger: blur}],
          EmployeeName:[{required: true, message: '请填写员工姓名', trigger: blur}],
          OrgName: [{required: true, message: '请填写组织名称', trigger: blur}],
          PositionName: [{required: true, message: '请填写岗位名称', trigger: blur}],
          AccountName: [{required: true, message: '请填写关联账户名', trigger: blur}],
          UserName:[{required: true, message: '请填写用户名', trigger: blur}],
        }
      }
    },
    computed: {
      dialogTit(){
        if( this.editOrAddFlag === 0){
          return '编辑'
        }else if( this.editOrAddFlag === 1 ){
          return '新增'
        }
      }
    },
    watch: {
      isActive: {
        handler(newValue, oldValue){
          this._getComTables()
        }
      }
    },
    created(){
      this._getCompUserMgtList()
    },
    methods: {
      _getComTables(){
        this._getCompUserMgtList()
      },
      closeDialog(){
        this.showAddToUserGroupDialog = false
        this._getComTables()
      },
      // 获取账户列表
      _getCompUserMgtList(){
        this.loading = true
        getCompUserMgtList(this.queryObj).then(res => {
          debugger
          this.loading = false
          if(res && res.data.State ===REQ_OK ){
            this.tableData = res.data.Data
            this.total = res.data.DataCount
          }else {
            this.$message({
              typ: 'error',
              message: `获取账户列表数据失败,${res.data.Error}`
            })
          }
        })
      },
      // 添加到用户组
      handlerAddtoUserGroup(row){
        debugger
        this.currentRowObj = row
        this.showAddToUserGroupDialog = true
      },
      // 授权
      handlerAuthrize(row){
        debugger
        this.currentRowObj = row
        this.showAuthrizeDialog = true
      },
      closeAuthrizeDialog(){
        this.showAuthrizeDialog = false
      },
      // 编辑
      handlerEdit(row){
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        this.showAddUser = true
      },
      _setSysAccountLock(type){
        let text = this.currentRowObj.IsLock === 0 ? '解锁': '锁定'
        setSysAccountLock(this.currentRowObj.Id, type).then(res => {
          if( res && res.data.State === REQ_OK ){
            this.$message.success(`${text}成功`)
            this._getComTables()
          }else {
            this.$message.error(`${text}失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning(`${text}出错了`)
        })        
      },
      _delComUser(){
        this.loading = true
        delComUser(this.currentRowObj.Id).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.$message.success("删除系统用户成功")
          }else {
            this.$message.error(`删除系统用户失败,${res.data.Error}`)
          }
        })
      },
      // 删除
      handlerDelete(row){
        this.$confirm("确定要删除吗?","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(res => {
          this._delComUser()
        }).catch(() => {
          this.$message.info("删除已取消")
        })
      },
      // 锁定
      handlerAccountLock(row,type){
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        let text = this.currentRowObj.IsActive === 0 ? '解锁': '锁定'
        this.$confirm(`确定要${text}吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this._setSysAccountLock(type)
        }).catch(() => {
          this.$message.info(`已取消${text}`)
        })
      },
      // 冻结/激活
      _setComUserState(type){
        let text = this.currentRowObj.IsActive === 1 ? '冻结': '激活'
        setComUserState(this.currentRowObj.Id, type).then(res => {
          if( res && res.data.State === REQ_OK ){
            this.$message.success(`${text}成功`)
            this._getComTables()
          }else {
            this.$message.error(`${text}失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning(`${text}出错了`)
        })
      },

      //激活
      handlerAccountActive(row,type){
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        let text = this.currentRowObj.IsActive === 1 ? '冻结': '激活'
        this.$confirm(`确定要${text}吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this._setComUserState(type)
        }).catch(() => {
          this.$message.info(`已取消${text}`)
        })
      },
      _resetSysAccountPwd(pwd){
        resetSysAccountPwd(this.currentRowObj.Id, pwd).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success(`密码重置成功,新密码为：${pwd}`)
          }else {
            this.$message.error(`密码重置失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("密码重置出错了")
        })
      },
      // 密码重置
      hanlderResetSysAccountPwd(row){
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        this.$prompt(`请输入密码`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'          
        }).then((  {value} ) => {
          let pwd = value
          if( value ){
            this._resetSysAccountPwd(pwd)
          }
        }).catch(() => {
          this.$message.info(`已取消重置密码`)
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
      // 开通外部用户
      addOutUser(){

      },
      // 新增用户
      addNewUser(){
        this.editOrAddFlag = 1
        Object.assign(this.currentRowObj, {
          "Id":'',
          "CompanyCode":"",
          "CompanyNameCn":"",
          "EmpId":"",
          "EmployeeName":"",
          "OrgName":"",
          "PositionName":"",
          "UserName":"",
          "AccountName":"",
          "IsActive": false,
          "ActiveDate":"",
          "FrozenDate":"",
          "LoginDateTime":null,
          "Created":"",
          "Updated":"",
          "SysRole":null,
          "CompRole":"",
          "State":'',
          "RoleLevel":'',
          "IsLock":'',
          "UserId":""
        })
        this.showAddUser = true
      },
      // 保存系统用户数据
      _saveComUser(){
        this.dialogLoading = true
        saveComUser(JSON.stringify(this.currentRowObj)).then(res => {
          this.dialogLoading = false
          if(res && res.data.State === REQ_OK){
            this.$message.success("保存成功")
            this.showAddUser = false
          }else {
            this.$message.error(`保存数据失败,${res.data.Error}`)
          }
        })
      },
      // 编辑/新增保存
      save(){
        this.$refs.dialogForm.validate(valid => {
          if(valid){
            this._saveComUser()
          }else {

          }
        })
      },
      // 编辑/新增取消保存
      cancel(){
        this.showAddUser = false
      }
    },
  }
</script>
