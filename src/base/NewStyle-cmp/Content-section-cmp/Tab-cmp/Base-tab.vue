<!--
  User: gaol
  Date: 2019/5/14
  功能： tab 切换组件
-->
<template>
    <el-row class="tabWrap">
        comDataObj: {{comDataObj}}
        <el-col :span="columnNum">
            <el-tabs 
                :type="showType"
                :editable="editable"
                :tabPosition="tabPosition"
                v-model="activeName" 
                @tab-click="handleTabClick">
                <el-tab-pane 
                    v-for="(tab, key) in comsData"
                    :key="key"
                    :label="tab.ObjectName" 
                    :name="tab.Object">
                </el-tab-pane>
            </el-tabs>     

            <slot name="tabContentSlot"></slot>

            <div class="tabContentSectionWrap">
                tab组件 布局
            </div>
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
  // 底部保存组件
  export default {
    props: {
        columnNum: {
            type: [String, Number],
            default: () => {
                return 24
            }
        },
        tabPosition: {
            type: String,
            default: () => 'top'
        },
        editable: {
            type: Boolean,
            default: () => false 
        },
        showType: {
            type: String,
            default: () => {
                return 'card'
            }
        },
        sectionData: {
            type: Object,
            default: () => {
                return {}
            }
        },        
        comsData: {
            type: [],
            default: () => {
                return []
            }
        },
        tabs: {
            type: Array,
            default: () => {
                return [
                    {
                        label: '用户管理',
                        code: '1'
                    },
                    {
                        label: '配置管理',
                        code: '2' 
                    }
                ]
            }
        }
    },
    data(){
        return {
            activeName: '1'
        }
    },
    methods: {
        handleTabClick ( tab, event ) {
            console.log(tab, event)
            this.$bus.$emit("tabCmpClick", tab)
        },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
