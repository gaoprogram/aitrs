<!--
  User: xxxxxxx
  Date: 2019/5/23
  功能：组织选择器
-->

<template>
  <div class="org-cmp-container">
    <div class="content-container">
      <el-card class="left-card-container">
        <div class="search-container">
          <el-input
            placeholder="组织"
            class="flex-1"
            size="mini"
            clearable
            v-model="StrJson.KeyWord"
            @clear="handleLeftEnter"
            @keyup.enter.native="handleLeftEnter">
          </el-input>
          <el-tooltip class="item" effect="dark" content="关键词批量输入" placement="bottom">
            <el-button type="primary" class="mg-l-5" icon="el-icon-plus" size="mini" @click.native="dialogBrancheKeyWord = true"></el-button>
          </el-tooltip>
          <el-button type="primary" class="mg-l-5" icon="el-icon-search" size="mini" @click.native="handleLeftEnter"></el-button>
        </div>
        <el-checkbox v-model="includeChildren" @change="handleChangeInclude" class="include-check">不包含下级</el-checkbox>
        <div style="height: 500px" v-loading="orgLoading">
          <el-scrollbar style="height: 100%">
            <el-tree
              :data="orgList"
              ref="orgTree"
              show-checkbox
              node-key="NodeId"
              :check-strictly="includeChildren"
              :props="defaultProps"
              @check="orgTreeChange"
            >
            </el-tree>
          </el-scrollbar>
        </div>
      </el-card>
      
      <el-card class="right-card-container">
        <div class="search-container">
          <el-input
            placeholder="请输入组织号、名称"
            class="flex-1"
            size="mini"
            clearable
            v-model="rightKeyWord"
            @clear="handleClearRight"
            @keyup.enter.native="handleRightEnter">
          </el-input>
          <el-button type="primary" class="mg-l-5" icon="el-icon-search" size="mini" @click.native="handleRightEnter"></el-button>
        </div>
        <div style="margin-bottom: 10px">
          <el-tooltip class="item" effect="dark" content="移除已选择" placement="bottom">
            <el-button type="primary" icon="el-icon-delete" size="mini" :disabled="!rightSelectedList.length" @click.native="handleDelSelected">
            </el-button>
          </el-tooltip>
        </div>
        <el-table
          :data="checkedOrgTree"
          height="520"
          border
          @selection-change="handleSelectedChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="NodeId"
            label="组织号"
          >
          </el-table-column>
          <el-table-column
            prop="Name"
            label="名称"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog
      title="关键词批量输入"
      :visible.sync="dialogBrancheKeyWord"
      width="500px"
      :show-close="false"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <div>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="keyWordTextarea">
        </el-input>
      </div>
      <p>*请一行输入一个信息，如：</p>
      <p>90001</p>
      <p>90002</p>
      <save-footer
        :isCancel="true"
        saveText="确认"
        @cancel="dialogBrancheKeyWord = false"
        @save="handleClickSaveKT">
      </save-footer>
    </el-dialog>

    <save-footer
      :isCancel="true"
      cancelText="关闭"
      saveText="确认"
      @cancel="handleClickCancelOrg"
      @save="handleClickSaveOrg">
    </save-footer>

  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getOrg } from '@/api/common-dic'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    data () {
      return {
        StrJson: {
          KeyWord: '',
          Org: []
        }, // 组织筛选对象
        orgLoading: false, // 组织loading
        orgList: [], // 获取的组织列表
        checkedOrgTree: [], // 选中的组织列表
        defaultProps: {
          children: 'Children',
          label: 'Name'
        }, // 组织树默认的props
        includeChildren: false, // 是否选中下级
        dialogBrancheKeyWord: false, // 关键词批量输入弹窗
        keyWordTextarea: '', // 关键词批量输入input
        rightKeyWord: '', // 右边搜索框,
        rightSelectedList: [],
        nativeOrgTree: []
      }
    },
    created () {
      this._getOrgList()
    },
    methods: {
      // 获取组织
      _getOrgList () {
        this.orgLoading = true
        getOrg('WorkFlow', JSON.stringify(this.StrJson)).then(res => {
          this.orgLoading = false
          if (res.data.State === REQ_OK) {
            this.orgList = res.data.Data
          } else {
          }
        }).catch(() => {
          this.orgLoading = false
        })
      },
      // 左边输入框回车事件
      handleLeftEnter () {
        this._getOrgList()
      },
      // 右边输入框回车事件
      handleRightEnter () {
        if (this.nativeOrgTree.length) {
          this.checkedOrgTree = this.nativeOrgTree.filter(item => {
            return item.NodeId.includes(this.rightKeyWord) || item.Name.includes(this.rightKeyWord)
          })
        }
      },
      // 右边清空
      handleClearRight () {
        this.checkedOrgTree = this.nativeOrgTree
      },
      // 关键词批量输入
      handleClickSaveKT () {
        if (this.keyWordTextarea) {
          this.StrJson.KeyWord = this.keyWordTextarea.split('\n').toString()
        }
        this.dialogBrancheKeyWord = false
      },
      // 是否包含下级
      handleChangeInclude () {
        this.$refs.orgTree.setCheckedKeys([])
        this.checkedOrgTree = []
      },
      // 点击组织树checkbox
      orgTreeChange (param1, param2) {
        this.checkedOrgTree = param2.checkedNodes
        this.nativeOrgTree = param2.checkedNodes
      },
      // 点击右边checkbox
      handleSelectedChange (val) {
        this.rightSelectedList = val
      },
      // 点击右边删除
      handleDelSelected () {
        this.rightSelectedList.forEach(item => {
          this.checkedOrgTree.forEach((i, index) => {
            if (i.NodeId === item.NodeId) {
              this.checkedOrgTree.splice(index, 1)
              this.$refs.orgTree.setChecked(item.NodeId, false)
            }
          })
        })
      },
      // 保存组织
      handleClickSaveOrg () {
        debugger
        if (this.nativeOrgTree && this.nativeOrgTree.length) {
          // 触发父组件中的 updaData
          this.$emit('upData', this.nativeOrgTree)

          this.$bus.$emit('saveOrg', this.nativeOrgTree)
          // this.$message.success('保存成功')
          this.handleClickCancelOrg()
        } else {
          this.$confirm('未选择任何组织，确认保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('upData', this.nativeOrgTree)
            this.$bus.$emit('saveOrg', this.nativeOrgTree)
            this.handleClickCancelOrg()
            // this.$message.success('保存成功')
          }).catch(() => {
          })
        }
      },
      // 关闭组织
      handleClickCancelOrg () {
        // this.$bus.$emit('closeStructureCmp')
        this.$emit('closeStructureCmp')
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .org-cmp-container
    .content-container
      display flex
      .left-card-container /deep/
        flex 0 0 335px
        .search-container
          display flex
          margin-bottom 10px
          .flex-1
            flex 1
          .mg-l-5
            margin-left 5px
        .include-check
          width 100%
          box-sizing border-box
          padding 0 24px
          border-bottom 1px solid #dedede
        .el-scrollbar__wrap
          overflow-x hidden
      .right-card-container
        flex 1
        .search-container
          display flex
          margin-bottom 10px
          .flex-1
            flex 1
          .mg-l-5
            margin-left 5px
</style>
