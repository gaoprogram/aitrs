<!--
  User: gaol
  Date: 2019/10/15
  功能： 添加角色的 角色选择器中的  菜单树形结构组件
-->
<style lang="stylus" rel="stylesheet/stylus">
>>>.el-loading-mask
  top 0 !important
.menuTree-cmp
  padding 5px 5px 0 0
  border-right 1px solid #E4E7ED
  box-sizing border-box
  .searchBox
    margin-bottom 10px
</style>

<template>
  <div class="menuTree-cmp">
    <!-- treeData: {{treeData}} -->
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

    <!-- <div class="searchBox">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        @keyup.native="filterChange">
      </el-input>
    </div> -->

    <!-- treeData: {{treeData}} -->

    <div class="roleTreeBox" style="min-height: 300px;min-width: 300px" v-loading="loading">
      <el-tree
        class="filter-tree"
        empty-text="暂无数据"
        :show-checkbox="true"
        node-key="id" 
        :checkStrictly="false"
        :render-after-expand="true"
        :highlight-current="true"
        :expand-on-click-node="true"
        :check-on-click-node="false"
        :accordion="false" 
        :data="treeData"
        :props="defaultProps"
        :default-expand-all="true"
        :filter-node-method="filterNode"
        @check-change="handleCheckChange"
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
    </div>

    <!-- <div class="buttons">
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKeys">通过 key 设置</el-button>
        <el-button @click="resetChecked">清空</el-button>
    </div>  -->



    <!--选择角色组名下的角色弹框-start-->
    <div v-if="showRoleDailog" class="animated fadeIn">
        <el-dialog
            :title="currentTit"
            :visible.sync="showRoleDailog"
            width="40%"
            append-to-body
            :close-on-click-modal="false"
        >
            <div class="roleBox animated fadeIn" v-if="currentClickNodeRoleArr.length">
              <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
              <div style="margin: 15px 0;"></div>
              checkedPermission: {{checkedPermission}}
              <el-checkbox-group 
                :max="1"
                v-model="checkedPermission" 
                @change="handleCheckedPermissionChange">
                  <el-checkbox 
                      v-for="(role,index) in currentClickNodeRoleArr" 
                      :label="role" 
                      :key="index">{{role.RoleName}}</el-checkbox>
              </el-checkbox-group>  

              <saver-footer @save="save" @cancel="cancel"></saver-footer>
            </div>     

            <div :class="['hasNoRole', 'animated', 'fadeIn']" v-else>
              <p class="tit center">该分类下暂无角色列表数据!</p>
            </div>    
        </el-dialog>
    </div>
    <!--权限弹框-end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import SaverFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  import { 
    getSelectCompRole
  } from '@/api/systemManage'
  let id = 1000
  export default {
    components: {
      SaverFooter
    },
    props: {
      currentCode: {
        type:String,
        default: ''
      }
    },
    data() {
      return {
        loading: false,
        filterText: '', 
        data: [],
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        showRoleDailog: false, //  控制显示/隐藏当前层级的 role 弹框
        currentTit: '', // 当前弹框的 标题
        currentClickObj: {}, // 当前点击的节点对象
        currentClickNodeRoleArr: [], // 当前点击的节点对象的权限集合
        checkAll: false,
        checkedPermission: [],
        isIndeterminate: true            
      }
    },
    created () {
      this._getSelectCompRole('','',1)
      this.$bus.$on("setCheckedNodes", (data) => {
        debugger
        this._setCheckedNodes(data)
      })
    },
    beforeDestroy(){
      this.$bus.$off("setCheckedNodes")
    },
    watch: {
      filterText(val) {
        console.log(val)
        debugger
        this.$refs.tree.filter(val);
      }
    }, 
    methods: {
      _setCheckedNodes(arr){
        // let res = this.treeData.filter((item, key) => {
        //   return item.Id != obj.Id
        // })
        debugger
        if(arr.length){
          this.$refs.tree.setCheckedNodes(arr)
        }else {
          this.$refs.tree.setCheckedNodes([])
        }
      },
      // 初始化treeData
      _changeData(data ){
        debugger
        if(data && data.length){
          data.forEach((item, key) => {
            this.$set(item, 'id', item.Id)
            this.$set(item, 'label', item.RoleGroupName)
            this.$set(item, 'children', item.Children)
            // this.$set(item, 'disabled', !item.IsRole)
            if( item.Children && item.Children.length ){
              this._changeData(item.Children)
            }      
          })
        }
      },
      // 获取树形data
      _getSelectCompRole(roleName, roleGroupCode, type){
        this.loading = true
        getSelectCompRole(roleName, '', type).then(res => {
          this.loading = false
          debugger
          if(res && res.data.State === REQ_OK){
            this.treeData = res.data.Data
            this._changeData(this.treeData)
          }else {
            this.$message.error(`获取角色选择器数据失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("获取角色选择器数据失败")
        })
      },
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
      // 节点被勾选
      handleCheckChange(data,checked, indeterminate){
        debugger
        this.checkedPermission = []
        // this.currentTit = data.RoleGroupName
        this.currentClickObj = data
        // this.currentClickNodeRoleArr = data.Roles
        // this.showRoleDailog = true
        if(data.IsRole){
          // 点击的是 角色
          this.$emit("roleNodeClick", data, checked)
        }else {
          this.$emit("treeNodeClick", data, checked)          
          console.log("点击的是非角色", data.RoleGroupName)
        }
      },
      //节点被点击
      handleNodeClick(data, a, b){
        debugger
        // this.checkedPermission = []
        // // this.currentTit = data.RoleGroupName
        // this.currentClickObj = data
        // // this.currentClickNodeRoleArr = data.Roles
        // // this.showRoleDailog = true
        // if(data.IsRole){
        //   // 点击的是 角色
        //   this.$emit("roleNodeClick", data)
        // }else {
        //   this.$emit("treeNodeClick", data)          
        //   console.log("点击的是非角色", data.RoleGroupName)
        // }
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
      },
      // 全选/取消全选
      handleCheckAllChange(val) {
        debugger
        this.checkedPermission = val ? this.currentClickNodeRoleArr : []
        // let checkedObj = val ? this.currentClickNodeRoleArr : [];
        // if(checkedObj.length){
        //     this.checkedPermission = checkedObj.map(item => {
        //         return item.PermissionName
        //     })
        // }else {
        //     this.checkedPermission = []
        // }
        this.isIndeterminate = false;
      },
      // 单选
      handleCheckedPermissionChange(value) {
        debugger
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.currentClickNodeRoleArr.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.currentClickNodeRoleArr.length;
      },
      // 保存
      save(){
        debugger
        if(!this.checkedPermission.length){
          return 
        }

        this.$emit("checkedPermission", this.checkedPermission[0])
        this.showRoleDailog = false
      },
      // 取消
      cancel(){
        this.showRoleDailog = false
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


