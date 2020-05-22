<!--
  User: xxxxxxx
  Date: 2019/2/19
  功能：打印
-->

<template>
  <div class="print-container">
    <!-- currentForm: {{currentForm}} -->
    <!---流程名称---->
    <div class="flowName" v-if="currentForm.FlowInfo.FlowMark">{{currentForm.FlowInfo.FlowMark}}</div>
    <!--<div>打印表单</div>-->
    <!-- currentForm.MainTableInfos: {{currentForm.MainTableInfos}} -->
    <el-card class="main-container" 
        v-for="(mainForm,index) in currentForm.MainTableInfos" 
        :key="mainForm.TableCode">
      <!---主表---start--->
      <div class="main-title">【主表{{~index}}】-{{mainForm.TableName}}：</div>
      <div class="main-content">
          <!---除图片、附件、计算公式等外----->
          <p 
            v-if="field.ControlType !=='14' && field.ControlType !== '15' && field.ControlType !== '16' && field.Role !==4"
            v-for="field in mainForm.Fields" 
            :key="field.FieldCode">
            <span style="color:#000000;margin-right:10px;font-weight:bold">{{field.FieldName}}：</span>
            <span>{{field.DisplayValue}}</span>
            <!--注：23 为编辑器----->
            <span class="displayValue" v-if="field.ControlType !== '23'">{{field.DisplayValue}}</span>
            <span class="displayValue" v-if="field.ControlType === '23'" v-html="field.DisplayValue"></span>          
          </p>


          <!----计算公式---->
          <p
            v-for="field in mainForm.Fields" 
            v-if="field.ControlType === '16' && field.Role !== 4">
            <span style="color:#000000;margin-right:10px;font-weight:bold">{{field.FieldName}}：</span><span>{{field.CalculateRule}}</span>
          </p>
          <!--图片或者附件--->
          <p 
            v-if="field.ControlType === '14' || field.ControlType === '15' && field.Role !==4"
            v-for="field in mainForm.Fields" 
            :key="field.FieldCode">
            <span style="color:#000000;margin-right:10px;font-weight:bold">{{field.FieldName}}:</span> 
            <span v-for="item in field.DisplayValue" :key="item.AttachmentId">
              <span style="color: blue;margin-left: 5px">{{item.Name}},</span>
            </span>
          </p>

        <!--主表下面的分组区域--->
        <!-- mainForm.Values: {{mainForm.Values}} -->
        <div v-for="(team,index) in mainForm.Teams" :key="index">
          <p class="Team-Tit">分组{{+index+1}}</p>
            <p 
              v-if="field.ControlType !== '14' && field.ControlType !== '15' && field.ControlType !== '16' && field.Role !== 4"
              v-for="field in team.Fields"
              :key="field.Id">
              <span style="color:#000000;margin-right:10px;font-weight:bold">{{field.FieldName}}:</span>
              <!--注：23 为编辑器----->
              <span class="displayValue" v-if="field.ControlType !== '23'">{{field.DisplayValue}}</span>
              <span class="displayValue" v-if="field.ControlType === '23'" v-html="field.DisplayValue"></span>          
            </p>
            <!----计算公式---->
            <p
              v-for="field in team.Fields" 
              v-if="field.ControlType === '16' && field.Role !== 4">
              <span style="color:#000000;margin-right:10px;font-weight:bold">
                {{field.FieldName}}：</span>
              <span>{{field.CalculateRule || '**'}} = {{field.FieldValue || '**'}}</span>
            </p>
            <!--图片或者附件--->
            <p 
              v-if="field.ControlType === '14' || field.ControlType === '15' && field.Role !== 4"
              v-for="field in team.Fields" 
              :key="field.FieldCode">
              <span style="color:#000000;margin-right:10px;font-weight:bold">{{field.FieldName}}:</span> 
              <span v-for="item in field.DisplayValue" :key="item.AttachmentId">
                <span style="color: blue;margin-left: 5px">{{item.Name}},</span>
              </span>
            </p>   
        </div>    
      </div>
      <!---主表---end--->


      <!--主表下面的明细表--start--->
      <div class="detail-container" v-for="(detailForm,index) in mainForm.DetailTableInfos" :key="detailForm.DetailTableCode">
        <div class="detailTable-title">【明细表{{~index}}】-{{detailForm.Name}}</div>
        <div class="detailTable-content">
          <table class="detailTable">
            <!---明细表排头--->
            <thead class="detailThead">
              <tr>
                <th v-for="head in detailForm.Fields">{{head.FieldName}}</th>
              </tr>
            </thead>
            <tbody class="detailTbody">
              <template v-if="detailForm.Values && detailForm.Values.length">
                <tr v-for="tds in detailForm.Values">
                  <td 
                      class="detailTd" 
                      v-for="td in tds">
                      <template v-if="td.Role!==4">
                        <!----非 图片，附件、计算公式---->
                        <span v-if="td.ControlType !=='14' && td.ControlType !=='15' && td.ControlType !== '16' ">
                          <!--注：23 为编辑器----->
                          <span class="displayValue" v-if="td.ControlType !== '23'">{{td.DisplayValue}}</span>
                          <span class="displayValue" v-if="td.ControlType === '23'" v-html="td.DisplayValue"></span>                                  
                        </span>
                        <!----计算公式-16----->
                        <span v-if="td.ControlType === '16'">{{td.CalculateRule || '**'}} = {{td.FieldValue || '**'}}</span>
                        <!----图片/附件-14  15----->
                        <span 
                          v-if="td.ControlType ==='14' || td.ControlType ==='15'"
                          v-for="item in td.DisplayValue" :key="item.AttachmentId">
                          <span style="color: blue;margin-left: 5px">{{item.Name}},</span>
                        </span> 
                      </template>
                  </td>             
                </tr>
              </template>
              <template v-else>
                <td class="detailTd" v-for="tds in detailForm.Fields">
                  --           
                </td>                
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <!----明细表----end--->       
    </el-card>

    <!---审批进度--start-->
    <!-- <div class="trackProgress" 
        v-if="currentForm.Tracks && currentForm.Tracks.length">
      <span class="progressTit">审批进度——</span>
      <span class="nodeName">节点名:{{currentForm.Tracks[currentForm.Tracks.length-1].NodeName}}</span>
      <span class="nodeName-todolist">--{{currentForm.Tracks[currentForm.Tracks.length-1].TodolistModelText}}</span>
      <span class="actionType">;状态：{{currentForm.Tracks[currentForm.Tracks.length-1].ActionTypeText}}</span>
    </div> -->
    <!--审批进度--end-->  


    <!--审批进度---start-->
    <div class="tracks-container" v-if="currentForm.Tracks.length">
      <!-- form.FunctionRole: {{form.FunctionRole}} -->
      <timeline>
        <li class="timeline-item" v-for="(track, index) in currentForm.Tracks" :key="index">
          <!-- <el-button type="primary" 
            :class="['travelBtn',currentTraveItemIdx===index? 'showTravelBtn': '']" 
            size="mini" @click="showTraveDialog = true" 
            v-show="form.FunctionRole.ShowTrack">
            轨迹
          </el-button> -->
          <em class="timeline-icon"></em>
          <!--节点名称--start--->
          <div class="nodeName">
            <span class="tit">{{track.NodeName}}</span><span>—{{track.TodolistModelText}}</span>
          </div>
          <!--节点名称--start--->

          <!-- track: {{track}} -->
          <div>
            <span>{{track.EmpName}}</span>
            <span style="margin-left: 30px">状态：{{track.ActionTypeText || '无'}}</span>
            <span style="margin-left: 30px">{{ track.CreateTime | replaceTime }}</span>
          </div>
          <div style="padding-left: 15px; padding-top: 15px">
            建议：<span v-html="track.Opinion || '无'"></span>
          </div>
          <div style="margin-top: 10px;font-size: 12px" v-if="track.Msg && track.Msg !== '无'">
            消息：{{track.Msg}}
          </div>
        </li>
      </timeline>
    </div>
    <!--审批进度区域---end-->    


    <div class="print-btn-container">
      <!--<el-button type="primary" @click.native="handlePrint" size="small">打印</el-button>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getForm
  } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import ElCard from 'element-ui/packages/card/src/main'
  import Timeline from '@/base/Timeline/Timeline'
  // import { flowCommonFnRightFixed } from '@/utils/mixin'
  export default {
    // mixins: [flowCommonFnRightFixed],
    components: {ElCard, Timeline},
    data () {
      return {
        currentForm: {},  // form对象数据
        nodeId: '',
        workId: ''
      }
    },
    created () {
      debugger
      this.$nextTick(() => {
        try {
          this.workId = this.$route.query.workId
          this.nodeId = this.$route.query.nodeId
        } catch (error) {
          
        }        

        this._getRoleRange().then(res => {
          if (res.data.State === REQ_OK) {
            let no = this.$route.query.no
            let roleRange = res.data.Data
            let pageType = this.$route.query.pageType
            let ccpk = ''
            let selectNodeId = this.$route.query.selectNodeId
            this._getForm( no, this.workId, this.nodeId, roleRange, pageType, ccpk, selectNodeId)
          }
        })
      })
    },
    mounted () {
    },
    methods: {
      // 获取版本号
      _getRoleRange () {
        return new Promise((resolve, reject) => {
          resolve(getRoleRange('WorkFlow'))
        })
      },
      // 获取form
      _getForm (no, workId, nodeId, roleRange, pageType, ccpk, selectNodeId) {
        debugger
        this.rightLoading = true
        getForm(no, workId, nodeId, roleRange, pageType, ccpk, selectNodeId).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.currentForm = res.data.Data
            console.log("-----print中打印getform的结果-------------",this.currentForm)
            setTimeout(() => {
              // 自动打印
              window.print()
            }, 1000)
          } else {
            this.$message({
              type: 'error',
              message: '审批表单获取失败，请重试！'
            })
          }
          this.rightLoading = false
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '审批表单获取失败，请重试！'
          })
          this.rightLoading = false
        })
      },
      // 手动打印，暂时不用
      handlePrint () {
        window.print()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .print-container
    width 100%
    .flowName
      font-size 18px
      color #000000
      font-weight bold
      text-align center
    .trackProgress
      margin 40px 0
      text-align center
      font-size 12px
      .progressTit
        color red
        font-size 14px
      .nodeName
      .nodeName-todolist
      .actionType
        font-size 12px
    .main-container
      width 800px
      min-height 500px
      margin 0 auto
      .main-title
        text-align center
        margin-bottom 10px
        font-weight 700
      .main-content
        padding-left 20px
        font-size 14px
        .Team-Tit
          text-align left
          margin-bottom 10px
          font-weight 700     
          color #909399    
        p
          margin-bottom 10px
      .detail-container
        margin-top 10px
        .detailTable-title
          font-size 16px
          text-align center
          color #909399
        .detailTable-content
          margin 5px 0
          .detailTable
            width 100%
            border 1px solid #909399
            border-collapse collapse
            overflow auto
            .detailThead
              font-size 12px
              border 1px solid #909399
              th 
                border 1px solid #909399
                padding 5px 0
                box-sizing border-box
            .detailTbody
              text-align center
              td
                padding 5px 
                box-sizing border-box
                border 1px solid #909399
                font-size 12px
                text-align left
    .tracks-container
      margin 10px auto
      width 800px
    .print-btn-container
      width 800px
      margin 0 auto
      text-align center
</style>
