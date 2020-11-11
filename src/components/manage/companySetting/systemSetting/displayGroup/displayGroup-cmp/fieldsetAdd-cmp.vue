<!--
  User: gaol
  Date: 2019/8/7
  功能：显示分组——添加 动态字段 组件
-->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.fieldSetAdd
  min-height 300px
  padding 0 20px
  box-sizing border-box
</style>
<template>
  <div class="fieldSetAdd" v-loading="loading">
      <!-- propState: {{propState}} -->
    <!-- {{currentSetComponent(obj.ControlType)}} -->
    <el-card class="cust-card">
    <div class="content" v-if="!showFieldEdit">
        <!-- selectField： {{selectField}} -->
        <span class="tit">
            字段类型
        </span>
        <el-select 
            clearable
            filterable
            v-model="selectField">
            <el-option
                v-for="(field, key) in fieldOption"
                :key="key"
                :value="field.ControlType"
                :label="field.label"
            >
            </el-option>
        </el-select>
        <div
            v-if="!showFieldEdit" 
            class="footerBox center marginT10">
            <el-button type="primary" @click.native="cancelAdd">取消</el-button>
            <el-button type="primary" @click.native="nextStep">下一步</el-button>
        </div>
    </div>

    <div class="fieldEditBox" v-else>
        <!-- currentSelectFieldObj: {{currentSelectFieldObj}} -->
        <!-- obj: {{obj}} -->
        <fieldset-edit-cmp
            ref="fieldSetEditCmp"
            :isEditOrAdd="isEditOrAdd"
            :obj="currentSelectFieldObj"
            :objAdd="obj"
            @saveFieldForm="saveFieldForm"
        ></fieldset-edit-cmp>
        <div class="center marginT10">
            <el-button type="info" @click.native="back">返回上一步</el-button>
            <el-button type="primary" @click.native="handlerSure">确定</el-button>
        </div>        
    </div>        
    </el-card>         
  </div>
</template>

<script type="text/ecmascript-6">
  import FieldsetEditCmp from './fieldsetEdit-cmp'
  import { 
    REQ_OK
  } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
  import { sysManageFieldSetControlMixin } from '@/utils/mixin'   
  import {
    SaveFieldList
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
          default: 1
        },
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        propState: {
            type: [String,Number],
            default: '1'
        },
    },
    components: {
        FieldsetEditCmp
    },
    data(){
      return {
        loading: false, // loading 状态
        showFieldEdit: false, 
        tableObj: [],
        currentField: {},     // 表示当前正在编辑的 表单控件 
        textTypeList: [],
        moduleList: [],
        timeBreakList: [],
        dataFormatList: [],
        currencyList: [],   
        selectField: '', 
        commonAttrObj: {
            ControlType: null, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
            FieldCode: null, //字段code
            Id: 0,
            ModuleCode: null, // 模块code
            GroupCode: null, //群组code
            TeamCode:null, //组code
            FieldName:null, //字段名
            BusinessTypeCode:null, //业务类型
            IndustryCode:null, //行业类型
            DataType: null, //数据类型（1文本，2数字，3日期时间，4二进制流）
            TextType: null, // 文本类型（0不限，1邮箱，2手机，3电话，4地点，5图片，6音频，7视频，8二维码，9条形码）
            DataSource: null, // 数据源（字典表的DicCode项）
            DSType: null, // 字典表类型（SYS系统字典表，CUS企业字典表，Local自定义）
            Depend: null, // 依赖关系（二级字典表的上级字典项）
            Tips: null, // 鼠标提醒
            Note: null, // 字段后面的提示（对用户的）
            Required: null, //是否必填
            SysRequired: null, // 系统必填设置
            MaxLength: null, // 长度限制
            DefaultValue: null, // 默认值
            Min: 0, // 最小值
            Max: 6, // 最大值
            ValidRule: null, // 验证逻辑
            CalculateRule: null, // 运算逻辑
            Unique: null, // 是否唯一
            Research: null, // 是否启用搜索
            Layout: null, // 布局设置
            Attribute:  { "AutoCapital": false, "Digit": 2, "ThousandBit": false, "Color": "#606266", "Size": "" }, // 属性设置
            SortId: null, // 序号
            State:  this.propState, // 系统状态码
            ShowCol: null, // 是否显示
            Hidden: null, // 是否隐藏
            Description: null, // 说明（对管理员的）
            RoleRange: null, // 版本权限
            Deleted: null, // 删除标记（缺省值:0）
            CreateDate: null, // 操作时间
            Event: null, // 是否关联事件
            TableCode: null, // 表code
            Unit: null, // 单位
            TimeBreak: null, // 时间选择刻度
            AutoCalcu: true, // 自动计算时长
            Format: null, // 格式
            IsSystem: null, // 系统标记
            Ext:  { "Opt": [], "LimitOpt": [], "DefaultOpt": [], "HasChildren": true, "vertical":false  }, // 扩展
            DataTypeName: null, // 数据类型名
            TextTypeName: null, // 文本类型名
            ControlTypeName: null, // 控件类型名            
        },
        fieldOption:[
            {
                ControlType: 1, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '单行文本'
            },
            {
                ControlType: 2, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '多行文本'
            },
            {
                ControlType: 3, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '数字'
            },   
            {
                ControlType: 4, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '金额'
            },      
            {
                ControlType: 5, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '单选下拉框'
            },   
            {
                ControlType: 6, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '多选下拉框'
            },  
            {
                ControlType: 7, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '时间（年月日）'
            },       
            {
                ControlType: 8, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '时间区间'
            },     
            {
                ControlType: 9, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '时分'
            },         
            {
                ControlType: 10, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '月份选择'
            },         
            {
                ControlType: 11, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '是否'  // true, false
            },          
            {
                ControlType: 12, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '单选框'  // true, false
            },  
            {
                ControlType: 13, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '复选框' 
            },      
            {
                ControlType: 14, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '图片' 
            },  
            {
                ControlType: 15, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '附件' 
            },    
            {
                ControlType: 16, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '自动计算' 
            }, 
            // {
            //     ControlType: 17, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
            //     label: '表单' 
            // },   
            // {
            //     ControlType: 18, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
            //     label: '列表' 
            // }, 
            {
                ControlType: 19, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '公司内联系人' 
            },     
            {
                ControlType: 20, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '公司组织' 
            },   
            {
                ControlType: 21, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '公司架构' 
            },  
            {
                ControlType: 22, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '地点' 
            },  
            {
                ControlType: 23, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '富文本编辑器' 
            }, 
            {
                ControlType: 24, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '说明' 
            },    
            // {
            //     ControlType: 25, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
            //     label: '关联审批' 
            // },    
            // {
            //     ControlType: 26, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
            //     label: '职务' 
            // },  
            {
                ControlType: 27, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                label: '省市区' 
            },                                                                                                                                                                                                                                                                            
        ],    
        currentSelectFieldObj: {} 
      }
    },
    watch: {
       selectField: {
           handler(newValue, oldValue){
                this.commonAttrObj = {
                    ControlType: null, //控件类型（1单行文本，2多行文本，3数字，4金额，5单选下拉框，6多选下拉框，7时间（年月日），8时间区间，9时分，10月份选择，11是否(True False)，12单选框，13复选框，14图片，15附件，16只读文本（自动计算），17表单，18列表，19公司内联系人，20公司组织，21公司架构（组织与人的混合），22地点，23富文本编辑器，24说明，25关联审批，26职务，27省市区）
                    FieldCode: null, //字段code
                    Id: 0,
                    ModuleCode: null, // 模块code
                    GroupCode: null, //群组code
                    TeamCode:null, //组code
                    FieldName:null, //字段名
                    BusinessTypeCode:null, //业务类型
                    IndustryCode:null, //行业类型
                    DataType: null, //数据类型（1文本，2数字，3日期时间，4二进制流）
                    TextType: '0', // 文本类型（0不限，1邮箱，2手机，3电话，4地点，5图片，6音频，7视频，8二维码，9条形码）
                    DataSource: null, // 数据源（字典表的DicCode项）
                    DSType: null, // 字典表类型（SYS系统字典表，CUS企业字典表，Local自定义）
                    Depend: null, // 依赖关系（二级字典表的上级字典项）
                    Display: '1', // 默认属性
                    Tips: null, // 鼠标提醒
                    Note: null, // 字段后面的提示（对用户的）
                    Required: null, //是否必填
                    SysRequired: null, // 系统必填设置
                    MaxLength: 6, // 长度限制
                    DefaultValue: null, // 默认值
                    Min: 0, // 最小值
                    Max: 6, // 最大值
                    ValidRule: null, // 验证逻辑
                    CalculateRule: null, // 运算逻辑
                    Unique: null, // 是否唯一
                    Research: null, // 是否启用搜索
                    Layout: null, // 布局设置
                    Attribute:  { "AutoCapital": false, "Digit": 2, "ThousandBit": false, "Color": "#606266", "Size": "16" }, // 属性设置
                    SortId: null, // 序号
                    State:  this.propState, // 系统状态码
                    ShowCol: null, // 是否显示
                    Hidden: null, // 是否隐藏
                    Description: null, // 说明（对管理员的）
                    RoleRange: null, // 版本权限
                    Deleted: null, // 删除标记（缺省值:0）
                    CreateDate: null, // 操作时间
                    Event: null, // 是否关联事件
                    TableCode: null, // 表code
                    Unit: null, // 单位
                    TimeBreak: null, // 时间选择刻度
                    AutoCalcu: true, // 自动计算时长
                    Format: null, // 格式
                    IsSystem: null, // 系统标记
                    Ext:  { "Opt": [], "LimitOpt": [], "DefaultOpt": [], "HasChildren": true, "vertical":false }, // 扩展
                    DataTypeName: null, // 数据类型名
                    TextTypeName: null, // 文本类型名
                    ControlTypeName: null, // 控件类型名
                }
            }
        }
    },
    created(){
    
    },
    methods: {
        closeDialog(){
            this.$emit("closeAddDialog")
        },
        cancelAdd(){
            this.closeDialog()
        },
        nextStep(){
            if(this.selectField){
                this.commonAttrObj.ControlType = this.selectField + ''
                this.commonAttrObj.FieldCode = this.selectField + ''
                try {
                    this.commonAttrObj.Required += ''
                    this.commonAttrObj.Hidden += ''
                    // 默认颜色： 
                    this.commonAttrObj.Attribute.Color = '#606266'                    
                    // 默认属性 ： 无
                    this.commonAttrObj.Display = '1'
                } catch (error) {
                    
                }
                this.currentSelectFieldObj = this.commonAttrObj
                this.showFieldEdit = true
            }else {
                this.$message.info("请先选择字段类型")
            }
        },
        back(){
            this.showFieldEdit = false
        },
        _SaveFieldList(data){
            this.loading = true
            SaveFieldList(JSON.stringify(data), this.obj.TeamCode).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.closeDialog()
                    this.$emit("addFieldSuccess")
                }else {
                    this.$message.error(`保存失败，${res.data.Error}`)
                }
            })
        },          
        handlerSure(){
            debugger
            this.$refs.fieldSetEditCmp.submit()            
        },
        saveFieldForm(obj){
            this._SaveFieldList([obj])
        },
    }
  }
</script>

