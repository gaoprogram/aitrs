<!--
  User: xxxxxxx
  Date: 2017/11/16
  功能：表格
-->

<template>
  <div class="table-content">
    <el-table :data="list" border style="width: 100%;" @row-dblclick="handlerowDblclick">

      <el-table-column
        align="center"
        fixed="left"
        prop="EmployeeNumber"
        label="员工号"
      >
      </el-table-column>

      <el-table-column
        align="center"
        :prop="item.DataIndex"
        :label="item.ColName"
        v-for="(item, index) in typeList"
        :key="item.DataIndex"
        v-if="index !== 0 && index !== 1"
      >
      </el-table-column>

      <el-table-column align="center" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="detailArchive(scope.row)"
          >查看
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
  </div>
</template>

<script type="text/ecmascript-6">
  import { getEmpTermList } from '@/api/salary'
  import { REQ_OK, COMPANY_ADMIN } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
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
        status: 0
      }
    },
    created () {
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
      _getEmpTermList () {
        getEmpTermList({...this.obj, ...this.listQuery}).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = JSON.parse(res.data.Data.Data)
            this.total = res.data.DataCount
            this.typeList = res.data.Data.ColModel
          }
        }).catch(() => {
          Message.error('请求失败，请重试！')
        })
      },
      detailArchive (item) {
        this.$router.push({
          path: '/salary/salaryProject/salaryArchiveInfo',
          query: {
            'salaryArchive': this.obj.SchemeCode,
            'empId': item.EmployeeId,
            'name': item.EmployeeName,
            'empNum': item.EmployeeNumber
          }
        })
      },
      handlerowDblclick (row, event) {
        this.$router.push({
          path: '/salary/salaryProject/salaryArchiveInfo',
          query: {
            'salaryArchive': this.obj.SchemeCode,
            'empId': row.EmployeeId,
            'name': row.EmployeeName,
            'empNum': row.EmployeeNumber
          }
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
</style>
