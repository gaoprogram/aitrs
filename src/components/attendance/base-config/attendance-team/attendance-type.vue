<!--
  User: xxxxxxx
  Date: 2018/5/4
  功能：xxxxxx
-->

<template>
  <div class="attendance-type-container">
    <div class="item-row">
      <span>考勤类型：</span>
      <el-select class="filter-item"
                 v-model="AType"
                 style="width: 400px"
      >
        <el-option v-for="item in attendanceTypeSelect" :key="item.UniCode" :label="item.Name" :value="item.UniCode">
        </el-option>
      </el-select>
    </div>
    <div class="fixed-work" v-if="AType === '6404c226-a706-4db4-878a-acbb4a8cc8ab'">
      <span class="title">
      工作日设置
      </span>
      <div class="item-row">
        <span>考勤班次：</span>
        <el-button type="primary"
                   size="small"
                   @click.native.prevent="selectClass()"
        >
          选择班次
        </el-button>
      </div>
      <div class="item-row">
        <ul class="class-selected">
          <template v-for="item in multipleSelection">
            <li class="class-item" @dragstart="dragStart($event, item)" @dragend="dragEnd($event)" draggable="true">
              <span>{{item.ScheduleName}}</span>
            </li>
          </template>
          <li class="class-item" @dragstart="dragStart($event, {})" @dragend="dragEnd($event)" draggable="true">
            <span>休息</span>
          </li>
        </ul>
        <span style="color: #cccccc">可拖拉班次到对应日期的班次</span>
      </div>
      <div class="item-row">
        <div class="table-title">
          <span class="date">日期</span>
          <span class="class">班次</span>
          <span class="time">时段</span>
        </div>
        <div class="date-table">
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期一</span>
            </li>
            <li class="item item-flex" @drop.self="drop($event, fixedClassObj.MON)" @dragover="allowDrop($event)">
              {{fixedClassObj.MON.ScheduleName}}
            </li>
            <li class="item">
              <template v-for="cs in fixedClassObj.MON.CS" v-if="fixedClassObj.MON.ScheduleCode">
                <div class="time-contant">
                  <span class="time">{{cs.Time}}</span>
                  异常核验
                  <el-select class="filter-item"
                             v-model="cs.Opt"
                             style="width: 120px"
                             multiple
                             size="mini"
                  >
                    <el-option v-for="item in validType" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期二</span>
            </li>
            <li class="item item-flex" @drop.self="drop($event, fixedClassObj.TUE)" @dragover="allowDrop($event)">
              {{fixedClassObj.TUE.ScheduleName}}
            </li>
            <li class="item">
              <template v-for="cs in fixedClassObj.TUE.CS" v-if="fixedClassObj.TUE.ScheduleCode">
                <div class="time-contant">
                  <span class="time">{{cs.Time}}</span>
                  异常核验
                  <el-select class="filter-item"
                             v-model="cs.Opt"
                             style="width: 120px"
                             multiple
                             size="mini"
                  >
                    <el-option v-for="item in validType" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期三</span>
            </li>
            <li class="item item-flex" @drop.self="drop($event, fixedClassObj.WED)" @dragover="allowDrop($event)">
              {{fixedClassObj.WED.ScheduleName}}
            </li>
            <li class="item">
              <template v-for="cs in fixedClassObj.WED.CS" v-if="fixedClassObj.WED.ScheduleCode">
                <div class="time-contant">
                  <span class="time">{{cs.Time}}</span>
                  异常核验
                  <el-select class="filter-item"
                             v-model="cs.Opt"
                             style="width: 120px"
                             multiple
                             size="mini"
                  >
                    <el-option v-for="item in validType" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期四</span>
            </li>
            <li class="item item-flex" @drop.self="drop($event, fixedClassObj.THR)" @dragover="allowDrop($event)">
              {{fixedClassObj.THR.ScheduleName}}
            </li>
            <li class="item">
              <template v-for="cs in fixedClassObj.THR.CS" v-if="fixedClassObj.THR.ScheduleCode">
                <div class="time-contant">
                  <span class="time">{{cs.Time}}</span>
                  异常核验
                  <el-select class="filter-item"
                             v-model="cs.Opt"
                             style="width: 120px"
                             multiple
                             size="mini"
                  >
                    <el-option v-for="item in validType" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期五</span>
            </li>
            <li class="item item-flex" @drop.self="drop($event, fixedClassObj.FRI)" @dragover="allowDrop($event)">
              {{fixedClassObj.FRI.ScheduleName}}
            </li>
            <li class="item">
              <template v-for="cs in fixedClassObj.FRI.CS" v-if="fixedClassObj.FRI.ScheduleCode">
                <div class="time-contant">
                  <span class="time">{{cs.Time}}</span>
                  异常核验
                  <el-select class="filter-item"
                             v-model="cs.Opt"
                             style="width: 120px"
                             multiple
                             size="mini"
                  >
                    <el-option v-for="item in validType" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期六</span>
            </li>
            <li class="item item-flex" @drop.self="drop($event, fixedClassObj.SAT)" @dragover="allowDrop($event)">
              {{fixedClassObj.SAT.ScheduleName}}
            </li>
            <li class="item">
              <template v-for="cs in fixedClassObj.SAT.CS" v-if="fixedClassObj.SAT.ScheduleCode">
                <div class="time-contant">
                  <span class="time">{{cs.Time}}</span>
                  异常核验
                  <el-select class="filter-item"
                             v-model="cs.Opt"
                             style="width: 120px"
                             multiple
                             size="mini"
                  >
                    <el-option v-for="item in validType" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期天</span>
            </li>
            <li class="item item-flex" @drop.self="drop($event, fixedClassObj.SUN)" @dragover="allowDrop($event)">
              {{fixedClassObj.SUN.ScheduleName}}
            </li>
            <li class="item">
              <template v-for="cs in fixedClassObj.SUN.CS" v-if="fixedClassObj.SUN.ScheduleCode">
                <div class="time-contant">
                  <span class="time">{{cs.Time}}</span>
                  异常核验
                  <el-select class="filter-item"
                             v-model="cs.Opt"
                             style="width: 120px"
                             multiple
                             size="mini"
                  >
                    <el-option v-for="item in validType" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </li>
          </ul>
        </div>
        <div style="margin-top: 20px">
          <span>特殊日历：</span>
          <el-select class="filter-item"
                     v-model="fixedClassObj.SpecialCalendar"
                     style="width: 400px"
                     multiple
          >
            <el-option v-for="item in specialCalendarTableData" :key="item.SPCode" :label="item.SPName" :value="item.SPCode">
            </el-option>
          </el-select>
          <el-button @click="handlerOpenSpecialCalendar">查看</el-button>
        </div>
      </div>
      <span class="title">
        弹性上班
        &nbsp;&nbsp;
        <el-switch
          v-model="isOpenFlex"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
      </span>
      <div class="item-row" v-show="isOpenFlex">
        <div style="margin-top: 20px">
          每天第一次打卡晚到
          <el-input type="number" v-model="fixedClassObj.FlexSetting.Late" min="0" class="input" style="width:100px"></el-input>
          分钟，允许弹性
        </div>
        <div style="margin-top: 20px">
          如员工当日实际出勤打卡未满工作时长要求，按照
          <el-select class="filter-item"
                     v-model="fixedClassObj.FlexSetting.Option"
                     style="width: 400px"
          >
            <el-option v-for="item in FlexSettingSelect" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <span class="title">
        晚走晚到
        &nbsp;&nbsp;
        <el-switch
          v-model="isOpenLeave"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
      </span>
      <div class="item-row" v-show="isOpenLeave">
        <template v-for="(item, index) in fixedClassObj.LateSetting">
          <div style="margin-top: 20px" class="late-leave">
            晚走规则{{index+1}}：第一天下班后晚走
            <el-input type="number" size="mini" v-model="item.CheckOut" min="0" class="input" style="width:100px"></el-input>
            分钟，第二天上班可以晚到
            <el-input type="number" size="mini" v-model="item.CheckIn" min="0" class="input" style="width:100px"></el-input>
            分钟，不算迟到
            <el-button icon="el-icon-delete"
                       style="margin-left: 20px"
                       v-show="fixedClassObj.LateSetting.length > 1"
                       size="mini" @click="handlerDelLateLeave(index)">
            </el-button>
          </div>
        </template>
        <el-tooltip class="item" effect="dark" content="新增晚走规则" placement="bottom-start">
          <el-button icon="el-icon-plus"
                     type="primary"
                     size="mini" @click="handlerAddLateLeaveRule()">
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="custom-work" v-if="AType === '0e987247-40d8-4338-812a-155106ade085'">
      <span class="title">
        工作日设置
      </span>
      <div class="item-row">
        <span>考勤班次：</span>
        <el-button type="primary"
                   size="small"
                   @click.native.prevent="selectClass()"
        >
          选择班次
        </el-button>
      </div>
      <div class="item-row">
        <div class="table-title">
          <span class="class">班次</span>
          <span class="time">时段</span>
        </div>
        <div class="date-table">
          <ul class="date-list" v-for="item in planClassObj.CLSConfig">
            <li class="item item-flex">
              {{item.ScheduleName}}
            </li>
            <li class="item">
              <template v-for="cs in item.CS" v-if="item.ScheduleCode">
                <div class="time-contant">
                  <span class="time">{{cs.Time}}</span>
                  异常核验
                  <el-select class="filter-item"
                             v-model="cs.Opt"
                             style="width: 120px"
                             multiple
                             size="mini"
                  >
                    <el-option v-for="item in validType" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </li>
          </ul>
        </div>
        <span style="color: red">*未排班时，员工可自己选择班次打卡</span>
      </div>
      <div class="item-row">
        <div style="margin-top: 20px">
          <span>
            允许修改之前日期排班：
            &nbsp;&nbsp;
            <el-switch
              v-model="isEnableModify"
              active-text="允许"
              inactive-text="不允许">
            </el-switch>
          </span>
        </div>
        <div style="margin-top: 20px">
          <span>最后修改日：</span>
          <el-select class="filter-item"
                     v-model="planClassObj.LastModifyDate"
                     style="width: 400px"
          >
            <el-option v-for="item in 31" :key="item" :label="`每月${item}日`" :value="item">
            </el-option>
          </el-select>
        </div>
        <span style="color: red">*考勤组负责人超过该日期不能修改一个月内的排班。建议与薪资周期一致</span>
      </div>
    </div>
    <div class="free-work" v-if="AType === '8293dd82-514e-422a-a025-bf50714f5537'">
      <span class="title">
      工作日设置
      </span>
      <div class="item-row">
        <ul class="class-selected">
          <li class="class-item" @dragstart="freeWorkDragStart($event, 1)" @dragend="dragEnd($event)" draggable="true">
            <span>自由班次</span>
          </li>
          <li class="class-item" @dragstart="freeWorkDragStart($event, 2)" @dragend="dragEnd($event)" draggable="true">
            <span>休息</span>
          </li>
        </ul>
        <span style="color: #cccccc">可拖拉班次到指定日期</span>
      </div>
      <div class="item-row">
        <div class="table-title">
          <span class="date">日期</span>
          <span class="class">班次</span>
        </div>
        <div class="date-table">
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期一</span>
            </li>
            <li class="item item-flex" @drop.self="freeWorkDrop($event, 'MON')" @dragover="allowDrop($event)">
              <span>{{ freeOrRest(freeClassObj.MON) }}</span>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期二</span>
            </li>
            <li class="item item-flex" @drop.self="freeWorkDrop($event, 'TUE')" @dragover="allowDrop($event)">
              <span>{{ freeOrRest(freeClassObj.TUE) }}</span>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期三</span>
            </li>
            <li class="item item-flex" @drop.self="freeWorkDrop($event, 'WED')" @dragover="allowDrop($event)">
              <span>{{ freeOrRest(freeClassObj.WED) }}</span>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期四</span>
            </li>
            <li class="item item-flex" @drop.self="freeWorkDrop($event, 'THR')" @dragover="allowDrop($event)">
              <span>{{ freeOrRest(freeClassObj.THR) }}</span>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期五</span>
            </li>
            <li class="item item-flex" @drop.self="freeWorkDrop($event, 'FRI')" @dragover="allowDrop($event)">
              <span>{{ freeOrRest(freeClassObj.FRI) }}</span>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期六</span>
            </li>
            <li class="item item-flex" @drop.self="freeWorkDrop($event, 'SAT')" @dragover="allowDrop($event)">
              <span>{{ freeOrRest(freeClassObj.SAT) }}</span>
            </li>
          </ul>
          <ul class="date-list">
            <li class="item item-flex">
              <span class="date">星期天</span>
            </li>
            <li class="item item-flex" @drop.self="freeWorkDrop($event, 'SUN')" @dragover="allowDrop($event)">
              <span>{{ freeOrRest(freeClassObj.SUN) }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="item-row" style="margin-top: 20px">
        <span class="title">考勤开始时间</span>
        <div>
          <span>每个工作日的</span>
          <el-time-picker
            style="width: 97px"
            size="mini"
            format="HH:mm"
            v-model="freeClassObj.CheckIn"
            value-format="HH:mm"
            placeholder="时间点">
          </el-time-picker>
        </div>
        <div style="margin-top: 20px">
          <span>特殊日历：</span>
          <el-select class="filter-item"
                     v-model="freeClassObj.SpecialCalendar"
                     style="width: 400px"
                     multiple
          >
            <el-option v-for="item in specialCalendarTableData" :key="item.SPCode" :label="item.SPName" :value="item.SPCode">
            </el-option>
          </el-select>
          <el-button @click="handlerOpenSpecialCalendar">查看</el-button>
        </div>
        <div style="margin-top: 20px" class="late-leave">
          一天工作时长最大
          <el-input type="number" v-model="freeClassObj.MaxWorkTime" class="input" style="width:100px"></el-input>
          小时
        </div>
        <div style="margin-top: 20px" class="late-leave">
          工作时长统计最小单位
          <el-radio-group v-model="freeClassObj.WorkTimeUnit">
            <el-radio :label="0.1">0.1小时</el-radio>
            <el-radio :label="0.5">0.5小时</el-radio>
            <el-radio :label="1">1小时</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <el-dialog
      title="选择班次"
      :visible.sync="selectClassVisible"
      width="1000px"
      append-to-body
      :show-close="false"
      center
    >
      <el-table :data="selectClasslist" border style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          align="center"
          prop="ScheduleName"
          label="班次"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="ShortName"
          label="班次简称"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="TotalWorkTimeLabel"
          label="时长"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="OrgName"
          label="工作时段"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.OnWorkLabel" :key="index" style="display: block">{{ item }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectClassVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectClassVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="700px"
      title="特殊日历"
      :visible="specialCalendarVisible"
      v-if="specialCalendarVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :show-close="false"
      append-to-body
      custom-class="batchEditor-dialog"
    >
      <div class="search-container">
        <div class="filter-left">
          <el-button class="filter-item"
                     type="primary"
                     @click="addSpecialCalendar"
                     style="margin-bottom: 10px;float: right"
          >
            新增日历
          </el-button>
        </div>
      </div>
      <div class="org-container" style="margin-top: 10px">
        <el-table
          :data="specialCalendarTableData"
          border
          :show-header="true"
          highlight-current-row
          style="width: 715px; margin: 0 auto;max-height: 300px;overflow-y: scroll;"
        >

          <el-table-column label="日历名称">
            <template slot-scope="scope">
              <span v-show="!scope.row.Edit">{{scope.row.oldSPName}}</span>
              <el-input v-show="scope.row.Edit" type="text" size="small" v-model="scope.row.SPName" class="input" style="width:200px;"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="快捷操作">
            <template slot-scope="scope">

              <el-button
                type="text"
                size="small"
                v-show="!scope.row.Edit"
                @click="scope.row.Edit = true"
              >
                编辑
              </el-button>

              <el-button
                type="text"
                size="small"
                v-show="scope.row.Edit"
                @click="scope.row.Edit = false"
              >
                取消
              </el-button>

              <el-button
                type="text"
                size="small"
                v-show="scope.row.Edit"
                @click="editCalendarMain(scope.row)"
              >
                保存
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="handlerSetCalendar(scope.row)"
              >
                设置日历
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="handleNoWorkDayList(scope.row)"
              >
                非工作日列表
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="handlerDelCalendarMain(scope.row.SPCode)"
              >
                删除
              </el-button>

            </template>
          </el-table-column>

        </el-table>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="specialCalendarVisible = false">取消</el-button>
        <el-button type="primary" @click="sureHeadPosition()">确定</el-button>
      </div>
      <el-dialog
        width="420px"
        title="新增日历"
        :visible="addCalendarVisible"
        v-if="addCalendarVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body
        custom-class="addCalendar-dialog"
      >
        <div class="div-item">
          日历名称：
          <el-input v-model="calendarMainJson.SPName" style="width: 300px"></el-input>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addCalendarVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCalendarMain()">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="900px"
        :title="calendarTitle"
        :visible="setCalendarDetailVisible"
        v-if="setCalendarDetailVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body
        custom-class="addCalendar-dialog"
      >
        <div class="calendar-container" style="display: flex;">
          <calendar ref="calendar" :markDateMore="arr" @choseDay="clickDay"></calendar>
          <div class="right-container" style="margin-left: 20px">
            <div class="div-item">
              日期时间：{{calendarJson.OnDate}}
            </div>
            <div class="div-item">
              日期类型：
              <el-select v-model="calendarJson.DateType" placeholder="请选择" style="width: 200px">
                <el-option
                  v-for="item in calendarType"
                  :key="item.UniCode"
                  :label="item.Name"
                  :value="item.UniCode">
                </el-option>
              </el-select>
            </div>
            <div class="div-item">
              <span>最晚签到：</span>
              <el-time-picker
                style="width: 200px"
                format="HH:mm"
                v-model="calendarJson.CheckIn"
                value-format="HH:mm"
                placeholder="时间点">
              </el-time-picker>
            </div>
            <div class="div-item">
              <span>最早签退：</span>
              <el-time-picker
                style="width: 200px"
                format="HH:mm"
                v-model="calendarJson.CheckOut"
                value-format="HH:mm"
                placeholder="时间点">
              </el-time-picker>
            </div>
            <div class="div-item">
              日历显示：
              <el-input v-model="calendarJson.Title" placeholder="最多输入两个字" style="width: 200px" maxlength="2"></el-input>
            </div>
            <div class="div-item">
              <span style="vertical-align: top">日历备注：</span>
              <el-input type="textarea" v-model="calendarJson.Remark" style="width: 200px"></el-input>
            </div>

            <el-card class="box-card">
              <div class="text item">
                早于最晚签到时间的签到，不算入迟到。
              </div>
              <div class="text item">
                晚于最早签退时间的签到，不算入早退。
              </div>
            </el-card>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelCalendarDetailVisible()">取消</el-button>
          <el-button type="primary" @click="saveCalendarDetail()">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="900px"
        title="非工作日列表"
        :visible="noWorkDayCalendarVisible"
        v-if="noWorkDayCalendarVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body
        custom-class="addCalendar-dialog"
      >
        <div class="filter-left">
          <el-button class="filter-item"
                     type="primary"
                     @click="addCalendarDetail"
                     style="margin-bottom: 10px;float: right"
          >
            新增
          </el-button>
        </div>
        <el-table
          :data="arr"
          border
          :show-header="true"
          highlight-current-row
          style="max-height: 300px;overflow-y: scroll;"
        >

          <el-table-column label="日期" prop="date">
          </el-table-column>

          <el-table-column label="日期类型" prop="DateTypeName">
          </el-table-column>

          <el-table-column label="最晚签到时间" prop="CheckIn">
          </el-table-column>

          <el-table-column label="最早签退时间" prop="CheckOut">
          </el-table-column>

          <el-table-column label="显示" prop="showText">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handlerDelCalendarMain(scope.row.SPCode)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="noWorkDayCalendarVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unneeded-ternary */

  import { REQ_OK } from '@/api/config'
  import {
    getScheduleConfigList,
    getAType, getValidType,
    getDateType,
    addClassConfig,
    getClassConfig,
    addSpecialCalendar,
    getSpecialCalendar,
    deleteSpecialCalendar,
    addSpecialCalendarDetail,
    getSpecialCalendarDetailList
  } from '@/api/attendance'
  // import { getOrgList } from '@/api/permission'
  import { Message, MessageBox } from 'element-ui'
  import Calendar from '@/base/Calendar/calendar'
  export default {
    props: {
      parentJson: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        GroupCode: '',
        attendanceTypeSelect: [],
        AType: '6404c226-a706-4db4-878a-acbb4a8cc8ab',
        validType: [],
        fixedClassObj: {
          Id: 0,
          CLS: [],
          MON: {
            ScheduleName: '',
            ScheduleCode: '',
            CS: []
          },
          TUE: {
            ScheduleName: '',
            ScheduleCode: '',
            CS: []
          },
          WED: {
            ScheduleName: '',
            ScheduleCode: '',
            CS: []
          },
          THR: {
            ScheduleName: '',
            ScheduleCode: '',
            CS: []
          },
          FRI: {
            ScheduleName: '',
            ScheduleCode: '',
            CS: []
          },
          SAT: {
            ScheduleName: '',
            ScheduleCode: '',
            CS: []
          },
          SUN: {
            ScheduleName: '',
            ScheduleCode: '',
            CS: []
          },
          SpecialCalendar: [],
          EnableFlex: 0,
          FlexSetting: {
            Late: 0,
            Option: 1
          },
          EnableLate: 0,
          LateSetting: [
            {
              CheckOut: 0,
              CheckIn: 0
            },
            {
              CheckOut: 0,
              CheckIn: 0

            }
          ]
        },
        isOpenFlex: false,
        FlexSettingSelect: [
          {
            value: '缺勤时长算作弹性缺勤来处理',
            code: 1
          },
          {
            value: '缺勤时长按其班次对应的迟到，早退，旷工',
            code: 2
          }
        ],
        isOpenLeave: false,
        planClassObj: {
          Id: 0,
          CLSConfig: {
          },
          EnableModify: 0,
          LastModifyDate: 1
        },
        isEnableModify: false,
        freeClassObj: {
          Id: 0,
          MON: 0,
          TUE: 0,
          WED: 0,
          THR: 0,
          FRI: 0,
          SAT: 0,
          SUN: 0,
          CheckIn: '',
          SpecialCalendar: [],
          MaxWorkTime: '',
          WorkTimeUnit: ''
        },
        selectClassVisible: false,
        selectClasslist: [],
        multipleSelection: [],
        lateTimes: '',
        minTime: '',
        closeWatch: true,
        calendarType: [],
        calendarTitle: '新增日历详情',
        addCalendarVisible: false,
        setCalendarDetailVisible: false,
        specialCalendarVisible: false,
        specialCalendarTableData: [],
        calendarMainJson: {
          Id: '',
          SPCode: '',
          SPName: ''
        },
        calendarJson: {
          Id: '',
          OnDate: '',
          DateType: '',
          CheckIn: '',
          CheckOut: '',
          Title: '',
          Remark: ''
        },
        arr: [],
        noWorkDayCalendarVisible: false,
        // noWorkDayCalendarList: [],
        IsWorkDay: -1
      }
    },
    computed: {
    },
    created () {
      this._getAType()
      this._getValidType()
    },
    mounted () {
      this._getSpecialCalendar()
    },
    methods: {
      freeOrRest (code) {
        return code === '1' ? '自由排班' : '休息'
      },
      _getClassConfig () {
        getClassConfig(this.GroupCode, this.parentJson.AType).then(res => {
          if (res.data.State === REQ_OK) {
            this.AType = this.parentJson.AType
            switch (this.AType) {
              case '6404c226-a706-4db4-878a-acbb4a8cc8ab':
                this.fixedClassObj = res.data.Data
                this.multipleSelection = [...this.fixedClassObj.CLS]
                this.isOpenFlex = this.fixedClassObj.EnableFlex === 1 ? true : false
                this.isOpenLeave = this.fixedClassObj.EnableLate === 1 ? true : false
                break
              case '0e987247-40d8-4338-812a-155106ade085':
                this.planClassObj = res.data.Data
                this.isEnableModify = this.planClassObj.EnableModify === '1' ? true : false
                break
              case '8293dd82-514e-422a-a025-bf50714f5537':
                this.freeClassObj = res.data.Data
                this.freeClassObj.CheckIn = this.utilTimeHHmm(new Date(this.replaceTime(res.data.Data.CheckIn)))
                break
              default:
            }
          } else {
            Message.error('考勤类型获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('考勤类型获取失败，请刷新页面重试！')
        })
      },
      _getAType () {
        getAType().then(res => {
          if (res.data.State === REQ_OK) {
            this.attendanceTypeSelect = res.data.Data
          } else {
            Message.error('考勤类型获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('考勤类型获取失败，请重试！')
        })
      },
      _getValidType () {
        getValidType().then(res => {
          if (res.data.State === REQ_OK) {
            this.validType = res.data.Data
          } else {
            Message.error('异常核验类型获取失败，请重试！')
          }
        })
      },
      async _getDateType () {
        await getDateType().then(res => {
          if (res.data.State === REQ_OK) {
            this.calendarType = res.data.Data
          } else {
            Message.error('日期类型获取失败，请重试！')
          }
        })
      },
      async _getSpecialCalendar () {
        await getSpecialCalendar().then(res => {
          if (res.data.State === REQ_OK) {
            let items = res.data.Data
            this.specialCalendarTableData = items.map(v => {
              this.$set(v, 'Edit', false)
              this.$set(v, 'oldSPName', v.SPName)
              return v
            })
            this.specialCalendarTableData.forEach(item => {
              item.Edit = false
            })
          } else {
            Message.error('特殊日历列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('特殊日历列表获取失败，请重试！')
        })
      },
      async _addSpecialCalendarDetail () {
        addSpecialCalendarDetail(this.calendarCode, JSON.stringify(this.calendarJson)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('日历详情保存成功!')
          } else {
            Message.error('日历详情保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('日历详情保存失败，请重试！')
        })
      },
      async _getSpecialCalendarDetailList () {
        getSpecialCalendarDetailList(this.calendarCode, this.IsWorkDay).then(res => {
          if (res.data.State === REQ_OK) {
            let result = res.data.Data
            this.arr = result.map(v => {
              return {
                CheckIn: this.utilTimeHHmm(new Date(this.replaceTime(v.CheckIn))),
                CheckOut: this.utilTimeHHmm(new Date(this.replaceTime(v.CheckOut))),
                DateType: v.DateType,
                DateTypeName: v.DateTypeName,
                className: 'mark',
                code: v.Id,
                date: this.format(this.replaceTime(v.OnDate)),
                Remark: v.Remark,
                showText: v.Title
              }
            })
          }
        })
      },
      async _addClassConfig () {
        await addClassConfig(this.GroupCode, this.AType, JSON.stringify(this.strJson)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('考勤类型保存成功！')
          } else {
            Message.error('考勤类型保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('考勤类型保存失败，请重试！')
        })
      },
      async _getScheduleConfigList () {
        await getScheduleConfigList().then(res => {
          if (res.data.State === REQ_OK) {
            this.selectClasslist = res.data.Data
            this.selectClassVisible = true
          } else {
            Message.error('班次列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('班次列表获取失败，请重试！')
        })
      },
      handlerOpenSpecialCalendar () {
        // 查看特殊日历
        // this._getSpecialCalendar()
        this.specialCalendarVisible = true
      },
      addSpecialCalendar () {
        // 新增日历主表
        this.addCalendarVisible = true
      },
      saveCalendarMain () {
        // 保存日历主表
        addSpecialCalendar(JSON.stringify(this.calendarMainJson)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('日历保存成功！')
            this.addCalendarVisible = false
            this._getSpecialCalendar()
          } else {
            Message.error('日历保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('日历保存失败，请重试！')
        })
      },
      editCalendarMain (item) {
        addSpecialCalendar(JSON.stringify(item)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('日历保存成功！')
            item.Edit = false
            this._getSpecialCalendar()
          } else {
            Message.error('日历保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('日历保存失败，请重试！')
        })
      },
      handlerDelCalendarMain (code) {
        // 删除日历主表
        MessageBox.confirm('确认删除此日历吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSpecialCalendar(code).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('日历删除成功！')
              this._getSpecialCalendar()
            } else {
              Message.error('日历删除失败，请重试！')
            }
          }).catch(() => {
            Message.error('日历删除失败，请重试！')
          })
        }).catch(() => {
        })
      },
      handlerSetCalendar (row) {
        // 设置日历子表
        this.calendarCode = row.SPCode
        this.IsWorkDay = -1
        this._getDateType()
        this._getSpecialCalendarDetailList()
        this.setCalendarDetailVisible = true
      },
      clickDay (data) {
        // 选中某天
        let pickDay = this.arr.filter(v => {
          return v.date === data.date
        })
        if (pickDay.length) {
          this.calendarJson = {
            Id: pickDay[0].code,
            OnDate: pickDay[0].date,
            DateType: pickDay[0].DateType,
            CheckIn: pickDay[0].CheckIn,
            CheckOut: pickDay[0].CheckOut,
            Title: pickDay[0].showText,
            Remark: pickDay[0].Remark
          }
        } else {
          this.calendarJson = {
            Id: 0,
            OnDate: data.date,
            DateType: '',
            CheckIn: '',
            CheckOut: '',
            Title: '',
            Remark: ''
          }
        }
        Message.info(`你选择了：${data.date}`)
      },
      handleNoWorkDayList (row) {
        // 非工作日列表
        this.calendarCode = row.SPCode
        this.IsWorkDay = 0
        this._getSpecialCalendarDetailList()
        this.noWorkDayCalendarVisible = true
      },
      addCalendarDetail () {
        this._getDateType()
        this._getSpecialCalendarDetailList()
        this.setCalendarDetailVisible = true
      },
      cancelCalendarDetailVisible () {
        this.calendarJson = {
          Id: '',
          OnDate: '',
          DateType: '',
          CheckIn: '',
          CheckOut: '',
          Title: '',
          Remark: ''
        }
        this.setCalendarDetailVisible = false
      },
      saveCalendarDetail () {
        // 保存日历详情
        this._addSpecialCalendarDetail()
        this._getSpecialCalendarDetailList()
      },
      selectClass () {
        // 选择班次
        if (this.selectClasslist.length) {
          this.selectClassVisible = true
        } else {
          this._getScheduleConfigList()
        }
      },
      handleSelectionChange (val) {
        // 选择班次
        this.multipleSelection = [...val]
        this.planClassObj.CLSConfig = []
        val.forEach(item => {
          let obj = {
            ScheduleCode: item.ScheduleCode,
            ScheduleName: item.ScheduleName,
            CS: [
            ]
          }
          for (let i = 0; i < item.OnWorkLabel.length; i++) {
            let cs = {
              Id: item.TimeSlot[i].Id,
              Time: item.OnWorkLabel[i],
              Opt: []
            }
            obj.CS.push(cs)
          }
          this.planClassObj.CLSConfig.push(obj)
        })
      },
      handlerAddLateLeaveRule () {
        // 新增晚走规则
        let obj = {
          CheckOut: 0,
          CheckIn: 0
        }
        this.fixedClassObj.LateSetting.push(obj)
      },
      handlerDelLateLeave (index) {
        // 删除晚走规则
        this.fixedClassObj.LateSetting.splice(index, 1)
      },
      freeWorkDragStart (event, num) {
        event.dataTransfer.setData('Text', event.target.innerHTML)
        event.dataTransfer.setData('num', num)
      },
      freeWorkDrop (event, item) {
        event.preventDefault()
        let data = event.dataTransfer.getData('Text')
        let res = event.dataTransfer.getData('num')
        event.target.innerHTML = data
        switch (item) {
          case 'MON':
            this.freeClassObj.MON = res
            break
          case 'TUE':
            this.freeClassObj.TUE = res
            break
          case 'WED':
            this.freeClassObj.WED = res
            break
          case 'THR':
            this.freeClassObj.THR = res
            break
          case 'FRI':
            this.freeClassObj.FRI = res
            break
          case 'SAT':
            this.freeClassObj.SAT = res
            break
          case 'SUN':
            this.freeClassObj.SUN = res
            break
          default:
        }
      },
      dragStart (event, item) {
        event.dataTransfer.setData('Text', event.target.innerHTML)
        event.dataTransfer.setData('item', JSON.stringify(item))
      },
      dragEnd (event) {
        event.preventDefault()
      },
      drop (event, item) {
        event.preventDefault()
        // let data = event.dataTransfer.getData('Text')
        let res = JSON.parse(event.dataTransfer.getData('item'))
        console.log(res)
        // event.target.innerHTML = data
        if (res.OnWorkLabel) {
          item.ScheduleCode = res.ScheduleCode
          item.ScheduleName = res.ScheduleName
          item.CS = []
          for (let i = 0; i < res.OnWorkLabel.length; i++) {
            let obj = {
              Id: res.TimeSlot[i].Id,
              Time: res.OnWorkLabel[i],
              Opt: []
            }
            item.CS.push(obj)
          }
        } else {
          item.ScheduleCode = ''
          item.ScheduleName = '休息'
          item.CS = []
        }
      },
      allowDrop (event) {
        event.preventDefault()
      },
      save () {
        // 保存
        switch (this.AType) {
          case '6404c226-a706-4db4-878a-acbb4a8cc8ab':
            this.strJson = this.fixedClassObj
            this.strJson.CLS = []
            this.multipleSelection.forEach(item => {
              let obj = {
                ScheduleCode: item.ScheduleCode,
                ScheduleName: item.ScheduleName,
                ShortName: item.ShortName
              }
              this.strJson.CLS.push(obj)
            })
            this.strJson.EnableFlex = this.isOpenFlex ? 1 : 0
            this.strJson.EnableLate = this.isOpenLeave ? 1 : 0
            break
          case '0e987247-40d8-4338-812a-155106ade085':
            this.planClassObj.EnableModify = this.isEnableModify ? 1 : 0
            this.strJson = this.planClassObj
            break
          case '8293dd82-514e-422a-a025-bf50714f5537':
            this.strJson = this.freeClassObj
            break
          default:
            this.strJson = {}
        }
        this._addClassConfig()
      },
      utilTimeHHmm (time) {
        if (time) {
          var h = time.getHours()
          h = h < 10 ? ('0' + h) : h
          var m = time.getMinutes()
          m = m < 10 ? ('0' + m) : m
          return `${h}:${m}`
        }
        return `00:00`
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      },
      format (date) {
        date = new Date(date)
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      }
    },
    watch: {
      'parentJson': {
        handler (newVal, oldVal) {
          if (this.parentJson && this.closeWatch) {
            this.closeWatch = false
            this.GroupCode = this.$route.query.groupCode
            this._getClassConfig()
          }
        },
        deep: true
      }
    },
    components: {
      Calendar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .attendance-type-container
    .item-row
      margin-bottom 10px
      .class-selected
        display flex
        .class-item
          display flex
          flex-direction column
          padding 9px 15px
          margin-right 10px
          border 1px solid $color-border
          border-radius 5px
          &:hover
            cursor pointer
            color: #3B8BE3
            border-color: rgb(196, 220, 247)
            background-color: rgb(235, 243, 252)
          span
            display inline-block
      .table-title
        display flex
        border 1px solid $color-border
        border-bottom 0
        border-right 0
        span
          flex 1
          text-align center
          padding 10px
          border-right 1px solid $color-border
          font-weight bold
      .date-table
        border 1px solid $color-border
        border-bottom 0
        border-right 0
        ul
          display flex
          .item
            flex 1
            min-height 30px
            padding 15px
            text-align center
            border-right 1px solid $color-border
            border-bottom 1px solid $color-border
            .time-contant
              margin-bottom 10px
          .item-flex
            display flex
            align-items: center
            justify-content center
    .title
      display block
      margin-top 20px
      margin-bottom 10px
      font-weight bold

  .addCalendar-dialog
    .div-item
      margin-bottom 10px
    .right-container
      padding 10px
      border-radius: 5px;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
</style>
