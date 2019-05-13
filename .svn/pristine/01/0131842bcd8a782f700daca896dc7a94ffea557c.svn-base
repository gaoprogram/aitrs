<!--
  User: xxxxxxx
  Date: 2019/1/7
  功能：组织树
-->

<template>
  <div class="org-tree-container">
    <div style="height: 300px" v-loading="orgLoading">
      <el-checkbox v-model="includeChildren" @change="handleChangeInclude" class="include-check">不包含下级</el-checkbox>
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
    <save-footer
      :isCancel="true"
      saveText="确认"
      @cancel="handleClickCancel"
      @save="handleClickSave">
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
        includeChildren: false // 是否选中下级
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
      handleClickCancel () {
        this.$emit('cancel')
      },
      handleClickSave () {
        this.$emit('save', this.nativeOrgTree)
      },
      // 点击组织树checkbox
      orgTreeChange (param1, param2) {
        this.nativeOrgTree = param2.checkedNodes
      },
      // 是否包含下级
      handleChangeInclude () {
        this.$refs.orgTree.setCheckedKeys([])
        this.checkedOrgTree = []
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .org-tree-container /deep/
    .el-scrollbar__wrap
      overflow-x hidden
</style>
