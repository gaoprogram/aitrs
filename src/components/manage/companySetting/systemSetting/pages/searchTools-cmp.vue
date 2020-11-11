<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--菜单管理 【企业】
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
                    clearable
                    placeholder="名称">
                </el-input>
            </div>
            <!-- moduleSource: {{moduleSource}} -->
            <!-- <div class="item-container">
                <span class="tit">模块</span>
                <el-select 
                    clearable
                    v-model="queryObj.moduleCode">
                    <el-option
                        v-for="(item, key) in moduleSource"
                        :key="key"
                        :label="item.ModuleName"
                        :value="item.ModuleCode"
                    >
                    </el-option>
                </el-select>
            </div> -->

            <div class="item-container">
                <el-button type="primary" size="small" @click.native="clickSearchBtn">搜索</el-button>    
                <el-button type="primary" size="small" @click.native="clickResetBtn">重置</el-button>    
            </div>                           

        </div>        
        <!---搜索部分---end-->
    </div>
</template>

<script type="text/ecmascript-6">
//   import SaveFooter from '@/base/Save-footer/Save-footer'
  import  { REQ_OK } from '@/api/config'
  import { 
      GetModuleList
  }from '@/api/systemManage'
  export default {
    props:{
        currentTreeNodeObj: {
            type: Object,
            default: () => {
                return {}
            }
        },        
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
        moduleSource: [],  // 模块下拉源list
        queryObj: {
            key: '',  // 关键词
            menuCode: '',
            moduleCode: '',  // 模块              
        }
      }
    },
    watch: {
        'currentTreeNodeObj.MenuCode':{
            handler(newValue, oldValue){
                // if(newValue){
                    debugger
                    this.queryObj.menuCode = newValue
                    if(newValue == 'all'){
                        this.queryObj.moduleCode = ''
                    }else {
                        this.queryObj.moduleCode = this.currentTreeNodeObj.ModuleCode
                    }
                    this.$emit("emitRefreshTable", this.queryObj)
                // }
            },
            immediate: true
        },
        // currentKeyName:{
        //     handler(newValue, oldValue){
        //         this.queryObj.key = newValue
        //     },
        //     immediate: true
        // },    
        'currentTreeNodeObj.ModuleCode':{
            handler(newValue, oldValue){
                this.queryObj.moduleCode = newValue
                this.queryObj.menuCode = this.currentTreeNodeObj.MenuCode

            },
            // immediate: true
        },
        // 'currentTreeNodeObj.State':{
        //     handler(newValue, oldValue){
        //         debugger
        //         this.queryObj.state = newValue
        //     },
        //     // immediate: true
        // },  
        'queryObj.key': {
            handler(newValue, oldValue){
                debugger
                if(!newValue){
                    this.$emit("emitRefreshTable", this.queryObj)
                }
            }
        }         
    },
    created(){
        this.GetModuleList(65556)
        // this.$bus.$on("treeNodeClick")
    },
    methods: {
        // 搜索
        clickSearchBtn(){
            this.$emit("emitRefreshTable", this.queryObj)
        },
        // 重置
        clickResetBtn(){
            Object.assign(this.queryObj, {
                key: '',  // 关键词
                state: 1,  //状态，0停用 默认1启用
                // menuCode: '',
                moduleCode: '',  // 模块          
            })
            this.$emit("emitRefreshTable", this.queryObj)
        },
        // 获取模块下拉源
        GetModuleList(pageSize, pageNum){
            GetModuleList(65556).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.moduleSource = res.data.Data
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取模块下拉源失败,${res.data.Error}`
                    })
                }
            }).catch(() => {
                // this.$message({
                //     type: 'warning',
                //     message: '获取模块下拉源数据出错了'
                // })
            })
        }
    }
}
</script>


