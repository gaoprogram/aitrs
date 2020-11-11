<!--
  User: gaol
  Date: 2020/7/31
  功能：页面通用 组件  controlType 为
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.basePage-cmp-wrap {
    min-height: 600px;
    padding: 0 20px 20px;
    box-sizing: border-box;
    .back {
        text-align: right;
        &::after {
            cursor pointer
        }
    }
    .sectionItem {
        // border-bottom: 1px dotted silver;
        border: 1px dotted silver;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>
<template>
    <div :class="['basePage-cmp-wrap', pageModel.lenth<=0? 'not_found':'']" v-loading="pageLoading" >
        <div class="back">
            <icon-svg :icon-class="backIcon" @click.native="backPage"></icon-svg>
        </div>          
        <!-- 通用页面组件 -->
        <!-- pageModel: {{pageModel}} -->
        <!----组件部分------>
        <!-- <up-text-cmp sectionData='<div style="color: red">重新入职说明区1</div>'></up-text-cmp> -->
        <el-row>          
            <el-col 
                :span="24" 
                class="sectionItem marginT20"
                v-for="(section, key) in pageModel"
                :key="key"
            >
                <!-- section.Section: {{section.Section}}
                ------
                section: {{section}} -->
                <component 
                    :is="whichSection(section, key)"
                    :sectionData='section'
                    :textData="section.SectionData"
                ></component>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import { 
    REQ_OK, 
  } from '@/api/config'
  import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
//   import TabCmp from '@/base/NewStyle-cmp/Content-section-cmp/Tab-cmp/Base-tab'
  import TitleCmp from '@/base/NewStyle-cmp/Title-section-cmp/Base-Title'
  import ShowFieldsCmp from '@/base/NewStyle-cmp/ShowFields-section-cmp/Base-ShowFields'
//   import Search11 from '@/base/NewStyle-cmp/Search11-section-cmp/Base-Search11'
  import NotFoundCmp from '@/base/errorPage/404'
  import UpTextCmp from '@/base/NewStyle-cmp/UpText-section-cmp/Base-UpText'
  import UpBtnCmp from '@/base/NewStyle-cmp/UpBtn-section-cmp/Base-UpBtn'
  import DownBtnCmp from '@/base/NewStyle-cmp/DownBtn-section-cmp/Base-DownBtn'
  import OutBtnCmp from '@/base/NewStyle-cmp/Content-section-cmp/OutBtn-cmp/Base-OutBtn'
  import ContentCmpComSection from '@/base/NewStyle-cmp/Content-section-cmp/Base-Content-cmp'
  import DownTextCmp from '@/base/NewStyle-cmp/DownText-section-cmp/Base-DownText'
  import LinkCmp from '@/base/NewStyle-cmp/Link-section-cmp/Base-Link'
  import TailCmp from '@/base/NewStyle-cmp/Tail-section-cmp/Base-Tail'
  import {
    GetPageModelData
  } from '@/api/newStyle'
  import iconSvg from '@/base/Icon-svg/index'
  export default {
    name: 'basepage',
    mixins: [ fieldGroupControlTypeMixin ],
    components: {
        iconSvg,
        TitleCmp,
        // Search11,
        NotFoundCmp,
        ContentCmpComSection,
        UpTextCmp,
        UpBtnCmp,
        OutBtnCmp,
        DownBtnCmp,
        DownTextCmp,
        TailCmp
    },
    props: {
        pageCode: {
            type: String,
            default: ''
        },
        authrityObj: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    computed: {

    },
    data () {
      return {
        pageLoading: false,
        backIcon: 'preStep',
        currentPageData: {
            components: [
                {
                    controlType: 'fieldGroup',
                    comsData: {
                        fieldGroup: [
                            {
                                groupName: '分组1',
                                groupCode: 'team1',
                                Fields: [
                                    {
                                        controlType: "1",
                                        FieldName: "字段1",
                                        FieldValue: "ceshi",
                                        Hidden: false,
                                        Tips: '这是tips内容',
                                        isTitle: true,
                                        Required: true
                                    },
                                    {
                                        controlType: "5",
                                        FieldName: "字段2",
                                        FieldValue: "c",
                                        Hidden: false,
                                        Tips: '这是tips内容',
                                        isTitle: true,
                                        Required: true                                   
                                    }
                                ]
                            },
                            {
                                groupName: '分组2',
                                groupCode: 'team2',
                                Fields: [
                                    {
                                        controlType: "1",
                                        FieldName: "字段2",
                                        FieldValue: "test",
                                        Hidden: false,
                                        Tips: '999999999',
                                        isTitle: true,
                                        Required: true     
                                    },
                                    {
                                        controlType: "1",
                                        FieldName: "字段22",
                                        FieldValue: "test",
                                        Hidden: false,
                                        Tips: '555',
                                        isTitle: true,
                                        Required: true     
                                    },                                    
                                ]
                            },                        
                        ]
                    }
                },
                {
                    controlType: 'tableCmp',
                    comsData: {
                        tableContentData: [
                            {
                                label: "中国联通",
                                property: "company",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "李四",
                                property: "empName",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "0001",
                                property: "empNo",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },                         
                        ],
                        tableHeadData: [
                            {
                                label: "公司",
                                property: "company",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "员工姓名",
                                property: "empName",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "员工号",
                                property: "empNo",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },                         
                        ]
                    }
                },                
            ]
        },
        field: {
            controlType: "1",
            FieldName: "关键字:",
            fieldValue: "ceshi",
            Hidden: false,
            Tips: '',
            isTitle: true
        }, 
        pageModel: []      
      }
    },
    created () {
        // 将当前的 pageCode 存入到store中
        this._setPageCode(this.pageCode)
        // 获取当前页面的动态页面数据
        this._GetPageModelData()

        // 接收 tab 组件中的 tabCmpClick 事件
        this.$bus.$on("tabCmpClick", (tab) => {
            debugger
            this.$message.success({
                type: 'info',
                message: `${tab.label}被点击了`
            })
        })  
    },
    beforeDestroy () {
      // 销毁
      this.$bus.$off("tabCmpClick")
    },
    methods: {
        // 将该页面的pageCode传到 全局中存储
        _setPageCode(pageCode){
            debugger
            if(pageCode){
                this.$store.dispatch('setCurrentPageCode', pageCode)
            }
        },
        whichSection(sectionObj, idx){
            // debugger
            let sectionType = sectionObj.Section || ''
            switch(sectionType){
                case "Title":  //  Title
                    return TitleCmp
                case "ShowF":  // ShowF
                    return ShowFieldsCmp
                case "Content":  // Content
                    // return  ContentCmp
                    return ContentCmpComSection
                case "UpText":   // UpText
                    return UpTextCmp
                case "UpBtn":   // UpBtn  页面中的btn区
                    return UpBtnCmp   
                case "OutBtn":   // OutBtn   content中的 outBtn区
                    return OutBtnCmp
                case "Btn":    // Btn  content中 分组组件中的 Btn区
                    return OutBtnCmp
                case "DownBtn":   // DownBtn   页面中的 DownBtn 区
                    return DownBtnCmp                     
                case "DownText":  // DownText
                    return DownTextCmp
                case "Link":     // Link
                    return LinkCmp
                case "Tail":    // Tail
                    return TailCmp
            }
        },
        _GetPageModelData(){
            this.pageLoading = true
            GetPageModelData(this.pageCode).then(res => {
                this.pageLoading = false
                if(res && res.data.State === REQ_OK){
                    this.pageModel = res.data.Data
                }else {
                    this.$message.success({
                        type: 'warning',
                        message: `${res.data.Error}`
                    })
                }
            })
        },
        backPage(){
            this.$router.go(-1)
        }        
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

