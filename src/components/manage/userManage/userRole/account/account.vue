<!--
  User: gaol
  Date: 2019/10/13
  功能：平台系统设置——用户角色--账号
-->
<style lang="stylus" rel="stylesheet/syylus" scoped>
.accountManage
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="accountManage animated fadeIn">
      <div>
        <el-input 
          v-model="queryObj.key"
          :placeholder="searchPlaceholder" 
          style="width: 300px"
          clearable
        >
        </el-input>
        <span>
          是否锁定
          <el-select clearable v-model="queryObj.isLock" placeholder="请选择">
            <el-option 
              v-for="(item, index) in options"
              :key="item.Id + index"
              :label="item.Name"
              :value="item.Name"
            ></el-option>
          </el-select>
        </span>

        <el-button type="primary" size="small" @click.native="_getComTables">搜索</el-button>
      </div>
      
      <div class="containerWrap">
        <!-- queryObj.isActive: {{queryObj.isActive}} -->
        <el-tabs v-model="queryObj.isActive">
          <el-tab-pane label="激活" name="1"></el-tab-pane>
          <el-tab-pane label="冻结" name="0"></el-tab-pane>
          <el-tab-pane label="全部" name="-1"></el-tab-pane>
        </el-tabs>

        <!-- tableData: {{tableData}} -->
        <div :class="['tableBox', tableData.length<=0? 'not_found':'']" v-loading = 'loading'> 
          <el-table 
            max-height="600px"
            style="width:100%"
            :data="tableData"
            empty-text=" "
            border
          >
            <!-- <el-table-column
              type="selection"
              width="50"
            >
            </el-table-column> -->

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
                <span v-if="scope.row.IsActive == 1">已激活</span>
                <span v-if="scope.row.IsActive == 0">冻结</span>
              </template>
            </el-table-column>   

            <el-table-column
              prop="isLock"
              label="锁定"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isLock == 1">已锁定</span>
                <span v-if="scope.row.isLock == 0">未锁定</span>
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
                <el-button type="text" size="mini" @click.native="resetPwd(scope.row)">重置密码</el-button>
                <el-button type="text" size="mini" @click.native="handlerUser(scope.row)">用户</el-button>
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
      </div>

      <div class="editBox" v-if="showDialog">
        <el-dialog
          width="80%"
          :visible.sync="showDialog"
          append-to-body
          :close-on-click-modal="false"
        >
        <user-info-cmp ref="userInfoCmp"></user-info-cmp>
      </el-dialog>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { ManageAccountMixin } from '@/utils/Manage-mixins'
  // import SaveFooter from '@/base/Save-footer/Save-footer'
  import UserInfoCmp from './UserInfo-cmp'
  import {  REQ_OK } from '@/api/config'
  import {
    getAccountList,
    delSysUser,
    getSysUserMgtList,
    resetSysAccountPwd
  } from '@/api/systemManage'
  export default {
    mixins: [ManageAccountMixin],
    components: {
      // SaveFooter,
      UserInfoCmp
    },
    data(){
      return {
        searchPlaceholder: '用户名、手机号、微信号、QQ号、邮箱、企业号、企业名',
        options:[
          {
            No: 1,
            Id: 1,
            Name: '锁定',
            value: '1'
          },
          {
            No: 2,
            Id: 2,
            Name: '未锁定',
            value: '0'
          }          
        ],
        total: 0,
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          key: '',
          isLock: '',
          isActive: '-1'
        },
        tableData:[],
        currentRowObj: {},
        showDialog: false,
        userInfoData: [],
      }
    },
    created(){
      this._getAccountList()
    },
    watch: {
      'queryObj.isActive': {
        handler(newValue, oldValue){
          this._getComTables()
        }
      },
    },
    methods: {
      _getComTables(){
        this._getAccountList()
      },
      // 获取账户列表
      _getAccountList(){
        this.loading = true
        getAccountList(this.queryObj).then(res => {
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
      _resetSysAccountPwd(pwd){
        resetSysAccountPwd(this.currentRowObj, pwd).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success(`重置密码成功,新密码为：${pwd}`)
          }else {
            this.$message.error(`重置密码失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("重置密码出错了")
        })
      },
      // 密码重置
      resetPwd(row){
        this.currentRowObj = row
        this.$prompt(`请输入密码`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'   
        }).then(() => {
          this._resetSysAccountPwd(pwd)
        }).catch(() => {
          
        })
      },  
      _delSysUser(){
        delSysUser(this.currentRowObj.Id).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success("删除成功")
            this._getAccountList()
          }
        })
      },   

      // 用户
      handlerUser(row){
        this.currentRowObj = row
        this.showDialog = true
        // 获取用户列表
        this.$refs.userInfoCmp._getSysUserMgtList()
      },
      // 删除
      handlerDelete(row){
        this.$confirm("确定要删除吗？", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {        
          this.currentRowObj = row
          this._delSysUser()
        }).catch(() => {
          this.$message.info("已取消删除")
        })
      }   
    },
  }
</script>

