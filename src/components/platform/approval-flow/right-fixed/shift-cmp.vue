<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：移交弹窗
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <!-- flow:{{flow}} -->
    <company-structure-cmp
      title="选择人员"
      :tabType="['renyuan']"
      :selectedList="empList"
      @upData="updata"
    ></company-structure-cmp>
    <el-input v-model="flowmessage" placeholder="请输入移交意见" type="textarea"></el-input>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_shift()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { mapGetters } from 'vuex'
  import {
    shift
  } from '@/api/approve'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'

  export default {
    components: {
      CompanyStructureCmp
    }, 
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
      },
      // flowEditorContentValue: {
      //   type: String,
      //   default: ''
      // }
    },
    computed: {
      ...mapGetters([
        'flowEditorContentValue'
      ])
    },
    watch: {
      flowEditorContentValue :{
        handler: function (newValue, oldValue){
          this.handleContent(newValue)
        },
        immediate: true
      }
    },
    data () {
      return {
        loading: false,
        empList: [],
        empId: 0,
        flowmessage: ''
      }
    },
    created () {

    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      // this.$bus.$off('saveEmp')
    },    
    methods: {
      // 选择更新
      updata (val) {
        if (val.length > 1) return this.$message.info('移交人员只能选择一个')
        if (val.length) {
          this.empList = [{
            Id: val[0].EmpId,
            Name: val[0].EmpName
          }]
          this.empId = val[0].EmpId
        }
      },
      // 移交
      _shift (val) {
        if (!this.empId) return this.$message.info('请选择移交人员')
        if (!this.flowmessage) return this.$message.info('请填写移交信息')
        this.loading = true
        shift(this.flow.FK_Flow, this.flow.WorkId, this.flow.FK_Node, this.flowmessage, this.empId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message.success(res.data.Data)
            this.$emit('success')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('移交失败，请重试！')
        })
      },
      handleCancel () {
        this.$emit('DialogCancel')
      },
      // 将富文本内容 获取其中的字符串
      handleContent (html) {
        let re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        let msg = html.replace(re1,'');//执行替换成空字符
        this.flowmessage = msg
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
