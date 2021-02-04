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
>>>.el-input__icon
    line-height 30px !important
>>>.el-select-dropdown
    top 195px !important
>>>.el-color-picker
    vertical-align top
>>>.el-image
    vertical-align middle
>>>.el-tree-node>.el-tree-node__children
    overflow visible !important
.dic-tree
    margin 10px 0
.commonDicCmp
    min-height calc(100% - 50px)
    .custom-tree-wrap
        height 100%
        display inline-block
        .nameBox,.descriptionBox,.remarkBox,.colorBox,.picBox,.cmpExplainBox,.childCmpBox,.cmpIsrequiredBox
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
                width: 60px;
        .nameBox
            margin 0 10px 0 0
        .descriptionBox
            margin 0 10px 0 0
        .remarkBox
            margin 0 10px 0 0
        .colorBox
            margin 0 10px 0 0        
        .picBox
            margin 0 10px 0 0        
        .cmpExplainBox
            margin 0 10px 0 0        
        .childCmpBox
            margin 0 10px 0 0        
        .cmpIsrequiredBox
            margin 0 10px 0 0        
        .handlerBox
            margin-left 10px        
            display inline-block
            .btn
                margin 10px 5px;
</style>
<template>
    <div class="commonDicCmp" v-loading = 'loading'>
        <!-- treeData: {{treeData}} -->
        <el-row class="dic-row">
            <el-col :span="24">
                <div class="treeBox">
                    <el-input
                        v-if="showSearch"
                        size="small"
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
                        node-key="treeId"
                        empty-text=" "
                        :props="{
                            label: 'rolegroupname',
                            children: 'childrenList',
                        }"
                        :default-expand-all="false"
                        :expand-on-click-node="false"
                        :filter-node-method="filterNode"
                        @node-drop="nodeDrop"
                        @node-click="nodeClick"
                    >
                            <span :class="['custom-tree-wrap'] " slot-scope="{ node, data }">
                                <!-- data: {{data}} -->
                                <el-form 
                                    :model="data" 
                                    ref="dataForm" 
                                    class="u-f-ajc"
                                >     
                                    <span class="nameBox">
                                        <el-form-item v-if="data.isEditing" prop="rolegroupname" :rules="data.itemRules">
                                            <el-input
                                                :class="['name-input', data.rolegroupcode === currentRoleGroupCode?'empty':'']"
                                                v-model="data.rolegroupname"
                                                placeholder="请输入"
                                                @change="nameInputChange(node, data)"
                                            >
                                            </el-input>
                                        </el-form-item>                                
                                        <span v-else class="name-text ellipsis1">{{ data.rolegroupname }}</span>                            
                                    </span>

                                    <span 
                                        class="descriptionBox" 
                                    >
                                        <el-form-item v-if="data.isEditing" prop="description" :rules="{required: false, message: '描述为空', trigger: 'blur'}">
                                            <el-input
                                                class="name-input"      
                                                v-model="data.description"
                                                style="width: 200px"
                                                maxlength="40"
                                                placeholder="请输入描述"
                                            >
                                            </el-input>
                                        </el-form-item>                                
                                        <!-- <span v-else class="name-text ellipsis1">描述：{{ data.description }}</span>                              -->
                                        
                                    </span>                                  
 
                                    <span
                                        v-show="showFilterObj.showControlType"
                                        class="childCmpBox"
                                    >
                                        <el-form-item 
                                            v-if="data.isEditing"
                                            prop="controlType" 
                                            :rules="{required: false, message: '子项后控件为空', trigger: 'blur'}"
                                        >
                                            <el-select 
                                                v-model="data.controlType" 
                                                placeholder="请选择子项控件"
                                                clearable
                                                filterable
                                                style="width: 150px"
                                            >
                                                <el-option 
                                                    v-for="(item, key) in childCmpList"
                                                    :key="key"
                                                    :label="item.controlName"
                                                    :value="item.controlType + ''"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <span v-else class="name-text ellipsis1">
                                            控件：{{data.controlType | controlTypeSwitch(data.controlType)}}
                                        </span>
                                    </span>                                                                                                                           

                                    <span 
                                        v-if="!onlyRead"
                                        class="handlerBox" 
                                    >                         
                                        <i 
                                            v-if="!data.isEditing"
                                            class="el-icon-folder-add btn btn-add"
                                            size="mini"
                                            type="text"
                                            @click="() => append($event, node,data)">
                                        </i>                                    
                                        <i
                                            v-show="!data.isEditing"
                                            class="el-icon-edit btn btn-edit"
                                            size="mini"
                                            type="text"
                                            @click="() => edit($event, node, data)">
                                        </i>  
                                        <el-button
                                            v-show="data.isEditing"
                                            class="btn btn-edit"
                                            size="mini"
                                            type="text"
                                            @click.native="() => save($event, node, data)">
                                            保存
                                        </el-button>                                             
                                        <el-button
                                            v-show="data.isEditing && data.id"
                                            class="btn btn-edit"
                                            size="mini"
                                            type="text"
                                            @click.native="() => cancel($event, node, data)">
                                            取消
                                        </el-button>
                                        <i
                                            v-if="data.id && !data.isEditing"
                                            :class="[data.state==1? 'el-icon-video-pause':'el-icon-video-play','btn','btn-delet']"
                                            size="mini"
                                            type="text"
                                            @click="() => setStatus($event, node, data)">
                                        </i>                                           
                                        <el-button
                                            v-if="!data.id"
                                            class="btn btn-delet"
                                            size="mini"
                                            type="text"
                                            @click.native.stop="() => remove(node, data)">
                                            移除
                                        </el-button>     
                                        <i
                                            v-if="data.id && !data.isEditing"
                                            class="el-icon-delete btn btn-delet"
                                            size="mini"
                                            type="text"
                                            @click.stop="() => deleteBtn(node, data)">
                                        </i>                                                                                                            
                                    </span>
                                </el-form>
                            </span> 
                    </el-tree>  
                </div> 
            </el-col>
        </el-row> 

    </div>
</template>
<script type="text/ecmascript-6">
import { REQ_OK } from '@/api/config'
import { checkTreeFormArray } from '@/utils/newStyleFieldValidate'
import {
    saveRoleGroup
} from '@/api/systemManage'
import BaseImgUpload from '@/base/NewStyle-cmp/common-cmp/img-upload'
import SaveFooter from '@/base/Save-footer/index'
import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin'
let that = null;
let treeId = 0;  
export default {
    mixins: [CommonInterfaceMixin],
    components: { 
        BaseImgUpload,
        SaveFooter,
    },
    props: {
        onlyRead: {
            type: Boolean,
            default: false
        },
        treeData: {
            type: Array,
            default: () => {
                return []
            }
        },
        showSearch: {
            type: Boolean,
            default: false
        },
        propRowObj: {
            type: Object,
            default: () => {
                return {}
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
            currentRoleGroupCode: '',
            treeForm: [],
            treeRulesForm: [],
            validRes: [],
            childCmpList: [
                {
                    controlType: 1,
                    controlName: '输入框'
                },
                {
                    controlType: 2,
                    controlName: '多行输入框'
                }
            ],
            showFilterObj: {
                showRemark: false,
                showColors: false,
                showLogo: false,
                showControlText: false,
                showControlType: false,
                showIsConfig: false
            }                      
        }
    },
    created(){
        that = this

    },
    computed:{
       
    },
    watch:{
        filterText(val) {
            this.$refs.tree.filter(val);
        }            
    },
    methods:{
        _refreshData(){
            this.$emit("getTreeData")
        },       
        _initData(){

        },    
        filterNode(value, data) {
            debugger
            if (!value) return true;
            return data.rolegroupname.indexOf(value) !== -1;
        },
        _signChanged(arr, id){
            if(arr && arr.length){
                for(let i =0,length=arr.length;i<length;i++){
                    let item = arr[i]
                    if(id){
                        if(item.id === id){
                            item.changed = true
                            break
                        }else {
                            if(item.childrenList && item.childrenList.length){
                                this._signChanged(item.childrenList, id)
                            }
                        }
                    }else {
                        item.changed = true
                        if(item.childrenList && item.childrenList.length){
                            this._signChanged(item.childrenList)
                        }
                    }                
                }
            }
        },
        // 树形节点被点击
        nodeClick(data, node){
            debugger
            this.$emit("treeEmit", data)
            this.$bus.$emit("treeEmitBus", data)
        },
        // 拖拽完成后
        nodeDrop(a,b){
            debugger
            this._signChanged(this.treeData)
            console.log("------拖拽完成后最终的树treeData-------",this.treeData)
        }, 
        emitUpload(data, item){
            debugger
            item.logo = data || ''
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
        nameInputChange(node, data){
            debugger
            if(data.rolegroupname){
                this.currentRoleGroupCode = ''
            }
        },
        //新增
        append (event, node, data) {
            debugger
            event = event || window.event
            // 阻止冒泡
            event.stopPropagation()
            // let newChild = { 
            //     treeId: ++treeId, 
            //     usergroupcode: '',
            //     rolegroupname: '', 
            //     logo: '',
            //     controlText: '',
            //     controlType: '',
            //     colors: '',
            //     isConfig: '',
            //     childrenList: [], 
            //     isEditing: true, 
            //     description: '', 
            //     changed: true, 
            //     state: 1, // 1 启用 0 停用
            //     itemRules: {required: true, message: '名称为空', trigger: ['blur', 'change']}
            // }
            // if (!data.childrenList) {
            //     this.$set(data, 'childrenList', []);
            // }
            // let newData = data.childrenList.concat(newChild);
            // this.$set(data, 'childrenList', newData)
            // console.log("9999999999999", data)    


            let newChild = {
                id: '',
                changed: true,
                childrenList: [],
                created: data.created,
                description: '',
                deteled: data.deleted,
                parentcode: data.parentcode,
                rolegroupcode: '',
                rolegroupname: '',
                state: '',
                updateby: data.updateby,
                updated: data.updated
            }


            // 用弹框的形式来新增和编辑
            data.changed = true
            let copyData = JSON.parse(JSON.stringify(data))

            copyData.childrenList.push(newChild);
            this.$emit("treeEmitAdd", copyData)            
        },
        // 编辑
        edit(event, node, data){
            debugger
            event = event || window.event
            // 阻止冒泡
            event.stopPropagation()

            // data.isEditing = true
            data.changed = true
            // 用弹框的形式来新增和编辑
            let copyData = JSON.parse(JSON.stringify(data))
            let newData = copyData
            this.$emit("treeEmitEdit", newData)               
        },
        _signChanged(arr, id){
            if(arr && arr.length){
                for(let i =0,length=arr.length;i<length;i++){
                    let item = arr[i]
                    if(id){
                        if(item.id === id){
                            item.changed = true
                            break
                        }else {
                            if(item.childrenList && item.childrenList.length){
                                this._signChanged(item.childrenList, id)
                            }
                        }
                    }else {
                        item.changed = true
                        if(item.childrenList && item.childrenList.length){
                            this._signChanged(item.childrenList)
                        }
                    }                
                }
            }
        },  
        // 保存
        save(event, node, data){
            debugger
            event = event || window.event      
            this._saveRoleGroup(node, data)      
        },      
        // 保存
        _saveRoleGroup(node, data){
            debugger
            this.loading = true
            this._signChanged([data])
            saveRoleGroup(this.treeData).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                    this._refreshData()
                }else {
                    this.$message({
                        type: 'error',
                        message: `保存失败,${res.data.Error}`
                    })
                }
            })
        },        
        // 取消
        cancel(event, node, data){
            debugger
            event = event || window.event
            event.stopPropagation()
            this.currentRoleGroupCode = data.rolegroupcode
            if(!data.rolegroupname){

            }else {
                data.isEditing = false
            }
        },
        // 启用停用状态
        setStatus(event, node, data){
            event = event || window.event
            event.stopPropagation()     
            this.handlerStopOrUsing(node, data)  
        },
        _refreshTree(){
            this._newStyleGetDicTree()
        },    
        // 移除
        remove(node, data) {
            const parent = node.parent;
            const childrenList = parent.data.childrenList || parent.data;
            const index = childrenList.findIndex(d => d.rolegroupcode === data.rolegroupcode);
            debugger
            if(data.id){
             
            }else {
                childrenList.splice(index, 1);
            } 
        },  
        // 删除
        deleteBtn(node, data){
            debugger
            if(data.id){
                let statusText = '删除'
                let name = data.rolegroupname || ''
                let ids = data.id ? [data.id] : []
                let baseKey = 'plat_sysmg_sys_rolegroup'
                this.commonDeleteListMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }
        },
        // 停用/启用
        handlerStopOrUsing(node, data){
            debugger           
            let statusText = data.state == 1? '停用': '启用'
            let name = data.rolegroupname || ''
            let ids = data.id ? [data.id] : []
            let baseKey = 'plat_sysmg_sys_rolegroup'
            this.commonSetStatusMixin({
                statusText,
                name,
                ids,
                baseKey
            })
        },             
        _saveDicTree(){
            debugger
            // this.loading = true
            console.log("最终保存的 树形数据为——————————————————————",this.treeData)
            saveDicTree(this.treeData).then(res => {
                debugger
                this.loading = false
                if(res && res.data.State === REQ_OK) {
                    this.$message({
                        type: 'success',
                        message: `保存成功`
                    })
                    this._refreshTree()
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
                        item.sortId = ++key
                        console.log(that.$refs[`dataForm_${item.rolegroupcode}`])
                        debugger
                        that.$refs[`dataForm_${item.rolegroupcode}`].validate(valid => {
                            debugger
                            if(valid){ 
                                resolve(valid)   
                            }else {
                                reject(new Error(`${item.rolegroupcode}验证失败`))
                                return false
                            }
                        })         
                    })
                    resArr.push(res)

                    if(item.childrenList && item.childrenList.length){
                        that.validFn(item.childrenList, resArr)
                    }
                })
            }
        },
        validUserGroup () {
            
        },
        // 保存 整体数据
        saveTree () {
            // 先进行必填项验证
            this.validRes = []
            this.validFn(this.treeData, this.validRes)
            console.log(this.validRes)
            debugger
            Promise.all(this.validRes).then(res => {
                debugger
                // 验证pass 调用 保存接口
                this._saveDicTree()
            }).catch(error => {

            })        
        },
        // 取消 整体数据
        cancelTree () {
            
        }    
    },
}
</script>
