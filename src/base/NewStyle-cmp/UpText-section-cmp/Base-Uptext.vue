<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 uptext 组件区
-->
<style lang="stylus" rel="stylesheet/stylus">

</style>

<template>
    <el-row class="uptextCmp">
        <div 
            class="upTextWrap"
            v-for="(textCmpItem, key) in sectionData.SectionData"
            :key="key"
        >
            <el-col :span="columnNum" class="marginT10">   
                页面 uptext 组件区textCmpItem： {{textCmpItem.Value}} 
                <div v-html="textCmpItem.Value"></div> 
            </el-col>   
        </div>
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
        getText(){
            return '<div style="color: red;">重新入职说明区1</div>'
        }
    },
    data(){
        return {
            // html: `<span style="color:#E53333;">文本</span>`
        }
    },
    methods: {

    }
  }
</script>


