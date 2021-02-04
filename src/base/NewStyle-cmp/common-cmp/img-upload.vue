<!--
  User: xxxxxxx
  Date: 2020/12/22
  功能：上传图片组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-upload--picture-card {
  position relative !important
  width 30px !important 
  height 30px !important
}
</style>
<template>
    <!-- obj：{{obj}} -->
    <div class="filedContentWrap u-f-ac u-f-jst">
        <el-upload
          v-if="showType == 1"
          class="upload-demo fieldValue"
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
                style="margin-left: 10px;" 
                size="small" 
                type="success" 
                @click="submitUpload"
            >上传到服务器</el-button>
            <div v-if="progress !== 0" slot="tip" style="width: 330px;">
              <el-progress :percentage="progress" :status="proStatus"></el-progress>
            </div>
        </el-upload>   
    </div>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import { REQ_OK } from '@/api/config'
  import {
    UploadAttachments,
    DeleteAttachment
  } from '@/api/newStyle'
  import { mapGetters } from 'vuex';

  export default {
    props: {
      obj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      showType: {
        type: [String, Number],
        default: 1   // 1 手动上传 2 自动上传(头像模式) 
      }    
    },
    data () {
      return {
        visible: false,
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
              AttachmentId: i.Url,
            }
          }else {
            // 添加了图片 删除了图片进行 主表切换时 进入此时的数据中 的 name 和 url 都是 小写
            return {
              name: i.name,
              url: i.url,
              AttachmentId: i.Url,
            }
          }
        })
      }
      console.log("base-img-upload-created中打印的fileList", this.fileList)
    },
    methods: {
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      },      
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
      // 点击上传到服务器
      submitUpload () {
        debugger
        if (this.selectFileList && !this.selectFileList.length) {
          this.$message.warning('未选择任何文件！')
          return false
        }
        this.isUploading = true
        UploadAttachments(this.selectFileList).then(res => {
          debugger
          this.isUploading = false
          if (res.data.State === REQ_OK) {
            this.progress = 100
            this.pass = 'success'
            this.$message.success('上传成功！')
            debugger
            
            // 上传成功后将 selectFileList 清空
            this.selectFileList = []

            console.log("上传成功后打印返回的数据", res.data.Data)
            // console.log("上传成功后打印this.obj", this.obj)
            // 将上传成功后返回的数据做处理
            console.log(this.$refs.imgForm)
            // this.visible = false
            // 将成功的返回数据 抛出去
            this.$emit('emitUpload', res.data.Data)
            debugger
            console.log("上传成功后打印 this.fieldList", this.fileList)
            // console.log("上传成功后打印this.obj.FieldValue",this.obj.FieldValue)
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


