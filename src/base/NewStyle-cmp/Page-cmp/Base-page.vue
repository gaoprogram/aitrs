<!--
  User: gaol
  Date: 2020/7/31
  功能：页面通用 组件  controlType 为
-->

<template>
    <div class="fieldGroup-cmp-wrap">
        <!-- 通用页面组件 -->
        <!----组件部分------>
        <el-row>
            <!-- field: {{field}} -->
            <el-form :model="pageModel" class="top">
                <component 
                    :is="currentFieldComponent( field.controlType )"
                    :isNeedCheck = 'true'
                    :obj.sync="field"
                    :isTitle="field.isTitle"
                >
                </component>                 
            </el-form>

            <div
                v-if="currentPageData.components_cmp.length>0"
                v-for="(com, key) in currentPageData.components_cmp"
                :key="key"
            >

                <el-col :span="24">
                    <div class="marginT20">
                        <!-- com： {{com}} -->
                        <component
                            :is="currentComComponent(com.controlType)"
                            :comsData= "com.comsData"
                        >
                        </component>
                    </div>
                    <!-- <field-group-cmp
                        :fieldGroup="com.fieldGroup"
                    ></field-group-cmp> -->
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import { 
    REQ_OK, 
  } from '@/api/config'
  import { componentsControlTypeMixin } from '@/utils/newStyleMixins-com.js'
  import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
  export default {
    mixins: [ componentsControlTypeMixin, fieldGroupControlTypeMixin ],
    components: {
    },
    props: {
        pageCode: {
            type: String,
            default: ''
        },
        authrityObj: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    computed: {

    },
    data () {
      return {
        currentPageData: {
            components_cmp: [
                {
                    controlType: 'fieldGroup',
                    comsData: {
                        fieldGroup: [
                            {
                                groupName: '分组1',
                                Fields: [
                                    {
                                        controlType: "1",
                                        FieldName: "字段1",
                                        fieldValue: "ceshi",
                                        Hidden: false,
                                        Tips: '这是tips内容',
                                        isTitle: true
                                    },
                                    {
                                        controlType: "5",
                                        FieldName: "字段2",
                                        fieldValue: "ceshi",
                                        Hidden: false,
                                        Tips: '这是tips内容',
                                        isTitle: true                                    
                                    }
                                ]
                            },
                            {
                                groupName: '分组2',
                                Fields: [
                                    {
                                        controlType: "1",
                                        FieldName: "字段2",
                                        fieldValue: "test",
                                        Hidden: false,
                                        Tips: '999999999',
                                        isTitle: true
                                    }
                                ]
                            },                        
                        ]
                    }
                },
                {
                    controlType: 'tableCmp',
                    comsData: {
                        tableContentData: [
                            {
                                label: "中国联通",
                                property: "company",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "李四",
                                property: "empName",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "0001",
                                property: "empNo",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },                         
                        ],
                        tableHeadData: [
                            {
                                label: "公司",
                                property: "company",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "员工姓名",
                                property: "empName",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },
                            {
                                label: "员工号",
                                property: "empNo",
                                Lock: false,
                                Hidden: false,
                                SortId: 1                         
                            },                         
                        ]
                    }
                },                
            ]
        },
        field: {
            controlType: "1",
            FieldName: "关键字:",
            fieldValue: "ceshi",
            Hidden: false,
            Tips: '',
            isTitle: true
        }, 
        pageModel: {}       
      }
    },
    created () {
        // 将当前的 pageCode 存入到store中
        this._setPageCode(this.pageCode)
        // 获取当前页面的动态页面数据
        this._getCurrentPageData()
    },
    beforeDestroy () {
      // 销毁
    },
    methods: {
        // 将该页面的pageCode传到 全局中存储
        _setPageCode(pageCode){
            debugger
            if(pageCode){
                this.$store.dispatch('setCurrentPageCode', pageCode)
            }
        },
        _getCurrentPageData(){

        }
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

<style lang="stylus" rel="stylesheet/stylus">
</style>
