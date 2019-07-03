/**
* 添加全局的自定义指令
*
*/
import Vue from 'vue'

Vue.directive('atris-IsPublic', {
    deep: true,  // 自定义属性用在对象上，对象内部属性变化的时候触发update，在指令定义对象中指定deep:true
    bind: function (el, binding,vNode) {
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
        // if( binding && binding.value.isPublicFlag ) {
        //     console.log(vNode.context.baseInfoObj)
        //     vNode.context.baseInfoObj.IsPublic = false
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
        debugger
        console.log(el)
        console.log(binding)
        console.log(vNode)
        if( binding && binding.value.isPublicFlag ) {
            console.log(vNode.context.baseInfoObj)
            vNode.context.baseInfoObj.IsPublic = false
        }        
    },
    unbind: function(){
        //清理工作
        //例如，删除bind()添加的事件监听器
    }
})