<!--
  User: xxxxxxx
  Date: 2018/9/13
  功能：xxxxxx
-->

<template>
  <div class="field_auth-container">
    <div v-loading="loading">
      <el-tabs v-model="activeName" @tab-click="handleRuleClick">
        <el-tab-pane :label="rule.Name" :name="rule.FK_Flow.toString()" v-for="rule in ruleList" :key="rule.FK_Flow">
        </el-tab-pane>
      </el-tabs>
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
        </div>
        <div style="margin-top: 10px" v-if="tableAuth === 'main'">
          <el-select
            class="filter-item"
            v-model="selectedTable"
            size="mini"
            style="width:100px;"
            @change="_getFieldRoleList"
          >
            <el-option v-for="item in tableList" :key="item.TableCode" :label="item.Name"
                       :value="item.TableCode">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px" v-if="tableAuth === 'detail'">
          <el-select
            class="filter-item"
            v-model="selectedTable"
            size="mini"
            style="width:100px;"
            @change="_getDetailFieldRoleList"
          >
            <el-option v-for="item in tableList" :key="item.DetailTableCode" :label="item.Name"
                       :value="item.DetailTableCode">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="table-container" v-if="this.tableList && this.tableList.length">
        <el-card class="box-card">
          <div class="table-content">
            <div class="nodes-container">
              <div class="placeholder-box"></div>
              <div style="width: 800px">
                <el-scrollbar style="width: 100%" :native="false">
                  <div class="node-list">
                    <div class="node-item" v-for="(node, index) in tableDetail.Nodes" :key="index">
                      <span class="name">{{node.Name}}</span>
                      <el-select
                        class="filter-item"
                        v-model="node.value"
                        size="mini"
                        style="width:104px;"
                        @change="handleChangeAllMainFieldValue(node.value, index)"
                      >
                        <el-option v-for="item in nodeFieldRoles" :key="item.code" :label="item.value"
                                   :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
            <div class="teams-container">
              <div class="team-item" v-for="(team, index) in tableDetail.Teams" :key="index">
                <div class="left-container">
                  <span class="teamName" v-html="team.Name || '默认分组'"></span>
                  <div class="fields">
                    <span class="name" v-for="field in team.Fields" :key="field.FieldCode">{{field.Name}}</span>
                  </div>
                </div>
                <div style="width: 800px">
                  <el-scrollbar style="width: 100%" :native="false">
                    <div class="right-container">
                      <div class="placeholder-box">
                        <div class="node-item" v-for="(node, index) in tableDetail.Nodes" :key="index">
                          <span class="name">{{node.Name}}</span>
                          <el-select
                            class="filter-item"
                            v-model="node.value"
                            size="mini"
                            style="width:104px;"
                            @change="handleChangeAllTeamFieldValue(team, node.value, index)"
                          >
                            <el-option v-for="item in nodeFieldRoles" :key="item.code" :label="item.value"
                                       :value="item.code">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <div class="content-box">
                        <div class="node-list" v-for="node in team.NodeFieldRoles" :key="node.NodeId">
                          <div class="node-item" v-for="(field, i) in node.FieldRoleInfos" :key="i">
                            <el-select
                              v-model="field.Role"
                              size="mini"
                              style="width:104px;"
                            >
                              <el-option v-for="item in nodeFieldRoles" :key="item.code" :label="item.value"
                                         :value="item.code">
                              </el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-scrollbar>
                </div>
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
    getCompanyTableList,
    getFieldRoleList,
    saveFieldRoleList,
    getDetailTableList,
    getDetailFieldRoleList,
    saveDetailFieldRoleList
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
        tableList: [],
        tableDetail: {},
        activeName: '', // 当前规则下流程ID
        tableAuth: 'main',
        selectedTable: '',
        nodeFieldRoles: [
          {
            value: '未选择',
            code: 0
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
            code: 0
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
              this._getCompanyTableList()
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
      // 获取字段权限主表列表
      _getCompanyTableList () {
        this.loading = true
        getCompanyTableList(this.activeName).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableList = res.data.Data
            if (this.tableList.length) {
              this.selectedTable = this.tableList[0].TableCode
              this._getFieldRoleList()
            } else {
              this.loading = false
              this.$message({
                message: '暂无数据！'
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
      // 获取字段权限明细表列表
      _getDetailTableList () {
        this.loading = true
        getDetailTableList(this.activeName).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.tableList = res.data.Data
            if (this.tableList.length) {
              this.selectedTable = this.tableList[0].DetailTableCode
              this._getDetailFieldRoleList()
            } else {
              this.$message({
                message: '暂无数据！'
              })
            }
          } else {
            this.$message({
              message: '请求错误，请刷新重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            message: '请求错误，请刷新重试！',
            type: 'error'
          })
        })
      },
      // 获取字段权限主表对应的详情
      _getFieldRoleList () {
        this.loading = true
        getFieldRoleList(this.selectedTable, this.activeName).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableDetail = res.data.Data
            this.tableDetail.Nodes.forEach(i => {
              this.$set(i, 'value', 0)
            })
            setTimeout(() => {
              this.loading = false
            }, 1000)
          } else {
            this.$message({
              message: res.data.Error,
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            message: '获取字段权限主表失败，请刷新重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 保存字段权限主表
      _saveFieldRoleList () {
        saveFieldRoleList(this.activeName, this.selectedTable, JSON.stringify(this.tableDetail.Teams)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this._getFieldRoleList(this.selectedTable)
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
      // 获取字段权限明细表对应权限
      _getDetailFieldRoleList () {
        this.loading = true
        getDetailFieldRoleList(this.activeName, this.selectedTable).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableDetail = res.data.Data
            this.tableDetail.Nodes.forEach(i => {
              this.$set(i, 'value', 0)
            })
            setTimeout(() => {
              this.loading = false
            }, 1000)
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
      // 保存字段权限明细表
      _saveDetailFieldRoleList () {
        saveDetailFieldRoleList(this.activeName, this.selectedTable, JSON.stringify(this.tableDetail.Teams)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this._getDetailFieldRoleList()
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
        this.ruleId = this.activeName
        this._getCompanyTableList()
      },
      // 点击主表/明细表/附件tab切换
      handleSwitchAuth (auth) {
        if (auth === 'main') {
          this.tableAuth = 'main'
          this._getCompanyTableList()
        }
        if (auth === 'detail') {
          this.tableAuth = 'detail'
          this._getDetailTableList()
        }
      },
      // 保存
      handleFieldAuthSave () {
        this.loading = true
        if (this.tableAuth === 'main') {
          this._saveFieldRoleList()
        }
        if (this.tableAuth === 'detail') {
          this._saveDetailFieldRoleList()
        }
      },
      // 统一修改所有字段值
      handleChangeAllMainFieldValue (value, index) {
        this.tableDetail.Teams.forEach(i => {
          i.NodeFieldRoles[index].FieldRoleInfos.forEach(item => {
            item.Role = value
          })
        })
      },
      // 统一修改分组字段值
      handleChangeAllTeamFieldValue (team, value, index) {
        team.NodeFieldRoles[index].FieldRoleInfos.forEach(item => {
          item.Role = value
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
      .table-content
        .nodes-container
          display flex
          padding 0 10px
          .placeholder-box
            flex 0 0 130px
            border-bottom 1px solid #cccccc
            border-right 1px solid #cccccc
          .node-list
            display flex
            .node-item
              display: inline-block;
              padding: 0 10px 5px 10px;
              width: 104px;
              text-align: center;
              border-bottom 1px solid #cccccc
              .name
                display block
                no-wrap()
        .teams-container
          padding 0 10px
          .team-item
            display flex
            .left-container
              flex 0 0 130px
              border-bottom 1px solid #cccccc
              border-right 1px solid #cccccc
              .teamName
                display block
                padding-left 10px
                height 70px
                line-height 70px
                font-size 16px
              .fields
                display flex
                flex-direction column
                .name
                  display: inline-block;
                  padding: 5px 10px 5px 10px;
                  height 28px
                  line-height 28px
                  width: 104px;
                  text-align: center;
                  no-wrap()
            .right-container
              border-bottom 1px solid #cccccc
              .placeholder-box
                padding-top 10px
                height 60px
                display flex
                .node-item
                  display: inline-block;
                  padding: 0 10px 5px 10px;
                  width: 104px;
                  text-align: center;
                  .name
                    display block
                    no-wrap()
              .content-box
                display flex
                .node-list
                  display flex
                  flex-direction: column;
                  flex 1
                  .node-item
                    display: inline-block;
                    padding: 5px 10px 5px 10px;
                    width: 104px;
                    text-align: center;
                    .name
                      display block
</style>
