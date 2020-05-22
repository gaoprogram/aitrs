<!--
  User: xxxxxxx
  Date: 2018/12/29
  功能：xxxxxx
-->

<template>
  <transition name="el-zoom-in-center">
    <el-dialog
      title="表单管理"
      :visible="true"
      fullscreen
      :append-to-body="true"
      :before-close="handleClose"
      :close-on-press-escape="false"
    >

      <div class="table-edit-container" v-loading="loading">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <div class="content-container">
              <el-card>
                <div class="item-field">
                  <span class="tablcodeNameTit"> 表单号：</span>
                  <span class="tablcode">{{tableCode}}</span>
                  <!-- <el-input disabled v-model="tableCode" style="width: 300px">
                  </el-input>      -->
                </div>   
                <div class="item-field">
                  <span class="name">表单名称：</span>
                  <el-input disabled v-model="baseInfoObj.TableName" style="width: 300px">
                  </el-input>
                </div>
                <div class="item-field">
                  <span class="BusinessAreaCode">业务领域：</span>
                  <el-select disabled v-model="baseInfoObj.BusinessAreaCode" placeholder="请选择" style="width: 300px">
                    <el-option
                      v-for="item in businessAreaList"
                      :key="item.BusinessAreaCode"
                      :label="item.Name"
                      :value="item.BusinessAreaCode">
                    </el-option>
                  </el-select>
                </div>
                <div class="item-field">
                  <span class="BusinessTypeCode">业务类型：</span>                  
                  <el-select disabled v-model="baseInfoObj.BusinessTypeCode" placeholder="请选择" style="width: 300px">
                    <el-option
                      v-for="item in businessTypeList"
                      :key="item.BusinessTypeCode"
                      :label="item.Name"
                      :value="item.BusinessTypeCode">
                    </el-option>
                  </el-select>
                </div>
                <div class="item-field">
                  <span class="IsPublic">是否公共库：</span>                  
                  <el-switch
                    style="margin-left: 10px"
                    v-model="baseInfoObj.IsPublic"
                    disabled
                    active-color="#3B8BE3"
                    inactive-color="#cccccc"
                  >
                  </el-switch>
                </div>
                <div class="item-field">
                  <span class="TableNature">表单属性：</span>                  
                  <span>{{baseInfoObj.TableNature}}</span>
                </div>

                <!--gaol新增 关联系统表单名- 有tableCode时才显示-start-->
                <div class="item-field" v-if="tableCode">
                  <!-- <el-form-item label="关联系统表单名" label-width="110px" v-if="tableCode">
                    <!-- <el-select v-model="baseInfoObj.SysTableName" :disabled="true" placeholder="请选择业务类型" style="width: 300px">
                      <el-option
                        v-for="item in businessTypeList"
                        :key="item.BusinessTypeCode"
                        :label="item.Name"
                        :value="item.BusinessTypeCode">
                      </el-option> 
                    </el-select>
                    {{baseInfoObj.SysTableName || '无' }}
                  </el-form-item>-->
                  <span class="SysTableName">系统关联表单名：</span>
                  <span>{{baseInfoObj.SysTableName || '无' }}</span>
                </div>
                <!--gaol新增 关联系统表单名--end-->

                <div class="item-field">
                  <span class="Description">表单描述：</span>
                  <el-input disabled v-model="baseInfoObj.Description" type="textarea" maxlength="100" style="width: 300px">
                  </el-input>
                </div>

                <!--gaoladd 提示--有tableCode时才显示--start-->
                <div class="item-field">
                  <span class="point-tit">提示:业务类型仅在新增时可选定一次，之后不可变更</span>
                </div>
                <!--gaoladd 提示-end-->
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="表单配置">
            <div class="table-design-container" style="height: 400px">
              <el-scrollbar style="height: 100%" :native="false">
                <div style="font-size: 18px; text-align: center; padding: 10px 0">表单名：{{tableConfigObj.TableName}}</div>
                <div class="content">
                  <div>已配置默认表单控件：</div>
                  <div style="padding: 10px">
                    <p v-for="field in tableConfigObj.Fields"
                       :key="field.FieldCode"
                       v-if="tableConfigObj.Fields && tableConfigObj.Fields.length"
                    >
                      {{field.FieldName}}：
                      <span style="color: #cccccc">{{ctrlType(field.ControlType)}}</span>
                    </p>
                  </div>
                  <div>已配置分组表单控件：</div>
                  <div
                    style="padding: 10px"
                    v-for="team in tableConfigObj.Teams"
                    :key="team.TeamCode"
                    v-if="tableConfigObj.Teams &&　tableConfigObj.Teams.length"
                  >
                    <div>
                      <div class="title">分组：{{team.TeamName}}</div>
                      <p style="padding: 2px 20px"
                        v-for="field in team.Fields" :key="field.FieldCode" v-if="team.Fields && team.Fields.length">
                        {{field.FieldName}}：<span style="color: #cccccc">{{ctrlType(field.ControlType)}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <save-footer
        :isCancel="false"
        saveText="关闭"
        @save="handleClose">
      </save-footer>
    </el-dialog>
  </transition>
</template>

<script type="text/ecmascript-6">
  import TableBaseInfo from './table-base-info'
  import TableConfig from './table-config'
  import { flowBaseFn } from '@/utils/mixin'
  import { REQ_OK } from '@/api/config'
  import {
    getComTableConfig,
    getBusinessTypeList,
    getComTeamsAndFields,
    getBusinessAreaList
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  export default {
    mixins: [flowBaseFn],
    data () {
      return {
        baseInfoObj: {
          State: 0, // 状态
          BusinessTypeCode: '', // 业务类型code
          TableName: '', // 审批名称
          Description: '', // 审批描述
          TableNature: ''  // 表单属性
        },
        tableCode: '', // 表单code
        comState: false,
        businessTypeList: [],
        businessAreaList: [],
        loading: true,
        tableConfigObj: {},
        controlType: [
          {
            Name: '单行输入框',
            ControlType: '1'
          },
          {
            Name: '多行输入框',
            ControlType: '2'
          },
          {
            Name: '数字输入框',
            ControlType: '3'
          },
          {
            Name: '金额',
            ControlType: '4'
          },
          {
            Name: '单选下拉框',
            ControlType: '5'
          },
          {
            Name: '多选下拉框',
            ControlType: '6'
          },
          {
            Name: '时间（年月日）',
            ControlType: '7'
          },
          {
            Name: '时间区间',
            ControlType: '8'
          },
          {
            Name: '时分',
            ControlType: '9'
          },
          {
            Name: '月份选择',
            ControlType: '10'
          },
          {
            Name: '是否',
            ControlType: '11'
          },
          {
            Name: '单选框',
            ControlType: '12'
          },
          {
            Name: '复选框',
            ControlType: '13'
          },
          {
            Name: '图片',
            ControlType: '14'
          },
          {
            Name: '附件',
            ControlType: '15'
          },
          {
            Name: '计算公式',
            ControlType: '16'
          },
          {
            Name: '表单',
            ControlType: '17'
          },
          {
            Name: '列表',
            ControlType: '18'
          },
          {
            Name: '公司内联系人',
            ControlType: '19'
          },
          {
            Name: '公司组织',
            ControlType: '20'
          },
          {
            Name: '地点',
            ControlType: '22'
          },
          {
            Name: '编辑器',
            ControlType: '23'
          },
          {
            Name: '说明',
            ControlType: '24'
          },
          {
            Name: '关联审批流',
            ControlType: '25'
          }
        ]
      }
    },
    computed: {
    },
    created () {
      this.$nextTick(() => {
        try {
          debugger
          this.tableCode = this.$route.query.tableCode
          this._getBusinessTypeList()
          this._getComTableConfig()
          this._getComTeamsAndFields()
          this._getBusinessAreaList()
        } catch (error) {
          this.loading = false
          this.$message.error('数据获取失败，请刷新重试')
        }
      })
    },
    methods: {
      // 业务类型字典表
      _getBusinessTypeList () {
        getBusinessTypeList().then(res => {
          if (res.data.State === REQ_OK) {
            this.businessTypeList = res.data.Data
          } else {
            this.$message('业务类型获取失败，请刷新重试')
          }
        }).catch(() => {
          this.$message('业务类型获取失败，请刷新重试')
        })
      },
      // 业务领域
      _getBusinessAreaList () {
        getBusinessAreaList().then(res => {
          if (res.data.State === REQ_OK) {
            this.businessAreaList = res.data.Data
          } else {
            this.$message('业务领域获取失败，请刷新重试')
          }
        }).catch(() => {
          this.$message('业务领域获取失败，请刷新重试')
        })
      },
      // 获取基本信息
      _getComTableConfig () {
        getComTableConfig(this.$route.query.tableCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.baseInfoObj = res.data.Data
            this.comState = res.data.Data.State === 1
          } else {
            this.$message({
              type: 'error',
              message: '基本信息获取失败，请刷新重试'
            })
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '基本信息获取失败，请刷新重试'
          })
        })
      },
      // 获取表单配置
      _getComTeamsAndFields () {
        getComTeamsAndFields(this.$route.query.tableCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableConfigObj = res.data.Data
          } else {
            this.$message.error('表单配置获取失败，请刷新重试')
          }
        }).catch(() => {
          this.$message.error('表单配置获取失败，请刷新重试')
        })
      },
      // 控件类型
      ctrlType (type) {
        let res = this.controlType.filter(i => {
          return i.ControlType === type
        })
        if (res && res.length) {
          return res[0].Name
        }
        return '暂无控件'
      },
      // 关闭
      handleClose () {
        this.$router.back()
      }
    },
    components: {
      TableBaseInfo,
      TableConfig,
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table-edit-container
    // width 1000px
    .el-tab-pane 
      padding 20px
      margin auto
      .content-container
        .item-field
          display flex
          align-items center
          margin-bottom 10px
          .tablcodeNameTit,.name,.BusinessAreaCode,.BusinessTypeCode,.IsPublic,.TableNature,.SysTableName,.Description
            margin-right 10px
          .tablcode
             margin-left 15px
          .point-tit
            color red
            font-size 12px
</style>
