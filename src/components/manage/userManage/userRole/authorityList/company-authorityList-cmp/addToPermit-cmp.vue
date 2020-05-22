<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置—— 权限引用列表-- 添加到 许可权 组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.addToPermitCmp
    padding 0 20px
    box-sizing border-box
</style>

<template>
    <div class="addToPermitCmp">
        <div :class="['tableBox', tableData.length<=0? 'not_found':'']" v-loading="loading">
            <el-table
                border
                :data="tableData"
                empty-text=" "
                @selection-change="handlerSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >

                </el-table-column>

                <el-table-column
                    label="许可权"
                >

                </el-table-column>

                <el-table-column
                    label="许可权名"
                >

                </el-table-column>          

                <el-table-column
                    label="描述"
                >

                </el-table-column>    

                <el-table-column
                    label="引用的角色"
                >

                </el-table-column>   

                <el-table-column
                    label="引用的角色"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.State == 1">
                            启用
                        </span>
                        <span v-if="scope.row.State == 0">
                            停用
                        </span>                        
                    </template>
                </el-table-column>                                                         
            </el-table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
//   import SaveFooter from '@/base/Save-footer/Save-footer'
  import  { REQ_OK } from '@/api/config'
  import { 

  }from '@/api/systemManage'
  export default {
    props:{

    },
    components: {
        // SaveFooter
    },
    watch: {

    },
    data(){
      return {
          loading: false,
      }
    },
    watch: {
          
    },
    created(){

    },
    methods: {

    }
}
</script>


