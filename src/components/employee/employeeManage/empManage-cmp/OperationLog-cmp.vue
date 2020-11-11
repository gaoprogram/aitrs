<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工详情页面中的  操作记录 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-loading-mask
    top -10px !important
.operationLog-cmp
    height 400px
    padding-top 10px
    overflow auto
    .logContanerBox
        .searchInputWrap 
            margin-bottom 10px
   
</style>
<template>
  <div class="operationLog-cmp animated fadeInLeft">
    <!-- <h1>操作记录</h1> -->
    <!-- <el-divider></el-divider> -->
    <!-- currentOperationLog： {{currentOperationLog}} -->
    <div class="logContanerBox" v-loading = 'loading'>
        <!---搜索框---start-->
        <!-- <div class="searchInputWrap">
            <el-input 
                :placeholder="placeholderTit"
                v-model="searchInputText"
                clearabl
            >
            </el-input>
        </div> -->
        <!---搜索框---end-->
        <!--timeline---start-->
        <el-timeline>
            <el-timeline-item
                v-for="(log, index) in currentOperationLog"
                :key="index"
                :size="log.size"
                :type="log.type"
                :icon="log.icon"
                :timestamp="log.CreateDate">
                {{log.TrackContent}}
            </el-timeline-item>
        </el-timeline>        
        <!--timeline---end--->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import {
        GetEmpTrackList
    } from '@/api/employee'
    import { mapGetters } from 'vuex'
  export default {
    props: {

    },
    data(){
        return {
            loading: false, 
            searchInputText: '', // 搜索关键字
            placeholderTit: "生效日期,分组,字段搜索",
            currentOperationLog: [],  // 操作记录
            activities: [
                {
                    content: '修改员工号由101 改为 102',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, 
                {
                    content: '修改入职日期 由2018-08-08 改为 2019-07-07',
                    timestamp: '2018-05-03 20:46',
                    color: '#0bbd87'
                }, 
                {
                    content: '修改手机号码',
                    timestamp: '2018-06-03 20:46',
                    size: 'large'
                },
                {
                    content: '修改个人邮箱',
                    timestamp: '2018-07-03 20:46'
                }
            ]            
        }
    },
    computed: {
        ...mapGetters([
            'currentEmpObj'
        ])
    },    
    created() {
        debugger
        this._getCommTables()
    },
    methods: {
        _getCommTables(){
            this._GetEmpTrackList()
        },
        _changeData(data){
            if(data && data.length){
                data.forEach((item, key, arr) =>{
                    if(item.CreateDate){
                        let newTime = item.CreateDate.replace("/Date(","").replace(")/","")*1
                        item.CreateDate = new Date(newTime).toLocaleString()
                    }
                    if(key == 0){
                        item.type = 'primary'
                        item.color = '#0bbd87'
                        item.icon = 'el-icon-more'
                        console.log("--------",item)
                    }
                })
            }
        },
        _GetEmpTrackList(){
            this.loading = true
            GetEmpTrackList(this.currentEmpObj.EmpId).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.currentOperationLog = res.data.Data
                    // 转化下时间
                    this._changeData(this.currentOperationLog)
                }else {
                    this.$message.error(`获取操作记录数据失败,${res.data.Error}`)
                }
            })
        }
    }
  }
</script>
