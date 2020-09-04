<!--
  User: gaol
  Date: 2019/5/14
  功能：页面中的 content区域 组件
-->
<template>
    <el-row class="com-content-section-cmp">
        =-------页面中的 content区域 组件部分-------------
        sectionData: {{sectionData}}
        <el-col 
            :span="columnNum"
            class="comSectionItem"
            v-for="(comSection, key) in sectionData.SectionData"
            :key="key"
            >   
            -----------
            comSection: {{comSection}}
            <component 
                :is="currentComComponent(comSection.CombineType)"
                :comData='comSection'
            ></component>            
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { contentCmpControlTypeMixin } from '@/utils/newStyleMixins-content-com.js'
    import {
        REQ_OK
    } from '@/api/config.js'
    import { 
        GetComponentData
    } from '@/api/newStyle.js'    
    // 底部保存组件
    export default {
        mixins: [ contentCmpControlTypeMixin ],
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
                    return {}
                }
            }
        },
        components: {
            SaveFooter,          
        },
        data(){
            return {

            }
        },
        created() {

        },
        methods: {
            // 页面 content部分 获取 content内 组件数据 
            // _GetComponentData(Type, ComponentCode, ModuleCode) {
            //     this.tableLoading = true
            //     GetComponentData(Type, ComponentCode, ModuleCode).then(res => {
            //         this.tableLoading = false
            //         if(res && res.data.State === REQ_OK){
            //             debugger
            //             this.data_table = res.data.Data
            //         }else {
            //             this.$message({
            //                 type: 'error',
            //                 message: `获取表数据失败,${res.data.Error}`
            //             })
            //         }
            //     })
            // },            
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
