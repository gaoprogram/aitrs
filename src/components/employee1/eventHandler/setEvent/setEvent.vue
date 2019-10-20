<!--
  User: gaol
  Date: 2019/8/9
  功能：事件处理器 - 设置事件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.setEvent
  padding 0 20px 
  box-sizing border-box
</style>

<template>
  <div class="setEvent">
    <div class="headBox">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择事件" style="width: 300px">
          <!-- <el-input v-model="form.EventName"></el-input> -->
          <el-input list="EventName" v-model="form.EventName"></el-input>
          <datalist id="EventName">
            <option value="名称一"></option>
            <option value="名称二"></option>
            <option value="名称三"></option>
          </datalist>               
        </el-form-item>
        <el-form-item label="事件原因">
          <el-select v-model="form.EventReason" placeholder="请选择事件原因">
            <el-option label="原因一" value="ItemCode1"></el-option>
            <el-option label="原因二" value="ItemCode2"></el-option>
          </el-select>

          <el-button type="text" style="margin-left: 20px">新增</el-button>
        </el-form-item>  

      </el-form>    
    </div>
    <!--设置字段弹框---start--->
    <div class="setFieldBox" v-if="showSetField">
      <el-dialog
        title="设置字段"
        width="30%"
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="showSetField"
      >
        <set-field-cmp></set-field-cmp>
      </el-dialog>
    </div>
    <!--设置字段弹框---end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import SetFieldCmp from './setEventComponents-cmp/SetField-cmp'
  export default {
      components: {
        SetFieldCmp
      },
      props: {

      },
      data(){
          return {
            showSetField: false, // 控制设置字段的弹框显示/隐藏
            form:{
              EventReason: '',
              EventName: ''
            }
          }
      },
      created() {
          debugger
      },
      methods: {

      }
  }
</script>

