<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量删除
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


    <!--引入上传附件组件----start--->
    <!-- <div class="pa-uploadFile">
        <upload-file></upload-file>
    </div> -->
    <!--引入上传附件组件-----end--->

    <div class="footerBox" v-show="selectedList.length">
      <save-footer
        saveText="确定" 
        @save="saveBatchDeleteJob" 
        @cancel="cancelBatchDeleteJob"
      ></save-footer>
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
        EmpSelectListCmp,
        SaveFooter
      },
      props: {

      },
      data(){
        return {
          loading: false, 
          selectedList: []  // 已经选择的人员
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
        saveBatchDeleteJob(){

        },
        cancelBatchDeleteJob(){

        },
      }
    }
</script>
