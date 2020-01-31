<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量调转 组件
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
        max-height="500"
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
          label="生效日期"
          prop="userPosition"
        ></el-table-column>       

        <el-table-column
          label="事件原因"
          prop="userPosition"
        ></el-table-column>         

        <el-table-column
          label="组织前"
          sortable
          prop="userPosition"
        ></el-table-column>         

        <el-table-column
          label="组织后"
          sortable
          prop="userPosition"
        ></el-table-column>   

        <el-table-column
          label="职位前"
          sortable
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="职位后"
          sortable
          prop="userPosition"
        ></el-table-column>          

        <el-table-column
          label="成本中心前"
          prop="userPosition"
        ></el-table-column>      

        <el-table-column
          label="成本中心后"
          prop="userPosition"
        ></el-table-column>      

        <el-table-column
          label="人事区域前"
          prop="userPosition"
        ></el-table-column>      

        <el-table-column
          label="人事区域后"
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="人事子区域前"
          prop="userPosition"
        ></el-table-column>          

        <el-table-column
          label="人事子区域后"
          prop="userPosition"
        ></el-table-column>     

        <el-table-column
          label="工作地点前"
          prop="userPosition"
        ></el-table-column>   

        <el-table-column
          label="工作地点后"
          prop="userPosition"
        ></el-table-column>  

        <el-table-column
          label="工作省份前"
          prop="userPosition"
        ></el-table-column> 

        <el-table-column
          label="工作省份后"
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="工作城市前"
          prop="userPosition"
        ></el-table-column>   

        <el-table-column
          label="工作城市后"
          prop="userPosition"
        ></el-table-column>        

        <el-table-column
          label="职务前"
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="职务后"
          prop="userPosition"
        ></el-table-column>        

        <el-table-column
          label="职级前"
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="职级后"
          prop="userPosition"
        ></el-table-column>     

        <el-table-column
          label="汇报对象前"
          prop="userPosition"
        ></el-table-column>

        <el-table-column
          label="汇报对象后"
          prop="userPosition"
        ></el-table-column>     

        <el-table-column
          label="岗前相关经验(年)"
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="公时制度前"
          prop="userPosition"
        ></el-table-column>  

        <el-table-column
          label="公时制度后"
          prop="userPosition"
        ></el-table-column>    

        <el-table-column
          label="考勤规则前"
          prop="userPosition"
        ></el-table-column>   

        <el-table-column
          label="考勤规则后"
          prop="userPosition"
        ></el-table-column>                                                                                                                                                                                              

      </el-table>
    </div>

    <div class="footerBox">
      <save-footer @save="saveBatchTurn" @cancel="cancelBatchTurn"></save-footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  // import UploadFile from '@/base/PA-common-cmp/pa-Upload/uploadFile' 
  import EmpSelectListCmp from '@/base/PA-common-cmp/commonEmp-select-cmp/select-cmp'
  export default {
    components: {
      // UploadFile,
      SaveFooter,
      EmpSelectListCmp
    },
    props: {

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
      saveBatchTurn(){

      },
      cancelBatchTurn(){
        
      }
    }
  }
</script>
