<template>
  <el-dialog title="新增个税城市"
             :visible.sync="taxCityVisible"
             class="max-dialog-item"
             :class="EmpIds.length > 0 ? '' : 'noEmpIds'"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
  >

    <el-tree
      style="width: 220px;display: inline-block;vertical-align: top"
      :data="EmpIds"
      show-checkbox
      node-key="id"
      ref="taxCityTree"
      expand-on-click-node
      highlight-current
      class="change-person"
      v-if="EmpIds.length > 0"
    >
    </el-tree>

    <el-form style="width: 630px;display: inline-block"
             class="small-space"
             ref="newTaxCityform"
             :model="newTaxCityObj"
             label-width="85px"
             :rules="newTaxCityObjRules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="生效日期" class="postInfo-container-item" prop="BeginDate">
            <el-date-picker
              v-model="newTaxCityObj.BeginDate"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期时间"
              style="width: 217px"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="城市" prop="CityId">

            <el-cascader
              v-model="newTaxCityObj.CityId"
              :options="citys"
              :props="props"
            ></el-cascader>

          </el-form-item>
        </el-col>

      </el-row>

      <el-form-item label="免税额" prop="CityId">
        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入免税额" v-model="newTaxCityObj.Amount">
        </el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelTaxCity">取 消</el-button>
      <el-button type="primary" @click="saveTaxCity()">保存</el-button>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { Message } from 'element-ui'
  export default {
    props: {
      SchemeCode: {
        type: String,
        default: ''
      },
      EmpIds: {
        type: Array,
        default: () => {
          return []
        }
      },
      empId: {
        type: Number,
        default: null
      },
      citys: {
        type: Array,
        default: []
      },
      modifyTaxCityObj: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        newTaxCityObj: {
          CityId: [],
          EmpIds: '',
          BeginDate: null,
          Amount: 3500
        },
        props: {
          value: 'Id',
          label: 'Name',
          children: 'Child'
        },
        newTaxCityObjRules: {
          BeginDate: [
            { type: 'date', required: true, message: '请选择生效日期', trigger: 'change' }
          ],
          CityId: [
            { type: 'array', required: true, message: '请选择城市', trigger: 'change' }
          ],
          Amount: [
            { type: 'number', required: true, message: '请输入免税额', trigger: 'blur' }
          ]
        },
        taxCityVisible: true
      }
    },
    mounted () {
      if (this.modifyTaxCityObj) {
        this.newTaxCityObj.Id = this.modifyTaxCityObj.Id
        this.newTaxCityObj.BeginDate = new Date(this.replaceTime(this.modifyTaxCityObj.BeginDate))
        this.newTaxCityObj.Amount = this.modifyTaxCityObj.Amount
        this.newTaxCityObj.CityId = [this.modifyTaxCityObj.PId, this.modifyTaxCityObj.CityId]
      }
    },
    methods: {
      saveTaxCity () {
        this.$refs.newTaxCityform.validate((valid) => {
          if (valid) {
            let arr = this.$refs.taxCityTree.getCheckedNodes()
            if (!arr.length && !this.empId) {
              return Message.error('请选择员工')
            } else if (!this.empId) {
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
              this.newTaxCityObj.EmpIds = JSON.stringify(result)
            } else {
              this.newTaxCityObj.EmpIds = this.empId
            }
            let obj = Object.assign({}, this.newTaxCityObj)
            obj.CityId = obj.CityId[1]
            this.$emit('saveTaxCity', obj)
          }
        })
      },
      cancelTaxCity () {
        this.$emit('cancelTaxCity')
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
  .max-dialog-item
    .el-dialog
      width 900px
    .change-person
      .el-tree-node__children
        max-height: 300px;
        overflow-y: scroll;
  .noEmpIds
    .el-dialog
      width 680px
</style>
