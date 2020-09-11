<!--
  User: gaol
  Date: 2019/8/9
  功能：事件处理器 - 执行事件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.executeEvent-scan
    .headerBox
        display flex
        justyify-content flex-start
        align-items center
        flex-wrap wrap
        .item
            padding 5px 
            box-sizing border-box
            margin-right 20px
            .tit
                font-weight bold
                font-size 14px
            .titValue
                color #000000
    .tableBox
        .topBox
            padding 5px
            box-sizing border-box
</style>

<template>
  <div class="executeEvent-scan" v-loading="loading">
    <!--头部区域---start-->
    <div class="headerBox">
        <!-- <span class="item">
            <el-button type="text" class="tit">对象码:</el-button>
            <el-button type="text" class="titValue">ABCD-123456-78</el-button>
        </span>

        <span class="item">
            <el-button type="text" class="tit">对象名称:</el-button>
            <el-button type="text" class="titValue">xxxxxxx</el-button>
        </span>

        <span class="item">
            <el-button type="text" class="tit">事件名称:</el-button>
            <el-button type="text" class="titValue">入职</el-button>
        </span>

        <span class="item">
            <el-button type="text" class="tit">事件原因:</el-button>
            <el-button type="text" class="titValue">填补岗位空缺</el-button>
        </span> -->
        <event-scan-search-cmp
          :obj="obj"
        ></event-scan-search-cmp>        
    </div>
    <!--头部区域---end-->

    <!--table表格区域---start-->
    <div class="tableBox">
        <div class="topBox clearfix">
            <el-button 
                :disabled="!multipleSelection.length"
                type="primary" 
                size="mini" 
                style="float:right" 
                @click.native="batchDelete">
                批量删除
            </el-button>
            <el-button type="primary" size="mini" style="float:right;margin-right:10px" @click.native="joinDetail">详情</el-button>            
        </div>
       
        <el-table
            :class="eventTableList.length<=0? 'not_found': ''"
            :data="eventTableList"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
        >

            <el-table-column
            width="50px"
            type="selection"
            >
            </el-table-column>

            <el-table-column
            label="页面/组件"
            prop="eventCode"
            show-overflow-tooltip
            width="200px"
            >
            </el-table-column>

            <el-table-column
            label="显示组"
            prop="targetName"
            show-overflow-tooltip
            width="200px"
            >
            </el-table-column>

            <el-table-column
            label="最新操作人"
            prop="eventName"
            show-overflow-tooltip
            width="200px"
            >
            </el-table-column>

            <el-table-column
            label="操作时间"
            prop="handlerTime"
            show-overflow-tooltip
            width="200px"
            >
            </el-table-column>      

            <el-table-column
            label="操作"
            prop=""
            >
            <template slot-scope="scope">
                <el-button type="text" @click.native="handleScan(scope.row)">查看</el-button>
                <el-button type="text" @click.native="handleEdit(scope.row)">编辑</el-button>
                <el-button type="text" @click.native="handleDelete(scope.row)">删除</el-button>
            </template>
            </el-table-column>

        </el-table> 
        <!--table表格区域-----end-->
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import eventScanSearchCmp from './eventScanSearchTool-cmp'
  export default {
    props: {
      obj: {
        type: Object,
        default: ()=> {
          return {}
        }
      }
    },
    components: {
      eventScanSearchCmp
    },
    data(){
      return {
        loading: false, 
        // table表格数据集合 
        multipleSelection:[], //  多选
        eventTableList:[
          {
            eventCode: '组件一',  // 对象码
            targetName: '对象名称一',
            eventName: '张三',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          },
          {
            eventCode: '组件一',  // 对象码
            targetName: '对象名称一',
            eventName: '李四',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          },
          {
            eventCode: '组件二',  // 对象码
            targetName: '对象名称一',
            eventName: '王五',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          },
          {
            eventCode: '组件三',  // 对象码
            targetName: '对象名称一',
            eventName: '姚明',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          },
          {
            eventCode: '组件四',  // 对象码
            targetName: '对象名称一',
            eventName: '科比',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          }                                        
        ],
      }
    },
    methods: {
      // 全选/取消全选/多选
      handleSelectionChange(val){
          debugger
          this.multipleSelection = val
      },
      // 查看
      handleScan(){

      },
      // 编辑
      handleEdit(){

      },
      // 删除
      handleDelete(){
        this.$confirm("是否确定要删除已选中的数据内容?","提示",{
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            // 确定要删除

        }).catch(() => {
            // 取消删除
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
        })
      },
      // 批量删除
      batchDelete() {
        this.$confirm("是否确定要删除已选中的数据内容?","提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            //确定要批量删除

        }).catch(() => {
            // 取消批量删除
            this.$message({
                type: 'info',
                message: '已取消批量删除'
            })
        })
      },
      // 详情
      joinDetail(){

      }
    },
  }
</script>


