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
        max-height 400px
        overflow auto
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
  <div class="templateSecondCat-cmp animated fadeInLeft fast" v-loading="loading">
      <!-- defaultAllData: {{defaultAllData}}
      ----- -->
      <!-- templateAllData: {{templateAllData}} -->
      <!-- finalData: {{finalData}} -->
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
                                <!-- itemTeam.Fields: {{itemTeam.Fields}}
                                ------------
                                itemTeam.checkedFields: {{itemTeam.checkedFields}}
                                ----- -->
                                <!-- <el-checkbox-group 
                                    v-model="chek" 
                                    @change="handleCheckedFieldChange"
                                > -->
                                    <!-- <el-checkbox 
                                        v-for="( field, idx) in itemTeam.Fields" 
                                        :label="field.FieldCode" 
                                        :checked="field.checked"
                                        :key="field.FieldCode + idx"
                                        @change="checkedFieldChange(itemTeam, idx)"
                                    >
                                    {{field.FieldName}}++ {{field.checked}}
                                    </el-checkbox> -->
                                    <span
                                        v-for="( field, idx) in itemTeam.Fields"
                                        :key="field.FieldCode + idx"
                                    >
                                        <label :for="field.FieldCode" style="cursor: pointer">
                                            <input type="checkbox" 
                                                :id="field.FieldCode"
                                                :name="field.FieldName"
                                                :checked="field.Flag===1"
                                                style="vertical-align: middle;margin: 5px"
                                                @change="checkedFieldChange(itemTeam, idx)"
                                            ></input> 
                                            <span 
                                                :style="field.Flag === 1? 'color:#409eff':'#909399'"
                                                :class="field.Flag === 1? 'animated fadeInLeft fast': ''"
                                            >{{field.FieldName}}</span>
                                        </label>
                                    </span>
                                                                     
                                <!-- </el-checkbox-group>                                      -->
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
        <!-- <el-button type="primary" size="small" @click.native="handlerExcuteTemplate">下载</el-button> -->
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
        //指定模板下的 所有的全量数据
        defaultAllData : {
            type: Array,
            default: () => {
                return []
            }
        },
        // 所有分类的数据集合
        templateAllData: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 指定分类下的 配置信息
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
        },
        // 是否是新增
        isAddNewTemplate: {
            type: Boolean,
            default: false
        }        
    },
    components: {
        SaveFooter,
        Vuedraggable
    },
    data(){
      return {
        loading: false,  // loading 状态
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
        // this.currentCheckedTeamObj.checkedFields = val ? this.currentCheckedTeamObj.Fields : [];
        this.currentCheckedTeamObj.isIndeterminate = false;


        this.currentCheckedTeamObj.Fields.forEach((item, key) => {
            // if(val){
            //     if(item.checked){
            //         item.checked = true
            //     }else {
            //         this.$set(item, 'checked', true)
            //     }
            // }else {
            //     if(item.checked){
            //         item.checked = false
            //     }else {
            //         this.$set(item, 'checked', false)
            //     }
            // }
            if(val){
                // 全选
                item.Flag = 1
            }else {
                item.Flag = 0
            }
        })

      },
      checkedFieldChange(item, index){
        debugger
        this.currentCheckedTeamObj = item 
        // if(this.currentCheckedTeamObj.Fields[index]['checked']){
        //     this.currentCheckedTeamObj.Fields[index]['checked'] = !this.currentCheckedTeamObj.Fields[index]['checked']
        // }else {
        //     this.$set(this.currentCheckedTeamObj.Fields[index], 'checked', true)
        // }
        if(this.currentCheckedTeamObj.Fields[index]['Flag'] === 1){
            this.currentCheckedTeamObj.Fields[index]['Flag'] = 0
        }else if( this.currentCheckedTeamObj.Fields[index]['Flag'] === 0 ){
             this.currentCheckedTeamObj.Fields[index]['Flag'] = 1
        }        
        debugger
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
        // this.$bus.$emit("handlerCancelTemplate")
        this.$emit("handlerCancelTemplate")
      },
      // 处理保存的数据
      _handlerSaveData(data){
        debugger
        let newData = []
        newData = data.map((item, key) => {
            item.newFields = []
            if(item.Child && item.Child.length){
               item.Child.forEach((val, i) => {
                    if(val.Fields && val.Fields.length){
                        val.Fields = val.Fields.filter((value, k) => {
                            return value.Flag === 1
                        })

                    }
                    
                    if(val.Fields && val.Fields.length){
                        val.Fields.forEach((value, index) => {
                            item.newFields.push(value) 
                        })
                    }
                })
            }

            return {
                TeamCode: item.TeamCode,
                TeamName: item.TeamName,
                Fields: item.newFields
            }
        })
        debugger
        return newData
      },
      // 保存
      handlerSaveTemplate(){
        //   console.log(this.finalData)
        //   console.log(this.templateAllData)
        debugger
        let newAllData = JSON.parse(JSON.stringify(this.templateAllData))
        let resData = this._handlerSaveData(newAllData)
        debugger
        // this.$bus.$emit("handlerSaveTemplate", resData, this.templateCode)

        this.$emit("handlerSaveTemplate", resData, this.templateCode)
      },
      // 执行
      handlerExcuteTemplate(){
        let newAllData = JSON.parse(JSON.stringify(this.templateAllData))
        let resData = this._handlerSaveData(newAllData)
        debugger
        // this.$bus.$emit("handlerExcuteTemplate", resData, this.templateCode)
        this.$emit("handlerSaveTemplate", resData, this.templateCode)
      },
    }
  }
</script>

