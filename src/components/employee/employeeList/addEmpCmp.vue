<!--
  User: xxxxxxx
  Date: 2018/10/15
  功能：新增员工
-->

<template>
  <div class="add_emp_cmp-container">
    <el-dialog
      title="新增员工"
      :visible="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="1000px"
    >
      <el-card class="box-card">
        <template v-for="(team, index) in teamArray">
          <div class="team_type_item">
            <div class="team_type_title">
              {{team.TeamName}}
              <span v-if="team.noTab" class="add_field" @click="handleAddField(index, team.TeamCode)">
                <i class="el-icon-circle-plus-outline"></i>
              </span>
            </div>
            <div class="team_type_tab" v-if="team.Child.length > 0 && !team.noTab" style="margin-bottom: 5px">
              <div>
                <a @click="handleClickTag(index, child)"
                   v-for="child in team.Child"
                   :key="child.TeamCode"
                   style="display: inline-block;margin-right: 5px;margin-bottom: 5px"
                >
                  <el-tag :type="isActive(child.TeamCode) ? '' : 'info'">
                    {{child.TeamName}}
                  </el-tag>
                </a>
                <span v-if="index === currentTeamIndex" class="add_field" @click="handleAddField()">
                  <i class="el-icon-circle-plus-outline"></i>
                </span>
              </div>
              <div class="control-container"
                   v-for="child in team.Child"
                   v-show="child.TeamCode === currentTeamChildCode"
              >
                <template v-for="(fields, sid) in child.Child">
                  <div style="border-bottom: 1px solid #cccccc; padding: 10px 0;">
                    <template v-for="field in fields">
                      <component
                        :is="currentTabComponent(field)"
                        :showTitle="true"
                        :title="field.FieldName"
                        :obj="field"
                        :sid="sid"
                        @commonValue="commonValue"
                      ></component>
                    </template>
                  </div>
                </template>
              </div>
            </div>
            <div class="control-container"
                 v-for="(childs, sid) in team.Child" v-if="childs.length"
                 v-show="team.noTab"
            >
              <div style="border-bottom: 1px solid #cccccc; padding: 10px 0;">
                <template v-for="field in childs">
                  <component
                    :is="currentTabComponent(field)"
                    :showTitle="true"
                    :title="field.FieldName"
                    :obj="field"
                    :sid="sid"
                    @commonValue="commonValue"
                  ></component>
                </template>
              </div>
            </div>
          </div>
        </template>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取消</el-button>
        <el-button @click="handleSave()" type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getTeam, getTeamField, saveEmpField } from '@/api/employee'
  // import CommonInput from '@/base/Common-input/Common-input'
  // import CommonSelect from '@/base/Common-select/Common-select'
  import { paControlTypeMixin } from '@/utils/mixin'

  export default {
    mixins: [paControlTypeMixin],
    data () {
      return {
        teamArray: [],
        currentTeamFieldArray: [],
        currentTeamIndex: '',
        currentTeamChildCode: '',
        currentChild: [],
        saveObj: []
      }
    },
    created () {
      this._getTeam()
    },
    methods: {
      // 获取所属数据组列表
      _getTeam () {
        getTeam().then(res => {
          if (res.data.State === REQ_OK) {
            this.teamArray = res.data.Data
            this.teamArray.forEach(item => {
              if (!item.Child.length) {
                this.$set(item, 'noTab', true)
              } else {
                this.$set(item, 'noTab', false)
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '获取数据失败，请重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取数据失败，请重试！'
          })
        })
      },
      // 根据teamCode获取所属字段列表
      _getTeamField (teamCode) {
        getTeamField(teamCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.teamArray.forEach(item => {
              if (item.Child.length) {
                item.Child.forEach(i => {
                  if (i.TeamCode === teamCode) {
                    // this.$set(i, 'Field', [[...res.data.Data]])
                    i.Child.push(res.data.Data)
                  }
                })
              } else if (!item.Child.length && teamCode === item.TeamCode) {
                item.Child.push(res.data.Data)
                this.currentChild = res.data.Data
              }
            })
            console.log(this.teamArray)
          } else {
            this.$message({
              type: 'error',
              message: '获取数据失败，请重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取数据失败，请重试！'
          })
        })
      },
      // API保存
      _saveEmpField (arr) {
        saveEmpField(0, JSON.stringify(arr)).then(res => {
        })
      },
      // 当前选中child新增一组Field
      handleAddField (index, code) {
        console.log(code)
        if (index && code) {
          this.teamArray.forEach(team => {
            if (!team.Child.length && team.TeamCode === code) {
              this._getTeamField(code)
            } else if (team.Child.length && team.TeamCode === code) {
              team.Child.push(team.Child[0])
            }
          })
          this.currentTeamIndex = index
          this.currentTeamChildCode = code
        } else {
          this.teamArray.forEach(team => {
            if (team.Child.length) {
              team.Child.forEach(i => {
                if (i.TeamCode === this.currentTeamChildCode) {
                  i.Child.push(this.currentChild.Child[0])
                }
              })
            }
          })
        }
      },
      // 判断是否选中teamChild
      isActive (code) {
        return code === this.currentTeamChildCode
      },
      // 点击切换字段tab
      handleClickTag (index, child) {
        if (!child.Child.length) {
          this._getTeamField(child.TeamCode)
        }
        this.currentTeamIndex = index
        this.currentTeamChildCode = child.TeamCode
        this.currentChild = child
      },
      // 动态组件
      // currentTabComponent (teamField) {
      //   if (teamField.ControlType) {
      //     switch (teamField.ControlType) {
      //       case '1':
      //         return CommonInput
      //       case '4':
      //         return CommonSelect
      //       default:
      //         return CommonInput
      //     }
      //   }
      // },
      // common组件传递过来的值
      commonValue (value) {
        // 为了让forEach跳出循环
        try {
          this.teamArray.forEach(team => {
            team.Child.forEach(child => {
              if (child.Child[value.Sid]) {
                child.Child[value.Sid].forEach(field => {
                  if (field.FieldCode === value.FieldCode) {
                    field['EndValue'] = value.EndValue
                    throw new Error('跳出循环')
                  }
                })
              }
            })
          })
        } catch (e) {
        }
        console.log(this, value, this.teamArray)
      },
      // 取消
      handleCancel () {
        this.$emit('handleCancelAddEmp')
      },
      // 保存
      handleSave () {
        let teamArr = []
        let teamObj = {}
        let fieldObj = {}
        this.teamArray.forEach(team => {
          team.Child.forEach(child => {
            child.Child.forEach((fields, index) => {
              let fieldArr = []
              fields.forEach((field) => {
                fieldObj = {
                  FieldCode: field.TeamCode,
                  FieldValue: field.EndValue ? field.EndValue : ''
                }
                fieldArr.push(fieldObj)
              })
              teamObj = {
                SID: index,
                TeamCode: child.TeamCode,
                Fields: fieldArr
              }
              teamArr.push(teamObj)
            })
          })
        })
        this._saveEmpField(teamArr)
      }
    },
    components: {
      // CommonInput,
      // CommonSelect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .add_emp_cmp-container
    .box-card
      .team_type_item
        font-size: 24px;
        margin-bottom: 10px
        .team_type_title
          margin-bottom 5px
          .add_field
            display inline-block
            vertical-align top
            font-size 16px;
            &:hover
              cursor pointer
        .team_type_tab
          .add_field
            display inline-block
            font-size 16px;
            &:hover
              cursor pointer
</style>
