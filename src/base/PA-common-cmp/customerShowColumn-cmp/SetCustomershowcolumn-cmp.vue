<!--
  User: gaol
  Date: 2019/10/06
  功能： 自定义显示列 组件
--->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.customerShowColumn-cmp
    padding 10px 20px 
    box-sizing border-box
    .titBox
        width 100%
        line-height 30px
        padding 10px 0
        box-sizing border-box
        .tit   
            font-size 18px
            color #000000
            font-weight bold 
            padding 0 0 10px 0
            box-sizing border-box
        &:after
            display block
            content ''
            width 100%
            height 0
            border-bottom 1px solid silver
    .box-card-left
    .box-card-right
        .header
            height 20px
        .list
            height 300px
            overflow auto
            .checkAllBox
                height 30px
                line-height 30px
                .tit
                    position relative
                    display inline-block
                    vertical-align middle
                    width 12px 
                    height 12px
                    color #ffffff
                    background-color #ffffff
                    border 1px solid #409EFF
                    border-radius 2px
                    &.isSelectedAll_right
                        background-color #409EFF
                    .el-icon-check
                        position absolute 
                        top -1px
            .rightItem
                .el-menu
                    // display flex
                    // justify-content flex-start
                    // margin 5px 0
                    // line-height 56px
                    .el-menu-item
                        width 100%
                        .checkBox
                            display inline-block
                            width 12px 
                            height 12px
                            margin-top 4px
                            color #ffffff
                            background-color #ffffff
                            border 1px solid #409EFF
                            border-radius 2px
                            &.isSelected  
                                background-color #409EFF                                
                            .el-icon-check
                                margin -47px 5px 0 -6px
                                color #ffffff
                                font-size 12px

</style>

<template>
    <div class="customerShowColumn-cmp" v-loading = 'loading'>
        <!-- allboxGroup: {{allboxGroup}} -->
        <!-- --------------------- -->
        <!-- alreadyChecked: {{alreadyChecked}} -->
        <!-- rightMultipleSelection: {{rightMultipleSelection}}
        -------- -->
        <!-- tableDataRight: {{tableDataRight}}
        ------ -->

        <!-- propLeftTableData: {{propLeftTableData}} -->
        <div class="titBox">
            <p class="tit">{{title}}</p>
        </div>

        <el-row :gutter="12">
            <!--left部分---start--->
            <el-col :span="12">
                <el-card 
                    class="box-card-left"
                    shadow="hover">
                    <div slot="header" class="clearfix">
                        <span style="font-weight:bold;font-size:14px">所有表头字段</span>
                        <el-button style="float: right; padding: 3px 0" type="text">共{{tableDataLeft.length}}项</el-button>
                    </div>                    
                    <div class="list">
                        <el-table
                            ref="leftTable"
                            :data="tableDataLeft"
                            @selection-change="leftSelectionChange"
                            style="width: 100%">

                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>


                            <el-table-column
                                v-for="(item,key) in tableHead" 
                                :key="key"
                                :label="item.label" 
                                :property="item.property"                                
                                :fixed="key === 0"
                                >
                                <template slot-scope="scope">
                                    <!-- scope: {{scope}} -->
                                    <span>{{scope.row[scope.column.property]}}</span>
                                    <!-- <span>scope:{{scope.row}}</span>
                                    <span>scope:{{scope.column}}</span> -->
                                </template>                                
                            >

                            </el-table-column>

                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <!---left部分---end-->

            <!---right部分---START-->
            <el-col :span="12">
                <el-card
                    class="box-card-right" 
                    shadow="hover"
                >
                    <div slot="header" class="clearfix header">
                        <span style="font-weight:bold;font-size:14px">已选表头字段</span>
                        <span style="margin-left:10px;color:red;font-size:12px">拖动可排列顺序</span>
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
                                            <span>{{item.FieldName}}</span>
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
                    </div>
                </el-card>
            </el-col>
            <!---right部分---END-->
        </el-row>   

        <!-- <div class="footerBox">
            <save-footer @save="save" @cancel="cancel"></save-footer>
        </div>      -->
    </div>
</template>

<script>
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import Vuedraggable from 'vuedraggable'
    import {
        // saveViewCol
    } from '@/api/employee'
    import { REQ_OK } from '@/api/config'
    let example1=[
        // {
        //     label: '工号',
        //     property: 'empNo'
        // },
        {
            label:'姓名',
            property: 'empName'
        },
        // {
        //     label:'地址',
        //     property:'address'
        // }
    ]

    export default {
        props:{
            // 标题
            title:{
                type: String,
                default: '设置表头字段'
            },
            // 表头
            tableHeadProp: {
                type: Array,
                default: () => {
                    return example1
                }
            },
            allboxGroup: {
                type: Array,
                default: () => {
                    return []
                }
            },
            alreadyChecked: {
                type: Array,
                default: () => {
                    return []
                }
            },
            // 
            propLeftTableData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            pageCode: {
                type: [String,Number],
                default: () => {
                    return ''
                }
            },
            tableCode: {
                type: [String,Number],
                default: () => {
                    return ''
                }
            }    
        },
        components: {
            SaveFooter,
            Vuedraggable
        },
        data(){
            return {
                loading: false, // 控制loading的显示/隐藏
                // tableHead: this.tableHeadProp, 
                tableHead: [
                    {
                        label: '名称',
                        property: 'FieldName'
                    }
                ], 
                tableDataLeft: [], // 左边所有的数据
                tableDataRight: [],  // 右边部分的数据集合
                leftMultipleSelection: [],  // 左边已经选取的数据集合
                rightMultipleSelection: [],  // 右边已经选取的数据集合
                currentCheckIndex: -1, // 右边列表当前 勾选的索引
                isSelectedAll_right: false, // 右边列表是否全选标识
            }
        },
        created(){
            // 处理 allboxGroup  和 alreadyChecked
            this._initData()
        },
        watch: {
            tableDataRight: {
                handler(newValue, oldValue){
                    this.rightMultipleSelection = []
                    this.tableDataRight.forEach((item, i) => {
                        if(item.isSelected){
                            this.rightMultipleSelection.push(item)
                        }
                    })
                    if(this.rightMultipleSelection.length && this.tableDataRight.length){
                        if(this.rightMultipleSelection.length === this.tableDataRight.length){
                            this.isSelectedAll_right = true
                        }else {
                            this.isSelectedAll_right = false
                        }
                    }
                },
                deep: true
            }
        },
        methods: { 
            // 处理 allboxGroup  和 alreadyChecked
            _initData(){
                debugger
                if(this.allboxGroup && this.allboxGroup.length){
                    this.tableDataLeft = this.allboxGroup.map((item, key) => {
                        return item
                    })
                    console.log(this.tableDataLeft)
                }
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
            //保存
            async save(){
                debugger
                // 处理一下 this.tableDataRight 中的 每一项 的 SortId
                await this._handlerSortId()
                this.$emit("emitSave", this.tableDataRight)
                
                // this.loading = true
                // saveViewCol(this.pageCode, this.tableCode, JSON.stringify(this.tableDataRight)).then(res => {
                //     debugger
                //     this.loading = false
                //     if(res && res.data.State === REQ_OK){
                //         this.$message.success("保存成功")
                //         this.$emit("emitSave")
                //     }else {
                //         this.$message({
                //             type: 'error',
                //             message: `保存失败，${res.data.Error}`
                //         })
                //     }
                // }).catch(() => {
                //     debugger
                //     this.$message({
                //         type: 'warning',
                //         message: '保存数据出错'
                //     })
                // })
            },
            // 取消
            cancel(){

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
            // 冻结
            handleFreeze(item){
                this.$confirm("确定要冻结吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    item.Lock = 1
                }).catch(() => {
                    // 取消
                    this.$message({
                        type: 'info',
                        message: '取消冻结成功'
                    })
                })
            },
            // 解冻
            handleCancelLock(item) {
                this.$confirm("确定要解除冻结吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    item.Lock = 0
                }).catch(() => {
                    // 取消
                    this.$message({
                        type: 'info',
                        message: '取消冻结成功'
                    })
                })                
            },
            // 右边移除所选
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
                        return val.FieldCode!==item.FieldCode 
                    })
                    // console.log("-----------",this.tableDataRight)
                }).catch(() => {
                    // 取消
                    this.$message({
                        type: 'info',
                        message: '已取消移除成功'
                    })
                })                
            }
        }
    }
</script>

