<!--
  User: xxxxxxx
  Date: 2017/12/29
  功能：薪资方案首页
-->

<template>
  <div class="salary-project mg-30">
    <div class="clear-float" style="margin-bottom: 10px;">

      <el-button @click="copyProject()" class="add-btn" :disabled="!radio">
        复制方案
      </el-button>

      <el-button @click="addProject()" class="add-btn" type="primary">
        新增方案
      </el-button>

    </div>

    <el-table :data="list"
              ref="multipleTable"
              border
              highlight-current-row
              @current-change="currentRowChange"
              style="width: 100%;"
              @row-click="rowClick"
    >
      <el-table-column
        align="center"
        label="方案名称"
        fixed
      >
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.row.Code">{{ scope.row.Name }}</el-radio>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="NoticeRange" label="计薪开始日">
        <template slot-scope="scope">
          <span v-html="scope.row.BeginMonthLabel + scope.row.BeginDate + '日'"></span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="NoticeRange" label="计薪截止日">
        <template slot-scope="scope">
          <span v-html="scope.row.EndMonthLabel + scope.row.EndDate + '日'"></span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="NoticeRange" label="发薪日期">
        <template slot-scope="scope">
          <span>{{ scope.row.PayDate | payDateContent }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">

          <el-button
            type="text"
            size="small"
            @click="editorProject(scope.row)"
          >编辑
          </el-button>

          <el-button
            type="text"
            size="small"
            v-html="scope.row.Status !== 1 ? '启用' : '停用'"
            @click="startOrStop(scope.row.Code, scope.row.Status)"
          ></el-button>

        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.PageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="copyDialogVisible"
      width="50%"
      style="min-width: 800px"
      center>
      <el-form :model="copyValidateForm" ref="copyValidateForm" label-width="100px" class="demo-ruleForm" :rules="rules">
        <el-form-item
          label="新的名称"
          prop="name"
        >
          <el-input type="text" v-model="copyValidateForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="copyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </div>
    </el-dialog>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSalaryList, changeSchemeStatus, checkUniqueName, copyOne } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  export default {
    data () {
      let checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空！'))
        }
        checkUniqueName(value).then((res) => {
          if (res.data.State === REQ_OK) {
            if (!res.data.Data) {
              callback(new Error('名称已存在！'))
            } else {
              callback()
            }
          } else {
            callback(new Error('名称校验失败，请重试！'))
          }
        }).catch(() => {
          callback(new Error('请求超时，请重试！'))
        })
      }
      return {
        list: [],
        listQuery: {
          PageIndex: 1,
          PageSize: 10,
          title: '',
          sort: 0
        },
        total: 0,
        currentRow: null,
        radio: null,
        copyDialogVisible: false,
        copyValidateForm: {
          name: ''
        },
        rules: {
          name: [
            {validator: checkName, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
    },
    created () {
      this._getSalaryProject()
    },
    activated () {
      this._getSalaryProject()
    },
    methods: {
      addProject () {
        this.$router.push({path: '/salary/salaryRule/addProject'})
      },
      copyProject () {
        this.copyDialogVisible = true
      },
      _getSalaryProject () {
        this.$store.dispatch('setLoadingState', true)
        getSalaryList(this.listQuery.limit, this.listQuery.page).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
            this.total = res.data.Total
          } else {
            Message.error('薪资方案列表获取失败，请重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
          Message.error('薪资方案列表获取失败，请重试！')
        })
      },
      currentRowChange (val) {
        this.currentRow = val
      },
      editorProject (item) {
        this.$router.push({path: '/salary/salaryRule/editorProject', query: { code: item.Code }})
      },
      startOrStop (code, status) {
        changeSchemeStatus(code, (status === 1 ? 0 : 1)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('更改状态成功！')
            this._getSalaryProject()
          } else {
            Message.error('更改状态失败，请重试！')
          }
        }).catch(() => {
          Message.error('更改状态失败，请重试！')
        })
      },
      submitForm () {
        this.$refs.copyValidateForm.validate((valid) => {
          if (valid) {
            copyOne(this.radio, this.copyValidateForm.name).then(res => {
              if (res.data.State === REQ_OK) {
                this._getSalaryProject()
                Message.success('复制方案成功！')
                this.copyDialogVisible = false
              } else {
                Message.error('复制方案失败，请重试！')
              }
            }).catch(() => {
              Message.error('复制方案失败，请重试！')
            })
          }
        })
      },
      rowClick (row) {
        this.radio = row.Code
      },
      handleFilter () {
        this.listQuery.PageIndex = 1
        this._getSalaryProject()
      },
      handleSizeChange (val) {
        this.listQuery.PageSize = val
        this._getSalaryProject()
      },
      handleCurrentChange (val) {
        this.listQuery.PageIndex = val
        this._getSalaryProject()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-project
    .add-btn
      float right
      margin-left 10px
    .clear-float:after
      clear-float()
</style>
