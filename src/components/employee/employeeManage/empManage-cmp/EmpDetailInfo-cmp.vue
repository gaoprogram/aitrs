<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工的 详情页面 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-loading-mask
    top 0 !important
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
        position relative
        width 100%
        z-index 1 !important
</style>
<template>
  <div class="empDetailInfoCmp amimated fadeIn" v-loading="loading">
    <!-- empObj： {{empObj}} -->
    <!--回到顶部的el组件--start--->
    <el-backtop target=".el-dialog.is-fullscreen" :bottom='50' :visibility-height="10"></el-backtop>
    <!--回到顶部的el组件--end--->

    <!--头像区--start-->
    <div class="top">
        <emp-avatar-info-cmp 
            ref="empAvatarInfoCmp"
            :empInfo="empInfo"
            :empObj="empObj">
        </emp-avatar-info-cmp>      
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
        <!-- empObj: {{empObj}} -->
        <!-- allGroupFieldData: {{allGroupFieldData}} -->
        <basic-groupfield-cmp 
            :groupFieldData = 'allGroupFieldData'  
            :empObj="empObj"
            @refreshGroupData="refreshGroupData">            
        </basic-groupfield-cmp>          
    </div>
    <!---引入分组field字段属性组件--end-->    
       
  </div>
</template>

<script type="text/ecmascript-6">
    import EmpAvatarInfoCmp from './EmpAvatarInfo-cmp'
    import EmpTeamGroupCmp from './EmpTeamGroup-cmp'
    import BasicGroupfieldCmp  from './BasicGroupfield-cmp'

    import FieldEditCmp  from './FieldEdit-cmp'
    import OperationLogCmp from './OperationLog-cmp'

    import SaveFooter from '@/base/Save-footer/Save-footer'
    import CommonDialog from './CommonDialog'

    import { REQ_OK } from '@/api/config'
    import { 
        getListTree, 
        teamCodeGetFeild, 
        getEmpFull,
        saveEmpFieldData,
        getEmpInfo
    } from '@/api/employee'

    export default {
    components: {
        EmpAvatarInfoCmp,
        EmpTeamGroupCmp,
        BasicGroupfieldCmp,
        FieldEditCmp,
        SaveFooter,
        OperationLogCmp,
        CommonDialog
    },
    props: {
        //传入的员工对象信息
        empObj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data(){
        return {
            loading: false,  // 控制 整个详情页的loading
            fieldLoading: false, // 控制 field编辑/新增 弹框的 loading
            activeKey: '0', // 默认显示的 当前 的 一级分组
            empInfo:{},   // 员工详情中的相关信息
            groupData: [],   // 传给 分组 组件的 所有分组名称信息集合（一级分组二级分组三级分组的嵌套形式）
            currentFistCatData: {}, // 当前点击的一级分组的数据
            groupFieldData: [], // 传给field 信息组件的集合
            empGroupFieldData: [],  
            addGroupFieldData: {}, // 传给添加字段弹框的数据对象集合
            allGroupFieldData: [], // 所有分组的数据集合
            queryObj:{
                pageNum: 1,  // 页码
                pageSize: 10, // 每页的条数
                total: 0  // 总条数
            } 
        }
    },
    created() {
        debugger
        this._getCommData()

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
                debugger
                let currentFistIndex = this.activeKey * 1
                if(this.groupData[currentFistIndex].Child && this.groupData[currentFistIndex].Child.length){
                    // 如果一级中有child 清空  groupFieldData
                    this._resetGroupFieldData()
                }else {
                    // this._resetGroupFieldData()

                    // 只有一级  根据teamCode 来获取 field
                    // this._getField()

                    // 只有一级时 获取员工所有的字段属性
                    this._getEmpFull()
                }
            }
        }
    },
    methods: {
        _getCommData(){
            // 获取 员工详情相关信息(姓名、职位等)
            this._getEmpInfo()   

            // 获取员工信息的分组信息
            this._getListTree()

            // 获取员工所有field 属性信息
            this._getEmpFull()
        },
        // 获取数据组树形列表
        _getListTree(){
            getListTree().then(res => {
                debugger
                if( res && res.data.State === REQ_OK ){
                    this.groupData = res.data.Data
                    this.queryObj.total = res.data.Total
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取一级分类数据失败err, ${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: `获取一级分类数据出错`
                })
            })
        }, 
        // 获取员工详情中所有的分组的数据结合
        _getEmpFull(){
            debugger
            this.loading = true
            getEmpFull(this.empObj.EmpId).then(res => {
                this.loading = false
                debugger
                if(res && res.data.State === REQ_OK){
                    this.empGroupFieldData = res.data.Data
                    this.allGroupFieldData = res.data.Data
                    // this.queryObj.total = res.data.Total
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取员工所有分类详情信息失败err, ${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: `获取员工所有分类详情信息出错`
                })                    
            })
        },
        // 获取 员工详情信息
        _getEmpInfo(){
            debugger
            getEmpInfo(this.empObj.EmpId).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    debugger
                    // console.log("----获取到的员工信息---",res.data.Data)
                    this.empInfo = res.data.Data
                }else{
                    this.$message.error(`获取员工相关信息失败err,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning(`获取员工相关信息出错`)
            })
        },
        refreshGroupData(){
            this._getCommData()
        },         
        // 根据 teamCode 来获取 单个分类 下的 field集合
        _getField(teamCode){
            return teamCodeGetFeild(teamCode)
        }, 
        emitDeleteSuccess(){
            this._getCommData()
        },
        // 清空 field组件的数据
        _resetGroupFieldData(){
            this.groupFieldData = []
        },        
        // 点击一级分组
        clickGroupFirst(tab,$event){
            debugger     
            let currentFistIndex = this.activeKey * 1
            this.currentFistCatData = this.groupData[currentFistIndex]
            if(this.currentFistCatData.Child && this.currentFistCatData.Child.length){
                //点击的一级分类中有下一级子类

            }else {
                // 没有下一级子类
                // 触发 basic-groupField组件中进行锚点定位
                this.$bus.$emit("anchorPoint", this.currentFistCatData.TeamCode)  
            }
        },
        changeFieldData(data) {
            debugger
            this.groupFieldData = data
        }
    }
    }
</script>
