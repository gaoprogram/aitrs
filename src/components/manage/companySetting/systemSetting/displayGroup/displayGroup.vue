<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统设置-显示组表
-->

<style lang="stylus" ref="stylesheet/stylus" scoped>
.displayGroup
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="displayGroup" v-loading="loading">

      <div class="searchWrap">

      </div>

      <div class="topBox marginB10" style="text-align: right">
        <el-button type="primary" size="mini">新增分组</el-button>
        <el-button type="primary" size="mini">新增表</el-button>
        <el-button type="primary" size="mini">启用</el-button>
        <el-button type="primary" size="mini">停用</el-button>
        <el-button type="primary" size="mini">批量编辑</el-button>
      </div>

      <el-table
        :data="tableData"
        border
      >

        <el-table-column
          type="selection"
          width="50"
        >
        </el-table-column>

        <el-table-column
          label="类型"
          prop="status"
        >
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
          label="数据表名"
          prop="dataName"
        >
          <template slot-scope="scope">
            <span>{{scope.row.dataName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="自定义名"
          prop="customerName"
        >
          <template slot-scope="scope">
            <span>{{scope.row.customerName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="系统名"
          prop="sysName"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sysName}}</span>
          </template>
        </el-table-column>   

        <el-table-column
          label="引用组件"
          prop="quoteCmp"
        >
          <template slot-scope="scope">
            <span>{{scope.row.quoteCmp}}</span>
          </template>
        </el-table-column>             

        <el-table-column
          label="描述"
          prop="remark"
        >
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>         


        <el-table-column
          label="状态"
          prop="status"
        >
          <template slot-scope="scope">
            <span>{{scope.row.status}}</span>
          </template>
        </el-table-column>            


        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="mini">启用</el-button>
            <el-button type="text" size="mini">停用</el-button>
            <el-button type="text" size="mini" @click.native="handleFieldSet(scope.row, scope.$index)">字段设置</el-button>
            <el-button type="text" size="mini" @click.native="handleEdit(scope.row, scope.$index)">编辑</el-button>
          </template>
        </el-table-column>     
      </el-table>

      <!--编辑组的弹框--start--->
      <div class="editGroupBox" v-if="showEditGroup">
        <el-dialog
          title="编辑组"
          width="30%"
          :visible.sync="showEditGroup"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="分组名">
              <el-button type="text"></el-button>
            </el-form-item>
            <el-form-item label="分组所属组">
              <el-select>
                <el-option></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textArea" placeholder="jfdkfjdk"></el-input>
            </el-form-item>
            <el-form-item label="启用">
              <el-switch></el-switch>
            </el-form-item>
          </el-form>
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
  export default {
    data(){
      return {
        loading: false, // loading 状态
        showEditGroup: false, // 控制编辑组的弹框显示/隐藏
        showFieldSetDialog: false, // 控制 字段设置的弹框显示/隐藏
        tableData: [
          {
            status: '分组',
            dataCode: '234-89htttts',
            dataName: '组织基本信息',
            status: '启用',
            customerName: '组织信息',
            sysName: '组织基本信息',
            remark: '描述',
            quoteCmp: '组织信息，员工信息'
          },
          {
            status: '表',
            dataCode: 'yyyyy-hhhh',
            dataName: '组织基本信息',
            status: '停用',
            customerName: '大列表',
            sysName: '大列表',
            remark: '描述',
            quoteCmp: '组织信息，员工信息'
          },          
        ]
      }
    },
    methods: {
      // 编辑组
      handleEdit(row, index){
        this.showEditGroup = true
      },
      // 字段设置
      handleFieldSet(row, index){
        this.showFieldSetDialog  = true
      }
    },
  }
</script>
