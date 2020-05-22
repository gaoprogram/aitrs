<!--
  User: gaol
  Date: 2019/11/10
  功能：PA 模块中 上传附件组件
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
  <div class="uploadFile-wrapper" v-loading="uploading">

    <div class="file" v-show="!uploading">
      {{selectTit || '选择'}}
      <input 
        type="file"
          multiple="multiple"
          accept=".xls, .doc, .docx, .xlsx, .txt, .pdf, .jpg, .png, .jpeg, .gif"
          ref="fileUpload"
          @change="preview()"
      >
    </div>

    <div v-show="!uploading" class="file-submit" @click="uploadFile()">
      上 传
    </div>

    <!-- okUpload: {{okUpload}} -->
    <!---上传成功后的提示--start-->
    <div class="text" :class="redOrGreen ? 'c-green' : 'c-red'" v-if="okUpload" v-html='uploadText'></div>
    <!---上传成功后的提示--end-->
    <!--上传失败后的提示---start-->
    <div class="text" :class="redOrGreen ? 'c-green' : 'c-red'" v-if="errorUpload" v-html='uploadText'></div>
    <!--上传失败后的提示---end-->

    <!--选择好附件后的展示区----start-->
    <!---pa类目下---start-->
    <!-- alreadyUploadTemplateFile： {{alreadyUploadTemplateFile}} -->
    <div>
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
        <!--pa批量操作上传模板附件--start--->
        <!-- alreadyUploadTemplateFile: {{alreadyUploadTemplateFile}}
        uploadFileType： {{uploadFileType}} -->
        <ul class="files-content" v-if="uploadFileType === 'file' && alreadyUploadTemplateFile.length">
          <li class="item propsFile" v-for="(item, index) in alreadyUploadTemplateFile" v-show="checkImgType(item.Name)">
            <span class="name" style="color: #5daf34">{{item.Name}}[已上传]</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFile(1, index, item)" v-show="flowFunctionRole.AttachmentCanDelete"></i>
          </li>
        </ul>  
        <!--pa批量操作上传模板附件--end--->

        <!----pa中已上传的明细表----start--->
        <ul class="files-content" v-if="!noUploadFile.length && alreadyUploadDetail.length">
          <!-- noUploadFile: {{noUploadFile}}
          noUploadFile_copy: {{noUploadFile_copy}} -->
          <li class="item propsFile" v-for="(item, index) in alreadyUploadDetail" v-show="checkImgType(item.name)">
            <span class="name" style="color: #5daf34">{{item.name}}[已上传]</span>
            <i class="el-icon-close name-icon" style="margin-left: 20px" @click="delFileDetail(1, index, item)" v-show="flowFunctionRole.AttachmentCanDelete"></i>
          </li>
        </ul>
        <!----中已上传的明细表----end--->
      </div>
      <!--已上传成功的文件----end--->

    </div>
    <!---pa类目下---end-->
    <!--选择好附件后的展示区----end-->
  </div>
</template>

<script type="text/ecmascript-6">
  // import { upLoadTemplate } from '@/api/employee'

  import { 
    ImportEmpData 
  } from '@/api/employee'
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
      },


      // pa 中的参数
      OP: {
        type: String,
        default: '',  // OP  导入类型,New表示入职，Edit表示编辑
      }
    },
    data () {
      return {
        uploading: false, // 上传的loading
        fileName: '',  // 选择上传的文件的名称
        noUploadFile: [],   // 未上传至服务器的文件集合
        noUploadFile_copy: [],  // 未上传值服务器的文件集合的副本
        alreadyUploadDetail:[],  // 已经上传成功的明细表集合
        okUpload: false,   // 上传成功后的成功提示语
        errorUpload: false, // 上传失败后的错误提示语
        redOrGreen: false,  
        visible: false,
        uploadText: ''   // 成功或者失败的提示语
      }
    },
    created () {
    },
    computed: {
      ...mapGetters([
        'currentPageCode',
        'currentTemplateCode',
        'currentTemplatePageCode',
        'alreadyUploadTemplateFile'
      ])
    },
    methods: {
      // pa类目调用 上传明细表接口
      _uploadFlowDetail () {
        debugger
        this.uploading = true
        debugger
        uploadDetail(this.noUploadFile, this.workId, this.nodeId, this.detailTableCode, this.mainTableCode).then((res) => {
          this.uploading = false
          debugger
          if (res.data.State === 1) {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })

            this.uploadText = '上传成功!'
            this.$store.dispatch('addFlowAlreadyUploadDetail', this.noUploadFile_copy)
            // 出发store 中的 flow 类目下的 addFlowAlreadyUploadDetail ，上传明细表，只允许一次上传一个，所以不需要 触发 addFlowAlreadyUpload 事件
            debugger 
            // 明细表上传成功过后 res.data.Data 为字符串“上传成功”
            this.alreadyUploadDetail = this.noUploadFile_copy
            this.noUploadFile = []
            debugger
            this.errorUpload = false
            this.okUpload = true
            this.redOrGreen = true

            // 触发 父组件中 success 事件
            this.$emit('uploadDetailSuccess', res.data.Data)

          } else if( res.data.State === -1){
            debugger
            let errorString = ''
            // 明细表上传失败,提示语很长 需要 分行显示则 返回来的错误信息 是一个 字符串的数组
            errorString = res.data.Data.join("<br>")
            this.okUpload = false
            this.errorUpload = true
            this.uploadText = errorString
            this.redOrGreen = false

            // 触发 父组件中的 fail 事件(父组件 关闭 loading的状态)
            this.$emit('uploadDetailFail', res.data.Data)
          }else {
            // 一般的错误 提示很少的时候 返回的 错误信息 是 字符串
            this.okUpload = false
            this.errorUpload = true
            this.uploadText = `上传失败,${res.data.Error}`
            this.redOrGreen = false

            // 触发 父组件中的 fail 事件(父组件 关闭 loading的状态)
            this.$emit('uploadDetailFail', res.data.Error)            
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '上传失败!'
          })
          this.uploadText = `上传失败,${res.data.Error}`
          this.okUpload = false
          this.redOrGreen = false
        })
      },

      // PA 中 批量入职 上传/ 批量修改 上传
      _uploadFile () {
        debugger
        this.uploading = true
        ImportEmpData(this.currentTemplateCode, this.OP, 'PA').then((res) => {
          this.uploading = false
          debugger
          if (res && res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.noUploadFile = []
            this.uploadText = '上传成功!'
            // 触发store 中的 pa 类目下的 setAlreadyUploadTemplateFile ，上传模板，只允许一次上传一个，所以不需要 触发 setAlreadyUploadTemplateFile 事件
            debugger
            this.$store.dispatch('setAlreadyUploadTemplateFile', res.data.Data)
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
        if ((arr.length + this.alreadyUploadTemplateFile.length) > UPLOAD_NUM) {
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
          // this._uploadFlowDetail()
          this._uploadFile()
        }else {
          debugger
          // 上传模板
          this._uploadFile()
        }
      },
      // 删除明细表
      delFileDetail (i, index, item) {
        this.$confirm("确定删除此明细表吗？", "删除明细表", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          debugger
          if( i === ALREADY ){
            // 已经上传成功的明细表
            // 触发 store 中 flow 模块的 delFlowAlreadyUploadFile 方法
            this.$store.commit('delFlowAlreadyUploadDetail')
            // 删除明细表 只需要处理 明细表中 对应的的fields 数据 为空就好，到时 保存就会生效（没有直接删除明细表的接口）
            // 触发 父组件中处理当前主表下的明细表的数据
            debugger
            this.$emit("emitDelDetail")
            debugger

            this.alreadyUploadDetail = []
            this.noUploadFile = []
            if (this.noUploadFile.length <= 0) {
              this.okUpload = false
            }

          }else if( i === NOT_ALREADY ){
            // 未上传的明细表
            // 还未上传成功的 文件 进行删除
            this.noUploadFile.splice(index, 1)
            
            this.$message({
              type: 'success',
              message: '删除成功!'
            })

            if (this.noUploadFile.length <= 0) {
              this.okUpload = false
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: "删除已取消"
          })
        })
      },
      // 删除附件
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
              // 已经上传成功的 文件 进行删除
              // 触发 store 中 flow 模块的 delFlowAlreadyUploadFile 方法
              this.$store.dispatch('delFlowAlreadyUploadFile', item)
              debugger
              console.log("删除成功后，打印this.alreadyUploadTemplateFile.length",this.alreadyUploadTemplateFile.length)

              setTimeout(() => {
                // 上面的 this.$store.dispatch('delFlowAlreadyUploadFile', item) 为异步方法
                if (this.alreadyUploadTemplateFile.length <= 0 ) {
                  this.okUpload = false
                }
              },2000)
            }
            if (i === NOT_ALREADY) {
              // 还未上传成功的 文件 进行删除
              this.noUploadFile.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })

              if (this.alreadyUploadTemplateFile.length <= 0 && this.noUploadFile.length <= 0) {

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
      //this.alreadyUploadTemplateFile.map((item) => {
      //attachmentDel(item.NoticeCode, item.Id).then((res) => {
      //})
      //})
      //this.alreadyUploadTemplateFile = []
        this.noUploadFile = []
      },
      checkImgType (attr) {
        // 判断 图片 或者 excel 格式时 就显示
        // if (/\.(jpg|gif|jpeg|png|xlsx|xls|docx|doc|pdf)+$/.test(attr)) {
        //   return true
        // } else {
        //   return false
        // }
        return true
      }
    },
    watch: {
    'alreadyUploadTemplateFile': {
      handler (newValue, oldValue) {
        debugger
        this.$emit('fileChange', this.alreadyUploadTemplateFile)
      },
      deep: true
      }
    }
  }
</script>
