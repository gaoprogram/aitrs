<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工-在职员工、待入职员工、离职员工页面的 搜索组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.searchTools-cmp
    .main
        max-height 500px
        overflow auto
        margin-bottom 10px
   
</style>
<template>
    <div class="searchTools-cmp">
      <!-- <div class="searchCoditions">
        <el-button type="primary" size="mini">精确搜索</el-button>
        <el-button type="primary" size="mini">模糊搜索</el-button>
        <div class="tip">最多可以选择三个</div>
      </div> -->

      <div class="main">
        <el-card>
            <el-form :label-position="labelPosition" label-width="80px" :model="formSearchObj">
                <el-form-item label="员工号">
                    <el-input v-model="formSearchObj.empNo" size="mini" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="中文姓名">
                    <el-input v-model="formSearchObj.empName" size="mini" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="组织">
                    <el-input v-model="formSearchObj.Org" size="mini" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="岗位">
                    <el-input v-model="formSearchObj.Pos" size="mini" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="员工类型">
                    <!-- empTypeOptions：{{empTypeOptions}} -->
                    <el-select 
                        size="mini"  
                        v-model="formSearchObj.empType" 
                        placeholder="请选择员工类型">
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
                    <el-select 
                        size="mini"
                        v-model="formSearchObj.empStatus" 
                        placeholder="请选择员工状态">
                        <el-option
                            v-for="(item,index) in empStatusOptions"
                            :key="item.Id"
                            :label="item.ItemName"
                            :value="item.ItemCode"
                        >   
                        </el-option>
                    </el-select>
                </el-form-item>     

                <!-- <div class="more" v-if="showMoreSearch && showMoreSearch.length">
                    <el-link icon="el-icon-edit" @click.native="handlerShowMoreSearch">{{isShowMoreConditions ? '展开更多': '收起更多'}}</el-link>
                    <div class="moreList" v-show="isShowMoreConditions">
                        <el-input 
                            v-for="(item,key) in showMoreSearch" 
                            :key="key" 
                            :value="item.label"
                        >
                        </el-input>
                    </div>
                </div> -->
            </el-form>      
        </el-card>       
      </div>

      <!-- <div>
        <save-footer @cacel="cacelSearch" @save="saveSearch"></save-footer>  
      </div> -->
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { PaGetDicDataSourceList } from '@/api/dic'
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
            showMoreSearch: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data(){
            return {
                labelPosition: 'right',
                empTypeOptions: [],  // 员工类型
                empStatusOptions: [], // 员工状态
                formSearchObj: {
                    empNo: '',   
                    empName:'',
                    Org: '',
                    Pos: '',
                    empType: '',
                    empStatus: ''
                },
                isShowMoreConditions: false, // 跟多搜索条件 list 的显示/隐藏
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
                PaGetDicDataSourceList(DicType_empType, DicCode_empType).then(res => {
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
                PaGetDicDataSourceList(DicType_empStatus, DicCode_empStatus).then(res => {
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
            // 点击展开跟多搜索条件
            handlerShowMoreSearch() {
                this.isShowMoreConditions = !this.isShowMoreConditions
            },
            cacelSearch() {

            },
            saveSearch(){
                debugger
                // 将 formSearchObj 传给父级 
                this.$emit("emitSearchResult", this.formSearchObj)
                // 将 formSearchObj 传给 兄弟组件 common-tableInfo
                this.$bus.$emit("emitSearchToolsResult", this.formSearchObj)
            }
        }
    }
</script>
