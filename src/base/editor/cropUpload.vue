<!--
  User: xxxxxxx
  Date: 2017/11/20
  功能：上传组件
-->

<template>
  <vue-crop  @crop-upload-success="uploadSuccess"
             v-model="show"
             :width="width"
             :height="height"
             :url="uploadUrl"
             :noCircle="true"
             :noSquare="true"
             :params="params"
             img-format="jpg"></vue-crop>
</template>

<script>
  import VueCrop from 'vue-image-crop-upload/upload-2.vue'
  export default{
    props: {
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 300
      },
      /* 上传图片的地址 */
      uploadUrl: {
        type: String
      },
      /* 上传图片的file控件name */
      fileName: {
        type: String
      },
      noticeCode: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        show: false,
        params: {
          method: 'UploadAttachments',
          noticeCode: ''
        }
      }
    },
    mounted () {
    },
    components: {
      VueCrop
    },
    methods: {
      uploadSuccess (res, field) {
        this.$emit('uploadSuccess', res)
      },
      showUpload () {
        this.show = true
      }
    },
    watch: {
      show (newv) {
        if (!this.show) {
          this.$emit('input', false)
        }
      },
      'noticeCode' (newVal, oldVal) {
        this.params.noticeCode = newVal
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
