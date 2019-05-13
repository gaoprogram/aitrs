<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：定薪调薪
-->

<template>
  <div class="salary-update mg-30">
    <div class="btn-tab">
      <el-button @click="setCheckedNode()" style="margin-bottom: 10px;">
        选择组织
      </el-button>

      <el-select style="width: 120px"
                 class="filter-item"
                 v-model="queryObj.SchemeCode"
                 placeholder="薪资方案"
      >
        <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
        </el-option>
      </el-select>

      <el-select class="filter-item empType" multiple v-model="queryObj.EmpType" style="width: 120px" placeholder="员工类型">
        <el-option v-for="item in EmpType" :key="item.Id" :label="item.Name" :value="item.Id">
        </el-option>
      </el-select>

      <el-date-picker
        v-model="queryObj.OnDate"
        type="date"
        placeholder="薪资日期">
      </el-date-picker>

      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px"
                class="filter-item"
                v-model="queryObj.KeyWord"
                placeholder="姓名 / 员工号">
      </el-input>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="margin-bottom: 10px;">搜索</el-button>

      <el-button @click="handleDownload()" class="right-btn" type="primary">
        导出
      </el-button>
    </div>

    <el-table :data="list"
              border
              highlight-current-row
    >

      <el-table-column label="员工号" align="center" prop="EmployeeId">
      </el-table-column>

      <el-table-column label="姓名" align="center" prop="EmployeeName">
      </el-table-column>

      <el-table-column label="薪资规则" align="center" prop="SchemeName">
      </el-table-column>

      <el-table-column label="所属组织" align="center" prop="OrgName">
      </el-table-column>

      <el-table-column label="生效日期" align="center" prop="BeginDate">
        <template slot-scope="scope">
          <span>{{ scope.row.BeginDate | replaceTimeNoH }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" align="center" prop="Remark">
      </el-table-column>

      <el-table-column label="薪资项目" align="center" prop="TermName">
      </el-table-column>

      <el-table-column label="调整后预设标准" align="center" prop="NewDefaultSettingLabel">
      </el-table-column>

      <el-table-column label="调整后金额" align="center" prop="NewTermValue">
      </el-table-column>

      <el-table-column label="调整前预设标准" align="center" prop="OldDefaultSettingLabel">
      </el-table-column>

      <el-table-column label="调整前金额" align="center" prop="OldTermValue">
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryObj.PageIndex"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="queryObj.PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      width="30%"
      title="选择组织"
      :visible="tidVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :show-close="false"
      append-to-body
    >
      <el-tree
        :data="tidList"
        show-checkbox
        node-key="value"
        ref="tree"
        expand-on-click-node
        highlight-current
        :props="defaultProps"
      >
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="tidVisible = false">取消</el-button>
        <el-button type="primary" @click="getCheckedNodes()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getSalaryList,
    getEmpType,
    getEmpTermChangeLogList
  } from '@/api/salary'
  import { getOrgList } from '@/api/permission'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        list: [],
        queryObj: {
          Org: [],
          SchemeCode: '',
          KeyWord: '',
          EmpType: 1,
          OnDate: null,
          PageIndex: 1,
          PageSize: 10
        },
        total: 0,
        tidVisible: false,
        tidList: [],
        archiveList: [],
        EmpType: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultCheck: []
      }
    },
    created () {
      this._getOrgList()
      this._getSalaryList()
      this._getEmpType()
      this._getEmpTermChangeLogList()
      this.$store.dispatch('setLoadingState', true)
    },
    computed: {
      ...mapGetters([
        'loading',
        'companyCode',
        'token'
      ]),
      changeLoading () {
        return this.$store.dispatch('setLoadingState', true)
      }
    },
    methods: {
      _getOrgList () {
        getOrgList().then((res) => {
          if (res.data.State === REQ_OK) {
            let arr = res.data.Data
            this.tidList = this._orginList(arr)
          } else {
            Message.error('组织列表获取失败，请重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          Message.error('组织列表获取失败，请重试！')
        })
      },
      _getSalaryList () {
        getSalaryList().then(res => {
          if (res.data.State === REQ_OK) {
            this.archiveList = res.data.Data
          } else {
            Message.error('薪资方案列表获取失败，请刷新页面重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          Message.error('薪资方案列表获取失败，请刷新页面重试！')
        })
      },
      _getEmpType () {
        getEmpType().then(res => {
          if (res.data.State === REQ_OK) {
            this.EmpType = res.data.Data
          } else {
            Message.error('员工类型列表获取失败，请刷新页面重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
        })
      },
      _getEmpTermChangeLogList () {
        getEmpTermChangeLogList(this.queryObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
            this.total = res.data.Total
          } else {
            Message.error('定薪调薪列表加载失败，请刷新页面重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        })
      },
      setCheckedNode () {
        this.tidVisible = true
        if (this.defaultCheck.length > 0) {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys([])
            this.$refs.tree.setCheckedKeys(this.defaultCheck)
          })
        }
      },
      handleFilter () {
        if (this.defaultCheck.length > 0) {
          this.queryObj.Org = JSON.stringify(this.defaultCheck)
        }
        this._getEmpTermChangeLogList()
      },
      handleSizeChange (val) {
        this.queryObj.PageSize = val
        this._getEmpTermChangeLogList()
      },
      handleCurrentChange (val) {
        this.queryObj.PageIndex = val
        this._getEmpTermChangeLogList()
      },
      changeObj () {
        if (this.defaultCheck.length > 0) {
          this.queryObj.Org = JSON.stringify(this.defaultCheck)
        }
      },
      trueLoading () {
        this.$store.dispatch('setLoadingState', true)
      },
      falseLoading () {
        this.$store.dispatch('setLoadingState', false)
      },
      handleDownload () {
      },
      _orginList (arr) {
        let result = []
        arr.forEach((item) => {
          let obj
          if (item.Child && item.Child.length > 0) {
            obj = {
              value: item.OrgCode,
              label: item.OrgName,
              children: this._orginList(item.Child)
            }
          } else {
            obj = {
              value: item.OrgCode,
              label: item.OrgName
            }
          }
          result.push(obj)
        })
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .salary-update
    .empType
      width 120px
      .el-select__tags
        no-wrap()
  @media screen and (min-width: 1200px) {
    .right-btn {
      float: right
    }
  }
  .salary-update .left-btn, .right-btn {
    margin-bottom: 10px
    margin-left 0!important
  }
</style>
