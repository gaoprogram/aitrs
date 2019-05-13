<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：公告--公告管理
-->

<template>
  <div class="notice-manage mg-30">
    <div class="noticeType">
      <div style="margin-bottom: 20px;">

        <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>

        <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="标题" v-model="listQuery.title">
        </el-input>

        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

        <el-button @click="addNotice()" class="addNotice-btn" type="primary">
          新增公告
        </el-button>
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

<script>
  import { addNoticeType, getNoticeType } from '@/api/notice'
  import { REQ_OK } from '@/api/config'
  import TabPane from '@/components/notice/end/tabPane'
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
            this.falseLoading()
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

<style lang="stylus" rel="stylesheet/stylus">
  .notice-manage
    .addNotice-btn
      float right
</style>
