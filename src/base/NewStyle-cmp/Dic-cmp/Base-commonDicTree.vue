<!--
    User:
    Date:
    功能:  通用字典表 树形组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@keyframes emptyAnimate {
    0% {
        border: none !important 
    }
    100% {
        // transform scale(1.1)
        border: 1px solid red
    }
}
>>>.el-tree-node__content
    height 45px !important;
    .el-tree-node__expand-icon
        margin-top -5px;
>>>.el-form-item__content
    line-height 30px !important
>>>.el-input__inner 
    height 20px !important;
    line-height 20px !important;
.commonDicCmp
    .custom-tree-wrap
        height 100%
        display inline-block
        .nameBox,.descriptionBox
            height 100%
            display inline-block
            line-height 26px;
            .name-input
                width 100px;
            .name-input.empty
                >>>.el-input__inner
                    border-radius 5px;
                    animation emptyAnimate 1s ease 1
                    animation-fill-mode:forwards
            .name-text
                font-size 12px;
        .nameBox
        .descriptionBox
            margin 0 50px;
        .handlerBox
            display inline-block
            margin-left 30px;
</style>
<template>
    <div class="commonDicCmp" v-loading = 'loading'>
        // treeData: {{treeData}}
        <el-row class="dic-row">
            <el-col :span="24">
                <el-input
                    v-if="showSearch"
                    style="width: 450px;margin-bottom:20px"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
                </el-input>    

                <el-tree
                    ref="tree"
                    class="dic-tree"
                    :data="treeData"
                    :draggable="propDraggable "
                    :show-checkbox="false"
                    node-key="Code"
                    :props="{
                        label: 'Name',
                        children: 'Children',
                    }"
                    default-expand-all
                    :expand-on-click-node="false"
                    :filter-node-method="filterNode"
                >
                        <span :class="['custom-tree-wrap', 'u-f-jc'] " slot-scope="{ node, data }">
                            <el-form :model="data" :ref="`dataForm_${data.Code}`" :class="[`form_${data.Code}`, 'form']">     
                                <span class="nameBox">
                                    <el-form-item v-if="data.isEditing" prop="Name" :rules="data.itemRules">
                                        <el-input
                                            :class="['name-input', data.Code === currentCode?'empty':'']"
                                            v-model="data.Name"
                                            placeholder="请输入"
                                            @change="nameInputChange(node, data)"
                                        >
                                        </el-input>
                                    </el-form-item>                                
                                    <span v-else class="name-text">{{ data.Name }}</span>                            
                                </span>

                                <span 
                                    class="descriptionBox" 
                                >
                                    <el-form-item v-if="data.isEditing" prop="Description" :rules="{required: false, message: '描述为空', trigger: 'blur'}">
                                        <el-input
                                            class="name-input"      
                                            v-model="data.Description"
                                            style="width: 300px"
                                            maxlength="40"
                                            placeholder="请输入"
                                        >
                                        </el-input>
                                    </el-form-item>                                
                                    <span v-else class="name-text">{{ data.Description }}</span>                             
                                    
                                </span>

                                <span 
                                    class="handlerBox" 
                                >                         
                                    <el-button
                                        class="btn btn-add"
                                        type="text"
                                        size="mini"
                                        @click="() => append(node,data)">
                                        新增
                                    </el-button>                                    
                                    <el-button
                                        v-show="!data.isEditing"
                                        class="btn btn-edit"
                                        type="text"
                                        size="mini"
                                        @click="() => edit(node, data)">
                                        编辑
                                    </el-button>      
                                    <el-button
                                        v-show="data.isEditing"
                                        class="btn btn-edit"
                                        type="text"
                                        size="mini"
                                        @click="() => cancel(node, data)">
                                        取消
                                    </el-button>                                                        
                                    <el-button
                                        class="btn btn-delet"
                                        type="text"
                                        size="mini"
                                        @click="() => remove(node, data)">
                                        删除
                                    </el-button>                                  
                                </span>
                            </el-form>
                        </span> 
                </el-tree>   
            </el-col>

            <save-footer
                :cancelBtnIsShow="false"
                saveBtnSize="mini"
                cancelBtnSize="mini"
                @save="saveTree"
                @cancel="cancelTree"
            ></save-footer>
        </el-row>        
    </div>
</template>
<script type="text/ecmascript-6">
import {
    REQ_OK
} from '@/api/config'
import {
    checkTreeFormArray
} from '@/utils/newStyleFieldValidate'
import SaveFooter from '../../Save-footer/Save-footer.vue';
import {
    saveDicByKey,
    deleteDicItem
} from '@/api/dic'
let that = null;
let Code = 100000;  
export default {
    components: { SaveFooter },
    props: {
        showSearch: {
            type: Boolean,
            default: false
        },
        propTreeData: {
            type: Array,
            default: () => {
                return [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1'
                                }, 
                                {
                                    id: 10,
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                }, 
                {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1'
                        }, 
                        {
                            id: 6,
                            label: '二级 2-2'
                        }
                    ]
                }, 
                {
                    id: 3,
                    label: '一级 3',
                    children: [
                        {
                            id: 7,
                            label: '二级 3-1'
                        }, 
                        {
                            id: 8,
                            label: '二级 3-2'
                        }
                    ]
                }]
            }
        },
        propRowObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        propDicCode: {
            type: String,
            default: () => {
                return ''
            }
        },
        propMaxTier: {
            type: [Number, String],
            default: () => {
                return ''
            }
        },        
        propDraggable: {
            type: Boolean,
            default: false
        }
    },
    data() {          
        return {
            loading: false,
            filterText: '',
            treeData: JSON.parse(JSON.stringify(this.propTreeData)) || [] ,
            currentCode: '',
            treeForm: [],
            treeRulesForm: [],
            validRes: [],
        }
    },
    created(){
        that = this
        // 处理 this.treeData
        this._changeData(this.treeData)
    },
    computed:{
       
    },
    watch:{
        filterText(val) {
            this.$refs.tree.filter(val);
        }            
    },
    methods:{
        filterNode(value, data) {
            debugger
            if (!value) return true;
            return data.Name.indexOf(value) !== -1;
        }, 
        addNum(node, data) {
            if(node.parent){
                // 有直接上级
                data.hasAddBtnNum += 1
                if(this.propMaxTier > data.hasAddBtnNum){
                    if(node.parent.parent){
                        // 直接上级还有上级 递归
                        this.addNum(node.parent.parent, data)
                    }else {
                        // 所有上级都递归完了, 再看其下级
                        if(node.childNodes){
                            if(node.childNodes.length){
                                // 直接下级
                                data.hasAddBtnNum += 1
                                
                            }else {
                                // 没有直接下级了
                            }
                        }else {
                            // 没有下级
                        }
                    }
                }else {
                    // 超过最大递归层级
                    return false
                }
            }else {
                //没有直接上级

            }            
        },
        // 根据 propMaxTier 来判断是否显示新增按钮
        getHasAddBtn(node, data){
            data.hasAddBtnNum = 0

            this.addNum(node, data)
        },               
        _changeData(arr){
            if(arr.length){
                arr.forEach((item, key) => {
                    this.$set(item, 'isEditing', false)
                    this.$set(item, 'changed', false)
                    item.itemRules = {required: true, message: '名称为空', trigger: ['blur', 'change']}
                    if(item.Children && item.Children.length){
                        this._changeData(item.Children)
                    }
                })
            }
        },
        nameInputChange(node, data){
            debugger
            if(data.Name){
                this.currentCode = ''
            }
        },
        //新增
        append (node, data) {
            debugger
            const newChild = { Code: Code++, Name: '', Children: [], isEditing: true, Description: '', Changed: true, itemRules: {required: true, message: '名称为空', trigger: ['blur', 'change']} };

            if (!data.Children) {
            this.$set(data, 'Children', []);
            }
            let newData = data.Children.concat(newChild);
            this.$set(data, 'Children', newData)
            console.log("9999999999999", data)
        },
        // 编辑
        edit(node, data){
            debugger
            data.isEditing = true
            data.Changed = true
        },
        // 取消
        cancel(node, data){
            debugger
            this.currentCode = data.Code
            if(!data.Name){

            }else {
                data.isEditing = false
            }
        },
        _deleteDicByKey(ModuleCode, DicCode, Id){
            this.loading = true
            saveDicByKey(ModuleCode, DicCode, Id).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK) {
                    this.$message({
                        type: 'success',
                        message: `删除成功`
                    })
                }else {
                    this.$message({
                        type: 'error',
                        message: `删除失败,${res.data.Error}`
                    })
                }
            })  
        },      
        // 删除
        remove(node, data) {
            const parent = node.parent;
            const Children = parent.data.Children || parent.data;
            const index = Children.findIndex(d => d.Code === data.Code);
            debugger
            this.$confirm(`确定要删除${data.Name}吗`, "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(res => {
                if(data.Id>0){
                    this._deleteDicByKey(this.propRowObj.ModuleCode, this.propDicCode, data.Id)
                }else {
                    Children.splice(index, 1);
                }             
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '删除已取消'
                })
            })
        },                
        _saveDicByKey(){
            this.loading = true
                console.log("最终保存的 树形数据为——————————————————————",this.treeData)
            saveDicByKey(this.propDicCode, this.treeData).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK) {
                    this.$message({
                        type: 'success',
                        message: `保存成功`
                    })
                }else {
                    this.$message({
                        type: 'error',
                        message: `保存失败,${res.data.Error}`
                    })
                }
            })
        },                                                                        
        validFn(arr, resArr){
            if(arr && arr.length){
                arr.forEach((item, key) => {
                    let res = new Promise((resolve, reject) => {
                        item.SortId = ++key
                        console.log(that.$refs[`dataForm_${item.Code}`])
                        debugger
                        that.$refs[`dataForm_${item.Code}`].validate(valid => {
                            debugger
                            if(valid){ 
                                resolve(valid)   
                            }else {
                                reject(new Error(`${item.Code}验证失败`))
                                return false
                            }
                        })         
                    })
                    resArr.push(res)

                    if(item.Children && item.Children.length){
                        that.validFn(item.Children, resArr)
                    }
                })
            }
        },
        // 保存 整体数据
        saveTree () {
            // 先进行必填项验证
            this.validRes = []
            this.validFn(this.treeData, this.validRes)
            // console.log(this.treeData)
            console.log(this.validRes)
            debugger
            Promise.all(this.validRes).then(res => {
                debugger
                // 验证pass 调用 保存接口
                this._saveDicByKey()
            }).catch(error => {

            })        
        },
        // 取消 整体数据
        cancelTree () {
            
        }    
    },
}
</script>
