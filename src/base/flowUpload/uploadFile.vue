<!--
  User: xxxxxxx
  Date: 2017/11/20
  功能：流转类目下：意见框下的附件/明细表上传   (流转 类目下（发起、待办等）的  附件上传)
-->
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  .uploadFile-wrapper
    .text
      font-size 12px
      display block
      &.c-red
        color red
      &.c-green
        color: #5daf34
    .file
      position: relative
      display: inline-block
      cursor: pointer;
      background rgb(235, 243, 252)
      border 1px solid #d8dce5
      color #5a5e66
      font-size 14px
      color #3B8BE3
      border-radius 4px
      height 35px
      width 70px
      overflow: hidden
      text-align center
      text-decoration: none
      text-indent: 0
      line-height: 35px
      input
        position: absolute
        height 35px
        width 70px
        left 0
        top: 0
        opacity: 0
        &:hover
          cursor pointer
      &:hover
        color: #ffffff;
        border-color: rgb(196, 220, 247);
        background-color: rgb(59, 139, 227);
        cursor pointer
    .showFileName
      position: relative
      vertical-align top
      .files-content
        font-size 12px
        .item 
          margin-top 5px
        .name-icon
          transition:All 0.2s ease-in-out
          &:hover
            color: $color
            cursor pointer
            transform:rotate(90deg) scale(1.5)
    .file-submit
      position: relative
      display: inline-block
      background: rgb(235, 243, 252)
      border: 1px solid #d8dce5;
      color: #5a5e66;
      border-radius: 4px
      height 35px
      width 70px
      font-size 14px
      color #3B8BE3
      overflow: hidden
      text-align center
      line-height: 35px
      &:hover
        color: #ffffff;
        border-color: rgb(196, 220, 247);
        background-color: rgb(59, 139, 227);
        cursor pointer

</style>

<template>
  <div class="uploadFile-wrapper">

    <div class="file">
      {{selectTit || '选择'}}
      <input 
        type="file"
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
    <!---流转类目下---start-->
    <!-- flowAlreadyUploadFile： {{flowAlreadyUploadFile}} -->
    <template>
      <!-----未上传的文件--start-->
      <div class="showFileName" v-if="noUploadFile && noUploadFile.length > 0">
        <ul class="files-content">
          <li class="item propsFile" v-for="(item, index) in noUploadFile" v-show="checkImgType(item.name)">
            <span class="name" style="color: rgba(152,149,149,1)">{{item.name}}[未上传]</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(2, index, item)"></i>
          </li>
        </ul>
      </div>
      <!-----未上传的文件--end-->

      <!-- flowFunctionRole： {{flowFunctionRole}} -->
      <!--已上传成功的文件----start--->
      <div class="showFileName">
        <!--流转里面关联意见上传附件--start--->
        <ul class="files-content" v-if="uploadFileType === 'file' && flowAlreadyUploadFile.length">
          <li class="item propsFile" v-for="(item, index) in flowAlreadyUploadFile" v-show="checkImgType(item.name)">
            <span class="name" style="color: #5daf34">{{item.name}}[已上传]</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(1, index, item)" v-show="flowFunctionRole.AttachmentCanDelete"></i>
          </li>
        </ul>  
        <!--流转里面关联意见上传附件--end--->

        <!----流转中已上传的明细表----start--->
        <ul class="files-content" v-if="noUploadFile_copy.length && !noUploadFile.length">
          <!-- noUploadFile: {{noUploadFile}}
          noUploadFile_copy: {{noUploadFile_copy}} -->
          <li class="item propsFile" v-for="(item, index) in noUploadFile_copy" v-show="checkImgType(item.name)">
            <span class="name" style="color: #5daf34">{{item.name}}[已上传]</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(1, index, item)" v-show="flowFunctionRole.AttachmentCanDelete"></i>
          </li>
        </ul>
        <!----流转中已上传的明细表----end--->
      </div>
      <!--已上传成功的文件----end--->

    </template>
    <!---流转类目下---end-->
    <!--选择好附件后的展示区----end-->


  </div>
</template>

<script type="text/ecmascript-6">
  import { uploadDetail,uploadAttachments } from '@/api/approve'
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
      },
      limitUploadDetailTableNum: {
        type: Number,
        default: 9999
      },
      uploadFileType: {
        //  上传附件的类型 file 表示 意见框里面上传的附件
        type: String,
        default: ''
      }
    },
    data () {
      return {
        fileName: '',  // 选择上传的文件的名称
        noUploadFile: [],   // 未上传至服务器的文件集合
        noUploadFile_copy: [],  // 未上传值服务器的文件集合的副本
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
        'flowAlreadyUploadFile',
        'flowFunctionRole'
      ])
    },
    methods: {
      // 流转类目调用 上传明细表接口
      _uploadFlowDetail () {
        debugger
        uploadDetail(this.noUploadFile, this.workId, this.nodeId, this.detailTableCode, this.mainTableCode).then((res) => {
          debugger
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.noUploadFile = []
            this.uploadText = '上传成功!'
            // 出发store 中的 flow 类目下的 addFlowAlreadyUploadDetail ，上传明细表，只允许一次上传一个，所以不需要 触发 addFlowAlreadyUpload 事件
            debugger
            this.$store.dispatch('addFlowAlreadyUploadDetail', res.data.Data)
            debugger
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

      // 流转类目 意见框下的 上传附件 接口
      _uploadFlowFile () {
        debugger
        uploadAttachments(this.noUploadFile, this.workId, this.nodeId, 'OpinionAttachment').then((res) => {
          debugger
          if (res && res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.noUploadFile = []
            this.uploadText = '上传成功!'
            // 出发store 中的 flow 类目下的 addFlowAlreadyUploadFile ，上传明细表，只允许一次上传一个，所以不需要 触发 addFlowAlreadyUpload 事件
            debugger
            this.$store.dispatch('addFlowAlreadyUploadFile', res.data.Data)
            debugger
            this.okUpload = true
            this.redOrGreen = true
            debugger
            // 触发 父组件中 success 事件
            this.$emit('uploadOptionFileSuccess')
          } else {
            this.$message({
              type: 'warning',
              message: `上传失败,${res.data.Error}`
            })
            this.okUpload = true
            this.uploadText = res.data.Error
            this.redOrGreen = false
          }
        }).catch(() => {
          debugger
          this.$message({
            type: 'error',
            message: '上传失败!'
          })
          this.uploadText = '上传失败!'
          this.okUpload = true
          this.redOrGreen = false
        })
      },    
      
      // 选择了明细表或者 附件后
      preview () {
        console.log(this.noUploadFile)
        debugger
        if( !this.uploadFileType ){
          // 上传的明细表，明细表 一次只能上传一个
          if(this.limitUploadDetailTableNum){
            // 上传的明细表,明细表上传时一次只能上传一个明细表
            if(this.noUploadFile.length >1 ) {
              // 已经有选择了明细表
              this.$message({
                type: "warning",
                message: "一次最多只能选择一个明细表上传"
              })
              return 
            }
          }          
        }else if( this.uploadFileType === 'file' ){
          // 意见框处 上传附件，附件是允许 一次上传 多个的
          
        }

        let files = this.$refs.fileUpload.files
        // 对象变数组 然后 进行 数组的遍历  取出 每一个 file 的数据
        files = Object.keys(files).map(function (k) { return files[k] })
        debugger
        if (files.filter((item) => item.size > 2 * 1024 * 1024).length > 0) {
          Message.error('上传文件不得大于2M')
          return false
        }
        let arr = this.noUploadFile.concat(files)
        if ((arr.length + this.flowAlreadyUploadFile.length) > UPLOAD_NUM) {
          Message.error('上传文件不得大于5个')
          return false
        }

        debugger
        // 未上传的文件集合
        this.noUploadFile = arr
        // 复制一个上传文件集合的副本
        this.noUploadFile_copy = [].concat(this.noUploadFile)
        this.fileName = files[0].name
      },
      // 上传至服务器
      uploadFile () {
        debugger
        if (this.noUploadFile.length <= 0) {
          this.$message({
            type: 'warning',
            message: '未选择任何附件!'
          })
          return
        }
        if(!this.uploadFileType){
          debugger
          // 上传的明细表， 明细表一次只能上传一个
          if( this.noUploadFile.length > 1 ) {
            this.$message({
              type: 'waining',
              message: '一次最多只能上传一个明细表!'
            })
            return
          }
          // 上传明细表
          this._uploadFlowDetail()
        }else {
          debugger
          // 意见框下面的 上传附件
          this._uploadFlowFile()
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
            debugger
            if (i === ALREADY) {
              // 触发 store 中 flow 模块的 delFlowAlreadyUploadFile 方法
              this.$store.dispatch('delFlowAlreadyUploadFile', item)
              if (this.flowAlreadyUploadFile.length <= 0 && this.noUploadFile.length <= 0) {
                this.okUpload = false
              }
            }
            if (i === NOT_ALREADY) {
              this.noUploadFile.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              if (this.flowAlreadyUploadFile.length <= 0 && this.noUploadFile.length <= 0) {
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
      //this.flowAlreadyUploadFile.map((item) => {
      //attachmentDel(item.NoticeCode, item.Id).then((res) => {
      //})
      //})
      //this.flowAlreadyUploadFile = []
        this.noUploadFile = []
      },
      checkImgType (attr) {
        // 判断 图片 或者 excel 格式时 就显示
        if (/\.(jpg|gif|jpeg|png|xlsx|xls)+$/.test(attr)) {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
    'flowAlreadyUploadFile': {
    handler (newValue, oldValue) {
     this.$emit('fileChange', this.flowAlreadyUploadFile)
    },
    deep: true
    }
    }
  }
</script>
