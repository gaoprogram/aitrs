<!--
  User: gaol
  Date: 2019/6/17
  功能：显示流程进度
-->
<template>
  <div :class="['process-progress-container']" v-loading="containerLoading">
    <!-- 这是 显示流程进度的页面: $attrs： {{$attrs}} -->

    <!-- obj:{{obj}} -->
    <!-- mixinsDataRes: {{mixinsDataRes}} -->
    <!-- 这是显示流程进度的页面 -->
    <!-- form: {{form}} -->

    <!--审批进度---start-->
    <div class="tracks-container" v-if="mixinsDataRes.length">
      <!-- form.FunctionRole: {{form.FunctionRole}} -->
      <timeline >
        <li class="timeline-item" v-for="(track, index) in mixinsDataRes">
          <el-button type="primary" 
            :class="['travelBtn',currentTraveItemIdx===index? 'showTravelBtn': '']" 
            size="mini" @click="showTraveDialog = true" 
            v-show="form.FunctionRole.ShowTrack">
            轨迹
          </el-button>
          <em class="timeline-icon"></em>
          <!--节点名称--start--->
          <div class="nodeName">
            <span class="tit">{{track.NodeName}}</span><span>—{{track.TodolistModelText}}</span>
          </div>
          <!--节点名称--start--->

          <!-- track: {{track}} -->
          <div  @mouseenter = "hoverTrackItem(index,track)">
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
    <!--审批进度---end-->    

   
    <!--轨迹弹框--start-->
    <div class="travelDetailBox" v-if="showTraveDialog">
      <el-dialog
        title="轨迹"
        :visible.sync="showTraveDialog"
        width="30%"
        append-to-body
      >
        <!-- <span>这是一段信息</span> -->
        <travel-detail :currentTraveObj="currentTraveObj" :form="form"></travel-detail>
        
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span> -->
      </el-dialog>
    </div>
    <!--轨迹弹框--end-->    
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getForm
  } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import Timeline from '@/base/Timeline/Timeline'
  import TravelDetail from './travelDetail'
  import { flowCommonFnRightFixed } from '@/utils/mixin'

  export default {
    mixins: [flowCommonFnRightFixed],
    components: {
      Timeline,
      TravelDetail
    },
    data () {
      return {
  
      }
    },
    props: {
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      workId: {
        type: String,
        default: ''
      },
      nodeId: {
        type: [Number, String],
        default: ''
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    watch: {
      'form.Flow.WorkId': {
        handler (newValue, oldValue) {
          // 监控 当点击了下一条 或者 其他流程的查看后 进行  重新获取流程进度的数据， 当切换节点后 不会触发这里的执行（切换节点 这个workId不会变化）
            debugger
            if(newValue){
              // form 表单变化后 需要重新获取 评论内容
              this._showSchedule()
            }
        },
        // immediate: true,
        deep: true
      }
    },    
    created () {
      this.$nextTick(()=>{
        // 获取流程进度
        this._showSchedule()
      })
    },
    mounted () {
    },
    methods: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .process-progress-container
    // min-height 350px
    .tracks-container
      padding 20px 0
      .name
        font-size 18px
        
  >>>.el-scrollbar__wrap   
    marin-bottom 0 !important     
</style>
