<!--
  User: xxxxxxx
  Date: 2018/9/4
  功能： 新增处理人弹窗 (注意：和 Approvel-dialog.vue 的组件不一样) 此组件是新增一个处理人，Approvel-dialog.vue 是编辑当前的处理人
-->

<template>
  <el-dialog
    title="新增处理人"
    width="600px"
    :visible="true"
    custom-class="dialog-item"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
  >
    <div class="item" v-loading="loading">
      <span style="display: inline-block;height: 20px;line-height: 20px;margin-bottom: 20px">
        处理人可以选择添加两种类型，生成处理人组
      </span>

      <!-- selectDelivery： {{selectDelivery}} -->
      <div
        v-for="(delivery, index) in selectDelivery"
        :key="index"
        style="margin-bottom: 20px;padding-left: 20px;border-top: 1px solid #d8dce5;padding-top: 20px"
      >
        <div style="margin-bottom: 10px">
          <!--类型下拉选择器---start--->
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWayType"
                     style="width:200px;"
                     @change="handleChangeDeliveryWayType(delivery)"
          >
            <el-option v-for="item in deliveryWayTypeList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <!--类型下拉选择器---end--->

          <!--找人规则下拉选择器---start--->
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWay"
                     style="width:200px;"
                     placeholder="请先选择找人规则"
          >
            <el-option v-for="item in delivery.DeliveryWayList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <!--找人规则下拉选择器---end--->


          <el-button @click.native.prevent="handleDelApproverType(index)">
            删除
          </el-button>
        </div>


        <!-- ___________>delivery.DeliveryWay： {{delivery.DeliveryWay}} -->
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

        <!--按表单字段时-表单字段select选择器--delivery。DeliverWay 为5 和 11 --start--->
        <div v-show="delivery.DeliveryWay === '5' || delivery.DeliveryWay === '11'">
          <span style="display: inline-block;width: 70px">表单字段：</span>
          <!-- formList： {{formList}} -->
          <el-select class="filter-item"
                     v-model="delivery.fieldAndTableCode"
                     style="width:200px;"
                     clearable
                     @change="fieldValueChanged(index, delivery.fieldAndTableCode)"
          >
            <el-option v-for="(item, i) in formList" :key="i" :label="item.FieldName" :value="item.FieldCode + '/' + item.TableCode">
            </el-option>
          </el-select>
        </div>
        <!--按表单字段时-表单字段select选择器--delivery。DeliverWay 为5  --start--->


        <div v-show="delivery.DeliveryWay === '1' || delivery.DeliveryWay === '9' || delivery.DeliveryWay === '16' || delivery.DeliveryWay === '30' || delivery.DeliveryWay === '31'">
          <company-structure-cmp
            title="选择组织"
            :tabType="['zuzhi']"
            :selectedList="delivery.OrgValue"
            @select="selectStructure($event, index, 'zuzhi')"
            @upData="updata"
          ></company-structure-cmp>
        </div>

        <div v-show="delivery.DeliveryWay === '3' ||
              delivery.DeliveryWay ==='40'">
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
      <div style="padding-left: 20px;" v-if="selectDelivery.length < 2">
        <el-button size="small" type="primary" @click.native.prevent="handleAddApproverType()">
          新增
        </el-button>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancelAddApprover()">取消</el-button>
      <el-button @click="handleSaveAddApprover()" type="primary">保存</el-button>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  import { dialogFnMixin } from '@/utils/mixin'
  import {
    deliveryWayType,
    getDicByKey,
    addNextStep,
    getFieldList
  } from '@/api/approve'
  export default {
    mixins: [dialogFnMixin],
    props: {
      mainNodeId: {
        type: Number,
        default: ''
      },
      toNodeId: {
        type: Number,
        default: ''
      }
    },
    data () {
      return {
        flowRuleId: '',
        deliveryWayTypeList: [],
        deliveryWayList: [],
        formList: [], // 按表单字段时的 表单下拉选项list
        selectDelivery: [
          {
            'DeliveryWayType': '',
            'DeliveryWay': '',
            'DeliveryWayList': [],
            'OrgValue': [],
            'PositionValue': [],
            'EmpValue': [],
            'TableFieldValue': '',
            'NodeValue': []
          }
        ]
      }
    },
    created () {

    },
    mounted () {
      this.$nextTick(() => {
        this.flowRuleId = this.$route.query.ruleId
        this._getFieldList()
      })
      this._deliveryWayType()
    },
    methods: {
      // 选择更新
      updata (val) {
        console.log(val)
        if (this.currentSelectType === 'gangwei') {
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
      // 找人规则
      _deliveryWayType () {
        this.loading = true
        deliveryWayType().then(res => {
          this.loading = false
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
      _getDicByKey (val) {
        getDicByKey('DeliveryWay', val.DeliveryWayType).then(res => {
          if (res.data.State === REQ_OK) {
            val.DeliveryWayList = res.data.Data
          } else {
            this.$message({
              message: '类型获取失败，请关闭重试！',
              type: 'error'
            })
          }
        })
      },
      // 清空找人规则等
      _clearData (val) {
        // 清空找人规则的list数据DeliveryWayList
        val.deliveryWayTypeList = []
        // 清空
        val.DeliveryWay = ''
        debugger
      },
      // 按表单字段设置时候，选择表单变化时
      fieldValueChanged  (idx, val) {
        debugger
        if (val) {
          let fieldCodeAndTableCodeArr = []
          fieldCodeAndTableCodeArr = val.split('/')
          // 在formList 中找到对应 tableCode 名下的 对应 fieldCode 并 赋给 当前的 delivery.TableFieldValue  TableFieldValue 将 tablecode 赋值给 delivery.tableCode
          this.selectDelivery[idx].TableFieldValue = fieldCodeAndTableCodeArr[0]
          this.selectDelivery[idx].TableCode = fieldCodeAndTableCodeArr[1]
          console.log(this.selectDelivery[idx])
        }
      },
      // 选择找人规则
      handleChangeDeliveryWayType (val) {
        // 清空 找人规则等数据
        debugger
        this._clearData(val)
        // 调接口获取 找人规则
        this._getDicByKey(val)
      },
      // 人员，组织，岗位确认
      selectStructure ($e, index, type) {
        this.currentSelectObj = index
        this.currentSelectType = type
      },
      // 新增类型
      handleAddApproverType () {
        this.selectDelivery.push({
          'DeliveryWayType': '',
          'DeliveryWay': '',
          'DeliveryWayList': [],
          'OrgValue': [],
          'PositionValue': [],
          'EmpValue': [],
          'TableFieldValue': '',
          'NodeValue': []
        })
      },
      // 删除类型
      handleDelApproverType (index) {
        this.selectDelivery.splice(index, 1)
      },
      // 取消新增审批人
      handleCancelAddApprover () {
        this.$emit('handleCancelAddApprover')
      },
      // 保存审批人
      handleSaveAddApprover () {
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
          delete item.DeliveryWayList
          return item
        })
        this.loading = true
        addNextStep(this.mainNodeId, this.toNodeId, JSON.stringify(res)).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            setTimeout(() => {
              this.handleCancelAddApprover()
              this.$emit('refresh')
            }, 1000)

            // 添加后人员保存成功后，需要触发 process-design中进行 刷新
            this.$bus.$emit('flowDssignRefresh')
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
      CompanyStructureCmp,
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
