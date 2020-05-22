<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：加签弹窗
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <company-structure-cmp
      title="选择人员"
      :tabType="['renyuan']"
      :selectedList="empList"
      @upData="updata"
    ></company-structure-cmp>
    <div>
      加签模式：
      <el-select v-model="askforHelpSta" placeholder="请选择" style="width: 344px">
        <el-option
          v-for="item in askforHelpStaList"
          :key="item.Code"
          :label="item.Name"
          :value="item.Code">
        </el-option>
      </el-select>
    </div>

    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_askfor()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    askfor,
    askforHelpSta
  } from '@/api/approve'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  export default {
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      flow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: '',
        loading: false,
        empList: [],
        empId: 0,
        askforHelpStaList: [],
        askforHelpSta: '',
        reason: ''
      }
    },
    created () {
      this._askforHelpSta()
    },
    methods: {
      // 选择更新
      updata (val) {
        if (val.length > 1) return this.$message.info('人员只能选择一个')
        if (val.length) {
          this.empList = [{
            Id: val[0].EmpId,
            Name: val[0].EmpName
          }]
          this.empId = val[0].EmpId
        }
      },
      _askforHelpSta () {
        askforHelpSta().then(res => {
          if (res.data.State === REQ_OK) {
            this.askforHelpStaList = res.data.Data
          }
        })
      },
      // 加签
      _askfor () {
        if (!this.empId) return this.$message.info('请选择人员')
        if (!this.askforHelpSta) return this.$message.info('请选择加签模式')
        this.loading = true
        askfor(this.flow.WorkId, this.flow.FK_Node, this.empId, this.askforHelpSta, this.reason).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: res.data.Data
            })
            this.$emit('success')
          } else {
            this.$message({
              type: 'error',
              message: res.data.Error
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '加签失败，请重试！'
          })
        })
      },
      handleCancel () {
        this.$emit('DialogCancel')
      }        
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      this.$bus.$off('saveEmp')
    },
    components: {
      CompanyStructureCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-component-container
    .footer
      display block
      margin-top 20px
      text-align center
</style>
