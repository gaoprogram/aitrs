<template>
  <el-table :data="taxList"
            border
            highlight-current-row
  >

    <el-table-column label="生效日" align="center" prop="BeginDate">
      <template slot-scope="scope">
        <span>{{ scope.row.BeginDate | replaceTimeNoH }}</span>
      </template>
    </el-table-column>

    <el-table-column label="个税城市" align="center" prop="CityName">
    </el-table-column>

    <el-table-column label="免税额（/ 元）" align="center" prop="Amount">
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="modifyTaxCity(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="text"
          size="small"
          @click="deleteCity(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      taxList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      modifyTaxCity (item) {
        this.$emit('modifyTaxCity', item)
      },
      deleteCity (item) {
        this.$emit('deleteCity', item)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
