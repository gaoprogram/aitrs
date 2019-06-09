<!--
  User: gaol
  Date: 2019/6/9
  功能：流程设计—— 图像设计 中 节点的递归渲染组件
-->

<template>
  <div class="recursive-designpic-container">
    <div v-if="nodes && nodes.length" v-for="node in nodes">

      <!--向下的箭头 连接节点处理人的 流程图箭头----start--->
      <div style="text-align: center; padding: 10px 0">
        <i class="el-icon-arrow-down"></i>
        <!-- <i class="el-icon-bottom"></i> -->
      </div>
      <!--向下的箭头 连接节点处理人的 流程图箭头----end--->


      <!-- <div class="addHandlerItem">
        <el-card shadow="hover">
          <div class="deliverie-item">

            <el-tooltip class="item" effect="dark" content="编辑此节点" placement="bottom">
              <span class="name" style="font-size: 12px" @click="handleEditNameAndRule(node)">
                名称：{{node.Name}}
              </span> 
            </el-tooltip >

            <div class="deliverie-item-left">
              <el-tooltip class="item" effect="dark" content="编辑此审批" placement="bottom">
                <i class="el-icon-edit" @click="handleSelectApprover(node.NodeToNodeId)"></i>
              </el-tooltip>
            </div>
            <div class="deliverie-item-right" style="flex: 1"
                 v-if="node.Deliveries && node.Deliveries.length">
              <template v-for="Deliverie in node.Deliveries">
                <div>{{Deliverie.DeliveryWayText}}</div>
                <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.PositionValue.length">
                  已选岗位/角色/职务：
                  <span
                    v-for="(org, index) in Deliverie.PositionValue"
                    style="display: inline-block; padding: 5px; color: #cccccc"
                  >
                                {{org.Name}}
                                  <span
                                    v-if="Deliverie.PositionValue && Deliverie.PositionValue.length-1 !== index">,
                                  </span>
                                </span>
                </div>
                <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.OrgValue.length">
                  已选组织：
                  <span
                    v-for="(org, index) in Deliverie.OrgValue"
                    style="display: inline-block; padding: 5px; color: #cccccc">
                              {{org.Name}}
                              <span
                                v-if="Deliverie.OrgValue.length && Deliverie.OrgValue.length-1 !== index">,</span>
                              </span>
                </div>

                <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.EmpValue.length">
                  已选人员：
                  <span
                    v-for="(org, index) in Deliverie.EmpValue"
                    style="display: inline-block; padding: 5px; color: #cccccc">
                              {{org.Name}}
                              <span
                                v-if="Deliverie.EmpValue && Deliverie.EmpValue.length-1 !== index">,</span>
                              </span>
                </div>
              </template>
            </div>
          </div>
        </el-card>
      </div> -->

      <!----对应分支下的节点区域---start--->
      <div class="fieldListBox">
        <!-- branche.Deliveries: {{branche.Deliveries}} -->
        <!---分支下面branche.Deliveries 里面的节点----start-->
        <div class="fieldListItemBox" v-if="node.Deliveries && node.Deliveries.length"
                  v-for="(Deliverie,fieldKey) in node.Deliveries"
                  :key="fieldKey">
          <div class="fieldName"><span class="tit">节点名:</span><span class="tit-content">{{node.Name}}</span></div>
          <div class="fieldContent">
            <div class="morePeopleRuleTitBox"><span class="tit">多人处理规则:</span><span class="tit-content">{{Deliverie.DeliveryWayText}}</span></div>
            <div class="approverWrap">
              <div class="approverTit">审批人: </div>
              <div class="approverBox">
                <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.PositionValue && Deliverie.PositionValue.length">
                  已选岗位/角色/职务：
                  <span
                    v-for="(org, index) in Deliverie.PositionValue"
                    style="display: inline-block; padding: 5px; color: #cccccc"
                  >
                      {{org.Name}}
                        <span
                          v-if="Deliverie.PositionValue.length-1 !== index">,
                        </span>
                      </span>
                </div>
                <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.OrgValue && Deliverie.OrgValue.length">
                  已选组织：
                  <span
                    v-for="(org, index) in Deliverie.OrgValue"
                    style="display: inline-block; padding: 5px; color: #cccccc">
                    {{org.Name}}
                    <span
                      v-if="Deliverie.OrgValue.length-1 !== index">,</span>
                    </span>
                </div>
                <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.EmpValue && Deliverie.EmpValue.length">
                  已选人员：
                  <span
                    v-for="(org, index) in Deliverie.EmpValue"
                    style="display: inline-block; padding: 5px; color: #cccccc">
                    {{org.Name}}   
                    <span
                      v-if="Deliverie.EmpValue.length-1 !== index">,</span>
                    </span>
                </div>
              </div>
            </div>
          </div>
          <div>抄送人：</div>
        </div>

        <div class="fieldListItemBox" v-show="!node.Deliveries.length">
          <div class="defaultField">默认节点</div>
        </div>
        <!---分支下面branche.Deliveries里面 的节点----end-->                                  
      </div>
      <!---对饮分支下的节点区域---end--->


      <!----递归循环调用---start--->
      <div v-if="node.Nodes && node.Nodes.length">
        <recursive-design-pic :nodes="node.Nodes"></recursive-design-pic>
      </div>
      <!----递归循环调用---end--->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'RecursiveDesignPic',   // 取一个name的名称后，方便 上面 再次递归调用 这个 组件
    props: {
      nodes: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
      }
    },
    mounted () {

    },
    beforeDestroy () {

    },
    watch: {
      // nodes: {
      //   handler (newValue, oldValue) {
      //     debugger
      //     this.newNodes = newValue
      //   },
      //   deep: true
      // }
    },
    methods: {
      // 编辑 节点名称 和规则
      handleEditNameAndRule (node) {
        debugger
        // this.$emit('handleEditNameAndRule', node)
        this.$bus.$emit('handleEditNameAndRule', node)
      },
      // 编辑新增处理人
      handleSelectApprover (code) {
        this.$bus.$emit('handleSelectApprover', code)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .recursive-designpic-container
    .deliverie-item
      display flex
      .name
        display: flex;
        align-items: center;
        font-size: 12px;
        color rgba(59,159,227,.8)
        &:hover
          cursor pointer
          color rgba(59,139,227,1)
      .deliverie-item-left
        display: flex;
        flex: 0 0 50px;
        align-items: center;
        justify-content: center;
        .el-icon-edit
          color #cccccc
          &:hover
            cursor pointer
    .fieldListBox
      display flex
      display -webkit-flex
      justify-content center
      flex-direction column 
      border 1px solid red
      margin-top 20px
      .fieldListItemBox
        margin-bottom 20px
        border 1px solid blue
        .fieldName
          font-weight bold
          margin-right 5px
          .tit
            margin-right 5px
          .tit-content
            color rgba(214,214,214,1)
        .fieldContent
          .morePeopleRuleTitBox
            .tit
              font-weight bold
              margin-right 5px
            .tit-content
              color rgba(214,214,214,1)
          .approverWrap
            display flex !important
            display -webkit-flex !important
            justify-content flex-start
            align-items center
            .approverTit
              font-weight bold
              width 50px
</style>
