<!--
  User: xxxxxxx
  Date: 2018/8/28
  功能： 人员选择器 
-->

<template>
  <el-dialog
    width="700px"
    :title="empTitle"
    :visible="empVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
    custom-class="emp-dialog"
  >
    <div class="keyBatchEditor rule-item" v-if="isEffective">
      <span class="text">生效日：</span>
      <el-date-picker
        v-model="groupEmpBeginDate"
        type="date"
        placeholder="生效日">
      </el-date-picker>
    </div>

    <span class="text-title">可筛选组织人员</span>
    <div class="search-container">
      <div class="filter-left">
        <div class="keyBatchEditor keyword-item">
          <span class="text">关键词：</span>
          <el-input style="width: 200px"
                    v-model="batchEditorQueryObj.KeyWord"
                    clearable
                    placeholder="姓名/员工号">
          </el-input>
        </div>
        <div class="keyBatchEditor" style="margin-left: 10px">
          <span class="text">员工状态：</span>
          <el-select style="width: 200px"
                     v-model="batchEditorQueryObj.EmpStatus"
                     placeholder="员工状态"
                     clearable
          >
            <el-option v-for="item in EmpStatus" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="keyBatchEditor">
          <span class="text">员工类型：</span>
          <el-select style="width: 200px"
                     v-model="batchEditorQueryObj.EmpType"
                     placeholder="员工类型"
                     clearable
          >
            <el-option v-for="item in EmpType" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="keyBatchEditor sex-item" style="margin-left: 10px">
          <span class="text">性别：</span>
          <el-select style="width: 200px"
                     v-model="batchEditorQueryObj.Gender"
                     placeholder="性别"
                     clearable
          >
            <el-option v-for="item in sexType" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
        </div>

      </div>
      <div class="search-btn">
        <el-button class="filter-item"
                   type="primary"
                   icon="el-icon-search"
                   @click="handleGroupEmpSearch"
                   style="margin-top: 39px;height: 50px"
                   size="small"
        >
          筛选
        </el-button>
      </div>
    </div>

    <div class="org-container">


      <el-tree
        :data="batchEditorOrgList"
        show-checkbox
        node-key="nodeId"
        ref="batchEditorTree"
        expand-on-click-node
        highlight-current
        :props="defaultProps"
        @check="checkedOrg"
        :default-checked-keys="defaultCheckedKeys"
      >
      </el-tree>


      <div class="selected-container">
          <span style="margin-right: 5px;margin-bottom: 5px"
                class="el-tag el-tag--info el-tag--small"
                v-for="(item, index) in checkedOrgTree"
                :key="item.value"
          >
            <span class="el-select__tags-text">{{ item.label }}</span>
            <i class="el-tag__close el-icon-close" @click="delSelectEmpIem(index, item)"></i>
          </span>
      </div>
    </div>


    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelEmp()">取消</el-button>
      <el-button type="primary" @click="sureEmp()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import {
    getEmpType,
    getEmpStatus
  } from '@/api/salary'
  import { getMixedTree } from '@/api/permission'
  import { Message } from 'element-ui'
  import { REQ_OK } from '@/api/config'
  export default {
    props: {
      empVisible: {
        type: Boolean,
        default: false
      },
      empTitle: {
        type: String,
        default: '选择人员'
      },
      isEffective: {
        type: Boolean,
        default: false
      },
      propsDefaultCheckedKeys: {
        type: Array,
        default: () => {
          return []
        }
      },
      propsCheckedOrgTree: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        groupEmpBeginDate: null,
        batchEditorOrgList: [],
        batchEditorQueryObj: {
          EmpStatus: null,
          KeyWord: '',
          EmpType: null,
          Gender: null,
          Org: JSON.stringify([])
        },
        EmpStatus: [],
        EmpType: [],
        sexType: [
          {
            value: '全部',
            code: -1
          },
          {
            value: '男',
            code: 1
          },
          {
            value: '女',
            code: 2
          },
          {
            value: '其它',
            code: 3
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultCheckedKeys: [],
        checkedOrgTree: []
      }
    },
    mounted () {
      this._getEmpType()
      this._getEmpStatus()
      this._getMixedTree()
    },
    methods: {
      async _getEmpType () {
        await getEmpType().then(res => {
          if (res.data.State === REQ_OK) {
            this.EmpType = res.data.Data
          } else {
            Message.error('员工类型列表获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('员工类型列表获取失败，请刷新页面重试！')
        })
      },
      async _getEmpStatus () {
        await getEmpStatus().then(res => {
          if (res.data.State === REQ_OK) {
            this.EmpStatus = res.data.Data
          } else {
            Message.error('员工状态列表获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('员工状态列表获取失败，请刷新页面重试！')
        })
      },
      async _getMixedTree () {
        await getMixedTree(this.batchEditorQueryObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.batchEditorOrgList = this._orginList(res.data.Data)
          } else {
            Message.error('组织与员工混合列表获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('组织与员工混合列表获取失败，请刷新页面重试！')
        })
      },
      handleGroupEmpSearch () {
        // 考勤人员，不考勤人员，负责人 筛选
        this._getMixedTree()
      },
      delSelectEmpIem (index, item) {
        this.checkedOrgTree.splice(index, 1)
        this.checkedKeys = this.checkedOrgTree.map(i => {
          return i.nodeId
        })
        this.$refs.batchEditorTree.setCheckedKeys(this.checkedKeys, true)
      },
      checkedOrg (param1, param2) {
        // 考勤人员，不考勤人员，负责人 点击选择组织树
        this.checkedKeys = param2.checkedKeys
        this.checkedNodes = param2.checkedNodes
        this.halfCheckedKeys = param2.halfCheckedKeys
        this.checkedOrgTree = []
        this.checkedOrgTree = this.checkedNodes.filter(item => {
          return item.nodeId.indexOf('_') !== -1 && item.nodeType === 1
        })
      },
      cancelEmp () {
        this.$emit('cancelEmp')
      },
      sureEmp () {
        if (!this.checkedOrgTree.length) {
          Message.error('未选择任何人员！')
          return false
        }
        this.$emit('sureEmp', this.checkedOrgTree)
      },
      _orginList (arr) {
        let result = []
        arr.forEach((item) => {
          let obj
          if (item.Child && item.Child.length > 0) {
            obj = {
              nodeId: item.NodeId,
              value: item.OrgCode,
              label: item.OrgName,
              nodeType: item.NodeType,
              children: this._orginList(item.Child)
            }
          } else {
            obj = {
              nodeId: item.NodeId,
              value: item.OrgCode,
              label: item.OrgName,
              nodeType: item.NodeType
            }
          }
          result.push(obj)
        })
        return result
      }
    },
    watch: {
      'propsDefaultCheckedKeys': {
        handler (newValue, oldValue) {
          console.log('newValue', newValue)
          this.defaultCheckedKeys = newValue
        },
        deep: true
      },
      'propsCheckedOrgTree': {
        handler (newValue, oldValue) {
          console.log('newValue', newValue)
          this.checkedOrgTree = newValue
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .emp-dialog
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
    .keyBatchEditor
      display inline-block
      margin-bottom 10px
      .text
        display inline-block
        width 70px
</style>
