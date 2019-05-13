<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：公告--公告首页
-->

<template>
  <div class="notice-manage mg-30">
    <div class="noticeType" v-loading="loading">
      <div style="margin-bottom: 20px;">

        <el-input @keyup.enter.native="handleFilter"
                  style="width: 300px"
                  class="filter-item"
                  placeholder="标题"
                  v-model="listQuery.title"
        >
        </el-input>

        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

      </div>
      <el-tabs v-model="activeName" type="border-card" v-if="!loading">
        <el-tab-pane v-for="(item, index) in typeList" :key="item.Code" :label="item.TypeName" :name="item.Code">
          <tab-pane
            v-if='activeName == item.Code'
            :type="item.Code" class="list"
            ref="refreshList"
            :isModify="false"
            :isAdmin="false"
            :width="120"
          ></tab-pane>
        </el-tab-pane>
      </el-tabs>
    </div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
  import { getNoticeType } from '@/api/notice'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import TabPane from '@/components/notice/end/tabPane'
  export default {
    data () {
      return {
        typeList: [],
        loading: true,
        activeName: '',
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          sort: 0
        }
      }
    },
    created () {
      this._getNoticeType()
    },
    methods: {
      _getNoticeType () {
        getNoticeType().then((res) => {
          if (res.data.State === REQ_OK) {
            this.loading = false
            this.typeList = res.data.Data
            this.activeName = res.data.Data[0].Code
          } else {
            this.loading = false
            Message.error('请求错误，请重试！')
          }
        }).catch(() => {
          this.loading = false
          Message.error('请求超时，请重试！')
        })
      },
      handleFilter () {
        this.$refs.refreshList[0]._getNoticeList(this.listQuery)
      }
    },
    components: {
      TabPane
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
