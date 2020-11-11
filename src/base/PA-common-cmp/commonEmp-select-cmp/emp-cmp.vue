<!--
  User: gaol
  Date: 2019/5/23
  功能：人员选择器组件
-->

<template>
  <div class="org-cmp-container">
    <div class="content-container">
      <el-card class="left-card-container">
        <div class="search-container">
          <el-input
            placeholder="姓名、员工号、岗位"
            class="flex-1"
            size="mini"
            clearable
            v-model="StrJson.KeyWord"
            @clear="handleLeftEnter"
            @keyup.enter.native="handleLeftEnter">
          </el-input>
          <el-tooltip class="item" effect="dark" content="关键词批量输入" placement="bottom">
            <el-button type="primary" icon="el-icon-plus" size="mini"
                       class="mg-l-5"
                       @click.native="dialogBrancheKeyWord = true"></el-button>
          </el-tooltip>
        </div>
        <div class="search-container">
          <el-select v-model="StrJson.EmpType" clearable multiple placeholder="请选择员工类型" size="mini" @change="_getEmp" class="flex-1">
            <el-option
              v-for="item in empTypelist"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id">
            </el-option>
          </el-select>
          <el-select class="flex-1" v-model="StrJson.EmpStatus" clearable multiple placeholder="请选择员工状态" size="mini" style="margin-left: 5px" @change="_getEmp">
            <el-option
              v-for="item in empStatusList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id">
            </el-option>
          </el-select>
        </div>

        <div class="search-container">
          <el-select v-model="StrJson.SelType" clearable @change="handleChangeJobType" placeholder="请选择查询标签" size="mini" class="flex-1">
            <el-option
              v-for="item in SelTypeList"
              :key="item.code"
              :label="item.val"
              :value="item.code">
            </el-option>
          </el-select>
          
          <el-select v-model="StrJson.SelValue" @change="handleChangeJobVal" clearable multiple placeholder="请选择" size="mini" class="flex-1" style="margin-left: 5px" >
            <el-option
              v-for="item in jobList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>

        <div class="search-container">
          <el-input
            class="flex-1"
            size="mini"
            disabled
            v-model="strOrg"
            @clear="handleLeftEnter"
            @keyup.enter.native="handleLeftEnter">
          </el-input>
          <el-tooltip class="item" effect="dark" content="选择组织" placement="bottom">
            <el-button type="primary" icon="el-icon-plus" size="mini"
                       class="mg-l-5"
                       @click.native="dialogOrgFilter = true"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
            <el-button type="primary" icon="el-icon-search" size="mini" class="mg-l-5" @click.native="handleLeftEnter">搜索</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
            <el-button type="primary" icon="el-icon-refresh" size="mini" class="mg-l-5" @click.native="handleEmpty">重置</el-button>
          </el-tooltip>
        </div>
        <el-radio-group v-model="TabId" style="margin-bottom: 10px;" size="mini" @change="_getEmp()">
          <el-radio-button label="1" v-show="nextStepAccepterEmpArr.length<=0">同组织</el-radio-button>
          <el-radio-button label="2" v-show="nextStepAccepterEmpArr.length<=0">我的下属</el-radio-button>
          <el-radio-button label="3" v-show="nextStepAccepterEmpArr.length<=0">组织</el-radio-button>
          <el-radio-button label="4" v-show="nextStepAccepterEmpArr.length<=0">岗位</el-radio-button>
          <el-radio-button label="5" v-show="nextStepAccepterEmpArr.length<=0">角色</el-radio-button>
          <el-radio-button label="6" v-show="nextStepAccepterEmpArr.length<=0">群组</el-radio-button>
          <el-radio-button label="7" v-show="nextStepAccepterEmpArr.length>0">待选择</el-radio-button>
        </el-radio-group>
        <div style="margin-bottom: 10px; text-align: right;">
          <el-tooltip class="item" effect="dark" content="添加已选择" placement="bottom">
            <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="!leftSelectedList.length" @click.native="handleAddSelected"></el-button>
          </el-tooltip>
        </div>
        <!-- TabId: {{TabId}}----------
        nextStepAccepterEmpArr: {{nextStepAccepterEmpArr}}-----
        leftDataList: {{leftDataList}} -->
        <div v-show="TabId === '1'" v-loading="loading">
          <el-table
            :data="leftDataList"
            height="320"
            border
            ref="leftTable"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              :reserve-selection="false"
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="EmpName"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              prop="EmpNo"
              label="工号"
            >
            </el-table-column>
            <el-table-column
              prop="OrgName"
              label="所属组织"
            >
            </el-table-column>
            <el-table-column
              prop="JobName"
              label="职位名称"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            layout="total, prev, pager, next"
            :page-size="pageSize"
            :pager-count="5"
            :total="total">
          </el-pagination>
        </div>
        <div v-show="TabId === '3' || TabId === '4'" v-loading="loading">
          <div style="height: 300px">
            <el-scrollbar style="height: 100%">
              <el-tree
                :data="leftDataList"
                ref="orgTree"
                show-checkbox
                node-key="EmpId"
                :props="defaultProps"
                @check="orgTreeChange"
              >
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
        <!--<div v-show="TabId === '4'" v-loading="loading">-->
        <!--<div style="height: 300px">-->
        <!--<el-scrollbar style="height: 100%">-->
        <!--<el-tree-->
        <!--:data="leftDataList"-->
        <!--ref="orgTree"-->
        <!--show-checkbox-->
        <!--node-key="EmpId"-->
        <!--:props="defaultProps"-->
        <!--@check="orgTreeChange"-->
        <!--&gt;-->
        <!--</el-tree>-->
        <!--</el-scrollbar>-->
        <!--</div>-->
        <!--</div>-->
      </el-card>

      <!--右边的表格区--start-->
      <el-card class="right-card-container">
        <div class="search-container">
          <el-input
            placeholder="请输入关键词"
            class="flex-1"
            size="mini"
            clearable
            v-model="rightKeyWord"
            @clear="handleRightEnter"
            @keyup.enter.native="handleRightEnter">
          </el-input>
          <el-button class="mg-l-5" type="primary" icon="el-icon-search" size="mini" @click.native="handleRightEnter"></el-button>
        </div>
        <div style="margin-bottom: 10px">
          <el-tooltip class="item" effect="dark" content="移除已选择" placement="bottom">
            <el-button type="primary" icon="el-icon-delete" size="mini" :disabled="!rightSelectedList.length" @click.native="handleDelSelected">
            </el-button>
          </el-tooltip>
        </div>
        <el-table
          :data="rightDataList"
          height="474"
          border
          ref="rightTable"
          @selection-change="handleSelectedChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="EmpName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="EmpNo"
            label="工号"
          >
          </el-table-column>
          <el-table-column
            prop="OrgName"
            label="所属组织"
          >
          </el-table-column>
          <el-table-column
            prop="JobName"
            label="职位名称"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total"
          :total="rightDataList.length">
        </el-pagination>
      </el-card>
      <!--右边的表格区--start-->

    </div>

    <!--点击 按姓名、员工号、岗位-批量输入后的弹框--start-->
    <el-dialog
      title="关键词批量输入"
      :visible.sync="dialogBrancheKeyWord"
      width="500px"
      :show-close="false"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <div>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="keyWordTextarea">
        </el-input>
      </div>
      <p>*请一行输入一个信息，如：</p>
      <p>90001</p>
      <p>90002</p>
      <save-footer
        :isCancel="true"
        saveText="确认"
        @cancel="dialogBrancheKeyWord = false"
        @save="handleClickSaveKT">
      </save-footer>
    </el-dialog>
    <!--点击 按姓名、员工号、岗位-批量输入后的弹框--start-->

    <!---组织筛选的弹框--start--->
    <el-dialog
      title="组织筛选"
      :visible.sync="dialogOrgFilter"
      width="400px"
      :show-close="false"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <org-tree @cancel="dialogOrgFilter = false" @save="handleSaveOrgFilter"></org-tree>
    </el-dialog>
    <!---组织筛选的弹框--end--->

    <save-footer
      :isCancel="true"
      cancelText="关闭"
      saveText="确认"
      @cancel="handleClickCancelEmp"
      @save="handleClickSaveEmp">
    </save-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getEmpList, getEmpType, getEmpStatus } from '@/api/common-dic'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import OrgTree from './org-tree'
  import { companyStructureMixin } from '@/utils/companyStructureMixin'

  export default {
    mixins: [companyStructureMixin],
    props: {
      nextStepAccepterEmpArr: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        StrJson: {
          KeyWord: '',
          EmpStatus: [],
          EmpType: [],
          SelType: '',
          SelValue: [],
          OrgId: '',
          Mx: ''
        }, // 组织筛选对象
        strOrg: '',
        empTypelist: [], // 员工类型列表
        empStatusList: [], // 员工状态列表
        TabId: '1', // Tab分类
        SelTypeList: [
          {
            val: '职层',
            code: 'JobLevel'
          },
          {
            val: '职级',
            code: 'JobGrade'
          }
        ], // 职层类别
        pageSize: 20, // 分页每页展示数量
        pageIndex: 1, // 分页当前页
        total: 0, // 分页总数
        loading: false, // 组织loading
        leftDataList: [], // 获取的人员列表
        leftSelectedList: [], // 左边选中的组织列表
        rightDataList: [], // 右边表格数据
        nativeDataList: [], // 本地数据 
        rightSelectedList: [], // 右边选中的组织列表
        dialogBrancheKeyWord: false, // 关键词批量输入弹窗
        keyWordTextarea: '', // 关键词批量输入input
        rightKeyWord: '', // 右边搜索框
        newData: false,
        defaultProps: {
          children: 'Children',
          label: 'Name'
        }, // 组织树默认的props
        dialogOrgFilter: false
      }
    },
    created () {
      this._getEmpType()
      this._getEmpStatus()
      this._getEmp()
    },
    methods: {
      // 员工类型
      _getEmpType () {
        getEmpType().then(res => {
          if (res.data.State === REQ_OK) {
            this.empTypelist = res.data.Data
          }
        })
      },
      // 员工状态
      _getEmpStatus () {
        getEmpStatus().then(res => {
          if (res.data.State === REQ_OK) {
            this.empStatusList = res.data.Data
          }
        })
      },
      // 获取人员
      _getEmp () {
        debugger
        if( this.nextStepAccepterEmpArr && this.nextStepAccepterEmpArr.length ){
          debugger
          // 有下一步操作人，直接显示指定的人员列表
          this.leftDataList = this.nextStepAccepterEmpArr.map((item) => {
            return {
              EmpName: item.Name || '',
              EmpNo: item.EmpNo || '',
              Id: item.Id || '',
              OrgName: '--',
              JobName: '--'
            }
          })
          this.total = this.nextStepAccepterEmpArr.length
          debugger
        }else {
          // 获取所有的人员
          this.loading = true
          getEmpList('WorkFlow', this.TabId, JSON.stringify(this.StrJson), this.pageSize, this.pageIndex).then(res => {
            this.loading = false
            if (res.data.State === REQ_OK) {
              this.leftDataList = res.data.Data
              this.total = res.data.Total
              if (this.rightDataList.length) {
                this.toggleSelection(this.rightDataList, true)
                let empIds = this.rightDataList.map(item => {
                  return item.EmpId
                })
                setTimeout(() => {
                  this.$refs.orgTree.setCheckedKeys(empIds, true, true)
                }, 1000)
                this.newData = true
              }
            } else {
              this.$message.error(`获取数据列表失败${res.data.Error}`)
            }
          }).catch(() => {
            this.loading = false
            this.$message.error('获取数据列表失败')
          })
        }
      },
      // 左边输入框回车事件
      handleLeftEnter () {
        this._getEmp()
      },
      // 组织筛选弹窗确认
      handleSaveOrgFilter (org) {
        this.dialogOrgFilter = false
        let ids = []
        let names = []
        if (org && org.length) {
          org.forEach(item => {
            ids.push(item.NodeId)
            names.push(item.Name)
          })
        }
        this.strOrg = names.toString()
        this.StrJson.OrgId = ids.toString()
      },
      // 切换职层值
      handleChangeJobVal () {
        this._getEmp()
      },
      // 重置
      handleEmpty () {
        this.StrJson = {
          KeyWord: '',
          EmpStatus: [],
          EmpType: [],
          SelType: '',
          SelValue: [],
          OrgId: '',
          Mx: ''
        }
        this._getEmp()
      },
      // 右边输入框回车事件
      handleRightEnter () {

      },
      // 关键词批量输入
      handleClickSaveKT () {
        if (this.keyWordTextarea) {
          this.StrJson.KeyWord = this.keyWordTextarea.split('\n').toString()
        }
        this.dialogBrancheKeyWord = false
      },
      // 点击左边checkbox
      handleSelectionChange (val) {
        debugger
        this.leftSelectedList = val
        if (!val.length && this.newData && this.nativeDataList.length) {
          this.toggleSelection(this.nativeDataList, true)
          this.newData = false
        }
      },
      // 点击左边新增
      handleAddSelected () {
        debugger
        if( this.nextStepAccepterEmpArr && this.nextStepAccepterEmpArr.length ){
          // 下一步操作人 指定的员工
          this.leftSelectedList.forEach(item => {
            let bool = this.nativeDataList.some(i => {
              return i.EmpNo === item.EmpNo
            })
            if (!bool) {
              this.nativeDataList.push(item)
            }
            if (!bool) {
              this.rightDataList.push(item)
            }
          })          
        }else {
          this.leftSelectedList.forEach(item => {
            let bool = this.nativeDataList.some(i => {
              return i.EmpId === item.EmpId
            })
            if (!bool) {
              this.nativeDataList.push(item)
            }
            if (!bool) {
              this.rightDataList.push(item)
            }
          })
        }
      },
      // 点击右边checkbox
      handleSelectedChange (val) {
        this.rightSelectedList = val
      },
      // 点击右边删除
      handleDelSelected () {
        if (this.TabId === '1' || this.TabId === '2') {
          this.rightSelectedList.forEach(item => {
            this.rightDataList.forEach((i, index) => {
              if (i.EmpId === item.EmpId) {
                this.rightDataList.splice(index, 1)
              }
            })
            this.nativeDataList.forEach((i, index) => {
              if (i.EmpId === item.EmpId) {
                this.nativeDataList.splice(index, 1)
              }
            })
          })
          this.toggleSelection(this.rightSelectedList, false)
        }
        if (this.TabId === '3' || this.TabId === '4' || this.TabId === '5' || this.TabId === '6') {
          this.rightSelectedList.forEach(item => {
            this.rightDataList.forEach((i, index) => {
              if (i.EmpId === item.EmpId) {
                this.rightDataList.splice(index, 1)
                this.$refs.orgTree.setChecked(item.EmpId, false)
              }
            })
            this.nativeDataList.forEach((i, index) => {
              if (i.EmpId === item.EmpId) {
                this.nativeDataList.splice(index, 1)
              }
            })
          })
        }
      },
      // 切换选中状态
      toggleSelection (rows, bool) {
        if (rows) {
          rows.forEach(row => {
            this.leftDataList.forEach((item, index) => {
              if (row.EmpId === item.EmpId) {
                this.$refs.leftTable.toggleRowSelection(this.leftDataList[index], bool)
              }
            })
          })
        } else {
          this.$refs.leftTable.clearSelection()
        }
      },
      // 点击组织树checkbox
      orgTreeChange (param1, param2) {
        if (param2.checkedNodes.length) {
          let arr = param2.checkedNodes.filter(item => {
            return item.NodeType === 1
          })
          arr.forEach(item => {
            let bool = this.nativeDataList.some(i => {
              return i.EmpId === item.EmpId
            })
            if (!bool) {
              this.rightDataList.push(item)
            }
            if (!bool) {
              this.nativeDataList.push(item)
            }
          })
        }
      },
      // 保存人员
      handleClickSaveEmp () {
        debugger
        if (this.nativeDataList && this.nativeDataList.length) {
          // 应为 从 out-contition中到此组件中间过程有很多 中间层的组件，通过 $listener 可以向上传递事件
          this.$emit('upData', this.nativeDataList)
  
          this.$bus.$emit('saveEmp', this.nativeDataList)
          // this.$message.success('保存成功')
          setTimeout(() => {
            this.handleClickCancelEmp()
          }, 300)
        } else {
          this.$confirm('未选择任何人员，确认保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('upData', this.nativeDataList)
            
            this.$bus.$emit('saveEmp', this.nativeDataList)
            setTimeout(() => {
              this.handleClickCancelEmp()              
            }, 300)
            // this.$message.success('保存成功')
          }).catch(() => {
          })
        }
      },
      // 关闭人员
      handleClickCancelEmp () {
        // this.$bus.$emit('closeStructureCmp')
        this.$emit('closeStructureCmp')
      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.pageSize = val
        this._getPosition()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.pageIndex = val
        this._getPosition()
      }
    },
    components: {
      SaveFooter,
      OrgTree
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .org-cmp-container
    .content-container
      display flex
      .left-card-container /deep/
        flex 1
        .search-container
          display flex
          margin-bottom 10px
          .flex-1
            flex 1
          .mg-l-5
            margin-left 5px
        .include-check
          width 100%
          box-sizing border-box
          padding 0 24px
          border-bottom 1px solid #dedede
        .el-scrollbar__wrap
          overflow-x hidden
      .right-card-container
        flex 1
        .search-container
          display flex
          margin-bottom 10px
          .flex-1
            flex 1
          .mg-l-5
            margin-left 5px
</style>
