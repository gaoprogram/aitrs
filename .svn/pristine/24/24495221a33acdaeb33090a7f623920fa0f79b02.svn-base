<!--
  User: xxxxxxx
  Date: 2018/9/13
  功能：字段控制
-->

<template>
  <div class="field_auth-container">
    <div v-loading="loading">
      <div class="filter-container">
        <el-cascader
          :options="tableList"
          change-on-select
          @change="handleChangeTable"
          :show-all-levels="false"
          :props="{
            value: 'TableCode',
            label: 'TableName',
            children: 'DetailTables'
          }"
        ></el-cascader>
      </div>
      <div class="table-container" v-if="tableDetail.Nodes && tableDetail.Nodes.length">
        <div class="table-content">
          <div class="nodes-container">
            <div class="placeholder-box"></div>
            <div style="width: 670px">
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
              <div style="width: 670px">
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
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getMainAndDetailTables,
    getFieldRoleList,
    saveFieldRoleList
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { flowAutoLogin, flowBaseFn, flowNodeSet } from '@/utils/mixin'

  export default {
    mixins: [flowBaseFn, flowAutoLogin, flowNodeSet],
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
      this._getMainAndDetailTables()
    },
    methods: {
      // 获取字段权限主表列表
      _getMainAndDetailTables () {
        this.loading = true
        getMainAndDetailTables(this.flowId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.tableList = res.data.Data.MainTables
          } else {
            this.$message({
              message: '请求错误，请刷新重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '请求错误，请刷新重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 获取字段权限主表对应的详情
      _getFieldRoleList () {
        this.loading = true
        getFieldRoleList(this.selectedTable, this.flowId).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableDetail = res.data.Data
            this.tableDetail.Nodes.forEach(i => {
              this.$set(i, 'value', 0)
            })
            setTimeout(() => {
              this.loading = false
            }, 1000)
          } else {
            this.tableDetail = {}
            this.$message({
              message: res.data.Error,
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            message: '获取失败，请刷新重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 保存字段权限主表
      _saveFieldRoleList () {
        saveFieldRoleList(this.flowId, this.selectedTable, JSON.stringify(this.tableDetail.Teams)).then(res => {
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
      // 切换表单
      handleChangeTable (val) {
        if (val.length === 1) {
          this.selectedTable = val[0]
        }
        if (val.length === 2) {
          this.selectedTable = val[1]
        }
        this._getFieldRoleList()
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
            border-bottom: 1px solid #ccc;
            .node-item
              display: inline-block;
              padding: 0 10px 5px 10px;
              width: 104px;
              text-align: center;
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
                  .node-item
                    display: inline-block;
                    padding: 5px 10px 5px 10px;
                    width: 104px;
                    text-align: center;
                    .name
                      display block
</style>
