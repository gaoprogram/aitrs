<!--
  User: gaol
  Date: 2019/12/31
  功能： 事件执行列表组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.eventExcuteListCmp
    padding 0 20px
    box-sizing  border-box
</style>

<template>
  <div class="eventExcuteListCmp">
    <div :class="['tableBox', tableData.length<=0 ? 'not_found':'']" v-loading="loading">
        <el-table 
            border
            max-height="500"
            empty-text=" "
            :data="tableData"
        >
            <el-table-column
                label="事件名称"
                prop="name"
            >

            </el-table-column>

            <el-table-column
                label="事件执行"
                prop="value"
            >

            </el-table-column>

            <el-table-column
                label="操作"
            >   
                <template slot-scope="scope">
                    <el-button 
                        type="primary"
                        size="mini"
                        @click.native="handlerExcute(scope.row)"
                    >
                        执行
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>


    <div class="eventHandlerCmpBox" v-if="showEventHandler">
        <el-dialog
            title="企业人事事件处理器"
            width="40%"
            :visible.sync="showEventHandler"
            :close-on-click-modal="false"
            append-to-body
        >
            <personal-event-handler-cmp
                :obj="currentObj"
            ></personal-event-handler-cmp>
        </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import PersonalEventHandlerCmp from './personalEventHandler-cmp'
  export default {
    components: {
      SaveFooter,
      PersonalEventHandlerCmp
    },
    data(){
      return {
        loading: false,
        showEventHandler: false,
        currentObj: {},
        tableData: [
            {
                name: '入职',
                value: '--',
                code: 'empEvent'
            },
            {
                name: '离职',
                value: '--',
                code: 'orgEvent'
            },
            {
                name: '转正',
                value: '--',
                code: 'positionEvent'            
            },
            {
                name: '待入职',
                value: '--',
                code: 'jobEvent'
            }
        ] 
      }
    },
    created(){

    },
    methods:{
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getEmpNoCreateRule()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageIndex = val
            this._getEmpNoCreateRule()
        },  
        handlerExcute(row){
            debugger
            this.currentObj = row
            this.showEventHandler = true
        }           
    }
  }
</script>
