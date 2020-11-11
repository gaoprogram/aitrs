<!--
  User: xxxxxxx
  Date: 2018/8/23
  功能：选择组织弹窗
-->

<template>
  <el-dialog
    width="400px"
    :title="title"
    :visible="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
    class="dic-tree"
  >
    <el-tree
      :data="list"
      show-checkbox
      node-key="value"
      ref="tree"
      expand-on-click-node
      highlight-current
      :props="defaultProps"
      v-loading="loading"
      :default-checked-keys="defaultCheckedKeys"
    >
    </el-tree>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel()">取消</el-button>
      <el-button type="primary" @click="handleSave()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { getOrgList } from '@/api/permission'
  import { Message } from 'element-ui'
  import { REQ_OK } from '@/api/config'
  export default {
    props: {
      title: {
        type: String,
        default: '选择组织'
      },
      defaultCheckedKeys: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        visible: false,
        loading: true,
        list: [],
        selectOrgRangeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted () {
      this._getOrgList()
    },
    methods: {
      async _getOrgList () {
        await getOrgList().then((res) => {
          // debugger
          if (res.data.State === REQ_OK) {
            let arr = res.data.Data
            this.list = this.recursionFn(arr)
            this.loading = false
          } else {
            this.loading = false
            Message.error('组织列表获取失败，请重试！')
          }
        }).catch(() => {
          this.loading = false
          Message.error('组织列表获取失败，请重试！')
        })
      },
      handleSave () {
        let arr = this.$refs.tree.getCheckedNodes()
        if (!arr.length) {
          Message.error('未选择任何组织！')
          return false
        }
        this.$emit('sureOrg', arr)
      },
      handleCancel () {
        this.$emit('cancelOrg')
      },
      recursionFn (arr) {
        let result = []
        arr.forEach((item) => {
          let obj
          if (item.Child && item.Child.length > 0) {
            obj = {
              value: item.OrgCode,
              label: item.OrgName,
              nodeId: item.ParentOrgCode,
              children: this.recursionFn(item.Child)
            }
          } else {
            obj = {
              value: item.OrgCode,
              label: item.OrgName,
              nodeId: item.ParentOrgCode
            }
          }
          result.push(obj)
        })
        return result
      }
    },
    watch: {
      'defaultCheckedKeys': {
        handler (newValue, oldValue) {
          console.log('new', newValue, oldValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .dic-tree
    .el-dialog__body
      max-height 400px;
      overflow scroll
</style>
