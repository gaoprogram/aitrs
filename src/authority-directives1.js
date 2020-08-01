/**
* 权限相关的自定义指令
*
*/
import Vue from 'vue'
import store from '@/store/index'
import {
    authorityObj
} from '@/utils/authority'
import {
    authorityArr
} from '@/utils/authority1'
import { 
    page1,
    page2,
    page3
} from '@/api/config'


function findCurrentAuthorityObj (authorityArr,bindingName,bindingEleStyle,bindingParent) {
    debugger
    let flag = false
    if(authorityArr && authorityArr.length){
        let length = authorityArr.length
        for(let i=0;i<length;i++){
            let item = authorityArr[i]
            if(item.pageCode == bindingName && item.EleStyle == bindingEleStyle
                && item.parentCode == bindingParent ){
                // 找到了
                flag = true
                // window.alert(flag)
                return flag
            }else {
                // 递归
                debugger
                if(item.sub && item.sub.length){
                    let res = findCurrentAuthorityObj(item.sub, bindingName,bindingEleStyle,bindingParent)
                    if(!res){
                        continue
                    }else {
                        return res
                    }
                }else {
                    continue
                }
            }
        }
    }else {
        return flag
    }
}
Vue.directive('atris-authrity', {
    deep: true,  // 自定义属性用在对象上，对象内部属性变化的时候触发update，在指令定义对象中指定deep:true
    bind: function (el, binding, vNode) {
        //注意：在每个函数中第一个参数，永远是el,表示被绑定了指令的那个元素，这个 el 参数，是一个原生的JS对象
        //在元素刚绑定了指令的时候，还没有插入到DOM中去，这时调用  focus 方法么有作用
        //因为，一个元素，只有插入DOM之后，才能获取焦点
        //准备工作 每当指令绑定到元素上的时候,会立即执行这个 bind 函数，只执行一次。
        //例如，添加事件处理器或只需要运行一次的高耗任务
        // binding对象包含以下属性：
        // name：指令名，不包括 v- 前缀。
        // value：指令的绑定值，例如：v-my-directive="1+1"，value的值是2.
        // oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated钩子中使用。无论值是否改变都可用。
        // expression：绑定值的字符串形式。例如  v-my-directive="1+1"，expression的值是 "1+1".
        // arg：传给指令的参数。例如 v-my-directive:foo，arg的值是"foo".
        // 通过 vode.context() 可以获取 整个对象
        // el.focus()
        debugger
        // console.log(el)
        // console.log(binding)
        // console.log(vNode)
        // if( binding ) {
        let currentPage = store.state.directive.currentAuthorityPageCode

        console.log("===========", currentPage)
        // console.log(authorityObj)
        // console.log("-------------", `${authorityObj[page1]}`)
        let bindingPage = binding.value.page
        let bindingName = binding.value.name
        let bindingParent = binding.value.parent
        let bindingEleStyle = binding.value.eleStyle
        let bindingDisplayStyle = binding.value.displayStyle
        switch(currentPage){
            case `${page1}`:
                if(bindingPage == page1) {
                    console.log("------------bindingName:",bindingName)
                    console.log("-------bindingEleStyle:",bindingEleStyle)
                    console.log("------bindingParent:",bindingParent)
                    // window.alert(bindingPage == page1)
                   // 当前页面 正好是组件binding.value.page 
                    let resHasAuthorityFlag = findCurrentAuthorityObj(authorityArr, bindingName,bindingEleStyle,bindingParent)
                    console.log("------------resHasAuthorityFlag:",resHasAuthorityFlag)
                    if(!resHasAuthorityFlag) {
                        el.style.display = 'none'   
                    }else {
                        el.style.display = binding.value.displayStyle
                    }                    
                }else {
                
                }
                break
            case `${page2}`:
                // el.style.display = 'block'   
                if(bindingPage == page2) {
                    // window.alert(bindingPage == page2)
                   // 当前页面 正好是组件binding.value.page 
                   console.log("------------bindingName:",bindingName)
                   console.log("-------bindingEleStyle:",bindingEleStyle)
                   console.log("------bindingParent:",bindingParent)
                //    window.alert(bindingName,bindingEleStyle,bindingParent)
                    debugger
                    let resHasAuthorityFlag = findCurrentAuthorityObj(authorityArr, bindingName,bindingEleStyle,bindingParent)
                    console.log("------------resHasAuthorityFlag:",resHasAuthorityFlag)
                    if(!resHasAuthorityFlag) {
                        el.style.display = 'none'   
                    }else {
                        el.style.display = binding.value.displayStyle
                    }                    
                }else {
                
                }                
                break
            case `${page3}`:

                break                               
        }
    },
    inserted: function(el) {
        //元素插入到DOM中的时候，会执行inserted函数[触发一次]
        // el.focus()
    },
    updated: function(el,binding,vNode) {
        //值更新时的工作
        //也会以初始值为参数 调用一次
        // console.log(el,binding)  
    },
    unbind: function(el, binding, vNode){
        //清理工作
        //例如，删除bind()添加的事件监听器
        // 消除 store 中 从 流程配置页面 跳入到 表单配置的页面的flag 标识
        console.log("-------销毁")
        if( store.state.directive.isPublic ){
            debugger
            // let params = {
            //     tableCodeCustomer: vNode.context.tableCode_customer
            // }
            // store.dispatch("setIsPublic", false, params)
        }
         
    }
})