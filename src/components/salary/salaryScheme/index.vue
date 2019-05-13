<template>
  <div class="salary-archive mg-30">
    <div>
      <div class="btn-tab">
        <el-select style="width: 80px"
                   class="filter-item"
                   v-model="queryObj.State"
                   placeholder="状态"
        >
          <el-option v-for="item in StateList" :key="item.code" :label="item.value" :value="item.code">
          </el-option>
        </el-select>

        <el-button @click="setCheckedNode()" style="margin-bottom: 10px;">
          选择组织
        </el-button>

        <el-select style="width: 120px"
                   class="filter-item"
                   v-model="queryObj.SchemeCode"
                   placeholder="薪资方案"
        >
          <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>

        <el-select class="filter-item empType" multiple v-model="queryObj.EmpType" style="width: 120px" placeholder="员工类型">
          <el-option v-for="item in EmpType" :key="item.Id" :label="item.Name" :value="item.Id">
          </el-option>
        </el-select>

        <el-date-picker
          v-model="queryObj.OnDate"
          type="date"
          placeholder="薪资日期">
        </el-date-picker>

        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px"
                  class="filter-item"
                  v-model="queryObj.KeyWord"
                  placeholder="姓名 / 员工号">
        </el-input>

        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="margin-bottom: 10px;">搜索</el-button>

        <div class="btn-tab right-btn-item" style="margin-bottom: 10px;">
          <el-button @click="batchAdd()" class="left-btn" type="primary">
            批量新增
          </el-button>

          <el-button @click="upload()" class="left-btn">
            导入
          </el-button>

          <el-button class="left-btn" @click="_downloadEmpScheme">
            导出
          </el-button>
        </div>
      </div>

      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane v-for="(item, index) in typeList"
                     :key="item.Code"
                     :label="item.TypeName"
                     :name="item.Code"
        >
          <tab-pane v-if='activeName == item.Code'
                    :obj="queryObj"
                    :archiveList="archiveList"
                    class="list"
                    ref="tabPane"
          ></tab-pane>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="导入员工薪资方案"
                 :visible.sync="commonVisible"
                 class="dialog-item"
                 :modal-append-to-body="false"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
      >

        <el-button class="download-template" size="small" type="primary" @click="_buildEmpSchemeTemplate">点击下载模板</el-button>

        <upload-file ref="uploadTemplate" @uploadEmpTerm="_uploadEmpScheme"></upload-file>

        <div slot="footer" class="dialog-footer">
          <el-button @click="commonVisible = false">关闭</el-button>
        </div>

      </el-dialog>

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

    <el-dialog
      width="700px"
      title="批量新增"
      :visible="batchEditorVisible"
      v-if="batchEditorVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :show-close="false"
      append-to-body
      custom-class="batchEditor-dialog"
    >
      <div class="keyBatchEditor rule-item">
        <span class="text">薪资规则：</span>
        <el-select class="filter-item"
                   v-model="batchEditorSchemeCode"
                   placeholder="薪资规则（可多选）"
                   multiple
        >
          <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>
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
                     @click="handleBatchEditor"
                     style="margin-top: 44px;height: 50px"
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
        >
        </el-tree>
        <div class="selected-container">
          <span style="margin-right: 5px;margin-bottom: 5px"
                class="el-tag el-tag--info el-tag--small"
                v-for="(item, index) in checkedOrgTree"
                :key="item.value"
          >
            <span class="el-select__tags-text">{{ item.label }}</span>
            <i class="el-tag__close el-icon-close" @click="delOrgIem(index, item.value)"></i>
          </span>
        </div>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button @click="batchEditorVisible = false">取消</el-button>
        <el-button type="primary" @click="sureBatchEditor()">确定</el-button>
      </div>
    </el-dialog>

    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
  import {
    getSalaryList,
    getEmpType,
    uploadEmpScheme,
    getEmpStatus,
    addEmpScheme
  } from '@/api/salary'
  import { getOrgList, getMixedTree } from '@/api/permission'
  import { REQ_OK, BASE_URL } from '@/api/config'
  import TabPane from '@/components/salary/salaryScheme/tabPane'
  import UploadFile from '@/base/uploadTemplate/uploadTemplate'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        archiveList: [],
        EmpType: [],
        queryObj: {
          State: -1,
          EmpId: '',
          Org: [],
          SchemeCode: '',
          KeyWord: '',
          EmpType: 1,
          OnDate: null
        },
        StateList: [
          {
            'value': '全部',
            'code': -1
          },
          {
            'value': '停用',
            'code': 0
          },
          {
            'value': '启用',
            'code': 1
          }
        ],
        tidVisible: false,
        tidList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultCheck: [],
        typeList: [
          {
            TypeName: '全部',
            Code: '1111'
          }
        ],
        editableTabsValue: '1',
        activeName: '1111',
        commonVisible: false,
        isTabPane: false,
        batchEditorVisible: false,
        batchEditorOrgList: [],
        batchEditorQueryObj: {
          EmpStatus: null,
          KeyWord: '',
          EmpType: null,
          Gender: null,
          Org: JSON.stringify([])
        },
        EmpStatus: [],
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
        batchEditorEmpId: [],
        batchEditorSchemeCode: [],
        checkedOrgTree: []
      }
    },
    created () {
      this._getOrgList()
      this._getSalaryList()
      this._getEmpType()
      this.$store.dispatch('setLoadingState', true)
    },
    computed: {
      ...mapGetters([
        'loading',
        'companyCode',
        'token'
      ]),
      changeLoading () {
        return this.$store.dispatch('setLoadingState', true)
      }
    },
    methods: {
      _getOrgList () {
        getOrgList().then((res) => {
          if (res.data.State === REQ_OK) {
            let arr = res.data.Data
            this.tidList = this._orginList(arr)
          } else {
            Message.error('组织列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('组织列表获取失败，请重试！')
        })
      },
      _getSalaryList () {
        getSalaryList().then(res => {
          if (res.data.State === REQ_OK) {
            this.archiveList = res.data.Data
          } else {
            Message.error('薪资方案列表获取失败，请刷新页面重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          Message.error('薪资方案列表获取失败，请刷新页面重试！')
        })
      },
      _getEmpType () {
        getEmpType().then(res => {
          if (res.data.State === REQ_OK) {
            this.EmpType = res.data.Data
          } else {
            Message.error('员工类型列表获取失败，请刷新页面重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
        })
      },
      _getEmpStatus () {
        getEmpStatus().then(res => {
          if (res.data.State === REQ_OK) {
            this.EmpStatus = res.data.Data
          } else {
            Message.error('员工状态列表获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('员工状态列表获取失败，请刷新页面重试！')
        })
      },
      _getMixedTree () {
        getMixedTree(this.batchEditorQueryObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.batchEditorOrgList = this._orginList(res.data.Data)
          } else {
            Message.error('组织与员工混合列表获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('组织与员工混合列表获取失败，请刷新页面重试！')
        })
      },
      _addEmpScheme () {
        addEmpScheme(JSON.stringify(this.batchEditorEmpId), JSON.stringify(this.batchEditorSchemeCode)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('保存成功！')
            this.batchEditorVisible = false
            this.$refs.tabPane[0]._getEmpSchemeList()
          } else {
            Message.error('保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存失败，请重试！')
        })
      },
      batchAdd () {
        this._getMixedTree()
        this._getEmpStatus()
        this.batchEditorVisible = true
      },
      handleBatchEditor () {
        this._getMixedTree()
      },
      sureBatchEditor () {
        let result = this.checkedOrgTree.filter(item => {
          return item.nodeType === 1
        })
        if (result.length === 0) {
          Message.error('您选择的组织里面没有人员，请重新选择！')
          return false
        }
        this.batchEditorEmpId = result.map(item => {
          return item.value
        })
        if (this.batchEditorSchemeCode.length === 0) {
          Message.error('请选择薪资规则！')
          return false
        }
        this._addEmpScheme()
      },
      upload () {
        this.commonVisible = true
      },
      _buildEmpSchemeTemplate () {
        let url = `${BASE_URL}/Wage/IO?Method=BuildEmpSchemeTemplate&TokenId=${this.token}&CompanyCode=${this.companyCode}`
        window.open(url)
      },
      _uploadEmpScheme (file) {
        uploadEmpScheme(file).then((res) => {
          if (res.data.UploadState === REQ_OK) {
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.$refs.uploadTemplate.emptyFile()
          } else {
            this.$message({
              type: 'error',
              message: '上传失败!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '上传失败!'
          })
        })
      },
      _downloadEmpScheme () {
        let url = `${BASE_URL}/Wage/IO?Method=DownloadEmpScheme&TokenId=${this.token}&CompanyCode=${this.companyCode}`
        window.open(url)
      },
      setCheckedNode () {
        this.tidVisible = true
        if (this.defaultCheck.length > 0) {
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
      },
      handleFilter () {
        this.changeObj()
        this.$refs.tabPane[0]._getEmpSchemeList()
      },
      changeObj () {
        if (this.defaultCheck.length > 0) {
          this.queryObj.Org = JSON.stringify(this.defaultCheck)
        }
      },
      trueLoading () {
        this.$store.dispatch('setLoadingState', true)
      },
      falseLoading () {
        this.$store.dispatch('setLoadingState', false)
      },
      _recursionFn (arr) {
        let result = []
        arr.forEach((item) => {
          let obj = {
            value: item.EmployeeId,
            label: item.EmployeeName
          }
          result.push(obj)
        })
        return result
      },
      checkedOrg (param1, param2) {
        this.checkedKeys = param2.checkedKeys
        this.checkedNodes = param2.checkedNodes
        if (this.checkedOrgTree.length > 0) {
          param2.checkedNodes.forEach(item => {
            let res = this.checkedOrgTree.filter(i => {
              return i.value === item.value
            })
            if (res.length === 0) {
              this.checkedOrgTree.push(item)
            }
          })
        } else {
          this.checkedOrgTree = [...param2.checkedNodes]
        }
      },
      delOrgIem (index, value) {
        this.checkedOrgTree.splice(index, 1)
        this.checkedNodes = this.checkedNodes.filter(i => {
          return i.value !== value
        })
        // console.log(this.$refs.batchEditorTree.getCheckedKeys(true))
        this.$refs.batchEditorTree.setCheckedNodes(this.checkedNodes)
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
    components: {
      TabPane,
      UploadFile
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-archive
    .empType
      width 120px
      .el-select__tags
        no-wrap()
    .dialog-item
      .el-dialog
        width 500px
      .el-dialog__body
        text-align center
        .download-template
          margin-right 30px
          vertical-align: top
  @media screen and (min-width: 1550px) {
    .right-btn-item {
      float: right
    }
  }
  .salary-archive .left-btn {
    margin-left 0!important
  }

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
    .keyBatchEditor
      display inline-block
      margin-bottom 10px
      .text
        display inline-block
        width 70px
</style>
