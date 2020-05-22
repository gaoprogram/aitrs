
<!--
    User: xxxxxxx
  Date: 2019/5/11
  by： gaol
  功能：home页面的 内容区域组件 
-->
<template>
	<section class="app-main">

		<transition name="fade" mode="out-in">

      <keep-alive>
        <router-view></router-view>
      </keep-alive>

		</transition>

	</section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .app-main {
    min-height: 100%;
    margin-top: 60px;
  }
</style>
