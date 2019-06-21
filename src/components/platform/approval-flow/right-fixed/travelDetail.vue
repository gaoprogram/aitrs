<!--
  User: xxxxxxx
  Date: 2019/6/21
  功能：流程轨迹弹框
-->

<template>
  <div class="travelDetail-component-container" v-loading="loading">
     这是轨迹弹框： travelData：{{travelData}}
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'  
  import {getTrackForm} from '@/api/approve'
  export default {  
    props: {
      // 当前 进度item 的对象
      currentTraveObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 由 table表格中 点击查看后 获取的查看的当前流程的 大对象
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        loading: false,
        travelData: {}   // 获取的轨迹的数据对象
      }
    },
    components: {
    },      
    created () {

    },
    mounted() {
      // 获取轨迹表数据
      this.$nextTick(()=>{
        this._getTrackForm()
      })      
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题

    },    
    methods: {
      // 查看轨迹
      _getTrackForm () {
        debugger
        this.loading = true
        getTrackForm(this.form.Flow.WorkId, this.currentTraveObj.NodeId, this.form.Flow.FK_Flow).then(res => {
          this.loading = false
          if (res && res.data.State === REQ_OK) {
            debugger
            
            this.travelData = res.data.Data
          } else {
            this.$message({
              type: "error",
              message: "轨迹数据获取失败err,请重试"
            })
          }
        }).catch(() => {
          this.$message({
            type: "error",
            message: "轨迹数据获取失败err,请重试"
          })
        })
      },  
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
