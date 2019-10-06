<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工的 详情页面 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

.empDetailInfoCmp
    height 100%
    overflow auto
    .top
    .containerCatBox
        min-width 500px
        margin 0 auto
        >>>.el-tabs
            .el-tabs__header
                margin 0 auto
                .el-tabs__nav-wrap
                    .el-tabs__nav-scroll
                        display flex
                        justify-content center
            .el-tabs__content
                padding 10px 
                box-sizing border-box
                // min-height 100px
                // margin-bottom 10px
                // border 1px solid red
    .basicGroupBox
        width 100%
</style>
<template>
  <div class="empDetailInfoCmp" v-loading="loading">
    
    <!--回到顶部的el组件--start--->
    <el-backtop target=".el-dialog.is-fullscreen" :bottom='50' :visibility-height="10"></el-backtop>
    <!--回到顶部的el组件--end--->

    <!--头像区--start-->
    <div class="top">
        <emp-avatar-info-cmp></emp-avatar-info-cmp>      
    </div>
    <!--头像区--end-->

    <!--分组信息展示区--start-->
    <div class="containerCatBox">
        <!-- groupData: {{groupData}} -->
        <!-- activeKey： {{activeKey}} -->
        <!---一级分类---start--->
        <el-tabs v-model="activeKey" @tab-click="clickGroupFirst">
            <el-tab-pane 
                v-for="( team, key ) in groupData" 
                :key="team.TeamCode"
                :label="team.TeamName"
                :name="'' + key"
            >
            <!---引入二级、三级、四级（递归）分类组件---start--->  
            <!-- team: {{team}} -->
            <!-- team.Child: {{team.Child}} -->
            <template v-if="team.Child && team.Child.length">
                <emp-team-group-cmp 
                    :teamGroupData="team.Child"
                    @emitFieldData="changeFieldData">
                </emp-team-group-cmp>
            </template>
            <!---引入二级、三级、四级（递归）分类组件---start--->  
            </el-tab-pane>
        </el-tabs>    
        <!----一级分类---end--->  
    </div>
    <!--分组信息展示区--end-->

    <!--引入分组field字段属性组件---start-->
    <div class="basicGroupBox">
        <basic-groupfield-cmp 
            :groupFieldData = 'groupFieldData' 
            @clickAddNewGroup="clickAddNewGroup"
            @emitScanLog="scanLog">
        </basic-groupfield-cmp>  
    </div>
    <!---引入分组field字段属性组件--end-->    

    <!---引入查看操作记录组件--start-->
    <div class="scanEditLog" v-if="showScanEditLog">
        <!-- showScanEditLog: {{showScanEditLog}}       -->
        <el-dialog
            title="操作记录"
            width="80%"
            :visible.sync="showScanEditLog"
            append-to-body
            custom-class="scanEditLog"
        >
            <operation-log-cmp 
                ref="operationLogCmp"
            >
            </operation-log-cmp>  
        </el-dialog>
    </div>
    <!---引入查看操作记录组件--end-->        

    <!--新添加field分组弹框--start--->
    <div class="addNewFieldGroup" v-if="addNewFieldShow">
        <el-dialog
            title="新增分组"
            width="80%"
            :visible.sync="addNewFieldShow"
            append-to-body
            custom-class="addNewFieldDialog">

            <!----引入basic-field分组组件--start-->
            <div class="basic">
                <basic-groupfield-cmp 
                    :groupFieldData = 'addGroupFieldData' 
                    :isAddField='isAddField'
                    @clickAddNewGroup="clickAddNewGroup">
                </basic-groupfield-cmp>  
            </div>
            <!----引入basic-field分组组件--end-->
            <!--保存按钮区--start-->
            <save-footer @save="saveAddNewFieldGroup" @cancel="cancelAddNewFieldGroup"></save-footer>
            <!--保存按钮区--end-->     
        </el-dialog>   
    </div>
    <!--新增field分组弹框----end-->        
  </div>
</template>

<script type="text/ecmascript-6">
    import EmpAvatarInfoCmp from './EmpAvatarInfo-cmp'
    import  EmpTeamGroupCmp from './EmpTeamGroup-cmp'
    import BasicGroupfieldCmp  from './BasicGroupfield-cmp'
    import OperationLogCmp from './OperationLog-cmp'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import CommonDialog from './CommonDialog'

    import { REQ_OK } from '@/api/config'
    import { getListTree, teamCodeGetFeild, getEmpFull } from '@/api/employee'
    export default {
    components: {
        EmpAvatarInfoCmp,
        EmpTeamGroupCmp,
        BasicGroupfieldCmp,
        SaveFooter,
        OperationLogCmp,
        CommonDialog
    },
    props: {

    },
    data(){
        return {
            loading: false,  
            activeKey: '0', // 默认显示的 当前 的 一级分组
            groupData: [],   // 传给 分组 组件的 数据集合
            currentFistCatData: {}, // 当前点击的一级分组的数据
            groupFieldData: [], // 传给field 信息组件的集合
            empGroupFieldData: [],  
            addNewFieldShow: false, // 控制新增分组的显示/隐藏
            isAddField: false,   // 控制 basic 组件中是否 是新增/编辑的（新增时 需要显示 动态加载的组件 以便进行编辑修改）
            showCommonDialog: true, // 控制通用弹框的显示/隐藏
            showScanEditLog: false, // 控制 查看操作记录的 弹框显示/隐藏
            queryObj:{
                pageNum: 1,  // 页码
                pageSize: 10, // 每页的条数
                total: 0  // 总条数
            } 
        }
    },
    created() {
        debugger
        // 获取员工信息的分组信息
        this._getListTree()
        // 获取员工所有field 属性信息
        this._getEmpFull()
        
        this.$bus.$on("emitEmpDetailInfo_changeField", (data) => {
            debugger
            this.changeFieldData(data)
        })
    },
    beforeDestroy(){
        this.$bus.$off("emitEmpDetailInfo_changeField")
    },
    watch: {
        activeKey: {
            handler(newValue, oldValue){
                let currentFistIndex = this.activeKey * 1
                if(this.groupData[currentFistIndex].Child && this.groupData[currentFistIndex].Child.length){
                    // 如果一级中有child 清空  groupFieldData
                    this._resetGroupFieldData()
                }else {
                    // 只有一级  根据teamCode 来获取 field
                    this._getField()

                    // 只有一级时 获取员工所有的字段属性
                    this._getEmpFull()
                }
            }
        }
    },
    methods: {
        // 获取数据组树形列表
        _getListTree(){
            getListTree().then(res => {
                debugger
                if( res && res.data.State === REQ_OK ){
                    this.groupData = res.data.Data
                    this.queryObj.total = res.data.Total
                }
            //   console.log(res)
            }) 
        }, 
        // 获取员工详情中所有的字段属性
        _getEmpFull(){
            getEmpFull().then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.empGroupFieldData = res.data.Data
                    // this.queryObj.total = res.data.Total
                }
            })
        },
        // 根据 teamCode 来获取 field
        _getField(){
            teamCodeGetFeild(this.currentFistCatData.TeamCode).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.groupFieldData = res.data.Data
                }
            })
        }, 
        // 清空 field组件的数据
        _resetGroupFieldData(){
            this.groupFieldData = []
        },   
        // 新增field 分组
        clickAddNewGroup(){
            debugger
            // 将 this.groupFieldData 的值 复制一份
            this.isAddField = true
            this.addGroupFieldData = JSON.parse(JSON.stringify(this.groupFieldData))
            this.addGroupFieldData[0].FieldName = "xiugai"
            this.addNewFieldShow = true
        },
        // 查看操作记录
        scanLog() {
            debugger
            this.showScanEditLog = true
        },
        // 保存新增分组
        saveAddNewFieldGroup(){
            // 进行动态表单的校验后
            this.addNewFieldShow = false
        },
        // 取消新增分组
        cancelAddNewFieldGroup(){
            this.addNewFieldShow = false
        },           
        // 点击一级分组
        clickGroupFirst(tab,$event){
            debugger     
            let currentFistIndex = this.activeKey * 1
            this.currentFistCatData = this.groupData[currentFistIndex]

            debugger
        },
        // 点击了二级分组
        clickTag( num ){

        },
        changeFieldData(data) {
            debugger
            this.groupFieldData = data
        }
    }
    }
</script>
