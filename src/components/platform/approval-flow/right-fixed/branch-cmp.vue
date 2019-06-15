<!--
  User: xxxxxxx
  Date: 2019/6/15
  功能： 显示子流程
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <company-structure-cmp
      title="抄送人员"
      :tabType="['renyuan']"
      :selectedList="emps"
      @upData="updataRen"
    ></company-structure-cmp>
    <company-structure-cmp
      title="抄送岗位"
      :tabType="['gangwei']"
      :selectedList="stations"
      @upData="updataGang"
    ></company-structure-cmp>
    <company-structure-cmp
      title="抄送部门"
      :tabType="['zuzhi']"
      :selectedList="depts"
      @upData="updataZu"
    ></company-structure-cmp>
    <el-input v-model="this.flow.Title" placeholder="请输入标题" type="textarea"></el-input>
    <el-input v-model="doc" placeholder="请输入抄送信息" type="textarea"></el-input>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_cc()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    cc
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
        doc: '',
        loading: false,
        empList: [],
        emps: [],
        depts: [],
        stations: []
      }
    },
    created () {
    },
    methods: {
      // 选择更新
      updataRen (val) {
        if (val.length) {
          this.emps = val.map(item => {
            return {
              Id: item.EmpId,
              Name: item.EmpName
            }
          })
        }
      },
      // 选择更新
      updataGang (val) {
        if (val.length) {
          this.stations = val.map(item => {
            return {
              Id: item.PositionId,
              Name: item.PositionName
            }
          })
        }
      },
      // 选择更新
      updataZu (val) {
        if (val.length) {
          this.depts = val.map(item => {
            return {
              Id: item.NodeId,
              Name: item.Name
            }
          })
        }
      },
      // 抄送
      _cc (val) {
        if (!this.emps.length && !this.depts.length && !this.stations.length) return this.$message.info('未选择任何抄送')
        this.loading = true
        cc(this.flow.WorkId, this.flow.FK_Node, this.flow.Title, this.doc, JSON.stringify(this.emps), JSON.stringify(this.depts), JSON.stringify(this.stations)).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message.success('抄送成功', res.data.Data)
            this.$emit('success')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('抄送失败，请重试！')
        })
      },
      handleCancel () {
        this.$emit('DialogCancel')
      }
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
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
