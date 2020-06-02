<!--
  User: xxxxxxx
  Date: 2020/06/01
  功能：注册
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
      .stepNum
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
  margin-top 10px
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
  .cancelBtn
    width 100% !important
    margin 10px auto 0  !important
    background #909399 !important
    border-color #909399 !important
    &:hover
      border-color #909399 !important
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

    <div class="valideAccount animated fadeIn" v-show="currentIndex == 0">
      form1
      <el-form 
        label-width="100px" 
        :model="valideAccountForm" 
        :rules="accountRules">
        <el-row>
          <el-col  :span="24">
            <el-form-item label="用户名">
              <el-input placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="24">
            <el-form-item label="设置密码">
              <el-input placeholder="请设置初始密码"></el-input>
            </el-form-item>
          </el-col>  

          <el-col  :span="24">
            <el-form-item label="确认密码">
              <el-input placeholder="请再次输入密码"></el-input>
            </el-form-item>
          </el-col>        

          <el-col  :span="24">
            <el-form-item label="邮箱">
              <el-input placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>   

          <el-col  :span="24">
            <el-form-item label="企业电话">
              <el-col :span="24" class="u-f-ajc">
                <el-input placeholder="请输入区号" class="marginR5"></el-input>
                <el-input placeholder="请输入电话"></el-input>
              </el-col>
            </el-form-item>
          </el-col> 

          <el-col :span="24">
            <el-form-item label="省市区">
              <dist-picker-cmp
                :placeholders = "{
                  province: '--省--',
                  city: '--市--',
                  area: '--区--'
                }"
              ></dist-picker-cmp>
            </el-form-item>
          </el-col>    

          <el-col  :span="24">
            <el-form-item label="手机号">
              <el-col :span="24" class="u-f-ajc">
                <el-input placeholder="请输入验证码" class="marginR5">
                </el-input>
                <el-button type="primary">点击获取验证</el-button>
              </el-col>
            </el-form-item>
          </el-col>       

          <el-col  :span="24">
            <el-form-item label="验证码">
              <el-input placeholder="请输入验证码"></el-input>
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

    <div class="resetWord animated fadeIn" v-show="currentIndex == 1">
      form2
      <el-form 
        label-width="100px" 
        :model="valideAccountForm" 
        :rules="accountRules">
        <el-row>
          <el-col  :span="24">
            <el-form-item label="企业名称">
              <el-input placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="24">
            <el-form-item label="企业简称">
              <el-input placeholder="请输入企业简称"></el-input>
            </el-form-item>
          </el-col>  

          <el-col  :span="24">
            <el-form-item label="联系人">
              <el-input placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>        

          <el-col :span="24">
            <el-form-item label="省市区">
              <dist-picker-cmp
                :placeholders = "{
                  province: '--省--',
                  city: '--市--',
                  area: '--区--'
                }"
              ></dist-picker-cmp>
            </el-form-item>
          </el-col>    

          <el-col  :span="24">
            <el-form-item label="企业地址">
              <el-col :span="24">
                <el-input placeholder="请输入企业地址">
                </el-input>
              </el-col>
            </el-form-item>
          </el-col>       

          <el-col  :span="24">
            <el-form-item label="人员规模">
              <el-select filterable style="width: 100%">
                <el-option label="0~20" value="1"></el-option>
                <el-option label="21~100" value="2"></el-option>
                <el-option label="101~300" value="3"></el-option>
                <el-option label="301~500" value="4"></el-option>
                <el-option label="501~1000" value="5"></el-option>
                <el-option label="1000以上" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col  :span="24">
            <el-form-item label="企业性质">
              <el-select filterable style="width: 100%">
                <el-option label="民营" value="1"></el-option>
                <el-option label="外商独资" value="2"></el-option>
                <el-option label="合资" value="3"></el-option>
                <el-option label="中外合作" value="4"></el-option>
                <el-option label="国企" value="5"></el-option>
                <el-option label="股份制" value="6"></el-option>
                <el-option label="上市公司" value="7"></el-option>
                <el-option label="国家机关" value="8"></el-option>
                <el-option label="事业单位" value="9"></el-option>
                <el-option label="其他" value="10"></el-option>
              </el-select>
            </el-form-item>
          </el-col>  

          <el-col  :span="24">
            <el-form-item label="所属行业">
              <el-select filterable style="width: 100%">
                <el-option label="IT电子|通信互联网" value="1"></el-option>
                <el-option label="金融业" value="2"></el-option>
                <el-option label="房产建筑" value="3"></el-option>
                <el-option label="生产|加工|制造" value="4"></el-option>
                <el-option label="能源|矿产|环保" value="5"></el-option>
                <el-option label="交通|运输|物流|仓储" value="6"></el-option>
                <el-option label="商业服务" value="7"></el-option>
                <el-option label="个人服务业" value="8"></el-option>
                <el-option label="贸易|批发|零售|租赁业" value="9"></el-option>
                <el-option label="文化传媒|娱乐休闲|工艺美术" value="10"></el-option>
                <el-option label="政府|非盈利机构" value="11"></el-option>
                <el-option label="医药医疗器械" value="12"></el-option>
                <el-option label="农|林|牧|渔|其他" value="13"></el-option>
              </el-select>
            </el-form-item>
          </el-col>           

        </el-row>    
      </el-form>
      
      <el-col :span="24" class="agreement" style="padding-left: 100px">
        <el-checkbox>
        </el-checkbox>
        <span>
          我已阅读
        </span>
        <el-button type="text" style="color: red" @click="clickUserAgreement">
          用户协议
        </el-button>
        <span>及</span>
        <el-button type="text" style="color: red" @click="clickProtectAgreement">
          保护协议
        </el-button>  
        <span>,并同意</span>      
      </el-col>
      <el-col  class="nextBtnWrap" :span="24">
        <el-button type="primary" class="nextBtn">
          提交
        </el-button>
        <el-button type="primary" class="cancelBtn">
          取消
        </el-button>        
      </el-col>     
    </div>     

    <div class="setSuccess animated fadeIn" v-show="currentIndex == 2">
      恭喜注册成功！
    </div>    
  </el-col>

  <div class="agreeMentDialog" v-if="showUserAgreement">
    <el-dialog
      title="用户协议"
      :append-to-body="true"
      :close-on-click-modal="true"
      :visible.sync="showUserAgreement"
    >
      <service-agreement-cmp 
        :agreementData="agreementData"
      ></service-agreement-cmp>
    </el-dialog>
  </div>

  <div class="confidentialtyDialog" v-if="showConfidentialty">
    <el-dialog
      title="保密协议"
      :append-to-body="true"
      :close-on-click-modal="true"
      :visible.sync="showConfidentialty"
    >
      <confidentiality-agreement-cmp 
        :agreementData="agreementData"
      ></confidentiality-agreement-cmp>
    </el-dialog>
  </div>  
</el-row>
</template>

<script type="text/ecmascript-6">
  import * as config from 'api/config'
  import { Message } from 'element-ui'
  import DistPickerCmp from '@/base/DistPicker/DistPicker-cmp'
  import confidentialityAgreementCmp from './confidentialityAgreement'
  import serviceAgreementCmp from './serviceAgreement'
  export default {
    name: 'register',
    components: {
      DistPickerCmp,
      confidentialityAgreementCmp,
      serviceAgreementCmp
    },
    data () {
      return {
        currentIndex: 0,
        showUserAgreement: false,
        showConfidentialty: false,
        titList: [
          {
            num: 1,
            tit: '填写账号信息'
          },
          {
            num: 2,
            tit: '企业详细信息'
          },
          {
            num: 3,
            tit: '注册成功'
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
        this.currentIndex = index
      },
      clickUserAgreement(){
        this.showUserAgreement = true
      },
      clickProtectAgreement(){
        this.showConfidentialty = true
      },
    }
  }
</script>

