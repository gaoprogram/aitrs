/**
 * Created by Administrator on 2019/1/7.
 * function : xxxxx
 */
import { REQ_OK } from '@/api/config'
import { getJobLevel, getJobGrade, getJobSerial } from '@/api/common-dic'
export const companyStructureMixin = {
  data () {
    return {
      jobList: []
    }
  },
  methods: {
    // 获取职层
    _getJobLevel (ModuleCode) {
      getJobLevel(ModuleCode).then(res => {
        if (res.data.State === REQ_OK) {
          this.jobList = res.data.Data
        }
      })
    },
    // 获取职级
    _getJobGrade (ModuleCode) {
      getJobGrade(ModuleCode).then(res => {
        if (res.data.State === REQ_OK) {
          this.jobList = res.data.Data
        }
      })
    },
    // 获取职能类
    _getJobSerial (ModuleCode) {
      getJobSerial(ModuleCode).then(res => {
        if (res.data.State === REQ_OK) {
          this.jobList = res.data.Data
        }
      })
    },
    // 切换职层、职级，职能类
    handleChangeJobType () {
      switch (this.StrJson.SelType) {
        case 'JobLevel':
          this._getJobLevel('WorkFlow')
          break
        case 'JobGrade':
          this._getJobGrade('WorkFlow')
          break
        case 'JobSerial':
          this._getJobSerial('WorkFlow')
          break
      }
      this.StrJson.SelValue = []
    },
    // 组织筛选弹窗确认
    handleSaveOrgFilter (orgIds) {
      this.dialogOrgFilter = false
      this.StrJson.OrgId = orgIds.toString()
    }
  }
}
