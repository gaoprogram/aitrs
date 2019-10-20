<!--
  User: gaol
  Date: 2019/8/9
  功能：基础设置- 员工号自动分配规则
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.assignmentRules
    padding 0 20px
    box-sizing  border-box
</style>

<template>
  <div class="assignmentRules">
    <div class="tabBox">
        <div class="clearfix">
          <el-button 
            class="rt" 
            type="primary" 
            size="mini"
            @click.native="addNewRules"
          >
          新增规则
          </el-button>
        </div>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab">
          <el-tab-pane label="规则1" name="first">
            <el-form ref="assignmentRules" v-model="assignmentRules" label-width="80px">

              <el-form-item label="员工类型">
                <el-select v-model="assignmentRules.status" multiple placeholder="请选择员工类型">
                  <el-option 
                    label="状态1" 
                    value="state1"> 
                  </el-option>
                  <el-option 
                    label="状态2" 
                    value="state2"> 
                  </el-option>                  
                </el-select>
              </el-form-item>

              <el-form-item label="自动分配">
                <el-switch v-model="assignmentRules.autoMode"></el-switch>
              </el-form-item>  

              <el-form-item label="前缀">
                <el-input v-model="assignmentRules.preFixInput" placeholder="请输入前缀" size="large" style="width:200px"></el-input>
              </el-form-item>

              <el-form-item label="最大长度">
                <el-select placeholder="请选择最大长度" v-model="assignmentRules.length">
                  <el-option 
                    label="1" 
                    value="length1"> 
                  </el-option>
                  <el-option 
                    label="2" 
                    value="length2"> 
                  </el-option>                  
                </el-select>
              </el-form-item>

            </el-form>
          </el-tab-pane>
          <el-tab-pane label="规则2" name="second">规则2</el-tab-pane>
          <el-tab-pane label="规则3" name="third">规则3</el-tab-pane>
          <el-tab-pane label="规则4" name="fourth">规则4</el-tab-pane>
      </el-tabs>  

      <!--新增规则的弹框---start--->
      <div class="addNewRules" v-if="addRuleShow">
        <el-dialog
          title="新增规则"
          width="30%"
          :visible.sync="addRuleShow"
          append-to-body
          :close-on-click-modal="false"
        >
          新增规则弹框
        </el-dialog>
      </div>
      <!--新增规则的弹框---end--->
    </div>  
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        activeName: 'first',
        assignmentRules: {
          status: '', // 员工类型
          autoMode: true,  // 自动分配
          preFixInput: '', // 前缀
          length: '', // 最大长度
        },
        addRuleShow: false, // 控制新增规则弹框的显示/隐藏
      }
    },
    methods:{
      // 切换tab
      handleClickTab(tab, event){
        debugger
      },
      // 新增规则
      addNewRules() {
        debugger
        this.addRuleShow = true
      }
    }
  }
</script>
