<!--
  User: gaol
  Date: 2019/5/14
  功能： 新增/编辑分组 字段的组件
-->
<template>
    <el-row class="addOrEditFieldWrap">
        <el-col :span="columnNum">   
            <save-footer @save="saveFieldGroup" @cancel="cancelFieldGroup" :saveText="saveText" :cancelText="cancelText"></save-footer>
            <!-- <field-group-cmp
                :comsData="groupsData"
            ></field-group-cmp> -->
            <field-group-cmp :comsData="groupsData"></field-group-cmp>
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
import FieldGroupCmp from './Base-fieldGroup'
import SaveFooter from '@/base/Save-footer/Save-footer'
import { deepCopyArr } from '@/utils/clone'
  // 底部保存组件
  export default {
    name: 'FieldAddoreditCmp',
    components: {
        FieldGroupCmp,
        SaveFooter
    },
    props: {
        columnNum: {
            type: [String, Number],
            default: () => {
                return 24
            }
        },
        comsData: {
            type: Array,
            default: () => {
                return []
            }
        },
        saveText: {
            type: String,
            default: () => {
                return ''
            }
        },
        cancelText: {
            type: String,
            default: () => {
                return ''
            }
        }
    },
    data(){
        return {
            groupsData: []
        }
    },
    created(){
        // 深拷贝 comsData
        this.$nextTick(() => {
            this._copyGroupsData(this.comsData)
        })
    },
    methods: {
        _copyGroupsData(arr){
            if(arr && arr.length){
                this.groupsData = deepCopyArr(arr)
            }
        },
        saveFieldGroup () {

        },
        cancelFieldGroup () {

        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
