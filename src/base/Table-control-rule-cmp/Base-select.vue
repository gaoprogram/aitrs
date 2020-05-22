<!--
  User: gaol
  Date: 2019/5/14
  功能：单选下拉框 的通用 验证组件     currentRuleComponent(obj.ControlType)  obj.ControlType为 5
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <!-- obj: {{obj}} -->
    <!-- obj.DataSource: {{obj.DataSource}} -->
    <!-- obj.FieldCode: {{obj.FieldCode}} -->
    <!-- obj.TableCode: {{obj.TableCode}} -->
    <!-- initDetailParentIds: {{initDetailParentIds}} -->
    <!-- ----
    obj.FieldValue.parentIds: {{obj.FieldValue.parentIds}} -->
    <!---业务领域下拉框选项 start-->
    <el-select
      v-if="obj.DataSource === 'GetBusinessAreaList'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      filterable
      clearable
      :disabled="false"
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.BusinessAreaCode"
        :label="item.Name"
        :value="item.BusinessAreaCode">
      </el-option>
    </el-select>
    <span style="font-size: 12px;color: #dedede" v-if="obj.DataSource === 'GetBusinessAreaList'">业务领域只可设置一次，不能修改</span>
    <!---业务领域下拉框选项- end-->



    <!--subFlowStartParas为，“选择启动字段” 下拉选项框--start-->
    <!-- ruleId:{{ruleId}} 
    nodeId: {{nodeId}} -->
    <!-- obj.FieldValue.parentIds: {{obj.FieldValue.parentIds}} 
    obj.DataSource： {{obj.DataSource}}  -->
    <!-- dataSource: {{dataSource}}  -->

    <!---为getFieldList类型的下拉框 且 【不是】 支流中的选择启动方式 下拉框------start--->
    <el-select
      v-if="obj.DataSource === 'GetFieldList' &&　obj.FieldCode !== 'SubFlowStartParas'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
      filterable
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.FieldCode"
        :label="item.FieldName"
        :value="item.FieldCode">
      </el-option>
    </el-select>
    <!---为getFieldList类型的下拉框 且 【不是】 支流中的选择启动方式 下拉框------end--->


    <!--节点设置-流转-支流页面--【选择启动字段】 下拉框 value 需要绑定为 TableCode.FieldCode的形式--start-->
    <!-- -- obj.DataSource: {{obj.DataSource}} ---
    obj.FieldValue： {{obj.FieldValue}}
    ------obj.FieldValue.parentIds： {{obj.FieldValue.parentIds}}-----
    obj.FieldCode: {{obj.FieldCode}} -->
    <!-- SubFlowStartParasDataSource: {{SubFlowStartParasDataSource}} -->
    <el-select
      v-if="obj.DataSource === 'GetFieldList' &&　obj.FieldCode === 'SubFlowStartParas'"
      v-model="obj.FieldValue.parentIds"
      @change="subFlowStartParasChange"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
      filterable
      size="mini"
    >
      <el-option
        v-for="(item, key) in SubFlowStartParasDataSource"
        :key="item.FieldCode"
        :label="item.FieldName"
        :value="item.TableCode +'.' + item.FieldCode">
      </el-option>
    </el-select>
    <!--节点设置-流转-支流页面--【选择启动字段】 下拉框  value 需要绑定为 TableCode.FieldCode的形式--end-->


    <!-- detailTableDataSource: {{detailTableDataSource}} -->
    <!--节点设置-流转-支流- 中选择的 【选择明细表】--start--->  
    <el-select
      v-if="obj.DataSource === 'GetMainAndDetailTables' && obj.FieldCode === 'DetailTableCode'"
      class="GetMainAndDetailTablesField"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      @change="detailChange"
      style="width: 300px"
      clearable
      filterable
      size="mini"
    >
      <el-option
        v-for="(item,key) in detailTableDataSource"
        :key="item.TableCode + item.TableName + key"
        :label="item.TableName"
        :value="item.mainTableCode + '.' + item.TableCode">
      </el-option>
    </el-select>    
    <!--节点设置-流转-支流--中选择的 【选择明细表】-end--->  



    <!-- obj.DSType: {{obj.DSType}} -->
    <!--字段的配置项 单选下拉框一级---start--->
    <el-select
      v-if="obj.DSType === 'Local'"
      @change="changeParent(1)"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 145px"
      clearable
      filterable
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>
    <!--字段的配置项 单选下拉框一级---end--->


     <!--字段的配置项-单选下拉框二级--start--->
     <!-- obj.FieldValue.childIds: {{obj.FieldValue.childIds}} -->
    <el-select
      v-if="obj.DSType === 'Local' && childSource.length"
      v-model="obj.FieldValue.childIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 150px"
      clearable
      filterable
      size="mini"
    >
      <el-option
        v-for="item in childSource"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>
     <!--字段的配置项--单选下拉框二级-end--->

    <!--流程设置中的流转异常中的 提交到指定节点 ----START--->
    <!-- DataSource {{DataSource}}
    obj.FieldValue.parentIds: {{obj.FieldValue.parentIds}} -->
    <!-- obj.DSType: {{obj.DSType}} -->
    <el-select
      v-if="obj.DataSource === 'GetNodeList' || obj.dataSource === 'SubFlowStartWay'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
      filterable
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.NodeId"
        :label="item.Name"
        :value="'' + item.NodeId">
      </el-option>
    </el-select>
    <!--流程设置中的流转异常中的 提交到指定节点 ----end--->
   

    <!--节点设置下的，节点下拉选项框-还有一些 其他的比如getNodeList流程设置中的流转异常中的 提交到指定节点 等-start-->
    <el-select
      v-if="obj.DataSource !== 'GetNodeList' 
      && obj.DataSource !== 'GetBusinessAreaList' 
      && obj.DSType !== 'Local' 
      && obj.DataSource !== 'GetFieldList'
      && obj.DataSource !== 'GetMainAndDetailTables'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      @change="SubFlowStartWayChange"
      clearable
      filterable
      size="mini"
    >
      <el-option
        v-for="item in currentSource"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>
    <!--节点设置下的，节点下拉选项框-还有一些 其他的比如getNodeList流程设置中的流转异常中的 提交到指定节点 等-end-->


  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
  import { getBusinessAreaList, getNodeList, getFieldList, getMainAndDetailTables, getConditionFields,  GetNodeTributaryAttr } from '@/api/approve'
  export default {
    props: {
      prop: {
        type: String,
        default: ''
      },
      orderProp: {
        type: String,
        default: ''
      },
      fieldProp: {
        type: String,
        default: ''
      },
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      currentFields: {
        typr: Array,
        default: () => {
          return []
        }
      },
      // flowId: {
      //   type: [Number, String],
      //   default: 0
      // },
      nodeId: {
        type: [String, Number],
        default: 0
      },
      roleRange: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // ...mapGetters([
      //   'nodeObjStore'
      // ])
    },
    data () {
      // 验证规则
      let validatePass = (rule, value, callback) => {
        debugger

        if (this.obj.DataSource === 'GetBusinessAreaList') {
          // 如果是 业务领域下拉选项的校验
          if (this.dataSource) {
            if (!this.dataSource.length) {
                // 业务领域存在 但是 dataSource 为空（获取业务领域接口时，返回的业务领域为空，需要重新配置表单）
              callback(new Error(this.obj.FieldName + '所关联的字段范围无数据，请重新配置表单'))
            } else if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
              // 需要校验，并且 this.obj.FieldValue.parentIds 为空
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else {
              callback()
            }
          }
        } else if (this.obj.DataSource === 'GetFieldList' && this.obj.FieldCode !== 'SubFlowStartParas') {
          // 节点设置——流转——支流 里面的 “选择启动字段”
          if (this.dataSource) {
            if (!this.dataSource.length) {
                // 业务领域存在 但是 dataSource 为空（获取业务领域接口时，返回的业务领域为空，需要重新配置表单）
              callback(new Error(this.obj.FieldName + '所关联的字段范围无数据，请重新配置表单'))
            } else if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
              // 需要校验，并且 this.obj.FieldValue.parentIds 为空
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else {
              callback()
            }
          }
        } else if (this.obj.DataSource === 'GetNodeList') {
            // 节点设置——流转——支流 里面的 “选择启动字段”
          if (this.dataSource) {
            if (!this.dataSource.length) {
                  // 业务领域存在 但是 dataSource 为空（获取业务领域接口时，返回的业务领域为空，需要重新配置表单）
              callback(new Error(this.obj.FieldName + '所关联的字段范围无数据，请重新配置表单'))
            } else if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
                // 需要校验，并且 this.obj.FieldValue.parentIds 为空
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else {
              callback()
            }
          }
        } else {
          // 非业务领域的校验
          if( this.obj.Role ){
            // 流转中的 发起  和 待办 中的表单字段 分组字段 明细表字段 只有 是 读写权限时 才去校验
            if( this.obj.Role === 2 ){
              // Role 1 只读  2 读写 4 隐藏   只有 是读写时 才需要 进行 校验
              if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
                callback(new Error(this.obj.FieldName + '不能为空'))
              } else {
                callback()
              }
            }else {
              callback()
            }   
          }else {
            if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else {
              callback()
            }                 
          }
        }
      }

      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: ['change', 'blur']
          // type: 'String'
        },
        dataSource: [],     // option 的下拉选项
        detailTableDataSource: [],  // 支流中 选择明细表 下拉选项的list集合
        SubFlowStartParasDataSource: [],  // 支流中，选择启动字段 的list集合
        childSource: [],
        currentSource: [],
        isOneChange: false,  // 控制 流程设置中的 业务领域选取的次数，只能设置一次
        ind: 0,
        flowId: '',   // 流id


        initDetailParentIds: '',  // 支流页面 初始时，将 选择明细表的 parentIds 存起来
      }
    },
    created () {
      this.$nextTick(() => {
        try {
          this.flowId = this.$route.query.flowId
        } catch (error) {
  
        }
        debugger
        console.log("打印this.obj.FieldValue.parentIds",this.obj.FieldValue.parentIds)

        if (this.obj.DataSource === 'GetBusinessAreaList') {
          if (this.obj.FieldValue.parentIds) {
            // 如果 为真，就只能设置一次
            this.isOneChange = true
          }
          this._getBusinessAreaList()
          return
        }
        
        if (this.obj.DataSource === 'GetNodeList') {
          this._getNodeList()
          return
        }  

        if( this.obj.FieldCode !== 'SubFlowStartParas'  ){
          this._getFieldList()
          debugger
          // 是支流页面中的 “支流启动方式” 下拉框
          // 此时需要看 支流页面中 “支流启动方式”  是否是 【按明细表启动】 还是【按指定的字段启动】
        }      
        
        if( this.obj.DataSource === 'SubFlowStartWay' && this.obj.FieldCode === 'SubFlowStartWay' ){
          this._getFieldList()
          if( this.obj.FieldValue.parentIds === '1' ){
            debugger
            // 按指定字段启动时  获取 【选择启动字段】 下拉框的list 数据源 SubFlowStartParasDataSource
              this.$bus.$emit("initMainTableField")
          }else if( this.obj.FieldValue.parentIds === '2'){
            // 按明细表启动时，  触发 【选择明细表】 组件的事件  
            this.$bus.$emit("initDetailTable")
          }
          debugger
        }
        
        
        // if( this.obj.DataSource === 'GetMainAndDetailTables' && this.obj.FieldCode === 'DetailTableCode' ){
        //   debugger
        //   this._getMainAndDetailTablesList().then(res => {
        //     this.detailTableDataSource = res
        //     // this.obj.FieldValue.parentIds = val
        //     console.log("345555555555555--minxbiaolist-----", res)
        //     // 触发 【选择启动字段】 组件
        //     // this.$bus.$emit("initOnlyStartParas", val)              
        //   })
        // }      

        debugger
        // 普通的 下拉框
        this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
        
      })


      //初始化时 按指定的字段启动后 触发  选择启动字段的组件
      this.$bus.$on("initMainTableField", () => {
        debugger
        // 选择启动字段
        if(this.obj.DataSource === 'GetFieldList' && this.obj.FieldCode === 'SubFlowStartParas'){
          let val = ''
          this.$message.success("选择了initMainTableField 按指定的字段启动后 触发  选择启动字段的组件成功")          
          this._getNodeTributaryAttr().then(res => {
            debugger
            try{
              let nodeAttrList_storage = JSON.parse(sessionStorage.getItem("branches_nodeAttrList"))
              if(nodeAttrList_storage && nodeAttrList_storage.length){
                nodeAttrList_storage.forEach((item) => {
                  if( item.FieldCode === 'SubFlowStartParas' && item.DataSource === 'GetFieldList'){
                    val = item.FieldValue.parentIds
                    return false
                  }
                })
              }
            }catch(error){

            }        

            this.SubFlowStartParasDataSource = []
            this.obj.FieldValue.parentIds = ''
            this._getFieldList().then(res => {
              console.log("_getFieldList 返回的值res", res)
              this.SubFlowStartParasDataSource = res
              this.obj.FieldValue.parentIds = val
            })  
          })
        }         
      })  

      // 初始化时 按明细表启动后  触发  明细表 的组件 
      this.$bus.$on("initDetailTable", () => {
        debugger
        if( this.obj.DataSource === 'GetMainAndDetailTables' && this.obj.FieldCode === 'DetailTableCode' ){
          debugger
          let val = ''
          // 重新调一遍 getNodeTributaryAttr
          this._getNodeTributaryAttr().then(res => {
            debugger
            try{
              let nodeAttrList_storage = JSON.parse(sessionStorage.getItem("branches_nodeAttrList"))
              if(nodeAttrList_storage && nodeAttrList_storage.length){
                nodeAttrList_storage.forEach((item) => {
                  if( item.FieldCode === 'DetailTableCode' && item.DataSource === 'GetMainAndDetailTables'){
                    val = item.FieldValue.parentIds
                    return false
                  }
                })
              }
            }catch(error){

            }

            this.detailTableDataSource = []
            this._getMainAndDetailTablesList().then(res => {
              this.detailTableDataSource = res
              this.obj.FieldValue.parentIds = val
              console.log("345555555555555--minxbiaolist-----", res)
              // 触发 【选择启动字段】 组件
              this.$bus.$emit("initOnlyStartParas", val)              
            })
          })
        }
      })

      // 选择了 按指定的字段启动后 触发  选择启动字段的组件
      this.$bus.$on("emitMainTableField", () => {
        debugger
        // 选择启动字段
        if(this.obj.DataSource === 'GetFieldList' && this.obj.FieldCode === 'SubFlowStartParas'){
          let val = ''
          // this.$message.success("选择了 按指定的字段启动后 触发  选择启动字段的组件成功")          
          this._getNodeTributaryAttr().then(res => {
            debugger
            try{
              let nodeAttrList_storage = JSON.parse(sessionStorage.getItem("branches_nodeAttrList"))
              if(nodeAttrList_storage && nodeAttrList_storage.length){
                nodeAttrList_storage.forEach((item) => {
                  if( item.FieldCode === 'SubFlowStartParas' && item.DataSource === 'GetFieldList'){
                    val = item.FieldValue.parentIds
                    // 清空  选择启动字段的 parentIds
                    item.FieldValue.parentIds = ''
                    return false
                  }
                })
              }
            }catch(error){

            }        

            this.SubFlowStartParasDataSource = []
            this.obj.FieldValue.parentIds = ''
            this._getFieldList().then(res => {
              console.log("_getFieldList 返回的值res", res)
              this.SubFlowStartParasDataSource = res
            })  
          })
        }         
      })   


      // 选择了  按明细表启动后  触发  明细表 的组件 
      this.$bus.$on("emitDetailTable", () => {
        debugger
        if( this.obj.DataSource === 'GetMainAndDetailTables' && this.obj.FieldCode === 'DetailTableCode' ){
          debugger
          let val = ''
          // 重新调一遍 getNodeTributaryAttr
          this._getNodeTributaryAttr().then(res => {
            debugger
            try{
              let nodeAttrList_storage = JSON.parse(sessionStorage.getItem("branches_nodeAttrList"))
              if(nodeAttrList_storage && nodeAttrList_storage.length){
                nodeAttrList_storage.forEach((item) => {
                  if( item.FieldCode === 'DetailTableCode' && item.DataSource === 'GetMainAndDetailTables'){
                    val = item.FieldValue.parentIds
                    // 清空 parentids
                    item.FieldValue.parentIds = ''
                    return false
                  }
                })
              }
            }catch(error){

            }
            this.obj.FieldValue.parentIds = ''
            this.detailTableDataSource = []
            this._getMainAndDetailTablesList().then(res => {
              this.detailTableDataSource = res
              // 触发 【选择启动字段】 组件
              this.$bus.$emit("emitOnlyStartParas", val)              
            })
          })
        }
      })      
      


      // 初始化时 明细表触发 【选择启动字段】的组件
      this.$bus.$on("initOnlyStartParas", (tableCode) => {
        debugger
        if( this.obj.DataSource ==='GetFieldList' && this.obj.FieldCode ==='SubFlowStartParas' ){
          let val = ''
          this._getNodeTributaryAttr().then(res => {
            debugger
            try{
              let nodeAttrList_storage = JSON.parse(sessionStorage.getItem("branches_nodeAttrList"))
              if(nodeAttrList_storage && nodeAttrList_storage.length){
                nodeAttrList_storage.forEach((item) => {
                  if( item.FieldCode === 'SubFlowStartParas' && item.DataSource === 'GetFieldList'){
                    val = item.FieldValue.parentIds
                    return false
                  }
                })
              }
            }catch(error){

            }          
            // 选择启动字段  清除绑定的value值和 下拉list选项
            this.SubFlowStartParasDataSource = []    
            let detailTableCode = ''
            // 将tableCode 进行 截取，因为 tableCode 的形式是 主表code.明细表code
            if(tableCode){
              detailTableCode = tableCode.split(".")[1]
              debugger
              this._getSubFlowStartParasDataSource(detailTableCode).then(res => {
                this.SubFlowStartParasDataSource = res
                this.obj.FieldValue.parentIds = val
                console.log("mingx表触发的 选择启动字段事件后 获取的val", val)
                console.log("mingx表触发的 选择启动字段事件后 获取的this.SubFlowStartParasDataSource 与 val", this.SubFlowStartParasDataSource, val)
              })
            }else {
              console.log("initOnlyStartParas 事件中tableCode为空")
            } 
          })                    
        }
      })

      // 选择了明细表后，触发 【选择启动字段】的组件
      this.$bus.$on("emitOnlyStartParas", (tableCode) => {
        debugger
        if( this.obj.DataSource ==='GetFieldList' && this.obj.FieldCode ==='SubFlowStartParas' ){
          let val = ''
          this._getNodeTributaryAttr().then(res => {
            debugger
            try{
              let nodeAttrList_storage = JSON.parse(sessionStorage.getItem("branches_nodeAttrList"))
              if(nodeAttrList_storage && nodeAttrList_storage.length){
                nodeAttrList_storage.forEach((item) => {
                  if( item.FieldCode === 'SubFlowStartParas' && item.DataSource === 'GetFieldList'){
                    val = item.FieldValue.parentIds
                    // 清空 parantIds
                    item.FieldValue.parentIds = ''
                    return false
                  }
                })
              }
            }catch(error){

            }          
            // 选择启动字段  清除绑定的value值和 下拉list选项
            this.SubFlowStartParasDataSource = []    
            this.obj.FieldValue.parentIds = ''
            let detailTableCode = ''
            // 将tableCode 进行 截取，因为 tableCode 的形式是 主表code.明细表code
            if(tableCode){
              detailTableCode = tableCode.split(".")[1]
              debugger
              this._getSubFlowStartParasDataSource(detailTableCode).then(res => {
                this.SubFlowStartParasDataSource = res
                console.log("mingx表触发的 选择启动字段事件后 获取的val", val)
                console.log("mingx表触发的 选择启动字段事件后 获取的this.SubFlowStartParasDataSource 与 val", this.SubFlowStartParasDataSource, val)
              })
            }else {
              console.log("emitOnlyStartParas 事件中tableCode为空")
            } 
          })                    
        }
      })      
    },
    mounted () {
      debugger     
    },
    beforeDestroy() {
      this.$bus.$off("emitMainTableField")
      this.$bus.$off("emitDetailTable")
      this.$bus.$off("emitOnlyStartParas")
      this.$bus.$off("initOnlyStartParas")
      this.$bus.$off("initMainTableField")
      this.$bus.$off("initDetailTable")
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去，利用的是数据的双向绑定，父组件通过 .sync 向子组件传值，此方法会实现数据的双向绑定
          this.$emit('update:obj', newValue)
        },
        deep: true
      },
      'obj.TableCode': {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          if (this.obj.DataSource === 'GetBusinessAreaList') {
            if (this.obj.FieldValue.parentIds) {
              this.isOneChange = true
            }
            // 获取业务领域数据
            this._getBusinessAreaList()
            return
          }

          if (this.obj.DataSource === 'GetNodeList') {
            // 获取节点数据
            this._getNodeList()
            return
          }

          // 节点设置——流转——支流 中的 “选择启动字段” 下拉框选项
          if (this.obj.DataSource === 'GetFieldList') {
            // 获取 选择启动字段数据
            this._getFieldList()
          }

          // 获取字典数据
          this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
        },
        deep: true
      },
      currentFields: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          if (this.obj.DSType !== 'Local' && this.dataSource.length && this.obj.Depend) {
            this.currentFields.forEach(item => {
              if (this.obj.Depend === item.FieldCode) {
                let value = item.FieldValue.parentIds
                if (typeof (value) === 'string') {
                  this.currentSource = this.dataSource.filter(i => {
                    return i.PCode === value
                  })
                  if (!this.currentSource.length) this.obj.FieldValue = ''
                } else if (Array.isArray(value) && value.length) {
                  this.currentSource = this.dataSource.filter(i => {
                    return value.includes(i.PCode)
                  })
                  if (!this.currentSource.length) this.obj.FieldValue = ''
                } else {
                  this.obj.FieldValue = ''
                  this.currentSource = []
                }
              }
            })
          }
        },
        deep: true
      }
    },
    methods: {
      _getNodeTributaryAttr () {
        debugger
        return new Promise((resolve, reject) => {
          GetNodeTributaryAttr(this.nodeId, this.roleRange).then(res => {
            debugger
            if (res.data.State === REQ_OK) {
              debugger

              // 将获取的nodeAttrList 存入sessionStorage中
              sessionStorage.setItem("branches_nodeAttrList", JSON.stringify(res.data.Data.Fields))

              debugger
              console.log("切换 按指定字段/明细表 后重新获取的 res.data.Data.Fields", res.data.Data.Fields)
              resolve(res.data.Data.Fields)
            } else {
              this.$message.error(`获取节点属性失败，请重试,${res.data.Error}`)
            }
          }).catch(() => {
            this.$message.error('获取节点属性失败，请重试')
          })
        })
      },      
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        console.log('dicType', dicType)
        // 如果是自定义字典表，取opt里面数据
        if (this.obj.DSType === 'Local') {
          if (!this.obj.Ext.LimitOpt.length) return
          if (this.obj.Ext.DefaultOpt.length) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt.toString()
          }
          this.obj.Ext.LimitOpt.forEach(item => {
            this.obj.Ext.Opt.forEach(i => {
              if (item === i.Code) {
                this.dataSource.push(i)
              }
            })
          })
          // 获取二级数据源
          this.changeParent()
        } else {
          if (!this.obj.FieldValue.parentIds && this.obj.FieldValue.parentIds !== 0) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt.toString()
          }
          // 获取数据字典
          getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
            debugger
            if (res.data.State === REQ_OK) {
              if (res.data.Data.length) {
                if (this.obj.Ext.LimitOpt.length) {
                  this.obj.Ext.LimitOpt.forEach(item => {
                    res.data.Data.forEach(i => {
                      if (item === i.Code) {
                        this.dataSource.push(i)
                      }
                    })
                  })
                } else {
                  this.dataSource = res.data.Data
                }

                if (!this.dataSource.length) return

                if (this.obj.Depend) {
                  debugger
                  this.currentFields.forEach(item => {
                    if (this.obj.Depend === item.FieldCode) {
                      let value = item.FieldValue.parentIds
                      if (typeof (value) === 'string') {
                        this.currentSource = this.dataSource.filter(i => {
                          return i.PCode === value
                        })
                        if (!this.currentSource.length) this.obj.FieldValue.parentIds = ''
                      } else if (Array.isArray(value) && value.length) {
                        this.currentSource = this.dataSource.filter(i => {
                          return value.includes(i.PCode)
                        })
                        if (!this.currentSource.length) this.obj.FieldValue.parentIds = ''
                      } else {
                        this.obj.FieldValue.parentIds = ''
                        this.currentSource = []
                      }
                    }
                  })
                } else {
                  debugger
                  this.currentSource = [...this.dataSource]
                }
              }
            }
          })
        }
      },
      // 获取业务领域集合
      _getBusinessAreaList () {
        getBusinessAreaList().then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.dataSource = res.data.Data
          }
        })
      },
      // 获取节点集合
      _getNodeList () {
        getNodeList('', this.flowId).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.dataSource = res.data.Data
          }
        })
      },
      _getFieldList () {
        debugger
        return new Promise((resolve, reject) => {
          getFieldList(this.flowId, this.nodeId).then(res => {
            if (res.data.State === REQ_OK) {
              debugger
              this.dataSource = res.data.Data
              // // 因为 按指定字段启动时，获取 启动字段集合 是调取的 getFieldList 接口 而 按明细表启动时 获取启动字段的集合是调取的 getConditionFields 接口
              // this.SubFlowStartParasDataSource = res.data.Data
              // console.log("345fjgkfjgkfjgkfjkgjfkgjfk", this.SubFlowStartParasDataSource)
            }
            resolve(res.data.Data)
          }) 
        })
      },
      // 按明细表启动时，获取 启动字段集合
      _getSubFlowStartParasDataSource(tableCode) {
        debugger
        return new Promise ((resolve, reject) => {
          getConditionFields(tableCode).then(res => {
            if (res.data.State === REQ_OK) {
              debugger
              this.SubFlowStartParasDataSource = res.data.Data
              console.log(4844444848484848484848)
            }
            resolve(res.data.Data)
          })   
        })     
      },

      // 获取 选择明细表select 下拉框的选项list
      _getMainAndDetailTablesList () {
        debugger
        return new Promise((resolve, reject) => {
          getMainAndDetailTables(this.flowId).then(res => {
            debugger
            let detailTables = []
            if( res.data.Data && res.data.Data.MainTables ){
              let MainTables = res.data.Data.MainTables
              if( MainTables.length ){
                MainTables.forEach((item,key) => {
                  if( item.DetailTables && item.DetailTables.length ){
                    item.DetailTables.forEach((i,k) => {
                      i.mainTableCode = item.TableCode
                      i.mainTableName = item.TableName
                      detailTables.push(i)
                      if( key === MainTables.length-1 && k === MainTables[key].DetailTables.length-1){
                        this.detailTableDataSource = detailTables
                        resolve(detailTables)
                      }
                    })
                  }
                })
              }
            }
          })
        })
      },
      // 按照 明细表启动时， 选择字段启动项时，获取下拉框选项list

      // 改变父下拉框值
      changeParent (type) {
        this.childSource = []
        if( type === 1){
          this.obj.FieldValue.childIds = ''
        }
        // type 值为 表示 是初始进入时 还是 手动改动了 第一级 后触发的二级的改变
        if (this.obj.Ext.Opt && this.obj.Ext.Opt.length) {
          this.obj.Ext.Opt.forEach(item => {
            if (item.Code === this.obj.FieldValue.parentIds) {
              if (item.Child.length) {
                this.childSource = item.Child
              } else {
                this.childSource = []
              }
            }
          })
        }
      },

      // 支流页面 改变 【支流启动方式】
      SubFlowStartWayChange () {
        debugger
        if(this.obj.DataSource ==='SubFlowStartWay' && this.obj.FieldCode ==='SubFlowStartWay'){
          debugger
          let val = this.obj.FieldValue.parentIds
          if( val){
            if(val === '0'){
              // ‘支流启动方式’ 的值是： 不启用，则触发  支流页面 branches.vue中 的 notBoot 事件
              this.$emit('notBoot', true, val)
            }else if( val ==='1' ){
              debugger
              // 触发  支流页面 branches.vue 中的 notBoot事件
              this.$emit('notBoot', false, val)              
              debugger
              // 支流启动方式——【按指定字段启动】 触发 【选择启动字段】的事件
              this.$bus.$emit("emitMainTableField")
            }else if(val === '2'){
              debugger
              // 触发  支流页面 branches.vue 中的 notBoot事件
              this.$emit('notBoot', false, val)                  
              debugger
              // 支流启动方式——【按明细表启动】触发 【选择明细表】的事件
              this.$bus.$emit("emitDetailTable")
            }
          }
        }
      },

      // 支流页面 改变 【选择明细表】 
      detailChange() {
        debugger
        // 触发  【选择启动字段】 事件
        let val = this.obj.FieldValue.parentIds   
        this.$bus.$emit("emitOnlyStartParas", val)
      },

      // 支流页面改变 【选择启动字段】
      subFlowStartParasChange() {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
