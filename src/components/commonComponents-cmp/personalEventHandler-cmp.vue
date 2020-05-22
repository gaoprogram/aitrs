<!--
  User: gaol
  Date: 2019/12/31
  功能： 人事事件处理器组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.personalEventHandlerCmp
    padding 0 20px
    box-sizing  border-box
</style>

<template>
  <div class="personalEventHandlerCmp">
      <el-form label-width="120">
        <el-form-item label="生效日期">
            <el-button type="text">
                1999-05-05
            </el-button>
        </el-form-item>

        <el-form-item label="事件名称">
            <el-button type="text">
                在职
            </el-button>
        </el-form-item>

        <el-form-item label="事件原因">
            <el-button type="text">
                原因
            </el-button>
        </el-form-item>

        <el-form-item label="对象">
            <el-button type="text">
                对象
            </el-button>
        </el-form-item>

        <el-form-item label="名称">
            <el-button type="text">
                名称
            </el-button>
        </el-form-item>        

      </el-form>

      <div class="footerBox">
        <save-footer 
            @save="saveEventHander" 
            @cancel="cancelEventHander"
        ></save-footer>
      </div>

      <!---动态显示当前的执行组件--->
      <!-- showCommonComponents: {{showCommonComponents}} -->
      <div class="commonComponentsBox" v-if="showCommonComponents">
          <el-dialog
            :visible.sync="showCommonComponents"
            :title="commonComponentsTit"
            fullscreen
            :append-to-body="true"
            :close-on-click-modal="false"
          >
            <component :is="currentComponent()">

            </component>
          </el-dialog>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EmpEventHandlerCmp from './empEventHandler-cmp'
  import OrgEventHandlerCmp from './orgEventHandler-cmp'
  import PositionEventHandlerCmp from './positionEventHandler-cmp'
  import JobEventHandlerCmp from './jobEventHandler-cmp'
  export default {
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
      SaveFooter,
      EmpEventHandlerCmp,
      OrgEventHandlerCmp,
      PositionEventHandlerCmp,
      JobEventHandlerCmp
    },
    data(){
      return {
        loading: false,
        showCommonComponents: false,
        commonComponentsTit: ''
      }
    },
    created(){

    },
    methods:{
        currentComponent(){
            switch(this.obj.code){
                // 员工事件处理组件
                case 'empEvent':
                    this.commonComponentsTit = '员工事件处理'
                    return EmpEventHandlerCmp
                // 组织事件处理组件
                case 'orgEvent':
                    this.commonComponentsTit = '组织事件处理'
                    return OrgEventHandlerCmp
                // 职位事件处理组件
                case 'positionEvent':
                    this.commonComponentsTit = '职位事件处理'
                    return PositionEventHandlerCmp
                // 职务事件处理组件
                case 'jobEvent':
                    this.commonComponentsTit = '职务事件处理'
                    return JobEventHandlerCmp
            }
        },
        saveEventHander(){
            debugger
            this.showCommonComponents = true
        },
        cancelEventHander(){
            this.showCommonComponents = false
        }
    }
  }
</script>
