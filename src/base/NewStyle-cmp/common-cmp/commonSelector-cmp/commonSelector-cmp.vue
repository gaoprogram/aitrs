<!--
    User:
    Date:
    功能: 通用选择器组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-table__body-wrapper {
    max-height: 280px !important
    overflow auto !important
}
.common-selector-cmp {
    min-height 500px
}
</style>
<template>
    <div class="common-selector-cmp">
        <el-row :gutter="12">
            <!--left部分---start--->
            <el-col :span="12">
                <!--搜索部分--start-->
                <search-tools-cmp
                    propSearchContentId="commonSelectorCmpId"
                >
                    <div slot="handlerBtnWrap">              
                        <!-- <el-button 
                            type="primary" 
                            size="mini"
                            @click.native="handlerSort"
                        >字段排序</el-button> -->
                    </div>

                    <div slot="moreSearch" class="moreSearch u-f-jst u-f-wrap">
                        <div class="searchItem u-f-jst u-f-ac margin5">
                            <span class="searchTit">关键词:</span>
                            <el-input 
                                clearable
                                size="mini"
                                class="searchCmp"      
                                v-model="queryObj.content"        
                                style="width: 100px"
                            >
                            </el-input>              
                        </div>    

                        <div class="searchItem u-f-jst u-f-ac margin5">
                            <span class="searchTit">模块:</span>            
                            <el-select 
                                clearable
                                filterable
                                size="mini"
                                class="searchCmp"
                                style="width: 100px"
                                v-model="queryObj.groupName"
                            >
                                <el-option
                                    v-for="(item, key) in moduleDataSourceList"
                                    :key="key"
                                    :label="item.name"
                                    :value="item.groupvalue"
                                >
                                </el-option>
                            </el-select>
                        </div>        
                        
                        <div class="searchBtnWrap u-f-ajc">
                            <el-button 
                                type="primary" 
                                size="small"
                                class="u-f-g0 u-f-s0"
                                @click.native="handlerSearch"
                            >搜索</el-button>
                            <el-button 
                                type="primary" 
                                size="small"
                                class="u-f-g0 u-f-s0"
                                @click.native="handlerReset"
                            >重置</el-button>
                        </div>                                   
                    </div>
                </search-tools-cmp> 
                <!---搜索部分---end-->
                <el-card 
                    class="box-card-left"
                    shadow="hover">
                    <div slot="header" class="clearfix">
                        <span style="font-weight:bold;font-size:14px">待选择</span>
                        <el-button style="float: right; padding: 3px 0" type="text">共{{tableDataLeft.length}}项</el-button>
                    </div>    
                    <!-- tableDataLeft: {{tableDataLeft}} -->
                    <div class="list" v-loading="loading">
                        <el-table
                            ref="leftTable"
                            :data="tableDataLeft"
                            @selection-change="leftSelectionChange"
                            style="width: 100%;min-height:300px;max-height: 500px"
                        >

                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>


                            <el-table-column
                                v-for="(item,key) in tableHead" 
                                :key="key"
                                :label="item.label" 
                                :property="item.property"                                
                                :width="item.width"
                                sortable
                                :show-overflow-tooltip="item.showOverflowTooltip"
                            >
                                <template slot-scope="scope">
                                    <!-- scope: {{scope}} -->
                                    <span>{{scope.row[scope.column.property]}}</span> 
                                </template>  
                            </el-table-column>

                        </el-table>
                    </div>
                    <!--分页部分--start--->
                    <div class="pagination-container">
                        <el-pagination
                            @size-change="handleSizeChangeLeft"
                            @current-change="handleCurrentChangeLeft"
                            :current-page.sync="queryObj.pageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="queryObj.pageSize"
                            layout="total, sizes, prev, pager, next"
                            :total="queryObj.total">
                        </el-pagination>
                    </div>
                    <!---分页部分--end--->                    
                </el-card>
            </el-col>
            <!---left部分---end-->

            <!---right部分---START-->
            <el-col :span="12">
                <div class="saveWrap marginB20 clearfix">
                    <el-button
                        style="float:right"
                        type="primary"
                        size="mini"
                        :disabled="tableDataRight.length<=0"
                        @click.native="saveAddCommonSelector"
                    >保存</el-button> 
                </div>

                <el-card
                    class="box-card-right" 
                    shadow="hover"
                >
                    <div slot="header" class="clearfix header">
                        <span style="font-weight:bold;font-size:14px">已选列表</span>
                        <span 
                            style="margin-left:10px;color:red;font-size:12px" 
                            v-if="sortAble"
                        >
                            拖动可排列顺序
                        </span>
                        <el-button style="float: right; padding: 3px 0" type="text">已选{{tableDataRight.length}}项</el-button>
                    </div>    

                    <div class="list">
                        <div class="checkAllBox" v-show="tableDataRight.length>0">
                            全选/取消
                            <span :class="['tit', isSelectedAll_right? 'isSelectedAll_right': '']" @click="selectedAll">
                                <i class="el-icon-check" v-show="rightMultipleSelection.length>0"></i>
                            </span>

                            <el-button 
                                v-show="rightMultipleSelection.length>0"
                                style="float: right;margin-right:10px" 
                                type="primary" 
                                size="mini" 
                                icon="el-icon-delete"
                                @click.native="rightDetachSelected"
                            >
                            移除所选{{rightMultipleSelection.length}}项
                            </el-button>                            
                            
                        </div>
                        <!-- tableDataRight:{{tableDataRight} -->
                        <vuedraggable 
                            v-if="sortAble"
                            class="wrapper" 
                            v-model="tableDataRight"  
                            :options = "{animation:500}"
                        >
                            <transition-group>
                                <div 
                                    class="rightItem"
                                    v-for="(item, index) in tableDataRight" 
                                    :key="index+1"
                                >
                                    <el-menu>
                                        <el-menu-item class="clearfix">
                                            <span :class="['checkBox',item.isSelected? 'isSelected':'']" @click="clickCheckBox(item, index)">
                                                <i class="el-icon-check" v-show="item.isSelected"></i>
                                            </span>
                                            <span><i class="el-icon-menu"></i></span>
                                            <span>{{item.objectname}}</span>
                                            <span class="rt">
                                                <template prop="item">
                                                    <el-button 
                                                        v-if="item.Lock == 0"
                                                        type="primary" 
                                                        size="mini" 
                                                        style="color:#000000"
                                                        @click.native="handleFreeze(item)">
                                                        冻结
                                                    </el-button>
                                                    <el-button 
                                                        v-if="item.Lock == 1"
                                                        type="primary" 
                                                        size="mini" 
                                                        @click.native="handleCancelLock(item)">
                                                        解锁
                                                    </el-button>                                                    
                                                </template>
                                                <template prop="item">
                                                    <el-button 
                                                        v-if="item.Hidden === 1"
                                                        type="warning" 
                                                        size="mini" 
                                                        @click.native="handleShow(item)">
                                                        显示
                                                    </el-button>
                                                    <el-button 
                                                        v-if="item.Hidden === 0"
                                                        type="warning" 
                                                        size="mini" 
                                                        style="color:#000000"
                                                        @click.native="handleHidden(item)">
                                                        隐藏
                                                    </el-button>                                                    
                                                </template>                                                
                                            </span>                                            
                                        </el-menu-item>
                                    </el-menu>

                                </div>
                            </transition-group>              
                        </vuedraggable>

                        <div 
                            v-else
                            class="list" 
                        >
                            <el-table
                                ref="leftTable"
                                :data="tableDataRight"
                                @selection-change="rightSelectionChange"
                                style="width: 100%;min-height: 300px;max-height:500px"
                            >

                                <el-table-column
                                    type="selection"
                                    width="55">
                                </el-table-column>


                                <el-table-column
                                    v-for="(item,key) in tableHead" 
                                    :key="key"
                                    :label="item.label" 
                                    :property="item.property"    
                                    :width="item.width"
                                    sortable
                                    :show-overflow-tooltip="item.showOverflowTooltip"                                                                
                                >
                                    <template slot-scope="scope">
                                        <!-- scope: {{scope}} -->
                                        <span>{{scope.row[scope.column.property]}}</span> 
                                    </template>  
                                </el-table-column>

                            </el-table>
                            <!--分页部分--start--->
                            <!-- <div class="pagination-container">
                                <el-pagination
                                    @size-change="handleSizeChangeRight"
                                    @current-change="handleCurrentChangeRight"
                                    :current-page.sync="queryObjRight.pageIndex"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="queryObjRight.pageSize"
                                    layout="total, sizes, prev, pager, next"
                                    :total="tableDataRight.length">
                                </el-pagination>
                            </div> -->
                            <!---分页部分--end--->                              
                        </div>
                    </div>
                </el-card>
            </el-col>
            <!---right部分---END-->
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import {
    commonSelectorList,
    commonSelectorModuleDataSource
} from '@/api/common'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
import SaveFooter from '@/base/Save-footer/index'
import Vuedraggable from 'vuedraggable'
export default {
    mixins: [CommonInterfaceMixin],
    props: {
        sortAble: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        objP: {
            type: Object,
            default: () => {
                return {}
            }
        },
        propType: {
            type: [String, Number],
            default: () => {
                return ''
            }
        }
    },
    components: {
        SearchToolsCmp,
        SaveFooter,
        Vuedraggable
    },
    data() {
        return {
            loading: false,
            queryObj: {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                content: '',  // 关键词
                groupName: 'userinfo' // 模块
            },
            tableHead: [
                {
                    label: '名称',
                    property: 'objectname',
                    width: '150'
                },
                {
                    label: '子项名称',
                    property: 'objectcode',  
                    width: '150'                  
                },
                {
                    label: '描述',
                    property: 'description',   
                    width: '200',               
                },                
            ],
            tableDataLeft: [],
            tableDataRight: [],
            moduleDataSourceList: [],
            leftMultipleSelection: [],
            rightMultipleSelection:[],
            isSelectedAll_right: false
        }
    },
    created(){
        this.initData()
    },
    computed:{
    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData(){

        },
        initData(){
            this.getComTables()
            this.commonSelectorModuleDataSource()
        },
        handlerSearch(){
            this.getComTables()
        },
        handlerReset(){
            Object.assign(this.queryObj, {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                content: '',  // 关键词
                groupName: '' // 模块                
            })
            this.getComTables()
        },
        commonSelectorModuleDataSource(){
            debugger
            let params = {
                metacode: this.propType
            } 
            commonSelectorModuleDataSource(params).then(res => {
                debugger
                this.moduleDataSourceList = res.data.Data
            })
        },
        getComTables(){
            let params = {
                metacode: this.propType,
                groupName: this.queryObj.groupName,
                content: this.queryObj.content
            }
            this.loading = true
            commonSelectorList(params).then(res => {
                debugger
                this.loading = false
                // alert("5555")
                this.tableDataLeft = res.data.Data.records
                this.queryObj.total = res.data.Data.total
            })
            // alert("44444")
        },
        // 分页左边--一页展示多少条
        handleSizeChangeLeft (val) {
            this.queryObj.pageSize = val
            this.getComTables()
        },
        // 分页 左边--上一页，下一页
        handleCurrentChangeLeft (val) {
            this.queryObj.pageIndex = val
            this.getComTables()
        },   
        // 分页  右边--一页展示多少条
        handleSizeChangeRight (val) {
            this.queryObj.pageSize = val
            // this.getComTables()
        },
        // 分页 右边--上一页，下一页
        handleCurrentChangeRight (val) {
            this.queryObj.pageIndex = val
            // this.getComTables()
        },                   
        // 勾选左边的数据
        leftSelectionChange(val){
            debugger
            this.leftMultipleSelection = val
                // 复制数据给右边表格
            this.tableDataRight = [].concat(JSON.parse(JSON.stringify(this.leftMultipleSelection)))
            // 给 this.tableDataRight 的item 添加一个 是否选中 isSelected 的属性
            if(this.tableDataRight.length){
                this.tableDataRight.forEach((item,i) => {
                    this.$set(item, 'isSelected', false)
                })
            }
            console.log(this.tableDataRight)

        },
        // 勾选右边的数据
        rightSelectionChange(val){
            this.rightMultipleSelection = val
        },
        // 处理排序号
        _handlerSortId(){
            if(this.tableDataRight.length){
                this.tableDataRight.forEach((item,i) => {
                    item.SortId = i
                })
            }
        },  
        // 全选/取消 右边的 列表
        selectedAll(){
            this.isSelectedAll_right = !this.isSelectedAll_right
            if(this.isSelectedAll_right){
                this.tableDataRight.forEach((item, i) => {
                    item.isSelected = true
                })
            }else {
                this.tableDataRight.forEach((item, i) => {
                    item.isSelected = false
                })
            }
        },
        // 单个右边列表 勾选
        clickCheckBox(item, idx){
            debugger
            this.currentCheckIndex = idx
            item.isSelected = !item.isSelected
        },  
        // 右边移除所选(方式一)
        rightDetachSelected(){
            this.$confirm("确定要移除所选项吗？", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.tableDataRight = this.tableDataRight.filter((item,i) => {
                    return !item.isSelected
                })
            }).catch(() => { 
                // 取消移除所有
                this.$message({
                    type: 'info',
                    message: '取消移除所选'
                })
            })
        },
        // 右边移除所选(方式二)
        rightDetachSelected(){
            this.tableDataRight = []
            this.rightMultipleSelection = []
            // this.$confirm("确定要移除所选项吗？", "提示", {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消'
            // }).then(() => {
            //     this.tableDataRight = []
            // }).catch(() => { 
            //     // 取消移除所有
  
            // })
        },        
        // 显示
        handleShow(item){
            debugger
            item.Hidden = 0
        },
        // 隐藏
        handleHidden(item){
            debugger
            item.Hidden = 1
        },
        // 移除
        handleDelete(item){
            this.$confirm("确定要移除吗？","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                debugger
                this.tableDataRight = this.tableDataRight.filter((val, key) => {
                    return val.unicode!== item.unicode 
                })
                // console.log("-----------",this.tableDataRight)
            }).catch(() => {
                // 取消

            })                
        },
        changeRightData(arr){
            if(arr && arr.length){
                arr.forEach(item => {
                    this.$set(item, 'isSystemAdd', 1)
                    this.$set(item, 'controlName', item.objectname)
                })
            }
        },
        saveAddCommonSelector(){
            debugger
            if(!this.tableDataRight.length){
                this.$message({
                    type: 'info',
                    message: '请选择数据后保存'
                })
                return
            }
            this.changeRightData(this.tableDataRight)
            this.$emit("emitSelectorChecked", this.tableDataRight)
        },
        cancelAddCommonSelector(){

        }                                    
    }
}
</script>
