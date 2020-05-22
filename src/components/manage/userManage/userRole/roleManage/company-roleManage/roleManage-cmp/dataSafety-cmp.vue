<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  数据安全组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.dataSafetyCmp
    padding 10px 20px 20px 20px
    .containerBox
        .dataSafetyCard
            min-height 200px
</style>

<template>
    <div class="dataSafetyCmp">
        <!-- obj: {{obj}} -->
        <!-- ---
        permitRightsList: {{permitRightsList}}
        ------
        dataSafetyList: {{dataSafetyList}}   -->
        <div style="line-heiht:16px">
            <span style="font-weight:600;font-size:18px">许可权:</span>
            <span class="marginL10">{{propPermissionPackageName}}</span>
        </div>

        <!-- currentSecurityTypeGroupList: {{currentSecurityTypeGroupList}} -->
        <div class="containerBox marginT10">
            <div class="btnBox marginB5" style="text-align:right;">
                <el-button v-atris-sysManageScan="{'styleBlock':'inline-block'}" type="primary" size="mini" @click.native="addNewDataSafety">新增</el-button>
            </div>
            <!-- activeTypeName: {{activeTypeName}} -->
            <el-tabs 
                v-if="dataSafetyList.length>0"
                v-model="activeTypeName" 
                type="card"
                :closable="!isBatchSafety" 
                @tab-remove="removeTab"
                @tab-click="handleTabClick">
                <el-tab-pane 
                    v-for="(dataItem, idx) in dataSafetyList"
                    :key="dataItem.SecurityTypeGroupCode"
                    :label="dataItem.SecurityTypeGroupName" 
                    :name="dataItem.SecurityTypeGroupCode"
                >
                </el-tab-pane>
            </el-tabs>   

            <div 
                class="dataSafetyCard" 
                :class="currentSecurityTypeGroupList.length<=0? 'not_found':''"
                v-loading= "loading">
                <el-card 
                    class="box-card marginT10" 
                    v-for="(item, index) in currentSecurityTypeGroupList"
                    :key="item.SecurityTypeCode"
                >
                    <div slot="header" class="clearfix">
                        <span>{{item.SecurityTypeName}}</span>
                        <!-- <el-button 
                            style="float: right; 
                            padding: 3px 0" 
                            type="text"
                        >操作按钮</el-button> -->
                    </div>
                    <div 
                        v-if="item.Configs.length"
                        v-for="(config, idx) in item.Configs" 
                        :key="config.SecurityTypeCode" 
                        class="['text','itme', marginT10]">
                        <span 
                            class="tit"
                            style="font-weight:bold;font-size:16px"
                        >{{config.DataRangeType}}:</span>
                        <span 
                            class="value"
                        >{{config.DataValue}}</span>
                    </div>  

                    <div 
                        v-else
                        class="['text','itme']">
                        <span class="tit">暂无数据</span>
                    </div>            
                </el-card>
            </div>        
        </div>

        <!--新增弹框--start-->
        <div class="addNewBox" v-if="showAddNewDataSafetyDialog">
            <el-dialog
                title="新增"
                fullscreen
                :visible.sync="showAddNewDataSafetyDialog"
                append-to-body
                :close-on-click-modal="false"
            >
            <!-- multipleSelection: {{multipleSelection}} -->

                <div style="height: 300px;overflow: auto">
                    <add-safety-dialog-cmp 
                        ref="addSafetyDialogCmp"
                        :obj="obj"
                        :PermissionPackageCode="PermissionPackageCode"
                        @saveTypesInfoSuccess="saveTypesInfoSuccess"
                        @cancelTypes="cancelTypes"
                        @selectLineShow="selectLineShow"
                        @selectLineHide="selectLineHide"
                    ></add-safety-dialog-cmp>
                </div>
                <!-- <div class="footerBox center marginT10 marginB10">
                    <el-button type="primary" size="small" @click.native="cancelAdd">取消</el-button>
                    <el-button type="primary" :disabled="saveBtnDisabled" size="small" @click.native="saveAdd">保存</el-button>
                </div> -->
            </el-dialog>
        </div>
        <!--新增弹框--end-->
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import AddSafetyDialogCmp from './addSafetyDialog-cmp'
    import { 
        getPermissionList,
        getSecurityTypeGroupList,
        ComSecurityTypeGroupList,
        getSecurityTypeInfoList,
        BatchDelSecurityTypeGroup
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            propPermissionPackageName: {
                type: String,
                default: ''
            },
            batchSafetyArr: {
                type: Array,
                default: () => {
                    return []
                }
            },
            // 是否是批量数据安全进来的
            isBatchSafety: {
                type: Boolean,
                default: false
            }
        },
        components: {
            SaveFooter,
            AddSafetyDialogCmp
        },
        data(){
            return {
                loading: false, 
                permitRightsList: '',
                multipleSelection: [],
                saveBtnDisabled: false,
                dataSafetyList: [],
                activeTypeName: '',
                currentSecurityTypeGroupList: [],
                showAddNewDataSafetyDialog: false,
                addNewDataSafetyObj: {},
                currentSecurityTypeGroupCode:''
            }
        },
        created(){
            if(this.isBatchSafety){
                // 批量数据安全进来的
            }else {
                // 数据安全进来的
                this._getComTables()
            }
        },
        computed: {
            PermissionPackageCode(){
                let PermissionPackageCode = ''
                if(this.isBatchSafety){
                    // 批量数据安全
                    if(this.batchSafetyArr.length){
                        this.batchSafetyArr.forEach((item, key) => {
                            if(key != (this.batchSafetyArr.length-1)){
                                PermissionPackageCode += item.PermissionPackageCode + ','
                            }else {
                                PermissionPackageCode += item.PermissionPackageCode
                            }
                        })
                    }
                }else {
                    // 单个数据安全
                    PermissionPackageCode = this.obj.PermissionPackageCode
                }    
                return PermissionPackageCode        
            }
        },
        watch: {
            activeTypeName:{
                handler(newValue, oldValue){
                    if(newValue){
                        // if(!this.isBatchSafety){
                            // 非批量数据安全
                            this._getSecurityTypeInfoList()
                        // }
                    }
                },
                immediate: true
            }
        },
        methods: {
            _getComTables(){
                // this._getPermissionList()
                this._getSecurityTypeGroupList()
                // this._ComSecurityTypeGroupList()
            },
            // 获取权限列表
            _getPermissionList(){
                getPermissionList(this.obj.PermissionPackageCode).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.permitRightsList = res.data.Data
                    }else {
                        this.$message.error(`获取许可权限列表数据失败,${res.data.Error}`)
                    }
                })
            },
            // 初始化时 获取数据安全组
            _getSecurityTypeGroupList(){
                if(this.isBatchSafety){
                    // 批量数据安全
                }else { 
                    // 数据安全
                    getSecurityTypeGroupList(this.PermissionPackageCode).then(res => {
                        debugger
                        if(res && res.data.State === REQ_OK){
                            this.dataSafetyList = res.data.Data
                            if(this.isBatchSafety){
                                // 批量数据安全进来的
                                if(this.dataSafetyList && this.dataSafetyList.length){
                                    this.activeTypeName = res.data.Data[0].SecurityTypeGroupCode
                                }                            
                            }else {
                                // 数据安全进来的
                                if(this.dataSafetyList && this.dataSafetyList.length){
                                    this.activeTypeName = res.data.Data[0].SecurityTypeGroupCode
                                }
                            }
                        }else {
                            this.$message.error(`获取数据安全组数据失败,${res.data.Error}`)
                        }
                    })                    
                }
            },
            // 获取数据安全组
            _ComSecurityTypeGroupList(){
                ComSecurityTypeGroupList(this.currentSecurityTypeGroupCode).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.dataSafetyList = res.data.Data
                        if(this.isBatchSafety){
                            // 批量数据安全进来的
                        }else {
                            // 数据安全 进来的
                            if(this.dataSafetyList && this.dataSafetyList.length){
                                this.activeTypeName = res.data.Data[0].SecurityTypeGroupCode
                            }
                        }                        
                    }else {
                        this.$message.error(`获取数据安全组数据失败,${res.data.Error}`)
                    }
                })
            },            
            // 获取数据安全组下面的类型详情
            _getSecurityTypeInfoList(){
                debugger
                this.loading = true
                getSecurityTypeInfoList(this.activeTypeName).then(res => {
                    debugger
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.currentSecurityTypeGroupList = res.data.Data
                    }else {
                        this.$message.error(`获取安全组类型数据失败,${res.data.Error}`)
                    }
                })
            },
            // 分页--每页多少条
            handleSizeChange (val) {
                this.queryObj.pageSize = val
                this._getComTables()
            },
            // 分页--当前页
            handleCurrentChange (val) {
                this.queryObj.pageNum = val
                this._getComTables()
            },  
            //搜索
            handlerSearch(){

            }, 
            // 删除tab
            _BatchDelSecurityTypeGroup(data, targetName){
                this.loading = true
                BatchDelSecurityTypeGroup(JSON.stringify(data), this.obj.PermissionPackageCode).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("安全组移除成功")
                            this.dataSafetyList = this.dataSafetyList.filter(tab => tab.SecurityTypeGroupCode !== targetName);                            
                            this.currentSecurityTypeGroupCode = this.dataSafetyList[0].SecurityTypeGroupCode
                        if(!this.isBatchSafety){
                            // 批量数据安全     
                            this.activeTypeName = this.currentSecurityTypeGroupCode                                                   
                        }else {
                            // 数据安全
                            // this._getComTables() 
                            this.activeTypeName = this.currentSecurityTypeGroupCode
                            // this._getSecurityTypeInfoList()                           
                        }
                    }else {
                        this.$message.error(`安全组移除失败,${res.data.Error}`)
                    }
                })
            },             
            // 删除tab
            removeTab(targetName, action) {
                debugger
                // if (action === 'add') {
                //     let newTabName = ++this.tabIndex + '';
                //     this.dataSafetyList.push({
                //         title: 'New Tab',
                //         name: newTabName,
                //         content: 'New Tab content'
                //     })
                //     this.editableTabsValue = newTabName
                // }
                let tabs = this.dataSafetyList;
                let deleteTabs = tabs.filter((item, key) => {
                    return item.SecurityTypeGroupCode == targetName
                })    

                // if (action === 'remove') {
                    this.$confirm(`确定要删除"${deleteTabs[0].SecurityTypeGroupName}"吗？`,"提示",{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        // 调取 删除的接口
                        this._BatchDelSecurityTypeGroup(deleteTabs, targetName)
                    }).catch(() => {
                        this.$message.info("删除已取消")
                    })                    
                // }
            },
            // 切换tab
            handleTabClick(tab, event){

            },
            // 新增
            addNewDataSafety(){
                this.showAddNewDataSafetyDialog = true
            },
            //新增保存
            saveAdd(){
                // this.$refs.addSafetyDialogCmp.BatchAddSecurityTypeGroup()
            },
            saveTypesInfoSuccess(SecurityTypeGroupCode, SecurityTypeGroupArr){
                debugger
                this.showAddNewDataSafetyDialog = false
                if(!this.isBatchSafety){
                    // 数据安全
                    if(SecurityTypeGroupArr.length){
                        let flag = this.dataSafetyList.find((item, index) => {
                            return item.SecurityTypeGroupCode == SecurityTypeGroupArr[0].SecurityTypeGroupCode
                        })
                        if(flag){

                        }else {
                            this.dataSafetyList = this.dataSafetyList.concat(SecurityTypeGroupArr)
                        }
                    }
                    this.currentSecurityTypeGroupCode = SecurityTypeGroupCode
                    this.activeTypeName = SecurityTypeGroupCode                    
                    // this._getComTables()
                    // this._getSecurityTypeInfoList()
                }else {
                    // 批量数据安全
                    if(SecurityTypeGroupArr.length){
                        let flag = this.dataSafetyList.find((item, index) => {
                            return item.SecurityTypeGroupCode == SecurityTypeGroupArr[0].SecurityTypeGroupCode
                        })
                        if(flag){

                        }else {
                            this.dataSafetyList = this.dataSafetyList.concat(SecurityTypeGroupArr)
                        }

                        // this.currentSecurityTypeGroupCode = SecurityTypeGroupCode
                        this.activeTypeName = SecurityTypeGroupCode                         
                    }
                }
            },
            cancelTypes(){
                this.showAddNewDataSafetyDialog = false
            },
            selectLineShow(arr){
                this.multipleSelection = arr
                this.saveBtnDisabled = false
            },
            selectLineHide(arr){
                this.multipleSelection = arr
                this.saveBtnDisabled = true
            },            
            // 新增取消
            cancelAdd(){
                this.showAddNewDataSafetyDialog = false
            }
        }
    }
</script>

