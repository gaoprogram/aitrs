<!--
  User: gaol
  Date: 2019/8/9
  功能：基础设置- 显示组表配置
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.showGroupSet
  padding 0 20px 20px 20px
  // border 1px solid red
  border-bottom 1px solid #E4E7ED
  box-sizing border-box
  >>>.el-row
    height calc(100vh - 250px)
    .el-col
      height 100%
      border-right 1px solid #DCDFE6
      &:last-child
        border-right none
      .menuTreeCmpBox
        height 100%
      .containerBox
        height 100%
        padding 10px 20px
        box-sizing border-box
        border-right none !important
</style>

<template>
    <div class="showGroupSet animated fadeIn fast">
      <!-- treeData: {{treeData}} -->
      <el-row>
        <!---左边tree-start-->
        <el-col :span="6">
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
        <el-col :span="18">
          <div class="containerBox" v-loading="tableLoading">
            <menu-content-set-cmp 
              ref="menuContentSetCmp" 
              :currentPcode="currentPcode"
              :currentKeyName="currentKeyName"
              :obj="currentTreeNodeObj"
            ></menu-content-set-cmp>
          </div>
        </el-col>
        <!---右边设置区---end--->
        
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import MenuTreeCmp from '@/base/PA-common-cmp/groupTableTree-cmp/MenuTree-cmp'
  import MenuContentSetCmp from './menuContentSet-cmp'
  import { 
    getListTree, 
  } from '@/api/employee'
  import { REQ_OK } from '@/api/config'
  export default {
    components: {
      MenuTreeCmp,
      MenuContentSetCmp
    },
    data(){
      return {
        treeLoading: false, // tree组件加载loading
        treeData: [],  // 树形组件的数据
        defaultTreeProps: {
          child: 'Child',
          label: 'TeamName'
        },
        nodeKey: 'Id',
        tableLoading: false, // 右边table表格区的loading
        currentPcode: '',  // 选取的菜单树的MenuCode,
        currentKeyName: '',
        currentTreeNodeObj: {
          Id:'',
          TeamCode:'',
          TeamName:'',
          ShortName:'',
          Description:'',
          Multiple:'',
          Collapsed:'',
          SortId:'',            
        }, // 选取的菜单树的node对象
      }
    },
    created(){
      this._getListTree()
      this.$bus.$on("emitFieldSuccess", () => {
        this._getListTree()
      })
    },
    beforeDestroy(){
      this.$bus.$off("emitFieldSuccess")
    },
    methods: {
      // 初始化treeData
      _changeData(data ){
        debugger
        if(data && data.length){
          data.forEach((item, key) => {
            this.$set(item, 'id', item.Id)
            this.$set(item, 'label', item.TeamName)
            this.$set(item, 'children', item.Child)
            this.$set(item, 'TeamCode', item.TeamCode)
            this.$set(item, 'Id', item.Id)
            this.$set(item, 'ShortName', item.ShortName)
            this.$set(item, 'Description', item.Description)
            this.$set(item, 'Multiple', item.Multiple)
            this.$set(item, 'Collapsed', item.Collapsed)
            this.$set(item, 'SortId', item.SortId)
            if(item.Child && item.Child.length){
              this._changeData(item.Child)
            }
          })
        }
      },
      // 获取树形结构数据
      _getListTree(){
        debugger
        this.treeLoading = true
        getListTree().then(res => {
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
      treeNodeClick(data){
        debugger
        this.currentTreeNodeObj = JSON.parse(JSON.stringify(data)) 
      },
    }
  }
</script>



