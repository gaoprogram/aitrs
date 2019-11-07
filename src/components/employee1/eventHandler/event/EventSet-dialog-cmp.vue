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
        min-height 100px
        .noBorder
            border none !important
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
    <!-- checkedTeams: {{checkedTeams}}
    ______
    
    allTeam: {{allTeam}} -->
    <!-- ---checkAllField:{{checkedTeams}} -->

    <!-- --- -->
    <!-- allCheckedTeamObjArr： {{allCheckedTeamObjArr}} -->
    <!-- currentTeamFieldData: {{currentTeamFieldData}} -->

    <!----所有team大类---start-->
    <div :class="['allTeam',allTeam.length<=0? 'not_found': '' ]">
        <el-card
            :class="['allTeam-card',allTeam.length<=0? 'noBorder': '' ]"
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
                    v-for="( team, index) in allTeam" 
                    :label="team" 
                    :key="team.TeamCode + team.TeamName"
                    :checked="team.checked"                    
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
                <vuedraggable class="wrapper" v-model="allCheckedTeamObjArr" v-bind="dragOptions">
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
  import { 
        getEventSetFieldList, 
        saveEventSetFieldList, 
        getEventSetTeamList, 
        getCheckedSetFieldList 
    } from '@/api/employee'
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
    },
    components: {
        SaveFooter,
        Vuedraggable
    },
    data(){
      return {
        loading: false,  // loading 状态
        showFieldSet:false,  // 控制 设置field 弹框的显示/隐藏
        checkAllTeam: false,  //是否全选 team 
        checkedTeams: [], // 已选择的 所有team对象集合
        // checkedField:[],  // 已选择的所有 field集合
        currentCheckedTeamObj:{},  // 当前正在设置field 的obj集合对象
        allTeam: [],  // 所有team 对象集合
        isIndeterminate_team: true,   //  team 全选/非全选的样式
        currentTeamFieldData: [], // 当前设置的分组下面的字段数据集合
        currentTeamIdx: 0, // 当前选择的team分类的索引值
        currentSetTeamObj: {}, // 当前正在设置的分组对象
        allCheckedTeamObjArr: [], // 已选择的所有team对象集合

        // checkAllField: false,   // 
        // isIndeterminate_field: true,
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
        this._getInitData()
    },
    mounted(){
        // this._initData()
    },
    methods: {
      // 初始化
      _initData(){
          debugger
        let newArr = []
        if(this.checkedTeams && this.checkedTeams.length){
            // 已经勾选的team 集合
            if( this.allTeam && this.allTeam.length ){
                // 全部的team 集合
                this.allTeam.forEach((item, key) => {
                    this.checkedTeams.forEach((val, i, arr) => {
                        if(item.TeamCode === val.TeamCode){
                            this.$set(val, 'TeamCode', val.TeamCode)
                            this.$set(val, 'TeamName', item.TeamName)
                            this.$set(val, 'Fields', val.Fields)
                            this.$set(val, 'UnSelFields', val.UnSelFields)
                            this.$set(val, 'itemTeamFields', val.Fields.concat(val.UnSelFields))
                            this.$set(val, 'isIndeterminate_field', val.Fields.length === val.Fields.concat(val.UnSelFields).length)
                            this.$set(val, 'checkedField', val.Fields)
                            this.$set(val, 'checkAllField', val.UnSelFields.length === 0)

                            debugger
                            Object.assign(item, val)
                            console.log("----------", item)
                            this.$set(item, 'checked', true)
                            this.checkedTeams.splice(i,1)                            
                            debugger
                            console.log("-------------------",this.allTeam)
                            console.log("-------",arr)
                            
                            return false
                        }
                    })
                })
                console.log("-------",this.checkedTeams)
                this.allCheckedTeamObjArr = this.checkedTeams                
            }
        } 
        console.log(this.checkedTeams)
        debugger         
      },
      // 获取 所有team 配置 和 已经勾选的配置
      _getInitData (obj){
        debugger
        // 获取此事件的所有配置和已勾选的配置
        Promise.all([getEventSetTeamList(this.currentSetEvent.EventCode), getCheckedSetFieldList(this.currentSetEvent.EventCode)]).then(([allList, checkedList]) => {
          debugger
          if(allList.data.State != REQ_OK){
            this.$message({
              type: 'error',
              message: `获取事件所有配置分组数据失败err,${allList.data.Error}`
            })
            return 
          }

          if( checkedList.data.State != REQ_OK ){
            this.$message({
              type: 'error',
              message: `获取事件已配置分组数据失败err,${checkedList.data.Error}`
            })
            return            
          }

          if( allList.data.State === REQ_OK  && checkedList.data.State === REQ_OK){
            // 将已经设置的team 存入localStorage中
            localStorage.setItem('currentEventAlreadySetField', JSON.stringify(checkedList.data.Data))
            debugger
            this.allTeam = allList.data.Data
            // 给 allTeam 中的每一项都添加 itemTeamFields ， isIndeterminate_field， checkedField， checkAllField 属性
            if(this.allTeam && this.allTeam.length){
                this.allTeam.forEach((item, i) => {
                    this.$set(item, 'itemTeamFields', item.Fields.concat(item.UnSelFields))
                    this.$set(item, 'isIndeterminate_field', item.Fields.length === item.Fields.concat(item.UnSelFields).length)
                    this.$set(item, 'checkedField', item.Fields)
                    this.$set(item, 'checkAllField', item.UnSelFields.length === 0)
                    
                }) 
            }
            this.checkedTeams = checkedList.data.Data
            // 初始化数据
            this._initData()
          }
        })

        // this.$router.push({
        //   path: '/employee/eventHandler/setEvent',
        //   qeury:{
            
        //   }
        // })
      },      
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
          getEventSetFieldList(teamCode, this.currentSetEvent.EventCode).then(res => {
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
        debugger
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

        this.currentCheckedTeamObj.checkedField = value

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

