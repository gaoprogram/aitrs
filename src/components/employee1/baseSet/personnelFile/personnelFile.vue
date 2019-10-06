<!--
  User: gaol
  Date: 2019/8/9
  功能：基础设置- 人事档案地点
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.personnelFile
  padding 20px 
  box-sizing border-box
</style>

<template>
  <div class="personnelFile">
    人事档案地点
    <el-button class="rt marginB10" type="primary" size="mini" @click.native="addPersonnel">新增</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="机构"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份城市">
      </el-table-column>
      <el-table-column
        prop="fee"
        label="服务费"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleStopUsing(scope.row)" type="text" size="small">停用</el-button>
          <el-button @click="handleStartUsing(scope.row)" type="text" size="small">启用</el-button>
        </template>
      </el-table-column>
    </el-table>    

    <!--新增弹框--start-->
    <div class="addPersonnel" v-if="showAddDialog">
      <el-dialog
        title="新增"
        width="30%"
        :visible.sync="showAddDialog"
        custom-class="addPersonnel"
        append-to-body
        :close-on-click-modal="false"
      >
        <el-form ref="personnelForm" :model="personnelForm" label-width="80px">
          动态加载显示编辑组件
        </el-form>

        <save-footer @save="saveAddPersonnel" @cancel="cancelAddPersonnel"></save-footer>
      </el-dialog>
    </div>
    <!--新增弹框--end-->

    <!--编辑弹框--start--->
    <div class="editPersonnel" v-if="showEditPersonnel">
      <el-dialog
        title="编辑"
        width="30%"
        :visible.sync="showEditPersonnel"
        custom-class="editPersonnel"
        append-to-body
        :close-on-click-modal="false"
      >

      </el-dialog>
    </div>
    <!---编辑弹框--end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    components: {
      SaveFooter
    },
    data(){
      return {
        showAddDialog: false, // 控制新增弹框的显示/隐藏
        showEditPersonnel: false, // 控制编辑弹框的显示/隐藏
        // 新增弹框中的对象
        personnelForm: {

        },
        tableData: [{
          date: '2016-05-02',
          name: '张三',
          province: '湖北省武汉市洪山区雄楚大道',
          fee: '20000',
          address: '洪山区雄楚大道',
          zip: 200333
        }]        
      }
    },
    methods: {
      // 新增人事档案
      addPersonnel(){
        this.showAddDialog = true
      },
      // 新增人事档案保存
      saveAddPersonnel(){
        // 先校验必填项 然后调接口保存
      },
      // 取消新增人事档案
      cancelAddPersonnel(){
        this.showAddDialog = false
      },
      // 编辑
      handleEdit(){
        this.showEditPersonnel = true
      },
      // 停用
      handleStopUsing(){
        this.$confirm("确定停用此档案吗？","提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          // 调接口进行 停用该档案

        }).catch(() => {
          this.$message({
            type: 'warning',
            message: "取消停用"
          })
        })
      },
      // 启用
      handleStartUsing(){
        this.$confirm("确定要启用此档案吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          // 调用接口 进行启用档案
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: "已取消启用"
          })
        })
      }
    }
  }
</script>

