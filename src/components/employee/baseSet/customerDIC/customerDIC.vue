<!--
  User: gaol
  Date: 2019/10/28
  功能：基础设置- 自定义字典表
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.customerDIC 
  padding 0 20px 
  box-sizing border-box
  .tableBox
    width 100%
</style>

<template>
  <div class="customerDIC">
    <!-- obj: {{obj}} -->
    <!-- dicList: {{dicList}} -->
    <!-- ------ -->
    <!-- currentRowObj： {{currentRowObj}} -->
    <!-- --------- -->    
    <!--<el-tabs v-model="activeTabDicCode" @tab-click="handleClickTab">
      <el-tab-pane 
        v-for="(item, key) in dicList" 
        :label="item.DicName"
        :key="item.DicCode"
        :name="item.DicCode">
      </el-tab-pane>
    </el-tabs> -->

    <div  class="topBox marginB10" style="text-align:right">
      <el-button type="primary" size="mini" @click.native="clickAddDic">新增</el-button>
    </div>
    
    <div class="tableBox" v-loading = 'loading'>
      <!-- tableData： {{tableData}} -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          v-if="currentParentDicCode"
          prop="ParentDicName"
          label="父级字典"
          sortable
        >
        </el-table-column>

        <el-table-column
          v-if="currentParentDicCode"
          prop="ParentItemName"
          label="父级字段名"
          sortable
        >
        </el-table-column>                
        <el-table-column
          prop="ItemName"
          label="字段名"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="State"
          label="状态"
          sortable
        >
          <template slot-scope="scope">
            <span>
              {{scope.row.State === 1 ? '启用': '停用'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template
            slot-scope="scope"
          >
            <!-- scope.row.State： {{scope.row.State}}
            --
            scope.row.IsConfig： {{scope.row.IsConfig}} -->
            <el-button 
              v-if="scope.row.IsConfig === 0" 
              type="text" 
              size="mini" 
              @click.native="handleSet(scope.row)"
            >设置</el-button>
            <el-button 
              v-if="scope.row.IsConfig === 0 && scope.row.State === 1" 
              type="text" 
              size="mini" 
              @click.native="handleStopUsing(scope.row)"
            >停用</el-button>
            <el-button v-if="scope.row.IsConfig === 0 && scope.row.State === 0" type="text" size="mini" @click.native="handleStartUsing(scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页部分-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryObj.pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryObj.total">
      </el-pagination>
    </div>

    <!--设置dailog--start-->
    <div class="setDicBox" v-if="setDicShow">
      <el-dialog
        title="设置字典表"
        width="30%"
        :visible.sync="setDicShow"
        append-to-body
      > 
        <!-- currentRowObj： {{currentRowObj}} -->
        <!-- <custom-table-cmp :customSetObj="currentRowObj" @cancel="cancel"></custom-table-cmp> -->
        <el-form  ref="currentRowObj" :model="currentRowObj" :form="currentRowObj" :rules="addDicFormRules" label-width="80px">
          <el-form-item
            v-if="currentParentDicCode"
            label="父级字段名"
            prop="ParentItemName"
          >
            <el-select v-model="currentRowObj.ParentItemName">
              <el-option 
                v-for="(item,key) in parentNameOptions"
                :key="key"
                :value="Item.ItemCode"
                :label="Item.ItemName"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="字段名" prop="ItemName">
            <el-input style="width:250px" clearable placeholder="请输入" v-model="currentRowObj.ItemName"></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="State">
            <el-switch v-model="currentRowObj.State"></el-switch>
          </el-form-item>

          <!--保存区-->
          <save-footer @save="saveSetDic" @cancel="cancelSetDic"></save-footer>
        </el-form>        
      </el-dialog>
    </div>
    <!---设置dailog--end-->

    <!--新增dailog--start-->
    <div class="setDicBox" v-if="showAddDialog">
      <el-dialog
        title="新增字典表"
        width="30%"
        :visible.sync="showAddDialog"
        append-to-body
      > 
        <!-- currentAddRowObj： {{currentAddRowObj}} -->
        <el-form ref="currentAddRowObj" :model="currentAddRowObj"  :form="currentAddRowObj" :rules="addDicFormRules" label-width="80px">
          <el-form-item
            v-if="currentParentDicCode"
            label="父级字段名"
            prop="ParentItemName"
          >
            <el-select v-model="currentAddRowObj.ParentItemName">
              <el-option 
                v-for="(item,key) in ParentNameOptions"
                :key="key"
                :value="Item.ItemCode"
                :label="Item.ItemName"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="字段名" prop="ItemName">
            <el-input style="width:250px" clearable placeholder="请输入" v-model="currentAddRowObj.ItemName"></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="State">
            <el-switch v-model="currentAddRowObj.State"></el-switch>
          </el-form-item>

          <!--保存区-->
          <save-footer @save="saveAddDic" @cancel="cancelAddDic"></save-footer>
        </el-form>
      </el-dialog>
    </div>
    <!---新增dailog--end-->    
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomTableCmp from '@/base/Table-set-control-cmp/custom-table-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  import { PaGetDicDataSourceList } from '@/api/dic'
  import {
    getCustomerDicTab,
    getCustomerDicList,
    saveCustomerDic,
    changeCustomerDic
  } from '@/api/employee'

  let DicType = 'CUS'
  let DicCode = ''
  export default {
    components: {
      CustomTableCmp,
      SaveFooter
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
        DicType: 'CUS',
        loading: false, 
        dicList: [], // dic 列表数据
        setDicShow: false, // 控制 设置字典表弹框的显示/隐藏
        showAddDialog: false, // 控制 新增字典表弹框的显示/隐藏
        currentRowObj: {}, // 当前设置的行对象
        currentAddRowObj: {}, // 当前添加的行对象
        ParentNameOptions: [],  //父级字段下拉数据源
        // addDicForm: {
        //   ParentDicName: '', // 父级字典名
        //   ParentItemName: '', // 父级字段
        //   ItemName: '',  // 字典项名称
        //   State: 0,
        // },  
        activeTabDicCode: '',
        currentDicCode: '', 
        currentParentDicCode: '', 
        addDicFormRules: {
          // ParentDicName: [{required: true,message: '请选择父级字段', trigger: ['blur','change']}],
          ParentItemName: [{required: true,message: '请选择父级字段', trigger: ['blur','change']}],
          ItemName: [{required: true, message: '请输入字段名', trigger: 'blur'}]
        },
        tableData:[], // table 表格的数据
        queryObj: {
          pageSize: 10,
          pageIndex: 1,
          total: 0
        }
      }
    },
    computed: {
    },
    watch:{
      // currentDicCode: {
      //   handler(newValue, oldValue){
      //     if(newValue){
      //       this._getCustomerDicList()
      //     }
      //   }
      // },
      'obj.DicCode': {
        handler(newValue, oldValue){
          debugger
          // this.dicList.push(this.obj)
          if(newValue){
            this.currentDicCode = newValue
            debugger
            this._getCustomerDicList(newValue)
          }
        },
        immediate: true
      }      
    },
    created(){
      // 获取dic目录
      // this._getCustomerDicTab()
    },
    methods: {
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getCustomerDicList()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageIndex = val
        this._getCustomerDicList()
      },      
      // 获取dic tab目录
      _getCustomerDicTab(){
        this.loading = true
        getCustomerDicTab("PA").then(res => {
          this.loading = false
          if(res && res.data.State ===REQ_OK){
            this.dicList = res.data.Data
            this.activeTabDicCode = res.data.Data[0].DicCode
            this.currentDicCode = this.dicList[0].DicCode
            this.currentParentDicCode = this.dicList[0].ParentDicCode
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
      // 获取dic list 列表
      _getCustomerDicList(){
        this.loading = true
        getCustomerDicList(this.currentDicCode, this.queryObj.pageSize, this.queryObj.pageIndex).then(res => {
          this.loading = false
          if(res && res.data.State===REQ_OK){
            this.tableData = res.data.Data
            this.queryObj.total = res.data.DataCount
          }else {
            this.$message({
              type: 'error',
              message: `获取diclist数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '获取diclist 数据出错'
          })
        })
      },
      // 停用/启用
      _changeCustomerDic(type){
        changeCustomerDic(this.currentDicCode, this.currentRowObj.ItemCode, type).then(res => {
          if(res && res.data.State ===REQ_OK){
            if(type === 0){
              this.$message.success("停用成功")
              this._getCustomerDicList()
            }else if( type === 1){
              this.$message.success("启用成功")
              this._getCustomerDicList()
            }
          }
        })
      },
      // 保存字典项
      _saveCustomerDic(type){
        // 进行必填项校验
        let formName = ''
        debugger
        let strJson = ''
        if( type === 0 ){
          // 编辑设置
          formName = 'currentRowObj'
          if( !this.currentRowObj.State ){
            this.currentRowObj.State = 0
          }else {
            this.currentRowObj.State = 1
          }
          strJson = JSON.stringify(this.currentRowObj)
        }else if( type === 1 ){
          // 新增
          formName = 'currentAddRowObj'
          if( !this.currentAddRowObj.State ){
            this.currentAddRowObj.State = 0
          }else {
            this.currentAddRowObj.State = 1
          }
          strJson = JSON.stringify(this.currentAddRowObj)          
        }

        console.log(this.$refs[formName])
        // 进行必填项校验
        this.$refs[formName].validate((valid) => {
          debugger
          if(valid){
            // 通过
            saveCustomerDic(this.currentDicCode, strJson).then((res) => {
              if(res && res.data.State ===REQ_OK){
                type ===  0 && (this.setDicShow = false)
                type === 1 && (this.showAddDialog = false)
                this.$message.success("保存成功")
                this._getCustomerDicList()
              }else {
                this.$message.error(`保存失败,${res.data.Error}`)
              }
            }).catch(() => {
              this.$message.warning("保存字典表出错")
            })
          }else {
            // 没有通过
            console.log("必填项目校验失败")
          }
        })
      },
      // 获取 父级字段名称下拉数据源
      _getParentNameOptions(){
        PaGetDicDataSourceList(this.DicType, this.currentParentDicCode).then(res => {
          if(res && res.data.State === REQ_OK){
            this.ParentNameOptions = res.data.Data
          }else {
            this.$message.error(`获取父级字段下拉数据源失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning('获取父级字段下拉数据源出错了')
        })
      },
      //切换tabl
      handleClickTab(tab){
        debugger
        this.currentDicCode = tab.name
        this.currentParentDicCode = this.dicList[tab.index*1].ParentDicCode
        //获取table 列表
        // this._getCustomerDicList()
      },
      // 新增字段表
      clickAddDic(){
        // 获取 父级字段下拉数据源
        if(!this.ParentNameOptions.length && this.currentParentDicCode){
          this._getParentNameOptions()
        }

        debugger    
        let newObj = {
          Id: 0,
          CompanyCode: '',
          ModuleCode: '',
          DicCode: '',
          DicName: '',
          ParentDicCode: '',
          ParentDicName: '', // 父级字典名
          ParentItemName: '', // 父级字段
          PCode: '',
          ItemCode: '',
          ItemName: '',
          SortId: '',
          Remark: '',
          RoleRange: '',
          ItemName: '',  // 字典项名称
          State: false, 
          IsConfig: 0, // 是否可设置  0 可设置，1 不可设置      
        }
        this.currentAddRowObj = newObj
        debugger
        this.showAddDialog = true
      },
      // 设置字典表
      handleSet(row){
        debugger
        // 复制当前行
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        if(row.State === 1){
          this.currentRowObj.State = true
        }else if( row.State === 0 ){
          this.currentRowObj.State = false
        }
        this.setDicShow = true
      },
      // 停用
      handleStopUsing(row){
        // if(row.State === 1){
        //   row.State = true
        // }else if( row.State === 0 ){
        //   row.State = false
        // }        
        // 复制当前行
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        this.$confirm("确定要停用吗？","提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          // 调取接口进行停用
          this._changeCustomerDic(0)
        }).catch(() => {
          this.$message.info("取消成功")
        })
      },
      // 启用
      handleStartUsing(row){
        // if(row.State === 1){
        //   row.State = true
        // }else if( row.State === 0 ){
        //   row.State = false
        // }        
        // 复制当前行
        this.currentRowObj = JSON.parse(JSON.stringify(row))
        this.$confirm("确定要启用吗？","提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          // 调取接口进行停用
          this._changeCustomerDic(1)
        }).catch(() => {
          this.$message.info("取消成功")
        })
      },
      // 编辑保存
      saveSetDic(){
        // 先判断 字段名 不能重复 
        // let name = this.currentRowObj.ItemName
        // let res = this.tableData.find((value, index, arr) => {
        //   return value.ItemName === name
        // })

        // if(res){
        //   this.$message({
        //     type: 'warning',
        //     message: '字段名重复,请更换字段名称后保存'
        //   })
        //   return
        // }
        this._saveCustomerDic(0)
      },
      cancelSetDic(){
        this.setDicShow = false
      },
      // 新增保存
      saveAddDic(){
        debugger
        // 先判断必填项 并且 判断 新增的字段名不能重复
        let name = this.currentAddRowObj.ItemName
        let res = ''
        if(name){
          res = this.tableData.find((value, index, arr) => {
            return value.ItemName === name
          })
        }

        if(res){
          this.$message.warning("字段名称重复,请重新填写")
          return
        }

        this._saveCustomerDic(1)
      },
      // 新增取消
      cancelAddDic(){
        this.showAddDialog = false
      },
    },
  }
</script>

