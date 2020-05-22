<!--
  User: xxxxxxx
  Date: 2017/12/29
  功能：xxxxxx
-->

<template>
  <div class="set-salary">
    <el-form class="small-space" label-position="left" ref="ruleForm" :model="strJson1" :rules="rules"
             label-width="150px">

      <el-form-item label="方案名称：" prop="Name" class="is-required">
        <el-input v-model="strJson1.Name" placeholder="请输入方案名称"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="计薪开始月：" prop="BeginMonth">
            <el-select class="filter-item" v-model="strJson1.BeginMonth" placeholder="请选择">
              <el-option v-for="item in BeginMonth" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="计薪开始日：" prop="BeginDate">
            <days errorText="请选择计薪开始日" @changeDay="BeginDateFn" :date="strJson1.BeginDate"></days>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="计薪结束月：" prop="EndMonth">
            <el-select class="filter-item" v-model="strJson1.EndMonth" placeholder="请选择">
              <el-option v-for="item in EndMonth" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="计薪结束日：" prop="EndDate">
            <days errorText="请选择计薪结束日" @changeDay="EndDateFn" :date="strJson1.EndDate"></days>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="发薪周期：" prop="PayRecycle">
            <el-select class="filter-item"
                       v-model="strJson1.PayRecycle"
                       placeholder="请选择"
                       @change="PayRecycleChange"
            >
              <el-option v-for="item in PayRecycle" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="发薪日期：" prop="PayDateContentM1" style="display: inline-block">
            <el-select class="filter-item"
                       v-model="strJson1.PayDateContentM1"
                       placeholder="请选择"
                       style="width: 110px"
            >
              <el-option v-for="item in PayDateContent1" :key="item.Value" :label="item.Label" :value="item.Value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="PayDateContentD1" class="form-item" style="display: inline-block">
            <days errorText="请选择发薪日" @changeDay="PayDateContentFn1" :date="strJson1.PayDateContentD1"></days>
          </el-form-item>

          <span v-if="times"> -- </span>

          <el-form-item prop="PayDateContentM2" class="form-item" style="display: inline-block;margin-left: 0" v-if="times">
            <el-select class="filter-item"
                       v-model="strJson1.PayDateContentM2"
                       placeholder="请选择"
                       style="width: 110px"
            >
              <el-option v-for="item in PayDateContent2" :key="item.Value" :label="item.Label" :value="item.Value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="PayDateContentD2" class="form-item" style="display: inline-block" v-show="times">
            <days errorText="请选择发薪日" @changeDay="PayDateContentFn2" :date="strJson1.PayDateContentD2"></days>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="对应社保扣减月：" prop="SSDeduce">
            <el-select class="filter-item"
                       v-model="strJson1.SSDeduce"
                       placeholder="请选择"
            >
              <el-option v-for="item in SSDeduce" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="社保数据来源：" prop="SSDataSource">
            <el-select class="filter-item"
                       v-model="strJson1.SSDataSource"
                       placeholder="请选择"
            >
              <el-option v-for="item in SSDataSource" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="考勤数据来源：" prop="CADataSource">
            <el-select class="filter-item"
                       v-model="strJson1.CADataSource"
                       placeholder="请选择"
            >
              <el-option v-for="item in CADataSource" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="选择组织人员：" prop="Tid" class="row-item el-select">
            <!-- <div class="div-selected" v-model="strJson1.Tid">
                <span>
                  <span class="el-tag el-tag--info el-tag--small" v-for="item in strJson1.TidArr" :key="item.value">
                    <span class="el-select__tags-text">{{ item.label }}</span>
                    <i class="el-tag__close el-icon-close" @click="delOrgIem(item)"></i>
                  </span>
                </span>
            </div> -->
            <!--<el-input class="row-input__org" v-model="strJson1.Tid" style="display: inline-block;width: 282px;">-->
              <!---->
            <!--</el-input>-->
            <!-- <el-button type="primary" @click="setCheckedNode()">选择</el-button> -->
            <!-- strJson1.TidArr： {{strJson1.TidArr}} -->
            <emp-select-cmp 
              :isTitle="false"
              :selectedList="selectedList"
              :tabType="['zuzhi']"
              @upData="upData"
            >

            </emp-select-cmp>

          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="方案描述：">
            <el-input type="textarea" v-model="strJson1.Remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提示</span>
      </div>
      <div v-for="item in PromptArr" :key="item" class="text item">
        {{ item }}
      </div>
    </el-card>



    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="next()">下一步</el-button>
      <el-button @click="cancel()">取 消</el-button>
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
  import Days from '@/base/days/days'
  import EmpSelectCmp from '@/base/Company-structure-cmp/select-cmp'
  import { getSchemeDetail, getPayRecyle, checkUniqueName, addProject } from '@/api/salary'
  import { getOrgList } from '@/api/permission'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: {
      Days,
      EmpSelectCmp
    },
    props: {
    },
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
        projectObj: {},
        tidList: [],
        selectedList: [], // 已选
        strJson1: {
          Name: null,
          BeginMonth: null,
          BeginDate: 1,
          EndMonth: null,
          EndDate: 1,
          PayRecycle: null,
          PayDateContent: null,
          PayDateContentM1: null,
          PayDateContentM2: 1,
          PayDateContentD1: 1,
          PayDateContentD2: 1,
          SSDeduce: null,
          SSDataSource: null,
          CADataSource: null,
          CheckPosition: null,
          Remark: null,
          Tid: null,
          TidArr: []
        },
        BeginMonth: [{
          value: -1,
          label: '上月'
        }, {
          value: 0,
          label: '当月'
        }, {
          value: 1,
          label: '次月'
        }],
        EndMonth: [{
          value: -1,
          label: '上月'
        }, {
          value: 0,
          label: '当月',
          disabled: true
        }, {
          value: 1,
          label: '次月'
        }],
        PayRecycle: [],
        PayDateContent1: [],
        PayDateContent2: [],
        SSDeduce: [{
          value: -1,
          label: '上月'
        }, {
          value: 0,
          label: '当月',
          disabled: true
        }, {
          value: 1,
          label: '次月'
        }],
        SSDataSource: [{
          value: 1,
          label: '系统'
        }, {
          value: 2,
          label: '导入',
          disabled: true
        }],
        CADataSource: [{
          value: 1,
          label: '系统'
        }, {
          value: 2,
          label: '导入',
          disabled: true
        }],
        defaultCheck: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tidVisible: false,
        PromptArr: [
          '1. 计薪周期原则不可更改，如需改正请联系客服',
          '2. 更改对应社保月，从当前计薪月开始计算生效',
          '3. 若贵公司的考勤周期与计薪周期不一致，请先联系客服后再操作'
        ],
        props: {
          value: 'label',
          children: 'cities'
        },
        times: false,
        rules: {
          Name: [
            {validator: checkName, trigger: 'change'}
          ],
          BeginMonth: [
            {type: 'number', required: true, message: '请选择计薪开始月', trigger: 'change'}
          ],
          BeginDate: [
            { type: 'number', required: true, message: '请选择计薪开始日', trigger: 'change' }
          ],
          EndMonth: [
            {type: 'number', required: true, message: '请选择计薪结束日', trigger: 'change'}
          ],
          EndDate: [
            { type: 'number', required: true, message: '请选择计薪开始日', trigger: 'change' }
          ],
          PayRecycle: [
            {type: 'string', required: true, message: '请选择发薪周期', trigger: 'change'}
          ],
          PayDateContentM1: [
            {type: 'string', required: true, message: '请选择发薪月', trigger: 'change'}
          ],
          PayDateContentM2: [
            {type: 'string', required: true, message: '请选择发薪月', trigger: 'change'}
          ],
          PayDateContentD1: [
            {type: 'number', required: true, message: '请选择发薪日', trigger: 'change'}
          ],
          PayDateContentD2: [
            {type: 'number', required: true, message: '请选择发薪日', trigger: 'change'}
          ],
          SSDeduce: [
            {type: 'number', required: true, message: '请选择对应社保扣减月', trigger: 'change'}
          ],
          SSDataSource: [
            {type: 'number', required: true, message: '请选择社保数据来源', trigger: 'change'}
          ],
          CADataSource: [
            {type: 'number', required: true, message: '请选择考勤数据来源', trigger: 'change'}
          ],
          Tid: [
            {type: 'string', required: false, message: '请选择组织人员', trigger: 'change'}
          ]
        }
      }
    },
    created () {
      if (this.$route.query.code || this.schemeCode) {
        this._getSchemeDetail()
      }
      this._getPayRecyle()
      this._getOrgList()
    },
    computed: {
      ...mapGetters([
        'schemeCode'
      ])
    },
    mounted () {
    },
    methods: {
      upData (val) {
        debugger
        if(val.length > 1){
          this.$message.warning("一次仅能选择一个")
          return 
        }

        if (val.length) {
          let addEmpArr = val.map(item => {
              // 组织
            return {
              Id: item.EmpId,
              Name: item.OrgName,
              Children: item.Children,
              Code: item.Code,
              EmpId: item.EmpId,
              EmpName: item.EmpName,
              EmpNo: item.EmpNo,
              JobName: item.JobName,
              Name: item.Name,
              NodeId: item.NodeId,
              NodeType: item.NodeType,
              OrgName: item.OrgName,
              ParentId: item.ParentId,
              PositionName: item.PositionName                                 
            } 
          })

          this.selectedList = this.selectedList.concat(addEmpArr)
          // 去重
        //   let newArr = []
        //   if (this.selectedList && this.selectedList.length) {
        //     this.selectedList.forEach((item,key) => {
        //       if(item.Id){
        //         newArr.push(item.Id)
        //       }else {
        //         this.selectedList.splice(key,1)
        //       }
        //     })
        //   }

        //   if (newArr.length && newArr.length >= 2) {
        //     for (let i = 0; i < newArr.length; i++) {
        //       if (newArr.indexOf(newArr[i]) !== i) {
        //           newArr.splice(i, 1)
        //           this.selectedList.splice(i, 1)
        //           --i
        //       }
        //     }
        //   }
        // } else {

        }

        // this.currentSelectObj = this.selectedList[0]
        // this.$emit('changeEmp', this.selectedList)
        this.strJson1['Tid'] = addEmpArr[0].EmpId
      },
      _getSchemeDetail () {
        getSchemeDetail(this.$route.query.code || this.schemeCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.projectObj = res.data.Data
          } else {
            Message.error('获取方案详情失败，请重试！')
          }
        }).catch(() => {
          Message.error('获取方案详情失败，请重试！')
        })
      },
      _getPayRecyle () {
        getPayRecyle().then(res => {
          if (res.data.State === REQ_OK) {
            let arr = []
            let data = res.data.Data
            if (data) {
              data.forEach((item) => {
                let obj = {
                  value: item.UniCode,
                  label: item.Name,
                  times: item.OperateCode.slice(1),
                  child: item.Selector
                }
                arr.push(obj)
              })
              this.PayRecycle = arr
            }
          } else {
            Message.error('发薪日期获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('发薪日期获取失败，请刷新重试！')
        })
      },
      _getOrgList () {
        getOrgList().then((res) => {
          if (res.data.State === REQ_OK) {
            let arr = res.data.Data
            this.tidList = this.recursionFn(arr)
          } else {
            Message.error('组织列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('组织列表获取失败，请重试！')
        })
      },
      BeginDateFn (day) {
        this.strJson1.BeginDate = day
        this.$refs.ruleForm.validateField('BeginDate')
      },
      EndDateFn (day) {
        this.strJson1.EndDate = day
        this.$refs.ruleForm.validateField('EndDate')
      },
      setCheckedNode () {
        this.tidVisible = true
        if (this.strJson1.TidArr.length > 0) {
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
        this.strJson1.Tid = result.toString()
        this.strJson1.TidArr = arr
      },
      delOrgIem (item) {
        this.strJson1.TidArr = this.strJson1.TidArr.filter(i => {
          return i !== item
        })
        let result = []
        this.defaultCheck = []
        this.strJson1.TidArr.forEach((item) => {
          let name = item.label
          let val = item.value
          result.push(name)
          this.defaultCheck.push(val)
        })
        this.strJson1.Tid = result.toString()
      },
      next () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.checkedTimes()
            let obj = this.getStrJson2()
            addProject(JSON.stringify(this.strJson1), JSON.stringify(obj)).then((res) => {
              if (res.data.State === REQ_OK) {
                this.SchemeCode = res.data.Data
                this.setSchemeCode(res.data.Data)
                this.$emit('next', this.strJson1.TidArr)
                console.log(this.strJson1.TidArr)
              } else {
                Message.error('保存失败，请重试！')
              }
            }).catch(() => {
              Message.error('保存失败，请重试！')
            })
          }
        })
        // this.$emit('next', this.strJson1)
      },
      cancel () {
        this.$emit('cancel')
      },
      getStrJson2 () {
        let arr = this.strJson1.TidArr
        let result = []
        arr.forEach((item) => {
          let code = item.value
          result.push(code)
        })
        let obj = [{'Tid': 1, 'Code': result}]
        return obj
      },
      PayRecycleChange (val) {
        let item = this.PayRecycle.filter((i) => {
          return i.value === val
        })
        if (item && item[0].times === '2') {
          this.PayDateContent1 = item[0].child
          this.PayDateContent2 = item[0].child
          this.times = true
        } else {
          this.PayDateContent1 = item[0].child
          this.times = false
        }
      },
      PayDateContentFn1 (val) {
        this.strJson1.PayDateContentD1 = val
        this.$refs.ruleForm.validateField('PayDateContentD1')
      },
      PayDateContentFn2 (val) {
        this.strJson1.PayDateContentD2 = val
        this.$refs.ruleForm.validateField('PayDateContentD2')
      },
      checkedTimes () {
        if (this.times) {
          this.strJson1.PayDateContent = [
            {
              Month: this.strJson1.PayDateContentM1,
              Date: this.strJson1.PayDateContentD1
            },
            {
              Month: this.strJson1.PayDateContentM2,
              Date: this.strJson1.PayDateContentD2
            }
          ]
        } else {
          this.strJson1.PayDateContent = [
            {
              Month: this.strJson1.PayDateContentM1,
              Date: this.strJson1.PayDateContentD1
            }
          ]
        }
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
      PayDateChange (parentCode, code) {
        let item
        this.PayRecycle.forEach(i => {
          if (parentCode === i.value) {
            item = i.child.filter(k => {
              return k.Value === code.toString()
            })
          }
        })
        return item[0].Label
      },
      ...mapMutations({
        setSchemeCode: 'SET_SCHEME_CODE'
      })
    },
    watch: {
      'projectObj': {
        handler (curVal, oldVal) {
          this.strJson1 = Object.assign(this.strJson1, curVal)
          this.strJson1.PayDateContentM1 = this.strJson1.PayDate[0].Month.toString()
          this.strJson1.PayDateContentD1 = this.strJson1.PayDate[0].Date
          if (this.strJson1.PayDate.length > 1) {
            this.strJson1.PayDateContentM2 = this.strJson1.PayDate[1].Month.toString()
            this.strJson1.PayDateContentD2 = this.strJson1.PayDate[1].Date
          }
          this.PayRecycleChange(this.strJson1.PayRecycle)
          let TidArr = []
          this.strJson1.TidArr = TidArrForEach(this.strJson1.SchemeOrgList)
          function TidArrForEach (arr) {
            arr.forEach((item) => {
              let obj = {
                value: item.OrgCode,
                label: item.OrgName
              }
              if (item.Child && item.Child.length > 0) {
                TidArrForEach(item.Child)
              }
              TidArr.push(obj)
            })
            return TidArr
          }
          let result = []
          this.strJson1.TidArr.forEach((item) => {
            let name = item.label
            let val = item.value
            result.push(name)
            this.defaultCheck.push(val)
          })
          this.strJson1.Tid = result.toString()
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .set-salary
    padding 30px
    .form-item
      .el-form-item__content
        margin-left 0!important
    .row-item
      .div-selected
        display: inline-block
        line-height: normal
        max-width: 282px
        min-width: 282px
        min-height 38px
        border: 1px solid #d8dce5
        border-radius: 4px
        vertical-align: top
    .dialog-footer
      margin 0 auto
      text-align center
      margin-top 40px
</style>
