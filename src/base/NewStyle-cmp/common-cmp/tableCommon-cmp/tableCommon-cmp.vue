<!--
    User:
    Date: 通用的 table表格组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="newStyle-common-table-cmp">
      <div
        :class="['tableBox', tableData.length<=0? 'not_found':'']"
        v-loading="loading">
        <!-- tableData: {{tableData}} -->
        <!-- -----
        tableHeadData： {{tableHeadData}} -->
        <el-table
          :data="tableData"
          border
          max-height="500px"
          empty-text=" "
          @selection-change="handleSelectionChange"
          :row-key="id"
          :default-expand-all="false"
          :tree-props="{children: 'childrenList', hasChildren: 'hasChildren'}"
        >

          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>


          <template>
            <column-item-cmp
                v-for="(item, key) in tableHeadData"
                :key="key"
                :col="item"
            >
            </column-item-cmp>
          </template>


          <el-table-column
            label="操作"
            width="250"
            fixed="right"
          >
            <template slot-scope="scope">
                <span v-show="scope.row.state == 1">
                    <el-button
                        v-for="(handlerItem, handlerItemIndex) in tableHandlerData"
                        :key="handlerItemIndex"
                        v-if="handlerItem.code != 'using'"
                        type="text"
                        size="mini"
                        @click.native="handlerClickBtn(handlerItem, scope.row, handlerItemIndex, scope.$index)"
                    >
                        {{handlerItem.tit}}
                    </el-button>
                </span>
                <span v-show="scope.row.state == 0">
                    <el-button
                        v-for="(handlerItem, handlerItemIndex) in tableHandlerData"
                        :key="handlerItemIndex"
                        v-if="handlerItem.code != 'stop'"
                        type="text"
                        size="mini"
                        @click.native="handlerClickBtn(handlerItem, scope.row, handlerItemIndex, scope.$index)"
                    >
                        {{handlerItem.tit}}
                    </el-button>
                </span>                
            </template>
          </el-table-column>     
        </el-table>

        <!--分页部分--start--->
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
        <!---分页部分--end--->           
      </div>        
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
import ColumnItemCmp from './columnItem'
export default {
    mixins: [CommonInterfaceMixin],
    props: {
        id: {
            type: String,
            default: () => {
                return 'id'
            }
        },
        multipleSelection: {
            type: Array,
            default: () => {
                return []
            }
        },
        baseKey: {
            type: String, 
            default: () => {
                return ''
            }
        },
        stopOrUsingTitKey: {
            type: String,
            default: () => {
                return ''
            }
        },
        tableHeadData: {
            type: Array,
            default: () => {
                return [
                    {
                        label: '姓名',
                        property: 'name',
                        width: '',
                        sortable: true,
                        lock: false
                    },
                    {
                        label: '年龄',
                        property: 'age',
                        width: 200,
                        sortable: true,
                        lock: true
                    }
                ]
            }
        },
        tableHandlerData: {
            type: Array,
            default: () => {
                return []
            }
        },
        tableData: {
            type: Array,
            default: () => {
                return [
                    {
                        name:'小明',
                    },
                    {
                        age: 18,
                    },                    
                ]
            }
        },
        queryObj: {
            type: Object,
            default: () => {
                return {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                }
            }
        }
    },
    components: {
        SearchToolsCmp,
        ColumnItemCmp
    },
    data() {
        return {
            loading: false,
        }
    },
    created(){
    },
    computed:{
    },
    watch:{
        queryObj: {
            handler(newValue, oldValue){
                this.$emit("update:queryObj", newValue)
            },
            deep: true
        }
    },
    methods:{
        //重新刷新获取数据
        _refreshData(){
            debugger
            this.$emit("refreshTableData")
        },
        // 显示 table表格的loading
        showLoading(){
            this.loading = true
        },
        // 关闭  table表格的loading
        hideLoading(){
            this.loading = false
        },
        // 全选  
        handleSelectionChange(val){
            this.$emit("update:multipleSelection", val)
        },      
        //启用/停用
        handlerStopOrUsing(row){
            debugger
            let statusText = row.state == 1? '停用': '启用'
            let name = row[this.stopOrUsingTitKey] || ''
            let ids = row.id ? [row.id] : []
            let baseKey = this.baseKey
            this.commonSetStatusMixin({
                statusText,
                name,
                ids,
                baseKey
            })
        },
        // 删除
        handlerDelete(row){
            if(row.id){
                let statusText = '删除'
                let name = row[this.stopOrUsingTitKey] || ''
                let ids = row.id ? [row.id] : []
                let baseKey = this.baseKey
                this.commonDeleteListMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }
        },
        // 点击了table表格操作区的按钮
        handlerClickBtn(btn, row, btnIndex, rowIndex){
            debugger
            switch(btn.code){
                case 'stop':
                case 'using':
                  this.handlerStopOrUsing(row, this.baseKey, this.stopOrUsingTitKey)  
                break
                default:
                    this.$emit("commonTableEmitHandler", btn, row)
                break
            }
        },        
        // 分页---每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this.$emit("refreshTableData")
        },
        // 分页 -- 当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this.$emit("refreshTableData")
        },
    }
}
</script>
