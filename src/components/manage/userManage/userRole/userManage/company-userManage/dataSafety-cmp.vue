<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  数据安全组件 【企业】 [已废弃]
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.dataSafetyCmp
    padding 10px 20px 20px 20px
</style>

<template>
    <div class="dataSafetyCmp">
        <!-- obj: {{obj}}
        ---
        permitRightsList: {{permitRightsList}}
        ------
        dataSafetyList: {{dataSafetyList}}   -->
        <div class="u-f-ac u-f-wrap">
            <h3 style="display:inline-block">许可权列表:</h3>
            <span 
                class="marginL10"
                v-for="(item, key) in permitRightsList"
                :key="key"
            >{{item.PermissionName}},</span>
        </div>

        <!-- currentSecurityTypeGroupList: {{currentSecurityTypeGroupList}} -->
        <div class="containerBox marginT10">
            <div class="btnBox" style="text-align:right;marginB5">
                <el-button type="primary" size="mini" @click.native="addNewDataSafety">新增</el-button>
            </div>
            <el-tabs v-model="activeTypeName" type="card" @tab-click="handleTabClick">
                <el-tab-pane 
                    v-for="(dataItem, index) in dataSafetyList"
                    :key="dataItem.SecurityTypeGroupCode"
                    :label="dataItem.SecurityTypeGroupName" 
                    :name="dataItem.SecurityTypeGroupCode"
                ></el-tab-pane>
            </el-tabs>   

            <div class="dataSafetyCard" v-loading= "loading">
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
                        v-for="(config, key) in item.Configs" 
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
                width="40%"
                :visible.sync="showAddNewDataSafetyDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <div style="height: 300px;overflow: auto">
                    <add-safety-dialog-cmp 
                        ref="addSafetyDialogCmp"
                        :obj="obj"
                        @saveTypesInfoSuccess="saveTypesInfoSuccess"
                    ></add-safety-dialog-cmp>
                </div>
                <div class="footerBox">
                    <save-footer @save="saveAdd" @cancel="cancelAdd"></save-footer>
                </div>
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
        getSecurityTypeInfoList
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
        },
        components: {
            SaveFooter,
            AddSafetyDialogCmp
        },
        data(){
            return {
                loading: false, 
                permitRightsList: '',
                dataSafetyList: [],
                activeTypeName: '',
                currentSecurityTypeGroupList: [],
                showAddNewDataSafetyDialog: false,
                addNewDataSafetyObj: {}
            }
        },
        created(){
            this._getComTables()
        },
        computed: {

        },
        watch: {
            activeTypeName:{
                handler(newValue, oldValue){
                    if(newValue){
                        this._getSecurityTypeInfoList()
                    }
                },
                immediate: true
            }
        },
        methods: {
            _getComTables(){
                this._getPermissionList()
                this._getSecurityTypeGroupList()
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
            // 获取数据安全组
            _getSecurityTypeGroupList(){
                getSecurityTypeGroupList(this.obj.PermissionPackageCode).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.dataSafetyList = res.data.Data
                        if(this.dataSafetyList && this.dataSafetyList.length){
                            this.activeTypeName = res.data.Data[0].SecurityTypeGroupCode
                        }
                    }else {
                        this.$message.error(`获取数据安全组数据失败,${res.data.Error}`)
                    }
                })
            },
            // 获取数据安全组下面的类型
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
            // 切换tab
            handleTabClick(tab, event){

            },
            // 新增
            addNewDataSafety(){
                this.showAddNewDataSafetyDialog = true
            },
            //新增保存
            saveAdd(){
                this.$refs.addSafetyDialogCmp.BatchAddSecurityTypeGroup()
            },
            saveTypesInfoSuccess(){
                this.showAddNewDataSafetyDialog = false
                this._getComTables()
            },
            // 新增取消
            cancelAdd(){
                this.showAddNewDataSafetyDialog = false
            }
        }
    }
</script>

