<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工的 详情页面 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

.empDetailInfoCmp
    height 100%
    overflow auto
    .top
    .containerBox
        min-width 500px
        margin 0 auto
        >>>.el-tabs
            .el-tabs__header
                margin 0 auto
                .el-tabs__nav-wrap
                    .el-tabs__nav-scroll
                        display flex
                        justify-content center
            .el-tabs__content
                padding 10px 
                box-sizing border-box
                min-height 100px
                // border 1px solid red


   
</style>
<template>
  <div class="empDetailInfoCmp" v-loading="loading">
    <!--头像区--start-->
    <div class="top">
        <emp-avatar-info-cmp></emp-avatar-info-cmp>
    </div>
    <!--头像区--end-->

    <!--分组信息展示区--start-->
    <div class="containerBox">
        <el-tabs v-model="activeName" @tab-click="clickGroupFirst">
            <el-tab-pane label="在职记录" name="first">
                <el-tag type="success">基本信息</el-tag>
                <el-tag type="success">任职记录</el-tag>
                <el-tag type="success">关键日期</el-tag>
                <el-tag type="success">联系信息</el-tag>
                <el-tag type="success">考勤信息</el-tag>
                <el-tag type="success">公时信息</el-tag>
            </el-tab-pane>
            <el-tab-pane label="个人资料" name="second">
                <el-tag type="success">薪资</el-tag>
                <el-tag type="success">社保公积金</el-tag>
                <el-tag type="success">员工档案</el-tag>
                <el-tag type="success">工作技能</el-tag>
                <el-tag type="success">培训技能</el-tag>
                <el-tag type="success">个人信息</el-tag>
            </el-tab-pane>
            <el-tab-pane label="合同信息" name="third">
                <el-tag type="success">工作履历</el-tag>
                <el-tag type="success">教育经历</el-tag>
                <el-tag type="success">家庭成员</el-tag>
                <el-tag type="success">证书职称</el-tag>
                <el-tag type="success">语言能力</el-tag>
                <el-tag type="success">伤残</el-tag>                
            </el-tab-pane>
            <!-- <el-tab-pane label="角色管理" name="e">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="r">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="y">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="g">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="d">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="gf">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="fg">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="a">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="gr">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="gh">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="as">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="re">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="ds">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="arf">角色管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="e">角色管理</el-tab-pane> -->
            <el-tab-pane label="银行信息" name="fourth">
                <el-tag type="success">大病记录</el-tag>
                <el-tag type="success">住房</el-tag>
                <el-tag type="success">签证</el-tag>
                <el-tag type="success">体验</el-tag>
                <el-tag type="success">劳动合同</el-tag>
                <el-tag type="success">劳务协议</el-tag>                  
            </el-tab-pane>
        </el-tabs>        
    </div>
    <!--分组信息展示区--end-->
  </div>
</template>

<script type="text/ecmascript-6">
    import EmpAvatarInfoCmp from './EmpAvatarInfo-cmp'
  export default {
    components: {
        EmpAvatarInfoCmp
    },
    props: {

    },
    data(){
        return {
            loading: false, 
            activeName: 'second', // 当前 的
        }
    },
    created() {
        debugger

    },
    methods: {
        // 点击一级分组
        clickGroupFirst(){

        }
    }
  }
</script>
