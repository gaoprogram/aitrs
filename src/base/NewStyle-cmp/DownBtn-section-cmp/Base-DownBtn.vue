<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 downbtn 组件
-->
<template>
    <el-row class="downBtnCmp">
        <el-col :span="columnNum">   
            页面 downbtn 组件
            <!-- sectionData： {{sectionData}} -->
            <!-- <div 
                class="downBtnWrap"
                v-for="(downBtnCmpItem, key) in sectionData.SectionData"
                :key="key"
            >
                <div v-html="downBtnCmpItem.Value">
                </div>
            </div>               -->
            <normal-btn-cmp
                :btnArr="sectionData.SectionData"
            ></normal-btn-cmp>
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
import NormalBtnCmp from '@/base/NewStyle-cmp/Button-functionbtn-cmp/Base-normalbtn'

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
                return {}
            }
        }
    },
    components: {
        SaveFooter,
        NormalBtnCmp
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
