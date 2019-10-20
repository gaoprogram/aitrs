<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——许可权-许可权
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.permit
  padding 0 20px
  box-sizing border-box
  .containerWrap
    .topBtnBox
      margin-bottom 10px
      text-align right
</style>

<template>
    <div class="permit" v-loading = 'loading'>
      <div class="containerWrap">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClickTabs">
          <el-tab-pane label="角色信息" name="first">角色信息</el-tab-pane>
          <el-tab-pane label="许可权" name="second">许可权</el-tab-pane>
          <el-tab-pane label="显示数据控制" name="third">显示数据控制</el-tab-pane>
          <el-tab-pane label="用户/组" name="fourth">用户/组</el-tab-pane>
          <el-tab-pane label="角色关系" name="fifth">角色关系</el-tab-pane>
        </el-tabs>    


        <div class="topBtnBox">
          <el-button type="primary" size="mini" @click.native="addNewPermit">添加许可权</el-button>
          <el-button type="primary" size="mini" @click.native="deletePermit">批量移除许可权</el-button>
          <el-button type="primary" size="mini" @click.natvie="copyPermit">复制许可权</el-button>
        </div>

        <el-table 
          style="width: 100%"
          :data="tableData"
          border
        >

          <el-table-column
            type="selection"
            width="50"
          >

          </el-table-column>

          <el-table-column
            prop="roleName"
            label="许可权"
            sortable
          ></el-table-column>

          <el-table-column
            prop="roleType"
            label="许可权名"
            sortable
          ></el-table-column>

          <el-table-column
            prop="remarks"
            label="描述"
            show-overflow-tooltip
          ></el-table-column>    

          <el-table-column
            prop="quoteRole"
            label="引用的角色"
            show-overflow-tooltip
          ></el-table-column> 

          <el-table-column
            prop="status"
            label="状态"
            show-overflow-tooltip
            sortable
          ></el-table-column>                     

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="mini">查看</el-button>
              <el-button type="text" size="mini">数据安全</el-button>
            </template>
          </el-table-column>      
        </el-table>    
      </div>


      <div class="copyPermit" v-if="showCopyNewPermit">
        <el-dialog
          title="复制许可权"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
          :visible.sync="showCopyNewPermit"
        >
          <div>
            <el-form-item label-width="80" label="复制到角色">
              <el-input list="EventName"></el-input>
              <datalist id="EventName">
                <option value="名称一"></option>
                <option value="名称二"></option>
                <option value="名称三"></option>
              </datalist>   
            </el-form-item>
          </div>
          <div>
            <save-footer @save="saveAdd" @cancel="cancelAdd"></save-footer>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    components:{
      SaveFooter
    },
    data(){
      return {
        loading: false, // loading状态
        activeName: 'first',
        showAddNewPermit: false, // 现在许可权弹框的显示/隐藏
        showCopyNewPermit: false, // 复制许可权弹框显示/隐藏
        tableData: [
          {
            roleName: '企业管理员',
            roleType: '系统角色',
            remarks: '备注内容',
            quoteRole: '这是引用的角色',
            status: 'false'
          },
        ]
      }
    },
    methods: {
      // 切换tab
      handleClickTabs(tab){

      },
      // 添加许可权
      addNewPermit(){
        debugger
        this.showAddNewPermit = true
      },
      // 批量移除许可权
      deletePermit(){

      },
      // 复制许可权
      copyPermit(){
        this.showCopyNewPermit = true
      },
      // 保存新增
      saveAdd(){

      },
      // 取消新增
      cancelAdd(){

      },
    },
  }
</script>
