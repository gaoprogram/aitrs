
<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——版本套包-统一购买折扣
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.buyDiscount
  padding 0 20px
  box-sizing border-box
</style>

<template>
  <div class="buyDiscount">
    平台系统设置——版本套包-统一购买折扣
    <el-table
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="larger"
        label="月数等级"
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
        prop="largerMonth"
        label="大于等于月数"
      >
        <template slot-scope="scope">
          <span>
            <el-input 
              v-if="scope.row.isEdit"
              v-model="scope.row.largerMonth">
            {{scope.row.largerMonth}}
            </el-input>
            <span v-else>{{scope.row.largerMonth}}</span>
          </span>
        </template>
      </el-table-column>    


      <el-table-column
        prop="smallerMonth"
        label="小于月数"
      >
        <template slot-scope="scope">
          <span>
            <el-input 
              v-if="scope.row.isEdit"
              v-model="scope.row.smallerMonth">
            {{scope.row.smallerMonth}}
            </el-input>
            <span v-else>{{scope.row.smallerMonth}}</span>
          </span>
        </template>
      </el-table-column>          

      

      <el-table-column
        prop="rackRate"
        label="按标准价购买%"
      >
        <template slot-scope="scope">
          <span>
            <el-input 
              v-if="scope.row.isEdit"
              v-model="scope.row.rackRate">
            {{scope.row.rackRate}}
            </el-input>
            <span v-else>{{scope.row.rackRate}}</span>
          </span>
        </template>          
      </el-table-column>    

      <el-table-column
        prop="perCapita"
        label="按人均价格购买%"
      >
        <template slot-scope="scope">
          <span>
            <el-input 
              v-if="scope.row.isEdit"
              v-model="scope.row.perCapita">
            {{scope.row.perCapita}}
            </el-input>
            <span v-else>{{scope.row.perCapita}}</span>
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

          <el-button 
            type="text" 
            @click.native="handleDelete(scope.row, scope.$index)">
            删除
          </el-button>          
        </template>
      </el-table-column> 
    </el-table>             
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        tableData:[
          {
            larger: 20,
            largerMonth: 2,
            smallerMonth: 6,
            rackRate: 5000,
            perCapita: 50,
            isEdit: false 
          }, 
          {
            larger: 20,
            largerMonth: 3, 
            smallerMonth: 6,
            rackRate: 4000,
            perCapita: 100,
            isEdit: false               
          }                  
        ]
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
      // 删除
      handleDelete(row, index){
        this.$confirm("确认要删除此行吗？","提示",{
          conformButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          // 删除
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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

