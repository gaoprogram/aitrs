<!--
  User: gaol
  Date: 2019/6/12
  功能：审批流-发起
-->

<template>
  <div class="launch-container mg-30">
    <!---搜索框---start--->
    <div class="search-container">
      关键词：
      <el-input v-model="keyWord" placeholder="请输入关键词" @keyup.enter.native="search()" clearable @clear="search()"></el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
    </div>
    <!--搜索框---end-->

    <!---collapse 面板----start-->
    <div class="type-container">
      <template v-for="(flow, index) in Flows">
        <el-collapse class="coll-item" v-if="flow.Flows && flow.Flows.length">
          <el-collapse-item :title="flow.Name" :name="index">
            <div class="name" v-for="item in flow.Flows" :key="item.No" @click="handleStart(item.No)">{{item.Name}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </div>
    <!---collapse 面板----start-->

    <!---流程的发起 详情弹框---start--->
    <el-dialog
      :title="flowObj.FlowName"
      :visible="isStart"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      fullscreen
      custom-class="launch_dialog"
      v-if="isStart"
    >
      <el-card class="box-card" v-loading="loading" style="min-height: 500px">
        <!-- currentMainTableCode: {{mainTables}} -->
        <div style="height: 700px">
          <el-scrollbar style="height: 100%" :native="true">
            <!---主表区域----start-->
            <div class="main-table-field-container" v-if="currentMainTableCode">
              <!----主表名称tab区域---start---->
              <el-tabs v-model="currentMainTableCode" type="card" @tab-click="handleClickMainTableTab">
                <el-tab-pane
                  v-for="(item, index) in mainTables"
                  :key="item.TableCode"
                  :label="item.TableName"
                  :name="item.TableCode"
                >
                </el-tab-pane>
              </el-tabs>
              <!----主表名称tab区域---end---->

              <!----主表表单字段显示区--start--->
              <div class="table-item">
                <el-form :model="currentMainTableObj" ref="launchForm" label-width="150px"
                         class="launch_form">
                  <component
                    v-for="(obj, index) in currentMainTableObj.Fields"
                    :key="obj.FieldCode"
                    :is="currentRuleComponent(obj.ControlType)"
                    :prop="'Fields.' + index + '.FieldValue'"
                    :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
                    :obj="obj"
                    :currentFields="currentMainTableObj.Fields"
                    :workId="flowObj.WorkId"
                    :nodeId="flowObj.FK_Node"
                    :attachmentRole="functionRole"
                    @changeEmp="changeOrgMainCmp('launchForm', $event)"
                  ></component>
                </el-form>
                
                <template v-for="team in currentMainTableObj.Teams">
                  <div style="border-bottom: 1px solid #dedede; padding-bottom: 10px;margin-bottom: 20px">
                    <span class="team-title" style="padding-left: 20px; font-size: 16px">{{team.TeamName}}</span>
                    <el-form :model="team" :ref="`team${team.TeamCode}`" label-width="150px"
                             class="launch_form">
                      <component
                        v-for="(obj, index) in team.Fields"
                        :key="obj.FieldCode"
                        :is="currentRuleComponent(obj.ControlType)"
                        :prop="'Fields.' + index + '.FieldValue'"
                        :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
                        :obj="obj"
                        :currentFields="currentMainTableObj.Fields"
                        :workId="flowObj.WorkId"
                        :nodeId="flowObj.FK_Node"
                        :attachmentRole="functionRole"
                        @changeEmp="changeTeamOrgMainCmp(`team${team.TeamCode}`, $event)"
                      ></component>
                    </el-form>
                  </div>
                </template>
              </div>
              <!----主表表单字段显示区--end--->
            </div>
            <!---主表区域----end-->

            <!---明细表区域-----start--->
            <div class="detail-table-field-container" v-if="currentDetailTableCode">
              <!--明细表的tab 显示区域--start-->
              <el-tabs v-model="currentDetailTableCode" type="card" @tab-click="handleClickDetailTableTab">
                <el-tab-pane
                  v-for="item in detailTables"
                  :key="item.DetailTableCode"
                  :label="item.Name"
                  :name="item.DetailTableCode"
                >
                </el-tab-pane>
              </el-tabs>
              <!--明细表的tab 显示区域--end-->

              <!----明细表的table表格区域----start--->
              <template v-for="item in detailTables">
                <el-form :model="item" :ref="`detailForm${item.DetailTableCode}`" label-width="0"
                         class="detail-form" v-show="currentDetailTableCode === item.DetailTableCode">
                  <div style="width: 100%">
                    <el-scrollbar style="width: 100%" :native="false" :noresize="false">
                      <div class="content-title">
                        <table width="100%">
                          <tr>
                            <th>
                              <div>选择</div>
                            </th>
                            <th v-for="(field, index) in item.Fields" :key="index">
                              <div>{{field.FieldName}}</div>
                            </th>
                          </tr>
                          <tbody>
                            <tr v-for="(value, index) in item.Values" :key="index">
                              <td style="min-width: 50px;text-align: center">
                                <div>
                                  <el-button type="text" @click="handleDelDetail(index)">删除</el-button>
                                </div>
                              </td>
                              <td v-for="(field, i) in value" :key="i">
                                <div>
                                  <component
                                    :is="currentRuleComponent(field.ControlType === '13' ? '6' : field.ControlType)"
                                    :prop="'Fields.' + i + '.FieldValue'"
                                    :orderProp="'Fields.' + i + '.FieldValue.parentIds'"
                                    :obj="field"
                                    :currentFields="currentMainTableObj.Fields"
                                    :workId="flowObj.WorkId"
                                    :nodeId="flowObj.FK_Node"
                                    :isTitle="false"
                                    :attachmentRole="functionRole"
                                    @changeEmp="changeTeamOrgDetailCmp(`detailForm${item.DetailTableCode}`, $event)"
                                  ></component>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </el-scrollbar>
                  </div>
                </el-form>
              </template>
              <el-button
                v-if="currentDetailTableObj.Fields"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleClickAddDetail"
                style="margin-top: 10px">
              </el-button>
              <!----明细表的table表格区域----end--->
            </div>
            <!---明细表区域------end--->
          </el-scrollbar>
        </div>
      </el-card>

      <!---底部保存、关闭、存草稿区域----start--->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isStart = false">关闭</el-button>
        <el-tooltip class="item" effect="dark" content="暂存为草稿" placement="top">
          <el-button @click="handleSaveStart('launchForm', 'save')" type="info">存草稿</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="提交并且发起" placement="top">
          <el-button @click="handleSaveStart('launchForm', 'send')" type="primary">提交</el-button>
        </el-tooltip>
      </div>
      <!---底部保存、关闭、存草稿区域----end--->

    </el-dialog>
    <!---流程的发起 详情弹框---end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, REQ_ERR } from '@/api/config'
  import { workFlowControlRuleMixin, flowAutoLogin } from '@/utils/mixin'
  import {
    startList,
    start,
    saveMainValue,
    saveDetailValue,
    saveWork,
    send,
    getForm
  } from '@/api/approve'

  export default {
    mixins: [flowAutoLogin, workFlowControlRuleMixin],
    data () {
      return {
        keyWord: '',
        Flows: [],
        isStart: false,   // 控制 发起的 流程表单详情的显示/隐藏
        workId: '',
        flowObj: {},
        currentMainTableObj: {},
        currentMainTableCode: '',
        currentDetailTableObj: {},
        currentDetailTableCode: '',
        functionRole: {},
        mainTables: [],
        detailTables: [],
        loading: true,
        launchActiveNames: 0
      }
    },
    created () {
      this._startList()
    },
    mounted () {
    },
    computed: {},
    methods: {
      // 获取发起流程字段列表
      _startList () {
        this.$store.dispatch('setLoadingState', true)
        startList(this.keyWord).then(res => {
          this.$store.dispatch('setLoadingState', false)
          if (res.data.State === REQ_OK) {
            this.Flows = res.data.Data
            this.$set(this.Flows, 'selectValue', '')
          } else {
            this.$message({
              type: 'error',
              message: '发起流程获取失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
          this.$message({
            type: 'error',
            message: '发起流程获取失败，请刷新重试！'
          })
        })
      },
      // 发起初始页面获取workId
      _start (no) {
        return start(no).then(res => {
          if (res.data.State === REQ_OK) {
            return res.data.Data
          } else {
            return false
          }
        }).catch(() => {
          return false
        })
      },
      // 保存主表
      _saveMainValue (obj) {
        return saveMainValue(this.no, this.no + '001', this.workId, obj)
      },
      // 保存明细表
      _saveDetailValue (obj) {
        return saveDetailValue(this.no, this.no + '001', this.workId, obj)
      },
      // 保存实例存为草稿
      _saveWork () {
        return saveWork(this.no, this.no + '001', this.workId)
      },
      // 提交发起
      _send () {
        return send(this.no, this.workId, this.no + '001')
      },
      // 搜索
      search () {
        this._startList()
      },
      // 点击发起
      async handleStart (no) {
        if (!no) {
          this.$message({
            type: 'warning',
            message: '未选择任何流程'
          })
          return
        }
        this.no = no
        // 获取流程编号
        let s = await this._start(no)
        this.workId = s
        if (s) {
          this.isStart = true
          this.loading = true
          getForm(this.no, s, no + '001', this.versionId).then(res => {
            this.loading = false
            if (res.data.State === REQ_OK) {
              this.flowObj = res.data.Data.Flow
              this.mainTables = res.data.Data.MainTableInfos
              this.functionRole = res.data.Data.FunctionRole
              if (this.mainTables.length) {
                this.currentMainTableObj = res.data.Data.MainTableInfos[0]
                this.currentMainTableCode = res.data.Data.MainTableInfos[0].TableCode
                this.detailTables = res.data.Data.MainTableInfos[0].DetailTableInfos
                if (this.detailTables.length) {
                  this.currentDetailTableObj = res.data.Data.MainTableInfos[0].DetailTableInfos[0]
                  this.currentDetailTableCode = res.data.Data.MainTableInfos[0].DetailTableInfos[0].DetailTableCode
                } else {
                  this.currentDetailTableObj = {}
                  this.currentDetailTableCode = ''
                }
              } else {
                this.currentMainTableObj = {}
                this.currentMainTableCode = ''
                this.detailTables = []
                this.currentDetailTableObj = {}
                this.currentDetailTableCode = ''
              }
            } else {
              this.$message.error(`数据获取失败，${res.data.Error}`)
            }
          }).catch(() => {
            this.loading = false
            this.$message({
              type: 'error',
              message: '数据获取失败'
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '发起失败，请重试！'
          })
        }
      },
      // 发起弹窗点击主表tab切换
      handleClickMainTableTab (tab, event) {
        this.currentMainTableObj = this.mainTables.find(item => {
          return item.TableCode === tab.name
        })
        this.detailTables = this.currentMainTableObj.DetailTableInfos
        if (this.detailTables.length) {
          this.currentDetailTableObj = this.currentMainTableObj.DetailTableInfos[0]
          this.currentDetailTableCode = this.currentMainTableObj.DetailTableInfos[0].DetailTableCode
        } else {
          this.currentDetailTableObj = {}
          this.currentDetailTableCode = ''
        }
      },
      // 发起弹窗点击明细表tab切换
      handleClickDetailTableTab (tab, event) {
        this.currentDetailTableObj = this.detailTables.find(item => {
          return item.DetailTableCode === tab.name
        })
        this.currentDetailTableCode = this.currentDetailTableObj.DetailTableCode
      },
      // 点击增加明细表行数据
      handleClickAddDetail () {
        this.currentDetailTableObj.Values.push(JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields])))
      },
      // 删除明细表单行
      handleDelDetail (index) {
        this.$confirm('确认删除此行配置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.currentDetailTableObj.Values.splice(index, 1)
        }).catch(() => {
        })
      },
      // 发起保存
      handleSaveStart (formName, type) {
        // console.log(this.functionRole.DetailTableHaveToAdd, this.currentMainTableObj.DetailTableInfos, !this.currentMainTableObj.DetailTableInfos)
        // 判断明细表是否必须添加行
        if (this.functionRole.DetailTableHaveToAdd && this.currentDetailTableObj.Values && !this.currentDetailTableObj.Values.length) {
          this.$message.error('明细表必须新增行')
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let result = []
            if (this.currentMainTableObj.DetailTableInfos && this.currentMainTableObj.DetailTableInfos.length) {
              this.currentMainTableObj.DetailTableInfos.forEach(item => {
                result.push(this.checkFormArray(`detailForm${item.DetailTableCode}`))
              })
            }
            if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
              this.currentMainTableObj.Teams.forEach(item => {
                result.push(this.checkFormArray(`team${item.TeamCode}`))
              })
            }
            Promise.all(result).then(() => {
              let mainArr = []
              let detailArr = []
              if (this.mainTables.length) {
                this.mainTables.forEach((item) => {
                  let tableObj = {
                    TableCode: item.TableCode,
                    Fields: [],
                    Teams: []
                  }
                  item.Fields.forEach(field => {
                    tableObj.Fields.push({
                      FieldCode: field.FieldCode,
                      FieldName: field.FieldName,
                      FieldValue: field.FieldValue,
                      RowNo: field.RowNo
                    })
                  })
                  item.Teams.forEach(field => {
                    tableObj.Teams.push({
                      TeamCode: field.TeamCode,
                      TeamName: field.TeamName,
                      Fields: field.Fields
                    })
                  })
                  mainArr.push(tableObj)
                  item.DetailTableInfos.forEach(detail => {
                    let detailObj = {
                      TableCode: detail.DetailTableCode,
                      Fields: [],
                      MainTableCode: item.TableCode
                    }
                    detail.Values.forEach(val => {
                      let newField = []
                      val.forEach(field => {
                        newField.push({
                          FieldCode: field.FieldCode,
                          FieldName: field.FieldName,
                          FieldValue: field.FieldValue,
                          Unit: field.Unit
                        })
                      })
                      detailObj.Fields.push(newField)
                    })
                    detailArr.push(detailObj)
                  })
                })
              }
              // 保存主表，回调明细表
              this.loading = true
              if (type === 'save') {
                Promise.all([
                  this._saveMainValue(JSON.stringify(mainArr)),
                  this._saveDetailValue(JSON.stringify(detailArr)),
                  this._saveWork()
                ]).then(([mainResp, detailResp, workResp]) => {
                  this.loading = false
                  if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK && workResp.data.State === REQ_OK) {
                    this.$message.success('保存成功')
                  } else {
                    if (mainResp.data.State === REQ_ERR) {
                      this.$message.error(`保存失败，${mainResp.data.Error}`)
                    }
                    if (detailResp.data.State === REQ_ERR) {
                      this.$message.error(`保存失败，${detailResp.data.Error}`)
                    }
                    if (workResp.data.State === REQ_ERR) {
                      this.$message.error(`保存失败，${workResp.data.Error}`)
                    }
                  }
                }).catch(() => {
                  this.loading = false
                  this.$message.error('保存失败，请重试')
                })
              }
              if (type === 'send') {
                Promise.all([
                  this._saveMainValue(JSON.stringify(mainArr)),
                  this._saveDetailValue(JSON.stringify(detailArr)),
                  this._send()
                ]).then(([mainResp, detailResp, workResp]) => {
                  console.log(mainResp, detailResp, workResp)
                  this.loading = false
                  if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK && workResp.data.State === REQ_OK) {
                    this.$message.success('提交成功')
                    this.isStart = false
                  } else {
                    if (mainResp.data.State === REQ_ERR) {
                      return this.$message.error(`提交失败,${mainResp.data.Error}`)
                    }
                    if (detailResp.data.State === REQ_ERR) {
                      return this.$message.error(`提交失败,${detailResp.data.Error}`)
                    }
                    if (workResp.data.State === REQ_ERR) {
                      this.$message.error(`提交失败,${workResp.data.Error}`)
                    }
                  }
                }).catch(() => {
                  this.loading = false
                  this.$message.error('提交失败，请重试')
                })
              }
            }).catch(() => {
              this.$message.error('验证失败')
            })
          } else {
            this.$message.error('验证失败')
          }
        })
      },
      // 每次改变人员组织之后重新手动验证一次，不然会提示错误
      changeOrgMainCmp (param, prop) {
        this.$refs[param].validateField(prop)
      },
      // 每次改变人员组织之后重新手动验证一次，不然会提示错误
      changeTeamOrgMainCmp (param, prop) {
        this.$refs[param][0].validateField(prop)
      },
      changeTeamOrgDetailCmp (param, prop) {
        this.$refs[param][0].validateField(prop)
      },
      // 封装验证单一表单的函数
      checkForm (formName) {
        return new Promise((resolve, reject) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      },
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      },
      commonValue (obj) {
      }
    },
    watch: {
      'mainTables': {
        handler (newValue, oldValue) {
          // console.log(newValue, oldValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  @import "~common/css/variable.styl"
  .launch-container
    .search-container
      margin-bottom 10px
      .el-input
        display inline-block
        width 250px;
    .type-container
      &::after
        clear-float()
      width 1000px
      .coll-item /deep/
        display inline-block
        width 250px
        margin 5px 5px
        vertical-align top
        border-top 0
        border-bottom 0
        .el-collapse-item__header
          padding-left: 10px;
          color $color
          background-color: #ecf5ff;
          border-top 1px solid #b3d8ff
          border-bottom 1px solid #b3d8ff
        .el-collapse-item__content
          padding-top 10px
          padding-left 10px
          .name
            &:hover
              color $color
              cursor pointer
    .launch_dialog
      .main-table-field-container
        .table-item
          .fieldItem
            margin-bottom 10px
      .detail-table-field-container /deep/
        .el-scrollbar__wrap
          margin-bottom: 0 !important
          .el-form-item
            margin-bottom: 0 !important
    >>>.el-dialog__footer   
        padding 0 !important    


  table {
    border: 1px solid #dfe4ed;
  }

  table tr th {
    padding 10px 0
    border: 1px solid #dfe4ed;
    border-top 2px solid #3b8be3
  }

  table tr td {
    min-width 300px
    padding 20px
    border: 1px solid #dfe4ed;
  }

  table {
    border-collapse: collapse
  }

</style>
