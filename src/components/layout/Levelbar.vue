<!--
    User: xxxxxxx
  Date: 2019/4/30
  by： gaol
  功能：home页面的 面包屑组件
-->
<template>
  <el-breadcrumb class="app-levelbar" separator="/">
  <!-- levelList: {{levelList}} -->
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
      <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.name}}</span>
      <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created () {
    this.$nextTick(()=>{
      this.getBreadcrumb()
    })
  },
  data () {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb () {
      debugger
      // console.log(this.$route)
      let matched = this.$route.matched.filter(item => item.name)
      // console.log("----matched----", matched)
      const first = matched[0]
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/' }].concat(matched)
      }
      this.levelList = matched
    }
  },
  watch: {
    '$route' (to, from) {
      // debugger
      this.getBreadcrumb()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app-levelbar.el-breadcrumb
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect
      color: #97a8be;
      cursor: text;
</style>
