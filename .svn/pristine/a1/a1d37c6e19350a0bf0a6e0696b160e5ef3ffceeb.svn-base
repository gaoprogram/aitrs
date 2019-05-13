/**
 * Created by Administrator on 2018/5/21.
 * 考勤接口
 */
import fetch from '@/utils/fetch'

// 字典表 ------------------------------------------------------------------------------

/**
 * 考勤类型
 */
export function getAType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetAType'
    }
  })
}

/**
 * 异常核验类型
 */
export function getValidType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetValidType'
    }
  })
}

/**
 * 日期类型
 */
export function getDateType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetDateType'
    }
  })
}

/**
 * 加班计算方式
 */
export function getCalMethod () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetCalMethod'
    }
  })
}

/**
 * 加班补偿方式
 */
export function getEqualizeMethod () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetEqualizeMethod'
    }
  })
}

/**
 * 申请单位
 */
export function getAUnit () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetAUnit'
    }
  })
}

/**
 * 申请限定条件
 */
export function getLimitOpt () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetLimitOpt'
    }
  })
}

/**
 * 调休过期限定条件
 */
export function getExpireOpt () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetExpireOpt'
    }
  })
}

/**
 * 工时计算方式
 */
export function getWorkTimeEqual () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetWorkTimeEqual'
    }
  })
}

/**
 * 申请天数计算方式
 */
export function getADType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetADType'
    }
  })
}

/**
 * 调休使用优先级
 */
export function getTXPriority () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetTXPriority'
    }
  })
}

/**
 * 请假额度限定条件
 */
export function getLeaveLimitOpt () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetLeaveLimitOpt'
    }
  })
}

/**
 * 新员工请假额度生效条件
 */
export function getLeaveEffectType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetLeaveEffectType'
    }
  })
}

// ------------------------------------------------------------------------------------
/**
 * 增加或更新一个班次设置
 * @param strJson 班次对象的json字符串
 */
export function addScheduleConfig (strJson) {
  return fetch({
    url: '/Wage/CASchedule',
    method: 'post',
    data: {
      Method: 'AddScheduleConfig',
      strJson
    }
  })
}

/**
 * 获取班次设置列表
 * @param listQuery 分页参数
 */
export function getScheduleConfigList (listQuery) {
  return fetch({
    url: '/Wage/CASchedule',
    method: 'post',
    data: {
      Method: 'GetScheduleConfigList',
      ...listQuery
    }
  })
}

/**
 * 获取班次设置详情
 * @param ScheduleCode  班次 ScheduleCode
 */
export function getScheduleConfig (ScheduleCode) {
  return fetch({
    url: '/Wage/CASchedule',
    method: 'post',
    data: {
      Method: 'GetScheduleConfig',
      ScheduleCode
    }
  })
}

/**
 * 更改班次状态
 * @param ScheduleCode 班次ScheduleCode
 * @param State 需要修改的班次状态/0停用 1启用
 */
export function updateScheduleConfigState (ScheduleCode, State) {
  return fetch({
    url: '/Wage/CASchedule',
    method: 'post',
    data: {
      Method: 'UpdateScheduleConfigState',
      ScheduleCode,
      State
    }
  })
}

/**
 * 删除单个班次设置
 * @param ScheduleCode 班次ScheduleCode
 */
export function deleteScheduleConfig (ScheduleCode) {
  return fetch({
    url: '/Wage/CASchedule',
    method: 'post',
    data: {
      Method: 'DeleteScheduleConfig',
      ScheduleCode
    }
  })
}

/**
 * 删除班次时段
 * @param ScheduleCode 班次code
 * @param Id 时段Id
 * @constructor
 */
export function deleteScheduleTimeSlot (ScheduleCode, Id) {
  return fetch({
    url: '/Wage/CASchedule',
    method: 'post',
    data: {
      Method: 'DeleteScheduleTimeSlot',
      ScheduleCode,
      Id
    }
  })
}

/**
 * 获取考勤组列表
 * @param listQuery 分页参数
 */
export function getGroupList (listQuery) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'GetGroupList',
      ...listQuery
    }
  })
}

/**
 * 保存考勤组详情
 * @param strJson 考勤组详情
 */
export function addGroup (strJson) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'AddGroup',
      strJson
    }
  })
}

/**
 * 获取考勤组详情
 * @param GroupCode  考勤组code
 */
export function getGroup (GroupCode) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'GetGroup',
      GroupCode
    }
  })
}

/**
 * 保存考勤组的考勤班制
 * @param GroupCode 考勤组code
 * @param AType 考勤类型
 * @param strJson 班制json
 */
export function addClassConfig (GroupCode, AType, strJson) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'AddClassConfig',
      GroupCode,
      AType,
      strJson
    }
  })
}

/**
 *
 * @param GroupCode
 * @param AType
 */
export function getClassConfig (GroupCode, AType) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'GetClassConfig',
      GroupCode,
      AType
    }
  })
}

/**
 * 新增wifi
 * @param strJson wifiJson
 */
export function addWiFi (strJson) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'AddWiFi',
      strJson
    }
  })
}

/**
 * 保存打卡
 * @param strJson 打卡
 */
export function addGroupLocation (strJson) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'AddGroupLocation',
      strJson
    }
  })
}

/**
 * 保存考勤地点
 * @param strJson 考勤地点
 */
export function addLocation (strJson) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'AddLocation',
      strJson
    }
  })
}

/**
 * 获取考勤地点列表
 * @param LocationCode 地点code为空时，表示查询所有地点
 */
export function getLocation (LocationCode) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'GetLocation',
      LocationCode
    }
  })
}

/**
 * 获取考勤组打卡
 * @param GroupCode 考勤组code
 */
export function getGroupLocation (GroupCode) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'GetGroupLocation',
      GroupCode
    }
  })
}

/**
 * 保存日历主表
 * @param strJson 日历json
 */
export function addSpecialCalendar (strJson) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'AddSpecialCalendar',
      strJson
    }
  })
}

/**
 * 获取日历主表
 */
export function getSpecialCalendar () {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'GetSpecialCalendar'
    }
  })
}

/**
 * 删除日历主表
 * @param code 日历SPCode
 */
export function deleteSpecialCalendar (SPCode) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'DeleteSpecialCalendar',
      SPCode
    }
  })
}

/**
 * 保存特殊日历子表
 * @param SPCode 日历主表
 * @param strJson 日历json
 */
export function addSpecialCalendarDetail (SPCode, strJson) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'AddSpecialCalendarDetail',
      SPCode,
      strJson
    }
  })
}

/**
 * 获取特殊日历子表列表
 * @param SPCode 日历主表code
 * @param IsWorkDay 是否工作日 0否 1是 -1全部，默认-1
 */
export function getSpecialCalendarDetailList (SPCode, IsWorkDay = -1) {
  return fetch({
    url: '/Wage/CAGroup',
    method: 'post',
    data: {
      Method: 'GetSpecialCalendarDetailList',
      SPCode,
      IsWorkDay
    }
  })
}

/**
 * 获取出勤规则列表
 */
export function getARList (listQuery) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetARList',
      ...listQuery
    }
  })
}

/**
 * 停用/启用出勤规则
 * @param ConfigCode 编号
 * @param State 状态码 0停用 1启用
 */
export function changeARState (ConfigCode, State) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'ChangeARState',
      ConfigCode,
      State
    }
  })
}

/**
 * 获取加班规则列表
 * @param ConfigCode 考勤规则配置Code
 */
export function getOverTimeRuleList (ConfigCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetOverTimeRuleList',
      ConfigCode
    }
  })
}

/**
 * 根据RuleCode获取加班规则
 * @param RuleCode  加班规则RuleCode
 */
export function getOverTimeRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetOverTimeRule',
      RuleCode
    }
  })
}

/**
 * 保存加班规则
 * @param strJson 加班规则Json
 */
export function addOverTimeRule (ConfigCode, strJson) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'AddOverTimeRule',
      ConfigCode,
      strJson
    }
  })
}

/**
 * 删除加班规则
 * @param RuleCode 加班规则Code
 */
export function deleteOverTimeRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'DeleteOverTimeRule',
      RuleCode
    }
  })
}

/**
 * 获取调休规则列表
 * @param ConfigCode 考勤规则配置Code
 */
export function getDaysOffRuleList (ConfigCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetDaysOffRuleList',
      ConfigCode
    }
  })
}

/**
 * 根据RuleCode获取调休规则
 * @param RuleCode  调休规则RuleCode
 */
export function getDaysOffRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetDaysOffRule',
      RuleCode
    }
  })
}

/**
 * 保存调休规则
 * @param strJson 调休规则Json
 */
export function addDaysOffRule (ConfigCode, strJson) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'AddDaysOffRule',
      ConfigCode,
      strJson
    }
  })
}

/**
 * 删除调休规则
 * @param RuleCode 调休规则Code
 */
export function deleteDaysOffRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'DeleteDaysOffRule',
      RuleCode
    }
  })
}

/**
 * 获取出差规则列表
 * @param ConfigCode 出差规则配置Code
 */
export function getBusinessTripRuleList (ConfigCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetBusinessTripRuleList',
      ConfigCode
    }
  })
}

/**
 * 根据RuleCode获取出差规则
 * @param RuleCode  出差规则RuleCode
 */
export function getBusinessTripRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetBusinessTripRule',
      RuleCode
    }
  })
}

/**
 * 保存出差规则
 * @param strJson 出差规则Json
 */
export function addBusinessTripRule (ConfigCode, strJson) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'AddBusinessTripRule',
      ConfigCode,
      strJson
    }
  })
}

/**
 * 删除出差规则
 * @param RuleCode 出差规则Code
 */
export function deleteBusinessTripRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'DeleteBusinessTripRule',
      RuleCode
    }
  })
}

/**
 * 获取公出规则列表
 * @param ConfigCode 公出规则配置Code
 */
export function getPublicTripRuleList (ConfigCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetPublicTripRuleList',
      ConfigCode
    }
  })
}

/**
 * 根据RuleCode获取公出规则
 * @param RuleCode  公出规则RuleCode
 */
export function getPublicTripRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetPublicTripRule',
      RuleCode
    }
  })
}

/**
 * 保存公出规则
 * @param strJson 公出规则Json
 */
export function addPublicTripRule (ConfigCode, strJson) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'AddPublicTripRule',
      ConfigCode,
      strJson
    }
  })
}

/**
 * 删除公出规则
 * @param RuleCode 公出规则Code
 */
export function deletePublicTripRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'DeletePublicTripRule',
      RuleCode
    }
  })
}

/**
 * 获取补签规则列表
 * @param ConfigCode 补签规则配置Code
 */
export function getSupplementRuleList (ConfigCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetSupplementRuleList',
      ConfigCode
    }
  })
}

/**
 * 根据RuleCode获取补签规则
 * @param RuleCode  补签规则RuleCode
 */
export function getSupplementRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetSupplementRule',
      RuleCode
    }
  })
}

/**
 * 保存补签规则
 * @param strJson 补签规则Json
 */
export function addSupplementRule (ConfigCode, strJson) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'AddSupplementRule',
      ConfigCode,
      strJson
    }
  })
}

/**
 * 删除补签规则
 * @param RuleCode 补签规则Code
 */
export function deleteSupplementRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'DeleteSupplementRule',
      RuleCode
    }
  })
}

/**
 * 获取申诉规则列表
 * @param ConfigCode 申诉规则配置Code
 */
export function getAppealRuleList (ConfigCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetAppealRuleList',
      ConfigCode
    }
  })
}

/**
 * 根据RuleCode获取申诉规则
 * @param RuleCode  申诉规则RuleCode
 */
export function getAppealRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetAppealRule',
      RuleCode
    }
  })
}

/**
 * 保存申诉规则
 * @param strJson 申诉规则Json
 */
export function addAppealRule (ConfigCode, strJson) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'AddAppealRule',
      ConfigCode,
      strJson
    }
  })
}

/**
 * 删除申诉规则
 * @param RuleCode 申诉规则Code
 */
export function deleteAppealRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'DeleteAppealRule',
      RuleCode
    }
  })
}

/**
 * 获取请假规则列表
 * @param ConfigCode 申诉规则配置Code
 */
export function getLeaveRuleList (ConfigCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetLeaveRuleList',
      ConfigCode
    }
  })
}

/**
 * 根据RuleCode获取请假规则
 * @param RuleCode  请假规则RuleCode
 */
export function getLeaveRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'GetLeaveRule',
      RuleCode
    }
  })
}

/**
 * 保存请假规则
 * @param strJson 请假规则Json
 */
export function addLeaveRule (ConfigCode, strJson) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'AddLeaveRule',
      ConfigCode,
      strJson
    }
  })
}

/**
 * 删除请假规则
 * @param RuleCode 请假规则Code
 */
export function deleteLeaveRule (RuleCode) {
  return fetch({
    url: '/Wage/CARule',
    method: 'post',
    data: {
      Method: 'DeleteLeaveRule',
      RuleCode
    }
  })
}
