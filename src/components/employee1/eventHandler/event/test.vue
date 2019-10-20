<template>
    <div style="padding: 20px ">
            页面
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city.code">{{city}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
//   const cityOptions = ['上海', '北京', '广州', '深圳'];
  const cityOptions = [
        {
            code:1,
            name: 'zhangsan'
        },
        {
            code:2,
            name: 'lisi'
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
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
      };
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