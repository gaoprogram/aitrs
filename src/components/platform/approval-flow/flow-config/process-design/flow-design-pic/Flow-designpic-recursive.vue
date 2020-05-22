<!--
  User: gaol
  Date: 2019/6/9
  功能：流程设计—— 图像设计 中 节点的递归渲染组件
-->

<template>
  <div class="recursive-designpic-container">
      <!-- nodes: {{nodes}} -->
    <div v-if="nodes && nodes.length" v-for="node in nodes" class="recursive-designpic">

      <!--向下的箭头 连接节点处理人的 流程图箭头----start--->
      <div class="downTip" style="text-align: center; padding: 10px 0; font-size: 30px">
        <i class="el-icon-bottom tip"></i>
        <!-- <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" effect="dark" content="新增插入节点" placement="bottom">
          <i class="el-icon-circle-plus-outline add"  @click="clickAddMiddleNode($event,node)"></i>
        </el-tooltip> -->
      </div>
      <!--向下的箭头 连接节点处理人的 流程图箭头----end--->

      <!----对应分支下的节点区域---start--->
      <div class="fieldListBox-recursive">
        <!-- node.Deliveries: {{node.Deliveries}} -->

        <!---分支下面branche.Deliveries 里面的节点----start-->
        <div class="fieldListItemBox">
          <!-----节点名称显示区----start--->
          <div class="fieldName">
            <span class="tit">节点名:</span>
            <span class="tit-content">{{node.Name}}</span>
            <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑此节点" placement="bottom">
              <i class="el-icon-edit" @click="handleEditNameAndRule(node)"></i>
            </el-tooltip>
          </div>
          <!-----节点名称显示区----end--->
          <!--节点名称下面的（多人处理规则、审批人、抄送人）显示区----start-->
          <div class="fieldContent">
            <!--多人处理规则区域--start--->
              <div class="morePeopleRuleTitBox clearfix">
                <span class="tit ellipsis1">多人处理规则:</span>
                <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑多人处理规则" placement="bottom">
                  <i class="el-icon-edit" @click="handleSelectApprover(node.NodeToNodeId)"></i>
                </el-tooltip>   
                <template v-if="node.Deliveries && node.Deliveries.length"
                          v-for="(Deliverie,fieldKey) in node.Deliveries">
                  <span class="tit-content">{{Deliverie.DeliveryWayText}}</span>           
                </template>
              </div>
            <!--多人处理规则区域--end--->

            <!---审批人---start-->
            <div class="approverWrap">
              <div class="approverTit">
                <span>审批人:</span>
                <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑审批人" placement="bottom">
                  <i class="el-icon-edit" @click="handleSelectApprover(node.NodeToNodeId)"></i>
                </el-tooltip>                
              </div>

              <div class="approverBox">
                <template v-if="node.Deliveries && node.Deliveries.length"
                    v-for="(Deliverie,fieldKey) in node.Deliveries">
                  <div class="selectedPosition_recursive ellipsis3" 
                      :ref="`selectedPosition_recursive${Deliverie}`"
                      style="font-size: 12px;padding-left: 10px" 
                      v-if="Deliverie.PositionValue && Deliverie.PositionValue.length"
                      @click="showAllPosition_recursive(Deliverie)">
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
                  <div 
                    class="selectedOrg_recursive ellipsis3" 
                    style="font-size: 12px;padding-left: 10px" 
                    v-if="Deliverie.OrgValue && Deliverie.OrgValue.length"
                    :ref="`selectedOrg_recursive${Deliverie}`"
                    @click="showAllOrg_recursive(Deliverie)">
                    已选组织：
                    <span
                      v-for="(org, index) in Deliverie.OrgValue"
                      style="display: inline-block; padding: 5px; color: #cccccc">
                      {{org.Name}}
                      <span
                        v-if="Deliverie.OrgValue.length-1 !== index">,</span>
                      </span>
                  </div>
                  <div 
                    class="selectedPeople_recursive ellipsis3" 
                    style="font-size: 12px;padding-left: 10px" 
                    v-if="Deliverie.EmpValue && Deliverie.EmpValue.length"
                    :ref="`selectedPeople_recursive${Deliverie}`"
                    @click="showAllPeople_recursive(Deliverie)">
                    已选人员：
                    <span
                      v-for="(org, index) in Deliverie.EmpValue"
                      style="display: inline-block; padding: 5px; color: #cccccc">
                      {{org.Name}}   
                      <span
                        v-if="Deliverie.EmpValue.length-1 !== index">,</span>
                      </span>
                  </div>
                </template>
              </div>

            </div>
            <!---审批人---end-->

            <!----抄送人显示区----start-->
            <div class="ccWrap">
              <span class="ccTit">抄送人：</span>
              <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑抄送人" placement="bottom">
                <i class="el-icon-edit" @click="handleSelectCc(node)"></i>
              </el-tooltip>                               
              <div class="ccDtailBox">
                <div v-if="node.CcModel && node.CcModel.length">
                  <!-- <el-card shadow="hover"> -->
                    <div v-for="Deliverie in node.CcModel">
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
                      <!--已选岗位区域---start--->
                      <div
                        class="ccSelectedPosition_recursive ellipsis3"
                        :ref="`ccSelectedPosition_recursive${Deliverie}`"
                        style="font-size: 12px; padding: 5px;"
                        v-if="Deliverie.PositionValue && Deliverie.PositionValue.length"
                        @click="ccShowAllPosition_recursive(Deliverie)">
                        已选岗位：
                        <span
                          v-for="(org, index) in Deliverie.PositionValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.PositionValue && Deliverie.PositionValue.length-1 !== index">,</span>
                          </span>
                      </div>
                      <!--已选岗位区域---end--->

                      <!--已选组织区域---start--->                                                          
                      <div
                          class="ccSelectedOrg_recursive ellipsis3" 
                          :ref="`ccSelectedOrg_recursive${Deliverie}`"
                          style="font-size: 12px; padding: 5px;"
                          v-if="Deliverie.OrgValue && Deliverie.OrgValue.length"
                          @click="ccShowAllOrg_recursive(Deliverie)">
                          已选组织：
                        <span
                          v-for="(org, index) in Deliverie.OrgValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.OrgValue && Deliverie.OrgValue.length-1 !== index">,</span>
                          </span>
                      </div>
                      <!--已选组织区域---end--->                                                          

                      <!--已选人员---start--->                                                                                
                      <div
                          class="ccSelectedPeople_recursive ellipsis3" 
                          :ref="`ccSelectedPeople_recursive${Deliverie}`"
                          style="font-size: 12px; padding: 5px;"
                          v-if="Deliverie.EmpValue && Deliverie.EmpValue.length"
                          @click="ccShowAllPeople_recursive(Deliverie)">
                          已选人员：
                        <span
                          v-for="(org, index) in Deliverie.EmpValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.EmpValue && Deliverie.EmpValue.length-1 !== index">,</span>
                          </span>
                      </div>
                      <!--已选人员---end--->                                                                                
                    </div>
                  <!-- </el-card> -->
                </div>  

                <div v-if="!node.CcModel.length" class="designPic-recursive">
                      <!--已选岗位--start-->
                      <div style="font-size: 12px; padding: 5px;">
                        <span>已选岗位：</span>
                        <span style="color: #cccccc">暂无</span>
                      </div>
                      <!--已选岗位区域---end--->

                      <!--已选组织区域---start--->                                                          
                      <div style="font-size: 12px; padding: 5px;">
                        <span>已选组织：</span>
                        <span style="color: #cccccc">暂无</span>
                      </div>
                      <!--已选组织区域---end--->                                                          

                      <!--已选人员---start--->                                                                                
                      <div style="font-size: 12px; padding: 5px;">
                        <span>已选人员：</span>
                        <span style="color: #cccccc">暂无</span>
                      </div>
                      <!---已选人员-----end--->                                  
                </div>                           
              </div>
            </div>
            <!----抄送人显示区----end-->                       
          </div>
          <!--节点名称下面的（多人处理规则、审批人、抄送人）显示区----start-->
        </div>
        <!-- <div class="fieldListItemBox" v-show="!node.Deliveries.length">
          <div class="defaultField">默认节点</div>
        </div> -->
        <!---分支下面branche.Deliveries里面 的节点----end-->     

        <!---节点下面新增插入新节点btn便签---start--->
        <div class="insertNodeBtn">
          <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" effect="dark" :content="`【${node.Name}】后新增节点`" placement="bottom">
            <i class="el-icon-circle-plus-outline add"  @click="clickAddMiddleNode($event,node)"></i>
          </el-tooltip>
        </div>
        <!---节点下面新增插入新节点btn标签---end--->                                        
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
  import {insertNode} from '@/api/approve'
  import { REQ_OK } from '@/api/config'
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
        ccVisible: false // 控制
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
      // 审批人展开显示 已选岗位/角色/职务
      showAllPosition_recursive(obj){
        debugger
        this.$refs[`selectedPosition_recursive${obj}`][0].classList.remove("ellipsis3")
      },
      // 审批人展开显示 已选组织
      showAllOrg_recursive(obj){
        debugger
        this.$refs[`selectedOrg_recursive${obj}`][0].classList.remove("ellipsis3")
      },
      // 审批人展开显示 已选人员
      showAllPeople_recursive(obj){
        debugger
        this.$refs[`selectedPeople_recursive${obj}`][0].classList.remove("ellipsis3")
      },  
      // 处理人展开显示 已选岗位/角色/职务
      ccShowAllPosition_recursive(obj){
        debugger
        this.$refs[`ccSelectedPosition_recursive${obj}`][0].classList.remove("ellipsis3")
      },
      // 处理人展开显示 已选组织
      ccShowAllOrg_recursive(obj){
        debugger
        this.$refs[`ccSelectedOrg_recursive${obj}`][0].classList.remove("ellipsis3")
      },      
      // 处理人展开显示 已选人员
      ccShowAllPeople_recursive(obj){
        debugger
        this.$refs[`ccSelectedPeople_recursive${obj}`][0].classList.remove("ellipsis3")
      },           
      // 编辑 节点名称 和规则
      handleEditNameAndRule (node) {
        debugger
        // this.$emit('handleEditNameAndRule', node)
        // 触发根组件中的 handleEditNameAndRule
        this.$bus.$emit('handleEditNameAndRule', node)
      },
      // 编辑新增处理人
      handleSelectApprover (code) {
        debugger
        // 触发根组件中的 handleSelectApprover
        this.$bus.$emit('handleSelectApprover', code)
      },
      // 编辑 抄送人100px
        // 选择抄送人
      handleSelectCc (node) {
        // this.NodeToNodeCode = NodeToNodeCode
        // 需要 选取最后一个节点的 NodeToNodeCode 作为  this.NodeToNodeCode 的值 需要递归遍历
        // if (branche.Nodes && branche.Nodes.length) {
        //   let getNodesName = (opt) => {
        //     if (opt && opt.length) {
        //       for (let i = 0; i < opt.length; i++) {
        //         let item = opt[i]
        //         if (item.Nodes && item.Nodes.length) {
        //           return getNodesName(item.Nodes)
        //         } else {
        //           // console.log(opt[0].Name)
        //           // console.log(item.Name)
        //           return item.NodeToNodeId
        //         }
        //       }
        //     } else {
        //       return opt.NodeToNodeId
        //     }
        //   }
        //   let lastNodeToNodeId = getNodesName(branche.Nodes)
        //   this.NodeToNodeCode = lastNodeToNodeId
        // } else {
        //   if (branche.NodeToNodeId) {
        //     this.NodeToNodeCode = branche.NodeToNodeId
        //   }
        // }
        // // 显示出 编辑抄送人的 dialog 弹窗
        // this.ccVisible = true

        // 触发根组件的 handleSelectCc_designPic 事件
        debugger
        this.$bus.$emit('handleSelectCc_designPic', node)
      },
      // 中间节点插入节点
      _insertNode (formerId, latterId) {
        debugger
        insertNode(formerId, latterId).then((res)=>{
          if(res && res.data.State ===REQ_OK){
            this.$message({
              type: 'success',
              message: "新增插入节点成功"
            })
          }else {
            this.$message({
              type: 'warning',
              message: `新增插入节点失败${res.data.Error},请重试`
            })
          }
        }).catch(() =>{
            this.$message({
              type: 'error',
              message: `新增插入节点失败${res.data.Error},请重试`
            })
        })
      },
      // 添加中间节点
      clickAddMiddleNode(e, obj) {
        debugger
        let NodeToNodeId_formerId = obj.NodeToNodeId
        let NodeToNodeId_latterId = ''
        if(obj.Nodes && obj.Nodes.length){
          // 非最后一个节点
          NodeToNodeId_latterId = obj.Nodes[0].NodeToNodeId
        }else {
          // 最后一个节点
          NodeToNodeId_latterId = ''
        }
        this.$confirm('确认需要新增插入节点吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 触发 父组件 的 inserNode方法
          this.$bus.$emit('insertNode',NodeToNodeId_formerId, NodeToNodeId_latterId)
          // 调用插入节点的方法
          // this._insertNode(NodeToNodeId_formerId, NodeToNodeId_latterId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消新增'
          })          
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .recursive-designpic-container
    .recursive-designpic
      .downTip
        position relative
        text-align center
        padding 10px 0
        font-size 30px
        .tip
          font-size 30px
          color rgba(185,185,185,0.5)
        .add 
          position absolute
          top 45%
          left 50%
          transform translate(-50%, -50%)
          font-size 15px
          color #409EFF
          &:hover
            cursor pointer
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
    .fieldListBox-recursive
      position relative
      display flex
      display -webkit-flex
      justify-content center
      flex-direction column 
      // border 1px solid red
      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)
      // margin-top 20px
      padding 0 5px
      box-sizing border-box
      .fieldListItemBox
        // margin-bottom 20px
        // border 1px solid blue
        padding 10px
        box-sizing border-box
        .fieldName
          font-size 12px
          font-weight bold
          padding 10px 0
          box-sizing border-box
          border-bottom 1px dotted #000000
          .tit
            margin-right 5px
          .tit-content
            margin-right 5px
            color rgba(214,214,214,1)
        .fieldContent
          .morePeopleRuleTitBox
            border-bottom 1px dotted #000000
            padding 10px 0
            box-sizing border-box
            .tit
              float left
              font-size 12px
              font-weight bold
              margin-right 5px
              max-width 100px
            .tit-content
              color rgba(214,214,214,1)
          .approverWrap
            padding 10px 0
            box-sizing border-box
            display flex !important
            display -webkit-flex !important
            justify-content flex-start
            align-items center
            border-bottom 1px dotted #000000
            .approverTit
              font-size 12px
              font-weight bold
              max-width 100px
              margin-right 5px
            .approverBox
              // display flex !important
              // justify-content flex-start
              // align-items center
              padding 10px 
              box-sizing border-box
              .selectedPosition_recursive
              .selectedPosition_recursive.ellipsis3
                cursor pointer
              .selectedOrg_recursive
              .selectedOrg_recursive.ellipsis3
                cursor pointer
              .selectedPeople_recursive
              .selectedPeople_recursive.ellipsis3
                cursor pointer
          .ccWrap 
            line-height 20px
            padding 10px 0
            box-sizing border-box
            display flex !important
            display -webkit-flex !important
            justify-content flex-start
            align-items center                        
            .ccTit
              font-weight bold
              font-size 12px
              margin-right 5px
              max-width 100px
            .ccDtailBox
              line-height 20px
      .insertNodeBtn
        position absolute
        bottom -10px
        left 50%
        transform translate(-50%, 0)
        text-align center
        font-size 20px
        color #409EFF
        &:hover
          cursor pointer
          color red
</style>
