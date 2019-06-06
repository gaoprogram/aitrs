<!--
  User: gaol
  Date: 2019/6/6
  功能： 流程审批——节点设置——同步
-->

<template>
  <div class="node-branch-container">

    <!-- 当前对象nodeObj：{{nodeObj}}    -->

    <!-- 当前nodeList: {{nodeList}} -->
    <!--节点属性页面中的 节点切换下拉框，nodeObj为 当前的对象集合从 store中取，在field-set组件中点击属性时存入store的--start-->
    <el-select
      v-model="nodeObj.NodeId"
      placeholder="切换节点"
      size="small"
      @change="_getSyncField()"
      style="margin-bottom: 10px"
    >

      <!---注：nodeList 为 mixin中的 flowNodeSet 公用方法中获取的 nodeList---start--->
      <el-option
        v-for="item in nodeList"
        :key="item.NodeId"
        :label="item.Name"
        :value="item.NodeId">
      </el-option>
    </el-select>
      <!---注：nodeList 为 mixin中的 flowNodeSet 公用方法中获取的 nodeList---end--->

      <div class="fieldContentWrap" v-loading="loading">
        <template>
          <p class="fieldName">表单1</p>
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="date"
              label="字段"
              width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="说明"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="接口类型"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              label="业务逻辑"
              width="240"
              show-overflow-tooltip
              >
            </el-table-column>    
            <el-table-column
              prop="name"
              label="接口"
              width="80">
            </el-table-column> 
            <el-table-column
              prop="name"
              label="业务字段"
              width="80">
            </el-table-column>                                                                                                        
            <el-table-column
              prop="syncBtnValue"
              label="启用同步"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.syncBtnValue"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>              
            </el-table-column>
          </el-table>          
        </template>
      </div>
    <!-- </template> -->

    <save-footer @save="handleClickSaveNodeAttr" :isCancel="false"></save-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { GetNodeTributaryAttr, SaveNodeTributaryAttr } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import {flowNodeSet} from '@/utils/mixin'
  export default {
    mixins: [flowNodeSet],
    props: {
  
    },
    components: {
      SaveFooter
    },
    data () {
      return {
        loading: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          syncBtnValue: false
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          syncBtnValue: true
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          syncBtnValue: true
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          syncBtnValue: false
        }]
      }
    },
    created () {
  
    },
    mounted () {
      // 获取支流
      this.flowId = this.$route.query.ruleId
      this._getSyncField()
    },
    computed: {

    },
    methods: {
      // 获取同步的表单 数据
      _getSyncField () {
  
      },
      // table中显示 斑马条纹
      tableRowClassName ({row, rowIndex}) {
        if (row.syncBtnValue) {
          return 'warning-row'
        } else if (!row.syncBtnValue) {
          return 'success-row'
        }
        return ''
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  >>>.el-table .warning-row 
    background: oldlace
  >>>.el-table .success-row
    background: #f0f9eb
  
  .fieldContentWrap 
    .fieldName 
      font-size 16px
      font-weight bold
      color #000000

</style>
