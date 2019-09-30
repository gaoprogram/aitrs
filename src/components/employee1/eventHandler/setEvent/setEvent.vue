<!--
  User: gaol
  Date: 2019/8/9
  功能：事件处理器 - 设置事件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.setEvent
  padding 20px 
  box-sizing border-box
</style>

<template>
  <div class="setEvent">
     事件处理器 - 设置事件
     <el-card>
       <el-button type="text" sizi="mini">可多选</el-button>

         checkAll: {{checkAll}}
         <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>

          <!-- <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox 
                v-for="city in cities" 
                :label="city" 
                :key="city">
              {{city}}
              </el-checkbox>
          </el-checkbox-group> -->
          checkedCities: {{checkedCities}}
          <vuedraggable class="wrapper" v-model="checkedCities"  :options = "{animation:500}">
            <transition-group>
              <!-- <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"> -->
                  <div v-for="(city,i) in cities" :key="city">
                    <el-checkbox  
                      :label="city" 
                      @change="change(i)"
                      >
                    {{city}}
                    </el-checkbox>
                  </div>
              <!-- </el-checkbox-group> -->

              <!-- <div  
                class="ItemBox marginT10"
                v-for="(obj, index) in checkedCities" 
                :key="index+1"
              >
                <el-checkbox :label="obj"></el-checkbox>
              </div> -->
            </transition-group>              
          </vuedraggable>    

     </el-card>
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
      change(val){
        debugger
        
      },
      handleCheckAllChange(val) {
        debugger
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        debugger
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }      
    }
  }
</script>

