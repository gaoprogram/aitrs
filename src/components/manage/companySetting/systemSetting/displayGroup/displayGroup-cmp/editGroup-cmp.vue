<!--
    User:
    Date:
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.addNewGroupCmp {
    min-height 300px
    max-height 80vh
    overflow: auto;
    .parentGroupForm {
        border-bottom: 1px solid silver
        padding: 20px 
        box-sizing border-box
        .fieldContentBox {
            min-height 100px
        }
        &:nth-last-of-type {
            border-bottom: none
        }
    }
    .childrenListWrap {
        margin-top: 20px
        border: 1px dotted silver
        padding-left: 20px
    }
}
</style>
<template>
    <div :class="['addNewGroupCmp']" v-loading="loading">
        <!-- parentGroups: {{parentGroups}} -->
        <el-form    
            v-for="(groupItem, index) in groupForm"
            :key="index"              
            :ref="`group_${groupItem.metacode}`"
            class="groupForm"
            :model="groupItem"
        >
            <div :class="['fieldContentBox', 'u-f-jst', 'u-f-wrap', groupItem.teamControlList.length<=0? 'not_found':'']">
                <component 
                    :class="`${groupItem.metacode}_field_${field.concode}`"
                    v-for="(field, key) in groupItem.teamControlList"
                    :key="key"                
                    :is="currentFieldComponentMixin(field.controltype)"
                    :obj.sync="field"
                    :style="fieldStyle(field)"
                    :prop="'teamControlList.' + key + '.convalue'"
                    :isShowing="isShowing"
                    :isNeedGetDataSource="true"
                    :disableFlag="false"
                    :fieldEventFlag="false"
                ></component>                
            </div> 
        </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import {
    getEditGroupData,
    saveEditGroup
} from '@/api/systemManage.js'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
import { fieldControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
import { newStyleCheckFormArray } from '@/utils/newStyleFieldValidate.js'
let that = null
export default {
    name: 'EidtGroupCmp',
    mixins: [CommonInterfaceMixin, fieldControlTypeMixin],
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        isShowing: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    components: {
        SearchToolsCmp,
    },
    data() {
        return {
            loading: false, 
            groupForm: [{
                metacode: this.obj.metacode,
                name: '编辑分组',
                teamControlList: []
            }],
            groupFormData: [],
            queryObj: {
                pageSize: 10,
                pageNum: 1,
                total: 0
            },
            saveFinalData: []
        }
    },
    created(){
        that = this
        this.getEditGroupData()
    },
    computed:{

    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData(){
        },
        _getComTables(){
            
        },  
        // 编辑时 获取数据
        getEditGroupData(){
            this.$nextTick(() => {
            debugger
            that.loading = true
            let params = {
                metacode: that.obj.metacode
            }
            getEditGroupData(params).then(res => {
                debugger
                that.loading = false        
                if(res && res.data.State === REQ_OK){
                    that.groupFormData = res.data.Data
                    that.groupForm[0].teamControlList = res.data.Data
                }else {

                }
            })            
            })         
        },         
        fieldStyle(field){
            // return `width: ${field.showStyle.width}`
            return "width: 100%"
        },   
        saveEditGroup(arr){
            this.loading = true
            saveEditGroup(arr).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                    this.$emit("emitEditSuccess")
                }
            }).catch(err => {
                this.loading = false
            })
        },
        // 保存
        saveGroupForm(){
            debugger
            let resArr = []
            that.saveFinalData = []
            that.groupForm[0].teamControlList.forEach((groupItem, key) => {
                resArr.push(newStyleCheckFormArray(that, `group_${that.groupForm[0].metacode}`, that.groupForm[0], key))
                that.saveFinalData.push({
                    unicode: groupItem.unicode,
                    convalue: groupItem.convalue
                })
            })
            Promise.all(resArr).then(res => {
                let params = {
                    metacode: that.obj.metacode,
                    list: that.saveFinalData
                }
                that.saveEditGroup(params)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
