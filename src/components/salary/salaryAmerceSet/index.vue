<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：奖惩设定
-->

<template>
  <div class="salary-Amerce-set mg-30">
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
          <el-tab-pane label="迟到管理" name="1">
            <tabset-component
              ref="lateSetRef"
              :relStructList="relStructList"
              :setObj="setObj"
              :status="status"
              @checkWorkSave="checkWorkSave"
              @errorMsg="errorMsg"
              @changeStatus="changeStatus"
            >
            </tabset-component>
          </el-tab-pane>
          <el-tab-pane label="早退管理" name="2">
            <tabset-component
              ref="leaveSetRef"
              :relStructList="relStructList"
              :setObj="setObj"
              :status="status"
              titleText="早退扣款"
              @checkWorkSave="checkWorkSave"
              @errorMsg="errorMsg"
              @changeStatus="changeStatus"
            >
            </tabset-component>
          </el-tab-pane>
          <el-tab-pane label="补卡管理" name="3">
            <fill-card-set-component
              ref="fillCardSetRef"
              :relStructList="relStructList"
              :setObj="setObj"
              :status="status"
              titleText="补卡扣款"
              @checkWorkSave="checkWorkSave"
              @errorMsg="errorMsg"
              @changeStatus="changeStatus"
            >
            </fill-card-set-component>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSalaryList, getRelStructList, saveAmerce, updateAmerceStatus, getAmerce } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message, MessageBox } from 'element-ui'
  import { mapGetters } from 'vuex'
  import TabsetComponent from '@/components/salary/salaryAmerceSet/tabset-component'
  import FillCardSetComponent from '@/components/salary/salaryAmerceSet/fillCardSet-component'

  export default {
    data () {
      return {
        list: [],
        schemeCode: '',
        activeName: '1',
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
      _updateAmerceStatus () {
        updateAmerceStatus().then(res => {
        })
      },
      _getAmerce () {
        getAmerce(this.schemeCode, this.activeName).then(res => {
          if (res.data.State === REQ_OK) {
            this.setObj = res.data.Data.Function
            if (res.data.Data.Status === 1) {
              this.status = true
            } else {
              this.status = false
            }
          } else {
            Message.error('惩奖设定获取失败，请刷新页面重试！')
          }
        })
      },
      handleSchemeFilter () {
        this._getAmerce()
        this._getRelStructList()
      },
      handleTabClick () {
        if (this.schemeCode) {
          this._getAmerce()
          this._getRelStructList()
        } else {
          Message.error('请选择薪资方案！')
        }
      },
      changeStatus (status) {
        if (this.schemeCode) {
          let code = status ? 1 : 0
          updateAmerceStatus(this.schemeCode, this.activeName, code).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('状态更新成功！')
            } else {
              if (this.activeName === '1') {
                this.$refs.lateSetRef.returnStatus()
              }
              if (this.activeName === '2') {
                this.$refs.leaveSetRef.returnStatus()
              }
              Message.error('状态更新失败，请重试！')
            }
          }).catch(() => {
            Message.error('状态更新失败，请重试！')
          })
        }
      },
      checkWorkSave (obj) {
        obj.A_Type = this.activeName
        if (this.schemeCode) {
          MessageBox.confirm('确定保存吗?保存之后，之前的设定将无法恢复。', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            saveAmerce(this.schemeCode, JSON.stringify(obj)).then(res => {
              if (res.data.State === REQ_OK) {
                this._getAmerce()
                Message.success('保存成功！')
              } else {
                Message.error('保存失败，请重试！')
              }
            }).catch(() => {
              Message.error('保存失败，请重试！')
            })
          })
        } else {
          Message.error('请选择薪资方案！')
        }
      },
      errorMsg (text) {
        Message.error(text)
      }
    },
    components: {
      TabsetComponent,
      FillCardSetComponent
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-Amerce-set
    width 1000px
    margin 0 auto
    .el-card
      margin-top 30px
      .btn-tab
        margin-bottom 10px
        display inline-block
</style>
