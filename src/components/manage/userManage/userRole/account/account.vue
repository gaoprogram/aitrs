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
    <div class="accountManage">
      <div>
        <el-input 
          v-model="searchTit"
          :placeholder="searchPlaceholder" 
          style="width: 300px"
          clearable
        >
        </el-input>
        <span>
          是否锁定
          <el-select clearable v-model="value" placeholder="请选择">
            <el-option 
              v-for="(item, index) in options"
              :key="item.Id + index"
              :label="item.Name"
              :value="item.Name"
            ></el-option>
          </el-select>
        </span>

        <el-button type="primary" size="small">搜索</el-button>
      </div>
      <div class="containerWrap">
        <el-tabs activate-name="first">
          <el-tab-pane label="激活">激活</el-tab-pane>
          <el-tab-pane label="冻结">冻结</el-tab-pane>
          <el-tab-pane label="全部">全部</el-tab-pane>
        </el-tabs>

        <el-table 
          style="width:100%"
          :data="tableData"
          border
        >
          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>

          <el-table-column
            prop="companyNo"
            label="企业号"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="companyName"
            label="企业名称"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="accountName"
            label="账户名称"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="qq"
            label="QQ号"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="wechat"
            label="微信号"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="mail"
            label="邮箱"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="loginIp"
            label="登录ip"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="errorTimes"
            label="试错次数"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="activation"
            label="激活"
            sortable
            show-overflow-tooltip
          >
            <template
              slot-scope="scope"
            >
              <span>{{scope.row.activation ? '已激活': '未激活'}}</span>
            </template>
          </el-table-column>   

          <el-table-column
            prop="lock"
            label="锁定"
            sortable
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.lock ? '已锁定': '未锁定'}}</span>
            </template>
          </el-table-column>      

          <el-table-column
            prop="lastLoginTime"
            label="上次登录时间"
            sortable
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>       

          <el-table-column
            prop="creatTime"
            label="创建时间"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>       

          <el-table-column
            prop="refreshTime"
            label="更新时间"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>      

          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="text">密码重置</el-button>
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
          :total="queryObj.total">
        </el-pagination>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { ManageAccountMixin } from '@/utils/Manage-mixins'
  export default {
    mixins: [ManageAccountMixin],
    data(){
      return {
        searchPlaceholder: '用户名、手机号、微信号、QQ号、邮箱、企业号、企业名',
        searchTit: '',
        value: '',
        options:[
          {
            No: 1,
            Id: 1,
            Name: '已锁定',
            value: '1'
          },
          {
            No: 1,
            Id: 1,
            Name: '未锁定',
            value: '0'
          }          
        ],
        queryObj: {
          pageSize: 10,
          pageIndex: 1,
          total: 0
        },
        tableData:[
          {
            companyNo: 20010,
            companyName: "小米科技",
            accountName: 'admin',
            qq: '20012',
            tel: '13823232323',
            wechat: 'wechat',
            mail: 'mail@163.com',
            loginIp: '192.168.1.23',
            errorTimes: 10,
            activation: false,
            lock: false,
            lastLoginTime: '2019-09-09',
            creatTime: '2019-10-10',
            refreshTime: '2019-10-11',
          }
        ]
      }
    },
    methods: {
      _getComTables(){
        
      }
    },
  }
</script>

