<!--
  User: gaol
  Date: 2019/5/23
  功能：节点设置——流转——出口条件
-->

<template>
  <div class="node-attr-container" v-loading="loading">
    <div>
      <el-select
        v-model="nodeObj.NodeId"
        placeholder="切换节点"
        size="small"
        @change="_getNodeAttr()"
        style="margin-bottom: 10px"
      >
        <el-option
          v-for="item in nodeList"
          :key="item.NodeId"
          :label="item.Name"
          :value="item.NodeId">
        </el-option>
      </el-select>
      <div style="margin-bottom: 10px">
        当前节点：
        <el-select v-model="branchObj.MainNodeId" placeholder="请选择" @change="_getToNodeSet">
          <el-option
            v-for="item in nodeList"
            :key="item.NodeId"
            :label="item.Name"
            :value="item.NodeId">
          </el-option>
        </el-select>
        流出节点：
        <el-select v-model="branchObj.ToNodeId" placeholder="请选择" @change="_getBranchCondition">
          <el-option
            v-for="item in rightData"
            :key="item.ToNodeId"
            :label="item.Name"
            :value="item.ToNodeId">
          </el-option>
        </el-select>
      </div>
      <div style="margin-bottom: 10px">
        <span style="display: inline-block;width: 70px">条件类型：</span>
        <el-select class="filter-item"
                   v-model="branchObj.Condition.ConnDataFrom"
                   style="width:420px;"
                   @change="changeCondition"
        >
          <el-option v-for="item in branchList" :key="item.Code" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>
      </div>

      <div class="item" v-if="showCompanyStructureCmp">
        <company-structure-cmp
          :title="companyStructureCmpTitle"
          :tabType="tabType"
          :selectedList="branchObj.Condition.Value"
          @select="selectStructure($event, branchObj.Condition.ConnDataFrom)"
          @upData="updata"
        ></company-structure-cmp>
      </div>

      <!-- branchObj.Condition{{branchObj.Condition}} -->
      <div style="margin-left: 75px;margin-bottom: 10px" v-if="branchObj.Condition.ConnDataFrom === '1' || branchObj.Condition.ConnDataFrom === '2'">
        <div class="item" v-if="branchObj.Condition.SpecOperWay === '1'">
          <span style="display: inline-block;width: 70px">选择节点：</span>
          <el-select class="filter-item"
                     v-model="branchObj.Condition.NodeValue"
                     style="width:200px;"
                     clearable
                     multiple
          >
            <el-option v-for="item in fieldList" :key="item.NodeId" :label="item.Name" :value="item.NodeId">
            </el-option>
          </el-select>
        </div>

        <div style="margin-bottom: 10px" v-if="branchObj.Condition.SpecOperWay === '2'">
          <span style="display: inline-block;width: 70px">表单字段：</span>
          <el-select class="filter-item"
                     v-model="branchObj.Condition.FieldValue"
                     style="width:200px;"
                     clearable
          >
            <el-option v-for="item in formList" :key="item.FieldCode" :label="item.FieldName" :value="item.FieldCode">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="formType-container" v-if="branchObj.Condition.ConnDataFrom === '0'">
        <div style="margin-bottom: 10px;">表单字段（最多两个条件）：</div>
        <div>
          <div v-for="(fieldCondition, index) in branchObj.Condition.FieldConditions" style="margin-bottom: 10px">
            <el-select class="filter-item"
                       v-model="fieldCondition.SaveType"
                       style="width:100px;"
                       v-if="index !== 0"
            >
              <el-option v-for="item in SaveType" :key="item.code" :label="item.value" :value="item.code">
              </el-option>
            </el-select>

            <div style="display: inline-block;width: 100px;height: 40px;" v-if="index === 0"></div>

            <el-select class="filter-item"
                       v-model="fieldCondition.Field"
                       style="width:180px;"
            >
              <el-option v-for="item in formList" :key="item.FieldCode" :label="item.FieldName" :value="item.FieldCode">
              </el-option>
            </el-select>

            <el-select class="filter-item"
                       v-model="fieldCondition.Oper"
                       style="width:110px;"
            >
              <el-option v-for="item in currentOper(fieldCondition.Field)" :key="item.code" :label="item.value" :value="item.code">
              </el-option>
            </el-select>

            <el-input v-model="fieldCondition.FieldValue.Id"
                      placeholder="请输入值"
                      style="width:180px;"
                      type="number"
            ></el-input>

            <el-tooltip class="item" effect="dark" content="删除此条件" placement="bottom" v-if="index !== 0">
              <i class="el-icon-circle-close-outline" @click="handleDelFieldCondition"></i>
            </el-tooltip>
          </div>
          <el-tooltip class="item"
                      effect="dark"
                      content="新增条件"
                      placement="bottom"
          >
            <el-button type="primary"
                       size="small"
                       @click.native.prevent="handleAddFieldCondition"
                       style="margin-top: 10px"
                       v-if="branchObj.Condition.FieldConditions.length < 2"
            >
              <i class="el-icon-plus"></i>
            </el-button>
          </el-tooltip>
        </div>
      </div>

      <!-- 处理人--- branchObj.Condition.ConnDataFrom: {{branchObj.Condition.ConnDataFrom}} -->
      <div style="margin-bottom: 10px" v-if="branchObj.Condition.ConnDataFrom !== '0'">
        <span style="display: inline-block;width: 70px">处理人：</span>
        <el-select class="filter-item"
                   v-model="branchObj.Condition.SpecOperWay"
                   style="width:420px;"
                   @change="changeHandlePerson"
        >
          <el-option v-for="item in handlePersonList" :key="item.Code" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>
      </div>

      <!-- renyuanShow:{{renyuanShow}} -->
      <div class="item" v-if="renyuanShow">
        <company-structure-cmp
          :title="renyuanTitle"
          :tabType="tabType"
          @select="selectStructure($event, 'renyuan')"
          :selectedList="branchObj.Condition.EmpValue"
          @upData="updata"
        ></company-structure-cmp>
      </div>
      <save-footer @save="handleSave" @cancel="handleClose" :isCancel="false"></save-footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getToNodeSet,
    getBranchCondition,
    saveBranchCondition,
    connDataFrom,
    specOperway,
    getFieldList,
    getNodeList
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  import { flowNodeSet } from '@/utils/mixin'
  export default {
    mixins: [flowNodeSet],
    data () {
      return {
        loading: false,
        leftData: [],
        rightData: [],
        mainNodeId: '',
        ruleId: '',
        toNodeId: '',
        branchObj: {
          MainNodeId: '',
          ToNodeId: '',
          NodeToNodeId: '',
          Condition: {
            ConnDataFrom: '',
            SpecOperWay: '',
            Value: [],
            SpecOperPara: [],
            NodeValue: '',
            FieldValue: '',
            EmpValue: [],
            FieldConditions: [
              {
                SaveType: 'OR',
                Field: '',
                Oper: '',
                FieldValue: {
                  Id: ''
                }
              },
              {
                SaveType: '',
                Field: '',
                Oper: '',
                FieldValue: {
                  Id: ''
                }
              }
            ]
          }
        },
        branchList: [],
        handlePersonList: [],
        formList: [],
        fieldList: [],
        SaveType: [
          {
            value: '且',
            code: 'AND'
          },
          {
            value: '或者',
            code: 'OR'
          }
        ],
        OperText: [
          {
            value: '包含',
            code: '6'
          },
          {
            value: '等于',
            code: '0'
          },
          {
            value: '不等于',
            code: '5'
          }
        ],
        OperNum: [
          {
            value: '等于',
            code: '0'
          },
          {
            value: '大于',
            code: '1'
          },
          {
            value: '小于',
            code: '3'
          },
          {
            value: '大于等于',
            code: '2'
          },
          {
            value: '小于等于',
            code: '4'
          },
          {
            value: '不等于',
            code: '5'
          }
        ],
        OperDic: [
          {
            value: '等于',
            code: '0'
          },
          {
            value: '包含',
            code: '6'
          }
        ],
        showCompanyStructureCmp: false,
        companyStructureCmpTitle: '组织选择',
        renyuanTitle: '人员选择',
        renyuanShow: false,
        tabType: []
      }
    },
    created () {
      this._getToNodeSet()
      this._connDataFrom()
      this._specOperway()
      this._formType()
      this._getNodeList()
    },
    methods: {
      // 选择更新
      updata (val) {
        switch (this.tabType.toString()) {
          case 'gangwei':
            this.branchObj.Condition.Value = []
            if (val.length) {
              val.forEach(item => {
                this.branchObj.Condition.Value.push({
                  Id: item.PositionId,
                  Name: item.PositionName
                })
              })
            }
            break
          case 'zuzhi':
            this.branchObj.Condition.Value = []
            if (val.length) {
              val.forEach(item => {
                this.branchObj.Condition.Value.push({
                  Id: item.NodeId,
                  Name: item.Name
                })
              })
            }
            break
          case 'renyuan':
            this.branchObj.Condition.EmpValue = []
            if (val.length) {
              val.forEach(item => {
                this.branchObj.Condition.EmpValue.push({
                  Id: item.EmpId,
                  Name: item.EmpName
                })
              })
            }
            break
        }
      },
      // 出口条件
      _getToNodeSet () {
        this.loading = true
        getToNodeSet(this.nodeObj.NodeId, this.$route.query.flowId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.rightData = res.data.Data.ToNodes
            this.leftData = res.data.Data.SpareNodes
          }
        }).catch(() => {
          this.loading = false
        })
      },
      // 获取分支条件
      _getBranchCondition () {
        this.loading = true
        getBranchCondition(this.branchObj.MainNodeId, this.branchObj.ToNodeId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.branchObj = res.data.Data
            this.changeCondition()
            this.changeHandlePerson()
          } else {
            this.$message.error(`条件获取失败，${res.data.Error}`)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('条件获取失败err，请刷新后重试')
        })
      },
      // 条件类型
      _connDataFrom () {
        connDataFrom().then(res => {
          if (res.data.State === REQ_OK) {
            this.branchList = res.data.Data
            // this._getBranchCondition()
          }
        })
      },
      // 处理人
      _specOperway () {
        specOperway().then(res => {
          if (res.data.State === REQ_OK) {
            this.handlePersonList = res.data.Data
          }
        })
      },
      // 表单字段
      _formType () {
        getFieldList(this.ruleId,this.nodeObj.NodeId).then(res => {
          if (res.data.State === REQ_OK) {
            this.formList = res.data.Data
          }
        })
      },
      // 节点列表
      _getNodeList () {
        getNodeList(this.ruleId).then(res => {
          if (res.data.State === REQ_OK) {
            this.fieldList = res.data.Data
          }
        })
      },
      // 改变条件类型
      changeCondition () {
        if (this.branchObj.Condition.ConnDataFrom === '1') {
          this.tabType = ['gangwei']
          this.companyStructureCmpTitle = '岗位选择'
          this.showCompanyStructureCmp = true
        } else if (this.branchObj.Condition.ConnDataFrom === '2') {
          this.tabType = ['zuzhi']
          this.companyStructureCmpTitle = '组织选择'
          this.showCompanyStructureCmp = true
        } else {
          this.companyStructureCmpTitle = '组织选择'
          this.showCompanyStructureCmp = false
        }
      },
      // 切换处理人
      changeHandlePerson () {
        if (this.branchObj.Condition.SpecOperWay === '3') {
          this.tabType = ['renyuan']
          this.renyuanShow = true
        } else if (this.branchObj.Condition.SpecOperWay !== '3') {
          this.renyuanShow = false
        }
      },
      // 点击选择人员、组织、岗位
      selectStructure ($event, parm) {
        if (parm === 'renyuan') {
          this.tabType = ['renyuan']
          this.renyuanShow = true
        } else {
          this.changeCondition()
        }
      },
      // 删除表单字段条件
      handleDelFieldCondition () {
        this.branchObj.Condition.FieldConditions.splice(1, 1)
      },
      // 增加表单字段条件
      handleAddFieldCondition () {
        if (this.branchObj.Condition.FieldConditions.length) {
          this.branchObj.Condition.FieldConditions.push(
            {
              SaveType: 'OR',
              Field: '',
              Oper: '0',
              FieldValue: {
                Id: ''
              }
            }
          )
        } else {
          this.branchObj.Condition.FieldConditions.push(
            {
              SaveType: '',
              Field: '',
              Oper: '0',
              FieldValue: {
                Id: ''
              }
            }
          )
        }
      },
      // 根据表单字段来改变操作符
      currentOper (code) {
        if (code && this.formList.length) {
          let res = this.formList.filter(item => {
            return item.FieldCode === code
          })
          if (res.length) {
            if (res[0].ControlType === '1') {
              return this.OperText
            } else if (res[0].ControlType === '3' || res[0].ControlType === '4') {
              return this.OperNum
            } else if (res[0].ControlType === '5' || res[0].ControlType === '6' || res[0].ControlType === '12' || res[0].ControlType === '13') {
              return this.OperDic
            }
          }
        } else {
          return this.OperNum
        }
      },
      // 保存
      handleSave () {
        if (!this.branchObj.MainNodeId) return this.$message.info('未选择当前节点')
        if (!this.branchObj.ToNodeId) return this.$message.info('未选择流出节点')
        this.loading = true
        saveBranchCondition(this.branchObj.NodeToNodeId, JSON.stringify(this.branchObj.Condition)).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            setTimeout(() => {
              this._getBranchCondition()
            }, 1000)
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('保存失败，请重试')
        })
      },
      // 关闭
      handleClose () {
        this.$emit('colse')
      }
    },
    components: {
      SaveFooter,
      CompanyStructureCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
