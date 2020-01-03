<!--
  User: gaol
  Date: 2019/12/31
  功能： 职位事件处理器组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.positionEventHandlerCmp
    padding 0 20px
    box-sizing  border-box
</style>

<template>
  <div class="positionEventHandlerCmp">
      职位事件处理器
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
      SaveFooter,
    },
    data(){
      return {
        loading: false,
      }
    },
    created(){

    },
    methods:{

    }
  }
</script>
