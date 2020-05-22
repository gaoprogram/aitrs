
<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——版本套包-版本
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.version
  padding 0 20px
  box-sizing border-box
</style>

<template>
  <div class="version" v-loading = 'loading'>
    平台系统设置——版本套包-版本
    <el-table 
      :data="tableData"
      border
    >
      <el-table-column
        label="模块"
        prop="moduleName"
      >
      </el-table-column>

      <el-table-column
        label="版本启用品类"
        prop="version"
      >
      </el-table-column>

      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" @click.native="versionSet(scope.row, scope.$index)">版本设置</el-button>
        </template>
      </el-table-column>      

    </el-table>


    <!---模块设置弹框--start--->
    <div class="moduleBox" v-if="showModuleDialog">
      <el-dialog
        :title="moduleTit"
        :visible.sync="showModuleDialog"
        append-to-body
        :close-on-click-modal="false"
        fullscreen
      >
        <version-set-cmp 
          :currentSetStr = "currentSetStr" 
          ref="versionSetCmp">
        </version-set-cmp>
      </el-dialog>
    </div>
    <!---模块设置弹框---end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import VersionSetCmp from './version-cmp/VersionSet-cmp'
  export default {
    components: {
      VersionSetCmp
    },
    data(){
      return {
        loading: false, // 控制loading状态
        moduleTit: '', // 模块弹框的标题显示
        showModuleDialog: false, // 模块弹框的显示/隐藏
        currentSetStr: '', // 当前编辑的模块名称
        tableData: [
          {
            moduleName: '组织',
            version: '初级版,中级版,高级版'
          },
          {
            moduleName: '人员',
            version: '中级版,高级版'
          },
          {
            moduleName: '社保',
            version: '高级版'
          },                 
        ]
      }
    },
    methods: {
      // 版本设置
      versionSet(row, index){
        this.showModuleDialog = true
        let moduleName = row.moduleName
        switch(moduleName){
          case '组织':
            this.currentSetStr = 'org'
            this.moduleTit = '组织'
            break
          case '人员':
            this.currentSetStr = 'people'
            this.moduleTit = '人员'
            break
          case '社保':
            this.currentSetStr = 'social'
            this.moduleTit = '社保'
            break
        }
        
      }
    },
  }
</script>

