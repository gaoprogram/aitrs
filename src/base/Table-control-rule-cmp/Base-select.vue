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

    <!---为getFieldList类型的下拉框 且 不是 支流中的 【选择启动方式】 下拉框------start--->
    <el-select
      v-if="obj.DataSource === 'GetFieldList' &&　obj.FieldCode !== 'SubFlowStartParas'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.FieldCode"
        :label="item.FieldName"
        :value="item.FieldCode">
      </el-option>
    </el-select>
    <!---为getFieldList类型的下拉框 且 不是 支流中的 【选择启动方式】 下拉框------end--->


    <!--节点设置-流转-支流页面--【选择启动字段】 下拉框 value 需要绑定为 TableCode.FieldCode的形式--start-->
    <!-- dataSource： {{dataSource}} -->
    <!-- ------------{{obj.FieldValue.parentIds}} -->
    <!-- SubFlowStartParasDataSource: {{SubFlowStartParasDataSource}} -->
    <el-select
      v-if="obj.DataSource === 'GetFieldList' &&　obj.FieldCode === 'SubFlowStartParas'"
      v-model="obj.FieldValue"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
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
      style="width: 300px"
      clearable
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
    <!--字段的配置项---start--->
    <el-select
      v-if="obj.DSType === 'Local'"
      @change="changeParent"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 145px"
      clearable
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>
    <!--字段的配置项---end--->


     <!--字段的配置项---start--->
    <el-select
      v-if="obj.DSType === 'Local' && childSource.length"
      v-model="obj.FieldValue.childIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 150px"
      clearable
      size="mini"
    >
      <el-option
        v-for="item in childSource"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>
     <!--字段的配置项---end--->

    <!--流程设置中的流转异常中的 提交到指定节点 ----START--->
    <!-- dataSource： {{dataSource}} -->
    <!-- obj.FieldValue.parentIds: {{obj.FieldValue.parentIds}} -->
    <!-- obj.DSType: {{obj.DSType}} -->
    <el-select
      v-if="obj.DataSource === 'GetNodeList' || obj.dataSource === 'SubFlowStartWay'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
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
      clearable
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
  import { getBusinessAreaList, getNodeList, getFieldList, getMainAndDetailTables, getConditionFields } from '@/api/approve'

  export default {
    props: {
      prop: {
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
      }
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
          if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else {
            callback()
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

        // console.log(!this.obj.FieldValue.parentIds)

        // console.log(this.obj.orderProp)
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

        if( this.obj.DataSource === 'GetMainAndDetailTables' && this.obj.FieldCode === 'DetailTableCode' ){
          // 支流页面中 选择明细表的select下拉框
          this._getMainAndDetailTablesList().then(() => {
            debugger
            this.initDetailParentIds = this.obj.FieldValue.parentIds
            // 获取 选择启动字段的下拉选项
            // 触发 选择启动字段
            this.$bus.$emit("emitOnlyStartParas", this.initDetailParentIds)
          })
          return 
        }        

        if( this.obj.FieldCode !== 'SubFlowStartParas'  ){
          debugger
          // 不是支流页面中的  “选择启动字段” 下拉框
          // 获取下拉框list数据源
          this._getFieldList()
        }else {
          debugger
          // 是支流页面中的 “选择启动字段” 下拉框
          // 此时需要看 支流页面中 “支流启动方式”  是否是 【按明细表启动】 还是【按指定的字段启动】
          if( this.obj.DataSource === 'SubFlowStartWay' && this.obj.FieldCode === 'SubFlowStartWay' ){
            if( this.obj.FieldValue.parentIds === '1' ){
              debugger
              // 按指定字段启动时  获取 【选择启动字段】 下拉框的list 数据源 SubFlowStartParasDataSource
              this._getFieldList()
            }else if( this.obj.FieldValue.parentIds === '2'){
              // 按明细表启动时，  触发 【选择明细表】 和 【选择启动字段】 两个下拉框组件的事件  
              this.$bus.$emit("emitDetailTableFieldAndStartParas")
            }
          }
          return
        }

        debugger
        // 普通的 下拉框
        this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
      })
    },
    mounted () {
      debugger     
      this.$bus.$on("cleanList", ()=>{
        this.SubFlowStartParasDataSource = []
        this.obj.FieldValue.parentIds = ''
      })
      // 初始时， 按明细表启动, 触发 选择明细表组件 事件
      // this.$bus.$on("emitDetailTableField", () => {
      //   if(this.obj.DataSource === 'GetMainAndDetailTables' && this.obj.FieldCode === 'DetailTableCode'){
      //     this.$bus.$emit("emitOnlyStartParas", this.obj.FieldValue.parentIds)
      //   }
      // })

      // 选择了 按指定的字段启动后 触发  选择启动字段的组件
      this.$bus.$on("emitMainTableField", () => {
        debugger
        // 选择启动字段
        if(this.obj.DataSource === 'GetFieldList' && this.obj.FieldCode === 'SubFlowStartParas'){
          this.SubFlowStartParasDataSource = []
          this.obj.FieldValue.parentIds = ''
          this._getFieldList().then(res => {
          })  
        }         
      })   
      
      // 选择了明细表后，触发 选择启动字段的组件
      this.$bus.$on("emitOnlyStartParas", (tableCode) => {
        debugger
        if( this.obj.DataSource ==='GetFieldList' && this.obj.FieldCode ==='SubFlowStartParas' ){
          // 选择启动字段  清除绑定的value值和 下拉list选项
          // this.SubFlowStartParasDataSource = []    
          this.obj.FieldValue.parentIds = ''
          let detailTableCode = ''
          // 将tableCode 进行 截取，因为 tableCode 的形式是 主表code.明细表code
          if(tableCode){
            detailTableCode = tableCode.split(".")[1]
            debugger
            this._getSubFlowStartParasDataSource(detailTableCode)
          }else {
            console.log("emitOnlyStartParas 事件中tableCode为空")
          }            
        }
      })
      
      // 触发 选择明细表 和 选择启动字段一起
      this.$bus.$on("emitDetailTableFieldAndStartParas", (tableCode) => {
        debugger
        let detailCode = ''
        if( this.obj.DataSource === 'GetMainAndDetailTables' && this.obj.FieldCode ==='DetailTableCode'){
          // 选择明细表下拉框  清空绑定的value值
          if( !tableCode ){
            detailCode = this.obj.FieldValue.parentIds
          }
          this._getSubFlowStartParasDataSource(this.obj.FieldValue.parentIds.split(".")[1])
          // this.$bus.$emit("emitOnlyStartParas", this.obj.FieldValue.parentIds)

          this.obj.FieldValue.parentIds =''
          this._getMainAndDetailTablesList()
          // 触发  获取 选择启动字段 数据源  
          // this._getSubFlowStartParasDataSource(detailCode.split(".")[1])
        }
        
        if(this.obj.DataSource ==='GetFieldList' && this.obj.FieldCode ==='SubFlowStartParas'){
          // 选择启动字段  清除绑定的value值和 下拉list选项
          // this.SubFlowStartParasDataSource = []    
          this.obj.FieldValue.parentIds = ''
          let detailTableCode = ''
          // 将tableCode 进行 截取，因为 tableCode 的形式是 主表code.明细表code
          if(tableCode){
            detailTableCode = tableCode.split(".")[1]
            this._getSubFlowStartParasDataSource(detailTableCode)
          }else {
            detailTableCode = detailCode.split(".")[1]
            this._getSubFlowStartParasDataSource(detailTableCode)
            // console.log("emitDetailTableFieldAndStartParas 事件中tableCode为空")
          }
        }
      })
    },
    beforeDestroy() {
      this.$bus.$off("emitMainTableField")
      this.$bus.$off("emitOnlyStartParas")
      this.$bus.$off("emitDetailTableFieldAndStartParas")
      this.$bus.$off("emitDetailTableField")
      this.$bus.$off("cleanList")
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
      },
      'obj.FieldValue.parentIds': {
        // 节点设置——直流中 若支流启动方式 设置的 不启动，则之后的 表单都将不显示
        handler (newValue, oldValue) {
          if (this.obj.DataSource === 'SubFlowStartWay' && this.obj.FieldCode === 'SubFlowStartWay') {
            // 'SubFlowStartWay' 支流启动方式
            debugger
            if (this.obj.FieldValue.parentIds === '0') {
              // ‘支流启动方式’ 的值是： 不启用，则触发  支流页面 branches.vue中 的 notBoot 事件
              this.$emit('notBoot', true, this.obj.FieldValue.parentIds)
            } else {
              debugger
              // 触发  支流页面 branches.vue 中的 notBoot事件
              this.$emit('notBoot', false, this.obj.FieldValue.parentIds)
              if( this.obj.FieldValue.parentIds === '1'){
                debugger
                // 选择的是  按照指定的字段启动
                // 触发兄弟select 组件【选择启动字段】 重新进行 下拉list 的获取         
                this.$bus.$emit('emitMainTableField')
              }else if ( this.obj.FieldValue.parentIds === '2'){
                debugger
                // 支流启动方式，选择的是 ‘按明细表启动’
                // 此时要清空 启动方式的字段
                // 触发兄弟select 组件[选择明细表] 和[选择启动字段] 一起的事件 
                this.$bus.$emit('emitDetailTableFieldAndStartParas')
              }
            }
          }else if( this.obj.DataSource === 'GetMainAndDetailTables' && this.obj.FieldCode ==='DetailTableCode'){
            debugger
            // 选择明细表 select 选择value 变化后 触发 兄弟组件[选择启动字段] 重新进行 下拉list 的获取
            // 先取消emitDetailTableField 的eventbus
            // try {
            //   this.$bus.$off('emitDetailTableField')
            // } catch (error) {
              
            // }
            this.$bus.$emit('emitOnlyStartParas', this.obj.FieldValue.parentIds)
          }
        },
        deep: true,
        // immediate: true     // 第一次进入后的渲染也 会监听
      }
    },
    methods: {
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        console.log('dicType', dicType)
        // 如果是自定义字典表，取opt里面数据
        if (this.obj.DSType === 'Local') {
          if (!this.obj.Ext.LimitOpt.length) return
          if (this.obj.Ext.DefaultOpt.length) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt.toString()
            this.changeParent()
          }
          this.obj.Ext.LimitOpt.forEach(item => {
            this.obj.Ext.Opt.forEach(i => {
              if (item === i.Code) {
                this.dataSource.push(i)
              }
            })
          })
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
      // 按指定字段启动时，获取 启动字段集合
      _getFieldList () {
        debugger
        return new Promise((resolve, reject) => {
          getFieldList(this.flowId, this.nodeId).then(res => {
            if (res.data.State === REQ_OK) {
              debugger
              this.dataSource = res.data.Data
              this.SubFlowStartParasDataSource = res.data.Data
            }
            resolve()
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
            }
          })   
          resolve()
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
                    })
                  }
                })
              }
            }
            this.detailTableDataSource = detailTables
            resolve()
          })
        })
      },
      // 按照 明细表启动时， 选择字段启动项时，获取下拉框选项list

      // 改变父下拉框值
      changeParent () {
        if (this.obj.Ext.Opt && this.obj.Ext.Opt.length) {
          this.obj.Ext.Opt.forEach(item => {
            if (item.Code === this.obj.FieldValue.parentIds) {
              if (item.Child.length) {
                this.childSource = item.Child
                this.obj.FieldValue.childIds = ''
              } else {
                this.childSource = []
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
