<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--企业系统管理员
-->

<style lang="stylus" rel="stylesheet/syylus" scoped>
>>>.el-loading-mask
  background-color rgba(255,255,255,0.01) !important
.sysManage
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="sysManage animated fadeIn">
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

        <el-button type="primary" size="small" @click.native="_getComTables">搜索</el-button>
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
          style="float:right;margin-bottom:10px" 
          size="mini"
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
              prop="AccountName"
              label="账户名称"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="QQ"
              label="QQ号"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="WeChat"
              label="微信号"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="Email"
              label="邮箱"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="IP"
              label="登录ip"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="TryCount"
              label="试错次数"
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
              label="操作"
              width="150"
            >
              <template slot-scope="scope">
                <!-- scope.row.IsActive:{{scope.row.IsActive}}
                ----
                scope.row.IsLock:{{scope.row.IsLock}} -->
                <el-button type="text" size="mini" @click.native="hanlderResetSysAccountPwd(scope.row)">密码重置</el-button>
                <el-button type="text" size="mini" v-if="scope.row.IsActive===0" @click.native="handlerAccountActive(scope.row, 1)">激活</el-button>
                <el-button type="text" size="mini" v-if="scope.row.IsActive===1" @click.native="handlerAccountActive(scope.row, 0)">冻结</el-button>
                <el-button type="text" size="mini" v-if="scope.row.IsLock===1" @click.native="handlerAccountLock(scope.row,0)">解锁</el-button>
                <el-button type="text" size="mini" v-if="scope.row.IsLock===0" @click.native="handlerAccountLock(scope.row,1)">锁定</el-button>
                <el-button type="text" size="mini" @click.native="handlerEdit(scope.row)">编辑</el-button>
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

      <!--新增用户弹框---start-->
      <div class="addUserWrap" v-if="showAddUser">
        <el-dialog
          v-loading="dialogLoading"
          :title="dialogTit"
          width="30%"
          :visible.sync="showAddUser"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-form ref="dialogForm" :model="currentRowObj" :rules="formRules" label-width="80px">
            <el-form-item label="企业号" prop="CompanyCode">
              <el-input v-model="currentRowObj.CompanyCode" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="企业名" prop="CompanyNameCn">
              <el-input v-model="currentRowObj.CompanyNameCn" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="账户名" prop="AccountName">
              <el-input v-model="currentRowObj.AccountName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="">
              <el-input  style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="QQ号" prop="QQ">
              <el-input v-model="currentRowObj.QQ"style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="">
              <el-input style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="Wechat">
              <el-input v-model="currentRowObj.Wechat" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="Email">
              <el-input v-model="currentRowObj.Email" style="width:300px"></el-input>
            </el-form-item>
          </el-form>

          <save-footer @save="save" @cancel="cancel"></save-footer>                                   
        </el-dialog>      
      </div>
      <!---新增用户弹框----end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import { ManageAccountMixin } from '@/utils/Manage-mixins'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK  } from '@/api/config'
  import {
    getCompUserMgtList,
    getComUser,
    saveComUser,
    setSysAccountActive,
    setSysAccountLock,
    resetSysAccountPwd
  } from '@/api/systemManage'
  export default {
    mixins: [ManageAccountMixin],
    components: {
      SaveFooter
    },
    data(){
      return {
        loading: false,
        showAddUser: false, // 控制 新增弹框的显示/隐藏
        searchPlaceholder: '用户名、手机号、微信号、QQ号、邮箱、企业号、企业名',
        editOrAddFlag: 0, // 0 编辑 1  新增
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
          AccountName: [{required: true, message: '请填写账号名称', trigger: blur}],
          QQ: [{required: true, message: '请填写QQ号', trigger: blur}],
          Wechat: [{required: true, message: '请填写微信号', trigger: blur}],
          Email: [{required: true, message: '请填写邮箱', trigger: blur}],
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
              message: `获取企业管理员列表数据失败,${res.data.Error}`
            })
          }
        })
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
      _setSysAccountActive(type){
        let text = this.currentRowObj.IsActive === 1 ? '冻结': '激活'
        setSysAccountActive(this.currentRowObj.Id, type).then(res => {
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
          this._setSysAccountActive(type)
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
          }else {
            this.$message.error(`保存数据失败,${res.data.Error}`)
          }
        })
      },
      save(){
        this.$refs.dialogForm.validate(valid => {
          if(valid){
            this._saveComUser()
          }else {

          }
        })
      },
      cancel(){
        this.showAddUser = false
      }
    },
  }
</script>
