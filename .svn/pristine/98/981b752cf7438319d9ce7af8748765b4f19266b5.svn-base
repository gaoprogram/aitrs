<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：挂起
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <el-radio v-model="hungUpWay" label="0">永远挂起</el-radio>
    <el-radio v-model="hungUpWay" label="1">在指定日自动解除挂起</el-radio>
    <div>
      <el-date-picker
        v-if="hungUpWay === '1'"
        v-model="date"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_hungUp()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    hungUp
  } from '@/api/approve'
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
        hungUpWay: '0',
        date: null,
        node: ''
      }
    },
    methods: {
      // 挂起
      _hungUp () {
        this.loading = true
        hungUp(this.flow.FK_Flow, this.flow.FK_Node, this.flow.WorkId, this.hungUpWay, this.date, this.note).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$emit('success')
            this.$message.success('挂起成功')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('挂起失败')
        })
      },
      handleCancel () {
        this.$emit('DialogCancel')
      }
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
