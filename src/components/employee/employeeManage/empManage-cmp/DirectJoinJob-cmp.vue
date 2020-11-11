<!--
  User: gaol
  Date: 2019/10/22
  功能： 直接入职 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

   
</style>
<template>
  <div class="directJoinJob-cmp" v-loading="loading">
    <!---选择模板select部分--start-->
    <!-- <div class="templateBox">
        <el-button type="text">选择员工模板:</el-button>
        <el-select v-model="value" clearable placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>        
    </div> -->
    <!--选择模板select部分----end--->

    <!---container部分---start-->
    <div class="container">
        <el-tabs v-model="activeCatName" @tab-click="handleClickCat">
            <el-tab-pane
                v-for="(item, index) in tabsData"
                :key="item.EventCode"
                :label="item.EventName"
                :data-eventCode="item.EventCode"
                :name="'' + index"
            >
                <!--引入field组件--start-->
                <basic-groupfield-cmp 
                    :groupFieldData = 'currentTabContent' 
                    @clickAddNewGroup="clickAddNewGroup"
                    @clickEditFieldBtn="clickEditFieldBtn">
                </basic-groupfield-cmp>    

                <!-- <field-edit-cmp 
                    ref="editFieldCmp"
                    :groupFieldData.sync = 'editFieldData' 
                    :isAddField='isEditField'
                    @isSubmit="isSubmit">
                </field-edit-cmp> -->

                <!--引入field组件--end-->    
            </el-tab-pane>
            <!-- <el-tab-pane label="在职记录" name="first">在职记录</el-tab-pane>
            <el-tab-pane label="个人资料" name="second">个人资料</el-tab-pane>
            <el-tab-pane label="合同信息" name="third">合同信息</el-tab-pane>
            <el-tab-pane label="银行信息" name="fourth">银行信息</el-tab-pane> -->
        </el-tabs>  
  
    </div>
    <!--container部分--end--->

    <!--新添加field分组弹框--start--->
    <div class="addNewFieldGroup" v-if="addNewFieldShow">
        <el-dialog
            title="新增分组"
            width="80%"
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
    <div class="editFieldGroup" v-if="editFieldShow">
        <el-dialog
            title="编辑分组"
            width="80%"
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

    <!--footer部分--start-->
    <div class="footer center">
        <el-button type="primary" size="small">取消</el-button>
        <el-button type="primary" size="small">保存模板</el-button>
        <el-button type="primary" size="small">确定,执行</el-button>
    </div>
    <!---footer部分-----end-->
  </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import BasicGroupfieldCmp from './BasicGroupfield-cmp'
    import FieldEditCmp from './FieldEdit-cmp'
    import { 
        directJoinJob, 
        loadEvent,
        execute
    } from '@/api/employee'
    import { mapGetters } from 'vuex'
    import { REQ_OK } from  '@/api/config'
    export default {
        components: {
            SaveFooter,
            BasicGroupfieldCmp,
            FieldEditCmp
        },
        props: {

        },
        data(){
            return {
                loading: false,  // loading状态
                // options: [
                //     {
                //         value: '选项1',
                //         label: '黄金糕'
                //     }, 
                //     {
                //         value: '选项2',
                //         label: '双皮奶'
                //     },
                //     {
                //         value: '选项3',
                //     label: '蚵仔煎'
                //     }, 
                //     {
                //         value: '选项4',
                //         label: '龙须面'
                //     }, 
                //     {
                //         value: '选项5',
                //         label: '北京烤鸭'
                //     }
                // ],
                value: '',
                activeCatName: '0', // 当前tab栏目
                tabsData: [],  // 所有分类的数据
                currentTabContent: [], // 当前分类下的数据
                currentTabIndex: -1, // 当前的tab菜单 的索引
                addNewFieldShow: false, // 控制新增field分组弹框的显示/隐藏
                editFieldShow: false, // 控制 编辑field字段 弹框的显示/隐藏
                currentEditRowObj: {},  // 当前正在编辑的行对象
                currentEditTeamObj: {},  // 当前正在编辑的team对象
                currentAddFieldObj:{},  // 当前正在添加的team对象
                editSaveStrJson: '',  // 编辑保存时的 json字符串  
                editFieldData: {}, // 传给编辑字段弹框的数据对象集合              
            }
        },
        computed: {
            ...mapGetters(['currentPageCode'])
        },
        created() {
            debugger
            // 获取页面事件
            this._getPageEventList()
        },
        watch: {
            value: {
                handler(newValue, oldValue){
                    // 调取接口获取 分类信息
                }
            }
        },
        methods: {
            // 切换分类
            handleClickCat(tab,$event){
                debugger
                this.currentTabIndex = tab.index*1
                // 获取分类下面的数据
                this._getCurrentTabData()
            },
            // 获取分类下面的数据
            _getCurrentTabData(){
                let eventCode = this.tabsData[this.currentTabIndex].EventCode
                loadEvent(eventCode).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.currentTabContent = res.data.Data
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取事件实例失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取事件实例出错'
                    })
                })
            },
            // 获取页面可用事件
            _getPageEventList(){
               directJoinJob(this.currentPageCode).then(res => {
                   debugger
                   if(res && res.data.State === REQ_OK){
                       this.tabsData = res.data.Data
                   }else {
                       this.$message({
                           type: 'error',
                           message: `获取页面可用事件失败，${res.data.Error}`
                       })
                   }
               }).catch(() => {
                   this.$message({
                       type: 'warning',
                       message: '获取页面可用事件出错'
                   })
               })
            },
            clickAddNewGroup(teamData){
                debugger
                // 将 this.groupFieldData 的值 复制一份
                // this.isAddField = true
                // 显示新增分组的弹框
                this.addNewFieldShow = true
                this.currentAddFieldObj = teamData

                this._getCurrentTabData()
                // let TeamCode = teamData.TeamCode
                // if(TeamCode){
                //     // 通过 teamCode来 调取接口 获取增加弹框中的内容
                //     // this._getField(TeamCode).then(res => {
                //     //     debugger
                //     //     if(res && res.data.State === REQ_OK){
                //     //         this.addGroupFieldData = res.data.Data
                //     //     }
                //     // })
                //     this._getCurrentTabData()               
                // }                
            },
            // 编辑field字段            
            clickEditFieldBtn(rowObj, teamObj){
                debugger
                this.currentEditRowObj = rowObj
                this.currentEditTeamObj = teamObj

                this.isEditField = true
                // 显示编辑字段的弹框
                this.editFieldShow = true    
                if(rowObj && rowObj.FieldValueSet && rowObj.FieldValueSet.length){
                    this.editFieldData = rowObj 
                }else {
                    this.editFieldData = {}
                }                             
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
                execute(teamCode, this.editSaveStrJson).then((res) => {
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
                        this._getCurrentTabData()
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
        }
    }
</script>
