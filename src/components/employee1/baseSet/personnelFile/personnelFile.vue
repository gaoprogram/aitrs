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

.provinceAndCity
  >>>.el-form-item__error
    margin-left 40px !important
</style>

<template>
  <div class="personnelFile">
    <!-- tableData: {{tableData}} -->
    <el-button class="rt marginB10" type="primary" size="mini" @click.native="addPersonnel">新增</el-button>
    <div class="['tableBox','']" v-loading="loading">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="PFUnitName"
          label="机构"
          sortable>
        </el-table-column>
        <el-table-column
          prop="PFProvinceName"
          label="省份"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="PFCityName"
          label="城市"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="PFPostal"
          label="邮编"
          sortable
          width="120">
        </el-table-column>            
        <el-table-column
          prop="PFServFeeSet"
          label="服务费"
          sortable
          width="120">
        </el-table-column>

        <el-table-column
          prop="state"
          label="状态"
          sortable
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
    </div>
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
        <el-form 
          ref="personnelForm"
          :form="personnelForm" 
          :model="personnelForm" 
          :rules="personnelFormRule" 
          label-width="120px">
          <el-form-item
            label="档案所在机构"
            prop="org"
          >
            <el-input v-model="personnelForm.org" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="国家"
            prop="country"
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
            prop="city"
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
            prop="address"
          >
            <el-input v-model="personnelForm.address" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="邮编"
            prop="postCode"
          >
            <el-input v-model="personnelForm.postCode" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="存档服务费(月)"
            prop="cost"
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

        <!-- currentRow： {{currentRow}} -->
        <el-form 
          ref="currentRowForm"
          :form="currentRow" 
          :model="currentRow" 
          :rules="currentRowRules" 
          label-width="120px">
          <el-form-item
            label="档案所在机构"
            prop="PFUnitName"
          >
            <el-input v-model="currentRow.PFUnitName" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="国家"
            prop="PFCountry"
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
            prop="PFCity"
          >
            <dist-picker-cmp 
              :province="currentRow.PFProvinceName" 
              :city="currentRow.PFCityName" 
              area="" 
              :hideArea="true"
              showStyle="vertical"
              @province="changeEidtProvince" 
              @selected="onEditSelected">
            </dist-picker-cmp>            
          </el-form-item>    

          <el-form-item
            label="地址"
            prop="PFAddress"
          >
            <el-input v-model="currentRow.PFAddress" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="邮编"
            prop="PFPostal"
          >
            <el-input v-model="currentRow.PFPostal" style="width:250px"></el-input>
          </el-form-item>

          <el-form-item
            label="存档服务费(月)"
            prop="PFServFeeSet"
          >
            <el-input v-model="currentRow.PFServFeeSet" style="width:250px"></el-input>
          </el-form-item>          

        </el-form>  

        <save-footer @save="saveEditPersonnel" @cancel="cancelEditPersonnel"></save-footer>
      </el-dialog>
    </div>
    <!---编辑弹框--end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { REQ_OK } from '@/api/config'
  import { PaGetDicDataSourceList } from '@/api/dic'
  import DistPickerCmp from '@/base/DistPicker/DistPicker-cmp'
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
        loading: false, 
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
          cost: ''
        },
        personnelFormRule: {
          org: [{ required: true, message: '请填写机构名称', trigger: ['blur','change']}],
          country: [{ required: true, message: '请选择国家', trigger: ['blur','change']}],
          province: [{ required: true, message: '请选择省', trigger: ['blur','change']}],
          city: [{ required: true, message: '请选择市', trigger: ['blur','change']}],
          address: [{ required: true, message: '请填写地址', trigger: ['blur','change']}],
          postCode: [{ required: true, message: '请填写邮编', trigger: ['blur','change']}],
          cost: [{ required: true, message: '请填写服务费(月)', trigger: ['blur','change']}]
        },
        currentRowRules: {
          PFUnitName: [{ required: true, message: '请填写机构名称', trigger: ['blur','change']}],
          PFCountry: [{ required: true, message: '请选择国家', trigger: ['blur','change']}],
          PFProvinceName: [{ required: true, message: '请选择省', trigger: ['blur','change']}],
          PFCity: [{ required: true, message: '请选择市', trigger: ['blur','change']}],
          PFAddress: [{ required: true, message: '请填写地址', trigger: ['blur','change']}],
          PFPostal: [{ required: true, message: '请填写邮编', trigger: ['blur','change']}],
          PFServFeeSet: [{ required: true, message: '请填写服务费(月)', trigger: ['blur','change']}]
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
        this.personnelForm.province = data.code
      },
      changeEidtProvince(data){
        debugger
        this.currentRow.PFProvince = data.code
        this.currentRow.PFProvinceName = data.value
      },
      // 三级联动
      onSelected(data){
        debugger
        // console.log(data)
        try {
          this.personnelForm.province = data.province.code
          this.personnelForm.city = data.city.code          
        } catch (error) {
          console.log("省市区联动数据出错了")
        }
      },
      onEditSelected(data){
        debugger
        try {
          this.currentRow.PFProvince = data.province.code
          this.currentRow.PFCity = data.city.code   
          this.currentRow.PFProvinceName = data.province.value       
          this.currentRow.PFCityName = data.city.value       
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
        this.loading = true
        getOrganization(this.queryObj.PageSize, this.queryObj.PageIndex).then(res => {
          this.loading = false
          debugger
          if( res && res.data.State === REQ_OK ){
            this.tableData = res.data.Data
            this.queryObj.total = res.data.DataCount
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
      // 编辑/新增字典表时 的提交
      _submitForm(data, type){
        // type 0  新增   type 1 编辑
        saveOraganization(JSON.stringify(data)).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success("保存成功")
            type === 0 && (this.showAddDialog = false)
            type === 1 && (this.showEditPersonnel = false)
            this._getOrganization()
          }else {
            this.$message.error(`新增保存失败，${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning(`新增保存出错`)
        })
      },
      // 新增保存
      _saveOraganization(){
        debugger     
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
        strJsonData.PFServFeeSet = this.personnelForm.cost        
        
        this.$refs["personnelForm"].validate((valid) => {
          debugger
          if(valid){
            this._submitForm(strJsonData, 0)
          }else {

          }
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
        if(!this.countryOption.length){
          // 获取国家字典表
          this._PaGetDicDataSourceList() 
        }       
      },
      // 新增人事档案保存
      saveAddPersonnel(){
        // 先校验必填项 然后调接口保存
        this._saveOraganization()
      },
      // 编辑人事档案取消
      cancelEditPersonnel(){
        this.showEditPersonnel = false
      },
      // 编辑人事档案保存 
      saveEditPersonnel(){
        debugger
        //先校验必填项
        //  if(!this.currentRow.PFUnitName){
        //   this.$message.warning("档案所在机构未填写")
        //   return
        // }

        // if(!this.currentRow.PFCountry){
        //   this.$message.warning("国家未填写")
        //   return
        // }

        // if(!this.currentRow.PFProvince){
        //   this.$message.warning("省份未填写")
        //   return
        // }

        // if(!this.currentRow.PFCity){
        //   this.$message.warning("城市未填写")
        //   return
        // }       
        
        // if(!this.currentRow.PFAddress){
        //   this.$message.warning("地址未填写")
        //   return
        // }     
        
        // if(!this.currentRow.PFPostal){
        //   this.$message.warning("邮编未填写")
        //   return
        // }    
        
        // if(!this.currentRow.PFServFeeSet){
        //   this.$message.warning("存档服务费未填写")
        //   return
        // }  
        let strJsonData = {
          Id: this.currentRow.Id,
          PFUnitCode: this.currentRow.PFUnitCode,
          PFUnitName: this.currentRow.PFUnitName,
          PFCountry: this.currentRow.PFCountry,
          PFProvince: this.currentRow.PFProvince,
          PFCity: this.currentRow.PFCity,
          PFDistrict: '',
          PFAddress: this.currentRow.PFAddress,
          PFPostal: this.currentRow.PFPostal,
          PFServFeeSet: this.currentRow.PFServFeeSet
        }

        this.$refs["currentRowForm"].validate((valid) => {
          if(valid){
            this._submitForm(strJsonData , 1)
          }else {

          }
        })
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
        if(!this.countryOption.length){
          // 获取国家字典表
          this._PaGetDicDataSourceList() 
        }          
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

