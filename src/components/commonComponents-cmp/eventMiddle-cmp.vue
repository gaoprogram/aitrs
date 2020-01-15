<!--
  User: gaol
  Date: 2019/12/31
  功能： 事件执行组件middle【组件分组字段部分】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.eventHandlerMiddleBox
    padding 0 20px
    box-sizing  border-box
</style>

<template>
  <div class="eventHandlerMiddleBox" 
    v-if="groupFieldData.length>=0 && currentSelectObj.Id">
    <!-- currentSelectObj: {{currentSelectObj}} -->
    <!-- groupFieldData：{{groupFieldData}} -->
    <el-divider></el-divider>
    <emp-group-field-edit-cmp 
      ref="groupFieldCmp"
      :groupFieldData="groupFieldData"
      :currentSelectObj="currentSelectObj"
      :eventObj="eventObj"
    ></emp-group-field-edit-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import PersonalEventTop from './personalEventHandler-cmp'
//   import OrgEventTop from './orgEventHandler-cmp'
  import EmpGroupFieldEditCmp from './EmpGroupfieldEdit-cmp'
  export default {
    props: {
      // 事件按钮对象
      eventObj: {
        type: Object,
        default: () => {
          return {}
        }
      },      
      currentComponentName: {
        type: String,
        default: ''
      },
      // 分组数据集合
      groupFieldData: {
        type: Array,
        default: () => {
          return []
        }
      },
      //当前选取的员工
      currentSelectObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {
      SaveFooter,
      PersonalEventTop,
      //OrgEventTop,
      EmpGroupFieldEditCmp
    },
    data(){
      return {
        loading: false,

      }
    },
    created(){

    },
    methods:{
        _getCommTables(){

        },
        currentComponent(comName){
            switch(comName){
                // 员工事件
                case 'personalEvent':
                    return PersonalEventTop
                // 组织事件
                case 'orgEvent':
                    return OrgEventTop
                // // 职务事件
                // case 'jobEvent':
                //     return JobEventTop
                // // 职位事件
                // case 'positionEvent':
                //     return PositionEventTop
            }
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getCommTables()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageIndex = val
            this._getCommTables()
        }       
    }
  }
</script>
