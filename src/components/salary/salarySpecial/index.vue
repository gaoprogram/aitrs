<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：特殊发薪
-->

<template>
  <div class="salary-special mg-30">
    <div class="noticeType">
      <div class="btn-tab">
        <el-button @click="setCheckedNode()" style="margin-bottom: 10px;">
          选择组织
        </el-button>

        <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>

        <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>

        <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>

        <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>

        <el-input @keyup.enter.native="handleFilter" style="width: 100px" class="filter-item" placeholder="差异大于" v-model="listQuery.title">
        </el-input>
        <span>-</span>
        <el-input @keyup.enter.native="handleFilter" style="width: 100px" class="filter-item" placeholder="差异小于" v-model="listQuery.title">
        </el-input>

        <el-input @keyup.enter.native="handleFilter" style="width: 300px" class="filter-item" placeholder="员工号/姓名" v-model="listQuery.title">
        </el-input>

        <el-button class="filter-item" type="primary" icon="el-icon-search"  style="margin-bottom: 10px;" @click="handleFilter">搜索</el-button>
      </div>

      <div class="btn-tab right-btn-item" style="margin-bottom: 10px;">
        <el-button @click="addNotice()" class="left-btn" type="primary">
          月报表
        </el-button>

        <el-button @click="addNotice()" class="left-btn">
          人员
        </el-button>

        <el-button @click="addNotice()" class="left-btn">
          全部计算
        </el-button>

        <el-button @click="addNotice()" class="left-btn">
          逐条计算
        </el-button>

        <el-dropdown class="left-btn">
          <el-button>
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
            <el-dropdown-item>对比</el-dropdown-item>
            <el-dropdown-item>取消对比</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>


      <el-tabs addable v-model="activeName" type="border-card" @tab-add="addTab">
        <el-tab-pane v-for="(item, index) in typeList"
                     :key="item.Code"
                     :label="item.TypeName"
                     :name="item.Code"
        >
          <tab-pane v-if='activeName == item.Code'
                    :type="item.Code"
                    class="list"
                    ref="refreshList"
                    :isModify="true"
          ></tab-pane>
        </el-tab-pane>
      </el-tabs>

      <el-dialog :title="textMap.create" :visible.sync="dialogTypeVisible">

        <el-form class="small-space" label-position="left" label-width="70px" ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item label="名称：" prop="name" placeholder="请输入公告类型名称">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTypeVisible = false">取 消</el-button>
          <el-button type="primary" @click="createNoticeType">确 定</el-button>
        </div>

      </el-dialog>
    </div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addNoticeType, getNoticeType } from '@/api/notice'
  import { REQ_OK } from '@/api/config'
  import TabPane from '@/components/salary/salarySpecial/tabPane'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        typeList: [],
        editableTabsValue: '1',
        activeName: '',
        textMap: {
          createNotice: '新建公告',
          editNotice: '编辑公告',
          createType: '新建公告类型'
        },
        createTypeName: null,
        dialogTypeVisible: false,
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入公告类型名称', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
          ]
        },
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          sort: 0
        },
        sortOptions: [
          { label: '全部公告', key: 0 },
          { label: '已发布公告', key: 2 },
          { label: '未发布公告', key: 1 }
        ]
      }
    },
    created () {
      this._getNoticeType()
      this.$store.dispatch('setLoadingState', true)
    },
    computed: {
      ...mapGetters([
        'loading'
      ]),
      changeLoading () {
        return this.$store.dispatch('setLoadingState', true)
      }
    },
    methods: {
      _getNoticeType () {
        getNoticeType().then((res) => {
          if (res.data.State === REQ_OK) {
            this.typeList = res.data.Data
            this.activeName = res.data.Data[0].Code
          }
        }).catch(() => {
          this.falseLoading()
          Message.error('请求超时，请重试！')
        })
      },
      addTab () {
        this.dialogTypeVisible = true
      },
      removeTab (targetName) {
        let tabs = this.typeList
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.typeList = tabs.filter(tab => tab.name !== targetName)
      },
      createNoticeType () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            addNoticeType(this.ruleForm.name).then((res) => {
              if (res.data.State === REQ_OK) {
                this._getNoticeType()
                this.dialogTypeVisible = false
                Message.success('新增公告类型成功！')
              } else {
                Message.error('新增公告类型失败，请重试！')
              }
            }).catch(() => {
              Message.error('新增公告类型失败，请重试！')
            })
          } else {
            return false
          }
        })
      },
      addNotice () {
        this.$router.push({path: '/notice/noticeManage/createNotice'})
      },
      handleFilter () {
        this.$refs.refreshList[0]._getNoticeList(this.listQuery)
      },
      trueLoading () {
        this.$store.dispatch('setLoadingState', true)
      },
      falseLoading () {
        this.$store.dispatch('setLoadingState', false)
      }
    },
    components: {
      TabPane
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @media screen and (min-width: 1920px) {
    .btn-tab {
      display: inline-block
    }
    .right-btn-item {
      float: right
    }
  }
  .salary-special .left-btn {
    margin-left 0!important
  }
</style>
