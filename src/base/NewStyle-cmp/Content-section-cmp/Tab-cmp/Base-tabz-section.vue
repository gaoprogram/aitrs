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
        tabz 布局组件-----------------------------------
        <div v-loading="loading">
            comsData(tab标签及各自下面的布局信息): {{comsData}}
            <el-col :span="columnNum">
                <el-tabs 
                    :type="showType"
                    :editable="editable"
                    :tabPosition="tabPosition"
                    v-model="activeTabName" 
                    @tab-click="handleTabClick">
                    <el-tab-pane 
                        v-for="(tab, key) in comsData"
                        :key="key"
                        :label="tab.ObjectName" 
                        :name="tab.Object">

                        <div class="tabContentSectionWrap">
                            {{currentTabObj.ObjectName}}-----
                            currentTabObj.ObjectData: {{currentTabObj.ObjectData}}
                            <div 
                                :class="['currentTabContentSection', currentTabObj.ObjectData.length<=0? 'not_found': '']"
                                v-for="(currentTabItemSection, key) in currentTabObj.ObjectData"
                                :key="key">
                                <component 
                                    :is="whichTabItemSection(currentTabItemSection, key)"
                                    :sectionData='currentTabItemSection'
                                    :textData="currentTabItemSection.SectionData"
                                ></component> 
                            </div>                           
                        </div>
                    </el-tab-pane>
                </el-tabs>     

                <slot name="tabContentSlot"></slot>
            </el-col>        
        </div>
    </el-row>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
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
            tabPosition: {
                type: String,
                default: () => 'top'
            },
            editable: {
                type: Boolean,
                default: () => false 
            },
            showType: {
                type: String,
                default: () => {
                    return 'card'
                }
            },
            sectionData: {
                type: Object,
                default: () => {
                    return {}
                }
            },        
            comsData: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        components: {
            SaveFooter, 
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
            TailCmp                     
        },
        data(){
            return {
                loading: false,
                currentTabIdx: 0,
                currentTabObj: this.comsData[0],
                activeTabName: this.comsData[0].Object
            }
        },
        computed: {

        },
        created() {

        },
        methods: {
            handleTabClick ( tab, event ) {
                debugger
                console.log(tab, event)
                this.currentTabIdx = tab.index * 1
                this.activeTabName = this.comsData[this.currentTabIdx].Object
                this.currentTabObj = this.comsData[this.currentTabIdx]
                this.$bus.$emit("tabCmpClick", tab)
            }, 
            whichTabItemSection(sectionObj, idx){
                // debugger  和页面中的布局  公用相同的布局部分
                let sectionType = sectionObj.Section || ''
                switch(sectionType){
                    case "Title": //  Title
                        return TitleCmp
                    case "ShowF":  // ShowF
                        return ShowFieldsCmp
                    case "Content":  // Content
                        // return  ContentCmp
                        return ContentCmpComSection
                    case "UpText": // UpText
                        return UpTextCmp
                    case "UpBtn": // UpBtn  页面中的btn区
                        return UpBtnCmp                    
                    case "OutBtn": // OutBtn   content中的btn区
                        return OutBtnCmp
                    case "DownText": // DownText
                        return DownTextCmp
                    case "Link":  // Link
                        return LinkCmp
                    case "Tail": // Tail
                        return TailCmp
                    default:
                        return ErrorPage404
                }
            },                                         
        }
    }
</script>

