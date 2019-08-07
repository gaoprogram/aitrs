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
  },
  components: {
  }  
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/index"
    #app
      width: 100%
      height: 100%
</style>
