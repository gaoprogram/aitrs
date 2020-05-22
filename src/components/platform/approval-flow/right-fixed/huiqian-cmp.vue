<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：会签
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <el-tag
      v-for="tag in huiqianList"
      :key="tag.FK_Emp"
      closable
      @close="handleClose(tag.FK_Emp)"
    >
      {{tag.FK_EmpText}}
    </el-tag>
    <span class="footer">
      <el-button @click="handleCancel()">关闭</el-button>
      <!-- <el-button type="primary" @click="">确 定</el-button> -->
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    huiQianInit,
    huiQianDelete
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
        huiqianList: [],
        date: null,
        node: ''
      }
    },
    created () {
      this._huiQianInit()
    },
    methods: {
      // 会签列表
      _huiQianInit () {
        this.loading = true
        huiQianInit(this.flow.WorkId, this.flow.FK_Node).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.huiqianList = res.data.Data
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('获取会签列表失败')
        })
      },
      // 删除会签人员
      _huiQianDelete (empId) {
        this.loading = true
        huiQianDelete(this.flow.WorkId, this.flow.FK_Node, empId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message.success('删除成功')
            this._huiQianInit()
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('删除失败')
        })
      },
      handleClose (empId) {
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._huiQianDelete(empId)
        }).catch(() => {
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
