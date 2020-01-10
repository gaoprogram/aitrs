<!--
  User: xxxxxxx
  Date: 2019/1/3
  功能：岗位选择器
-->

<template>
  <div class="org-cmp-container">
    <div class="content-container">
      <el-card class="left-card-container">
        <div class="search-container">
          <el-input
            placeholder="岗位、岗位号"
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
          <el-select v-model="StrJson.SelType" @change="handleChangeJobType" placeholder="请选择查询标签" size="mini" class="flex-1">
            <el-option
              v-for="item in SelTypeList"
              :key="item.code"
              :label="item.val"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="StrJson.SelValue" @change="handleChangeJobVal" multiple placeholder="请选择" size="mini" class="mg-l-5">
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
            <el-button type="primary" icon="el-icon-search" size="mini" class="mg-l-5" @click.native="handleLeftEnter">
              搜索
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
            <el-button type="primary" icon="el-icon-refresh" size="mini" class="mg-l-5" @click.native="handleEmpty">重置</el-button>
          </el-tooltip>
        </div>
        <div style="margin-bottom: 10px; text-align: right;">
          <el-tooltip class="item" effect="dark" content="添加已选择" placement="bottom">
            <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="!leftSelectedList.length"
                       @click.native="handleAddSelected"></el-button>
          </el-tooltip>
        </div>
        <el-table
          v-loading="loading"
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
            prop="PositionId"
            label="岗位号"
          >
          </el-table-column>
          <el-table-column
            prop="PositionName"
            label="岗位名称"
          >
          </el-table-column>
          <el-table-column
            prop="OrgName"
            label="组织名称"
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
      </el-card>
      <el-card class="right-card-container">
        <div class="search-container">
          <el-input
            placeholder="请输入岗位名称，岗位号，组织"
            class="flex-1"
            size="mini"
            clearable
            v-model="rightKeyWord"
            @clear="handleClearRight"
            @keyup.enter.native="handleRightEnter">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="mini" class="mg-l-5"
                     @click.native="handleRightEnter"></el-button>
        </div>
        <div style="margin-bottom: 10px">
          <el-tooltip class="item" effect="dark" content="移除已选择" placement="bottom">
            <el-button type="primary" icon="el-icon-delete" size="mini" :disabled="!rightSelectedList.length"
                       @click.native="handleDelSelected"></el-button>
          </el-tooltip>
        </div>
        <el-table
          :data="rightDataList"
          height="396"
          border
          ref="rightTable"
          @selection-change="handleSelectedChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="PositionId"
            label="岗位号"
          >
          </el-table-column>
          <el-table-column
            prop="PositionName"
            label="岗位名称"
          >
          </el-table-column>
          <el-table-column
            prop="OrgName"
            label="组织名称"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total"
          :total="rightDataList.length">
        </el-pagination>
      </el-card>
    </div>
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
    <save-footer
      :isCancel="true"
      cancelText="关闭"
      saveText="确认"
      @cancel="handleClickCancelPos"
      @save="handleClickSavePos">
    </save-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getPosition } from '@/api/common-dic'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import OrgTree from './org-tree'
  import { companyStructureMixin } from '@/utils/companyStructureMixin'

  export default {
    mixins: [companyStructureMixin],
    props: {
      // 组件的id,主要用于区分同一个页面中同时应用此组件的问题
      componentId:{
        type: String,
        default: ''
      }      
    },    
    data () {
      return {
        StrJson: {
          KeyWord: '',
          SelType: '',
          SelValue: [],
          OrgId: ''
        }, // 组织筛选对象
        strOrg: '',
        SelTypeList: [
          {
            val: '职层',
            code: 'JobLevel'
          },
          {
            val: '职级',
            code: 'JobGrade'
          },
          {
            val: '职能类',
            code: 'JobSerial'
          }
        ], // 职层类别
        pageSize: 20, // 分页每页展示数量
        pageIndex: 1, // 分页当前页
        total: 0, // 分页总数
        loading: false, // 组织loading
        leftDataList: [], // 获取的组织列表
        leftSelectedList: [], // 左边选中的组织列表
        rightDataList: [], // 右边表格数据
        nativeDataList: [], // 本地数据
        rightSelectedList: [], // 右边选中的组织列表
        dialogBrancheKeyWord: false, // 关键词批量输入弹窗
        keyWordTextarea: '', // 关键词批量输入input
        rightKeyWord: '', // 右边搜索框
        // 获取row的key值
        dialogOrgFilter: false,
        newData: false
      }
    },
    created () {
      this._getPosition()
    },
    methods: {
      // 获取岗位
      _getPosition () {
        this.loading = true
        getPosition('WorkFlow', JSON.stringify(this.StrJson), this.pageSize, this.pageIndex).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.leftDataList = res.data.Data
            this.total = res.data.DataCount
            if (!this.leftSelectedList.length) {
              if (this.nativeDataList.length) {
                this.toggleSelection(this.nativeDataList, true)
                this.newData = true
              }
            } else {
              this.newData = true
            }
          } else {
            this.$message.error('获取岗位列表失败')
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('获取岗位列表失败')
        })
      },
      // 左边输入框回车事件
      handleLeftEnter () {
        this._getPosition()
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
      // 重置
      handleEmpty () {
        this.StrJson = {
          KeyWord: '',
          SelType: '',
          SelValue: [],
          OrgId: ''
        }
        this._getPosition()
      },
      // 右边输入框回车事件
      handleRightEnter () {
        if (this.nativeDataList.length) {
          this.rightDataList = this.nativeDataList.filter(item => {
            return item.PositionId.includes(this.rightKeyWord) || item.PositionName.includes(this.rightKeyWord) || item.OrgName.includes(this.rightKeyWord)
          })
        }
      },
      // 右边清空
      handleClearRight () {
        this.rightDataList = this.nativeDataList
      },
      // 关键词批量输入
      handleClickSaveKT () {
        if (this.keyWordTextarea) {
          this.StrJson.KeyWord = this.keyWordTextarea.split('\n').toString()
        }
        this.dialogBrancheKeyWord = false
      },
      // 切换职层值
      handleChangeJobVal () {
        this._getPosition()
      },
      // 点击左边checkbox
      handleSelectionChange (val) {
        this.leftSelectedList = val
        if (!val.length && this.newData && this.nativeDataList.length) {
          this.toggleSelection(this.nativeDataList, true)
          this.newData = false
        }
      },
      // 点击左边新增
      handleAddSelected () {
        this.leftSelectedList.forEach(item => {
          let bool = this.rightDataList.some(i => {
            return i.PositionId === item.PositionId
          })
          if (!bool) {
            this.rightDataList.push(item)
          }
        })
        this.leftSelectedList.forEach(item => {
          let bool = this.nativeDataList.some(i => {
            return i.PositionId === item.PositionId
          })
          if (!bool) {
            this.nativeDataList.push(item)
          }
        })
      },
      // 点击右边checkbox
      handleSelectedChange (val) {
        this.rightSelectedList = val
      },
      // 点击右边删除
      handleDelSelected () {
        this.rightSelectedList.forEach(item => {
          this.nativeDataList.forEach((i, index) => {
            if (i.PositionId === item.PositionId) {
              this.nativeDataList.splice(index, 1)
            }
          })
        })
        this.rightDataList = this.nativeDataList
        this.toggleSelection(this.rightSelectedList, false)
      },
      // 切换选中状态
      toggleSelection (rows, bool) {
        if (rows) {
          rows.forEach(row => {
            this.leftDataList.forEach((item, index) => {
              if (row.PositionId === item.PositionId) {
                this.$refs.leftTable.toggleRowSelection(this.leftDataList[index], bool)
              }
            })
          })
        } else {
          this.$refs.leftTable.clearSelection()
        }
      },
      // 保存岗位
      handleClickSavePos () {
        debugger
        if (this.nativeDataList && this.nativeDataList.length) {
          this.$emit('upData', this.nativeDataList, this.componentId)
          this.$bus.$emit('savePos', this.nativeDataList)
          // this.$message.success('保存成功')
          this.handleClickCancelPos()
        } else {
          this.$confirm('未选择任何岗位，确认保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('upData', this.nativeDataList)
            this.$bus.$emit('savePos', this.nativeDataList)
            this.handleClickCancelPos()
            // this.$message.success('保存成功')
          }).catch(() => {
          })
        }
      },
      // 关闭岗位
      handleClickCancelPos () {
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
