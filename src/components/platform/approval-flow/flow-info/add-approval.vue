<!--
  User: xxxxxxx
  Date: 2018/12/5
  功能：新增/编辑审批
-->

<template>
  <el-dialog
    title="审批信息"
    :visible.sync="dialogTableTemplate"
    width="500px"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <div class="add-approval-container" v-loading="loadingTableTemplate">
      <el-form ref="form" :model="currentApproval" :rules="rules" label-width="100px" v-loading="loading">
        <!-- <el-form-item label="状态" prop="IsEnable">
          {{currentApproval.IsEnable ? '启用' : '停用'}}
        </el-form-item> -->
        <el-form-item label="业务领域" prop="BusinessAreaCode">
          <el-select v-model="currentApproval.BusinessAreaCode" placeholder="请选择业务领域" style="width: 300px">
            <el-option
              v-for="item in businessAreaList"
              :key="item.BusinessAreaCode"
              :label="item.Name"
              :value="item.BusinessAreaCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批名称" prop="Name">
          <el-input v-model="currentApproval.Name" placeholder="请输入审批名称" style="width: 300px">
          </el-input>
        </el-form-item>
        <el-form-item label="审批类型" prop="IsSystem">
          {{currentApproval.IsSystem ? '系统' : '自定义'}}
        </el-form-item>
        <el-form-item label="审批描述" prop="Description">
          <el-input v-model="currentApproval.Description" placeholder="请输入审批描述" type="textarea" maxlength="100" style="width: 300px">
          </el-input>
        </el-form-item>
      </el-form>
      <save-footer
        :isCancel="true"
        cancelText="关闭"
        @cancel="handleBaseInfoCancel"
        @save="handleBaseInfoSave">
      </save-footer>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getBusinessAreaList, saveApprove } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      currentApproval: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        loadingTableTemplate: false,
        loading: false,
        dialogTableTemplate: true,
        businessAreaList: [],
        rules: {
          BusinessAreaCode: [
            {required: true, message: '请选择业务领域', trigger: 'change'}
          ],
          Name: [
            {required: true, message: '请填写审批名', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this._getBusinessAreaList()
    },
    methods: {
      // 业务类型字典表
      _getBusinessAreaList () {
        getBusinessAreaList().then(res => {
          if (res.data.State === REQ_OK) {
            this.businessAreaList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '业务领域获取失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '业务领域获取失败，请刷新重试！'
          })
        })
      },
      _saveApprove () {
        this.loadingTableTemplate = true
        saveApprove(JSON.stringify(this.currentApproval), this.currentApproval.CompanyApprovalId).then(res => {
          this.loadingTableTemplate = false
          if (res.data.State === REQ_OK) {
            this.$message.success('保存成功')
            this.$emit('saveSuccess')
          } else {
            this.$message.error('保存失败，请重试')
          }
        }).catch(() => {
          this.loadingTableTemplate = false
          this.$message.error('保存失败，请重试')
        })
      },
      // 保存基本信息方法
      handleBaseInfoSave () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this._saveApprove()
          } else {
            return false
          }
        })
      },
      // 取消
      handleBaseInfoCancel () {
        this.$emit('cancelApprovalInfo')
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .add-approval-container
    .item-field
      display flex
      align-items center
      margin-bottom 10px
</style>
