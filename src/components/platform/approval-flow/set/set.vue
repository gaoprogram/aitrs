<!--
  User: gaol
  Date: 2019/7/8
  功能：审批流——设置页面 （新增批示语）
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/css/mixin.styl"
    #set 
      padding 30px
      box-sizing border-box
      .headTop
        height 28px
        margin-bottom 10px
        .tit 
          font-size 14px
          color #00000
          font-weight bold
          line-height 28px
</style>
<template>
    <div id="set">
        <!-- <p>请拖拽排序</p> -->
        <div class="clearfix headTop">
          <p style="float:left" class="tit">常见批示语</p>
          <el-button type="primary" @click="addNewIntroction" style="float:right" size="mini">新增批示语</el-button>
        </div>
          <!-- tableArr: {{tableArr}} -->
        <!--table表格--start-->
        <div :class="['table',!tableArr.length? 'not_found': '']" v-loading="tableLoading">
          <el-table
            ref="multipleTable"
            border
            :data="tableArr"
            tooltip-effect="dark"
            style="width: 100%"
            empty-text=' '
            @selection-change="handleSelectionChange">

            <!-- <el-table-column
              type="selection"
              fixed="left"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column> -->
            
            <el-table-column
              prop="InstructType"
              label="类型"
              width="180"
              sortable
              show-overflow-tooltip>          
            </el-table-column>
            <el-table-column
              prop="ShortName"
              label="短语简称"
              width="250"
              sortable>
            </el-table-column>
            <el-table-column
              prop="Describe"
              label="短语描述"
              sortable>
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="editInstruction(scope.row, scope.$index)"
                >编辑
                </el-button>

                <el-button
                  type="text"
                  size="small"
                  @click="deleteInstruction(scope.row, scope.$index)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="queryObj.pageNum"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="queryObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>        
        <!---table表格----end--->


        <!---新增批示语的弹框-start-->
        <template v-if="showAddIntruction">
          <el-dialog       
            title="新增批示语"
            :visible.sync="showAddIntruction"
            :show-close="true"
            :close-on-click-modal="false"
            width="500px"
            append-to-body>
              <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="addIntroction" v-loading="contentLoading">
                <el-form-item label="类型" prop="InstructType" :rules="rules.InstructType">
                  <el-select v-model="ruleForm.InstructType" placeholder="请选择">
                    <el-option v-for="(item, index) in typeList" :key="item.label" :label="item.label" :value="item.value" ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="短语简称" prop="ShortName" :rules="rules.ShortName">
                  <el-input v-model="ruleForm.ShortName"></el-input>
                </el-form-item>
                <el-form-item label="短语描述" prop="Describe" :rules="rules.Describe">
                  <el-input type="textarea" v-model="ruleForm.Describe"></el-input>
                </el-form-item>

                <div class="footer center" >
                  <el-button @click="showAddIntruction = false">取 消</el-button>
                  <el-button type="primary" @click="handleSureBtn()">确 定</el-button>
                </div>              
              </el-form>
          </el-dialog>
        </template>
        <!---新增批示语的弹框-end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    getInstructionList,
    saveInstruction,
    deleteInstruction
  } from '@/api/approve'
//   import tabRouter from '@/components/platform/approval-flow/tab-router/tab-router'
//   import rightFixed from '@/components/platform/approval-flow/right-fixed/right-fixed'
//   import SearchCmp from '../search-cmp/search-cmp'
//   import AitrsEditor from '@/base/editor/aitrs-editor'
  import { flowCommonFn } from '@/utils/mixin'

  // 转化 分类为汉字的 方法
  function switchCat(str = 'Default') {
    return {
      "Default": '处理',
      "Cc": '抄送',
      "Send": '提交',
      "Shift": '转发',
      "ReturnBack": '退回',
    }[str]
  }

  export default {
    // 引用的mixin中的 flowCommonFn 方法进行 查看，取消挂起，获取form 表单数据等
    // mixins: [flowCommonFn],
    components: {
    //   SearchCmp,
    //   tabRouter,
    //   rightFixed,
    //   AitrsEditor
    },
    data () {
      return {
        tableLoading: false, // 批示语table 的loading状态
        tableArr: [],  // 批示语的table表格数据集合
        contentLoading: false, // 新增批示语加载的状态
        showAddIntruction: false,  // 显示弹框的
        multipleSelection: [],  // 选中的 对象集合
        total: 0,     // table表格的 总页数
        currentRowObj: {}, // 操作的当前table行数据
        currentRowIdx: '',  // 操作的当前table行的索引值
        queryObj: {
          pageNum: 1,
          pageSize: 10
        },
        typeList: [
          {
            label: '提交',
            value: 'Send'
          },
          {
            label: '处理',
            value: 'Default'
          },
          {
            label: '转发',
            value: 'Shift'
          },
          {
            label: '抄送',
            value: 'Cc'
          },
          {
            label: '退回',
            value: 'ReturnBack'
          }                                               
        ],   // 新增批示语的list列表
        ruleForm: {
          Id: 0,   // 批示语的编号
          InstructType: '', // 双向绑定 用户选择的 类型
          ShortName: '',  // 双向绑定 用户输入的 短语简语
          Describe: ''   // 双向绑定 用户输入的 描述
        }, 
        rules: {
          InstructType: [
            {required: true, message: '请选择批示语类型', trigger: ['blur','change']}
          ],
          ShortName: [
            { required: true, message: '请输入短语简称  ', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          Describe: [
            { required: true, message: '请填写短语描述内容', trigger: 'blur' },
            {min:1, max:20, message: '长度在1 到 20 个字符', trigger: 'blur'}
          ]
        }               
      }
    },
    created () {
      this.$nextTick(() => {
        // 获取新增批示语的数据
        this._getInstructionList()
      })
    },
    methods: {
      // 获取新增批示语的类型 下拉list 列表
      _getInstructionList() {
        this.tableLoading = true
        getInstructionList(this.queryObj).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.tableArr = res.data.Data
            this.total = res.data.Total
            if( this.tableArr && this.tableArr.length){
              this.tableArr.forEach((item, key) => {
                item.InstructType = switchCat(item.InstructType)
              })
            }
          }else {
            this.$message({
              type: 'warning',
              message: '获取类型list 数据err,请重试'
            })
          }
          this.tableLoading = false
        })
      },
      // 保存新增的批示语
      _saveInstruction() {
        this.contentLoading = true
        saveInstruction(JSON.stringify(this.ruleForm)).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success("保存成功！")
            // 刷新table列表
            this._getInstructionList()
            // 关闭弹框
            this.showAddIntruction = false
          }else { 
            this.$message.warning("保存失败！")
          }
          this.contentLoading = false
        })
      },    
      // 删除 批示语
      _deleteInstruction(){
        this.tableLoading = true
        deleteInstruction(this.currentRowObj.Id).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message({
              type: 'success',
              message: '批示语删除成功！'
            })
            // table列表数据 显示为最新数据
            // this.tableArr.splice(this.currentRowIdx,1)
            this._getInstructionList()
          }else {
            this.$message({
              type: 'error',
              message: '批示语删除失败err,请重试'
            })
          }
          this.tableLoading = false
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '批示语删除失败err,请重试'
          })
        })
      },
      // 表格多选
      handleSelectionChange (val) {
        this.multipleSelection = val
      },   
      // 分页--一页展示多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getInstructionList()
      },
      // 分页--上一页，下一页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._getInstructionList()
      },         
      // 新增
      addNewIntroction() {
        Object.assign(this.ruleForm, {
          InstructType: '', // 双向绑定 用户选择的 类型
          ShortName: '',  // 双向绑定 用户输入的 短语简语
          Describe: ''   // 双向绑定 用户输入的 描述
        })
        this.showAddIntruction = true
      },
      // 编辑 批示语
      editInstruction (obj, idx) {
        debugger
        debugger
        this.currentRowObj = obj
        this.currentRowIdx = idx

        let  {
          Id,
          InstructType,
          ShortName,
          Describe,          
        } = this.currentRowObj
        this.ruleForm.Id = Id
        this.ruleForm.InstructType = InstructType
        this.ruleForm.ShortName = ShortName
        this.ruleForm.Describe = Describe
        // 显示编辑的弹框
        this.showAddIntruction = true

      }, 
      // 删除 批示语
      deleteInstruction(obj, idx) {
        this.currentRowObj = obj
        this.currentRowIdx = idx        
        this.$confirm('确定要删除此批示语吗？', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._deleteInstruction()  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });             
        })
      },
      // 保存
      handleSureBtn() {
        this.$refs['ruleForm'].validate((valid)=>{
          debugger
          if(valid){
            // 通过
            this._saveInstruction()
          }else {

          }
        })
      },
    }
  }
</script>
