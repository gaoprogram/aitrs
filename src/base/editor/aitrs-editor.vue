<!--
  User: xxxxxxx
  Date: 2017/11/20
  功能：富文本编辑器组件
-->

<template>
  <div>
    <!--富文本编辑器 quill-editor-start-->
    <quill-editor v-model="nativeContent"
                  ref="myTextEditor"
                  :options="editorOption"
                  @change="onChange"
                  style="white-space:pre-wrap"
    >
      <div id="toolbar" slot="toolbar">
        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
        <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
        <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
        <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
        <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
        <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
        <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
        <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
        <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
        <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
        <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>
        <span class="ql-formats">
          <select class="ql-size">
            <option value="small"></option>
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option selected="selected"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-color">
            <option selected="selected"></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option value="#ffffff"></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-background">
            <option value="#000000"></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option selected="selected"></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-font">
            <option selected="selected"></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-align">
            <option selected="selected"></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>

        <span class="ql-formats">
          <button type="button" class="ql-clean" title="还原默认设置"></button>
        </span>
        
        <span class="ql-formats" v-if="false">
          <button type="button" class="ql-link"></button>
        </span>

        <!--编辑器上图片上传部分---start--->
        <span class="ql-formats" style="position: relative;line-height: 24px" v-if="isShowImg">
          <input
            type="file"
            multiple
            class="imgUpload"
            accept="image/jpeg,image/png,image/jpg,image/gif"
            @change="onFileChange"
          >
          <button type="button">
            <svg viewBox="0 0 18 18">
              <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
              <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
              <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
            </svg>
          </button>
        </span>
        <!--编辑器上图片上传部分---end--->
      </div>
    </quill-editor>
    <!--富文本编辑器 quill-editor-end-->



    <!--图片裁剪上传的组件-start-->
    <crop-upload
      ref="cropUpload"
      :width="width"
      :height="height"
      :fileName="fileName"
      :uploadUrl="uploadUrl"
      :noticeCode="noticeCode"
      @uploadSuccess="onUploadSuccess"
    ></crop-upload>
    <!--图片裁剪上传的组件-end-->
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  import CropUpload from './cropUpload'
  import { UPLOAD_URL, FILE_URL } from '@/api/config'

  export default {
    props: {
      noticeCode: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      isShowImg: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        nativeContent: '',
        editorOption: {
          modules: {
            toolbar: '#toolbar'
          },
          placeholder: ''
        },
        /* 编辑器的内容 */
        value: '',
        /* 上传图片的地址 */
        uploadUrl: UPLOAD_URL,
        /* 上传图片的file控件name */
        fileName: 'upImg',
        /* 图片大小 */
        maxSize: {
          type: Number,
          default: 400 // kb
        },
        /* 使用使用裁切 */
        canCrop: {
          type: Boolean,
          default: false
        },
        /* 裁切的最小尺寸 */
        width: 400,
        /* 裁切的最小尺寸 */
        height: 300
      }
    },
    created () {
      this.nativeContent = this.content
      this.editorOption.placeholder = this.placeholder
    },
    mounted () {
      this.nativeContent = this.content
    },
    methods: {
      resetContent () {
        this.nativeContent = ''
      },
      onChange () {
        this.$emit('editor', this.nativeContent)
      },
      /* 选择上传图片切换 */
      onFileChange (e) {
        let fileInput = e.target
        if (fileInput.files.length === 0) {
          return
        }
        if (fileInput.files[0].size > 1024 * 1024 * this.maxSize) {
          this.$message.info('图片过大，请重新上传')
          return
        }
        if (!this.uploadUrl) {
          return
        }
        // let self = this
        let data = new FormData()
        for (let i in fileInput.files) {
          data.append(fileInput.files[i].name, fileInput.files[i]) // 通过append向form对象添加数据
        }
        data.append('Method', 'UploadAttachments') // 添加form表单中其他数据
        data.append('noticeCode', this.noticeCode)
        this.editor.focus()
        // 原生上传图片
        this.upImg(data)
      },
      /* 裁切上传成功 res根据上传接口值获取 */
      onUploadSuccess: function (res) {
        this.editor.focus()
        this.editor.insertEmbed(this.editor.getSelection().index, 'image', FILE_URL + res.Data[0].Url)
      },
      /* 点击上传图片按钮 */
      imgClick () {
        this.canCrop = false
        if (this.canCrop) {
          this.$refs.cropUpload.showUpload()
        } else {
          /* 创建input file 不裁切，自己控制 */
          var input = document.createElement('input')
          input.type = 'file'
          input.multiple = 'multiple'
          input.className = 'imgUpload'
          input.name = this.fileName
          input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
          input.onchange = this.onFileChange
          input.click()
        }
      },
      upImg (params) {
        let self = this
        let request = new XMLHttpRequest()
        request.open('post', this.uploadUrl, true)
        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            if (request.status === 200) {
              let json = JSON.parse(request.response)
              if (json.State === 1) {
                self.$emit('upImgSuccess', json)
                if (json.Data) {
                  for (let i = 0; i < json.Data.length; i++) {
                    self.editor.insertEmbed(self.editor.getSelection().index, 'image', FILE_URL + json.Data[i].Url)
                  }
                }
              } else {
                self.$emit('upImgError', json)
              }
            } else if (parseInt(request.status / 100) === 4) {
              self.$emit('upImgError')
            }
          }
        }
        try {
          request.send(params || null)
        } catch (e) {
          self.$emit('upImgError')
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myTextEditor.quill
      }
    },
    components: {
      quillEditor,
      CropUpload
    },
    watch: {
      'content' (newVal, oldVal) {
        if (this.editor) {
          if (newVal !== this.nativeContent) {
            this.nativeContent = newVal
          }
        }
      },
      'noticeCode' (newVal, oldVal) {
        this.noticeCode = newVal
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .quill-editor
    border: 1px solid #d8dce5
    border-radius: 4px
    .ql-container
      height: 300px
    .ql-snow
      border 0
      border-bottom 1px solid #d8dce5
      &:last-child
        border-bottom 0
      .ql-picker
        height 42px !important
    .ql-snow
      .ql-editor
        img
          max-width: 480px
        .ql-video
          max-width: 480px
      .ql-picker
        height 42px !important
        line-height 40px
    .imgUpload
      background: none;
      border: none;
      cursor: pointer;
      display: inline-block;
      float: left;
      height: 24px;
      padding: 3px 5px;
      width: 28px;
      position: absolute;
      opacity: 0;
      left 0
      &:hover
        cursor pointer
</style>
