<!--
  User: xxxxxxx
  Date: 2018/5/2
  功能：详情
-->

<template>
  <div class="rule-table-list-container mg-30">
    <el-dialog :title="title"
               :visible="true"
               :show-close="false"
               :modal="false"
               center
               fullscreen
               :modal-append-to-body="false"
               style="min-width: 1000px"
    >
      <div class="header-container">
        <el-button @click="handlerCopyRule()" class="left-btn">
          复制规则
        </el-button>

        <el-button @click="handlerAddRule()" class="left-btn" type="primary">
          新增规则
        </el-button>
      </div>
      <div class="content">
        <el-table :data="list" border style="width: 100%;">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            align="center"
            prop="RuleName"
            label="规则名称"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="GroupLabel"
            label="适用考勤组"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="UnitLabel"
            label="申请单位"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="MinLabel"
            label="最小单位"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="WorkTimeLabel"
            label="工时计算"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="LimitLabel"
            label="是否限定额度"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="AllowOverflow"
            label="可超出额度申请"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="DaysLabel"
            label="申请天数"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="Modifier"
            label="修改人"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="SchemeName"
            label="上次修改时间"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.Modified | replaceTime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row)"
              >
                编辑
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="cancel">取 消</el-button>-->
        <!--<el-button type="primary" @click="save">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getBusinessTripRuleList, deleteBusinessTripRule } from '@/api/attendance'
  import { Message, MessageBox } from 'element-ui'
  import { REQ_OK } from '@/api/config'
  export default {
    data () {
      return {
        title: '出差规则列表',
        activeName: 'first',
        list: []
      }
    },
    created () {
      this._getBusinessTripRuleList()
    },
    methods: {
      _getBusinessTripRuleList () {
        getBusinessTripRuleList(this.$route.query.configCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
          } else {
            Message.error('出差规则列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('出差规则列表获取失败，请重试！')
        })
      },
      async _deleteBusinessTripRule (RuleCode) {
        await deleteBusinessTripRule(RuleCode).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('删除成功！')
            this._getBusinessTripRuleList()
          } else {
            Message.error('删除失败，请重试！')
          }
        }).catch(() => {
          Message.error('删除失败，请重试！')
        })
      },
      handleEdit (item) {
        // 编辑
        this.$router.push({
          path: '/attendance/baseConfig/attendanceRule/businessRule/editBusinessRule',
          query: {
            configCode: this.$route.query.configCode,
            ruleCode: item.RuleCode
          }
        })
      },
      handleDelete (item) {
        // 删除
        MessageBox.confirm('是否删除此条出差规则?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._deleteBusinessTripRule(item.RuleCode)
        })
      },
      handlerAddRule () {
        // 新增规则
        this.$router.push({
          path: '/attendance/baseConfig/attendanceRule/businessRule/addBusinessRule',
          query: {
            configCode: this.$route.query.configCode
          }
        })
      },
      handlerCopyRule () {
        // 复制规则
      },
      cancel () {
        // 取消
      },
      save () {
        // 保存
      }
    },
    components: {
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        if (to.path === '/attendance/baseConfig/attendanceRule/businessRule') {
          this._getBusinessTripRuleList()
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .rule-table-list-container
    .header-container
      margin-bottom 10px
      &::after
        clear-float()
      button
        float right
        margin-left 10px
</style>
