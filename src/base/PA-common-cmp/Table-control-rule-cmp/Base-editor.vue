<!--
  User: gaol
  Date: 2019/10/08
  功能：编辑器   ControlType:  23
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >
    <!-- obj: {{obj}} -->
    <aitrs-editor
      ref="aitrsEditor"
      @editor="changeContent"
      :content="obj.FieldValue"
      :isShowImg="isShowImg"
      :placeholder="obj.Config.Tips"
      :obj.sync="obj"
      v-if="showEdit"
    >
    </aitrs-editor>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import AitrsEditor from '@/base/editor/aitrs-editor'
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
      },
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if (this.obj.Config.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.FieldName + '不能为空'))
        } else {
          callback()
        }            
      }
      return {
        rules: {
          required: this.obj.Config.Required,
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
        this.showEdit = !this.obj.Config.Hidden
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
