
<!--
  User: gaol
  Date: 2019/8/7
  功能： 人员规模等级组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div class="peopleLever-cmp">
      人员规模等级
        <el-table
          :data="tableData"
          style="width: 100%"
          border
        >
          <el-table-column
            prop="larger"
            label="大于等于人数"
          >
            <template slot-scope="scope">
              <span>
                <el-input 
                  v-if="scope.row.isEdit"
                  v-model="scope.row.larger">
                {{scope.row.larger}}
                </el-input>
                <span v-else>{{scope.row.larger}}</span>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="smaller"
            label="小于人数"
          >
            <template slot-scope="scope">
              <span>
                <el-input 
                  v-if="scope.row.isEdit"
                  v-model="scope.row.smaller">
                {{scope.row.smaller}}
                </el-input>
                <span v-else>{{scope.row.smaller}}</span>
              </span>
            </template>          
          </el-table-column>           

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button 
                type="text" 
                v-if="!scope.row.isEdit"
                @click.native="handleEdit(scope.row, scope.$index)">
                编辑
              </el-button>

              <el-button 
                type="text" 
                v-if="scope.row.isEdit"
                @click.native="handleCancel(scope.row, scope.$index)">
                取消
              </el-button>

              <el-button 
                type="text" 
                v-if="scope.row.isEdit"
                @click.native="handleSave(scope.row, scope.$index)">
                保存
              </el-button>

              <el-button 
                type="text" 
                v-if="!scope.row.isEdit"
                @click.native="handleAddLine(scope.row, scope.$index)">
                增加行
              </el-button>
            </template>
          </el-table-column> 
        </el-table>        
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tableData: {
        type: Array,
        default: () => {
          return [
            {
              larger: 20,
              smaller: 10,
              isEdit: false 
            },
            {
              larger: 100,
              smaller: 40,
              isEdit: false
            }                    
          ]
        }
      }   
    },
    data(){
      return {

      }
    },
    methods: {
      // 编辑
      handleEdit(row, index){
        debugger
        row['isEdit'] = true
      },
      // 新增一行
      handleAddLine(row, index){
        // this.tableData.push({
        //   larger: 1000,
        //   smaller: 400,
        //   isEdit: false          
        // })

        this.tableData.splice(index+1,0, {
          larger: 1000,
          smaller: 400,
          isEdit: false      
        })
      },
      // 取消
      handleCancel(row, index){
        row['isEdit'] = false
      },
      // 保存
      handleSave(row, index){
        row['isEdit'] = false
      }
    },
  }
</script>
