<!--
  User: gaol
  Date: 2019/9/29
  功能： 员工详情页面中 点击 离职 btn后的  弹框组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.leaveJob
  .list
    height 25px
    line-height 25px
    .tit 
      display inline-block
      width 90px
      margin-right 30px
      text-align right
      font-weight bold
      
       
</style>
<template>
  <div class="leaveJob-cmp" v-loading= 'loading'>
    <el-dialog
        title="离职信息"
        width="30%"
        append-to-body
        custom-class="leaveJob"
        :visible.sync="dialogVisible"
    > 
        <div class="list">
            <span class="tit">离职日期</span>
            <span class="value">2019-08-08</span>
        </div>
        <div class="list">
            <span class="tit">离职申请日</span>
            <span class="value">2019-08-08</span>
        </div>
        <div class="list">
            <span class="tit">离职原因</span>
            <span class="value">2019-08-08</span>
        </div>
        <div class="list">
            <span class="tit">离职子原因</span>
            <span class="value">2019-08-08</span>
        </div>
        <div class="list">
            <span class="tit">离职说明</span>
            <span class="value">2019-08-08</span>
        </div>
        <div class="list">
            <span class="tit">工资结算日</span>
            <span class="value">2019-08-08</span>
        </div>  
        <div class="list">
            <span class="tit">奖金结算日</span>
            <span class="value">2019-08-08</span>
        </div>                                               

        <!---底部保存按钮区域--start-->
        <save-footer :saveBtnIsShow="false" @cancel="cancel"></save-footer>        
        <!--底部保存按钮区域----end-->    
    </el-dialog> 
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  export default {
    props: {
      showCommonDialog: {
        type: Boolean,
        default: false
      }
    },
    components:{
      SaveFooter
    },
    data(){
        return {
          loading: false,
          dialogVisible: this.showCommonDialog,
          tableData: [{
            date: '2016-05-02',
            currentValue: '2019-05-05',
            afterValue: '2019-08-08'
          }]            
        }
    },
    created() {
        debugger
    },
    watch: {
      dialogVisible: {
        handler(newValue, oldValue){
          debugger
          this.$emit("update:showCommonDialog", newValue)
        }
      }
    },
    methods: {
        //取消
        cancel(){
          this.dialogVisible = false
        },
    }
  }
</script>
