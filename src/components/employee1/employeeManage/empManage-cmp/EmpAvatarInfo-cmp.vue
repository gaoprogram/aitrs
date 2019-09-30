<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工的 详情页面 的头像组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.empAvatarInfoCmp
  position relative
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
  .empStatus
    position absolute
    top 0
    right 10px
    height 100%


   
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

      <!--员工状态操作区---start-->
      <div class="empStatus">
        <emp-status-info-cmp :empStatus = 'empInfo.empStatusStr'></emp-status-info-cmp>
      </div>
      <!--员工状态操作区---end-->        
  </div>
</template>

<script type="text/ecmascript-6">
  import IconSvg from '@/base/Icon-svg/index'
  import EmpStatusInfoCmp from './EmpStatusInfo-cmp'
  export default {
    props: {
      empInfo: {
        type: Object,
        default: () => {
          return {
            name: '张三',
            empStatusStr: 'leaveJob',  // 员工的状态 在职： onTheJob, 离职：leaveJob， 待入职: waitJoinJob
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
      IconSvg,
      EmpStatusInfoCmp
    },
    data(){
        return {
          loading: false,  // 控制 头像部分的loading
          iconPhoto: 'icon-photo',
          empStatusStr: 'onTheJob',  // 员工的状态：在职 onTheJob  离职 leaveJob  待入职  waitEmployee
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
