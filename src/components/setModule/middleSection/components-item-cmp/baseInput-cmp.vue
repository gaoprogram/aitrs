/
* Author: gaol
* Date: 2020/10/30
* Desc： 配置板块
*/
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-input__inner {
    background-color: #ffffff !important
}
.baseinput-cmp {
   margin-top: 5px;
}
</style>
<template>
    <el-row class="baseinput-cmp">
        <el-col :span="showWith" class="topWrap">
            <el-input 
                disabled
                :placeholder="placeholder"
            ></el-input>
            <el-button 
                type="text" 
                size="mini"
                style="color: #8c8c8c;font-size: 12px"
            >{{fieldExplain}}</el-button>
        </el-col>
    </el-row>
</template>

<script>
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
        props: {
            showWith: {
                type: [Number, String],
                default: () => {
                    return 24
                }
            },
            placeholder: {
                type: String,
                default: () => {
                    return '请输入'
                }                
            },
            fieldExplain: {
                type: String,
                default: () => {
                    return '这是字段说明~'
                }
            }
        },
        components: {

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
