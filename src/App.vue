<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    // this._checkNetWork()
  },
  components: {
    
  },
  methods: {
    _checkNetWork(){
      // 扩展API加载完毕后调用onPlusReady回调函数 
      document.addEventListener("plusready", this.onPlusReady, false);
      // function onPlusReady(){
      //   document.addEventListener("netchange", onNetChange, false);  
      // }
      // function onNetChange(){
      //   var nt = plus.networkinfo.getCurrentType();
      //   switch (nt){
      //     case plus.networkinfo.CONNECTION_ETHERNET:
      //     case plus.networkinfo.CONNECTION_WIFI:
      //     alert("Switch to Wifi networks!"); 
      //     break; 
      //     case plus.networkinfo.CONNECTION_CELL2G:
      //     case plus.networkinfo.CONNECTION_CELL3G:
      //     case plus.networkinfo.CONNECTION_CELL4G:
      //     alert("Switch to Cellular networks!");  
      //     break; 
      //     default:
      //     alert("Not networks!"); 
      //     break;
      //   }
      // }      
    },
    onPlusReady(){
      document.addEventListener("netchange", this.onNetChange, false);        
    },
    onNetChange(){
      var nt = plus.networkinfo.getCurrentType();
      switch (nt){
        case plus.networkinfo.CONNECTION_ETHERNET:
        case plus.networkinfo.CONNECTION_WIFI:
        alert("Switch to Wifi networks!"); 
        break; 
        case plus.networkinfo.CONNECTION_CELL2G:
        case plus.networkinfo.CONNECTION_CELL3G:
        case plus.networkinfo.CONNECTION_CELL4G:
        alert("Switch to Cellular networks!");  
        break; 
        default:
        alert("Not networks!"); 
        break;
      }      
    }    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/index"
    #app
      width: 100%
      height: 100%
</style>
