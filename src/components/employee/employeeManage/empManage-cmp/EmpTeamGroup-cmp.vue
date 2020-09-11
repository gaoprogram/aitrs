<!--
  User: gaol
  Date: 2019/9/25
  功能：员工详情页面中的 二级、三级、四级 递归分组级组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.recurionCmp-enter
    opacity 0
.recurionCmp-leave 
    opacity 0
.recurionCmp-enter-active
    transition opacity 2s
.recurionCmp-leave-active 
    transition opacity 0s

.secondGroup
    position relative
    min-height 70px
    .itemTag
        margin 5px
        &:hover
            cursor pointer
        &.selectedTag
            background-color #409EFF
            color #ffffff
        .recurionCmpBox
            position absolute
            left 0
            right 0
            top 40px

.recurionCmpBox
    .empTeamGroup-cmp
    &:before
        display block
        content ''
        width 100%
        height 1px
        border-top 1px solid #EBEEF5
</style>
<template>
  <div class="empTeamGroup-cmp">
    <!-- teamGroupData: {{teamGroupData}} -->
    <div class="secondGroup">
        <!-- <span>第：{{num}}级：</span> -->
        <!-- <transition-group name="recurionCmp"> -->
            <!-- currentTeamCode:{{currentTeamCode}} -->
            <el-tag 
                :class="['itemTag',currentTeamCode === item.TeamCode? 'selectedTag' : '']"
                size="small"
                v-if="teamGroupData && teamGroupData.length"
                v-for="(item, key) in teamGroupData" 
                :key="item.TeamCode + key"
                type="info"
                @click.native="clickTag(item, key)">
                {{item.TeamName}}

                <!---递归---start-->
                <!-- <div style="width:100%;height:1px;border-bottom:1px solid red"></div> -->
                <template v-if="item.Child && item.Child.length && currentTeamCode === item.TeamCode">
                    <div class="recurionCmpBox">
                        <!-- currentTeamCode: {{currentTeamCode}} -->
                        <teamgroup-recurion-cmp 
                             @emitSetFieldData = '_setFieldData' 
                             @emitSetCurrentTeamCode = '_setCurrentTeamCode'
                             :teamGroupData="item.Child"></teamgroup-recurion-cmp>
                    </div>
                </template>
                <!----递归---end-->    
            </el-tag>
        <!-- </transition-group> -->
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import { getListTree, teamCodeGetFeild } from '@/api/employee'

    export default {
    name: 'teamgroupRecurionCmp',
    props: {
       teamGroupData: {
           type: Array,
           default: () => {
               return []
           }
       } 
    },
    components: {

    },
    data(){
        return {
            currentTeamCode: '',  // 当前点击的 分类tag标签
            groupFieldData: [], // 传给 field 分组组件的 数据集合
        }
    },
    watch: {

    },
    created() {
        debugger
        // 获取 分组数据
        // this._getListTree()
        
    },
    methods: {
        // 获取树形结构的分组数据
        _getListTree(){
            getListTree().then(res => {
                if( res && res.State === REQ_OK ){

                }
            })
        },
        // 获取 表单 field 分组信息
        _getGroupFieldData(){
            teamCodeGetFeild(this.currentTeamCode).then(res => {
                if(res && res.data.State === REQ_OK){
                    debugger
                    this.$emit('emitSetFieldData', res.data.Data)
                    // 触发 empdetaiInfo-cmp 中改变field的数据
                    this.$bus.$emit('emitEmpDetailInfo_changeField', res.data.Data)
                    this.groupFieldData = res.data.Data
                }
            })
        },
        _setCurrentTeamCode(teamCode) {
            debugger
            this.currentTeamCode = teamCode
        },
        _setFieldData(data) {
            debugger
            this.groupFieldData = data
        },
        // 点击分类tag 标签
        clickTag(obj, idx) {
            debugger
            this.currentTeamCode = ''
            this.groupFieldData = []
            if( obj.Child && obj.Child.length ){
                // 有下一级  触发 empdetailInfo 组件中 清空 field的数据
                this.$bus.$emit('emitEmpDetailInfo_changeField', [])
                this.currentTeamCode = obj.TeamCode
                // this.$emit("emitSetCurrentTeamCode", obj.TeamCode)

            }else {
                debugger
                // 没有下一级
                this.currentTeamCode = obj.TeamCode
                // 获取 表单 field 分组信息
                // this._getGroupFieldData() 
                // 触发 basic-groupField组件中进行锚点定位
                this.$bus.$emit("anchorPoint", this.currentTeamCode)               
            }
        }
    }
}
</script>
