<!--
  User: gaol
  Date: 2019/5/17
  功能：节点设置——流转——处理人 页面
-->

<template>
  <div class="approval-container" v-loading="loading">

    <div class="item">
      <!--节点下拉选择器- start-->
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
        <!-- 一级目录：{{delivery.DeliveryWayType}} -->
        <div style="margin-bottom: 10px">
          <!--级联下拉选择器第一级--start-->
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWayType"
                     style="width:200px;"
                     @change="handleChangeDeliveryWayType(delivery)"
          >
            <el-option v-for="item in deliveryWayTypeList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <!--级联下拉选择器第一级--end-->

          <!-- 二级目录：{{delivery.DeliveryWay}} -->
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

        <div v-show="delivery.DeliveryWay === '5' || delivery.DeliveryWay === '11'">
          <span style="display: inline-block;width: 70px">表单字段：</span>
          <el-select class="filter-item"
                     v-model="delivery.TableFieldValue"
                     style="width:200px;"
                     clearable
          >
            <el-option v-for="item in formList" :key="item.FieldCode" :label="item.FieldName" :value="item.FieldCode">
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
    getDicByKey
  } from '@/api/approve'
  export default {
    mixins: [dialogFnMixin, flowNodeSet], 
    data () {
      return {
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
      this._deliveryWayType()
      this._getApprover()
    },
    methods: {
      // 选择更新
      updata (val) {
        if (this.currentSelectType === 'gangwei') {
          this.selectDelivery[this.currentSelectObj].PositionValue = []
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
          this.selectDelivery[this.currentSelectObj].OrgValue = []
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
          this.selectDelivery[this.currentSelectObj].EmpValue = []
          if (val.length) {
            val.forEach(item => {
              this.selectDelivery[this.currentSelectObj].EmpValue.push({
                Id: item.EmpId,
                Name: item.EmpName
              })
            })
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
      // 根据找人规则获取节点访问规则列表
      _getDicByKey (val) {
        getDicByKey('DeliveryWay', val.DeliveryWayType).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            val.DeliveryWayList = res.data.Data
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
      handleChangeDeliveryWayType (obj) {
        // 找人规则的第一级菜单value 变化时
        obj.DeliveryWay = ''
        this._getDicByKey(obj)
      },
      // 新增审批类型
      handleAddApproverType () {
        debugger
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
          switch (item.DeliveryWay) {
            // 所有人
            case '4':
              item.PositionValue = []
              item.EmpValue = []
              item.OrgValue = []
              break
            // 组织
            case '1':
              item.PositionValue = []
              item.EmpValue = []
              break
            // 组织
            case '16':
              item.PositionValue = []
              item.EmpValue = []
              break
            // 人员
            case '3':
              item.OrgValue = []
              item.PositionValue = []
              break
            // 组织和岗位
            case '9':
              item.EmpValue = []
              break
            // 岗位
            case '14':
              item.EmpValue = []
              item.OrgValue = []
              break
            // 角色
            case '28':
              item.EmpValue = []
              item.OrgValue = []
              break
            // 角色
            case '32':
              item.EmpValue = []
              item.OrgValue = []
              break
            // 职务
            case '29':
              item.EmpValue = []
              item.OrgValue = []
              break
            // 职务
            case '33':
              item.EmpValue = []
              item.OrgValue = []
              break
            // 组织和角色
            case '30':
              item.EmpValue = []
              break
            // 组织和职务
            case '31':
              item.EmpValue = []
              break
            // 节点
            case '8':
              item.PositionValue = []
              item.EmpValue = []
              item.OrgValue = []
              break
            // 表单
            case '5':
              item.PositionValue = []
              item.EmpValue = []
              item.OrgValue = []
              break
            // 人员选择器
            case '40':
              item.PositionValue = []
              item.EmpValue = []
              item.OrgValue = []
              break
          }
        })
        let res = this.selectDelivery.map(item => {
          delete item.DeliveryWayList
          return item
        })
        saveApprover('', this.nodeObj.NodeId, JSON.stringify(res)).then(res => {
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
        this.selectDelivery.forEach(item => {
          this.$set(item, 'DeliveryWayList', [])
          this._getDicByKey(item)
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
