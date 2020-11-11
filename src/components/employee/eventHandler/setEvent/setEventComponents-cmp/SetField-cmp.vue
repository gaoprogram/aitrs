<!--
  User: gaol
  Date: 2019/10/10
  功能： 设置字段组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.setField-cmp
    .el-checkbox-group
    .wrapper
        .el-checkbox
            display block
            padding 5px
            &:not(:first-child)
                margin 10px 30px 10px 0
            &:hover
                background-color #EBEEF5
                box-sizing border-box

   
</style>
<template>
  <div class="setField-cmp">
    设置字段页面
    <div>
        <el-button type="text" sizi="mini">可多选</el-button>
        <!-- checkAll: {{checkAll}} -->
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 5px 0;"></div>

        <!-- checkedCities: {{checkedCities}}
        ---
        isIndeterminate: {{isIndeterminate}} -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <vuedraggable class="wrapper" v-model="checkedCities"  :options = "{animation:500}">
                <transition-group>
                    <el-checkbox 
                        class="checkItem"
                        v-for="city in cities" 
                        :label="city" 
                        :key="city">
                        {{city}}
                    </el-checkbox>                
                </transition-group>
            </vuedraggable>
        </el-checkbox-group>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import Vuedraggable from 'vuedraggable'  
  const cityOptions = ['上海', '北京', '广州', '深圳']
  export default {
    components: {
      Vuedraggable
    },
    data(){
      return {
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true        
      }
    },
    methods: {
      // 全选改变
      change(){
        debugger
        
      },
      // 单选改变
      changeItem(item, idx){
        debugger

      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }      
    }
  }
</script>

