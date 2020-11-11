<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——许可权——许可权  配置页面 添加权限 组件 【企业】
-->
<!--
  User: gaol
  Date: 2019/10/15
  功能： 系统管控中的 权限引用列表 的 菜单树形结构组件
-->
<style lang="stylus" rel="stylesheet/stylus">
>>>.el-loading-mask
  top 0 !important
.menuTree-cmp
  padding 5px 5px 0 0
  //border-right 1px solid #E4E7ED
  box-sizing border-box
  .searchBox
    margin-bottom 10px
  .treeBox
    .el-tree
      height 400px !important
      overflow auto !important
</style>

<template>
  <div class="menuTree-cmp">
    <!-- selectedPermissionArr: {{selectedPermissionArr}} -->
    treeData: {{treeData}}
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

    <div class="treeBox" v-loading="treeLoading">
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
        :accordion="true" 
        :data="treeData"
        :props="defaultProps"
        default-expand-all
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

      <!-- <div class="buttons">
          <el-button @click="getCheckedNodes">通过 node 获取</el-button>
          <el-button @click="getCheckedKeys">通过 key 获取</el-button>
          <el-button @click="setCheckedNodes">通过 node 设置</el-button>
          <el-button @click="setCheckedKeys">通过 key 设置</el-button>
          <el-button @click="resetChecked">清空</el-button>
      </div>  -->
    </div>


    <div class="footerBox">
        <saver-footer @save="saveAdd" @cancel="cancelAdd"></saver-footer>
    </div>



    <!--权限弹框-start-->
    <!-- currentClickNodePermissionArr: {{currentClickNodePermissionArr}} -->
    <div v-if="showPermissionDailog" class="animated fadeIn">
        <el-dialog
            :title="currentTit"
            :visible.sync="showPermissionDailog"
            width="40%"
            append-to-body
            :close-on-click-modal="false"
        >
            <div class="permissionBox animated fadeIn" v-if="currentClickNodePermissionArr.length">
              <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
              <div style="margin: 15px 0;"></div>
              <!-- checkedPermission: {{checkedPermission}} -->
              <el-checkbox-group 
                :max="1"
                v-model="checkedPermission" 
                @change="handleCheckedPermissionChange">
                  <el-checkbox v-for="permission in currentClickNodePermissionArr" 
                      :label="permission" 
                      :key="permission.Id">{{permission.PermissionName}}</el-checkbox>
              </el-checkbox-group>  

              <saver-footer @save="save" @cancel="cancel"></saver-footer>
            </div>     

            <div :class="['hasNoPermission', 'animated', 'fadeIn']" v-else>
              <p class="tit center">该分类下暂无权限列表数据!</p>
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
      getComPermissionList,
      BatchAddComPermissionPackageConfig,
      BatchDelComPermissionPackageConfig
  } from '@/api/systemManage'
  let id = 1000
  export default {
    components: {
      SaverFooter
    },
    props: {

    },
    data() {
        return {
            treeData: [],
            filterText: '', 
            treeLoading: false, 
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            showPermissionDailog: false, //  控制显示/隐藏当前层级的 permission 弹框
            currentTit: '', // 当前弹框的 标题
            currentClickObj: {}, // 当前点击的节点对象
            currentClickNodePermissionArr: [], // 当前点击的节点对象的权限集合
            checkAll: false,
            checkedPermission: [],
            isIndeterminate: true,
            selectedPermissionArr: []          
        }
    },
    created () {
      // 获取树形结构的数据
      this._getComPermissionList()
    },
    watch: {
      filterText(val) {
        console.log(val)
        debugger
        this.$refs.tree.filter(val);
      }
    }, 
    methods: {
      // 初始化treeData
      _changeData(data ){
        debugger
        // let newData = []
        if(data && data.length){
          data.forEach((item, key) => {
            this.$set(item, 'id', item.Code)
            this.$set(item, 'label', item.Name)
            this.$set(item, 'children', item.Sub)
            this.$set(item, 'disabled', !item.IsPermission)
            if( item.Sub && item.Sub.length ){
              this._changeData(item.Sub)
            }       
          })
        }
      },
      // 获取树形结构数据
      _getComPermissionList(permissionName){
        debugger
        this.treeLoading = true
        getComPermissionList().then(res => {
          this.treeLoading = false
          if(res && res.data.State === REQ_OK){
            this.treeData = res.data.Data
            // changeData
            let resData = this._changeData(this.treeData)
            console.log(resData)
            // this.treeData = resData
          }else {
            this.$message({
              type: 'error',
              message: `获取树形组件的数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          // this.$message({
          //   type: 'warning',
          //   message: '获取树形组件的数据出错了'
          // })
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
      // 批量添加权限
      _BatchAddComPermissionPackageConfig(permissionPackageCode, strJson){
          debugger
        BatchAddComPermissionPackageConfig().then(res => {
            debugger
            if(res && res.data.State === REQ_OK){
                
            }else {
                this.$message.error(`批量添加权限失败,${res.data.Error}`)
            }
        })
      },
      _handlerData(data){
        data.forEach((item, key) => {
          if(item.IsPermission){
            this.selectedPermissionArr.push(item)
          }
          if(item.children && item.children.length){
            this._handlerData(item.children)
          }
        })
      },
      _filtData(data){
        this.selectedPermissionArr.forEach((item, key, arr) => {
          data.children.forEach((val, index) => {
            if(item.Code == val.Code){
              arr.splice(key,1)
            }
          })
        })
      },
      handleCheckChange(data, checked, indeterminate){
        debugger
        if(checked){
            // 勾选
            if(!data.IsPermission){
              // 是权限
              this.selectedPermissionArr.push(data)
            }else {
              if(data.children && data.children.length){
                this._handlerData(data.children)
              }
            }
        }else {
          // 取消勾选
          if(!data.IsPermission){
            // 是权限
            this.selectedPermissionArr = this.selectedPermissionArr.filter((item, key) => {
              return item.Code != data.Code
            })            
            if(data.children && data.children.length){
              this._filtData(data)
            }else {
              // 没有

            }
          }else {
            // 非权限
            if(data.children && data.children.length){
              this._filtData(data.children)
            }
          }
        }
      },
      //节点被点击
      handleNodeClick(data, a, b){
        debugger
        this.currentTit = data.Name
        this.currentClickObj = data
        this.currentClickNodePermissionArr = data.Permissions
        // this.showPermissionDailog = true
        if(data.IsPermission){
          // 点击的是权限 节点
        //   this.$emit("treeNodeClick", data)
        //   this.$emit("checkedPermission", data)
        }else {
          // 点击的是非 权限 节点
          console.log("点击的是非权限节点", data.Name)
          this.$notify({
            title: '提示',
            message: `"${data.Name}"为非权限的节点，请更换后查询`,
            duration: 2000
          })          
        }
      },
      saveAdd(){
          debugger
        this.$emit("addPermitSuccess", this.selectedPermissionArr)
      },  
      cancelAdd(){
        debugger
        this.$emit("closeAddDialog")
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
        this.checkedPermission = val ? this.currentClickNodePermissionArr : []
        // let checkedObj = val ? this.currentClickNodePermissionArr : [];
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
        this.checkAll = checkedCount === this.currentClickNodePermissionArr.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.currentClickNodePermissionArr.length;
      },
      // 保存
      save(){
        debugger
        if(!this.checkedPermission.length){
          return 
        }

        this.$emit("checkedPermission", this.checkedPermission[0])
        this.showPermissionDailog = false
      },
      // 取消
      cancel(){
        this.showPermissionDailog = false
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


