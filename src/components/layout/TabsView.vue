<!--
    User: xxxxxxx
  Date: 2019/4/30
  by： gaol
  功能：home页面的  动态 tag标签组件
-->
<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view"
                 v-for="tag in Array.from(visitedViews)"
                 :to="tag.path"
                 :key="tag.path"
                 v-if="!tag.isHide">
      <el-tag :closable="true" :type="isActive(tag.path) ? '' : 'info'" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    visitedViews () {
      // 只显示 最近的 5个 标签
      // debugger
      let arr = this.$store.state.app.visitedViews.slice()
      return arr.slice(-5)
    }
  },
  methods: {
    closeViewTabs (view, $event) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    generateRoute () {
      // debugger
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    addViewTabs () {
      // debugger
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', this.generateRoute())
    },
    isActive (path) {
      return path === this.$route.path
    }
  },
  watch: {
    $route () {
      this.addViewTabs()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tabs-view-container
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .tabs-view
      margin-left: 10px;
</style>
