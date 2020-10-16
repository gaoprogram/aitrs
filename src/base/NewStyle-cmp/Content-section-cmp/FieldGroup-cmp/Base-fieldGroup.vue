<!--
  User: gaol
  Date: 2019/8/06
  功能：分组 组件  CombineType 为   0030303
-->
<style lang="stylus" rel="stylesheet/stylus">
</style>

<template>
    <div class="fieldGroup-cmp-wrap">
        <!-- comsData.fieldGroup: {{comsData.fieldGroup}} -->
        <!-- 分组组件comsData: {{comsData}}---- -->
        <!-- showGroupFieldsDialog: {{showGroupFieldsDialog}} -->
        <el-row>
            <el-col :span="24">

                <div class="deletebtnWrap clearfix marginB10" v-show="showAddOrEditBtn && comsData.length>0">
                    <el-button 
                        type="primary" 
                        size="mini" 
                        class="rt"
                        @click.native="editGroup"
                    >编辑</el-button>                    
                    <el-button 
                        type="primary" 
                        size="mini" 
                        class="rt marginR10"
                        @click.native="addGroup"
                    >新增</el-button>
                    <!-- <el-button v-if="fieldsKeysData.Children.length = 1" type="primary" size="mini" class="rt">删除</el-button> -->
                </div>   

                <el-card 
                    :class="['box-card-fieldGroup', comsData.length<=0? 'not_found':'']" 
                    :style="{'width': groupWidth}"
                    v-for="(com, key) in comsData"
                    :key="key"
                >
                    <div slot="header" class="clearfix">
                        <span>{{com.MetaAttr && com.MetaAttr.ShortName}}</span>
                        <!-- <div class="upBtnBox">
                            <el-button type="text">新增</el-button>
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">修改</el-button>
                            <el-button type="text">删除</el-button>
                        </div> -->
                        <el-button style="float: right; padding: 3px 0" type="text">{{ '收起' }}</el-button>
                    </div>  
                        <!----引用分组字段的组件----->
                        <field-group-item
                            :ref="`field_${com.MetaAttr.LogicMetaCode}`"
                            :fieldItemObj="com"
                            :MetaCode = "com.MetaCode"
                            :LogicMetaCode = "com.MetaAttr.LogicMetaCode"
                            :isShowing="isShowing"
                            :needRefesh="needRefesh"
                            :isAddOrEditFlag="isAddOrEditFlag"
                        >
                        </field-group-item>
                </el-card>
            </el-col> 

            <!-----新增/编辑分组字段的弹框------->
            <div class="editGroupBox" v-if="showGroupFieldsDialog">
                <el-dialog
                    :visible.sync="showGroupFieldsDialog"
                    :append-to-body="true"
                    :close-on-click-modal="false"
                    fullscreen
                    :title="editGroupBoxTit"
                    :show-close="true"
                >
                    <!---循环递归调用本组件----->
                    <div v-if="isAddOrEditFlag == 0">
                        <field-group-cmp
                            :comsData="comsData"
                            :isShowing="false"
                            :showAddOrEditBtn="false"
                            :needRefesh="false"
                            isAddOrEdit = 0
                        ></field-group-cmp>
                    </div>
                    <div v-if="isAddOrEditFlag == 1">
                        <field-group-cmp
                            :comsData="comsData"
                            :isShowing="false"
                            :showAddOrEditBtn="false"
                            :needRefesh="false"
                            isAddOrEdit = 1
                        ></field-group-cmp>                        
                    </div>

                </el-dialog>
            </div>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    // import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import FieldGroupItem from './Base-fieldGroupItem'
    import FieldAddoreditCmp from './field-addoredit-cmp'
    import { checkFormArray } from '@/utils/newStyleFieldValidate'
    import { deepCopyArr } from '@/utils/clone'
    export default {
        name:'FieldGroupCmp',
        // mixins: [ fieldGroupControlTypeMixin ],
        components: {
            SaveFooter,
            FieldGroupItem,
            FieldAddoreditCmp
        },
        props: {
            showAddOrEditBtn: {
                type: Boolean,
                default: true
            },
            comsData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            sectionData: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isTitle: {
                type: Boolean,
                default: true
            },
            isShowing: {
                type: Boolean,
                default: () => {
                    return true
                }
            },
            // 用于 新增编辑时 递归调用此组件，不必重新调用接口 用之前的数据即可
            needRefesh: {
                type: Boolean,
                default: () => {
                    return true
                }
            },
            isAddOrEdit: {
                type: [Number, String],
                default: () => {
                    return 0
                }
            }            
        },
        computed: {
            groupWidth () {
                return '100%'
            },
            groupItemNameStyle () {
                return `color:"red"`
            },
            fieldWrapStyle () {
                return ``
            }
        },
        data () {
            return {
                groupsData: [],  
                isAddOrEditFlag: this.isAddOrEdit,  // 0 编辑  1新增
                showGroupFieldsDialog: false, // 控制 新增/编辑分组的弹框显示  
                editGroupBoxTit: '新增',            
                ruleForm: {

                }
            }
        },
        created () {
            // 深拷贝 comsData
            // this.$nextTick(() => {
            //     this._copyGroupsData(this.comsData)
            // })
        },
        beforeDestroy () {
        // 销毁
        },
        methods: {        
            save () {
                let _this = this
                let result = []
                _this.comsData.fieldGroup.forEach(item => {
                    let refForm = `ruleForm_${item.groupCode}`
                    console.log(refForm)
                    result.push(checkFormArray(_this, refForm))
                })
            },
            _copyGroupsData(arr){
                if(arr && arr.length){
                    this.groupsData = deepCopyArr(arr)
                }
            },            
            // 新增 组
            addGroup(team){
                debugger
                this.isAddOrEditFlag = 1
                this.editGroupBoxTit = '新增'
                this.showGroupFieldsDialog = true
                // 深拷贝 comsData
                this._copyGroupsData(this.comsData)
            },
            // 编辑 组
            editGroup(team){
                debugger
                this.isAddOrEditFlag = 0
                this.editGroupBoxTit = '编辑'
                this.showGroupFieldsDialog = true
                // 深拷贝 comsData
                this._copyGroupsData(this.comsData)
            },                                  
        },
        watch: {
            obj: {
                handler (newValue, oldValue) {
                // 每当obj的值改变则发送事件update:obj , 并且把值传过去
                this.$emit('update:obj', newValue)
                },
                deep: true
            }
        }
    }
</script>
