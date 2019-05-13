<template>
  <div class="set-approve">
    <div style="text-align: center">

      <el-cascader
        :options="options"
        placeholder="试试搜索：市场部"
        change-on-select
        v-model="param.ParentOrgCode"
        @change="handleFilter"
        clearable
        filterable
      ></el-cascader>

      <el-input @keyup.enter.native="handleFilter"
                style="width: 400px; margin-bottom: 20px"
                class="filter-item"
                placeholder="请输入审批人名称"
                v-model="param.KeyWord"
      >
      </el-input>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

      <el-table
        :data="tableData"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 715px; margin: 0 auto"
      >
        <el-table-column label="选择" width="200px">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.PositionCode"></el-radio>
          </template>
        </el-table-column>

        <el-table-column
          property="PositionName"
          label="名称">
        </el-table-column>
      </el-table>

    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="pre()">上一步</el-button>
      <el-button type="primary" @click="next()">保 存</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { getSchemeDetail, updateCheckPosition } from '@/api/salary'
  import { getOrgList, getPositionList } from '@/api/permission'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    props: {
    },
    data () {
      return {
        projectObj: {},
        options: [],
        param: {
          KeyWord: '',
          ParentOrgCode: []
        },
        tableData: [],
        currentRow: null,
        radio: null
      }
    },
    created () {
      this._getSchemeDetail()
      this._getOrgList()
      this._getPositionList()
    },
    computed: {
      ...mapGetters([
        'schemeCode'
      ])
    },
    methods: {
      _getSchemeDetail () {
        getSchemeDetail(this.$route.query.code || this.schemeCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.projectObj = res.data.Data
          } else {
            Message.error('薪资审批人获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('薪资审批人获取失败，请重试！')
        })
      },
      _getOrgList () {
        getOrgList().then(res => {
          if (res.data.State === REQ_OK) {
            let arr = res.data.Data
            this.options = this.recursionFn(arr)
          }
        })
      },
      _getPositionList () {
        let obj = Object.assign({}, this.param)
        if (obj.ParentOrgCode.length > 0) {
          obj.ParentOrgCode = obj.ParentOrgCode[obj.ParentOrgCode.length - 1].replace(/"/g, '')
        }
        getPositionList(obj).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableData = res.data.Data
          }
        }).catch(() => {
        })
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
      handleFilter () {
        this._getPositionList()
      },
      handleCurrentChange (val) {
        this.currentRow = val
      },
      pre () {
        this.$emit('pre')
      },
      next () {
        updateCheckPosition(this.schemeCode, this.radio).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('保存成功！')
            this.setSchemeCode('')
            this.$emit('next')
          } else {
            Message.error('保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存失败，请重试！')
        })
      },
      cancel () {
        this.$emit('cancel')
      },
      ...mapMutations({
        setSchemeCode: 'SET_SCHEME_CODE'
      })
    },
    watch: {
      'projectObj': {
        handler (curVal, oldVal) {
          this.radio = curVal.CheckPosition
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .set-approve
    padding 30px
    .el-transfer
      display: inline-block
      transform: translateX(50%)
    .dialog-footer
      margin 0 auto
      text-align center
      margin-top 40px
</style>
