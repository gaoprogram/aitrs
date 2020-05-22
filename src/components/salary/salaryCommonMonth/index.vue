<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：普通月发薪
-->

<template>
  <div class="salary-common-month mg-30">
    <div class="noticeType">
      <div class="btn-tab">
        <el-button @click="setCheckedNode()" style="margin-bottom: 10px;">
          选择组织
        </el-button>

        <el-select @change='handleArchive'
                   style="width: 120px"
                   class="filter-item"
                   v-model="selectSalaryArchive"
                   placeholder="薪资方案"
        >
          <el-option v-for="item in salaryArchiveList" :key="item.Code" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>

        <el-select multiple class="filter-item empType"
                   v-model="listQuery.EmpType"
                   placeholder="员工类型"
        >
          <el-option v-for="item in EmpType" :key="item.Id" :label="item.Name" :value="item.Id">
          </el-option>
        </el-select>

        <el-select style="width: 160px"
                   class="filter-item"
                   v-model="listQuery.ReportCode"
                   placeholder="薪资月份批次"
        >
          <el-option v-for="item in FlowIdList" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
          </el-option>
        </el-select>

        <el-input style="width: 100px" class="filter-item" placeholder="差异大于" v-model="listQuery.title">
        </el-input>
        <span>-</span>
        <el-input style="width: 100px" class="filter-item" placeholder="差异小于" v-model="listQuery.title">
        </el-input>

        <el-input style="width: 300px" class="filter-item keyWord" placeholder="员工号/姓名" v-model="listQuery.title">
        </el-input>

        <el-button class="filter-item handleButton"
                   type="primary"
                   icon="el-icon-search"
                   @click="handleFilter"
                   style="margin-bottom: 10px;"
        >
          搜索
        </el-button>
      </div>

      <div class="btn-tab right-btn-item" style="margin-bottom: 10px;" v-if="!isDetail">
        <el-button class="left-btn" type="primary">
          月报表
        </el-button>

        <el-button class="left-btn">
          人员
        </el-button>

        <el-button @click="allComputed()" class="left-btn">
          全部计算
        </el-button>

        <el-button @click="someComputed()" class="left-btn">
          逐条计算
        </el-button>

        <el-dropdown class="left-btn">
          <el-button>
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
            <el-dropdown-item>对比</el-dropdown-item>
            <el-dropdown-item>取消对比</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>


      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane v-for="(item, index) in typeList"
                     :key="item.TypeId"
                     :label="item.name"
                     :name="item.TypeId"
        >
          <tab-pane v-if='activeName == item.TypeId'
                    :type="item.TypeId"
                    class="list"
                    ref="refreshList"
          ></tab-pane>
        </el-tab-pane>
      </el-tabs>

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

      <el-dialog :title="textMap.create" :visible.sync="dialogTypeVisible">

        <el-form class="small-space" label-position="left" label-width="70px" ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item label="名称：" prop="name" placeholder="请输入公告类型名称">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTypeVisible = false">取 消</el-button>
          <el-button type="primary" @click="">确 定</el-button>
        </div>

      </el-dialog>
    </div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSalaryList, getEmpType, getFlowIdList, runEmpReport } from '@/api/salary'
  import { getOrgList } from '@/api/permission'
  import { REQ_OK } from '@/api/config'
  import TabPane from '@/components/salary/salaryCommonMonth/tabPane'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        selectSalaryArchive: '',
        salaryArchiveList: [],
        EmpType: [],
        tidVisible: false,
        tidList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultCheck: [],
        FlowIdList: [],
        typeList: [
          {
            'name': '入职',
            'TypeId': '1'
          },
          {
            'name': '离职',
            'TypeId': '2'
          },
          {
            'name': '转正',
            'TypeId': '3'
          },
          {
            'name': '调薪',
            'TypeId': '4'
          },
          {
            'name': '调转',
            'TypeId': '5'
          }
        ],
        editableTabsValue: '1',
        activeName: '1',
        textMap: {
          createNotice: '新建公告',
          editNotice: '编辑公告',
          createType: '新建公告类型'
        },
        createTypeName: null,
        dialogTypeVisible: false,
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入公告类型名称', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
          ]
        },
        isDetail: false,
        listQuery: {
          Org: [],
          PageIndex: 1,
          PageSize: 10,
          ReportCode: '',
          EmpType: '',
          KeyWord: ''
        },
        sortOptions: [
          { label: '全部公告', key: 0 },
          { label: '已发布公告', key: 2 },
          { label: '未发布公告', key: 1 }
        ]
      }
    },
    created () {
      if (this.$route.query.detail) {
        this.isDetail = true
      }
      if (this.$route.query.dispose) {
        this.isDetail = false
      }
      if (this.$route.query.reportCode && this.$route.query.schemeCode) {
        this._getFlowIdList(this.$route.query.schemeCode)
        this.selectSalaryArchive = this.$route.query.schemeCode
        this.listQuery.ReportCode = this.$route.query.reportCode
      }
      this._getOrgList()
      this._getSalaryList()
      this._getEmpType()
      this.$store.dispatch('setLoadingState', true)
    },
    activated () {
      if (this.$route.query.detail) {
        this.isDetail = true
      }
      if (this.$route.query.dispose) {
        this.isDetail = false
      }
      if (this.$route.query.reportCode && this.$route.query.schemeCode) {
        this._getFlowIdList(this.$route.query.schemeCode)
        this.selectSalaryArchive = this.$route.query.schemeCode
        this.listQuery.ReportCode = this.$route.query.reportCode
      }
      this._getSalaryList()
      this._getEmpType()
      this.$store.dispatch('setLoadingState', true)
    },
    computed: {
      ...mapGetters([
        'loading'
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
        }).catch(() => {
          Message.error('组织列表获取失败，请重试！')
        })
      },
      _getSalaryList () {
        getSalaryList().then(res => {
          if (res.data.State === REQ_OK) {
            this.salaryArchiveList = res.data.Data
          } else {
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
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
      _getFlowIdList (code) {
        getFlowIdList(code).then(res => {
          if (res.data.State === REQ_OK) {
            this.FlowIdList = res.data.Data
          } else {
            Message.error('薪资月份批次列表获取失败，请刷新页面重试！')
          }
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
      getCheckedNodes () {
        this.tidVisible = false
        let arr = this.$refs.tree.getCheckedNodes()
        let result = []
        this.defaultCheck = []
        arr.forEach((item) => {
          let name = item.label
          let val = item.value
          result.push(name)
          this.defaultCheck.push(val)
        })
      },
      handleArchive () {
        this._getFlowIdList(this.selectSalaryArchive)
      },
      handleFilter () {
        if (!this.selectSalaryArchive) {
          Message.error('请选择薪资方案！')
          return
        }
        if (!this.listQuery.ReportCode) {
          Message.error('请选择薪资月份批次！')
          return
        }
        if (this.defaultCheck.length > 0) {
          this.listQuery.Org = JSON.stringify(this.defaultCheck)
        }
        this.$refs.refreshList[0]._getEmpWageReportList(this.listQuery, this.selectSalaryArchive)
      },
      allComputed () {
        runEmpReport(this.listQuery.ReportCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.$refs.refreshList[0]._getEmpWageReportList()
          } else {
            Message.error('全部计算失败，请重试！')
          }
        }).catch(() => {
          Message.error('全部计算失败，请重试！')
        })
      },
      someComputed () {
        this.$refs.refreshList[0].someComputed()
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
      },
      trueLoading () {
        this.$store.dispatch('setLoadingState', true)
      },
      falseLoading () {
        this.$store.dispatch('setLoadingState', false)
      }
    },
    components: {
      TabPane
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .salary-common-month
    .left-btn
      margin-left 0!important
    .empType
      width 120px
      .el-select__tags
        no-wrap()


  @media screen and (min-width: 1920px) {
    .btn-tab {
      display: inline-block
    }
    .right-btn-item {
      float: right
    }
  }
</style>
