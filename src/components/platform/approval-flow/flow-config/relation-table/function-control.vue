<!--
  User: gaol
  Date: 2019/5/24
  功能: 流程配置——流程表單——功能控制
-->
  <template>
    <transition name="el-zoom-in-center">
      <el-dialog
        title="功能控制"
        width="500px"
        :append-to-body="true"
        :close-on-click-modal="false"
        :show-close="false"
        :visible.sync="functionControlShow"
        :fullscreen="true"
        :lock-scroll="true"
        show-close
        :before-close="cancelFunctionControl"
        class="function_control-container"
      >
      <div class="showTit">提示：系统会优先取节点表单设置中的权限配置</div>
      <div class="containerBox" v-loading="loading">
        <!---切换节点--start--->
        <!-- <div class="changeNodeBox">
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
        </div> -->
        <!---切换节点--end--->
        <el-card>
          <!--功能权限（主表、明细表、附件功能）container部分--start-->
          <div class="table-container">
            <div class="container">

              <!----主表功能控制--start--->
              <div class="fn_auth-box">
                <el-tag size="small" @click.native="showMainBox = !showMainBox">主表功能控制</el-tag>

                <div class="main-box" v-show="showMainBox">
                  <div class="role-box">
                    <span class="title">权限</span>
                     <!-- tableMain.Forms: {{ tableMain.Forms}} -->
                    <div v-for="form in tableMain.Forms" class="name" :key="form.FormCode">
                      <span class="text" v-for="role in form.NodeFunctionRoles" :key="role.Role">{{role.RoleName}}</span>
                    </div>
                  </div>

                  <el-scrollbar style="width: 300px" :native="false">
                    <!--节点名称--start-->
                    <div class="node-box">
                      <div class="title">
                        <span v-for="node in tableMain.Nodes" class="name">
                          {{node.Name}}
                        </span>
                      </div>
                    <!--节点名称--end-->

                      <!---节点功能权限--start-->
                      <template v-for="form in tableMain.Forms">
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
                      <!---节点功能权限--end-->
                    </div>                
                  </el-scrollbar>
                </div>
              </div>
              <!----主表功能控制--end--->


              <!---明细表功能控制---start-->
              <div class="fn_auth-box">
                <el-tag size="small" @click.native="showDetailBox = !showDetailBox">明细表功能控制</el-tag>
                <div class="main-box" v-show="showDetailBox">
                  <div class="role-box">
                    <span class="title">权限</span>
                    <!-- tableDetail.Forms: {{tableDetail.Forms}} -->
                    <div v-for="form in tableDetail.Forms" class="name" :key="form.FormCode">
                      <span class="text" v-for="role in form.NodeFunctionRoles" :key="role.Role">{{role.RoleName}}</span>
                    </div>
                  </div>

                  <el-scrollbar style="width: 300px" :native="false">
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
                  </el-scrollbar>
                </div>
              </div>
              <!---明细表功能控制---end-->

              <!---附件功能控制--start--->
              <div class="fn_auth-box">
                <el-tag size="small" @click.native="showAttachmentBox = !showAttachmentBox">附件功能控制</el-tag>
                <div class="main-box" v-show="showAttachmentBox">
                  <div class="role-box">
                    <span class="title">权限</span>
                    <!-- tableAttachment.Forms： {{tableAttachment.Forms}} -->
                    <div v-for="form in tableAttachment.Forms" class="name" :key="form.FormCode">
                      <span class="text" v-for="role in form.NodeFunctionRoles" :key="role.Role">{{role.RoleName}}</span>
                    </div>
                  </div>

                  <el-scrollbar style="width: 300px" :native="false">
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
                  </el-scrollbar>
                </div>
              </div>
              <!---附件功能控制--end--->            
            </div>
          </div>
          <!--功能权限（主表、明细表、附件功能）container--start-->          
        </el-card>


        <!-- <save-footer :isCancel="false" cancelText="关闭" @cancel="handleClose" @save="handleFieldAuthSave"></save-footer> -->
      </div>

      <div class="dialog-footer" style="display: block; padding: 10px 0; text-align: center">
        <el-button @click.native="cancelFunctionControl()">取消</el-button>
        <el-button type="primary" @click.native="handleFunctionControlSave()">保存</el-button>
      </div>

    </el-dialog>  
  </transition>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getFunctionRoleList,    // 获取主表功能权限接口
    saveFunctionRoleList,   // 保存主表功能权限接口
    getDetailFunctionRoleList,  // 获取明细表功能权限接口
    saveDetailFunctionRoleList,  // 保存明细功能权限接口
    getAttachmentFunctionRoleList,  // 获取附件功能权限接口
    saveAttachmentFunctionRoleList,  // 保存附件功能权限接口
    saveFieldRoleList,
    getMainAndDetailTables            // 获取主表和明细表
  } from '@/api/approve'
  import {
    getRoleRange
  } from '@/api/permission'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { flowAutoLogin, flowBaseFn, flowNodeSet } from '@/utils/mixin'
  export default {
    mixins: [flowBaseFn, flowAutoLogin, flowNodeSet],
    props: {
      tableData: {
        type: Array,
        default: () => {
          return []
        }
      },
      functionControlShow: {
        type: Boolean,
        default: false
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
        roleRange: '', // 当前的rolerange
        flowId: 0, // 当前的 flowId
        flowMain: {},  // 主表数据
        flowDetail: {}, // 明细表数据
        flowAttachment: {}, // 附件数据
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
      debugger
      this.flowId = parseInt(this.$route.query.flowId)
      Promise.all([getRoleRange('WorkFlow')]).then(([res]) => {
        if (res && res.data.State === REQ_OK) {
          this.roleRange = res.data.Data
          this._getAll()
        }
      })
    },
    mounted () {

    },
    updated () {
  
    },
    components: {
    },
    computed: {
  
    },
    watch: {

    },
    methods: {
      // 获取roleRange
      _getRoleRange () {
        getRoleRange('WorkFlow').then((res) => {
          if (res && res.data.State === REQ_OK) {
            debugger
            this.roleRange = res.data.Data
          }
        })
      },
      // 获取功能权限主表详情 、获取功能权限明细表 、获取功能权限附件
      _getAll () {
        console.log(this.roleRange)
        debugger
        // 注意  this.roleRange 为 mixins中 flowAutoLogin 获取的到的
        Promise.all([
          getFunctionRoleList(this.flowId, this.roleRange, 0, true),
          getDetailFunctionRoleList(this.flowId, this.roleRange, 0, true),
          getAttachmentFunctionRoleList(this.flowId, this.roleRange, 0, true),
          getFunctionRoleList(this.flowId, this.roleRange),
          getDetailFunctionRoleList(this.flowId, this.roleRange),
          getAttachmentFunctionRoleList(this.flowId, this.roleRange)
        ]).then(([tableMainResp, tableDetailResp, tableAttResp, flowMainResp, flowDetailResp, flowAttResp]) => {
          this.loading = false
          debugger
          if (
            tableMainResp.data.State === REQ_OK &&
            tableDetailResp.data.State === REQ_OK &&
            tableAttResp.data.State === REQ_OK &&
            flowMainResp.data.State === REQ_OK &&
            flowDetailResp.data.State === REQ_OK &&
            flowAttResp.data.State === REQ_OK
          ) {
            debugger
            this.tableMain = tableMainResp.data.Data
            this.tableDetail = tableDetailResp.data.Data
            this.tableAttachment = tableAttResp.data.Data
            this.flowMain = flowMainResp.data.Data
            this.flowDetail = flowDetailResp.data.Data
            this.flowAttachment = flowAttResp.data.Data
            debugger
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('请求失败，请重试！')
        })
      },
      // 保存、保存功能权限主表详情、保存功能权限明细表、保存功能权限附件
      handleFunctionControlSave () {
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
      },
      cancelFunctionControl () {
        this.$emit('update:functionControlShow', false)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .function_control-container
    >>>.el-dialog__body
      width 1200px
      margin 0 auto
      .showTit
        color red
        font-size 14px
      .containerBox
        margin-top 5px
      .changeNodeBox
        margin-left 80px
      .table-container
        display flex
        .container
          width 100%
          display flex
          flex-direction row
          justify-content center
          .fn_auth-box
            width 30%
            margin 10px
            .main-box
              display flex
              .el-scrollbar__wrap
                margin-top 30px !important
                margin-bottom 0 !important
                margin-right 0 !important
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
</style>
