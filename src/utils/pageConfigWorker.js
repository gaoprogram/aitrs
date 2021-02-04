import fetch from '@/utils/fetch'
import {
    loginByUsername
} from '@/api/login'

// self.addEventListener('message', function (e) {
//     console.log("打印主线程发送给worker线程的消息", e)
//     loginByUsername('90032', 'f7e47deccf3a607845ae1325e8cd0424', '80000000').then(res => {
//         // postMessage()方法-它用于向HTML页面传回一段消息
//         self.postMessage('worker线程发送给主线程的消息')
//         console.log('worker中打印返回的结果', res.data.Data)
//     })
// }, false);

onmessage = function(e){
    console.log("打印主线程发送给worker线程的消息", e)
    self.postMessage('worker线程发送给主线程的消息')
}
// loginByUsername('90032', 'f7e47deccf3a607845ae1325e8cd0424', '80000000').then(res => {
//     // postMessage()方法-它用于向HTML页面传回一段消息
//     self.postMessage('55555555555')
//     console.log('worker中打印返回的结果', res.data.Data)
// })