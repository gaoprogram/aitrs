<!--
  User: gaol
  Date: 2019/12/31
  功能： 员工事件处理器组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.empEventHandlerCmp
  padding 0 20px
  box-sizing  border-box
</style>

<template>
  <div class="empEventHandlerCmp">
    <!-- 员工事件处理器
    eventObj: {{eventObj}}
    ---
    eventCode: {{eventCode}}
    ---
    eventTarget: {{eventTarget}} -->
    <!-- empInfo: {{empInfo}} -->
    <!---员工事件组件--->
    <template v-if="eventTarget === 'Emp'">
      <!--top---->
      <div class="topBox">
        <event-top-cmp
          :currentComponentName="eventObj.EventTarget"
          :eventObj = "eventObj"
          eventTarget = "Emp"
          :empInfo="empInfo"
          @changeEmp="changeEmp"
        ></event-top-cmp>
      </div>

      <!--middle部分--->
      <div class="middleBox" v-loading="middleContentLoading">
        <event-middle-cmp
          ref="middleEventCmp"
          v-show="currentSelectObj.Id"
          :currentComponentName="eventObj.EventTarget"
          :eventObj = "eventObj"
          :firstPageObj="firstPageObj"
          :taskCode="taskCode"
          :currentSelectObj="currentSelectObj"
          :groupFieldData="groupFieldData"
          :isEventDetail="isEventDetail"
        ></event-middle-cmp>
      </div>

      <!---bottom底部部分--->
      <div class="bottomBox" v-loading="bottomContentLoading">
        <event-bottom-cmp
          :currentComponentName="eventObj.EventTarget"
          :eventObj = "eventObj"
        ></event-bottom-cmp>
      </div>
    </template> 
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EventTopCmp from './eventTop-cmp'
  import EventMiddleCmp from './eventMiddle-cmp'
  import EventBottomCmp from './eventBottom-cmp'
  import { 
    loadEvent
  } from '@/api/employee'
  export default {
    props: {
      // false是员工详情页的分组  true是事件详情页的分组 
      isEventDetail: {
        type: Boolean,
        default: true
      },
      // 员工信息对象
      empInfo: {
        type: Object,
        default: () => {
          return {}
        }
      },
      eventObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      eventRootObj: {
        type: Object,
        default: () => {
          return {}
        }
      },      
      firstPageObj:{
        type: Object,
        default: () => {
          return {}
        }
      },
      taskCode: {
        type: String,
        default: () => {
          return ' '
        }
      },        
      eventCode: {
        type: String,
        default: ''
      },
      eventTarget: {
        type: String,
        default: ''
      }
    },
    components: {
      SaveFooter,
      EventTopCmp,
      EventMiddleCmp,
      EventBottomCmp
    },
    data(){
      return {
        loading: false,  
        groupFieldData: [],// 中间分组field 数据集合
        middleContentLoading: false,  // 中间数据部分的loading状态
        bottomContentLoading: false, // 底部数据部分的loading状态
        currentSelectObj: {},  // 人员选择器选中 人员、组织、岗位、职位、职务之后的对象
      }
    },
    created(){
      this.$bus.$on("delPeopleItem", () => {
        this.currentSelectObj = {} 
      })
    },
    beforeDestroy(){
      this.$bus.$off("delPeopleItem")
    },
    watch: {
      'currentSelectObj.Id': {
        handler(newValue, oldValue){
          debugger
          if(newValue){
            // this._loadEvent(this.eventObj.EventCode, 'PA', newValue)
            // 直接调用 eventMiddle-cmp 组件中的 loadEvent 事件
            this.$refs.middleEventCmp._loadEvent(this.eventObj.EventCode, 'PA', newValue)
          }
        },
        immediate: true
      }      
    },
    methods:{
      // 获取分组字段field数据
      // _loadEvent(EventCode,moduleCode, Mid){
      //   this.middleContentLoading = true
      //   loadEvent(EventCode,moduleCode, Mid).then(res => {
      //     this.middleContentLoading = false
      //     if(res && res.data.State === REQ_OK){
      //       this.groupFieldData = res.data.Data
      //     }else {
      //       this.$message.error(`获取分组field数据失败,${res.data.Error}`)
      //     }
      //   })
      // },
      changeEmp(empArr){
        debugger
        if(empArr && empArr.length){
          this.currentSelectObj = empArr[0]
          // this.$emit("selectedEmp", empArr)
          // this._loadEvent(this.eventObj.EventCode,'PA', empArr[0].Id)
        }
      },
      saveEventBtnHandler(){
        // 先验证必填项 再 保存（Excute）
        // this.$emit("validateSuccess", this.)
      }
    }
  }
</script>
