/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
.setModule {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f5f7fa;
    .topWrap {
        padding: 0 20px;      
        height: 56px;
        line-height: 56px;
        box-shadow: 0 2px 8px 2px rgba(0,0,0,.1);   
        background-color: #ffffff;     
        .headerWrap {
            .left-header {
                width: 300px;
                border-right: 1px solid silver;
                margin-right: 5px;
            }
            .right-header {
                .text {
                    margin: 0 10px;
                    font-size: 18px;
                    color: #000000;
                    border: none;
                    &.is-active {
                        color: #409EFF;
                        border-radius: 0;
                        border-bottom: 2px solid #409EFF
                    }
                }
            }
        }    
    }
    .containerWrap {
        height: calc(100% - 60px);
        overflow: hidden;
        margin-top: 20px;
        padding-left: 20px;
        >>>.leftSectionWrap {
            height: 100%;
            min-width: 200px;
            padding: 0 10px;
            box-sizing: border-box;
            overflow: auto;
            background-color: #ffffff;
        }
        >>>.middleSectionWrap {
            height: 100%;
            padding: 0 0 20px 0;
            box-sizing: border-box;
            overflow: auto;
            margin: 0 20px;
            background-color: #ffffff;
        }
        >>>.rightSectionWrap {
            height: 100%;
            // min-width: 200px;
            padding: 0 10px 20px 0;
            box-sizing: border-box;
            overflow: auto;    
            // background-color: #ffffff;
        }    
    } 
}
</style>
<template>
    <el-row class="setModule u-f u-f-column">

        <el-col :span="24" class="topWrap" v-if="showTopNav">
            <div class="headerWrap u-f">
                <div class="left-header">
                    <i class="el-icon-back"></i>
                    <el-button type="text" style="font-size: 16px;color: #000000">返回</el-button>
                </div>
                <div class="right-header u-f-g2 u-f-jsb">
                    <div class="u-f-jst">
                        <el-button 
                            type="text" 
                            :class="['text', activeHeaderText==='页面设置'? 'is-active': '']" 
                            @click.native="clickHeaderText('页面设置')"
                        >页面设置</el-button>
                        <el-button 
                            type="text" 
                            :class="['text', activeHeaderText==='工作流设置'? 'is-active': '']"
                            @click.native="clickHeaderText('工作流设置')"
                        >工作流设置</el-button>
                        <el-button 
                            type="text" 
                            :class="['text', activeHeaderText==='拓展设置'? 'is-active': '']"
                            @click.native="clickHeaderText('拓展设置')"
                        >拓展设置</el-button>
                    </div>
                    <div>
                        <el-button type="primary" size="mini" disabled>预览</el-button>
                        <el-button type="primary" size="mini">取消</el-button>
                        <el-button type="primary" size="mini">保存</el-button>
                    </div>
                </div>
            </div>
        </el-col>

        <el-col :span="24" class="containerWrap u-f">
            <el-col :span="4" class="leftSectionWrap u-f-g1 u-f-s1">
                <!-- leftCmps: {{leftCmps}} -->
                <left-cmp 
                    ref="leftCmpRef"
                    :objP="objP"
                ></left-cmp>
            </el-col>

            <el-col :span="12" class="middleSectionWrap u-f-g1 u-f-s1">
                <!-- currentMiddleSelectArr: {{currentMiddleSelectArr}} -->
                <middle-cmp
                    v-loading="loading"
                    ref="middleCmpRef"
                    :objP="objP"
                ></middle-cmp>
            </el-col>

            <el-col :span="8" class="rightSectionWrap u-f-g1 u-f-s1">
                <right-cmp 
                    ref="rightCmpRef"
                    :objP="objP"
                    :showAllSetItem="false"
                ></right-cmp>
            </el-col>

        </el-col>

    </el-row>
</template>

<script>
    import LeftCmp from './leftSection/LeftSection-cmp.vue'
    import MiddleCmp from './middleSection/MiddleSection-cmp.vue'
    import RightCmp from './rightSection/RightSection-cmp.vue'
    import { 
        REQ_OK
    } from '@/api/config'
    import {
        getControlAttributes,
        getMiddleSetData
    } from '@/api/systemManage'
    let that = null
    export default {
        props: {
            objP: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            showTopNav: {
                type: Boolean,
                default: true
            }
        },
        components: {
            LeftCmp,
            MiddleCmp,
            RightCmp
        },
        data(){
            return {
                loading: false,
                activeHeaderText: '页面设置',
            }
        },
        created(){
            that = this
        },
        methods: {        
            clickHeaderText(tit){
                this.activeHeaderText = tit
            }
        }
    }
</script>
