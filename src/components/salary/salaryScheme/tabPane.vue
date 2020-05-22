<!--
  User: xxxxxxx
  Date: 2017/11/16
  功能：表格
-->

<template>
  <div class="table-content">
    <el-table :data="list" border style="width: 100%;" @row-dblclick="handleRowDblclick">

      <el-table-column
        align="center"
        prop="EmpNumber"
        label="员工号"
      >
      </el-table-column>

      <el-table-column
        align="center"
        prop="EmpName"
        label="姓名"
      >
      </el-table-column>

      <el-table-column
        align="center"
        prop="OrgName"
        label="所属组织"
      >
      </el-table-column>

      <el-table-column
        align="center"
        prop="SchemeName"
        label="薪酬规则"
      >
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleState(scope.row)"
            v-html="scope.row.State === 1 ? '停用' : '启用'"
          >
          </el-button>

          <el-button
            type="text"
            size="small"
            @click="deleteArchive(scope.row)"
          >删除
          </el-button>

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

    <el-dialog title="编辑档案"
               :visible.sync="editorProjectVisible"
               v-if="editorProjectVisible"
               class="max-dialog-item"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :modal-append-to-body="false"
               :show-close="false"
               custom-class="editor-dialog"
    >

      <el-form style="width:100%;display: inline-block"
               class="small-space"
               ref="editorProjectform"
               :model="editorProjectObj"
               label-width="85px"
      >

        <el-row>
          <el-col :span="12">
            <el-form-item label="员工号：">
              {{editorProjectObj.EmpNumber}}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="姓名：">
              {{editorProjectObj.EmpName}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="薪酬规则：" prop="SchemeName">
          <el-select class="filter-item" multiple v-model="editorProjectObj.SchemeCode" placeholder="请选择">
            <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editorProjectVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditorProject()">保存</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getEmpSchemeList, changeEmpSchemeStatus, deleteEmpScheme, editEmpScheme } from '@/api/salary'
  import { REQ_OK, COMPANY_ADMIN } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      },
      archiveList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        typeList: [],
        list: [],
        total: null,
        listQuery: {
          PageIndex: 1,
          PageSize: 10
        },
        ruleForm: {},
        fileContent: [],
        titleText: '公告详情',
        dialogVisible: false,
        isModifyDialog: false,
        noticeCode: '',
        promptText: '',
        status: 0,
        editorProjectVisible: false,
        editorProjectObj: {}
      }
    },
    created () {
      this._getEmpSchemeList()
    },
    computed: {
      ...mapGetters([
        'userType',
        'userCode',
        'name',
        'loading'
      ]),
      isCompanyAdmin () {
        return this.userType === COMPANY_ADMIN
      }
    },
    methods: {
      _getEmpSchemeList () {
        getEmpSchemeList({...this.obj, ...this.listQuery}).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
            this.total = res.data.DataCount
          } else {
            Message.error('请求失败，请重试！')
          }
        }).catch(() => {
          Message.error('请求失败，请重试！')
        })
      },
      handleRowDblclick (row, event) {
        this.editorProjectObj = row
        this.editorProjectVisible = true
      },
      handleState (item) {
        changeEmpSchemeStatus(item.Id, item.State === 1 ? 0 : 1).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('更改状态成功！')
            this._getEmpSchemeList()
          } else {
            Message.error('更改状态失败，请重试！')
          }
        }).catch(() => {
          Message.error('更改状态失败，请重试！')
        })
      },
      deleteArchive (item) {
        this.$confirm('确认删除这一条数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmpScheme(item.Id).then(res => {
            if (res.data.State === REQ_OK) {
              this._getEmpSchemeList()
            } else {
              Message.error('删除失败，请重试！')
            }
          }).catch(() => {
            Message.error('删除失败，请重试！')
          })
        })
      },
      saveEditorProject () {
        editEmpScheme(this.editorProjectObj.EmpId, JSON.stringify(this.editorProjectObj.SchemeCode)).then(res => {
          if (res.data.State === REQ_OK) {
            this._getEmpSchemeList()
            this.editorProjectVisible = false
          } else {
            Message.error('保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存失败，请重试！')
        })
      },
      handleSizeChange (val) {
        this.listQuery.PageSize = val
        this._getEmpTermList()
      },
      handleCurrentChange (val) {
        this.listQuery.PageIndex = val
        this._getEmpTermList()
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      },
      trueLoading () {
        this.$store.dispatch('setLoadingState', true)
      },
      falseLoading () {
        this.$store.dispatch('setLoadingState', false)
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pagination-container
    margin-top: 20px
  .editor-dialog
    width 500px!important
    .el-select
      width 100%
</style>
