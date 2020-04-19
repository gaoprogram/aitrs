/**
* 添加全局的自定义指令
*
*/
import Vue from 'vue'
import store from '@/store/index'

// 定义自定义指令 从流程表单 页面 点击【新增自有表单】进入的 表单管理页面
Vue.directive('atris-IsPublic', {
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

            console.log(vNode.context.baseInfoObj)
            // setTimeout(()=>{
                // 从store 中取值 
                console.log(store.state)
                let flag = store.state.directive.isPublic
                if( flag ) {
                    // 从流程表单页面进入的
                    vNode.context.baseInfoObj.IsPublic = false 
                    if(binding.value.disabled){
                        // 禁用 switch
                        vNode.context.isPublicDisabled = true
                    }
                    // el.setAttribute('disabled',true)
                    // console.log(el.disabled)
                }else {
                    // 非流程表单页面进入的
                    vNode.context.baseInfoObj.IsPublic = true 
                }
                // console.log("---->",vNode.context.baseInfoObj)
            // },0)
        // }
    },
    inserted: function(el) {
        //元素插入到DOM中的时候，会执行inserted函数[触发一次]
        // el.focus()
    },
    updated: function(el,binding,vNode) {
        //值更新时的工作
        //也会以初始值为参数调用一次
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

// 定义一个全局自定义指令  区分 流程中是从 在途、我发起的、我处理的、抄送我的、我关注的 页面中 点击的 查看btn 进入的right-fixed页面 查看btn 入口进入的 做相关页面的权限控制
Vue.directive('atris-flowRightFixedScan', {
    deep: true,
    bind: function(el, binding, vNode){

    },
    inserted: function(el, binding, vNode) {
        // store 中 获取 flowRuleScanFlag 的值
        switch(store.state.directive.currentTabStr){
            case 'onTheWay':
                el.style.display = 'none'  
                break
            case 'myStart':
                el.style.display = 'none'  
                break
            case 'copyWithMe':
                el.style.display = 'none'  
                break     
            case 'myApproval':
                el.style.display = 'none'  
                break   
            case 'myFollow':
                el.style.display = 'none'  
                break 
            case 'todo':
                debugger
                if(store.state.directive.currentActiveNameStr){
                    // currentActiveNameStr 有值
                    debugger
                    if(store.state.directive.currentActiveNameStr === 'third' ||
                       store.state.directive.currentActiveNameStr === 'five') {
                        // 挂起  和 任务池申领类目的查看
                        el.style.display = 'none'
                    } else {
                        if( binding.value ) {
                            if (binding.value.styleBlock) {
                                // switch(binding.value.styleBlock){
                                //     case 'block':
                                //         el.style.display = 'block' 
                                //         break
                                //     case 'inline-block':
                                //         el.style.display = 'inline-block'
                                //         break 
                                //     case 'inline':
                                //         el.style.display = 'inline'
                                //         break
                                // }
                                el.style.display = binding.value.styleBlock
                            }
                        }                                       
                    }
                }else {
                    // currentActiveNameStr 没有值
                    if(binding.value){
                        if(binding.value.styleBlock){
                            // switch(binding.value.styleBlock){
                            //     case 'block':
                            //         el.style.display = 'block' 
                            //         break
                            //     case 'inline-block':
                            //         el.style.display = 'inline-block'
                            //         break 
                            //     case 'inline':
                            //         el.style.display = 'inline'
                            //         break
                            // }
                            el.style.display = binding.value.styleBlock
                        }
                    }  
                }                                          
            break                                             
        }
    },
    updated: function(el, binding, vNode){
        
    },
    unbind: function(el, binding, vNode){

    }
})

// 定义一个全局自定义指令  区分 流程规则中——点击的 查看btn 入口进入的 做相关页面的权限控制
Vue.directive('atris-flowRuleScan', {
    deep: true,
    bind: function(el, binding, vNode){

    },
    inserted: function(el, binding, vNode) {
        console.log("------",store.state.directive.flowRuleScanFlag)
        // store 中 获取 flowRuleScanFlag 的值 
        if(store.state.directive.flowRuleScanFlag) {
            debugger
            // 值为真 则是从 “查看” btn 入口进入的 就隐藏
            el.style.display = 'none'                                                     
        }else {
            // 不是从 查看 btn 按钮 进入的 设置 显示出来
            if(binding.value){
                if(binding.value.styleBlock){
                    // switch(binding.value.styleBlock){
                    //     case 'block':
                    //         el.style.display = 'block' 
                    //         break
                    //     case 'inline-block':
                    //         el.style.display = 'inline-block'
                    //         break 
                    //     case 'inline':
                    //         el.style.display = 'inline'
                    //         break
                    // }
                    el.style.display = binding.value.styleBlock
                }
            }
        }
    },
    updated: function(el, binding, vNode){

    },
    unbind: function(el, binding, vNode){

    }
})

// 定义一个全局自定义指令 区分 管理系统中 角色管理/企业角色 列表中的 查看和 编辑入口
Vue.directive('atris-sysManageScan', {
    deep: true,
    bind: function(el, binding, vNode){

    },
    inserted: function(el, binding, vNode) {
        // store 中 获取 companyRoleScanFlag 的值 
        console.log("------",store.state.directive.companyRoleScanFlag)
        if(store.state.directive.companyRoleScanFlag) {
            debugger
            // 值为真 则是从 “查看” btn 入口进入的 就隐藏
            el.style.display = 'none'                                                     
        }else {
            // 不是从 查看 btn 按钮 进入的 设置 显示出来
            if(binding.value){
                if(binding.value.styleBlock){
                    // switch(binding.value.styleBlock){
                    //     case 'block':
                    //         el.style.display = 'block' 
                    //         break
                    //     case 'inline-block':
                    //         el.style.display = 'inline-block'
                    //         break 
                    //     case 'inline':
                    //         el.style.display = 'inline'
                    //         break
                    // }
                    el.style.display = binding.value.styleBlock
                }
            }
        }
    },
    updated: function(el, binding, vNode){

    },
    unbind: function(el, binding, vNode){

    }
})