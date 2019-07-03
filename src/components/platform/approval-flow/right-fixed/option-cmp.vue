<!--
  User: gaol
  Date: 2019/6/24
  功能： 意见组件（上传附件、相关流程、常用批示语）
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .optionContentBox 
    .editBox
    .editBottom    
      position relative
      margin-top 10px 
      .uploadFileWrap
        display inline-block
        width 50%
        vertical-align middle
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
    <div>
      <div class="editBox" v-show="flowFunctionRole.FunctionRole.ShowOpinion">
        <aitrs-editor :isShowImg= "false" :content="SignsValue"></aitrs-editor>
      </div>
      <!-- <el-button type="primary">上传附件</el-button> -->
      <div class="editBottom">
        flowFunctionRole: {{flowFunctionRole}}
        <div class="uploadFileWrap" v-if="flowFunctionRole.FunctionRole.AttachmentCanUpload">
          <upload-file selectTit = '选择附件'
                      :form="form"
                      :workId="workId" 
                      :nodeId="nodeId" 
                      :detailTableCode="currentDetailTableObj.DetailTableCode" 
                      :mainTableCode="currentMainTableObj.TableCode"
                      @uploadDetailSuccess="uploadDetailSuccess">
          </upload-file>
        </div>

        <div class="signsWrap">
          <!-- commentsList： {{commentsList}} -->
          <el-select v-model="SignsValue" placeholder="请选择选用常用批示语">
            <el-option
              v-for="item in commentsList"
              :key="item.Id"
              :label="item.ShortName"
              :value="item.ShortName">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div v-if="showRelativeFlow">
      <el-dialog
        title="相关流程"
        :visible.sync="showRelativeFlow"
        width="30%"
        append-to-body>
        <span>这是相关流程的dialog弹框</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showRelativeFlow = false">取 消</el-button>
          <el-button type="primary" @click="showRelativeFlow = false">确 定</el-button>
        </span>
      </el-dialog>      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import UploadFile from '@/base/flowUpload/uploadFile'
  import {mapGetters} from 'vuex'
  export default {
    components: {
      UploadFile,
      AitrsEditor
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
      uploadDetailSuccess () {
        
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

