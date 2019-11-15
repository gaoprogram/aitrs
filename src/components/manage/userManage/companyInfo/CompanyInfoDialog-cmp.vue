<!--
  User: gaol
  Date: 2019/11/14
  功能：平台系统设置——用户管理-公司信息 中的 编辑弹框组件
-->
<style lang="stylus" ref="stylesheet/stylus" scope>

</style>
<template>
    <div class="infoBox">
        <el-form ref="formObj" label-width="100px">
            <div class="u-f-ajc u-f-wrap">
                <div class="item">
                    <el-form-item label="企业编码">
                        <el-input placeholder="请输入企业编码"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="企业名称">
                        <el-input placeholder="请输入企业名称"></el-input>
                    </el-form-item>
                </div>      
                <div class="item">
                    <el-form-item label="企业地址">
                        <el-input placeholder="请输入地方"></el-input>
                    </el-form-item>
                </div>   
                <div class="item">
                    <el-form-item label="企业传真">
                        <el-input placeholder="请输入企业传真"></el-input>
                    </el-form-item>
                </div>   
                <div class="item">
                    <el-form-item label="企业邮箱">
                        <el-input placeholder="请输入企业邮箱"></el-input>
                    </el-form-item>
                </div>    

                <div class="item">
                    <el-form-item label="企业执照">
                        <el-input placeholder="请输入企业执照"></el-input>
                    </el-form-item>
                </div>                                                                           
            </div>
        </el-form>

        <save-footer @save="save" @cancel="cancel"></save-footer>
    </div>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
export default {
    components: {
        SaveFooter
    },
    data(){
        return {
            
        }
    },
    methods: {
        // 保存
        save(){
            this.$refs.formObj.validate(valid => {
                if(valid){
                    this.$emit("saveSuccess")
                }else {

                }
            })
        },
        //取消保存
        cancel(){
            this.$emit("cancelSave")
        }
    }
}
</script>