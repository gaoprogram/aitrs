<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--用户管理
-->

<style lang="stylus" rel="stylesheet/syylus" scoped>
>>>.el-loading-mask
  background-color rgba(255,255,255,0.01) !important
>>>.el-form
  height 400px
  overflow auto
.userManage
  padding 0 20px
  box-sizing border-box
  .containerWrap
    position relative
    .btnBox
      position absolute 
      top -20px 
      right 10px
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

        <div class="btnBox">
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
            开通用户
          </el-button>      
        </div>

        <el-tabs v-model="queryObj.userType">
          <el-tab-pane label="内部用户" name="1"></el-tab-pane>
          <el-tab-pane label="外部用户" name="0"></el-tab-pane>
          <el-tab-pane label="全部用户" name="-1"></el-tab-pane>
        </el-tabs>        

        <el-tabs type="card" v-model="queryObj.state">
          <el-tab-pane label="激活" name="1"></el-tab-pane>
          <el-tab-pane label="冻结" name="0"></el-tab-pane>
          <el-tab-pane label="全部" name="-1"></el-tab-pane>
        </el-tabs>

        <!-- tableData： {{tableData}} -->
        <div :class="['tableBox', tableData.length<=0? 'not_found': '']" v-loading = "loading">
          <el-table 
            style="width:100%"
            max-height="500"
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
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="IsLock"
              label="锁定"
              sortable
              show-overflow-tooltip
            >
              <template
                slot-scope="scope"
              >
                <span v-if="scope.row.IsLock == 1">是</span>
                <span v-if="scope.row.IsLock == 0">否</span>
              </template>
            </el-table-column>              

            <el-table-column
              prop="State"
              label="激活"
              sortable
              show-overflow-tooltip
            >
              <template
                slot-scope="scope"
              >
                <span v-if="scope.row.State == 1">是</span>
                <span v-if="scope.row.State == 0">否</span>
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
              width="120"
              label="企业自定义角色"
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
                <el-button type="text" size="mini" v-if="scope.row.State==0" @click.native="handlerAccountActive(scope.row, 1)">激活</el-button>
                <el-button type="text" size="mini" v-if="scope.row.State==1" @click.native="handlerAccountActive(scope.row, 0)">冻结</el-button>
                <!-- <el-button type="text" size="mini" v-if="scope.row.IsLock===1" @click.native="handlerAccountLock(scope.row,0)">解锁</el-button>
                <el-button type="text" size="mini" v-if="scope.row.IsLock===0" @click.native="handlerAccountLock(scope.row,1)">锁定</el-button> -->
                <el-button type="text" size="mini" @click.native="handlerAddtoUserGroup(scope.row)">添加到用户组</el-button>
                <el-button type="text" size="mini" @click.native="handlerPermitRights(scope.row)">许可权</el-button>
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
            <el-form-item  v-if="editOrAddFlag !=2" label="企业员工号" prop="EmpId">
              <el-input v-model="currentRowObj.EmpId" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="EmployeeName">
              <el-input  v-model="currentRowObj.EmployeeName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="组织" prop="OrgName">
              <!-- <el-input v-model="currentRowObj.OrgName" style="width:300px"></el-input> -->
              <!---引用通用组织选择器--->
              <common-select-cmp 
                title="" 
                :tabType="['zuzhi']" 
                :selectedList="selectedOrgList"
                componentId="zuzhi"
                @upData="upData"
              ></common-select-cmp>
            </el-form-item>
            <el-form-item label="岗位" prop="PositionName">
              <!-- <el-input v-model="currentRowObj.PositionName" style="width:300px"></el-input> -->
              <!---引用通用岗位选择器--->
              <common-select-cmp 
                title="" 
                :tabType="['gangwei']" 
                :selectedList="selectedPosList"
                componentId="gangwei"
                @upData="upData"
              ></common-select-cmp>
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


      <!--许可权弹框--->
      <div class="editRoleBox animated fadeIn" v-if="showPermitRightsDialog">
        <el-dialog
          title="许可权"
          width="40%"
          append-to-body
          :visible.sync="showPermitRightsDialog"
          :close-on-click-modal="false"
        >
          <div class="permitRightsBox">
            <company-permitrights-cmp
              ref="companyRolePermitRightsCmp"
              :obj="currentRowObj"
            >
            </company-permitrights-cmp>
          </div>

          <!-- <div class="footer">
            <save-footer @save="savePermitRights" @cancel="cancelPermitRights"></save-footer>
          </div> -->
        </el-dialog>
      </div>
      <!---许可权弹框-->      
    </div>
</template>

<script type="text/ecmascript-6">
  import { ManageAccountMixin } from '@/utils/Manage-mixins'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import AddToUserGroupCmp from '@/base/Manage-common-cmp/addToUsergroup-cmp/addToUsergroupWrap-cmp'
  import CompanyAuthrizeCmp from '@/base/Manage-common-cmp/authrize-cmp/company-authrize-cmp/authrize'
  import CompanyPermitrightsCmp from './permitRights-cmp'
  import { REQ_OK  } from '@/api/config'
  import CommonSelectCmp from '@/base/Company-structure-cmp/select-cmp'
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
      CompanyAuthrizeCmp,
      CompanyPermitrightsCmp,
      CommonSelectCmp,
    },
    data(){
      return {
        loading: false,
        showAddUser: false, // 控制 新增弹框的显示/隐藏
        searchPlaceholder: '用户名、手机号、微信号、QQ号、邮箱、企业号、企业名',
        editOrAddFlag: 0, // 0 编辑 1  新增内部用户 2 新增外部用户
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
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          roleLevel: '-1', 
          userType: '-1', // 外部用户0 内部用户 1 全部 -1
          key: '', // 多功能搜索关键字
          isLock: '-1', //是否锁定，0否 1是，默认-1全部
          state: '-1',  //是否激活，0冻结 1 激活 -1 全部 
        },
        showPermitRightsDialog: false, // 许可权弹框的显示/隐藏
        tableData:[],
        currentRowObj: {
          "Id": 0,
          "CompanyCode":"",
          "CompanyNameCn":"",
          "EmpId":"",
          "EmployeeName":"",
          "OrgName":"",
          "PositionName":"",
          "UserName":"",
          "AccountName":"",
          "IsActive": false,
          "ActiveDate":new Date().toLocaleDateString(),
          "FrozenDate": new Date().toLocaleDateString(),
          "LoginDateTime":new Date().toLocaleDateString(),
          "Created": new Date().toLocaleDateString(),
          "Updated":new Date().toLocaleDateString(),
          "SysRole":null,
          "CompRole":"",
          "State": 1,
          "RoleLevel":'',
          "IsLock":'',
          "UserId":""          
        },
        dialogLoading: false,   // 编辑、新增内部用户、新增外部用户弹框loading
        formRules: {
          CompanyCode: [{required: true, message: '请填写企业号', trigger: blur}],
          CompanyNameCn: [{required: true, message: '请填写企业名称', trigger: blur}],
          EmpId: [{required: true, message: '请填写员工号', trigger: blur}],
          EmployeeName:[{required: true, message: '请填写员工姓名', trigger: blur}],
          // OrgName: [{required: true, message: '请填写组织名称', trigger: blur}],
          // PositionName: [{required: true, message: '请填写岗位名称', trigger: blur}],
          AccountName: [{required: true, message: '请填写关联账户名', trigger: blur}],
          UserName:[{required: true, message: '请填写用户名', trigger: blur}],
        },
        selectedOrgList:[],    // 已选组织集合
        selectedPosList: [], // 已选岗位集合
      }
    },
    computed: {
      dialogTit(){
        if( this.editOrAddFlag === 0){
          return '编辑'
        }else if( this.editOrAddFlag === 1 ){
          return '新增内部用户'
        }else if( this.editOrAddFlag === 2){
          return '新增外部用户'
        }
      }
    },
    watch: {
      'queryObj.userType': {
        handler(newValue, oldValue){
          this._getComTables()
        }      
      },
      'queryObj.state': {
        handler(newValue, oldValue){
          this._getComTables()
        }  
      }      
    },
    created(){
      // 获取table表格列表数据
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
      upData (val,componentId) {
        debugger
        if(val.length !=1 ){
          this.$message.success("仅可选择一个")
          return
        }

        if(componentId && componentId === 'zuzhi'){
          this.currentRowObj.OrgName = ''
          // 组织选择器传过来的updata事件
          if(val.length){
            let addOrgArr = val.map(item => {
              return {
                Id: item.EmpId,
                // Name: item.OrgName
                Name: item.Name
              }
            })
            this.selectedOrgList = addOrgArr
            this.currentRowObj.OrgName = addOrgArr[0].Name
          }else {

          }
        }else if(componentId && componentId === 'gangwei'){
          // 岗位选择器传过来的update事件
          if(val.length){
            let addPosArr = val.map(item => {
              return {
                Id: item.PositionId,
                // Name: item.PositionName
                Name: item.PositionName
              }
            })
            this.selectedPosList = addPosArr
            this.currentRowObj.PositionName = addPosArr[0].Name
          }else {
            
          }
        }
        debugger
      },
      // 获取账户列表
      _getCompUserMgtList(){
        this.loading = true
        getCompUserMgtList(this.queryObj).then(res => {
          debugger
          this.loading = false
          if(res && res.data.State ===REQ_OK ){
            this.tableData = res.data.Data
            this.total = res.data.Total
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
        debugger
        this.loading = true
        delComUser(this.currentRowObj.Id).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.$message.success("删除系统用户成功")
            this._getComTables()
          }else {
            this.$message.error(`删除系统用户失败,${res.data.Error}`)
          }
        })
      },
      // 删除
      handlerDelete(row){
        this.currentRowObj = row
        this.$confirm("确定要删除吗?","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(res => {
          this._delComUser()
        }).catch(() => {
          this.$message.info("删除已取消")
        })
      },
      // 许可权
      handlerPermitRights(row){
        this.currentRowObj = row
        this.showPermitRightsDialog = true          
      },      
      // 锁定
      handlerAccountLock(row,type){
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        let text = this.currentRowObj.State === 0 ? '解锁': '锁定'
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
        let text = this.currentRowObj.State == 1 ? '冻结': '激活'
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
        let text = this.currentRowObj.State == 1 ? '冻结': '激活'
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
        debugger
        this.selectedOrgList = []
        this.selectedPosList = []
        this.editOrAddFlag = 2
        this.currentRowObj = {
          "Id": 0,
          "CompanyCode":"",
          "CompanyNameCn":"",
          "EmpId":"",
          "EmployeeName":"",
          "OrgName":"",
          "PositionName":"",
          "UserName":"",
          "AccountName":"",
          "IsActive": false,
          // "ActiveDate": new Date().toLocaleDateString(),
          // "FrozenDate": new Date().toLocaleString(),
          // "LoginDateTime":new Date().toLocaleString(),
          // "Created": new Date().toLocaleString(),
          // "Updated": new Date().toLocaleString(),
          "SysRole":null,
          "CompRole":"",
          "State": 1,
          "RoleLevel":'',
          "IsLock":'',
          "UserId":""
        }
        debugger
        this.showAddUser = true        
      },
      // 开通内部用户
      addNewUser(){
        debugger
        this.selectedPosList = []
        this.selectedOrgList = []
        this.editOrAddFlag = 1
        this.currentRowObj = {
          "Id": 0,
          "CompanyCode":"",
          "CompanyNameCn":"",
          "EmpId":"",
          "EmployeeName":"",
          "OrgName":"",
          "PositionName":"",
          "UserName":"",
          "AccountName":"",
          "IsActive": false,
          // "ActiveDate": new Date().toLocaleDateString(),
          // "FrozenDate": new Date().toLocaleString(),
          // "LoginDateTime":new Date().toLocaleString(),
          // "Created": new Date().toLocaleString(),
          // "Updated": new Date().toLocaleString(),
          "SysRole":null,
          "CompRole":"",
          "State": 1,
          "RoleLevel":'',
          "IsLock":'',
          "UserId":""
        }
        debugger
        this.showAddUser = true
      },
      // 保存用户数据
      _saveComUser(){
        this.dialogLoading = true
        saveComUser(JSON.stringify(this.currentRowObj)).then(res => {
          this.dialogLoading = false
          if(res && res.data.State === REQ_OK){
            this.$message.success("保存成功")
            this._getComTables()
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
      },
      // 许可权 保存
      savePermitRights(){
        
      },
      // 许可权 取消
      cancelPermitRights(){
        this.showPermitRightsDialog = false
      }
    },
  }
</script>
