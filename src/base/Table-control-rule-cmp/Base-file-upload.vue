<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：发起页面、 流转页面right-fiexd 中 主表字段中的 附件上传  contryType 15  （注意 流转页面上传明细表 和 意见框下面的上传附件不是用的这个）
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
  <!-- obj： {{obj}} -->
    <el-upload
      class="upload-demo"
      action="string"
      ref="fileForm"
      :before-remove="beforeRemove"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :on-change="onChange"
      :auto-upload="false"
      multiple
      :limit="5"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
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
        default: {}
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if (this.obj.Required && this.obj.FieldValue && !this.obj.FieldValue.length) {
          callback(new Error('请选择' + this.obj.FieldName))
        } else {
          callback()
        }
      }
      return {
        uploadUrl: '',
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: 'change'
        },
        fileList: [],
        selectFileList: [],
        progress: 0,
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
      if (!this.obj.FieldValue) {
        this.obj.FieldValue = []
      } else if (this.obj.FieldValue.length) {
        this.fileList = this.obj.FieldValue.map(i => {
          return {
            name: i.Name,
            url: i.Url,
            AttachmentId: i.AttachmentId
          }
        })
      }
      console.log("base-file-upload -created中打印的fileList", this.fileList)
    },
    methods: {
      // 删除
      delete(){
        DeleteAttachment(file.AttachmentId, this.workId, this.nodeId).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fileList = fileList.filter(i => {
              return i.AttachmentId !== file.AttachmentId
            })
            if(!this.fileList.length){
              // 全部删除完成后，隐藏 进度条
              this.progress = 0
            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.Error
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      },
      beforeRemove (file, fileList) {
        console.log(file, fileList, this.obj.FieldValue)
        if (this.attachmentRole && !this.attachmentRole.AttachmentCanDelete) {
          this.$message({
            type: 'info',
            message: '无权限删除附件!'
          })
          return false
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 根据此图是否 已经上传过 进行分别删除
          fileList.forEach((item, key, arr) => {
            if( !item.AttachmentId ){
              // 证明是还未上传到服务器上面的
              item.uid === file.uid && arr.splice(key, 1)
              // 全部删除完成后，隐藏 进度条
              if(!fileList.length) this.progress = 0
            }else {
              debugger
              // 已经上传到服务器上面的
              this.delete( file.AttachmentId )
            }
          })
        }).catch(() => {
        })
        return false
      },
      onRemove (file, fileList) {
      },
      beforeUpload (file) {
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
        console.log('onChange', file, fileList)
        if (file.status === 'ready') {
          console.log('ready', fileList)
          // 重置progress组件
          this.pass = null
          this.progress = 0
          this.selectFileList = fileList
        } else if (file.status === 'fail') {
          this.pass = false
          this.$message.error('附件上传出错，请刷新重试！')
        }
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      submitUpload () {
        debugger
        if (this.selectFileList && !this.selectFileList.length) {
          this.$message.warning('未选择任何文件！')
          return false
        }
        uploadAttachments(this.selectFileList, this.workId, this.nodeId).then(res => {
          if (res.data.State === REQ_OK) {
            this.progress = 100
            this.pass = 'success'
            this.$message.success('上传成功！')
            res.data.Data.forEach(i => {
              debugger
              this.obj.FieldValue = this.obj.FieldValue.concat([{
                Name: i.Name,
                Url: i.Url,
                AttachmentId: i.AttachmentId
              }])
            })
            // this.$refs.fileForm.handleSuccess('success', this.selectFileList[0].raw)
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
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .upload-demo
    width 370px
</style>
