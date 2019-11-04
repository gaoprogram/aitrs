<!--
  User: gaol
  Date: 2019/10/31
  功能：平台系统设置——许可权-许可权-添加许可权table组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.dataSafe
  padding 0 20px
  box-sizing border-box
  .containerWrap
    .topBtnBox
      margin-bottom 10px
      text-align right
</style>

<template>
    <div class="dataSafe" v-loading = 'loading'>
        数据安全

        <el-card>
            <div>
                
            </div>
        </el-card>
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    components:{
      SaveFooter
    },
    data(){
      return {
        loading: false, // loading状态
      }
    },
    methods: {
        
    },
  }
</script>
