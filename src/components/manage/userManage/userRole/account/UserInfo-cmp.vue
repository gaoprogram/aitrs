<!--
  User: gaol
  Date: 2019/10/13
  功能：平台系统设置——用户角色--账号
-->
<style lang="stylus" rel="stylesheet/syylus" scoped>
.accountManage
  padding 20px
  box-sizing border-box
</style>
<template>
    <div class="accountManage">
        <!-- <div>
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

            <el-button type="primary" size="small">搜索</el-button>
        </div> -->
      
        <div :class="['containerWrap', tableData.length<=0? 'not_found':'']" v-loading = 'loading'>
            <!-- tableData: {{tableData}} -->
            <el-table 
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
                    prop="AccountName"
                    label="用户名"
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
                    <span v-if="scope.row.IsActive === 1">已激活 {{ActiveDate | replaceTime}}</span>
                    <span v-if="scope.row.IsActive === 0">冻结 {{FrozenDate | replaceTime}}</span>
                </template>
                </el-table-column>   

                <el-table-column
                    prop="isLock"
                    label="锁定"
                    sortable
                    show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.isLock === 1">已锁定</span>
                    <span v-if="scope.row.isLock === 0">未锁定</span>
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
                <span >
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
                    <span >
                    {{  scope.row.Updated | replaceTime }}
                    </span>
                </template>            
                </el-table-column>      

                <!-- <el-table-column
                    label="操作"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click.native="resetPwd(scope.row)">编辑</el-button>
                        <el-button type="text" @click.native="handlerUser(scope.row)">用户</el-button>
                    </template>
                </el-table-column>                                                    -->
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
</template>

<script type="text/ecmascript-6">
  import { ManageAccountMixin } from '@/utils/Manage-mixins'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import {  REQ_OK } from '@/api/config'
  import {
    delSysUser,
    getSysUserMgtList
  } from '@/api/systemManage'
  export default {
    mixins: [ManageAccountMixin],
    components: {
      SaveFooter
    },
    data(){
      return {
        total: 0,
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          key: '',
          isLock: '',
          isActive: ''
        },
        tableData:[],
        currentRowObj: {},
      }
    },
    created(){
      this._getSysUserMgtList()
    },
    methods: {
      _getComTables(){
        this._getSysUserMgtList()
      },
      // 获取用户列表
      _getSysUserMgtList(){
        this.loading = true
        getSysUserMgtList().then(res => {
            debugger
            this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
            this.total = res.data.Total
          }else {
            this.$message.error(`获取用户列表失败,${res.data.Error}`)
          }
        })
      },
      // 用户
      handlerUser(row){
        this.currentRowObj = row
        // 获取用户列表
        this._getSysUserMgtList()
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
      // 删除用户
      _delSysUser(){
        delSysUser(this.currentRowObj.Id).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success("删除成功")
            this._getSysUserMgtList()
          }
        })
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

