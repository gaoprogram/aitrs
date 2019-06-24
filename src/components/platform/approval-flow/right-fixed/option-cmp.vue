<!--
  User: gaol
  Date: 2019/6/24
  功能： 意见组件（上传附件、相关流程、常用批示语）
-->
<template>
  <div class="optionContentBox">
    <div>
      <aitrs-editor></aitrs-editor>
      <!-- <el-button type="primary">上传附件</el-button> -->
      <upload-file selectTit = '选择附件'></upload-file>
      <!-- <el-button @click="">选用常用批示语</el-button> -->

      <el-select v-model="SignsValue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

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
  import UploadFile from '@/base/uploadFile/uploadFile'
  export default {
    components: {
      UploadFile
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
      }
      // obj: {
      //   type: Object,
      //   default: () => {
      //     return {}
      //   }
      // },
      // workId: {
      //   type: String,
      //   default: ''
      // },
      // nodeId: {
      //   type: String,
      //   default: ''
      // },
      // attachmentRole: {
      //   type: String,
      //   default: ''
      // }
    },
    data () {
      return {
        showRelativeFlow: false, // 控制相关流程的显示、隐藏
        SignsValue: ''
      }
    },
    created () {

    },
    methods: {
  
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
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:detailTableList , 并且把值传过去
          console.log('obj', newValue, oldValue)
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
