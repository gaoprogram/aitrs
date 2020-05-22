<template>
    <div style="padding: 20px ">
            页面
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        checkedCities: {{checkedCities}}
        -------
        cities: {{cities}}
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox 
              v-for="(city,i) in cities" 
              :checked="city.checked" 
              :label="city" 
              :key="city.code">{{city.name}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
//   const cityOptions = ['上海', '北京', '广州', '深圳'];
  const cityOptions = [
        {
          code:1,
          name: 'zhangsan',
        },
        {
          code:2,
          name: 'lisi',
        },
        {
          code: 3,
          name: 'wangwu'
        }
      ];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: [{"code":1,"name":'zhangsan'},{"code":2,"name": 'lisi'}],
        // checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        checkedIndexArr: [],
      };
    },
    created(){
      debugger
      this.cities.forEach((item, i) =>{
        this.checkedCities.forEach((val, key) => {
          if(item.code == val.code){
            this.$set(item, 'checked', true)
            this.checkedCities.splice(key,1)
          }
        })
      })
    },
    methods: {
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
  };
</script>