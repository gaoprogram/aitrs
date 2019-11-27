<!--
  User: gaol
  Date: 2019/11/20
  功能：用户 选择器 组件 中的 自定义 tooltip组件
-->

<style lang="stylus" rel="stylesheet/stylus">

</style>

<template>
    <el-tooltip 
        placement="right" 
        effect="light"
        :visible-arrow="false"
        popper-class="cust_tooltip"
        v-if="tootipTit"
    >
        <div 
            slot="content" 
            class="cust" 
            style="background-color: #fffff;
            border: none;
            padding: 5px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
        >
            <p 
                style="color: #000000;position: relative"
            >
                {{tootipTit}}
                <span  
                    style="display:inline-block;
                    width:0;
                    height:0;
                    border-right: 8px solid #EBEEF5;
                    border-left: 8px solid transparent;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    position: absolute !important;
                    top: 50%;
                    left: -13px;
                    transform:translate(-50%,-50%); 
                    color: #fffff;
                    font-size: 12px"
                >
                </span>
            </p>
            
        </div>
        <i class="el-icon-question"></i>
    </el-tooltip>
</template>

<script>
// import SaverFooter from '@/base/Save-footer/Save-footer'
export default {
    props: {
        tootipTit: {
            type: String,
            default: ''
        }
    },
    components: {
        // SaverFooter
    },
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>
