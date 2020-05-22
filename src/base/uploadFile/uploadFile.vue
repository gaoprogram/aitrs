<!--
  User: xxxxxxx
  Date: 2017/11/20
  功能：附件/明细表上传   (公告 类目下的  附件上传)
-->

<template>
  <div class="uploadFile-wrapper">
    <div class="file">
      {{selectTit || '选择'}}
      <input type="file"
             multiple="multiple"
             accept=".xls, .doc, .docx, .xlsx, .txt, .pdf"
             ref="fileUpload"
             @change="preview()"
      >
    </div>
    <div class="file-submit" @click="uploadFile()">
      上 传
    </div>
    <div class="text" :class="redOrGreen ? 'c-green' : 'c-red'" v-if="okUpload">{{ uploadText }}</div>

    <!--选择好附件后的展示区----start-->
    <!---公告类目下---start-->
    <template v-if="noticeCode">
      <div class="showFileName" v-if="alreadyUploadFile && alreadyUploadFile.length > 0">
        <ul class="files-content">
          <li class="item propsFile" v-for="(item, index) in alreadyUploadFile" v-show="checkImgType(item.Attribute)">
            <span class="name" style="color: #5daf34">{{item.Name}}</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(1, item.Id, item)"></i>
          </li>
        </ul>
      </div>

      <div class="showFileName">
        <ul class="files-content">
          <!--<li class="item alreadyUploadFile" v-for="(item, base-info) in alreadyUploadFile" v-if="alreadyUploadFile.length > 0">-->
            <!--<span class="name" style="color: #5daf34">{{item.Name}}</span>-->
            <!--<i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(1, base-info, item)"></i>-->
          <!--</li>-->
          <li class="item noUploadFile" v-for="(item, index) in noUploadFile" v-if="noUploadFile.length > 0">
            <span class="name">{{item.name}}</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(2, index, item)"></i>
          </li>
        </ul>
      </div>
    </template>
    <!---公告类目下---end-->

    <!---流转类目下---start-->
    <!-- <template v-else-if="!noticeCode">
      <div class="showFileName" v-if="alreadyUploadFile && alreadyUploadFile.length > 0">
        <ul class="files-content">
          <li class="item propsFile" v-for="(item, index) in alreadyUploadFile" v-show="checkImgType(item.Attribute)">
            <span class="name" style="color: #5daf34">{{item.Name}}</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(1, item.Id, item)"></i>
          </li>
        </ul>
      </div>

      <div class="showFileName">
        <ul class="files-content"> -->
          <!--<li class="item alreadyUploadFile" v-for="(item, base-info) in alreadyUploadFile" v-if="alreadyUploadFile.length > 0">-->
            <!--<span class="name" style="color: #5daf34">{{item.Name}}</span>-->
            <!--<i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(1, base-info, item)"></i>-->
          <!--</li>-->
          <!-- <li class="item noUploadFile" v-for="(item, index) in noUploadFile" v-if="noUploadFile.length > 0">
            <span class="name">{{item.name}}</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(2, index, item)"></i>
          </li>
        </ul>
      </div>
    </template> -->
    <!---流转类目下---end-->
    <!--选择好附件后的展示区----end-->


  </div>
</template>

<script type="text/ecmascript-6">
  import { attachmentPost } from '@/api/notice'
  import { uploadDetail } from '@/api/approve'
  import { REQ_OK, UPLOAD_NUM } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  const ALREADY = 1
  const NOT_ALREADY = 2
  export default {
    props: {
      noticeCode: {
        type: String,
        default: ''
      },
      workId: {
        type: String,
        default: ''
      },
      nodeId: {
        type: [Number, String],
        default: ''
      },
      fieldCode: {
        type: String,
        default: ''
      },
      detailTableCode: {
        type: String,
        default: ''
      },
      mainTableCode: {
        type: String,
        default: ''
      },
      selectTit: {
        type: String,
        default: ''
      }
    },
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
      ...mapGetters([
        'alreadyUploadFile'
      ])
    },
    methods: {
      // 公告类目调用的 上传接口
      _uploadNoticeCategory () {
        attachmentPost(this.noUploadFile, this.noticeCode).then((res) => {
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.noUploadFile = []
            this.uploadText = '上传成功!'
            this.$store.dispatch('addAlreadyUploadFile', res.data.Data)
            this.okUpload = true
            this.redOrGreen = true
          } else {
            this.$message({
              type: 'error',
              message: '上传失败!'
            })
            this.okUpload = true
            this.uploadText = res.data.Error
            this.redOrGreen = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '上传失败!'
          })
          this.uploadText = '上传失败!'
          this.okUpload = true
          this.redOrGreen = false
        })
      },
      // 非公告类目调用 上传接口
      _uploadFlowCategory () {
        uploadDetail(this.noUploadFile, this.workId, this.nodeId, this.detailTableCode, this.mainTableCode).then((res) => {
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.noUploadFile = []
            this.uploadText = '上传成功!'
            this.$store.dispatch('addAlreadyUploadFile', res.data.Data)
            this.okUpload = true
            this.redOrGreen = true

            // 触发 父组件中 success 事件
            this.$emit('uploadDetailSuccess')
          } else {
            this.$message({
              type: 'error',
              message: '上传失败!'
            })
            this.okUpload = true
            this.uploadText = res.data.Error
            this.redOrGreen = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '上传失败!'
          })
          this.uploadText = '上传失败!'
          this.okUpload = true
          this.redOrGreen = false
        })
      },
      preview () {
        debugger
        let files = this.$refs.fileUpload.files
        // 对象变数组
        files = Object.keys(files).map(function (k) { return files[k] })
        if (files.filter((item) => item.size > 2 * 1024 * 1024).length > 0) {
          Message.error('上传文件不得大于2M')
          return false
        }
        let arr = this.noUploadFile.concat(files)
        if ((arr.length + this.alreadyUploadFile.length) > UPLOAD_NUM) {
          Message.error('上传文件不得大于5个')
          return false
        }
        this.noUploadFile = arr
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
        if (this.workId) {
          // 非公告类目（流转类目下的 附件上传）
          this._uploadFlowCategory()
        } else if (this.noticeCode) {
          // 公告类目下的 附件上传
          this._uploadNoticeCategory()
        }
      },
      delFile (i, index, item) {
        this.$confirm(
          '确定删除此附件吗？',
          '删除附件',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (i === ALREADY) {
              this.$store.dispatch('delAlreadyUploadFile', item)
              if (this.alreadyUploadFile.length <= 0 && this.noUploadFile.length <= 0) {
                this.okUpload = false
              }
            }
            if (i === NOT_ALREADY) {
              this.noUploadFile.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              if (this.alreadyUploadFile.length <= 0 && this.noUploadFile.length <= 0) {
                this.okUpload = false
              }
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除!'
            })
          })
      },
      emptyFile () {
        this.okUpload = false
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
    .text
      display block
      &.c-red
        color red
      &.c-green
        color: #5daf34
    .file
      position: relative
      display: inline-block
      cursor: pointer;
      background: #fff;
      border: 1px solid #d8dce5;
      color: #5a5e66;
      border-radius: 4px
      height 40px
      width 70px
      overflow: hidden
      text-align center
      text-decoration: none
      text-indent: 0
      line-height: 40px
      input
        position: absolute
        height 40px
        width 70px
        left 0
        top: 0
        opacity: 0
        &:hover
          cursor pointer
      &:hover
        color: #3B8BE3;
        border-color: rgb(196, 220, 247);
        background-color: rgb(235, 243, 252);
        cursor pointer
    .showFileName
      position: relative
      vertical-align top
      .files-content
        .name-icon
          transition:All 0.2s ease-in-out
          &:hover
            color: $color
            cursor pointer
            transform:rotate(90deg) scale(1.5)
    .file-submit
      position: relative
      display: inline-block
      background: #fff;
      border: 1px solid #d8dce5;
      color: #5a5e66;
      border-radius: 4px
      height 40px
      width 70px
      overflow: hidden
      text-align center
      line-height: 40px
      &:hover
        color: #3B8BE3;
        border-color: rgb(196, 220, 247);
        background-color: rgb(235, 243, 252);
        cursor pointer

</style>
