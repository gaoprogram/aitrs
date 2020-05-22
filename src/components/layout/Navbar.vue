<!--
    User: xxxxxxx
  Date: 2019/4/30
  by： gaol
  功能：home页面的 面包屑 和  动态 tag 标签组合的 综合组件
-->
<template>
	<el-menu class="navbar" mode="horizontal">
		<!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
		<levelbar></levelbar>
		<tabs-view></tabs-view>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import TabsView from './TabsView'
import Hamburger from '@/base/Hamburger/index'

export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger
  },
  data () {
    return {
      log: '111'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.navbar
  height: 50px
  width: 100%
  line-height: 50px
  border-radius: 0px !important
  // z-index: 1002
  .hamburger-container
    line-height: 58px
    height: 50px
    float: left
    padding: 0 10px

  .errLog-container
    display: inline-block
    position: absolute
    right: 150px
  .screenfull
    position: absolute
    right: 90px
    top: 16px
    color: red
</style>



