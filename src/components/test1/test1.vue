/
* Author: gaol
* Date: 2020/07/31
* Desc： 测试动态页面  页面code 为 config.js 中的 PG_PA_EEOnjob
*/
<template>
    <div>
        <next-step-cmp>
            <page-cmp
                slot="nextStepContentSlot"
                :pageCode="pageCode"
                :authrityObj="authrityObj"
            ></page-cmp>
        </next-step-cmp>
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
  import NextStepCmp from '@/base/NewStyle-cmp/Next-step-cmp/Base-nextStep'
  import {
      setLocalStorage,
      getLocalStorage
  } from '@/utils/auth.js'
export default {
    components: {
        pageCmp,
        NextStepCmp
    },
    data(){
        return {
            authrityObj: authorityArr,
            pageCode: PA_PAGECODE_WAITEDEMPLOYEE
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

    }
}
</script>

<style>

</style>