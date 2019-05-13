<!--
  User: xxxxxxx
  Date: 2018/1/2
  功能：xxxxxx
-->

<template>
  <div class="set-project" id="set-project">
    <el-card class="box-card" style="margin-bottom: 30px">
      <div slot="header" class="clearfix">
        <span>提示</span>
      </div>
      <div class="text item">
        优惠奖金，离职补偿金，期权，劳务费等特殊计税项目，必须在已预留项目进行维护方可运算。
      </div>
    </el-card>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in TaxType" :label="item.Name" :name="item.UniCode" :key="item.UniCode"></el-tab-pane>
    </el-tabs>

    <div class="clear-float" style="margin-top: 7px;float: right">

      <el-button class="add-btn" type="primary" size="small" @click="handleCreate">
        新增
      </el-button>

      <el-button class="stop-btn" size="small" @click="changeProjectState(0)">
        停用
      </el-button>

      <el-button class="start-btn" size="small" @click="changeProjectState(1)">
        启用
      </el-button>

    </div>

    <el-collapse v-model="activeNames" style="width: 100%;" id="el-collapse">
      <el-collapse-item :title="i.Name" :name="i.Name" v-for="i in TermProjectDic" :key="i.UniCode">
        <el-table :data="i.children"
                  :ref="i.OperateCode"
                  border
                  highlight-current-row
                  @select="select"
                  @select-all="selectAll"
                  @row-click="rowClick"
        >

          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>

          <el-table-column label="项目" align="center" prop="Name">
            <template slot-scope="scope">
              <span class="data" :data-id="scope.row.Code">
                {{scope.row.Name}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="类型" align="center" prop="TypeName">
          </el-table-column>

          <el-table-column label="属性" align="center" prop="AttributeName">
          </el-table-column>

          <el-table-column label="状态" align="center" prop="Status">
            <template slot-scope="scope">
              <span v-html="scope.row.Status === 1 ? '启用' : '停用'"></span>
            </template>
          </el-table-column>

          <el-table-column label="发放规则" align="center" prop="PayMethodName">
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-html="scope.row.Status === 1 ? '停用' : '启用'"
                @click="startOrStop(scope.row)"
              >
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="handleCreate(scope.row.Code)"
              >编辑
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-collapse-item>
    </el-collapse>

    <div slot="footer" class="dialog-footer">
      <el-button @click="pre()">上一步</el-button>
      <el-button type="primary" @click="next()">下一步</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>

    <add-project-type
      ref="addProjectType"
      :SchemeCode="SchemeCode"
      :TermList="TermList"
      :TidArr="TidArr"
      @addSuccess="addSuccess"
      @updateSuccess="updateSuccess"
    ></add-project-type>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getTermList, getTermProject, changeTermStatus, getTerm, getTaxType } from '@/api/salary'
  import { Message } from 'element-ui'
  import AddProjectType from '@/components/salary/salaryRule/addProjectType'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      TidArr: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        activeNames: [],
        TermProjectDic: [],
        TermList: [],
        TaxType: [],
        multipleSelection: [],
        activeName: '',
        isVisibleAddProjectType: false,
        SchemeCode: ''
      }
    },
    created () {
      this.SchemeCode = this.schemeCode
      this._getTermProject()
      this._getTaxType()
    },
    computed: {
      ...mapGetters([
        'schemeCode'
      ])
    },
    methods: {
      _getTermProject () {
        getTermProject().then(res => {
          if (res.data.State === REQ_OK) {
            if (res.data.State === REQ_OK) {
              this.TermProjectDic = res.data.Data
            } else {
              Message.error('获取所属项目失败，请重试！')
            }
          }
        }).catch(() => {
          Message.error('获取所属项目失败，请重试！')
        })
      },
      _getTermList () {
        if (this.activeName) {
          getTermList(this.$route.query.code || this.SchemeCode, this.activeName).then(res => {
            if (res.data.State === REQ_OK) {
              this.TermList = res.data.Data
              this.TermProjectDic = this.foreachFn(this.TermProjectDic, this.TermList)
            } else {
              Message.error('获取薪资项目列表失败，请重试！')
            }
          }).catch(() => {
            Message.error('获取薪资项目列表失败，请重试！')
          })
        }
      },
      _getTaxType () {
        getTaxType().then(res => {
          if (res.data.State === REQ_OK) {
            this.TaxType = res.data.Data
            this.activeName = this.TaxType[0].UniCode
            this._getTermList()
          } else {
            Message.error('获取计税类型列表失败，请重试！')
          }
        }).catch(() => {
          Message.error('获取计税类型列表失败，请重试！')
        })
      },
      _updateTermList () {
        getTermList(this.$route.query.code || this.SchemeCode, this.activeName).then(res => {
          if (res.data.State === REQ_OK) {
            this.TermList = res.data.Data
            this.TermProjectDic = this.foreachFn(this.TermProjectDic, this.TermList)
          } else {
            Message.error('更新列表失败，请重试！')
          }
        }).catch(() => {
          Message.error('更新列表失败，请重试！')
        })
      },
      changeProjectState (state) {
        let tbodys = document.getElementById('el-collapse').getElementsByTagName('tbody')
        let endArr = []
        for (let i = 0; i < tbodys.length; i++) {
          let nodeTr = tbodys[i].getElementsByTagName('tr')
          for (let j = 0; j < nodeTr.length; j++) {
            let nodeLabel = nodeTr[j].getElementsByTagName('label')[0].classList.contains('is-checked')
            if (nodeLabel) {
              let nodeSpan = nodeTr[j].getElementsByClassName('data')[0].getAttribute('data-id')
              endArr.push(nodeSpan)
            }
          }
        }
        changeTermStatus(JSON.stringify(endArr), state).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('更改状态成功！')
            this._getTermList()
          } else {
            Message.error('更改状态失败，请重试！')
          }
        }).catch(() => {
          Message.error('更改状态失败，请重试！')
        })
      },
      rowClick (row) {
        this.$refs[row.OperateCode][0].toggleRowSelection(row)
      },
      startOrStop (item) {
        changeTermStatus(item.Code, (item.Status === 1 ? 0 : 1)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('更改状态成功！')
            this._getTermList()
          } else {
            Message.error('更改状态失败，请重试！')
          }
        }).catch(() => {
          Message.error('更改状态失败，请重试！')
        })
      },
      foreachFn (arr, childArr) {
        let result = []
        arr.forEach((item) => {
          this.activeNames.push(item.Name)
          let obj = {
            Name: item.Name,
            UniCode: item.UniCode,
            OperateCode: item.OperateCode,
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
      handleCreate (code) {
        console.log(code)
        if (typeof code === 'string') {
          getTerm(code).then(res => {
            if (res.data.State === REQ_OK) {
              this.isVisibleAddProjectType = true
              this.$refs.addProjectType.editorType(res.data.Data)
            } else {
              Message.error('项目详情加载失败，请重试！')
            }
          }).catch(() => {
            Message.error('项目详情加载失败，请重试！')
          })
        } else {
          this.$refs.addProjectType.show(this.activeName)
        }
      },
      handleClick () {
        this._getTermList()
      },
      addSuccess (obj) {
        this.TermProjectDic.forEach(item => {
          if (item.UniCode === obj.ProjectCode) {
            if (obj.Code) {
              item.children = item.children.filter(i => {
                return i.Code !== obj.Code
              })
            }
            item.children.push(obj)
          }
        })
        this.TermList.push(obj)
        // this._getTermProject()
      },
      updateSuccess () {
        this._updateTermList()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      select (aaa, bbb) {
        // 手动勾选
      },
      selectAll (aaa, bbb) {
        // 手动勾选全部
      },
      pre () {
        this.$emit('pre')
      },
      next () {
        // this.$refs.ruleForm.validate((valid) => {
        //   if (valid) {
        //     console.log('strJson1', this.strJson1)
        //     this.$emit('next')
        //   }
        // })
        this.$emit('next')
      },
      cancel () {
        this.$emit('cancel')
      }
    },
    watch: {
      // 'projectObj': {
      //   handler (curVal, oldVal) {
      //     this.isEditor = true
      //     this.TermList = curVal.TermList
      //     this.TermProjectDic = this.foreachFn(this.TermProjectDic, this.TermList)
      //   },
      //   deep: true
      // }
    },
    components: {
      AddProjectType
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .set-project
    padding 30px
    .el-tabs
      width 460px
      display inline-block
      .el-tabs__nav-wrap::after
        background-color #ffffff
    .dialog-footer
      margin 0 auto
      text-align center
      margin-top 40px
    .cell
      text-align center
</style>
