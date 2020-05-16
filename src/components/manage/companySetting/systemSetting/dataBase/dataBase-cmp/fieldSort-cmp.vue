<!--
  User: xxxxxxx
  Date: 2020/4/11
  by: gaol
  功能： 字段设置-字段排序
-->

<template>
  <div class="fieldSortContainer">
    <!--字段排序dialog gaoladd--start-->
    <!-- obj:{{obj}}
    ---
    propState: {{propState}} -->
    <!-- ---
    fieldList: {{fieldList}} -->
    <div class="setBox" v-loading="loading">
        <!-- <div class="showTit">提示：不建议改变领域名，会影响相关数据。即使更改也请保持同原业务领域类别保持一致，仅对名称进行重命名。</div> -->
        <div class="TipBox" v-if="fieldList.length>0">
          <span class="sortTipTit" style="color:red;margin-left: 4px">拖拽排序</span>
        </div>
        
        <vuedraggable 
            :class="['wrapper',fieldList.length<=0? 'not_found':'']" 
            style="height:calc(100vh - 200px);overflow:auto"
            v-model="fieldList"  
            v-bind="dragOptions">
            <transition-group>
              <div  
                v-for="(obj, index) in fieldList" 
                :key="index+1" 
                class="inputItemBox">
                    <el-menu
                      class="el-menu-vertical-demo"
                    >
                        <el-menu-item>
                          <i class="el-icon-menu"></i>
                          <span slot="title">{{obj.FieldName}}</span>
                        </el-menu-item>
                    </el-menu>
              </div>
            </transition-group>              
        </vuedraggable>
        <div 
          v-if="fieldList.length>0"
          class="dialog-footer" 
          style="display: block; padding: 10px 0; text-align: center">
          <el-button @click="cancelFieldSort">取 消</el-button>
          <el-button type="primary" @click="SaveFieldSort">确 定</el-button>
        </div>

    </div>
    <!--字段排序dialog gaoladd--end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
      CompFieldList,
      SaveFieldList
  } from '@/api/systemManage'
  import Vuedraggable from 'vuedraggable'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        propState: {
            type: [String, Number],
            default: () => {
                return 
            }
        }
    },
    components: {
      SaveFooter,
      Vuedraggable
    },
    data () {
      return {
        fieldList: [], 
        loading: false,
        dialogSort: false,
        sortList: [],
      }
    },
    created () {
        this._CompFieldList('' , this.obj.TableCode, this.propState, 655533, 1)
    },
    mounted () {
      this.$dragging.$on('dragged', ({value}) => {
        console.log('dragged', value)
      })
      this.$dragging.$on('dragend', (value) => {
        console.log('dragend', value)
      })
    },
    computed:{
      dragOptions() {
        return {
          animation: 500,
          // group: "description",
          disabled: false,
          // ghostClass: "ghost"
        }
      }        
    },    
    watch: {

    },
    methods: {
        _CompFieldList(teamCode, tableCode, state, pageSize, pageNum){
            this.loading = true
            CompFieldList('', tableCode, state, pageSize, pageNum).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.fieldList = res.data.Data
                }else {
                    this.$message.error(`获取列表数据失败,${res.data.Error}`)
                }
            }) 
        },
        // 组名称拖拽排序
        datadragEnd (event) {
            event.preventDefault()
            console.log('拖动前的索引 :' + event.oldIndex)
            console.log('拖动后的索引 :' + event.newIndex)
        },
        // 保存分组排序
        handleSaveGroupSort () {
          this.fieldList.forEach((item,key) => {
            item.SortId = key+1
          })
          SaveFieldList(JSON.stringify(this.fieldList)).then(res => {
          if (res.data.State === REQ_OK) {
              this.$message.success('保存分组排序成功')
              this.dialogSort = false
              this._companyTableList()
          } else {
              this.$message.error('保存分组排序失败')
          }
          }).catch(() => {
          this.$message.error('保存分组排序失败')
          })
        },
        SaveFieldSort(){
            debugger
            // this._handleSaveGroupSort()
            this.$emit("emitSaveFieldSort", this.fieldList)
        },    
        cancelFieldSort(){
            this.$emit("emitCancelFieldSort")
        },  
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/variable.styl"
  @import "~common/css/mixin.styl"
.el-dialog__wrapper 
  >>>.el-dialog__body
    padding 0px 20px 20px 20px !important
    .showTit 
      color red
      font-size 12px    
      margin-bottom 5px
    .TipBox
      font-size 14px
    .wrapper
    .inputItemBox
      position relative
      .sort-cart-item
        width 300px
      .editAndDelet
        position absolute
        top 50%
        right 80px
        transform translateY(-50%)
        .edit 
          &:hover
            cursor pointer
            color #3b8be3 
        .delet
          &:hover
            cursor pointer
            color #3b8be3   
        .EditCancel       
          &:hover 
            cursor pointer
            color #3b8be3 
        .EditSave                 
          &:hover
            cursor pointer
            color #3b8be3      
</style>
