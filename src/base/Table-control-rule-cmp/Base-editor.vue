<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：编辑器 
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <aitrs-editor
      ref="aitrsEditor"
      @editor="changeContent"
      :content="obj.FieldValue"
      :isShowImg="isShowImg"
      :placeholder="obj.Tips"
      v-if="showEdit"
    >
    </aitrs-editor>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import AitrsEditor from '@/base/editor/aitrs-editor'
  export default {
    props: {
      sid: {
        type: Number,
        default: 0
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
      let validatePass = (rule, value, callback) => {
        if (this.obj.Required && !this.obj.FieldValue) {
          callback(new Error(this.obj.FieldName + '不能为空'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: 'change'
        },
        isShowImg: false,
        showEdit: false
      }
    },
    created () {
      console.log('新建')
      setTimeout(() => {
        this.showEdit = !this.obj.Hidden
      }, 500)
    },
    methods: {
      changeContent (val) {
        this.obj.FieldValue = val
      }
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
      AitrsEditor
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
