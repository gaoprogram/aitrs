<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--权限应用列表
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.authority
  padding 0 20px 20px 20px
  // border 1px solid red
  border-bottom 1px solid #E4E7ED
  box-sizing border-box
  >>>.el-row
    height calc(100vh - 200px)
    .el-col-6
      height 100%
      border-right 1px solid #DCDFE6
      .menuTree-cmp
        border-right none !important
    .el-col-18
      height 100%
</style>

<template>
    <div class="authority animated fadeIn">
      <!-- treeData: {{treeData}} -->
      <el-row>
        <!---左边tree-start-->
        <el-col :span="6">
          <div class="menuTreeCmpBox" v-loading="treeLoading">
            <!---企业-start-->
            <div v-if="isCompanyOrSystemUser">
              <company-left-tree-cmp 
                ref="menuTreeCmp" 
                :treeData="treeData"          
                @treeNodeClick="treeNodeClick"
                @checkedPermission = "checkedPermission"
              >
              </company-left-tree-cmp>
            </div>
            <!--企业-end-->

            <!---系统-start-->
            <div v-else>
              <left-tree-cmp 
                ref="menuTreeCmp" 
                :treeData="treeData"          
                @treeNodeClick="treeNodeClick"
                @checkedPermission = "checkedPermission"
              >
              </left-tree-cmp>
            </div>
            <!--系统-end-->

          </div>
        </el-col>
        <!----左边tree---end-->          

        <!---右边设置区---START--->        
        <el-col :span="18">
          <div class="containerBox" v-loading="tableLoading">
            <!---企业-start-->
            <div v-if="isCompanyOrSystemUser">            
              <company-authority-content-set-cmp 
                ref="menuContentSetCmp" 
                :currentPcode="currentPcode"
                :currentKeyName="currentKeyName"
                :currentTreeNodeObj="currentTreeNodeObj"
                :currentCheckedPermissionObj="currentCheckedPermissionObj"
              ></company-authority-content-set-cmp>
            </div>
            <!---企业-end-->

            <!---系统-start-->
            <div v-else>            
              <authority-content-set-cmp 
                ref="menuContentSetCmp" 
                :currentPcode="currentPcode"
                :currentKeyName="currentKeyName"
                :currentTreeNodeObj="currentTreeNodeObj"
                :currentCheckedPermissionObj="currentCheckedPermissionObj"
              ></authority-content-set-cmp>
            </div>
            <!---系统-end-->            
          </div>
        </el-col>
        <!---右边设置区---end--->
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  // import MenuTreeCmp from '@/base/Manage-common-cmp/MenuTree-cmp'
  import { mapGetters } from 'vuex'
  import LeftTreeCmp from './LeftTree-cmp'
  import CompanyLeftTreeCmp from './company-authorityList-cmp/LeftTree-cmp'
  import AuthorityContentSetCmp from './AuthorityContentSet-cmp'
  import CompanyAuthorityContentSetCmp from './company-authorityList-cmp/AuthorityContentSet-cmp'
  import { 
    getComPermissionList, 
  } from '@/api/systemManage'
  import { REQ_OK } from '@/api/config'
  export default {
    components: {
      LeftTreeCmp,
      AuthorityContentSetCmp,
      CompanyLeftTreeCmp,
      CompanyAuthorityContentSetCmp
    },
    data(){
      return {
        treeLoading: false, // tree组件加载loading
        treeData: [],  // 树形组件的数据
        tableLoading: false, // 右边table表格区的loading
        currentPcode: '',  // 选取的菜单树的MenuCode,
        currentKeyName: '',
        currentTreeNodeObj: {}, // 选取的菜单树的node对象
        currentCheckedPermissionObj: {}, // 当前选取的 权限对象
      }
    },
    created(){
      this._getComPermissionList()
    },
    computed:{
      ...mapGetters([
        'isCompanyOrSystemUser'
      ])
    },
    methods: {
      // 初始化treeData
      _changeData(data ){
        debugger
        // let newData = []
        if(data && data.length){
          data.forEach((item, key) => {
            this.$set(item, 'id', item.Code)
            this.$set(item, 'label', item.Name)
            this.$set(item, 'children', item.Sub)
            this.$set(item, 'disabled', !item.IsPermission)
            if( item.Sub && item.Sub.length ){
              this._changeData(item.Sub)
            }
            // newData.push({
            //   id: item.Code,
            //   label: item.Name,
            //   children : item.Sub || [],
            //   Code: item.Code,
            //   Name: item.Name,
            //   Sub: item.Sub,
            //   Permissions: item.Permissions,
            // })          
          })
        }
        // debugger
        // console.log(data)
        // return data
      },
      // 获取树形结构数据
      _getComPermissionList(permissionName){
        debugger
        this.treeLoading = true
        getComPermissionList().then(res => {
          this.treeLoading = false
          if(res && res.data.State === REQ_OK){
            this.treeData = res.data.Data
            // changeData
            let resData = this._changeData(this.treeData)
            console.log(resData)
            // this.treeData = resData
          }else {
            this.$message({
              type: 'error',
              message: `获取树形组件的数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          // this.$message({
          //   type: 'warning',
          //   message: '获取树形组件的数据出错了'
          // })
        })
      },
      treeNodeClick(data){
        debugger
        this.currentPcode = data.Code
        this.currentKeyName = data.label
        this.currentTreeNodeObj = data
      },
      checkedPermission(checkedPermissionObj){
        debugger
        this.currentCheckedPermissionObj = checkedPermissionObj
      }
    }
  }
</script>