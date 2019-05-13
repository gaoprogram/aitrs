<!--
  User: xxxxxxx
  Date: 2018/7/9
  功能：表单的基本信息
-->

<template>
  <div class="content-container" v-loading="loading">
    <el-card>
      <el-form ref="form" :model="baseInfoObj" :rules="rules" label-width="100px" v-loading="loading">
        <el-form-item label="表单号" prop="TableCode_newAdd">
          <!-- <el-input v-model="baseInfoObj.TableCode_newAdd" disabled placeholder="请输入表单名称" style="width: 300px">
          </el-input> -->
          <!--此组件被 新增自定义组件和 已有表单的 编辑 页面调用 --->
          {{baseInfoObj.TableCode_newAdd || tableCode }}
        </el-form-item>
        <el-form-item label="表单名称" prop="TableName">
          <el-input v-model="baseInfoObj.TableName" placeholder="请输入表单名称" style="width: 300px">
          </el-input>
        </el-form-item>
        <el-form-item label="业务领域" prop="BusinessAreaCode">
          <el-select v-model="baseInfoObj.BusinessAreaCode" placeholder="请选择业务领域" :disabled="!!tableCode" style="width: 300px">
            <el-option
              v-for="item in businessAreaList"
              :key="item.BusinessAreaCode"
              :label="item.Name"
              :value="item.BusinessAreaCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型" prop="BusinessTypeCode">
          <el-select v-model="baseInfoObj.BusinessTypeCode" :disabled="!!tableCode" placeholder="请选择业务类型" style="width: 300px">
            <el-option
              v-for="item in businessTypeList"
              :key="item.BusinessTypeCode"
              :label="item.Name"
              :value="item.BusinessTypeCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否公共库" prop="IsPublic">
          <el-switch
            style="margin-left: 10px"
            v-model="baseInfoObj.IsPublic"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
            @change= "switchChange"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="表单属性">
          自定义
        </el-form-item>

        <!--gaol新增 关联系统表单名- 有tableCode时才显示-start-->
        <el-form-item label="关联系统表单名" label-width="110px" v-if="tableCode">
          <!-- <el-select v-model="baseInfoObj.SysTableName" :disabled="true" placeholder="请选择业务类型" style="width: 300px">
            <el-option
              v-for="item in businessTypeList"
              :key="item.BusinessTypeCode"
              :label="item.Name"
              :value="item.BusinessTypeCode">
            </el-option> 
          </el-select>-->
          {{baseInfoObj.SysTableName || '无' }}
        </el-form-item> 
        <!--gaol新增 关联系统表单名--end-->

        <el-form-item label="表单描述" prop="Description">
          <el-input v-model="baseInfoObj.Description" placeholder="请输入表单描述" type="textarea" maxlength="100" style="width: 300px">
          </el-input>
        </el-form-item>

        <!--gaoladd 提示--有tableCode时才显示--start-->
        <el-form-item label="">
          <span class="point-tit">提示:业务类型仅在新增时可选定一次，之后不可变更</span>
        </el-form-item>
        <!--gaoladd 提示-end-->

      </el-form>
      
      <save-footer
        :isCancel="true"
        cancelText="关闭"
        @cancel="handleBaseInfoCancel"
        @save="handleBaseInfoSave">
      </save-footer>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    GetTableCode,
    getComTableConfig,
    saveComTableConfig,
    getBusinessTypeList,
    getBusinessAreaList
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  export default {
    data () {
      return {
        baseInfoObj: {
          State: 0, // 状态
          TableCode_newAdd: '', // 表单号 主要是为新增表单时 显示 表单code
          BusinessAreaCode: '', // 业务领域
          BusinessTypeCode: '', // 业务类型code
          TableName: '', // 审批名称
          Description: '', // 审批描述
          IsPublic: true   // 默认新增的是公共表单
        },
        tableCode: '', // 表单code, 注意与 baseInfoObj.TableCode_newAdd 作区分
        businessTypeList: [],
        businessAreaList: [],
        loading: true,
        rules: {
          TableName: [
            {required: true, message: '请输入表单名称', trigger: 'blur'}
          ],
          BusinessAreaCode: [
            {required: true, message: '请选择业务领域', trigger: 'change'}
          ],
          BusinessTypeCode: [
            {required: true, message: '请选择业务类型', trigger: 'change'}
          ]
        }
      }
    },

    watch: {
      'baseInfoObj.IsPublic' (newValue, oldValue) {
        if (!newValue) {
          // 修改为 false后 触发提示
          this.$confirm(`确定修改为非公共库吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then((res) => {
            // //debugger
          }).catch(() => {
            // 取消修改
            this.baseInfoObj.IsPublic = true
          })
        }
      }
    },
    created () {
      this.$nextTick(() => {
        try {
          this.tableCode = this.$route.query.tableCode
          if (this.tableCode) {
              // 有tableCode 时候才 调用 这个接口 所以新增自定义表单时，是没有 关联表单等信息的,关联表单不显示
            this._getComTableConfig()
          }
          this._GetTableCode()
          this._getBusinessTypeList()
          this._getBusinessAreaList()
        } catch (error) {
          this.loading = false
          this.$message.error('数据获取失败，请刷新重试')
        }
      })
    },
    methods: {
      // 获取系统表单code
      _GetTableCode () {
        GetTableCode().then(res => {
          // debugger
          if (res.data.State === REQ_OK) {
            this.baseInfoObj.TableCode_newAdd = res.data.Data
          } else {
            this.$message.error('获取表单code失败，请刷新重试')
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('获取表单code失败，请刷新重试')
        })
      },
      // 业务类型字典表
      _getBusinessTypeList () {
        getBusinessTypeList().then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.businessTypeList = res.data.Data
          } else {
            this.$message.error('业务类型获取失败，请刷新重试')
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('业务类型获取失败，请刷新重试')
        })
      },
      // 业务领域
      _getBusinessAreaList () {
        getBusinessAreaList().then(res => {
          if (res.data.State === REQ_OK) {
            this.businessAreaList = res.data.Data
          }
        })
      },
      // 获取基本信息
      _getComTableConfig () {
        // debugger
        this.loading = true
        getComTableConfig(this.tableCode).then(res => {
          this.loading = false
          // debugger
          if (res.data.State === REQ_OK) {
            this.baseInfoObj = res.data.Data
          } else {
            this.$message.error('基本信息获取失败，请刷新重试')
          }
        }).catch(() => {
          this.$message.error('基本信息获取失败，请刷新重试')
        })
      },
      // 保存基本信息接口
      _saveComTableConfig () {
        // debugger
        this.loading = true
        saveComTableConfig(JSON.stringify(this.baseInfoObj)).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            // 触发 table-manage.vue中的 刷新
            this.$bus.$emit('tableManageRefresh')
            this.$message({
              type: 'success',
              message: '保存成功！',
              duration: 1000,
              onClose: () => {
                if (!this.tableCode) {
                  this.$router.replace({
                    path: '/platform/approvalFlow/tableManage/tableEdit',
                    query: {
                      tableCode: res.data.Data
                    }
                  })
                }
              }
            })
          } else {
            this.$message.error('保存失败，请重试')
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('保存失败，请重试')
        })
      },
      // 保存基本信息方法
      handleBaseInfoSave () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this._saveComTableConfig()
          } else {
            return false
          }
        })
      },
      // 关闭
      handleBaseInfoCancel () {
        this.$router.back()
      },
      handleClose () {
        this.$router.back()
      },
      // 修改了是否为 公共表单的 配置
      switchChange () {

      }

    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content-container
    .item-field
      display flex
      align-items center
      margin-bottom 10px
    .point-tit
      color red
      font-size 12px
</style>
