<template>
  <el-dialog
    title="选择抄送人"
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
        按组织发起
        </span>
        <el-switch
          style="vertical-align: top;margin-left: 10px"
          v-model="ccObj.Cc.CCIsDepts"
          active-color="#3B8BE3"
          inactive-color="#cccccc"
        >
        </el-switch>
        <div v-show="ccObj.Cc.CCIsDepts">
          <common-select-org title="选择组织" :selectedOrgList="selectedOrgList" @sureOrg="sureOrg"></common-select-org>
        </div>
      </div>

      <div class="item">
        <span style="display: inline-block;height: 20px;line-height: 20px;">
        按人员发起
        </span>
        <el-switch
          style="vertical-align: top;margin-left: 10px"
          v-model="ccObj.Cc.CCIsEmps"
          active-color="#3B8BE3"
          inactive-color="#cccccc"
        >
        </el-switch>
        <div v-show="ccObj.Cc.CCIsEmps">
          <common-select-emp title="选择人员" :selectedEmpList="selectedEmpList" @sureEmp="sureEmp"></common-select-emp>
        </div>
      </div>

      <div class="item">
        <span style="display: inline-block;height: 20px;line-height: 20px;">
        按岗位发起
        </span>
        <el-switch
          style="vertical-align: top;margin-left: 10px"
          v-model="ccObj.Cc.CCIsStations"
          active-color="#3B8BE3"
          inactive-color="#cccccc"
        >
        </el-switch>
        <div v-show="ccObj.Cc.CCIsStations">
          <common-select-station title="选择岗位" :selectedPosList="selectedPosList" @surePos="surePos"></common-select-station>
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancelCc()">取消</el-button>
      <el-button @click="handleSaveCc()" type="primary">保存</el-button>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import DicSelect from '@/base/Dic-select/Dic-select'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CommonSelectOrg from '@/base/Common-select-org/Common-select-org'
  import CommonSelectEmp from '@/base/Common-select-emp/Common-select-emp'
  import CommonSelectStation from '@/base/Common-select-station/Common-select-station'
  import {
    getCc,
    saveCc
  } from '@/api/approve'
  export default {
    props: {
      NodeToNodeCode: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        ccObj: {
          Cc: {
            CCIsStations: false,
            CCIsDepts: false,
            CCIsEmps: false
          },
          CcEmp: [],
          CcStation: [],
          CcDept: []
        },
        selectedOrgList: [],
        selectedEmpList: [],
        posVisible: false,
        posDefaultProps: [],
        selectedPosList: [],
        loading: true
      }
    },
    mounted () {
      this._getCc()
    },
    methods: {
      _getCc () {
        getCc(this.NodeToNodeCode, '').then(res => {
          if (res.data.State === REQ_OK) {
            this.ccObj = res.data.Data
            this.changeData(res.data.Data)
            this.loading = false
          } else {
            this.$message({
              message: '抄送人获取失败，请关闭重试！',
              type: 'error'
            })
            this.loading = false
          }
        }).catch(() => {
          console.log('shibai')
          this.$message({
            message: '抄送人获取失败，请关闭重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 选择组织确认
      sureOrg (orglist) {
        this.selectedOrgList = orglist
      },
      // 选择人员确认
      sureEmp (emplist) {
        this.selectedEmpList = emplist
      },
      // 选择岗位确认
      surePos (poslist) {
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
      // 取消抄送人
      handleCancelCc () {
        this.$emit('handleCancelCc')
      },
      // 保存发起人
      async handleSaveCc () {
        if (!this.ccObj.Cc.CCIsDepts && !this.ccObj.Cc.CCIsEmps && !this.ccObj.Cc.CCIsStations) {
          this.$message({
            message: '未选择任何发起人！',
            type: 'warning'
          })
          return
        }
        // 判断岗位是否已选择
        if (this.ccObj.Cc.CCIsStations) {
          if (this.selectedPosList.length) {
            let arr = []
            console.log('pos', this.selectedPosList)
            this.selectedPosList.forEach(item => {
              let obj = {
                FK_Station: item.PositionCode,
                StationName: item.PositionName
              }
              arr.push(obj)
            })
            this.ccObj.CcStation = arr
          } else {
            this.ccObj.CcStation = []
          }
        }
        // 判断组织是否已选择
        if (this.ccObj.Cc.CCIsDepts) {
          if (this.selectedOrgList.length) {
            let arr = []
            console.log('org', this.selectedOrgList)
            this.selectedOrgList.forEach(item => {
              let obj = {
                FK_Dept: item.value,
                DeptName: item.label,
                NodeId: item.nodeId ? item.nodeId + '_' + item.value : item.value
              }
              arr.push(obj)
            })
            this.ccObj.CcDept = arr
          } else {
            this.ccObj.CcDept = []
          }
        }
        // 判断人员是否已选择
        if (this.ccObj.Cc.CCIsEmps) {
          if (this.selectedEmpList.length) {
            let arr = []
            console.log('emp', this.selectedEmpList)
            this.selectedEmpList.forEach(item => {
              let obj = {
                FK_Emp: item.value,
                EmpName: item.label,
                NodeId: item.nodeId
              }
              arr.push(obj)
            })
            this.ccObj.CcEmp = arr
          } else {
            this.ccObj.CcEmp = []
          }
        }
        await saveCc(this.NodeToNodeCode, '', JSON.stringify(this.ccObj)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '保存成功！',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.handleCancelCc()
                this.$emit('refresh')
              }
            })
          } else {
            this.$message({
              message: '保存失败，请重试！',
              type: 'error'
            })
          }
        })
      },
      // 获取的抄送人数据处理
      changeData (data) {
        let org = data.CcDept
        let emp = data.CcEmp
        let station = data.CcStation
        if (org && org.length) {
          let arr = []
          org.forEach(item => {
            let obj = {
              value: item.FK_Dept,
              label: item.DeptName,
              nodeId: item.NodeId
            }
            arr.push(obj)
          })
          this.selectedOrgList = arr
        }
        if (emp && emp.length) {
          let arr = []
          emp.forEach(item => {
            let obj = {
              value: item.FK_Emp,
              label: item.EmpName,
              nodeId: item.NodeId
            }
            arr.push(obj)
          })
          this.selectedEmpList = arr
        }
        if (station && station.length) {
          let arr = []
          station.forEach(item => {
            let obj = {
              PositionCode: item.FK_Station,
              PositionName: item.StationName
            }
            arr.push(obj)
          })
          this.selectedPosList = arr
        }
      }
    },
    components: {
      DicSelect,
      SaveFooter,
      CommonSelectOrg,
      CommonSelectEmp,
      CommonSelectStation
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

