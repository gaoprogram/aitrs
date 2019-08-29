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
          :key=" item.NodeId"
          :label="item.Name"
          :value="item.NodeId">
        </el-option>
      </el-select>

      <!--当前节点、流出节点区域---start-->
      <div style="margin-bottom: 10px">
        <span>当前节点：</span>
        <el-select v-model="branchObj.MainNodeId" placeholder="请选择" @change="_getToNodeSet">
          <el-option
            v-for="item in nodeList"
            :key=" item.NodeId"
            :label="item.Name"
            :value="item.NodeId">
          </el-option>
        </el-select>

        <span>流出节点：</span>
        <el-select v-model="branchObj.ToNodeId" placeholder="请选择" @change="_getBranchCondition">
          <el-option
            v-for="item in rightData"
            :key=" item.ToNodeId"
            :label="item.Name"
            :value="item.ToNodeId">
          </el-option>
        </el-select>
      </div>
      <!--当前节点、流出节点区域---end-->

      <!--条件类型 区域---start-->
      <div style="margin-bottom: 10px">
        <span style="display: inline-block;width: 70px">条件类型：</span>
        <el-select class="filter-item"
                   v-model="branchObj.Condition.ConnDataFrom"
                   style="width:420px;"
                   @change="changeCondition"
        >
          <el-option v-for="(item,i) in branchList" :key="i" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>
      </div>


      <!-- branchObj.Condition.ConnDataFrom: {{branchObj.Condition.ConnDataFrom}} -->
      <!---条件类型不是 0 时 处理人选择器---start-->
      <div style="margin-bottom: 10px" v-show="branchObj.Condition.ConnDataFrom !== '0'">
        <span style="display: inline-block;width: 70px">处理人：</span>
        <el-select class="filter-item"
                   v-model="branchObj.Condition.SpecOperWay"
                   style="width:420px;"
                   @change="changeHandlePerson"
        >
          <el-option v-for="(item, i) in handlePersonList" :key="i" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>
      </div>
      <!---条件类型为不是0时 时处理人选择器----end-->


      <!--条件类型 区域---end-->
      <!-- branchObj.Condition{{branchObj.Condition}} -->
      <!-- companyStructureCmpTitle: {{companyStructureCmpTitle}} -->
      <!--- “条件类型” 选择了 按岗位/按组织时 此 组件对应按照 的按岗位/按组织 的显示组件---start-->
      <div class="item" v-if="showCompanyStructureCmp">
        <company-structure-cmp
          :title="companyStructureCmpTitle"
          :tabType="tabType"
          :selectedList="branchObj.Condition.Value"
          @select="selectStructure($event, branchObj.Condition)"
          @upData="updata"
        ></company-structure-cmp>
      </div>  
      <!---动态渲染 “条件类型” 选择了 按岗位/按组织时 此 组件对应按照 的按岗位/按组织 的显示组件---end-->



      <!---条件类型为：1 按处理人岗位  2 按处理人组织 时的 区域（条件类型，岗位选择/组织选择,处理人）--start-->
      <!-- branchObj.Condition.ConnDataFrom: {{branchObj.Condition.ConnDataFrom}} -->
      <div style="margin-left: 75px;margin-bottom: 10px" v-if="branchObj.Condition.ConnDataFrom === '1' || branchObj.Condition.ConnDataFrom === '2'">
        
        <!--1 按处理人岗位 条件类型下拉选择器部分--start-->
        <div class="item" v-if="branchObj.Condition.SpecOperWay === '1'">
          <span style="display: inline-block;width: 70px">选择节点：</span>
          <el-select class="filter-item"
                     v-model="branchObj.Condition.NodeValue"
                     style="width:200px;"
                     clearable
                     multiple
          >
            <el-option v-for="(item, i) in fieldList" :key="i" :label="item.Name" :value="item.NodeId">
            </el-option>
          </el-select>
        </div>
        <!--条件类型下拉选择器部分--end-->

      
        <!--2 按处理人组织 条件类型下拉选择器部分--start-->
        <!-- branchObj.Condition.SpecOperWay: {{branchObj.Condition.SpecOperWay}} -->
        <div style="margin-bottom: 10px" v-show="branchObj.Condition.SpecOperWay === '2'">
          <span style="display: inline-block;width: 70px">表单字段：</span>
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
        <!--2 按处理人组织 条件类型下拉选择器部分--end-->
      </div>
      <!---条件类型为：1 按处理人岗位  2 按处理人组织 时---end-->
      <!-- ++++++++++++++ -->
      <!-- branchObj.Condition.FieldConditions： {{branchObj.Condition.FieldConditions}} -->
      <!---条件类型为：0 按表单条件计算-时，条件类型下面的区域显示--start-->
      <div class="formType-container" v-show="branchObj.Condition.ConnDataFrom === '0'">

        <div style="margin-bottom: 10px;">表单字段（最多两个条件）：</div>

        <div>
          <div v-for="(fieldCondition, index) in branchObj.Condition.FieldConditions" style="margin-bottom: 10px">

            <el-select class="filter-item"
                       v-model="fieldCondition.SaveType"
                       style="width:100px;"
                       v-if="index !== 0"
            >
              <el-option v-for="(item,i) in SaveType" :key="i" :label="item.value" :value="item.code">
              </el-option>
            </el-select>

            <div style="display: inline-block;width: 100px;height: 40px;" v-if="index === 0"></div>

              <!-- formList:{{formList}} -->
            <!---表单条件按照 0： 表单条件 查询时的  表单字段select选择器---start-->
            <el-select class="filter-item"
                       v-model="fieldCondition.fieldCodeAndControltype"
                       style="width:180px;"
                       @change="changeFieldType($event,index,fieldCondition.fieldCodeAndControltype)"
            >
              <el-option v-for="(item, key) in formList" :key="item.TableCode+item.FieldCode" :label="item.FieldName" :value="item.FieldCode+'/'+item.ControlType+ '/'+ item.TableCode">
              </el-option>
            </el-select>
            <!---表单条件按照 0： 表单条件 查询时的  表单字段select选择器---end-->

            <!-- fieldCondition.Field： {{fieldCondition.Field}} -->
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
            <!---表单条件按照 0： 表单条件时的  大于、等于、小于。。。。的select选择器-----end-->




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

            <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="删除此条件" placement="bottom" v-if="index !== 0">
              <i class="el-icon-circle-close-outline" @click="handleDelFieldCondition"></i>
            </el-tooltip>
          </div>

          <el-tooltip
            v-atris-flowRuleScan="{styleBlock:'inline-block'}" 
            class="item"
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
      <!---条件类型为：0 按表单条件计算时-条件类型下面的区域显示---end-->

      <!-- renyuanShow:{{renyuanShow}} -->
      <div class="item" v-show="renyuanShow">
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
    getFieldDicLlist,
    getNodeList
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  import { flowNodeSet } from '@/utils/mixin'
  export default {
    mixins: [flowNodeSet],
    props: {
      // nodeList:{
      //   type: Array,
      //   default: () => {
      //     return []
      //   }
      // }
    },
    data () {
      return {
        loading: false,
        // currentNodeList: [],
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
            Value: [],      // 组织、岗位选择的人员列表集合
            SpecOperPara: [],
            NodeValue: '',
            FieldValue: '',
            EmpValue: [],   // 人员中选择的人员列表集合
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
        showCompanyStructureCmp: false, // 组织或者岗位时控制选择器的显示/隐藏
        companyStructureCmpTitle: '组织选择',
        renyuanTitle: '人员选择',
        renyuanShow: false,   // 控制人员选择期的显示/隐藏
        tabType: []
      }
    },
    created () {
      this._getToNodeSet()
      this._connDataFrom()
      this._specOperway()
      this._formType()
      this._getNodeList()
      // 获取 表单字段的 字典表（select 下拉选项）
      this.$nextTick(() => {
        this._getFieldList()
      })
      // base-company-select-cmp 组件中 删除了人员后触发
      this.$bus.$on('delPeopleItem', () => {
        // 页面进行保存从而实现真正删除
        this._delPeopleItem()
      })
    },
    beforeDestroy () {
      this.$bus.$off('delPeopleItem')
    },
    methods: {
      // 选择更新
      // 特别注意，此 updata 方法的触发 是 嵌套在里面 深层次的 子组件传过来的，每一层组件的传递 都绑定了 $lister 事件用于一层层的收集子组件传递的事件
      updata (val) {
        switch (this.tabType.toString()) {
          case 'gangwei':
            // this.branchObj.Condition.Value = []
            debugger
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
        // 合并数据后 进行去重
        this._handleRepeatPeople()
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
      // 切换节点后，表单中要 初始化
      _getNodeAttr () {
        debugger
        // 清空 岗位、组织 里面的人员
        this.branchObj.Condition.Value = []
        // 清空 人员选择器中的人员
        this.branchObj.Condition.EmpValue = []
        // 清空 当前 节点绑定的值和 下拉选项list
        this.branchObj.MainNodeId = ''
        // this.currentNodeList = []
        // 清空 流出节点
        this.branchObj.ToNodeId = ''
        this.rightData = []         
        // 清空 条件类型
        this.branchObj.Condition.ConnDataFrom = ''
        // 清空 处理人绑定的值
        this.branchObj.Condition.SpecOperWay = ''

        // // 开始调取接口
        // this._getToNodeSet()
        // this._connDataFrom()
        // this._specOperway()
        // this._formType()
        // this._getNodeList()
        // this._getBranchCondition()
       
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
      // 删除已选择的 人员、组织、岗位
      _delPeopleItem () {
        saveBranchCondition(this.branchObj.NodeToNodeId, JSON.stringify(this.branchObj.Condition)).then(res => {
          // this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            setTimeout(() => {
              this._getBranchCondition()
            }, 1000)
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          // this.loading = false
          this.$message.error('删除失败，请重试')
        })
      },
      // 改变当前节点 
      _getToNodeSet () {
        debugger
        this.loading = true
        // 清空 流出节点绑定的值和下拉选项
        this.branchObj.ToNodeId = ''
        this.rightData = []
        // 清空 条件类型绑定的值
        this.branchObj.Condition.ConnDataFrom = ''
        // 清空 处理人绑定的值
        this.branchObj.Condition.SpecOperWay = ''
        getToNodeSet(this.nodeObj.NodeId, this.$route.query.flowId).then(res => {
          debugger
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.rightData = res.data.Data.ToNodes
            this.leftData = res.data.Data.SpareNodes
          }
        }).catch(() => {
          this.loading = false
        })
      },
      // 初始化数据
      _changeData () {
          // 处理 branchList 的数据，向其中添加 一个 fieldAndTableCode属性，用 FieldValue + '/' +  TableCode 拼接
        debugger
        let obj = this.branchObj.Condition
        if (this.branchObj.Condition.ConnDataFrom !== '0') {
          // 条件类型选的 按岗位 或者 按 组织 1,2
          this.$set(obj, 'fieldAndTableCode', obj.FieldValue + '/' + obj.TableCode)
        } else if (this.branchObj.Condition.ConnDataFrom === '0') {
          // 条件类型选的 按 表单条件计算 0
          if (obj.FieldConditions && obj.FieldConditions.length) {
            obj.FieldConditions.forEach(item => {
              debugger
              // this._getControlType(item)
            // 非文本类型
            // 通过 formList 中可以得到
              let dataSourceResData = this._getFieldDataSource(item.Field, item.TableCode)
              debugger
              if (dataSourceResData) {
                let DicCode = dataSourceResData.DataSource
                let DicType = dataSourceResData.DSType
                // 调用 _getFieldDicLlist
                if( DicCode && DicType ){
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
        debugger
        getBranchCondition(this.branchObj.MainNodeId, this.branchObj.ToNodeId).then(res => {
          debugger
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.branchObj = res.data.Data

            // 初始化 branchObj 数据
            if (this.branchObj && this.branchObj.Condition) {
              // 处理 branchList 的数据，向其中添加 一个 fieldAndTableCode属性，用 FieldValue + '/' +  TableCode 拼接
              this._changeData()
            }
            // this.changeCondition()
            // 回显 岗位 、组织后，自动出现 相对应的人员 选择器列表显示出来
            if (this.branchObj.Condition.ConnDataFrom === '1') {
              this.tabType = ['gangwei']
              this.companyStructureCmpTitle = '岗位选择'
              this.showCompanyStructureCmp = true
              // 此时组织选择器中的人员需要显示 对应岗位 的人员 重新调取接口获取数据
              // this._getBranchCondition()
            } else if (this.branchObj.Condition.ConnDataFrom === '2') {
              this.tabType = ['zuzhi']
              this.companyStructureCmpTitle = '组织选择'
              this.showCompanyStructureCmp = true
              // 此时组织选择器中的人员需要显示 对应组织 的人员 重新调取接口获取数据
              // this._getBranchCondition()
            } else {
              this.companyStructureCmpTitle = '组织选择'
              this.showCompanyStructureCmp = false
            }
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
        getFieldList(this.ruleId, this.nodeObj.NodeId).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
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
      // 改变条件类型 后
      changeCondition () {
        // 切换条件类型后，清空 人员、岗位、组织选择器中的人员列表
        this.branchObj.Condition.Value = []
        this.branchObj.Condition.EmpValue = []
        if (this.branchObj.Condition.ConnDataFrom === '1') {
          this.tabType = ['gangwei']
          this.companyStructureCmpTitle = '岗位选择'
          this.showCompanyStructureCmp = true
          // 此时组织选择器中的人员需要显示 对应岗位 的人员 重新调取接口获取数据
          // this._getBranchCondition()
        } else if (this.branchObj.Condition.ConnDataFrom === '2') {
          this.tabType = ['zuzhi']
          this.companyStructureCmpTitle = '组织选择'
          this.showCompanyStructureCmp = true
          // 此时组织选择器中的人员需要显示 对应组织 的人员 重新调取接口获取数据
          // this._getBranchCondition()
        } else {
          this.companyStructureCmpTitle = '组织选择'
          this.showCompanyStructureCmp = false
        }
      },
      // 切换处理人后
      changeHandlePerson () {
        if (this.branchObj.Condition.SpecOperWay === '3') {
          this.tabType = ['renyuan']
          this.renyuanShow = true
        } else if (this.branchObj.Condition.SpecOperWay !== '3') {
          this.renyuanShow = false
        }
      },
      // 点击选择人员、组织、岗位 的 “+” button按钮
      selectStructure ($event, parm) {
        debugger
        if (parm === 'renyuan') {
          this.tabType = ['renyuan']
          // 显示人员选择期
          this.renyuanShow = true
        } else {
          this.changeCondition()
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
      // 出口条件弹框中， 条件类型按照 0： 按表单条件计算时，表单条件select选择器 选择的表单字段变化时
      changeFieldType (val, idx, fiedCodeAndControltype) {
        debugger
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
              if( DicCode && DicType) {
                this._getFieldDicLlist(DicCode, DicType, this.branchObj.Condition.FieldConditions[idx])
              }else {
                this.$message({
                  type: "warning",
                  message: "该数据源配置不全,请先到表单管理中配置"
                })                
              }
            }
          } else {
            // 文本类型
          }
        }
        debugger
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
      // currentOper (code) {
      //   if (code && this.formList.length) {
      //     let res = this.formList.filter(item => {
      //       return item.FieldCode === code
      //     })
      //     if (res.length) {
      //       if (res[0].ControlType === '1') {
      //         return this.OperText
      //       } else if (res[0].ControlType === '3' || res[0].ControlType === '4') {
      //         return this.OperNum
      //       } else if (res[0].ControlType === '5' || res[0].ControlType === '6' || res[0].ControlType === '12' || res[0].ControlType === '13') {
      //         return this.OperDic
      //       }
      //     }
      //   } else {
      //     return this.OperNum
      //   }
      // },
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
            // 保存成功后，重新获取最新数据
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
