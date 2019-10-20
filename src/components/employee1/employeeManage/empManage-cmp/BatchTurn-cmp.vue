<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量调转
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

   
</style>
<template>
  <div class="batchJoinJob-cmp">
    批量调转页面
    <div>
      <span>事件类型</span>
      <el-select>
        <el-option></el-option>
      </el-select>
    </div>

    <div>
      <el-table
        :data="tableData"
        width="80%"
      >
        <el-table-column
          label="员工号"
          sortable
          prop="userNo"
        ></el-table-column>

        <el-table-column
          label="员工号"
          sortable
          prop="userNo"
        ></el-table-column>

        <el-table-column
          label="组织"
          sortable
          prop="userOrg"
        ></el-table-column>

        <el-table-column
          label="员工姓名"
          sortable
          prop="userName"
        ></el-table-column>

        <el-table-column
          label="员工职位"
          sortable
          prop="userPosition"
        ></el-table-column>                                

      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    // import UploadFile from '@/base/PA-common-cmp/pa-Upload/uploadFile' 
    export default {
        components: {
            // UploadFile
        },
        props: {

        },
        data(){
            return {
              userNo: '1002',
              userName: 'zhangsan',
              userPosition: 'zhiwu',
              userOrg: 'zuzhi',

            }
        },
        created() {
            debugger
        },
        methods: {

        }
    }
</script>
