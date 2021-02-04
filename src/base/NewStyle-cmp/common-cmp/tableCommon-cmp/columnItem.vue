<!--
    User:
    Date:  多级表头组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <el-table-column
        :prop="col.property"
        :label="col.label"
        :sortable="col.sortable"
        align="center"
    >
        <template 
            v-for="(item, key) in col.childrenList"
        >
            <column-item 
                v-if="item.childrenList && item.childrenList.length"
                :key="key"
                :col="item"
            ></column-item>
            <el-table-column
                v-else
                :prop="item.property"
                :label="item.label"
                :sortable="item.sortable"                
            >
            </el-table-column>
        </template>  
    </el-table-column>
</template>
<script type="text/ecmascript-6">
export default {
    name: 'columnItem',
    props: {
        col: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
    },
    data() {
        return {
        }
    },
    created(){
    },
    computed:{
    },
    watch:{
    },
    methods:{
    }
}
</script>
