<!--
  User: gaol
  Date: 2019/8/7
  功能：显示分组——添加/编辑 动态字段 组件
-->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.fieldForm
    .el-form-item
        margin-bottom 10px !important
.fieldSetEdit
  padding 0 20px
  box-sizing border-box
</style>
<template>
  <div class="fieldSetEdit" >
    <!-- obj:{{obj}} -->
    <!-- --- -->
    <!-- objAdd: {{objAdd}} -->
    <!-- <span v-if="isEditOrAdd">
        编辑
    </span>    
    <span v-if="!isEditOrAdd">
        添加
    </span>    -->

    <!--设置表单动态组件区域--->
    <div class="container">
      <!-- {{currentSetComponent(obj.ControlType)}} -->
      <el-card>
        <div class="content">
          <el-scrollbar style="height: 100%" :native="false">
            <!-- obj.ControlType：{{obj.ControlType}} -->
            <component
              :is="currentSetComponent(obj.ControlType)"
              :ref="obj.FieldCode"
              :setObj.sync="obj"  
              :tableObj="tableObj"
              :textTypeList="textTypeList"
              :moduleList="moduleList"
              :timeBreakList="timeBreakList"
              :dataFormatList="dataFormatList"
              :currencyList="currencyList"
            ></component>
          </el-scrollbar>
        </div>
      </el-card>
    </div>                
  </div>
</template>

<script type="text/ecmascript-6">
  import { 
    REQ_OK
  } from '@/api/config'
  import { 
    getDicByKey,
  } from '@/api/permission'
  import { 
    CompFieldList
  } from '@/api/systemManage'
  import { sysManageFieldSetControlMixin } from '@/utils/mixin'   
  import {

  } from '@/api/systemManage'
  const APP_CODE = 'SYS' // 业务领域
  const MODULE_CODE = 'SYS' // 模块类型
  const MODULE_CODE_PA = 'PA' // 模块类型-PA
  const DIC_TYPE = 'SYS' // 字典类型
  const DIC_TYPE_PA = 'PA' // 字典类型 -PA
  const DIC_CODE_CONTENT = 'ContentType' // ContentType--文本
  const DIC_CODE_MODULE = 'Module' // 字典编号 Module--模块
  const DIC_CODE_TIME_BREAK = 'TimeBreak' // TimeBreak--时间刻度
  const DIC_CODE_DATE_FORMAT = 'DateFormat'  // DateFormat--时间日期格式
  const DIC_CODE_CURRENCY = 'Currency' // Currency--币种  
  export default {
    mixins: [sysManageFieldSetControlMixin],
    props: {
        isEditOrAdd: {
          type: Number, // 0 编辑 1 添加
          default: 0
        },
        obj: {
          type: Object,
          default: () => {
            return {}
          }
        },
        objAdd: {
          type: Object,
          default: () => {
            return {}
          }
        }
    },
    data(){
      return {
        loading: false, // loading 状态
        tableObj: [],   //控件类型
        currentField: {},     // 表示当前正在编辑的 表单控件 
        textTypeList: [], // 文本类型
        moduleList: [],  // 模块类型
        timeBreakList: [], // 时间刻度list
        dataFormatList: [], 
        currencyList: [],        
      }
    },
    computed: {
      currentTeamCode(){
        if(this.isEditOrAdd){
          // 新增
          return this.objAdd.TeamCode
        }else {
          // 编辑
          return this.obj.TeamCode
        }
      }
    },
    watch: {
       
    },
    created(){
      // try {
      //   this.loading = true
      //   this.tableCode = this.$route.query.tableCode
        this._getAll()
      // } catch (e) {
      //   this.loading = false
      //   this.$message({
      //     type: 'error',
      //     message: '获取失败，请刷新重试！'
      //   })
      // }      
    },
    methods: {
      _getAll () {
        debugger
        Promise.all([
          getDicByKey(APP_CODE, MODULE_CODE, DIC_TYPE, DIC_CODE_CONTENT),
          getDicByKey(APP_CODE, MODULE_CODE, DIC_TYPE, DIC_CODE_MODULE),
          getDicByKey(APP_CODE, MODULE_CODE, DIC_TYPE, DIC_CODE_TIME_BREAK),
          getDicByKey(APP_CODE, MODULE_CODE, DIC_TYPE, DIC_CODE_DATE_FORMAT),
          getDicByKey(APP_CODE, MODULE_CODE_PA, DIC_TYPE_PA, DIC_CODE_CURRENCY),
          CompFieldList(this.currentTeamCode,'',1, 65553, 1, true)
        ])
        .then(([textTypeRes, moduleTypeRes, timeBreakRes, dateFormatRes, currencyRes, tableConfigRes]) => {
          this.loading = false
          debugger
          if (textTypeRes.data.State === REQ_OK) {
            this.textTypeList = textTypeRes.data.Data
          }
          if (moduleTypeRes.data.State === REQ_OK) {
            this.moduleList = moduleTypeRes.data.Data
          }
          if (timeBreakRes.data.State === REQ_OK) {
            this.timeBreakList = timeBreakRes.data.Data
          }
          if (dateFormatRes.data.State === REQ_OK) {
            this.dataFormatList = dateFormatRes.data.Data
          }
          if (currencyRes.data.State === REQ_OK) {
            this.currencyList = currencyRes.data.Data
          }
          if (tableConfigRes.data.State === REQ_OK) {
            debugger
            this.tableObj = tableConfigRes.data.Data
            console.log("------获取到的 tableObj-----------", this.tableObj)
            debugger
          } else {
            this.$message({
              type: 'error',
              message: '获取数据失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '获取数据失败，请刷新重试！'
          })
        })
      },
      submit(){
        // 验证必填项
        let attr = this.obj.FieldCode
        console.log("=======",attr)
        console.log("=======",this.$refs[attr])
        console.log("=======",this.$refs[attr].$refs[attr])
        debugger
        // this.$nextTick(() => {
          this.$refs[attr].$refs[attr].validate((valid) => {
            debugger
            if(valid){
              this.$emit("saveFieldForm", this.obj)
            }else {

            }
          })
        // })
      },
    }
  }
</script>

