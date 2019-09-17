<!--
  User: gaol
  Date: 2019/6/21
  功能：流程轨迹弹框
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .travelDetail-component-container
    min-height 200px
    max-height 500px
    overflow-y scroll
    .main-content
    .maintableInfoBox /deep/
      .el-scrollbar
       .el-scrollbar__view
        .main_form
          .field
            margin 10px 0
        .teamBox
          border-bottom 1px solid #dedede
          margin-top 10px
          .team-title
            font-weight bold
          .main_form
            .field
              margin 10px 0


</style>

<template>
  <div :class="['travelDetail-component-container',!mainTables.length? 'not_found': '']" v-loading="loading">
    <!-- 这是轨迹弹框： travelData：{{travelData}} -->
    <!--主表tabs显示区域----start--->
    <div class="main-content">
      <!-- mainTables： {{mainTables}} -->
      <el-tabs class="mainTab" v-model="currentMainTableCode" type="card" @tab-click="handleClickMainTableTab">
        <el-tab-pane
          v-for="item in mainTables"
          :key="item.TableCode"
          :label="item.TableName"
          :name="item.TableCode"
        >
        </el-tab-pane>
      </el-tabs>
      <!--主表tabs显示区域----start--->    
      <div class="maintableInfoBox">
        <el-scrollbar style="height: 100%;width: 100%" :native="false">
          <!-- currentMainTableObj.Fields: {{currentMainTableObj}} -->
          <el-form :model="currentMainTableObj" ref="launchForm"
                    class="main_form">
            <!--当前主表的内容区域--start--->                         
            <div class="field" v-for="(field, index) in currentMainTableObj.Fields" :key="index">
              <!--当前主表的详情区域--start--->
              <template v-if="rightContentCurrentStr === 'GetForm'">
                <div v-if="field.Role !== 4">
                  <!--注： 14 表示 图片上传 --15 表示 附件上传-->
                  <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                    <span class="name">{{field.FieldName}} :</span>
                    <!--注：23 为编辑器----->
                    <span class="displayValue" v-if="field.ControlType !== '23'">{{field.DisplayValue}}</span>
                    <span class="displayValue" v-if="field.ControlType === '23'" v-html="field.DisplayValue"></span>
                    <!-- <span class="field-edit">
                      <el-button
                        type="text"
                        v-if="field.Role === 2"
                        @click="field.showEdit = !field.showEdit"
                      >
                        {{field.showEdit ? '收起' : '修改'}}
                      </el-button>
                    </span> -->
                  </span>
                  <!-----为图片  或者 附件时---start-->
                  <span class="field-name" v-else>
                    {{field.FieldName}} :
                    <span style="color: #3B8BE3" v-for="val in field.DisplayValue" :key="val.Url">
                      {{val.Name}}
                      <span style="margin-left: 10px">
                        <!-- <a :href="val.Url" :download="val.Name">
                          <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                        </a> -->
                        <!-- <el-button type="text" :disabled="!attachmentRole.CanDelete">删除</el-button> -->
                        <!-- <span class="field-edit">
                          <el-button
                            type="text"
                            v-if="field.Role === 2"
                            @click="field.showEdit = !field.showEdit"
                          >
                            {{field.showEdit ? '收起' : '修改'}}
                          </el-button>
                        </span> -->
                      </span>
                    </span>
                  </span>
                  <!-----为图片  或者 附件时---end-->

                  <!--动态显示编辑的动态组件--start--->
                  <div v-if="field.showEdit">
                    <component
                      :is="currentRuleComponent(field.ControlType)"
                      :prop="'Fields.' + index + '.FieldValue'"
                      :obj="field"
                      :workId="form.Flow.WorkId"
                      :nodeId="form.Flow.FK_Node"
                      :attachmentRole="attachmentRole"
                      :isTitle="false"
                      @changeEmp="changeOrgMainCmp('launchForm', $event)"
                    ></component>
                  </div>
                  <!--动态显示编辑的动态组件--end--->
                </div>
              </template>
              <!--当前主表的详情区域---end-->
            </div>
            
            <!--当前主表的非【显示详情】--start--->
            <!-- <template v-if="rightContentCurrentStr !== 'GetForm'">
                <component
                  :is="currentContentComponents(rightContentCurrentStr)"
                  :rightContentCurrentStr="rightContentCurrentStr"
                  :obj.sync="currentMainTableObj"
                  :workId="form.Flow.WorkId"
                  :nodeId="form.Flow.FK_Node"
                  :form.sync="form"
                  :attachmentRole="attachmentRole"                      
                >
                </component>
            </template> -->
            <!--当前主表的非【显示详情】--end--->                                    
          </el-form>

          <!--分组--start---->
          <template v-for="team in currentMainTableObj.Teams" v-if="rightContentCurrentStr === 'GetForm'">
            <div class="teamBox">
              <span class="team-title" style="font-size: 16px">{{team.TeamName}}</span>
              <el-form :model="team" :ref="`team${team.TeamCode}`"
                        class="main_form">
                <div class="field" v-for="(field, index) in team.Fields" :key="index">

                  <div v-if="field.Role !== 4">
                    <!--注：14 和 15 是 图片和附件---->
                    <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                      <span class="name">{{field.FieldName}} :</span>
                      <!--注：23 为编辑器----->
                      <span class="displayValue" v-if="field.ControlType !== '23'">{{field.DisplayValue}}</span>
                      <span class="displayValue" v-if="field.ControlType === '23'" v-html="field.DisplayValue"></span>
                        <!-- <span class="field-edit">
                          <el-button
                            type="text"
                            v-if="field.Role === 2"
                            @click="field.showEdit = !field.showEdit"
                          >
                            {{field.showEdit ? '收起' : '修改'}}
                          </el-button>
                        </span> -->
                    </span>

                    <!--注：14 和 15 是 图片和附件，图片和附件的显示---->
                    <span class="field-name" v-else>
                      {{field.FieldName}} :
                      <span style="color: #3B8BE3" v-for="val in field.DisplayValue" :key="val.Url">
                        {{val.Name}}
                        <span style="margin-left: 10px">
                          <!-- <a :href="val.Url" :download="val.Name">
                            <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                            <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                          </a> -->
                          <!-- <el-button type="text" :disabled="!attachmentRole.CanDelete">删除</el-button> -->
                          <!-- <span class="field-edit">
                            <el-button
                              type="text"
                              v-if="field.Role === 2"
                              @click="field.showEdit = !field.showEdit"
                            >
                              {{field.showEdit ? '收起' : '修改'}}
                            </el-button>
                          </span> -->
                        </span>
                      </span>
                    </span>
                    <!-- 
                    <div v-if="field.showEdit">
                      <component
                        :is="currentRuleComponent(field.ControlType)"
                        :prop="'Fields.' + index + '.FieldValue'"
                        :obj="field"
                        :workId="form.Flow.WorkId"
                        :nodeId="form.Flow.FK_Node"
                        :attachmentRole="attachmentRole"
                        :isTitle="false"
                        @changeEmp="changeOrgMainCmp(`team${team.TeamCode}`, $event)"
                      ></component>
                    </div> -->
                  </div>
                </div>
              </el-form>
            </div>
          </template>
          <!--分组--end---->
          <!--当前主表的内容区域--end--->  
        </el-scrollbar>
      </div>  
    </div>   
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'  
  import {getTrackForm} from '@/api/approve'
  import NotGetformCmp from './notGetForm-cmp'
  import {workFlowControlRuleMixin} from '@/utils/mixin'

  const tabMap = {
    'ShowSchedule': NotGetformCmp,  // 显示流程进度
    'ShowFeedback': NotGetformCmp,  // 显示反馈
    'ShowFlowChart': NotGetformCmp,  // 显示流程图
    'ShowSubFlow': NotGetformCmp,   // 显示子流程
    'ShowInfluentState': NotGetformCmp, // 显示支流状态
    'ShowAttachment': NotGetformCmp,    // 显示相关附件
    'ShowRelatedFlow': NotGetformCmp,   // 显示相关流程
    'ShowFormChangeLog': NotGetformCmp  // 显示表单变更日志
  }  
  export default {  
    mixins: {workFlowControlRuleMixin},
    props: {
      // 当前 进度item 的对象
      currentTraveObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 由 table表格中 点击查看后 获取的查看的当前流程的 大对象
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        loading: false,
        travelData: {},   // 获取的轨迹的数据对象
        mainTables: {},     
        rightContentCurrentStr: '',
        attachmentRole: {},  // 权限
        allDetailTablesArr: [], // 所有主表下的所有明细表的集合
        currentMainTableObj: {}, // 当前主表对象信息
        currentMainTableCode: '', // 当前主表code
        detailTables: [],   // 明细表集合
        currentDetailTableObj: {}, // 当前明细表对象
        currentDetailTableCode: '' // 当前明细表code
      }
    },
    components: {
    },      
    created () {

    },
    watch: {

    },
    mounted() {
      // 获取轨迹表数据
      this.$nextTick(()=>{
        this._getTrackForm()
      })      
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题

    },    
    methods: {
      // 查看轨迹
      _getTrackForm () {
        debugger
        this.loading = true
        getTrackForm(this.form.Flow.WorkId, this.currentTraveObj.NodeId, this.form.Flow.FK_Flow).then(res => {
          this.loading = false
          if (res && res.data.State === REQ_OK) {
            debugger
            this.travelData = res.data.Data

            // this.flowObj = res.data.Data.Flow
            this.mainTables = res.data.Data.MainTableInfos

            // 当前功能权限
            this.attachmentRole =  res.data.Data.FunctionRole
            // 将所有的明细表存储在一个复制的数组对象中 便于后续提交时 进行 是否 新增行的的校验
            debugger
            // if(this.mainTables && this.mainTables.length){
            //   let allDetailTablesArr = this.mainTables.map((item,key)=>{
            //     return item.DetailTableInfos
            //   })
            //   // allDetailTablesArr 是一个二维数组,需要处理成一维数据
            //   this.allDetailTables = []
            //   if( allDetailTablesArr && allDetailTablesArr.length ){
            //     for(let i=0; i<allDetailTablesArr.length;i++){
            //       let itemAllDetailTable = allDetailTablesArr[i]
            //       if(itemAllDetailTable && itemAllDetailTable.length){
            //         for(let j=0; j<itemAllDetailTable.length; j++){
            //           let itemList = itemAllDetailTable[j]
            //           this.allDetailTables.push(itemList)
            //           // 复制一个 所有明细表的 副本集合 用于之后判断 新增行的校验
            //           this.allDetailTables_copy = JSON.parse(JSON.stringify(this.allDetailTables))
            //         }
            //       }
            //     }
            //   }      
            // }


            if (this.mainTables && this.mainTables.length) {
              this.currentMainTableObj = this.mainTables[0]
              this.currentMainTableCode = this.mainTables[0].TableCode
              this.rightContentCurrentStr = 'GetForm'
              if (this.currentMainTableObj.Fields && this.currentMainTableObj.Fields.length) {
                this.currentMainTableObj.Fields.forEach(i => {
                  this.$set(i, 'showEdit', false)
                })
                debugger
              }
              if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
                this.currentMainTableObj.Teams.forEach(i => {
                  if (i.Fields && i.Fields.length) {
                    i.Fields.forEach(field => {
                      this.$set(field, 'showEdit', false)
                    })
                  }
                })
              }
              debugger
              if (this.mainTables[0].DetailTableInfos && !this.mainTables[0].DetailTableInfos.length) return

              if(!this.mainTables[0] || !this.mainTables[0].DetailTableInfos){
                return
              }else {
                // 有明细表
                try {
                  this.detailTables = this.mainTables[0].DetailTableInfos
                  this.currentDetailTableObj = this.mainTables[0].DetailTableInfos[0]
                  this.currentDetailTableCode = this.mainTables[0].DetailTableInfos[0].DetailTableCode                  
                } catch (error) {
                  
                }
              }
            } else {
              this.currentMainTableObj = {}
              this.currentMainTableCode = ''
              this.detailTables = []
              this.currentDetailTableObj = {}
              this.currentDetailTableCode = ''
            }  
          } else {
            this.$message({
              type: "error",
              message: `轨迹数据获取失败err,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: "error",
            message: "轨迹数据获取失败err,请重试"
          })
        })
      },  
      // 点击组表上面的 详情、显示反馈、显示直流、显示流程图等按钮时
      currentContentComponents (tab) {
        return tabMap[tab] || ''
      },      
      // 点击主表切换
      handleClickMainTableTab (tab, event) {
        debugger
        // 将上一次的主表 复制一个副本
        let beforeMainTableObj_copy = JSON.parse(JSON.stringify(this.currentMainTableObj))

        this.currentMainTableObj = this.mainTables.find(item => {
          return item.TableCode === tab.name
        })

        if (this.currentMainTableObj.Fields.length) {
          this.currentMainTableObj.Fields.forEach(i => {
            this.$set(i, 'showEdit', false)
          })
        }

        if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
          this.currentMainTableObj.Teams.forEach(i => {
            if (i.Fields && i.Fields.length) {
              i.Fields.forEach(field => {
                this.$set(field, 'showEdit', false)
              })
            }
          })
        }

        this.detailTables = this.currentMainTableObj.DetailTableInfos
        if (!this.detailTables.length) return
        this.currentDetailTableObj = this.currentMainTableObj.DetailTableInfos[0]
        this.currentDetailTableCode = this.currentMainTableObj.DetailTableInfos[0].DetailTableCode

        debugger
        // if(this.currentMainTableObj.TableCode !== beforeMainTableObj_copy.TableCode){
        //   debugger
        //   // 前后两次切换的不是同一个主表， 如果前后切换的是相同的主表则不会重新调取接口
        //   // 主表切换后 需要去动态调用  标签下的 数据
        //   switch(this.rightContentCurrentStr){
        //     // 显示反馈
        //     case 'ShowFeedback':
        //       this._showFeedback()
        //       break
        //     // 显示子流程
        //     case 'ShowSubFlow':
        //       this._showSubFlow()
        //       break
        //     // 流程进度
        //     case 'ShowSchedule':
        //       this._showSchedule()
        //       break
        //     // 显示表单变更日志
        //     case 'ShowFormChangeLog':
        //       this._showFormChangeLog()
        //       break
        //     // 显示相关流程
        //     case 'ShowRelatedFlow':
        //       this._showRelatedFlow()
        //       break
        //     // 显示相关附件
        //     case 'ShowAttachment':
        //       this._showAttachment()
        //       break
        //     // 显示支流状态
        //     case 'ShowInfluentState':
        //       this._showInfluentState()
        //       break
        //     // 显示流程图
        //     case '':
        //       break
        //   }
        // }
      },      
    }
  }
</script>
