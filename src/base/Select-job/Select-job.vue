<!--
  User: xxxxxxx
  Date: 2018/8/28
  功能：岗位选择器
-->

<template>
  <el-dialog
    width="700px"
    title="负责岗位"
    :visible="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
    custom-class="batchEditor-dialog"
  >
    <span class="text-title">可筛选岗位</span>
    <div class="search-container">
      <div class="filter-left">
        <el-cascader
          :options="orgRangeList"
          change-on-select
          v-model="param.ParentOrgCode"
          clearable
          filterable
        ></el-cascader>
        <div class="keyBatchEditor keyword-item" style="display: inline-block">
          <el-input style="width: 340px"
                    v-model="param.KeyWord"
                    placeholder="岗位名称/岗位编号">
          </el-input>
        </div>
        <el-button class="filter-item"
                   type="primary"
                   icon="el-icon-search"
                   @click="searchHeadPosition"
                   style=""
        >
          筛选
        </el-button>
      </div>
    </div>
    <div class="org-container" style="margin-top: 10px">
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @selection-change="handleHeadPositionCurrentChange"
        style="width: 715px; margin: 0 auto;max-height: 300px;overflow-y: scroll;"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column label="编号" prop="PositionCode">
        </el-table-column>

        <el-table-column prop="PositionName" label="名称">
        </el-table-column>
      </el-table>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHeadPosition()">取消</el-button>
      <el-button type="primary" @click="sureHeadPosition()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { getOrgList, getPositionList } from '@/api/permission'
  import { Message } from 'element-ui'
  import { REQ_OK } from '@/api/config'
  export default {
    data () {
      return {
        tableData: [],
        orgRangeList: [],
        param: {
          KeyWord: '',
          ParentOrgCode: []
        }
      }
    },
    mounted () {
      this._getOrgList()
    },
    methods: {
      async _getOrgList () {
        await getOrgList().then((res) => {
          if (res.data.State === REQ_OK) {
            let arr = res.data.Data
            this.orgRangeList = this.recursionFn(arr)
          } else {
            Message.error('组织列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('组织列表获取失败，请重试！')
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
      searchHeadPosition () {
        // 负责岗位搜索
        this._getPositionList()
      },
      handleHeadPositionCurrentChange (val) {
        // 岗位选择
        this.selectHead = val
      },
      sureHeadPosition () {
        console.log(this.selectHead)
        this.$emit('surePosition', this.selectHead)
      },
      cancelHeadPosition () {
        this.$emit('cancelPosition')
      },
      recursionFn (arr) {
        let result = []
        arr.forEach((item) => {
          let obj
          if (item.Child && item.Child.length > 0) {
            obj = {
              value: item.OrgCode,
              label: item.OrgName,
              nodeId: item.ParentOrgCode,
              children: this.recursionFn(item.Child)
            }
          } else {
            obj = {
              value: item.OrgCode,
              label: item.OrgName,
              nodeId: item.ParentOrgCode
            }
          }
          result.push(obj)
        })
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .batchEditor-dialog
    .el-dialog__body
      max-height: 500px;
      .text-title
        display: block;
        border-bottom: 2px solid #dedede
      .search-container
        display flex
        .filter-left
          vertical-align: top;
          padding: 20px 0;
      .org-container
        display flex
        .el-tree
          max-height: 252px;
          overflow-y: scroll;
          display: inline-block;
          padding: 10px;
          width: 274px;
        .selected-container
          flex 1
          max-height 252px
          overflow-y scroll
          padding 15px
          margin-left 20px
          border 1px solid #dedede
          border-radius 5px
</style>
