<!--
  User: gaol
  Date: 2019/5/28
  功能：选择人员   （岗位、组织，人员） 被很多页面调用（出口方向。。。。）
-->

<template>
  <div class="common-select-emp-container">
     <!-- isOutPosition_gongshineilianxiren: {{isOutPosition_gongshineilianxiren}} -->
      <!-- selectedList: {{selectedList}}
      nextStepAccepterEmpArr: {{nextStepAccepterEmpArr}} -->
    <div class="dic-select el-select u-f-jst">

      <span v-if="isTitle">{{title}}：</span>
      <!-- selectedList已选的列表集合：{{selectedList}} -->
      <div class="div-selected u-f0">
        <span class="el-tag el-tag--info el-tag--small"
              v-if="selectedList.length && selectedList[0].Name" 
              v-for="(item, index) in selectedList" 
              :key="item.Id">
          <span class="el-select__tags-text">
            {{ item.Name }}
            <i v-atris-flowRuleScan="{styleBlock:'inline-block'}" 
              class="el-icon-close" 
              @click="delPeopleItem(item,index)"></i>
          </span>
          <!--<i class="el-tag__close el-icon-close" @click="delOrgItem(base-info, item)"></i>-->
        </span>
      </div>
    
      <!---按组织选择/ 按处理员选择器后 点击“+”弹出人员选择器通用组件--->
      <el-button 
        v-atris-flowRuleScan="{styleBlock:'block'}" 
        type="primary"
        size="small"
        @click.native.prevent="setCheckedNode()"
      >
        <i class="el-icon-plus"></i>
      </el-button>
      <!---按组织选择/ 按处理员选择器后 点击“+”弹出人员选择器通用组件--->
    </div>

    <!----员工选择器的--通用组件-start-->
    <company-structure-cmp
      v-if="showCompanyStructureCmp"
      :tabType="tabType"
      :nextStepAccepterEmpArr="nextStepAccepterEmpArr"
      v-on="$listeners"
      @closeStructureCmp="showCompanyStructureCmp = false"
    ></company-structure-cmp>
    <!----员工选择器的--通用组件-end-->   
    
  </div>
</template>

<script type="text/ecmascript-6">
  import CompanyStructureCmp from '@/base/Company-structure-cmp/dialog-common'
  export default {
    props: {
      isTitle: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '选择'
      },
      // 已经选择的人员列表
      selectedList: {
        type: Array,
        default: () => {
          return []
        }
      },
      nextStepAccepterEmpArr: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 例如： tabType：["gangwei","zuzhi","renyuan"]
      tabType: {
        type: Array,
        default: () => {
          return []
        }
      },
      isOutPosition_gongshineilianxiren: {
        type: [Number,String],
        default: ''
      }
    },
    components: {
      CompanyStructureCmp
    },
    data () {
      return {
        showCompanyStructureCmp: false,
        checkedOrgTree: [],
        defaultCheckedKeys: []
      }
    },
    created () {
      // this.$bus.$on('closeStructureCmp', () => {
      //   this.showCompanyStructureCmp = false
      // })
    },
    beforeDestroy () {
      // this.$bus.$off('closeStructureCmp')
    },
    methods: {
      // 删除 人员
      delPeopleItem (obj, idx) {
        debugger
        this.$confirm('是否确认要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          // center: true
        }).then(() => {
          debugger
          this.selectedList.splice(idx, 1)
          // 点击的 确认 后 调接口进行删除操作
          // this.$notify.info({
          //   title: '提示',
          //   message: '点击保存后删除才生效哦！！！',
          //   duration: 0
          // })
          
            if(typeof(this.isOutPosition_gongshineilianxiren) == "string"){
              // 非出口条件里面 公司内联系人 中的组件
              // 触发父组件 out-condition等中的 保存按钮即可以删除此人
              this.$bus.$emit('delPeopleItem')
            }else {
              // 出口条件里面 公司内联系人中的组件 
              this.$emit("deleteEmp_outPosition", this.isOutPosition_gongshineilianxiren)
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 点击 “+” button
      setCheckedNode () {
        console.log(this.nextStepAccepterEmpArr.length)
        debugger
        // 触发父组件中事件响应
        this.$emit('select')
        // 显示出此组件中包含的  人员选择器组件
        this.showCompanyStructureCmp = true
      },

      // 保存
      handleSaveOrg (orgList) {
        debugger
        if (orgList.length) {
          this.selectedList = []
          orgList.forEach(item => {
            this.selectedList.push({
              Id: item.NodeId,
              Name: item.Name
            })
          })
        }
      },
      // 通过 $listeners 监听到的 由  base/company-structure/org-cmp 组件中传过来的  在组织选择器中已选择的数据 然后通过了 $emit 触发上一级的父组件的 upData 事件
      reciveData (val) {
        debugger
        this.$emit('upData')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dic-select
    margin-bottom 10px
    font-size 14px
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .div-selected
      display: inline-block
      line-height: normal
      max-width: 298px
      min-width: 298px
      min-height 28px
      border: 1px solid #d8dce5
      border-radius: 4px
      vertical-align: top
      margin-right: 5px;
</style>
