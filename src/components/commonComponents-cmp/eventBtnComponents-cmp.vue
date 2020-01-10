<!--
  User: gaol
  Date: 2019/12/31
  功能： 员工事件btn 组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.empEventBtnCmp
    padding 0 20px
    box-sizing  border-box
    .itemBtn
      width 45%
      margin 5px !important
</style>

<template>
  <div class="empEventBtnCmp">
    <el-button
        class="itemBtn" 
        type="primary" 
        size="mini"
        v-for="(btn, key) in eventBtn"     
        :key="btn.EventCode"    
        @click.native="handlerClickEventBtn(btn, key)" 
    >
        {{btn.EventName}}
    </el-button>
    
    <div class="" v-if="showCommonEventEditDialog">
        <el-dialog 
            :title="currentName"
            append-to-body
            :close-on-click-modal="false"
            :visible.sync="showCommonEventEditDialog"
        >
            fdjfkd
        </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 事件按钮 集合
        eventBtn: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
      SaveFooter,
    },
    data(){
      return {
        loading: false,
        showCommonEventEditDialog: false,
        currentName: ''
      }
    },
    created(){

    },
    methods:{
      // 点击了 头像区旁边的 btn按钮
      handlerClickEventBtn(BtnObj,index){
        this.currentName = BtnObj.EventName
        debugger
        // this.$notify({
        //   title: '提示',
        //   message: '功能正在开发中。。。',
        //   color: 'red',
        //   duration: 0
        // })
        const h = this.$createElement
        this.$notify({
          title: '标题名称',
          message: h('i', { style: 'color: teal'}, '功能正在开发中。。。')
        })
        
        // 调用统一的 事件修改组件
        this.showCommonEventEditDialog = true
      }
    }
  }
</script>
