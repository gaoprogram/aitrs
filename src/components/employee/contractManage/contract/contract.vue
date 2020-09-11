<!--
  User: gaol
  Date: 2019/8/9
  功能：合同管理-合同管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.contract
  padding 0 20px 
  box-sizing border-box
  .tablecontent
    margin-top 10px
</style>

<template>
  <div class="contract" v-loading = "loading">
    <!-- tabsList: {{tabsList}} -->
    <!--tab标签----start--->
    <div class="tabBox">
      <tab-item-cmp 
        @selectContractTabitem = "selectContractTabitem" 
        :tabList="tabsList">
      </tab-item-cmp>
    </div>
    <!----tab标签-end-->


    <!---search部分-----start--->
    <!-- <div class="search-container">
      <el-input placeholder="请输入员工工号查询" 
        v-model="searchValue" 
        debounce clearable 
        class="input-with-select" 
        style="width: 300px">
        <el-button 
          slot="append" 
          type="primary" 
          icon="el-icon-search"
          @click.native="clickSearchBtn"
        >
        </el-button>
      </el-input>
      <el-button-group>
        <el-tooltip class="item" effect="dark" content="筛选" placement="bottom">
          <el-button icon="el-icon-share" @click.native="handlerShowSearchcmp"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="清空" placement="bottom">
          <el-button icon="el-icon-delete" @click.native="handlerReset"></el-button>
        </el-tooltip>
      </el-button-group>
    </div> -->
    <!---search部分-----end--->

    <!----搜索弹框组件------start---->
    <!-- <div class="searchWrap" v-if="showSearchCmp">
      <el-dialog 
        :visible.sync="showSearchCmp"
        width="30%">
        <search-tools 
          :showMoreSearch="showMoreSearchConditions"
          @emitSearchResult="emitSearchResult"  
        >
        </search-tools>
      </el-dialog>
    </div> -->
    <!----搜索弹框组件------end---->


    <!--table数据-----start--->
    <div class="tablecontent">
      <!-- currentTabStrIndex: {{currentTabStrIndex}}
      -----
      currentTabData: {{currentTabData}} -->
      <!---通用的table表格组件---start--->  
      <div class="CommonTableInfo">
        <!-- <common-tableinfo-cmp 
          ref="commonTableInfoCmp" 
          :propTableData="currentTabData"
          @emitGetEmpSuccess = "emitGetEmpSuccess"
          >
        </common-tableinfo-cmp> -->
        <common-tableinfo-cmp 
          ref="commonTableInfoCmp" 
          @emitGetEmpSuccess = "emitGetEmpSuccess"
          >
        </common-tableinfo-cmp>        
      </div>
      <!---通用的table表格组件---end--->                                                                 
    </div>
    <!---table数据---end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import CommonTableinfoCmp from '../contractManage-cmp/Common-tableInfo-cmp'
  import TabItemCmp from '../contractManage-cmp/Tabs-cmp'
  import { 
    REQ_OK,
    PA_PAGECODE_CONTRACTMANAGE
  } from '@/api/config'
  import { 
    getContractType,  // 获取合同的分类信息
    GetTableColumnInfo, // 获取合同的table表格列头信息
  } from '@/api/employee'

  export default {
    props: {
      Pcode: {
        type: String,
        default: PA_PAGECODE_CONTRACTMANAGE
      }
    },
    components: {
      CommonTableinfoCmp,
      TabItemCmp
    },
    data(){
      return {
        loading: false, // 控制loading的状态
        tabsList: [],  //  合同类型的集合
        tableList: [], // table 表格的list数据 
        currentTabData: {},  // 当前的 tab 中的数据
        currentTabStrIndex: 0, // 当前tab 的index
        queryObj: {
          PageSize: 10,
          PageIndex: 1,
          total: 0
        }
      }
    },
    created(){
      // 将当前页码的pageCode存入store中
      this.setContractManagePageCode(this.Pcode)
      // 获取合同类型
      this._getContractType(this.Pcode)
    },
    methods: {
      setContractManagePageCode(){
        this.$store.dispatch('setContractManagePageCode', this.Pcode)        
      },
      // 获取合同类型
      _getContractType(pageCode) {
        getContractType(pageCode).then(res => {
          if(res && res.data.State === REQ_OK){
            this.tabsList = res.data.Data
            this.currentTabData = res.data.Data[0]
          }else {
            this.$message.error(`获取合同类型数据失败,${res.data.Error}`)
          }
        }).catch(() => {
          // this.$message.warning("获取合同类型数据出错了")
        })
      },
      emitGetEmpSuccess(){

      },
      // 切换 tabitem 标签btn 
      selectContractTabitem (index, obj) {
        debugger
        this.currentTabStrIndex = index
        this.currentTabData = obj
      },      
    }
  }
</script>

