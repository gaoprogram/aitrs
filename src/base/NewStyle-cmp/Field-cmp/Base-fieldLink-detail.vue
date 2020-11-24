<!--
  User: gaol
  Date: 2019/5/14
  功能：fieldLink 组件弹框详情页面
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.contentComSectionItem {
    // border-bottom: 1px solid red
    border: 1px solid #FF9900;
    padding: 20px;
    box-sizing: border-box;    
}
.comdialogSlotWrap {
    min-height: 300px;
}
</style>
<template>
    <el-row :class="['com-section-cmp']">
        dfdfddf对方讲道理
        comData： {{comData}}
        <div v-loading="loading" :class="[data_res.DataWithoutObject && data_res.DataWithoutObject.length<=0? 'not_found':'']">
            <!-- ------content中 的单个组件 里面的通用布局  com-section-cmp组件-------------
            comData: {{comData}}
            ------ -->
            调取接口后的data_res: {{data_res}}
            <el-col 
                :span="columnNum"
                class="contentComSectionItem marginT10"
                v-for="(funcObj, key) in data_res.DataWithoutObject"
                :key="key"
                >   
                <!-- funcObj(页面content单个组件中的布局content组件): {{funcObj}} -->
                <component 
                    :is="whichComSection(funcObj.Section, funcObj.SectionData)"
                    :comsData='funcObj.SectionData'
                    :sectionData="funcObj"
                    :contentSectionTotalData = "data_res"
                    :CombineType= 'data_res.CombineType'
                    :CPMetaAttr = 'data_res.CPMetaAttr'
                    :CPMetaCode= 'data_res.CPMetaCode'
                    :DataWithObject="data_res.DataWithObject"
                    :UpSectionDatas="data_res.UpSectionDatas"
                    :textData = "funcObj.SectionData"
                ></component>           
            </el-col>               
        </div>
    </el-row>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    // import TabCmp from '@/base/NewStyle-cmp/Content-section-cmp/Tab-cmp/Base-tab'
    import TitleCmp from '@/base/NewStyle-cmp/Title-section-cmp/Base-Title'
    import ShowFieldsCmp from '@/base/NewStyle-cmp/ShowFields-section-cmp/Base-ShowFields'
    import Search11 from '@/base/NewStyle-cmp/Search11-section-cmp/Base-Search11'
    import ErrorPage404 from '@/base/errorPage/404'
    import UpTextCmp from '@/base/NewStyle-cmp/UpText-section-cmp/Base-UpText'
    import UpBtnCmp from '@/base/NewStyle-cmp/UpBtn-section-cmp/Base-UpBtn'
    import ContentCmpComSection from '@/base/NewStyle-cmp/Content-section-cmp/Base-Content-cmp'
    import DownBtnCmp from '@/base/NewStyle-cmp/DownBtn-section-cmp/Base-DownBtn'
    import DownTextCmp from '@/base/NewStyle-cmp/DownText-section-cmp/Base-DownText'
    import LinkCmp from '@/base/NewStyle-cmp/Link-section-cmp/Base-Link'
    import TailCmp from '@/base/NewStyle-cmp/Tail-section-cmp/Base-Tail'    

    import FieldGroupCmp from '@/base/NewStyle-cmp/Content-section-cmp/FieldGroup-cmp/Base-fieldGroup'
    import TableShowCmp from '@/base/NewStyle-cmp/Content-section-cmp/Table-cmp/Base-table'
    import TableImportCmp from '@/base/NewStyle-cmp/Content-section-cmp/Table-import-cmp/Base-import-table'
    import OutBtnCmp from '@/base/NewStyle-cmp/Content-section-cmp/OutBtn-cmp/Base-OutBtn'

    import SeriesBarCmp from '@/base/NewStyle-cmp/Content-section-cmp/Echarts-cmp/Base-seriesBar'


    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        GetComponentData,
        teamField,
        teamFieldValue
    } from '@/api/newStyle.js'    
    // 底部保存组件
    export default {
        props: {
            columnNum: {
                type: [String, Number],
                default: () => {
                    return 24
                }
            },
            comData: {
                type: Object,
                default: () => {
                    return {}
                }                
            }
        },
        components: {
            SaveFooter, 
            SeriesBarCmp,
            FieldGroupCmp,
            TableImportCmp,
            TableShowCmp,
            OutBtnCmp,
            TitleCmp,
            Search11,
            ErrorPage404,
            ContentCmpComSection,
            UpTextCmp,
            UpBtnCmp,
            DownBtnCmp,
            DownTextCmp,
            TailCmp,
        },
        data(){
            return {
                loading: false,
                currentCombineType: '', // 当前组件的类型
                data_res: {
                    // CPMetaCode: "CPSHPersBasic",
                    // CPMetaAttr: {
                    //     "ModuleCode": "PA",
                    //     "ShortName": "基本信息",
                    //     "ActionAttr": "",
                    //     "Pk": "PersonId",
                    //     "Key": "FCP.SHPersBasic",
                    //     "Paral": "",
                    //     "TemplateId": "TCSH01",
                    //     "Event": "428",
                    //     "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-4.png",
                    //     "IsPc": null,
                    //     "IsMobile": null,
                    //     "FuncIsAtom": null,
                    //     "FuncIsDepend": null,
                    //     "State": 1                        
                    // },
                    // DataWithoutObject: [
                    //     {
                    //         FuncSection: "Title",
                    //         SortId: 1,
                    //         FuncSectionData: [
                    //             {
                    //                 "CombineType": "",
                    //                 "MetaCode":"CPSHPersBasic",
                    //                 "MetaAttr":null,
                    //                 "RelateId":null,
                    //                 "RelateFieldAttr":null,
                    //                 "Collapsed":null,
                    //                 "ShowDiscrip":null,
                    //                 "IsShow":null,
                    //                 "Value":'&lt;div style="color: red"&gt;基本信息上部文本区1&lt;/div&gt;',
                    //                 "SortId":1,
                    //                 "Paral":"",
                    //                 "State":1   
                    //             }                             
                    //         ]
                    //     }
                    // ]
                },
                copy_data_res: {},
            }
        },
        created () {
            debugger
            const { CombineType, MetaCode } = this.comData
            this.currentCombineType = CombineType
            this._GetComponentData( CombineType , MetaCode )
        },
        computed:{
        },
        watch: {
            'comData.MetaCode': {
                handler ( newValue, oldValue ) {
                    // 重新调取布局的接口
                    this._GetComponentData( this.comData.CombineType, newValue )
                }
            }
        },
        methods: {
            // 新增/编辑  分组字段 的 保存
            saveFieldGroupSuccess(){
                // 循环遍历每个分组 然后进行 每个分组的必填项验证, 都验证通过后才提交数据

            },
            currentFuncCmp(obj){
                let type = obj.CombineType || ''
                switch(type){
                    case '0030302': // tab组件
                    case '0030309': // 步骤组件
                        return false
                    default:
                        return true  // 默认是非tab 和 步骤组件
                }
            },
            getCurrentContentCmp(arr){
                debugger
                let res = ''
                if(arr && arr.length ){
                    arr.forEach((item, key) => {
                        let CombineType = item.CombineType
                        switch(CombineType){
                            case '0101001':  // 一维表
                            case '0101002':  // 二维表
                            case '0030304':  // 单表组件
                                res = TableShowCmp;  // 表显示组件
                                break
                            case '0030305':  
                                res = TableImportCmp;  // 表输入组件                              
                                break
                            case  '0090901':  // 单个分组
                            case  '0090902':  // 多个分组
                            case '0030303':  // 单分组组件                            
                                res = FieldGroupCmp;   // 分组组件                                                          
                                break
                            case '0111102':  // 扇形图组件
                            case '0111101':  // 柱图组件
                            case '0111103':  // 条形图组件
                            case '0030306':  // 单图组件
                                res = SeriesBarCmp;   //  图组件                                                         
                                break                                
                        }
                    });
                }
                // console.log("-----------88888888888888------", res)
                return res
            },
            whichComSection(type, arr){
                // table 、 分组 组件也需要有布局, 大部分和 页面中的布局公用
                switch(type){
                    case "Title": //  Title
                        return TitleCmp
                    case "Text": //  Text   // 分组组件中 的一个 Text区
                        return TitleCmp                        
                    case "ShowF":  // ShowF
                        return ShowFieldsCmp
                    case "UpText": // UpText
                        return UpTextCmp
                    case "OutBtn": // OutBtn 外部按钮区
                        return OutBtnCmp
                    case "Btn":    // Btn  content中 分组组件中的 Btn区
                        return OutBtnCmp
                    case "DownBtn":   // DownBtn   页面中的 DownBtn 区
                        return DownBtnCmp                             
                    case "DownText": // DownText
                        return DownTextCmp
                    // case "Link":  // Link
                    //     return LinkCmp
                    case "Tail": // Tail
                        return TailCmp
                    case 'Search': // 1对1 搜索区
                        return Search11;
                    case 'Content':  // 根据条件显示 原子组件（表格、分组、图,tab,下一步等）
                        return this.getCurrentContentCmp(arr)                      
                    // case 'ContentBtn': // 内容按钮区
                    //     return                                                                                                   
                }
            },
            // 页面 content部分 获取 content内 组件数据 
            _GetComponentData(Type, ComponentCode, ModuleCode) {
                this.loading = true
                GetComponentData(Type, ComponentCode, ModuleCode).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        debugger
                        this.data_res = res.data.Data
                        // this.copy_data_res = JSON.parse(JSON.stringify(this.data_res))
                        // this.copy_data_res.DataWithoutObject = this.copy_data_res.DataWithoutObject.map((item, key) => {
                        //     return {
                        //         Section: item.FuncSection,
                        //         SortId: item.SortId,
                        //         SectionData: item.FuncSectionData                                
                        //     }
                        // })
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取表数据失败,${res.data.Error}`
                        })
                    }
                })
            },            
        }
    }
</script>

