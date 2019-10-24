<!--
  User: gaol
  Date: 2019/10/23
  功能： 员工-在职员工、待入职员工、离职员工页面的  更多操作按钮组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.moreHandlerBtn-cmp
    .fn-btn-container
        text-align right
</style>
<template>
    <div class="moreHandlerBtn-cmp">
      <div class="fn-btn-container">
        <!-- <el-button 
            style="margin-left: 0" 
            size="small" 
            @click.native="joinJob"
        >
            直接入职
        </el-button> -->

        <el-button 
            style="margin-left: 5px" 
            size="mini" 
            type="primary"
            v-for="(item,index) in leftBtnList"
            :key="item.EventCode"
            @click.native="clickLeftBtn(item)"
        >
            {{item.EventName}}
        </el-button>        
        
        <el-dropdown 
          @command="handleCommandFn" 
          size="small" 
          split-button 
          trigger="hover"
        >
          更多
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item 
              command="batchJoinJob"
            >
              批量入职
            </el-dropdown-item>
            <el-dropdown-item 
              command="batchLeaveJob">
              批量离职
            </el-dropdown-item>
            <el-dropdown-item
              command="batchSwitch">
              批量转正
            </el-dropdown-item>
            <el-dropdown-item
              command="batchTurn">
              批量调转
            </el-dropdown-item>
            <el-dropdown-item
             command="batchDelete">
             批量删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown 
          size="small" 
          split-button
          trigger="hover"
          @command="hanleBatchFn"
        >
          导入导出
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="batchAddEmp">批量新增员工</el-dropdown-item>
            <el-dropdown-item command="batchEditEmp">批量修改</el-dropdown-item>
            <el-dropdown-item command="batchExport">批量导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!--leftBtn 弹框--start-->
      <div class="leftBtnDailogBox" v-if="showLeftBtnDialog">
          <el-dialog
            :title="leftDialogTit"
            fullscreen
            append-to-body
            :close-on-click-modal="false"
            :visible.sync="showLeftBtnDialog"
          >
            <emp-groupfield-edit-cmp 
                ref="empGroupfieldEditCmp" 
                :groupFieldData="currentBtnContentData"
                @executeSuccess="executeSuccess"
            >
            </emp-groupfield-edit-cmp>
            <!--引入保存按钮---start-->
                <save-footer @save="saveLeftBtnData" @cancel="cancelLeftBtnData"></save-footer>            
            <!---引入保存按钮--end-->
          </el-dialog>
      </div>
      <!--leftBtn 弹框--end-->
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import EmpGroupfieldEditCmp from '@/components/employee1/employeeManage/empManage-cmp/EmpGroupfieldEdit-cmp'
    import { PaGetEmpDataSourceList } from '@/api/dic'
    import { 
        getPageEventList,
        loadEvent,
        execute
    } from '@/api/employee'
    import { REQ_OK } from '@/api/config'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            SaveFooter,
            EmpGroupfieldEditCmp
        },
        props: {

        },
        data(){
            return {
                leftBtnList: [],  // 左边区域的btn集合
                currentEventCode: '', // 当前的事件码
                currentLeftBtnObj: {},  // 当前的leftbtn对象
                currentBtnContentData: [], // 当前btn下的数据
                showLeftBtnDialog: false, 
                leftDialogTit: '',
            }
        },
        computed:{
            ...mapGetters(['currentPageCode'])
        },
        created() {
            // 获取页面可用事件
            this._getPageEventList()
        },
        methods: {
            handleCommandFn(command) {
                this.$message('click on item ' + command);
            },  
            hanleBatchFn(command){

            },          
            // 获取可用页面事件
            _getPageEventList(){
                getPageEventList(this.currentPageCode).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.leftBtnList = res.data.Data
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取页面可用事件失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取页面可用事件出错'
                    })
                })
            },
            // 获取分类下面的数据
            _getCurrentTabData(){
                debugger
                // 直接调用子组件中的方法 改变子组件中的loading
                this.$refs["empGroupfieldEditCmp"].setLoading(true)
                loadEvent(this.currentEventCode).then(res => {
                    debugger
                    // 直接调用子组件中的方法 改变子组件中的loading
                    this.$refs["empGroupfieldEditCmp"].setLoading(false)
                    if(res && res.data.State === REQ_OK){
                        this.currentBtnContentData = res.data.Data
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取事件实例失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取事件实例出错'
                    })
                })
            },
            // 获取页面可用事件
            _getPageEventList(){
               getPageEventList(this.currentPageCode).then(res => {
                   debugger
                   if(res && res.data.State === REQ_OK){
                       this.leftBtnList = res.data.Data
                   }else {
                       this.$message({
                           type: 'error',
                           message: `获取页面可用事件失败，${res.data.Error}`
                       })
                   }
               }).catch(() => {
                   this.$message({
                       type: 'warning',
                       message: '获取页面可用事件出错'
                   })
               })
            },
            executeSuccess(){
                this.showLeftBtnDialog = false
            }, 
            // 点击
            clickLeftBtn(item) {
                debugger
                this.currentLeftBetObj = item
                this.leftDialogTit = item.EventName
                this.currentEventCode = item.EventCode
                this.showLeftBtnDialog = true
                // setTimeout(() => {
                //     this._getCurrentTabData()
                // }, 0)      
                this.$nextTick(() => {
                    this._getCurrentTabData()
                })
            },
            // 保存
            saveLeftBtnData(){
                // empGroupfieldEdit-cmp 组件中进行 表单验证
                this.$refs["empGroupfieldEditCmp"].submitValidate(this.currentEventCode)
            },
            // 取消
            cancelLeftBtnData(){
                this.showLeftBtnDialog = false
            }       
        }
    }
</script>
