<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统设置-组件管理中的配置 弹框组件 【企业】
-->

<style lang="stylus" ref="stylesheet/stylus" scoped>
.pageComManage
  padding 10px 20px
  box-sizing border-box
</style>
<template>
    <div class="pageComManage">
        <!-- obj: {{obj}} -->
      <div class="searchWrap u-f-jsb u-f-ac marginB10">
            <div class="">
                <!-- moduleOptions: {{moduleOptions}}
                ----
                comOptions: {{comOptions}} -->

                <span>模块：</span>
                <el-select 
                  clearable
                  v-model="searchObj.moduleCode"
                  @change="moduleChange"
                >
                  <el-option 
                    v-for="(item,index) in moduleOptions"
                    :key="index"
                    :label="item.ModuleName"
                    :value="item.ModuleCode"
                  >
                  </el-option>
                </el-select>

                <span v-if="searchObj.moduleCode" >
                  <span>组件：</span>
                  <el-select 
                    clearable
                    v-model="searchObj.componentCode"
                  >
                    <el-option
                        v-for="(item,index) in comOptions"
                        :key="index"
                        :label="item.ComponentName"
                        :value="item.ComponentCode"
                    >
                    </el-option>
                  </el-select>
                </span>

                <span>
                    <el-button 
                      :disabled="!searchObj.componentCode" 
                      type="primary" 
                      size="small" 
                      @click.native="handlerSearch">搜索</el-button>
                </span>
            </div>

            <div>
              <el-checkbox
                v-show="searchObj.ComponentCode"
                v-model="isCheckedFlag"
              >
                停用
              </el-checkbox>
              <!-- <el-button 
                type="primary" 
                size="mini"  
                @click.native="handlerAdd">新增</el-button> -->
            </div>
        </div>

      <div class="topBox marginB10" style="text-align: right">
        <!-- <el-button type="primary" size="mini">新增</el-button> -->
        <!-- <el-button type="primary" size="mini">新增表</el-button> -->
        <!-- <el-button type="primary" size="mini">批量启用</el-button>
        <el-button type="primary" size="mini">批量停用</el-button> -->
        <!-- <el-button type="primary" size="mini">批量编辑</el-button> -->
      </div>

    <div :class="['tableBox', tableData.length<=0? 'not_found':'']" v-loading="loading">
        <!-- tableData: {{tableData}} -->
        <el-table
          size="mini"
          :data="tableData"
          max-height="600"
          border
          empty-text=" " 
        >

        <el-table-column
          type="selection"
          width="50"
        >
        </el-table-column>

        <el-table-column
            label="组件"
            prop="ComponentName"
            sortable
        >
        </el-table-column>

        <el-table-column
          label="类型"
          prop="RefType"
          sortable
        >
            <template slot-scope="scope">
                <span v-if="scope.row.RefType === 1">
                  分组
                </span>
                <span v-if="scope.row.RefType === 2">
                  表
                </span>
                <span v-if="scope.row.RefType === 3">
                  按钮
                </span>
                <span v-if="scope.row.RefType === 4">
                  系统事件
                </span>
                <span v-if="scope.row.RefType === 5">
                  资源
                </span>    
                <span v-if="scope.row.RefType === 6">
                  组件
                </span>   
                <span v-if="scope.row.RefType === 7">
                  人事事件
                </span>                                                                               
            </template>
        </el-table-column>

        <!-- <el-table-column
          label="数据表码"
          prop="dataCode"
        >
          <template slot-scope="scope">
            <span>{{scope.row.dataCode}}</span>
          </template>
        </el-table-column> -->

        <el-table-column
          label="项码"
          prop="RefCode"
          sortable
        >
          <template slot-scope="scope">
            <span>{{scope.row.RefCode}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="自定义名"
          sortable
          prop="RefName"
        >
          <template slot-scope="scope">
            <span>{{scope.row.RefName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="引用组件"
          prop="RefComponentNames"
        >
          <template slot-scope="scope">
            <span>{{scope.row.RefComponentNames}}</span>
          </template>
        </el-table-column>             

        <el-table-column
          label="描述"
          prop="Description"
        >
          <template slot-scope="scope">
            <span>{{scope.row.Description}}</span>
          </template>
        </el-table-column>         


        <el-table-column
          label="状态"
          sortable
          prop="State"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.State ==1">启用</span>
            <span v-if="scope.row.State ==0">停用</span>
          </template>
        </el-table-column>            


        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="mini" v-if="scope.row.State===0" @click.native="handlerUsing(scope.row)">启用</el-button>
            <el-button type="text" size="mini" v-if="scope.row.State===1" @click.native="handlerStopUsing(scope.row)">停用</el-button>
            <!-- <el-button type="text" size="mini" @click.native="handleFieldSet(scope.row, scope.$index)">字段设置</el-button> -->
            <!-- <el-button type="text" size="mini" @click.native="handleEdit(scope.row, scope.$index)">编辑</el-button> -->
          </template>
        </el-table-column>     
      </el-table>
      <!--分页部分-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryObj.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>      
    </div>
      
      <!--编辑组的弹框--start--->
      <div class="editGroupBox" v-if="showEditGroup">
        <el-dialog
          :title="dialogTit"
          width="30%"
          :visible.sync="showEditGroup"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-form ref="form" :model="currentSetComRow" label-width="100px">
            <el-form-item label="类型" prop="RefType">
                <el-input placeholder="请填写类型" v-model="currentSetComRow.RefType"></el-input>
            </el-form-item>
            <el-form-item label="项码" prop="ComponentCode">
                <el-input placeholder="请填写项码" v-model="currentSetComRow.ComponentCode"></el-input>
            </el-form-item>
            <el-form-item label="系统名" prop="ComponentName">
              <span v-if="isEditOrAdd == 1">
                系统生成
              </span>
              <span v-if="isEditOrAdd == 2">
                {{currentSetComRow.ComponentName}}
              </span>              
            </el-form-item>

            <el-form-item label="描述" prop="Description">
                <el-input
                    v-model="currentSetComRow.Description"
                    type="textarea"
                    autosize
                    placeholder="请输入描述内容"
                >
                </el-input>
            </el-form-item>

            <el-form-item label="状态" prop="State">
              <el-switch 
                active-value="1"
                inactive-value="0"
                v-model="currentSetComRow.State"
              ></el-switch>
            </el-form-item>
          </el-form>

          <saver-footer @save="save" @cancel="cancel"></saver-footer>
        </el-dialog>
      </div>
      <!---编辑组的弹框----end-->


      <!----字段设置弹框-start-->
      <div class="fieldSetWrap" v-if="showFieldSetDialog">
        <el-dialog
          title="字段设置"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showFieldSetDialog"
        >
          字段设置弹框内容
        </el-dialog>
      </div>
      <!----字段设置弹框---end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import SaverFooter from '@/base/Save-footer/Save-footer'
  import { 
      REQ_OK
   }from '@/api/config'
   import {
    GetModuleList,  // 获取模块下拉源list
    GetComComponList, // 获取组件下拉源list
    CompComponSet,  // 组件配置页面获取 table list
    SetComComponentRefState,
    saveSysComponentRef
   } from '@/api/systemManage'
  export default {
    components: {
        SaverFooter
    },
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data(){
      return {
        loading: false, // loading 状态
        showEditGroup: false, // 控制编辑组的弹框显示/隐藏
        isEditOrAdd: '', // 1 新增  2 编辑
        showFieldSetDialog: false, // 控制 字段设置的弹框显示/隐藏
        tableData: [],
        moduleOptions: [], // 模块下拉源
        comOptions: [], // 组件下拉源
        isCheckedFlag: false,
        searchObj: {
            moduleCode: '',
            menuCode: '',
            componentCode: '',
            state: 1
        },
        total: 0,
        queryObj: {
            pageSize: 10,
            pageNum: 1
        },
        currentSetComRow:{}, //设置停用/启用的row对象
        dialogTit: '', 
      }
    },
    watch: {
        isCheckedFlag:{
          handler(newValue, oldValue){
            if(newValue){
              this.searchObj.state = 0
            }else {
              this.searchObj.state = 1
            }
            this._getComTables()
          }
        },
        'searchObj.moduleCode':{
            handler(newValue, oldValue){
                if(newValue){
                    // 获取 组件下拉源
                    this._GetComComponList()
                }
            }
        }
    },
    created(){
        //获取 模块下拉源
        this._getModuleOptions()
    },
    methods: {
        _getComTables () {
            this._CompComponSet()
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getComTables()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._getComTables()
        },        
        _getModuleOptions(pageSize, pageNum){
            GetModuleList().then(res => {
                if(res && res.data.State === REQ_OK){
                    this.moduleOptions = res.data.Data
                }else {
                    this.$message.error(`获取模块下拉源失败,${res.data.Error}`)
                }
            })
        },
        _GetComComponList(moduleCode, menuCode){
            GetComComponList(this.searchObj.moduleCode).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.comOptions = res.data.Data
                }else {
                    this.$message.error(`获取组件下拉源失败,${res.data.Error}`)
                }
            })
        },
        // 编辑
        handleEdit(row, index){
            debugger
            this.isEditOrAdd = 2            
            this.dialogTit = '编辑'
            this.currentSetComRow = JSON.parse(JSON.stringify(row))
            this.showEditGroup = true
        },
        // 字段设置
        handleFieldSet(row, index){
            this.showFieldSetDialog  = true
        },
        //启用/停用
        _SetComComponentRefState(type, data, sysType){
          this.loading = true
            let text = type === 1 ? '启用': '停用'
            SetComComponentRefState(JSON.stringify(data), type, sysType).then(res => {
              this.loading = false
              if(res && res.data.State === REQ_OK){
                  this.$message.success(`${text}成功`)
                  this._getComTables()
              }else {
                this.$message.error(`${text}失败,${res.data.Error}`)
              }
            }).catch(() => {
              this.$message.warning(`${text}失败`)
            })
        },
        //启用
        handlerUsing(row){
            debugger
            this.currentSetComRow = JSON.parse(JSON.stringify(row))
            this.$confirm(`确定要启用"${row.ComponentName}"吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._SetComComponentRefState(1, [this.currentSetComRow], this.currentSetComRow.SysType)
            }).catch(() => {
                this.$message.info("启用已取消")
            })
        },
        //停用
        handlerStopUsing(row){
            this.currentSetComRow = JSON.parse(JSON.stringify(row))              
            this.$confirm(`确定要停用"${row.ComponentName}"吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {              
                this._SetComComponentRefState(0, [this.currentSetComRow], this.currentSetComRow.SysType)
            }).catch(() => {
                this.$message.info("停用已取消")
            })
        },
        _CompComponSet(){
            this.loading = true
            CompComponSet(this.searchObj.componentCode, this.queryObj.pageSize, this.queryObj.pageNum, this.searchObj.state).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.tableData = res.data.Data
                    this.total = res.data.Total
                }else {
                    this.$message.error(`获取组件配置list数据失败,${res.data.Error}`)
                }
            }).catch(() => {
                // this.$message.warning("获取组件配置list 数据失败")
            })
        },
        // 
        moduleChange(){
          this.searchObj.componentCode = ''
          this.comOptions = []
        },
        //搜索
        handlerSearch(){
            this._CompComponSet()
        },
        // 新增
        handlerAdd(){
            debugger
            this.isEditOrAdd = 1
            this.dialogTit = '新增'
            this.currentSetComRow = {
              "ComponentName":"",
              "RefComponentNames":"",
              "Id": 0 ,
              "ComponentCode":"",
              "RefType":"",
              "RefCode":"",
              "CreateDate":"",
              "Description":"",
              "State": "1"              
            }
            this.showEditGroup = true
        },
        _saveSysComponentRef(){
          saveSysComponentRef(JSON.stringify(this.currentSetComRow)).then(res => {
              if(res && res.data.State === REQ_OK){
                  this.$message.success('保存成功')
                  this.showEditGroup = false
                  this._getComTables()
              }else {
                  this.$message.error(`保存失败,${res.data.Error}`)
              }
          })
        },
        // 新增/编辑 保存
        save(){
          // 必填项验证后 

          this._saveSysComponentRef()   
        },
        // 新增/编辑 取消
        cancel(){
          this.showEditGroup = false
        }
    },
  }
</script>
