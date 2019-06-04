<!--
  User: xxxxxxx
  Date: 2018/9/4
  功能：流程设计——新增 处理人
-->

<template>
  <el-dialog
    title="选择处理人"
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
            <el-option v-for="item in delivery.DeliveryWayList" :key="item.Code" :label="item.Name" :value="item.Code">
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

        <div v-show="delivery.DeliveryWay === '3'">
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
      <el-button @click="handleCancelApprover()">取消</el-button>
      <el-button @click="handleSaveApprover()" type="primary">保存</el-button>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  import { dialogFnMixin } from '@/utils/mixin'
  import {
    getApprover,
    saveApprover,
    deliveryWayType,
    getDicByKey
  } from '@/api/approve'
  export default {
    mixins: [dialogFnMixin],
    props: {
      NodeToNodeCode: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        deliveryWayTypeList: [],
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
        ],
        selectNodeValue: '',
        selectTableField: ''
      }
    },
    created () {
    },
    mounted () {
      this._deliveryWayType()
      this._getApprover()
    },
    methods: {
      // 选择更新
      updata (val) {
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
      // 获取处理人
      _getApprover () {
        if (this.NodeToNodeCode) {
          this.loading = true
          getApprover(this.NodeToNodeCode).then(res => {
            if (res.data.State === REQ_OK) {
              this.selectDelivery = res.data.Data
              this.changeData()
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
        }
      },
      // // 类型获取
      // _deliveryWay () {
      //   deliveryWay().then(res => {
      //     if (res.data.State === REQ_OK) {
      //       this.deliveryWayList = res.data.Data
      //     } else {
      //       this.$message({
      //         message: '类型获取失败，请关闭重试！',
      //         type: 'error'
      //       })
      //     }
      //   }).catch(() => {
      //     this.$message({
      //       message: '类型获取失败，请关闭重试！',
      //       type: 'error'
      //     })
      //   })
      // },
      // 选择找人规则
      handleChangeDeliveryWayType (obj) {
        obj.DeliveryWay = ''
        this._getDicByKey(obj)
      },
      // 新增审批类型
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
      // 删除当前审批类型
      handleDelApproverType (index) {
        this.selectDelivery.splice(index, 1)
      },
      // 人员，组织，岗位确认
      selectStructure ($e, index, type) {
        this.currentSelectObj = index
        this.currentSelectType = type
      },
      // 取消处理人
      handleCancelApprover () {
        this.$emit('handleCancelApprover')
      },
      // 保存处理人
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
            // // 所有人
            // case '4':
            //   item.PositionValue = []
            //   item.EmpValue = []
            //   item.OrgValue = []
            //   break
            // // 组织
            // case '1':
            //   item.PositionValue = []
            //   item.EmpValue = []
            //   break
            // // 组织
            // case '16':
            //   item.PositionValue = []
            //   item.EmpValue = []
            //   break
            // // 人员
            // case '3':
            //   item.OrgValue = []
            //   item.PositionValue = []
            //   break
            // // 组织和岗位
            // case '9':
            //   item.EmpValue = []
            //   break
            // // 岗位
            // case '14':
            //   item.EmpValue = []
            //   item.OrgValue = []
            //   break
            // // 角色
            // case '28':
            //   item.EmpValue = []
            //   item.OrgValue = []
            //   break
            // // 角色
            // case '32':
            //   item.EmpValue = []
            //   item.OrgValue = []
            //   break
            // // 职务
            // case '29':
            //   item.EmpValue = []
            //   item.OrgValue = []
            //   break
            // // 职务
            // case '33':
            //   item.EmpValue = []
            //   item.OrgValue = []
            //   break
            // // 组织和角色
            // case '30':
            //   item.EmpValue = []
            //   break
            // // 组织和职务
            // case '31':
            //   item.EmpValue = []
            //   break
            // // 节点
            // case '8':
            //   item.PositionValue = []
            //   item.EmpValue = []
            //   item.OrgValue = []
            //   break
            // // 表单
            // case '5':
            //   item.PositionValue = []
            //   item.EmpValue = []
            //   item.OrgValue = []
            //   break
          }
        })
        let res = this.selectDelivery.map(item => {
          delete item.DeliveryWayList
          return item
        })
        saveApprover(this.NodeToNodeCode, '', JSON.stringify(res)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            setTimeout(() => {
              this.handleCancelApprover()
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
      },
      // 初始化数据处理
      changeData () {
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

<style lang="stylus" rel="stylesheet/stylus">

</style>
