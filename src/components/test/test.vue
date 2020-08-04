/
* Author: gaol
* Date: 2020/07/31
* Desc： 测试动态页面  页面code 为 config.js 中的 PA_PAGECODE_WAITEDEMPLOYEE
*/
<template>
    <div>
        <input type="file" id="file" onchange="fileInfo()">
        <el-button type="button" size="mini" @click.native="joinToPage('test1')">跳转到test1 页面</el-button>
        <page-cmp
            :pageCode="pageCode"
            :authrityObj="authrityObj"
        ></page-cmp>

        <!-- <series-line-cmp></series-line-cmp> -->
        <test-line-cmp></test-line-cmp>
    </div>
</template>

<script>
  import { 
    REQ_OK, 
    PA_PAGECODE_JOINEDEMPLOYEE, 
    PA_PAGECODE_WAITEDEMPLOYEE,
    PA_PAGECODE_LEAVEDEMPLOYEE,
    PA_PAGECODE_CONTRACTMANAGE
  } from '@/api/config'
  import { authorityArr } from '@/utils/authority1.js'
  import pageCmp from '@/base/NewStyle-cmp/Page-cmp/Base-page'
  import SeriesLineCmp from '@/base/NewStyle-cmp/Echarts-cmp/Base-seriesLine'
  import TestLineCmp from '@/base/NewStyle-cmp/Echarts-cmp/test-cmp'
  import {
      setLocalStorage,
      getLocalStorage
  } from '@/utils/auth.js'
export default {
    components: {
        pageCmp,
        SeriesLineCmp,
        TestLineCmp
    },
    data(){
        return {
            authrityObj: authorityArr,
            pageCode: PA_PAGECODE_JOINEDEMPLOYEE
        }
    },
    created(){
        let authrityObj = getLocalStorage("pageAuthrity")
        if(authrityObj) {

        }else {
            // this._getAuthrityObj(this.pageCode)
            // 存入缓存
            setLocalStorage("authrityObj", JSON.stringify(this.authrityObj))
        }
    },
    methods: {
        // 获取当前页面的权限数据
        _getAuthrityObj(pageCode){
            //...
            // 获取数据后 存入 localstorage
            setLocalStorage("authrityObj", JSON.stringify(this.authrityObj))
        },
        joinToPage(str){
            this.$router.push({
                path: `/${str}`
            })
        },
        fileInfo(){
            let fileObj = document.getElementById('file').files[0];
            console.log(fileObj);            
        }

    }
}
</script>

<style>

</style>