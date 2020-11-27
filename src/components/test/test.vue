/
* Author: gaol
* Date: 2020/07/31
* Desc： 测试动态页面  页面code 为 config.js 中的 PA_PAGECODE_WAITEDEMPLOYEE
*/
<template>
    <div>
        <!-- <input type="file" id="file" @input="upload">
        <el-button type="button" size="mini" @click.native="joinToPage('test1')">跳转到test1 页面</el-button> -->
        pageCode: {{pageCode}}
        <base-page-cmp
            :pageCode="pageCode"
            :authrityObj="authrityObj"
        ></base-page-cmp>

        <!-- <common-table-cmp></common-table-cmp> -->
        <!-- <series-line-cmp></series-line-cmp> -->
        <!-- <test-line-cmp></test-line-cmp> -->
    </div>
</template>

<script>
    import { 
        REQ_OK
    } from '@/api/config'
    import { 
        PA_PAGECODE_JOINEDEMPLOYEE, 
        PA_PAGECODE_WAITEDEMPLOYEE,
        PA_PAGECODE_LEAVEDEMPLOYEE,
        PA_PAGECODE_CONTRACTMANAGE
    } from '@/api/newStyleConfig'
    import { authorityArr } from '@/utils/authority1.js'
    //   import pageCmp from '@/base/NewStyle-cmp/Page-cmp/Base-page'
    import BasePageCmp from '@/base/NewStyle-cmp/Page-cmp/Base-page'
    import SeriesLineCmp from '@/base/NewStyle-cmp/Content-section-cmp/Echarts-cmp/Base-seriesLine'
    import TestLineCmp from '@/base/NewStyle-cmp/Content-section-cmp/Echarts-cmp/test-cmp'
    import CommonTableCmp from '@/base/NewStyle-cmp/Table-common-cmp/Base-Common-Table'
    import {
        setLocalStorage,
        getLocalStorage
    } from '@/utils/auth.js'
export default {
    components: {
        BasePageCmp,
        SeriesLineCmp,
        TestLineCmp,
        CommonTableCmp
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
            debugger
            let fileObj = document.getElementById('file').files[0];
            console.log(fileObj);   
                     
        },
         // 从start字节处开始上传
        upload(start) {

            const chunkSize = 1024 * 1024;
            let fileObj = document.getElementById('file').files[0];
            // 上传完成
            if (start >= fileObj.size) {
                return;
            }
            // 获取文件块的终止字节
            let end = (start + chunkSize > fileObj.size) ? fileObj.size : (start + chunkSize);
            // 将文件切块上传
            let fd = new FormData();
            fd.append('file', fileObj.slice(start, end));
            // POST表单数据
            let xhr = new XMLHttpRequest();
            xhr.open('post', 'upload.php', true);
            xhr.onload = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // 上传一块完成后修改进度条信息，然后上传下一块
                    let progress = document.getElementById('progress');
                    progress.max = fileObj.size;
                    progress.value = end;
                    upload(end);
                }
            }
            xhr.send(fd);
        }        

    }
}
</script>

<style>

</style>