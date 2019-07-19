<!--
  User: gaol
  Date: 2019/6/6
  功能： 流程审批——节点设置——同步
-->

<template>
  <div class="node-sync-container">

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
      <!-- tableData: {{tableData}} -->
      <div class="fieldContentWrap" v-loading="loading">
        <div v-if="tableData && tableData.length" 
              :class="!tableData.length? 'not_found': 'tableContainer'"
              v-for="tableItem in tableData"
              :key="tableItem.tableCode"
        >
          <!-- tableItem.FieldSyncs: {{tableItem.FieldSyncs}} -->
          <div class="tableHead clearfix">
            <p class="fieldName">{{tableItem.TableName}}</p>
            <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" type="primary" size="mini" class="sortBtn" @click.native="sortField(tableItem)">执行顺序</el-button>
          </div>
          <el-table
            :data="tableItem.FieldSyncs"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="FieldName"
              label="字段"
              width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="Explain"
              label="说明"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="InterfaceType"
              label="接口类型"
              width="80">
            </el-table-column>
            <el-table-column
              prop="Logic"
              label="业务逻辑"
              width="240"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if='scope.row.Logic'>
                  {{scope.row.Logic}} 
                </div>
                <div v-else>--</div>
              </template>
            </el-table-column>    
            <el-table-column
              prop="Interface"
              label="接口"
              width="80"
              show-overflow-tooltip>
            </el-table-column> 
            <el-table-column
              prop="BusinessFieldName"
              label="业务字段"
              width="80"
              show-overflow-tooltip>
            </el-table-column>                                                                                                        
            <el-table-column
              prop="EnableSync"
              label="启用同步"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.EnableSync"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>              
            </el-table-column>
          </el-table>             
        </div>
      </div>

      <!--底部保存按钮区域--start-->
      <save-footer @save="handleClickSaveSync" :isCancel="false"></save-footer>
      <!--底部保存按钮区域--end-->

      <!---执行顺序的弹框--start---->
      <div v-if="sortDialogShow">
        <sort-field :tableData ="currentTableData" :sortDialogShow.sync="sortDialogShow" :nodeId="nodeObj.NodeId"></sort-field>
      </div>
      <!---执行顺序的弹框--end---->
  </div>
</template>
<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getSyncSetting, saveSyncSetting } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import SortField from './sync/sort-field'
  import {flowNodeSet} from '@/utils/mixin'
  export default {
    mixins: [flowNodeSet],
    props: {
  
    },
    components: {
      SaveFooter,
      SortField
    },
    data () {
      return {
        loading: false,
        roleRange: '',
        tableData: [
          {
            FieldSyncs: [],
            tableCode: '',
            tableName: ''
          }
        ],
        sortDialogShow: false, // 控制 排序弹框的显示/隐藏
        currentTableData: []   // 当前执行顺序的表的数据
      }
    },
    created () {

    },
    mounted () {
      // 获取支流
      debugger
      this.flowId = this.$route.query.ruleId
      // 获取getRoleRange
      this._getRoleRange().then(res => {
        debugger
        if (res && res.data.State === REQ_OK) {
          this.roleRange = res.data.Data
          // 调用 获取table数据的接口
          this._getSyncField()
        } else {
          this.$message({
            type: 'error',
            message: 'roleRange获取失败err,请刷新后重新'
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: 'roleRange获取失败err,请刷新后重新'
        })
      })
    },
    computed: {

    },
    methods: {
      // 获取 getRoleRange
      _getRoleRange () {
        // this.loading = true
        return getRoleRange('workFlow')
      },
      // 获取同步的表单 数据
      _getSyncField () {
        // console.log(this.nodeObj)
        this.loading = true
        // debugger
        getSyncSetting(this.nodeObj.NodeId, this.roleRange).then((res) => {
          this.loading = false
          if (res && res.data.State === REQ_OK) {
            debugger
            this.tableData = res.data.Data
          } else {
            this.loading = false
            this.$message({
              type: 'error',
              message: '节点同步数据获取失败err,请刷新后重新'
            })
          }
        }).catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '节点同步数据获取失败err,请刷新后重新'
          })
        })
      },
      _saveSyncField () {
        this.loading = true
        saveSyncSetting(this.nodeObj.NodeId, JSON.stringify(this.tableData)).then(res => {
          debugger
          this.loading = false
          if (res && res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '保存失败err,请重试'
          })
        })
      },
      // table中显示 斑马条纹
      tableRowClassName ({row, rowIndex}) {
        if (row.EnableSync) {
          return 'warning-row'
        } else if (!row.EnableSync) {
          return 'success-row'
        }
        return ''
      },
      // 保存同步设置
      handleClickSaveSync () {
        this._saveSyncField()
      },
      // 执行顺序
      sortField (obj) {
        debugger
        this.currentTableData = obj.FieldSyncs
        this.sortDialogShow = true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  >>>.el-table .warning-row 
    background: oldlace
  >>>.el-table .success-row
    background: #f0f9eb
  >>>.el-switch__core
    vertical-align top
  .fieldContentWrap 
    .tableContainer
      margin-bottom 20px
      .tableHead
        height 50px
        line-height 50px
        .fieldName 
          float left
          font-size 16px
          font-weight bold
          color #000000
        .sortBtn
          float right
          margin-top 12px

</style>
