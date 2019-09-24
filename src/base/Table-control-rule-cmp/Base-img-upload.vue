<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：发起页面、 流转页面right-fiexd 中 主表字段中的 图片上传  contryType 14 （注意 流转页面上传明细表 和 意见框下面的上传附件不是用的这个）
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
  <!-- obj：{{obj}} -->
    <el-upload
      class="upload-demo"
      action="string"
      ref="imgForm"
      :before-remove="beforeRemove"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :on-change="onChange"
      :auto-upload="false"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button slot="trigger" size="small" type="primary">选择</el-button>
      <el-button :disabled="isUploading" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div v-if="progress !== 0" slot="tip" style="width: 330px;">
        <el-progress :percentage="progress" :status="proStatus"></el-progress>
      </div>
    </el-upload>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    uploadAttachments,
    DeleteAttachment
  } from '@/api/approve'
  export default {
    props: {
      prop: {
        type: String,
        default: ''
      },
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      },
      workId: {
        type: String,
        default: ''
      },
      nodeId: {
        type: Number,
        default: 0
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      attachmentRole: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {

        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && this.obj.FieldValue && !this.obj.FieldValue.length) {
              callback(new Error('请选择' + this.obj.FieldName))
            } else {
              callback()
            }   
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && this.obj.FieldValue && !this.obj.FieldValue.length) {
            callback(new Error('请选择' + this.obj.FieldName))
          } else {
            callback()
          }
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: 'change'
        },
        isUploading: false,  // 控制 上传到服务器btn 的显示/隐藏
        fileList: [],         // 图片列表
        selectFileList: [],   // 所选择的图片list
        progress: 0,   // 上传的进度条
        pass: null, // 是否上传成功
        data: {}
      }
    },
    computed: {
      proStatus () { // 上传状态
        if (this.pass) {
          return 'success'
        } else if (this.pass === false) {
          return 'exception'
        } else {
          return ''
        }
      }
    },
    created () {
      debugger
      console.log("*************",this.obj.FieldValue)
      if (!this.obj.FieldValue) {
        this.obj.FieldValue = []
      } else if (this.obj.FieldValue.length) {
        this.fileList = this.obj.FieldValue.map(i => {
          if(i.Name){
            // 初始进入时
            return {
              name: i.Name,
              url: i.Url,
              AttachmentId: i.AttachmentId,
              UserNo: i.UserNo
            }
          }else {
            // 添加了图片 删除了图片进行 主表切换时 进入此时的数据中 的 name 和 url 都是 小写
            return {
              name: i.name,
              url: i.url,
              AttachmentId: i.AttachmentId,
              UserNo: i.UserNo
            }
          }
        })
      }
      console.log("base-img-upload -created中打印的fileList", this.fileList)
    },
    methods: {
      // 删除
      delete (AttachmentId) {
        debugger
        DeleteAttachment(AttachmentId, this.workId, this.nodeId, this.obj.FieldCode, this.obj.TableCode).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })

            this.fileList = this.fileList.filter(i => {
              return i.AttachmentId !== AttachmentId
            })

            console.log("打印删除完成后的this.fileList------",this.fileList)
            if(!this.fileList.length){
              // 全部删除完成后，隐藏 进度条
              this.progress = 0
            }       
            
            
            debugger
            // 处理 obj.FieldValue中的数据
            this.obj.FieldValue = this.fileList

            console.log("删除成功后打印 this.fileList", this.fileList)
          } else {
            this.$message({
              type: 'error',
              message: `删除失败err,${res.data.Error}!`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      },
      // 删除前的回调
      beforeRemove (file, fileList) {
        debugger
        console.log(this.workId)
        console.log(this.nodeId)
        console.log(file, fileList, this.obj.FieldValue)
        if (this.obj.Role && this.obj.Role !== 2) {
          this.$message({
            type: 'info',
            message: '无权限删除图片!'
          })
          return false
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          debugger
          // 根据此图是否 已经上传过 进行分别删除
          fileList.forEach((item, key, arr) => {
            if( !item.AttachmentId ){
              // 证明是还未上传到服务器上面的
              item.uid === file.uid && arr.splice(key, 1)

              // 处理 obj.FieldValue中的数据
              this.obj.FieldValue = this.fileList     
                       
              if(!fileList.length) this.progress = 0
            }else {
              debugger
              // 已经上传到服务器上面的
              if( item.AttachmentId === file.AttachmentId){
                this.delete( file.AttachmentId )
              }
            }
          })
        }).catch(() => {
        })
        return false
      },
      beforeUpload (file) {
        // 上传前
        debugger
        console.log('beforeUpload', file)
      },
      onProgress (event, file, fileList) {
        console.log('onProgress', event, file, fileList)
        // this.progress = Math.floor(event.percent)
      },
      onSuccess (response, file, fileList) {
        console.log('onSuccess', response, file, fileList)
      },
      onChange (file, fileList) {
        debugger
        if (file.status === 'ready') {
          // 重置progress组件
          this.pass = null
          this.progress = 0
          //未上传的 列表集合
          this.selectFileList = fileList
        } else if (file.status === 'fail') {
          this.pass = false
          this.$message.error('图片上传出错，请刷新重试！')
        }
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      submitUpload () {
        // 上传到服务器
        debugger
        if (this.selectFileList && !this.selectFileList.length) {
          this.$message.warning('未选择任何文件！')
          return false
        }
        this.isUploading = true
        uploadAttachments(this.selectFileList, this.workId, this.nodeId).then(res => {
          this.isUploading = false
          if (res.data.State === REQ_OK) {
            this.progress = 100
            this.pass = 'success'
            this.$message.success('上传成功！')
            debugger
            
            // 上传成功后将 selectFileList 清空
            this.selectFileList = []

            // 将上传成功后返回的数据做处理
            res.data.Data.forEach(i => {
              debugger
              this.obj.FieldValue = this.obj.FieldValue.concat([{
                Name: i.Name,
                Url: i.Url,
                AttachmentId: i.AttachmentId,
                UserNo: i.UserNo
              }])

              this.fileList = this.fileList.concat([
                {
                  name: i.Name,
                  url: i.Url,
                  AttachmentId: i.AttachmentId,
                  UserNo: i.UserNo
                }
              ])
            })

            debugger
            console.log("上传成功后打印 this.fieldList", this.fileList)
            console.log("上传成功后打印this.obj.FieldValue",this.obj.FieldValue)
            // this.$refs.imgForm.handleSuccess('success', this.selectFileList[0].raw)
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.$message.error('上传失败')
        })
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          debugger
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .base-input-container
    display: flex;
    align-items: center;
    width: 300px;
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-input
      width 200px
</style>
