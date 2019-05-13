<template>
    <div class="common_date-container">
      <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
      <el-date-picker
        v-model="value"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      showTitle: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      obj: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        value: ''
      }
    },
    computed: {
      currentType () {
        return ''
      }
    },
    methods: {
      inputText () {
        console.log(this.input)
        this.$emit('changeInputText', Object.assign({}, this.obj, { EndValue: this.input }))
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .common_input-container
    display: inline-block;
    width: 300px;
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-input
      width 200px
</style>
