<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--用户管理
-->

<style lang="stylus" rel="stylesheet/syylus" scoped>
>>>.el-dialog
  // margin-top 10vh
  // max-height 80vh
.scanDialog
  .el-form-item
    margin-bottom 2px !important
.editDialog
  .el-form-item
    margin-bottom 20px !important
>>>.el-loading-mask
  background-color rgba(255,255,255,0.01) !important
>>>.el-form
  // height 400px
  // overflow auto
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
      <!-- companyCode: {{companyCode}} -->
      <!-- currentRowObj: {{currentRowObj}} -->
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
          <el-cascader
            expand-trigger="hover"
            :options="roleOptions"
            :props="{
              value: 'RoleId',
              label: 'RoleName',
              children: 'Children'
            }"
            v-model="queryObj.roleId">
          </el-cascader>          
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
          @click.native="clickSearchBtn">
          搜索
        </el-button>
        <el-button 
          type="primary" 
          @click.native="handlerReset">
          重置
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

          <!-- <el-button 
            type="primary" 
            size="mini"
            style="float:right;margin-bottom:10px" 
            @click.native="addNewUser">
            开通用户
          </el-button>       -->
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


        <!--自定义表头列弹框----start-->
        <div class="setShowColumnBox" v-if="showSetColumnDailog">
            <el-dialog
                title="设置显示列"
                width="70%"
                append-to-body
                :visible.sync="showSetColumnDailog"
                :close-on-click-modal="false"
                custom-class="setShowColumn-dialog"
            >
                <!---引入设置自定义显示列组件--start-->
                <show-column-cmp 
                    ref="showColumnCmp"
                    :obj="currentTableObj"
                    :tableHeaderData="tableHeaderData"
                    @saveSuccess="saveSuccess"
                    @cancelSuccess="cancelSuccess"
                >
                </show-column-cmp>  
                <!--引入设置自定义显示列组件--end-->              
            </el-dialog>
        </div>
        <!--自定义表头列弹框----end-->


        <!---设置自定义表头列btn--start-->
        <div 
            class="setShowColumnBtn clearfix"
        >
            <span class="lt marginB10" @click="handleSetShowColumn">
                <!-- <el-tooltip content="设置表头列"> -->
                    <el-button 
                        size="mini"
                        type="primary" 
                        icon="el-icon-setting"
                    >
                        设置表头列
                    </el-button>                    
                <!-- </el-tooltip> -->
            </span>
        </div>
        <!---设置自定义表头列btn--end-->


        <!-- tableData： {{tableData}} -->
        <div :class="['tableBox', tableData.length<=0? 'not_found': '']" v-loading = "loading">
          
          <el-table 
            style="width:100%"
            max-height="400"
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
                v-for="(item,key) in currentThead" 
                v-if="!item.Hidden"
                :key="key"
                :label="item.FieldName" 
                :property="item.property"
                width="150"
                sortable
                :fixed="item.Lock===1"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                  <!-- scope.row: {{scope.row}}----- -->
                  <span v-if="scope.column.property == 'CompanyNameCn'">
                    <span>
                      {{scope.row.CompanyNameCn}}
                    </span>                 
                  </span>
                  <span v-else>
                    <span v-if="scope.column.property == 'State'">
                      <span v-if="scope.row[scope.column.property] == 0">
                        冻结
                      </span>
                      <span v-if="scope.row[scope.column.property] == 1">
                        激活
                      </span>
                    </span>
                    <span v-if="scope.column.property != 'State'">
                      {{scope.row[scope.column.property]}}
                    </span>
                  </span>
                </template>
            </el-table-column>

            <el-table-column 
              label="操作"
              min-width="420"
              fixed="right">
              <template slot-scope="scope">
                <el-button 
                  type="text" 
                  size="mini" 
                  @click.native="handlerScan(scope.row)"
                >查看</el-button>    
                <!---外部用户--->            
                <el-button 
                  v-show="!scope.row.EmpId"
                  type="text" 
                  size="mini" 
                  @click.native="handlerEdit(scope.row)"
                >编辑</el-button>
                <!-- <el-button type="text" size="mini" @click.native="hanlderResetSysAccountPwd(scope.row)">密码重置</el-button> -->
                <el-button type="text" size="mini" v-if="scope.row.State==0" @click.native="handlerAccountActive(scope.row, 1)">激活</el-button>
                <el-button type="text" size="mini" v-if="scope.row.State==1" @click.native="handlerAccountActive(scope.row, 0)">冻结</el-button>
                <!-- <el-button type="text" size="mini" v-if="scope.row.IsLock===1" @click.native="handlerAccountLock(scope.row,0)">解锁</el-button>
                <el-button type="text" size="mini" v-if="scope.row.IsLock===0" @click.native="handlerAccountLock(scope.row,1)">锁定</el-button> -->
                <el-button type="text" size="mini" @click.native="handlerAddtoUserGroup(scope.row)">添加到用户组</el-button>
                <el-button type="text" size="mini" @click.native="handlerPermitRights(scope.row)">许可权</el-button>
                <el-button type="text" size="mini" @click.native="handlerShowData(scope.row)">显示数据</el-button>
                <el-button type="text" size="mini" @click.native="handlerAuthrize(scope.row)">授权</el-button>
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
          fullscreen
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
        <!-- <el-dialog
          v-loading="dialogLoading"
          :title="dialogTit"
          fullscreen
          :visible.sync="showAddUser"
          append-to-body
          :close-on-click-modal="false"
        > -->
        <atris-drawer-cmp
          v-if="showAddUser"
          :tit="dialogTit"    
          :dialog.sync="showAddUser"        
          @emitClickSureBtn="save"
        >          
          <el-row slot="container-slot">
            <el-col style="float:none" :span="12">
              <!-- currentRowObj： {{currentRowObj}} -->
              <!-- <el-card> -->
                <el-form 
                  ref="dialogForm" 
                  :model="currentRowObj" 
                  :rules="formRules" 
                  class="editDialog"
                  label-width="120px">
                  <el-form-item label="企业号" prop="CompanyCode">
                    <!-- <el-input v-model="currentRowObj.CompanyCode" style="width:300px"></el-input> -->
                    <el-button type="text">{{currentRowObj.CompanyCode}}</el-button>
                  </el-form-item>
                  <el-form-item label="企业名" prop="CompanyNameCn">
                    <!-- <el-input v-model="currentRowObj.CompanyNameCn" style="width:300px"></el-input> -->
                    <el-button type="text">{{currentRowObj.CompanyNameCn}}</el-button>                  
                  </el-form-item>
                  <el-form-item  
                    v-if="editOrAddFlag !=2" 
                    label="用户号" 
                    prop="UserId">
                    <!-- <el-input v-model="" style="width:300px"></el-input> -->
                    <el-button type="text">{{currentRowObj.UserId}}</el-button>
                  </el-form-item>
                  <el-form-item  
                    v-if="editOrAddFlag ==2" 
                    label="用户号" 
                    prop="UserId">
                    <!-- <el-input v-model="" style="width:300px"></el-input> -->
                    <el-button type="text">系统自动生成</el-button>
                  </el-form-item>                
                  <el-form-item label="姓名" prop="RealName">
                    <el-input  v-model="currentRowObj.RealName" style="width:300px"></el-input>
                  </el-form-item>
                  <el-form-item 
                    v-if="currentRowObj.EmpId"
                    label="公司" 
                    prop="CompanyNameCn">
                    <el-input  v-model="currentRowObj.CompanyNameCn" style="width:300px"></el-input>
                  </el-form-item>     
                  <el-form-item 
                    v-if="!currentRowObj.EmpId"
                    label="公司" 
                    prop="ExternalCompany">
                    <el-input  v-model="currentRowObj.ExternalCompany" style="width:300px"></el-input>
                  </el-form-item>                            
                  <el-form-item 
                    label="组织" prop="OrgName">
                    <!-- <el-input v-model="currentRowObj.OrgName" style="width:300px"></el-input> -->
                    <!---引用通用组织选择器--->
                    <!-- <common-select-cmp 
                      v-if="editOrAddFlag == 1 || (editOrAddFlag == 0 && !currentRowObj.EmpId)"
                      title="" 
                      :tabType="['zuzhi']" 
                      :selectedList="selectedOrgList"
                      componentId="zuzhi"
                      @upData="upData"
                    ></common-select-cmp> -->
                    <el-input
                      v-model="currentRowObj.OrgName"
                      style="width: 300px"
                      v-if="editOrAddFlag == 2 || editOrAddFlag == 0"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="岗位" prop="PositionName">
                    <!-- <el-input v-model="currentRowObj.PositionName" style="width:300px"></el-input> -->
                    <!---引用通用岗位选择器--->
                    <!-- <common-select-cmp 
                      v-if="editOrAddFlag == 1 || (editOrAddFlag == 0 && !currentRowObj.EmpId)"
                      title="" 
                      :tabType="['gangwei']" 
                      :selectedList="selectedPosList"
                      componentId="gangwei"
                      @upData="upData"
                    ></common-select-cmp> -->
                    <el-input
                      style="width: 300px"
                      v-model="currentRowObj.PositionName"
                      v-if="editOrAddFlag == 2 || editOrAddFlag == 0"
                      clearable
                    >
                    </el-input>                  
                  </el-form-item>
                  <el-form-item 
                    v-if="editOrAddFlag == 0 && !currentRowObj.EmpId"
                    label="账号名" prop="AccountName">
                    <el-button type="text">{{currentRowObj.AccountName}}</el-button>
                  </el-form-item>
                  <el-form-item 
                    v-if="editOrAddFlag == 2"
                    label="关联账号名" prop="AccountName">
                    <el-button type="text">系统生成</el-button>
                  </el-form-item>                
                  <el-form-item label="手机号" prop="Mobile">
                    <el-input v-model="currentRowObj.Mobile" style="width:300px"></el-input>
                  </el-form-item>                
                  <el-form-item label="邮箱" prop="Email">
                    <el-input v-model="currentRowObj.Email" style="width:300px"></el-input>
                  </el-form-item>
                  <el-form-item label="激活状态" prop="State">
                    <el-switch
                      v-model="currentRowObj.State"
                      :active-value="1"
                      :inactive-value="0"
                    >
                    </el-switch>
                  </el-form-item>                
                </el-form>
                <!-- <save-footer @save="save" @cancel="cancel"></save-footer>                                    -->
              <!-- </el-card> -->
            </el-col>
          </el-row>
        <!-- </el-dialog>       -->
        </atris-drawer-cmp>
      </div>
      <!---新增/编辑用户弹框----end-->

            <!--用户查看start--->
      <div class="userInfoScan" v-if="showScanDialog">
        <!-- <el-dialog
          width="25%"
          :visible.sync="showScanDialog"
          :close-on-click-modal="false"
          :append-to-body="true"
        > -->
        <atris-drawer-cmp
          v-if="showScanDialog"
          tit="查看"    
          :showSaveBtn="false"
          :dialog.sync="showScanDialog"        
          @emitClickSureBtn=""
        >           
          <!-- currentScanRow: {{currentScanRow}} -->
          <el-form slot="container-slot" :model="currentScanRow" label-width="50px" class="scanDialog">
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">企业号:</span>              
              <span>{{currentScanRow.CompanyCode}}</span>
            </el-form-item>
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">企业名:</span>              
              <span>{{currentScanRow.CompanyNameCn}}</span>
            </el-form-item>
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">用户号:</span>               
              <span>{{currentScanRow.UserId}}</span>
            </el-form-item>   
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">姓名:</span>               
              <span>{{currentScanRow.RealName}}</span>
            </el-form-item> 
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">员工号:</span>                
              <span>{{currentScanRow.EmpId}}</span>
            </el-form-item>  
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">公司:</span>               
              <span v-if="currentScanRow.EmpId">
                <span>{{currentScanRow.CompanyNameCn}}</span>
              </span>
              <span v-if="!currentScanRow.EmpId">
                <span>{{currentScanRow.ExternalCompany}}</span>
              </span>              
            </el-form-item> 
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">组织:</span>              
              <span>{{currentScanRow.OrgName}}</span>
            </el-form-item> 
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">岗位:</span>               
              <span>{{currentScanRow.PositionName}}</span>
            </el-form-item>  
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">关联账号名:</span>               
              <span>{{currentScanRow.AccountName}}</span>
            </el-form-item>   
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">手机号:</span>              
              <span>{{currentScanRow.Mobile}}</span>
            </el-form-item>    
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">邮箱：</span>
              <span>{{currentScanRow.Email}}</span>
            </el-form-item>               
            <el-form-item label="">
              <span style="font-size:15px;font-weight:500;margin-right:10px">激活状态:</span>              
              <span v-if="currentScanRow.State == 1">激活</span>
              <span v-if="currentScanRow.State == 0">冻结</span>
            </el-form-item>                                                                                                                                    
          </el-form>

          <!-- <div class="center marginB10">
            <el-button type="primary" @click.native="cancelDialog">取消</el-button>
          </div> -->
        <!-- </el-dialog> -->
        </atris-drawer-cmp>
      </div>
      <!--用户查看end---->

      <!--许可权弹框--->
      <div class="editRoleBox animated fadeIn" v-if="showPermitRightsDialog">
        <el-dialog
          title="许可权"
          fullscreen
          append-to-body
          :visible.sync="showPermitRightsDialog"
          :close-on-click-modal="false"
        >
          <div class="permitRightsBox">
            <company-permitrights-cmp
              ref="companyRolePermitRightsCmp"
              :obj="currentRowObj"
              :isFromUserManageFlag="true"
            >
            </company-permitrights-cmp>
          </div>

          <!-- <div class="footer">
            <save-footer @save="savePermitRights" @cancel="cancelPermitRights"></save-footer>
          </div> -->
        </el-dialog>
      </div>
      <!---许可权弹框-->     

      <!--显示数据弹框--->
      <div class="editRoleBox animated fadeIn" v-if="showDataDialog">
        <el-dialog
          title="显示数据"
          fullscreen
          append-to-body
          :visible.sync="showDataDialog"
          :close-on-click-modal="false"
        >
          <div class="showDataBox">
            <company-show-data-cmp
              ref="companyShowDataCmp"
              :obj="currentRowObj"
              :isRole="false"
              :propUserId="currentRowObj.UserId"
            >
            </company-show-data-cmp>
          </div>

          <!-- <div class="footer">
            <save-footer @save="savePermitRights" @cancel="cancelPermitRights"></save-footer>
          </div> -->
        </el-dialog>
      </div>
      <!---显示数据弹框-->         
    </div>
</template>

<script type="text/ecmascript-6">
  import { ManageAccountMixin } from '@/utils/Manage-mixins'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import ShowColumnCmp from './SetShowColumn-cmp'
  import AddToUserGroupCmp from '@/base/Manage-common-cmp/addToUsergroup-cmp/addToUsergroupWrap-cmp'
  import CompanyAuthrizeCmp from '@/base/Manage-common-cmp/authrize-cmp/company-authrize-cmp/authrize'
  // import CompanyPermitrightsCmp from './permitRights-cmp'
  // 引入公用的 许可权列表组件
  import CompanyPermitrightsCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/permitRights-cmp'
  // import CompanyShowDataCmp from './showData-cmp'
  // 引用公用的 显示数据组件
  import CompanyShowDataCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/showData-cmp'
  // import CompanyPermitrightsCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/permitRights-cmp'  
  import { REQ_OK  } from '@/api/config'
  import CommonSelectCmp from '@/base/Company-structure-cmp/select-cmp'
  import { mapGetters } from 'vuex'
  import { validatMobilePhone, validatEmail } from '@/utils/validate' 
  import {
    ComRoleDroplist,
    getCompUserMgtList,
    getComUser,
    GetSysCompany,
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
      ShowColumnCmp,
      CompanyShowDataCmp
    },
    data(){
      let validMobile = (rule, value, callback) => {
        if(validatMobilePhone(this.currentRowObj.Mobile)){
          callback()
        }else {
          callback(new Error('手机号码格式不正确'))
        }
      }
      let validEmail = (rule, value, callback) => {
        if(validatEmail(this.currentRowObj.Email)){
          callback()
        }else {
          callback(new Error('邮箱格式不正确'))
        }
      }
      return {
        loading: false,
        showAddUser: false, // 控制 新增弹框的显示/隐藏
        searchPlaceholder: '员工号、姓名、角色',
        showSetColumnDailog: false, // 控制 显示列设置弹框的显示/隐藏
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
        roleOptions: [],
        total: 0,    
        queryObj: {
          pageSize: 10,
          pageNum: 1,
          roleId: [], // 权限id
          userGroupCode: '', //用户组code
          roleLevel: '-1',  //角色级别，默认-1全部
          userType: '-1', // 外部用户0 内部用户 1 全部 -1
          key: '', // 多功能搜索关键字
          isLock: '-1', //是否锁定，0否 1是，默认-1全部
          state: '-1',  //是否激活，0冻结 1 激活 -1 全部 
        },
        showPermitRightsDialog: false, // 许可权弹框的显示/隐藏
        showDataDialog: false, // 显示数据弹框的 显示/隐藏
        tableData:[],
        currentRowObj: {
          "Id": 0,
          "CompanyCode": '',
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
          "State": "1",
          "RoleLevel":'',
          "IsLock":'',
          "UserId":"" ,
          "RealName": '',
          "LinkMan": '',
          "Mobile": '',
          "Email": ''      
        },
        dialogLoading: false,   // 编辑、新增内部用户、新增外部用户弹框loading
        formRules: {
          CompanyCode: [{required: true, message: '请填写企业号', trigger: blur}],
          CompanyNameCn: [{required: true, message: '请填写企业名称', trigger: blur}],
          // EmpId: [{required: true, message: '请填写员工号', trigger: blur}],
          RealName:[{required: true, message: '请填写员工姓名', trigger: blur}],
          OrgName: [{required: true, message: '请填写组织名称', trigger: blur}],
          PositionName: [{required: true, message: '请填写岗位名称', trigger: blur}],
          // AccountName: [{required: true, message: '请填写关联账户名', trigger: blur}],
          LinkMan: [{required: true, message: '请填写关联账户名', trigger: blur}],
          UserName:[{required: true, message: '请填写用户名', trigger: blur}],
          Mobile:[{required: true, validator: validMobile, trigger: blur}],
          Email:[{required: true, validator: validEmail, trigger: blur}],
        },
        selectedOrgList:[],    // 已选组织集合
        selectedPosList: [], // 已选岗位集合
        currentTableObj: {
          Fields: [
            {
              FieldName: '企业号',
              property: 'CompanyCode',
              Lock: 0,
              Hidden: 0
            },
            {
              FieldName: '企业名称',              
              property: 'CompanyNameCn',
              Lock: 0,
              Hidden: 0          
            },
            {
              FieldName: '企业员工号',
              property: 'EmpId',
              Lock: 0,
              Hidden: 0           
            },   
            {
              FieldName: '姓名',
              property: 'RealName',
              Lock: 0,
              Hidden: 0            
            },  
            {
              FieldName: '用户号',
              property: 'UserId',
              Lock: 0,
              Hidden: 0           
            }, 
            {
              FieldName: '公司',
              property: 'ExternalCompany',
              Lock: 0,
              Hidden: 0           
            },             
            {
              FieldName: '关联账户名',
              property: 'AccountName',
              Lock: 0,
              Hidden: 0            
            },            
            // {
            //   FieldName: '真实姓名',
            //   property: 'RealName',
            //   Lock: 0,
            //   Hidden: 0            
            // },
            {
              FieldName: '手机号码',
              property: 'LinkPhone',
              Lock: 0,
              Hidden: 0            
            },    
            {
              FieldName: '邮箱',
              property: 'Email',
              Lock: 0,
              Hidden: 0            
            },                                     
            {
              FieldName: '组织',
              property: 'OrgName',
              Lock: 0,
              Hidden: 0            
            },  
            {
              FieldName: '岗位',
              property: 'PositionName',
              Lock: 0,
              Hidden: 0             
            },         
            {
              FieldName: '上次登陆时间',
              property: 'LoginDateTime',
              Lock: 0,
              Hidden: 0            
            }, 
            {
              FieldName: '创建时间',
              property: 'Created',
              Lock: 0,
              Hidden: 0             
            },   
            {
              FieldName: '更新时间',
              property: 'Updated',
              Lock: 0,
              Hidden: 0            
            },   
            {
              FieldName: '系统企业角色',
              property: 'SysRole',
              Lock: 0,
              Hidden: 0            
            },   
            {
              FieldName: '企业自定义角色',
              property: 'CompRole',
              Lock: 0,
              Hidden: 0            
            },   
            {
              FieldName: '状态',
              property: 'State',
              Lock: 0,
              Hidden: 0            
            },                                                                                                                                     
          ]
        },
        tableHeaderData: [
          {
            label: '名称',
            property: 'FieldName'
          },
          // {
          //   label:'姓名',
          //   property: 'empName'
          // },
          // {
          //   label:'地址',
          //   property:'address'
          // } 
        ],
        currentThead: [
          {
            FieldName:'企业号',
            property: 'CompanyCode',
            Lock: 0,
            Hidden: 0            
          },
          {
            FieldName:'企业名称',
            property: 'CompanyNameCn',
            Lock: 0,
            Hidden: 0                 
          },     
          {
            FieldName:'企业员工号',
            property: 'EmpId',
            Lock: 0,
            Hidden: 0              
          },    
          {
            FieldName:'姓名',
            property: 'RealName',
            Lock: 0,
            Hidden: 0              
          },   
          {
            FieldName:'用户号',
            property: 'UserId',
            Lock: 0,
            Hidden: 0              
          },   
          {
            FieldName: '公司',
            property: 'ExternalCompany',
            Lock: 0,
            Hidden: 0           
          },           
          {
            FieldName:'关联账户名',
            property: 'AccountName',
            Lock: 0,
            Hidden: 0                
          },            
          // {
          //   FieldName: '真实姓名',
          //   property: 'RealName',
          //   Lock: 0,
          //   Hidden: 0            
          // },
          {
            FieldName: '手机号码',
            property: 'Mobile',
            Lock: 0,
            Hidden: 0            
          },    
          {
            FieldName: '邮箱',
            property: 'Email',
            Lock: 0,
            Hidden: 0            
          },            
          {
            FieldName:'组织',
            property: 'OrgName',
            Lock: 0,
            Hidden: 0                
          },   
          {
            FieldName:'岗位',
            property: 'PositionName',
            Lock: 0,
            Hidden: 0                 
          },        
          {
            FieldName:'上次登陆时间',
            property: 'LoginDateTime',
            Lock: 0,
            Hidden: 0             
          },  
          {
            FieldName:'创建时间',
            property: 'Created',
            Lock: 0,
            Hidden: 0              
          },    
          {
            FieldName:'更新时间',
            property: 'Updated',
            Lock: 0,
            Hidden: 0              
          }, 
          {
            FieldName:'系统企业角色',
            property: 'SysRole',
            Lock: 0,
            Hidden: 0            
          },
          {
            FieldName:'企业自定义角色',
            property: 'CompRole',
            Lock: 0,
            Hidden: 0               
          },  
          {
            FieldName: '状态',
            property: 'State',
            Lock: 0,
            Hidden: 0            
          },                                                                                                                            
        ],
        showScanDialog: false, 
        currentScanRow: {}     
      }
    },
    computed: {
      dialogTit(){
        if( this.editOrAddFlag == 0){
          return '编辑'
        }else if( this.editOrAddFlag == 1 ){
          return '新增内部用户'
        }else if( this.editOrAddFlag == 2){
          return '新增外部用户'
        }
      },
      ...mapGetters([
        'companyCode'
      ])
    },
    watch: {
      companyCode:{
        handler(newValue, oldValue){
          this.currentRowObj.CompanyCode = newValue
        },
        immediate: true
      },
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
      // 获取 搜索框中的角色下拉框数据源
      this._ComRoleDroplist()
    },
    methods: {
      _getComTables(){
        this._getCompUserMgtList()
      },
      // 搜索
      clickSearchBtn(){
        this.queryObj.pageNum = 1
        this._getComTables()
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
      // 设置列显示
      handleSetShowColumn(){
          debugger
          this.showSetColumnDailog = true
      },      
      // 设置列 保存成功
      saveSuccess(data){
        debugger
        this.showSetColumnDailog = false
        if(data && data.length){
          this.currentThead = data
        }
      },
      // 设置列取消成功
      cancelSuccess() {
          this.showSetColumnDailog = false
      },      
      // 获取角色下拉源
      _ComRoleDroplist(){
        ComRoleDroplist().then(res => {
          if(res && res.data.State === REQ_OK){
            this.roleOptions = res.data.Data
            if(this.roleOptions.length){
              this.roleOptions.forEach((item, key) => {
                this.$set(item, 'RoleId', '')
              })
            }
          }else {
            this.$message.warning(`获取角色下拉源数据失败,${res.data.Error}`)
          }
        })
      },
      // 获取账户列表
      _getCompUserMgtList(){
        this.loading = true
        if(this.queryObj.roleId && this.queryObj.roleId.length){
          let length = this.queryObj.roleId.length
          this.queryObj.roleId = this.queryObj.roleId[length-1]
        }else {
          this.queryObj.roleId = ''
        }
        this.queryObj.roleId
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
      cancelDialog(){
        this.showScanDialog = false
      },
      // 重置
      handlerReset(){
        this.queryObj = {
          pageSize: 10,
          pageNum: 1,
          roleId: '', // 权限id
          userGroupCode: '', //用户组code
          roleLevel: '-1',  //角色级别，默认-1全部
          userType: '-1', // 外部用户0 内部用户 1 全部 -1
          key: '', // 多功能搜索关键字
          isLock: '-1', //是否锁定，0否 1是，默认-1全部
          state: '-1',  //是否激活，0冻结 1 激活 -1 全部           
        }
        this._getComTables()
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
      // 查看
      handlerScan(row){
        debugger
        this.currentScanRow = row
        this.showScanDialog = true
      },
      // 获取本企业相关信息
      _GetSysCompany(){
          GetSysCompany(this.companyCode).then(res => {
              if(res && res.data.State === REQ_OK){
                debugger
                // this.$set(this.currentRowObj, 'ExternalCompany', res.data.Data.CompanyNameCn)
                this.currentRowObj.CompanyNameCn = res.data.Data.CompanyNameCn
              }else {
                  this.$message.error(`获取企业相关信息失败,${res.data.Error}`)
              }
          })
      },      
      // 编辑
      handlerEdit(row){
        debugger
        this.editOrAddFlag = 0  // 0 编辑 1 新增内部 2 新增外部
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        if(!this.currentRowObj.EmpId){
          // 外部用户，此时调用 接口 获取外部用户的 企业名和 公司名
          this._GetSysCompany()
        }
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
        this.$confirm(`确定要删除"${row.RealName}"吗?`,"提示",{
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
        debugger
        this.currentRowObj = row
        this.showPermitRightsDialog = true          
      },  
      // 显示数据
      handlerShowData(row){
        debugger
        this.currentRowObj = row
        this.showDataDialog = true
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
        this.editOrAddFlag = 2   // 2 新增外部
        this.currentRowObj = {
          "Id": 0,
          "CompanyCode": this.companyCode,
          "CompanyNameCn":"",
          "EmpId":"",
          "EmployeeName":"",
          "RealName": "",
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
          "UserId":"",
          "Mobile":"",
        }
        debugger
        this._GetSysCompany()
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
          "CompanyCode": this.companyCode,
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
