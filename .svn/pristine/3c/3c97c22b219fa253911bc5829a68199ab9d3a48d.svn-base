<!--
  User: xxxxxxx
  Date: 2018/11/16
  功能：节点递归组件
-->

<template>
  <div class="recursive-cmp-container">
    <div v-if="nodes && nodes.length" v-for="node in nodes">
      <div style="text-align: center; padding: 10px 0">
        <i class="el-icon-arrow-down"></i>
      </div>
      <div>
        <el-card shadow="hover">
          <div class="deliverie-item">
            <span class="name" style="font-size: 12px">
              名称：{{node.Name}}
            </span>
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
      </div>
      <div v-if="node.Nodes && node.Nodes.length">
        <recursive-cmp :nodes="node.Nodes"></recursive-cmp>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'RecursiveCmp',
    props: {
      nodes: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      // 编辑新增审批人
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
        font-size: 12px;
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
