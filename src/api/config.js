/**
 * Created by Administrator on 2018/5/21.
 * 常量配置
 */
// ModuleCode 模块代码 (员工管理: PA; 组织管理: OM; 工资管理: Wage; 考勤管理: CA; 工作流: WorkFlow)

// 第一次请求获取 1代表成功，0代表失败
export const ERR_OK = 0

// 请求接口失败
export const REQ_ERR = 0

// 请求接口成功
export const REQ_OK = 1

// 用户不存在
export const NO_USER = -2

// 用户被限制登录
export const LIMIT_LOGIN = -3

// 密码错误
export const ERR_PWD = -4

// 多设备登录
export const DOUBLE_DEVICE = -5

// 用户未激活
export const NO_ACTIVE = -6

// 用户已停用
export const STOP_USER = -7

// 上传文件数量
export const UPLOAD_NUM = 5

// ip
export const BASE_URL = process.env.BASE_API

// 上传接口
export const UPLOAD_URL = process.env.BASE_POST_API

// 附件
export const FILE_URL = process.env.BASE_FILE_API

// 游客
export const GUEST = 0
// 员工
export const EMPLOYEE = 1
// 管理员
export const COMPANY_ADMIN = 2
// 系统管理员
export const SYS_ADMIN = 3

// export const DEV_URL = 'http://192.168.1.104'
export const DEV_URL = 'http://192.168.1.106:802'

export const PROD_URL = 'https://www.caihuiyun.cn'

// pa在职员工 页面 pageCode
// export const PA_PAGECODE_JOINEDEMPLOYEE = 'PG_PA_EEOnjob'
export const PA_PAGECODE_JOINEDEMPLOYEE = 'P3'
// pa待入职 员工页面 pageCode
export const PA_PAGECODE_WAITEDEMPLOYEE = 'PG_PA_EEWaitEntry'
// pa离职员工 页面 pageCode
export const PA_PAGECODE_LEAVEDEMPLOYEE = 'PG_PA_EEDimission'

// pa合同管理页面 pageCode
export const PA_PAGECODE_CONTRACTMANAGE = 'PG_PA_ContractMgt'

// pa 中 批量操作的 模板pageCode
// 批量入职
export const templatePCode_batchJoin= 'PAIO_NewEmp'

//批量修改
export const templagePCode_batchEdit = 'PAIO_EditEmp'

// 批量导出
export const templagePCode_batchExport = 'PAIO_ExportEmp'


export const page1 = 'page1'
export const page2 = 'page2'
export const page3 = 'page3'

export const PG_PA_EEOnjob = 'PG_PA_EEOnjob'
export const PG_PA_ContractMgt = 'PG_PA_ContractMgt'
export const PG_PA_ContractRemind = 'PG_PA_ContractRemind'
export const PG_PA_BasicSet = 'PG_PA_BasicSet'



