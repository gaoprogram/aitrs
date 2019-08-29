<!--
  User: gaol
  Date: 2019/5/31
  功能：流程配置——流程设计——简洁设计——分支编辑弹框（编辑出口条件）
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
      <!--1表示按处理人岗位，2表示按处理人组织，0 表示 按表单条件 --条件类型--start--->
      <!-- branchList： {{branchList}} -->
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

      <!------1表示 条件类型按 处理人岗位     2 表示 条件类型 按 处理人组织   0 表示条件类型 按表单条件-----start------>
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

        <!---当条件类型为按 处理人岗位或者 按组织时，并且处理人选择的--是 2：按指定表单字段为处理人---start--->
        <div style="margin-bottom: 10px" v-if="branchObj.Condition.SpecOperWay === '2'">
          <span style="display: inline-block;width: 70px">表单字段：</span>
          <!-- formList： {{formList}} -->
          <!-- +++
          branchObj.Condition： {{branchObj.Condition}} -->
          <el-select class="filter-item"
                     v-model="branchObj.Condition.fieldAndTableCode"
                     style="width:200px;"
                     clearable
                     @change="fieldValueChanged(branchObj.Condition.fieldAndTableCode)"
          >
            <el-option v-for="(item, i) in formList" :key="i+ item.FieldCode" :label="item.FieldName" :value="item.FieldCode + '/' + item.TableCode">
            </el-option>
          </el-select>
        </div>
        <!---当条件类型为按 处理人岗位或者 按组织时，并且处理人选择的--是 2：按指定表单字段为处理人---end--->


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
          <!-- branchObj: {{branchObj}} -->
          <!-- ----------------------- -->
          <!-- branchObj.Condition.FieldConditions： {{branchObj.Condition.FieldConditions}} -->
          <div v-for="(fieldCondition, index) in branchObj.Condition.FieldConditions" style="margin-bottom: 10px">

            <!-- fieldCondition.SaveType： {{fieldCondition.SaveType}} -->
            <!---且----start-->
            <el-select class="filter-item"
                       v-model="fieldCondition.SaveType"
                       style="width:100px;"
                       v-if="index !== 0"
            >
              <el-option v-for="item in SaveType" :key="item.code" :label="item.value" :value="item.code">
              </el-option>
            </el-select>
            <!---且----end-->

            <div style="display: inline-block;width: 100px;height: 40px;" v-if="index === 0"></div>

            <!-- fieldCondition： {{fieldCondition}} -->
            <!-- formList： {{formList}} -->
            <!---表单的select框---start---->
            <!-- fieldCondition.FieldCode : {{fieldCondition}} -->
            <!-- fieldCondition.fieldCodeAndControltype: {{fieldCondition.fieldCodeAndControltype}} -->

            <!---表单条件按照 0： 表单条件时的  表单字段select选择器---start-->
            <el-select class="filter-item"
                       v-model="fieldCondition.fieldCodeAndControltype"
                       style="width:180px;"
                       @change="changeFieldType($event,index,fieldCondition.fieldCodeAndControltype)"
            >
              <el-option v-for="(item, key) in formList" :key="item.TableCode+item.FieldCode" :label="item.FieldName" :value="item.FieldCode+'/'+item.ControlType+ '/'+ item.TableCode">
              </el-option>
            </el-select>
            <!---表单条件按照 0： 表单条件时的  表单字段select选择器---start-->


            <!---表单的select框---end---->

            <!---大于、小于、等于、等的 select框----start-->
            <!-- fieldCondition.Oper：{{fieldCondition.Oper}} -->
            <!-- Oper： {{Oper}} -->

            <!---表单条件按照 0： 表单条件时的  大于、等于、小于。。。。的select选择器---start-->
            <el-select class="filter-item"
                       v-model="fieldCondition.Oper"
                       style="width:110px;"
            >
              <!---文本类型中的 3（数字）、4(金额) 下拉选项显示大于、小于、等于、大于等于、小于等于、不等于--->
              <el-option v-show="fieldCondition.currentControlType === '3' ||
                                 fieldCondition.currentControlType === '4'"
                        v-for="item in Oper" :key="item.code" :label="item.value" :value="item.code">
              </el-option>
              <!---文本类型中的 1 和 非文本类型中的 5，6，12，13 都只显示  包含、等于、不等于---->
              <el-option v-show="fieldCondition.currentControlType === '1' ||
                                fieldCondition.currentControlType === '5' ||
                                fieldCondition.currentControlType === '6' ||
                                fieldCondition.currentControlType === '12' ||
                                fieldCondition.currentControlType === '13'"
                        v-for="item in Oper_text" :key="item.code + item.value" :label="item.value" :value="''+item.code">
              </el-option>   
            </el-select>
            <!---表单条件按照 0： 表单条件时的  大于、等于、小于。。。。的select选择器---start-->


            <!--表单条件按照0： 表单条件时的 -表单输入框（只有文本(1,3,4)时 才是输入框）---start-->
            <el-input v-if="fieldCondition.currentControlType === '1' ||
                            fieldCondition.currentControlType === '3' ||
                            fieldCondition.currentControlType === '4'" 
                            v-model="fieldCondition.FieldValue.Id"
                            :type="(fieldCondition.currentControlType === '3' ||
                                    fieldCondition.currentControlType === '4')? 'number':'' "                            
                      placeholder="请输入值"
                      style="width:180px;">
            </el-input>
            <el-select v-else v-model="fieldCondition.FieldValue.Id" style="width:180px">
              <el-option v-for="item in fieldCondition.notTextTypeList" :key="item.Code" :label="item.Name" :value="''+item.Code">
              </el-option>
            </el-select>
            <!--表单条件按照0： 表单条件时的 -表单输入框（只有文本时 才是输入框）---end-->

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
    getFieldList,
    getFieldDicLlist
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
                },
                notTextTypeList: []   // 非文本类型的下拉选项list集合
              },
              {
                SaveType: '',
                Field: '',
                Oper: '',
                FieldValue: {
                  Id: ''
                },
                notTextTypeList: []   // 非文本类型的下拉选项list集合
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
          // 非文本类型的下拉选项
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
          // 文本类型的下拉选项
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
        loading: true,
        showCompanyStructureCmp: false,
        companyStructureCmpTitle: '组织选择',
        renyuanTitle: '人员选择',
        renyuanShow: false,
        tabType: []
      }
    },
    created () {
      // 获取 表单字段的 字典表（select 下拉选项）
      this.$nextTick(() => {
        this._getFieldList()
      })
    },
    mounted () {
      // 获取条件类型
      this._connDataFrom()
      // 获取处理人
      this._specOperway()
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
            // this.branchObj.Condition.Value = []
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
            // this.branchObj.Condition.Value = []
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
            // this.branchObj.Condition.EmpValue = []
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

        // 合并后去重
        // 员工去重
        this._handleRepeatPeople()
      },
      // 获取 表单字段 非文本类型的 list 数据
      _getFieldDicLlist (DicCode, DicType, obj) {
        debugger
        getFieldDicLlist(DicCode, DicType).then(res => {
          if (res && res.data.State === REQ_OK) {
            debugger
            console.log(obj)
            // obj.notTextTypeList = res.data.Data
            if (!obj.hasOwnProperty('notTextTypeList')) {
              this.$set(obj, 'notTextTypeList', res.data.Data)
            } else {
              obj.notTextTypeList = [].concat(res.data.Data)
            }
            console.log(obj)
            debugger
          } else {
            this.$message({
              type: 'error',
              message: '按表单字段查询获取非文本类型数据失败err'
            })
          }
        }).catch(res => {
          this.$message({
            type: 'error',
            message: '按表单字段查询获取非文本类型数据失败err'
          })
        })
      },
      // 将选取的人员进行去重处理
      _handleRepeatPeople () {
        let valueStr = ''
        switch (this.tabType.toString()) {
          case 'gangwei':
            valueStr = 'Value'
            break
          case 'zuzhi':
            valueStr = 'Value'
            break
          case 'renyuan':
            valueStr = 'EmpValue'
            break
          default:
            break
        }
        // 将再次添加的 数据 和 已有的数据合并之后 进行 去重
        let newValueArr = []
        this.branchObj.Condition[valueStr].forEach((item, key) => {
          newValueArr.push(item.Id)
        })

        for (let i = 0; i < newValueArr.length; i++) {
          if (newValueArr.indexOf(newValueArr[i]) !== i) {
            // newValueArr 中删除重复的项
            newValueArr.splice(i, 1)
            // this._getBranchCondition.Value 中删除重复的项
            this.branchObj.Condition[valueStr].splice(i, 1)
            --i
          }
        }
      },
      // 条件类型
      _connDataFrom () {
        connDataFrom().then(res => {
          debugger
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
            debugger
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
      // formList 中通过 field 和 tableCode 来找到对应的组件的 controltype
      _getControlType (item) {
        // debugger
        if (this.formList && this.formList.length) {
          // 通过 item.TableCode 和 item.Field在 formList 中找到对应的 controlType
          for (let i = 0, length = this.formList.length; i < length; i++) {
            let formItem = this.formList[i]
            if (formItem.TableCode === item.TableCode && formItem.FieldCode === item.Field) {
              this.$set(item, 'fieldCodeAndControltype', item.Field + '/' + formItem.ControlType + '/' + item.TableCode)
              this.$set(item, 'currentControlType', formItem.ControlType)
              break
            }
          }
          // debugger
        }
      },
      // 初始化数据
      _changeData () {
          // 处理 branchList 的数据，向其中添加 一个 fieldAndTableCode属性，用 FieldValue + '/' +  TableCode 拼接
        // debugger
        let obj = this.branchObj.Condition
        if (this.branchObj.Condition.ConnDataFrom !== '0') {
          // 条件类型选的 按岗位 或者 按 组织 1,2
          this.$set(obj, 'fieldAndTableCode', obj.FieldValue + '/' + obj.TableCode)
        } else if (this.branchObj.Condition.ConnDataFrom === '0') {
          // 条件类型选的 按 表单条件计算 0
          if (obj.FieldConditions && obj.FieldConditions.length) {
            obj.FieldConditions.forEach(item => {
              // debugger
              // this._getControlType(item)
            // 非文本类型
            // 通过 formList 中可以得到
              let dataSourceResData = this._getFieldDataSource(item.Field, item.TableCode)
              debugger
              if (dataSourceResData) {
                let DicCode = dataSourceResData.DataSource
                let DicType = dataSourceResData.DSType
                // 调用 _getFieldDicLlist
                if(DicCode && DicType ){
                  this._getFieldDicLlist(DicCode, DicType, item)
                }else {
                  this.$message({
                    type: "warning",
                    message: "该数据源配置不全,请先到表单管理中配置"
                  })
                }
              }
            })
          }
        }
        console.log(this.branchObj)
        // debugger
      },
      // 获取分支条件
      _getBranchCondition () {
        this.loading = true
        getBranchCondition(this.mainNodeId, this.toNodeId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            // debugger
            this.branchObj = res.data.Data

            if (this.branchObj && this.branchObj.Condition) {
              // 处理 branchList 的数据，向其中添加 一个 fieldAndTableCode属性，用 FieldValue + '/' +  TableCode 拼接
              this._changeData()
            }
            // debugger
            this.changeCondition()
            this.changeHandlePerson()
            // this.changeData(res.data.Data)
            // debugger
          } else {
            this.$message({
              message: '分支条件获取失败，请关闭重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          // debugger
          this.$message({
            message: '分支条件获取失败，请关闭重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      _getFieldDataSource (fieldCode, tableCode) {
        debugger
        if (this.formList && this.formList.length) {
          for (let i = 0, length = this.formList.length; i < length; i++) {
            let formListItem = this.formList[i]
            if (formListItem.FieldCode === fieldCode && formListItem.TableCode === tableCode) {
              return {
                DSType: formListItem.DSType,
                DataSource: formListItem.DataSource,
                CompanyCode: formListItem.CompanyCode,
                ControlType: formListItem.ControlType
              }
            }
          }
        }
      },
      // 条件类型中 按照 1： 按岗位， 2： 按组织时， 选择的 按照表单字段时 （注意与下面的changeFieldType 不同 ）按表单字段选择的表单字段变化时
      fieldValueChanged (val) {
        debugger
        if (val) {
          let fieldCodeAndTableCodeArr = []
          fieldCodeAndTableCodeArr = val.split('/')
          // branchObj.Condition
          // 在formList 中找到对应 tableCode 名下的 对应 fieldCode 并 赋给 当前的 delivery.TableFieldValue  TableFieldValue 将 tablecode 赋值给 delivery.tableCode
          this.branchObj.Condition.FieldValue = fieldCodeAndTableCodeArr[0]
          this.branchObj.Condition.TableCode = fieldCodeAndTableCodeArr[1]
          this.branchObj.Condition.fieldAndTableCode = val
        }
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
      // 出口条件弹框中， 条件类型按照 0： 按表单条件计算时，表单条件select选择器 选择的表单字段变化时
      changeFieldType (val, idx, fiedCodeAndControltype) {
        console.log(val, idx, fiedCodeAndControltype)
        // 处理
        if (fiedCodeAndControltype) {
          this.branchObj.Condition.FieldConditions[idx].FieldValue.Ids = ''
          this.branchObj.Condition.FieldConditions[idx].Oper = ''
          // let no = fiedCodeAndControltype.indexOf('/')
          // this.branchObj.Condition.FieldConditions[idx].Field = fiedCodeAndControltype.substring(0, no)
          // this.branchObj.Condition.FieldConditions[idx].currentControlType = fiedCodeAndControltype.substring(++no)
          let newDataArr = fiedCodeAndControltype.trim().split('/')
          this.branchObj.Condition.FieldConditions[idx].Field = newDataArr[0]
          this.branchObj.Condition.FieldConditions[idx].currentControlType = newDataArr[1]
          this.branchObj.Condition.FieldConditions[idx].TableCode = newDataArr[2]

          if (this.branchObj.Condition.FieldConditions[idx].currentControlType !== '1' &&
              this.branchObj.Condition.FieldConditions[idx].currentControlType !== '3' &&
              this.branchObj.Condition.FieldConditions[idx].currentControlType !== '4') {
            // 非文本类型才去请求接口 1,3,4 为文本类型
            // 通过 formList 中可以得到
            let dataSourceResData = this._getFieldDataSource(newDataArr[0], newDataArr[2])
            debugger
            if (dataSourceResData) {
              let DicCode = dataSourceResData.DataSource
              let DicType = dataSourceResData.DSType
              // 调用 _getFieldDicLlist
              if(DicCode && DicType) {
                this._getFieldDicLlist(DicCode, DicType, this.branchObj.Condition.FieldConditions[idx])
              }else {
                this.$message({
                  type: 'warning',
                  message: '该数据源配置不全,请先到表单管理中配置'
                })
              }
            }
          } else {
            // 文本类型
          }
        }
        debugger
      },
      // 改变条件类型
      changeCondition () {
        // 0 按表单条件  1 按 岗位  2  按 组织
        if (this.branchObj.Condition.ConnDataFrom === '1') {
          // 按 岗位
          this.tabType = ['gangwei']
          this.companyStructureCmpTitle = '岗位选择'
          this.showCompanyStructureCmp = true
        } else if (this.branchObj.Condition.ConnDataFrom === '2') {
          // 按组织
          this.tabType = ['zuzhi']
          this.companyStructureCmpTitle = '组织选择'
          this.showCompanyStructureCmp = true
        } else {
          // 按 表单条件
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

