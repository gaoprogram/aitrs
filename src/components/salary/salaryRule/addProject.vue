<template>
  <div class="add-project">
    <el-dialog :title="title"
               :visible.sync="isDialogNotice"
               :before-close="cancel"
               :show-close="false"
               :modal="false"
               center
               fullscreen
               :modal-append-to-body="false"
               style="min-width: 1000px"
    >
      <div class="content">

        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="薪资设置"></el-step>
          <el-step title="薪资项目"></el-step>
          <el-step title="薪资审批人"></el-step>
          <el-step title="运算原理"></el-step>
        </el-steps>
        <set-salary @next="next" @cancel="cancel" v-if="active === 0"></set-salary>
        <set-project @next="next" @pre="pre" @cancel="cancel" :TidArr="TidArr" v-if="active === 1"></set-project>
        <set-approve @next="next" @pre="pre" @cancel="cancel" v-if="active === 2"></set-approve>
        <compute-method @done="done" @pre="pre" @cancel="cancel" v-if="active === 3"></compute-method>
      </div>
    </el-dialog>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { MessageBox } from 'element-ui'
  import SetSalary from '@/components/salary/salaryRule/setSalary'
  import SetProject from '@/components/salary/salaryRule/setProject'
  import SetApprove from '@/components/salary/salaryRule/setApprove'
  import ComputeMethod from '@/components/salary/salaryRule/computeMethod'
  export default {
    data () {
      return {
        title: '新增薪资方案',
        isDialogNotice: true,
        active: 0,
        isLeave: false,
        strJson1: null,
        strJson2: null,
        strJson3: null,
        projectObj: {},
        SchemeCode: '',
        TidArr: []
      }
    },
    created () {
      if (this.$route.query.code) {
        this.title = '编辑薪资方案'
      }
    },
    methods: {
      pre () {
        this.active--
      },
      cancel () {
        MessageBox.confirm('还未保存方案，是否确认离开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.isLeave = true
          this.$router.back()
        }).catch(() => {
        })
      },
      next (arr) {
        if (this.active === 0) {
          this.TidArr = arr
          this.active++
        } else if (this.active === 1) {
          this.active++
        } else if (this.active === 2) {
          this.active++
        }
      },
      done () {
        this.isLeave = true
        this.$router.push({path: '/salary/salaryRule'})
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.isLeave) {
        next()
      } else {
        if (window.confirm('还未保存方案，是否确认离开?')) {
          next()
        } else {
          next(false)
        }
      }
    },
    components: {
      SetSalary,
      SetProject,
      SetApprove,
      ComputeMethod
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .add-project
    .content
      width 964px
      padding 20px
      box-sizing border-box
      margin 0 auto
      box-shadow()
</style>
