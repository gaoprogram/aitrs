<!--
  User: xxxxxxx
  Date: 2019/4/30
  by: gaol
  功能：这个是 home页面的 一个入口文件 登陆进入后的 一个整体页面布局 
-->

<template>
	<div class="app-wrapper">
    <!--顶部导航区域-->
    
    <horizontal-sidebar class="horizontal-sidebar"></horizontal-sidebar>

    <!---顶部导航区下方的内容区域-->
    <div class="containerWrapper" :class="{hideSidebar:!sidebar.opened}">

      <!---左边sidebar 区域--->
      <sidebar class="sidebar-container"></sidebar>

      <!--右方内容区-->
      <div class="main-container" v-loading="loading">
        <!--navbar 为 内容区上方的 面包屑 和 动态 tag标签组件-->
        <div 
          class="navBarBox" 
          style="height:50px; 
          position:absolute; 
          top: 50px"
        >
          <navbar></navbar>
        </div>

        <!--具体的内容区域 直接用下面的组件 app-main 也可以-->
        <div class="routerCotentBox">
          <transition name="fade" mode="out-in">
            <!-- <keep-alive> -->
              <router-view></router-view>
            <!-- </keep-alive> -->
          </transition>

          <el-backtop target=".routerCotentBox"></el-backtop>
        </div>

        <!--具体的内容区域-->
        <!-- <app-main></app-main> -->
      </div>
    </div>
	</div>
</template>

<script>

import { Navbar, Sidebar, AppMain, horizontalSidebar } from '@/components/layout'
import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    horizontalSidebar
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'loading'
    ])
  },
  created(){
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/sidebar"
  .app-wrapper
    position relative
    height 100%
    width 100%
    min-width 1024px
    .containerWrapper 
      width: 100%
      height: 100%
    .main-container
      position relative
      min-height: 100%
      min-width 824px
      transition: margin-left 0.3s ease-out
      margin-left: 190px
      // margin-top 50px
      padding-top: 50px
      box-sizing: border-box
      .routerCotentBox
        position relative
        width 100%
        height calc(100vh - 110px)
        overflow auto
        margin-top 60px
        z-index 1001
    .horizontal-sidebar
      height: 50px
      // position: fixed
      position: absolute
      top: 0
      left: 0
      width 100%
      min-width 1024px
      z-index 1000
      background: #3b8be3 !important
      .el-menu--horizontal
        display inline-block 
        border-bottom 0
        .el-submenu
          display inline-block !important
          .el-submenu__title
            height: 50px !important;
            line-height: 50px !important;
            padding: 0 10px !important;
            &:hover
              background-color #569ce7 !important
              color #fff !important
            i
              color #ffffff
          .is-active
            i
              color rgb(204, 204, 204)!important
    .sidebar-container
      position: fixed
      top: 50px
      bottom: 0
      left: 0
      z-index: 1002
      overflow-y: auto
      overflow: -moz-scrollbars-none
      background: #2d3438
      &:not(.el-menu--collapse)
        width: 190px;
      &::-webkit-scrollbar
        display:none
      .el-menu
        min-height: 0!important
      .el-submenu__title:hover, .el-menu-item:hover
        background-color #3b8be3 !important
        color #fff !important
  .hideSidebar
    .sidebar-container
      width 64px!important
      overflow inherit
    .main-container
      margin-left 64px
  .el-menu--horizontal
    position fixed 
    .nest-menu
      .el-submenu
        float none!important
      .el-submenu__title
        height: 50px!important;
        line-height: 50px!important;
        padding 0 10px!important
        border-bottom 0!important
        color #ffffff!important
        i
          color #ffffff!important
      .el-menu

        top: 0!important;
    .el-menu-item
      float none!important;
      height: 50px!important;
      line-height: 50px!important;
      padding: 0 10px !important;
      &:hover
        background-color #569ce7 !important
        color #fff !important
</style>
