<!--
  User: gaol
  Date: 2019/7/23
  功能：table-config页面中 右边组件设置区域的 默认属性设置项 点击 公式 btn 后的弹框设置基础组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div>
        <div class="default-attributeExpressionSet-cmp">
            
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicCollection } from '@/api/permission'
  import { getParentDic, getDicWithConfig } from '@/api/common-dic'

  import { mapGetters } from 'vuex'
  export default {
    props: {
      expressionAttrSetObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {

    },      
    data () {
      return {
        middleData: [
          {

          },
        ]
      }
    },
    computed: {
      ...mapGetters([
        'currentFieldStore',
        'currentFieldsStore'
      ]),

    },
    watch: {
      expressionAttrSetObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:expressionAttrSetObj', newValue)
        },
        deep: true
      }
    },  
    created () {

    },
    methods: {

    }
  }
</script>

