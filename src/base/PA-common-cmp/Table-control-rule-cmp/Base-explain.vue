<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：说明    controletype 为 24
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    v-if="!obj.Config.Hidden"
  >
    <div v-html="obj.Config.DefaultValue"></div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      //是否需要校验
      isNeedCheck: {
        type: Boolean,
        default: false
      },    
      obj: {
        type: Object,
        default: {}
      },
      prop: {
        type: String,
        default: ''
      },
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        isShow: false
      }
    },
    created () {
    },
    methods: {
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
