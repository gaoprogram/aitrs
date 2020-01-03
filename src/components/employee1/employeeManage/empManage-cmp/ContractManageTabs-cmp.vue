<!--
  User: gaol
  Date: 2020/1/3
  功能： 合同管理 详情页面中  tabs 分类组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tabInfoCmp
    .tabItem
    &:hover
        cursor pointer
    .tabItem.selectedTab
        background-color #e6a23c !important
        transform scale(1.1)
        color #303133
        transition all .2s
        border none !important

</style>
<template>
  <div class="tabInfoCmp" v-if="tabList && tabList.length">
      <!-- tabList: {{tabList}} -->
    <el-button 
        :class="['tabItem', key === currentIndex ? 'selectedTab': '']"
        v-for="(item,key) in tabList"
        :key="key + item.TableCode"
        type="primary" 
        size="mini"
        :data-name="item.TableName"
        @click="selectTabitem($event,key, item)"
    >
    {{item.TableName}}
    </el-button>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
        tabList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data(){
        return {
            currentTabStrName: '', // 当前的tabitem 标签的名称
            currentIndex: 0,  // 当前的 tabitem 标签的index
        }
    },
    watch: {
    },
    created() {
        // debugger
        this.$nextTick(() => {
            if(this.tabList.length){
                this.$emit("selectTabitem", 0, this.tabList[0])
            }
        })        
    },
    methods: {
        // 点击了 tabitem 标签btn
        selectTabitem (e, idx, item) {
            debugger
            if( idx != this.currentIndex ) {
                // 触发父组件的事件
                this.$emit('selectTabitem', idx , item)
            }
            this.currentIndex = idx
        }
    }
  }
</script>
