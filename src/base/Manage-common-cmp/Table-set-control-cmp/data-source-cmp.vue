<!--
  User: gaol
  Date: 2019/5/14
  功能：table-config页面中 下拉框组件的的 编辑设置字段时（数据源类型、字典表配置、是否必填、是否隐藏）的基础通用组件
-->

<template>
    <div class="data-source-cmp">
      <!---数据源类型--->
      <div class="item">
        <!-- <span class="title">数据源类型：</span> -->
        <el-form-item 
          label-width="120px"
          label="数据源类型：" 
          prop="DSType"
          :rules="DSTypeRules">
          <el-select
            v-model="setObj.DSType"
            @change="handleChangeModule"
          >
            <el-option
              v-for="item in getDataSourceType"
              :key="item.code"
              :label="item.value"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div v-show="setObj.DSType !== 'Local'">
        <!---模块类型---->
        <div class="item">
          <!-- <span class="title">模块类型：</span> -->
          <el-form-item 
            label-width="100px"
            label="模块类型：" 
            prop="ModuleCode"
            :rules="ModuleCodeRules">
            <el-select
              v-model="setObj.ModuleCode"
              clearable
              @change="handleChangeModule"
            >
              <el-option
                v-for="item in moduleList"
                :key="item.Code"
                :label="item.Name"
                :value="item.Code">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!--数据源名称--->
        <div class="item" v-if="setObj.ModuleCode">
          <!-- <span class="title">数据源名称：</span> -->
          <el-form-item 
            label-width="120px"
            label="数据源名称：" 
            prop="DataSource"
            :rules="DataSourceRules">
            <el-select
              clearable
              v-model="setObj.DataSource"
              @change="handleChangeDataSource"
            >
              <el-option
                v-for="item in dataSourceList"
                :key="item.Code"
                :label="item.Name"
                :value="item.Code">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!--关联上级--->
        <div class="item" v-if="setObj.ModuleCode">
          <!-- <span class="title">关联上级：</span> -->
          <el-form-item 
            label-width="100px"
            label="关联上级：" 
            prop="Depend"
            :rules="DependRules">
            <el-select
              v-model="setObj.Depend"
              @change="handleChangeDepend"
              clearable
            >
              <el-option
                v-for="item in relationParent"
                :key="item.FieldCode"
                :label="item.FieldName"
                :value="item.FieldCode">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="item marginL10" v-if="setObj.DSType === 'Local'">
        <span class="title">字典表配置：</span>
        <el-button type="primary" size="mini" @click.native="showCustomTableCmp = true">配置</el-button>
      </div>

      <div class="item marginL10" v-if="setObj.DSType === 'SYS' || setObj.DSType === 'CUS'">
        <span class="title">字典表配置：</span>
        <el-button type="primary" size="mini" @click.native="showSysTableCmp = true">配置</el-button>
      </div>

      <!--引用 sys-table-cmp-基础组件-->
      <sys-table-cmp v-if="showSysTableCmp" :setObj="setObj" :tableData="dicWithConfigList" @cancel="showSysTableCmp = false" :isMul="isMul"></sys-table-cmp>

      <!--引用 custom-table-cmp 基础组件--->
      <custom-table-cmp v-if="showCustomTableCmp" :customSetObj="setObj" @cancel="showCustomTableCmp = false" :isMul="isMul"></custom-table-cmp>
    </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicCollection } from '@/api/permission'
  import { getParentDic, getDicWithConfig } from '@/api/common-dic'
  import CustomTableCmp from './custom-table-cmp'
  import SysTableCmp from './sys-table-cmp'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      setObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      propDSType: {
        type: String,
        default: ''
      },
      moduleList: {
        type: Array,
        default: () => {
          return []
        }
      },
      isCustom: {
        type: Boolean,
        default: false
      },
      isMul: {
        type: Boolean,
        default: false
      }
    },
    data () {
      let validateDSTypePass = (rule, value, callback) => {
        debugger
        if(!this.setObj.DSType){
          callback(new Error("数据源类型为空"))
        }else {
          callback()
        }
      }
      let validateModuleCode = (rule, value, callback) => {
        debugger
        if(!this.setObj.ModuleCode){
          callback(new Error("模块类型为空"))
        }else {
          callback()
        }
      }
      let validateDataSource = (rule, value, callback) => {
        debugger
        if(!this.setObj.DataSource){
          callback(new Error("数据源名称为空"))
          // callback()
        }else {
          callback()
        }
      }
      let validateDepend = (rule, value, callback) => {
        debugger
        if(!this.setObj.Depend){
          // callback(new Error("关联上级为空"))
          callback()
        }else {
          callback()
        }
      }                  
      return {
        tableData: [],
        checked: false,
        dataSourceType: [
          {
            value: '系统字典表',
            code: 'SYS'
          },
          {
            value: '企业字典表',
            code: 'CUS'
          },
          {
            value: '自定义字典表',
            code: 'Local'
          }
        ],
        dataSourceType2: [
          {
            value: '系统字典表',
            code: 'SYS'
          },
          {
            value: '企业字典表',
            code: 'CUS'
          }
        ],
        dataSourceList: [],
        parentDicList: [],
        dicWithConfigList: [],
        showCustomTableCmp: false,  // 控制自定义字典表的弹框的显示/隐藏
        showSysTableCmp: false,
        relationParent: [],
        DSTypeRules: {
          required: true,
          validator: validateDSTypePass,
          trigger: 'change'          
        },
        ModuleCodeRules: {
          required: true,
          validator: validateModuleCode,
          trigger: 'change'                    
        },
        DataSourceRules: {
          required: true,
          validator: validateDataSource,
          trigger: 'change'                    
        },   
        DependRules: {
          required: false,
          validator: validateDepend,
          trigger: 'change'                    
        }                     
      }
    },
    computed: {
      ...mapGetters([
        'currentFieldStore',
        'currentFieldsStore'
      ]),
      getDataSourceType () {
        return this.isCustom ? this.dataSourceType : this.dataSourceType2
      }
    },
    created () {
      this.handleChangeModule('fir')
      this.handleChangeDataSource('fir')
      this.handleChangeDepend()
    },
    methods: {
      // 更改模块类型或数据源类型
      handleChangeModule (first = 'sec') {
        getDicCollection(this.setObj.ModuleCode, this.setObj.DSType).then(res => {
          if (res.data.State === REQ_OK) {
            this.dataSourceList = res.data.Data
            if (first === 'sec') this.setObj.DataSource = ''
          }
        })
      },
      // 切换数据源
      handleChangeDataSource (first = 'sec') {
        if (first === 'sec') this.setObj.Depend = ''
        getParentDic(this.setObj.ModuleCode, this.setObj.DataSource).then(res => {
          if (res.data.State === REQ_OK) {
            this.parentDicList = res.data.Data
            this._getDicWithConfig(this.setObj.ModuleCode, this.setObj.DSType, this.setObj.DataSource)
          }
        })
      },
      // 切换关联上级
      handleChangeDepend () {
        this.currentFieldsStore.forEach(item => {
          if (this.setObj.Depend === item.FieldCode) {
            this._getDicWithConfig(this.setObj.ModuleCode, this.setObj.DSType, this.setObj.DataSource, item.DataSource)
          }
        })
      },
      // 获取字典表配置
      _getDicWithConfig (mc, dsT, ds, cDs) {
        getDicWithConfig(mc, dsT, ds, cDs).then(res => {
          if (res.data.State === REQ_OK) {
            this.dicWithConfigList = res.data.Data
          }
        })
      },
      // 表格切换选中
      handleSelectionChange () {
      },
      handleClickSaveCustomTable () {
      }
    },
    watch: {
      setObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:setObj', newValue)
        },
        deep: true
      },
      currentFieldsStore: {
        handler (newValue, oldValue) {
          if (this.currentFieldsStore && this.currentFieldsStore.length) {
            this.relationParent = this.currentFieldsStore.filter(item => {
              return item.DSType === this.setObj.DSType && item.FieldCode !== this.setObj.FieldCode && item.DataSource && item.ModuleCode
            })
          }
        },
        deep: true,
        immediate: true
      }
    },
    components: {
      CustomTableCmp,
      SysTableCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .data-source-cmp /deep/
    .item
      padding-bottom 15px
      margin-bottom 15px
      border-bottom 1px dashed #cccccc
      .el-select
        width 100%!important
      .el-form-item
        margin-bottom 0 !important      
</style>
