<!--
  User: gaol
  Date: 2019/8/9
  功能：基础设置- 人事档案地点
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.personnelFile
  padding 0 20px 
  box-sizing border-box


.addPersonnel,.editPersonnel
  .provinceAndCity
    margin-left -40px
</style>

<template>
  <div class="personnelFile">
    <!-- tableData: {{tableData}} -->
    <el-button class="rt marginB10" type="primary" size="mini" @click.native="addPersonnel">新增</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="PFUnitName"
        label="机构"
        width="120">
      </el-table-column>
      <el-table-column
        prop="PFProvince"
        label="省份">
      </el-table-column>
      <el-table-column
        prop="PFCity"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="PFPostal"
        label="邮编">
      </el-table-column>            
      <el-table-column
        prop="PFServFeeSet"
        label="服务费"
        width="120">
      </el-table-column>

      <el-table-column
        prop="state"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.State === 1? '启用': '停用'}}</span>
        </template>
      </el-table-column>  

      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleStopUsing(scope.row)" type="text" size="small">停用</el-button>
          <el-button @click="handleStartUsing(scope.row)" type="text" size="small">启用</el-button>
        </template>
      </el-table-column>
    </el-table>   

    <!--分页部分--start--->
    <div class="pagination-container">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="queryObj.pageIndex"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="queryObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryObj.total">
        </el-pagination>
    </div>
    <!---分页部分--end--->  
     

    <!--新增弹框--start-->
    <div class="addPersonnel" v-if="showAddDialog">
      <el-dialog
        title="新增"
        width="30%"
        :visible.sync="showAddDialog"
        custom-class="addPersonnel"
        append-to-body
        :close-on-click-modal="false"
      >
          
          <!-- personnelForm: {{personnelForm}} -->
        <el-form :form="personnelForm" :model="personnelForm" label-width="120px">
          <el-form-item
            label="档案所在机构"
          >
            <el-input v-model="personnelForm.org" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="国家"
          >
            <el-select 
              @change="_countryChange"
              v-model="personnelForm.country" 
              style="width:250px">
              <el-option 
                v-for="(item, key) in countryOption"
                :key="key"
                :label="item.ItemName"
                :value="item.ItemCode"
              >{{item.ItemName}}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="provinceAndCity"
          >
            <dist-picker-cmp 
              province="" 
              city="" 
              area="" 
              :hideArea="true"
              showStyle="vertical"
              @province="changeProvince" 
              @selected="onSelected">
            </dist-picker-cmp>            
          </el-form-item>    

          <el-form-item
            label="地址"
          >
            <el-input v-model="personnelForm.address" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="邮编"
          >
            <el-input v-model="personnelForm.postCode" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="存档服务费(月)"
          >
            <el-input v-model="personnelForm.cost" style="width:250px"></el-input>
          </el-form-item>          

        </el-form>          

        <save-footer @save="saveAddPersonnel" @cancel="cancelAddPersonnel"></save-footer>
      </el-dialog>
    </div>
    <!--新增弹框--end-->

    <!--编辑弹框--start--->
    <div class="editPersonnel" v-if="showEditPersonnel">
      <el-dialog
        title="编辑"
        width="30%"
        :visible.sync="showEditPersonnel"
        custom-class="editPersonnel"
        append-to-body
        :close-on-click-modal="false"
      >
        <el-form :form="currentRow" :model="currentRow" label-width="120px">
          <el-form-item
            label="档案所在机构"
          >
            <el-input v-model="currentRow.PFUnitName" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="国家"
          >
            <el-select 
              @change="_countryChange"
              v-model="currentRow.PFCountry" 
              style="width:250px">
              <el-option 
                v-for="(item, key) in countryOption"
                :key="key"
                :label="item.ItemName"
                :value="item.ItemCode"
              >{{item.ItemName}}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="provinceAndCity"
          >
            <dist-picker-cmp 
              :province="currentRow.PFProvince" 
              :city="currentRow.PFCity" 
              area="" 
              :hideArea="true"
              showStyle="vertical"
              @province="changeProvince" 
              @selected="onSelected">
            </dist-picker-cmp>            
          </el-form-item>    

          <el-form-item
            label="地址"
          >
            <el-input v-model="currentRow.PFAddress" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="邮编"
          >
            <el-input v-model="currentRow.PFPostal" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="存档服务费(月)"
          >
            <el-input v-model="currentRow.PFServFeeSet" style="width:250px"></el-input>
          </el-form-item>          

        </el-form>           
      </el-dialog>
    </div>
    <!---编辑弹框--end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  import { PaGetDicDataSourceList } from '@/api/dic'
  import DistPickerCmp from '@/base/PA-common-cmp/DistPicker/DistPicker-cmp'
  import { 
    getRegionData, 
    getOrganization, 
    saveOraganization, 
    getPersonnelFile,
    changeOraganizationState 
  } from '@/api/employee'

  let DicType='SYS',DicCode='Country'
  export default {
    components: {
      SaveFooter,
      DistPickerCmp
    },
    data(){
      return {
        showAddDialog: false, // 控制新增弹框的显示/隐藏
        showEditPersonnel: false, // 控制编辑弹框的显示/隐藏
        currentStopUsingRow: {}, // 当前停用的行对象
        currentStartUsingRow: {}, // 当前启用的行对象
        currentEditRow: {}, //当前编辑的行对象
        currentRow: {}, // 当前的行对象
        // 新增弹框中的对象
        personnelForm: {
          org: '',
          country: '',
          province: '',
          city: '',
          address: '',
          postCode: '',
          cose: ''
        },
        countryOption: [],  // 国家数据源list
        tableData: [{
          PFUnitName: '',
          PFCountry: '',
          PFProvince: '',
          PFCity: '',
          PFAddress: '',
          PFServFeeSet: '',
          provinceAndCity: '',
          PFPostal: 200333
        }],
        queryObj: {
          PageSize: 10,
          PageIndex: 1,
          total: 0
        }       
      }
    },
    created(){
      // 获取档案机构列表
      this._getOrganization()
    },
    methods: {
      // 分页--一页展示多少条
      handleSizeChange (val) {
          this.queryObj.pageSize = val
          this._getOrganization()
      },
      // 分页--上一页，下一页
      handleCurrentChange (val) {
          this.queryObj.pageIndex = val
          this._getOrganization()
      },
      changeProvince(data){
        debugger
        // 省份变动

      },
      // 三级联动
      onSelected(data){
        debugger
        console.log(data)
        try {
          this.personnelForm.province = data.province.code
          this.personnelForm.city = data.city.code          
        } catch (error) {
          console.log("省市区联动数据出错了")
        }
      },
      // 选取的国家变动   
      _countryChange(data){
        debugger
        // this._getRegionData()
      },
      // 停用/启用档案机构状态    
      _changeOraganizationState(type){
        debugger
        changeOraganizationState(this.currentRow.PFUnitCode, type).then(res => {
          debugger
          if(res && res.data.State ===REQ_OK){
            this.$message.success("提成成功")
            this._getOrganization()
          }else {
            this.$message.error(`提交失败，${res.data.Error}`)
          }
        }).catch(()=> {
          this.$message({
            type: 'warning',
            message: '提交出错了'
          })
        })
      },
      //获取档案机构列表
      _getOrganization(){
        debugger
        getOrganization(this.queryObj.PageSize, this.queryObj.PageIndex).then(res => {
          debugger
          if( res && res.data.State === REQ_OK ){
            this.tableData = res.data.Data
            this.queryObj.total = res.data.total
          }else {
            this.$message({
              type: 'error',
              message: `获取档案机构列表失败，${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '获取档案机构列表出错'
          })
        })
      },
      // 获取行政区域
      _getRegionData(){
        let CountryId = this.personnelForm.country
        getRegionData(CountryId).then(res => {
          debugger
          if(res && res.data.State ===REQ_OK){
            this.currentReginData = res.data.Data
          }else {
            this.$message.error(`获取行政区域数据失败，${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("获取行政区域数据出错")
        })
      },
      // 获取国家的字典表
      _PaGetDicDataSourceList(){
        PaGetDicDataSourceList(DicType, DicCode).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.countryOption = res.data.Data
          }else {
            this.$message({
              type: 'error',
              message: `获取国家字典表失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message.warning("获取国家字典表出错")
        }) 
      },
      // 新增保存
      _saveOraganization(){
        let strJsonData = {
          Id: 0,
          PFUnitCode: '',
          PFUnitName: '',
          PFCountry: '',
          PFProvince: '',
          PFCity: '',
          PFDistrict: '',
          PFAddress: '',
          PFPostal: '',
          PFServFeeSet: ''
        }

        strJsonData.PFUnitCode = ''
        strJsonData.PFUnitName = this.personnelForm.org
        strJsonData.PFCountry = this.personnelForm.country
        strJsonData.PFProvince = this.personnelForm.province
        strJsonData.PFCity = this.personnelForm.city
        strJsonData.PFDistrict = ''
        strJsonData.PFAddress = this.personnelForm.address
        strJsonData.PFPostal = this.personnelForm.postCode
        strJsonData.PFServFeeSet = this.personnelForm.cose

        console.log(strJsonData)


        saveOraganization(JSON.stringify(strJsonData)).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success("保存成功")
            this._getOrganization()
          }else {
            this.$message.error(`新增保存失败，${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning(`新增保存出错`)
        })
      },
      // 新增时 获取档案机构数据
      _getPersonnelFile(){
        getPersonnelFile(0).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            
          }else {
            this.$message({
              type: 'error',
              message: `获取人事档案机构数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '获取人事档案机构数据出错'
          })
        })
      },
      // 新增人事档案
      addPersonnel(){
        this.showAddDialog = true
        // this._getPersonnelFile()
        // 获取国家字典表
        this._PaGetDicDataSourceList()        
      },
      // 新增人事档案保存
      saveAddPersonnel(){
        // 先校验必填项 然后调接口保存
        this._saveOraganization()
      },
      // 取消新增人事档案
      cancelAddPersonnel(){
        this.showAddDialog = false
      },
      // 编辑
      handleEdit(row){
        this.currentRow = row
        this.currentEditRow = row
        this.showEditPersonnel = true
        // 获取国家字典表
        this._PaGetDicDataSourceList()           
      },
      // 停用
      handleStopUsing(row){
        this.currentRow = row
        this.currentStopUsingRow = row
        this.$confirm("确定停用此档案吗？","提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          // 调接口进行 停用该档案
          this._changeOraganizationState(0)
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: "取消停用"
          })
        })
      },
      // 启用
      handleStartUsing(row){
        this.currentRow = row
        this.currentStartUsingRow = row
        this.$confirm("确定要启用此档案吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          // 调用接口 进行启用档案
          this._changeOraganizationState(1)        
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: "已取消启用"
          })
        })
      }
    }
  }
</script>

