<!--
  User: gaol
  Date: 2019/11/15
  功能： 批量设置模板中 二级分类及字段显示 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-loading-mask
    top 0 !important

.templateSecondCat-cmp
    .alreadySelected
        margin-top 20px
        .itemTeamBox
            display flex
            justify-content flex-start
            align-items center
            align-content flex-start
            flex-wrap wrap
            .wrapper
                width 100%
                .item
                    padding 5px 15px 
                    box-sizing border-box
                    margin 10px
                    background-color #d9ecff
                    // border 1px solid blue
                    border-radius 10px
                    display flex
                    justify-content flex-start
                    align-items center
                    .itemTit
                        min-width 100px
                        padding 5px 
                        font-size 14px
                        font-weight bold
                        color #000000
                        box-sizing border-box
                    .itemFieldsBox
                        padding 5px
                        flex-grow 1
                        // border 1px solid blue
                        box-sizing border-box

</style>
<template>
  <div class="templateSecondCat-cmp" v-loading="loading">
      secondCatAllData: {{secondCatAllData}}
      -----
      <!-- alreadyConfigsData: {{alreadyConfigsData}} -->
    <!--二级分类--start-->
    <div :class="['alreadySelected', finalData.length<=0? 'not_found': '']" v-if="finalData.length">
        <el-card
            shadow="never"
            class="field-set-card marginT20px"
        >
            <div class="itemTeamBox">
                <vuedraggable class="wrapper" v-model="finalData" v-bind="dragOptions">
                    <transition-group>
                        <div class="item" 
                            v-for="(itemTeam, index ) in finalData" 
                            :key="itemTeam.TeamCode + index"
                        >
                            <div class="itemTit">{{itemTeam.TeamName}}</div>
                            <div class="itemFieldsBox">
                                <!-- itemTeam.isIndeterminate_field: {{itemTeam.isIndeterminate_field}} -->
                                <!-- ----- -->
                                <!-- itemTeam.checkAllField: {{itemTeam.checkAllField}} -->
                                <el-checkbox 
                                    :indeterminate="itemTeam.isIndeterminate" 
                                    v-model="itemTeam.checkAll" 
                                    @change="handleCheckAllFieldChange(itemTeam,index, $event)"
                                >全选
                                </el-checkbox>
                                <div style="margin: 15px 0;"></div>
                                itemTeam.Fields: {{itemTeam.Fields}}
                                ------------
                                itemTeam.checkedFields: {{itemTeam.checkedFields}}
                                -----
                                <el-checkbox-group 
                                    v-model="itemTeam.checkedFields" 
                                    @change="handleCheckedFieldChange"
                                >
                                    <el-checkbox 
                                        v-for="( field, idx) in itemTeam.Fields" 
                                        :label="field.FieldCode" 
                                        :key="field.FieldCode + idx"
                                        @change="checkedFieldChange(itemTeam, idx)"
                                    >
                                    {{field.FieldName}}++ {{field.checked}}
                                    </el-checkbox>
                                </el-checkbox-group>                                     
                            </div>
                            <!-- <el-button type="primary" size="mini" @click="handleSetField(itemTeam)">设置</el-button> -->
                        </div>
                    </transition-group>
                </vuedraggable>
            </div>
        </el-card>
    </div>
    <!--二级分类--end-->    

    <!--footer部分--start-->
    <div class="footer center marginT10">
        <el-button type="primary" size="small" @click.native="handlerCancelTemplate">取消</el-button>
        <el-button type="primary" size="small" @click.native="handlerSaveTemplate">保存模板</el-button>
        <el-button type="primary" size="small" @click.native="handlerExcuteTemplate">确定,执行</el-button>
    </div>
    <!---footer部分-----end-->
  </div>
</template>


<script type="text/ecmascript-6">
  import Vuedraggable from 'vuedraggable'
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props:{
        //指定模板下的所有二级分类及字段数据
        secondCatAllData : {
            type: Array,
            default: () => {
                return []
            }
        },
        // 已经配置的所有二级分类及字段数据
        alreadyConfigsData: {
            type: Array,
            default: () => {
                return []
            }
        },
        // secondCatAllData 和 alreadyConfigsData 中的数据比较后处理好的数据
        finalData: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 当前的templateCode
        templateCode: {
            type: [String, Number],
            default: ''
        }
    },
    components: {
        SaveFooter,
        Vuedraggable
    },
    data(){
      return {
        loading: false,  // loading 状态
        initDataflag: false, 
        currentCheckedTeamObj: {}, // 当前正在设置的 对象
      }
    },
    computed:{
        dragOptions() {
            return {
                animation: 200,
                // group: "description",
                disabled: false,
                // ghostClass: "ghost"
            }
        }        
    },
    watch:{

    },
    created(){
        debugger

    },
    beforeDestroy(){

    },
    mounted(){

    },
    methods: {
      // 全选/取消全选 field
      handleCheckAllFieldChange(team, index, val){
        debugger
        this.currentCheckedTeamObj = team
        this.currentCheckedTeamObj.checkedFields = val ? this.currentCheckedTeamObj.Fields : [];
        this.currentCheckedTeamObj.isIndeterminate = false;
      },
      checkedFieldChange(item, index){
        debugger
        this.currentCheckedTeamObj = item 
      }, 
      // 
      handleCheckedFieldChange(value){
        debugger
        let checkedCount = value.length;
        this.currentCheckedTeamObj.checkAll = checkedCount === this.currentCheckedTeamObj.Fields.length
        this.currentCheckedTeamObj.isIndeterminate = checkedCount > 0 && checkedCount < this.currentCheckedTeamObj.Fields.length
      },
      // 取消
      handlerCancelTemplate(){
        this.$bus.$emit("handlerCancelTemplate")
      },
      // 处理保存的数据
      _handlerSaveData(data){
        let newData = []
        newData = this.secondCatAllData.map((item, key) => {
            return {
                TeamCode: item.TeamCode,
                TeamName: item.TeamName,
                Fields: item.checkedFields
            }
        })
        return newData
      },
      // 保存
      handlerSaveTemplate(){
        let resData = this._handlerSaveData(this.secondCatAllData)
        this.$bus.$emit("handlerSaveTemplate", resData, this.templateCode)
      },
      // 执行
      handlerExcuteTemplate(){
        let resData = this._handlerSaveData(this.secondCatAllData)
        this.$bus.$emit("handlerExcuteTemplate", resData, this.templateCode)
      },
    }
  }
</script>

