<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 linkCmp 组件区
-->
<template>
    <el-row class="linkCmp">
        <el-col :span="columnNum" :style="styleLayOut">   
            页面linkCmp 组件区
            <!-- sectionData: {{sectionData}} -->
            <!-- <el-button 
                class="upBtnWrap"
                type="primary"
                :size="btnSize"
                v-for="(btnCmpItem, key) in sectionData.SectionData"
                :key="key"
            >
                {{btnCmpItem.MetaAttr.ShortName}}
            </el-button>              -->

            <link-btn-cmp 
                :btnArr="sectionData.SectionData"
            ></link-btn-cmp>
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
import LinkBtnCmp from '@/base/NewStyle-cmp/Button-functionbtn-cmp/Base-linkbtn'
  // 底部保存组件
  export default {
    props: {
        columnNum: {
            type: [String, Number],
            default: () => {
                return 24
            }
        },
        sectionData: {
            type: Object,
            default: () => {
                return  {}     
            }
        },
        btnLayoutStyle: {
            type: String,
            default:() => {
                return 'textAlign: right'
            }
        }              
    },
    components: {
        SaveFooter,
        LinkBtnCmp
    },
    computed: {
        styleLayOut(){
            return this.btnLayoutStyle
        }
    },
    data(){
        return {

        }
    },
    methods: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
