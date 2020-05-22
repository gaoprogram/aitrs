<!--
  User: gaol
  Date: 2019/12/19
  功能： pa 中的 组表配置 菜单树形结构组件
-->
<style lang="stylus" rel="stylesheet/stylus">
.menuTree-cmp
  height 100%
  padding 5px 5px 0 0
  border-right 1px solid #E4E7ED
  box-sizing border-box
  .searchBox
    margin-bottom 10px
>>>.el-tree
  height 700px 
  overflow auto
</style>

<template>
  <div class="menuTree-cmp">
    <!-- treeData: {{treeData}} -->
    <div class="searchBox">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        @keyup.native="filterChange">
      </el-input>
    </div>

    <el-scrollbar style="height: calc(100% - 50px)" :native="false">
      <el-tree
        class="filter-tree"
        empty-text="暂无数据"
        :show-checkbox="false"
        node-key="id" 
        :render-after-expand="true"
        :highlight-current="true"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        :accordion="true" 
        icon-class="el-icon-arrow-down"    
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
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

        <!-- <span 
          class="custom-tree-node" 
          slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              Append
            </el-button>

            <el-button
              type="text"
              size="mini"
              @click="() => editName(data)">
              edit
            </el-button>          

            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              Delete
            </el-button>
          </span>   
        </span>    -->

      </el-tree>
    </el-scrollbar>

    <!-- <div class="buttons">
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKeys">通过 key 设置</el-button>
        <el-button @click="resetChecked">清空</el-button>
    </div>  -->
  </div>
</template>

<script type="text/ecmascript-6">
  let id = 1000
  export default {
    props: {
      treeData: {
        type: Array,
        default: () => {
          return []
        }
      }
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
      //节点被点击
      handleNodeClick(data, a, b){
        debugger
        this.$emit("treeNodeClick", data)
      },
      // 节点开始拖拽时触发的事件
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      // 拖拽进入其他节点时触发的事件
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      //拖拽离开某个节点时触发的事件
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      //在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      //拖拽结束时（可能未成功）触发的事件
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      //拖拽成功完成时触发的事件
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
      },
      // 添加节点
      append(data) {
        debugger
        console.log(id)
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      // 移除节点
      remove(node, data) {
        debugger
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },  
      // 编辑节点
      editName(node, data) {
        debugger
        // node.label = '修改后'
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


