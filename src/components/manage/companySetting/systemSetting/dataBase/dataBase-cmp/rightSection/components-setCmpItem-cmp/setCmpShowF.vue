<!--
    User:
    Date:
    功能: 显示字段区 设置组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div>
        setShowF
        <el-form-item label="名称">
            <el-input style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="宽度">
            <el-radio-group>
                <el-radio label="100%"></el-radio>
                <el-radio label="50%"></el-radio>
                <el-radio label="25%"></el-radio>
            </el-radio-group>
        </el-form-item>  
        <el-form-item label="字段设置">
            <el-button type="text" @click.native="clickAdd">添加字段</el-button>
        </el-form-item>   

        <div v-if="showAddField">
            <atris-drawer-cmp
                :tit="dialogTit"    
                size="300px"
                :dialog.sync="showAddField"        
                @emitClickSureBtn="saveAddGroup"
            >   
                <el-form>
                    <el-form-item>
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
            </atris-drawer-cmp>   
        </div>           
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
export default {
    data() {
        return {
            showAddField: false,
            dialogTit: '添加字段'
        }
    },
    created(){
    },
    computed:{
    },
    methods:{
       clickAdd(){
           debugger
           this.showAddField = true
       },
       saveAddGroup(){

       }
    },
}
</script>
