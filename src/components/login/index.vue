<!--
  User: xxxxxxx
  Date: 2017/11/13
  功能：登陆页面
-->
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable"
  @import "~common/css/mixin"
 .login-container
   position relative;
   height: 100vh;
   background-color: $color-background;
   background: url('../../assets/login-bg.jpg') repeat-x top left;
   input:-webkit-autofill
     -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
     -webkit-text-fill-color: #fff !important;
   input
     background: transparent;
     border: 0px;
     -webkit-appearance: none;
     border-radius: 0px;
     padding: 12px 5px 12px 15px;
     color: $color-text;
     height: 47px;
   .el-input
     display: inline-block;
     height: 47px;
     width: 85%;
   .tips
     font-size: 14px;
     color: #fff;
     margin-bottom: 10px;
   .svg-container
     padding: 6px 0px 6px 15px;
     color: $color-text;
     vertical-align: middle;
     display: inline-block;
   .title
     font-size: 26px;
     font-weight: 400;
     color: $color-text;
     margin: 0px auto 40px auto;
     text-align: center;
     font-weight: bold;
   .login-form
     position: absolute;
     left: 0;
     right: 0;
     padding: 35px 35px 15px 35px;
     margin: 120px auto;
     background rgba(255,255,255,.5);
     border 1px #d2d2d2 solid;
     border-radius 10px;
     box-shadow 0 0 10px 10px rgba(255,255,255,.5);
     box-sizing border-box;
     .tagBox
      border 1px solid rgba(203, 200, 200, 0.1)
      overflow hidden 
      border-radius 4px
      box-shadow 0 0 10px 10px rgba(203, 200, 200, 0.2)
      .user
        border none !important
        border-radius 0 !important
      .admin
        border none !important
        border-radius 0 !important
     .rememberBox
     .noAccount
      font-size 14px
      text-align center
   .el-form-item
     border-1px()
     background: rgba(203, 200, 200, 0.1);
     border-radius: 5px;
     color: $color-input;
     border 1px solid #f3dcdc;
     margin-bottom: 15px !important
     .el-form-item__content
      display flex
      justify-content flex-start
      align-items center
   .show-pwd
     position: absolute;
     right: 10px;
     top: 7px;
     font-size: 16px;
     color: $color-text;
     cursor: pointer;
   .thirdparty-button
     position: absolute;
     right: 35px;
     bottom: 28px;
</style>
<template>
<el-row>
  <el-col :span="24">
    <div class="login-container">
      <el-col :span="20" style="position: absolute;left:20px;top:0;right:20px;bottom:0;margin:0 auto">
        <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <h3 class="title">才慧云管理系统登录</h3>
          <div class="tagBox u-f-ajc marginB10">
            <el-button 
              class="user" 
              style="width: 50%"
              :type="isAdminOrUser == 1?'primary':''"
              :icon="isAdminOrUser == 1?'el-icon-circle-check':''"
              @click="switchUser"
            >用户</el-button>
            <el-button 
              style="width: 50%;margin-left:0"
              :type="isAdminOrUser == 2?'primary':''"
              :icon="isAdminOrUser == 2?'el-icon-circle-check':''"
              class="admin" 
              @click="switchAdmin">管理员</el-button>
          </div>

          <el-form-item 
            prop="businessCode" v-show="isAdminOrUser == 1">
            <span class="svg-container svg-container_login">
              <i class="el-icon-mobile-phone"></i>
            </span>
            <el-input 
              name="username" 
              type="text" 
              v-model="loginForm.businessCode" 
              autoComplete="on" 
              placeholder="企业编号" />
          </el-form-item>    

          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <i class="el-icon-mobile-phone"></i>
            </span>
            <el-input 
              name="username"
                type="text" 
                v-model="loginForm.username" 
                autoComplete="on" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <i class="el-icon-bell"></i>
            </span>
            <el-input name="password"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="密码"
            />
            <span class='show-pwd' @click='showPwd'><i class="el-icon-view"></i></span>
          </el-form-item>

          <sliding-validate-cmp @slidingSuccess="slidingSuccess"></sliding-validate-cmp>

          <el-button 
            type="primary"
            :disabled="!slidingValidStatus"
            class="marginT10"
            style="width:100%;height:45px;
            background-color: #FF6738 !important;border: none"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录</el-button>

          <div class="rememberBox marginT10 u-f-jsb u-f-ac">
            <el-checkbox class="tit">记住我</el-checkbox>
            <el-button type="text" @click.native="handlerForgetPassWord">忘记密码?</el-button>
          </div>

          <p class="noAccount u-f-ajc">
            <span>没有账号？</span>
            <el-button type="text" @click.native="handlerRegister">立即注册</el-button>
          </p>
        </el-form>
      </el-col>

    </div>
  </el-col>
</el-row>
</template>

<script type="text/ecmascript-6">
  import * as config from 'api/config'
  import { Message } from 'element-ui'
  import slidingValidateCmp from '@/base/SlidingValid/SlidingValid'
  export default {
    name: 'login',
    components: {
      slidingValidateCmp
    },
    data () {
      const validateBusinessCode = (rule, value, callback) => {
        if (!value.trim().length) {
          callback(new Error('请输入企业号'))
        } else {
          callback()
        }
      }
      const validateUsername = (rule, value, callback) => {
        if (!value.trim().length) {
          callback(new Error('请输入帐号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        isAdminOrUser: 1, // 1是 用户 2 是管理员
        loginForm: {
          businessCode: '80000000',
          username: '90032',
          password: '868686'
        },
        loginRules: {
          businessCode: [{required: true, trigger: 'blur', validator: validateBusinessCode}],
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        pwdType: 'password',
        slidingValidStatus: false,
        loading: false,
        showDialog: false,
        errorText: ''
      }
    },
    methods: {
      showPwd () {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      slidingSuccess(){
        debugger
        this.slidingValidStatus = true
      },
      switchUser(){
        this.isAdminOrUser = 1
      },
      switchAdmin(){
        this.isAdminOrUser = 2
      },   
      handlerRegister(){
        this.$router.push({
          path: '/register',
        })
      },   
      handlerForgetPassWord(){
        debugger
        this.$router.push({
          path: '/forgetWord'
        })
      },
      handleLogin () {
        if(!this.slidingValidStatus){
          // this.$message.info("请滑动验证")
          return 
        }
        this.$refs.loginForm.validate(valid => {
          debugger
          if (valid) {
            this.loading = true
            // 验证通过之后，store 中 调用接口异步存入
            debugger
            this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
              this.loading = false
              if (res == 1) {
                // 1 是表示登陆成功
                debugger
                this.$router.push({path: '/'})
              } else {
                debugger
                this.switchError(res)
                Message.error(`登录失败，${this.errorText}，请重试!`)
              }
            }).catch(() => {
              this.loading = false
              Message.error('登录失败，网络超时，请重试!')
              // this.$router.push({path: '/'})
            })
          } else {
            return false
          }
        })
      },
      switchError (num) {
        switch (num) {
          case config.NO_USER:
            this.errorText = '用户不存在'
            break
          case config.LIMIT_LOGIN:
            this.errorText = '用户被限制登录'
            break
          case config.ERR_PWD:
            this.errorText = '密码错误'
            break
          case config.DOUBLE_DEVICE:
            this.errorText = '多设备登录'
            break
          case config.NO_ACTIVE:
            this.errorText = '用户未激活'
            break
          case config.STOP_USER:
            this.errorText = '用户已停用'
            break
          default:
            this.errorText = '登录失败'
        }
      }
    },
    created () {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed () {
      // window.removeEventListener('hashchange', this.afterQRScan)
    }
  }
</script>

