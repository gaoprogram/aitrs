<!--
  User: gaol
  Date: 2019/8/9
  功能： 在职员工页面中 tabs 分类组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
@keyframes spread {
    0% {
        transform translateX(0)
    }
    50% {
        transform translateX(10px)
    }
    100% {
        transform translateX(0)
    }
}

// transition 动画
.more-enter 
    opacity 0
.more-enter-active 
    transition opacity  2s
.more-leave 
    opacity 0
.more-leave-active
    transition opacity 0s


.tabInfoCmp
    .spread /deep/
        padding 3px
        width 25px
        display inline-block
        /* height: 20px; */
        background-color rgba(34,158,255,0.5)
        border-radius 3px
        vertical-align middle
        .point
            animation-name spread 
            animation-delay .5s
            animation-duration 1.5s
            animation-iteration-count infinite
    &:hover
        cursor pointer
        // background-color rgba(34,158,255,1)  
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
        v-if="key <= 2 && forward ==='right'"
        :key="key + item.TableCode"
        type="primary" 
        size="mini"
        :data-name="item.TableName"
        @click="selectTabitem($event,key, item)"
    >
    {{item.TableName}}
    </el-button>

    <transition-group name="more">
        <el-button 
            :class="['tabItem', key === currentIndex ? 'selectedTab': '']"
            v-for="(item,key) in tabList"
            v-if="forward ==='left'"
            :key="key + item.TableCode"
            type="primary" 
            size="mini"
            :data-name="item.TableName"
            @click="selectTabitem($event, key, item)"
        >
        {{item.TableName}}
        </el-button>
    </transition-group>    

    <transition name="more">
        <span class="spread marginL10" v-show="tabList && tabList.length && tabList.length>3" @click="clickSpreadBtn">
            <i :class="['point', forward=== 'right'? 'el-icon-d-arrow-right': 'el-icon-d-arrow-left']"></i>
        </span>        
    </transition>
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
            forward: "right",  // 展开箭头的方向  left、 right
            currentTabStrName: '', // 当前的tabitem 标签的名称
            currentIndex: 0,  // 当前的 tabitem 标签的index
        }
    },
    watch: {
        'tabList.length':{
            handler(newValue, oldValue){
                if(newValue){
                    // 触发父组件的事件
                    this.$emit("selectTabitem", this.currentIndex, this.tabList[this.currentIndex])
                    // busEvent 触发
                    this.$bus.$emit('selectTabitem', this.currentIndex , this.tabList[this.currentIndex])
                    // 将当前 tabItem 存入 vuex 中
                    this.$store.dispatch("setCurrentTabItem", this.tabList[this.currentIndex])   
                }
            },
            immediate: true
        }
    },
    created() {
       
    },
    mounted(){      
    },
    methods: {
        // 点击了 展开的btn
        clickSpreadBtn () {
            if(this.forward === 'right'){
                this.forward = 'left'
            }else {
                this.forward = 'right'
            }
        },
        // 点击了 tabitem 标签btn
        selectTabitem (e, idx, item) {
            debugger
            if( idx != this.currentIndex ) {
                // 触发父组件的事件
                this.$emit('selectTabitem', idx , item)
                // busEvent 触发
                this.$bus.$emit('selectTabitem', idx , item)
                // 将当前 tabItem 存入 vuex 中
                this.$store.dispatch("setCurrentTabItem", item)
            }
            this.currentIndex = idx
        }
    }
  }
</script>
