import store  from '@/store/index'
import { getToken } from '@/utils/auth'
export const socketObj = {
    socket: null,
    configs: {
        path: `ws://192.168.0.101:9990/websocket/`
    },
    init: function(){
        if(typeof(WebSocket) === "undefined"){
            alert("您的浏览器不支持socket")
        }else{
            debugger
            // 实例化socket
            if(!this.socket){
                this.socket = new WebSocket(this.configs.path + getToken())
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        }        
    },
    open: function () {
        console.log("socket连接成功")
    },
    error: function () {
        console.log("连接错误")
    },
    getMessage: function (msg) {
        console.log(msg.data)
        alert(msg.data)
    },
    send: function () {
        this.socket.send(params)
    },
    close: function () {
        console.log("socket已经关闭")
    }    
}