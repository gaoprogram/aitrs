<!--
  User: gaol
  Date: 2019/8/9
  功能： 在职员工页面的 tab分类组件
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
        border none !important

</style>
<template>
  <div class="tabInfoCmp" v-if="tabList && tabList.length">
      <!-- tabList: {{tabList}} -->
    <el-button 
        :class="['tabItem', item.selectedTab ? 'selectedTab': '']"
        v-for="(item,key) in tabList"
        v-if="key <= 2 && forward ==='right'"
        :key="key"
        type="primary" 
        size="mini"
        :data-name="item.name"
        @click="selectTabitem($event,key)"
    >
    {{item.name}}
    </el-button>

    <transition name="">
        <el-button 
            :class="['tabItem', item.selectedTab ? 'selectedTab': '']"
            v-for="(item,key) in tabList"
            v-if="forward ==='left'"
            :key="key"
            type="primary" 
            size="mini"
            :data-name="item.name"
            @click="selectTabitem($event, key)"
        >
        {{item.name}}
        </el-button>
    </transition>
    <span class="spread" v-show="tabList && tabList.length && tabList.length>3" @click="clickSpreadBtn">
        <i :class="['point', forward=== 'right'? 'el-icon-d-arrow-right': 'el-icon-d-arrow-left']"></i>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
    let getStr = function(str) {
        switch(str) {
          // 在职记录
          case '在职记录':
              return 'JobRecord'
            break;
          // 合同信息
          case '合同信息':
              return 'Contract'
            break;
          // 银行信息
          case '银行信息':
              return 'Bank'
            break;
          // 家庭成员
          case '家庭成员':
              return 'Family'
            break;
          // 子女教育
          case '子女教育':
              return 'childrenEducation'
            break;
          // 继续教育
          case '继续教育':
              return 'ContinueEducation'
            break;
          // 大病
          case '大病':
              return 'Illness'
            break;
          // 住房贷款
          case '住房贷款':
              return 'HomeLoans'
            break;     
          // 住房租金
          case '住房租金':
              return 'HomeRent'
            break;  
          // 赡养老人
          case '赡养老人':
              return 'SupportOlder'
            break;   
        }
    }
  export default {
    props: {
        tabList: {
            type: Array,
            default: () => {
                return [
                    {
                        num: 0,
                        name: '在职记录',
                        str: 'JobRecord',
                        selectedTab: true
                    },
                    {
                        num: 1,
                        name: '合同信息',
                        str: 'Contract',
                        selectedTab: false
                    },
                    {
                        num: 2,
                        name: '银行信息',
                        str: 'Bank',
                        selectedTab: false
                    },
                    {
                        num: 3,
                        name: '家庭成员',
                        str: 'Family',
                        selectedTab: false
                    },
                    {
                        num: 4,
                        name: '子女教育',
                        str: 'childrenEducation',
                        selectedTab: false
                    },
                    {
                        num: 5,
                        name: '继续教育',
                        str: 'ContinueEducation',
                        selectedTab: false
                    }, 
                    {
                        num: 6,
                        name: '大病',
                        str: 'Illness',
                        selectedTab: false
                    },   
                    {
                        num: 7,
                        name: '住房贷款',
                        str: 'HomeLoans',
                        selectedTab: false
                    },   
                    {
                        num: 8,
                        name: '住房租金',
                        str: 'HomeRent',
                        selectedTab: false
                    },   
                    {
                        num: 9,
                        name: '赡养老人',
                        str: 'SupportOlder',
                        selectedTab: false
                    }                                                                                                                                                                                                        
                ]
            }
        }
    },
    data(){
        return {
            forward: "right",  // 展开箭头的方向  left、 right
            currentTabStrName: '', // 当前的tabitem 标签的名称
            currentIndex: 0,  // 当前的 tabitem 标签的index
            // selectedTab: ''
        }
    },
    watch: {
        currentIndex: {
            handler(newValue, olderValue) {
                if( newValue != this.currentIndex ) {
                    // 调接口
                    this._getTableData()
                }
            }
        }
    },
    created() {
        debugger
        console.log(this.tabList)
    },
    methods: {
        // 获取表格数据
        _getTableData () {

        },
        // 点击了 展开的btn
        clickSpreadBtn () {
            if(this.forward === 'right'){
                this.forward = 'left'
            }else {
                this.forward = 'right'
            }
        },
        // 点击了 tabitem 标签btn
        selectTabitem (e, idx) {
            if(this.tabList && this.tabList.length){
                this.tabList.forEach((item,key) => {
                    if(key === idx){
                        this.tabList[idx]['selectedTab'] = true
                    }else {
                        item.selectedTab = false
                    }
                })
            }

            
            // let str = e.currentTarget.dataset.name || ''
            // debugger
            // if ( str && str !== this.currentTabStrName ){
            //     // 触发父组件的事件
            //     this.$emit('selectTabitem', getStr(str))
            // }
            // this.currentTabStrName =  str

            if( idx != this.currentIndex ) {
                // 触发父组件的事件
                this.$emit('selectTabitem', idx )
            }

            this.currentIndex = idx
        }
    }
  }
</script>
