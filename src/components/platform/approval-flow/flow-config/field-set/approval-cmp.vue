<!--
  User: gaol
  Date: 2019/5/17
  功能：节点设置——流转——处理人 页面
-->

<template>
  <div class="approval-container" v-loading="loading">
    <!-- {{nodeObj.NodeId}} -->
    <div class="item">
      <!--节点下拉选择器--注意： nodeObj是minxin中的 flowNodeSet中获取的-- start-->
      <el-select
        v-model="nodeObj.NodeId"
        placeholder="切换节点"
        size="small"
        @change="_getApprover()"
        style="margin-bottom: 10px"
      >
        <el-option
          v-for="item in changeNodeList"
          :key="item.NodeId"
          :label="item.Name"
          :value="item.NodeId">
        </el-option>
      </el-select>
      <!--节点下拉选择器- end-->


      <span style="display: block;height: 20px;line-height: 20px;margin-bottom: 20px">
        处理人可以选择添加两种类型，生成处理人组
      </span>

      <!---根据 selectDelivery 渲染---start---->
      <div
        v-for="(delivery, index) in selectDelivery"
        :key="index"
        style="margin-bottom: 20px;padding-left: 20px;border-top: 1px solid #d8dce5;padding-top: 20px"
      >
        <!-- 一级目录delivery.DeliveryWayType：{{delivery.DeliveryWayType}} -->
        <div style="margin-bottom: 10px">
          <!--级联下拉选择器第一级--start-->
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWayType"
                     style="width:200px;"
                     @change="handleChangeDeliveryWayType(delivery,index)"
          >
            <el-option v-for="item in deliveryWayTypeList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <!--级联下拉选择器第一级--end-->

          <!-- 二级目录delivery.DeliveryWay：{{delivery.DeliveryWay}} -->
          <!--级联下拉选择器第二级--start-->
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWay"
                     style="width:200px;"
                     placeholder="请先选择找人规则"
          >
            <el-option v-for="item in delivery.DeliveryWayList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <!--级联下拉选择器第二级--end-->

          <!--删除按钮---start-->
          <el-button @click.native.prevent="handleDelApproverType(index)">
            删除
          </el-button>
          <!--删除按钮---end-->
        </div>


        <!--一级下拉框:"按节点"，二级选择器 级联选择器下方出现的--“按节点”下拉选择筐-start---->
        <div v-show="delivery.DeliveryWay === '8' || delivery.DeliveryWay === '11'">
          <span style="display: inline-block;width: 70px">选择节点：</span>
          <el-select class="filter-item"
                     v-model="delivery.NodeValue"
                     style="width:200px;"
                     clearable
                     multiple
          >
            <el-option v-for="item in fieldList" :key="item.NodeId" :label="item.Name" :value="item.NodeId">
            </el-option>
          </el-select>
        </div>
        <!--一级下拉框:"按节点",二级选择器 级联选择器下方出现的--“按节点”下拉选择筐--end---->


        <div v-show="delivery.DeliveryWay === '5' || delivery.DeliveryWay === '11'">
          <!-- delivery: {{delivery}} -->
          <span style="display: inline-block;width: 70px">表单字段：</span>
          <el-select class="filter-item"
                     v-model="delivery.fieldAndTableCode"
                     style="width:200px;"
                     clearable
                     @change="fieldValueChanged(index, delivery.fieldAndTableCode)"
          >
            <el-option v-for="(item,i) in formList" :key="i" :label="item.FieldName" :value="item.FieldCode + '/' + item.TableCode">
            </el-option>
          </el-select>
        </div>


        <div v-show="delivery.DeliveryWay === '1' || delivery.DeliveryWay === '9' || delivery.DeliveryWay === '16' || delivery.DeliveryWay === '30' || delivery.DeliveryWay === '31'">
          <company-structure-cmp
            title="选择组织"
            :tabType="['zuzhi']"
            :selectedList="delivery.OrgValue"
            @select="selectStructure($event, index, 'zuzhi')"
            @upData="updata"
          ></company-structure-cmp>
        </div>

        <!-- delivery:{{delivery}}   +++++++++++++++ selectDelivery:{{selectDelivery}} -->
        <!---按人员选择器——由上一节点发送人在如下选择40----->
        <div v-show="delivery.DeliveryWay === '3' || delivery.DeliveryWay === '40'">

          <company-structure-cmp
            title="选择人员"
            :tabType="['renyuan']"
            :selectedList="delivery.EmpValue"
            @select="selectStructure($event, index, 'renyuan')"
            @upData="updata"
          ></company-structure-cmp>

        </div>

        <div v-show="delivery.DeliveryWay === '14' || delivery.DeliveryWay === '9'">
          <company-structure-cmp
            title="选择岗位"
            :tabType="['gangwei']"
            :selectedList="delivery.PositionValue"
            @select="selectStructure($event, index, 'gangwei')"
            @upData="updata"
          ></company-structure-cmp>
        </div>

        <div v-show="delivery.DeliveryWay === '28' || delivery.DeliveryWay === '30' || delivery.DeliveryWay === '32'">
          <company-structure-cmp
            title="选择角色"
            :tabType="['gangwei']"
            :selectedList="delivery.PositionValue"
            @select="selectStructure($event, index, 'gangwei')"
            @upData="updata"
          ></company-structure-cmp>
        </div>

        <div v-show="delivery.DeliveryWay === '29' || delivery.DeliveryWay === '31' || delivery.DeliveryWay === '33'">
          <company-structure-cmp
            title="选择职务"
            :tabType="['gangwei']"
            :selectedList="delivery.PositionValue"
            @select="selectStructure($event, index, 'gangwei')"
            @upData="updata"
          ></company-structure-cmp>
        </div>
      </div>
      <!---根据 selectDelivery 渲染---end---->


      <!---新增按钮--start-->
      <div style="padding-left: 20px;" v-if="selectDelivery.length < 2">
        <el-button size="small" type="primary" @click.native.prevent="handleAddApproverType()">
          新增
        </el-button>
      </div>
      <!---新增按钮--end-->
    </div>

    <!---底部保存按钮--->
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleSaveApprover()" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  import { dialogFnMixin, flowNodeSet } from '@/utils/mixin'
  import {
    getApprover,
    saveApprover,
    deliveryWayType,
    getDicByKey,
    getFieldList
  } from '@/api/approve'
  export default {
    mixins: [dialogFnMixin, flowNodeSet],
    data () {
      return {
        flowRuleId: '',
        deliveryWayTypeList: [],
        formList: [], // 按表单字段时的 表单下拉选项list
        deliveryWayTypeList: [],  // 找人规则的第一级下拉选择器中的list数据集合
        selectDelivery: [
          {
            'DeliveryWayType': '',   // 找人规则的第一级下拉选择器中的 选择的指定的 value值
            'DeliveryWay': '',   // 找人规则下的第二级下拉选择器中 的 选择的 指定的value值
            'DeliveryWayList': [], // 找人规则下 第二级下拉选择器中的 list 数据集合
            'OrgValue': [],
            'PositionValue': [],
            'EmpValue': [],
            'TableFieldValue': '',
            'NodeValue': []
          }
        ],
        selectNodeValue: '',
        selectTableField: ''
      }
    },
    computed: {
      changeNodeList () {
        if (this.nodeList && this.nodeList.length) {
          return this.nodeList.filter(item => {
            return item.NodePosType !== 0
          })
        }
        return []
      }
    },
    created () {
    },
    mounted () {
      debugger
      this.flowRuleId = this.$route.query.ruleId
      this._getFieldList()
      this._deliveryWayType()
      this._getApprover()
    },
    methods: {
      // 选择更新
      updata (val) {
        if (this.currentSelectType === 'gangwei') {
          // 按岗位 筛选后人后 点击确认保存
          // this.selectDelivery[this.currentSelectObj].PositionValue = []
          if (val.length) {
            val.forEach(item => {
              this.selectDelivery[this.currentSelectObj].PositionValue.push({
                Id: item.PositionId,
                Name: item.PositionName
              })
            })
          }
        }
        if (this.currentSelectType === 'zuzhi') {
          // 按组织 筛选后人后 点击确认保存
          // this.selectDelivery[this.currentSelectObj].OrgValue = []
          if (val.length) {
            val.forEach(item => {
              this.selectDelivery[this.currentSelectObj].OrgValue.push({
                Id: item.NodeId,
                Name: item.Name
              })
            })
          }
        }
        if (this.currentSelectType === 'renyuan') {
          // 按人员 筛选后人后 点击确认保存
          debugger
          // this.selectDelivery[this.currentSelectObj].EmpValue = []
          if (val.length) {
            val.forEach(item => {
              this.selectDelivery[this.currentSelectObj].EmpValue.push({
                Id: item.EmpId,
                Name: item.EmpName
              })
            })
          }
        }
        // 员工去重
        this._handleRepeatPeople()
      },
      // 将选取的人员进行去重处理
      _handleRepeatPeople () {
        let valueStr = ''
        switch (this.currentSelectType) {
          case 'gangwei':
            valueStr = 'PositionValue'
            break
          case 'zuzhi':
            valueStr = 'OrgValue'
            break
          case 'renyuan':
            valueStr = 'EmpValue'
            break
          default:
            break
        }
        // 将再次添加的 数据 和 已有的数据合并之后 进行 去重
        let newValueArr = []
        this.selectDelivery[this.currentSelectObj][valueStr].forEach((item, key) => {
          newValueArr.push(item.Id)
        })

        for (let i = 0; i < newValueArr.length; i++) {
          if (newValueArr.indexOf(newValueArr[i]) !== i) {
            // newValueArr 中删除重复的项
            newValueArr.splice(i, 1)
            // this._getBranchCondition.Value 中删除重复的项
            this.selectDelivery[this.currentSelectObj][valueStr].splice(i, 1)
            --i
          }
        }
      },
      // 获取找人规则 选择器中第一级的下拉选项list 数据
      _deliveryWayType () {
        deliveryWayType().then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.deliveryWayTypeList = res.data.Data
          } else {
            this.$message({
              message: '找人规则获取失败，请关闭重试！',
              type: 'error'
            })
          }
        })
      },
      // 获取按表单字段时的，表单字段 下拉框选项
      _getFieldList () {
        getFieldList(this.flowRuleId, this.mainNodeId).then((res) => {
          if (res && res.data.State === REQ_OK) {
            debugger
            this.formList = res.data.Data
          }
        })
      },
      // 根据找人规则获取节点访问规则列表
      _getDicByKey (val, idx) {
        debugger
        getDicByKey('DeliveryWay', val.DeliveryWayType).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.$set(val, 'DeliveryWayList', res.data.Data)
            // val.DeliveryWayList = [].concat(res.data.Data)
          } else {
            this.$message({
              message: '类型获取失败，请关闭重试！',
              type: 'error'
            })
          }
        })
      },
      // 获取审批人
      _getApprover () {
        this.loading = true
        getApprover('', this.nodeObj.NodeId).then(res => {
          if (res.data.State === REQ_OK) {
            this.selectDelivery = res.data.Data
            debugger
            // 初始化数据
            this.changeData(res.data.Data)
            this.loading = false
          } else {
            this.$message({
              message: '处理人获取失败，请关闭重试！',
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            message: '处理人获取失败，请关闭重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 选择找人规则
      handleChangeDeliveryWayType (obj, idx) {
        // 找人规则的第一级菜单value 变化时
        debugger
        obj.DeliveryWay = ''
        this._getDicByKey(obj, idx)
      },
      // 按表单字段选择的表单字段变化时
      fieldValueChanged (idx, val) {
        debugger
        if (val) {
          let fieldCodeAndTableCodeArr = []
          fieldCodeAndTableCodeArr = val.split('/')
          // 在formList 中找到对应 tableCode 名下的 对应 fieldCode 并 赋给 当前的 delivery.TableFieldValue  TableFieldValue 将 tablecode 赋值给 delivery.tableCode
          this.selectDelivery[idx].TableFieldValue = fieldCodeAndTableCodeArr[0]
          this.selectDelivery[idx].TableCode = fieldCodeAndTableCodeArr[1]
          this.selectDelivery[idx].fieldAndTableCode = val
          console.log(this.selectDelivery[idx])
        }
      },
      // 新增审批类型
      handleAddApproverType () {
        this.selectDelivery.push({
          'DeliveryWayType': '',   // 找人规则的第一级下拉选择器中的 选择的指定的 value值
          'DeliveryWay': '',   // 找人规则下的第二级下拉选择器中 的 选择的 指定的value值
          'DeliveryWayList': [], // 找人规则下 第二级下拉选择器中的 list 数据集合
          'OrgValue': [],
          'PositionValue': [],
          'EmpValue': [],
          'TableFieldValue': '',
          'NodeValue': []
        })
      },
      // 删除当前审批类型
      handleDelApproverType (index) {
        this.selectDelivery.splice(index, 1)
      },
      // 人员，组织，岗位确认
      selectStructure ($e, index, type) {
        this.currentSelectObj = index
        this.currentSelectType = type
      },
      // 保存审批人
      handleSaveApprover () {
        // 保存
        debugger
        let arr = this.selectDelivery.filter(item => {
          return item.DeliveryWay === ''
        })
        if (arr.length) {
          this.$message({
            message: '你有未选择的类型，请选择完再保存！',
            type: 'warning'
          })
          return
        }
        this.loading = true
        // 判断是否选择相同类型
        let selectKey = []
        let hasKey = false
        for (let i = 0; i < this.selectDelivery.length; i++) {
          if (selectKey.includes(this.selectDelivery[i].DeliveryWay)) {
            hasKey = true
            break
          }
          selectKey.push(this.selectDelivery[i].DeliveryWay)
        }
        if (hasKey) {
          this.$message({
            message: '处理人不能选择两种同样类型，请求改后再保存！',
            type: 'warning'
          })
          return
        }
        this.selectDelivery.forEach(item => {
          //根据不同的deliveryWay 的值 要将 item 中相应的数据 做下处理（主要是要清理一下之前设置时保存在item上的其他属性值避免保存后不必要的属性数据传给后端）
          let deliveryWay = item.DeliveryWay
          // console.log(typeof deliveryWay)
          switch(deliveryWay){
            //绑定的是  PositionValue
            case '14':
            case '28':
            case '32':
            case '29':
            case '33':
              item.OrgValue = []
              item.EmpValue = []
              // item.NodeValue = []
              item.FieldName = ''
              item.TableCode = ''
              item.TableFieldValue = ''
            break
            
            // 绑定的是 OrgValue
            case '1':
            case '16':
              item.PositionValue = []
              item.EmpValue = []
              // item.NodeValue = []
              item.FieldName = ''
              item.TableCode = ''
              item.TableFieldValue = ''
            break

            // 绑定的是 EmpValue
            case '3':
            case '40':
              item.PositionValue = []
              item.OrgValue = []
              // item.NodeValue = []
              item.FieldName = ''
              item.FieldCode = ''
              item.TableFieldValue = ''
            break         

            // 绑定的是  PositionValue + OrgValue
            case '9':
            case '30':
            case '31':
              item.EmpValue = []
              // item.NodeValue = []
              item.FieldName = ''
              item.TableCode = ''
              item.TableFieldValue = ''
            break;

            // 绑定的是  EmpValue + FieldName + TableCode + TableFieldValue
            case '11':
              item.PositionValue = []
              item.OrgValue = []
              // item.NodeValue = []
            break

            // 绑定的是 按节点 NodeValue
            case '8':
              item.EmpValue = []
              item.FieldName = ''
              item.TableCode = ''
              item.TableFieldValue = ''
            break

            default:
              console.log("保存时,按照default 没有处理")
          }
        })
        let res = this.selectDelivery.map(item => {
          // delete item.DeliveryWayList
          if(item.DeliveryWayType === 'P208' || item.DeliveryWayType === 'P209'){
            // P208 按节点   P209 按表单字段
            // item.DeliveryWayList = []
            item.PositionValue = []
            item.OrgValue = []
            item.EmpValue = []
          }
          return item
        })
        saveApprover('', this.nodeObj.NodeId, JSON.stringify(res)).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.Error)
          }
        })
      },
      // 初始化数据处理
      changeData (data) {
        debugger
        this.selectDelivery.forEach((item, idx) => {
           // 将 selectDelivery 中的 TableFieldValue  处理成  fieldcode + '/' + tablecode  的拼接形势  这样初始时候才能渲染成功
          // 给对象添加一个属性 需要用 this.$set  否则 此属性变化后，不会触发更新
          this.$set(item, 'fieldAndTableCode', item.TableFieldValue + '/' + item.TableCode)
          this.$set(item, 'DeliveryWayList', [])
          this._getDicByKey(item, idx)
        })
      }
    },
    components: {
      CompanyStructureCmp,
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
