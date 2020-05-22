<!--
  User: gaol
  Date: 2019/5/22
  功能：节点设置——节点表单——出口方向
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
    <!-- <save-footer @save="handleSaveBtn" @cancel="" :isCancel="false"></save-footer> -->
    <div class="footerBox center">
      <el-button 
        v-atris-flowRuleScan="{styleBlock:'inline-block'}" 
        type="primary" 
        sizi="small" 
        :disabled="!paramsArr.length" 
        @click="handleSaveBtn"
      >
      保存
      </el-button>
    </div>
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
        nativeData: [],

        directionFlag: '',  // 向左新增还是减少的标识  toRight   和  toLeft
        paramsArr: []
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
      // 新增流出节点
      _addDirection(paramArr) {
        this.loading = true
        addDirection(this.$route.query.flowId, this.currentNode, paramArr[0]).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message.success('新增流出节点成功')
            this.paramsArr = []
            // 触发父组件中 更新数据
            this.$bus.$emit('fieldSetRefresh')
          } else {
            this.$message.error(res.data.Error)
            this._getToNodeSet()
          }
        }).catch(() => {
          this._getToNodeSet()
          this.$message.error('新增流出失败，请重试')
        })
      },
      // 减少流出节点
      _deleteDirection(paramArr) {
        let res = this.nativeData.filter(item => {
          return item.ToNodeId === paramArr[0]
        })
        this.loading = true
        deleteDirection(res[0].NodeToNodeId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message.success('删除流出节点成功')
            this.paramsArr = []
            // 触发父组件中 更新数据
            this.$bus.$emit('fieldSetRefresh')
          } else {
            this._getToNodeSet()
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this._getToNodeSet()
          this.$message.error('删除流出失败，请重试')
        })
      },
      // 左右修改方向
      positionChange (param, param1, param2) {
        // 向右新增流出节点
        if (param1 === 'right') {
          this.directionFlag = 'toRight'
          this.paramsArr = param2
        }
        // 向左  减少流出节点
        if (param1 === 'left') {
          this.directionFlag = 'toLeft'
          this.paramsArr = param2
        }
      },
      //保存
      handleSaveBtn () {
        if(this.directionFlag === 'toRight'){
          // 新增
          this._addDirection(this.paramsArr)
        }else if(this.directionFlag ==='toLeft'){
          // 减少
          this._deleteDirection(this.paramsArr)          
        }
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
// >>>.node-attr-container
//   .el-transfer
//     .el-transfer-panel
//       width 220px !important
</style>
