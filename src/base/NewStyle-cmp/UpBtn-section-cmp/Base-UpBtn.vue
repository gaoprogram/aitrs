<!--
  User: gaol
  Date: 2019/5/14
  功能：页面 upBtn 组件区
-->
<template>
    <el-row class="upBtnCmp">
        <el-col :span="columnNum" :style="styleLayOut">   
            页面 upBtn 组件区
            <!-- <save-footer @save="nextStep" @cancel="back" :saveText="saveText" :cancelText="cancelText"></save-footer> -->
            <!-- sectionData: {{sectionData}} -->
            <!-- <el-button 
                class="upBtnWrap"
                type="primary"
                :size="btnSize"
                v-for="(btnCmpItem, key) in sectionData.SectionData"
                :key="key"
            >
                {{btnCmpItem.MetaAttr.ShortName}}
            </el-button>             -->

            <popup-btn-cmp 
                :btnArr="sectionData.SectionData"
            ></popup-btn-cmp>            
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
import PopupBtnCmp from '@/base/NewStyle-cmp/Button-functionbtn-cmp/Base-popUpbtn'

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
        btnSize: {
            type: String,
            default: 'mini'
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
        PopupBtnCmp
    },
    computed: {
        styleLayOut(){
            return this.btnLayoutStyle
        }
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
