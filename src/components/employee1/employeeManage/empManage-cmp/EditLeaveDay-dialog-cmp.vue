<!--
  User: gaol
  Date: 2019/9/29
  功能： 员工详情页面中 点击 修改离职日  弹框组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       
</style>
<template>
  <div class="editLeaveDay-cmp" v-loading= 'loading'>
    <el-dialog
        title="修改离职日"
        width="50%"
        append-to-body
        custom-class="editDutyDate"
        :visible.sync="dialogVisible"
    > 

        <p class="tip">注：该操作将引发相关的数据生效日期发生变动，请谨慎操作</p>

        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label=""
                width="180">
            </el-table-column>
            <el-table-column
                prop="currentValue"
                label="当前值"
                width="180">
            </el-table-column>
            <el-table-column
                prop="afterValue"
                label="变更后"
            >
            <template slot-scope="scope">
                <el-date-picker
                    v-model="scope.row.afterValue"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>                
            </template>
            </el-table-column>
        </el-table> 

        <!---底部保存按钮区域--start-->
        <save-footer @save="saveEditDutyDate" @cancel="cancelEditDutyDate"></save-footer>        
        <!--底部保存按钮区域----end-->    
    </el-dialog> 
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      showCommonDialog: {
        type: Boolean,
        default: false
      }
    },
    components:{
      SaveFooter
    },
    data(){
        return {
          loading: false,
          dialogVisible: this.showCommonDialog,
          tableData: [{
            date: '2016-05-02',
            currentValue: '2019-05-05',
            afterValue: '2019-08-08'
          }]            
        }
    },
    created() {
        debugger
    },
    watch: {
      dialogVisible: {
        handler(newValue, oldValue){
          debugger
          this.$emit("update:showCommonDialog", newValue)
        }
      }
    },
    methods: {
        // 保存
        saveEditDutyDate() {

        },
        //取消
        cancelEditDutyDate(){

        },
    }
  }
</script>
