<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--用户组
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.userGroup
  padding 0 20px 20px 20px
  // border 1px solid red
  border-bottom 1px solid #E4E7ED
  box-sizing border-box
  >>>.el-row
    height calc(100vh - 140px)
    .el-col
      height 100%
      border-right 1px solid #DCDFE6
      .menuTreeCmpBox
        height 100%
        border-right none !important
        .companyMenuTree
          height 100%
</style>

<template>
    <div class="userGroup animated fadeIn">
      <!-- treeData: {{treeData}} -->
      <el-row>
        <!---左边tree-start-->
        <el-col :span="6">
          <div class="menuTreeCmpBox" v-loading="treeLoading">

            <!--企业角色组件--->
            <div class="companyMenuTree" v-if="isCompanyOrSystemUser">
 
              <company-left-menu-tree-cmp 
                ref="leftMenuTreeCmp" 
                :treeData="treeData"          
                @treeNodeClick="treeNodeClick"
              >
              </company-left-menu-tree-cmp>              
            </div>

            <!--系统角色组件--->
            <div v-else>
              <system-left-menu-tree-cmp 
                ref="leftMenuTreeCmp" 
                :treeData="treeData"          
                @treeNodeClick="treeNodeClick"
              >
              </system-left-menu-tree-cmp>                          
            </div>      

          </div>
        </el-col>
        <!----左边tree---end-->          

        <!---右边设置区---START--->        
        <el-col :span="18">
          <div class="containerBox" v-loading="tableLoading">

            <!---企业--->
            <!-- currentPcode: {{currentPcode}} -->
            <div v-if="isCompanyOrSystemUser">
              <company-menu-content-set-cmp
                ref="menuContentSetCmp" 
                :currentPcode="currentPcode"
                :currentTreeNodeObj="currentTreeNodeObj"
              ></company-menu-content-set-cmp>
            </div>
            
            <!--系统---->
            <div v-else>
              <system-menu-content-set-cmp 
                ref="menuContentSetCmp" 
                :currentPcode="currentPcode"
                :currentTreeNodeObj="currentTreeNodeObj"
              ></system-menu-content-set-cmp>
            </div> 

          </div>
        </el-col>
        <!---右边设置区---end--->
        
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import CompanyLeftMenuTreeCmp from './company-userGroup-cmp/LeftMenu-cmp'
  import SystemLeftMenuTreeCmp from './LeftMenu-cmp'
  import SystemMenuContentSetCmp from './MenuContentSet-cmp'
  import CompanyMenuContentSetCmp from './company-userGroup-cmp/MenuContentSet-cmp'
  import { mapGetters } from 'vuex'
  import { 
    getSysUserGroupTree, 
  } from '@/api/systemManage'
  import { REQ_OK } from '@/api/config'
  export default {
    components: {
      CompanyLeftMenuTreeCmp,
      SystemLeftMenuTreeCmp,
      SystemMenuContentSetCmp,
      CompanyMenuContentSetCmp
    },
    data(){
      return {
        treeLoading: false, // tree组件加载loading
        treeData: [],  // 树形组件的数据
        tableLoading: false, // 右边table表格区的loading
        currentPcode: '',  // 选取的菜单树的MenuCode,
        currentKeyName: '',
        currentTreeNodeObj: {}, // 选取的菜单树的node对象
      }
    },
    computed: {
      ...mapGetters([
        'isCompanyOrSystemUser'
      ])
    },
    created(){
      // this._getSysUserGroupTree()
    },
    methods: {
      // 初始化treeData
      _changeData(data ){
        debugger
        let newData = []
        if(data && data.length){
          data.forEach((item, key) => {
            if(item.Children && item.Children.length){
              _changeData(item.Children)
            }
            newData.push({
              id: item.Id,
              label: item.Title,
              children : item.Children,
              MenuCode: item.MenuCode,
              ModuleCode: item.ModuleCode,
              Title: item.Title,
              Id: item.Id,
              PCode: item.PCode,
              SortId: item.SortId,
              Icon: item.Icon,
              IsSys: item.IsSys,
              IsCom: item.IsCom,
              IsPerson: item.IsPerson,
              IsPC: item.IsPC,
              IsMobile: item.IsMobile,
              Description:item.Description,
              State: item.State,
              Deleted: item.Deleted,
              Created: item.Created,
              UpdateBy: item.UpdateBy,
              Updated: item.Updated,
              Children: item.Children,
              ModuleName: item.ModuleName,
              PageName: item.PageName
            })
          })
        }
        console.log(newData)
        return newData
      },
      // 树形菜单被点击
      treeNodeClick(data){
        debugger
        this.currentPcode = data.UserGroupCode
        // this.currentKeyName = data.label
        this.currentTreeNodeObj = data
      },      
      // 获取树形结构数据
      _getSysUserGroupTree(){
        debugger
        this.treeLoading = true
        getSysUserGroupTree(1).then(res => {
          this.treeLoading = false
          if(res && res.data.State === REQ_OK){
            this.treeData = res.data.Data
            // changeData
            let resData = this._changeData(res.data.Data)

            this.treeData = resData
            // console.log(this.treeData)
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
    }
  }
</script>

