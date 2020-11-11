<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--菜单管理
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
                <span class="tit">关键词</span>
                <el-input 
                    v-model="queryObj.key"
                    placeholder="许可权名/编号/角色">
                </el-input>
            </div>

            <!-- <div class="item-container">
                <span class="tit">类型</span>
                <el-select v-model="queryObj.sysType">
                    <el-option 
                        v-for="(item, key) in sysTypeOptions"
                        :key="key"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div> -->

            <div class="item-container" v-show="currentPcode">
                <el-button type="primary"  @click.native="clickSearchBtn">搜索</el-button>    
                <el-button type="primary"  @click.native="clickResetBtn">重置</el-button>    
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
        },
        currentKeyName: {
            type: String,
            default: ''
        }
    },
    components: {
        // SaveFooter
    },
    data(){
      return {
            queryObj: {
                key: '',
                // roleGroupCode: '',  // 角色组code 
                // permissionId: '',  // 权限id
                // sysType: '2', //  1 启用 0 停用
            },
            sysTypeOptions: [
                {
                    label: '系统',
                    value: '1'
                },
                {
                    label: '企业',
                    value: '2'
                }
            ]
        }
    },
    watch: {
        currentPcode:{
            handler(newValue, oldValue){
                if(newValue){
                    debugger
                    // this.queryObj.permissionId = newValue
                    // this.$emit("emitRefreshTable", this.queryObj)
                }
            },
            // immediate: true
        },
        currentKeyName:{
            handler(newValue, oldValue){
                this.queryObj.key = newValue
            },
            // immediate: true
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
                // sysType: '2',        
            })
            // this._getSysMenuList()
            this.$emit("emitRefreshTable", this.queryObj)
        },
    }
}
</script>


