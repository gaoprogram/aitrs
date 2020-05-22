<!--
  User: xxxxxxx
  Date: 2018/2/9
  功能：xxxxxx
-->

<template>
  <el-dialog :title="title"
             :visible.sync="salaryTypeVisible"
             class="max-dialog-item"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             custom-class="modifyProject"
  >

    <div style="font-size: 16px;margin-bottom: 20px;padding-left: 17px;">
      <span style="margin-right: 20px;font-weight: bold">员工号：{{this.$route.query.empNum}}</span>
      <span style="font-weight: bold">姓名：{{this.$route.query.name}}</span>
    </div>

    <el-form style="width: 700px;display: inline-block"
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
          <el-form-item label="项目名称" prop="TermCode">
            <el-select class="filter-item" v-model="newSalaryTypeObj.TermCode" placeholder="请选择" @change="handleTermChange">
              <el-option v-for="item in TermCode" :key="item.Code" :label="item.Name" :value="item.Code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" v-if="!isHasDefaultSetting">
          <el-form-item label="金额" prop="TermValue">
            <el-input v-model.number="newSalaryTypeObj.TermValue" style="width: 217px" type="number"></el-input>
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
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="saveSalaryType()">保存</el-button>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import {
    getOnceTermList,
    getCurrency,
    addOneEmpTerm
  } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  export default {
    props: {
      obj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      isRevenue: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        title: '编辑一次性项目',
        salaryTypeVisible: true,
        newSalaryTypeObj: {
          Id: '',
          SchemeCode: '',
          TermCode: '',
          DefaultSettingId: '',
          TermValue: 0,
          Currency: '',
          EmpIds: '',
          BeginDate: null,
          EndDate: null,
          Remark: '',
          TermName: ''
        },
        TermCode: [],
        DefaultSettingId: [],
        isHasDefaultSetting: true,
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
            { type: 'number', required: true, message: '请选择预设标准', trigger: 'change' }
          ],
          TermValue: [
            { type: 'number', required: true, message: '请输入金额', trigger: 'blur' }
          ],
          Currency: [
            { type: 'number', required: true, message: '请选择币种', trigger: 'change' }
          ]
        }
      }
    },
    created () {
      this._getTermList()
      this._getCurrency()
    },
    computed: {
    },
    methods: {
      _getTermList () {
        getOnceTermList(this.$route.query.salaryArchive).then(res => {
          if (res.data.State === REQ_OK) {
            let result = res.data.Data
            if (this.isRevenue) {
              this.TermCode = result['G']
            } else {
              this.TermCode = result['D']
            }
            this.changeObj()
          } else {
            Message.error('项目名称列表加载失败，请重试！')
          }
        })
      },
      _getCurrency () {
        getCurrency().then(res => {
          if (res.data.State === REQ_OK) {
            this.Currency = res.data.Data
          } else {
            Message.error('币种列表加载失败，请重试！')
          }
        })
      },
      handleTermChange () {
        this.TermCode.forEach(item => {
          if (item.Code === this.newSalaryTypeObj.TermCode && item.DefaultSetting.length > 0) {
            this.DefaultSettingId = item.DefaultSetting
            this.isHasDefaultSetting = true
          } else if (item.Code === this.newSalaryTypeObj.TermCode && item.DefaultSetting.length === 0) {
            this.DefaultSettingId = []
            this.isHasDefaultSetting = false
          }
        })
      },
      changeObj () {
        if (this.obj.TermCode) {
          this.newSalaryTypeObj = Object.assign({}, this.obj)
          this.newSalaryTypeObj.BeginDate = this.replaceTime(this.newSalaryTypeObj.BeginDate)
          this.newSalaryTypeObj.EndDate = this.replaceTime(this.newSalaryTypeObj.EndDate)
          this.$nextTick(() => {
            this.handleTermChange()
          })
        } else {
          // this.newSalaryTypeObj = {}
          this.title = '新增一次性项目'
        }
      },
      cancel () {
        this.$emit('cancel')
      },
      saveSalaryType () {
        let obj = {
          'Id': this.newSalaryTypeObj.Id,
          'SchemeCode': this.$route.query.salaryArchive,
          'TermCode': this.newSalaryTypeObj.TermCode,
          'DefaultSettingId': this.newSalaryTypeObj.DefaultSettingId,
          'TermValue': this.newSalaryTypeObj.TermValue,
          'Currency': this.newSalaryTypeObj.Currency,
          'EmpIds': this.$route.query.empId,
          'BeginDate': this.newSalaryTypeObj.BeginDate,
          'EndDate': this.newSalaryTypeObj.EndDate,
          'Remark': this.newSalaryTypeObj.Remark
        }
        if (typeof obj.BeginDate === 'number') {
          obj.BeginDate = new Date(obj.BeginDate)
        }
        if (typeof obj.EndDate === 'number') {
          obj.EndDate = new Date(obj.EndDate)
        }
        addOneEmpTerm(obj).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('保存成功！')
            this.$emit('modifySuccess')
          } else {
            Message.error('保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存失败，请重试！')
        })
        this.$emit('saveSalaryType')
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .modifyProject
    width 800px
</style>
