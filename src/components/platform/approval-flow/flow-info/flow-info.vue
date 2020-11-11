<!--
  User: xxxxxxx
  Date: 2018/7/9
  by: gaol
  功能：审批流内容页
-->

<template>
  <div class="approver-flow-container mglr-30">

    <!--新增审批，分组排序，保存排序 button按钮区域--start-->
    <div class="btn-group-container clearfix">
      <div class="searchBox">
        <el-input
          placeholder="请输入审批名称"
          v-model="searchTit"
          clear
          class="searchInput"
          clearable @clear="clearSearchTit"
          @keyup.enter.native="searchChange($event)"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input> 

        <div class="btnBox">
          <el-button type="primary"  @click="clickSearchBtn()" class="lt">搜索</el-button>
          <el-button type="primary" @click="handleReset" class="lt">重置</el-button>       
        </div> 
      </div>     

      <el-button size="small" @click="handleAddApprover()" type="primary">
        新增审批
      </el-button>

      <el-button size="small" @click.native="clickSetName()" type="primary">
        设置业务领域
      </el-button>

      <!-- <el-button size="small" @click="dialogSort = true">
        分组排序
      </el-button> -->

      <!--此保存排序是保存的 业务大类下面的item的排序--->
      <el-button size="small" @click="handleSaveSort()" :disabled="approverFlowList && !approverFlowList.length">
        保存排序
      </el-button> 
    </div>
    <!--新增审批，分组排序，保存排序 button按钮区域--end-->

    <div class="content-container" v-loading="loading">
      <el-card>
        <!--gaolAdd ---content区域-换成了 手风琴的效果--start-->
        <div
          class="group-item"
          v-for="(obj, index) in approverFlowList"
          :key="obj.BusinessAreaCode"
        >
          <el-collapse v-model="activeNames">
            <el-collapse-item :title="obj.Name" :name="index" :key="index">
                <div class="contentList">
                  <div
                    class="item"
                    v-for="table in obj.CompanyApprovals"
                    :key="table.CompanyApprovalId"
                    v-dragging="{ item: table, list: obj.CompanyApprovals, group: 'approvalList' + index }"
                  >
                    <div class="img">
                      <i class="el-icon-news"></i>
                    </div>
                    <div class="detail ellipsis2" @click="handleShowDetail(table)">
                      <span class="name">{{table.Name}}</span>
                      <!-- <div class="desc">{{table.Description}}</div> -->
                    </div>

                    <!--描述-start-->
                    <div class="descBox">
                      <el-tooltip class="" effect="light" :content="table.Description">
                        <div class="desc ellipsis2 center">{{table.Description}}</div>
                      </el-tooltip>
                    </div>
                    <!--描述-end-->

                    <div class="line"></div>

                    <!-- <div style="font-size: 14px">{{table.IsEnable ? '启用' : '停用'}}</div>
                    <div class="line"></div> -->

                    <div class="btn-group">
                      <el-button size="mini" @click="handleShowDetail(table)">
                        查看
                      </el-button>

                      <!-- <el-button size="mini" @click="showApprovalRule = true; companyApprovalId = table.CompanyApprovalId">
                        配置
                      </el-button>  -->

                      <el-button size="mini" @click="handleEditApprover(table)">
                        编辑
                      </el-button>
                      <el-button size="mini" @click="handleDelApprover(table.CompanyApprovalId)">
                        删除
                      </el-button>
                      <el-button size="mini" disabled @click="handleLogApprover(table.CompanyApprovalId)">
                        日志
                      </el-button>
                    </div>
                  </div>
                </div>           
            </el-collapse-item>
          </el-collapse>    
        </div>
        <!--gaolAdd ---content区域-换成了 手风琴的效果--end-->

        <!---以前的内容区---start-->
        <!-- <div
          class="group-item"
          v-for="(obj, index) in approverFlowList"
          :key="obj.BusinessAreaCode"
        >
          <div class="title">
            <span style="margin-right: 5px">{{obj.Name}}</span>
            <el-tooltip class="item" effect="dark" content="重命名" placement="bottom">
              <el-button icon="el-icon-edit" type="text" @click.native="handleRename(obj.BusinessAreaCode)"></el-button>
            </el-tooltip>
          </div>

          <div class="contentList">
            <div
              class="item"
              v-for="table in obj.CompanyApprovals"
              :key="table.CompanyApprovalId"
              v-dragging="{ item: table, list: obj.CompanyApprovals, group: 'approvalList' + index }"
            >
              <div class="img">
                <i class="el-icon-news"></i>
              </div> -->

              <!--name区域 ----->
              <!-- <div class="detail">
                <span class="name">{{table.Name}}</span>
                <el-tooltip class="" effect="light" :content="table.Description">
                  <div class="desc ellipsis1 center">{{table.Description}}</div>
                </el-tooltip>
              </div> -->

              <!---说明区域--->
              <!-- <div class="desc">
                <span>{{table.Description}}</span>
              </div> -->
    

              <!-- <div class="line"></div>  -->

                <!-- <div style="font-size: 14px">{{table.IsEnable ? '启用' : '停用'}}</div>
              <div class="line"></div> -->

              <!-- <div class="btn-group">
                <el-button size="mini" @click="handleShowDetail(table)">
                  查看
                </el-button> -->

                <!-- <el-button size="mini" @click="showApprovalRule = true; companyApprovalId = table.CompanyApprovalId">
                  配置
                </el-button>  -->

                <!-- <el-button size="mini" @click="handleEditApprover(table)">
                  编辑
                </el-button>
                <el-button size="mini" @click="handleDelApprover(table.CompanyApprovalId)">
                  删除
                </el-button>
                <el-button size="mini" disabled @click="handleLogApprover(table.CompanyApprovalId)">
                  日志
                </el-button>
              </div>
            </div>
          </div>
        </div>  -->
        <!---以前的内容区---end-->


        <div v-if="approverFlowList.length === 0">
          暂无审批流信息
        </div>

      </el-card>
    </div>

    <approval-rule v-if="showApprovalRule" :companyApprovalId="companyApprovalId" @closeApprovalRule="showApprovalRule = false"></approval-rule>

    <!--新增审批dialog 区域--->
    <add-approval v-if="showAddApproval" @saveSuccess="saveSuccess" @cancelApprovalInfo="showAddApproval = false" :currentApproval="currentApproval"></add-approval>

    <!---查看审批流dialog 弹框区域--->
    <show-approval v-if="showApproval" @cancelApprovalInfo="showApproval = false" :currentApproval="currentApproval"></show-approval>


    <router-view></router-view>


    <!--设置业务领域dialog gaoladd--start-->
    <div class="setBox">
      <el-dialog
        title="业务领域"
        :visible.sync="dialogSet"
        width="500px"
        :append-to-body="true"
        :close-on-click-modal="false"
        :show-close="false"
      >
        <div class="showTit">提示：不建议改变领域名，会影响相关数据。即使更改也请保持同原业务领域类别保持一致，仅对名称进行重命名。</div>
        <div class="TipBox">
          <span class="sortTipTit">拖拽排序</span>
          <!-- <div class="addNewTeam" @click="addNewTeamInput = true">
            <span class="addTit">新增</span><i class="el-icon-circle-plus-outline"></i>
          </div> -->
        </div>
        
        <vuedraggable class="wrapper" v-model="approverFlowList"  v-bind="dragOptions">
            <transition-group>
              <div  v-for="(obj, index) in approverFlowList" :key="index+1" class="inputItemBox">

                <!-- <el-tag type="success" v-show="index != editTeamNameIndex">{{team.TeamName}}—— {{team.Fields.length}}</el-tag> -->
                    <el-menu
                      default-active="2"
                      class="el-menu-vertical-demo"
                    >
                      <!-- <el-submenu index="1"> -->
                        <!-- <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>{{team.TeamName}}({{team.Fields.length}})</span>
                        </template> -->
                        <el-menu-item index="2" v-show="index != editTeamNameIndex">
                          <i class="el-icon-menu"></i>
                          <span slot="title">{{obj.Name}}</span>
                        </el-menu-item>

                          <!-- <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                          </el-menu-item-group>
                          <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                          </el-menu-item-group>
                          <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                          </el-submenu> -->

                        <!-- </el-submenu> -->
                    </el-menu>

                <el-input 
                  v-show=" editTeamNameIndex!=-1 && index == editTeamNameIndex"
                  class="sort-cart-item"
                  v-model="rename"
                >
                  <!-- <i class="el-icon-s-unfold"></i> -->
                </el-input>
                <div class="editAndDelet">
                  <span class="edit" v-show="(index != editTeamNameIndex)" @click="handleEditTeam(index)">编辑</span>
                  <!-- <span class="delet" v-show="(index != editTeamNameIndex)" @click="handleDelTeam(team.TeamCode)">删除</span> -->
                  <span class=" EditCancel" v-show="(index == editTeamNameIndex)" @click="editTeamNameIndex = -1">取消</span>
                  <span class=" EditSave" v-show="(index == editTeamNameIndex)" @click="handleSaveTeamName">保存</span>
                </div>
              </div>
            </transition-group>              
        </vuedraggable>

        <!-- <div class="newTeamInputBox" v-show="addNewTeamInput">
          <el-input v-model="newTeamName" placeholder="请输入新分组名称"></el-input>
          <div class="cancelAndSaveBox">
            <span class="cacelTit" @click="addNewTeamInput = false">取消</span>
            <span class="saveTit" @click="addNewTeam()">保存</span>
          </div>
        </div> -->

        <div class="dialog-footer" style="display: block; padding: 10px 0; text-align: center">
          <el-button @click="dialogSet= false">取 消</el-button>
          <el-button type="primary" @click="SaveName">确 定</el-button>
        </div>

      </el-dialog>  
    </div>
    <!--设置业务领域dialog gaoladd--end--->

    <!--旧的 重命名的dialog---start-->
    <el-dialog title="重命名"
                class="dialog-item"
                :visible="dialogRename"
                :showClose="false"
                :append-to-body="true"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                width="400px"
    >
      新名称：<el-input v-model="rename" placeholder="请输入新名称" style="width: 200px"></el-input>
      <save-footer @save="_renameBusinessArea" @cancel="dialogRename = false"></save-footer>
    </el-dialog>
    <!--旧的 重命名的dialog---end-->


    <!--旧的分组排序的dialog区域----start-->
    <el-dialog title="分组排序"
               class="dialog-item"
               :visible="dialogSort"
               :showClose="false"
               :append-to-body="true"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="400px"
    >
      <div class="sort-container">
        <el-tag
          :key="obj.BusinessAreaCode"
          v-for="obj in sortList"
          :disable-transitions="false"
          v-dragging="{ item: obj, list: sortList, group: 'busList' }"
        >
          {{obj.Name}}
        </el-tag>
      </div>
      <save-footer @save="handleSaveGroupSort" @cancel="dialogSort = false"></save-footer>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { flowAutoLogin } from '@/utils/mixin'
  import {
    companyTableList,
    setCompanyTableEnable,
    renameBusinessArea,
    sortBusinessArea,
    deleteApprove,
    sortApproval
  } from '@/api/approve'
  import ApprovalRule from './approval-rule'
  import AddApproval from './add-approval'
  import ShowApproval from './show-approval'
  import Vuedraggable from 'vuedraggable'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  export default {
    mixins: [flowAutoLogin],

    data () {
      return {
        approverFlowList: '',  // 复制的一份获取的总数据
        approverFlowList_res: '', // 调取接口获取的总数据
        loading: true,
        showApprovalRule: false,
        showAddApproval: false,
        showApproval: false,
        currentApproval: {},
        companyApprovalId: '',
        dialogRename: false,
        rename: '',
        currentBusinessAreaCode: '',
        dialogSort: false,
        sortList: [],
        activeNames: [0], // 折叠效果时默认展示第一个业务领域
        searchTit: '', // 搜索的关键字
        dialogSet: false, // 设置dialog 弹框的显示/隐藏
        editTeamNameIndex: '-1' // 编辑的分组的 index
      }
    },
    created () {
      this._companyTableList()
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
      searchTit (newValue, oldValue) {
        if (!newValue) {
          // 清空输入条件时 重新调用接口数据
          this.handleReset()
        }
      }
    },
    methods: {
      // 审批流首页数据
      _companyTableList () {
        companyTableList('-1').then(res => {
          // 传 “-1” 表示 要查询所有状态的
          this.loading = false
          if (res.data.State === REQ_OK) {
            debugger
            this.approverFlowList_res = res.data.Data
            this.approverFlowList = JSON.parse(JSON.stringify(res.data.Data))
            this.sortList = JSON.parse(JSON.stringify(res.data.Data))
          } else {
            this.$message({
              type: 'error',
              message: '数据获取失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '数据获取失败，请刷新重试！'
          })
        })
      },
      // 重命名业务领域
      _renameBusinessArea () {
        debugger
        if (!this.rename) return this.$message.warning('名称未填写')
        renameBusinessArea(this.currentBusinessAreaCode, this.rename).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('修改成功')
            this.dialogRename = false
            this._companyTableList()
          } else {
            this.$message.error('修改失败，请重试')
          }
        }).catch(() => {
          this.$message.error('修改失败，请重试')
        })
      },
      // 筛选数据
      _handleApproverFlowList (value) {
        // 按照搜索条件 将 approverFlowList 的数据做筛选
        this.approverFlowList = JSON.parse(JSON.stringify(this.approverFlowList_res))
        if (this.approverFlowList && this.approverFlowList.length) {
          debugger
          let statusArr = []
          this.approverFlowList.forEach((item, index, arr) => {
            if (item.CompanyApprovals.length) {
              debugger
              let itemCompanyApprovalsArr = []
              for (let j = 0, length = item.CompanyApprovals.length; j < length; j++) {
                debugger
                if (item.CompanyApprovals && item.CompanyApprovals[j].Name && item.CompanyApprovals[j].Name.indexOf(value) !== -1) {
                  itemCompanyApprovalsArr.push(item.CompanyApprovals[j])
                  // 同时也存一份到 statusArr  里面，到时通过 statusArr 是否有length 来判断 是否需要给提示和 暂开哪些大类
                  statusArr.push(item.CompanyApprovals[j])
                  debugger
                }

                if (j === (item.CompanyApprovals.length - 1) && itemCompanyApprovalsArr.length) {
                  debugger
                  item.CompanyApprovals = itemCompanyApprovalsArr
                  this.activeNames.push(Number(index))
                }
                if (index === (this.approverFlowList.length - 1) && j === (item.CompanyApprovals.length - 1) && !statusArr.length) {
                  debugger
                  this.activeNames.splice(0, this.activeNames.length)
                  this.$message({
                    showClose: true,
                    message: '无匹配结果,请更换业务/审批名称重新查询',
                    type: 'warning'
                  })
                }
              }
            }
          })
        }
      },
      // 重置搜索框内容
      handleReset () {
        this.searchTit = ''
        this.activeNames = [0]
        this._companyTableList()
      },
      // 清空搜索框内容
      clearSearchTit () {
  
      },
      // 点击 搜索按钮
      clickSearchBtn () {
        this.activeNames = []
        if (this.searchTit) {
          this._handleApproverFlowList(this.searchTit)
        } else {
          this.$message('请输入搜索关键词')
        }
      },
      // 按条件搜索,直接按enter键
      searchChange (e) {
        debugger
        this.activeNames = []
        if (e.target.value) {
          this._handleApproverFlowList(e.target.value)
        } else {
          this.$message('请输入搜索关键词')
        }
      },
      // 新增审批
      handleAddApprover () {
        this.currentApproval = {
          IsEnable: true, // 状态
          BusinessTypeCode: '', // 业务类型code
          Name: '', // 审批名称
          Description: '' // 审批描述
        }
        this.showAddApproval = true
      },
      // 设置名称btn
      clickSetName () {
        debugger
        this.dialogSet = true
      },

      // 设置名称dailog 里面的保存按钮
      SaveName () {
        debugger
        if (this.editTeamNameIndex != -1) {
          // 有编辑业务领域分组未保存
          this.$message({
            type: 'warning',
            message: '请先保存更改的业务领域名称'
          })
          return
        }
        debugger
        let idx = 1
        let res = this.approverFlowList.map(item => {
          return {
            Id: item.Id,
            Idx: idx++
          }
        })
        sortBusinessArea(JSON.stringify(res)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('保存分组排序成功')
            // 关闭弹窗
            this.dialogSet = false
            this._companyTableList()
          } else {
            this.$message.error('保存分组排序失败err')
          }
        }).catch(() => {
          this.$message.error('保存分组排序失败err')
        })
      },
      // 组名称拖拽排序
      datadragEnd (event) {
        event.preventDefault()
        console.log('拖动前的索引 :' + event.oldIndex)
        console.log('拖动后的索引 :' + event.newIndex)
      },

      // 设置名称的 dailog 弹框中 编辑分组的名称
      handleEditTeam (index) {
        debugger
        // this.rename = ''
        this.editTeamNameIndex = index
        this.currentBusinessAreaCode = this.approverFlowList[index].BusinessAreaCode
      },
      // 保存设置的组名称
      handleSaveTeamName () {
        debugger
        if (!this.rename) return this.$message.warning('名称未填写')
        renameBusinessArea(this.currentBusinessAreaCode, this.rename).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.$message.success('修改成功')
            this.dialogRename = false
            this.editTeamNameIndex = -1
            this._companyTableList()
          } else {
            this.$message.error('修改失败，请重试')
          }
        }).catch(() => {
          this.$message.error('修改失败，请重试')
        })
      },
      // 重命名业务领域
      handleRename (id) {
        debugger
        this.currentBusinessAreaCode = id
        this.dialogRename = true
      },
      // 保存分组排序
      handleSaveGroupSort () {
        let idx = 1
        let res = this.sortList.map(item => {
          return {
            Id: item.Id,
            Idx: idx++
          }
        })
        sortBusinessArea(JSON.stringify(res)).then(res => {
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
      // 保存排序，此保存排序 是保存的 业务领域大类下的 items 的排序保存
      handleSaveSort () {
        debugger
        this.approverFlowList.forEach(item => {
          let idx = 1
          if (item.CompanyApprovals && item.CompanyApprovals.length) {
            item.CompanyApprovals.forEach(i => {
              i.Idx = idx++
            })
          }
        })
        sortApproval(JSON.stringify(this.approverFlowList)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('保存排序成功')
            this._companyTableList()
          } else {
            this.$message.error('保存排序失败')
          }
        }).catch(() => {
          this.$message.error('保存排序失败')
        })
      },
      // 启用/关闭
      handleIsEnable (table) {
        if (!table.IsEnable) {
          this.$confirm('停用该审批，系统将会自动对该审批下所有已上架的流程执行全部下架操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            setCompanyTableEnable(table.CompanyApprovalId, table.IsEnable).then(res => {
              if (res.data.State === REQ_OK) {
                this.$message({
                  type: 'success',
                  message: '设置成功！'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '设置失败！'
                })
                table.IsEnable = !table.IsEnable
              }
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '设置失败！'
              })
              table.IsEnable = !table.IsEnable
            })
          }).catch(() => {
            table.IsEnable = !table.IsEnable
          })
        }
      },
      // 查看
      handleShowDetail (approval) {
        this.currentApproval = approval
        this.showApproval = true
      },
      // 配置
      handleConfig (code) {
        this.$router.push({
          path: '/platform/approvalFlow/flowInfo/flowConfig',
          query: {
            code
          }
        })
      },
      // 删除
      handleDelApprover (code) {
        this.$confirm('确认删除该审批?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteApprove(code).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message.success('删除成功')
              this._companyTableList()
            } else {
              this.$message.error(res.data.Error)
            }
          }).catch(() => {
            this.$message.error('删除失败，请重试')
          })
        }).catch(() => {
        })
      },
      // 日志
      handleLogApprover (code) {
      },
      // 编辑
      handleEditApprover (approval) {
        this.currentApproval = approval
        this.showAddApproval = true
      },
      // 新增/修改审批成功的回调
      saveSuccess () {
        this.showAddApproval = false
        this._companyTableList()
      }
    },
    components: {
      ApprovalRule,
      AddApproval,
      ShowApproval,
      SaveFooter,
      Vuedraggable
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/variable.styl"
  @import "~common/css/mixin.styl"
  .approver-flow-container
    position relative
    .btn-group-container
      margin-bottom 10px
      text-align right
      .searchBox 
        position relative
        width 200px
        margin-top 70px
        .btnBox
          position absolute
          top 50%
          right -170px
          transform translateY(-50%)
    .content-container
      >>>.el-card__body
        position relative !important
        padding 0 20px 20px 20px !important
        .searchInput
          position absolute
          width 300px
          top 5px
          right 20px
        .group-item
          margin-top 10px
          .el-collapse-item
            .el-collapse-item__header
              background-color #E6E5E5
              border-radius 5px
              border-bottom none
              font-weight bold
              text-indent 10px
          .el-collapse-item__wrap
            border-bottom none
          .title
            padding 0 10px
            background-color $color-title-bg
            border-radius 5px
          .contentList
            .item
              display flex
              align-items: center;
              padding 10px 10px
              border-bottom 1px solid #cccccc
              .img, .detail, .btn-group, .isEnable
                display flex
                align-items: center
                .el-button
                  width 60px !important
                  margin 0 10px
              .img
                padding 5px
                margin-right 5px
                border-radius 10px
                background-color $color-background-b
                i
                  color #ffffff
                  font-size 24px!important
              .detail
                flex-direction: column
                width 300px
                &:hover
                  color #3B8BE3
                  cursor pointer
                no-wrap()
                .name
                  display inline-block
                  margin-bottom 5px
                  font-size 14px
                .desc
                  font-size 12px
                  color: #cccccc
                  width: 100px;          
              .descBox 
                width 600px 
              .line
                width 10px
                height 25px
                margin 0 30px 0 0
                border-right 1px solid #cccccc
  .sort-container /deep/
    display flex
    flex-direction column
    .el-tag
      margin-bottom 10px

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
