<!--
  User: gaol
  Date: 2019/9/30
  功能： 设置批量员工模板(
      设置批量入职到岗模板  设置批量修改员工模板  设置批量导出员工模板 设置批量待入职员工模板 设置批量员工离职模板)      
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

   
</style>
<template>
  <div class="batchSetTemplate-cmp" v-loading="loading">
    批量设置员工模板页面
    <!---选择模板select部分--start-->
    <div class="templateBox">
        <el-button type="text">选择员工模板:</el-button>
        <el-select v-model="value" clearable placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>        
    </div>
    <!--选择模板select部分----end--->

    <!---container部分---start-->
    <div class="container">
        <el-tabs v-model="activeCatName" @tab-click="handleClickCat">
            <el-tab-pane label="在职记录" name="first">在职记录</el-tab-pane>
            <el-tab-pane label="个人资料" name="second">个人资料</el-tab-pane>
            <el-tab-pane label="合同信息" name="third">合同信息</el-tab-pane>
            <el-tab-pane label="银行信息" name="fourth">银行信息</el-tab-pane>
        </el-tabs>        
    </div>
    <!--container部分--end--->

    <!--footer部分--start-->
    <div class="footer center">
        <el-button type="primary" size="small">取消</el-button>
        <el-button type="primary" size="small">保存模板</el-button>
        <el-button type="primary" size="small">确定,执行</el-button>
    </div>
    <!---footer部分-----end-->
  </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    export default {
        components: {
            SaveFooter
        },
        props: {

        },
        data(){
            return {
                loading: false, 
                options: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, 
                    {
                        value: '选项2',
                        label: '双皮奶'
                    },
                    {
                        value: '选项3',
                    label: '蚵仔煎'
                    }, 
                    {
                        value: '选项4',
                        label: '龙须面'
                    }, 
                    {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                value: '',
                activeCatName: ''
            }
        },
        created() {
            debugger
        },
        watch: {
            value: {
                handler(newValue, oldValue){
                    // 调取接口获取 分类信息
                }
            }
        },
        methods: {
            // 切换分类
            handleClickCat(){

            },

        }
    }
</script>
