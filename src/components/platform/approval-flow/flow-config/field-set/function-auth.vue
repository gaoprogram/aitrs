<!--
  User: gaol
  Date: 2019/5/23
  功能：节点设置——节点表单——功能控制
-->

<template>
  <div class="field_auth-container">
    <div v-loading="loading">
      <div>
        <el-select
          v-model="nodeObj.NodeId"
          placeholder="切换节点"
          size="small"
          @change="_getAll()"
          style="margin-bottom: 10px"
        >
          <el-option
            v-for="item in nodeList"
            :key="item.NodeId"
            :label="item.Name"
            :value="item.NodeId">
          </el-option>
        </el-select>
        <span style="margin-left: 90px">已配置流程控制</span>
      </div>

      <div class="table-container">
        <!--左边区域---start--->
        <div class="left-container">
          <!---主表功能区--start--->
          <div class="fn_auth-box">
            <el-tag size="small" @click.native="showMainBox = !showMainBox">主表功能控制</el-tag>
            <div class="main-box" v-show="showMainBox">
              <div class="role-box">
                <span class="title">权限</span>
                <div v-for="form in tableMain.Forms" class="name" :key="form.FormCode">
                  <span class="text" v-for="role in form.NodeFunctionRoles" :key="role.Role">{{role.RoleName}}</span>
                </div>
              </div>
              <div class="node-box">
                <div class="title">
                  <span v-for="node in tableMain.Nodes" class="name">
                    {{node.Name}}
                  </span>
                </div>

                <template v-for="form in tableMain.Forms">
                  <!-- form.NodeFunctionRoles： {{form.NodeFunctionRoles}} -->
                  <div v-for="(nodeFunctionRole, index) in form.NodeFunctionRoles" :key="index"
                       class="node-item">
                    <div v-for="(functionRoleInfo, i) in nodeFunctionRole.FunctionRoleInfos" :key="i"
                         class="select-box">
                      <el-select
                        class="filter-item"
                        v-model="functionRoleInfo.RoleValue"
                        size="mini"
                        style="width:104px;"
                      >
                        <el-option v-for="item in nodeRoleValue" :key="item.code" :label="item.value"
                                   :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!---主表功能区--end--->

          <!--明细表功能权限区---start-->
          <div class="fn_auth-box">
            <el-tag size="small" @click.native="showDetailBox = !showDetailBox">明细表功能控制</el-tag>
            <div class="main-box" v-show="showDetailBox">
              <div class="role-box">
                <span class="title">权限</span>
                <div v-for="form in tableDetail.Forms" class="name" :key="form.FormCode">
                  <span class="text" v-for="role in form.NodeFunctionRoles" :key="role.Role">{{role.RoleName}}</span>
                </div>
              </div>
              <div class="node-box">
                <div class="title">
                  <span v-for="node in tableDetail.Nodes" class="name">
                    {{node.Name}}
                  </span>
                </div>
                <template v-for="form in tableDetail.Forms">
                  <div v-for="(nodeFunctionRole, index) in form.NodeFunctionRoles" :key="index"
                       class="node-item">
                    <div v-for="(functionRoleInfo, i) in nodeFunctionRole.FunctionRoleInfos" :key="i"
                         class="select-box">
                      <el-select
                        class="filter-item"
                        v-model="functionRoleInfo.RoleValue"
                        size="mini"
                        style="width:104px;"
                      >
                        <el-option v-for="item in nodeRoleValue" :key="item.code" :label="item.value"
                                   :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!--明细表功能权限区---end-->
          <!--附件功能权限区---start-->
          <div class="fn_auth-box">
            <el-tag size="small" @click.native="showAttachmentBox = !showAttachmentBox">附件功能控制</el-tag>
            <div class="main-box" v-show="showAttachmentBox">
              <div class="role-box">
                <span class="title">权限</span>
                <div v-for="form in tableAttachment.Forms" class="name" :key="form.FormCode">
                  <span class="text" v-for="role in form.NodeFunctionRoles" :key="role.Role">{{role.RoleName}}</span>
                </div>
              </div>
              <div class="node-box">
                    <div class="title">
                      <span v-for="node in tableAttachment.Nodes" class="name">
                        {{node.Name}}
                      </span>
                    </div>
                    <template v-for="form in tableAttachment.Forms">
                      <div v-for="(nodeFunctionRole, index) in form.NodeFunctionRoles" :key="index"
                           class="node-item">
                        <div v-for="(functionRoleInfo, i) in nodeFunctionRole.FunctionRoleInfos" :key="i"
                             class="select-box">
                          <el-select
                            class="filter-item"
                            v-model="functionRoleInfo.RoleValue"
                            size="mini"
                            style="width:104px;"
                            v-if="functionRoleInfo.Role !== 'AttachmentDeleteRule'"
                          >
                            <el-option v-for="item in nodeRoleValue" :key="item.code" :label="item.value"
                                       :value="item.code">
                            </el-option>
                          </el-select>
                          <el-select
                            class="filter-item"
                            v-model="functionRoleInfo.RoleValue"
                            size="mini"
                            style="width:104px;"
                            v-if="functionRoleInfo.Role === 'AttachmentDeleteRule'"
                          >
                            <el-option v-for="item in nodeRoleValue3" :key="item.code" :label="item.value"
                                       :value="item.code">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </template>
                  </div>
            </div>
          </div>
          <!--附件功能权限区---end-->
        </div>
        <!--左边区域---end--->


        <!--右边区域--start-->
        <div class="right-container">
          <div class="fn_auth-box">
            <el-tag size="small" @click.native="showMainBox = !showMainBox">主表功能控制</el-tag>
            <div class="main-box" v-show="showMainBox">
              <div style="width: 600px">
                <el-scrollbar style="width: 100%" :native="false">
                  <div class="node-box">
                    <div class="title">
                      <span v-for="node in flowMain.Nodes" class="name">
                        {{node.Name}}
                      </span>
                    </div>
                    <template v-for="form in flowMain.Forms">
                      <div v-for="(nodeFunctionRole, index) in form.NodeFunctionRoles" :key="index"
                           class="node-item">
                        <div v-for="(functionRoleInfo, i) in nodeFunctionRole.FunctionRoleInfos" :key="i"
                             class="select-box">
                          <el-select
                            class="filter-item"
                            v-model="functionRoleInfo.RoleValue"
                            size="mini"
                            style="width:104px;"
                            disabled
                          >
                            <el-option v-for="item in nodeRoleValue" :key="item.code" :label="item.value"
                                       :value="item.code">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </template>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
          <div class="fn_auth-box">
            <el-tag size="small" @click.native="showDetailBox = !showDetailBox">明细表功能控制</el-tag>
            <div class="main-box" v-show="showDetailBox">
              <div style="width: 600px">
                <el-scrollbar style="width: 100%" :native="false">
                  <div class="node-box">
                    <div class="title">
                      <span v-for="node in flowDetail.Nodes" class="name">
                        {{node.Name}}
                      </span>
                    </div>
                    <template v-for="form in flowDetail.Forms">
                      <div v-for="(nodeFunctionRole, index) in form.NodeFunctionRoles" :key="index"
                           class="node-item">
                        <div v-for="(functionRoleInfo, i) in nodeFunctionRole.FunctionRoleInfos" :key="i"
                             class="select-box">
                          <el-select
                            class="filter-item"
                            v-model="functionRoleInfo.RoleValue"
                            size="mini"
                            style="width:104px;"
                            disabled
                          >
                            <el-option v-for="item in nodeRoleValue" :key="item.code" :label="item.value"
                                       :value="item.code">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </template>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
          <div class="fn_auth-box">
            <el-tag size="small" @click.native="showAttachmentBox = !showAttachmentBox">附件功能控制</el-tag>
            <div class="main-box" v-show="showAttachmentBox">
              <div style="width: 600px">
                <el-scrollbar style="width: 100%" :native="false">
                  <div class="node-box">
                    <div class="title">
                      <span v-for="node in flowAttachment.Nodes" class="name">
                        {{node.Name}}
                      </span>
                    </div>
                    <template v-for="form in flowAttachment.Forms">
                      <div v-for="(nodeFunctionRole, index) in form.NodeFunctionRoles" :key="index"
                           class="node-item">
                        <div v-for="(functionRoleInfo, i) in nodeFunctionRole.FunctionRoleInfos" :key="i"
                             class="select-box">
                          <el-select
                            class="filter-item"
                            v-model="functionRoleInfo.RoleValue"
                            size="mini"
                            style="width:104px;"
                            disabled
                            v-if="functionRoleInfo.Role !== 'AttachmentDeleteRule'"
                          >
                            <el-option v-for="item in nodeRoleValue" :key="item.code" :label="item.value"
                                       :value="item.code">
                            </el-option>
                          </el-select>
                          <el-select
                            class="filter-item"
                            v-model="functionRoleInfo.RoleValue"
                            size="mini"
                            style="width:104px;"
                            disabled
                            v-if="functionRoleInfo.Role === 'AttachmentDeleteRule'"
                          >
                            <el-option v-for="item in nodeRoleValue3" :key="item.code" :label="item.value"
                                       :value="item.code">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </template>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </div>
        <!--右边区域--end-->
      </div>
      <save-footer :isCancel="false" cancelText="关闭" @cancel="handleClose" @save="handleFieldAuthSave"></save-footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getFunctionRoleList,
    saveFunctionRoleList,
    getDetailFunctionRoleList,
    saveDetailFunctionRoleList,
    getAttachmentFunctionRoleList,
    saveAttachmentFunctionRoleList
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { flowAutoLogin, flowBaseFn, flowNodeSet } from '@/utils/mixin'

  export default {
    mixins: [flowBaseFn, flowAutoLogin, flowNodeSet],
    props: {
      roleRange: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        loading: true,
        showMainBox: true,
        showDetailBox: true,
        showAttachmentBox: true,
        tableMain: {},
        tableDetail: {},
        tableAttachment: {},
        flowMain: {},
        flowDetail: {},
        flowAttachment: {},
        nodeFieldRoles: [
          {
            value: '未选择',
            code: -1
          },
          {
            value: '只读',
            code: 1
          },
          {
            value: '读写',
            code: 2
          },
          {
            value: '隐藏',
            code: 4
          }
        ],
        nodeRoleValue: [
          {
            value: '未选择',
            code: -1
          },
          {
            value: '是',
            code: 1
          },
          {
            value: '否',
            code: 0
          }
        ],
        nodeRoleValue3: [
          {
            value: '未选择',
            code: -1
          },
          {
            value: '删除所有',
            code: 1
          },
          {
            value: '不能删除',
            code: 2
          },
          {
            value: '只能删除自己上传的',
            code: 4
          }
        ]
      }
    },
    created () {
      this._getAll()
    },
    methods: {
      // 获取功能权限主表详情 、获取功能权限明细表 、获取功能权限附件
      _getAll () {
        Promise.all([
          getFunctionRoleList(this.flowId, this.roleRange, this.nodeObj.NodeId),
          getDetailFunctionRoleList(this.flowId, this.roleRange, this.nodeObj.NodeId),
          getAttachmentFunctionRoleList(this.flowId, this.roleRange, this.nodeObj.NodeId),
          getFunctionRoleList(this.flowId, this.roleRange),
          getDetailFunctionRoleList(this.flowId, this.roleRange),
          getAttachmentFunctionRoleList(this.flowId, this.roleRange)
        ]).then(([tableMainResp, tableDetailResp, tableAttResp, flowMainResp, flowDetailResp, flowAttResp]) => {
          this.loading = false
          if (
            tableMainResp.data.State === REQ_OK &&
            tableDetailResp.data.State === REQ_OK &&
            tableAttResp.data.State === REQ_OK &&
            flowMainResp.data.State === REQ_OK &&
            flowDetailResp.data.State === REQ_OK &&
            flowAttResp.data.State === REQ_OK
          ) {
            this.tableMain = tableMainResp.data.Data
            this.tableDetail = tableDetailResp.data.Data
            this.tableAttachment = tableAttResp.data.Data
            this.flowMain = flowMainResp.data.Data
            this.flowDetail = flowDetailResp.data.Data
            this.flowAttachment = flowAttResp.data.Data
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('请求失败，请重试！')
        })
      },
      // 保存、保存功能权限主表详情、保存功能权限明细表、保存功能权限附件
      handleFieldAuthSave () {
        // 首先判断 主表功能控制区域 、 明细表功能控制区域 、 附件功能控制区域 中如果有 【未选择】 的设置项 则不让保存
        if(this.tableMain) {
          if( this.tableMain.Forms && this.tableMain.Forms.length){
            for(let i=0,length=this.tableMain.Forms.length;i<length; i++){
              let item = this.tableMain.Forms[i]
              if( item.NodeFunctionRoles && item.NodeFunctionRoles.length){
                for(let j =0,len=item.NodeFunctionRoles.length;j<len; j++){
                  let item_two = item.NodeFunctionRoles[j]
                  if(item_two.FunctionRoleInfos && item_two.FunctionRoleInfos.length){
                    for(let m=0,len = item_two.FunctionRoleInfos.length;m<len;m++){
                      let item_three = item_two.FunctionRoleInfos[m]
                      if(item_three.RoleValue === -1){
                        // 有未设置的选项
                        this.$message({
                          type: 'warning',
                          message: `主表功能控制中 【${item_two.RoleName}】未设置，请设置后保存`
                        })
                        return
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if( this.tableDetail ){
          if( this.tableDetail.Forms && this.tableDetail.Forms.length){
            for(let i=0,length=this.tableDetail.Forms.length;i<length; i++){
              let item = this.tableDetail.Forms[i]
              if( item.NodeFunctionRoles && item.NodeFunctionRoles.length){
                for(let j =0,len=item.NodeFunctionRoles.length;j<len; j++){
                  let item_two = item.NodeFunctionRoles[j]
                  if(item_two.FunctionRoleInfos && item_two.FunctionRoleInfos.length){
                    for(let m=0,len = item_two.FunctionRoleInfos.length;m<len;m++){
                      let item_three = item_two.FunctionRoleInfos[m]
                      if(item_three.Role!== 'AttachmentDeleteRule' && item_three.RoleValue === -1){
                        // 有未设置的选项
                        this.$message({
                          type: 'warning',
                          message: `明细表功能控制中 【${item_two.RoleName}】未设置，请设置后保存`
                        })
                        return
                      }else if( item_three.Role === 'AttachmentDeleteRule' && item_three.RoleValue === -1 ){
                        // 有未设置的选项
                        this.$message({
                          type: 'warning',
                          message: `明细表功能控制中 【${item_two.RoleName}】未设置，请设置后保存`
                        })
                        return                        
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if( this.tableAttachment ){
          if( this.tableAttachment.Forms && this.tableAttachment.Forms.length){
            for(let i=0,length=this.tableAttachment.Forms.length;i<length; i++){
              let item = this.tableAttachment.Forms[i]
              if( item.NodeFunctionRoles && item.NodeFunctionRoles.length){
                for(let j =0,len=item.NodeFunctionRoles.length;j<len; j++){
                  let item_two = item.NodeFunctionRoles[j]
                  if(item_two.FunctionRoleInfos && item_two.FunctionRoleInfos.length){
                    for(let m=0,len = item_two.FunctionRoleInfos.length;m<len;m++){
                      let item_three = item_two.FunctionRoleInfos[m]
                      if(item_three.Role!== 'AttachmentDeleteRule' && item_three.RoleValue === -1){
                        // 有未设置的选项
                        this.$message({
                          type: 'warning',
                          message: `明细表功能控制中 【${item_two.RoleName}】未设置，请设置后保存`
                        })
                        return
                      }else if( item_three.Role === 'AttachmentDeleteRule' && item_three.RoleValue === -1 ){
                        // 有未设置的选项
                        this.$message({
                          type: 'warning',
                          message: `明细表功能控制中 【${item_two.RoleName}】未设置，请设置后保存`
                        })
                        return                        
                      }
                    }
                  }
                }
              }
            }
          }
        }

        //--------上面验证都有设置后 进行如下的操作------
        this.loading = true
        Promise.all([
          saveFunctionRoleList(this.flowId, JSON.stringify(this.tableMain.Forms[0].NodeFunctionRoles), this.roleRange),
          saveDetailFunctionRoleList(this.flowId, JSON.stringify(this.tableDetail.Forms[0].NodeFunctionRoles), this.roleRange),
          saveAttachmentFunctionRoleList(this.flowId, JSON.stringify(this.tableAttachment.Forms[0].NodeFunctionRoles), this.roleRange)
        ]).then(([tableMainResp, tableDetailResp, tableAttResp]) => {
          this.loading = false
          if (tableMainResp.data.State === REQ_OK && tableDetailResp.data.State === REQ_OK && tableAttResp.data.State === REQ_OK) {
            this.$message.success('保存成功')
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('保存失败，请重试！')
        })
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .field_auth-container
    .table-container
      display flex
      .left-container, .right-container
        .fn_auth-box
          margin-bottom 10px
          .main-box
            display flex
            .table-name-box, .role-box
              display flex
              flex 0 0 150px
              flex-direction: column
              align-items: center
              .title
                font-weight bold
                display inline-block
                height 28px
                line-height 28px
                padding 10px
              .text
                display block
                height 28px
                line-height 28px
                padding 10px
            .table-name-box
              .name
                display block
                width 80px
                no-wrap()
            .node-box
              display flex
              flex 1
              flex-direction: column
              white-space: nowrap;
              .title, .node-item
                padding 10px
                .name
                  display inline-block
                  height: 28px;
                  width 120px;
                  line-height: 28px;
                  padding 0 10px
                  text-align: center
                  font-weight bold
                .select-box
                  display inline-block
                  width 120px;
                  text-align: center
                  padding 0 10px
      .left-container
        flex 0 0 300px
        border-right 1px solid #dedede
      .right-container
        padding-left 15px
        .fn_auth-box
          .main-box
            margin-top 30px
</style>
