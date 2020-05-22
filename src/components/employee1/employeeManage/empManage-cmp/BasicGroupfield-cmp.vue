<!--
  User: gaol
  Date: 2019/9/25
  功能： 基础分组 field 信息组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.basic-groupfield-cmp
    width 100%
    min-height 100px
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-around
    align-items flex-start
    align-content space-around
    .teamItem
        position relative
        width 100%
        min-height 150px
        margin-bottom 10px
        padding 10px
        box-sizing border-box
        display flex
        justify-content space-around
        align-content flex-start
        flex-direction row
        flex-wrap wrap
        .addNewGroupBox
            position absolute
            top 10px 
            right 50px
            &:hover 
                cursor pointer
                color #409EFF
        >>>.el-card__header
            width 100% !important 
            .teamHead
                .tit 
                    font-size 14px
                    font-weight bold
                    color #303133
        >>>.el-card__body
            width 100% !important
            .collapsed
                // margin-bottom -30px
            .teamRowBox
                display flex
                justify-content flex-start
                flex-wrap wrap
                align-items flex-start
                align-content space-around
                .teamRow
                    width 100%
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
                    margin-bottom 10px 
                    padding 10px 
                    opacity 1
                    transition all 2s
                    box-sizing border-box
                    .rowHeadBox
                        position relative
                        height 30px
                        line-height 30px
                        .edit 
                            // position absolute 
                            // top 0 
                            // right 140px
                        .scanEditLog
                            // text-align right
                            // float right
                            // position absolute 
                            // top 0 
                            // right 50px
                        .leftRightBox
                            // position absolute
                            // top 10px
                            // right 10px
                            .lt
                                font-size 16px
                                &:hover 
                                    cursor pointer
                                    color #409EFF
                            .rt
                                font-size 16px
                                &:hover
                                    cursor pointer
                                    color #409EFF                    
                    &.isHide
                        height 0
                        opacity 0
                        margin 0
                        padding 0
                        overflow hidden
                    .el-form
                        .listItemBox
                            // width 48%
                            margin 5px
                            display flex
                            flex-direction row
                            justify-content flex-start
                            flex-wrap wrap
                            align-items flex-start
                            .listItem
                                width 48%
                                padding 5px
                                box-sizing border-box
                                flex-grow 1
                                .itemBox 
                                    padding 5px 
                                    box-sizing border-box-sizing 
                                    .name
                                        font-weight bold
                                        color #606266
                                    .value
                                        color #909399
                                &:after
                                    display block
                                    content ''
                                    width 100%
                                    height 1px
                                    background-color #EBEEF5
                                    .name 
                                    .value
                                        color red
</style>
<template>
    <div :class="['basic-groupfield-cmp', groupFieldData.length<=0? 'not_found': '']"  v-loading="loading">
        <!-- groupFieldData: {{groupFieldData}} -->
        <!-- ----- -->
        <!-- isAddField: {{isAddField}} -->
        <!-- empObj: {{empObj}} -->
        <el-card 
            :id="`teamItem_${team.TeamCode}`"
            :class="['teamItem', !team.Rows.length? 'not_found':'']"
            v-for="(team, key) in groupFieldData" 
            :key="team.TeamCode"
            :data-TeamCode="team.TeamCode"
            @click="clickTeam"
        >
            <!--field为展开或者收起-start-->
            <div 
                class="collapsed"
                v-if="team.Rows.length"
            >
                <span @click="handleCollapsed(team)">
                    <el-button type="text" sizi="mini" v-if="team.Collapsed">展开</el-button>
                    <el-button type="text" sizi="mini" v-else>收起</el-button>
                </span>
            </div>
            <!--field为展开或者收起--end-->

            <!--el-card field Head区域--start-->
            <div slot="header" class="teamHead clearfix">
                <span class="tit">{{team.TeamName}}</span>
                
                <!--增加分组区--start--->
                <!---有行时,根据Multiple 来确定是否可以新增--->
                <!-- team: {{team}} -->
                <span v-if="team.Rows && team.Rows.length">
                    <span 
                        v-if="team.Multiple === 1"
                        class="addNewGroupBox"
                        style="float: right; padding: 3px 0" 
                        @click= "clickAddNewGroup(team)"
                    >
                        <i class="el-icon-circle-plus-outline"></i>
                    </span>                    
                </span>
                <!--没有行时是允许添加的-->
                <span v-else>
                    <span 
                        class="addNewGroupBox"
                        style="float: right; padding: 3px 0" 
                        @click= "clickAddNewGroup(team)"
                    >
                        <i class="el-icon-circle-plus-outline"></i>
                    </span>
                </span>

                <!----增加分组区----end--->      

                       
            </div> 
            <!--el-card--field Head区域--end-->           

            <!---el-card-field  cardBody区域---start--->
            <div class="teamRowBox" v-loading="teamBoxLoading">
                <!-- row: {{row}} -->
                <div 
                    :class="['teamRow', 'clearfix', team.Collapsed ? 'isHide': '']"
                    v-for="(row, index) in team.Rows"
                    :key="row.Id"
                >
                    <div class="rowHeadBox u-f-ac u-f-jfd">

                        <!--编辑btn---start-->
                        <div class="edit">
                            <el-button 
                                type="primary" 
                                size="mini" 
                                @click.native="handleEdit(team, row)"
                            >编辑</el-button>
                        </div>
                        <!---编辑btn--end-->    

                        <!--查看操作记录---start-->
                        <div class="scanEditLog marginL5">
                            <el-button 
                                type="primary" 
                                size="mini" 
                                @click.native="scanEditLog"
                            >查看记录</el-button>
                        </div>
                        <!---查看操作记录--end-->   

                        <!--删除btn---start-->
                        <div class="delete marginL5">
                            <el-button 
                                type="primary" 
                                size="mini" 
                                @click.native="handleDelete(team, row)"
                            >删除</el-button>
                        </div>
                        <!---删除btn--end-->                          

                        <!--左右查看历史版本箭头区--start--->
                        <div 
                            class="leftRightBox marginL5" 
                            v-show="!isAddField && groupFieldData.length>0"
                        >
                            <i class="lt el-icon-caret-left" @click="handlerLeftBtn(team,row)"></i>
                            <i class="rt el-icon-caret-right"@click="handlerRightBtn(team,row)"></i>
                        </div>
                        <!--左右查看历史版本箭头区--end--->  
                    </div>                     

                    <!--字段field部分-start-->
                    <el-form 
                        :class="`row_${row.Id}`" 
                        :ref="`row_${row.Id}`"
                    >
                        <div class="listItemBox">
                            <div 
                                class="listItem"
                                v-if="row.FieldValueSet && row.FieldValueSet.length" 
                                v-for="(field, index) in row.FieldValueSet" :key="field.Id"
                            >
                                <!-- <h1 class="title">{{field.title}}</h1> -->
                                <div class="itemBox">
                                    <!-- field.FieldLabel: {{field.FieldLabel}} -->
                                    <!-- --field.Config.ControlType: {{field.Config.ControlType}} -->
                                    <!-- field.Config.ControlType: {{field.Config.ControlType}} -->
                                    <span class="name">{{field.FieldName}}:</span>
                                    <span v-if="field.Config">
                                        <!--非新增编辑分组的value显示----start--->
                                        <span v-if="field.Config.ControlType !=14 &&
                                                    field.Config.ControlType !=15">
                                            <span class="value" 
                                                v-if="!isAddField"
                                            >{{field.FieldLabel}}</span>
                                        </span>
                                        <span v-else>
                                            <!--图片-->
                                            <el-image
                                                v-if="!isAddField && field.Config.ControlType == 14" 
                                                v-for="(image, key) in field.FieldLabel"
                                                :key="image.Url"
                                                style="width: 25px; height: 25px"
                                                fit="fill"
                                                :src="image.Url"
                                                class="value"
                                            >
                                            </el-image>  
                                            <!--附件--> 
                                            <el-button
                                                v-if="!isAddField && field.Config.ControlType == 15" 
                                                type="text"
                                                v-for="(file, key) in field.FieldLabel"
                                                :key="file.Url"
                                                class="value"
                                            >
                                                {{file.Name}}
                                            </el-button>                                                 
                                        </span>
                                        <!--非新增编辑分组的value显示----end--->


                                        <!---新增编辑分组的value显示-start--->
                                        <span v-if="isAddField"> 
                                            <component 
                                                :is="PAcurrentComponent(field.Config.ControlType)"
                                                :isNeedCheck = 'true'
                                                :prop="'Fields.' + index + '.FieldName'"
                                                :orderProp="'Fields.' + index + '.FieldName'"
                                                :obj.sync="field"
                                                :isTitle="false"
                                            >
                                            </component>
                                        </span>
                                        <!---新增编辑分组的value显示-end--->                                        
                                    </span>
                                </div>
                            </div>
                        </div>
                    </el-form>                    
                    <!---字段field部分---end--->
                </div>
            </div>
            <!---el-card-field  cardBody区域---end--->
        </el-card>  


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

                    <field-edit-cmp 
                        ref="editFieldCmp"
                        :groupFieldData.sync = 'addGroupFieldData' 
                        :isAddField='isAddField'
                        :isEventDetail="isEventDetail"
                        @isSubmit="isSubmit">
                    </field-edit-cmp>    

                </div>
                <!----引入basic-field分组组件--end-->

                <!--保存按钮区--start-->
                <save-footer 
                    @save="saveAddNewFieldGroup" 
                    @cancel="cancelAddNewFieldGroup"
                ></save-footer>
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
                        :isEventDetail="isEventDetail"
                        @isSubmit="isSubmit">
                    </field-edit-cmp>  
                </div>
                <!----引入basic-field分组组件--end-->

                <!--保存按钮区--start-->
                <save-footer 
                    @save="saveEditFieldGroup" 
                    @cancel="cancelEditFieldGroup"
                ></save-footer>
                <!--保存按钮区--end-->     
            </el-dialog>   
        </div>
        <!--编辑field分组弹框----end-->          
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import OperationLogCmp from './OperationLog-cmp'    
    import FieldEditCmp  from './FieldEdit-cmp'    
    import CommonDialog from './CommonDialog'    
    import { REQ_OK } from '@/api/config'
    import { 
        getEmpFull,
        saveEmpFieldData,  
        SaveFormData,      
        teamCodeGetFeild,
        DeleteEmpData,
        GetNext,
        GetPrev
    } from '@/api/employee'
    import { mapGetters } from 'vuex'
    import { PaControlAndRuleMixin } from '@/utils/PA-mixins'
    export default {
        mixins:[ PaControlAndRuleMixin ],
        props: {
            // false是员工详情页的分组  true是事件详情页的分组 
            isEventDetail: {
                type: Boolean,
                default: false
            },   
            // 事件对象
            eventObj: {
                type: Object,
                default: () => {
                    return {}
                }
            }, 
            firstPageObj: {
                type: Object,
                default: () => {
                    return {}
                }
            },       
            // 是否是新增或者编辑field
            isAddField: {
                type: Boolean,
                default: false
            },
            // 所有分组的表单信息
            groupFieldData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            // 当前选取的员工
            empObj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            // taskCode 
            taskCode: {
                type: String,
                default: ' '
            }           
        },
        components: {
            FieldEditCmp,
            SaveFooter,
            OperationLogCmp,
            CommonDialog            
        },
        data(){
            return {
                loading: false,  // 控制loading 显示隐藏
                fieldLoading: false, // 控制 field编辑/新增 弹框的 loading                
                teamBoxLoading: false, // 控制 teamBox 的loading

                editFieldData: {}, // 编辑字段弹框的数据对象集合                
                currentEditTeam: {},  // 当前编辑的 team 对象
                currentEditRow: {},  // 当前编辑的 row 对象
                showScanEditLog: false, // 控制 查看操作记录的 弹框显示/隐藏
                addNewFieldShow: false, // 控制新增field分组弹框的显示/隐藏
                editFieldShow: false, // 控制 编辑field字段 弹框的显示/隐藏                
                addGroupFieldData: {}, // 添加字段弹框的数据对象集合                
                currentEditRowObj: {},  // 当前正在编辑的行对象
                currentEditTeamObj: {},  // 当前正在编辑的team对象
                currentAddFieldObj:{},  // 当前正在添加的team对象
                editSaveStrJson: '',  // 编辑保存时的 json字符串                
            }
        },
        computed: {
            ...mapGetters([
                'currentEmpObj'
            ])
        },
        created() {
            debugger
            // 锚点定位
            this.$bus.$on("anchorPoint", (dom) => {
                if(dom){
                    // 锚点跳转
                    this._gotoScrollView(dom)
                }
            })
            // this._getEmpFull()
        },
        beforeDestroy(){
            this.$bus.$off("anchorPoint")
        },
        methods: {
            // 锚点定位到目标元素
            _gotoScrollView(dom){
                debugger
                let domId = `#teamItem_${dom}`
                console.log("----锚点定位到----：", domId)
                debugger
                // document.querySelectorAll('#teamItem_PWORKHIS')[0].scrollIntoView()                    
                try {
                    document.querySelectorAll(domId)[0].scrollIntoView()                    
                } catch (error) {
                    console.log("------锚点定位报错了-----")
                }
            },
            // 获取员工详情中所有的分组的数据结合
            _getEmpFull(){
                debugger
                this.loading = true
                getEmpFull().then(res => {
                    this.loading = false
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.groupFieldData = res.data.Data
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
            //根据 teamCode 获取field 字段完整的属性（包含 controlType 属性，用于 编辑字段时用到）
            _getTeamCodeField(){
                
            },
            // 点击了展开/收起
            handleCollapsed(obj) {
                debugger
                if(obj.Collapsed){
                    // 点击 展开
                    obj.Collapsed = 0
                }else {
                    // 点击 收起
                    obj.Collapsed = 1
                }
            },
            // 点击了 team分组
            clickTeam(e){
                debugger

            },
            // 根据 teamCode 来获取 单个分类 下的 field集合
            _getField(teamCode) {
                return teamCodeGetFeild(teamCode)
            },             
            // 点击了新增分组按钮
            clickAddNewGroup(teamData){
                debugger
                //触发父组件（empDetailInfo-cmp）弹出新增分组的弹框
                // this.$emit("clickAddNewGroup", team)
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
                        this._saveFieldData(1)
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
            // 点击了 编辑的btn按钮
            handleEdit(teamObj, rowObj){
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
            // 保存新增分组
            saveAddNewFieldGroup(){
                // 进行动态表单的校验后
                console.log(this.$refs["editFieldCmp"].$refs["fieldForm"])
                const editData = new Promise((resolve, reject) => {
                    debugger
                    return this.$refs["editFieldCmp"].$refs["fieldForm"].validate((valid) => {
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
                        this._saveFieldData(2)
                    })
                }).catch(() => {
                    //失败
                    debugger
                    console.log(this.editFieldData)
                    this.$message.error("请先填写完整必填项后保存")
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
            // 保存编辑/ 新增的字段属性
            _saveFieldData(type){
                debugger
                this.loading = true
                console.log(this.currentEditRowObj)
                console.log(this.currentEditTeamObj)
                console.log(this.editFieldData)
                let teamCode = '', Id = ''

                if(type === 1){
                    // 编辑
                    teamCode = this.currentEditTeamObj.TeamCode
                    Id = this.currentEditRowObj.Id
                }else if(type === 2){
                    //添加
                    teamCode = this.currentAddFieldObj.TeamCode
                    Id = 0
                }
                debugger
                if(!this.isEventDetail){
                    // 员工详情页面的 编辑 / 新增 保存
                    this._saveEmpDetailField(type, this.empObj.EmpId, teamCode, Id, this.editSaveStrJson)
                }else {
                    debugger
                    // 事件详情页面的 编辑 / 新增 保存
                    this._saveEventDetailField(type, this.empObj.EmpId, Id, this.eventObj.EventCode, teamCode, this.taskCode, this.firstPageObj.BeginDate, this.editSaveStrJson)
                }
            },
            // 员工详情页面的 分组 编辑/新增 的保存   
            _saveEmpDetailField(type, empId, teamCode, Id, strJson){
                saveEmpFieldData(empId, teamCode, Id, strJson).then((res) => {
                    debugger
                    this.loading = false
                    if( res && res.data.State === REQ_OK ){
                        if(type === 1){
                            //编辑保存
                            // 关闭编辑弹框
                            this.editFieldShow = false                        
                        }else if(type === 2){
                            // 添加保存
                            // 关闭添加的弹框
                            this.addNewFieldShow = false
                        }
                        
                        // 触发父级 进行 刷新
                        this.$emit("refreshGroupData")

                        this.$message({
                            type: 'success',
                            message: `保存成功`
                        })                        
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
            // 事件详情页面的 分组 编辑/新增 的保存   
            _saveEventDetailField(type, empId, Id, eventCode, teamCode, taskCode, BeginDate, strJson){
                SaveFormData(empId, Id, eventCode, teamCode, taskCode, BeginDate, strJson).then((res) => {
                    debugger
                    this.loading = false
                    if( res && res.data.State === REQ_OK ){
                        if(type === 1){
                            //编辑保存
                            // 关闭编辑弹框
                            this.editFieldShow = false                        
                        }else if(type === 2){
                            // 添加保存
                            // 关闭添加的弹框
                            this.addNewFieldShow = false
                        }
                        
                        // 触发父级 进行 刷新
                        this.$emit("refreshGroupData")

                        this.$message({
                            type: 'success',
                            message: `保存成功`
                        })                        
                    }else{
                        this.$message({
                            type: 'error',
                            message: `保存失败err,${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    debugger
                    this.$message({
                        type: 'error',
                        message: `保存失败err`
                    })
                })                
            },                                  
            // 取消新增分组
            cancelAddNewFieldGroup(){
                this.addNewFieldShow = false
            },             
            _DeleteEmpData(Id, EmpId, TeamCode, ModuleCode = 'PA'){
                this.teamBoxLoading = true
                debugger
                DeleteEmpData(Id, EmpId, TeamCode, 'PA').then(res => {
                    this.teamBoxLoading = false
                    if(res && res.data.State === REQ_OK){
                        this.$emit("emitDeleteSuccess")
                        this.$message.success(`删除成功`)
                    }else {
                        this.$message.error(`删除失败,${res.data.Error}`)
                    }
                })
            },
            // 点击 删除 的btn 按钮
            handleDelete( team, row ){
                debugger
                this.currentEditTeam = team 
                this.currentEditRow = row

                let teamCode = team.TeamCode || ''
                
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'                    
                }).then(() => {
                    if( teamCode ){
                        // 调取 删除的接口
                        this._DeleteEmpData(row.Id, this.currentEmpObj.EmpId, team.TeamCode )
                    }else {
                        console.log("点击编辑按钮获取到的 teamCode为空")
                    }                 
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            // 查看操作记录
            scanEditLog(){
                debugger
                // this.$emit("emitScanLog")
                this.showScanEditLog = true
            },
            _GetPrev(TeamCode, EmpId, Id){
                GetPrev(TeamCode, EmpId, Id).then(res => {
                    if(res && res.data.State === REQ_OK){
                        
                    }else {
                        this.$message.error(`获取上一条数据失败,${res.data.Error}`)
                    }
                })
            },
            // 查看上一条
            handlerLeftBtn(team,rowObj){
                debugger
                let teamCode = team.TeamCode
                let Id = rowObj.Id
                this._GetPrev(teamCode,this.currentEmpObj.EmpId,Id)
            },
            _GetNext(TeamCode, EmpId, Id){
                GetNext(TeamCode, EmpId, Id).then(res => {
                    if(res && res.data.State === REQ_OK){
                        
                    }else {
                        this.$message.error(`获取下一条数据失败,${res.data.Error}`)
                    }
                })
            },            
            // 查看下一条
            handlerRightBtn(team, rowObj){
                debugger
                let teamCode = team.TeamCode
                let Id = rowObj.Id                
                this._GetNext(teamCode,this.currentEmpObj.EmpId,Id)
            },
        }
    }
</script>