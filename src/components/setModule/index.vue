/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
.setModule {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    >>>.leftSectionWrap {
        height: 100%;
    }
    >>>.middleSectionWrap {
        height: 100%;
    }
    >>>.rightSectionWrap {
        height: 100%;
    }
}
</style>
<template>
    <el-row class="setModule">
        <el-col :span="4" class="leftSectionWrap">
            <left-cmp></left-cmp>
        </el-col>
        <el-col :span="16" class="middleSectionWrap">
            <middle-cmp></middle-cmp>
        </el-col>
        <el-col :span="4" class="rightSectionWrap">
            <right-cmp></right-cmp>
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

    } from '@/api/newStyleConfig'
    import {
        // setLocalStorage,
        // getLocalStorage
    } from '@/utils/auth.js'
    export default {
        components: {
            LeftCmp,
            MiddleCmp,
            RightCmp
        },
        data(){
            return {

            }
        },
        created(){
            
        },
        methods: {
        }
    }
</script>
