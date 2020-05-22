<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--角色组
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.search-cmp
    padding 0 20px
    box-sizing border-box
    .searchTop
        margin 5px 0 10px 0
    .item-container
        margin-top 5px
        display inline-block
        >>>.el-input
            display inline-block !important
            width 200px

</style>

<template>
    <div class="search-cmp">
        <!--搜索部分--start-->
        <div class="searchTop">
            <div class="item-container">
                <!-- <span class="tit">关键词</span> -->
                <el-input 
                    v-model="queryObj.key"
                    clearable
                    placeholder="角色名,编号">
                </el-input>
            </div>
            <!-- currentPcode: {{currentPcode}} -->
            <div class="item-container">
                <el-button 
                    v-show="currentPcode"
                    type="primary" 
                    @click.native="clickSearchBtn"
                >搜索</el-button>    
                <el-button 
                    v-show="currentPcode"
                    type="primary"  
                    @click.native="clickResetBtn"
                >重置</el-button>    
            </div>                          

        </div>        
        <!---搜索部分---end-->
    </div>
</template>

<script type="text/ecmascript-6">
//   import SaveFooter from '@/base/Save-footer/Save-footer'
  import  { REQ_OK } from '@/api/config'
  import { 
    getSysMenuList,
    deleteSysMenu,
    sortSysMenu,
    saveSysMenu
  }from '@/api/systemManage'
  export default {
    props:{
        // 左边树组件选中的当前菜单
        currentPcode: {
            type: String,
            default: ''
        }
    },
    components: {
        // SaveFooter
    },
    watch: {

    },
    data(){
      return {
        queryObj: {
            key: ''           
        }
      }
    },
    watch: {
        currentPcode:{
            handler(newValue, oldValue){
                if(newValue){
                    debugger
                    this.queryObj.pcode = newValue
                    // this.$emit("emitRefreshTable", this.queryObj)
                }
            },
            immediate: true
        },
        currentKeyName:{
            handler(newValue, oldValue){
                this.queryObj.key = newValue
            },
            immediate: true
        }               
    },
    created(){

    },
    methods: {
        // 搜索
        clickSearchBtn(){
            // this._getSysMenuList()
            this.$emit("emitRefreshTable", this.queryObj)
        },
        // 重置
        clickResetBtn(){
            Object.assign(this.queryObj, {
                key: '',    
            })
            // this._getSysMenuList()
            this.$emit("emitRefreshTable", this.queryObj)
        },
    }
}
</script>


