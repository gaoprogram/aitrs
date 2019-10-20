<!--
  User: gaol
  Date: 2019/10/11
  功能： 事件中 配置单个事件时的 配置组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-loading-mask
    top 0 !important

.eventSet-cmp
    .allTeam
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
  <div class="eventSet-cmp" v-loading="loading">
      <!-- loading: {{loading}} -->
    <!-- checkedObj: {{checkedObj}}
    ______ -->

    <!-- allObj: {{allObj}} -->


    <!-- allTeam: {{allTeam}} -->
    <!-- ---checkAllField:{{checkedTeams}} -->

    <!-- --- -->
    <!-- allCheckedTeamObjArr： {{allCheckedTeamObjArr}} -->
    <!-- currentTeamFieldData: {{currentTeamFieldData}} -->

    <!----所有team大类---start-->
    <div class="allTeam">
        <el-card
            shadow="never"
        >
            <!-- <el-checkbox 
                :indeterminate="isIndeterminate_team" 
                v-model="checkAllTeam" 
                @change="handleCheckAllTeamChange">
            全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div> -->
            <el-checkbox-group 
                v-model="checkedTeams" 
                @change="handleCheckedTeamChange"
            >
                <el-checkbox 
                    v-for="( team, index) in allObj" 
                    :label="team" 
                    :key="team.TeamCode + team.TeamName"
                    @change="selectedTeamChange(team, index)"
                >
                {{team.TeamName}}
                </el-checkbox>
            </el-checkbox-group>    
        </el-card>
    </div>
    <!---所有team大类---end--->


    <!--已选team大类--start-->
    <div class="alreadySelected" v-if="checkedTeams.length">
        <el-card
            shadow="never"
            class="field-set-card marginT20px"
        >
            <div class="itemTeamBox">
                <vuedraggable class="wrapper" v-model="allCheckedTeamObjArr" :options = "{animation:500}">
                    <transition-group>
                        <div class="item" 
                            v-for="(itemTeam, index ) in allCheckedTeamObjArr" 
                            :key="itemTeam.TeamCode + index"
                        >
                            <div class="itemTit">{{itemTeam.TeamName}}</div>
                            <div class="itemFieldsBox">
                                <!-- itemTeam.isIndeterminate_field: {{itemTeam.isIndeterminate_field}} -->
                                <!-- ----- -->
                                <!-- itemTeam.checkAllField: {{itemTeam.checkAllField}} -->
                                <el-checkbox 
                                    :indeterminate="itemTeam.isIndeterminate_field" 
                                    v-model="itemTeam.checkAllField" 
                                    @change="handleCheckAllFieldChange(itemTeam,index, $event)"
                                >全选
                                </el-checkbox>
                                <div style="margin: 15px 0;"></div>
                                <el-checkbox-group 
                                    v-model="itemTeam.checkedField" 
                                    @change="handleCheckedFieldChange"
                                >
                                    <el-checkbox 
                                        v-for="( field, index) in itemTeam.itemTeamFields" 
                                        :label="field" 
                                        :key="field.FieldCode + index"
                                        @change="checkedFieldChange(itemTeam, index)"
                                    >
                                    {{field.FieldName}}
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
    <!-------已选team大类------end-->    

    <div>
        <save-footer @save="saveFieldSet" @cancel="cancelFieldSet"></save-footer>
    </div>   

    <!--分组中的字段设置dialog---start-->
    <!-- <div class="fieldSetBox" v-if="showFieldSet">
        <el-dialog
            :title="`设置【${currentSetTeamObj.TeamName}】字段`"
            width="40%"
            :visible.sync="showFieldSet"
            append-to-body
            :close-on-click-modal="false"
        >
            <el-checkbox :indeterminate="isIndeterminate_field" v-model="checkAllField" @change="handleCheckAllFieldChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedField" @change="handleCheckedFieldChange">
                <el-checkbox 
                    v-for="( field, index) in currentTeamFieldData" 
                    :label="field" 
                    :key="field.FieldCode"
                >
                {{field.FieldName}}
                </el-checkbox>
            </el-checkbox-group>     

            <div class="footerBox">
                <save-footer @save="saveFieldSet" @cancel="cancelFieldSet"></save-footer>
            </div>          
        </el-dialog>
    </div> -->
    <!--分组中的字段设置dialog---end-->
  </div>
</template>


<script type="text/ecmascript-6">
  import Vuedraggable from 'vuedraggable'
  import { getEventSetFieldList, saveEventSetFieldList } from '@/api/employee'
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props:{
        currentSetEvent: {
            type: Object,
            default: () => {
                return {}
            }
        },
        checkedObj: {
            type: Array,
            default: () => {
                return []
            }
        },
        allObj: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
        SaveFooter,
        Vuedraggable
    },
    data(){
      return {
        loading: false,  // loading 状态
        showFieldSet:false,  // 控制 设置field 弹框的显示/隐藏
        checkAllTeam: false,  
        checkedTeams: [], // 已选择的 所有team对象集合
        checkedField:[],  // 已选择的所有 field集合
        currentCheckedTeamObj:{},  // 当前正在设置field 的obj对象
        allTeam: [],  // 所有team 对象集合
        isIndeterminate_team: true,  
        currentTeamFieldData: [], // 当前设置的分组下面的字段数据集合
        currentTeamIdx: 0, // 当前选择的team分类的索引值
        currentSetTeamObj: {}, // 当前正在设置的分组对象
        allCheckedTeamObjArr: [], // 已选择的所有team对象集合

        checkAllField: false,
        isIndeterminate_field: true,
      }
    },
    watch:{
        allObj: {
            handler(newValue, oldValue) {
                this.allTeam = this.allObj
            }
        }
    },
    created(){

    },
    methods: {
      // 比较 currentTeamFieldData 和 checkedObj 中的数据 将已经勾选的配置 进行 勾选
      _getAleadyCheckedData(data){
          debugger
          console.log(this.allCheckedTeamObjArr)
          console.log("已勾选的checkedObj", this.checkedTeams)
          data = this.allCheckedTeamObjArr
        if(this.checkedObj && this.checkedObj.length){
            this.checkedObj.forEach((item, idx, arr) => {
                data.forEach((val, key) => {
                    if(item.TeamCode === val.TeamCode){
                        val.checkedField = [].concat(item.Fields)
                        // this.checkedField = [
                        //     {
                        //         FieldCode: "PIMEDIINFO",
                        //         FieldName: "",
                        //         TeamCode: "PIMEDIINFO"
                        //     },

                        // ]
                        return false
                    }
                })
            })
        }
        debugger
        console.log("处理完成后的this.allCheckedTeamObjArr", this.allCheckedTeamObjArr)
      },
      // 获取分组下面的 字段数据
      _getEventSetFieldList(teamCode) {
          debugger
          this.loading = true
          getEventSetFieldList(teamCode).then(res => {
              debugger
            this.loading = false
            if(res && res.data.State === REQ_OK){
                debugger
                this.allCheckedTeamObjArr.forEach((item,key) => {
                    if(item.TeamCode === teamCode){
                        // 该team下的 所有fields 
                        if(!item.hasOwnProperty("itemTeamFields")){
                            this.$set(item, 'itemTeamFields', res.data.Data)
                        }else {
                            item["itemTeamFields"] = res.data.Data
                        }

                        // 全选的样式
                        if( !item.hasOwnProperty("isIndeterminate_field")){
                            this.$set(item, 'isIndeterminate_field', false)
                        }

                        //已经选择的fields
                        if( !item.hasOwnProperty("checkedField")){
                            this.$set(item, 'checkedField', [])
                        }

                        // 是否全选的flag
                        if(!item.hasOwnProperty("checkAllField")){
                            this.$set(item, 'checkAllField', false)
                        }
                    }
                })
                
                debugger
                // 此时需要 比较 currentTeamFieldData 和 checkedObj 中的数据 将已经勾选的配置 进行 勾选
                this._getAleadyCheckedData(res.data.Data)
            }else {
                this.$message({
                    type: 'error',
                    message: `获取分组的字段数据失败err,${res.data.Error}`
                })
            }
          }).catch(() => {
              this.$message({
                  type: 'warning',
                  message: '获取分组的字段数据错误'
              })
          })
      },  
      _handlerData(arr){
        let newArr = []
        if( arr && arr.length ){
            newArr = arr.map((item, i, arr) => {
                return {
                    TeamCode: item.TeamCode,
                    Fields: item.checkedField
                }
            })
        }
        return newArr
      },
      // 保存单个事件的field分组配置
      async _saveEventSetFieldList(){
          debugger
          console.log(this.currentSetEvent)
          console.log(this.allCheckedTeamObjArr)
        debugger
        // 处理数据
        
        let arrData = await this._handlerData(this.allCheckedTeamObjArr)
        debugger
        this.loading = true
        saveEventSetFieldList(this.currentSetEvent.EventCode, JSON.stringify(arrData)).then(res => {
            debugger
            this.loading = false
            if(res && res.data.State === REQ_OK){
                this.$message({
                    type: 'success',
                    message: '保存分组设置成功'
                })
                // 触发父级关闭弹框
                this.$emit("saveSuccess")
            }else {
                this.$message({
                    type: 'error',
                    message: `保存分组设置失败err, ${res.data.Error}`
                })
            }
        }).catch(() => {
            this.$message({
                type: 'warning',
                message: '保存分组设置失败'
            })
        })
      },
      // 全选/取消全选 team
      handleCheckAllTeamChange(val) {
        debugger
        this.checkedTeams = val ? this.allTeam : []
        this.isIndeterminate_team = false

        if( this.checkedTeams  && this.checkedTeams.length){
            this.checkedTeams.forEach((item, key) => {
                if(!item.hasOwnProperty('itemTeamFields')){
                    this.$set(item, 'itemTeamFields', [])
                }
            })
        }        
        this.allCheckedTeamObjArr = this.checkedTeams
      },
      // 单个选择/单个取消选择 team
      selectedTeamChange(obj, index){
        debugger
        this.currentSetTeamObj = obj
        this.currentTeamIdx = index
        // this.showFieldSet = true
        // 获取该team下的field字段
        this._getEventSetFieldList(obj.TeamCode)

      },
      // 单个选择 team
      handleCheckedTeamChange(value) {
        debugger
        // let teamName = ''
        // let teamCode = ''
        // if(value && value.length){
        //     this.allCheckedTeamObjArr = value.map((item, i, arr) => {
        //         return {
        //             TeamCode: item.split('&&&')[0],
        //             TeamName: item.split('&&&')[1]
        //         }
        //     })
        // }
        
        if( value  && value.length){
            value.forEach((item, key) => {
                if(!item.hasOwnProperty('itemTeamFields')){
                    this.$set(item, 'itemTeamFields', [])
                }

                if( !item.hasOwnProperty("isIndeterminate_field")){
                    this.$set(item, 'isIndeterminate_field', false)
                }   
                
                if( !item.hasOwnProperty("checkedField")){
                    this.$set(item, 'checkedField', [])
                }       
                
                if(!item.hasOwnProperty("checkAllField")){
                    this.$set(item, 'checkAllField', false)
                }                
            })
        }
        this.allCheckedTeamObjArr = value
        console.log(this.allCheckedTeamObjArr)
        let checkedCount = value.length;
        this.checkAllTeams = checkedCount === this.allTeam.length
        this.isIndeterminate_team = checkedCount > 0 && checkedCount < this.allTeam.length
      },
      // 全选/取消全选 field
      handleCheckAllFieldChange(item, index, val){
        debugger
        // this.checkedField = val ? this.currentTeamFieldData : []
        // this.isIndeterminate_field = false
        this.currentCheckedTeamObj = item
        this.currentCheckedTeamObj.checkedField = val ? this.currentCheckedTeamObj.itemTeamFields : []
        this.currentCheckedTeamObj.isIndeterminate_field = false
        this.currentCheckedTeamObj.checkAllField = val

      },
      checkedFieldChange(item, index){
        debugger
        this.currentCheckedTeamObj = item
      },
      // 单个选择 field 
      handleCheckedFieldChange(value){
        debugger
        let checkedCount = value.length;
        this.currentCheckedTeamObj.checkAllField = checkedCount === this.currentCheckedTeamObj.itemTeamFields.length

        if( checkedCount > 0 && checkedCount < this.currentCheckedTeamObj.itemTeamFields.length ){
            this.currentCheckedTeamObj.isIndeterminate_field = true
        }else {
            this.currentCheckedTeamObj.isIndeterminate_field = false
        }

        // this.checkAllField = checkedCount === this.currentTeamFieldData.length;
        // this.isIndeterminate_field = checkedCount > 0 && checkedCount < this.currentTeamFieldData.length;        
        // this.checkedField = value
      },
      // 点击设置
      handleSetField(obj){
          debugger
          this.currentSetTeamObj = obj
          this.showFieldSet = true
          // 获取该team下的field字段
          this._getEventSetFieldList(obj.TeamCode)
      },

      // 保存field设置
      saveFieldSet(){
        this._saveEventSetFieldList()
        
      },  
      // 取消field设置
      cancelFieldSet(){
          // 触发父级进行 弹框的取消
          this.$emit('cancelSet')
      } 
    }
  }
</script>

