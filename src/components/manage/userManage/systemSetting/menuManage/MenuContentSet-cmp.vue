<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--菜单管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.menuContentSet-cmp
    padding 0 20px
    box-sizing border-box
    .searchTop
        margin 5px 0 10px 0
    .item-container
        display inline-block
        >>>.el-input
            display inline-block !important
            width 200px
    .tableContainerWrap
        .contentTop
            text-align right
            margin-bottom 10px
>>>.el-dialog
    .el-dialog__body
        .el-form
            .item-container
                .tit
                    display inline-block
                    min-width 50px
                .el-form-item
                    display inline-block
                    width 300px

</style>

<template>
    <div class="menuContentSet-cmp" v-loading="loading">

        <!--搜索部分--start-->
        <div class="searchTop">
            <div class="item-container">
                <span class="tit">关键词</span>
                <el-input 
                    v-model="search.searchTit"
                    placeholder="名称,菜单码,页面码">
                </el-input>
            </div>

            <div class="item-container">
                <span class="tit">适用范围</span>
                <el-select 
                    v-model="search.searchRange"
                    placeholder="请选择">
                    <el-option
                        label="系统"
                    >
                    </el-option>
                    <el-option
                        label="自定义"
                    >
                    </el-option>
                </el-select>
            </div>

            <div class="item-container">
                <span class="tit">移动端显示</span>
                <el-select 
                    v-model="search.searchPC"
                    placeholder="请选择">
                    <el-option
                        label="是"
                    >
                    </el-option>
                    <el-option
                        label="否"
                    >
                    </el-option>                    
                </el-select>   
            </div>   

            <div class="item-container">
                <span class="tit">pc端显示</span>
                <el-select 
                    v-model="search.searchMobile"
                    placeholder="请选择">
                    <el-option
                        label="是"
                    >
                    </el-option>
                    <el-option
                        label="否"
                    >
                    </el-option>                    
                </el-select>   
            </div>  

            <div class="item-container">
                <el-button type="primary" size="small">搜索</el-button>    
            </div>                          

        </div>        
        <!---搜索部分---end-->

        <!--table表格区--start-->
        <div class="tableContainerWrap">
            <div class="contentTop">
                <el-button type="primary" size="mini" @click.native="handlerAdd">新增</el-button>
                <el-button type="primary" size="mini">排序</el-button>
            </div>

            <div class="tableList">
                <el-table
                    style="width:100%"
                    border 
                    :data="tableData"
                >
                    <el-table-column
                        label="图标"
                        prop="pic"
                    >
                    </el-table-column>

                    <el-table-column
                        label="菜单名"
                        prop="menuName"
                    >
                    </el-table-column>


                    <el-table-column
                        label="菜单码"
                        prop="menuCode"
                    >
                    </el-table-column>

                    <el-table-column
                        label="页面名-版本"
                        prop="pageCode"
                    >
                    </el-table-column>

                    <el-table-column
                        label="模块"
                        prop="moduleName"
                    >
                    </el-table-column>

                    <el-table-column
                        label="系统"
                        prop="system"
                    >
                    </el-table-column>   

                    <el-table-column
                        label="公司"
                        prop="companyName"
                    >
                    </el-table-column>    

                    <el-table-column
                        label="个人"
                        prop="personal"
                    >
                    </el-table-column>     

                    <el-table-column
                        label="PC"
                        prop="pc"
                    >
                    </el-table-column>        

                    <el-table-column
                        label="移动端"
                        prop="mobile"
                    >
                    </el-table-column>   

                    <el-table-column
                        label="备注"
                        prop="remark"
                    >
                    </el-table-column>   

                    <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerEdit">
                                编辑
                            </el-button>
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerDelete">
                            删除
                            </el-button>
                        </template>
                    </el-table-column>                                                                                                                                 
                </el-table>
            </div>
        </div>        
        <!--table表格区---end--->

        <!--编辑/新增弹框--start-->
        <div class="commonDialog" v-if="showEditDialog">
            <el-dialog
                title="菜单信息"
                :visible.sync="showEditDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <el-form :form="formDialog">
                    <div class="item-container">
                        <span class="tit">名称</span>
                        <el-form-item>
                            <el-input v-model='dialogObj.name' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>
                    <div class="item-container">
                        <span class="tit">菜单码</span>
                        <span class="titValue">系统生成</span>
                    </div>
                    <div class="item-container">
                        <span class="tit">适用范围</span>
                        <el-form-item>
                            <el-select v-model='dialogObj.range' multiselectable>
                                <el-option
                                    label="网站可见"
                                ></el-option>
                                <el-option
                                    label="移动端可见"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="item-container">
                        <span class="tit">pc端显示</span>
                        <el-form-item v-model='dialogObj.pcShow'>
                            <el-select>
                                <el-option label="是"></el-option>
                                <el-option label="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="item-container">
                        <span class="tit">移动端显示</span>
                        <el-form-item v-model='dialogObj.mobileShow'>
                            <el-option label="是"></el-option>
                            <el-option label="否"></el-option>
                        </el-form-item>
                    </div>
                    <div class="item-container">
                        <span class="tit">备注</span>
                        <el-form-item>
                            <el-input v-model='dialogObj.remark' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>   
                    <div class="item-container">
                        <span class="tit">图标</span>
                        <el-form-item>
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>                            
                        </el-form-item>
                    </div>                                                                                                                       
                </el-form>
            </el-dialog>
        </div>
        <!---编辑/新增弹框-end-->
    </div>
</template>

<script type="text/ecmascript-6">
//   import MenuTreeCmp from '@/base/Manage-common-cmp/MenuTree-cmp'
  export default {
    props:{
        tableData: {
            type: Array,
            default: () => {
                return [
                    {
                        pic: 'www.baidu.com',
                        menuName: '审批流',
                        menuCode: '203048304830',
                        pageCode: 'PDKDFJ434',
                        moduleName: 'PA',
                        system: 'window 10',
                        companyName: '阿里',
                        personal: 'geren',
                        pc: 'pc',
                        mobile: '小程序',
                        remark: '这是备注信息'
                    }
                ]
            }
        }
    },
    components: {
    },
    data(){
      return {
        loading: false, // 加载loading
        showEditDialog: false, // 控制编辑/新增弹框的显示/隐藏
        fileList: [
                {   name: 'food.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, 
                {
                    name: 'food2.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ],
        search: {
            searchTit: '',
            searchRange: '',
            searchMobile: '',
            searchPC: ''
        },
        dialogObj: {
            name: '',
            range: '',
            pcShow: 'pcShow',
            mobileShow: 'mobilShow',
            remark: 'beizhu',
        }
      }
    },
    methods: {
        // 编辑
        handlerEdit(row, index) {
            this.showEditDialog = true
        },
        //新增
        handlerAdd(){
            Object.assign(this.dialogObj, {
                name: '',
                range: '',
                pcShow: '',
                mobileShow: '',
                remark: '',                
            })
            this.showEditDialog = true
        },
        // 删除
        handlerDelete(row, index){
            this.$confirm("确定要删除吗？","提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{

            }).catch(() =>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 删除前的回调
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 上传前
        handlePreview(file) {
            console.log(file);
        },
        // 过滤
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },

        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }        
    },
  }
</script>


