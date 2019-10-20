<!--
  User: xxxxxxx
  Date: 2019/10/15
  功能： 系统管控中的 菜单树形结构组件
-->
<style lang="stylus" rel="stylesheet/stylus">
.menuTree-cmp
  padding 5px 5px 0 0
  border-right 1px solid #E4E7ED
  box-sizing border-box
</style>

<template>
  <div class="menuTree-cmp">
    <!-- <div class="searchBox"> -->
        <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input> -->
    <!-- </div> -->

    <!-- <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree> -->

    <div class="searchBox">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        @keyup.native="filterChange">
      </el-input>
    </div>

    <el-tree
      class="filter-tree"
      show-checkbox
      node-key="id"      
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"      
      ref="tree">
    </el-tree>

    <!-- <div class="buttons">
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKeys">通过 key 设置</el-button>
        <el-button @click="resetChecked">清空</el-button>
    </div>   -->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {

    },
    data() {
      return {
        filterText: '', 
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created () {
    },
    watch: {
      filterText(val) {
        console.log(val)
        debugger
        this.$refs.tree.filter(val);
      }
    }, 
    methods: {
      filterChange() {
        debugger
        this.$refs.tree.filter(this.filterText)
      },
      // 关键词过滤
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
        // 通过node获取
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes())
      },
      // 通过key 获取
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys())
      },
      // 通过node设置
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      // 通过key 设置
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      // 清空
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }            
    },
    watch: {
    //   obj: {
    //     handler (newValue, oldValue) {
    //       // 每当obj的值改变则发送事件update:obj , 并且把值传过去
    //       this.$emit('update:obj', newValue)
    //     },
    //     deep: true
    //   }
    }
  }
</script>


