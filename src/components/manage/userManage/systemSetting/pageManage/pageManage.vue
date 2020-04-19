<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--页面管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.pageManage
  padding 0 20px 20px 20px
  // border 1px solid red
  border-bottom 1px solid #E4E7ED
  box-sizing border-box
  >>>.el-row
    height calc(100vh - 200px)
    .el-col
      height 100%
      border-right 1px solid #DCDFE6
      .menuTree-cmp
        height 100%
        border-right none !important
</style>

<template>
    <div class="pageManage animated fadeIn">
      <!-- treeData: {{treeData}} -->
      <el-row>
        <!---左边tree-start-->
        <el-col :span="4">
          <div class="menuTreeCmpBox" v-loading="treeLoading">
            <menu-tree-cmp 
              ref="menuTreeCmp" 
              :treeData="treeData"          
              @treeNodeClick="treeNodeClick"
            >
            </menu-tree-cmp>
          </div>
        </el-col>
        <!----左边tree---end-->          

        <!---右边设置区---START--->        
        <el-col :span="20">
          <div class="containerBox" v-loading="tableLoading">
            <page-table-content-cmp 
              ref="pageContentCmp" 
              :currentPcode="currentPcode"
              :currentKeyName="currentKeyName"
              :currentTreeNodeObj="currentTreeNodeObj"
            ></page-table-content-cmp>
          </div>
        </el-col>
        <!---右边设置区---end--->
        
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import MenuTreeCmp from '@/base/Manage-common-cmp/MenuTree-cmp'
  import PageTableContentCmp from './PageTableContent-cmp'
  import { 
    getSysMenuTree, 
  } from '@/api/systemManage'
  import { REQ_OK } from '@/api/config'
  export default {
    components: {
      MenuTreeCmp,
      PageTableContentCmp
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
    created(){
      this._getSysMenuTree()
    },
    methods: {
      // 初始化treeData
      _changeData(data ){
        debugger
        if(data && data.length){
          data.forEach((item, key) => {
            this.$set(item, 'id', item.Id)
            this.$set(item, 'label', item.Title)
            this.$set(item, 'children', item.Children)
            this.$set(item, 'MenuCode', item.MenuCode)
            this.$set(item, 'Id', item.Id)
            this.$set(item, 'PCode', item.PCode)
            this.$set(item, 'SortId', item.SortId)
            this.$set(item, 'Icon', item.Icon)
            this.$set(item, 'IsSys', item.IsSys)
            this.$set(item, 'IsCom', item.IsCom)
            this.$set(item, 'IsPerson', item.IsPerson)
            this.$set(item, 'IsPC', item.IsPC)
            this.$set(item, 'IsMobile', item.IsMobile)
            this.$set(item, 'Description', item.Description)
            this.$set(item, 'State', item.State)
            this.$set(item, 'Deleted', item.Deleted)
            this.$set(item, 'Created', item.Created)
            this.$set(item, 'UpdateBy', item.UpdateBy)
            this.$set(item, 'Updated', item.Updated)
            this.$set(item, 'Children', item.Children)
            this.$set(item, 'ModuleName', item.ModuleName)
            this.$set(item, 'PageName', item.PageName)
            if(item.Children && item.Children.length){
              this._changeData(item.Children)
            }
          })
        }
      },
      // 获取树形结构数据
      _getSysMenuTree(){
        debugger
        this.treeLoading = true
        getSysMenuTree().then(res => {
          this.treeLoading = false
          if(res && res.data.State === REQ_OK){
            this.treeData = res.data.Data
            // changeData
            this._changeData(this.treeData)
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
      // 点击 tree 节点后触发的
      treeNodeClick(data){
        debugger
        this.currentPcode = data.MenuCode
        this.currentKeyName = data.label
        this.currentTreeNodeObj = data
      },
    }
  }
</script>


