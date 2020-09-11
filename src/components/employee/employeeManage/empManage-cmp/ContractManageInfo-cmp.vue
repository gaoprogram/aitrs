<!--
  User: gaol
  Date: 2020/1/3
  功能： 员工详情页面中 点击 【合同管理】 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-loading-mask
  top -10px !important
</style>
<template>
  <div class="contractManage-cmp" v-loading= 'loading'>
    <!-- empInfo: {{empInfo}} -->
    <!--头像部分start--->
    <emp-avatar-info-cmp 
        :isContractManageDetail="true"
        :empInfo="empInfo"
    >
    </emp-avatar-info-cmp>
    <!--头像部分end-->

    <!----导航栏部分start--->
    <div class="tabBox">
      <tab-info-cmp
          @selectTabitem = "selectTabitem" 
          :tabList="tabsList">
      </tab-info-cmp>
    </div>
    <!--导航栏部分end---->

    <!--合同详情field部分start---->
    <div class="contractContentBox marginT20" v-loading="fieldContentLoading">
      <!-- contractDetailInfo: {{contractDetailInfo}} -->
      <contract-manage-field-content-cmp 
        :rowFieldDataArr="contractDetailInfo"
        :currentFieldsObj="currentFieldsObj"
        :currentTeamCode="currentTeamCode"
        :isAddOrEdit = "isAddOrEdit"
        ref="contractContentCmp"
        @editContractField="editContractField"
        @addContractField="addContractField"
        @deleteSuccess="deleteContractFieldSuccess"
      ></contract-manage-field-content-cmp>
    </div>
    <!--合同详情field部分end----->

    <!---编辑field弹框start---->
    <div class="editContractFieldBox" v-if="showEditContractDialog">
      <el-dialog
        title="编辑"
        fullscreen
        :visible.sync="showEditContractDialog"
        append-to-body
        :close-on-click-modal="false"
      >
        <field-edit-cmp 
          ref="contractEditFieldsCmp"
          :groupFieldData="currentFieldsObj"
          :isAddField="true"
          @isSubmit="isSubmit"
        ></field-edit-cmp>

        <div class="footerBox">
          <save-footer @save="saveContractField" @cancel="cancelContractField"></save-footer>
        </div>
      </el-dialog>
    </div>
    <!---编辑field弹框end---->
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EmpAvatarInfoCmp from '@/components/commonComponents-cmp/contractManageDetailAvatar-cmp'
  import TabInfoCmp from './ContractManageTabs-cmp'
  //   import TabInfoCmp from '../../contractManage/contractManage-cmp/Tabs-cmp'
  import ContractManageFieldContentCmp from '@/components/employee/contractManage/contractManage-cmp/ContractManageFieldContent-cmp'
  import FieldEditCmp from './FieldEdit-cmp'
  import { REQ_OK } from '@/api/config'
  import { parseTime } from '@/filters/index'
  import { 
    getContractType,
    getEmpInfo,
    getContractDetail,
    saveContract
   } from '@/api/employee' 
  import { PaGetDicDataSourceList } from '@/api/dic'

  // 员工类型
  const DicType_empType = 'SYS'
  const DicCode_empType = 'EmpType'

  // 员工状态
  const DicType_empStatus = 'CUS'
  const DicCode_empStatus = 'EmpStatus'   
  export default {
    props: {
      showCommonDialog: {
        type: Boolean,
        default: false
      },
      empObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // // 员工头像、级别等信息
      // empInfo: {
      //   type: Object,
      //   default: () => {
      //     return {}
      //   }
      // }      
    },
    components:{
      SaveFooter,
      EmpAvatarInfoCmp,
      TabInfoCmp,
      ContractManageFieldContentCmp,
      FieldEditCmp
    },
    data(){
      return {
        loading: false,
        fieldContentLoading: false,
        dialogVisible: this.showCommonDialog, 
        tabsList: [],
        currentTabStrIndex: 0,
        currentTabData: {},  
        contractDetailInfo: [],   // 合同详情 
        showEditContractDialog: false,
        currentTeamCode: '', 
        currentFieldsObj: {},  // 当前点击的编辑的合同field对象
        currentEditSavedFields: {}, // 当前编辑后保存的field对象
        isAddOrEdit: false, // false 编辑 true 为新增
        currentAddSavedFields: {}, // 当前新增后保存的field对象
        empInfo: {},  // 员工头像等信息
      }
    },
    created() {
      debugger
      // 获取 员工的分类
      this._getContractType()
      this._getEmpInfo()
    },
    watch: {
      dialogVisible: {
        handler(newValue, oldValue){
          debugger
          this.$emit("update:showCommonDialog", newValue)
        }
      },
      'currentTabData.TeamCode': {
        handler(newValue, oldValue){
          // 获取员工合同详情
          if(newValue){
            this.currentTeamCode = newValue
            this._getContractDetail(newValue, this.empObj.EmpId)
          }
        },
        immediate: true
      }
    },
    methods: {
      // 切换 tabitem 标签btn 
      selectTabitem (index, obj) {
        debugger
        this.currentTabStrIndex = index
        this.currentTabData = obj
      }, 
      // 获取 员工详情（头像、级别等）信息
      _getEmpInfo(){
          debugger
          getEmpInfo(this.empObj.EmpId).then(res => {
              debugger
              if(res && res.data.State === REQ_OK){
                  debugger
                  // console.log("----获取到的员工信息---",res.data.Data)
                  this.empInfo = res.data.Data
              }else{
                  this.$message.error(`获取员工相关信息失败err,${res.data.Error}`)
              }
          }).catch(() => {
              this.$message.warning(`获取员工相关信息出错`)
          })
      },      
      // 获取合同类型
      _getContractType() {
        getContractType().then(res => {
          if(res && res.data.State === REQ_OK){
            // debugger
            this.tabsList = res.data.Data
            this.currentTabData = res.data.Data[0]
          }else {
            this.$message.error(`获取合同类型数据失败,${res.data.Error}`)
          }
        }).catch(() => {
          // this.$message.warning("获取合同类型数据出错了")
        })
      }, 
      // 获取合同详情
      _getContractDetail(TeamCode, EmpId){
        this.fieldContentLoading = true
        getContractDetail(this.currentTeamCode, this.empObj.EmpId).then(res => {
          this.fieldContentLoading = false
          debugger
          if(res && res.data.State === REQ_OK){
            this.contractDetailInfo = res.data.Data
          }else {
            this.$message.error(`获取员工合同详情数据失败,${res.data.Error}`)
          }
        })
      },
      // 编辑合同表单
      editContractField(data){
        debugger
        this.currentFieldsObj = data
        this.showEditContractDialog = true
      }, 
      // 新增合同表单
      addContractField(data){
        debugger
        this.isAddOrEdit = true
        this.currentFieldsObj = data
        this.showEditContractDialog = true
      },
      // 保存编辑的合同fields
      _saveContract(groupFieldData){
        this.$refs.contractEditFieldsCmp.loading = true
        let strJson = ''
        if(!this.isAddOrEdit){
          // 编辑保存
          strJson = JSON.stringify(this.currentEditSavedFields)
        }else {
          // 新增保存
          strJson = JSON.stringify(this.currentAddSavedFields)
        }
        saveContract(this.currentTeamCode, this.empObj.EmpId, strJson).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$refs.contractEditFieldsCmp.loading = false
            this.$message.success("保存成功")
            this._getContractDetail(this.currentTeamCode, this.empObj.EmpId)
            this.showEditContractDialog = false
          }else {
            this.$message.error(`保存数据失败,${res.data.Error}`)
          }
        })
      },
      isSubmit(data, groupFieldData){
        debugger
        if(!this.isAddOrEdit){
          // 编辑的保存
          if(data && data.length){
            if(data[1] === true){
              this.currentEditSavedFields = groupFieldData
              // 调取保存合同的接口
              this._saveContract(groupFieldData)
            }else {

            }
          }
        }else {
          // 新增的保存
          if(data && data.length){
            if(data[1] === true){
              this.currentAddSavedFields = groupFieldData
              // 调取保存合同的接口
              this._saveContract(groupFieldData)
            }else {

            }
          }          
        }
      },
      // 编辑保存
      saveContractField(){
        // 直接调用子组件中的 submitForm 方法
        this.$refs.contractEditFieldsCmp.submitForm()
      },
      //编辑取消
      cancelContractField(){
        this.showEditContractDialog = false
      },
      // 删除表单
      deleteContractFieldSuccess(rowObj){
        this._getContractDetail()
      },
    }
  }
</script>
