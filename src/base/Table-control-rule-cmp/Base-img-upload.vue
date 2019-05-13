<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：图片上传
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
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
      :limit="5"
      :on-exceed="handleExceed"
      :file-list="fileList"
      list-type="picture"
    >
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
        default: () => {
          return {}
        }
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
    },
    methods: {
      beforeRemove (file, fileList) {
        console.log(file, fileList, this.obj.FieldValue)
        if (this.attachmentRole && !this.attachmentRole.AttachmentCanDelete) {
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
          DeleteAttachment(file.AttachmentId, this.workId, this.nodeId).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.fileList = fileList.filter(i => {
                return i.AttachmentId !== file.AttachmentId
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
        }).catch(() => {
        })
        return false
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
        if (file.status === 'ready') {
          // 重置progress组件
          this.pass = null
          this.progress = 0
          this.selectFileList = fileList
        } else if (file.status === 'fail') {
          this.pass = false
          this.$message.error('图片上传出错，请刷新重试！')
        }
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      submitUpload () {
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
              this.obj.FieldValue.push({
                Name: i.Name,
                Url: i.Url,
                AttachmentId: i.AttachmentId
              })
            })
            this.$refs.imgForm.handleSuccess('success', this.selectFileList[0].raw)
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
