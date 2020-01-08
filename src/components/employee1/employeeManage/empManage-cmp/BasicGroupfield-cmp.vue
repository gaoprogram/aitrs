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
                            position absolute 
                            top 0 
                            right 140px
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
                <span 
                    class="addNewGroupBox"
                    v-if="team.Multiple === 1"
                    style="float: right; padding: 3px 0" 
                    @click= "clickAddNewGroup(team)"
                >
                    <i class="el-icon-circle-plus-outline"></i>
                </span>
                <!----增加分组区----end--->                
            </div> 
            <!--el-card--field Head区域--end-->           

            <!---el-card-field  cardBody区域---start--->
            <div class="teamRowBox">
                <div 
                    :class="['teamRow', 'clearfix', team.Collapsed ? 'isHide': '']"
                    v-for="(row, index) in team.Rows"
                    :key="row.Id"
                >
                    <div class="rowHeadBox">
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
                        <div class="scanEditLog">
                            <el-button 
                                type="primary" 
                                size="mini" 
                                @click.native="scanEditLog"
                            >查看记录</el-button>
                        </div>
                        <!---查看操作记录--end-->    

                        <!--左右查看历史版本箭头区--start--->
                        <div class="leftRightBox" v-show="!isAddField && groupFieldData.length>0">
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
                                            <el-image 
                                                v-for="(image, key) in field.FieldLabel"
                                                :key="image.Url"
                                                style="width: 25px; height: 25px"
                                                v-if="!isAddField"
                                                fit="fill"
                                                :src="image.Url"
                                                class="value"
                                            >
                                            </el-image>                                            
                                        </span>
                                        <!--非新增编辑分组的value显示----end--->


                                        <!---新增编辑分组的value显示-start--->
                                        <span v-if="isAddField"> 
                                            <component 
                                                :is="PAcurrentComponent(field.Config.ControlType)"
                                                isNeedCheck = true
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
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { REQ_OK } from '@/api/config'
    import { 
        getEmpFull,        
        teamCodeGetFeild,
        GetNext,
        GetPrev 
    } from '@/api/employee'
    import { mapGetters } from 'vuex'
    import { PaControlAndRuleMixin } from '@/utils/PA-mixins'
    export default {
        mixins:[ PaControlAndRuleMixin ],
        props: {
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
            }
        },
        components: {
            SaveFooter
        },
        data(){
            return {
                loading: false,  // 控制loading 显示隐藏
                // groupFieldData: [], // 所有分组的数据
                currentEditTeam: {},  // 当前编辑的 team 对象
                currentEditRow: {},  // 当前编辑的 row 对象
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
            // 点击了新增分组按钮
            clickAddNewGroup(team){
                debugger
                //触发父组件（empDetailInfo-cmp）弹出新增分组的弹框
                this.$emit("clickAddNewGroup", team)
            },
            // 点击了 编辑的btn按钮
            handleEdit(team, row){
                debugger
                this.currentEditTeam = team 
                this.currentEditRow = row

                let teamCode = team.TeamCode || ''
                            
                if( teamCode ){
                    // 触发父组件（empDetailInfo-cmp）弹出编辑的弹框
                    let newRowData = JSON.parse(JSON.stringify(row))
                    this.$emit("clickEditFieldBtn", newRowData, team)
                }else {
                    console.log("点击编辑按钮获取到的 teamCode为空")
                }
            },
            // 查看操作记录
            scanEditLog(){
                debugger
                this.$emit("emitScanLog")
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
