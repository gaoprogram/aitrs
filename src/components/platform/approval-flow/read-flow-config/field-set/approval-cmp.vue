<!--
  User: xxxxxxx
  Date: 2018/11/16
  功能：处理人
-->

<template>
  <div class="approval-container" v-loading="loading">
    <div class="item">
      <el-select
        v-model="nodeObj.NodeId"
        placeholder="切换节点"
        size="small"
        @change="_getApprover()"
        style="margin-bottom: 10px"
      >
        <el-option
          v-for="item in nodeList"
          :key="item.NodeId"
          :label="item.Name"
          :value="item.NodeId">
        </el-option>
      </el-select>
      <span style="display: inline-block;height: 20px;line-height: 20px;margin-bottom: 20px">
      审批人可以选择添加两种类型，生成审批人组
      </span>
      <div
        v-for="(delivery, index) in selectDelivery"
        :key="index"
        style="margin-bottom: 20px;padding-left: 20px;border-top: 1px solid #d8dce5;padding-top: 20px"
      >
        <div style="margin-bottom: 10px">
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWayType"
                     style="width:200px;"
                     @change="handleChangeDeliveryWayType(delivery)"
          >
            <el-option v-for="item in deliveryWayTypeList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWay"
                     style="width:200px;"
                     placeholder="请先选择找人规则"
          >
            <el-option v-for="item in dicByKeyList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <el-button @click.native.prevent="handleDelApproverType(index)">
            删除
          </el-button>
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
            <el-option v-for="item in formList" :key="item.Name" :label="item.Name" :value="item.Name">
            </el-option>
          </el-select>
        </div>

        <div v-show="delivery.DeliveryWay === '1' || delivery.DeliveryWay === '9' || delivery.DeliveryWay === '16' || delivery.DeliveryWay === '30' || delivery.DeliveryWay === '31'">
          <company-structure-cmp
            title="选择组织"
            :tabType="['zuzhi']"
            :selectedList="delivery.OrgValue"
            @select="selectStructure($event, index, 'org')"
          ></company-structure-cmp>
        </div>

        <div v-show="delivery.DeliveryWay === '3'">
          <company-structure-cmp
            title="选择人员"
            :tabType="['renyuan']"
            :selectedList="delivery.EmpValue"
            @select="selectStructure($event, index, 'renyuan')"
          ></company-structure-cmp>
        </div>

        <div v-show="delivery.DeliveryWay === '14' || delivery.DeliveryWay === '9'">
          <company-structure-cmp
            title="选择岗位"
            :tabType="['gangwei']"
            :selectedList="delivery.PositionValue"
            @select="selectStructure($event, index, 'gangwei')"
          ></company-structure-cmp>
        </div>

        <div v-show="delivery.DeliveryWay === '28' || delivery.DeliveryWay === '30' || delivery.DeliveryWay === '32'">
          <company-structure-cmp
            title="选择角色"
            :tabType="['gangwei']"
            :selectedList="delivery.PositionValue"
            @select="selectStructure($event, index, 'gangwei')"
          ></company-structure-cmp>
        </div>

        <div v-show="delivery.DeliveryWay === '29' || delivery.DeliveryWay === '31' || delivery.DeliveryWay === '33'">
          <company-structure-cmp
            title="选择职务"
            :tabType="['gangwei']"
            :selectedList="delivery.PositionValue"
            @select="selectStructure($event, index, 'gangwei')"
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
    deliveryWay,
    getApprover,
    saveApprover,
    deliveryWayType,
    getDicByKey
  } from '@/api/approve'
  export default {
    mixins: [dialogFnMixin, flowNodeSet],
    data () {
      return {
        deliveryWayTypeList: [],
        dicByKeyList: [],
        deliveryWayList: [],
        selectDelivery: [
          {
            'DeliveryWayType': '',
            'DeliveryWay': '',
            'OrgValue': [],
            'PositionValue': [],
            'EmpValue': [],
            'TableFieldValue': '',
            'NodeValue': ''
          }
        ],
        selectNodeValue: '',
        selectTableField: ''
      }
    },
    created () {
      // 监听组织保存
      this.$bus.$on('saveOrg', (val) => {
        console.log(val)
        if (val.length) {
          this.selectDelivery[this.currentSelectObj].OrgValue = []
          val.forEach(item => {
            this.selectDelivery[this.currentSelectObj].OrgValue.push({
              Id: item.NodeId,
              Name: item.Name
            })
          })
        }
      })
      // 监听岗位保存
      this.$bus.$on('savePos', (val) => {
        console.log(val)
        if (val.length) {
          this.selectDelivery[this.currentSelectObj].PositionValue = []
          val.forEach(item => {
            this.selectDelivery[this.currentSelectObj].PositionValue.push({
              Id: item.PositionId,
              Name: item.PositionName
            })
          })
        }
      })
      // 监听员工保存
      this.$bus.$on('saveEmp', (val) => {
        console.log(val)
        if (val.length) {
          this.selectDelivery[this.currentSelectObj].EmpValue = []
          val.forEach(item => {
            this.selectDelivery[this.currentSelectObj].EmpValue.push({
              Id: item.EmpId,
              Name: item.EmpName
            })
          })
        }
      })
    },
    mounted () {
      this._deliveryWayType()
      this._getApprover()
    },
    methods: {
      // 找人规则
      _deliveryWayType () {
        deliveryWayType().then(res => {
          if (res.data.State === REQ_OK) {
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
      _getDicByKey (code) {
        getDicByKey('DeliveryWay', code).then(res => {
          if (res.data.State === REQ_OK) {
            this.dicByKeyList = res.data.Data
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
              message: '审批人获取失败，请关闭重试！',
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            message: '审批人获取失败，请关闭重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 类型获取
      _deliveryWay () {
        deliveryWay().then(res => {
          if (res.data.State === REQ_OK) {
            this.deliveryWayList = res.data.Data
          } else {
            this.$message({
              message: '类型获取失败，请关闭重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '类型获取失败，请关闭重试！',
            type: 'error'
          })
        })
      },
      // 选择找人规则
      handleChangeDeliveryWayType (obj) {
        obj.DeliveryWay = ''
        this._getDicByKey(obj.DeliveryWayType)
      },
      // 新增审批类型
      handleAddApproverType () {
        this.selectDelivery.push({
          'DeliveryWayType': '',
          'DeliveryWay': '',
          'OrgValue': [],
          'PositionValue': [],
          'EmpValue': [],
          'TableFieldValue': '',
          'NodeValue': ''
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
      // 取消审批人
      handleCancelApprover () {
        this.$emit('handleCancelApprover')
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
            message: '审批人不能选择两种同样类型，请求改后再保存！',
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
          }
        })
        saveApprover('', this.nodeObj.NodeId, JSON.stringify(this.selectDelivery)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            setTimeout(() => {
              this.handleCancelApprover()
              this.$emit('refresh')
            }, 1000)
          } else {
            this.$message({
              message: '保存失败，请重试！',
              type: 'error'
            })
          }
        })
      },
      // 初始化数据处理
      changeData (data) {
        data.forEach(item => {
          this._getDicByKey(item.DeliveryWayType)
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
