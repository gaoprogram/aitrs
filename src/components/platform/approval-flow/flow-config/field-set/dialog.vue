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
                        @click="handleClickShowDialog('branch')">支流</el-button>
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

          <!-- 当前的对象：{{nodeObjStore}} -->
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

        <!-- 当前的str的值：{{str}} -->
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
  import Branches from './branches'
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
    'start': StartEmp,       // 发起人
    'handle': ApprovalCmp,    // 处理人
    'copy': CcDialog,       // 抄送人
    'branch': Branches,     // 支流
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
      // ./field-set 组件中 传过来的 当前点击的  属性的名称
      currentStr: {
        type: String,
        default: ''
      },
      roleRange: {
        type: Number,
        default: 0
      },
      //  ./field-set 组件中 传过来的 table表格中所有的 数据集合
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
        str: '',
        getTitle: '节点设置'
      }
    },
    computed: {
      ...mapGetters([
        'nodeObjStore'
      ])
      // getTitle () {
      //   return `节点设置`
      // }
    },
    watch: {
      str: function (newValue, oldValue) {
        switch (newValue) {
          case 'overview':
            this.getTitle = `节点设置--概览`
            break          
          case 'attr':
            this.getTitle = `节点设置--基本信息--节点属性`
            break
          case 'msg':
            this.getTitle = `节点设置--基本信息--节点消息`
            break        
          case 'start':
            this.getTitle = `节点设置--流转--发起人`
            break
          case 'handle':
            this.getTitle = `节点设置--流转--处理人`
            break                
          case 'pos':
            this.getTitle = `节点设置--流转--出口方向`
            break
          case 'pos':
            this.getTitle = `节点设置--流转--出口方向`
            break
          case 'condition':
            this.getTitle = `节点设置--流转--出口条件`
            break
          case 'copy':
            this.getTitle = `节点设置--流转--抄送人`
            break
          case 'branch':
            this.getTitle = `节点设置--流转--支流`
            break
          case 'child':
            this.getTitle = `节点设置--流转--子流程`
            break
          case 'oper':
            this.getTitle = `节点设置--流转--节点后附加操作`
            break            
          case 'custom':
            this.getTitle = `节点设置--自定义按钮`
            break            
          case 'tableSet':
            this.getTitle = `节点设置--节点表单--表单设置`
            break
          case 'fieldCtrl':
            this.getTitle = `节点设置--节点表单--字段控制`
            break
          case 'print':
            this.getTitle = `节点设置--节点表单--打印设置`
            break
          case 'fnCtrl':
            this.getTitle = `节点设置--节点表单--功能控制`
            break            
          case 'overtime':
            this.getTitle = `节点设置--超时考核`
            break

  
          default:
            this.getTitle = '节点设置'
            break
        }
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
      Branches,
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
