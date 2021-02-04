<!--
    User:
    Date:
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div>
        setCmpContent
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
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
export default {
    data() {
        return {
        }
    },
   created(){
   },
   computed:{
   },
   methods:{
   },
}
</script>
