<!--
  User: xxxxxxx
  Date: 2017/11/13
  功能：忘记密码
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.titHead
  .stepWrap
    .setItem
      margin 0 10px
      padding 5px 10px
      font-size 14px
      box-sizing border-box
      &.current
        border-bottom 2px solid #FF4001
        transform scale(1.1)
        color red
        transition all .2s
        &.stepNum
          width 15px
          line-height 15px
          height 15px
          margin-right 2px
          font-size 12px
          text-align center
          background #FF4001
          border-radius 50%
          color #ffffff      
.nextBtnWrap
  padding-left 100px
  .nextBtn
    width 100%
    margin 0 auto
    background #FF4001 !important
    border-color #FF4001 !important
    &:hover
      border-color #FF4001 !important
      opacity .9
      &:active
        opacity .7
        &::before
          opacity .7
</style>
<template>
<el-row>
  <el-col :span="24" style="padding: 20px">
    <div class="titHead line-bottom">
      <ul class="stepWrap u-f-ajc">
        <li
          v-for="(item, key) in titList" 
          :key="key"
          class="setItem u-fi-ajc u-f0" 
          :class="currentIndex == key?'current':''"
          @click="handlerClickTit(item,key)"
        >
          <span class="stepNum">{{item.num}}</span>
          <span class="setTit">{{item.tit}}</span>
        </li>
      </ul>          
    </div>

    <div class="valideAccount" v-show="currentIndex == 0">
      form1
      <el-form 
        label-width="100px" 
        :model="valideAccountForm" 
        :rules="accountRules">
        <el-row>
          <el-col  :span="24">
            <el-form-item label="用户名">
              <el-input label="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-col  :span="24">
            <el-form-item label="验证码">
              <el-input label="请输入验证码"></el-input>
            </el-form-item>
          </el-col>     
      </el-form>

      <el-col  class="nextBtnWrap" :span="24">
        <el-button type="primary" class="nextBtn">
          下一步
        </el-button>
      </el-col>    
    </div>

    <div class="resetWord" v-show="currentIndex == 1">
      form2
      <el-form 
        label-width="100px" 
        :model="valideAccountForm" 
        :rules="accountRules">
        <el-row>
          <el-col  :span="24">
            <el-form-item label="用户名">
              <el-input label="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="24">
            <el-form-item label="验证码">
              <el-input label="请输入验证码"></el-input>
            </el-form-item>
          </el-col>            
        </el-row>   
      </el-form>
      
      <el-col  class="nextBtnWrap" :span="24">
        <el-button type="primary" class="nextBtn">
          下一步
        </el-button>
      </el-col>    
    </div>     

    <div class="setSuccess" v-show="currentIndex == 2">
      form3
      <el-form 
        label-width="100px" 
        :model="valideAccountForm" 
        :rules="accountRules">
        <el-row>
          <el-col  :span="24">
            <el-form-item label="用户名">
              <el-input label="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-col  :span="24">
            <el-form-item label="验证码">
              <el-input label="请输入验证码"></el-input>
            </el-form-item>
          </el-col>     
      </el-form>
    </div>    
  
  </el-col>
</el-row>
</template>

<script type="text/ecmascript-6">
  import * as config from 'api/config'
  import { Message } from 'element-ui'
  export default {
    name: 'forgetWord',
    components: {

    },
    data () {
      return {
        currentIndex: 0,
        titList: [
          {
            num: 1,
            tit: '验证身份'
          },
          {
            num: 2,
            tit: '重置密码'
          },
          {
            num: 3,
            tit: '修改成功'
          },                    
        ],
        valideAccountForm: {

        }    
      }
    },
    created(){

    },
    methods: {
      handlerClickTit(item, index){
        // this.currentIndex = index
      },
    }
  }
</script>

