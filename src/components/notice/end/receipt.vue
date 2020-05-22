<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：公告--回执
-->

<template>
  <div class="notice-manage mg-30">
    <div class="noticeType" v-loading="loading">
      <div style="margin-bottom: 20px;">

        <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="标题" v-model="listQuery.title">
        </el-input>

        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

      </div>
      <el-tabs v-model="activeName" type="border-card" v-if="!loading">
        <el-tab-pane v-for="(item, index) in typeList" :key="item.Code" :label="item.TypeName" :name="item.Code">
          <tab-pane-receipt
            v-if='activeName == item.Code'
            :type="item.Code" class="list"
            ref="refreshList"
            :isModify="false"
            :isAdmin="false"
            :width="120"
          ></tab-pane-receipt>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { getNoticeType } from '@/api/notice'
  import { REQ_OK } from '@/api/config'
  import TabPaneReceipt from '@/components/notice/end/tabPane-receipt'
  import { Message } from 'element-ui'
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
            Message.error('加载失败，请重试！')
          }
        }).catch(() => {
          this.loading = false
          Message.error('加载失败！')
        })
      },
      handleFilter () {
        this.$refs.refreshList[0]._getNoticeList(this.listQuery)
      }
    },
    components: {
      TabPaneReceipt
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
