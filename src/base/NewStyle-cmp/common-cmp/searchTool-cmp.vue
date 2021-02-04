<!--
  User: gaol
  Date: 2020/12/30
  功能：通用的 搜索条件框组件 moreSearch 
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.more-search-conditions-cmp
    position relative
    margin 0 0px 10px 0
    box-sizing border-box
.searchContent
    opacity 0;
    height 1px;
    overflow hidden
    transition all .8s
    border-radius 5px
    padding 5px
.searchContent.show
    display block
    opacity 1
    border 1px dotted rgba(0,0,0,.1)
    margin 10px 0
    transition all .8s
</style>

<template>
    <div>
        <div 
            :span="24" 
            class="more-search-conditions-cmp"
        >
            <div 
                :class="['searchContentWrap']" 
                style="width:100%"
            >
                <div class="allBtnBox u-f-jsb">
                    <div class="otherBtnBox u-f-g0">
                        <slot name="handlerBtnWrap"></slot>
                    </div>

                    <div class="moreConditionsBtnBox">
                        <el-button 
                            type="primary" 
                            size="mini" 
                            @click.native="clickMoreConditionBtn"
                            icon="el-icon-search"
                        >
                            筛选
                            <i :class="[showMoreSearchWrap? 'el-icon-caret-top': 'el-icon-caret-bottom']"></i>
                        </el-button>
                    </div>  
                </div>

                <!-- showMoreSearchWrap: {{showMoreSearchWrap}}
                ---
                searchContentStyle: {{searchContentStyle}} -->
                <div 
                    class="moreSearchWrap"
                >
                    <div 
                        :id="propSearchContentId"
                        :class="['searchContent', 'u-f-ajc', 'u-f-column',showMoreSearchWrap? 'show':'']" 
                        :style="{searchContentStyle}"
                    >
                        <slot name="moreSearch"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
        propSearchContentId: {
            type: [String,Number],
            default: () => {
                return 'searchContentId'
            }
        }
    },
    components: {

    },
    computed: {
        searchContentStyle(){
            return `height:${this.searchContentHeight}px`
        }
    },
    watch: {

    },
    data(){
      return {
        showMoreSearchWrap: false,
        searchContentHeight: 0,  // 搜索内容的宽度
      }
    },
    created(){

    },
    methods: {
        // 点击展开/收起搜索条件
        clickMoreConditionBtn(){
            this.$emit("emitRefreshTable", this.queryObj)
            this.showMoreSearchWrap = !this.showMoreSearchWrap
            // debugger
            let newObj = document.getElementById(`${this.propSearchContentId}`)
            // console.log("-------newObj-------------", newObj)
            if(this.showMoreSearchWrap){
                newObj.style.display = 'block'
                // this.searchContentHeight = (document.getElementsByClassName("searchContent")[0].scrollHeight) || 0
                this.searchContentHeight = (newObj.scrollHeight) || 0
                
                // console.log("--------", document.getElementsByClassName("searchContent")[0].scrollHeight + 5)
                // document.getElementsByClassName("searchContent")[0].style.height = this.searchContentHeight +'px'
                newObj.style.height = this.searchContentHeight +'px'
                // console.log("-----searchContentHeight--------",document.getElementsByClassName("searchContent")[0].style.height)
                console.log("-----searchContentHeight--------",newObj.style.height)
            }else {
                this.searchContentHeight = 0
                newObj.style.height = '1px'
            }
        }
    }
}
</script>


