<!--
  User: xxxxxxx
  Date: 2019/1/2
  功能：出口方向
-->

<template>
  <div class="node-attr-container" v-loading="loading">
    <div>
      <div style="margin-bottom: 10px">
        当前节点
        <el-select v-model="currentNode" placeholder="请选择" @change="_getToNodeSet">
          <el-option
            v-for="item in nodeList"
            :key="item.NodeId"
            :label="item.Name"
            :value="item.NodeId">
          </el-option>
        </el-select>
      </div>
      <el-transfer
        v-model="rightData"
        @left-check-change="leftChange"
        @right-check-change="rightChange"
        @change="positionChange"
        :props="{
          key: 'ToNodeId',
          label: 'Name'
        }"
        :titles="['备选节点', '流出节点']"
        :data="leftData">
      </el-transfer>
      <span><span style="color: red">*</span>从备选节点里选中对应的节点到流出节点</span>
    </div>
    <!--<save-footer @save="" @cancel="" :isCancel="false"></save-footer>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getToNodeSet, addDirection, deleteDirection } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { flowNodeSet } from '@/utils/mixin'
  export default {
    mixins: [flowNodeSet],
    props: {
      nodeList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        loading: false,
        currentNode: '',
        leftData: [],
        rightData: [],
        nativeData: []
      }
    },
    created () {
      this.currentNode = this.nodeObjStore.NodeId
      this._getToNodeSet()
    },
    methods: {
      // 出口方向
      _getToNodeSet () {
        this.loading = true
        getToNodeSet(this.currentNode, this.$route.query.flowId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.rightData = []
            this.leftData = res.data.Data.SpareNodes
            if (res.data.Data.ToNodes.length) {
              this.nativeData = res.data.Data.ToNodes
              res.data.Data.ToNodes.forEach(item => {
                this.rightData.push(item.ToNodeId)
              })
            }
          }
        }).catch(() => {
          this.loading = false
        })
      },
      // 左边选择
      leftChange (param, param1) {
        if (param.length > 1) {
          this.$message.info('每一次只能选择一个来设置')
          param.splice(1, 1)
        }
      },
      // 右边选中
      rightChange (param, param1) {
        if (param.length > 1) {
          this.$message.info('每一次只能选择一个来设置')
          param.splice(1, 1)
        }
      },
      // 左右修改方向
      positionChange (param, param1, param2) {
        if (param1 === 'right') {
          addDirection(this.$route.query.flowId, this.currentNode, param2[0]).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message.success('新增流出节点成功')
            } else {
              this.$message.error(res.data.Error)
              this._getToNodeSet()
            }
          }).catch(() => {
            this._getToNodeSet()
            this.$message.error('新增流出失败，请重试')
          })
        }
        if (param1 === 'left') {
          let res = this.nativeData.filter(item => {
            return item.ToNodeId === param2[0]
          })
          deleteDirection(res[0].NodeToNodeId).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message.success('删除流出节点成功')
            } else {
              this._getToNodeSet()
              this.$message.error(res.data.Error)
            }
          }).catch(() => {
            this._getToNodeSet()
            this.$message.error('删除流出失败，请重试')
          })
        }
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
