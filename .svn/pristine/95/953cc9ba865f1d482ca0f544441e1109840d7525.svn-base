<!--
  User: xxxxxxx
  Date: 2018/5/4
  功能：xxxxxx
-->

<template>
  <div class="base-set-container">
    <div class="item-row">
      <span>考勤组名称：</span>
      <el-input type="text" v-model="strJson.GroupName" class="input" style="width:300px"></el-input>
      <el-switch
        v-model="state"
        active-text="启用"
        inactive-text="停用">
      </el-switch>
    </div>
    <div class="item-row">
      <span>考&nbsp;勤&nbsp;周&nbsp;期：</span>
      <el-select class="filter-item"
                 v-model="strJson.BeginMonth"
                 style="width: 100px"
      >
        <el-option v-for="item in monthSelect" :key="item.code" :label="item.value" :value="item.code">
        </el-option>
      </el-select>
      <el-select class="filter-item"
                 v-model="strJson.BeginDate"
                 style="width: 100px"
      >
        <el-option v-for="item in 31" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span> - </span>
      <el-select class="filter-item"
                 v-model="strJson.EndMonth"
                 style="width: 100px"
      >
        <el-option v-for="item in monthSelect" :key="item.code" :label="item.value" :value="item.code">
        </el-option>
      </el-select>
      <el-select class="filter-item"
                 v-model="strJson.EndDate"
                 style="width: 100px"
      >
        <el-option v-for="item in 31" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="item-row">
      <span style="display: inline-block;vertical-align: top">考勤组说明：</span>
      <el-input type="textarea" v-model="strJson.Remark" class="input" style="width:419px;"></el-input>
    </div>
    <div class="item-row">
      <span>考勤计算自动关联出勤类审批单：</span>
      <el-select class="filter-item"
                 v-model="strJson.RelationToWorkflow"
                 style="width: 100px"
      >
        <el-option v-for="item in attendanceRelationSelect" :key="item.code" :label="item.value" :value="item.code">
        </el-option>
      </el-select>
    </div>
    <span class="cut-line"></span>
    <div class="item-row el-select">
      <span>适用部门：</span>
      <div class="div-selected">
        <span>
          <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectOrgRangeList" :key="item.value">
            <span class="el-select__tags-text">{{ item.label }}</span>
            <i class="el-tag__close el-icon-close" @click="delOrgItem(index, item)"></i>
          </span>
        </span>
      </div>
      <el-button type="primary"
                 @click.native.prevent="setCheckedNode()"
      >
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <div class="item-row el-select" style="display: block">
      <span>考勤人员：</span>
      <div class="div-selected">
        <span>
          <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectClockEmpList" :key="item.value">
            <span class="el-select__tags-text">{{ item.label }}</span>
            <i class="el-tag__close el-icon-close" @click="delClockEmpItem(index)"></i>
          </span>
        </span>
      </div>
      <el-button type="primary"
                 @click.native.prevent="handlerAddGroupEmp(1)"
      >
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <div class="item-row el-select" style="display: block">
      <span>不考勤人员：</span>
      <div class="div-selected">
        <span>
          <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectNoClockEmpList" :key="item.value">
            <span class="el-select__tags-text">{{ item.label }}</span>
            <i class="el-tag__close el-icon-close" @click="delNoClockEmpItem(index)"></i>
          </span>
        </span>
      </div>
      <el-button type="primary"
                 @click.native.prevent="handlerAddGroupEmp(0)"
      >
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <span class="cut-line"></span>
    <div class="item-row el-select" style="display: block">
      <span>负责岗位：</span>
      <div class="div-selected">
        <span>
          <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectHeadPosition" :key="item.PositionCode">
            <span class="el-select__tags-text">{{ item.PositionName }}</span>
            <i class="el-tag__close el-icon-close" @click="delHeadPositionItem(index)"></i>
          </span>
        </span>
      </div>
      <el-button type="primary"
                 @click.native.prevent="addHeadPosition()"
      >
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <div class="item-row el-select" style="display: block">
      <span>负&nbsp;责&nbsp;人&nbsp;：</span>
      <div class="div-selected">
        <span>
          <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectInChargeList" :key="item.value">
            <span class="el-select__tags-text">{{ item.label }}</span>
            <i class="el-tag__close el-icon-close" @click="delInChargeItem(index)"></i>
          </span>
        </span>
      </div>
      <el-button type="primary"
                 @click.native.prevent="handlerAddGroupEmp(2)"
      >
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提示</span>
      </div>
      <div class="text item">
        只可在考勤档案修改当前日之前的考勤规则数据。当前页不可进行当前日之前的考勤规则数据修改。适用组织是初始配置，组织下所有人员都按此规则，方可选，系统将对新入职，调转人员自动触发按此规则配置考勤规则。
      </div>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <el-dialog
      width="30%"
      title="适用部门"
      :visible="orgRangeVisible"
      v-if="orgRangeVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :show-close="false"
      append-to-body
      custom-class="org-tree"
    >
      <el-tree
        :data="orgRangeList"
        show-checkbox
        node-key="value"
        ref="tree"
        expand-on-click-node
        highlight-current
        :props="defaultProps"
        :default-checked-keys="defaultOrgRangeCheckedKeys"
      >
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="orgRangeVisible = false">取消</el-button>
        <el-button type="primary" @click="getCheckedNodes()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="700px"
      title="负责岗位"
      :visible="headPositionVisible"
      v-if="headPositionVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :show-close="false"
      append-to-body
      custom-class="batchEditor-dialog"
    >
      <span class="text-title">可筛选组织人员</span>
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
        <el-button @click="headPositionVisible = false">取消</el-button>
        <el-button type="primary" @click="sureHeadPosition()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="700px"
      :title="groupEmpTitle"
      :visible="groupEmpVisible"
      v-if="groupEmpVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :show-close="false"
      append-to-body
      custom-class="GroupEmp-dialog"
    >
      <div class="keyBatchEditor rule-item">
        <span class="text" v-if="groupEmpType === 0 || groupEmpType === 1">生效日：</span>
        <el-date-picker
          v-model="groupEmpBeginDate"
          type="date"
          v-if="groupEmpType === 0"
          placeholder="生效日">
        </el-date-picker>

        <el-date-picker
          v-model="noGroupEmpBeginDate"
          type="date"
          v-if="groupEmpType === 1"
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
        <el-button @click="groupEmpVisible = false">取消</el-button>
        <el-button type="primary" @click="sureGroupEmp()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unneeded-ternary */

  import { REQ_OK } from '@/api/config'
  import {
    getEmpType,
    getEmpStatus
  } from '@/api/salary'
  import { addGroup } from '@/api/attendance'
  import { getOrgList, getPositionList, getMixedTree } from '@/api/permission'
  import { Message } from 'element-ui'
  export default {
    props: {
      strJson: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        // strJson: {
        //   Id: 0,
        //   GroupName: '',
        //   State: '',
        //   OrgRange: '',
        //   GroupEmp: '',
        //   BeginMonth: 0,
        //   BeginDate: '',
        //   EndMonth: 0,
        //   EndDate: '',
        //   Remark: '',
        //   RelationToWorkflow: '',
        //   HeadPosition: '',
        //   InCharge: ''
        // },
        state: false,
        monthSelect: [
          {
            value: '上月',
            code: -1
          },
          {
            value: '当月',
            code: 0
          },
          {
            value: '次月',
            code: 1
          }
        ],
        attendanceRelationSelect: [
          {
            value: '关联',
            code: 1
          },
          {
            value: '不关联',
            code: 0
          }
        ],
        orgRangeVisible: false,
        orgRangeList: [],
        selectOrgRangeList: [],
        selectClockEmpList: [],
        selectNoClockEmpList: [],
        selectInChargeList: [],
        defaultOrgRangeCheckedKeys: [],
        defaultCheck: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        headPositionVisible: false,
        headPosition: [],
        selectHeadPosition: '',
        batchEditorOrgList: [],
        batchEditorQueryObj: {
          EmpStatus: null,
          KeyWord: '',
          EmpType: null,
          Gender: null,
          Org: JSON.stringify([])
        },
        groupEmpTitle: '',
        groupEmpType: 1,
        groupEmpVisible: false,
        groupEmpBeginDate: null,
        noGroupEmpBeginDate: null,
        defaultCheckedKeys: [],
        checkedOrgTree: [],
        param: {
          KeyWord: '',
          ParentOrgCode: []
        },
        tableData: [],
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
        ]
      }
    },
    created () {
      this._getOrgList()
    },
    mounted () {
      if (this.$route.query.groupCode) {
        this.state = this.strJson.State === 1 ? true : false
      }
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
      setCheckedNode () {
        this.defaultOrgRangeCheckedKeys = []
        this.selectOrgRangeList.forEach(item => {
          this.defaultOrgRangeCheckedKeys.push(item.value)
        })
        this.orgRangeVisible = true
      },
      getCheckedNodes () {
        let arr = this.$refs.tree.getCheckedNodes()
        this.selectOrgRangeList = arr
        console.log(arr)
        this.orgRangeVisible = false
      },
      delOrgItem (index, item) {
        // 删除组织
        this.selectOrgRangeList.splice(index, 1)
        let nodeId = item.nodeId
        console.log(nodeId)
        if (nodeId) {
          this.selectOrgRangeList = this.selectOrgRangeList.filter(i => {
            return nodeId.indexOf(i.value) === -1
          })
        }
      },
      handlerAddGroupEmp (index) {
        // 考勤人员，不考勤人员，负责人
        this.checkedOrgTree = []
        // let keys = []
        this.defaultCheckedKeys = []
        switch (index) {
          case 0:
            if (this.selectNoClockEmpList.length) {
              this.selectNoClockEmpList.forEach(item => {
                this.defaultCheckedKeys.push(item.nodeId)
              })
              this.checkedOrgTree = [...this.selectNoClockEmpList]
            }
            console.log(this.defaultCheckedKeys)
            this.groupEmpTitle = '不考勤人员'
            this.groupEmpType = 0
            break
          case 1:
            if (this.selectClockEmpList.length) {
              this.selectClockEmpList.forEach(item => {
                this.defaultCheckedKeys.push(item.nodeId)
              })
              this.checkedOrgTree = [...this.selectClockEmpList]
            }
            this.groupEmpTitle = '考勤人员'
            this.groupEmpType = 1
            break
          case 2:
            if (this.selectInChargeList.length) {
              this.selectInChargeList.forEach(item => {
                this.defaultCheckedKeys.push(item.nodeId)
              })
              this.checkedOrgTree = [...this.selectInChargeList]
            }
            this.groupEmpTitle = '负责人'
            this.groupEmpType = 2
            break
          default:
        }
        if (!this.batchEditorOrgList.length) {
          this._getEmpType()
          this._getEmpStatus()
          this._getMixedTree()
        }
        this.groupEmpVisible = true
      },
      handleGroupEmpSearch () {
        // 考勤人员，不考勤人员，负责人 筛选
        this._getMixedTree()
      },
      checkedOrg (param1, param2) {
        // 考勤人员，不考勤人员，负责人 点击选择组织树
        this.checkedKeys = param2.checkedKeys
        this.checkedNodes = param2.checkedNodes
        this.halfCheckedKeys = param2.halfCheckedKeys
        this.checkedOrgTree = []
        this.checkedOrgTree = this.checkedNodes.filter(item => {
          return item.nodeId.indexOf('_') !== -1
        })
      },
      delSelectEmpIem (index, item) {
        this.checkedOrgTree.splice(index, 1)
        this.checkedKeys = this.checkedOrgTree.map(i => {
          return i.nodeId
        })
        this.$refs.batchEditorTree.setCheckedKeys(this.checkedKeys, true)
      },
      sureGroupEmp () {
        // 考勤人员，不考勤人员，负责人 确认
        if (!this.checkedOrgTree.length) {
          Message.error('请选择人员！')
          return false
        }
        switch (this.groupEmpType) {
          case 0:
            if (!this.noGroupEmpBeginDate) {
              Message.error('请选择生效日！')
              return false
            }
            this.selectNoClockEmpList = []
            this.selectNoClockEmpList = [...this.checkedOrgTree]
            break
          case 1:
            if (!this.groupEmpBeginDate) {
              Message.error('请选择生效日！')
              return false
            }
            this.selectClockEmpList = []
            this.selectClockEmpList = [...this.checkedOrgTree]
            break
          case 2:
            if (this.checkedOrgTree.length > 2) {
              Message.error('负责人最多只能选择两个！')
              return false
            }
            this.selectInChargeList = []
            this.selectInChargeList = [...this.checkedOrgTree]
            break
          default:
        }
        this.groupEmpVisible = false
      },
      delClockEmpItem (index) {
        // 删除考勤人员
        this.selectClockEmpList.splice(index, 1)
      },
      delNoClockEmpItem (index) {
        // 删除不考勤人员
        this.selectNoClockEmpList.splice(index, 1)
      },
      delHeadPositionItem (index) {
        // 删除负责岗位
        this.selectHeadPosition.splice(index, 1)
      },
      delInChargeItem (index) {
        // 删除负责人
        this.selectInChargeList.splice(index, 1)
      },
      addHeadPosition () {
        // 选择负责岗位
        this.headPositionVisible = true
      },
      searchHeadPosition () {
        // 负责岗位搜索
        this._getPositionList()
      },
      sureHeadPosition () {
        // 负责岗位确认
        this.headPositionVisible = false
        this.selectHeadPosition = this.selectHead
      },
      handleHeadPositionCurrentChange (val) {
        // 岗位选择
        this.selectHead = val
      },
      save () {
        // 保存
        this.strJson.State = this.state ? 1 : 0
        if (this.selectOrgRangeList.length) {
          this.strJson.OrgRange = []
          this.selectOrgRangeList.forEach(item => {
            this.strJson.OrgRange.push(item.value)
          })
        }
        this.strJson.GroupEmp = []
        if (this.selectNoClockEmpList.length) {
          this.selectNoClockEmpList.forEach(item => {
            let obj = {
              EmpId: item.value,
              EmpName: item.label,
              Flag: 0,
              BeginDate: this.noGroupEmpBeginDate
            }
            this.strJson.GroupEmp.push(obj)
          })
        }
        if (this.selectClockEmpList.length) {
          this.selectClockEmpList.forEach(item => {
            let obj = {
              EmpId: item.value,
              EmpName: item.label,
              Flag: 1,
              BeginDate: this.groupEmpBeginDate
            }
            this.strJson.GroupEmp.push(obj)
          })
        }
        if (this.selectHeadPosition.length) {
          this.strJson.HeadPosition = []
          this.selectHeadPosition.forEach(item => {
            this.strJson.HeadPosition.push(item.PositionCode)
          })
        }
        if (this.selectInChargeList.length) {
          this.strJson.InCharge = []
          this.selectInChargeList.forEach(item => {
            this.strJson.InCharge.push(item.value)
          })
        }
        console.log(this.strJson)
        addGroup(JSON.stringify(this.strJson)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('保存考勤组基础设置成功！')
          } else {
            Message.error('保存考勤组基础设置失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存考勤组基础设置失败，请重试！')
        })
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
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
      'strJson': {
        handler (newVal, oldVal) {
          if (this.$route.query.groupCode) {
            this.state = this.strJson.State === 1 ? true : false
            if (!this.selectOrgRangeList.length) {
              this.strJson.OrgRange.forEach((item) => {
                let obj = {
                  value: item.OrgCode,
                  label: item.OrgName,
                  nodeId: item.NodeId
                }
                this.selectOrgRangeList.push(obj)
              })
            }
            if (!this.selectClockEmpList.length && !this.selectNoClockEmpList.length && this.strJson.GroupEmp.length) {
              this.strJson.GroupEmp.forEach(item => {
                let obj = {
                  value: item.EmpId,
                  label: item.EmpName,
                  nodeId: item.NodeId
                }
                if (item.Flag === 1) {
                  this.groupEmpBeginDate = new Date(this.replaceTime(item.BeginDate))
                  this.selectClockEmpList.push(obj)
                }
                if (item.Flag === 0) {
                  this.noGroupEmpBeginDate = new Date(this.replaceTime(item.BeginDate))
                  this.selectNoClockEmpList.push(obj)
                }
              })
            }
            if (!this.selectHeadPosition.length && this.strJson.HeadPosition.length) {
              this.selectHeadPosition = [...this.strJson.HeadPosition]
            }
            if (!this.selectInChargeList.length && this.strJson.InCharge.length) {
              this.strJson.InCharge.forEach(item => {
                let obj = {
                  value: item.EmpId,
                  label: item.EmpName,
                  nodeId: item.NodeId
                }
                this.selectInChargeList.push(obj)
              })
            }
          }
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .base-set-container
    .item-row
      margin-bottom 10px
      .div-selected
        display: inline-block
        line-height: normal
        max-width: 282px
        min-width: 282px
        min-height 38px
        border: 1px solid #d8dce5
        border-radius: 4px
        vertical-align: top
    .cut-line
      display inline-block
      width 100%
      margin: 10px 0 20px 0
      border-bottom 1px solid #d8dce5
    .box-card
      margin-top 50px
  .org-tree
    .el-tree
      max-height: 252px
      overflow-y: scroll
      display: inline-block
      padding: 10px
      width: 274px

  .GroupEmp-dialog
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
