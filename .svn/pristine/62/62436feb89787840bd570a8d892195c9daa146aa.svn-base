<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：薪资-普通月发薪-个人信息
-->

<template>
  <div class="salaryCMPInfo">
    <el-dialog custom-class="salaryCMPInfo-dialog" :title="titleText" :visible.sync="isDialogNotice" center fullscreen :showClose="false" style="min-width: 1000px;">
      <div style="font-size: 16px;margin-bottom: 20px">
        <span style="margin-right: 20px;font-weight: bold">员工号：{{this.$route.query.empNum}}</span>
        <span style="font-weight: bold">姓名：{{this.$route.query.name}}</span>
      </div>

      <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;" @change="handleChangeRule">
        <el-radio-button v-for="item in EmpSchemeList" :key="item.SchemeCode" :label="item.SchemeCode">{{item.SchemeName}}</el-radio-button>
      </el-radio-group>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="常规项目" name="common">
          <el-button style="float: right;margin-bottom: 10px" class="right-btn" type="primary" @click.native="addRevenueProject">
            新增收入项
          </el-button>
          <tableSalaryProject
            @modify="modify"
            :activeNames="activeNames"
            :TermList="revenueTermList"
            :revenueOrDeduction="true"
          ></tableSalaryProject>
          <el-button style="float: right;margin: 10px 0" class="right-btn" type="primary" @click.native="addDeductionProject">
            新增扣减项
          </el-button>
          <tableSalaryProject
            @modify="modify"
            :activeNames="activeNames"
            :TermList="deductionTermList"
            :revenueOrDeduction="false"
          ></tableSalaryProject>
        </el-tab-pane>

        <el-tab-pane label="一次性项目" name="once">
          <el-button style="float: right;margin-bottom: 10px" class="right-btn" type="primary" @click.native="addOnceRevenueProject">
            新增收入项
          </el-button>
          <tableOnceSalaryProject
            @modify="modifyOnce"
            :activeNames="activeNames"
            :TermList="revenueTermList"
            :revenueOrDeduction="true"
          ></tableOnceSalaryProject>
          <el-button style="float: right;margin: 10px 0" class="right-btn" type="primary" @click.native="addOnceDeductionProject">
            新增扣减项
          </el-button>
          <tableOnceSalaryProject
            @modify="modifyOnce"
            :activeNames="activeNames"
            :TermList="deductionTermList"
            :revenueOrDeduction="false"
          ></tableOnceSalaryProject>
        </el-tab-pane>

        <el-tab-pane label="个税资料" name="second">
          <el-button style="float: right;margin-bottom: 10px" class="right-btn" type="primary" @click.native="addTaxCity">
            新增个税城市
          </el-button>
          <personTax :taxList="taxList" @deleteCity="deleteCity" @modifyTaxCity="modifyTaxCity"></personTax>
        </el-tab-pane>

        <el-tab-pane label="发薪查询" name="third">
          <el-select @change='handleFilter'
                     style="width: 120px"
                     class="filter-item"
                     v-model="selectYear"
                     placeholder="选择年份"
          >
            <el-option v-for="item in years" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-button style="float: right;" class="right-btn" type="primary">
            导出
          </el-button>
          <tableSalaryQuery :list="queryList"></tableSalaryQuery>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
    <modifyProject v-if="modifyVisi"
                   :obj="item"
                   :isRevenue="isRevenue"
                   ref="modifyProject"
                   @cancel="modifyVisi = false"
                   @modifySuccess="modifySuccess"
    ></modifyProject>
    <modifyOnceProject v-if="modifyOnceVisi"
                       :obj="item"
                       :isRevenue="isRevenue"
                       ref="modifyProject"
                       @cancel="modifyOnceVisi = false"
                       @modifySuccess="modifySuccess"
    ></modifyOnceProject>

    <addTaxCity :citys="citys"
                :empId="empId"
                :modifyTaxCityObj="modifyTaxCityObj"
                @saveTaxCity="saveTaxCity"
                @cancelTaxCity="cancelTaxCity"
                v-if="taxCityVisible"
    ></addTaxCity>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getEmpTermListByEmpId,
    getSingleEmpReport,
    getEmpTaxCityList,
    deleteEmpTaxCity,
    addTaxCity,
    getCityList,
    UpdateTaxCity,
    getEmpSchemeList
  } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import TableSalaryProject from '@/components/salary/common/tableSalaryProject'
  import TableOnceSalaryProject from '@/components/salary/common/tableOnceSalaryProject'
  import ModifyProject from '@/components/salary/common/modifyProject'
  import ModifyOnceProject from '@/components/salary/common/modifyOnceProject'
  import TableSalaryQuery from '@/components/salary/common/tableSalaryQuery'
  import PersonTax from '@/components/salary/common/personTax'
  import AddTaxCity from '@/components/salary/common/addTaxCity'
  import { Message } from 'element-ui'
  export default {
    props: {
    },
    data () {
      return {
        ruleForm: {},
        titleText: '个人信息',
        typeNameList: [],
        isDialogNotice: true,
        activeName: 'common',
        queryList: [],
        selectYear: parseInt(new Date().getFullYear()),
        modifyVisi: false,
        modifyOnceVisi: false,
        item: {},
        type: 1,
        activeNames: [],
        TermList: [],
        revenueTermList: [],
        deductionTermList: [],
        taxList: [],
        taxCityVisible: false,
        citys: [],
        EmpIds: [],
        empId: '',
        modifyTaxCityObj: {},
        EmpSchemeList: [],
        tabPosition: '',
        currentSchemeCode: '',
        isRevenue: false,
        revenueOrDeduction: false
      }
    },
    created () {
      this._getEmpSchemeList()
    },
    computed: {
      years () {
        let years = []
        let myDate = new Date()
        let year = parseInt(myDate.getFullYear())
        years.push(year)
        for (let i = 0; i < 4; i++) {
          year--
          years.push(year)
        }
        return years
      }
    },
    methods: {
      _getEmpTermListByEmpId (empId, salaryArchive, type) {
        getEmpTermListByEmpId(empId, salaryArchive, type).then(res => {
          if (res.data.State === REQ_OK) {
            let result = res.data.Data
            this.revenueTermList = result['G']
            this.deductionTermList = result['D']
          } else {
            Message.error('薪资项目列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('薪资项目列表获取失败，请重试！')
        })
      },
      _getSingleEmpReport () {
        getSingleEmpReport(this.$route.query.empId, this.selectYear, this.tabPosition).then(res => {
          if (res.data.State === REQ_OK) {
            this.queryList = res.data.Data
          } else {
            Message.error('发薪查询列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('发薪查询列表获取失败，请重试！')
        })
      },
      _getEmpTaxCityList () {
        getEmpTaxCityList(this.$route.query.empId).then(res => {
          if (res.data.State === REQ_OK) {
            this.taxList = res.data.Data
          } else {
            Message.error('个税资料列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('个税资料列表获取失败，请重试！')
        })
      },
      _getEmpSchemeList () {
        getEmpSchemeList({EmpId: this.$route.query.empId}).then(res => {
          if (res.data.State === REQ_OK) {
            this.EmpSchemeList = res.data.Data
            this.tabPosition = this.$route.query.salaryArchive
            this._getEmpTermListByEmpId(this.$route.query.empId, this.tabPosition, this.type)
          } else {
            Message.error('薪资规则列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('薪资规则列表获取失败，请重试！')
        })
      },
      handleChangeRule () {
        this.activeName = 'common'
        this._getEmpTermListByEmpId(this.$route.query.empId, this.tabPosition, 1)
      },
      handleClick (tab, event) {
        this.activeNames = []
        this.TermList = []
        switch (tab.name) {
          case 'common':
            this.type = 1
            this._getEmpTermListByEmpId(this.$route.query.empId, this.tabPosition, this.type)
            break
          case 'once':
            this.type = 0
            this._getEmpTermListByEmpId(this.$route.query.empId, this.tabPosition, this.type)
            break
          case 'second':
            this._getEmpTaxCityList()
            break
          case 'third':
            this._getSingleEmpReport()
            break
        }
      },
      handleFilter () {
        this._getSingleEmpReport()
      },
      addRevenueProject () {
        this.item = {}
        this.isRevenue = true
        this.modifyVisi = true
      },
      addDeductionProject () {
        this.item = {}
        this.isRevenue = false
        this.modifyVisi = true
      },
      addOnceRevenueProject () {
        this.item = {}
        this.isRevenue = true
        this.modifyOnceVisi = true
      },
      addOnceDeductionProject () {
        this.item = {}
        this.isRevenue = false
        this.modifyOnceVisi = true
      },
      modify (item) {
        if (item.revenueOrDeduction) {
          this.isRevenue = true
        } else {
          this.isRevenue = false
        }
        this.modifyVisi = true
        this.item = item
      },
      modifyOnce (item) {
        if (item.revenueOrDeduction) {
          this.isRevenue = true
        } else {
          this.isRevenue = false
        }
        this.modifyOnceVisi = true
        this.item = item
      },
      modifySuccess () {
        this.modifyVisi = false
        this.modifyOnceVisi = false
        this._getEmpTermListByEmpId(this.$route.query.empId, this.tabPosition, this.type)
      },
      addTaxCity () {
        getCityList().then(res => {
          if (res.data.State === REQ_OK) {
            this.citys = this.filterCitys(res.data.Data)
            this.empId = this.$route.query.empId
            this.taxCityVisible = true
          } else {
            Message.error('城市列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('城市列表获取失败，请重试！')
        })
      },
      saveTaxCity (obj) {
        if (obj.Id) {
          UpdateTaxCity(obj).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('更新成功！')
              this._getEmpTaxCityList()
              this.taxCityVisible = false
            } else {
              Message.error('更新失败，请重试！')
            }
          }).catch(() => {
            Message.error('更新失败，请重试！')
          })
        } else {
          addTaxCity(obj).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('保存成功！')
              this._getEmpTaxCityList()
              this.taxCityVisible = false
            } else {
              Message.error('保存失败，请重试！')
            }
          }).catch(() => {
            Message.error('保存失败，请重试！')
          })
        }
      },
      cancelTaxCity () {
        this.taxCityVisible = false
      },
      modifyTaxCity (item) {
        getCityList().then(res => {
          if (res.data.State === REQ_OK) {
            this.citys = this.filterCitys(res.data.Data)
            this.empId = parseInt(this.$route.query.empId)
            this.modifyTaxCityObj = item
            this.taxCityVisible = true
          } else {
            Message.error('城市列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('城市列表获取失败，请重试！')
        })
      },
      deleteCity (item) {
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmpTaxCity(item.CityId, this.$route.query.empId).then(res => {
            if (res.data.State === REQ_OK) {
              this._getEmpTaxCityList()
              Message.success('删除成功！')
            } else {
              Message.error('删除失败，请重试！')
            }
          }).catch(() => {
            Message.error('删除失败，请重试！')
          })
        })
      },
      filterCitys (arr) {
        let newArr = arr.map(item => {
          let obj
          if (item.Child.length > 0) {
            obj = {
              'Id': item.Id,
              'Name': item.Name,
              'Child': this.filterCitys(item.Child)
            }
          } else {
            obj = {
              'Id': item.Id,
              'Name': item.Name
            }
          }
          return obj
        })
        return newArr
      },
      foreachFn (arr, childArr) {
        let result = []
        arr.forEach((item) => {
          let obj = {
            Name: item.Name,
            UniCode: item.UniCode,
            children: this.foreachChildFn(item.UniCode, childArr)
          }
          result.push(obj)
        })
        return result
      },
      foreachChildFn (code, arr) {
        return arr.filter(i => {
          return code === i.ProjectCode
        })
      },
      cancel () {
        this.$router.back()
      },
      _recursionFn (arr) {
        let result = []
        arr.forEach((item) => {
          let obj = {
            value: item.EmployeeId,
            label: item.EmployeeName
          }
          result.push(obj)
        })
        return result
      }
    },
    components: {
      TableSalaryQuery,
      TableSalaryProject,
      TableOnceSalaryProject,
      ModifyProject,
      ModifyOnceProject,
      PersonTax,
      AddTaxCity
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salaryCMPInfo
    .salaryCMPInfo-dialog
      .el-dialog__header
        width: 960px
        margin 0 auto
      .el-dialog__body
        width: 960px
        margin: 0 auto
        box-shadow()
        margin-bottom: 50px
</style>
