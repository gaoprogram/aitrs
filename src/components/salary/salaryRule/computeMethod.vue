<!--
  User: xxxxxxx
  Date: 2017/12/29
  功能：xxxxxx
-->

<template>
  <div class="compute-method mg-30">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>运算原理</span>
      </div>
      <div v-for="item in PromptArr" :key="item" class="text item">
        {{ item }}
      </div>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <!--<el-button @click="pre()">上一步</el-button>-->
      <el-button type="primary" @click="done()">完 成</el-button>
      <!--<el-button @click="cancel()">取 消</el-button>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        PromptArr: [
          '1. 收入合计 = 税前收入项 + 税后收入项 + 免税收入项',
          '2. 扣减合计 = 税前扣减项 + 税后扣减项 + 应纳税额 - 扣除境外缴纳的个税',
          '3. 实发合计 = 收入合计 - 扣减合计',
          '4. 应纳税总额 = 税前收入项 - 税前扣减项',
          '5. 应纳税所得额 = 税前收入项 - 税前扣减项 - 个税起征点',
          '6. 应纳税额 = 应纳税所得额 * 对应税级的税率 - 速算扣除数',
          '7. 应扣缴税额 = 应纳税额 - 扣除境外缴纳的个税'
        ]
      }
    },
    methods: {
      pre () {
        this.$emit('pre')
      },
      cancel () {
        this.$emit('cancel')
      },
      done () {
        this.$emit('done')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .compute-method
    .item
      padding 5px
      &:nth-child(odd)
        background #e6ebf5
</style>
