<template>
  <div class="salary-archive mg-30">
    <div>
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

        <div class="btn-tab right-btn-item" style="margin-bottom: 10px;">
          <el-button @click="addSalaryType()" class="left-btn" type="primary">
            新增薪资项
          </el-button>

          <el-button @click="addTaxCity()" class="left-btn">
            新增个税地
          </el-button>

          <el-button class="left-btn">
            确定预案
          </el-button>

          <el-dropdown class="left-btn" @command="handleCommand">
            <el-button>
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="baseImport">基本工资导入</el-dropdown-item>
              <el-dropdown-item command="commonImport">常规项导入</el-dropdown-item>
              <el-dropdown-item command="targetImport">目标奖金导入</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>



      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane v-for="(item, index) in typeList"
                     :key="item.Code"
                     :label="item.TypeName"
                     :name="item.Code"
        >
          <tab-pane v-if='activeName == item.Code'
                    :obj="queryObj"
                    class="list"
                    ref="tabPane"
          ></tab-pane>
        </el-tab-pane>
      </el-tabs>

      <el-dialog :title="textMap.commonImport"
                 :visible.sync="commonVisible"
                 class="dialog-item"
                 :modal-append-to-body="false"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
      >

        <el-button class="download-template" size="small" type="primary" @click="commonModelDownload">点击下载模板</el-button>

        <upload-file ref="uploadTemplate" @uploadEmpTerm="_uploadEmpTerm"></upload-file>

        <div slot="footer" class="dialog-footer">
          <el-button @click="commonVisible = false">关闭</el-button>
        </div>

      </el-dialog>

      <addTaxCity :citys="citys"
                  :EmpIds="EmpIds"
                  @saveTaxCity="saveTaxCity"
                  @cancelTaxCity="cancelTaxCity"
                  v-if="taxCityVisible"
      ></addTaxCity>

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

    <el-dialog title="新增薪资项"
               :visible.sync="salaryTypeVisible"
               v-if="salaryTypeVisible"
               class="max-dialog-item"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :modal-append-to-body="false"
               :show-close="false"
    >

      <el-tree
        style="width: 220px;display: inline-block;vertical-align: top"
        :data="EmpIds"
        show-checkbox
        node-key="id"
        ref="tree"
        expand-on-click-node
        highlight-current
        class="change-person"
      >
      </el-tree>

      <el-form style="width: 630px;display: inline-block"
               class="small-space"
               ref="newSalaryTypeform"
               :model="newSalaryTypeObj"
               label-width="85px"
               :rules="newSalaryTypeObjRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="生效日期" class="postInfo-container-item" prop="BeginDate">
              <el-date-picker
                v-model="newSalaryTypeObj.BeginDate"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择日期时间"
                style="width: 217px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效日期" class="postInfo-container-item" prop="BeginDate">
              <el-date-picker
                v-model="newSalaryTypeObj.EndDate"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择日期时间"
                style="width: 217px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="TermCode">
              <el-select class="filter-item" v-model="newSalaryTypeObj.TermCode" placeholder="请选择">
                <el-option v-for="item in TermCode" :key="item.Code" :label="item.Name" :value="item.Code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="标准预设" prop="DefaultSettingId">
              <el-select class="filter-item" v-model="newSalaryTypeObj.DefaultSettingId" placeholder="请选择">
                <el-option v-for="item in DefaultSettingId" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="金额" prop="TermValue">
              <el-input v-model.number="newSalaryTypeObj.TermValue" style="width: 217px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="币种" prop="Currency">
              <el-select class="filter-item" v-model="newSalaryTypeObj.Currency" placeholder="请选择">
                <el-option v-for="item in Currency" :key="item.Id" :label="item.Name" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入备注" v-model="newSalaryTypeObj.Remark">
          </el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="salaryTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSalaryType()">保存</el-button>
      </div>

    </el-dialog>

    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
  import {
    getSalaryList,
    getEmpType,
    getTermList,
    getCurrency,
    getCityList,
    getSchemeEmpList,
    addOneEmpTerm,
    addTaxCity,
    uploadEmpTerm
  } from '@/api/salary'
  import { getOrgList } from '@/api/permission'
  import { REQ_OK, BASE_URL } from '@/api/config'
  import TabPane from '@/components/salary/salaryProject/tabPane'
  import UploadFile from '@/base/uploadTemplate/uploadTemplate'
  import AddTaxCity from '@/components/salary/common/addTaxCity'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        archiveList: [],
        EmpType: [],
        queryObj: {
          Org: [],
          SchemeCode: '',
          KeyWord: '',
          EmpType: 1,
          OnDate: null
        },
        tidVisible: false,
        tidList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultCheck: [],
        newSalaryTypeObj: {
          SchemeCode: '',
          TermCode: '',
          DefaultSettingId: '',
          TermValue: '',
          Currency: '',
          EmpIds: '',
          BeginDate: null,
          EndDate: null,
          Remark: ''
        },
        citys: [],
        TermCode: [],
        DefaultSettingId: [
          {
            value: '1',
            label: 1
          },
          {
            value: '2',
            label: 2
          }
        ],
        Currency: [],
        EmpIds: [],
        newSalaryTypeObjRules: {
          BeginDate: [
            { type: 'date', required: true, message: '请选择生效日期', trigger: 'change' }
          ],
          ProjectCode: [
            { type: 'string', required: true, message: '请选择所属项目', trigger: 'change' }
          ],
          TermCode: [
            { type: 'string', required: true, message: '请选择项目名称', trigger: 'change' }
          ],
          DefaultSettingId: [
            { type: 'string', required: true, message: '请选择预设标准', trigger: 'change' }
          ],
          TermValue: [
            { type: 'number', required: true, message: '请输入金额', trigger: 'blur' }
          ],
          Currency: [
            { type: 'number', required: true, message: '请选择币种', trigger: 'change' }
          ]
        },
        typeList: [
          {
            TypeName: '全部',
            Code: '1111'
          }
        ],
        editableTabsValue: '1',
        activeName: '1111',
        textMap: {
          baseImport: '基本工资导入',
          commonImport: '常规项导入',
          targetImport: '目标奖金导入'
        },
        createTypeName: null,
        commonVisible: false,
        salaryTypeVisible: false,
        isTabPane: false,
        taxCityVisible: false
      }
    },
    created () {
      this._getOrgList()
      this._getSalaryList()
      this._getEmpType()
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
      addSalaryType () {
        if (this.queryObj.SchemeCode) {
          getTermList(this.queryObj.SchemeCode).then(res => {
            if (res.data.State === REQ_OK) {
              this.TermCode = res.data.Data
            } else {
              Message.error('项目名称列表加载失败，请重试！')
            }
          })
          getCurrency().then(res => {
            if (res.data.State === REQ_OK) {
              this.Currency = res.data.Data
            } else {
              Message.error('币种列表加载失败，请重试！')
            }
          })
          getSchemeEmpList(this.queryObj.SchemeCode).then(res => {
            if (res.data.State === REQ_OK) {
              let arr = res.data.Data
              let result = [
                {
                  'value': '001',
                  'label': '全部',
                  'children': this._recursionFn(arr)
                }
              ]
              this.EmpIds = result
              this.salaryTypeVisible = true
            } else {
              Message.error('员工列表获取失败，请重试！')
            }
          })
        } else {
          Message.error('请先选择薪资方案！')
        }
      },
      saveSalaryType () {
        this.newSalaryTypeObj.SchemeCode = this.queryObj.SchemeCode
        let arr = this.$refs.tree.getCheckedNodes()
        if (!arr.length) return Message.error('请选择员工')
        let result = []
        // 判断是否全选
        if (arr[0].children) {
          arr[0].children.forEach((item) => {
            let id = item.value
            result.push(id)
          })
        } else {
          arr.forEach((item) => {
            let id = item.value
            result.push(id)
          })
        }
        this.newSalaryTypeObj.EmpIds = JSON.stringify(result)
        this.$refs.newSalaryTypeform.validate((valid) => {
          if (valid) {
            addOneEmpTerm(this.newSalaryTypeObj).then(res => {
              if (res.data.State === REQ_OK) {
                Message.success('添加薪资项成功！')
                this.salaryTypeVisible = false
              } else {
                Message.error('添加薪资项失败，请重试！')
              }
            }).catch(() => {
              Message.error('添加薪资项失败，请重试！')
            })
          }
        })
      },
      addTaxCity () {
        if (!this.queryObj.SchemeCode) {
          Message.error('请先选择薪资方案！')
          return false
        }
        getSchemeEmpList(this.queryObj.SchemeCode).then(res => {
          if (res.data.State === REQ_OK) {
            let arr = res.data.Data
            let result = [
              {
                'value': '001',
                'label': '全部',
                'children': this._recursionFn(arr)
              }
            ]
            this.EmpIds = result
          } else {
            Message.error('员工列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('员工列表获取失败，请重试！')
        })
        getCityList().then(res => {
          if (res.data.State === REQ_OK) {
            this.citys = this.filterCitys(res.data.Data)
            this.taxCityVisible = true
          } else {
            Message.error('城市列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('城市列表获取失败，请重试！')
        })
      },
      saveTaxCity (obj) {
        addTaxCity(obj).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('保存成功！')
            this.taxCityVisible = false
          } else {
            Message.error('保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存失败，请重试！')
        })
      },
      cancelTaxCity () {
        this.taxCityVisible = false
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
      changeYear () {
      },
      handleCommand (command) {
        if (!this.queryObj.SchemeCode) {
          return Message.error('请选择薪资方案')
        }
        if (!this.queryObj.OnDate) {
          return Message.error('请选择薪资日期')
        }
        if (command === 'commonImport') {
          this.commonVisible = true
        }
      },
      commonModelDownload () {
        let url = `${BASE_URL}/Wage/IO?Method=BuildEmpTermTemplate&TokenId=${this.token}&CompanyCode=${this.companyCode}&SchemeCode=${this.queryObj.SchemeCode}`
        window.open(url)
      },
      _uploadEmpTerm (file) {
        console.log(this.queryObj)
        uploadEmpTerm(file, this.queryObj).then((res) => {
          if (res.data.UploadState === REQ_OK) {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.$refs.uploadTemplate.emptyFile()
          } else {
            this.$message({
              type: 'error',
              message: '上传失败!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '上传失败!'
          })
        })
      },
      handleFilter () {
        this.changeObj()
        this.$refs.tabPane[0]._getEmpTermList()
      },
      changeObj () {
        if (!this.queryObj.SchemeCode) {
          return Message.error('请选择薪资方案')
        }
        if (!this.queryObj.OnDate) {
          return Message.error('请选择薪资日期')
        }
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
    },
    components: {
      TabPane,
      UploadFile,
      AddTaxCity
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-archive
    .empType
      width 120px
      .el-select__tags
        no-wrap()
    .dialog-item
      .el-dialog
        width 500px
      .el-dialog__body
        text-align center
        .download-template
          margin-right 30px
          vertical-align: top
  @media screen and (min-width: 1550px) {
    .right-btn-item {
      float: right
    }
  }
  .salary-archive .left-btn {
    margin-left 0!important
  }

</style>
