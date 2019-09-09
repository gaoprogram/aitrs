<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：提交提交之后的 下一步操作人选择组件
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <!-- flow:{{flow}} -->
    <company-structure-cmp
      title="选择人员"
      :tabType="['renyuan']"
      :selectedList="empList"
      :nextStepAccepterEmpArr="nextStepAccepterEmpArr"
      @upData="updata"
    ></company-structure-cmp>
    <el-input v-model="flowmessage" placeholder="请输入下一步移交意见" type="textarea"></el-input>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_addNextStepAccepters()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { mapGetters } from 'vuex'
  import {
    addNextStepAccepters
  } from '@/api/approve'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'

  export default {
    components: {
      CompanyStructureCmp
    }, 
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      flow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      isNotMust: {
        type: Boolean,
        default: false
      },
      nextStepAccepterEmpArr: {
        type: Array,
        default: () => {
          return []
        }
      }
      // flowEditorContentValue: {
      //   type: String,
      //   default: ''
      // }
    },
    computed: {
      ...mapGetters([
        'flowEditorContentValue'
      ])
    },
    watch: {
      flowEditorContentValue :{
        handler: function (newValue, oldValue){
          this.handleContent(newValue)
        },
        immediate: true
      }
    },
    data () {
      return {
        loading: false,
        empList: [],
        empId: 0,
        flowmessage: '',  // 填写的下一步移交内容
        accepters: {}
      } 
    },
    created () {

    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
      // this.$bus.$off('saveEmp')
    },    
    methods: {
      // 选择更新
      updata (val) {
        debugger
        // if (val.length > 1) return this.$message.info('下一步操作人员只能选择一个')
        // if (val.length) {
        //   this.empList = [{
        //     Id: val[0].EmpId,
        //     Name: val[0].EmpName
        //   }]
        //   this.empId = val[0].EmpId
        // }
        if( !this.isNotMust ){
          if(!val.length) return this.$message.info('请选择下一步操作人')
        }

        let newObj = {
          DeliveryWayType: "",
          DeliveryWayTypeText: "",
          DeliveryWay: "",
          DeliveryWayText: "",
          OrgValue: [],
          PositionValue: [],
          EmpValue: []             
        }           
        if(val.length){  
          if( this.nextStepAccepterEmpArr && this.nextStepAccepterEmpArr.length ){
            // 下一步操作人 有设置
            let newEmpList= val.map((item,key) => {
              return {
                Id: item.Id,
                Name: item.EmpName
              }
            })
            this.empList = this.empList.concat(newEmpList)            
          }else {
            let newEmpList= val.map((item,key) => {
              return {
                Id: item.Id,
                Name: item.EmpName
              }
            })
            this.empList = this.empList.concat(newEmpList)
          }     
        }
        debugger
        // 去重
        let newArr = []
        if (this.empList && this.empList.length) {
          this.empList.forEach(item => {
            newArr.push(item.Id)
          })
        }

        if (newArr.length && newArr.length >= 2) {
          for (let i = 0; i < newArr.length; i++) {
            if (newArr.indexOf(newArr[i]) !== i) {
              newArr.splice(i, 1)
              this.empList.splice(i, 1)
              --i
            }
          }
        }

        // 将去重后的员工 复制给 newObj.EmpValue 
        newObj.EmpValue = this.empList
        console.log("选择的下一步操作人", newObj)
        
        this.accepters = newObj
      },
      // 下一步提交人提交
      _addNextStepAccepters (val) {
        if( !this.isNotMust ){
          if (!this.empList.length) return this.$message.info('选择下一步操作人后方可提交')
        }
        // if (!this.flowmessage) return this.$message.info('请填写移交信息')
        this.loading = true
        addNextStepAccepters(this.flow.FK_Flow, this.flow.WorkId, this.flow.FK_Node, this.flowmessage, JSON.stringify(this.accepters)).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            console.log("下一步提交人成功：----", res.data.Data)
            this.$message({
              type: 'success',
              message: `${res.data.Data[0]};${res.data.Data[1]};${res.data.Data[2]};${res.data.Data[3]}`
            })
            // 触发table左侧table列表数据更新
            this.$emit('success')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('提交失败，请重试！')
        })
      },
      handleCancel () {
        this.$message.info("提交已取消")
        this.$emit('DialogCancel')
      },
      // 将富文本内容 获取其中的字符串
      handleContent (html) {
        let re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        let msg = html.replace(re1,'');//执行替换成空字符
        this.flowmessage = msg
      }      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-component-container
    .footer
      display block
      margin-top 20px
      text-align center
</style>
