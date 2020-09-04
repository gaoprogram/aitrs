<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 upBtn 组件区
-->
<template>
    <el-row class="upBtnCmp">
        <el-col :span="columnNum">   
            页面 upBtn 组件区
            <!-- <save-footer @save="nextStep" @cancel="back" :saveText="saveText" :cancelText="cancelText"></save-footer> -->
            sectionData: {{sectionData}}
            <div 
                class="upBtnWrap"
                v-for="(btnCmpItem, key) in sectionData.SectionData"
                :key="key"
            >
                {{btnCmpItem}}
            </div>            
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
