<!--
  User: xxxxxxx
  Date: 2018/2/9
  功能：xxxxxx
-->

<template>
  <el-table :data="TermList"
            border
            highlight-current-row
  >

    <el-table-column label="生效日" align="center" prop="BeginDate">
      <template slot-scope="scope">
        <span>{{ scope.row.BeginDate | replaceTimeNoH }}</span>
      </template>
    </el-table-column>

    <el-table-column label="项目名称" align="center" prop="TermName">
    </el-table-column>

    <el-table-column label="金额或%" align="center" prop="TermValue" width="100">
    </el-table-column>

    <el-table-column label="币种" align="center" prop="CurrencyName" width="100">
    </el-table-column>

    <el-table-column label="操作" align="center"width="100">
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="modify(scope.row)"
        >
          编辑
        </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      activeNames: {
        type: Array,
        default: []
      },
      TermList: {
        type: Array,
        default: []
      },
      revenueOrDeduction: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      modify (item) {
        item.revenueOrDeduction = this.revenueOrDeduction
        this.$emit('modify', item)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
