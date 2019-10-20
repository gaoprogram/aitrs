<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--企业系统管理员
-->

<style lang="stylus" rel="stylesheet/syylus" scoped>
.sysManage
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="sysManage">
      <!--搜索区--start-->
      <div>
        <el-input 
          v-model="searchTit"
          :placeholder="searchPlaceholder" 
          style="width: 300px"
          clearable
        >
        </el-input>

        <span>
          角色
          <el-input list="role" v-model="role" style="width:200px"></el-input>
          <datalist id="role">
            <option value="角色一"></option>
            <option value="角色二"></option>
            <option value="角色三"></option>
          </datalist>             
        </span>

        <span>
          是否锁定
          <el-select clearable v-model="value" placeholder="请选择">
            <el-option 
              v-for="item in options"
              :key="item.Id"
              :label="item.Name"
              :value="item.Name"
            ></el-option>
          </el-select>
        </span>

        <el-button type="primary" size="small">搜索</el-button>
      </div>      
      <!---搜索区---end--->

      <!--table表格区--start--->
      <div class="containerWrap marginT20">
        <!-- <el-tabs activate-name="first">
          <el-tab-pane label="激活">激活</el-tab-pane>
          <el-tab-pane label="冻结">冻结</el-tab-pane>
          <el-tab-pane label="全部">全部</el-tab-pane>
        </el-tabs> -->

        <el-button 
          type="primary" 
          style="float:right;margin-bottom:10px" 
          size="mini"
          @click.native="addNewUser">
          新增用户
        </el-button>

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
            <tempate slot-scope="scope">
              <span>{{scope.row.lock ? '已锁定': '未锁定'}}</span>
            </tempate>
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
              <el-button type="text">冻结</el-button>
              <el-button type="text">激活</el-button>
              <el-button type="text">解锁</el-button>
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
      <!--table表格区--end---->

      <!--新增用户弹框---start-->
      <div class="addUserWrap" v-if="showAddUser">
        <el-dialog
          title="新增用户"
          width="60%"
          :visible.sync="showAddUser"
          append-to-body
          :close-on-click-modal="false"
        >
          <div class="item-container">
            <span class="tit"></span>
            <el-input style="display:inline-block;width:300px" placeholder="请输入"></el-input>
          </div>

          <div class="item-container">
            <span class="tit">企业号</span>
            <el-input style="display:inline-block;width:300px" placeholder="请输入"></el-input>
          </div>

          <div class="item-container">
            <span class="tit">账户名</span>
            <el-input style="display:inline-block;width:300px" placeholder="请输入"></el-input>
          </div>

          <div class="item-container">
            <span class="tit">密码</span>
            <el-input style="display:inline-block;width:300px" placeholder="请输入"></el-input>
          </div>     

          <div class="item-container">
            <span class="tit">qq</span>
            <el-input style="display:inline-block;width:300px" placeholder="请输入"></el-input>
          </div>    

          <div class="item-container">
            <span class="tit">手机</span>
            <el-input style="display:inline-block;width:300px" placeholder="请输入"></el-input>
          </div>  

          <div class="item-container">
            <span class="tit">微信</span>
            <el-input style="display:inline-block;width:300px" placeholder="请输入"></el-input>
          </div>  

          <div class="item-container">
            <span class="tit">邮箱</span>
            <el-input style="display:inline-block;width:300px" placeholder="请输入"></el-input>
          </div>  

          <save-footer @save="save" @cancel="cancel"></save-footer>                                   
        </el-dialog>      
      </div>
      <!---新增用户弹框----end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import { ManageAccountMixin } from '@/utils/Manage-mixins'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    mixins: [ManageAccountMixin],
    components: {
      SaveFooter
    },
    data(){
      return {
        showAddUser: false, // 控制 新增弹框的显示/隐藏
        searchPlaceholder: '用户名、手机号、微信号、QQ号、邮箱、企业号、企业名',
        searchTit: '',
        value: '',
        role: '',  
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
        
      },
      // 新增用户
      addNewUser(){
        this.showAddUser = true
      },
      save(){

      },
      cancel(){

      }
    },
  }
</script>
