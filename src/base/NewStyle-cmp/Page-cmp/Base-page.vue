<!--
  User: gaol
  Date: 2020/7/31
  功能：页面通用 组件  controlType 为
-->

<template>
    <div class="fieldGroup-cmp-wrap">
        通用页面组件
        <!----组件部分------>
        <el-row>
            <div
                v-if="currentPageData.components_cmp.length>0"
                v-for="(com, key) in currentPageData.components_cmp"
                :key="key"
            >
                <el-col :span="24">
                    <!-- <component
                        :is="currentComComponent(com.controlType)"
                        :fieldGroup="com.fieldGroup"
                    >
                    </component> -->
                    <field-group-cmp
                        :fieldGroup="com.fieldGroup"
                    ></field-group-cmp>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  import { 
    REQ_OK, 
  } from '@/api/config'
//   import { componentsControlTypeMixin } from '@/utils/newStyleMixins.js'
    import fieldGroupCmp from '@/base/NewStyle-cmp/FieldGroup-cmp/Base-fieldGroup'
  export default {
    // mixins: [ componentsControlTypeMixin ],
    components: {
        fieldGroupCmp
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
                    fieldGroup: [
                        {
                            groupName: '分组1',
                            Fields: [
                                {
                                    controlType: 1,
                                    fieldValue: "ceshi"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
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
