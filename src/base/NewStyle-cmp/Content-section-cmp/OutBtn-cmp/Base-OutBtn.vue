<!--
  User: gaol
  Date: 2019/5/14
  功能： 外部按钮组件
-->
<template>
    <el-row class="outBtnWrap">
        <el-col :span="columnNum" :style="styleLayOut">
            content中外部按钮组件
            <el-button 
                class="upBtnWrap"
                type="primary"
                :size="btnSize"
                v-for="(btnCmpItem, key) in sectionData.SectionData"
                :key="key"
                @click.native="clickOutBtn(btnCmpItem, sectionData)"
            >
                {{ btnCmpItem.MetaAttr.ShortName }}
            </el-button>               
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
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
    data(){
        return {
        }
    },
    computed: {
        styleLayOut(){
            return this.btnLayoutStyle
        }
    },    
    methods: {
        // 点击了
        clickOutBtn( btn, sectionData ){
            debugger
            // this.$bus.$emit( "a", "444" )
            this.$emit("handlerDialog",btn)
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
