<!--
  User: gaol
  Date: 2019/5/14
  功能：下一步 组件
-->
<template>
    <el-row class="nextStepWrap">
        <el-col :span="columnNum">   
            <slot name="nextStepContentSlot"></slot>
            <save-footer @save="nextStep" @cancel="back" :saveText="saveText" :cancelText="cancelText"></save-footer>
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
        saveText: {
            type: String,
            default: () => {
                return '下一步'
            }
        },
        cancelText: {
            type: String,
            default: () => {
                return '返回'
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
        handleTabClick ( tab, event ) {
            console.log(tab, event)
            this.$bus.$emit("tabCmpClick", tab)
        },
        nextStep(){
            // 下一步骤
            this.$bus.$emit("nextStepCmpClick")
        },
        back(){
            // 返回上一步
            this.$bus.$emit("backbeforeStepCmpClick")
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
