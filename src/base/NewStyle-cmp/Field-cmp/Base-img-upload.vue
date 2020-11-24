<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：pa 中上传图片 controlType 14
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'common-fieldcmp-style.styl'
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
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="isShowField"
  >
  <!-- obj：{{obj}} -->
  <div class="filedContentWrap u-f-ac u-f-jst">

    <div class="titWrap u-f-ac" v-show="isTitle">
      <span 
        class="tit ellipsis2"
        :style="fieldLabelStyle"
      >
        {{isTitle ? obj.DisplayName : ''}}
        <icon-svg 
          class="fieldRequiredIcon"
          v-show="!isShowing && obj.Require"
          :icon-class="RequiredSvg"
        ></icon-svg> 
        <el-tooltip 
          v-if="obj.Description"
          :content="obj.Description">
          <i class="el-icon-info"></i>
        </el-tooltip>                  
      </span>
    </div>  

    <div v-if="!isShowing" class="fieldValueWrap u-f0">
      <el-upload
        v-if="!isShowing"
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
        <el-button slot="trigger" :disabled="obj.Readonly || !isHasAddOrEditAuth()" size="small" type="primary">选择</el-button>
        <el-button 
          :disabled="isUploading || obj.Readonly || !isHasAddOrEditAuth()" 
          style="margin-left: 10px;" 
          size="small" 
          type="success" 
          @click="submitUpload"
        >上传到服务器</el-button>

        <div v-if="progress !== 0" slot="tip" style="width: 330px;">
          <el-progress :percentage="progress" :status="proStatus"></el-progress>
        </div>
      </el-upload>

      <div 
        v-if="obj.Readonly || !isHasAddOrEditAuth()"
        class="shade"
      >
      </div>
    </div>

    <div 
      class="fieldValueWrap showValue line-bottom u-f0" 
      v-else
    >
      <!-- <span class="ellipsis2">{{obj.FieldValue}}</span> -->
      <el-image 
        style="width: 100px"
        v-for="(item, key) in obj.FieldValue"
        :key="key"
        :src="item.Url"
        fit="fill"
        >
      </el-image>
    </div>  
  </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
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
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },         
      isTitle: {
        type: Boolean,
        default: true
      },
      // 是否是直接显示 还是 新增或者编辑 这个决定了 此字段组件 在不同视图场景下的正确权限显示
      viewType: {
        type: String,
        default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
      },        
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if(!this.isNeedCheck){
          callback()
          return
        }

        if (this.obj.Require && this.obj.FieldValue && !this.obj.FieldValue.length) {
          // callback(new Error('请选择' + this.obj.DisplayName))
          callback()
        } else {
          callback()
        }   
      }
      return {
        resAuth: {
          "scanViewEncry": 0,  // 查看视图是否加密   1 和 0 区分
          "addorEditViewEdit": 1,  // 新增/编辑视图是否可编辑   1 和 0 区分
          "scanViewShow": 1,  // 查看视图是否可见   1 和 0 区分
          "editViewShow": 1,  // 编辑视图是否可见   1 和 0 区分
          "addViewShow": 1,  // 新增视图是否   1 和 0 区分          
        },         
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',        
        rules: {
          required: this.obj.Require,
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
      // 是否显示字段
      isShowField(){
        // {
        //   "scanViewEncry": str.split("")[4],  // 查看视图是否加密   1 和 0 区分
        //   "addorEditViewEdit": str.split("")[3],  // 新增/编辑视图是否可编辑   1 和 0 区分
        //   "scanViewShow": str.split("")[2],  // 查看视图是否可见   1 和 0 区分
        //   "editViewShow": str.split("")[1],  // 编辑视图是否可见   1 和 0 区分
        //   "addViewShow": str.split("")[0],  // 新增视图是否   1 和 0 区分
        // }

        // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
        switch(this.viewType){
          case 'View-TM':  //查看页面 
          case 'View-SH':
          case  '3001':
            this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))            
            return true
          case  'Add-TM':  // 新增页面
          case  'Add-SH':  
          case  '3002':
            if(this.obj.Vr) {
              // 视图的 显示编辑权限
              this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))
              return this.resAuth.addViewShow == 1 ? true: false
            } 
          case  'Edit-TM': // 编辑页面
          case  'Edit-SH': 
          case  '3003': 
          case  '3005': 
            if(this.obj.Vr) {
              // 视图的 显示编辑权限
              this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))
              // debugger
              // alert(222222)
              return this.resAuth.addViewShow == 1 ? true: false
            } 
          default:
            this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))            
            // 默认情况下 都显示字段
            return true
        }
      },      
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


