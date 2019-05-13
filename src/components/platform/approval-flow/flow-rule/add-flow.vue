<!--
  User: xxxxxxx
  Date: 2019/1/21
  功能：新增流程
-->

<template>
  <el-dialog
    title="新增流程"
    :visible.sync="dialogAddFlow"
    width="500px"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" v-loading="loading">
      <el-form-item label="归属于审批" prop="CompanyApprovalId">
        <el-select v-model="form.CompanyApprovalId" placeholder="请选择流程归属" style="width: 300px;">
          <el-option
            :label="approval.Name"
            :value="approval.CompanyApprovalId"
            :key="approval.CompanyApprovalId"
            v-for="approval in approvalList"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流程名称" prop="Name">
        <el-input v-model="form.Name" placeholder="请输入流程名称" style="width: 300px;"></el-input>
      </el-form-item>
    </el-form>
    <save-footer
      :isCancel="true"
      saveText="保存"
      @cancel="handleCancel"
      @save="handleSave">
    </save-footer>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { addRule } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      approvalList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        loading: false,
        dialogAddFlow: true,
        form: {
          CompanyApprovalId: '',
          Name: ''
        },
        rules: {
          Name: [
            {required: true, message: '请输入流程名称', trigger: 'blur'}
          ],
          CompanyApprovalId: [
            {required: true, message: '请选择流程归属', trigger: 'change'}
          ]
        }
      }
    },
    created () {
    },
    methods: {
      _addRule () {
        this.loading = true
        addRule(this.form.CompanyApprovalId, this.form.Name).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message.success('新增成功')
            this.$emit('saveSuccess', res.data.Data)
          } else {
            this.$message.error(`${res.data.Error}`)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('新增失败，请重试')
        })
      },
      // 保存
      handleSave () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this._addRule()
          } else {
            return false
          }
        })
      },
      // 取消
      handleCancel () {
        this.$emit('cancel')
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
