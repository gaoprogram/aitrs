<!--
  User: gaol
  Date: 2019/5/23
  功能：节点设置——概览
-->

<template>
  <el-dialog title="概览"
             class="dialog-item"
             :visible="dialogAddNode"
             :showClose="false"
             :append-to-body="true"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             width="490px"
  >
    <el-form :model="newNodeObj" :rules="nodeRules" ref="ruleNewNodeForm" label-width="100px" class="demo-ruleForm" v-loading="addNodeLoading">
      <el-form-item label="节点名称" prop="name">
        <el-input v-model="newNodeObj.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="节点类型" prop="runModel">
        <el-select v-model="newNodeObj.runModel" placeholder="请选择节点类型" style="width: 300px">
          <el-option
            v-for="item in nodeTypeList"
            :key="item.Code"
            :label="item.Name"
            :value="item.Code">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <save-footer @save="handleClickSaveNewNode" @cancel="dialogAddNode = false"></save-footer>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
