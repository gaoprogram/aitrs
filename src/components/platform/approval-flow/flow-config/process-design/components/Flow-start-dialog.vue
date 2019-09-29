<!--
  User: xxxxxxx
  Date: 2018/9/4
  功能：xxxxxx
-->

<template>
  <el-dialog
    title="选择发起人"
    width="600px"
    :visible="true"
    custom-class="dialog-item"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
  >
    <div v-loading="loading">
      <div class="item">
        <span style="display: inline-block;height: 20px;line-height: 20px;">
        所有人员可发起
        </span>
        <el-switch
          style="vertical-align: top;margin-left: 10px"
          v-model="Delivery[0].IsEnable"
          active-color="#3B8BE3"
          inactive-color="#cccccc"
        >
        </el-switch>
      </div>

      <template v-if="!Delivery[0].IsEnable" v-for="item in Delivery">
        <div class="item" v-if="item.DeliveryWay === '1'">
          <span style="display: inline-block;height: 20px;line-height: 20px;">
          按组织发起
          </span>
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="item.IsEnable"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
            @change="handleSwitchFlow(item)"
          >
          </el-switch>

          <div v-show="item.IsEnable">
            <common-select-org title="选择组织" :selectedOrgList="selectedOrgList" @sureOrg="childSureOrg"></common-select-org>
          </div>
        </div>

        <div class="item" v-if="item.DeliveryWay === '3'">
          <span style="display: inline-block;height: 20px;line-height: 20px;">
          按人员发起
          </span>
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="item.IsEnable"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
            @change="handleSwitchFlow(item)"
          >
          </el-switch>

          <div v-show="item.IsEnable">
            <common-select-emp title="选择人员" :selectedEmpList="selectedEmpList" @sureEmp="childSureEmp"></common-select-emp>
          </div>
        </div>

        <div class="item" v-if="item.DeliveryWay === '0'">
          <span style="display: inline-block;height: 20px;line-height: 20px;">
          按岗位发起
          </span>
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="item.IsEnable"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
            @change="handleSwitchFlow(item)"
          >
          </el-switch>

          <div v-show="item.IsEnable">
            <common-select-station title="选择岗位" :selectedPosList="selectedPosList" @surePos="childSurePos"></common-select-station>
          </div>
        </div>

      </template>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelFlowStart()">取消</el-button>
        <el-button @click="handleSaveFlowStarter()" type="primary">保存</el-button>
      </div>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CommonSelectOrg from '@/base/Common-select-org/Common-select-org'
  import CommonSelectEmp from '@/base/Common-select-emp/Common-select-emp'
  import CommonSelectStation from '@/base/Common-select-station/Common-select-station'
  import {
    getFlowStarter,
    saveFlowStarter
  } from '@/api/approve'

  export default {
    props: {
      roleId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        Delivery: [
          {
            'DeliveryWay': '4',
            'IsEnable': false
          },
          {
            'DeliveryWay': '1',
            'DeliveryParas': [],
            'IsEnable': false
          },
          {
            'DeliveryWay': '3',
            'DeliveryParas': [],
            'IsEnable': false
          },
          {
            'DeliveryWay': '0',
            'DeliveryParas': [],
            'IsEnable': false
          }
        ],
        selectedOrgList: [],
        selectedEmpList: [],
        selectedPosList: [],
        loading: false
      }
    },
    created () {
      this.companyApprovalId = this.$route.query.approvalId
    },
    mounted () {
      this._getFlowStarter()
    },
    methods: {
      // 获取发起人
      _getFlowStarter () {
        this.loading = true
        getFlowStarter(this.companyApprovalId, this.roleId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.Delivery = res.data.Data
            this.changeData(res.data.Data)
          } else {
            this.$message({
              message: '发起人加载失败，请重试！',
              type: 'warning'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            message: '发起人加载失败，请重试！',
            type: 'warning'
          })
        })
      },
      // 选择组织确认
      childSureOrg (orglist) {
        this.selectedOrgList = orglist
      },
      // 选择人员确认
      childSureEmp (emplist) {
        this.selectedEmpList = emplist
      },
      // 选择岗位确认
      childSurePos (poslist) {
        this.selectedPosList = poslist
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
      // 取消发起人
      handleCancelFlowStart () {
        this.$emit('handleCancelFlowStart')
      },
      // 保存发起人
      handleSaveFlowStarter () {
        if (!this.Delivery[0].IsEnable && !this.Delivery[1].IsEnable && !this.Delivery[2].IsEnable && !this.Delivery[3].IsEnable) {
          this.$message({
            message: '未选择任何发起人！',
            type: 'warning'
          })
          return
        }
        this.loading = true
        if (this.Delivery[0].IsEnable) {
          this.Delivery[1].DeliveryParas = []
          this.Delivery[2].DeliveryParas = []
          this.Delivery[3].DeliveryParas = []
        } else {
          this.Delivery.forEach(item => {
            if (item.IsEnable && item.DeliveryWay === '1') {
              if (this.selectedOrgList.length) {
                let arr = []
                this.selectedOrgList.forEach(i => {
                  let obj = {
                    Id: i.value,
                    Name: i.label,
                    NodeId: i.nodeId
                  }
                  arr.push(obj)
                })
                item.DeliveryParas = arr
              } else {
                item.DeliveryParas = []
              }
            }
            if (item.IsEnable && item.DeliveryWay === '3') {
              if (this.selectedEmpList.length) {
                let arr = []
                this.selectedEmpList.forEach(i => {
                  let obj = {
                    Id: i.value,
                    Name: i.label,
                    NodeId: i.nodeId
                  }
                  arr.push(obj)
                })
                item.DeliveryParas = arr
              } else {
                item.DeliveryParas = []
              }
            }
            if (item.IsEnable && item.DeliveryWay === '0') {
              if (this.selectedPosList.length) {
                let arr = []
                this.selectedPosList.forEach(i => {
                  let obj = {
                    Id: i.PositionCode,
                    Name: i.PositionName
                  }
                  arr.push(obj)
                })
                item.DeliveryParas = arr
              } else {
                item.DeliveryParas = []
              }
            }
          })
        }
        saveFlowStarter(this.companyApprovalId, this.roleId, JSON.stringify(this.Delivery)).then(res => {
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
              message: '保存失败，请重试！',
              type: 'error'
            })
          }
        })
      },
      // 获取的发起人数据处理
      changeData (data) {
        if (!data[0].IsEnable) {
          data.forEach(i => {
            if (i.DeliveryWay === '1' && i.DeliveryParas.length) {
              let arr = []
              i.DeliveryParas.forEach(item => {
                let obj = {
                  value: item.Id,
                  label: item.Name,
                  nodeId: item.NodeId
                }
                arr.push(obj)
              })
              this.selectedOrgList = arr
            }
            if (i.DeliveryWay === '3' && i.DeliveryParas.length) {
              let arr = []
              i.DeliveryParas.forEach(item => {
                let obj = {
                  value: item.Id,
                  label: item.Name,
                  nodeId: item.NodeId
                }
                arr.push(obj)
              })
              this.selectedEmpList = arr
            }
            if (i.DeliveryWay === '0' && i.DeliveryParas.length) {
              let arr = []
              i.DeliveryParas.forEach(item => {
                let obj = {
                  PositionCode: item.Id,
                  PositionName: item.Name
                }
                arr.push(obj)
              })
              this.selectedPosList = arr
            }
          })
        }
      }
    },
    components: {
      SaveFooter,
      CommonSelectOrg,
      CommonSelectEmp,
      CommonSelectStation
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
