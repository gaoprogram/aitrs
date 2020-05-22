<!--
  User: xxxxxxx
  Date: 2018/2/9
  功能：xxxxxx
-->

<template>
  <el-table :data="list" border style="width: 100%;margin-top: 10px">

    <el-table-column
      align="center"
      fixed
      prop="ReportName"
      label="月报名称"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="OnMonth"
      label="所属月份"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="GBT"
      label="税前收入"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="GAT"
      label="税后收入"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="GNT"
      label="免税收入"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="PBT"
      label="税前扣减"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="PAT"
      label="税后扣减"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="GT"
      label="收入合计"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="PT"
      label="扣减合计"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="GTT"
      label="应纳税收入总额"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="TAX"
      label="应纳税"
    >
    </el-table-column>

    <el-table-column
      align="center"
      prop="AT"
      label="境外已纳税"
    >
    </el-table-column>

    <el-table-column
      align="center"
      fixed="right"
      prop="RT"
      label="实发合计"
    >
    </el-table-column>

  </el-table>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
