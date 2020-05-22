<!--
  User: gaol
  Date: 2019/5/15
  功能：审批流配置——编辑/新增 时——流程配置页面——节点设置页面, 注意 流程的查看 没有共用页面
-->

<template>
  <div class="field-set-container" v-loading="fieldSetLoading">
    <div style="margin-bottom: 10px;">
      <!-- {{dialogSortNode}} -->
      <span v-atris-flowRuleScan="{styleBlock:'inline-block'}"><el-button size="mini" disabled>办理人员替换</el-button></span>
      <span v-atris-flowRuleScan="{styleBlock:'inline-block'}"><el-button size="mini" @click.native="dialogSortNode = true">节点排序</el-button></span>
      <span v-atris-flowRuleScan="{styleBlock:'inline-block'}"><el-button size="mini" @click="handleClickAddNode">新增节点</el-button></span>
      <span><el-button size="mini" @click="clickFlowDesignPic">流程图模式</el-button></span>
    </div>

    <!-- <div class="rt marginB10"><el-button size="small" type="primary" plain>节点排序</el-button></div> -->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="Name"
        label="节点名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="NodePosTypeText"
        label="节点类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="RunModelText"
        label="节点工作模式"
        width="200"
      >
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <span class="ctrl-item">
            <el-button v-if="scope.row.NodePosType === 3" @click="handleClickDelNode(scope.row)" type="text" size="small">删除</el-button>
          </span>

          <span class="ctrl-item">
            <el-button @click="handleClickShowDialog(scope.row, 'overview')" type="text" size="small" slot="reference" disabled>概览</el-button>
          </span>

          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'attr')">节点属性</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'msg')" disabled>节点消息</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'sync')" >同步</el-button>
              <el-button type="text" size="small" slot="reference">基本信息</el-button>
            </el-popover>
          </span>
          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'pos')">出口方向</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'condition')">出口条件</el-button>
              <el-button type="text" size="small" v-if="scope.row.NodePosType === 0" @click="handleClickShowDialog(scope.row, 'start')">发起人</el-button>
              <el-button type="text" size="small" v-if="scope.row.NodePosType !== 0" @click="handleClickShowDialog(scope.row, 'handle')">处理人</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'copy')">抄送人</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'branch')">支流</el-button>
              <el-button disabled type="text" size="small" @click="handleClickShowDialog(scope.row, 'child')">子流程</el-button>
              <el-button disabled type="text" size="small" @click="handleClickShowDialog(scope.row, 'oper')">节点后附加操作</el-button>
              <el-button type="text" size="small" slot="reference">流转</el-button>
            </el-popover>
          </span>

          <span class="ctrl-item">
            <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'custom')">自定义按钮</el-button>
          </span>

          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'tableSet')">表单设置</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'fieldCtrl')">字段控制</el-button>
              <el-button disabled type="text" size="small" @click="handleClickShowDialog(scope.row, 'print')">打印设置</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'fnCtrl')">功能控制</el-button>
              <el-button type="text" size="small" slot="reference">节点表单</el-button>
            </el-popover>
          </span>

          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button disabled type="text" size="small" @click="handleClickShowDialog(scope.row, 'overtime')">超时考核</el-button>
              <el-button type="text" size="small" slot="reference">考核</el-button>
            </el-popover>
          </span>

        </template>
      </el-table-column>
    </el-table>

    <!---新增节点的dialog弹框---start-->
    <el-dialog title="新增节点"
               class="dialog-item"
               :visible="dialogAddNode"
               :showClose="false"
               :append-to-body="true"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="490px"
    >
      <el-form :model="newNodeObj" :rules="nodeRules" ref="ruleNewNodeForm" label-width="100px" class="demo-ruleForm"
               v-loading="addNodeLoading">
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="newNodeObj.name" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="节点类型" prop="runModel">
          <el-select v-model="newNodeObj.runModel" placeholder="请选择节点类型" style="width: 300px">
            <el-option
              v-for="item in nodeTypeList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </el-form-item>
        
      </el-form>

      <save-footer @save="handleClickSaveNewNode" @cancel="dialogAddNode = false"></save-footer>

    </el-dialog>
    <!---新增节点的dialog弹框---end-->

    <!--节点排序dialog gaoladd--start-->
    <div class="sortNodeBox" v-if="dialogSortNode">
      <NodeSort :tableData.sync='tableData' :dialogSortNode.sync="dialogSortNode"></NodeSort>
    </div>
    <!--节点排序dialog gaoladd--end--->


    <!--信息展示弹框-引用的./dialog.vue组件--start-->
    <dialog-ctrl
      v-if="showDialog"
      :nodeObj="currentNode"
      :currentStr="currentStr"
      :roleRange="roleRange"
      @close="showDialog = false"
      :nodeList="tableData">
    </dialog-ctrl>
    <!--信息展示弹框---start-->

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" type="primary">关闭</el-button>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getNodeList,
    runModel,
    addNode,
    deleteNode
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import DialogCtrl from './dialog'
  import NodeSort from './node-sort'
  import Vuedraggable from 'vuedraggable'
  import { getRoleRange } from '@/api/permission'
  import { flowBaseFn } from '@/utils/mixin'
  export default {
    mixins: [flowBaseFn],
    data () {
      return {
        fieldSetLoading: false,
        tabPosition: '节点列表',
        tableData: [],   // table 表格中的所有数据list结合
        dialogAddNode: false,
        addNodeLoading: false,
        newNodeObj: {
          name: '',
          runModel: ''
        },
        nodeRules: {
          name: [
            {required: true, message: '请输入节点名称', trigger: 'blur'}
          ],
          runModel: [
            {required: true, message: '请选择节点类型', trigger: 'change'}
          ]
        },
        nodeTypeList: [],
        showDialog: false,
        currentNode: '',   // table表格中 当前点击行的 node对象数据信息
        currentStr: '',  // 操作区域内 当前点击的
        roleRange: '',
        dialogSortNode: false, // 节点排序的dialog 弹框显示/隐藏

        ruleObj: {}   // 流程图模式需要的 数据对象
      }
    },
    watch: {
      '$route' (to, from, next) {
        // debugger
        // if(to.path === '/platform/approvalFlow/flowRule/flowConfig/processDesign') {
        //   // 加入是从 节点设置页面中  点击 流程图模式 按钮 跳转过来的 则需要 自动跳转至 图形设计页面
        // next(vm => {

        // })
        // }
        debugger
        this.ruleId = this.$route.query.ruleId
        this._getNodeList()
      }
    },
    components: {
      SaveFooter,
      DialogCtrl,
      Vuedraggable,
      NodeSort
    },
    // 导航钩子函数 判断是否是冲 流程设计中的 出口方向 button进入到此页面的
    beforeRouteEnter (to, from, next) {
      debugger
      let posFlag = localStorage.getItem('posFlag')
      if (from.path === '/platform/approvalFlow/flowRule/flowConfig/processDesign' && posFlag) {
        // 判断从 流程设计 中 简洁设计 或者 图形设计中 点击 出口方向 button进入  到此页面，此时组件还没有创建 故没有 this 需要用vm 来获取 实例对象
        next((vm) => {
          console.log(vm)
          // 将 this.currentStr 设置为  出口方向： 'pos'
          vm.currentStr = 'pos'
            // 全屏显示 dialog 信息展示框
          vm.showDialog = true
        })
      } else {
        next()
      }
    },
    created () {
      this.ruleId = this.$route.query.ruleId
      // 获取 表格中的 节点列表数据
      this._getNodeList()

      this._runModel()
      this._getRoleRange()
    },
    mounted () {
      this.$bus.$on('fieldSetRefresh', (res) => {
        this._getNodeList()
      })
    },
    beforeDestroy () {
      // 页面销毁前 取消 eventbus
      this.$bus.$off('fieldSetRefresh')
    },
    methods: {
      // 节点列表
      _getNodeList () {
        debugger
        this.fieldSetLoading = true
        getNodeList(this.ruleId).then(res => {
          this.fieldSetLoading = false
          if (res.data.State === REQ_OK) {
            debugger
            this.tableData = res.data.Data
          } else {
            this.$message.error('节点列表获取失败')
          }
        }).catch(() => {
          this.$message.error('节点列表获取失败')
        })
      },
      // 节点类型
      _runModel () {
        runModel().then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.nodeTypeList = res.data.Data
          }
        })
      },
      // 获取版本号
      _getRoleRange () {
        getRoleRange('WorkFlow').then(res => {
          if (res.data.State === REQ_OK) {
            this.roleRange = res.data.Data
          }
        })
      },
      // 点击了 流程图模式
      clickFlowDesignPic () {
        // this._getRule()
        // 先在sessionstorage 中存一个从 fieldSet 页面到 flowDessign 的标识
        sessionStorage.setItem('fieldSetToFlowDessign', true)
        // 跳转到 流程图模式页面
        this.$router.push({
          path: '/platform/approvalFlow/flowRule/flowConfig/processDesign',
          query: {
            flowId: this.$route.query.flowId,
            approvalId: this.$route.query.approvalId,
            ruleId: this.$route.query.ruleId
          }
        })
      },
      // 删除节点
      handleClickDelNode  (row) {
        this.$confirm(`确定要删除节点'${row.Name}'吗？执行此操作，将删除该节点下的所有配置`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fieldSetLoading = true
          deleteNode(row.NodeId).then(res => {
            this.fieldSetLoading = false
            if (res.data.State === REQ_OK) {
              this.$message.success('删除成功')
              this._getNodeList()
            } else {
              this.$message.error(res.data.Error)
            }
          }).catch(() => {
            this.fieldSetLoading = false
            this.$message.error('删除失败，请重试')
          })
        }).catch(() => {
        })
      },
      // 新增节点
      handleClickAddNode () {
        this.dialogAddNode = true
      },
      // 保存新增节点
      handleClickSaveNewNode () {
        this.$refs.ruleNewNodeForm.validate((valid) => {
          if (valid) {
            this.addNodeLoading = true
            addNode(this.ruleId, this.newNodeObj).then(res => {
              this.addNodeLoading = false
              if (res.data.State === REQ_OK) {
                this.$message.success('新增成功')
                this._getNodeList()
                this.dialogAddNode = false
              } else {
                this.$message.error('新增失败，请重试')
              }
            }).catch(() => {
              this.addNodeLoading = false
              this.$message.error('新增失败，请重试')
            })
          }
        })
      },
      // 点击操作区的按钮
      handleClickShowDialog (nodeObj, str) {
        debugger
        // store 中存入表格该行的对象数据信息
        this.$store.commit('SET_NODE_OBJ', {...nodeObj})
        // this.currentNode = nodeObj
        this.currentStr = str
        // 全屏显示 dialog 信息展示框
        this.showDialog = true
      },
      // 取消排序
      cancelSort () {
        this.dialogSortNode = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ctrl-item
    margin-right 10px
</style>
