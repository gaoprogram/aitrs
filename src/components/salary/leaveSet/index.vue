<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：请假款项
-->

<template>
  <div class="salary-leave-set mg-30">
    <el-card class="box-card">
      <div class="btn-tab">
        <el-select style="width: 120px"
                   class="filter-item"
                   v-model="schemeCode"
                   placeholder="薪资方案"
                   @change="handleSchemeFilter"
        >
          <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>
      </div>
      <div class="amerce-set-container">

        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <template v-for="item in leaveType">
            <el-tab-pane :label="item.Name" :name="item.Id.toString()">
              <div class="header-container">
                <span class="titleText">状态</span>
                <el-switch
                  v-model="nativeStatus"
                  active-text="启用"
                  inactive-text="停用"
                  @change="handleChangeStatus"
                  style="margin-bottom: 5px;margin-left: 30px"
                >
                </el-switch>
              </div>
              <tabset-component
                :relStructList="relStructList"
                :setObj="setObj"
                @save="save"
                @errorMsg="errorMsg"
              >
              </tabset-component>
            </el-tab-pane>
          </template>
        </el-tabs>
        <el-card class="box-card prompt-card" style="margin-bottom: 30px">
          <div slot="header" class="clearfix">
            <span>提示</span>
          </div>
          <div class="text item">
            出差：薪资项目按劳动合同约定标准执行
          </div>
          <div class="text item">
            旷工：劳动法规定，用人单位将不支付旷工期间工资；如事先有约定，也可按劳动合同约定的标准执行。如涉及罚款一般不超过本人月标准工资的20%
          </div>
          <div class="text item">
            事假：劳动法规定，用人单位扣除月基本工资/21.75*事假天数
          </div>
          <div class="text item">
            病假：劳动法规定，用人单位与劳动者无任何约定时，扣除月基本工资/21.75*70%*病假天数。如劳动合同有约定，则按不低于劳动合同约定的标准执行
          </div>
          <div class="text item">
            婚假、产假、丧假、计划生育假、年假、工伤假、哺乳假：劳动法规定，劳动者在假期享受与正常工作期间相同的工资收入。
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getWithdrawingForLeave,
    getSalaryList,
    getRelStructList,
    getOffWorkType,
    updateWithdrawingForLeaveStatus,
    saveWithdrawingForLeave
  } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message, MessageBox } from 'element-ui'
  import { mapGetters } from 'vuex'
  import TabsetComponent from '@/components/salary/leaveSet/tabset-component'

  export default {
    data () {
      return {
        list: [],
        leaveType: [],
        nativeStatus: false,
        schemeCode: '',
        activeName: '',
        relStructList: [],
        archiveList: [],
        setObj: {},
        status: false
      }
    },
    computed: {
      ...mapGetters([
        'loading'
      ])
    },
    created () {
      this._getSalaryList()
      this._getOffWorkType()
    },
    mounted () {
    },
    methods: {
      _getSalaryList () {
        getSalaryList().then(res => {
          if (res.data.State === REQ_OK) {
            this.archiveList = res.data.Data
          } else {
            Message.error('薪资方案列表获取失败，请刷新页面重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          Message.error('薪资方案列表获取失败，请刷新页面重试！')
        })
      },
      _getWithdrawingForLeave () {
        getWithdrawingForLeave(this.schemeCode, this.activeName).then(res => {
          if (res.data.State === REQ_OK) {
            this.setObj = res.data.Data.Function
            if (res.data.Data.Status === 1) {
              this.nativeStatus = true
            } else {
              this.nativeStatus = false
            }
          } else {
            Message.error('请假款项获取失败，请刷新页面重试！')
          }
        })
      },
      _getRelStructList () {
        getRelStructList(this.schemeCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.relStructList = res.data.Data
          } else {
            Message.error('基数列表获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('基数列表获取失败，请刷新页面重试！')
        })
      },
      _getOffWorkType () {
        getOffWorkType().then(res => {
          if (res.data.State === REQ_OK) {
            this.leaveType = res.data.Data
            this.activeName = this.leaveType[0].Id.toString()
          } else {
            Message.error('请假类型获取失败，请刷新页面重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          Message.error('请假类型获取失败，请刷新页面重试！')
        })
      },
      handleSchemeFilter () {
        this._getRelStructList()
        this._getWithdrawingForLeave()
      },
      handleTabClick () {
        this._getWithdrawingForLeave()
      },
      handleChangeStatus () {
        if (this.schemeCode) {
          let code = this.nativeStatus ? 1 : 0
          updateWithdrawingForLeaveStatus(this.schemeCode, this.activeName, code).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('状态更新成功！')
            } else {
              this.nativeStatus = !this.nativeStatus
              Message.error('状态更新失败，请重试！')
            }
          }).catch(() => {
            Message.error('状态更新失败，请重试！')
          })
        } else {
          Message.error('请选择薪资方案！')
        }
      },
      save (obj) {
        obj.A_Type = this.activeName
        MessageBox.confirm('确定保存吗?保存之后，之前的设定将无法恢复。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          saveWithdrawingForLeave(this.schemeCode, JSON.stringify(obj)).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('保存成功！')
              this._getWithdrawingForLeave()
            } else {
              Message.error('保存失败，请重试！')
            }
          }).catch(() => {
            Message.error('保存失败，请重试！')
          })
        })
      },
      errorMsg (text) {
        Message.error(text)
      }
    },
    components: {
      TabsetComponent
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-leave-set
    width 1000px
    margin 0 auto
    .el-card
      margin-top 30px
      .btn-tab
        margin-bottom 10px
        display inline-block
    .prompt-card
      .el-card__header
        padding 10px 20px
        span
          color red
      .item
        margin-bottom 10px
        line-height 1.5
    .header-container
      margin-top 20px
      margin-bottom 20px
      font-weight 600
</style>
