<!--
  User: xxxxxxx
  Date: 2018/9/13
  功能：节点设置——节点表单——功能权限
-->

<template>
  <div class="field_auth-container">
    <div v-loading="loading">
      <div class="filter-container">
        <div class="tags-container">
          <el-button
            size="mini"
            @click="handleSwitchAuth('main')"
            class="addTag"
            :type="tableAuth === 'main' ? 'primary' : ''"
          >
            主表权限
          </el-button>
          <el-button
            size="mini"
            @click="handleSwitchAuth('detail')"
            class="addTag"
            :type="tableAuth === 'detail' ? 'primary' : ''"
          >
            明细表权限
          </el-button>
          <el-button
            size="mini"
            @click="handleSwitchAuth('attachments')"
            class="addTag"
            :type="tableAuth === 'attachments' ? 'primary' : ''"
          >
            附件
          </el-button>
        </div>
      </div>

      <div class="table-container">
        <el-card class="box-card">
          <div class="fn_auth-box">
            <div class="main-box">
              <div class="table-name-box">
                <span class="title" v-if="tableAuth === 'main'">主表名</span>
                <span class="title" v-if="tableAuth === 'detail'">明细表名</span>
                <span class="title" v-if="tableAuth === 'attachments'">我的附件</span>
                <span v-for="form in tableDetail.Forms" :title="form.Name">
                  <span class="text">
                    {{form.Name}}
                  </span>
                  <span class="text">
                  </span>
                  <span class="text">
                  </span>
                  <span class="text">
                  </span>
                </span>
              </div>

              
              <div class="role-box">
                <span class="title">权限</span>
                <div v-for="form in tableDetail.Forms" class="name" :key="form.FormCode">
                  <span class="text">可下载</span>
                  <span class="text" v-if="tableAuth === 'detail' || tableAuth === 'attachments'">可上传</span>
                  <span class="text" v-if="tableAuth === 'attachments'">可删除</span>
                  <span class="text" v-if="tableAuth === 'detail'">可删除行</span>
                  <span class="text" v-if="tableAuth === 'detail'">可增加行</span>
                </div>
                <div v-if="tableAuth === 'attachments'" class="name">
                  <span class="text">可下载</span>
                  <span class="text">可上传</span>
                  <span class="text">可删除</span>
                </div>
              </div>

              <div style="width: 716px">
                <el-scrollbar style="width: 100%" :native="false">
                  <div class="node-box">
                    <div class="title">
                    <span v-for="node in tableDetail.Nodes" class="name">
                      {{node.Name}}
                    </span>
                    </div>
                    <div v-for="(nodeFunctionRole, index) in tableDetail.NodeFunctionRoles" :key="index"
                         class="node-item">
                      <div v-for="(functionRoleInfo, i) in nodeFunctionRole.FunctionRoleInfos" :key="i"
                           class="select-box">
                        <el-select
                          class="filter-item"
                          v-model="functionRoleInfo.RoleValue"
                          size="mini"
                          style="width:104px;"
                          v-if="tableAuth !== 'attachments' || (functionRoleInfo.Role !== 3 && tableAuth === 'attachments')"
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
                          v-if="functionRoleInfo.Role === 3 && tableAuth === 'attachments'"
                        >
                          <el-option v-for="item in nodeRoleValue3" :key="item.code" :label="item.value"
                                     :value="item.code">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
          <save-footer :isCancel="true" cancelText="关闭" @cancel="handleClose" @save="handleFieldAuthSave"></save-footer>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getRuleList,
    getFunctionRoleList,
    saveFunctionRoleList,
    getDetailFunctionRoleList,
    saveDetailFunctionRoleList,
    getAttachmentFunctionRoleList,
    saveAttachmentFunctionRoleList
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { flowAutoLogin, flowBaseFn } from '@/utils/mixin'

  export default {
    mixins: [flowBaseFn, flowAutoLogin],
    data () {
      return {
        loading: true,
        ruleList: [],
        flowId: '',
        tableDetail: {},
        activeName: '',
        tableAuth: 'main',
        selectedTable: '',
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
        ],
        allNodeValue: ''
      }
    },
    async created () {
      try {
        this._getRuleList()
      } catch (error) {
        this.$message({
          message: '请求错误，请刷新重试！',
          type: 'error'
        })
        this.loading = false
      }
    },
    methods: {
      // 获取规则列表
      _getRuleList () {
        getRuleList(this.companyApprovalId).then(res => {
          if (res.data.State === REQ_OK) {
            this.ruleList = res.data.Data
            if (res.data.Data.length) {
              this.activeName = res.data.Data[0].FK_Flow.toString()
              this._getFunctionRoleList()
            } else {
              this.loading = false
              this.$alert('未建立规则，请先在流程设计添加规则！', '提示', {
                confirmButtonText: '确定'
              })
            }
          } else {
            this.$message({
              message: '请求错误，请刷新重试！',
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            message: '请求错误，请刷新重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 获取功能权限主表详情
      _getFunctionRoleList () {
        getFunctionRoleList(this.activeName).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.tableDetail = res.data.Data
          } else {
            this.$message({
              message: '获取功能权限主表详情失败，请刷新重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '获取功能权限主表详情失败，请刷新重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 保存功能权限主表详情
      _saveFunctionRoleList () {
        saveFunctionRoleList(this.activeName, JSON.stringify(this.tableDetail.NodeFunctionRoles)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this._getFunctionRoleList()
          } else {
            this.$message({
              message: '保存失败！',
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            message: '保存失败！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 获取功能权限明细表
      _getDetailFunctionRoleList () {
        getDetailFunctionRoleList(this.activeName).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.tableDetail = res.data.Data
          } else {
            this.$message({
              message: '获取功能权限明细表失败，请刷新重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '获取功能权限明细表失败，请刷新重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 保存功能权限明细表
      _saveDetailFunctionRoleList () {
        saveDetailFunctionRoleList(this.activeName, JSON.stringify(this.tableDetail.NodeFunctionRoles)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this._getDetailFunctionRoleList()
          } else {
            this.$message({
              message: '保存失败！',
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            message: '保存失败！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 获取功能权限附件
      _getAttachmentFunctionRoleList () {
        getAttachmentFunctionRoleList(this.activeName).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableDetail = res.data.Data
          } else {
            this.$message({
              message: '请求错误，请刷新重试！',
              type: 'error'
            })
          }
          this.loading = false
        }).catch(() => {
          this.$message({
            message: '请求错误，请刷新重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 保存功能权限附件
      _saveAttachmentFunctionRoleList () {
        saveAttachmentFunctionRoleList(this.activeName, JSON.stringify(this.tableDetail.NodeFunctionRoles)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this._getAttachmentFunctionRoleList()
          } else {
            this.$message({
              message: '保存失败！',
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            message: '保存失败！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 点击规则切换
      handleRuleClick (tab, event) {
        this.loading = true
        this._getFunctionRoleList()
      },
      // 点击主表/明细表/附件tab切换
      handleSwitchAuth (auth) {
        this.loading = true
        if (auth === 'main') {
          this.tableAuth = 'main'
          this._getFunctionRoleList()
        }
        if (auth === 'detail') {
          this.tableAuth = 'detail'
          this._getDetailFunctionRoleList()
        }
        if (auth === 'attachments') {
          this.tableAuth = 'attachments'
          this._getAttachmentFunctionRoleList()
        }
      },
      // 保存
      handleFieldAuthSave () {
        this.loading = true
        if (this.tableAuth === 'main') {
          this._saveFunctionRoleList()
        }
        if (this.tableAuth === 'detail') {
          this._saveDetailFunctionRoleList()
        }
        if (this.tableAuth === 'attachments') {
          this._saveAttachmentFunctionRoleList()
        }
      },
      // 统一修改字段值
      handleChangeAllMainFieldValue (value, nodeId) {
        this.tableDetail.NodeFieldRoles.forEach(i => {
          if (i.NodeId === nodeId) {
            i.FieldRoleInfos.forEach(field => {
              field.Role = value
            })
          }
        })
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .field_auth-container
    .table-container
      margin-top 20px
      .fn_auth-box
        .main-box
          display flex
          .table-name-box, .role-box
            display flex
            flex 0 0 100px
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
</style>
