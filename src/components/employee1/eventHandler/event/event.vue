<!--
  User: gaol
  Date: 2019/8/9
  功能：事件处理器 - 事件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-form-item__content
  .el-input
    width 220px !important
.event 
  width 50%

</style>

<template>
  <div class="event">
     事件处理器 - 事件 
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="生效日期">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="事件名称">
        <el-select v-model="form.name" placeholder="请选择事件名称">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="事件原因">
        <el-select v-model="form.region" placeholder="请选择事件原因">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>    

      <el-form-item label="对象">
        <el-input list="cars" v-model="form.obj"></el-input>
        <datalist id="cars">
          <option value="BMW"></option>
          <option value="Ford"></option>
          <option value="Volvo"></option>
        </datalist>        
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          obj: '',
          type: [],
          resource: '',
          desc: ''
        }        
      }
    }
  }
</script>

