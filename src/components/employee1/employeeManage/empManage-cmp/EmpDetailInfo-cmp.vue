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
  <div class="empDetailInfoCmp" v-loading="loading">
    
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
    

    <!--引入分组field字段属性组件(新增)---start-->
    <div class="basicGroupBox">
        <!-- <basic-groupfield-cmp 
            :groupFieldData = 'groupFieldData' 
            @clickAddNewGroup="clickAddNewGroup"
            @emitScanLog="scanLog">
        </basic-groupfield-cmp>   -->

        <basic-groupfield-cmp 
            :groupFieldData = 'allGroupFieldData' 
            @clickAddNewGroup="clickAddNewGroup"
            @clickEditFieldBtn="clickEditFieldBtn"
            @emitScanLog="scanLog">
        </basic-groupfield-cmp>          
    </div>
    <!---引入分组field字段属性组件（新增）--end-->    

    <!---引入查看操作记录组件--start-->
    <div class="scanEditLog" v-if="showScanEditLog">
        <!-- showScanEditLog: {{showScanEditLog}}       -->
        <el-dialog
            title="操作记录"
            width="50%"
            :visible.sync="showScanEditLog"
            append-to-body
            custom-class="scanEditLog"
            :close-on-click-modal="false"
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
            fullscreen
            :visible.sync="addNewFieldShow"
            append-to-body
            custom-class="addNewFieldDialog"
            :close-on-click-modal="false">

            <!----引入basic-field分组组件--start-->
            <div class="basic">
                <!-- <basic-groupfield-cmp 
                    :groupFieldData = 'addGroupFieldData' 
                    :isAddField='isAddField'>
                </basic-groupfield-cmp>   -->

                <field-edit-cmp 
                    ref="editFieldCmp"
                    :groupFieldData.sync = 'addGroupFieldData' 
                    :isAddField='isAddField'
                    @isSubmit="isSubmit">
                </field-edit-cmp>                 
            </div>
            <!----引入basic-field分组组件--end-->
            <!--保存按钮区--start-->
            <save-footer @save="saveAddNewFieldGroup" @cancel="cancelAddNewFieldGroup"></save-footer>
            <!--保存按钮区--end-->     
        </el-dialog>   
    </div>
    <!--新增field分组弹框----end-->  

    <!--编辑field分组弹框--start--->
    <div class="editFieldGroup" v-if="editFieldShow" v-loading = "fieldLoading">
        <el-dialog
            title="编辑分组"
            fullscreen
            :visible.sync="editFieldShow"
            append-to-body
            :close-on-click-modal="false"
            custom-class="editFieldDialog">

            <!----引入basic-field分组组件--start-->
            <div class="basic">
                <field-edit-cmp 
                    ref="editFieldCmp"
                    :groupFieldData.sync = 'editFieldData' 
                    :isAddField='isEditField'
                    @isSubmit="isSubmit">
                </field-edit-cmp>  
            </div>
            <!----引入basic-field分组组件--end-->
            <!--保存按钮区--start-->
            <save-footer @save="saveEditFieldGroup" @cancel="cancelEditFieldGroup"></save-footer>
            <!--保存按钮区--end-->     
        </el-dialog>   
    </div>
    <!--编辑field分组弹框----end-->  



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
            editFieldData: {}, // 传给编辑字段弹框的数据对象集合
            addGroupFieldData: {}, // 传给添加字段弹框的数据对象集合
            allGroupFieldData: [], // 所有分组的数据集合
            addNewFieldShow: false, // 控制新增field分组弹框的显示/隐藏
            editFieldShow: false, // 控制 编辑field字段 弹框的显示/隐藏
            currentEditRowObj: {},  // 当前正在编辑的行对象
            currentEditTeamObj: {},  // 当前正在编辑的team对象
            currentAddFieldObj:{},  // 当前正在添加的team对象
            editSaveStrJson: '',  // 编辑保存时的 json字符串
            isAddField: false,   // 控制 basic 组件中是否 是新增的（新增时 需要显示 动态加载的组件 以便进行编辑修改）
            isEditField: false, // 控制 basic 组件中是否 是编辑的（新增时 需要显示 动态加载的组件 以便进行编辑修改）
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
        // 获取 员工详情相关信息(姓名、职位等)
        this._getEmpInfo()   

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
                    // this._getEmpFull()
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
            this.loading = true
            getEmpFull().then(res => {
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
                    console.log("----获取到的员工信息---",res.data.Data)
                    this.empInfo = res.data.Data
                }else{
                    this.$message.error(`获取员工相关信息失败err,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning(`获取员工相关信息出错`)
            })
        },
        // 根据 teamCode 来获取 单个分类 下的 field集合
        _getField(teamCode){
            return teamCodeGetFeild(teamCode)
        }, 
        // 清空 field组件的数据
        _resetGroupFieldData(){
            this.groupFieldData = []
        }, 
        // 处理 this.editFieldData
        _handlerFieldData(obj){
            return new Promise((resolve, reject) => {
                let data = obj.FieldValueSet || []
                if(data && data.length){
                    let newData = data.map((val, index, data) => {
                        return {
                            FieldCode: val.FieldCode,
                            FieldValue: val.FieldValue
                        } 
                    })
                    this.editSaveStrJson = JSON.stringify(newData)
                    resolve(this.editSaveStrJson)
                }
            })
        }, 
        // 保存编辑的字段属性
        _saveEmpFieldData(type){
            debugger
            this.loading = true
            console.log(this.currentEditRowObj)
            console.log(this.currentEditTeamObj)
            console.log(this.editFieldData)
            let teamCode = ''

            if(type === 1){
                // 编辑
                teamCode = this.currentEditTeamObj.TeamCode
            }else if(type === 2){
                //添加
                teamCode = this.currentAddFieldObj.TeamCode
            }
            debugger
            saveEmpFieldData(teamCode, this.currentEditRowObj.Id, this.editSaveStrJson).then((res) => {
                debugger
                this.loading = false
                if( res && res.data.State === REQ_OK ){
                    // this.$message({
                    //     type: 'sucess',
                    //     message: `保存成功`
                    // })
                    if(type === 1){
                        //编辑保存
                        // 关闭编辑弹框
                        this.editFieldShow = false                        
                    }else if(type === 2){
                        // 添加保存
                        // 关闭添加的弹框
                        this.addNewFieldShow = false
                    }

                    // 刷新 接口
                    this._getEmpFull()
                }else{
                    this.$message({
                        type: 'error',
                        message: `保存失败err,${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: `保存失败err`
                })
            })
        },
        // 新增field 分组
        clickAddNewGroup(teamData){
            debugger
            // 将 this.groupFieldData 的值 复制一份
            this.isAddField = true
            // 显示新增分组的弹框
            this.addNewFieldShow = true
            this.currentAddFieldObj = teamData

            let TeamCode = teamData.TeamCode
            if(TeamCode){
                // 通过 teamCode来 调取接口 获取增加弹框中的内容
                this._getField(TeamCode).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.addGroupFieldData = res.data.Data
                    }
                })

            }
        },
        // 编辑field字段
        clickEditFieldBtn(rowObj, teamObj){
            debugger
            this.currentEditRowObj = rowObj
            this.currentEditTeamObj = teamObj

            this.isEditField = true
            // 显示编辑字段的弹框
            this.editFieldShow = true 

            // this.fieldLoading = true         
            // 根据 teamCode 来调取接口来获取字段完整属性
            // this._getField(teamCode).then(res => {
            //     debugger
            //     this.fieldLoading = false
            //     if(res && res.data.State === REQ_OK){
            //         this.editFieldData = res.data.Data
            //     }else {
            //         this.$message({
            //             type: 'error',
            //             message: `数据获取失败err,${res.data.Error}`
            //         })
            //     }              
            // }).catch(() => {
            //     this.$message({
            //         type: 'error',
            //         message: `数据获取失败err,${res.data.Error}`
            //     })
            // })


            if(rowObj && rowObj.FieldValueSet && rowObj.FieldValueSet.length){
                this.editFieldData = rowObj 
            }else {
                this.editFieldData = {}
            }
        },
        // 查看操作记录
        scanLog() {
            debugger
            this.showScanEditLog = true
        },
        isSubmit(data){
            debugger
            if( data && data[1] ){
                // 验证pass
                this.$message.success("2")
            }else {
                //验证失败
                this.$message.warning("请先填写完整必填项")
            }
        },
        // 保存新增分组
        saveAddNewFieldGroup(){
            // 进行动态表单的校验后
            console.log(this.$refs["editFieldCmp"].$refs["fieldForm"])
            const editData = new Promise((resolve, reject) => {
                debugger
                return this.$refs.editFieldCmp.$refs.fieldForm.validate((valid) => {
                    debugger
                    if(valid){
                        // 验证通过  调取保存的接口进行 编辑的提交
                        resolve(true)
                    }else {
                        //验证没有通过
                        Promise.reject("请先填写完整必填项信息后再保存")
                    }
                })
            })

            // 直接调用 子组件中的提交表单验证方法
            // this.$refs['editFieldCmp'].submitForm()

            debugger
            Promise.all([editData]).then(() => {
                debugger
                // 处理 this.addGroupFieldData 数据
                this._handlerFieldData(this.addGroupFieldData).then(res => {
                    // 调取保存的接口
                    this._saveEmpFieldData(2)
                })
            }).catch(() => {
                //失败
                debugger
                console.log(this.editFieldData)
                this.$message.error("请先填写完整必填项后保存")
            })
        },
        // 取消新增分组
        cancelAddNewFieldGroup(){
            this.addNewFieldShow = false
        },           
        // 保存编辑field分组
        saveEditFieldGroup() {
            // 进行表单校验
            debugger 
            console.log(this.$refs["editFieldCmp"].$refs["fieldForm"])
            const editData = new Promise((resolve, reject) => {
                debugger
                return this.$refs.editFieldCmp.$refs.fieldForm.validate((valid) => {
                    debugger
                    if(valid){
                        // 验证通过  调取保存的接口进行 编辑的提交
                        resolve(true)
                    }else {
                        //验证没有通过
                        Promise.reject("请先填写完整必填项信息后再保存")
                    }
                })
            })

            // 直接调用 子组件中的提交表单验证方法
            // this.$refs['editFieldCmp'].submitForm()

            debugger
            Promise.all([editData]).then(() => {
                debugger
                // 处理 this.editFieldData 数据
                this._handlerFieldData(this.editFieldData).then(res => {
                    // 调取保存的接口
                    this._saveEmpFieldData(1)
                })
            }).catch(() => {
                //失败
                debugger
                console.log(this.editFieldData)
                this.$message.error("请先填写完整必填项后保存")
            })
        },  
        // 取消编辑field分组
        cancelEditFieldGroup() {
            this.editFieldShow = false
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
