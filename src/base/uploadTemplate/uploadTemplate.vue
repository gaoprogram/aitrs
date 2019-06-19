<!--
  User: xxxxxxx
  Date: 2017/11/20
  功能：模板上传  （公告类目下的 模版上传）
-->

<template>
  <div class="uploadFile-wrapper">
    <div class="file">
      选 择
      <input type="file"
             accept=".xls, .xlsx"
             ref="fileUpload"
             @change="preview()"
      >
    </div>
    <div class="file-submit" @click="uploadFile()">
      上 传
    </div>
    <!--<div class="text" :class="redOrGreen ? 'c-green' : 'c-red'" v-if="okUpload">{{ uploadText }}</div>-->
    <div class="showFileName">
      <ul class="files-content">
        <li class="item noUploadFile" v-for="(item, index) in noUploadFile" v-if="noUploadFile.length > 0">
          <span class="name">{{item.name}}</span>
          <!--<i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(2, base-info, item)"></i>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        fileName: '',
        noUploadFile: [],
        okUpload: false,
        redOrGreen: false,
        visible: false,
        uploadText: ''
      }
    },
    created () {
    },
    computed: {
    },
    methods: {
      preview () {
        let files = this.$refs.fileUpload.files
        // 对象变数组
        files = Object.keys(files).map(function (k) { return files[k] })
        // if (files.filter((item) => item.size > 2 * 1024 * 1024).length > 0) {
        //   Message.error('上传文件不得大于2M')
        //   return false
        // }
        // let arr = this.noUploadFile.concat(files)
        // if (arr.length > UPLOAD_NUM) {
        //   Message.error('上传文件不得大于5个')
        //   return false
        // }
        this.noUploadFile = files.slice()
        this.fileName = files[0].name
      },
      uploadFile () {
        if (this.noUploadFile.length <= 0) {
          this.$message({
            type: 'info',
            message: '未选择任何附件!'
          })
          return
        }
        this.$emit('uploadEmpTerm', this.noUploadFile)
      },
      emptyFile () {
//        this.alreadyUploadFile.map((item) => {
//          attachmentDel(item.NoticeCode, item.Id).then((res) => {
//          })
//        })
//        this.alreadyUploadFile = []
        this.noUploadFile = []
      },
      checkImgType (attr) {
        if (/\.(jpg|gif|jpeg)+$/.test(attr)) {
          return false
        } else {
          return true
        }
      }
    },
    watch: {
//      'alreadyUploadFile': {
//        handler (newValue, oldValue) {
//          this.$emit('fileChange', this.alreadyUploadFile)
//        },
//        deep: true
//      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"

  .uploadFile-wrapper
    display inline-block
    .text
        display block
        &.c-red
          color red
        &.c-green
          color: #5daf34
      .file
        position: relative
        display: inline-block
        padding: 9px 15px
        line-height: 1
        white-space: nowrap
        border: 1px solid #d8dce5
        -webkit-appearance: none;
        text-align: center
        box-sizing: border-box
        outline: 0
        margin: 0
        -webkit-transition: .1s
        transition: .1s
        font-size: 12px
        border-radius: 3px
        color: #fff
        background-color: #3B8BE3
        border-color: #3B8BE3
        cursor pointer
        input
          position: absolute
          height 32px
          width 59px
          left 0
          top: 0
          opacity: 0
          cursor pointer
          &:hover
            cursor pointer
      .file:hover
        background: rgb(98, 162, 233)
        border-color: rgb(98, 162, 233)
        color: #fff
        cursor pointer
      .showFileName
        position: relative
        vertical-align top
        .files-content
          margin-top 5px
          .item
            list-style-type none
            .name-icon
              transition:All 0.2s ease-in-out
              &:hover
                color: $color
                cursor pointer
                transform:rotate(90deg) scale(1.5)
      .file-submit
        position: relative
        display: inline-block;
        padding: 9px 15px;
        line-height: 1;
        white-space: nowrap;
        border: 1px solid #d8dce5;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #3B8BE3;
        border-color: #3B8BE3;
        &:hover
          background: rgb(98, 162, 233);
          border-color: rgb(98, 162, 233);
          color: #fff;
          cursor pointer

</style>
