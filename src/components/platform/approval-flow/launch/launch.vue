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
              <!-- currentMainTableObj：{{currentMainTableObj}} -->
              <div class="table-item">
                <!--系统默认组的表单控件----start--->
                <el-form :model="currentMainTableObj" :ref="`${currentMainTableObj.TableCode}launchForm`" label-width="150px"
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
                <!--系统默认组的表单控件----end--->
                <!-- currentMainTableObj.Teams：{{currentMainTableObj.Teams}} -->
                <template v-for="team in currentMainTableObj.Teams">
                  <div style="border-bottom: 1px solid #dedede; padding-bottom: 10px;margin-bottom: 20px">
                    <span class="team-title" style="padding-left: 20px; font-size: 16px">{{team.TeamName}}</span>
                    
                    <!--自定义分组的表单控件----start--->
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
                    <!--自定义分组的表单控件----end--->
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
                                  <!-- field.ControlTyp: {{field}} -->
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

      <!-- flowObj: {{flowObj}} -->
      <!-- currentMainTableObj.TableCode: {{currentMainTableObj.TableCode}} -->
      <!---底部保存、关闭、存草稿区域----start--->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isStart = false">关闭</el-button>
        <el-tooltip class="item" effect="dark" content="暂存为草稿" placement="top">
          <el-button @click="handleSaveStart(`${currentMainTableObj.TableCode}launchForm`, 'save')" type="info">存草稿</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="提交并且发起" placement="top">
          <el-button @click="handleSaveStart(`${currentMainTableObj.TableCode}launchForm`, 'send')" type="primary">提交</el-button>
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
        mainTables: [],    // getForm 接口获取的所有的 表（主表及对应明细表）的信息
        detailTables: [],
        loading: true,
        launchActiveNames: 0,

        latestTwoTableCode: [] // 存放最近的两次点击的组表code
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
        debugger
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
      // 进行表单必填项验证
      _checkFieldValidate (TableCode) {

      },
      // 切换 主表的 tabs 后需要对 上一个 tabs 中的表单进行 校验（因为 点击 保存并提交时 需要 对所有的表单中的必填项都进行校验通过后才能提交）
      _validate (formName_latestMainTableName) {
        // 定义一个方法用于找到 对应的上一个 表单对象
        const getLatestMainTable = (mainTableCode) => {
          return this.mainTables.filter(item => {
            return item.TableCode === mainTableCode
          })
        }
  
        let latestMainTableObj = getLatestMainTable(formName_latestMainTableName.slice(0, -10))
        // 先进行 主表的校验
        this.$refs[formName_latestMainTableName].validate((valid) => {
          debugger
          if (valid) {
            // 假如主表单校验pass 了 接下来 校验 此表单下面的 自定义主表 和 明细表的校验
            let result = []
            if (latestMainTableObj.DetailTableInfos && latestMainTableObj.DetailTableInfos.length) {
              latestMainTableObj.DetailTableInfos.forEach(item => {
                result.push(this.checkFormArray_latestMainTable(`detailForm${item.DetailTableCode}`, latestMainTableObj))
              })
            }
            if (latestMainTableObj.Teams && latestMainTableObj.Teams.length) {
              latestMainTableObj.Teams.forEach(item => {
                result.push(this.checkFormArray_latestMainTable(`team${item.TeamCode}`, latestMainTableObj))
              })
            }
            Promise.all(result).then(() => {
              // 将 上一次点击的 主表的 validateFlag 中的 validateFlag 属性 修改为 false
              // 通过 formName 去 this.mainTables 中查找
              this.mainTables.forEach(item => {
                if (item.TableCode === formName_latestMainTableName.slice(0, -10)) {
                  // 找到了
                  item.validateFlag = true
                }
              })
            })
          } else {
            // 将 上一次点击的 主表的 validateFlag 中的 validateFlag 属性 修改为 false
            // 通过 formName 去 this.mainTables 中查找
            this.mainTables.forEach(item => {
              if (item.TableCode === formName_latestMainTableName.slice(0, -10)) {
                // 找到了
                item.validateFlag = false
              }
            })
            // this.$message.error(formName_latestMainTableName + '表单验证失败')
          }
        })
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
              if (this.mainTables && this.mainTables.length) {
                // 给mainTables 中的　每个item 对象分别添加一个  validateFlag 的字段， 因为提交时候需要 保证 所有的主表 及其对应的明细表中必填项都验证通过了方能提交，否则不提交
                this.mainTables.forEach(item => {
                  this.$set(item, 'validateFlag', false)
                })
                // 将 latestTwoTableCode 中存放第一个主表code
                this.latestTwoTableCode.push(this.mainTables[0].TableCode)
              }

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
        // 每次切换主表后 将 将 最近两次的切换的 latestTwoTableCode 更新下数据
        debugger
        if (this.latestTwoTableCode[this.latestTwoTableCode.length - 1] !== tab.name) {
          // 点击的不是同一个tab
          this.latestTwoTableCode.push(tab.name)
        }
        if (this.latestTwoTableCode.length >= 3) {
          // 超过3个后 需要删掉一个
          this.latestTwoTableCode.splice(0, 1)
        }
  
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
  
        // 对上一个表单主动触发进行 必填项的验证
        let privMainTable = this.latestTwoTableCode[0]
        // 切换后切换前的表单主动触发 其 表单验证
        this._validate(privMainTable + 'launchForm')
        debugger
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
      // 发起保存提交
      handleSaveStart (formName, type) {
        console.log(this.$refs[formName])
        // this.$refs[formName].validateField(formName)
        // console.log(this.functionRole.DetailTableHaveToAdd, this.currentMainTableObj.DetailTableInfos, !this.currentMainTableObj.DetailTableInfos)
        debugger
        // 判断明细表是否必须添加行
        if (this.functionRole.DetailTableHaveToAdd && this.currentDetailTableObj.Values && !this.currentDetailTableObj.Values.length) {
          this.$message.error('明细表必须新增行')
          return
        }
        // 校验
        debugger
        // 假如 点击的 保存并提交 才需要 先进行校验
        // 先进行 默认主表的校验
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
            // 校验
            Promise.all(result).then(() => {
              debugger
              // 校验成功　一次就 将 this.currentMainTableObj 中的 validateFlag 字段修改为　　true
              this.currentMainTableObj['validateFlag'] = true

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
              // this.loading = true
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

              // 提交时，需要判断 所有的主表已经对应名下的明细表必填项表单都验证pass 之后才能提交
              if (type === 'send') {
                debugger
                let flag = false
                let messageStr = ''
                for (let i = 0, length = this.mainTables.length; i < length; i++) {
                  let item = this.mainTables[i]
                  if (!item.validateFlag) {
                    messageStr = `第${i + 1}个表单：${item.TableName} 未填写完整,请先填写完整后保存!!`
                    console.log(`第${i + 1}个表单：${item.TableName} 验证fail, error submit!!`)
                    break
                    return false
                  }
                  if (i === length - 1) {
                    flag = true
                  }
                }
                // debugger
                if (flag) {
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
                } else {
                  this.$message({
                    type: 'warning',
                    message: messageStr
                  })
                }
              }
            }).catch(() => {
              this.$message.error('验证失败')
            })
          } else {
            // 可以 通过 formName 找到对应的 表单名字
            let currentMainTable = this.mainTables.filter(item => {
              return item.TableCode === formName.slice(0, -10)
            })
            // console.log(currentMainTable)
            this.$message.warning(`【${currentMainTable[0].TableName}】表单未填写完整,请检查！`)
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
              resolve({
                name: formName,
                msg: `${this.currentMainTableObj.TableCode}中的：${formName} 验证pass`
              })
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
              resolve({
                name: formName,
                msg: `${this.currentMainTableObj.TableCode}中的：${formName} 验证pass`
              })
            } else {
              // 将 this.currentMainTableObj 中的  validateFlag 属性改为  false
              this.currentMainTableObj.validateFlag = false
              reject(new Error())
            }
          })
        })
      },

      // 封装验证数组表单的函数(仅供 切换主表 tabs 后对切换前的表单进行 验证)
      checkFormArray_latestMainTable (formName, latestMainTableObj) {
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve({
                name: formName,
                msg: `${latestMainTableObj.TableCode}中的：${formName} 验证pass`
              })
            } else {
            // 将 上一次点击的 主表的 validateFlag 中的 validateFlag 属性 修改为 false
              latestMainTableObj.validateFlag = false
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
