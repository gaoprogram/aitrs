<!--
  User: gaol
  Date: 2019/5/14
  功能：content中 的 tab 组件 里面的通用布局  com-section-cmp组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.contentComSectionItem {
    // border-bottom: 1px solid red
    border: 1px solid #FF9900;
    padding: 20px;
    box-sizing: border-box;    
}
</style>
<template>
    <el-row :class="['com-section-cmp']">
        <div v-loading="loading">
            ------content中 tab 组件 里面的通用布局  com-section-cmp组件-------------
            <!-- comData: {{comData}} -->
            调取接口后的data_res: {{data_res}}
            <!-- 调取接口后复制的copy_data_res: {{copy_data_res}} -->
            <!-- ----- -->
            <!-- 获取到的数据data_res: {{data_res}} -->
            <!----tab 组件 top 布局区------->
            <el-col 
                :span="columnNum"
                class="contentComSectionItem marginT10"
                v-for="(funcObj, key) in data_res.DataWithoutObject"
                :key="key"
                >   
                <!-- -----------
                funcObj(页面content单个组件中的布局content组件): {{funcObj}} -->
                <component 
                    :is="topWhichComSection(funcObj.Section, funcObj.SectionData)"
                    :comsData='funcObj.SectionData'
                    :sectionData="funcObj"
                    :CombineType= 'data_res.CombineType'
                    :CPMetaAttr = 'data_res.CPMetaAttr'
                    :CPMetaCode= 'data_res.CPMetaCode'
                    :DataWithObject="data_res.DataWithObject"
                ></component>            
            </el-col>

            <!----tab 组件 TabZ 布局区------->
            <el-col 
                :span="columnNum"
                class="contentComSectionItem marginT10"
                v-for="(tabzMainObj, idx) in data_res.UpSectionDatas"
                :key="tabzMainObj.Object"
                >   
                <!-- -----------
                tabzMainObj(页面content单个组件中的布局content组件): {{tabzMainObj}} -->
                <!-- tabzMainObj.DataWithObject： {{tabzMainObj.DataWithObject}} -->
                <component 
                    :is="tabZWhichComSection(tabzMainObj.UpSection, tabzMainObj.DataWithObject)"
                    :comsData='tabzMainObj.DataWithObject'
                    :sectionData="tabzMainObj"
                ></component>            
            </el-col>            
        </div>
    </el-row>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import ErrorCmp from '@/base/errorPage/404'
    import TabZSectionCmp from '@/base/NewStyle-cmp/Content-section-cmp/Tab-cmp/Base-tabz-section'
    import StepZSectionCmp from '@/base/NewStyle-cmp/Content-section-cmp/Next-step-cmp/Base-stepz-section'
    import TitleCmp from '@/base/NewStyle-cmp/Title-section-cmp/Base-Title'
    import ShowFieldsCmp from '@/base/NewStyle-cmp/ShowFields-section-cmp/Base-ShowFields'
    import Search11 from '@/base/NewStyle-cmp/Search11-section-cmp/Base-Search11'
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

    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        GetComponentData
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
            ErrorCmp,
            TabZSectionCmp,
            StepZSectionCmp,
            FieldGroupCmp,
            TableImportCmp,
            TableShowCmp,
            OutBtnCmp,
            TitleCmp,
            Search11,
            ContentCmpComSection,
            UpTextCmp,
            UpBtnCmp,
            DownBtnCmp,
            DownTextCmp,
            TailCmp                     
        },
        data(){
            return {
                loading: false,
                currentCombineType: '', // 当前组件的类型
                data_res: {
                    // CPMetaCode: "CPSHPersBasic",
                    // CPMetaAttr: {
                    //     "ModuleCode":"PA",
                    //     "ShortName":"基本信息",
                    //     "ActionAttr":"",
                    //     "Pk":"PersonId",
                    //     "Key":"FCP.SHPersBasic",
                    //     "Paral":"",
                    //     "TemplateId":"TCSH01",
                    //     "Event":"428",
                    //     "Icon":"https://www.caihuiyun.cn/Content/CompanySite_New/four-ico-4.png",
                    //     "IsPc":null,
                    //     "IsMobile":null,
                    //     "FuncIsAtom":null,
                    //     "FuncIsDepend":null,
                    //     "State":1                        
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
                copy_data_res: {}
            }
        },
        created() {
            const { CombineType, MetaCode } = this.comData
            this.currentCombineType = CombineType
            this._GetComponentData(CombineType, MetaCode)
        },
        methods: {
            getCurrentContentCmp(arr){
                // debugger
                let res = ''
                if(arr && arr.length ){
                    arr.forEach((item, key) => {
                        let CombineType = item.CombineType
                        switch(CombineType){
                            case '0101001': 
                            case '0030304': 
                                res = TableShowCmp  // 表显示组件
                            case '0030303':  // 分组组件
                                res = FieldGroupCmp
                            case '0030305':  // 表输入组件
                                res = TableImportCmp                                                                 
                        }
                    });
                }
                console.log("-----------88888888888888------", res)
                return res
            },
            topWhichComSection(type, arr){
                switch(type){
                    case "Title": //  Title
                        return TitleCmp
                    case "ShowF":  // ShowF
                        return ShowFieldsCmp
                    case "UpText": // UpText
                        return UpTextCmp
                    case "OutBtn": // OutBtn 外部按钮区
                        return OutBtnCmp
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
                    default: 
                        return ErrorCmp                                                                                                  
                }
            },
            tabZWhichComSection(type, arr){
                switch(type){
                    case "TabZ": //  TabZ  内容区
                        return  TabZSectionCmp
                    case "StepZ": //  StepZ  内容区
                        return  StepZSectionCmp                        
                    default:
                        return  ErrorCmp                                                                                             
                }
            },            
            // 页面 content部分 获取 content内 组件数据 
            _GetComponentData(Type, ComponentCode, ModuleCode) {
                this.loaging = true
                GetComponentData(Type, ComponentCode, ModuleCode).then(res => {
                    this.loaging = false
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

