<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工详情页面中的  【转正】 dialog组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="fullMember-cmp">
      <el-dialog 
        width="30%"
        :visible.sync="dialogVisible"
        append-to-body
        :close-on-click-modal="false"
        custom-class="main"
    >
        <el-form :label-position="labelPosition" label-width="80px" :model="formObj">
            <el-form-item label="转正时间">
                <!-- <el-input v-model="formObj.time" size="mini" style="width:200px"></el-input> -->
                <el-date-picker
                    v-model="formObj.time"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="员工类型">
                <!-- empTypeOptions：{{empTypeOptions}} -->
                <el-select v-model="formObj.empType" placeholder="请选择员工类型">
                    <el-option
                        v-for="(item,index) in empTypeOptions"
                        :key="item.Id"
                        :label="item.ItemName"
                        :value="item.ItemCode"
                    >   
                    </el-option>
                </el-select>
            </el-form-item>     
            <el-form-item label="员工状态">
                <!-- empStatusOptions:{{empStatusOptions}} -->
                <el-select v-model="formObj.empStatus" placeholder="请选择员工状态">
                    <el-option
                        v-for="(item,index) in empStatusOptions"
                        :key="item.Id"
                        :label="item.ItemName"
                        :value="item.ItemCode"
                    >   
                    </el-option>
                </el-select>
            </el-form-item>     
        </el-form>   

        <div>
            <save-footer @cancel="cancel" @save="save"></save-footer>  
        </div>              
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { PaGetEmpDataSourceList } from '@/api/dic'
    import { REQ_OK } from '@/api/config'

    // 员工类型
    const DicType_empType = 'SYS'
    const DicCode_empType = 'EmpType'

    // 员工状态
    const DicType_empStatus = 'CUS'
    const DicCode_empStatus = 'EmpStatus'

    export default {
        components: {
            SaveFooter
        },
        props: {
            showCommonDialog: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                loading: false,
                dialogVisible: this.showCommonDialog,                
                labelPosition: 'right',
                empTypeOptions: [],  // 员工类型
                empStatusOptions: [], // 员工状态
                formObj: {
                    time: '2019-09-09',   
                    empType: '',
                    empStatus: ''
                },
            }
        },
        watch: {
            dialogVisible: {
                handler(newValue, oldValue){
                debugger
                this.$emit("update:showCommonDialog", newValue)
                }
            }
        },        
        created() {
            // 调取字典表获取 员工类型 数据源
            this._getEmpDataSourceList_empType()
            // 获取 员工状态数据源
            this._getEmpDataSourceList_empStatus()
        },
        methods: {
            // 获取员工类型的数据源
            _getEmpDataSourceList_empType(){
                PaGetEmpDataSourceList(DicType_empType, DicCode_empType).then(res => {
                    if( res && res.data.State === REQ_OK ){
                        this.empTypeOptions = res.data.Data
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取员工类型数据源失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取员工类型数据出错'
                    })
                })
            },
            // 获取员工状态的数据源
            _getEmpDataSourceList_empStatus(){
                PaGetEmpDataSourceList(DicType_empStatus, DicCode_empStatus).then(res => {
                    if( res && res.data.State === REQ_OK ){
                        this.empStatusOptions = res.data.Data
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取员工状态数据源失败,${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取员工的状态数据源出错'
                    })
                })                
            },
            // 取消
            cancel() {
                this.dialogVisible = false
            },
            save(){
                debugger
                // 将 formSearchObj 传给父级 
                this.$emit("emitSearchResult", this.formSearchObj)
                // 将 formSearchObj 传给 兄弟组件 common-tableInfo
                this.$bus.$emit("emitSearchToolsResult", this.formSearchObj)
            }
        }
    }
</script>
