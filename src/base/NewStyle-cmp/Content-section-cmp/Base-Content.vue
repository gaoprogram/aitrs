<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 content-section 组件
-->
<template>
    <el-row class="content-section-cmp">
        <el-col :span="columnNum">   
            <!-- 页面 content-section 组件
            sectionData: {{sectionData}}
            ----- -->
            sectionData: {{sectionData}}
            ---
            <!-- currentComComponent(sectionData.CombineType): {{currentComComponent(sectionData.CombineType)}} -->
        <div 
            class="contentWrap"
            v-for="(contentCmpItem, key) in sectionData.SectionData"
            :key="key"
        >
            <component
                :is="currentComComponent(contentCmpItem.CombineType)"
                :comData= "contentCmpItem"
            >
            </component>
        </div>
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { contentCmpControlTypeMixin } from '@/utils/newStyleMixins-content-com.js'
    // 底部保存组件
    export default {
        mixins: [ contentCmpControlTypeMixin ],
        props: {
            columnNum: {
                type: [String, Number],
                default: () => {
                    return '24'
                }
            },
            sectionData: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            SaveFooter
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
