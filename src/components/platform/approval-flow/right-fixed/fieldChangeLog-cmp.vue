<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示表单变更日志
-->

<template>
  <div>
    <!-- mainTables: {{mainTables}} -->
    <!-- obj: {{obj}} -->
    <!-- -----------
    currentMainTableIndex: {{currentMainTableIndex}} -->
    <!-- form.FunctionRole: {{currentForm_changeLog.FunctionRole}}
    --------
    attachmentRole.DetailTableCanSeeChangeLog: {{attachmentRole.DetailTableCanSeeChangeLog}}
    -------
    allDetail.length: {{allDetail.length}}
    -----
    form.MainTableInfos.length: {{currentForm_changeLog.MainTableInfos.length}} -->
    <!-- ---- -->
    <!-- flowFunctionRole: {{flowFunctionRole}} -->
    <!---变更日志的明细表tabs标签显示区--start--->
    <div class="detailTableLogTabs" v-if="flowFunctionRole.DetailTableCanSeeChangeLog && allDetail.length && currentForm_changeLog.MainTableInfos.length">
      <el-radio-group v-model="currentDetailTableLogCode">
        <el-radio-button 
            v-for="item in allDetail"
            :label="item.Name"
            :key="item.DetailTableCode"
            :name="item.Name"
            @click.native="clickDetailTableLogTab(item.DetailTableCode)"
            >
        </el-radio-button>
      </el-radio-group>      
      <!-- <el-tabs
        v-model="currentDetailTableLogCode"
        type="card"
        @tab-click="clickDetailTableLogTab">
        <el-tab-pane
          v-for="item in allDetail"
          :key="item.DetailTableCode"
          :label="item.Name"
          :name="item.DetailTableCode"
        >
        </el-tab-pane> 
      </el-tabs> -->
    </div>
    <!---变更日志的明细表tabs标签显示区--end--->      
    <div :class="['fieldChangeLog-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
      <!-- rightContentCurrentStr： {{rightContentCurrentStr}} -->
      <el-table
        :data="mixinsDataRes"
        style="width: 100%"
        empty-text=' '>
        <!-- <el-table-column
          type="index"
          label="序号"
        >
        </el-table-column> -->
        <el-table-column
          prop="NodeName"
          label="节点"
          :show-overflow-tooltip="true"
          width="100"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="EmpName"
          label="操作人"
          :show-overflow-tooltip="true"
          width="120"
          sortable
        >
        </el-table-column>

        <el-table-column
          prop="Message"
          label="修改内容"
          :show-overflow-tooltip="true"
          sortable
        >
        </el-table-column>

        <el-table-column
          prop="CreateDate"
          label="修改时间"
          :show-overflow-tooltip="true"
          width="170"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.CreateDate | replaceTime }}</span>
          </template>      
        </el-table-column>  

        <!-- <el-table-column
          prop="address"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini">查看</el-button>
            <el-button type="text" size="mini">终止</el-button>
          </template>
        </el-table-column>                        -->
      </el-table>  
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryObj.pageNum"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="queryObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryObj.total">
        </el-pagination>
      </div>        
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    cc
  } from '@/api/approve'
  import { flowCommonFnRightFixed } from '@/utils/mixin'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [flowCommonFnRightFixed],
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      attachmentRole: {
        type: Object,
        default: () => {
          return {}
        }
      },
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      workId: {
        type: String,
        default: ''
      },
      nodeId: {
        type: [String,Number],
        default: ''
      },
      // 当前主表对象
      obj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 所有的主表
      mainTables: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 当前主表的 index
      currentMainTableIndex: {
        type: [String, Number],
        default: 0
      } 
    },
    data () {
      return {
        loading: false,
        currentDetailTableLogCode: '',
        allDetail: [],
        currentForm_changeLog: {}
      }
    },
    components: {
    },   
    computed: {
      ...mapGetters([
        'flowFunctionRole'
      ])
    },
    watch: {
      // 主表切换后 会触发
      'obj.TableCode': {
        handler(newValue, oldValue){
          debugger
          // 如果处在当前 显示变更日志页面 且 主表日志设置可见
          if( this.rightContentCurrentStr === 'ShowFormChangeLog' &&
            this.form.FunctionRole.MainTableCanSeeChangeLog ){
            this._showFormChangeLog()
          }
        },
        immediate: true
      },
      // form 变化后
      form: {
        handler(newValue, oldValue){
          debugger
          // 监控父组件中的 form 变化后 子组件中的
          this.currentForm_changeLog = newValue
        },
        deep: true
      }
    }, 
    created () {
      this.currentForm_changeLog = this.form
      // 获取所有 明细表的数据
      this._getAllDetail()
      //获取表单变更日志
      // this._showFormChangeLog()      
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    },    
    methods: {
      // 获取明细表
      _getAllDetail() {
        if(this.form.MainTableInfos && this.form.MainTableInfos.length){
          this.form.MainTableInfos.forEach((item,key) => {
            if(item.DetailTableInfos && item.DetailTableInfos.length){
              item.DetailTableInfos.forEach((item1, key) => {
                this.allDetail.push(item1)
              })
            }
          })
        }
      },
      // 切换明细表tab
      clickDetailTableLogTab (tableCode) {
        debugger
        // console.log(this.currentDetailTableLogCode)
        this._showFormChangeLog(tableCode)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .fieldChangeLog-container
    min-height 200px
    >>>.el-table::before
      height 0 !important    
    .pagination-container
      margin-top 60px
</style>
