/**
 * Created by gaol on 2019/7/17
 *   全局的 loading 
 */
import Vue from 'vue'
// import { Loading } from 'element-ui'

// loading框设置局部刷新，且所有请求完成后关闭loading框
// 声明一个对象用于存储请求个数
let atrisGlobalLoading = null
let needLoadingRequestCount = 0
function startLoading(){
    debugger
    console.log(323444444442)
    atrisGlobalLoading = Vue.prototype.$loading({
        lock: true,
        text: '努力加载中gfdgf...',
        background: 'rgba(0,0,0,0.5)',
        target: document.querySelector('.globalLoading-area') // 设置加载动画区域
    })
}
function endLoading(){
    atrisGlobalLoading.close()
}
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}
function hideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
        needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}  

