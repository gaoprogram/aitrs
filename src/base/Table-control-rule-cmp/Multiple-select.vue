<!--
  User: gaol
  Date: 2019/5/20
  功能：多选下拉框 统一验证 组件  currentRuleComponent： controtype 为 6 
-->

<template>
<div :class="getNodeListSelectClass">
  <!-- obj：{{obj}} -->
  <!-- nodeId: {{nodeId}} -->
  <!-- {{dataSource}} -->
  <!-- {{dataSource}} -->
  <!-- obj.DataSource: {{obj.DataSource}}
  ----------
  orderProp: {{orderProp}} 
  -------
  obj.DSType: {{obj.DSType}}-->
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="orderProp"
    :rules="rules"
    v-if="!isHidden">
    <el-select
      v-if="obj.DataSource === 'GetNodeList'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      multiple
      clearable
      size="mini"
    >
      <!-- <el-option
        v-if="obj.FieldCode!=='' && obj.FieldCode!==''"
        v-for="(item,key) in dataSource"
        :key="item.NodeId + item.Name + key"
        :label="item.Name"
        :value="''+item.NodeId">
      </el-option> -->

      <el-option
        v-for="(item,key) in dataSource"
        :key="item.NodeId + item.Name + key"
        :label="item.Name"
        :value="''+item.NodeId">
      </el-option>      
    </el-select>
    <!--注意： 上面的：value的值的写法是转换为了 字符串，因为 v-model 中的 obj.FieldValue.parentIds为字符串--->

    <el-select
      v-if="obj.DSType !== 'Local' && obj.DataSource !== 'GetNodeList'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      multiple
      clearable
      size="mini"
    >
      <el-option
        v-for="(item,key) in currentSource"
        :key="item.Code + item.Name + key"
        :label="item.Name"
        :value="''+item.Code">
      </el-option>
    </el-select>


    <!-- obj.FieldValue.parentIds:{{obj.FieldValue.parentIds}}
    obj.DSType： {{obj.DSType}} -->
    <!----多选下拉框一级下拉框--start--->
    <el-select
      v-if="obj.DSType === 'Local'"
      @change="changeParent(1)"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 145px"
      multiple
      size="mini"
    >
      <el-option
        v-for="(item,key) in dataSource"
        :key="item.Code + item.Name + key"
        :label="item.Name"
        :value="''+ item.Code">
      </el-option>
    </el-select>
    <!----多选下拉框一级下拉框--start--->


    <!-- obj.FieldValue.childIds： {{obj.FieldValue.childIds}}
    obj.DSType： {{obj.DSType}} -->
    <!----多选下拉框二级下拉框--start--->
    <el-select
      v-if="obj.DSType === 'Local'"
      v-model="obj.FieldValue.childIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 150px"
      multiple
      size="mini"
    >
      <el-option
        v-for="(item,key) in childSource"
        :key="item.Code + item.Name + key"
        :label="item.Name"
        :value="''+ item.Code">
      </el-option>
    </el-select>
    <!----多选下拉框二级下拉框--end--->

  </el-form-item>

</div>  
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
  import { getNodeList } from '@/api/approve'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      orderProp: {
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
      flowId: {
        type: [Number, String],
        default: 0
      },
      nodeId: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      // ...mapGetters([
      //   'nodeObjStore'
      // ])
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if (this.obj.DSType === 'Local') {
          if (this.obj.Required && !this.obj.FieldValue.parentIds.length) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          // } else if (this.obj.MaxLength > 0 && (this.obj.FieldValue.parentIds.length + this.obj.FieldValue.childIds.length) > this.obj.MaxLength) {
          } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.childIds.length > this.obj.MaxLength) {
            callback(new Error(`${this.obj.FieldName}的字典项和字典项子类最多选择${this.obj.MaxLength}个`))
          } else {
            callback()
          }
        } else if (this.obj.DSType === 'SYS' || this.obj.DSType === 'Cus') {
          if (this.obj.Required && this.obj.FieldValue.parentIds && !this.obj.FieldValue.parentIds.length) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.parentIds.length > this.obj.MaxLength) {
            callback(new Error(`${this.obj.FieldName}最多选择${this.obj.MaxLength}个`))
          } else {
            callback()
          }
        } else {
          if( this.obj.Role ){
            // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
            if( this.obj.Role === 2){
              // role 1 是只读  2 是读写 4 是隐藏
              callback()
            }else {
              callback()
            }
          }else {
            callback()
          }          
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: ['change']
        },
        dataSource: [],  
        childSource: [],  // 二级数据源
        currentSource: [],
        isHidden: false,  // 控制该 组件是否显示
        getNodeListSelectClass: '' // 可退回的节点 ReturnNodes  可撤回的节点 NodeCancels时给此组件加一个class值
      }
    },
    created () {
      debugger
      this.isHidden = this.obj.Hidden
      if (this.obj.FieldValue.parentIds && !this.obj.FieldValue.parentIds.length) {
        this.obj.FieldValue.parentIds = []
      }else if(this.obj.FieldValue.parentIds.length){
        // 获取二级下拉源
        // this.changeParent()
      }
      this.changeHidden()
    },
    mounted () {
      this.$nextTick(() => {
        if (this.obj.DataSource === 'GetNodeList') {
          this._getNodeList()
          return
        }
        this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
      })
    },
    methods: {
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        // 先重置数据源
        this.dataSource = []
        // 如果是自定义字典表，取opt里面数据
        if (this.obj.DSType === 'Local') {
          // 如果范围不包含，那就return
          if (!this.obj.Ext.LimitOpt.length) return
          // 遍历范围里面的值，放进数据源
          this.obj.Ext.LimitOpt.forEach(item => {
            this.obj.Ext.Opt.forEach(i => {
              if (item === i.Code) {
                this.dataSource.push(i)
              }
            })
          })

          // 判断是否有默认选中
          if (this.obj.Ext.DefaultOpt.length ) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt
          }

          // 获取二级 数据源
          this.changeParent()
        } else {
          // 非 自定义字典表
          if (this.obj.FieldValue.parentIds && !this.obj.FieldValue.parentIds.length) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt
          }
          getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
            if (res.data.State === REQ_OK) {
              if (res.data.Data.length) {
                if (this.obj.Ext.LimitOpt && this.obj.Ext.LimitOpt.length) {
                  this.obj.Ext.LimitOpt.forEach(item => {
                    res.data.Data.forEach(i => {
                      if (item === i.Code) {
                        this.dataSource.push(i)
                      }
                    })
                  })
                } else {
                  debugger
                  this.dataSource = res.data.Data
                }
                if (!this.dataSource.length) return
                if (this.obj.Depend) {
                  this.currentFields.forEach(currentField => {
                    if (this.obj.Depend === currentField.FieldCode) {
                      let value = currentField.FieldValue.parentIds
                      if (typeof (value) === 'string') {
                        this.currentSource = this.dataSource.filter(item => {
                          return item.PCode === value
                        })
                        if (!this.currentSource.length) this.obj.FieldValue.parentIds = []
                      } else if (Array.isArray(value) && value.length) {
                        this.currentSource = this.dataSource.filter(item => {
                          return value.includes(item.PCode)
                        })
                        if (!this.currentSource.length) this.obj.FieldValue.parentIds = []
                      } else {
                        this.obj.FieldValue.parentIds = []
                        this.currentSource = []
                      }
                    }
                  })
                } else {
                  this.currentSource = [...this.dataSource]
                }
              }
            }
          })
        }
      },
      _getNodeList () {
        // 因为 自定义按钮页面的“可撤回的节点” 和 “可退回的节点” 这两个配置属性 获取下拉nodelist 时，需要 额外传入 fieldCode 和 nodeId 的参数故
        debugger
        // let nodeObj = {...this.nodeObjStore}
        // let nodeId = ''
        let fieldCode = ''
        if (this.obj.FieldCode === 'ReturnNodes' || this.obj.FieldCode === 'NodeCancels') {
          // ReturnNodes 可退回的节点   NodeCancels 可撤回的节点
          fieldCode = this.obj.FieldCode
          this.getNodeListSelectClass = this.obj.FieldCode
        }
        debugger
        getNodeList('', this.flowId, this.nodeId, fieldCode).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.dataSource = res.data.Data
            // console.log("34535564------", this.dataSource)
          }
        })
      },
      // 改变父下拉框值(第一级下拉框)
      changeParent ( type ) {
        // type 值为 表示 是初始进入时 还是 手动改动了 第一级 后触发的二级的改变
        debugger
        this.childSource = []
        if( type === 1){
          // 手动修改的第一级
          this.obj.FieldValue.childIds = []
        }
        if (this.obj.FieldValue.parentIds && this.obj.FieldValue.parentIds.length) {
          if (this.obj.DSType === 'Local') {
            this.obj.FieldValue.parentIds.forEach(i => {
              this.obj.Ext.Opt.forEach(item => {
                if (item.Code === i) {
                  if (item.Child && item.Child.length) {
                    this.childSource.push(...item.Child)
                  }
                }
              })
            })
          }
        }
        // console.log("打印二级下拉框数据源this.childSource",this.childSource)
      },
      // 节点关联  节点设置——自定义按钮中  节点 退回规则  和  节点撤销规则的 设置
      changeHidden () {
        debugger
        if (this.obj.DataSource === 'GetNodeList') {
          debugger
          this.currentFields.forEach(item => {
            if (item.FieldCode === 'CancelRole' && this.obj.FieldCode === 'NodeCancels') {
              // 节点 取消规则
              if (item.FieldValue.parentIds === '3') {
                // '3' 表示  "指定节点可撤回" 此时需要 显示出此 多选下拉框组件
                this.isHidden = false
              } else {
                // 表示  "上一步可撤回"或者 “不可撤回”，此时需要 隐藏此 多选下拉框组件
                this.isHidden = true
              }
            } else if (item.FieldCode === 'ReturnRole' && this.obj.FieldCode === 'ReturnNodes') {
              // 节点 退回规则
              if (item.FieldValue.parentIds === '3') {
                // '3' 表示  "可退回到指定节点" 此时需要 显示出此 多选下拉框组件
                this.isHidden = false
              } else {
                // 表示  "不可退回" 或者 “只可退回到上一个节点” 此时需要 隐藏此 多选下拉框组件
                this.isHidden = true
              }
            }
          })
        }
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          if (!this.obj.FieldValue.parentIds) {
            this.obj.FieldValue.parentIds = []
          }
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      },
      'obj.TableCode': {
        handler (newValue, oldValue) {
          this.isHidden = this.obj.Hidden
          if (!this.obj.FieldValue.parentIds) {
            this.obj.FieldValue.parentIds = []
          }
          this.changeHidden()
          this.$nextTick(() => {
            if (this.obj.DataSource === 'GetNodeList') {
              this._getNodeList()
              return
            }
            this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
          })
        },
        deep: true
      },
      currentFields: {
        handler (newValue, oldValue) {
          if (this.obj.DSType !== 'Local' && this.dataSource.length && this.obj.Depend && this.obj.DataSource !== 'GetNodeList') {
            this.currentFields.forEach(item => {
              if (this.obj.Depend === item.FieldCode) {
                let value = item.FieldValue.parentIds
                if (typeof (value) === 'string') {
                  this.currentSource = this.dataSource.filter(i => {
                    return i.PCode === value
                  })
                } else if (Array.isArray(value) && value.length) {
                  this.currentSource = this.dataSource.filter(i => {
                    return value.includes(i.PCode)
                  })
                } else {
                  this.currentSource = []
                }
              }
            })
          }
          this.changeHidden()
        },
        deep: true
      },
      nodeId: {
        handler(newValue, oldValue){
          if( this.obj.FieldCode === 'ReturnNodes' || this.obj.FieldCode === 'NodeCancels' ){
            //重新调取 getnodelist 的数据源  (自定义按钮页面，切换节点时， 可撤回的节点多选下拉框  和  可退回的节点的多选下拉框数据源需要重新获取)
          debugger
            getNodeList('', this.flowId, newValue, this.obj.FieldCode).then(res => {
              if (res.data.State === REQ_OK) {
                debugger
                this.dataSource = res.data.Data
                // console.log("34535564------", this.dataSource)
              }
            })
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .common-select-container
    display: flex;
    align-items: center;
    width 300px
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-select
      width 200px
</style>
