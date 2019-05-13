<template>
  <el-dialog :title="title"
             custom-class="add-type"
             :visible.sync="dialogFormVisible"
             center
             width="950px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :modal-append-to-body="false"
             :lock-scroll="false"
             :show-close="false"
  >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input
          placeholder="请输入项目名称"
          suffix-icon="el-icon-search"
          debounce
          @change="searchChange"
          v-model="searchText">
        </el-input>
      </div>
      <div v-for="i in projectList" :key="i.Name" class="text item" @click="editorProject(i)" v-if="i.Status === 1">
        {{ i.Name }}
      </div>
    </el-card>

    <el-form class="small-space" ref="formDom" :model="addObj" label-width="85px" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属项目" prop="ProjectCode">
            <el-select class="filter-item"
                       v-model="addObj.ProjectCode"
                       placeholder="请选择"
                       @change="change"
            >
              <el-option v-for="item in ProjectCode" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="状态">
            <el-switch
              v-model="addObj.Status"
              active-text="启用"
              inactive-text="停用"
              style="margin-bottom: 5px"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="Name" class="is-required">
            <el-input v-model="addObj.Name" style="width: 217px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生效日期" class="postInfo-container-item" prop="BeginDate">
            <el-date-picker
              v-model="addObj.BeginDate"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期时间"
              style="width: 217px"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="项目属性" prop="AttributeCode">
            <el-select class="filter-item" v-model="addObj.AttributeCode" placeholder="请选择">
              <el-option v-for="item in AttributeCode" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="项目类型" prop="TypeCode">
            <el-select class="filter-item" v-model="addObj.TypeCode" placeholder="请选择">
              <el-option v-for="item in TypeCode" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="格式规则" prop="Scale">
            <el-select class="filter-item" v-model="addObj.Scale" placeholder="请选择">
              <el-option v-for="item in Scale" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="取值方式" prop="RoundType">
            <el-select class="filter-item" v-model="addObj.RoundType" placeholder="请选择">
              <el-option v-for="item in RoundType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="员工类型" prop="EmpTypeRange" style="width: 97%;">
            <el-select class="filter-item" multiple v-model="addObj.EmpTypeRange" placeholder="请选择"
                       style="width: 100%;">
              <el-option v-for="item in EmpTypeRange" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="发放规则" prop="PayRuleId">
            <el-select class="filter-item" v-model="addObj.PayRuleId" placeholder="请选择" @change="handlePayRule">
              <el-option v-for="item in PayRuleId" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="发放频率" prop="PayFrequencyCode">
            <el-select class="filter-item"
                       style="width: 105px"
                       v-model="addObj.PayFrequencyCode"
                       placeholder="请选择"
                       @change="handlePayFrequency"
            >
              <el-option v-for="item in PayFrequencyCode" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
              </el-option>
            </el-select>
            <el-select class="filter-item input-unit" style="width: 105px" v-model="addObj.PayMethodCode" placeholder="请选择">
              <el-option v-for="item in PayMethodCode" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="计算逻辑" prop="PayLogic">
            <el-select class="filter-item" v-model="addObj.PayLogicCode" placeholder="请选择" @change="handlePayLogic">
              <el-option v-for="item in PayLogicCode" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="预设管理" v-show="isShowDefaultSet">
        <el-table
          border
          :data="addObj.DefaultSettingContent"
          style="width: 100%"
          max-height="250"
        >
          <el-table-column prop="Id" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="DefaultValue" label="金额">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.DefaultValue" style="width: 80px"></el-input>
              <span style="font-size: 12px">{{ defaultSetUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Note" label="预设说明">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.Note" autosize :maxlength="20"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="OrgRange" label="组织范围">
            <template slot-scope="scope">
              <el-button type="primary" @click.native.prevent="handleOrgRang(scope.row)">
                选择
              </el-button>
            </template>
          </el-table-column>

          <el-table-column prop="JobLevel" label="职等范围">
            <template slot-scope="scope">
              <el-select v-model="scope.row.JobLevel"
                         multiple
                         placeholder="请选择"
                         class="jobLevel-select"
              >
                <el-option
                  v-for="item in JobLevel"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, addObj.DefaultSettingContent)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="small" @click.native.prevent="addRow()"><i class="el-icon-plus"></i></el-button>

        <div style="margin-top: 10px" v-if="isPayRulePercent">
          <span>项目构成</span>
          <el-select v-model="addObj.DefaultSettingStruct"
                     multiple
                     placeholder="请选择"
                     style="width: 89%"
          >
            <el-option
              v-for="item in DefaultSettingStruct"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>


      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" v-model="addObj.Remark">
        </el-input>
      </el-form-item>

      <el-form-item label="提醒" v-if="isIncludeIncome">
        <el-card class="box-card" style="width: 100%">
          <div slot="header" class="clearfix">
            <span>扣发规则：员工满足下列任一条件，将不享受该项发放</span>
          </div>
          <el-checkbox v-model="hire" style="margin-left: 83px;">本月入离职</el-checkbox>
          <div class="demo-input-suffix">
            <span class="text">请假：</span>
            <el-input-number v-model="addObj.Leave" controls-position="right"></el-input-number>
            天
          </div>
          <div class="demo-input-suffix">
            <span class="text">旷工：</span>
            <el-input-number v-model="addObj.Absenteeism" controls-position="right"></el-input-number>
            次
          </div>
          <div class="demo-input-suffix">
            <span class="text">迟到+早退：</span>
            <el-input-number v-model="lateCount" controls-position="right"></el-input-number>
            <el-select v-model="chooseVal" placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in timesOrMin"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-card>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure()">确 定</el-button>
    </div>

    <el-dialog
      width="30%"
      title="选择组织"
      :visible="tidVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :modal="false"
      append-to-body
      custom-class="org-dialog"
    >
      <el-tree
        :data="TidArrTree"
        show-checkbox
        node-key="value"
        ref="tree"
        expand-on-click-node
        highlight-current
        :props="defaultOrgRang"
      >
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="tidVisible = false">取消</el-button>
        <el-button type="primary" @click="orgTreeSure()">确定</el-button>
      </div>
    </el-dialog>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable prefer-promise-reject-errors,no-unneeded-ternary */

  import { REQ_OK } from '@/api/config'
  import {
    getTermProject,
    getTermAttribute,
    getTermType,
    getPayMethod,
    getPayRule,
    getPayFrequency,
    getPayLogic,
    getJobLevel,
    getEmpType,
    checkUniqueTermName,
    addTerm,
    getSchemeOrgList,
    getRelStructList
  } from '@/api/salary'
  import { Message } from 'element-ui'

  export default {
    props: {
      TermList: {
        type: Array,
        default: []
      },
      SchemeCode: {
        type: String,
        default: ''
      }
    },
    data () {
      let checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空！'))
        }
        if (!this.addObj.ProjectCode) {
          return callback(new Error('请先选择所属项目！'))
        }
        checkUniqueTermName(value, this.addObj.SchemeCode, this.addObj.Code).then((res) => {
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
        title: '新增项目',
        projectList: [],
        addObj: {
          SchemeCode: '',
          Name: '',
          BeginDate: null,
          ProjectCode: '',
          ProjectName: '',
          AttributeCode: '',
          AttributeName: '',
          TaxType: '',
          TypeCode: '',
          TypeName: '',
          PayFrequencyCode: '',
          PayLogicCode: '',
          PayMethodCode: '',
          PayMethodName: '',
          Scale: 2,
          RoundType: '',
          PayRuleId: '',
          EmpTypeRange: '',
          DefaultSettingContent: [
            {
              'Id': 1,
              'DefaultValue': 0,
              'OrgRange': [],
              'JobLevel': [],
              'Note': ''
            }
          ],
          WithHoldingClause: {
            Absenteeism: 0,
            Hire: 0,
            LateCount: 0,
            LateDuration: 0,
            Leave: 0
          },
          DefaultSettingStruct: [],
          Status: true,
          Remark: ''
        },
        ProjectCode: [],
        AttributeCode: [],
        TypeCode: [],
        PayFrequencyCode: [],
        PayLogicCode: [],
        PayMethodCode: [],
        JobLevel: [],
        DefaultSettingStruct: [],
        Scale: [{
          value: 0,
          label: '整数'
        }, {
          value: 1,
          label: '1位小数'
        }, {
          value: 2,
          label: '2位小数'
        }],
        RoundType: [{
          value: 1,
          label: '四舍五入'
        }, {
          value: 2,
          label: '向下取整'
        }, {
          value: 3,
          label: '向上取整'
        }],
        PayRuleId: [],
        EmpTypeRange: [],
        WithHoldingClause: '',
        hire: false,
        lateCount: null,
        chooseVal: null,
        timesOrMin: [{
          value: 1,
          label: '次'
        }, {
          value: 2,
          label: '分钟'
        }],
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        isShowDefaultSet: false,
        isPayRulePercent: false,
        defaultSetUnit: '元/天',
        selectedRule: '',
        selectedUnit: '',
        tidVisible: false,
        defaultOrgRang: {
          children: 'children',
          label: 'label'
        },
        defaultCheck: [],
        TidArrTree: [],
        rules: {
          Name: [
            {validator: checkName, trigger: 'blur'}
          ],
          BeginDate: [
            { type: 'date', required: true, message: '请选择生效日期', trigger: 'change' }
          ],
          ProjectCode: [
            {type: 'string', required: true, message: '请选择所属项目', trigger: 'change'}
          ],
          TypeCode: [
            {type: 'string', required: true, message: '请选择项目类型', trigger: 'change'}
          ],
          AttributeCode: [
            {type: 'string', required: true, message: '请选择项目属性', trigger: 'change'}
          ],
          Scale: [
            {type: 'number', required: true, message: '请选择格式规则', trigger: 'change'}
          ],
          RoundType: [
            {type: 'number', required: true, message: '请选择取值方式', trigger: 'change'}
          ],
          EmpTypeRange: [
            {type: 'array', required: true, message: '请选择员工类型', trigger: 'change'}
          ],
          PayLogicCode: [
            {type: 'string', required: true, message: '请选择计算逻辑', trigger: 'change'}
          ],
          PayFrequencyCode: [
            {type: 'string', required: true, message: '请选择发放频率', trigger: 'change'}
          ],
          PayRuleId: [
            {type: 'string', required: true, message: '请选择发放规则', trigger: 'change'}
          ]
        },
        dialogFormVisible: false,
        searchText: '',
        isIncludeIncome: false
      }
    },
    created () {

    },
    methods: {
      async _getDic () {
        try {
          await this._getTermProject()
          await this._getTermAttribute()
          await this._getTermType()
          await this._getPayFrequency()
          await this._getPayMethod()
          await this._getPayRule()
          await this._getPayLogic()
          await this._getEmpType()
          await this._getSchemeOrgList()
          await this._getJobLevel()
        } catch (e) {
          console.log(e)
        }
      },
      _getTermProject () {
        return getTermProject().then((res) => {
          if (res.data.State === REQ_OK) {
            this.ProjectCode = res.data.Data
            if (this.addObj.ProjectCode) {
              this.change(this.addObj.ProjectCode)
            }
          } else {
            Message.error('项目列表加载失败，请刷新重试！')
          }
        }).catch(() => {
          // return Promise.reject('项目列表加载失败，请刷新重试！')
          Message.error('项目列表加载失败，请刷新重试！')
        })
      },
      _getTermAttribute () {
        return getTermAttribute().then((res) => {
          if (res.data.State === REQ_OK) {
            this.AttributeCode = res.data.Data
          } else {
            Message.error('项目属性加载失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('项目属性加载失败，请刷新重试！')
        })
      },
      _getTermType () {
        return getTermType().then((res) => {
          if (res.data.State === REQ_OK) {
            this.TypeCode = res.data.Data
          } else {
            Message.error('项目类型加载失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('项目类型加载失败，请刷新重试！')
        })
      },
      _getPayFrequency () {
        return getPayFrequency().then(res => {
          if (res.data.State === REQ_OK) {
            this.PayFrequencyCode = res.data.Data
            // this.addObj.PayFrequencyCode = this.PayFrequencyCode[0].UniCode
            this.selectedUnit = this.PayFrequencyCode[0].OperateCode
          } else {
            Message.error('发放频率失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('发放频率失败，请刷新重试！')
        })
      },
      _getPayMethod () {
        return getPayMethod().then((res) => {
          if (res.data.State === REQ_OK) {
            this.PayMethodCode = res.data.Data
            // this.addObj.PayMethodCode = this.PayMethodCode[0].UniCode
          } else {
            Message.error('发放频率单位失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('发放频率单位加载失败，请刷新重试！')
        })
      },
      _getPayRule () {
        return getPayRule().then((res) => {
          if (res.data.State === REQ_OK) {
            this.PayRuleId = res.data.Data
            // this.addObj.PayRuleId = this.PayRuleId[0].UniCode
            this.selectedRule = this.PayRuleId[0].Name
          } else {
            Message.error('发放规则加载失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('发放规则加载失败，请刷新重试！')
        })
      },
      _getPayLogic () {
        return getPayLogic().then(res => {
          if (res.data.State === REQ_OK) {
            this.PayLogicCode = res.data.Data
          } else {
            Message.error('计算逻辑加载失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('计算逻辑加载失败，请刷新重试！')
        })
      },
      _getEmpType () {
        return getEmpType().then((res) => {
          if (res.data.State === REQ_OK) {
            this.EmpTypeRange = res.data.Data
          } else {
            Message.error('员工类型加载失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('员工类型加载失败，请刷新重试！')
        })
      },
      _getSchemeOrgList () {
        getSchemeOrgList(this.$route.query.code).then(res => {
          if (res.data.State === REQ_OK) {
            this.TidArrTree = this.recursionFn(res.data.Data)
          } else {
            Message.error('组织范围加载失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('组织范围加载失败，请刷新重试！')
        })
      },
      _getRelStructList () {
        getRelStructList(this.$route.query.code).then(res => {
          if (res.data.State === REQ_OK) {
            this.DefaultSettingStruct = res.data.Data
          } else {
            Message.error('项目构成列表获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('项目构成列表获取失败，请刷新重试！')
        })
      },
      _getJobLevel () {
        getJobLevel().then(res => {
          if (res.data.State === REQ_OK) {
            this.JobLevel = res.data.Data
          } else {
            Message.error('职等列表获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('职等列表获取失败，请刷新重试！')
        })
      },
      handlePayRule (val) {
        let item = this.PayRuleId.filter(item => {
          return item.UniCode === val
        })
        if (item[0].Name.indexOf('百分比') !== -1) {
          if (this.DefaultSettingStruct.length === 0) {
            this._getRelStructList()
          }
          this.isPayRulePercent = true
        } else {
          this.isPayRulePercent = false
        }
        console.log(item)
        this.selectedRule = item[0].Name
        this.transformationUnit(this.selectedRule, this.selectedUnit)
      },
      handlePayFrequency (val) {
        let item = this.PayFrequencyCode.filter(item => {
          return item.UniCode === val
        })
        this.selectedUnit = item[0].OperateCode
        this.transformationUnit(this.selectedRule, this.selectedUnit)
      },
      handlePayLogic (val) {
        let item = this.PayLogicCode.filter(item => {
          return item.UniCode === val
        })
        this.isShowDefaultSet = item[0].Name.indexOf('预设') !== -1 ? true : false
        if (this.isShowDefaultSet && this.JobLevel.length === 0) {
          this._getJobLevel()
        }
      },
      transformationUnit (rule, payMethod) {
        if (rule === '固定额' && payMethod === 'Day') {
          this.defaultSetUnit = '元/天'
        }
        if (rule === '固定额' && payMethod === 'Month') {
          this.defaultSetUnit = '元/月'
        }
        if (rule === '固定额' && payMethod === 'Quarter') {
          this.defaultSetUnit = '元/季度'
        }
        if (rule === '固定额' && payMethod === 'Year') {
          this.defaultSetUnit = '元/年'
        }
        if (rule === '百分比' && payMethod === 'Day') {
          this.defaultSetUnit = '%/天'
        }
        if (rule === '百分比' && payMethod === 'Month') {
          this.defaultSetUnit = '%/月'
        }
        if (rule === '百分比' && payMethod === 'Quarter') {
          this.defaultSetUnit = '%/季度'
        }
        if (rule === '百分比' && payMethod === 'Year') {
          this.defaultSetUnit = '%/年'
        }
      },
      searchChange () {
        this.projectList = this.TermList.filter(i => {
          return i.Name.indexOf(this.searchText) !== -1
        })
      },
      change (code) {
        let item = this.ProjectCode.filter(item => {
          return item.UniCode === code
        })
        this.isIncludeIncome = item[0].Name.indexOf('收入') !== -1 ? true : false
      },
      addRow () {
        let id = 1
        if (this.addObj.DefaultSettingContent.length > 0) {
          id = this.addObj.DefaultSettingContent[this.addObj.DefaultSettingContent.length - 1].Id + 1
        }
        this.addObj.DefaultSettingContent.push({
          'Id': id,
          'DefaultValue': 0,
          'OrgRange': [],
          'JobLevel': [],
          'Note': ''
        })
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
        let id = 1
        this.addObj.DefaultSettingContent = this.addObj.DefaultSettingContent.map(item => {
          return {
            'Id': id++,
            'DefaultValue': item.DefaultValue,
            'OrgRange': item.OrgRange,
            'JobLevel': item.JobLevel,
            'Note': item.Note
          }
        })
      },
      handleOrgRang (arr) {
        this.tidVisible = true
        this.selectIndex = arr.Id
        if (this.TidArrTree.length > 0) {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys([])
            this.$refs.tree.setCheckedKeys(arr.OrgRange)
          })
        }
      },
      orgTreeSure () {
        this.tidVisible = false
        let arr = this.$refs.tree.getCheckedNodes()
        let result = []
        arr.forEach((item) => {
          let val = item.value
          result.push(val)
        })
        this.addObj.DefaultSettingContent.forEach(item => {
          if (item.Id === this.selectIndex) {
            item.OrgRange = result
          }
        })
      },
      editorProject (obj) {
        this.addObj = Object.assign(this.addObj, obj)
        this.addObj.BeginDate = new Date(this.replaceTime(this.addObj.BeginDate))
        this.addObj.Status = this.addObj.Status === 1 ? true : false
        this.hire = (this.addObj.WithHoldingClause.Hire === 1) ? true : false
        if (this.addObj.WithHoldingClause.LateCount > 0) {
          this.lateCount = this.addObj.WithHoldingClause.LateCount
          this.chooseVal = 1
        } else if (this.addObj.WithHoldingClause.LateDuration > 0) {
          this.lateCount = this.addObj.WithHoldingClause.LateDuration
          this.chooseVal = 2
        }
        if (this.addObj.PayLogicName) {
          this.isShowDefaultSet = obj.PayLogicName.indexOf('预设') !== -1 ? true : false
        } else {
          this.isShowDefaultSet = false
        }
      },
      show (TaxType) {
        this._getDic()
        this.dialogFormVisible = true
        this.addObj.Remark = ''
        this.hire = false
        this.leave = 0
        this.absenteeism = 0
        this.lateCount = 0
        this.addObj.TaxType = TaxType
      },
      close () {
        this.$refs.formDom.resetFields()
        console.log(this.addObj)
        this.dialogFormVisible = false
      },
      editorType (obj) {
        this.title = '编辑项目'
        this.show()
        this.editorProject(obj)
      },
      sure () {
        let duration = 0
        let count = 0
        if (this.chooseVal === 2) {
          duration = this.lateCount
        }
        if (this.chooseVal === 1) {
          count = this.lateCount
        }
        this.$refs.formDom.validate((valid) => {
          if (valid) {
            this.addObj.Status = this.addObj.Status ? 1 : 0
            this.addObj.AttributeName = this.translateName(this.addObj.AttributeCode, this.AttributeCode)
            this.addObj.TypeName = this.translateName(this.addObj.TypeCode, this.TypeCode)
            this.addObj.PayMethodName = this.translateName(this.addObj.PayMethodCode, this.PayMethodCode)
            this.addObj.WithHoldingClause = Object.assign(this.addObj.WithHoldingClause, {
              Hire: this.hire ? 1 : 0,
              LateCount: count,
              LateDuration: duration
            })
            if (this.isShowDefaultSet) {
              this.addObj.DefaultSettingContent.forEach(item => {
                if (item.DefaultValue <= 0) {
                  Message.error('请输入预设金额！')
                  return false
                }
              })
            }
            this.addObj.DefaultSettingContent.forEach(item => {
              item.Unit = this.defaultSetUnit
            })
            let obj = Object.assign({}, this.addObj)
            obj.SchemeCode = this.SchemeCode
            addTerm(JSON.stringify(obj)).then(res => {
              if (res.data.State === REQ_OK) {
                if (this.title === '新增项目') {
                  Message.success('新增薪资项目成功！')
                } else {
                  Message.success('修改薪资项目成功！')
                }
                this.$emit('updateSuccess')
                this.$refs.formDom.resetFields()
                this.dialogFormVisible = false
              } else {
                Message.error('更新薪资项目失败，请重试！')
              }
            }).catch(() => {
              Message.error('更新薪资项目失败，请重试！')
            })
          }
        })
      },
      translateName (code, arr) {
        let obj = arr.filter(i => {
          return i.UniCode === code
        })
        return obj[0].Name
      },
      recursionFn (arr) {
        let result = []
        arr.forEach((item) => {
          let obj
          if (item.Child && item.Child.length > 0) {
            obj = {
              value: item.OrgCode,
              label: item.OrgName,
              children: this.recursionFn(item.Child)
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
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      }
    },
    watch: {
      'TermList': {
        handler (newval, oldval) {
          this.projectList = newval
        }
      },
      deep: true
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .add-type
    height 700px
    overflow auto
    .box-card
      width: 190px;
      display: inline-block
      vertical-align: top
      .clearfix:before, .clearfix:after
        display: table
        content: ""
      .clearfix:after
        clear: both
      .text
        text-align center
        font-size: 14px
        margin-bottom: 18px
      .item
        text-align center
        font-size: 14px
        padding 10px 0
        margin-bottom: 5px
        background #f0f2f5
        border-radius 4px
        &:hover
          color #ffffff
          background $color-background-b
          cursor pointer
    .small-space
      display inline-block
      margin-left 30px
      width 640px
      .demo-input-suffix
        .text
          display: inline-block
          width: 80px
          text-align right
        .el-input, .el-input-number
          width: 200px!important
      .input-unit
        input
          text-overflow: ellipsis
      .jobLevel-select
        .el-select__tags, input
          height: 40px!important;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
    .org-dialog
      .el-dialog__body
        max-height: 400px
        overflow: auto
</style>
