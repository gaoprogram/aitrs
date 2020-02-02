<!--
  User: gaol
  Date: 2019/8/9
  功能： 合同管理 中合同 详情页面 的头像组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.empAvatarInfoCmp
  min-height 160px
  margin-bottom 10px
  position relative
  text-align center
  .photo
    width 85px
    height 85px
    margin 0 auto
    .svg-icon
      width 100%
      height 100%
    .pic
      width 100% !important
      height 100% !important
      border-radius 50%
      margin 0 auto
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
        padding 1px 
        box-sizing border-box
      .time
        font-size 12px
      .markBox
        .tagName
          color #909399
          font-size 12px
  .empStatus
    position absolute
    width 300px
    top 0
    right 10px
    height 100%
    overflow hidden


   
</style>
<template>
  <div class="empAvatarInfoCmp" v-loading="loading">
    <!-- empInfo:{{empInfo}} -->
    <div class="photo">
      <!--有头像显示头像--start-->
      <!-- <image 
        class="pic"
        v-if="empInfo.ImgUrl"
        :src="empInfo.ImgUrl"
      ></image> -->

      <el-image
        class="pic"
        v-if="empInfo.ImgUrl"
        style="width: 100px; height: 100px"
        :src="empInfo.ImgUrl"
        fit="fill">
      </el-image>      
      <!--有头像显示头像--end-->   

      <!--默认的头像---start-->
      <icon-svg 
        v-else
        :icon-class="iconPhoto"
      ></icon-svg>        
      <!---默认的头像---end-->
    </div>

    <!---员工姓名、职务等信息展示区---start-->
    <div class="nameInfoBox">
      <div class="nameBox">
        <span class="name">{{empInfo.EmpName}}</span>
        <span class="state">{{empInfo.EmpStatusString}}</span>
        <span class="time" 
          v-if="empInfo.EmpStatus !='-1'"
        >
          {{empInfo.EntryDate | replaceTime}}
        </span>

        <span class="time" 
          v-if="empInfo.EmpStatus ==='-1'"
        >
          {{empInfo.DimissionDate | replaceTime}}
        </span>    
      </div>

      <div class="tag">{{empInfo.tag}}</div>

      <div class="markBox">
        <!-- <span v-for="(item,index) in empInfo.mark" :key="item + index">
          <span class="tagName">{{item}}</span>
          <el-divider direction="vertical"></el-divider>
        </span> -->
        <span class="tagName">{{empInfo.OrgName}}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="tagName">{{empInfo.PositionName}}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="tagName">{{empInfo.JobName}}</span>
      </div>

      <!-- <el-button type="text" class="el-icon-caret-right" @click.native="addTag">添加标签</el-button> -->
    </div>
    <!---员工姓名、职务等信息展示区---end-->
 
  </div>
</template>

<script type="text/ecmascript-6">
  import IconSvg from '@/base/Icon-svg/index'
  export default {
    props: {
      // 头像、级别等信息
      empInfo: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 在职员工列表页中点击的当前员工对象信息
      empObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 是否是合同管理中的 员工头像区
      isContractManageDetail: {
        type: Boolean,
        default: false
      }
    },
    components: {
      IconSvg
    },
    data(){
        return {
          loading: false,  // 控制 头像部分的loading
          empStatusStr: 'onTheJob',  // 员工的状态：在职 onTheJob  离职 leaveJob  待入职  waitEmployee
          iconPhoto: '',
        }
    },
    created() {
      debugger
      setTimeout(() => {
        this.iconPhoto = 'icon-photo'        
      }, 500)
    },
    methods: {
      // 添加标签
      addTag(){
        this.$message.success("点击了添加标签的按钮")
      }
    }
  }
</script>
