<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：退回
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <div>
      退回节点：
      <el-select v-model="toNodeId" placeholder="请选择" style="width: 344px;margin-bottom: 10px">
        <el-option
          v-for="item in returnInitList"
          :key="item.No"
          :label="item.Name"
          :value="item.No">
        </el-option>
      </el-select>
    </div>
    <div>
      退回原因：
      <el-input v-model="reason" placeholder="请输入内容" type="textarea" style="width: 344px"></el-input>
    </div>

    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_returnBack()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    returnBack,
    returnInit
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
        loading: false,
        returnInitList: [],
        toNodeId: '',
        isBackTracking: 0,
        reason: ''
      }
    },
    created () {
      this._returnInit()
    },
    methods: {
      _returnInit () {
        returnInit(this.flow.WorkId, this.flow.FK_Node).then(res => {
          if (res.data.State === REQ_OK) {
            this.returnInitList = res.data.Data
          }
        })
      },
      _returnBack () {
        if (!this.toNodeId) return this.$message.info('请选择退回节点')
        if (!this.reason) return this.$message.info('请填写原因')
        let filter = this.returnInitList.filter(i => {
          return this.toNodeId === i.No
        })
        this.isBackTracking = filter[0].IsBackTracking
        this.loading = true
        returnBack(this.flow.WorkId, this.flow.FK_Node, this.flow.FK_Flow, this.toNodeId, this.isBackTracking, this.reason).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message.success(res.data.Data)
            this.$emit('success')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('退回失败')
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
