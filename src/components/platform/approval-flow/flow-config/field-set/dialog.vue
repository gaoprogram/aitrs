<!--
  User: gaol
  Date: 2019/5/16
  功能：流程规则——新增、编辑（与查看不是共用的） 审批——节点设置——表格操作中列中 点击 （基本信息、流转、自定义按钮、节点表单、考核）后的一个通用弹窗

-->

<template>
  <el-dialog
    :title="getTitle"
    class="dialog-item"
    :visible="dialogSetNode"
    fullscreen
    :showClose="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
  >
    <div class="content-container">
      <el-card>
        <div style="margin-bottom: 10px;">

          <!--概览--->
          <span class="ctrl-item">
            <el-button @click="handleClickShowDialog('overview')" type="text" size="small"
                      slot="reference" disabled>概览</el-button>
          </span>

          <!--基本信息--->
          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('attr')">节点属性</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('msg')" disabled>节点消息</el-button>
              <el-button type="text" size="small" slot="reference">基本信息</el-button>
            </el-popover>
          </span>

          <!-- 当前的对象：{{nodeObjStore}} -->
          <!--流转--->
          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('pos')">出口方向</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('condition')">出口条件</el-button>
              <el-button type="text" size="small" v-if="nodeObjStore.NodePosType === 0"
                        @click="handleClickShowDialog('start')">发起人</el-button>
              <el-button type="text" size="small" v-if="nodeObjStore.NodePosType !== 0"
                        @click="handleClickShowDialog('handle')">处理人</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('copy')">抄送人</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('branch')" disabled>支流</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('child')" disabled>子流程</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('oper')" disabled>节点后附加操作</el-button>
              <el-button type="text" size="small" slot="reference">流转</el-button>
            </el-popover>
          </span>

          <!--自定义按钮--->
          <span class="ctrl-item">
            <el-button type="text" size="small"
                      @click="handleClickShowDialog('custom')">自定义按钮</el-button>
          </span>

          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('tableSet')">表单设置</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('fieldCtrl')">字段控制</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('print')" disabled>打印设置</el-button>
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('fnCtrl')">功能控制</el-button>
              <el-button type="text" size="small" slot="reference">节点表单</el-button>
            </el-popover>
          </span>

          <!--考核--->
          <span class="ctrl-item">
            <el-popover
              placement="bottom"
              trigger="hover">
              <el-button type="text" size="small"
                        @click="handleClickShowDialog('overtime')" disabled>超时考核</el-button>
              <el-button type="text" size="small" slot="reference">考核</el-button>
            </el-popover>
          </span>
        </div>

        <!--动态匹配表单组件来显示--start-->
        <component
          :is="currentComponent(str)"
          :roleRange="roleRange"
          :nodeList="nodeList"
          @close="close"
        ></component>
        <!--动态匹配表单组件来显示--end-->

      </el-card>
    </div>

    <!--<node-attr :roleRange="roleRange" v-if="str === 'attr'" :nodeList="nodeList" ></node-attr>-->
    <!--<out-position :roleRange="roleRange" v-if="str === 'pos'" :nodeList="nodeList"></out-position>-->
    <!--<out-condition :roleRange="roleRange" v-if="str === 'condition'" :nodeList="nodeList" @close="close"></out-condition>-->
    <!--<custom-btn :roleRange="roleRange" v-if="str === 'custom'" :nodeList="nodeList" ></custom-btn>-->
    <!--<approval-cmp v-if="str === 'handle'"></approval-cmp>-->
    <!--<start-emp v-if="str === 'start'"></start-emp>-->
    <!--<field-auth v-if="str === 'fieldCtrl'"></field-auth>-->
    <!--<fn-auth :roleRange="roleRange" v-if="str === 'fnCtrl'" :nodeList="nodeList" ></fn-auth>-->
    <!--<table-set v-if="str === 'tableSet'" :nodeList="nodeList" ></table-set>-->
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import NodeAttr from './node-attr'
  import OutPosition from './out-position'
  import OutCondition from './out-condition'
  import CustomBtn from './custom-btn'
  import ApprovalCmp from './approval-cmp'
  import StartEmp from './start-emp'
  import FieldAuth from './field-auth'
  import FnAuth from './function-auth'
  import TableSet from './table-set'
  import PrintTemplate from './print-template'
  import CcDialog from './Cc-dialog'
  import { mapGetters } from 'vuex'
  const cmpMap = {
    'overview': NodeAttr,
    'attr': NodeAttr,
    'msg': NodeAttr,
    'pos': OutPosition,
    'condition': OutCondition,
    'start': StartEmp,
    'handle': ApprovalCmp,
    'copy': CcDialog,
    'branch': NodeAttr,
    'child': NodeAttr,
    'oper': NodeAttr,
    'custom': CustomBtn,
    'tableSet': TableSet,
    'fieldCtrl': FieldAuth,
    'print': PrintTemplate,
    'fnCtrl': FnAuth,
    'overtime': NodeAttr
  }

  export default {
    props: {
      currentStr: {
        type: String,
        default: ''
      },
      roleRange: {
        type: Number,
        default: 0
      },
      nodeList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        dialogSetNode: true,
        str: ''
      }
    },
    computed: {
      ...mapGetters([
        'nodeObjStore'
      ]),
      getTitle () {
        return `节点设置`
      }
    },
    created () {
      debugger
      this.$nextTick(_ => {
        this.str = this.currentStr
      })
    },
    methods: {
      // 点击操作按钮
      handleClickShowDialog (str) {
        // let att = ['overview', 'attr', 'msg', 'pos', 'condition',
        //   'start', 'handle', 'copy', 'branch', 'child', 'oper', 'custom', 'tableSet', 'fieldCtrl', 'print', 'fnCtrl', 'overtime']
        this.str = str
      },
      currentComponent (str) {
        return cmpMap[str] || ''
      },
      // 关闭
      close () {
        this.$emit('close')
      }
    },
    components: {
      NodeAttr,
      OutPosition,
      OutCondition,
      CustomBtn,
      ApprovalCmp,
      StartEmp,
      FieldAuth,
      FnAuth,
      TableSet,
      PrintTemplate,
      CcDialog
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dialog-item /deep/
    .content-container
      width 1000px
      margin auto
      .el-card
        max-height 80vh
        overflow-y scroll
</style>
