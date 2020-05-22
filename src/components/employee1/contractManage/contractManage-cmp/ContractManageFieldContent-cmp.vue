<!--
  User: gaol
  Date: 2020/1/6z
  功能： 合同管理中的 查看合同详情field组件  
  注意：  员工详情中的  合同管理  和  合同管理类目中的详情页面 都用到此组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.teamRowBox
    position relative
    height calc(100vh - 350px)
    width 100%
    overflow auto
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    padding 40px 40px 20px 20px 
    box-sizing border-box
    display flex
    justify-content flex-start
    flex-wrap wrap
    align-items flex-start
    .addBtnBox
        position absolute
        top 10px
        right 40px
        &:hover 
            cursor pointer
            color #409EFF        
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
                text-align right
            .scanEditLog
                // text-align right
                // float right
                position absolute 
                top 0 
                right 50px
            .leftRightBox
                position absolute
                top 10px
                right 10px
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
            overflow hidden
        .el-form
            .listItemBox
                // width 48%
                margin 5px
                // display flex
                // flex-direction row
                // justify-content flex-start
                // flex-wrap wrap
                // align-items flex-start
                .listItem
                    width 48% 
                    margin 10px
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
    <!---el-card-field  cardBody区域---start--->
    <div :class="['teamRowBox', rowFieldDataArr.length<=0? 'not_found':'']" v-loading="loading">
        <!-- rowFieldDataArr: {{rowFieldDataArr}} -->
        <!--新增按钮start-->
        <div class="addBtnBox" v-show="showAddBtn">
            <span 
                @click="addNewContractField"
            >
                <i class="el-icon-circle-plus-outline"></i>
            </span>
         
        </div>
        <!--新增按钮end-->

        <div 
            class="teamRow"
            v-for="(row, index) in rowFieldDataArr"
            :key="row.Id"
        >
            <div class="rowHeadBox">                
                <!--编辑btn---start-->
                <div class="edit">

                    <el-button 
                        type="primary" 
                        size="mini" 
                        @click.native="handleEdit(row)"
                    >编辑</el-button>
                    <el-button 
                        type="primary" 
                        size="mini" 
                        @click.native="handleDelete(row)"
                    >删除</el-button>
                </div>
                <!---编辑btn--end-->    

                <!--查看操作记录---start-->
                <!-- <div class="scanEditLog">
                    <el-button type="primary" size="mini" @click.native="scanEditLog">查看记录</el-button>
                </div> -->
                <!---查看操作记录--end-->    

                <!--左右查看历史版本箭头区--start--->
                <!-- <div class="leftRightBox" v-show="!isAddField && groupFieldData.length>0">
                    <i class="lt el-icon-caret-left"></i>
                    <i class="rt el-icon-caret-right"></i>
                </div> -->
                <!--左右查看历史版本箭头区--end--->  
            </div>                     

            <!--字段field部分-start-->
            <el-form 
                :class="`row_${row.Id}`" 
                :ref="`row_${row.Id}`"
            >
                <div class="listItemBox u-f u-f-wrap">
                    <div 
                        class="listItem u-f0"
                        v-if="row.FieldValueSet && row.FieldValueSet.length" 
                        v-for="(field, index) in row.FieldValueSet" :key="field.Id"
                    >
                        <!-- <h1 class="title">{{field.title}}</h1> -->
                        <div class="itemBox">
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
                                    <!-- field.FieldLabel: {{field.FieldLabel}} -->
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
                                    <el-button 
                                        v-if="!isAddField && field.Config.ControlType == 15" 
                                        v-for="(file, key) in field.FieldLabel"
                                        :key="file.AttachmentId"
                                        type="text"
                                        style="width: 25px; height: 25px"
                                        class="value"
                                    >
                                        {{file.Name}}
                                    </el-button>                                                                               
                                </span>
                                <!--非新增编辑分组的value显示----end--->


                                <!---编辑field的value显示-start--->
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
                                <!---编辑field的value显示-end--->                                        
                            </span>
                        </div>
                    </div>
                </div>
            </el-form>                    
            <!---字段field部分---end--->
        </div>

        <!--新增合同表单start--->
        <div class="addNewFieldBox" v-if="showAddNewContractDialog">
            <el-dialog
                title="新增合同表单"
                :visible.sync="showAddNewContractDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                新增合同表单
            </el-dialog>
        </div>
        <!--新增合同表单end---->
    </div>
    <!---el-card-field  cardBody区域---end--->
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { REQ_OK } from '@/api/config'
    import { 
        teamCodeGetFeild,
        DeleteEmpContract
    } from '@/api/employee'
    import { PaControlAndRuleMixin } from '@/utils/PA-mixins'
    import { mapGetters } from 'vuex'
    export default {
        mixins:[ PaControlAndRuleMixin ],
        props: {
            // 是否是新增或者编辑field
            isAddField: {
                type: Boolean,
                default: false
            },
            groupFieldData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            //编辑还是新增  false 编辑，true 新增
            isAddOrEdit: {
                type: Boolean,
                default: false
            },
            // 合同的数据
            rowFieldDataArr: {
                type: Array,
                default: () => {
                    return []
                }
            },
            currentFieldsObj:{
                type: Object,
                default: () => {
                    return {}
                }
            },
            currentTeamCode: {
                type: String,
                default: ''
            }
        },
        components: {
            SaveFooter
        },
        data(){
            return {
                loading: false,  // 控制loading 显示隐藏
                showAddBtn: true, //控制 合同添加btn 的显示/隐藏
                currentEditTeam: {},  // 当前编辑的 team 对象
                currentEditRow: {},  // 当前编辑的 row 对象
                currentAddTeam: {}, // 当前新增的team 对象
                currentEditRow: {}, // 当前新增的row 对象
                showAddNewContractDialog: false, // 新增合同表单弹框显示/隐藏
                addContractField: {},  // 新增的合同表单的字段
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
            // 获取当前合同的新增表单字段
            _teamCodeGetFeild(teamCode, EmpId, Id){
                return new Promise((resolve, reject) =>{
                    teamCodeGetFeild(teamCode, EmpId, Id).then(res => {
                        debugger
                        if(res && res.data.State === REQ_OK){
                            this.addContractField = res.data.Data
                            resolve(this.addContractField)
                        }else {
                            this.$message.error(`新增合同获取表单字段失败,${res.data.Error}`)
                            reject(new Error(`新增合同获取表单字段失败,${res.data.Error}`))
                        }
                        this.showAddBtn = true
                    })
                })
            },
            // 点击了新增分组按钮
            addNewContractField(){
                debugger
                this.showAddBtn = false
                // this.showAddNewContractDialog = true
                // 获取当前的 合同类目的新增field字段
                this._teamCodeGetFeild(this.currentTeamCode, this.currentEmpObj.EmpId, 0).then(res => {
                    debugger
                    if(res){
                        this.$emit("addContractField", res)
                    }else {

                    }
                })
            },
            // 点击了 编辑的btn按钮
            handleEdit(row){
                debugger
                this.currentEditRow = row
                this.$emit("editContractField", row)        
                // if( teamCode ){
                //     // 触发父组件（empDetailInfo-cmp）弹出编辑的弹框
                //     let newRowData = JSON.parse(JSON.stringify(row))
                //     this.$emit("clickEditFieldBtn", newRowData, team)
                // }else {
                //     console.log("点击编辑按钮获取到的 teamCode为空")
                // }
            },
            // 删除合同表单
            _DeleteEmpContract(){
                this.loading = true
                debugger
                DeleteEmpContract(this.currentTeamCode, this.currentEmpObj.EmpId, this.currentDeleteRow.Id).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success(`删除成功`)
                        // 出发父组件更新
                        this.$emit("deleteSuccess", this.currentDeleteRow)
                    }else {
                        this.$message.error(`删除合同表单失败,${res.data.Error}`)
                    }
                })
            },
            // 点击了 删除的btn按钮
            handleDelete(row){
                debugger
                this.currentDeleteRow = row
                // let teamCode = team.TeamCode || ''
                            
                // if( teamCode ){
                //     // 触发父组件（empDetailInfo-cmp）弹出编辑的弹框
                //     let newRowData = JSON.parse(JSON.stringify(row))
                //     this.$emit("clickAddNewGroup", newRowData, team)
                // }else {
                //     console.log("点击编辑按钮获取到的 teamCode为空")
                // }
                this.$confirm(`确定要删除此合同表单吗?`, "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    // 调取删除合同filed的接口
                    this._DeleteEmpContract()
                })
            },
            // 查看操作记录
            scanEditLog(){
                debugger
                this.$emit("emitScanLog")
            }
        }
    }
</script>
