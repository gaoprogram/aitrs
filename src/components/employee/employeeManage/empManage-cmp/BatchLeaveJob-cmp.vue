<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量离职
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.batchJoinJob-cmp
  padding 20px !important 
  box-sizing border-box
   
</style>
<template>
  <div class="batchJoinJob-cmp">
    <!---引入选择员工组件---start-->
    <div class="selectEmpBox">
        <emp-select-list-cmp
            :tabType="['renyuan']"  
            :selectedList="selectedList"        
            @upData="upData"
        ></emp-select-list-cmp>
    </div>
    <!---引入选择员工组件----end-->    

    <!-- <div class="selectBox marginB5" style="border-top: 1px solid silver;padding-top: 10px">
      <span style="color:red">事件类型</span>
      <el-select>
        <el-option></el-option>
      </el-select>
    </div> -->

    <div :class="['tableBox',tableData.length<=0?'not_found':'']">
      <el-table
        :data="tableData"
        width="100%"
        size="mini"
        max-height="300"
        empty-text=" "
      >
        <el-table-column
          label="员工号"
          sortable
          prop="userNo"
        ></el-table-column>

        <el-table-column
          label="员工姓名"
          prop="userName"
        ></el-table-column>

        <el-table-column
          label="组织"
          sortable
          prop="userOrg"
        ></el-table-column>

        <el-table-column
          label="员工职位"
          prop="userPosition"
        ></el-table-column>       

        <el-table-column
          label="员工状态"
          prop="userPosition"
        ></el-table-column>       

        <el-table-column
          label="员工类型"
          prop="userPosition"
        ></el-table-column>   

        <el-table-column
          label="事件原因"
          prop="userPosition"
        ></el-table-column>     

        <el-table-column
          label="离职日期"
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="离职申请日"
          prop="userPosition"
        ></el-table-column>      

        <el-table-column
          label="离职原因"
          prop="userPosition"
        ></el-table-column>      

        <el-table-column
          label="离职子原因"
          prop="userPosition"
        ></el-table-column>       

        <el-table-column
          label="离职说明"
          prop="userPosition"
        ></el-table-column>       

        <el-table-column
          label="合同解除日"
          prop="userPosition"
        ></el-table-column>      

        <el-table-column
          label="社保停缴月份"
          prop="userPosition"
        ></el-table-column>  

        <el-table-column
          label="工资结算日"
          prop="userPosition"
        ></el-table-column> 

        <el-table-column
          label="奖金结算日"
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="离职补偿金(元)"
          prop="userPosition"
        ></el-table-column>                
                                                                                                                                                                                          
      </el-table>
    </div>

    <div class="footerBox">
      <save-footer @save="saveBatchLeaveJob" @cancel="cancelBatchLeaveJob"></save-footer>
    </div>    
  </div>
</template>

<script type="text/ecmascript-6">
    // import UploadFile from '@/base/PA-common-cmp/pa-Upload/uploadFile' 
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import EmpSelectListCmp from '@/base/PA-common-cmp/commonEmp-select-cmp/select-cmp'
    export default {
      components: {
          // UploadFile,
        EmpSelectListCmp,
        SaveFooter
      },
      props: {
        // tableData: {
        //   type: Array,
        //   default: () => {
        //     return []
        //   }
        // }
      },
      data(){
        return {
          loading: false, 
          selectedList: [], // 已经选择的人员
          userNo: '1002',
          userName: 'zhangsan',
          userPosition: 'zhiwu',
          userOrg: 'zuzhi',
          tableData: [
            {
              userNo: 12,
              userOrg: 'zu',
              userName: 'zhangsan',
              userPosition: '员工职位'
            }
          ]
        }
      },
      created() {
          debugger
      },
      methods: {
        upData (val) {
            debugger
            if (val.length) {
            let addEmpArr = val.map(item => {
                return {
                Id: item.EmpId,
                Name: item.EmpName
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
            this.$emit('changeEmp', this.prop)
        },
        saveBatchLeaveJob(){

        },
        cancelBatchLeaveJob(){
          
        }
      }
    }
</script>
