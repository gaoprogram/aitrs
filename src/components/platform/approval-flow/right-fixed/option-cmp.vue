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
        .tit
          font-weight bold   
        .titContent
          color #409EFF
      .editBox
      .editBottom    
        position relative
        margin 10px 0 10px 0
        min-height 50px
        .uploadFileWrap
          display inline-block
          vertical-align middle
          margin-right 20px
        .relationFlow
          position absolute
          top 3px
          left 0
          // display inline-block
          vertical-align middle
          &.on
            left 150px
        .signsWrap
          position absolute 
          top 0 
          right 0
          text-align right
          display inline-block
          width 48%
          .addSignBtn
            background-color #EBF3FC
            &:hover
              color #ffffff
              background-color #409EFF
        .relativeFlowBox
          margin-top 20px
          .tit
            display block
            margin-bottom 10px
            font-size 14px 
            font-weight bold              
      .relativeFilesBox
        margin-bottom 10px
        .tit  
          font-size 14px
          font-weight bold     
</style>

<template>
  <div class="optionContentBox">
    <!-- form: {{form.FunctionRole.ShowOpinion}} -->
    <div class="contentWrap" v-atris-flowRightFixedScan="{styleBlock:'block'}">
      <div class="content-tit" v-if="!!form.FunctionRole.ShowOpinion">
        <span class="tit">节点意见名称-</span>
        <span class="titContent">{{form.Node.FWCNodeName}}</span>
      </div>
      <!---意见框----start-->
      <div class="editBox" v-if="!!form.FunctionRole.ShowOpinion">
        <aitrs-editor 
          :isShowImg= "false" 
          :flowContent="SignsValue">
        </aitrs-editor>
      </div>
      <!---意见框----end-->

      <!--意见框下面的 上传附件 和 关联流程组件 、 常见批示语选择组件---start---->
      <!-- <el-button type="primary">上传附件</el-button> -->
      <div class="editBottom" v-if="!!form.FunctionRole.ShowOpinion">
        <!-- flowFunctionRole: {{form.FunctionRole.AttachmentCanUpload}} -->
        <!---上传意见的组件---start--->
        <div class="uploadFileWrap" v-if="form.FunctionRole.OpinionCanUploadAttachment && form.FunctionRole.AttachmentCanUpload">
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

        <div style="display:inline-block; height: 40px;vertical-align: middle"></div>
        <!---意见框允许关联流程的组件---start--->
        <div :class="['relationFlow', form.FunctionRole.OpinionCanUploadAttachment && form.FunctionRole.AttachmentCanUpload ? 'on': '']" v-show="form.FunctionRole.OpinionCanRelateFlow">
          <el-button  type="primary" size="small" @click="showRelativeFlow=true">流程关联</el-button>
        </div>
        <!---意见框允许关联流程的组件-----end--->

        <!--常见批示语组件---start---->
        <div class="signsWrap">
          <!-- commentsArr {{commentsArr}} -->
          <el-tooltip content="新增批示语">
            <el-button size="small" @click.native="clickAddSignBtn" class="addSignBtn"><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
          <el-select v-model="SignsValue" clearable placeholder="请选择常用批示语">
            <el-option-group
              v-for="group in commentsArr"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.children"
                :key="item.Id + item.ShortName"
                :label="item.ShortName"
                :value="item.ShortName">
              </el-option>
            </el-option-group>

            <!-- <el-cascader :options="commentsArr" clearable></el-cascader>-->
          </el-select>
        </div>
        <!--常见批示语组件---end---->

        <!---详情中相关流程显示区-start-->
        <div class="relativeFlowBox" v-if="form.FunctionRole.OpinionCanRelateFlow">
          <span class="tit">相关流程区：</span>
          <related-process-cmp ref="relativeFlow" :form="form"></related-process-cmp>
        </div>
        <!---详情中相关流程显示区-end-->
      </div>        

    </div>
    <!--意见框下面的 上传附件 和 关联流程btn组件、 常见批示语选择组件---end---->

    <!--详情中相关附件显示区--start--->
    <!-- <div class="relativeFilesBox" v-show="form.FunctionRole.ShowOpinion">
      <span class="tit">相关附件区：</span>
      <appendix-cmp ref="relativeFiles" :form="form"></appendix-cmp>
    </div> -->
    <!--详情中相关附件显示区--end--->

    <!-- workId: {{workId}}
    ------
    nodeId: {{nodeId}} -->
    <div class="relationFlowBox" v-if="showRelativeFlow" >
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
            @handleSureBtn="handleSureBtn">
        </flow-relation-cmp>
        <!---调用流程关联的组件-end-->
      </el-dialog>      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import UploadFile from '@/base/flowUpload/uploadFile'
  import RelatedProcessCmp from './relatedProcess-cmp'
  import FlowRelationCmp from './flowRelation-cmp'
  import AppendixCmp from './appendix-cmp'
  import {mapGetters} from 'vuex'
  export default {
    components: {
      UploadFile,
      AitrsEditor,
      FlowRelationCmp,
      RelatedProcessCmp,
      AppendixCmp
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
      ]),
      commentsArr () {
        return this.commentsList
      }
    },
    created () {
      // 
      // this.$bus.$on('clearFlowEditor', () => {
      //   this.$store.dispatch("setEditorContentValue", '') 
      //   this.SignsValue = ''
      // })
      // this.SignsValue = this.obj.FieldValue
    },
    beforeDestroy(){
      // this.$bus.$off('clearFlowEditor')
    },
    methods: {
      // 上传附件成功后
      uploadOptionFileSuccess () {
        debugger
        // 触发 option 中的 显示相关附件区域 数据的更新：直接调用 组件appendix-cmp 中的方法来更新 附件显示区的数据
        // this.$refs.relativeFiles._showAttachment()
        // console.log("option-cmp 组件中 直接调用 appendix-cmp 更新数据的方法成功")
      },
      // 关联流程成功后
      handleSureBtn () {
        this.showRelativeFlow = false
        debugger
        // 触发 option 中的 显示相关流程区域 数据的更新：直接调用 组件relatedProcess-cmp 中的方法来更新 附件显示区的数据
        this.$refs.relativeFlow._showRelatedFlow()
        console.log("option-cmp 组件中 直接调用 relatedProcess-cmp 更新数据的方法成功")        
      },
      // 添加 常用批示语
      clickAddSignBtn(){
        this.$router.push({
          path: '/platform/approvalFlow/set'
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

