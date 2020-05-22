<!--
  User: gaol
  Date: 2019/5/25
  功能：流程配置——流程设计——图形设计界面
-->
<template>  
  <el-dialog 
    title="图形设计"
    width="600px"
    :visible="true"
    custom-class="dialog-item"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="true"
    :fullscreen= 'true'
    :append-to-body="true"
    :before-close="handleClose"
    >
    <div class="process-design-picContainer"  @change="clickPicDssignBtn">
      <!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;" size="mini">
        <el-radio-button label="简洁设计">简洁设计</el-radio-button>
        <el-radio-button label="图形设计">图形设计</el-radio-button>
      </el-radio-group> -->
      <div class="container" v-loading="loading">

        <div class="branch-container">
          <!-- <el-card class="box-card"> -->

            <!--新增分支、分支排序、出口方向btn区域---start-->
            <div v-atris-flowRuleScan="{styleBlock:'block'}">
              <el-button
                size="small"
                @click="sortBranch()"
                class="sortBranch"
                type="primary"
                style="margin-bottom: 10px"
              >
                分支排序
              </el-button>

              <el-button
                size="small"
                @click="batchAddBranch()"
                class="batchAddBranch"
                type="primary"
                style="margin-bottom: 10px"
              >
                开始节点新增分支
              </el-button>

              <el-button
                size="small"
                @click="batchOutPosition()"
                class="batchAddBranch"
                type="primary"
                style="margin-bottom: 10px"
              >
                出口方向
              </el-button>   
            </div>
         
            <!--新增分支、分支排序、出口方向btn区域---end-->

            <!---流程区域（流程名称、发起人等）---start--->
            <el-card shadow="never" class="contentBox-card" style="width: 100%">
              <div class="containerBox">
                <!-- <div style="margin-bottom: 10px"> -->
                  <!-- 规则名： -->
                  <!-- <el-input size="small"  disabled  v-model="ruleObj.Name" placeholder="请输入规则名" style="width: 200px;"></el-input> -->
                <el-card class="topBox">
                  <p class="startFieldTit">开始节点: {{ruleObj.Name}}<p>
                  <div class="topBox startPeopleBox flex-box">
                    <div class="tit flex-label">
                      <span style="font-weight:bold">发起人：</span>
                      <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑发起人">
                        <i class="el-icon-edit" @click="handleFlowStart()"></i>
                      </el-tooltip>
                    </div>
                    <!---发起人显示区---start--->
                    <div class="text item" style="margin-bottom: 10px">
                      <div>
                        <!-- 发起人：
                        <el-button size="small" @click.native.prevent="flowStartVisible = true">
                          选择
                        </el-button> -->
                        <div style="margin-top: 10px" v-if="ruleObj.Starters && ruleObj.Starters.length">
                          <el-card shadow="hover">
                            <template v-for="Deliverie in ruleObj.Starters">
                              <!--按节点或者表单字段时--start-->
                              <div>
                                <div>{{Deliverie.DeliveryWayText}}</div>
                                <div style="margin-left:10px;margin-top:5px">
                                  {{Deliverie.DeliveryWayTypeText}}: 
                                  <!--注 8 为按节点---->
                                  <span style="color: #cccccc" v-if="Deliverie.DeliveryWay!=='8'">{{Deliverie.FieldName}}</span>
                                  <span style="color: #cccccc" v-else>{{Deliverie.NodeNames}}</span>
                                </div>                         
                              </div>
                              <!--按节点或者表单字段时--start-->
                              <div
                                style="line-height:20px; font-size: 12px; padding: 5px;"
                                v-if="Deliverie.PositionValue && Deliverie.PositionValue.length"
                              >
                                已选岗位：
                                <span
                                  v-for="(org, index) in Deliverie.PositionValue"
                                  :key="index"
                                  style="color: #cccccc">{{org.Name}}
                                  <span
                                    v-if="Deliverie.PositionValue && Deliverie.PositionValue.length-1 !== index">,</span>
                                  </span>
                              </div>

                              <div style="line-height:20px; font-size: 12px; padding: 5px;"
                                  v-if="Deliverie.OrgValue && Deliverie.OrgValue.length">
                                已选组织：
                                <span
                                  v-for="(org, index) in Deliverie.OrgValue"
                                  :key="index"
                                  style="color: #cccccc">{{org.Name}}
                                  <span
                                    v-if="Deliverie.OrgValue && Deliverie.OrgValue.length-1 !== index">,</span>
                                  </span>
                              </div>

                              <div style="line-height:20px; font-size: 12px; padding: 5px;"
                                  v-if="Deliverie.EmpValue && Deliverie.EmpValue.length">
                                已选人员：
                                <span
                                  v-for="(org, index) in Deliverie.EmpValue"
                                  :key="index"
                                  style="color: #cccccc">{{org.Name}}
                                  <span
                                    v-if="Deliverie.EmpValue && Deliverie.EmpValue.length-1 !== index">,</span>
                                  </span>
                              </div>
                            </template>
                          </el-card>
                        </div>
                      </div>
                    </div>    
                    <!---发起人显示区---end--->
                  </div>
                </el-card>
                <!-- </div> -->
                
                <!----中间内容区域---start--->
                <!-- <el-card class="middleBox-card"> -->
                <div style="width:100%">
                  <el-scrollbar :native="false" style="width:100%">
                    <!-- ruleObj.Branches: {{ruleObj.Branches}} -->
                    <div class="middleBox branch-list">
                      <div class="branchItemBox" 
                            v-if="ruleObj.Branches && ruleObj.Branches.length" 
                            v-for="(branche, index) in ruleObj.Branches"
                            :key="branche.NodeToNodeId"
                            v-dragging="{ item: branche, list: ruleObj.Branches, group: 'branches' }"
                      >
                        <el-card class="branchCondition-card">
                          <!-- branche.Condition.Name： {{branche.Condition.Name}} -->
                          <div class="line">
                            <i class="el-icon-bottom"></i>
                          </div>    
                          <!----分支的说明显示区域（条件类型，选定值等）---start-->                 
                          <div class="branchCondition">
                              <div>
                                <span class="line-tit">分支名称：{{branche.Condition.Name}}</span>
                                <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑分支名称">
                                  <i class="el-icon-edit" @click="handleSelectBranch(branche)"></i>
                                </el-tooltip>
                                <el-tooltip v-atris-flowRuleScan="{styleBlock:'block'}" class="item" effect="dark" content="新增处理人节点">
                                  <i class="el-icon-plus" style="color: rgba(59,139,227,1); float: right" @click="addLastNode(branche)"></i>
                                </el-tooltip>                              
                              </div>
                              <div
                                style="font-size: 12px; padding: 5px;"
                                v-if="branche.Condition.ConnDataFromText"
                              >
                                条件类型：
                                <span
                                  style="color: #cccccc">{{branche.Condition.ConnDataFromText}}
                                    </span>
                              </div>
                              <div
                                style="font-size: 12px; padding: 5px;"
                                v-if="branche.Condition.SpecOperWayText"
                              >
                                处理人：
                                <span
                                  style="color: #cccccc">{{branche.Condition.SpecOperWayText}}
                                    </span>
                              </div>
                              <div
                                style="font-size: 12px; padding: 5px;"
                                v-if="branche.Condition.NodeNames"
                              >
                                选定节点：
                                <!-- branche.Condition.NodeNames:{{branche.Condition.NodeNames}} -->
                                <span
                                  style="color: #cccccc">{{branche.Condition.NodeNames}}
                                    </span>
                              </div>
                              <div
                                style="font-size: 12px; padding: 5px;"
                                v-if="branche.Condition.FieldValue"
                              >
                                选定表单：
                                <span
                                  style="color: #cccccc">{{branche.Condition.FieldValue}}
                                    </span>
                              </div>
                              <div
                                style="line-height:20px; font-size: 12px; padding: 5px;"
                                v-if="branche.Condition.Value && branche.Condition.Value.length"
                              >
                                选定值：
                                <span
                                  v-for="(item, index) in branche.Condition.Value"
                                  style="color: #cccccc"
                                >
                                      {{item.Name}}
                                        <span
                                          v-if="branche.Condition.Value.length-1 !== index">,
                                        </span>
                                      </span>
                              </div>

                              <!-- branche.Condition.FieldConditions：{{branche.Condition.FieldConditions}} -->
                              <div
                                style="font-size: 12px; padding: 5px;"
                                v-if="branche.Condition.FieldConditions && branche.Condition.FieldConditions.length"
                              >
                                表单字段：
                                <span
                                  v-for="(item, index) in branche.Condition.FieldConditions"
                                  style="color: #cccccc"
                                > 
                                <span v-if="index === 0">
                                  {{item.FieldName}}{{operChange(item.Oper)}}{{item.FieldValue.Id}}
                                </span>
                                <span v-if="index === 1">
                                  ，{{saveTypeChange(item.SaveType)}}{{item.FieldName}}{{operChange(item.Oper)}}{{item.FieldValue.Id}}
                                </span>
                                </span>
                                <!--拼接 表单字段的显示内容--end--->
                              </div>
                          </div>
                          <!----分支的说明显示区域（条件类型，选定值等）---end-->
                        </el-card>
                        <!--分支名称等信息区域---end--->

                        <!----对应分支下的节点区域---start--->
                        <!-- <el-card class="fieldListBox-card"> -->
                          <!---节点展开/收起标签--start-->
                          <div  @click="isShowFieldList(index, branche)">
                              <!-- branche.isShowFieldList:{{branche.isShowFieldList}} -->
                            <el-button type="text" v-text="branche.isShowFieldList?'展开':'收起'"></el-button>
                            <i :class="branche.isShowFieldList? 'el-icon-caret-bottom': 'el-icon-caret-top'"></i>
                          </div>
                          <!---节点展开/收起标签--start-->

                          <div class="fieldListBox">
                            <!-- branche.Deliveries: {{branche.Deliveries}} -->
                            <!---分支 有选择处理人时 下面的节点渲染---start-->
                            <div class="fieldListItemBox">  
                              <!---分支名称下面向下的连接箭头---start--->        
                              <div class="line-down">
                                <i class="el-icon-bottom"></i>
                              </div>
                              <!--分支名称下面向下的连接箭头--end-->


                              <div class="fieldName">
                                <span class="tit">节点名:</span>  
                                <span class="tit-content">{{branche.Name}}</span>
                                <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑此节点">
                                  <i class="el-icon-edit" @click="handleEditNameAndRule(branche)"></i>
                                </el-tooltip>
                              </div>

                              <!---branche.Deliveries 有值的情况下 节点名称下面的（多人处理、审批人、抄送人）显示区----start--->                                   
                              <div class="fieldContent" v-if="branche.Deliveries && branche.Deliveries.length">
                                      <!-- Deliverie： {{branche}} -->
                                <!--多人处理规则--start-->
                                <div class="morePeopleRuleTitBox clearfix">
                                  <span class="tit ellipsis1">多人处理规则:</span>                                            
                                  <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" effect="dark" content="编辑多人处理规则">
                                    <i class="el-icon-edit" @click="handleSelectApprover(branche.NodeToNodeId)"></i>
                                  </el-tooltip>
                                  <span class="tit-content" v-for="(Deliverie,fieldKey) in branche.Deliveries"
                                      :key="fieldKey"
                                  >
                                      {{Deliverie.DeliveryWayText}}
                                      <span v-if="branche.Deliveries.length>1 && fieldKey !== branche.Deliveries.length-1">,</span>
                                  </span>
                                </div>

                                <!--多人处理规则---end-->
                                <!----处理人--start-->                                                                                                       
                                <div class="approverWrap">
                                  <div class="approverTit">
                                    <span>审批人:</span>                        
                                    <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑审批人" placement="bottom">
                                      <i class="el-icon-edit" @click="handleSelectApprover(branche.NodeToNodeId)"></i>
                                    </el-tooltip>
                                  </div>
                                  
                                  <!-- branche.Deliveries: {{branche.Deliveries}} -->
                                  <div class="">
                                    <div class="approverBox" 
                                        v-for="(Deliverie,fieldKey) in branche.Deliveries"
                                        :key="fieldKey">

                                      <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.PositionValue && Deliverie.PositionValue.length">
                                        已选岗位/角色/职务：
                                        <span
                                          v-for="(org, index) in Deliverie.PositionValue"
                                          style="display: inline-block; padding: 5px; color: #cccccc"
                                        >
                                            {{org.Name}}
                                              <span
                                                v-if="Deliverie.PositionValue.length-1 !== index">,
                                              </span>
                                            </span>
                                      </div>
                                      <div v-show="!Deliverie.PositionValue"><span>已选岗位/角色/职务：暂无</span></div>

                                      <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.OrgValue && Deliverie.OrgValue.length">
                                        已选组织：
                                        <span
                                          v-for="(org, index) in Deliverie.OrgValue"
                                          style="display: inline-block; padding: 5px; color: #cccccc">
                                          {{org.Name}}
                                          <span
                                            v-if="Deliverie.OrgValue.length-1 !== index">,</span>
                                          </span>
                                      </div>
                                      <div v-if="!Deliverie.OrgValue"><span> 已选组织：暂无</span></div>

                                      <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.EmpValue && Deliverie.EmpValue.length">
                                        已选人员：
                                        <span
                                          v-for="(org, index) in Deliverie.EmpValue"
                                          style="display: inline-block; padding: 5px; color: #cccccc">
                                          {{org.Name}}   
                                          <span
                                            v-if="Deliverie.EmpValue.length-1 !== index">,</span>
                                          </span>
                                      </div>
                                      <div v-show="!Deliverie.OrgValue"><span>已选人员：暂无</span></div>
                                    </div>
                                  </div>
                                </div>
                                <!----处理人--end-->                                                                                                         

                                <!-- branche: {{branche.CcModel}} -->                                                                                                                                                                         
                                <!----抄送人显示区----start-->
                                <div class="ccWrap">
                                  <span class="ccTit">抄送人：</span>
                                  <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑抄送人" placement="bottom">
                                    <i class="el-icon-edit" @click="handleSelectCc(branche)"></i>
                                  </el-tooltip>                               
                                  <div class="ccDtailBox">
                                    <!--抄送人存在----start--->
                                    <div v-if="branche.CcModel && branche.CcModel.length">
                                      <!-- <el-card shadow="hover"> -->
                                        <template v-for="Deliverie in branche.CcModel">
                                          <!--按节点或者表单字段时--start-->
                                          <div>
                                            <div>{{Deliverie.DeliveryWayText}}</div>
                                            <div style="margin-left:10px;margin-top:5px">
                                              {{Deliverie.DeliveryWayTypeText}}: 
                                              <!--注 8 为按节点---->
                                              <span style="color: #cccccc" v-if="Deliverie.DeliveryWay!=='8'">{{Deliverie.FieldName}}</span>
                                              <span style="color: #cccccc" v-else>{{Deliverie.NodeNames}}</span>                                            </div>                         
                                          </div>
                                          <!--按节点或者表单字段时--start-->
                                          <!--已选岗位区域---start--->
                                          <div
                                            class="ccSelectedPosition ellipsis3"
                                            :ref="`ccSelectedPosition${Deliverie}`"
                                            style="font-size: 12px; padding: 5px;"
                                            v-if="Deliverie.PositionValue && Deliverie.PositionValue.length"
                                            @click="ccShowAllPosition(Deliverie)">
                                            已选岗位：
                                            <span
                                              v-for="(org, index) in Deliverie.PositionValue"
                                              :key="index"
                                              style="color: #cccccc">{{org.Name}}
                                              <span
                                                v-if="Deliverie.PositionValue && Deliverie.PositionValue.length-1 !== index">,</span>
                                              </span>
                                          </div>
                                          <!--已选岗位区域---end--->

                                          <!--已选组织区域---start--->                                                          
                                          <div
                                            class="ccSelectedOrg ellipsis3"
                                            :ref="`ccSelectedOrg${Deliverie}`" 
                                            style="font-size: 12px; padding: 5px;"
                                            v-if="Deliverie.OrgValue && Deliverie.OrgValue.length"
                                            @click="ccShowAllOrg(Deliverie)">
                                            已选组织：
                                            <span
                                              v-for="(org, index) in Deliverie.OrgValue"
                                              :key="index"
                                              style="color: #cccccc">{{org.Name}}
                                              <span
                                                v-if="Deliverie.OrgValue && Deliverie.OrgValue.length-1 !== index">,</span>
                                              </span>
                                          </div>
                                          <!--已选组织区域---end--->                                                          

                                          <!--已选人员---start--->                                                                                
                                          <div
                                              classl="ccSelectedPeople ellipsis3"
                                              :ref="`ccSelectedPeople${Deliverie}`" 
                                              style="font-size: 12px; padding: 5px;"
                                              v-if="Deliverie.EmpValue && Deliverie.EmpValue.length"
                                              @click="ccShowAllPeople(Deliverie)">
                                            已选人员：
                                            <span
                                              v-for="(org, index) in Deliverie.EmpValue"
                                              :key="index"
                                              style="color: #cccccc">{{org.Name}}
                                              <span
                                                v-if="Deliverie.EmpValue && Deliverie.EmpValue.length-1 !== index">,</span>
                                              </span>
                                          </div>
                                          <!--已选人员---end--->                                                                                
                                        </template>
                                      <!-- </el-card> -->
                                    </div> 
                                    <!--抄送人存在----end--->
                                  
                                    <!--抄送人不存在时----start-->
                                    <div v-show="!branche.CcModel.length" class="notCC">
                                          <!--已选岗位--start-->
                                          <div style="font-size: 12px; padding: 5px;">
                                            <span>已选岗位：</span>                                                                         
                                            <span style="color: #cccccc">暂无</span>
                                          </div>
                                          <!--已选岗位区域---end--->

                                          <!--已选组织区域---start--->                                                          
                                          <div style="font-size: 12px; padding: 5px;">
                                            <span>已选组织：</span>
                                            <span style="color: #cccccc">暂无</span>
                                          </div>
                                          <!--已选组织区域---end--->                                                          

                                          <!--已选人员---start--->                                                                                
                                          <div style="font-size: 12px; padding: 5px;">
                                            <span>已选人员：</span>
                                            <span style="color: #cccccc">暂无</span>
                                          </div>
                                          <!---已选人员-----end--->                                  
                                    </div>                           
                                  </div>
                                </div>
                                <!----抄送人显示区----end-->                              
                              </div>
                              <!---branche.Deliveries 有值的情况下 节点名称下面（多人处理、审批人、抄送人）显示区-----end-->
                              
                            
                              <!---branche.Deliveries 没有值的情况下 节点下面（多人处理、审批人、抄送人）显示区---start---->
                              <div class="fieldContent" v-if="!branche.Deliveries.length">

                                <!-- Deliverie： {{branche}} -->
                                <!--多人处理规则--start-->
                                <div class="morePeopleRuleTitBox clearfix">
                                  <span class="tit ellipsis1">多人处理规则:</span>                                            
                                  <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" effect="dark" content="编辑多人处理规则">
                                    <i class="el-icon-edit" @click="handleSelectApprover(branche.NodeToNodeId)"></i>
                                  </el-tooltip>
                                  <span class="tit-content">暂无</span>
                                </div>
                                <!--多人处理规则---end-->

                                <!----处理人--start-->                                                                                                       
                                <div class="approverWrap">
                                  <div class="approverTit">
                                    <span>审批人:</span>                        
                                    <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑审批人" placement="bottom">
                                      <i class="el-icon-edit" @click="handleSelectApprover(branche.NodeToNodeId)"></i>
                                    </el-tooltip>
                                  </div>
                                  <div class="">
                                    <div class="approverBox">
                                      <div style="font-size: 12px;padding-left: 10px">
                                        已选岗位/角色/职务：
                                        <span
                                          style="display: inline-block; padding: 5px; color: #cccccc"
                                        >
                                            暂无
                                            </span>
                                      </div>

                                      <div style="font-size: 12px;padding-left: 10px">
                                        已选组织：
                                        <span
                                          style="display: inline-block; padding: 5px; color: #cccccc">
                                          暂无
                                        </span>
                                      </div>

                                      <div style="font-size: 12px;padding-left: 10px">
                                        已选人员：
                                        <span
                                          style="display: inline-block; padding: 5px; color: #cccccc">
                                          暂无
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <!----处理人--end-->                                                                                                          

                                <!-- branche: {{branche.CcModel}} -->                                                                                                                                                                         
                                <!----抄送人显示区----start-->
                                <div class="ccWrap">
                                  <span class="ccTit">抄送人：</span>
                                  <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="编辑抄送人" placement="bottom">
                                    <i class="el-icon-edit" @click="handleSelectCc(branche)"></i>
                                  </el-tooltip>                               
                                  <div class="ccDtailBox">
                                    <!--抄送人存在----start--->
                                    <div v-if="branche.CcModel && branche.CcModel.length">
                                      <!-- <el-card shadow="hover"> -->
                                        <template v-for="Deliverie in branche.CcModel">
                                          <!--按节点或者表单字段时--start-->
                                          <div>
                                            <div>{{Deliverie.DeliveryWayText}}</div>
                                            <div style="margin-left:10px;margin-top:5px">
                                              {{Deliverie.DeliveryWayTypeText}}: 
                                              <!--注 8 为按节点---->
                                              <span style="color: #cccccc" v-if="Deliverie.DeliveryWay!=='8'">{{Deliverie.FieldName}}</span>
                                              <span style="color: #cccccc" v-else>{{Deliverie.NodeNames}}</span>
                                            </div>                         
                                          </div>
                                          <!--按节点或者表单字段时--start-->                                          
                                          <!--已选岗位区域---start--->
                                          <div
                                            class="ccSelectedPosition ellipsis3"
                                            style="font-size: 12px; padding: 5px;"
                                            v-if="Deliverie.PositionValue && Deliverie.PositionValue.length"
                                            :ref="`ccSelectedPosition${Deliverie}`"
                                            @click="showCcSelectedPostion(Deliverie)">
                                            已选岗位：
                                            <span
                                              v-for="(org, index) in Deliverie.PositionValue"
                                              :key="index"
                                              style="color: #cccccc">{{org.Name}}
                                              <span
                                                v-if="Deliverie.PositionValue && Deliverie.PositionValue.length-1 !== index">,</span>
                                              </span>
                                          </div>
                                          <!--已选岗位区域---end--->

                                          <!--已选组织区域---start--->                                                          
                                          <div 
                                              class="ccSelectedOrg ellipsis3"
                                              style="font-size: 12px; padding: 5px;"
                                              v-if="Deliverie.OrgValue && Deliverie.OrgValue.length"
                                              :ref="`ccSelectedOrg${Deliverie}`"
                                              @click="showCcSelectedOrg(Deliverie)">
                                              已选组织：
                                            <span
                                              v-for="(org, index) in Deliverie.OrgValue"
                                              :key="index"
                                              style="color: #cccccc">{{org.Name}}
                                              <span
                                                v-if="Deliverie.OrgValue && Deliverie.OrgValue.length-1 !== index">,</span>
                                              </span>
                                          </div>
                                          <!--已选组织区域---end--->                                                          

                                          <!--已选人员---start--->                                                                                
                                          <div 
                                              class="ccSelectedPeople ellipsis3"
                                              style="font-size: 12px; padding: 5px;"
                                              v-if="Deliverie.EmpValue && Deliverie.EmpValue.length"
                                              :ref="`ccSelectedPeople${Deliverie}`"
                                              @click="showCcSelectedPeople(Deliverie)">
                                              已选人员：
                                            <span
                                              v-for="(org, index) in Deliverie.EmpValue"
                                              :key="index"
                                              style="color: #cccccc">{{org.Name}}
                                              <span
                                                v-if="Deliverie.EmpValue && Deliverie.EmpValue.length-1 !== index">,</span>
                                              </span>
                                          </div>
                                          <!--已选人员---end--->                                                                                
                                        </template>
                                      <!-- </el-card> -->
                                    </div> 
                                    <!--抄送人存在----end--->
                                  
                                    <!--抄送人不存在时----start-->
                                    <div v-show="!branche.CcModel.length" class="notCC">
                                      <!--已选岗位--start-->
                                      <div style="font-size: 12px; padding: 5px;">
                                        <span>已选岗位：</span>                                                                         
                                        <span style="color: #cccccc">暂无</span>
                                      </div>
                                      <!--已选岗位区域---end--->

                                      <!--已选组织区域---start--->                                                          
                                      <div style="font-size: 12px; padding: 5px;">
                                        <span>已选组织：</span>
                                        <span style="color: #cccccc">暂无</span>
                                      </div>
                                      <!--已选组织区域---end--->                                                          

                                      <!--已选人员---start--->                                                                                
                                      <div style="font-size: 12px; padding: 5px;">
                                        <span>已选人员：</span>
                                        <span style="color: #cccccc">暂无</span>
                                      </div>
                                      <!---已选人员-----end--->                                  
                                    </div>
                                    <!--抄送人不存在时----end-->                                                        
                                  </div>

                                </div>
                                <!----抄送人显示区----end-->                              
                              </div>
                              <!---branche.Deliveries 没有值的情况下 节点下面（多人处理、审批人、抄送人）显示区---end---->

                              <!---节点下面新增插入新节点btn便签---start--->
                              <div class="insertNodeBtn">
                                <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" effect="dark" :content="`【${branche.Name}】后新增节点`" placement="bottom">
                                  <i class="el-icon-circle-plus-outline add"  @click="clickAddMiddleNode($event,branche)"></i>
                                </el-tooltip>
                              </div>
                              <!---节点下面新增插入新节点btn标签---end--->                                
                            </div>                           
                            <!---分支 有选择处理人时 下面的节点渲染---end-->

                            <!---branche.Nodes里面所有节点显示区域(涉及到 递归渲染)-----start--->    
                            <!-- branche.Nodes : {{branche}}     -->
                            <div class="fieldListItemBox" v-if="branche.Nodes && branche.Nodes.length">
                              <recursive-design-pic 
                                :nodes="branche.Nodes"
                                @handleSelectApprover="handleSelectApprover"
                                @handleSelectCc='handleSelectCc'>
                              </recursive-design-pic>
                            </div>     
                            <!----branche.Nodes 里面所有节点显示区域（涉及到 递归渲染）----end--->                                     
                          </div>                        
                        <!-- </el-card> -->
                        <!---对饮分支下的节点区域---end--->
                      </div>
                    </div>
                  </el-scrollbar>    
                </div>            
                <!-- </el-card> -->
                <!----中间内容区域---end--->

                <!---foot区域-----start-->
                <!-- <el-card class="footerBox-card"> -->
                  <div class="footerBox">
                    <div>结束</div>
                    <div class="line"><i class="el-icon-bottom"></i></div>
                  </div>
                <!-- </el-card> -->
                <!---foot区域-----end-->
              </div>
            </el-card>
            <!---流程区域（流程名称、发起人等）---end--->

          <!-- </el-card> -->
        </div>
      </div>

      <!--调用 mixins 中的 flowBaseFn方法中的 handleClose 方法----->
      <save-footer @save="onRuleSave" 
            isCancel="true"  
            :saveBtnIsShow="saveBtnIsShow"
            cancelText="关闭" 
            @cancel="handleClose">
      </save-footer>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import StartEmpDialog from '../components/Start-emp-dialog'
  import RecursiveDesignPic from './Flow-designpic-recursive'
  import RecursiveCmp from '../components/Recursive-cmp'
  import ApproverDialog from '../components/Approver-dialog'
  import AddApproverDialog from '../components/Add-approver-dialog'
  import CcDialog from '../components/Cc-dialog'
  import BranchDialog from '../components/Branch-dialog'
  import BranchSort from '../components/Branch-sort'
  import EditNameandruleDialog from '../components/Edit-nameandrule-dialog'
  import DialogFlowLoginError from '@/components/platform/approval-flow/dialog-flow-login-error/dialog-flow-login-error'
  import BaseInfoRouter from '@/components/platform/approval-flow/flow-config-router/flow-config-router'
  import {
    getRule,
    batchAddBranch,
    deleteBranch,
    updateRule,
    branchSort,
    getNodeInfo,
    getNodeList,
    saveNodeInfo
  } from '@/api/approve'
  // import { mapGetters } from 'vuex'
  import { flowBaseFn, flowAutoLogin} from '@/utils/mixin'

  export default {
    mixins: [flowBaseFn, flowAutoLogin],
    components: {
      SaveFooter,
      StartEmpDialog,
      ApproverDialog,
      AddApproverDialog,
      CcDialog,
      BranchDialog,
      DialogFlowLoginError,
      BaseInfoRouter,
      RecursiveDesignPic,
      RecursiveCmp,
      BranchSort,
      EditNameandruleDialog
    },
    props: {
      ruleObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        tabPosition: '简洁设计',
        loading: false,  
        NodeToNodeCode: '',
        mainNodeId: '',
        toNodeId: '',
        saveBtnIsShow: false, 
        nodeData: [] // 用于存放 跳转到 节点设置页面中的 节点数据
      }
    },
    created () {

    },
    mounted () {

    },
    beforeDestroy () {

    },
    computed: {
    },
    watch: {
      '$route' (to, from) {

      }
    },
    methods: {
      getOrder () {
        this._getRule()
      },
      // 显示loading
      showLoading(){
        this.loading = true
      },
      // 隐藏loading
      hideLoading(){
        this.loading = false
      },
      // 审批人展开显示 已选岗位/角色/职务
      ccShowAllPosition(obj){
        debugger
        this.$refs[`selectedPosition${obj}`][0].classList.remove("ellipsis3")
      },
      // 审批人展开显示 已选组织
      ccShowAllOrg(obj){
        debugger
        this.$refs[`selectedOrg${obj}`][0].classList.remove("ellipsis3")
      },
      // 审批人展开显示 已选人员
      ccShowAllPeople(obj){
        debugger
        this.$refs[`selectedPeople${obj}`][0].classList.remove("ellipsis3")
      },  
      // 处理人展开显示 已选岗位/角色/职务
      ccShowAllPosition(obj){
        this.$refs[`ccSelectedPosition${obj}`][0].classList.remove("ellipsis3")
      },
      // 处理人展开显示 已选组织
      ccShowAllOrg(obj){
        this.$refs[`ccSelectedOrg${obj}`][0].classList.remove("ellipsis3")
      },      
      // 处理人展开显示 已选人员
      ccShowAllPeople(obj){
        this.$refs[`ccSelectedPeople${obj}`][0].classList.remove("ellipsis3")
      },       
      clickPicDssignBtn (e) {
        // console.log(JSON.parse(e.currentTarget.dataset.obj))
        debugger
        // document.querySelectorAll('.container')[0].style.display = 'none'
      },
      // 用于 跳转到 出口方向时 获取节点数据 列表
      _getNodeList () {
        debugger
        this.loading = true
        return new Promise((resolve, reject) => {
          getNodeList(this.$route.query.ruleId).then(res => {
            this.loading = false
            if (res.data.State === REQ_OK) {
              debugger
              this.nodeData = res.data.Data
              resolve(res.data.Data)
            } else {
              this.$message.error('节点列表获取失败')
            }
          }).catch((err) => {
            this.loading = false
            this.$message.error('节点列表获取失败')
            reject(err)
          })
        })
      },
      // 处理显示当前的 处理人节点名称
      _CurrentHandler (branche) {
        if (branche.Nodes && branche.Nodes.length) {
          const getNodesName = (opt) => {
            if (opt && opt.length) {
              for (let i = 0; i < opt.length; i++) {
                let item = opt[i]
                if (item.Nodes && item.Nodes.length) {
                  return getNodesName(item.Nodes)
                } else {
                  // console.log(opt[0].Name)
                  // console.log(item.Name)
                  return item.Name
                }
              }
            } else {
              return opt.Name
            }
          }
          return getNodesName(branche.Nodes)
        } else {
          if (branche.Name) {
            return branche.Name
          }
        }
      },
      // 获取规则详情
      _getRule () {
        if (!this.ruleId) return
        // debugger
        this.loading = true
        getRule(this.ruleId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.ruleObj = res.data.Data
            this.oldRuleObj = JSON.parse(JSON.stringify(this.ruleObj))
          } else {
            this.loading = false
            this.$message({
              message: `获取数据失败err,${res.data.Error}`,
              type: 'error'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            message: '规则获取失败，请重试',
            type: 'error'
          })
        })
      },
      // 删除分支条件
      _deleteBranch (code) {
        this.$confirm('此操作将永久删除之前所配置的分支条件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBranch(this.companyApprovalId, code).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this._getRule(this.currentRuleId)
            } else {
              this.$message({
                type: 'error',
                message: '删除分支条件失败!'
              })
            }
          })
        })
      },
      // 保存 接地那配置的属性 和 节点名称
      _saveNodeInfo (data) {
        debugger
        console.log(data)
        this.loadingShow = true
        saveNodeInfo(JSON.stringify(data)).then((res) => {
          this.loadingShow = false
          if (res && res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } else {
            this.$message.error('保存失败err,请刷新后重试')
          }
        }).catch(() => {
          this.loadingShow = false
          this.$message.error('保存失败err,请刷新后重试')
        })
      },
      // 编辑节点名称
      // clickEditField () {
      //   debugger
      //   this.$message('4356')
      //   this.editNameAndRuleVisible = true
      // },
      // 给分支加一个结束的节点
      addLastNode (branche) {
        // 触发父级的方法
        this.$emit('addLastNode',branche)
      },
      // 关闭图形设计页面
      handleClose () {
        this.$emit('closeDessignPic', false)
      },
      // 新增插入节点
      clickAddMiddleNode(e, obj) {
        // 触发父级的方法
        debugger
        let NodeToNodeId_formerId = obj.NodeToNodeId
        let NodeToNodeId_latterId = ''
        if(obj.Nodes && obj.Nodes.length){
          // 非最后一个节点
          NodeToNodeId_latterId = obj.Nodes[0].NodeToNodeId
        }else {
          // 最后一个节点
          NodeToNodeId_latterId = ''
        }
        this.$confirm('确认需要新增插入节点吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 触发 父组件 的 inserNode方法
          this.$bus.$emit('insertNode',NodeToNodeId_formerId, NodeToNodeId_latterId)
          // 调用插入节点的方法
          // this._insertNode(NodeToNodeId_formerId, NodeToNodeId_latterId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消新增'
          })          
        })
      },
      // 设置出口方向
      batchOutPosition () {
        // 触发 父级组件的页面 的事件
        this.$bus.$emit('getPosDataList')
        // 先调取接口 获取 该流程的节点数据
        // this._getNodeList().then(res => {
        //   // 将 this.nodeData 的数据存入 sessionStorage 中
        //   if(res && res.length) {
        //     // 默认将 第一条数据 存入 store 中
        //     this.$store.commit('SET_NODE_OBJ', res[0])
        //     // 页面跳转
        //     this.$router.push({
        //       path: '/platform/approvalFlow/flowRule/flowConfig/fieldSet',
        //       query: {
        //         'flowId': this.$route.query.flowId,
        //         'approvalId': this.$route.query.approvalId,
        //         'ruleId': this.$route.query.ruleId
        //       }
        //     })
        //   }
        // })
      },
      // 新增分支条件
      batchAddBranch () {
        // 触发 process-design组件中的 batchAddBranch 事件
        this.$bus.$emit('batchAddBranch')
      },
      // 分支排序
      sortBranch () {
        // 显示排序的dialog
        // this.sortBranchShow = true
        this.$bus.$emit('sortBranch')
      },
      // 控制 节点的 展开/收起
      isShowFieldList (idx, obj) {
        debugger
        console.log(document.querySelectorAll('.fieldListBox'))
        let flag = document.querySelectorAll('.fieldListBox')[idx].style.display
        if (flag === '' || flag === 'block') {
          document.querySelectorAll('.fieldListBox')[idx].style.display = 'none'
          this.$set(obj, 'isShowFieldList', true)
        } else if (flag === 'none') {
          document.querySelectorAll('.fieldListBox')[idx].style.display = 'block'
          this.$set(obj, 'isShowFieldList', false)
        }
      },
      // 保存规则
      onRuleSave () {
        this.loading = true
        updateRule(this.ruleId, this.ruleObj.Name).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '规则保存成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '规则保存失败，请重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            message: '规则保存失败，请重试！',
            type: 'error'
          })
        })
      },
      // 刷新规则
      refreshRule () {
        this._getRule(this.ruleObj.FlowRuleId)
      },
      // 点击发起人
      handleFlowStart () {
        debugger
        // this.flowStartVisible = false
        // 触发 父组件中
        this.$bus.$emit('handleFlowStart')
      },
      // 点击了分支名称后面的 “编辑”btn （编辑出口条件）
      handleSelectBranch (branch) {
        // this.mainNodeId = branch.MainNodeId
        // this.toNodeId = branch.ToNodeId
        // // 显示  出口条件 的dialog 弹框
        // this.branchVisible = true

        this.$bus.$emit('handleSelectBranch', branch)
      },
      // 分之条件dialog取消
      handleCancelBranch () {
        // 隐藏 出口条件的 dialog 弹框
        // this.branchVisible = false
      },
      // 编辑节点名称 和 规则
      handleEditNameAndRule (branc) {
        debugger
        // this.selectEditNameObj = branc
        // // 调用获取该节点 配置属性的接口
        // this.editNameAndRuleVisible = true
        this.$bus.$emit('handleEditNameAndRule', branc)
      },
      // 保存编辑姓名和规则
      handleSaveEditName (data) {
        debugger
        // 提交 保存的接口
        this._saveNodeInfo(data)
      },
      // 编辑默认审批人/编辑新增审批人
      handleSelectApprover (code) {
        // this.NodeToNodeCode = code
        // this.approverVisible = true

        this.$bus.$emit('handleSelectApprover', code)
      },
      // 默认审批人dialog取消
      handleCancelApprover () {
        this.approverVisible = false
      },
      // 新增下一步审批人（即新增一个 节点的审批人）
      handleAddApprover (branche) {
        debugger
        if (branche.Nodes && branche.Nodes.length) {
          this.forEachNodes(branche)
        } else {
          this.mainNodeId = branche.MainNodeId
          this.toNodeId = branche.ToNodeId
        }
        console.log(this.mainNodeId, this.toNodeId)
        // 显示设置 审批人的弹窗
        this.addApproverVisible = true
      },
      // 递归遍历节点信息
      forEachNodes (node) {
        node.Nodes.forEach(item => {
          if (item.Nodes && item.Nodes.length) {
            this.forEachNodes(item)
          } else {
            this.mainNodeId = item.MainNodeId
            this.toNodeId = item.ToNodeId
          }
        })

        // this.$bus.$emit('handleAddApprover', branche)
      },
      // 新增审批人取消
      handleCancelAddApprover () {
        this.addApproverVisible = false
      },
      // 选择抄送人 (此方法是 选择的最后一个节点的 抄送人)
      handleSelectCc (branche) {
        debugger
        // this.NodeToNodeCode = NodeToNodeCode
        // 需要 选取最后一个节点的 NodeToNodeCode 作为  this.NodeToNodeCode 的值 需要递归遍历
        // if (branche.Nodes && branche.Nodes.length) {
        //   let getNodesName = (opt) => {
        //     if (opt && opt.length) {
        //       for (let i = 0; i < opt.length; i++) {
        //         let item = opt[i]
        //         if (item.Nodes && item.Nodes.length) {
        //           return getNodesName(item.Nodes)
        //         } else {
        //           // console.log(opt[0].Name)
        //           // console.log(item.Name)
        //           return item.NodeToNodeId
        //         }
        //       }
        //     } else {
        //       return opt.NodeToNodeId
        //     }
        //   }
        //   let lastNodeToNodeId = getNodesName(branche.Nodes)
        //   this.NodeToNodeCode = lastNodeToNodeId
        // } else {
        //   if (branche.NodeToNodeId) {
        //     this.NodeToNodeCode = branche.NodeToNodeId
        //   }
        // }
        // // 显示出 编辑抄送人的 dialog 弹窗
        // this.ccVisible = true

        this.$bus.$emit('handleSelectCc_designPic', branche)
      },
      // 抄送人dialog取消
      handleCancelCc () {
        this.ccVisible = false
      },
      // 操作符转义
      operChange (num) {
        switch (num) {
          case '0':
            return '等于'
          case '1':
            return '大于'
          case '2':
            return '小于'
          case '3':
            return '大于等于'
          case '4':
            return '小于等于'
          case '5':
            return '不等于'
        }
      },
      // 保存排序
      saveSort (data) {
        console.log(data)
        // 将新数据赋值给 this.ruleObj.Branches
        this.ruleObj.Branches = data
        branchSort(JSON.stringify(this.ruleObj.Branches)).then(res => {
          if (res && res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '排序保存成功'
            })
            // 调排序的接口进行排序的保存 成功后 关闭排序dialog
            this.sortBranchShow = false
          } else {
            this.$message({
              type: 'error',
              message: '排序保存失败err,请刷新后重试'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '排序保存失败err,请刷新后重试'
          })
        })
      },
      // 保存类型转义
      saveTypeChange (num) {
        switch (num) {
          case 'AND':
            return '且'
          case 'OR':
            return '或者'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .process-design-picContainer
    .container
      .branch-container
        margin-top 10px
        margin-bottom 20px
        .batchAddBranch
          float right
          margin-right 10px
        .sortBranch
          float right
        .contentBox-card
          .el-card__header
            padding 10px 20px
          .containerBox /deep/
            width 100%
            .footerBox
              position relative
              font-weight bold
              height 50px
              line-height 50px
              // border 1px solid red
              box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)
              margin-top 50px
              text-align center
              .line
                position absolute
                top -50px
                left 50%
                width 2px
                height 40px
                // background rgba(237,237,237,1)
                i  
                  position absolute
                  bottom 10px
                  left -6px    
                  font-size 30px
                  color rgba(209,209,209,1)   
            .startFieldTit
              color #000000
              font-weight bold
              font-size 14px
              text-align center
            .startPeopleBox
              display flex
              display -webkit-flex
              justify-content center
              align-items center
              // border 1px solid red
              .flex-label
                // width 100px
                height 100%
                margin-right 5px                               
            .el-scrollbar__wrap
              margin-bottom 0 !important
              .middleBox
                display flex
                display -webkit-flex
                flex-wrap nowrap
                justify-content space-between
                margin-top 80px
                // border 1px solid blue
                // overflow auto
                // box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)
                padding 5px
                box-sizing border-box
                // overflow auto
                .branchItemBox
                  position relative
                  width 100%
                  margin 0 5px
                  .line 
                    position absolute
                    top -70px
                    left 50%
                    margin auto
                    width 2px
                    height 50px
                    // background rgba(237,237,237,1)   
                    i
                      position absolute
                      color rgba(240,220,240,1)   
                  .branchCondition
                    // border 1px solid red
                    text-align center  
                    .line-tit
                      font-weight bold
                      color #000000
                      font-size 14px    
                      margin-right 5px            
                  .fieldListBox
                    display flex
                    display -webkit-flex
                    justify-content center
                    flex-direction column 
                    // border 1px solid red
                    // box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)
                    // margin-top 20px
                    padding 0 5px
                    box-sizing border-box
                    .fieldListItemBox
                      position relative
                      box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)
                      padding 10px
                      box-sizing border-box
                      .line-down
                        position absolute
                        top -60px
                        left 50%
                        width 2px
                        height 50px
                        // background rgba(237,237,237,1)
                        i 
                          position absolute
                          bottom 10px
                          left -6px    
                          font-size 30px
                          color rgba(240,240,240,1)                                
                      .fieldName
                        font-size 12px
                        font-weight bold
                        padding 10px 0
                        box-sizing border-box
                        border-bottom 1px dotted #000000
                        .tit
                          margin-right 5px
                        .tit-content
                          margin-right 5px
                          color rgba(214,214,214,1)
                      .fieldContent
                        .morePeopleRuleTitBox
                          padding 10px 0 
                          box-sizing border-box
                          border-bottom 1px dotted #000000
                          .tit
                            float left
                            font-size 12px
                            font-weight bold
                            margin-right 5px
                            max-width 100px
                          .tit-content
                            color rgba(214,214,214,1)
                        .approverWrap
                          display flex !important
                          justify-content flex-start
                          align-items center
                          border-bottom 1px dotted #000000
                          margin 0 5px 5px 0
                          .approverTit
                            font-size 12px
                            font-weight bold
                            max-width 100px
                            margin-right 5px
                          .approverBox
                            // display flex !important
                            // justify-content flex-start
                            // align-items center
                            padding 10px 
                            box-sizing border-box
                            .selectedPosition
                            .selectedPosition.ellipsis3
                              cursor pointer
                            .selectedOrg
                            .selectedOrg.ellipsis3
                              cursor pointer
                            .selectedPeople
                            .selectedPeople.ellipsis3
                              cursor pointer                          
                        .ccWrap 
                          line-height 20px
                          padding 10px 0
                          box-sizing border-box
                          display flex !important
                          display -webkit-flex !important
                          justify-content flex-start
                          align-items center                        
                          .ccTit
                            font-weight bold
                            font-size 12px
                            margin-right 5px
                            max-width 100px
                          .ccDtailBox
                            .ccSelectedPosition
                            .ccSelectedPosition.ellipsis3
                              cursor pointer
                            .ccSelectedOrg
                            .ccSelectedOrg.ellipsis3
                              cursor pointer 
                            .ccSelectedPeople
                              cursor pointer
                      .insertNodeBtn
                        position absolute
                        bottom -10px
                        left 50%
                        transform translate(-50%, 0)
                        text-align center
                        font-size 20px
                        color #409EFF
                        &:hover
                          cursor pointer
                          color red
              
    .dialog-item
      .item
        margin-bottom 10px;
      .el-dialog__body
        max-height: 400px;
        overflow-y: scroll;

  .el-tag + .el-tag {
    margin-left: 10px;
  }

>>>.fieldListBox-card 
  margin-top 30px
  .el-card__body
    padding 10px !important
.branchCondition-card
  background rgba(243,243,243,1)
  margin-bottom 30px
  .line
    position absolute
    top -60px
    left 50%
    width 2px
    height 50px
    // background rgba(237,237,237,1)
    i 
      position absolute
      bottom 10px
      left -6px    
      font-size 30px
      color rgba(240,240,240,1)    
  >>>.el-card__body
    padding 10px !important
>>>.footerBox-card
  margin-top 30px

</style>
