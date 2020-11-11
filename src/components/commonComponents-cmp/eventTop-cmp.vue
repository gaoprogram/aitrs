<!--
  User: gaol
  Date: 2019/12/31
  功能： 事件执行组件top【人员、组织、职位、职务top相关信息】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.eventHandlerTopBox
    padding 0 20px
    box-sizing  border-box
    .line
      width 100%
      .line-item
        width 48%
        height 28px
        line-height 28px
        .tit
          font-size 14px
          font-weight bold
</style>

<template>
  <div class="eventHandlerTopBox">
    <!-- currentEmpObj: {{currentEmpObj}} -->
    <!-- selectedList: {{selectedList}} -->
    <!--员工组件头部---->
    <div v-if="eventTarget === 'Emp'">
      <div class="empSelectBox">
        <emp-select-cmp
          :tabType="['renyuan']"
          :selectedList="selectedList"
          @upData="upData"
        ></emp-select-cmp>
      </div>

      <div class="line u-f-ajc u-f-jsb u-f-wrap" v-show="selectedList.length">
        <el-divider></el-divider>          
        <div class="line-item u-f0">
          <span class="tit">
            员工号
          </span>

          <span>
            {{currentSelectObj.EmpNo}}
          </span>
        </div>

        <div class="line-item u-f0">
          <span class="tit">
            姓名
          </span>
          <span>
            {{currentSelectObj.EmpName}}
          </span>
        </div>

        <div class="line-item u-f0">
          <span class="tit">
            组织
          </span>
          <span>
            {{currentSelectObj.OrgName}}
          </span>
        </div>

        <div class="line-item u-f0">
          <span class="tit">
            职位
          </span>
          <span>
            {{currentSelectObj.JobName}}
          </span>
        </div>


        <div class="line-item u-f0">
          <span class="tit">
            员工状态
          </span>
          <span>
            {{currentSelectObj.EmpStatusString}}
          </span>
        </div>


        <div class="line-item u-f0">
          <span class="tit">
            员工类型
          </span>
          <span>
            {{currentSelectObj.EmpTypeString}}
          </span>
        </div>
      </div >
    </div>

    <!--组织组件头部---->
    <div v-if="eventTarget === 'Org'">
      <div class="empSelectBox">
        <emp-select-cmp
          :tabType="['zuzhi']"
          :selectedList="selectedList"
          @upData="upData"
        ></emp-select-cmp>
      </div>
            
      <el-divider></el-divider>          
      <div class="line-item u-f0">
        <span class="tit">
          组织名
        </span>

        <span>
          {{currentSelectObj.EmpNo}}
        </span>
      </div>

      <div class="line-item u-f0">
        <span class="tit">
          组织码
        </span>
        <span>
          {{currentSelectObj.EmpName}}
        </span>
      </div>

      <div class="line-item u-f0">
        <span class="tit">
          上级组织
        </span>
        <span>
          {{currentSelectObj.OrgName}}
        </span>
      </div>
    </div>

    <!--职位组件头部---->
    <div v-if="eventTarget === 'Pos'">

      <div class="empSelectBox">
        <emp-select-cmp
          :tabType="['gangwei']"
          :selectedList="selectedList"
          @upData="upData"
        ></emp-select-cmp>
      </div>

      <el-divider></el-divider>          
      <div class="line-item u-f0">
        <span class="tit">
          组织名
        </span>

        <span>
          {{currentSelectObj.EmpNo}}
        </span>
      </div>

      <div class="line-item u-f0">
        <span class="tit">
          组织码
        </span>
        <span>
          {{currentSelectObj.EmpName}}
        </span>
      </div>

      <div class="line-item u-f0">
        <span class="tit">
          上级组织
        </span>
        <span>
          {{currentSelectObj.EmpName}}
        </span>
      </div>

      <div class="line-item u-f0">
        <span class="tit">
          职务
        </span>
        <span>
          {{currentSelectObj.EmpName}}
        </span>
      </div>
    </div>  

    <!--职务组件头部---->
    <div v-if="eventTarget === 'Job'">
      <div class="empSelectBox">
        <emp-select-cmp
          :tabType="['renyuan']"
          :selectedList="selectedList"
          @upData="upData"
        ></emp-select-cmp>
      </div>

      <el-divider></el-divider>          
      <div class="line-item u-f0">
        <span class="tit">
          组织名
        </span>

        <span>
          {{currentSelectObj.EmpNo}}
        </span>
      </div>

      <div class="line-item u-f0">
        <span class="tit">
          组织码
        </span>
        <span>
          {{currentSelectObj.EmpName}}
        </span>
      </div>
    </div>      
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EmpSelectCmp from '@/base/Company-structure-cmp/select-cmp'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      // 员工信息对象
      empInfo: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 事件按钮对象
      eventObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      eventTarget: {
        type: String,
        default: ''
      }
    },
    components: {
      SaveFooter,
      EmpSelectCmp,
    },
    data(){
      return {
        loading: false,
        // selectedData: [], 
        selectedList: [], // 选取的员工
        currentSelectObj: {},
        middleContentLoading: false,  // 中间数据部分的loading状态       
      }
    },
    created(){
      this.selectedList.push(this.empInfo)
    },
    computed: {
      ...mapGetters([
        'currentEmpObj'
      ])
    },
    watch:{

    },
    methods:{
      _getCommTables(){

      },
      upData (val) {
        debugger
        if(val.length > 1){
          this.$message.warning("一次仅能选择一个")
          return 
        }

        if (val.length) {
          let addEmpArr = val.map(item => {
            if(this.eventTarget === 'Emp'){
              // 员工
              return {
                Id: item.EmpId,
                Name: item.EmpName,
                DepartDate: item.DepartDate,
                EmpId: item.EmpId,
                EmpName: item.EmpName,
                EmpNo: item.EmpNo,
                EmpStatus: item.EmpStatus,
                EmpStatusString: item.EmpStatusString,
                EmpType: item.EmpType,
                EmpTypeString: item.EmpTypeString,
                EntryDate: item.EntryDate,
                Gender: item.Gender,
                GenderName: item.GenderName,
                IncumType: item.IncumType,
                JobCode: item.JobCode,
                JobGrade: item.JobGrade,
                JobId: item.JobId,
                JobLevel: item.JobLevel,
                JobName: item.JobName,
                OrgCode: item.OrgCode,
                OrgId: item.OrgId,
                OrgName: item.OrgName,
                PermanentDate: item.PermanentDate,
                PositionCode: item.PositionCode,
                PositionId: item.PositionId,
                PositionName: item.PositionName
              }
            }else if(this.eventTarget === 'Job'){
              // 岗位
              // return {
              //   Id: item.EmpId,
              //   Name: item.Name                 
              // }                
            }else if(this.eventTarget === 'Pos'){
              // 职位
              return {
                Id: item.EmpId,
                Name: item.PositionName,
                OrgId: item.OrgId,
                OrgName: item.OrgName,
                PositionCode: item.PositionCode,
                PositionId: item.PositionId,
                PositionName: item.PositionName                          
              } 
            }else if(this.eventTarget === 'Org'){
              // 组织
              return {
                Id: item.EmpId,
                Name: item.OrgName,
                Children: item.Children,
                Code: item.Code,
                EmpId: item.EmpId,
                EmpName: item.EmpName,
                EmpNo: item.EmpNo,
                JobName: item.JobName,
                Name: item.Name,
                NodeId: item.NodeId,
                NodeType: item.NodeType,
                OrgName: item.OrgName,
                ParentId: item.ParentId,
                PositionName: item.PositionName                                 
              } 
            }
          })

          this.selectedList = this.selectedList.concat(addEmpArr)
          // 去重
          let newArr = []
          if (this.selectedList && this.selectedList.length) {
            this.selectedList.forEach((item,key) => {
              if(item.Id){
                newArr.push(item.Id)
              }else {
                this.selectedList.splice(key,1)
              }
            })
          }

          if (newArr.length && newArr.length >= 2) {
            for (let i = 0; i < newArr.length; i++) {
              if (newArr.indexOf(newArr[i]) !== i) {
                  newArr.splice(i, 1)
                  this.selectedList.splice(i, 1)
                  --i
              }
            }
          }
        } else {
        // this.selectedList = []
        }

        this.currentSelectObj = this.selectedList[0]
        this.$emit('changeEmp', this.selectedList)
      }  
    }
  }
</script>
