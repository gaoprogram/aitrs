<!--
  User: gaol
  Date: 2019/8/9
  功能：基础设置- 员工号自动分配规则-新增自动分配规则弹框组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.addAssignmentRules
    padding 0 20px
    box-sizing  border-box
</style>

<template>
  <div class="addAssignmentRules">
    <div class="tabBox">
        <!-- empStatusOptions: {{empStatusOptions}} -->
        <!-- assignmentRulesForm: {{assignmentRulesForm}}
        ----
        assignmentRulesForm.EmpTypeRange: {{assignmentRulesForm.EmpTypeRange}} -->
        <el-form ref="assignmentRules" :model="assignmentRulesForm" :rules="formRules" label-width="80px">

            <el-form-item label="员工类型" prop="EmpTypeRange">
            <el-select v-model="assignmentRulesForm.EmpTypeRange" multiple placeholder="请选择员工类型">
              <el-option
                  v-for="(item,key) in empStatusOptions"
                  :key="key"
                  :label="item.ItemName"
                  :value="item.ItemCode"
              ></el-option>             
            </el-select>
            </el-form-item>

            <el-form-item label="自动分配" prop="AutoAssign">
              <el-switch v-model="assignmentRulesForm.AutoAssign"></el-switch>
            </el-form-item>  

            <el-form-item label="前缀" prop="Prefix">
            <el-input v-model="assignmentRulesForm.Prefix" placeholder="请输入前缀" size="large" style="width:200px"></el-input>
            </el-form-item>

            <el-form-item label="最大长度" prop="MaxLength">
              <el-input v-model="assignmentRulesForm.MaxLength" style="width: 300px" type="Number"></el-input>
            </el-form-item>
        </el-form>
    </div>  
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      empStatusOptions: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data(){
      return {
        assignmentRulesForm: {
          Id: 0,
          RuleCode: '', // 规则编号
          RuleName: '', // 规则名称
          EmpTypeRange: '', // 员工类型  string 多个用","分隔
          EmpTypeRangeName: '', //适用员工类型范围名称
          AutoAssign: 'false', //自动分配。0 否1是
          Prefix: '', // 前缀
          MaxLength: '', // 最大长度
        },
        formRules: {
          EmpTypeRange: [{required: true, message: '请选择员工类型', trigger: ['blur']}],
          Prefix: [{required: true, message: '请选输入前缀', trigger: ['change','blur']}],
          MaxLength: [{required: true, message: '请选输入最大长度', trigger: ['change','blur']}],
        }
      }
    },
    methods:{
      // 新增规则
      addNewRules() {
        debugger
        this.addRuleShow = true
      },
      // 处理this.assignmentRulesForm这个数据
      _changeData(){
          if(this.assignmentRulesForm.AutoAssign){
            this.assignmentRulesForm.AutoAssign = "1"
          }else {
            this.assignmentRulesForm.AutoAssign = "0"
          }
      },
      formSubmit(){
        this.$refs.assignmentRules.validate((valid) => {
          if(valid){
            // 通过
            this._changeData()
            this.$emit("formSubmit", true, this.assignmentRulesForm)
          }else {
              this.$emit("formSubmit",false, this.assignmentRulesForm)
          }
        })
      },
    }
  }
</script>
