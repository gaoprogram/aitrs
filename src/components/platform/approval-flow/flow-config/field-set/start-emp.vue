<!--
  User: gaol
  Date: 2019/5/23
  功能：节点设置——节点表单——发起人
-->

<template>
  <div class="start-emp-container">
    <div class="item" v-loading="loading">
      <el-select
        v-model="nodeObj.NodeId"
        placeholder="切换节点"
        size="small"
        @change="_getFlowStarter()"
        style="margin-bottom: 10px"
      >
        <el-option
          v-for="item in changeNodeList"
          :key="item.NodeId"
          :label="item.Name"
          :value="item.NodeId">
        </el-option>
      </el-select>
      <span style="display: block;height: 20px;line-height: 20px;margin-bottom: 20px">
      发起人可以选择添加两种类型，生成发起人组
      </span>
    
      <!----container区域--start-->
      <div
        v-for="(delivery, index) in selectDelivery"
        :key="index"
        style="margin-bottom: 20px;padding-left: 20px;border-top: 1px solid #d8dce5;padding-top: 20px"
      >
        <!-- delivery： {{delivery}}
        =====delivery.DeliveryWayType： {{delivery.DeliveryWayType}}
        ++++dicByKeyList： {{dicByKeyList}} -->
        <div style="margin-bottom: 10px">
          <!--第一级下拉选项框--start-->
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWayType"
                     style="width:200px;"
                     @change="handleChangeDeliveryWayType(delivery, index)"
          >
            <el-option v-for="item in deliveryWayTypeList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <!--第一级下拉选项框--end-->

          <!--第二级下拉选项框--start-->
          <!-- delivery.DeliveryWay: {{delivery.DeliveryWay}} -->
          <!-- +++++ -->
          <!-- dicByKeyList: {{dicByKeyList}} -->
          <!-- ___ -->
          <!-- dicByKeyList_two: {{dicByKeyList_two}} -->
          <el-select class="filter-item"
                     v-model="delivery.DeliveryWay"
                     style="width:200px;"
                     placeholder="请先选择找人规则"
          >
            <el-option v-if="index==0" v-for="item in dicByKeyList" :key="item.Code" :label="item.Name" :value="item.Name">
            </el-option>
            <el-option v-if="index!==0" v-for="item in dicByKeyList_two" :key="item.Code" :label="item.Name" :value="item.Name">
            </el-option>
          </el-select>


          <!--第二级下拉选项框--end-->

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

      <!--新增的button---start--->
      <div style="padding-left: 20px;" v-if="selectDelivery.length < 2">
        <el-button size="small" type="primary" @click.native.prevent="handleAddApproverType()">
          新增
        </el-button>
      </div>
      <!--新增的button---end--->
    </div>
    <!----container区域--end-->



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
    getFlowStarter,
    saveFlowStarter,
    starterType,
    getDicByKey
  } from '@/api/approve'
  export default {
    mixins: [dialogFnMixin, flowNodeSet],
    data () {
      return {
        deliveryWayTypeList: [],
        dicByKeyList: [],
        dicByKeyList_two: [], // dicByKeyList 的副本
        deliveryWayList: [],
        // deliveryWayList_two: [],  // deliveryWayList 的副本
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
        // selectDelivery_two: [],  // selectDelivery 的副本
        selectNodeValue: '',
        selectTableField: ''
      }
    },
    computed: {
      changeNodeList () {
        if (this.nodeList && this.nodeList.length) {
          return this.nodeList.filter(item => {
            return item.NodePosType === 0
          })
        }
        return []
      }
    },
    created () {
    },
    mounted () {
      this._starterType()
      this._getFlowStarter()
    },
    methods: {
      // 选择更新
      updata (val) {
        console.log(val)
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
      // 找人规则
      _starterType () {
        starterType().then(res => {
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
      _getDicByKey (code, idx) {
        getDicByKey('StarterWay', code).then(res => {
          if (res.data.State === REQ_OK) {
            if (this.selectDelivery && this.selectDelivery.length > 1) {
              if (idx < 1) {
                this.dicByKeyList = res.data.Data
              } else {
                this.dicByKeyList_two = res.data.Data
              }
            } else if (this.selectDelivery.length <= 1) {
              this.dicByKeyList = res.data.Data
            }
          } else {
            this.$message({
              message: '类型获取失败，请关闭重试！',
              type: 'error'
            })
          }
        })
      },
      // 获取发起人
      _getFlowStarter () {
        if (this.ruleId) {
          this.loading = true
          getFlowStarter('', this.ruleId).then(res => {
            this.loading = false
            if (res.data.State === REQ_OK) {
              this.selectDelivery = res.data.Data

              this.changeData(res.data.Data)
            } else {
              this.$message({
                message: '发起人获取失败，请关闭重试！',
                type: 'error'
              })
            }
          }).catch(() => {
            this.$message({
              message: '发起人获取失败，请关闭重试！',
              type: 'error'
            })
            this.loading = false
          })
        }
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
      handleChangeDeliveryWayType (obj, idx) {
        obj.DeliveryWay = ''
        this._getDicByKey(obj.DeliveryWayType, idx)
      },
      // 新增审批类型
      handleAddApproverType () {
        if (!this.selectDelivery.length) {
          this.selectDelivery.push({
            'DeliveryWayType': '',
            'DeliveryWay': '',
            'DeliveryWay_two': '',
            'OrgValue': [],
            'PositionValue': [],
            'EmpValue': [],
            'TableFieldValue': '',
            'NodeValue': ''
          })
        } else {
          this.selectDelivery.push({
            'DeliveryWayType': '',
            'DeliveryWay': '',
            'DeliveryWay_two': '',
            'OrgValue': [],
            'PositionValue': [],
            'EmpValue': [],
            'TableFieldValue': '',
            'NodeValue': ''
          })
        }
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
      // 关闭发起人弹窗
      handleCancelFlowStart () {
        this.$emit('handleCancelFlowStart')
      },
      // 保存发起人
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
            message: '发起人人不能选择两种同样类型，请求改后再保存！',
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
          }
        })
        saveFlowStarter('', this.ruleId, JSON.stringify(this.selectDelivery)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            setTimeout(() => {
              this.handleCancelFlowStart()
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
        debugger
        data.forEach(item => {
          this._getDicByKey(item.DeliveryWayType)
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

</style>
