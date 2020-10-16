<template>
  <div class="dic-select el-select u-f-jst" style="display: block">
    <span>{{title}}：</span>
    <div class="div-selected u-f0">
        <span>
          <slot></slot>
          <!--<span class="el-tag el-tag&#45;&#45;info el-tag&#45;&#45;small" v-for="(item, base-info) in list" :key="item.value">-->
            <!--<span class="el-select__tags-text">{{ item.label }}</span>-->
            <!--<i class="el-tag__close el-icon-close" @click="del(base-info)"></i>-->
          <!--</span>-->
        </span>
    </div>
    <el-button type="primary"
               @click.native.prevent="add()"
    >
      <i class="el-icon-plus"></i>
    </el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  // 字典项选择组件
  export default {
    props: {
      title: '',
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      add () {
        this.$emit('add')
      },
      del (index) {
        this.$emit('del', index)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.dic-select
  margin-bottom 10px
  font-size 14px
  .div-selected
    display: inline-block
    line-height: normal
    max-width: 282px
    min-width: 282px
    min-height 38px
    border: 1px solid #d8dce5
    border-radius: 4px
    vertical-align: top
</style>
