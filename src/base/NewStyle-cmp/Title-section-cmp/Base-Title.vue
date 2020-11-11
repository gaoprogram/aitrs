<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 Title 组件区
-->
<template>
    <el-row class="titleCmp">
        <el-col :span="columnNum">   
            <!-- 页面title 组件区
            sectionData: {{sectionData}} -->
            <div 
                v-for="(item, key) in sectionData.SectionData"
                :key="key"
                v-html="item.Value"></div>
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
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
        }
    },
    components: {
        SaveFooter
    },
    computed: {
        currentTextValue(){
            return  this.sectionData.Value || ''
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
