<!--
  User: gaol
  Date: 2019/10/28
  功能：基础设置- 自定义字典表
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.customerDicListBox
    padding 0 20px
</style>

<template>
    <div class="customerDicListBox animated fadeIn">
        <!-- tableData: {{tableData}} -->
        <div :class="['tableBox', tableData.length<=0? 'not_found': '']">
            <el-table
                border
                style="width: 100%"
                empty-text=" "
                :data="tableData"
            >

                <el-table-column
                    prop="DicCode"
                    label="字典代码"
                >
                </el-table-column>

                <el-table-column
                    prop="DicName"
                    label="字典名称"
                >
                </el-table-column>

                <el-table-column
                    prop="ParentDicCode"
                    label="父级字典"
                >
                </el-table-column>

                <el-table-column
                    prop="ParentDicName"
                    label="父级字典名"
                >
                </el-table-column>

                <el-table-column
                    prop="State"
                    label="状态"
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

                <el-table-column
                    prop="StateName"
                    label="状态名"
                >
                </el-table-column>       

                <el-table-column
                    prop="IsSys"
                    label="是否系统默认"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.IsSys == 1">
                            是
                        </span>
                        <span v-if="scope.row.IsSys == 0">
                            否
                        </span>                        
                    </template>
                </el-table-column>    

                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click.native="handlerScan(scope.row)"
                        >
                            查看
                        </el-button>
                        <span 
                            v-if="scope.row.IsSys != 1"
                            @click.native="handlerEdit(scope.row)"
                        >
                            编辑
                        </span>
                        <span 
                            v-if="scope.row.IsSys != 1 && scope.row.State == 0"
                            @click.native="handlerStartUsing(scope.row)"
                        >
                            启用
                        </span>
                        <span 
                            v-if="scope.row.IsSys != 1 && scope.row.State == 1" 
                            @click.native="handlerStopUsing(scope.row)"
                        >
                            停用
                        </span>                        
                        <span 
                            v-if="scope.row.IsSys != 1"
                            @click.native="handlerDelete(scope.row)"
                        >
                            删除
                        </span>                                                                        
                    </template>
                </el-table-column>                                     

            </el-table>
        </div>

        <div class="showDetailBox" v-if="showDetailDialog">
            <el-dialog
                title="查看"
                :fullscreen="true"
                :visible.sync="showDetailDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <customer-dic-cmp :obj="currentRowObj"></customer-dic-cmp>
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { REQ_OK } from '@/api/config'
import CustomerDicCmp from './customerDic'
import {
    getCustomerDicTab
} from '@/api/employee'
export default {
    components: {
        CustomerDicCmp
    },
    data(){
        return {
            loading: false,
            showDetailDialog: false,
            tableData: [], 
            currentRowObj: {},  // 当前行对象
        }
    },
    created(){
        //获取dic 目录
        this._getCustomerDicTab()
    },
    methods: {
      // 获取dic tab目录
      _getCustomerDicTab(){
        this.loading = true
        getCustomerDicTab("PA").then(res => {
          this.loading = false
          if(res && res.data.State ===REQ_OK){
            this.tableData = res.data.Data
            // this.activeTabDicCode = res.data.Data[0].DicCode
            // this.currentDicCode = this.tableData[0].DicCode
            // this.currentParentDicCode = this.tableData[0].ParentDicCode
          }else {
            this.$message({
              type: 'success',
              message: `获取dic目录数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '获取dic目录数据出错'
          })
        })
      },  
      // 查看
      handlerScan(rowObj){
          debugger
          this.currentRowObj = rowObj
          this.showDetailDialog = true
      },  
      // 启用
      handlerStartUsing(rowObj){
        this.currentRowObj = rowObj
      },  
      // 停用
      handlerStopUsing(rowObj){
        this.currentRowObj = rowObj
      },  
      // 删除
      handlerDelete(rowObj){
        this.currentRowObj = rowObj
      }
    }
}

</script>
