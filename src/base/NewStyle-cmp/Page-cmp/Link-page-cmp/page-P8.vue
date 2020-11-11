<!--
  User: gaol
  Date: 2020/7/31
  功能：链接页面 
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
                <base-page-cmp :pageCode="pageCode"></base-page-cmp>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
import { REQ_OK } from "@/api/config";
import { 
    AddPFileLocat2
} from "@/api/newStyleConfig";
import BasePageCmp from "@/base/NewStyle-cmp/Page-cmp/Base-page";

export default {
  name: "pageP8",
  components: {
    BasePageCmp
  },
  props: {},
  computed: {},
  data() {
    return {
      pageLoading: false,
      pageCode: AddPFileLocat2
    }
  },
  created() {},
  beforeDestroy() {},
  methods: {},
  watch: {}
};
</script>

