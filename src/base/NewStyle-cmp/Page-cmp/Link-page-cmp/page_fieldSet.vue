<!--
  User: gaol
  Date: 2020/7/31
  功能：字段设置页面 page_fieldSet
-->
<style lang="stylus" rel="stylesheet/stylus">
.linkpage-cmp-wrap {
    min-height: 300px;
    padding: 20px;
    box-sizing: border-box;
}
</style>
<template>
    <div class="linkpage-cmp-wrap page" v-loading="pageLoading">
        <el-row>
            <el-col :span="24">
              <!-- <el-button 
                  type="primary"
                  size="mini"
                  style="float:right"
                  icon="el-icon-close"
                  @click.native="closeWindow"
              ></el-button>    -->
              <div class="clearfix">
                <i 
                  style="float:right"
                  class="el-icon-close"
                  @click="closeWindow"              
                >
                </i>  
              </div>           
              <base-com-cmp-section-cmp
                  :comData="pageSetData"
              ></base-com-cmp-section-cmp>            
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
import { REQ_OK } from "@/api/config";
import BaseComCmpSectionCmp from '@/base/NewStyle-cmp/Content-section-cmp/Base-comCmp-section-cmp.vue'
import { 
    PreHire
} from "@/api/newStyleConfig";
import BasePageCmp from "@/base/NewStyle-cmp/Page-cmp/Base-page";
export default {
  name: "pageP1",
  components: {
    BasePageCmp,
    BaseComCmpSectionCmp
  },
  props: {

  },
  computed: {},
  data() {
    return {
      pageLoading: false,
      pageCode: PreHire,
      pageSetData: {
        CombineType: '',
        MetaCode:''
      }
    }
  },
  created() {
    console.log("--------------------",this.$router)
    // window.alert("MetaCode",this.$router.history.current.query.MetaCode)
    // window.alert("CombineType",this.$router.history.current.query.CombineType)
    this.pageSetData.CombineType = this.$router.history.current.query.CombineType
    this.pageSetData.MetaCode = this.$router.history.current.query.MetaCode
  },
  beforeDestroy() {},
  methods: {
    closeWindow(){
        window.close()
    }
  },
  watch: {}
};
</script>

