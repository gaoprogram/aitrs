<!--
  User: gaol
  Date: 2020/7/31
  功能：折线图 组件  controlType 为
-->

<template>
  <div class="seriesLine-cmp-wrap">
    <el-row>
        <el-col :span="24">
            折线图 组件
        </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    // mixins: [ fieldGroupControlTypeMixin ],
    props: {
        
    },
    computed: {

    },
    data () {
      return {

      }
    },
    created () {

    },
    beforeDestroy () {
      // 销毁

    },
    methods: {},
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
