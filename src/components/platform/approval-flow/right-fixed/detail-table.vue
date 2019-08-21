<!--
  User: xxxxxxx
  Date: 2018/12/5
  功能：right-fixed 中 点击 明细表后的 明细表详情弹框
-->

<template>
  <el-dialog
    title="明细表"
    :visible.sync="dialogTableTemplate"
    width="70%"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="detail-table-dialog"
  >
    <!-- detailTableList： {{detailTableList}} -->
    <!-- attachmentRole： {{attachmentRole}} -->
    <el-tabs
        v-model="currentDetailTableCode" 
        type="border-card" 
        @tab-click="handleClickDetailTableTab">
      <el-tab-pane
        :label="detailTable.Name"
        v-for="detailTable in detailTableList"
        :key="detailTable.DetailTableCode"
        :name="detailTable.DetailTableCode"
      >
        <el-form :model="detailTable" :ref="`detailForm${detailTable.DetailTableCode}`" label-width="0"
                 class="detail-form">

          <div style="width: 100%">
            <el-scrollbar style="width: 100%" :native="false" :noresize="false">
              <div class="content-title">

                <table width="100%">
                  <!-- detailTable.Fields： {{detailTable.Fields}} -->
                  <!--table标题栏---start--->
                  <tr>
                    <th>
                      <div>选择</div>
                    </th>
                    <th v-for="(field, index) in detailTable.Fields" :key="index">
                      <div>{{field.FieldName}}</div>
                    </th>
                  </tr>
                  <!--table标题栏---end--->

                  <!-----table内容区----start--->
                  <tbody>
                    <tr v-for="(value, index) in detailTable.Values" :key="index">
                      <td style="min-width: 50px;text-align: center">
                        <div><el-button type="text" :disabled="!attachmentRole.DetailTableCanDelete" @click="handleDelDetail(index)">删除</el-button></div>
                      </td>
                      <td v-for="(field, i) in value" :key="i">
                        <!-- field.ControlType: {{field.ControlType}} -->
                        <div>
                          <component
                            :is="currentRuleComponent(field.ControlType === '13' ? '6' : field.ControlType)"
                            :prop="'Fields.' + i + '.FieldValue'"
                            :obj.sync="field"
                            :trObj = "value"
                            :tdIndex="i"
                            :trIndex='index'
                            :workId="workId"
                            :nodeId="nodeId"
                            :isTitle="false"
                            :attachmentRole="attachmentRole"
                            @changeEmp="changeOrgDetailCmp"
                          ></component>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <!-----table内容区----end--->
                </table>
              </div>
            </el-scrollbar>
          </div>
        </el-form>

        <!-----新增行btn---start--->
        <template v-if="attachmentRole.DetailTableCanAdd">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleClickAddDetail"
            style="margin-top: 10px">
          </el-button>
        </template>
        <!-----新增行btn---end--->

      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClickCancel">取 消</el-button>
      <el-button type="primary" @click="handleClickSure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { workFlowControlRuleMixin } from '@/utils/mixin'
  export default {
    mixins: [workFlowControlRuleMixin],
    props: {
      detailTableList: {
        type: Array,
        default: () => {
          return []
        }
      },
      workId: {
        type: [Number, String],
        default: ''
      },
      nodeId: {
        type: [Number, String],
        default: ''
      },
      attachmentRole: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        dialogTableTemplate: true
      }
    },
    created () {
      debugger
      console.log(this.detailTableList)
      // 开始时  
      this.currentDetailTableObj = this.detailTableList[0]
      this.currentDetailTableCode = this.currentDetailTableObj.DetailTableCode
    },
    methods: {
      // 点击明细表tab切换
      handleClickDetailTableTab (tab, event) {
        debugger
        this.currentDetailTableObj = this.detailTableList.find(item => {
          return item.DetailTableCode === tab.name
        })
        this.currentDetailTableCode = this.currentDetailTableObj.DetailTableCode
      },
      // 点击增加明细表行数据
      handleClickAddDetail () {
        console.log("-----打印当前的明细表对象-------",this.currentDetailTableObj)
        debugger
        if(this.currentDetailTableObj && this.currentDetailTableObj.Values && !this.currentDetailTableObj.Values.length){
          // 当前该明细表没有行
          let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields]))
          console.log(newRowObj)
          if(this.allDetailTables_copy && this.allDetailTables_copy.length){
            this.allDetailTables_copy.forEach((item, key) => {
              if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode ){
                // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
                if( item.Values && item.Values.length ){
                  // 最初对应的明细表中 有行
                  let  length_start = item.Values.length
                  let  lastRowNo_start = item.Values[length_start-1][0].RowNo 
                  newRowObj.map((item, key) => {
                    item.FieldValue = '',
                    item.RowNo = lastRowNo_start*1 + 1
                  })                 
                }else {
                  // 最初的对应明细表就没有行,此时新增时就直接在现在的明细表最大的一个行号上面加1
                  newRowObj.map((item, key) => {
                    item.FieldValue = ''
                    item.RowNo = 1
                  })
                }
              }else {
                console.log("最初的明细表中 没有找到当前对应的明细表")
              }
            })
          }
          console.log(newRowObj)
          this.currentDetailTableObj.Values.push(newRowObj) 
        }else {
          // 该明细表中 有行
          let length_now = this.currentDetailTableObj.Values.length
          let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Values[length_now-1]]))
          let lastRowNo_now = this.currentDetailTableObj.Values[length_now-1][0].RowNo
          // let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields]))
          console.log(newRowObj)
          // 处理新增的这个数据，将每列的 FieldValue 值清空，将序号 在最新RowNo最大的的数据基础上面 增加1，到时通过 最后一行的行号的比较 来判断是否新增行的验证
          // 此处要特别注意，要比较现在最新的数据中的最后一行的rowNo 和 最开始数据中最后一行的 RowNo 谁大，在大的基础上面 新增的行 行号加1
          if(this.allDetailTables_copy && this.allDetailTables_copy.length){
            this.allDetailTables_copy.forEach((item, key) => {
              if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode ){
                // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
                if( item.Values && item.Values.length ){
                  // 最初对应的明细表中 有行
                  let  length_start = item.Values.length
                  let  lastRowNo_start = item.Values[length_start-1][0].RowNo 
                  if(lastRowNo_now >= lastRowNo_start){
                    // 当前的对应明细表最大的行号 大于等于 开始时的明细表中最大的行号
                    newRowObj.map((item, key) => {
                      item.FieldValue = '',
                      item.RowNo = lastRowNo_now*1 + 1
                    })
                  }else {
                    // 当前的对应明细表最大的行号 小于 开始时的明细表中最大的行号
                    newRowObj.map((item, key) => {
                      item.FieldValue = '',
                      item.RowNo = lastRowNo_start*1 + 1
                    })                    
                  }
                }else {
                  // 最初的对应明细表就没有行,此时新增时就直接在现在的明细表最大的一个行号上面加1
                  newRowObj.map((item, key) => {
                    item.FieldValue = ''
                    item.RowNo = lastRowNo_now*1 + 1
                  })
                }
              }else {
                console.log("最初的明细表中 没有找到当前对应的明细表")
              }
            })
          }
          console.log(newRowObj)
          this.currentDetailTableObj.Values.push(newRowObj) 
        }
      },
      // 删除明细表单行
      handleDelDetail (index) {
        this.$confirm('确认删除此行配置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.currentDetailTableObj.Values.splice(index, 1)
        }).catch(() => {
        })
      },
      // 取消
      handleClickCancel () {
        this.$emit('detailTableCancel')
      },
      // 确定
      handleClickSure () {
        let result = []
        if (this.detailTableList && this.detailTableList.length) {
          this.detailTableList.forEach(item => {
            result.push(this.checkFormArray(`detailForm${item.DetailTableCode}`))
          })
        }
        Promise.all(result).then(() => {
          this.$emit('detailTableSure')
        }).catch(() => {
          this.$message.error('验证失败')
        })
      },
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      },
      changeOrgDetailCmp (prop) {
        this.$refs[`detailForm${this.currentDetailTableCode}`].validateField(prop)
      }
    },
    watch: {
      detailTableList: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:detailTableList , 并且把值传过去
          console.log('detailTableList', newValue, oldValue)
          this.$emit('update:detailTableList', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .detail-table-dialog /deep/
    .border-card
      .el-scrollbar__wrap
        margin-bottom: 0!important
        .el-form-item
          margin-bottom: 0!important


  table {
    border: 1px solid #dfe4ed;
  }

  table tr th {
    padding 10px 0
    border: 1px solid #dfe4ed;
    border-top 2px solid #3b8be3
  }

  table tr td {
    min-width 300px
    padding 20px
    border: 1px solid #dfe4ed;
  }

  table {
    border-collapse: collapse
  }

</style>
