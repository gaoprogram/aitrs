<template>
  <div :class="wrapper">
    <!--pc端---start-->
    <template v-if="type != 'mobile'">
      <!--省--->
      <span :class="['selectBox', showStyle === 'vertical'? 'vertical': '']">
        <span class="tit" v-if="showStyle === 'vertical'">省份</span>
        <el-select 
          class="provinceSelect"
          @change="getCities" 
          v-model="currentProvince" 
          :disabled="disabled || provinceDisabled">
          <el-option 
            :value="placeholders.province"
          >
          {{ placeholders.province }}
          </el-option>
          <el-option v-for="(item, index) in provinces"
                  :value="item"
                  :key="index">
            {{ item }}
          </el-option>
        </el-select>
      </span>
      <template v-if="!onlyProvince">
        <!---市--->
        <span :class="['selectBox', showStyle === 'vertical'? 'vertical': '']">
          <span class="tit" v-if="showStyle === 'vertical'">城市</span>
          <el-select    
            class="citySelect"    
            @change="getAreas" 
            v-model="currentCity" 
            :disabled="disabled || cityDisabled">
            
            <el-option 
              :value="placeholders.city"
            >
            {{ placeholders.city }}
            </el-option>

            <el-option 
              v-for="(item, index) in cities"
              :value="item"
              :key="index">
              {{ item }}
            </el-option>
          </el-select>
        </span>

        <!---区---->
        <span 
          v-if="!hideArea" 
          :class="['selectBox', showStyle === 'vertical'? 'vertical': '']">
          <span class="tit" v-if="showStyle === 'vertical'">区/县</span>
          <select 
            class="areaSelect"
            v-model="currentArea" 
            :disabled="disabled || areaDisabled">
            <option 
              :value="placeholders.area">
              {{ placeholders.area }}
            </option>
            <option 
              v-for="(item, index) in areas "
              :value="item"
              :key="index">
              {{ item }}
            </option>
          </select>
        </span>
      </template>
    </template>
    <!--pc端---end-->

    <!--mobile端-start--->
    <template v-else>
      <div :class="addressHeader">
        <ul>
          <li :class="{'active': tab === 1}" @click="resetProvince">{{ currentProvince && !staticPlaceholder ? currentProvince : placeholders.province }}</li>
          <template v-if="!onlyProvince">
            <li v-if="showCityTab" :class="{'active': tab === 2}" @click="resetCity">{{  currentCity && !staticPlaceholder ? currentCity : placeholders.city }}</li>
            <li v-if="showAreaTab && !hideArea" :class="{'active': tab === 3}">{{ currentArea && !staticPlaceholder ? currentArea : placeholders.area }}</li>
          </template>
        </ul>
      </div>
      <div :class="addressContainer">
        <ul v-if="tab === 1">
          <li v-for="(item, index) in provinces"
              :class="{'active': item === currentProvince}"
              @click="chooseProvince(item)"
              :key="index">
            {{ item }}
          </li>
        </ul>
        <template v-if="!onlyProvince">
          <ul v-if="tab === 2">
            <li v-for="(item, index) in cities"
                :class="{'active': item === currentCity}"
                @click="chooseCity(item)"
                :key="index">
              {{ item }}
            </li>
          </ul>
          <ul v-if="tab === 3 && !hideArea">
            <li v-for="(item, index) in areas"
                :class="{'active': item === currentArea}"
                @click="chooseArea(item)"
                :key="index">
              {{ item }}
            </li>
          </ul>
        </template>
      </div>
    </template>
    <!--mobile端---end-->
  </div>
</template>

<script>
import DISTRICTS from './districts';

const DEFAULT_CODE = 0;

export default {
  name: 'v-distpicker',
  props: {
    province: { type: [String, Number], default: '' },
    city: { type: [String, Number], default: '' },
    area: { type: [String, Number], default: '' },
    showStyle:{ type:[String], default:'' },  // 三级是横排显示 还是 竖排显示，默认横排显示
    type: { type: String, default: '' },  // pc 还是移动端 mobile
    hideArea: { type: Boolean, default: false }, // 是否隐藏 区级
    onlyProvince: { type: Boolean, default: false }, // 是否仅仅只有省级
    staticPlaceholder: { type: Boolean, default: false },
    placeholders: {
      type: Object,
      default() {
        return {
          province: '-请选择-',
          city: '-请选择-',
          area: '-请选择-',
        }
      }
    },
    disabled: { type: Boolean, default: false },
    provinceDisabled: { type: Boolean, default: false },
    cityDisabled: { type: Boolean, default: false },
    areaDisabled: { type: Boolean, default: false },
    addressHeader: { type: String, default: 'address-header' },
    addressContainer: { type: String, default: 'address-container' },
    wrapper: { type: String, default: 'distpicker-address-wrapper' },
  },
  data() {
    return {
      tab: 1,
      showCityTab: false,
      showAreaTab: false,
      provinces: [],
      cities: [],
      areas: [],
      currentProvince: this.determineType(this.province) || this.placeholders.province,
      currentCity: this.determineType(this.city) || this.placeholders.city,
      currentArea: this.determineType(this.area) || this.placeholders.area,
    }
  },
  created() {
    console.log(typeof(DISTRICTS))
    console.log(DISTRICTS)
    if (this.type != 'mobile') {
      this.provinces = this.getDistricts()
      this.cities = this.province ? this.getDistricts(this.getAreaCode(this.determineType(this.province))) : []
      this.areas = this.city ? this.getDistricts(this.getAreaCode(this.determineType(this.city), this.area)) : []
    } else {
      if (this.area && !this.hideArea && !this.onlyProvince) {
        this.tab = 3
        this.showCityTab = true
        this.showAreaTab = true
        this.areas = this.getDistricts(this.getAreaCode(this.determineType(this.city), this.area))
      } else if (this.city && this.hideArea && !this.onlyProvince) {
        this.tab = 2
        this.showCityTab = true
        this.cities = this.getDistricts(this.getAreaCode(this.determineType(this.province)))
      } else {
        this.provinces = this.getDistricts()
      }
    }
  },
  watch: {
    // 省变化
    currentProvince(vaule) {
      debugger
      this.$emit('province', this.setData(vaule))
      if (this.onlyProvince) this.emit('selected')
    },
    //市变化
    currentCity(value) {
      debugger
      this.$emit('city', this.setData(value, this.currentProvince))
      if (value != this.placeholders.city && this.hideArea) this.emit('selected')
    },
    //区变化
    currentArea(value) {
      debugger
      this.$emit('area', this.setData(value, this.currentProvince, true))
      this.emit('selected')
    },
    province(value) {
      this.currentProvince = this.province || this.placeholders.province
      this.cities = this.determineValue(this.currentProvince, this.placeholders.province)
    },
    city(value) {
      this.currentCity = this.city || this.placeholders.city
      this.areas = this.determineValue(this.currentCity, this.placeholders.city, this.currentProvince)
    },
    area(value) {
      this.currentArea = this.area || this.placeholders.area
    },
  },
  methods: {
    setData(value, check = '', isArea = false) {
      let code
      if (isArea) {
        code = this.getCodeByArea(value)
      } else {
        code = this.getAreaCode(value, check)
      }

      return {
        code: code,
        value: value,
      }
    },
    getCodeByArea(value) {
      let code
      Object.values(this.areas).forEach((item, key) => {
        if (item === value) {
          code = Object.keys(this.areas)[key]
        }
      })
      return code
    },
    emit(name) {
      let data = {
        province: this.setData(this.currentProvince)
      }

      if (!this.onlyProvince) {
        this.$set(data, 'city', this.setData(this.currentCity))
      }

      if (!this.onlyProvince || this.hideArea) {
        this.$set(data, 'area', this.setData(this.currentArea, this.currentCity))
      }

      this.$emit(name, data)
    },
    getCities() {
      this.currentCity = this.placeholders.city
      this.currentArea = this.placeholders.area
      this.cities = this.determineValue(this.currentProvince, this.placeholders.province)
      this.cleanList('areas')
      if (this.cities.length === 0) {
        this.emit('selected')
        this.tab = 1
        this.showCityTab = false
      }
    },
    getAreas() {
      this.currentArea = this.placeholders.area
      this.areas = this.determineValue(this.currentCity, this.placeholders.city, this.currentProvince)
      if (this.areas.length === 0) {
        this.emit('selected')
        this.tab = 2
        this.showAreaTab = false
      }
    },
    resetProvince() {
      this.tab = 1
      this.provinces = this.getDistricts()
      this.showCityTab = false
      this.showAreaTab = false
    },
    resetCity() {
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseProvince(name) {
      this.currentProvince = name
      if (this.onlyProvince) return
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseCity(name) {
      this.currentCity = name
      if (this.hideArea) return
      this.tab = 3
      this.showCityTab = true
      this.showAreaTab = true
      this.getAreas()
    },
    chooseArea(name) {
      this.currentArea = name
    },
    getAreaCodeByPreCode(name, preCode) {
      let codes = []

      for(let x in DISTRICTS) {
        for(let y in DISTRICTS[x]) {
          if(name === DISTRICTS[x][y]) {
            codes.push(y)
          }
        }
      }

      if (codes.length > 1) {
        let index
        codes.forEach((item, i) => {
          if (item.slice(0, 2) == preCode) {
            index = i
          }
        })

        return codes[index]
      } else {
        return codes[0]
      }
    },
    getAreaCode(name, check = '') {
      for(let x in DISTRICTS) {
        for(let y in DISTRICTS[x]) {
          if(name === DISTRICTS[x][y]) {
            if (check.length > 0) {
              let code = this.getAreaCodeByPreCode(check, y.slice(0, 2))

              if (!code || y.slice(0, 2) !== code.slice(0, 2)) {
                continue
              } else {
                return y
              }
            } else {
              return y
            }
          }
        }
      }
    },
    getCodeValue(code) {
      for(let x in DISTRICTS) {
        for(let y in DISTRICTS[x]) {
          if(code === parseInt(y)) {
            return DISTRICTS[x][y]
          }
        }
      }
    },
    getDistricts(code = DEFAULT_CODE) {
      return DISTRICTS[code] || []
    },
    determineValue(currentValue, placeholderValue, check = '') {
      if(currentValue === placeholderValue) {
        return []
      } else {
        return this.getDistricts(this.getAreaCode(currentValue, check))
      }
    },
    determineType(value) {
      if(typeof value === 'number') {
        return this.getCodeValue(value)
      }

      return value
    },
    cleanList(name) {
      this[name] = []
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.distpicker-address-wrapper {
  color: #9caebf;
  .selectBox {
    &.vertical {
      display block
      margin 4px 0
      .tit {
        font-size 14px
        padding 0 12px 0 0
        color #606266
        box-sizing border-box
      }
      .provinceSelect, .citySelect, .areaSelect {
        width 250px
        // color #CDD0D6
        color rgba(96,98,102,.8)
        font-size 14px
      }
      .citySelect {
        margin-top 15px
      }
    }
    select {
      padding: .5rem .75rem;
      height: 40px;
      font-size: 1rem;
      line-height: 1.25;
      color: #606266;
      background-color: #fff;
      background-image: none;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,.15);
      border-radius: .25rem;
      -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      // &.vertical {
      //   display block
      //   margin 10px
      // }

      option {
        font-weight: normal;
        display: block;
        white-space: pre;
        min-height: 1.2em;
        padding: 0px 2px 1px;
      }
    }    
  }


  // 移动端
  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }
  .address-header {
    background-color: #fff;

    ul {
      display: flex;
      justify-content: space-around;
      align-items: stretch;

      li {
        display: inline-block;
        padding: 10px 10px 7px;

        &.active {
          border-bottom: #52697f solid 3px;
          color: #52697f;
        }
      }
    }
  }
  .address-container {
    background-color: #fff;

    ul {
      height: 100%;
      overflow: auto;

      li {
        padding: 8px 10px;
        border-top: 1px solid #f6f6f6;

        &.active {
          color: #52697f;
        }
      }
    }
  }
}
.disabled-color{
  background: #f8f8f8;
}

</style>
