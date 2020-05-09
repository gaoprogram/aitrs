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
        <!-- currentTreeNodeObj: {{currentTreeNodeObj}} -->
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

            <!-- <div class="item-container">
                <span class="tit">适用范围</span>
                <el-select 
                    v-model="queryObj.scope"
                    placeholder="请选择">
                    <el-option
                        label="全部"
                        value="-1"
                    >
                    </el-option>                    
                    <el-option
                        label="系统"
                        value="1"
                    >
                    </el-option>
                    <el-option
                        label="企业"
                        value="2"
                    >
                    </el-option>                    
                    <el-option
                        label="个人"
                        value="3"
                    >
                    </el-option>
                </el-select>
            </div>

            <div class="item-container">
                <span class="tit">移动端显示</span>
                <el-select 
                    v-model="queryObj.isMobile"
                    placeholder="请选择">
                    <el-option
                        label="是"
                        value="1"
                    >
                    </el-option>
                    <el-option
                        label="否"
                        value="0"
                    >
                    </el-option>                    
                </el-select>   
            </div>   

            <div class="item-container">
                <span class="tit">pc端显示</span>
                <el-select 
                    v-model="queryObj.isPc"
                    placeholder="请选择">
                    <el-option
                        label="全部"
                        value="-1"
                    >
                    </el-option>
                    <el-option
                        label="是"
                        value="1"
                    >
                    </el-option>
                    <el-option
                        label="否"
                        value="0"
                    >
                    </el-option>                    
                </el-select>   
            </div>  

            <div class="item-container">
                <span class="tit">是否启用</span>
                <el-select 
                    v-model="queryObj.state"
                    placeholder="请选择">
                    <el-option
                        label="是"
                        value="1"
                    >
                    </el-option>
                    <el-option
                        label="否"
                        value="0"
                    >
                    </el-option>                    
                </el-select>   
            </div>  -->

            <div class="item-container">
                <span class="tit">模块</span>
                <!-- moduleSource: {{moduleSource}} -->
                <el-select v-model="queryObj.moduleCode">
                    <el-option
                        v-for="(item, key) in moduleSource"
                        :key="key"
                        :label="item.ModuleName"
                        :value="item.ModuleCode"
                    >
                    </el-option>
                </el-select>
            </div>

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
            state:'',
            pcode: '',
            moduleCode: '',  // 模块              
        }
      }
    },
    watch: {
        currentPcode:{
            handler(newValue, oldValue){
                if(newValue){
                    debugger
                    this.queryObj.pcode = newValue
                    this.$emit("emitRefreshTable", this.queryObj)
                }
            },
            immediate: true
        },
        currentKeyName:{
            handler(newValue, oldValue){
                this.queryObj.key = newValue
            },
            immediate: true
        },    
        'currentTreeNodeObj.ModuleCode':{
            handler(newValue, oldValue){
                this.queryObj.moduleCode = newValue
            },
            immediate: true
        },
        'currentTreeNodeObj.State':{
            handler(newValue, oldValue){
                this.queryObj.state = newValue
            },
            immediate: true
        },  
        'queryObj.key': {
            handler(newValue, oldValue){
                if(!newValue){
                    this.$emit("emitRefreshTable", this.queryObj)                    
                }
            }
        }                   
    },
    created(){
        this.GetModuleList(65556)
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
                state:'',
                pcode: '',
                moduleCode: '',  // 模块          
            })
            this.$emit("emitRefreshTable", this.queryObj)
        },
        // 获取模块下拉源
        GetModuleList(pageSize, pageNum){
            GetModuleList(pageSize).then(res => {
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


