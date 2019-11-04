<!--
  User: gaol
  Date: 2019/10/31
  功能：平台系统设置——许可权-许可权-添加许可权table组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.addPermit
  padding 0 20px
  box-sizing border-box
  .containerWrap
    .topBtnBox
      margin-bottom 10px
      text-align right
</style>

<template>
    <div class="addPermit" v-loading = 'loading'>
      <div class="containerWrap">

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
        
    },
  }
</script>
