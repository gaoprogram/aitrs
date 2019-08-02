<!--
  User: gaol
  Date: 2019/6/21
  功能：流程轨迹弹框
-->

<template>
  <div class="travelDetail-component-container" v-loading="loading">
    这是轨迹弹框： travelData：{{travelData}}
    <div>
      <el-scrollbar style="height: 100%;width: 100%" :native="false">
        <!-- currentMainTableObj.Fields: {{currentMainTableObj.Fields}} -->
        <el-form :model="currentMainTableObj" ref="launchForm"
                  class="main_form">
          <!--当前主表的内容区域--start--->                         
          <div class="field" v-for="(field, index) in currentMainTableObj.Fields" :key="index">
            <!--当前主表的详情区域--start--->
            <template v-if="rightContentCurrentStr === 'GetForm'">
              <div v-if="field.Role !== 4">
                <!--注： 14 表示 图片上传 --15 表示 附件上传-->
                <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                  {{field.FieldName}} : {{field.DisplayValue}}
                  <span class="field-edit">
                    <el-button
                      type="text"
                      v-if="field.Role === 2"
                      @click="field.showEdit = !field.showEdit"
                    >
                      {{field.showEdit ? '收起' : '修改'}}
                    </el-button>
                  </span>
                </span>
                <!-----为图片  或者 附件时---start-->
                <span class="field-name" v-else>
                  {{field.FieldName}} :
                  <span style="color: #3B8BE3" v-for="val in field.DisplayValue" :key="val.Url">
                    {{val.Name}}
                    <span style="margin-left: 10px">
                      <a :href="val.Url" :download="val.Name">
                        <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                      </a>
                      <el-button type="text" :disabled="!attachmentRole.CanDelete">删除</el-button>
                      <span class="field-edit">
                        <el-button
                          type="text"
                          v-if="field.Role === 2"
                          @click="field.showEdit = !field.showEdit"
                        >
                          {{field.showEdit ? '收起' : '修改'}}
                        </el-button>
                      </span>
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
          <template v-if="rightContentCurrentStr !== 'GetForm'">
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
          </template>
          <!--当前主表的非【显示详情】--end--->                                    
        </el-form>

        <!--分组--start---->
        <template v-for="team in currentMainTableObj.Teams" v-if="rightContentCurrentStr === 'GetForm'">
          <div style="border-bottom: 1px solid #dedede; padding-bottom: 10px;margin-bottom: 20px">
            <span class="team-title" style="font-size: 16px">{{team.TeamName}}</span>
            <el-form :model="team" :ref="`team${team.TeamCode}`"
                      class="main_form">
              <div class="field" v-for="(field, index) in team.Fields" :key="index">

                <div v-if="field.Role !== 4">
                  <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                    {{field.FieldName}} : {{field.DisplayValue}}
                    <span class="field-edit">
                      <el-button
                        type="text"
                        v-if="field.Role === 2"
                        @click="field.showEdit = !field.showEdit"
                      >
                        {{field.showEdit ? '收起' : '修改'}}
                      </el-button>
                    </span>
                  </span>

                  <span class="field-name" v-else>
                    {{field.FieldName}} :
                    <span style="color: #3B8BE3" v-for="val in field.DisplayValue" :key="val.Url">
                      {{val.Name}}
                      <span style="margin-left: 10px">
                        <a :href="val.Url" :download="val.Name">
                          <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                        </a>
                        <el-button type="text" :disabled="!attachmentRole.CanDelete">删除</el-button>
                        <span class="field-edit">
                          <el-button
                            type="text"
                            v-if="field.Role === 2"
                            @click="field.showEdit = !field.showEdit"
                          >
                            {{field.showEdit ? '收起' : '修改'}}
                          </el-button>
                        </span>
                      </span>
                    </span>
                  </span>

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
                  </div>
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
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'  
  import {getTrackForm} from '@/api/approve'
  export default {  
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
        travelData: {}   // 获取的轨迹的数据对象
      }
    },
    components: {
    },      
    created () {

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
          } else {
            this.$message({
              type: "error",
              message: "轨迹数据获取失败err,请重试"
            })
          }
        }).catch(() => {
          this.$message({
            type: "error",
            message: "轨迹数据获取失败err,请重试"
          })
        })
      },  
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
