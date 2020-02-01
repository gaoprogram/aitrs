<!--
  User: gaol
  Date: 2019/12/19
  功能：基础设置- 组件字段权限
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
  <div class="fieldAuthority">
    <!-- tableData: {{tableData}} -->
    <div :class="['tableBox', tableData.length<=0? 'not_found':'']">
      <el-table
        border
        max-height="600"
        :data="tableData"
        empty-text=" "
      >
        <el-table-column
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { 
    getFieldPermitList
  } from '@/api/employee'
  export default {
    data(){
      return {
        loading: false,
        tableData: [],
      }
    },
    created(){
      this._getComTables()
    },
    methods: {
      _getComTables(){
        this._getFieldPermitList()
      },
      _getFieldPermitList(){
        this.loading = true
        getFieldPermitList().then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
          }else {
            this.$message.error(`获取字段权限列表失败,${res.data.Error}`)
          }
        })
      }
    }
  }
</script>

