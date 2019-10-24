<!--
  User: gaol
  Date: 2019/10/24
  功能： 员工详情页面中 【修改状态】 dialog 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       
</style>
<template>
  <div class="editStatus-cmp" v-loading= 'loading'>
    <el-dialog
        title="修改状态"
        width="50%"
        append-to-body
        custom-class="editStatus"
        :visible.sync="dialogVisible"
    > 

        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="tit"
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
        <save-footer @save="save" @cancel="cancel"></save-footer>        
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
            tit: '生效时间',
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
        save() {

        },
        //取消
        cancel(){
            this.dialogVisible = false
        },
    }
  }
</script>
