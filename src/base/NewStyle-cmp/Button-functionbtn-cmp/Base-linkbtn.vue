<!--
  User: gaol
  Date: 2019/5/14
  功能：链接跳转页面 按钮
-->
<template>
    <el-row class="linkBtnCmp">
        <el-col :span="columnNum" :style="styleLayOut">
            <!-- btnArr: {{btnArr}} -->
            <el-button 
                class="upBtnWrap"
                type="primary"
                :size="btnSize"
                v-for="(btnCmpItem, key) in btnArr"
                :key="key"
                @click.native="clickLinkBtn(btnCmpItem)"
            >
                {{btnCmpItem.MetaAttr.ShortName}}
            </el-button>             
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
        btnArr: {
            type: Array,
            default: () => {
                return  []    
            }
        },
        btnSize: {
            type: String,
            default: () => {
                return 'mini'
            }
        },        
        btnLayoutStyle: {
            type: String,
            default:() => {
                return 'textAlign: center'
            }
        }              
    },
    components: {
        SaveFooter
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
        clickLinkBtn(obj){
            let linkPage = obj.MetaCode 
            let linkPath = `/${linkPage}`
            console.log("linkBtn按钮上的MetaCode：", linkPage)
            this.$router.push({
                path: linkPath,
                query: {}
            })
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
