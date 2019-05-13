<!--
  User: xxxxxxx
  Date: 2018/1/2
  功能：指定天数选择
-->

<template>
  <div class="el-form-item__content" style="display: inline-block">
    <div class="el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--date">
      <!---->
      <input autocomplete="off" placeholder="选择日期时间" size="" name="" id="" type="text" rows="2" prefixicon="el-icon-date"
             class="el-input__inner"
             ref="daysInput"
             @focus="focus()"
             @blur="blur()"
             v-model="dayText"
             @change="changeDay()"
      >
      <span class="el-input__prefix">
            <i class="el-input__icon el-icon-date"></i>
        </span>
      <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
                <i class="el-input__icon"></i>
              <!---->
            </span>
        </span>
      <!---->
    </div>
    <!--<div class="el-form-item__error" v-if="inputFocus && !dayText">-->
      <!--{{ errorText }}-->
    <!--</div>-->
    <div class="el-picker-panel el-date-picker el-popper days-picker"
         style="transform-origin: center top 0px; z-index: 2026; position: absolute; left: -60px;"
         x-placement="bottom-start"
         v-show="daysPick"
    >
      <div class="el-picker-panel__body-wrapper">
        <div class="el-picker-panel__body">
          <div class="el-picker-panel__content">
            <table cellspacing="0" cellpadding="0" class="el-date-table">
              <tbody>
                <tr class="el-date-table__row" v-for="item in days">
                  <td class="available" v-for="child in item" :key="child">
                    <div @mousedown="chooseDay(child)">
                      <span class="item">
                        {{ child }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      errorText: {
        type: String,
        default: ''
      },
      date: {
        type: Number,
        default: null
      }
    },
    data () {
      return {
        days: [
          [ 1, 2, 3, 4, 5, 6, 7 ],
          [ 8, 9, 10, 11, 12, 13, 14 ],
          [ 15, 16, 17, 18, 19, 20, 21 ],
          [ 22, 23, 24, 25, 26, 27, 28 ],
          [ 29, 30, 31 ]
        ],
        daysPick: false,
        dayText: 1
      }
    },
    created () {
    },
    methods: {
      focus () {
        this.daysPick = true
      },
      blur () {
        this.daysPick = false
        this.changeDay()
      },
      chooseDay (day) {
        this.dayText = day
        this.$emit('changeDay', day)
      },
      changeDay () {
        this.$emit('changeDay', this.dayText)
      }
    },
    watch: {
      'date': {
        handler (curVal, oldVal) {
          this.dayText = curVal
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
