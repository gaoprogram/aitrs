<!--
  User: xxxxxxx
  Date: 2018/11/16
  功能：新增处理人后，产生新的节点，节点递归组件
-->

<template>
  <div class="recursive-cmp-container">
    <div v-if="nodes && nodes.length" v-for="node in nodes">

      <!--向下的箭头 连接节点处理人的 流程图箭头----start--->
      <div style="text-align: center; padding: 10px 0">
        <i class="el-icon-arrow-down"></i>
        <!-- <i class="el-icon-bottom"></i> -->
      </div>
      <!--向下的箭头 连接节点处理人的 流程图箭头----end--->

      <div class="addHandlerItem">
        <el-card shadow="hover">
          <div class="deliverie-item">

            <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑此节点" placement="bottom">
              <span class="name" style="font-size: 12px" @click="handleEditNameAndRule(node)">
                名称：{{node.Name}}
              </span> 
            </el-tooltip >

            <div v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="deliverie-item-left">
              <el-tooltip class="item" effect="dark" content="编辑此审批" placement="bottom">
                <i class="el-icon-edit" @click="handleSelectApprover(node.NodeToNodeId)"></i>
              </el-tooltip>
            </div>
            <div class="deliverie-item-right" style="flex: 1"
                 v-if="node.Deliveries && node.Deliveries.length">
              <template v-for="Deliverie in node.Deliveries">
                <!--按节点或者表单字段时--start-->
                <div>
                  <div>{{Deliverie.DeliveryWayText}}</div>
                  <div style="margin-left:10px;margin-top:5px">
                    {{Deliverie.DeliveryWayTypeText}}: 
                    <!--注 8 为按节点---->
                    <span style="color: #cccccc" v-if="Deliverie.DeliveryWay!=='8'">{{Deliverie.FieldName}}</span>
                    <span style="color: #cccccc" v-else>{{Deliverie.NodeNames}}</span>
                  </div>                         
                </div>
                <!--按节点或者表单字段时--start-->
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
      </div>

      <!----递归循环调用---start--->
      <div v-if="node.Nodes && node.Nodes.length">
        <recursive-cmp :nodes="node.Nodes"></recursive-cmp>
      </div>
      <!----递归循环调用---end--->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'RecursiveCmp',   // 取一个name的名称后，方便 上面 再次递归调用 这个 组件
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
  .recursive-cmp-container
    .deliverie-item
      display flex
      .name
        display: flex;
        align-items: center;
        margin-right 10px
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
</style>
