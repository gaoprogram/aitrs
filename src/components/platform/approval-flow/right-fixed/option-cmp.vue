<!--
  User: gaol
  Date: 2019/6/24
  功能： 意见组件（上传附件、相关流程、常用批示语）
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .optionContentBox 
    .contentWrap
      .content-tit
        margin-top 5px
        font-size 14px
        color #000000
        font-weight bold      
      .editBox
      .editBottom    
        position relative
        margin-top 10px 
        min-height 50px
        .uploadFileWrap
          display inline-block
          width 30%
          vertical-align middle
        .relationFlow
          display inline-block
        .signsWrap
          position absolute 
          top 0 
          right 0
          text-align right
          display inline-block
          width 48%
</style>

<template>
  <div class="optionContentBox">
    <div class="contentWrap" v-atris-flowRightFixedScan="{styleBlock:'block'}">
      <div class="content-tit" v-show="form.FunctionRole.ShowOpinion">节点意见名称-默认处理意见</div>
      <!---意见框----start-->
      <div class="editBox" v-show="form.FunctionRole.ShowOpinion">
        <aitrs-editor :isShowImg= "false" :content="SignsValue"></aitrs-editor>
      </div>
      <!---意见框----end-->

      <!--意见框下面的 上传附件 和 关联流程组件 、 常见批示语选择组件---start---->
      <!-- <el-button type="primary">上传附件</el-button> -->
      <div class="editBottom">
        <!-- flowFunctionRole: {{form.FunctionRole.AttachmentCanUpload}} -->
        <!---上传意见的组件---start--->
        <div class="uploadFileWrap" v-show="form.FunctionRole.OpinionCanUploadAttachment && form.FunctionRole.AttachmentCanUpload">
          <upload-file selectTit = '选择附件'
                      :form="form"
                      :workId="workId" 
                      :nodeId="nodeId" 
                      :uploadFileType = "optionFile"
                      :detailTableCode="currentDetailTableObj.DetailTableCode" 
                      :mainTableCode="currentMainTableObj.TableCode"
                      @uploadOptionFileSuccess="uploadOptionFileSuccess">
          </upload-file>
        </div>
        <!---上传意见的组件---end--->

        <!---意见框允许关联流程的组件---start--->
        <div class="relationFlow" v-show="form.FunctionRole.OpinionCanRelateFlow">
          <el-button  type="primary" size="small" @click="showRelativeFlow=true">流程关联</el-button>
        </div>
        <!---意见框允许关联流程的组件-----end--->

        <!--常见批示语组件---start---->
        <div class="signsWrap">
          <!-- commentsList： {{commentsList}} -->
          <el-select v-model="SignsValue" placeholder="请选择选用常用批示语" >
            <el-option
              v-for="item in commentsList"
              :key="item.Id"
              :label="item.ShortName"
              :value="item.ShortName">
            </el-option>
          </el-select>
        </div>
        <!--常见批示语组件---end---->

      </div>
      <!--意见框下面的 上传附件 和 关联流程btn组件、 常见批示语选择组件---end---->
    </div>

    <!-- workId: {{workId}}
    ------
    nodeId: {{nodeId}} -->
    <div v-if="showRelativeFlow" >
      <el-dialog
        title="相关流程"
        :visible.sync="showRelativeFlow"
        width="60%"
        append-to-body
        :close-on-click-modal="false">
        <!---调用流程关联的组件-start-->
        <flow-relation-cmp 
            :currentMainTableObj="currentMainTableObj"
            :currentDetailTableObj="currentDetailTableObj"
            :form="form"
            :nodeId="nodeId"
            :workId="workId"
            @handleCancelBtn="showRelativeFlow = false"
            @handleSureBtn="showRelativeFlow = false">
        </flow-relation-cmp>
        <!---调用流程关联的组件-end-->
      </el-dialog>      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import UploadFile from '@/base/flowUpload/uploadFile'
  import FlowRelationCmp from './flowRelation-cmp'
  import {mapGetters} from 'vuex'
  export default {
    components: {
      UploadFile,
      AitrsEditor,
      FlowRelationCmp
    },
    inheritAttrs: false,
    props: {
      rightContentCurrentStr: {
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
      commentsList: {
        type: Array,
        default: () => {
          return []
        }
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      workId: {
        type: String,
        default: ''
      },
      nodeId: {
        type: [String,Number],
        default: ''
      },
      currentMainTableObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      currentDetailTableObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        showRelativeFlow: false, // 控制相关流程的显示、隐藏
        SignsValue: '',   // 富文本编辑器中输入的 批示语
        optionFile: 'file'  // 上传附件的类型 file 表示上传的是 意见附件 
      }
    },
    computed: {
      ...mapGetters([
        'flowFunctionRole'
      ])
    },
    created () {
      // 获取 常用批示语的 数据

    },
    methods: {
      
      uploadOptionFileSuccess () {
        debugger
        this.$message({
          type: 'success',
          message: '上传成功------------'
        })
      },
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      },
      changeOrgDetailCmp (prop) {
        this.$refs[`detailForm${this.currentDetailTableCode}`].validateField(prop)
      }
    },
    watch: {
      form: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:detailTableList , 并且把值传过去
          console.log('form', newValue, oldValue)
          this.$emit('update:form', newValue)
        },
        deep: true
      }
    }
  }
</script>

