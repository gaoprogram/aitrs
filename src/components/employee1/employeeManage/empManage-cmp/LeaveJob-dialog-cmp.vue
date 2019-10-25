<!--
  User: gaol
  Date: 2019/9/29
  功能： 员工详情页面中 点击 [离职] btn后的  弹框组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
  <div class="leaveJob-cmp" v-loading= 'loading'>
    <el-dialog
        title="离职信息"
        width="80%"
        append-to-body
        custom-class="leaveJob"
        :visible.sync="dialogVisible"
    >    
        <!-- groupFieldData:{{groupFieldData}}-->
        <emp-leave-job-field-cmp 
            ref="empLeaveJobFieldCmp"
            :groupFieldData="groupFieldData"
            :isAddField="true"
            @isSubmit="isSubmit"
        >
        </emp-leave-job-field-cmp>
        <!---底部保存按钮区域--start-->
        <save-footer @save="save" @cancel="cancel"></save-footer>        
        <!--底部保存按钮区域----end-->    
    </el-dialog> 
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EmpLeaveJobFieldCmp from './EmpLeaveJobField-cmp'
  import { REQ_OK } from '@/api/config'
  import { getLeaveJobFieldList, saveLeaveJobFieldList } from '@/api/employee'
  export default {
    props: {
      showCommonDialog: {
        type: Boolean,
        default: false
      },
      empObj: {
        type: Object,
        default: () => {
            return {}
        }
      }
    },
    components:{
      SaveFooter,
      EmpLeaveJobFieldCmp
    },
    data(){
        return {
          loading: false,
          dialogVisible: this.showCommonDialog,
          groupFieldData: {
                FieldValueSet: []
            },
          StrJson: ''
        }
    },
    created() {
        debugger
        // 获取离职表单数据
        this._getLeaveJobFieldList()
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
        // 获取离职表单信息
        _getLeaveJobFieldList(){
            getLeaveJobFieldList().then(res => {
                debugger
                if( res && res.data.State === REQ_OK ){
                    this.groupFieldData.FieldValueSet = res.data.Data
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取离职表单数据失败,${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '获取离职表单数据出错'
                })
            })
        },
        // 保存离职表单数据
        _saveLeaveJobList(){
            this.loading = true
            debugger
            saveLeaveJobFieldList(this.empObj.EmpId, this.StrJson).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.$bus.$emit("emitCloseEmpInfoDialog")
                }else {
                    this.$message({
                        type: 'error',
                        message: `保存离职表单数据失败${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '保存离职表单数据出错'
                })
            })
        },
        //取消
        cancel(){
          this.dialogVisible = false
        },
        // 保存
        save(){
            this.$refs.empLeaveJobFieldCmp.submitForm()
        },
        //处理数据
        _handlerData(){
            let newData = this.groupFieldData.FieldValueSet.map((item, key) => {
                return {
                    FieldCode: item.FieldCode,
                    FieldValue: item.FieldValue,
                }
            })
            this.StrJson = JSON.stringify(newData)
            debugger
        },
        async isSubmit(opt){
            debugger
            if(opt && opt.length && opt[1] === true){
                // 成功了
                await this._handlerData()
                this._saveLeaveJobList()
            }else {
                this.$message({
                    type: 'warning',
                    message: '请填写完整后保存'
                })
            }
        }
    }
  }
</script>
