<!--
  User: gaol
  Date: 2019/8/9
  功能：事件处理器 - 事件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-form-item__content
  .el-input
    width 220px !important
.event 
  padding 0 20px
  width 100%
  min-height 500px
  box-sizing border-box
  .eventDisposeWrap
    width 100%
    .eventTable
      max-height 800px
      overflow auto
  .addEventDialog
  .eventSetDialogBox
    >>>.el-dialog__body
      max-height 50vh
      overflow auto
</style>

<template>
  <div  class="event" v-loading='loading'> 

    <div class="searchBox">
      <search-tool-cmp></search-tool-cmp>
    </div>

    <!--事件配置table列表--start-->
    <div class="eventDisposeWrap">
      <!-- <el-button 
        type="primary" 
        size="mini" 
        class="marginB10" 
        style="float:right"
        @click.native="addEvent"
      >
        新增
      </el-button> -->

      <el-table
        class="['eventTable',: '']"
        :data="tableData"
        border
        style="width: 100%"
        max-height="500">

        <!-- <el-table-column
          prop="BeginDate"
          label="起始时间"
          sortable
          width="180">
          <template slot-scope="scope">
            <div>
              {{scope.row.BeginDate | replaceTime}}
            </div>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="EventCode"
          sortable
          show-overflow-tooltip
          label="事件码">
        </el-table-column>

        <el-table-column
          prop="EventName"
          sortable
          show-overflow-tooltip
          label="事件名称">
        </el-table-column>   

        <el-table-column
          prop="EventReason"
          sortable
          show-overflow-tooltip
          label="事件原因">
        </el-table-column>

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click.native="editEvent(scope.row)">
              编辑
            </el-button>
            <el-button type="text" @click.native="setEvent(scope.row)">
              配置
            </el-button>
          </template>
        </el-table-column>
      </el-table>  

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryObj.pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryObj.total">
      </el-pagination>          
    </div>
    <!---事件配置table列表-----end-->

    <!--新增/编辑弹框---start--->
    <div class="addEventDialog" v-if="showAddDialog">
      <el-dialog
        :title="dialogTit"
        :visible.sync="showAddDialog"
        append-to-body
        :close-on-click-modal="false"
        width="30%"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-form-item label="生效日期">
            <el-date-picker
              v-model="form.BeginDate"
              placeholder="请选择生效日期"
              value-format="timestamp"
              :format="initData"
              type="date"
            >
            </el-date-picker>
          </el-form-item> -->

          <el-form-item label="事件名称">
            <el-input list="EventName" v-model="form.EventName"></el-input>
            <datalist id="EventName">
              <option value="事件一"></option>
              <option value="事件二"></option>
              <option value="事件三"></option>
            </datalist>               
          </el-form-item>

          <el-form-item label="事件原因">
            <el-input list="EventReason" v-model="form.EventReason"></el-input>
            <datalist id="EventReason">
              <option value="原因一"></option>
              <option value="原因二"></option>
              <option value="原因三"></option>
            </datalist>               
          </el-form-item>    

          <!-- <el-form-item label="对象">
            <el-input list="EventTarget" v-model="form.EventTarget"></el-input>
            <datalist id="EventTarget">
              <option value="BMW"></option>
              <option value="Ford"></option>
              <option value="Volvo"></option>
            </datalist>        
          </el-form-item>

          <el-form-item label="名称">
            <el-input v-model="form.EventTargetName"></el-input>
          </el-form-item>      -->
        </el-form>    

        <div class="footerBox">
          <save-footer @save="saveEvent" @cancel="cancelEvent"></save-footer>
        </div>          
      </el-dialog>
    </div>
    <!---新增弹框---end-->

    <!--事件配置弹框---start-->
    <div class="eventSetDialogBox" v-if="showEventSetDialog">
      <el-dialog
        title="事件配置"
        width="100%"
        fullscreen
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="showEventSetDialog"
      >
        <eventset-cmp 
          ref="eventSetCmp"
          :currentSetEvent="currentSetEvent"
          @saveSuccess="saveSuccess"
          @cancelSet="cancelSet"
        >
        </eventset-cmp>
      </el-dialog>
    </div>
    <!----事件配置弹框----end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EventsetCmp from './EventSet-dialog-cmp'
  import SearchToolCmp from './searchTool-cmp'
  import { REQ_OK } from '@/api/config'
  import { replaceTimeNoH } from '@/filters/index'
  import {
    getEventDisposeList,
    getSingleEventDispose,
    saveSingleEventDispose,
    getEventSetTeamList,
    getCheckedSetFieldList,
    saveEventSetFieldList
  } from '@/api/employee'
  export default {
    components: {
      SaveFooter,
      EventsetCmp,
      SearchToolCmp
    },
    computed:{
      initData(){
        if(this.form.BeginDate){
          try {
            this.form.BeginDate = this.form.BeginDate.replace('/Date(', '').replace(')/','')
          } catch (error) {
            
          }
        }
      }
    },
    data(){
      return {
        loading: false, 
        showAddDialog: false, // 控制新增事件的弹框显示/隐藏
        dialogTit: '', // 新增或编辑事件时的 弹框名称： 新增  / 编辑
        isEditOrAddFlag: false, //  当前是编辑还是 新增 false 是新增  true 是 编辑
        showEventSetDialog: false, // 控制 单个事件配置的弹框显示/隐藏
        // checkedObjArr: [],  // 配置弹框中给已经勾选的所有对象集合
        // allObjArr: [],  //配置弹框中 所有的对象（包含未被勾选的对象）的集合
        tableData: [
          // {
          //   BeginDate: '2016-05-02',
          //   EventCode: '4525-323fdsgf2-43',
          //   EventName: '事件一',
          //   EventReason: '事件原因一',
          //   EventTarget: '',
          //   EventTargetName: '',
          //   Id: ''
          // }, 
          // {
          //   BeginDate: '2016-05-04',
          //   EventCode: '4525-323fdsgf2-43',
          //   EventName: '事件二',
          //   EventReason: '事件原因二',
          //   EventTarget: '',
          //   EventTargetName: '',
          //   Id: ''          
          // }, 
          // {
          //   BeginDate: '2016-05-01',
          //   EventCode: '4525-323fdsgf2-43',
          //   EventName: '事件三',
          //   EventReason: '事件原因三',
          //   EventTarget: '',
          //   EventTargetName: '',
          //   Id: ''          
          // }, 
          // {
          //   BeginDate: '2016-05-03',
          //   EventCode: '4525-323fdsgf2-43',
          //   EventName: '事件四',
          //   EventReason: '事件原因四',
          //   EventTarget: '',
          //   EventTargetName: '',
          //   Id: ''
          // }
        ],
        form: {
          BeginDate: '',
          EventCode: '',
          EventName: '',
          EventReason:'',
          EventTarget: '',
          EventTargetName: '',
          Id: 0
        },
        singleEventData: {}, // 单个事件配置的对象
        currentEditEvent: {},  // 当前新增的事件对象
        currentSetEvent: {},  //当前配置的事件对象
        queryObj: {
          pageSize: 10,
          pageIndex: 1,
          total: 0
        }
      }
    },
    created(){
      // 获取事件列表
      this._getEventDisposeList()
    },
    methods: {
      // 获取事件列表
      _getEventDisposeList(){
        debugger
        this.loading = true
        getEventDisposeList(this.queryObj.pageSize, this.queryObj.pageIndex).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
            this.queryObj.total = res.data.DataCount
          }else {
            this.$message({
              type: 'error',
              message: `获取事件列表数据失败err,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: `获取事件列表数据失败`
          })
        })
      },
      //获取单个事件
      _getSingleEventDispose(){
        getSingleEventDispose(this.currentEditEvent.EventCode, this.currentEditEvent.ModuleCode).then(res => {
          if(res && res.data.State === REQ_OK){
            this.singleEventData = res.data.Data
          }else {
            this.$message({
              type: 'error',
              message: `获取单个事件配置数据出错err,${res.data.Error}`
            })
          }
        }).catch(() => {
            this.$message({
              type: 'error',
              message: `获取单个事件配置数据出错err,${res.data.Error}`
            })          
        })
      },
      // 保存单个事件的设置
      _saveSingleEventDispose(){
        let Id = ''
        if(this.isEditOrAddFlag){
          // 当前为编辑
          Id = this.form.Id
        }else {
          // 当前为新增
          Id = 0
        }
        this.loading = true
        saveSingleEventDispose(JSON.stringify(this.form), Id).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.$message.success("保存成功")
            // 成功后 重新刷新列表
            this._getEventDisposeList()
            this.showAddDialog = false
          }else {
            this.$message({
              type: 'error',
              message: `保存单个事件配置失败err,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '保存单个事件配置出错'
          })
        })
      },
      // 获取 单个事件中的 所有的配置选项
      _getEventSetFieldList(){
        getEventSetFieldList().then(res => {
          if(res && res.data.State === REQ_OK){
            debugger
            this.allObjArr = res.data.Data
          }else {
            this.$message({
              type: 'error',
              message: `获取单个事件的配置选项失败err,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '获取单个事件的配置选项失败'
          })
        })
      },
      // 获取单个事件中 已勾选field的配置选项
      _getCheckedSetFieldList(){
        getCheckedSetFieldList(this.currentSetEvent.EventCode).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.checkedObjArr = res.data.Data
            // 将已经勾选的field 配置选项存入localStorage中
            localStorage.setItem('currentEventAlreadySetField', res.data.Data)

          }else {
            this.$message({
              type: 'error',
              message: `获取单个事件已配置项失败err,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '获取单个事件已配置项失败'
          })
        })
      },
      // 保存单个事件的配置选项
      _saveEventSetFieldList(){
        saveEventSetFieldList().then(res => {
          debugger
          if(res && res.data.State === REQ_OK){

          }else {
            this.$message({
              type: 'error',
              message: `保存失败err,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '保存失败'
          })
        })
      },
      // 保存成功
      saveSuccess(){
        debugger
        this.showEventSetDialog = false
      },
      // 取消保存
      cancelSet() {
        debugger
        this.showEventSetDialog = false
      },
      // 编辑
      editEvent(obj){
        debugger
        this.isEditOrAddFlag = true
        this.currentEditEvent = obj
        this.showAddDialog = true
        this.dialogTit = '编辑'
        this.form = JSON.parse(JSON.stringify(obj))
        // 获取单个事件配置
        // this._getSingleEventDispose()
      },
      // 配置
      setEvent(obj){
        debugger
        this.currentSetEvent = obj
        this.showEventSetDialog = true
      },
      // 新增
      addEvent(){
        this.isEditOrAddFlag = false
        Object.assign(this.form, {
          BeginDate: '',
          EventCode: '',
          EventName: '',
          EventReason:'',
          EventTarget: '',
          EventTargetName: '',
          Id: 0          
        })

        this.dialogTit = '新增'
        this.showAddDialog = true
      },
      // 保存新增事件
      saveEvent() {
        debugger
        // this.showAddDialog = false
        this._saveSingleEventDispose()
      },
      //取消新增
      cancelEvent(){
        this.showAddDialog = false
      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getEventDisposeList()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._getEventDisposeList()
      }
    },
  }
</script>

