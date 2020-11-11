<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：pa 中上传图片 controlType 14
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >
  <!-- obj：{{obj}} -->
    <el-upload
      class="upload-demo"
      action="string"
      ref="imgForm"
      accept="image/png,image/gif,image/jpg,image/jpeg"
      :before-remove="beforeRemove"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :on-change="onChange"
      :auto-upload="false"
      list-type="picture"
      multiple
      :limit="limitNum"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button slot="trigger" size="small" type="primary">选择</el-button>
      <el-button 
        :disabled="isUploading" 
        style="margin-left: 10px;" 
        size="small" 
        type="success" 
        @click="submitUpload"
      >上传到服务器</el-button>

      <div v-if="progress !== 0" slot="tip" style="width: 330px;">
        <el-progress :percentage="progress" :status="proStatus"></el-progress>
      </div>
    </el-upload>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    UploadAttachments,
    DeleteAttachment
  } from '@/api/employee'
  import { mapGetters } from 'vuex';
  export default {
    props: {
      //是否需要校验
      isNeedCheck: {
        type: Boolean,
        default: false
      },      
      prop: {
        type: String,
        default: ''
      },
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if(!this.isNeedCheck){
          callback()
          return
        }

        if (this.obj.Config.Required && this.obj.FieldValue && !this.obj.FieldValue.length) {
          // callback(new Error('请选择' + this.obj.FieldName))
          callback()
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
        limitNum: 6, // 
        isUploading: false,  // 控制 上传到服务器btn 的显示/隐藏
        fileList: [],         // 图片列表
        selectFileList: [],   // 所选择的图片list
        progress: 0,   // 上传的进度条
        pass: null, // 是否上传成功
        data: {}
      }
    },
    computed: {
      ...mapGetters([
        'currentEmpObj'
      ]),
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
      if(this.obj.FieldCode === 'PEEPhoto'){
        // 员工照片时 每次只允许上传 一张
        this.limitNum = 1
      }
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
            }
          }else {
            // 添加了图片 删除了图片进行 主表切换时 进入此时的数据中 的 name 和 url 都是 小写
            return {
              name: i.name,
              url: i.url,
              AttachmentId: i.AttachmentId,
            }
          }
        })
      }
      console.log("base-img-upload-created中打印的fileList", this.fileList)
    },
    methods: {
      // 删除
      delete (url, AttachmentId) {
        debugger
        DeleteAttachment(url).then(res => {
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
                this.delete( file.url, file.AttachmentId )
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
      // 文件超出限定个数后的钩子函数
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 ${this.limitNum} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      submitUpload () {
        // 上传到服务器
        debugger
        if (this.selectFileList && !this.selectFileList.length) {
          this.$message.warning('未选择任何文件！')
          return false
        }
        this.isUploading = true
        UploadAttachments(this.selectFileList, this.currentEmpObj.EmpId).then(res => {
          this.isUploading = false
          if (res.data.State === REQ_OK) {
            this.progress = 100
            this.pass = 'success'
            this.$message.success('上传成功！')
            debugger
            
            // 上传成功后将 selectFileList 清空
            this.selectFileList = []

            console.log("上传成功后打印返回的数据", res.data.Data)
            console.log("上传成功后打印this.obj", this.obj)
            // 将上传成功后返回的数据做处理
            res.data.Data.forEach(i => {
              debugger
              this.obj.FieldValue = this.obj.FieldValue.concat([{
                Name: i.Name,
                Url: i.Url,
                AttachmentId: i.AttachmentId,
              }])

              this.fileList = this.fileList.concat([
                {
                  name: i.Name,
                  url: i.Url,
                  AttachmentId: i.AttachmentId,
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

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
