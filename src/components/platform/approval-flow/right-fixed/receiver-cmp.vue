<!--
  User: gaol
  Date: 2019/7/16
  功能： right-fixed 中 当前待处理人 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .receiverContentBox
        .tableBox
            margin-top 30px
            .tit 
                color #000000
                font-size 14px
                font-weight bold
            .table
                min-height 200px
                max-height 500px
                // overflow auto
</style>

<template>
  <div class="receiverContentBox">
    <div class="tableBox">
        <p class="tit">当前待处理人：</p>
        <!-- form.Receiver: {{form.Receiver}} -->
        <!-- flowFunctionRole: {{form.FunctionRole.AttachmentCanUpload}} -->
        <div :class="['table',!form.Receiver.length? 'not_found': '']">
            <el-table
                ref="receiverTable"
                :data="form.Receiver"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%"
                empty-text=" ">

                <!-- <el-table-column
                    type="index"
                    width="50">
                </el-table-column> -->

                <el-table-column
                    property="NodeName"
                    label="节点名">
                </el-table-column>

                <el-table-column
                    property="EmpName"
                    label="办理人员">
                </el-table-column>

                <el-table-column
                    property="DeptName"
                    label="部门">
                </el-table-column>
            </el-table>

            <!--分页--start-->
            <!-- <div class="pagination-container">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryObj.pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="queryObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div> -->
            <!--分页--end-->
        </div>        
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    components: {

    },
    inheritAttrs: false,
    props: {
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      detailTableCode: {
        type: String,
        default: ''
      },
      mainTableCode: {
        type: String,
        default: ''
      },
      commentsList: {
        type: Array,
        default: () => {
          return []
        }
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      workId: {
        type: String,
        default: ''
      },
      nodeId: {
        type: [String,Number],
        default: ''
      },
      currentMainTableObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      currentDetailTableObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
          total: 0,  // 总页数
          queryObj: {
            pageNum: 1,
            pageSize: 10
          }
      }
    },
    computed: {
      ...mapGetters([
        'flowFunctionRole'
      ])
    },
    created () {
      // 获取 常用批示语的 数据

    },
    methods: {
        // 分页--一页展示多少条
        handleSizeChange (val) {
        this.queryObj.pageSize = val
        // this._getFlowTable()
        },
        // 分页--上一页，下一页
        handleCurrentChange (val) {
        this.queryObj.pageNum = val
        // this._getFlowTable()
        },
        // 封装验证数组表单的函数
        //   checkFormArray (formName) { // 封装验证表单的函数
        //     return new Promise((resolve, reject) => {
        //       this.$refs[formName][0].validate((valid) => {
        //         if (valid) {
        //           resolve()
        //         } else {
        //           reject(new Error())
        //         }
        //       })
        //     })
        //   },
    },
    watch: {
      form: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:detailTableList , 并且把值传过去
          console.log('form', newValue, oldValue)
          this.$emit('update:form', newValue)
        },
        deep: true
      }
    }
  }
</script>

