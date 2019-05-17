<!--
  User: gaol
  Date: 2019/5/17
  功能：流程规则——查看——节点设置 页面
-->

<template>
  <div class="field-set-container" v-loading="fieldSetLoading">
    <div style="margin-bottom: 10px;">
      <span><el-button size="mini" disabled>办理人员替换</el-button></span>
      <span><el-button size="mini" disabled>节点排序</el-button></span>
      <span><el-button size="mini" disabled>流程图模式</el-button></span>
    </div>
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
            <el-button v-if="scope.row.NodePosType === 3" @click="handleClickDelNode(scope.row.NodeId)" type="text" size="small">删除</el-button>
          </span>
          <span class="ctrl-item">
            <el-button disabled @click="handleClickShowDialog(scope.row, 'overview')" type="text" size="small" slot="reference">概览</el-button>
          </span>
          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'attr')">节点属性</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'msg')" disabled>节点消息</el-button>
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
              <el-button type="text" size="small" v-if="scope.row.NodePosType === 1" @click="handleClickShowDialog(scope.row, 'handle')">处理人</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'copy')" disabled>抄送人</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'branch')" disabled>支流</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'child')" disabled>子流程</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'oper')" disabled>节点后附加操作</el-button>
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
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'print')" disabled>打印设置</el-button>
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'fnCtrl')">功能控制</el-button>
              <el-button type="text" size="small" slot="reference">节点表单</el-button>
            </el-popover>
          </span>
          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small" @click="handleClickShowDialog(scope.row, 'overtime')" disabled>超时考核</el-button>
              <el-button type="text" size="small" slot="reference">考核</el-button>
            </el-popover>
          </span>

        </template>
      </el-table-column>
    </el-table>


    
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
  import { getRoleRange } from '@/api/permission'
  import { flowBaseFn } from '@/utils/mixin'

  export default {
    mixins: [flowBaseFn],
    data () {
      return {
        fieldSetLoading: false,
        tabPosition: '节点列表',
        tableData: [],
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
        currentNode: '',
        currentStr: '',
        roleRange: ''
      }
    },
    created () {
      debugger
      this.ruleId = this.$route.query.ruleId
      this._getNodeList()
      this._runModel()
      this._getRoleRange()
    },
    methods: {
      // 节点列表
      _getNodeList () {
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
            debugger
            this.roleRange = res.data.Data
          }
        })
      },
      // 删除节点
      handleClickDelNode  (nodeId) {
        this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fieldSetLoading = true
          deleteNode(nodeId).then(res => {
            this.fieldSetLoading = false
            if (res.data.State === REQ_OK) {
              this.$message.success('删除成功')
              this._getNodeList()
            } else {
              this.$message.error('删除失败，请重试')
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
      // 点击操作按钮
      handleClickShowDialog (nodeObj, str) {
        debugger
        this.$store.commit('SET_NODE_OBJ', {...nodeObj})
        // this.currentNode = nodeObj
        this.currentStr = str
        this.showDialog = true
      }
    },
    watch: {
      '$route' (to, from) {
        this.ruleId = this.$route.query.ruleId
        this._getNodeList()
      }
    },
    components: {
      SaveFooter,
      DialogCtrl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ctrl-item
    margin-right 10px
</style>
