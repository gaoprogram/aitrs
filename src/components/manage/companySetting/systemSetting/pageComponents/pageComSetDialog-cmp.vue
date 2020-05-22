<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统设置-页面组件管理中的配置 弹框组件 【企业】
-->

<style lang="stylus" ref="stylesheet/stylus" scoped>
.displayGroup
  padding 10px 20px
  box-sizing border-box
</style>
<template>
    <div class="displayGroup">
        <!-- obj: {{obj}} -->
      <div class="searchWrap u-f-jsb u-f-ac marginB10">
            <div class="">
                <!-- moduleOptions: {{moduleOptions}}
                ----
                comOptions: {{comOptions}} -->
                <!-- <span>模块：</span>
                <el-select v-model="searchObj.moduleCode">
                  <el-option 
                    v-for="(item,index) in moduleOptions"
                    :key="index"
                    :label="item.ModuleName"
                    :value="item.ModuleCode"
                  >
                  </el-option>
                </el-select> -->

                <!-- comOptions： {{comOptions}} -->
                <!-- <span v-if="searchObj.moduleCode">
                  <span>页面：</span>
                  <el-select v-model="searchObj.componentCode">
                      <el-option
                          v-for="(item,index) in comOptions"
                          :key="index"
                          :label="item.Title"
                          :value="item.MenuCode"
                      >
                      </el-option>
                  </el-select>
                </span> -->

                <span>
                  <!-- pageOptions: {{pageOptions}} -->
                  <!-- --
                  modulePage： {{modulePage}} -->
                  <span>页面：</span>
                  <el-cascader
                    expand-trigger="hover"
                    :options="pageOptions"
                    filterable
                    v-model="modulePage"
                    @change="handleChange">
                  </el-cascader>               
                </span>

                <span>
                  <!-- comOptions: {{comOptions}} -->
                  <span>组件: </span>
                  <el-select 
                    filterable
                    :disabled="!modulePage.length"
                    v-model="searchObj.componentCode">
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
                      @click.native="handlerSearch"
                    >搜索</el-button>
                      <el-button
                        :disabled="!searchObj.componentCode"
                        type="primary"
                        size="small"
                        @click.native="handlerClear"
                      >重置</el-button>
                </span>
            </div>
        </div>

        <div class="marginB10 clearfix">
            <el-checkbox
              v-show="searchObj.componentCode"                
              v-model="isCheckedFlag"
            >
              停用
            </el-checkbox>

            <el-button 
              type="primary" 
              size="mini"
              :disabled="!multipleSelection.length"
              v-if="searchObj.componentCode && searchObj.state == 0"
              style="float: right"
              @click.native="batchUseing"
            >批量启用</el-button>

            <el-button 
              type="primary" 
              style="float: right"
              :disabled="!multipleSelection.length"
              v-if="searchObj.componentCode && searchObj.state == 1"
              size="mini"
              @click.native="batchstopUseing"
            >批量停用</el-button>   

            <el-button 
              style="float:right;margin-right:10px"
              v-if="searchObj.componentCode"
              type="primary" 
              size="mini"  
              @click.native="handlerAdd"
            >新增</el-button>                         
        </div>        

      <!-- <div class="topBox marginB10" style="text-align: right">
        <el-button type="primary" size="mini">新增分组</el-button>
        <el-button type="primary" size="mini">新增表</el-button>
        <el-button type="primary" size="mini">启用</el-button>
        <el-button type="primary" size="mini">停用</el-button>
        <el-button type="primary" size="mini">批量编辑</el-button>
      </div> -->

    <div :class="['tableBox', tableData.length<=0? 'not_found':'']" v-loading="loading">
        <!-- tableData: {{tableData}} -->
        <el-table
          :data="tableData"
          border
          empty-text=" "
          max-height="550" 
          @selection-change="handleSelectionChange"
        >

        <el-table-column
          type="selection"
          width="50"
        >
        </el-table-column>

        <el-table-column
            label="组件"
            prop="ComponentName"
            show-overflow-tooltip
            sortable
        >
        </el-table-column>

        <el-table-column
          label="类型"
          sortable
          prop="RefType"
          show-overflow-tooltip
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
          sortable
          prop="RefCode"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.RefCode}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="自定义名"
          sortable
          show-overflow-tooltip
          prop="RefName"
        >
          <template slot-scope="scope">
            <span>{{scope.row.RefName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="系统名"
          prop="SysName"
          show-overflow-tooltip
          sortable
        >
          <template slot-scope="scope">
            <span>{{scope.row.SysName}}</span>
          </template>
        </el-table-column>        

        <!-- <el-table-column
          label="引用组件"
          prop="RefComponentNames"
        >
          <template slot-scope="scope">
            <span>{{scope.row.RefComponentNames}}</span>
          </template>
        </el-table-column>              -->

        <el-table-column
          label="系统配置"
          prop="SysType"
          sortable
        >
          <template slot-scope="scope">
            <span v-if="scope.row.SysType ==1 " style="color: #409EFF">是</span>
            <span v-if="scope.row.SysType ==2 " style="color: #67C23A">否</span>
          </template>
        </el-table-column> 

        <el-table-column
          label="描述"
          prop="Description"
          show-overflow-tooltip
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
            <span v-if="scope.row.State == 1">启用</span>
            <span v-if="scope.row.State == 0">停用</span>
          </template>
        </el-table-column>            


        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <!-- scope.row.SysType: {{scope.row.SysType}} -->
            <el-button type="text" size="mini" v-if="scope.row.State==0" @click.native="handlerUsing(scope.row)">启用</el-button>
            <el-button type="text" size="mini" v-if="scope.row.State==1" @click.native="handlerStopUsing(scope.row)">停用</el-button>
            <!-- <el-button type="text" size="mini" @click.native="handleFieldSet(scope.row, scope.$index)">字段设置</el-button> -->
            <el-button 
              v-if="scope.row.SysType == 2"
              type="text" 
              size="mini" 
              @click.native="handlerEdit(scope.row, scope.$index)">编辑</el-button>
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
      
      <!--编辑/新增的弹框--start--->
      <div class="editGroupBox" v-if="showEditGroup">
        <!-- formComRow: {{formComRow}} -->
        <!-- <el-dialog
          :title="dialogTit"
          width="30%"
          :visible.sync="showEditGroup"
          append-to-body
          :close-on-click-modal="false"
        > -->
        <atris-drawer-cmp
          v-if="showEditGroup"
          :tit="dialogTit"    
          :dialog.sync="showEditGroup"        
          @emitClickSureBtn="save"
        >           
          <el-form 
            ref="formCom" 
            slot="container-slot"
            :model="formComRow" 
            label-width="100px"
            :rules="formComRowRules"
          >
            <el-form-item label="类型" prop="RefType">
                <!-- <el-input 
                  placeholder="请填写类型" 
                  v-model="formComRow.RefType"
                ></el-input> -->
                <el-select 
                  style="width: 300px"
                  :disabled="isEdit==1"
                  v-model="formComRow.RefType">
                  <el-option
                    v-for="(item, key) in refTypeOption"
                    :key="key"
                    :value="item.itemCode"
                    :label="item.itemName"
                  >
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
              v-if="formComRow.RefType == 3"
              label="是否系统已有项" 
              prop="IsExist" 
              label-width="120px">
              <el-switch
                :disabled="isEdit==1"              
                v-model="formComRow.IsExist"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="名称" prop="RefName">
              <!-- formComRow.RefName: {{formComRow.RefName}} -->
              <el-cascader
                ref="cascader_formComRow"
                v-if="!isInput && formComRow.IsExist"
                :disabled="isEdit==1"
                clearable
                filterable
                style="width: 300px"
                v-model="formComRow.RefName"
                :options="refCodeOption"
                :props="{
                  label:'Name',
                  value:'Name',
                  checkStrictly: checkStrictly,
                  children: 'Children'
                }"
                @change="handleRefNameChange"
              ></el-cascader>    
              <el-input
                v-else
                clearable
                style="width: 300px"
                v-model="formComRow.RefName"
              ></el-input>            
            </el-form-item>
            <el-form-item label="项码" prop="RefCode">
              <!-- formComRow.RefType: {{formComRow.RefType}} -->
              <span v-if="isEdit == 2">
                <el-button 
                  type="text" 
                  size="small">
                  {{formComRow.RefCode || '系统自动生成'}}
                </el-button>
                <!-- <el-input 
                  :disabled="true"
                  style="width: 300px"
                  placeholder="请输入项码"
                  v-if="formComRow.RefType == 3"                  
                  clearable
                  v-model="formComRow.RefCode">
                </el-input>                 -->
              </span>
              <span v-if="isEdit == 1">
                <el-input 
                  :disabled="true"
                  style="width: 300px"
                  v-model="formComRow.RefCode"
                  placeholder="请输入项码">
                </el-input>    
              </span>        
            </el-form-item>
            <!-- <el-form-item label="系统名" prop="SysName">
              <span>{{formComRow.SysName}}</span>
            </el-form-item> -->

            <el-form-item label="描述" prop="Description">
                <el-input
                    style="width: 300px"
                    v-model="formComRow.Description"
                    type="textarea"
                    placeholder="请输入描述内容"
                >
                </el-input>
            </el-form-item>

            <el-form-item label="状态" prop="State">
              <el-switch 
                v-model="formComRow.State"
                active-value="1"  
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-form>

          <!-- <saver-footer @save="save" @cancel="cancel"></saver-footer> -->
        <!-- </el-dialog> -->
        </atris-drawer-cmp>
      </div>
      <!---编辑/新增的弹框----end-->


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
    // GetModuleList,  // 获取模块下拉源list
    // GetSysMenuList, // 获取页面下拉源list
    GetDataByRefType,  // 获取项码下拉源
    GetComComponList, // 获取 组件下拉源list
    CompComponSet,  // 组件配置页面获取 table list
    SetComComponentRefState,  // 启用/停用
    SaveComComponentRef  // 编辑/新增 保存
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
      },
      sysType: {
        type: [String, Number],
        default: ''
      },
      pageOptions: {
        type: Array,
        default: () => {
          return []
        }
      },
    },
    data(){
      let validRefCode = (rule, value, callback) => {
        if(this.formComRow.RefType != 3){
          // 非按钮
          callback()
        }else {
          // 按钮
          if(!this.formComRow.RefCode){
            callback(new Error('项码为空'))
          }else {
            callback()
          }
        }
      }
      return {
        loading: false, // loading 状态
        multipleSelection:[], 
        showEditGroup: false, // 控制编辑组的弹框显示/隐藏
        showFieldSetDialog: false, // 控制 字段设置的弹框显示/隐藏
        tableData: [],
        isEdit: '', // 1 编辑 2新增
        modulePage: [], 
        moduleOptions: [], // 模块/页面 二级下拉源
        comOptions: [], // 组件下拉源
        checkStrictly: true, //级联选择器 是否可以选择任意一级 false 不可任意选 true 任意选
        refTypeOption: [
          {
            itemCode: '1',
            itemName: '分组'
          },
          {
            itemCode: '2',
            itemName: '表'
          },
          {
            itemCode: '3',
            itemName: '按钮'
          },
          // {
          //   itemCode: '4',
          //   itemName: '事件'
          // },
          // {
          //   itemCode: '5',
          //   itemName: '资源'
          // },  
          {
            itemCode: '6',
            itemName: '组件'
          },
          {
            itemCode: '7',
            itemName: '人事事件'
          }                                                  
        ],
        refCodeOption: [], // 项码下拉源
        isInput: false, // 是否显示项码下拉选项框 还是 直接显示input框
        searchObj: {
          moduleCode: '',
          menuCode: '',
          componentCode: '',
          state: 1
        },
        total: 0,
        isCheckedFlag: false, // false 启用 true 停用
        queryObj: {
          pageSize: 10,
          pageNum: 1
        },
        formComRow: {
          "ComponentName":"",
          "RefComponentNames":"",
          "SysName":"",
          "CompanyCode": this.obj.CompanyCode,
          "Id":0,
          "ComponentCode":"",
          "RefName": "",
          "RefType":"",
          "RefCode":"",
          "IsExist": true,
          "CreateDate":"/Date(1577808000000)/",
          "Description":"",
          "State":"1",
          "SysType": null,      
        },
        currentSetComRow:{}, //设置停用/启用/编辑的row对象
        dialogTit: '',  // 新增/编辑的标题
        formComRowRules: {
          RefType: [
            {required: true, trigger: ['blur','change'], message: "类型为空"}
          ],
          RefName: [
            {required: true, trigger: ['blur','change'], message: "名称为空"}
          ],          
          // RefCode: [
          //   {required: true, validator:validRefCode, trigger: ['change','blur']}
          // ],
          // Description:[
          //   {required: true, trigger: 'blur', message: '请输入描述'}
          // ]
        }
      }
    },
    computed: {
      pageCode(){
        let length = this.modulePage.length
        let pageCode = this.modulePage[length-1] || ''
        return pageCode        
      }
    },
    watch: {
        isCheckedFlag: {
          handler(newValue, oldValue){
            debugger
            if(newValue){
              this.searchObj.state = 0
            }else {
              this.searchObj.state = 1
            }
            this._getComTables()
          }
        },
        // 类型变动
        'formComRow.RefType': {
          handler(newValue, oldValue){
            debugger
            if(newValue == 1){
              // 分组
              this.checkStrictly = false
              // this.formComRow.Description = ''
              this._GetDataByRefType(1)
            }else if(newValue == 2){
              // 表
              this.checkStrictly = true
              // this.formComRow.Description = ''
              this._GetDataByRefType(2)
            }else if(newValue == 3){
              debugger
              // 按钮
              this.checkStrictly = true
              // this.formComRow.Description = ''
              this._GetDataByRefType(3)
              if(this.isEdit == 1){
                // 按钮类型的 编辑 
                if(this.formComRow.IsExist){
                  // 系统已有项
                  this.isInput = true
                  // this._GetDataByRefType(3)
                }else {
                  // 非系统已有项
                  this.isInput = true
                  // this._GetDataByRefType(3)
                }
              }else if(this.isEdit == 2){
                // 新增 按钮
                if(this.formComRow.IsExist){
                  // 系统已有项
                  this.isInput = false
                  this._GetDataByRefType(3)
                }else {
                  // 非系统已有项
                  this.isInput = true
                }                
                if(this.formComRow.RefCode) this.formComRow.RefCode = '系统自动生成'
                // this.formComRow.RefName = ''
              }
            }else if(newValue == 4){
              // 事件
              this.checkStrictly = true
              // this.formComRow.Description = ''
              this._GetDataByRefType(4)
            }else if(newValue == 5){
              // 资源
              this.checkStrictly = true
              // this.formComRow.Description = ''
              this._GetDataByRefType(5)
            }else if(newValue == 6){
              // 组件
              this.checkStrictly = true
              // this.formComRow.Description = ''
              this._GetDataByRefType(6)
            }else if(newValue == 7){
              // 人事事件
              this.checkStrictly = true
              // this.formComRow.Description = ''
              this._GetDataByRefType(7)
            }
            if(this.isEdit == 2){
              this.formComRow.RefName = ''
            }            
          },
          immediate: true
        },
        // 是否系统已有项 变动
        'formComRow.IsExist': {
          handler(newValue, oldValue){
            if(!newValue){
              this.formComRow.RefCode = '系统自动生成'
            }
          }
        },
        'searchObj.moduleCode':{
            handler(newValue, oldValue){
                if(newValue){
                    // 将moduleCode 存入缓存
                    localStorage.setItem("moduleCode_searchObj", newValue)
                    // 获取 页面下拉源
                    this._GetSysMenuList()
                }else {
                  this.searchObj.componentCode = ''
                  localStorage.setItem("componentCode_searchObj", newValue)
                  this.tableData = []
                }
            }
        },
        'searchObj.componentCode':{
          handler(newValue, oldValue){
            if(newValue){
              // 将componentCode 存入缓存
              localStorage.setItem("componentCode_searchObj", newValue)
            }
          }
        }
    },
    created(){
        //获取 模块下拉源
        // this._getModuleOptions()
        localStorage.setItem("componentCode_searchObj",'')
        localStorage.setItem("moduleCode_searchObj",'')
    },
    methods: {
        _getComTables () {
            this._CompComponSet()
        },
        changeData(data){
          if(data && data.length){
            data.forEach((item, key) => {
              if(!item.Children.length){
                delete item.Children
              }else {
                this.changeData(item.Children)
              }
            })
          }
        },
        // 获取 项码下拉源
        _GetDataByRefType(refType){
          GetDataByRefType(refType).then(res => {
            if(res && res.data.State === REQ_OK){
              if(res.data.Data.length){
                this.isInput = false
                this.refCodeOption = res.data.Data
                // 处理refCodeOption
                this.changeData(this.refCodeOption)
              }else {
                this.isInput = true
              }
            }else {
              this.$message.warning(`获取项码下拉数据源失败,${res.data.Error}`)
            }
          })
        },
        handleRefNameChange(a,b){
          debugger
          this.formComRow.Description = ''
          let nodesObj = this.$refs['cascader_formComRow'].getCheckedNodes()
          console.log(nodesObj)
          this.formComRow.Description = nodesObj[0].data.Description
          this.formComRow.RefCode = nodesObj[0].data.Code
        },
        handleItemChange(a,b){
          debugger
        },
        // 页面下拉选择变化
        handleChange(value) {
          console.log(value)
          this.searchObj.componentCode = ''
          this._GetComComponList()
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
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },  
        // 获取组件下拉框数据源
        _GetComComponList(data){
          let length = this.modulePage.length
          let pageCode = this.modulePage[length-1] || ''
          GetComComponList(this.modulePage[0], '', pageCode).then(res => {
            if(res && res.data.State === REQ_OK){
              this.comOptions = res.data.Data
            }else {
              this.$message.warning(`获取组件下拉数据源失败,${res.data.Error}`)
            }
          })
        },
        // 获取模块下拉源数据   
        _getModuleOptions(pageSize, pageNum){
            GetModuleList().then(res => {
                if(res && res.data.State === REQ_OK){
                    this.moduleOptions = res.data.Data
                }else {
                    this.$message.error(`获取模块下拉源失败,${res.data.Error}`)
                }
            })
        },
        // 获取页面下拉源数据
        _GetSysMenuList(moduleCode, menuCode){
            GetSysMenuList(this.searchObj.moduleCode).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.comOptions = res.data.Data
                }else {
                    this.$message.error(`获取页面下拉源失败,${res.data.Error}`)
                }
            })
        },
        // 编辑
        handlerEdit(row, index){
          debugger
          this.isEdit = 1
          this.dialogTit = '编辑'
          if(row.State == 1){
            row.State = "1"
          }else {
            row.State = "0"
          }            
          this.formComRow = JSON.parse(JSON.stringify(row))
          if(this.formComRow.RefType == 3){
            // 按钮
            this.checkStrictly = true
            this._GetDataByRefType(3)            
          }
          this.showEditGroup = true
        },
        // 字段设置
        handleFieldSet(row, index){
            this.showFieldSetDialog  = true
        },
        //启用/停用
        _SetComComponentRefState(type, data, sysType, pageCode){
            let text = type === 1 ? '启用': '停用'
            SetComComponentRefState(sysType, JSON.stringify(data), type, this.pageCode).then(res => {
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
            let name = this.currentSetComRow.RefName? this.currentSetComRow.RefName : this.currentSetComRow.SysName 
            this.$confirm(`确定要启用"${name}"吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._SetComComponentRefState(1, [this.currentSetComRow], this.currentSetComRow.SysType, this.pageCode)
            }).catch(() => {
                this.$message.info("启用已取消")
            })
        },
        //停用
        handlerStopUsing(row){
          debugger
          this.currentSetComRow = JSON.parse(JSON.stringify(row))              
          let name = this.currentSetComRow.RefName? this.currentSetComRow.RefName : this.currentSetComRow.SysName 
          this.$confirm(`确定要停用"${name}"吗?`,"提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {              
            this._SetComComponentRefState(0, [this.currentSetComRow], this.currentSetComRow.SysType, this.pageCode)
          }).catch(() => {
            this.$message.info("停用已取消")
          })
        },
        _CompComponSet(){
            let componentCode = ''
            if(this.searchObj.componentCode){
              componentCode = this.searchObj.componentCode
              this.loading = true
              CompComponSet(componentCode, this.queryObj.pageSize, this.queryObj.pageNum, this.searchObj.state, this.pageCode).then(res => {
                  this.loading = false
                  if(res && res.data.State === REQ_OK){
                      this.tableData = res.data.Data
                      this.total = res.data.Total
                  }else {
                      this.$message.error(`获取组件配置list数据失败,${res.data.Error}`)
                  }
              }).catch(() => {
                  this.$message.warning("获取组件配置list 数据失败")
              })              
            }else {
              // 取缓存中的值
              componentCode = localStorage.getItem("componentCode_searchObj")
              if(componentCode){
                this.loading = true
                CompComponSet(componentCode, this.queryObj.pageSize, this.queryObj.pageNum, this.searchObj.state, this.pageCode).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data
                        this.total = res.data.Total
                    }else {
                        this.$message.error(`获取组件配置list数据失败,${res.data.Error}`)
                    }
                }).catch(() => {
                    this.$message.warning("获取组件配置list 数据失败")
                })                  
              }else {

              }
            }
        },
        //搜索
        handlerSearch(){
          this._CompComponSet()
        },
        // 重置
        handlerClear(){
          // this.searchObj.moduleCode = ''
          this.modulePage = []
        },
        // 新增
        handlerAdd(){
            debugger
            this.isEdit = 2
            this.dialogTit = '新增'
            let componentCode = this.searchObj.componentCode
            this.formComRow = {
              "ComponentName":"",
              "RefComponentNames":"",
              "SysName":"系统自动生成",
              "Id":0,
              "ComponentCode": componentCode,
              "RefName":"",
              "RefType":"",
              "IsExist": true,
              "RefCode":"",
              // "CreateDate":"/Date(1577808000000)/",
              "Description":"",
              "State":"1",
              "SysType": 2   
            }
            this.showEditGroup = true
        },
        //批量启用
        batchUseing(){
          let str = '', length = this.multipleSelection.length
          if(length){
            this.multipleSelection.forEach((item, key) => {
              if(key != (length -1)){
                if(item.RefName){
                  str += item.RefName + ','
                }else {
                  if(item.SysName){
                    str += item.SysName + ','
                  }else {
                    str += '' + ','
                  }
                }
              }else {
                if(item.RefName){
                  str += item.RefName
                }else {
                  if(item.SysName){
                    str += item.SysName
                  }else {
                    str += ''
                  }
                }                
              }
            })
          }
          this.$confirm(`确认要启用"${str}"吗？`, '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          }).then(() => {
            this._SetComComponentRefState(1, this.multipleSelection, this.multipleSelection[0].SysType, this.pageCode)
          }).catch(() => {
            this.$message.info("批量启用已取消")
          })
        },
        // 批量停用
        batchstopUseing(){
          let str = '', length = this.multipleSelection.length
          if(length){
            this.multipleSelection.forEach((item, key) => {
              if(key != (length -1)){
                if(item.RefName){
                  str += item.RefName + ','
                }else {
                  if(item.SysName){
                    str += item.SysName + ','
                  }else {
                    str += '' + ','
                  }
                }
              }else {
                if(item.RefName){
                  str += item.RefName
                }else {
                  if(item.SysName){
                    str += item.SysName
                  }else {
                    str += ''
                  }
                }                
              }              
            })
          }
          this.$confirm(`确定要停用"${str}"吗?`, "提示",{
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            debugger
            this._SetComComponentRefState(0, this.multipleSelection, this.multipleSelection[0].SysType, this.pageCode)
          }).catch(() => {
            this.$message.info("批量停用已取消")
          })  
        },
        //新增/编辑 的保存
        _SaveComComponentRef(){
          let length = this.formComRow.RefName.length
          if(length && this.$isArray(this.formComRow.RefName)){
            this.formComRow.RefName = this.formComRow.RefName[length-1]
          }
          SaveComComponentRef(JSON.stringify(this.formComRow), this.pageCode).then(res => {
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
          this.$refs.formCom.validate(valid => {
            if(valid){
              this._SaveComComponentRef()   
            }else {

            }
          })
        },
        // 新增/编辑 取消
        cancel(){
          this.showEditGroup = false
        }
    },
  }
</script>
