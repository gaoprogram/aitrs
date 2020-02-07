<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统设置-组件管理中的配置 弹框组件 【企业】
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

                <span>模块：</span>
                <el-select v-model="searchObj.moduleCode">
                <el-option 
                    v-for="(item,index) in moduleOptions"
                    :key="index"
                    :label="item.ModuleName"
                    :value="item.ModuleCode"
                >
                </el-option>
                </el-select>

                <span v-if="searchObj.moduleCode">
                <span>组件：</span>
                <el-select v-model="searchObj.componentCode">
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
                <el-button 
                  type="primary" 
                  size="mini"  
                  @click.native="handlerAdd"
                >新增</el-button>

                <!-- <el-button 
                  type="primary" 
                  size="mini"
                  @click.native="batchUseing"
                >批量启用</el-button>

                <el-button 
                  type="primary" 
                  size="mini"
                  @click.native="batchstopUseing"
                >批量停用</el-button>                 -->
            </div>
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
        >
        </el-table-column>

        <el-table-column
          label="类型"
          prop="RefType"
        >
            <template slot-scope="scope">
                <span v-if="scope.row.RefType == 1">
                    分组
                </span>
                <span v-if="scope.row.RefType == 2">
                    表
                </span>
                <span v-if="scope.row.RefType == 3">
                    按钮
                </span>
                <span v-if="scope.row.RefType == 4">
                    事件
                </span>
                <span v-if="scope.row.RefType == 5">
                    资源
                </span>                                                
            </template>
        </el-table-column>

        <el-table-column
          label="数据表码"
          prop="dataCode"
        >
          <template slot-scope="scope">
            <span>{{scope.row.dataCode}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="项码"
          prop="ComponentCode"
        >
          <template slot-scope="scope">
            <span>{{scope.row.ComponentCode}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="自定义名"
          prop="RefCode"
        >
          <template slot-scope="scope">
            <span>{{scope.row.RefCode}}</span>
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
            <el-button type="text" size="mini" @click.native="handlerEdit(scope.row)">编辑</el-button>
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
      
      <!--编辑/新增的弹框--start--->
      <div class="editGroupBox" v-if="showEditGroup">
        <el-dialog
          :title="dialogTit"
          width="30%"
          :visible.sync="showEditGroup"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-form 
            ref="formCom" 
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
            <el-form-item label="项码" prop="ComponentCode">
                <el-input 
                  style="width: 300px"
                  placeholder="请填写项码" 
                  v-model="formComRow.ComponentCode"
                ></el-input>
            </el-form-item>
            <el-form-item label="系统名" prop="ComponentName">
              <span>{{formComRow.ComponentName}}</span>
            </el-form-item>

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

          <saver-footer @save="save" @cancel="cancel"></saver-footer>
        </el-dialog>
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
    productModuleVerMgt,  // 获取模块下拉源list
    GetComComponList, // 获取组件下拉源list
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
      }

    },
    data(){
      return {
        loading: false, // loading 状态
        multipleSelection:[], 
        showEditGroup: false, // 控制编辑组的弹框显示/隐藏
        showFieldSetDialog: false, // 控制 字段设置的弹框显示/隐藏
        tableData: [],
        moduleOptions: [], // 模块下拉源
        comOptions: [], // 组件下拉源
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
          {
            itemCode: '4',
            itemName: '事件'
          },
          {
            itemCode: '5',
            itemName: '资源'
          }                                        
        ],
        searchObj: {
          moduleCode: '',
          menuCode: '',
          componentCode: '',

        },
        total: 0,
        queryObj: {
          pageSize: 10,
          pageNum: 1
        },
        formComRow: {
          "ComponentName":"",
          "RefComponentNames":"",
          "SysName":"",
          "CompanyCode":null,
          "Id":0,
          "ComponentCode":"",
          "RefType":"",
          "RefCode":"",
          "CreateDate":"/Date(1577808000000)/",
          "Description":"",
          "State":"1",
          "SysType": null,      
        },
        currentSetComRow:{}, //设置停用/启用的row对象
        dialogTit: '',  // 新增/编辑的标题
        formComRowRules: {
          RefType: [
            {required: true, trigger: ['blur','change'], message: "请选择类型"}
          ],
          ComponentCode: [
            {required: true, trigger: 'blur', message: "请输入项码"}
          ],
          Description:[
            {required: true, trigger: 'blur', message: '请输入描述'}
          ],

        }
      }
    },
    watch: {
        'searchObj.moduleCode':{
            handler(newValue, oldValue){
                if(newValue){
                    // 将moduleCode 存入缓存
                    localStorage.setItem("moduleCode_searchObj", newValue)
                    // 获取 组件下拉源
                    this._GetComComponList()
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
        this._getModuleOptions()
        localStorage.setItem("componentCode_searchObj",'')
        localStorage.setItem("moduleCode_searchObj",'')
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
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },     
        _getModuleOptions(pageSize, pageNum){
            productModuleVerMgt().then(res => {
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
        // 编辑组
        handleEdit(row, index){
            debugger
            this.dialogTit = '编辑'
            this.currentSetComRow = JSON.parse(JSON.stringify(row))
            this.showEditGroup = true
        },
        // 字段设置
        handleFieldSet(row, index){
            this.showFieldSetDialog  = true
        },
        //启用/停用
        _SetComComponentRefState(type){
            let text = type === 1 ? '启用': '停用'
            SetComComponentRefState(this.sysType, this.currentSetComRow.Id, type).then(res => {
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
        // 编辑
        handlerEdit(row){
          debugger
          this.currentSetComRow = JSON.parse(JSON.stringify(row))
          this.dialogTit = "编辑"
          this.showEditGroup = true
        },
        //启用
        handlerUsing(row){
            debugger
            this.currentSetComRow = JSON.parse(JSON.stringify(row))
            this.$confirm("确定要启用吗?","提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._SetComComponentRefState(1)
            }).catch(() => {
                this.$message.info("启用已取消")
            })
        },
        //停用
        handlerStopUsing(row){
            this.currentSetComRow = JSON.parse(JSON.stringify(row))              
            this.$confirm("确定要停用吗?","提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {              
                this._SetComComponentRefState(0)
            }).catch(() => {
                this.$message.info("停用已取消")
            })
        },
        _CompComponSet(){
            let componentCode = ''
            if(this.searchObj.componentCode){
              componentCode = this.searchObj.componentCode
              this.loading = true
              CompComponSet(componentCode, this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
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
                CompComponSet(componentCode, this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
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
        // 新增
        handlerAdd(){
            debugger
            this.dialogTit = '新增'
            Object.assign(this.formComRow, {
              "ComponentName":"",
              "RefComponentNames":"",
              "SysName":"",
              "CompanyCode":null,
              "Id":0,
              "ComponentCode":"",
              "RefType":"",
              "RefCode":"",
              // "CreateDate":"/Date(1577808000000)/",
              "Description":"",
              "State":"1",
              "SysType": 2   
            })
            this.showEditGroup = true
        },
        //批量启用
        batchUseing(){

        },
        // 批量停用
        batchstopUseing(){

        },
        //新增/编辑 的保存
        _SaveComComponentRef(){
          SaveComComponentRef(JSON.stringify(this.formComRow)).then(res => {
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
