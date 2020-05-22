<!--
  User: xxxxxxx
  Date: 2018/5/2
  功能：详情
-->

<template>
  <div class="default-detail-container mg-30">
    <el-dialog :title="title"
               :visible="true"
               :show-close="false"
               :modal="false"
               center
               fullscreen
               :modal-append-to-body="false"
               style="min-width: 1000px"
    >
      <div class="content">
        <div class="header-container">
          <div class="item">
            <span>班次名称：</span>
            <el-input type="text" v-model="name" class="input"></el-input>
          </div>
          <div class="item">
            <span>班次简称：</span>
            <el-input type="text" v-model="name" class="input"></el-input>
          </div>
          <div class="item">
            <span>状态：</span>
            <el-switch
              v-model="status"
              active-text="启用"
              inactive-text="停用">
            </el-switch>
          </div>
        </div>

        <div class="header-container">
          <div class="item">
            <span>班次名称：</span>
            <el-input type="text" v-model="name" class="input"></el-input>
          </div>
          <div class="item">
            <span>班次简称：</span>
            <el-input type="text" v-model="name" class="input"></el-input>
          </div>
          <div class="item">
            <span>状态：</span>
            <el-switch
              v-model="status"
              active-text="启用"
              inactive-text="停用">
            </el-switch>
          </div>
        </div>

        <div class="header-container">
          <div class="item">
            <span>班次名称：</span>
            <el-input type="text" v-model="name" class="input"></el-input>
          </div>
          <div class="item">
            <span>班次简称：</span>
            <el-input type="text" v-model="name" class="input"></el-input>
          </div>
          <div class="item">
            <span>状态：</span>
            <el-switch
              v-model="status"
              active-text="启用"
              inactive-text="停用">
            </el-switch>
          </div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        title: '新增班次',
        name: '',
        status: false,
        tabPosition: '1',
        restDayValue: 0
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .default-detail-container
    .content
      width 1000px
      padding 20px
      box-sizing border-box
      margin 0 auto
      box-shadow()
      .header-container
        margin-bottom 20px
        .item
          display inline-block
          margin-right 20px
          span
            display inline-block
            margin-right 10px
          .input
            width 200px
</style>
