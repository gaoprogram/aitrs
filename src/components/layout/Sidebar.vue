<!--
  User: xxxxxxx
  Date: 2017/12/15
  功能：home页面中 左边页面的 菜单组件，这里面 会引用 sidebarItem.vue（菜单项目items）组件 
-->
<template>
  <div class="sidebar-wrapper">

    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <el-menu mode="vertical"
             theme="dark"
             background-color="#2d3438"
             text-color="#fff"
             active-text-color="#3b8be3"
             unique-opened
             :default-active="$route.path"
             :collapse="isCollapse">
             
      <!--左边菜单项目items 的组件-->
      <!-- secondRouter:{{secondRouter}} -->
      <sidebar-item :routes='secondRouter'></sidebar-item>

    </el-menu>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/base/Hamburger/index'
export default {
  components: {
    SidebarItem,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'permissionRouters',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    secondRouter () {
      // debugger
      let path = this.$route.path
      return this.permissionRouters.filter(v => {
        // debugger
        // 将 当前的路由和 permissionRouters 中的一级路由进行匹配， 看一级路由是否包含有当前路由，从而返回一级路由，得到 侧边栏的 路由集合进行 侧边栏的渲染
        return path.indexOf(v.path) !== -1
      })
    }
  },
  created () {
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hamburger-container
    line-height: 58px
    height: 50px
    padding: 0 10px
    background: rgb(45, 52, 56)
    text-align center
    border-bottom 1px solid #999999
    svg
      float: right;
      margin-top: 15px;
      margin-right: 10px;
  .el-menu
    height 100%
    overflow auto

.submenu-title-noDropdown
  width 190px!important    
</style>
