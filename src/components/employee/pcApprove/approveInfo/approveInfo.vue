<!--
  User: gaol
  Date: 2019/10/20
  功能：员工-电脑审批-审批信息
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

.approveInfoCmp
  padding 0 20px
.detailDialog
  .el-dialog__body
    .contentBox
      display flex
      justify-content flex-start
      align-items center
      .team-item
        width 48%
        .team-tit
          color red
        .status
        .compareBox
          display flex
          justify-content center
          align-items center
          margin-bottom 10px
          .btnItem
            width 30%
            &:first-child
              opacity 0
        .fieldBox
          .field-item
            display flex
            justify-content center
            align-items center
            text-align center
            .field-tit
            .currentValue
            .changeValue
              width 30%

</style>
<template>
  <div class="approveInfoCmp">
    审批信息
    <el-tabs v-model="activeName" @tab-click="handleClickTabs">
      <el-tab-pane label="审批中" name="first">审批中</el-tab-pane>
      <el-tab-pane label="审批通过" name="second">审批通过</el-tab-pane>
      <el-tab-pane label="审批拒绝" name="third">审批拒绝</el-tab-pane>
      <el-tab-pane label="已撤回" name="fourth">已撤回</el-tab-pane>
      <el-tab-pane label="全部" name="fifth">全部</el-tab-pane>
    </el-tabs>  

    <div class="top marginB10" style="text-align: right">
      <el-button type="primary" size="mini" @click.native="clickAgree">同意</el-button>
      <el-button type="primary" size="mini" @click.native="clickRefuse">拒绝</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      text-empty=" " 
      style="width:100%"
    >
      <el-table-column
        label="员工号"
        prop="EmpNo"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="员工姓名"
        prop="EmpName"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="模块"
        prop="Module"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="分组"
        prop="EmpGroup"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="提交时间"
        prop="SubmitTime"
        sortable
      >
      </el-table-column>    

      <el-table-column
        label="审核状态"
        prop="ApproveStatus"
        sortable
      >
      </el-table-column>  

      <el-table-column
        label="操作"
      >
        <template>
          <el-button type="text" @click.native="handlerScan">查看</el-button>
          <el-button type="text" @click.native="clickAgree">同意</el-button>
          <el-button type="text" @click.native="clickRefuse">拒绝</el-button>
        </template>
      </el-table-column>     
    </el-table>  

    <!--分页部分-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryObj.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryObj.total">
    </el-pagination>

    <!--详情弹框dialog---start--->
    <div class="detailDialogBox" v-if="showDetailDialog">
      <el-dialog
        title="详情"
        width="50%"
        :visible.sync="showDetailDialog"
        custom-class="detailDialog"
        append-to-body
        :close-on-click-modal="false"
      >
        <div class="contentBox">
          <div class="team-item">
              <p class="team-tit">个人信息</p>
              <div class="status">
                <el-button type="text" size="mini">审核通过</el-button>
              </div>
              <div class="compareBox">
                <el-button size="mini" class="btnItem"></el-button>
                <el-button type="primary" class="btnItem" size="mini">当前值</el-button>
                <el-button type="primary" class="btnItem" size="mini">变更后</el-button>
              </div>
              <div class="fieldBox">
                <div class="field-item">
                  <p class="field-tit">员工状态</p>
                  <div class="currentValue">在职</div>
                  <div class="changeValue">离职</div>
                </div>
              </div>
          </div>

          <div class="team-item">
              <p class="team-tit">银行信息</p>
              <div class="status">
                <el-button type="text" size="mini">审核通过</el-button>
              </div>
              <div class="compareBox">
                <el-button size="mini" class="btnItem"></el-button>
                <el-button type="primary" class="btnItem" size="mini">当前值</el-button>
                <el-button type="primary" class="btnItem" size="mini">变更后</el-button>
              </div>
              <div class="fieldBox">
                <div class="field-item">
                  <p class="field-tit">银行信息类型</p>
                  <div class="currentValue">工资</div>
                  <div class="changeValue"></div>
                </div>
              </div>
          </div>          
        </div>
      </el-dialog>
    </div>
    <!----详情弹框dialog----end--->

    <!--同意/拒绝弹框--start-->
    <div class="approveBox" v-if="showApproveDialog">
      <el-dialog
        title="审核意见"
        :visible.sync="showApproveDialog"
        append-to-body
        :close-on-click-modal="false"
      >
        <div class="contentBox">
          <div class="top">
            <p class="tit">审核意见</p>
            <div>
              <el-input type="textarea" autosize placeholder="请输入内容"></el-input>
            </div>
            <div>
              <el-button type="primary" size="mini">取消</el-button>
              <el-button type="primary" size="mini">确定</el-button>
            </div>
          </div>

          <div class="bottom">
            <p class="tit">审核意见</p>
            <div>
              的JFK的发动机开始发动快速反击但是发动机上课 
              2019-09-09
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!---同意/拒绝弹框---end-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        activeName: 'first',
        showDetailDialog: false, // 查看详情的dialog 弹框显示/隐藏
        showApproveDialog: false, // 同意/拒绝的弹框显示/隐藏
        tableData: [
          {
            EmpNo: 30,
            EmpName: '张三',
            Module: '模块一',
            EmpGroup: '分组一',
            SubmitTime: '2019-09-09',
            ApproveStatus: '已审核',
          }
        ],
        queryObj: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    methods: {
      // 切换tabs
      handleClickTabs(tab, event) {
        console.log(tab, event);
      },
      // 获取table表格的数据
      _getComTables(){

      },
      // 查看
      handlerScan(){
        this.showDetailDialog = true
      },
      //分页
      handleSizeChange(val) {
        this.queryObj.pageSize = val
        this._getComTables()
      },
      handleCurrentChange(val){
        this.pageNum = val
        this._getComTables()
      },
      // 同意
      clickAgree(){
        this.showApproveDialog = true
      },
      // 拒绝
      clickRefuse(){
        this.showApproveDialog = true
      }
    },
  }
</script>
