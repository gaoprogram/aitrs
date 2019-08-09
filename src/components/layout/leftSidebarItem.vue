<!--
    User: xxxxxxx
  Date: 2019/4/30
  by： gaol
  功能：home页面左边的竖向菜单导航组件
-->
<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">
      <keep-alive>
        
        <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0&&!horizontal"
                     :to="item.path + item.children[0].path">
          <el-menu-item :index="item.path + item.children[0].path" class='submenu-title-noDropdown'>
            <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
            <span>{{item.name}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
          <template slot="title">
            <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
            <span class="parentName">{{item.name}}</span>
          </template>
          <template v-for="child in item.children" v-if='!child.hidden'>

            <sidebar-item class='nest-menu' v-if='!child.noDropdown&&child.children&&child.children.length>0' :routes='[child]'>
            </sidebar-item>

            <router-link v-else :to="item.path+'/'+child.path">
              <el-menu-item :index="item.path+'/'+child.path">
                <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
                <span class="name">{{child.name}}</span>
              </el-menu-item>
            </router-link>

          </template>
        </el-submenu>
      </keep-alive>
    </template>
  </div>
</template>

<script>
  import iconSvg from '@/base/Icon-svg/base-info'
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      },
      horizontal: {
        type: Boolean,
        default: false
      }
    },
    created () {
      // debugger 
      console.log(this.routes)
    },
    components: {
      iconSvg
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

