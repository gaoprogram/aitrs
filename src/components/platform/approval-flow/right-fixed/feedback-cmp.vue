<!--
  User: gaol
  Date: 2019/6/17
  功能：显示反馈
-->
<template>
  <div :class="['feedback-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    <!-- 这是 显示 反馈的 页面
    这是 workId ： {{workId}}
    这是minxin中的获取的 显示返回的数据： mixinsDataRes: {{mixinsDataRes}} -->
    <el-table
      :data="mixinsDataRes"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      empty-text=' '>
      <el-table-column
        prop="Content"
        label="反馈内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="CreatorName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="时间">
          <template slot-scope="scope">
            <div>
              {{scope.row.CreateTime | replaceTime}}
            </div>
          </template>        
      </el-table-column>
    </el-table>      
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getForm
  } from '@/api/approve'
  import { flowCommonFnRightFixed } from '@/utils/mixin'
  export default {
    mixins: [flowCommonFnRightFixed],
    components: {},
    data () {
      return {
        mixinsDataRes: [
          // {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄',
          // }, {
          //   date: '2016-05-04',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }, {
          //   date: '2016-05-01',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄',
          // }, {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }
        ]  
      }
    },
    props: {
      workId: {
        type: String,
        default: ''
      },
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      nodeId: {
        type: [String,Number],
        default: ''
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }    
    },
    computed:{
      // ...mapGetters([
      //   'flowCurrentObj'
      // ])
    },
    watch: {
      // form: {
      //   handler (newValue, oldValue) {
      //       debugger
      //       if(newValue){
      //         // form 表单变化后 需要重新获取 评论内容
      //         this._showFeedback()
      //       }
      //   },
      //   immediate: true,
      //   deep: true
      // }
    },
    created () {
      // 获取 显示反馈
      this._showFeedback()
    },
    mounted () {
      console.log(this.mixinsDataRes)
    },
    methods: { 
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  >>>.el-table__body-wrapper
    min-height 350px
  .feedback-container
    min-height 350px
  
</style>
