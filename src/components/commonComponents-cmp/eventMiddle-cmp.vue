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
  <div 
    class="eventHandlerMiddleBox" 
    v-loading = "loading"
    v-if="groupFieldData.length>=0 
          && currentSelectObj.Id">
    <!-- currentSelectObj: {{currentSelectObj}} -->
    <!-- eventMiddle-cmp 组件中：
    groupFieldData：{{groupFieldData}} -->
    <el-divider></el-divider>
    <group-field-cmp    
      ref="groupFieldCmp"
      :groupFieldData="groupFieldData"
      :empObj="currentSelectObj"
      :eventObj="eventObj"
      :firstPageObj="firstPageObj"
      :isEventDetail="isEventDetail"
      :taskCode="taskCode"
      @clickAddNewGroup="clickAddNewGroup"
      @clickEditFieldBtn="clickEditFieldBtn"
      @emitScanLog="scanLog"
      @emitDeleteSuccess="emitDeleteSuccess"      
      @refreshGroupData="refreshGroupData"
    ></group-field-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  // import OrgEventTop from './orgEventHandler-cmp'
  // import EmpGroupFieldEditCmp from './EmpGroupfieldEdit-cmp'
  // 引用跟 员工详情页面中的 字段 组件 BasicGroupfield-cmp
  import groupFieldCmp from '@/components/employee/employeeManage/empManage-cmp/BasicGroupfield-cmp'
  import {
    loadEvent
  } from '@/api/employee'
  export default {
    props: {
      // false是员工详情页的分组  true是事件详情页的分组 
      isEventDetail: {
        type: Boolean,
        default: false
      },      
      // 事件按钮对象
      eventObj: {
        type: Object,
        default: () => {
          return {}
        }
      }, 
      firstPageObj: {
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
      currentComponentName: {
        type: String,
        default: ''
      },
      // 分组数据集合
      // groupFieldData: {
      //   type: Array,
      //   default: () => {
      //     return []
      //   }
      // },
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
      groupFieldCmp
    },
    data(){
      return {
        loading: false,
        groupFieldData: [], // 分组数据
      }
    },
    created(){

    },
    methods:{
      _getCommTables(){
        this._loadEvent(this.eventObj.EventCode, 'PA', this.currentSelectObj.EmpId)
      },
      // 获取分组字段field数据
      _loadEvent(EventCode,moduleCode, Mid){
        this.loading = true
        loadEvent(EventCode,moduleCode, Mid).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.groupFieldData = res.data.Data
          }else {
            this.$message.error(`获取分组field数据失败,${res.data.Error}`)
          }
        })
      },   
      refreshGroupData(){
        this._getCommTables()
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
      // 新增field 分组
      clickAddNewGroup(teamData){
        debugger
        // 将 this.groupFieldData 的值 复制一份
        this.isAddField = true
        // 显示新增分组的弹框
        this.addNewFieldShow = true
        this.currentAddFieldObj = teamData

        let TeamCode = teamData.TeamCode
        if(TeamCode){
          // 通过 teamCode来 调取接口 获取增加弹框中的内容
          this._getField(TeamCode).then(res => {
            debugger
            if(res && res.data.State === REQ_OK){
              this.addGroupFieldData = res.data.Data
            }
          })
        }
      }, 
      // 编辑field字段
      clickEditFieldBtn(rowObj, teamObj){
        debugger
        this.currentEditRowObj = rowObj
        this.currentEditTeamObj = teamObj

        this.isEditField = true
        // 显示编辑字段的弹框
        this.editFieldShow = true 

        // this.fieldLoading = true         
        // 根据 teamCode 来调取接口来获取字段完整属性
        // this._getField(teamCode).then(res => {
        //     debugger
        //     this.fieldLoading = false
        //     if(res && res.data.State === REQ_OK){
        //         this.editFieldData = res.data.Data
        //     }else {
        //         this.$message({
        //             type: 'error',
        //             message: `数据获取失败err,${res.data.Error}`
        //         })
        //     }              
        // }).catch(() => {
        //     this.$message({
        //         type: 'error',
        //         message: `数据获取失败err,${res.data.Error}`
        //     })
        // })
        if(rowObj && rowObj.FieldValueSet && rowObj.FieldValueSet.length){
          this.editFieldData = rowObj 
        }else {
          this.editFieldData = {}
        }
      },
      // 查看操作记录
      scanLog() {
        debugger
        this.showScanEditLog = true
      },
      emitDeleteSuccess(){
        // this._getCommData()
      },      
    }
  }
</script>
