<!--
  User: gaol
  Date: 2019/10/23
  功能： 在职员工 待入职员工 离职员工 页面中 更多按钮区中 点击 了leftBtn 后的弹框组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.basic-groupfieldEdit-cmp
    width 100%
    min-height 400px
    // height 600px
    // overflow auto
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-around
    // align-items flex-start
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
                                width 32%
                                height 84px
                                padding 5px
                                box-sizing border-box
                                flex-grow 1
                                .itemBox 
                                    display flex
                                    justify-content flex-start
                                    height 100%
                                    padding 5px 
                                    box-sizing border-box
                                    .name
                                        margin-top 15px
                                        font-weight bold
                                        color #606266
                                    .value
                                        margin-left 10px
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
    <div :class="['basic-groupfieldEdit-cmp', groupFieldData.length<=0? 'not_found': '']"  v-loading="loading">
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
                <!-- <span 
                    class="addNewGroupBox"
                    v-if="team.Multiple === 1"
                    style="float: right; padding: 3px 0" 
                    @click= "clickAddNewGroup(team)"
                >
                    <i class="el-icon-circle-plus-outline"></i>
                </span> -->
                <!----增加分组区----end--->                
            </div> 
            <!--el-card--field Head区域--end-->           

            <!---el-card-field  cardBody区域---start--->         
            <div class="teamRowBox">
                <!-- team: {{team}}              -->
                <div 
                    :class="['teamRow', 'clearfix', team.Collapsed ? 'isHide': '']"
                    v-for="(row, index) in team.Rows"
                    :key="row.Id"
                >           
                    <el-form :model="row" class="row_form" :ref="`${team.TeamCode}_row_${index}`">          
                        <!--字段field部分-start-->                                              
                        <div class="listItemBox">
                            <div 
                                class="listItem"
                                v-if="row.FieldValueSet && row.FieldValueSet.length" 
                                v-for="(field, index) in row.FieldValueSet" :key="field.Id"
                            >        
                                <!-- <h1 class="title">{{field.title}}</h1> -->
                                <div class="itemBox">
                                    <span class="name">{{field.FieldName}}:</span>
                                    <!---新增编辑分组的value显示-start--->
                                    <span class="value">
                                        <!-- PAcurrentComponent(field.Config.ControlType): {{PAcurrentComponent(field.Config.ControlType)}}
                                        ------
                                        field.ControlType: {{field.Config.ControlType}} -->
                                        <!-- field: {{field}} -->
                                        <component 
                                        :is="PAcurrentComponent(field.Config.ControlType)"
                                        :isNeedCheck = 'true'
                                        :prop="'FieldValueSet.'+ index + '.FieldValue'"
                                        :obj.sync="field"
                                        :isTitle="false"
                                        >
                                        </component>
                                    </span>
                                    <!---新增编辑分组的value显示-end--->
                                </div>                  
                            </div>
                        </div>                
                        <!---字段field部分---end--->
                    </el-form>
                </div>
            </div>
            <!---el-card-field  cardBody区域---end--->
        </el-card>  
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    // import { teamCodeGetFeild } from '@/api/employee'
    import { PaControlAndRuleMixin } from '@/utils/PA-mixins'
    import { execute } from '@/api/employee'
    import { REQ_OK } from '@/api/config'
    export default {
        mixins:[ PaControlAndRuleMixin ],
        props: {
            groupFieldData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            //当前选取的员工
            currentSelectObj: {
                type: Object,
                default: () => {
                return {}
                }
            },
            // 事件按钮对象
            eventObj: {
                type: Object,
                default: () => {
                    return {}
                }
            },                   
        },
        components: {
            SaveFooter
        },
        data(){
            return {
                loading: false,  // 控制loading 显示隐藏
                currentEditTeam: {},  // 当前编辑的 team 对象
                currentEditRow: {},  // 当前编辑的 row 对象
                eventCode: '', 
            }
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
            // 改变loading状态
            setLoading(loadingFlag){
                debugger
                if(loadingFlag){
                    this.loading = true
                }else {
                    this.loading = false
                }
            },
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
            // 点击了新增分组按钮
            clickAddNewGroup(team){
                debugger
                //触发父组件（empDetailInfo-cmp）弹出新增分组的弹框
                this.$emit("clickAddNewGroup", team)
            },
            //执行事件实例
            _execute(data){
                // 需要这些参数：EventCode, StrJson, Mid, ModuleCode = 'PA', TaskCode, BeginDate                
                execute(this.eventObj.EventCode, JSON.stringify(data), this.currentSelectObj.EmpId, 'PA').then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.$message.success(`[${this.eventObj.EventName}]数据保存成功`)
                        this.$bus.$emit("busExecuteSuccess")
                        // 触发父组件进行关闭弹框
                        this.$emit("executeSuccess")
                    }else {
                        this.$message({
                            type: 'error',
                            message: `保存失败，${res.data.Error}`
                        })
                    }
                }).catch(() =>{
                    this.$message({
                        type: 'warning',
                        message: '执行事件实例出错'
                    })
                })
            },
            // 处理数据
            _handlerData(data){
                let newData = []
                if(data && data.length){
                   newData =  data.map((item,i) => {
                       let newRows = []
                       newRows = item.Rows.map((val, key) => {
                            let newFieldValueSet = []
                            newFieldValueSet = val.FieldValueSet.map((value, m) => {
                                return {
                                    FieldCode: value.FieldCode,
                                    FieldValue: value.FieldValue
                                }
                            })
                            return {
                                Id: val.Id,
                                FieldValueSet: newFieldValueSet
                            }
                       })
                        return {
                            TeamCode: item.TeamCode,
                            Rows: newRows
                        }
                    })
                }
                return newData
            },
            // 提交验证
            submitValidate(eventCode){
                this.eventCode = eventCode
                debugger
                let result = []

                this.groupFieldData.forEach((team, index) => {
                    team.Rows.forEach((row, i) => {
                        // let id = row.Id
                        let teamCode = team.TeamCode
                        let formName = teamCode + '_row_' + i
                        console.log(this.$refs[formName])
                        debugger
                        result.push(this.checkFormArray_row(formName, team))      
                    })  
                })
                debugger
                Promise.all(result).then(() => {
                    console.log(this.groupFieldData)
                    debugger
                    // 都验证通过了 调用  execute 的方法
                    // 处理this.groupFieldData 数据
                    let newData = this._handlerData(this.groupFieldData)
                    this._execute(newData)
                    
                }).catch(() => {
                    debugger
                    // 没有验证通过
                    console.log(this.groupFieldData)
                    // let newData = this._handlerData(this.groupFieldData)
                    // this._execute(newData)                    
                })
            },
            // 封装验证数组表单的函数(仅供 切换主表 tabs 后对切换前的表单进行 验证)
            checkFormArray_row (formName, team) {
                // console.log(this.$refs[formName])
                debugger
                return new Promise((resolve, reject) => {
                    debugger
                    this.$refs[formName][0].validate((valid) => {
                        debugger
                        if (valid) {
                            resolve({
                                name: formName,
                                msg: `${team.TeamName}验证pass`
                            })
                        } else {
                            reject(new Error(`${team.TeamName}验证失败`))
                        }
                    })
                })
            },            
        }
    }
</script>
