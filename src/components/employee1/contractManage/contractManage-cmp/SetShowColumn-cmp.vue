<!--
  User: gaol
  Date: 2019/10/09
  功能： 设置 显示列 的组件 
--->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.showColumn-cmp
    >>>.el-card
        min-height 230px !important
        .el-card__body
            padding 20px 
            border 1px solid #EBEEF5
            box-sizing border-box
</style>

<template>
    <div class="showColumn-cmp" v-loading = 'loading'>
        <!-- checkboxGroup: {{checkboxGroup}}
        --------
        obj: {{obj}} -->
        <!-- propLeftTableData： {{propLeftTableData}} -->
        <!--普通版--start--->
        <div v-if="version==0 && obj.Fields.length" class="container">
            <el-card>
                <el-checkbox 
                    :indeterminate="isIndeterminate" 
                    v-model="checkAll" 
                    @change="handleCheckAllChange">
                全选
                </el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkboxGroup" @change="handleCheckedTableChange">
                    <el-checkbox 
                        v-for="item in obj.Fields" 
                        :label="item" 
                        :key="item.TableCode">
                    {{item.FieldName}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-card>
        </div>
        <!---普通版--end--->

        <!--高级版本---start-->
        <div v-if="version===1">
            <set-customershowcolumn-cmp 
                ref="customerShowColumnHighCmp" 
                :allboxGroup="obj.Fields"
                :propLeftTableData="propLeftTableData"
                :alreadyChecked="checkboxGroup"
                :pageCode="currentPageCode"
                :tableCode="obj.TableCode"
                @emitSave="emitSave"
            ></set-customershowcolumn-cmp>
        </div>
        <!---高级版本--end-->

        <!--底部保存按钮区域--start-->
        <div class="footerBox">
            <save-footer @save="save" @cancel="cancel"></save-footer>
        </div>   
        <!--底部保存按钮区域--end-->
    </div>
</template>

<script>
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import SetCustomershowcolumnCmp from '@/base/PA-common-cmp/customerShowColumn-cmp/Setcustomershowcolumn-cmp'
    import Vuedraggable from 'vuedraggable'
    import { mapGetters } from 'vuex'
    import { REQ_OK } from '@/api/config'
    import {
        // getViewCol,
        // saveViewCol
    } from '@/api/employee'
    export default {
        props:{
            // 所有的数据
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            // 左边的数据
            propLeftTableData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            // 自定义的数据
            propCheckboxGroup: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        components: {
            SaveFooter,
            Vuedraggable,
            SetCustomershowcolumnCmp
        },
        data(){
            // const cityOptions = ['上海', '北京', '广州', '深圳'];
            return {
                version: 1, // 版本
                loading: false, // 控制loading的显示/隐藏
                checkboxGroup: [], // 已勾选的分类
                checkAll: false,
                checkedTbale: [],
                isIndeterminate: true                
            }
        },
        created(){
        },
        computed:{
            ...mapGetters([
                'currentPageCode'
            ]),
            allboxGroup(){
                return this.obj.Fields
            }
        },
        watch: {

        },
        methods: {
            handleCheckAllChange(val) {
                debugger
                this.checkboxGroup = val ? this.obj.Fields : [];
                this.isIndeterminate = false;
            },
            handleCheckedTableChange(value) {
                debugger
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.obj.Fields.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.obj.Fields;
            },      
            // 获取所有配置的数据
            _getAllSetData() {

            },
            // 获取已经勾选的配置
            _getAleadyCheckedData(data){
                debugger
                if(data && data.length){
                    data.forEach((item, idx, arr) => {
                        this.obj.Fields.forEach((val, key) => {
                            if(item.FieldCode === val.FieldCode && item.TeamCode === val.TeamCode){
                                this.checkboxGroup = this.checkboxGroup.concat(val)
                                return false
                            }
                        })
                    })
                }
                debugger
                console.log("处理完成后的this.checkboxGroup", this.checkboxGroup)
            },            
            // 获取自定义配置的数据
            _getCustomerSetData(){
                this.loading = true
                getViewCol(this.currentPageCode, this.obj.TableCode).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.checkboxGroup = res.data.Data
                        // 比较数据将已经勾选的数据勾选
                        if(res.data.Data && res.data.Data.length){
                            this.checkboxGroup = []
                            this._getAleadyCheckedData(res.data.Data)
                        }
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取自定义配置数据失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message.info("获取自定义配置数据出错")
                })   
            },
            // 高级版自定义设置组件中保存成功后触发的
            emitSave(data) {
                debugger
                // 触发父级 common-tableInfo-cmp 中 关闭弹框               
                this.$emit("saveSuccess", data)  
            },
            // 保存 
            save(){
                debugger 
                this.loading = true
                if(this.version === 0){
                    // 普通版本
                    this.$emit("saveSuccess", this.checkboxGroup)
                    // saveViewCol(this.currentPageCode, this.obj.TableCode, JSON.stringify(this.checkboxGroup)).then(res => {
                    //     debugger
                    //     this.loading = false
                    //     if(res && res.data.State === REQ_OK){
                    //         this.$message.success("保存成功")
                    //         this.$emit("saveSuccess")
                    //     }else {
                    //         this.$message({
                    //             type: 'error',
                    //             message: `保存失败，${res.data.Error}`
                    //         })
                    //     }
                    // }).catch(() => {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '保存数据出错'
                    //     })
                    // })
                }else if( this.version === 1 ){
                    // 高级版本 
                    // 调用 子组件中的 save方法进行保存
                    this.$refs.customerShowColumnHighCmp.save()
                }
            },
            // 取消
            cancel(){
                // 触发父组件取消弹框
                this.$emit("cancelSuccess")
            }
        }
    }
</script>

