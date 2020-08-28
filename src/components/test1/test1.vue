/
* Author: gaol
* Date: 2020/07/31
* Desc： 测试动态页面  页面code 为 config.js 中的 PG_PA_EEOnjob
*/
<style lang="stylus">
    .swiperWrap {
        position: relative;
        width: 200px;
        height: 100px;
        margin: 50px auto;
        overflow: hidden;
        .btn {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            background-color: red;
            transform: translateY(-50%);
            z-index: 1;
            cursor: pointer;
            &.left {
                left: 0;
            }
            &.right {
                right: 0;
            }
        }        
        .swiperBox {
            position: absolute;
            width: 800px;
            left: 0;
            &::after {
                display: block;
                content: '';
                width: 0;
                height: 0;
                clear: both;
            }
            .item {
                float: left;
                width: 200px;
                height: 100px;
                &:nth-child(1){
                    background-color: silver;
                }
                &:nth-child(2){
                    background-color: red;
                }
                &:nth-child(3){
                    background-color blue
                }
                &:nth-child(4){
                    background-color silver
                }                
            }
        }
    }
</style>
<template>
    <div>
        <next-step-cmp>
            <page-cmp
                slot="nextStepContentSlot"
                :pageCode="pageCode"
                :authrityObj="authrityObj"
            ></page-cmp>
        </next-step-cmp>

        idx: {{idx}}
        ----
        distance: {{distance}}
        <div class="swiperWrap">
            <div class="btn left u-f-ajc" @click="next">&lt;</div>
            <div class="btn right u-f-ajc" @click="prev">&gt;</div>            
            <ul class="swiperBox">
                <li class="item">1</li>
                <li class="item">2</li>
                <li class="item">3</li>
                <li class="item">1</li>
            </ul>
        </div>
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
    import pageCmp from '@/base/NewStyle-cmp/Page-cmp/Base-page'
    import NextStepCmp from '@/base/NewStyle-cmp/Content-section-cmp/Next-step-cmp/Base-nextStep'
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
            pageCode: PA_PAGECODE_WAITEDEMPLOYEE,
            idx: 0,
            distance: 0
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

        prev () {
            debugger
            // console.log(document.getElementsByClassName("swiperBox")[0].style.cssText) 
            // console.log(document.getElementsByClassName("item")[0].style.cssText)
            if(this.idx < 3) {
                this.idx += 1           
                this.distance = -(this.idx)*200 + "px"
                document.getElementsByClassName("swiperBox")[0].style.transition = "all 1.5s"
                document.getElementsByClassName("swiperBox")[0].style.left = this.distance
                if(this.idx == 3) {
                    setTimeout(() => {
                        this.idx = 0
                        this.distance = 0     
                        document.getElementsByClassName("swiperBox")[0].style.transition = "none"
                        document.getElementsByClassName("swiperBox")[0].style.left = 0   
                    }, 1500);            
                }
            }else {
                if(this.idx == 3) {
                    // document.getElementsByClassName("swiperBox")[0].style.transition = "none"
                    // document.getElementsByClassName("swiperBox")[0].style.left = 0
                    // this.idx = 1
                    // this.distance = '-200px'  
                    // document.getElementsByClassName("swiperBox")[0].style.transition = "all 1.5s"
                    // document.getElementsByClassName("swiperBox")[0].style.left = this.distance                       
                }
                // this.idx = 0
                // this.distance = 0
                // document.getElementsByClassName("swiperBox")[0].style.transition = "all 1.5s"
                // // document.getElementsByClassName("swiperBox")[0].style.transition = "none"
                // document.getElementsByClassName("swiperBox")[0].style.left = this.distance
            }
        },
        next () {
            debugger
            console.log(document.getElementsByClassName("swiperBox")[0].style)
        }

    }
}
</script>
