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
    <div :class="['addNewGroupCmp', parentGroups.length<=0? 'not_found':'']" v-loading="loading">
        <!-- parentGroups: {{parentGroups}} -->
        <el-form
            v-for="(parentItem, index) in parentGroups"
            :key="index"        
            :ref="`parentGroup_${parentItem.metacode}`"
            class="parentGroupForm"
            :model="parentItem"
        >
            <h3 class="header">
                <i class="header-icon el-icon-info"></i>                
                {{parentItem.name}}
            </h3>
            <div :class="['fieldContentBox', 'u-f-jst', 'u-f-wrap', parentItem.teamControlList.length<=0? 'not_found':'']">
                <component 
                    :class="`${parentItem.metacode}_field_${field.concode}`"
                    v-for="(field, key) in parentItem.teamControlList"
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

            <div class="childrenListWrap" v-if="parentItem.childrenList && parentItem.childrenList.length">
                <add-group-cmp
                    :parentGroups="parentItem.childrenList"
                ></add-group-cmp>
            </div>
        </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import {
    getGroupTreeList,
    saveGroupTreeList
} from '@/api/systemManage.js'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
import { fieldControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
import { newStyleCheckFormArray } from '@/utils/newStyleFieldValidate.js'
let that = null
export default {
    name: 'AddGroupCmp',
    mixins: [CommonInterfaceMixin, fieldControlTypeMixin],
    props: {
        parentGroups: {
            type: Array,
            default: () => {
                return []
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
            queryObj: {
                metacode: 'teaminfo',
                pageSize: 10,
                pageNum: 1,
                total: 0
            },
            saveFinalData: []
        }
    },
    created(){
        that = this
        this._getComTables()
    },
    computed:{

    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData(){
           this.$emit("emitGetData") 
        },
        _getComTables(){

        },  
        fieldStyle(field){
            // return `width: ${field.showStyle.width}`
            return "width: 100%"
        },   
        saveGroup(arr){
            this.loading = true
            saveGroupTreeList(arr).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                    this.$emit("emitGetData")
                }
            }).catch(err => {
                this.loading = false
            })
        },
        changeData(arr){
            let newArr = []
            if(arr && arr.length){
                newArr = arr.map((item, key) => {
                    return {
                        unicode: item.unicode,
                        convalue: item.convalue
                    }
                })
            }
            console.log("------------", newArr)
            return newArr
        },
        // 保存
        saveGroupForm(){
            let resArr = []
            this.saveFinalData = []
            this.parentGroups.forEach((groupItem, key) => {
                resArr.push(newStyleCheckFormArray(that, `parentGroup_${groupItem.metacode}`, groupItem, key))
                this.saveFinalData.push(...this.changeData(groupItem.teamControlList))
            })
            Promise.all(resArr).then(res => {
                alert(3)
                this.saveGroup(this.saveFinalData)
            }).catch(err => {
                console.log(err)
            })

            alert(2)
        }
    }
}
</script>
