<!--
  User: gaol
  Date: 2019/5/23
  功能：节点设置——节点表单——发起人
-->

<template>
  <div class="start-emp-container" v-loading="loading">
    <div class="item">
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
    
      <!-- selectDelivery: {{selectDelivery}} -->
      <!----container区域--start-->
      <div
        v-for="(delivery, index) in selectDelivery"
        :key="index"
        style="margin-bottom: 20px;padding-left: 20px;border-top: 1px solid #d8dce5;padding-top: 20px"
      >
         <!-- delivery： {{delivery}} -->
        <!-- delivery.DeliveryWayType： {{delivery.DeliveryWayType}} -->
        <!--dicByKeyList： {{dicByKeyList}}  -->
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
                     v-if="index==0"
                     v-model="delivery.DeliveryWay"
                     style="width:200px;" 
                     placeholder="请先选择找人规则"
          >
            <el-option  v-for="item in dicByKeyList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>

          <el-select class="filter-item"
                    v-if="index!==0"
                    v-model="delivery.DeliveryWay"
                    style="width:200px;" 
                    placeholder="请先选择找人规则"
          >
            <el-option  v-for="item in dicByKeyList_two" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
          <!--第二级下拉选项框--end-->

          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" @click.native.prevent="handleDelApproverType(index)">
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
      <div v-atris-flowRuleScan="{styleBlock:'block'}" style="padding-left: 20px;" v-if="selectDelivery.length < 2">
        <el-button size="small" type="primary" @click.native.prevent="handleAddApproverType()">
          新增
        </el-button>
      </div>
      <!--新增的button---end--->
    </div>
    <!----container区域--end-->



    <div slot="footer" class="dialog-footer">
      <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" @click="handleSaveApprover()" type="primary">保存</el-button>
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
      _starterType () {
        debugger
        starterType().then(res => {
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
      _getDicByKey (code, idx) {
        debugger
        getDicByKey('StarterWay', code).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            if (this.selectDelivery && this.selectDelivery.length > 1) {
              // 发起人 有两种 类型
              if (idx < 1) {
                this.dicByKeyList = res.data.Data
              } else {
                this.dicByKeyList_two = JSON.parse(JSON.stringify(res.data.Data))
              }
            } else if (this.selectDelivery.length <= 1) {
              // 发起人只有一种类型
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
        debugger
        if (this.ruleId) {
          this.loading = true
          getFlowStarter('', this.ruleId).then(res => {
            debugger
            this.loading = false
            if (res.data.State === REQ_OK) {
              debugger
              this.selectDelivery = res.data.Data

              // 初始化开始的数据 
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
          debugger
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
        debugger
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

        this.loading = true
        saveFlowStarter('', this.ruleId, JSON.stringify(this.selectDelivery)).then(res => {
          this.loading = false
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
              message: `保存失败，${res.data.Error}`,
              type: 'error'
            })
          }
        })
      },
      // 初始化数据处理
      changeData (data) {
        debugger
        data.forEach((item, i) => {

          this._getDicByKey(item.DeliveryWayType, i)
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
