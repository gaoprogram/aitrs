<!--
  User: gaol
  Date: 2019/5/31
  功能：流程配置——流程设计——简洁设计——分支编辑弹框
-->

<template>
  <el-dialog
    title="编辑出口条件"
    width="800px"
    :visible="true"
    custom-class="dialog-item"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
  >
    <div v-loading="loading">
      <!---条件类型--start--->
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
      <!---条件类型--end--->

      <!-- branchObj.Condition.ConnDataFrom： {{branchObj.Condition.ConnDataFrom}} -->
      <!-----条件类型按岗位（1）、组织（2）、表单（0）后 出现的 对应的 组件--start--->
      <div class="item" v-if="showCompanyStructureCmp">
        <company-structure-cmp
          :title.sync="companyStructureCmpTitle"
          :tabType="tabType"
          :selectedList="branchObj.Condition.Value"
          @select="selectStructure($event, branchObj.Condition.ConnDataFrom)"
          @upData="updata"
        ></company-structure-cmp>
      </div>
      <!-----条件类型按岗位、组织、表单后 出现的 对应的 组件--start--->


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

      <!------1表示 条件类型按 处理人岗位     2 表示 条件类型 按 处理人岗位   0 表示条件类型 按表单条件-----start------>
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

        <!--<div class="item" v-if="branchObj.Condition.SpecOperWay === '3'">-->
          <!--<common-select-emp title="选择人员" :selectedEmpList="selectedEmpList" @sureEmp="childSureEmp"></common-select-emp>-->
        <!--</div>-->
      </div>
      <!------1表示 条件类型按 处理人岗位     2 表示 条件类型 按 处理人岗位   0 表示条件类型 按表单条件-----end------>


      <div class="item" v-if="branchObj.Condition.SpecOperWay === '3'">
        <company-structure-cmp
          :title="renyuanTitle"
          :tabType="tabType"
          @select="selectStructure($event, 'renyuan')"
          :selectedList="branchObj.Condition.EmpValue"
          @upData="updata"
        ></company-structure-cmp>
      </div>


      <!------0 表示 条件类型 按照 表单条件计算-----start----->
      <div class="formType-container" v-if="branchObj.Condition.ConnDataFrom === '0'">
        <div style="margin-bottom: 10px;">表单字段（最多两个条件）：</div>
        <div>
          <!-- branchObj.Condition.FieldConditions： {{branchObj.Condition.FieldConditions}} -->
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

            <!-- fieldCondition： {{fieldCondition}} -->
            <!-- formList： {{formList}} -->
            <!---表单的select框---start---->
            <!-- fieldCondition.fieldCodeAndControltype: {{fieldCondition.fieldCodeAndControltype}} -->
            <el-select class="filter-item"
                       v-model="fieldCondition.fieldCodeAndControltype"
                       style="width:180px;"
                       @change="changeFieldType($event,index,fieldCondition.fieldCodeAndControltype)"
            >
              <el-option v-for="item in formList" :key="item.FieldCode" :label="item.FieldName" :value="item.FieldCode+'/'+item.ControlType">
              </el-option>
            </el-select>
            <!---表单的select框---end---->

            <!---大于、小于、等于、等的 select框----start-->
            <el-select class="filter-item"
                       v-model="fieldCondition.Oper"
                       style="width:100px;"
                       
            >
              <!---非文本类型时---->
              <el-option v-show="fieldCondition.currentControlType === '3' ||
                                 fieldCondition.currentControlType === '4' ||
                                 fieldCondition.currentControlType === '5'  ||
                                 fieldCondition.currentControlType === '6'  ||
                                 fieldCondition.currentControlType === '12' ||
                                 fieldCondition.currentControlType === '13'" 
                        v-for="item in Oper" :key="item.code" :label="item.value" :value="item.code">
              </el-option>
              <!---文本类型时---->
              <el-option v-show="fieldCondition.currentControlType === '1'" 
                        v-for="item in Oper_text" :key="item.code" :label="item.value" :value="item.code">
              </el-option>              
            </el-select>
            <!----大于、小于、等于、等的 select框-----------end--->

            <!---表单输入框（文本或者数字等）---start-->
            <el-input v-model="fieldCondition.FieldValue.Id"
                      placeholder="请输入值"
                      style="width:180px;"
                      :type="fieldCondition.currentControlType !=='1'? 'number':''"
            ></el-input>
            <!---表单输入框（文本或者数字等）---start-->

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
      <!------0 表示 条件类型 按照 表单条件计算-----end----->

    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancelBranch()">取消</el-button>
      <el-button @click="handleSaveBranchCondition()" type="primary">保存</el-button>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  import {
    connDataFrom,
    specOperway,
    getBranchCondition,
    saveBranchCondition,
    getFieldList
  } from '@/api/approve'
  import { dialogFnMixin } from '@/utils/mixin'
  export default {
    mixins: [dialogFnMixin],
    props: {
      ruleId: {
        type: String,
        default: ''
      },
      mainNodeId: {
        type: [String, Number],
        default: ''
      },
      toNodeId: {
        type: [String, Number],
        default: ''
      }
    },
    data () {
      return {
        formList: [],  // 条件类型 选择按表单条件时，通过接口获取的 表单选项下拉框 list 集合
        branchList: [],
        handlePersonList: [],    // 处理人下拉选项list集合
        branchObj: {
          NodeToNodeCode: '',
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
        Oper: [
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
        Oper_text: [
          {
            value: '包含',
            code: '0'
          },
          {
            value: '等于',
            code: '1'
          },
          {
            value: '不等于',
            code: '2'
          }
        ],
        loading: true,
        showCompanyStructureCmp: false,
        companyStructureCmpTitle: '组织选择',
        renyuanTitle: '人员选择',
        renyuanShow: false,
        tabType: []
      }
    },
    created () {
    },
    mounted () {
      this._connDataFrom()
      this._specOperway()
      this._getFieldList()
    },
    watch: {
      // 'branchObj.Condition.FieldConditions' (newValue, oldValue) {
  
      // }
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
      // 条件类型
      _connDataFrom () {
        connDataFrom().then(res => {
          if (res.data.State === REQ_OK) {
            this.branchList = res.data.Data
            this._getBranchCondition()
          }
        })
      },
      // 获取 表单下拉框list 数据集合
      _getFieldList () {
        getFieldList(this.ruleId, this.mainNodeId).then((res) => {
          if (res && res.data.State === REQ_OK) {
            this.formList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '获取表单下拉选项数据失败err,请刷新后重试'
            })
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
      // 获取分支条件
      _getBranchCondition () {
        this.loading = true
        getBranchCondition(this.mainNodeId, this.toNodeId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            debugger
            this.branchObj = res.data.Data
            // 拿到 branchObj 后，处理 branchObj 的数据 将 branchObj.Condition.
            this.changeCondition()
            this.changeHandlePerson()
            // this.changeData(res.data.Data)
          } else {
            this.$message({
              message: '分支条件获取失败，请关闭重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '分支条件获取失败，请关闭重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      _getConditionType (str) {
        // switch(str){
        //   case '金额'
        // }
      },
      // 选择发起人
      handleSwitchFlow (param) {
        let arr = this.Delivery.filter(item => {
          return item.IsEnable
        })
        if (arr.length > 2) {
          this.$message({
            message: '最多选择两项！',
            type: 'warning'
          })
          param.IsEnable = !param.IsEnable
        }
      },
      // 改变 表单字段
      changeFieldType (val, idx, fiedCodeAndControltype) {
        let m = 0
        console.log(++m)
        console.log(val, idx, fiedCodeAndControltype)
        // 处理
        if (fiedCodeAndControltype) {
          let no = fiedCodeAndControltype.indexOf('/')
          this.branchObj.Condition.FieldConditions[idx].Field = fiedCodeAndControltype.substring(0, no)
          this.branchObj.Condition.FieldConditions[idx].currentControlType = fiedCodeAndControltype.substring(++no)
        }
        debugger
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
      // 删除表单字段条件
      handleDelFieldCondition () {
        this.branchObj.Condition.FieldConditions.splice(1, 1)
      },
      // 取消编辑分支条件
      handleCancelBranch () {
        this.$emit('handleCancelBranch')
      },
      // 保存分支条件
      handleSaveBranchCondition () {
        saveBranchCondition(this.branchObj.NodeToNodeId, JSON.stringify(this.branchObj.Condition)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            setTimeout(() => {
              this.handleCancelBranch()
              this.$emit('refresh')
            }, 1000)
          } else {
            this.$message({
              message: '保存失败，请重试！',
              type: 'error'
            })
          }
        })
      }
    },
    components: {
      SaveFooter,
      CompanyStructureCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .formType-container
    .el-icon-circle-close-outline
      margin-left: 20px
      cursor pointer
</style>

