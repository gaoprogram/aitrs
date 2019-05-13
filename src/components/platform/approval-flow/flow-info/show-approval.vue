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
    v-loading="loadingTableTemplate"
  >
    <div class="add-approval-container">
      <!-- <div class="item-field">
        <span class="name">状态：</span>
        {{currentApproval.IsEnable ? '启用' : '停用'}}
      </div> -->
      <div class="item-field">
        业务领域：
        <el-select disabled v-model="currentApproval.BusinessAreaCode" placeholder="请选择" style="width: 300px">
          <el-option
            v-for="item in businessAreaList"
            :key="item.BusinessAreaCode"
            :label="item.Name"
            :value="item.BusinessAreaCode">
          </el-option>
        </el-select>
      </div>
      <div class="item-field">
        <span class="name">审批名称：</span>
        <el-input v-model="currentApproval.Name" disabled style="width: 300px">
        </el-input>
      </div>
      <div class="item-field">
        <span class="name">审批类型：</span>
        <span class="typeTit">{{currentApproval.IsSystem ? '系统' : '自定义'}}</span>  
      </div>
      <div class="item-field">
        <span class="name">审批描述：</span>
        <el-input disabled v-model="currentApproval.Description" type="textarea" maxlength="100" style="width: 300px">
        </el-input>
      </div>
      <save-footer
        :isCancel="false"
        saveText="关闭"
        @save="handleBaseInfoSave">
      </save-footer>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getBusinessAreaList } from '@/api/approve'
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
        dialogTableTemplate: true,
        baseInfoObj: {
          IsEnable: false, // 状态
          BusinessTypeCode: '', // 业务类型code
          Name: '', // 审批名称
          Note: '' // 审批描述
        },
        businessAreaList: []
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
            this.loading = false
            this.$message({
              type: 'error',
              message: '业务领域获取失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '业务领域获取失败，请刷新重试！'
          })
        })
      },
      // 关闭
      handleBaseInfoSave () {
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
      justify-content center
      align-items center
      margin-bottom 15px
      .typeTit
        display inline-block
        width 300px
</style>
