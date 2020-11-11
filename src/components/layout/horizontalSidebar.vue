<!--
    User: xxxxxxx
  Date: 2019/4/30
  by： gaol
  功能：home页面 顶部的 横向导航组件
-->
<template>
  <div class="horizontal-wrapper u-fi">
    <div class="companyName u-f0">
      <img src="./companyAvatar.png" height="0" alt="">
      <span class="name">{{ name }}</span>
    </div>

    <div class="menuWrap u-f0">
      <el-menu 
        mode="horizontal"
        theme="dark"
        background-color="#3b8be3"
        text-color="#fff"
        active-text-color="#cccccc"
        unique-opened
        :default-active="$route.path"
        :collapse="isCollapse"
        class="navTopMenu u-f"
      >
        <!--菜单项目items的组件-->
        <sidebar-item :routes='permissionRouters' :horizontalFlag="horizontalFlag"></sidebar-item>
      </el-menu>
    </div>

    <div class="avatar-container u-f-ajc u-f0">
      <div class="message">
        <icon-svg :icon-class="message"></icon-svg>
      </div>
      <div class="email">
        <icon-svg :icon-class="email"></icon-svg>
        <span class="email-num">16</span>
      </div>

      <el-dropdown class="" trigger="click">
        <div class="avatar-wrapper">
          <!--<span class="name">{{name}}</span>-->
          <img class="user-avatar" src="./avatar.png">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown" style="padding-top: 0">
          <el-dropdown-item divided style="margin-top: 0;border-top: 0"><span style="display:block">充值</span></el-dropdown-item>
          <el-dropdown-item divided><span @click="logout" style="display:block;">修改密码</span></el-dropdown-item>
          <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import iconSvg from '@/base/Icon-svg/index'
  export default {
    data () {
      return {
        horizontalFlag: true,
        message: 'pc-message',
        email: 'pc-email'
      }
    },
    components: {
      SidebarItem,
      iconSvg
    },
    computed: {
      ...mapGetters([
        'permissionRouters',
        'sidebar',
        'name',
        'avatar'
      ]),
      isCollapse () {
        return false
      }
    },
    created () {
    },
    methods: {
      logout () {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .horizontal-wrapper
    .nav-el-menu
      .el-icon-arrow-down:before
        content: " "
    .companyName
      display: inline-block;
      min-height: 50px;
      vertical-align: top;
      line-height: 50px;
      color: #ffffff;
      margin: 0 27px;
      img
        vertical-align: top;
        margin-top: 11px;
        margin-right 15px
    .menuWrap
      >>>.el-menu--horizontal
        position relative
    .avatar-container
      height: 50px
      display: inline-block
      position: absolute
      right: 20px
      .message, .email
        display: inline-block;
        position relative;
        vertical-align: top;
        margin-right 10px
        .email-num
          position: absolute;
          display: block;
          font-size: 12px;
          padding: 4px;
          background: red;
          border-radius: 50%;
          color: #ffffff;
          font-size: 12px;
          top: 7px;
          left: 13px;
        svg
          width 22px
          height 22px
          margin-top 14px
          &:hover
            cursor pointer
            opacity 0.7
      .avatar-wrapper
        cursor: pointer
        position: relative
        width 70px
        height: 50px
        line-height: 50px
        .name
          display: inline-block
          vertical-align: top
        .user-avatar
          width: 40px
          height: 40px
          border-radius: 50%
          margin-top 5px
        .el-icon-caret-bottom
          position: absolute;
          top: 15px;
          font-size: 20px;
          margin-left: 5px;
          color: #fff;
          &:hover
            color #cccccc
</style>