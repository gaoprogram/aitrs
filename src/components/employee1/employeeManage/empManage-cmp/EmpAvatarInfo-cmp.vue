<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工的 详情页面 的头像组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.empAvatarInfoCmp
  text-align center
  .photo
    width 85px
    height 85px
    margin 0 auto
    .svg-icon
      width 100%
      height 100%
  .nameInfoBox
    line-height 24px
    .nameBox
      .name
        font-size 16px
        color #000000
        font-weight bold
      .state
        background-color #606266
        font-size 12px
        color #ffffff
      .markBox
        .tagName
          color #909399
          font-size 12px


   
</style>
<template>
  <div class="empAvatarInfoCmp" v-loading="loading">
      <div class="photo">
        <icon-svg :icon-class="iconPhoto"></icon-svg>
      </div>
      <div class="nameInfoBox">
        <div class="nameBox">
          <span class="name">{{empInfo.name}}</span>
          <span class="state">{{empInfo.state}}</span>
        </div>
        <div class="tag">{{empInfo.tag}}</div>

        <div class="markBox">
          <span v-for="(item,index) in empInfo.mark" :key="item + index">
            <span class="tagName">{{item}}</span>
            <el-divider direction="vertical"></el-divider>
          </span>
        </div>

        <el-button type="text" class="el-icon-caret-right" @click.native="addTag">添加标签</el-button>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import IconSvg from '@/base/Icon-svg/index'
  export default {
    props: {
      empInfo: {
        type: Object,
        default: () => {
          return {
            name: '张三',
            state: '离职 于2017.07.01',
            tag: '产品经理',
            mark: [
              '知人学院', '客户部', '无职级', '哈佛商学院'
            ]
          }
        }
      }
    },
    components: {
      IconSvg
    },
    data(){
        return {
          loading: false,  // 控制 头像部分的loading
          iconPhoto: 'icon-photo'
        }
    },
    created() {
        debugger

    },
    methods: {
      // 添加标签
      addTag(){
        this.$message.success("点击了添加标签的按钮")
      }
    }
  }
</script>
