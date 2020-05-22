<!--
  User: xxxxxxx
  Date: 2018/12/5
  功能：right-fixed 中 点击 明细表后的 明细表详情弹框
-->

<template>
  <el-dialog
    title="明细表"
    :visible.sync="dialogTableTemplate"
    width="70%"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="detail-table-dialog"
  >
    <!-- detailTableList： {{detailTableList}} -->
    <!-- ------------ -->
    <!-- detailTables_copy: {{detailTables_copy}} -->
    <!-- attachmentRole： {{attachmentRole}} -->
    <el-tabs
        v-model="currentDetailTableCode" 
        type="border-card" 
        @tab-click="handleClickDetailTableTab">
      <el-tab-pane
        :label="detailTable.Name"
        v-for="detailTable in detailTables_copy"
        :key="detailTable.DetailTableCode"
        :name="detailTable.DetailTableCode"
      >
        <el-form :model="detailTable" :ref="`detailForm${detailTable.DetailTableCode}`" label-width="0"
                 class="detail-form">
          <div style="width: 100%">
            <el-scrollbar style="width: 100%" :native="false" :noresize="false">
              <div class="content-title">
                <!-- alreadyCheckedNum: {{alreadyCheckedNum}} -->
                <el-button 
                  style="margin-bottom:5px" 
                  :disabled="alreadyCheckedNum<=0" size="mini" 
                  @click.native="batchDeleteDetailLine">
                  批量删除行
                </el-button>
                <table width="100%">
                  <!-- detailTable.Fields： {{detailTable.Fields}} -->
                  <!--table标题栏---start--->
                  <tr>
                    <th>
                      <div>
                        <input 
                          @click="clickAllChecked" 
                          type="checkbox" 
                          :checked="isAllChecked"
                          id="allChecked"
                          style="vertical-align:top;margin:2px 2px 0 0"
                          >
                        </input>
                        <label for="allChecked"><span>全选/取消</span></label>
                      </div>                      
                    </th>
                    <th v-if="flowCurrentTabStr ==='todo'">
                      <div>选择</div>
                    </th>
                    <th>
                      唯一码
                    </th>
                    <th v-for="(field, index) in detailTable.Fields" :key="index">
                      <div>{{field.FieldName}}</div>
                    </th>
                  </tr>
                  <!--table标题栏---end--->

                  <!-----table内容区----start--->
                  <tbody>
                    <!-- flowCurrentTabStr: {{flowCurrentTabStr}} -->
                    <tr class="trBox" v-for="(value, index) in detailTable.Values" :key="index">
                      <td style="text-align: center; min-width: 50px">
                        <!-- value.checked_set: {{value[0].checked_set}} -->
                        <input type="checkbox" :checked='value[0].checked_set' @click="checkedDetailLine(value, index)"></input>
                      </td>
                      <td class="tdDelete" v-if="flowCurrentTabStr ==='todo'">
                        <div><el-button type="text" :disabled="!attachmentRole.DetailTableCanDelete" @click="handleDelDetail(index)">删除</el-button></div>
                      </td>
                      <td class="tdOnlyCode">
                        {{value[0].RowNo}}
                      </td>                      
                      <td class="tdBox" v-for="(field, i) in value" :key="i">
                        <!-- field.ControlType: {{field.ControlType}} -->
                        <div class="componentBox" v-if="field.Role!=4">
                          <component
                            :is="currentRuleComponent(field.ControlType === '13' ? '6' : field.ControlType)"
                            :prop="'Fields.' + i + '.FieldValue'"
                            :obj.sync="field"
                            :flowContent="field.DisplayValue"                             
                            :trObj = "value"
                            :tdIndex="i"
                            :trIndex='index'
                            :workId="workId"
                            :nodeId="nodeId"
                            :isTitle="false"
                            :attachmentRole="attachmentRole"
                            @changeEmp="changeOrgDetailCmp"
                          ></component>
                          <!--此方格是否可编辑--start-->
                          <div class="notCanEdit" v-if="field.Role==1" title="无权限编辑"></div>
                          <!--此方格是否可编辑--end-->
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <!-----table内容区----end--->
                </table>
              </div>
            </el-scrollbar>
          </div>
        </el-form>

        <!-----新增行btn---start--->
        <template v-if="attachmentRole.DetailTableCanAdd && flowCurrentTabStr ==='todo'">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleClickAddDetailLine"
            style="margin-top: 10px">
          </el-button>
        </template>
        <!-----新增行btn---end--->

      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="handleClickCancel">取 消</el-button> -->
      <el-button type="primary" @click="handleClickSure">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { workFlowControlRuleMixin } from '@/utils/mixin'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [workFlowControlRuleMixin],
    props: {
      // 当前主表明细的所有明细表
      detailTableList: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 所有主表名下的所有明细表
      allDetailTables: {
        type: Array,
        default: () => {
          return []
        }
      },
      workId: {
        type: [Number, String],
        default: ''
      },
      nodeId: {
        type: [Number, String],
        default: ''
      },
      attachmentRole: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        dialogTableTemplate: true,
        currentDetailTableObj: {}, // 当前主表下的所有的 当前单个明细表对象
        detailTables_copy: [], // 复制一个 当前主表明下的明细表集合
        allDetailTables_copy: [], // 复制一个 所有主表名下的所有明细表的集合
        currentDetailTableObjIndex: 0,  // 当前主表下的
        alreadyCheckedNum: 0,  // 记录已经选中的当前明细表的行数
        isAllChecked: false // 明细表删除行的 全选/取消全选标识
      }
    },
    computed: {
      ...mapGetters(['flowCurrentTabStr'])
    },
    watch: {

    },
    created () {
      debugger
      console.log("明细表页面中初始进入时打印当前主表名下的所有明细表集合detailTableList", this.detailTableList)

      console.log("明细表页面中 打印最初所有主表名下的所有明细表集合allDetailTables", this.allDetailTables)
      // 复制一个 当前主表名下的所有明细表集合
      let newObj_allDetailTables_localStorage = JSON.parse(localStorage.getItem("allDetailTables_copy_detailPage"))
      let arrDetailTables = []      
      if( newObj_allDetailTables_localStorage ){
        let length_allDetailTables = newObj_allDetailTables_localStorage.length
        if(this.detailTableList.length){
          this.detailTableList.forEach((item,key) => {
            for(let j=0;j<length_allDetailTables;j++){
              let item1 = newObj_allDetailTables_localStorage[j]
              if(item.MainTableCode === item1.MainTableCode && item.DetailTableCode === item1.DetailTableCode){
                arrDetailTables.push(item1)
                break
              }
            }
          })
        }else {

        }
        
        this.detailTables_copy = JSON.parse(JSON.stringify(arrDetailTables))
        // console.log("------arrDetailTables", this.detailTables_copy)
      }else {
        this.detailTables_copy = JSON.parse(JSON.stringify(this.detailTableList))
        // console.log("-----------detailTableList", this.detailTables_copy)
        // 先将 之前所有主表下的所有明细表数据 存入缓存中
        let allDetailData = JSON.parse(JSON.stringify(this.allDetailTables))
        localStorage.setItem("allDetailTables_copy_detailPage", JSON.stringify(allDetailData))
      }
      // console.log("明细表页面中 打印复制的最初当前主表名下的所有明细表集合detailTables_copy", this.detailTables_copy)
      // 复制一个 所有主表名下的明细表集合
      this.allDetailTables_copy = JSON.parse(JSON.stringify(this.allDetailTables))
      // console.log("明细表页面中 打印复制的最初所有主表名下的所有明细表集合allDetailTables_copy", this.allDetailTables_copy)
      this.currentDetailTableObj = this.detailTables_copy[0]
      this.currentDetailTableCode = this.currentDetailTableObj.DetailTableCode
    },
    methods: {
      // 点击明细表tab切换
      handleClickDetailTableTab (tab, event) {
        debugger
        this.currentDetailTableObj = this.detailTables_copy.find(item => {
          return item.DetailTableCode === tab.name
        })
        this.currentDetailTableCode = this.currentDetailTableObj.DetailTableCode        
      },
      // 点击增加明细表行数据（后台生成行号的情况，增加的行 前端默认将新增的行号传为 -1，由后台来处理行号）
      handleClickAddDetailLine(){
        // 后台处理新增行的行号
        // console.log("-----打印当前的明细表对象-------",this.currentDetailTableObj)
        // console.log("-----打印最初的所有明细表对象----------", this.allDetailTables_copy)
        debugger

        let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields]))
        // console.log(newRowObj)
        // 处理每行的行号变为 -1
        newRowObj.map((item, key) => {
          let ControlType = item.ControlType
          // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
          switch( ControlType ){
            // 
            case '1': //单行文本
            case '2': //多行文本
            case '3': //数字
            case '4': //金额
            case '9': //时分
              item.FieldValue = ''
              item.RowNo = -1
            break

            case '5': // 单选下拉框
            case '12': // 单选radio
              item.FieldValue = {
                parentIds: '',
                childIds: ''
              }
              item.RowNo = -1
            break

            case '6': // 多选下拉框
            case '13': // 复选框
              item.FieldValue = {
                parentIds: [],
                childIds: []
              }
              //取消默认选中的value
              item.Ext.DefaultOpt = []                  
              item.RowNo = -1
            break

            case '7': // 时间
              item.FieldValue = ''
              item.RowNo = -1
            break

            case '8': // 时间区间
              item.FieldValue = []
              item.RowNo = -1
            break

            case '10': // 月份选择
              item.FieldValue = ''
              item.RowNo = -1
            break

            case '11': // 是否
              item.FieldValue = false
              item.RowNo = -1
            break

            case '14': // 图片
            case '15': // 附件
              item.FieldValue = [
                // {
                //   Name: '',
                //   Url: '',
                //   AttachmentId: ''
                // }
              ]
              item.RowNo = -1
            break

            case '16': // 计算列
              item.FieldValue = ''
              item.RowNo = -1
            break

            case '19': // 公司内联系人
            case '20': // 公司组织
              item.FieldValue = [
                {
                  NodeId:'',
                  Id: '',
                  Name: '',
                  EmpNo: ''
                }
              ]
              item.RowNo = -1
            break 

            case '22': // 地点
              item.FieldValue = {
                LocationName: '',
                Longitude: '',
                Latitude: ''
              }
            item.RowNo = -1
            break

            case '23': // 编辑器
              item.FieldValue = ''
              item.DisplayValue = ''
              item.RowNo = -1
            break                      

            default: 
              item.FieldValue = ''
              item.RowNo = -1
          }
        })  

        // console.log("----当前明细表中没有行，打印新增行的对象----",newRowObj)
        this.currentDetailTableObj.Values.push(newRowObj) 

        if(this.currentDetailTableObj && this.currentDetailTableObj.Values && !this.currentDetailTableObj.Values.length){
          // 当前该明细表没有行
          
          if(this.detailTables_copy && this.detailTables_copy.length){
            for(let i =0,length = this.detailTables_copy.length; i< length; i++){
              let item = this.detailTables_copy[i]
              if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode &&
                item.MainTableCode === this.currentDetailTableObj.MainTableCode ){
                // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
                // 最初对应的明细表中 有行
                // 将新的 Values 添加到对应的明细表中的values中
                item.Values.push(newRowObj)                
              }else {
                if( i === this.detailTables_copy.length-1){
                  console.log("最初的明细表中 没有找到当前对应的明细表")
                }
              }
            }
          }

          // console.log("-----当前明细表中没有行，打印添加行对象后，当前明细表的对象----------", this.currentDetailTableObj)
          // 将复制的当前主表名下的所有明细表中 对应的明细表中 values 替换一下
          debugger
          this.detailTables_copy.forEach((item,key) => {
            if(item.DetailTableCode === this.currentDetailTableObj.DetailTableCode){
              item.Values = this.currentDetailTableObj.Values
            }
          })
          // console.log("新增行后的复制的当前主表名下的所有明细表对象detailTables_copy", this.detailTables_copy)
        }
        // 将复制的当前主表名下的所有明细表中 对应的明细表中 values 替换一下
        debugger
        this.detailTables_copy.forEach((item,key) => {
          if(item.DetailTableCode === this.currentDetailTableObj.DetailTableCode){
            item.Values = this.currentDetailTableObj.Values
          }
        })
        console.log("新增行后的复制的当前主表名下的所有明细表对象detailTables_copy", this.detailTables_copy)

        // 将复制的 所有主表 的名下明细表对象中 对应的主表下的所有明细表替换一下
        let allDetailTables_localStorage = localStorage.getItem('allDetailTables_copy_detailPage')
        if(!allDetailTables_localStorage) {
          // 缓存中没有
        }else {
          // 缓存中有   用缓存中的替换
          this.allDetailTables_copy = JSON.parse(allDetailTables_localStorage)
        }
        debugger
        // console.log("this.detailTables_copy  和 this.allDetailTables_copy-------", this.detailTables_copy, this.allDetailTables_copy)
        for( let i =0,length=this.detailTables_copy.length;i<length;i++ ){
          let item = this.detailTables_copy[i]
          for( let j=0,len=this.allDetailTables_copy.length;j<len;j++ ){
            let item1 = this.allDetailTables_copy[j]
            if( item.MainTableCode === item1.MainTableCode && item.DetailTableCode === item1.DetailTableCode ){
              // 主表和明细表code 都相同  替换 allDetailTables_copy 中的该 明细表对象
              item1.Values = item.Values
              break
            }else {
              if( j === this.allDetailTables_copy.length -1 ){
                console.log(`-----【${item.mainName}-${item.MainTableCode}】下-【${item.DetailTableCode}-${item.Name}】------在最初的所有明细表对象JSON.stringify(${this.allDetailTables_copy})中没有找到对应的明细表--------`)
              }
            }
          }
        }
        // console.log("------最终处理过的-allDetailTables_copy对象allDetailTables_copy-------", this.allDetailTables_copy)
        // 将最终的处理过的最新的 allDetailTables_copy 对象 存在localStorage中 
        localStorage.setItem('allDetailTables_copy_detailPage', JSON.stringify(this.allDetailTables_copy))
        // console.log("打印最终处理后的缓存中的所有明细表对象",JSON.parse(localStorage.getItem('allDetailTables_copy_detailPage')))
        debugger     
      },      
      // 点击增加明细表行数据（前台生成行号）
      handleClickAddDetail () {
        // console.log("-----打印当前的明细表对象-------",this.currentDetailTableObj)
        // console.log("-----打印最初的所有明细表对象----------", this.allDetailTables_copy)
        debugger
        if(this.currentDetailTableObj && this.currentDetailTableObj.Values && !this.currentDetailTableObj.Values.length){
          // 当前该明细表没有行
          let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields]))
          // console.log(newRowObj)
          if(this.detailTables_copy && this.detailTables_copy.length){
            for(let i =0,length = this.detailTables_copy.length; i< length; i++){
              let item = this.detailTables_copy[i]
              if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode ){
                // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
                if( item.Values && item.Values.length ){
                  // 最初对应的明细表中 有行
                  let  length_start = item.Values.length
                  let  lastRowNo_start = item.Values[length_start-1][0].RowNo 
                  newRowObj.map((item, key) => {
                    let ControlType = item.ControlType
                    // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
                    switch( ControlType ){
                      // 
                      case '1': //单行文本
                      case '2': //多行文本
                      case '3': //数字
                      case '4': //金额
                      case '9': //时分
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '5': // 单选下拉框
                      case '12': // 单选radio
                        item.FieldValue = {
                          parentIds: '',
                          childIds: ''
                        }
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '6': // 多选下拉框
                      case '13': // 复选框
                        item.FieldValue = {
                          parentIds: [],
                          childIds: []
                        }
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '7': // 时间
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '8': // 时间区间
                        item.FieldValue = []
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '10': // 月份选择
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '11': // 是否
                        item.FieldValue = false
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '14': // 图片
                      case '15': // 附件
                        item.FieldValue = [
                          // {
                          //   Name: '',
                          //   Url: '',
                          //   AttachmentId: ''
                          // }
                        ]
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '16': // 计算列
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '19': // 公司内联系人
                      case '20': // 公司组织
                        item.FieldValue = [
                          {
                            NodeId:'',
                            Id: '',
                            Name: '',
                            EmpNo: ''
                          }
                        ]
                        item.RowNo = lastRowNo_start*1 + 1
                      break 

                      case '22': // 地点
                        item.FieldValue = {
                          LocationName: '',
                          Longitude: '',
                          Latitude: ''
                        }
                      item.RowNo = lastRowNo_start*1 + 1
                      break

                      case '23': // 编辑器
                        item.FieldValue = ''
                        item.DisplayValue = ''
                        item.RowNo = lastRowNo_start*1 + 1
                      break                      

                      default: 
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_start*1 + 1
                    }
                  })                  
                }else {
                  // 最初的对应明细表就没有行, 直接 将行号 修改为 1
                  newRowObj.map((item, key) => {
                    let ControlType = item.ControlType
                    // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
                    switch( ControlType ){
                      // 
                      case '1': //单行文本
                      case '2': //多行文本
                      case '3': //数字
                      case '4': //金额
                      case '9': //时分
                        item.FieldValue = ''
                        item.RowNo = 1
                      break

                      case '5': // 单选下拉框
                      case '12': // 单选radio
                        item.FieldValue = {
                          parentIds: '',
                          childIds: ''
                        }
                        item.RowNo = 1
                      break

                      case '6': // 多选下拉框
                      case '13': // 复选框
                        item.FieldValue = {
                          parentIds: [],
                          childIds: []
                        }
                        item.RowNo = 1
                      break

                      case '7': // 时间
                        item.FieldValue = ''
                        item.RowNo = 1
                      break

                      case '8': // 时间区间
                        item.FieldValue = []
                        item.RowNo = 1
                      break

                      case '10': // 月份选择
                        item.FieldValue = ''
                        item.RowNo = 1
                      break

                      case '11': // 是否
                        item.FieldValue = false
                        item.RowNo = 1
                      break

                      case '14': // 图片
                      case '15': // 附件
                        item.FieldValue = [
                          // {
                          //   Name: '',
                          //   Url: '',
                          //   AttachmentId: ''
                          // }
                        ]
                        item.RowNo = 1
                      break

                      case '16': // 计算列
                        item.FieldValue = ''
                        item.RowNo = 1
                      break

                      case '19': // 公司内联系人
                      case '20': // 公司组织
                        item.FieldValue = [
                          {
                            NodeId:'',
                            Id: '',
                            Name: '',
                            EmpNo: ''
                          }
                        ]
                        item.RowNo = 1
                      break 

                      case '22': // 地点
                        item.FieldValue = {
                          LocationName: '',
                          Longitude: '',
                          Latitude: ''
                        }
                      item.RowNo = 1
                      break


                      case '23': // 编辑器
                        item.FieldValue = ''
                        item.DisplayValue = ''
                        item.RowNo = 1
                      break                      

                      default: 
                        item.FieldValue = ''
                        item.RowNo = 1
                    }
                  })                
                }
                break
              }else {
                if( i === this.detailTables_copy.length-1){
                  console.log("最初的明细表中 没有找到当前对应的明细表")
                }
              }
            }
          }
          // console.log("----当前明细表中没有行，打印新增行的对象----",newRowObj)
          this.currentDetailTableObj.Values.push(newRowObj) 
          // console.log("-----当前明细表中没有行，打印添加行对象后，当前明细表的对象----------", this.currentDetailTableObj)
          // 将复制的当前主表名下的所有明细表中 对应的明细表中 values 替换一下
          debugger
          this.detailTables_copy.forEach((item,key) => {
            if(item.DetailTableCode === this.currentDetailTableObj.DetailTableCode){
              item.Values = this.currentDetailTableObj.Values
            }
          })
          // console.log("新增行后的复制的当前主表名下的所有明细表对象detailTables_copy", this.detailTables_copy)
        }else {
          // 该明细表中 有行
          let length_now = this.currentDetailTableObj.Values.length
          let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Values[length_now-1]]))
          let lastRowNo_now = this.currentDetailTableObj.Values[length_now-1][0].RowNo
          // let newRowObj = JSON.parse(JSON.stringify([...this.currentDetailTableObj.Fields]))
          // console.log("------当前明细表中有行-打印新增行复制的对象（行号未修改前）------",newRowObj)
          // 处理新增的这个数据，将每列的 FieldValue 值清空，将序号 在最新RowNo最大的的数据基础上面 增加1，到时通过 最后一行的行号的比较 来判断是否新增行的验证
          // 此处要特别注意，要比较现在最新的数据中的最后一行的rowNo 和 最开始数据中最后一行的 RowNo 谁大，在大的基础上面 新增的行 行号加1
          if(this.detailTables_copy && this.detailTables_copy.length){
            this.detailTables_copy.forEach((item, key) => {
              if( item.DetailTableCode === this.currentDetailTableObj.DetailTableCode ){
                // 通过DetailTableCode在最初的所有明细表中找 当前的明细表
                // 修改 每行的对象中的  RowNo 的值
                if( item.Values && item.Values.length ) {
                  // 最初对应的明细表中 有行
                  let  length_start = item.Values.length
                  let  lastRowNo_start = item.Values[length_start-1][0].RowNo
                  if(lastRowNo_now >= lastRowNo_start) {
                    // 当前的对应明细表最大的行号 大于等于 开始时的明细表中最大的行号
                    newRowObj.forEach((item, key) => {
                      let ControlType = item.ControlType
                      // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
                      switch( ControlType ){
                        case '1': //单行文本
                        case '2': //多行文本
                        case '3': //数字
                        case '4': //金额
                        case '9': //时分
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '5': // 单选下拉框
                        case '12': // 单选radio
                          item.FieldValue = {
                            parentIds: '',
                            childIds: ''
                          }
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '6': // 多选下拉框
                        case '13': // 复选框
                          item.FieldValue = {
                            parentIds: [],
                            childIds: []
                          }
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '7': // 时间
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '8': // 时间区间
                          item.FieldValue = []
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '10': // 月份选择
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '11': // 是否
                          item.FieldValue = false
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '14': // 图片
                        case '15': // 附件
                          item.FieldValue = [
                            // {
                            //   Name: '',
                            //   Url: '',
                            //   AttachmentId: ''
                            // }
                          ]
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '16': // 计算列
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '19': // 公司内联系人
                        case '20': // 公司组织
                          item.FieldValue = [
                            {
                              NodeId:'',
                              Id: '',
                              Name: '',
                              EmpNo: ''
                            }
                          ]
                          item.RowNo = lastRowNo_now*1 + 1
                        break 

                        case '22': // 地点
                          item.FieldValue = {
                            LocationName: '',
                            Longitude: '',
                            Latitude: ''
                          }
                          item.RowNo = lastRowNo_now*1 + 1
                        break

                        case '23': // 编辑器
                          item.FieldValue = ''
                          item.DisplayValue = ''
                          item.RowNo = lastRowNo_now*1 + 1
                        break                        

                        default: 
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_now*1 + 1
                      }
                    })
                  }else {
                    // 当前的对应明细表最大的行号 小于 开始时的明细表中最大的行号
                    newRowObj.map((item, key) => {
                      let ControlType = item.ControlType
                      // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
                      switch( ControlType ){
                        case '1': //单行文本
                        case '2': //多行文本
                        case '3': //数字
                        case '4': //金额
                        case '9': //时分
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '5': // 单选下拉框
                        case '12': // 单选radio
                          item.FieldValue = {
                            parentIds: '',
                            childIds: ''
                          }
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '6': // 多选下拉框
                        case '13': // 复选框
                          item.FieldValue = {
                            parentIds: [],
                            childIds: []
                          }
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '7': // 时间
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '8': // 时间区间
                          item.FieldValue = []
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '10': // 月份选择
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '11': // 是否
                          item.FieldValue = false
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '14': // 图片
                        case '15': // 附件
                          item.FieldValue = [
                            // {
                            //   Name: '',
                            //   Url: '',
                            //   AttachmentId: ''
                            // }
                          ]
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '16': // 计算列
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '19': // 公司内联系人
                        case '20': // 公司组织
                          item.FieldValue = [
                            {
                              NodeId:'',
                              Id: '',
                              Name: '',
                              EmpNo: ''
                            }
                          ]
                          item.RowNo = lastRowNo_start*1 + 1
                        break 

                        case '22': // 地点
                          item.FieldValue = {
                            LocationName: '',
                            Longitude: '',
                            Latitude: ''
                          }
                          item.RowNo = lastRowNo_start*1 + 1
                        break

                        case '23': // 编辑器
                          item.FieldValue = ''
                          item.DisplayValue = ''
                          item.RowNo = lastRowNo_start*1 + 1
                        break                        

                        default: 
                          item.FieldValue = ''
                          item.RowNo = lastRowNo_start*1 + 1
                      }
                    })                                      
                  }
                }else {
                  // 最初的对应明细表就没有行,此时新增时就直接在现在的明细表最大的一个行号上面加1
                  newRowObj.map((item, key) => {
                    let ControlType = item.ControlType
                    // 不同类型的组件 FieldValue 的数据结构不一样 故需要对每种数据结构做单独处理
                    switch( ControlType ){
                      case '1': //单行文本
                      case '2': //多行文本
                      case '3': //数字
                      case '4': //金额
                      case '9': //时分
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '5': // 单选下拉框
                      case '12': // 单选radio
                        item.FieldValue = {
                          parentIds: '',
                          childIds: ''
                        }
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '6': // 多选下拉框
                      case '13': // 复选框
                        item.FieldValue = {
                          parentIds: [],
                          childIds: []
                        }
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '7': // 时间
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '8': // 时间区间
                        item.FieldValue = []
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '10': // 月份选择
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '11': // 是否
                        item.FieldValue = false
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '14': // 图片
                      case '15': // 附件
                        item.FieldValue = [
                          // {
                          //   Name: '',
                          //   Url: '',
                          //   AttachmentId: ''
                          // }
                        ]
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '16': // 计算列
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '19': // 公司内联系人
                      case '20': // 公司组织
                        item.FieldValue = [
                          {
                            NodeId:'',
                            Id: '',
                            Name: '',
                            EmpNo: ''
                          }
                        ]
                        item.RowNo = lastRowNo_now*1 + 1
                      break 

                      case '22': // 地点
                        item.FieldValue = {
                          LocationName: '',
                          Longitude: '',
                          Latitude: ''
                        }
                        item.RowNo = lastRowNo_now*1 + 1
                      break

                      case '23': // 编辑器
                        item.FieldValue = ''
                        item.DisplayValue = ''
                        item.RowNo = lastRowNo_now*1 + 1
                      break                      

                      default: 
                        item.FieldValue = ''
                        item.RowNo = lastRowNo_now*1 + 1
                    }
                  })                
                }
                return false
              }else {
                if( key === this.detailTables_copy.length-1){
                  console.log("最初的明细表中 没有找到当前对应的明细表")
                }
              }
            })
          }

          console.log("-----当前明细表中有行-打印新增行复制的对象（行号修改后)newRowObj------", newRowObj)
          this.currentDetailTableObj.Values.push(newRowObj) 
          console.log("---当前明细表中有行，打印添加行对象后，当前明细表的对象currentDetailTableObj------", this.currentDetailTableObj)
        }
        // 将复制的当前主表名下的所有明细表中 对应的明细表中 values 替换一下
        debugger
        this.detailTables_copy.forEach((item,key) => {
          if(item.DetailTableCode === this.currentDetailTableObj.DetailTableCode){
            item.Values = this.currentDetailTableObj.Values
          }
        })
        console.log("新增行后的复制的当前主表名下的所有明细表对象detailTables_copy", this.detailTables_copy)

        // 将复制的 所有主表 的名下明细表对象中 对应的主表下的所有明细表替换一下
        let allDetailTables_localStorage = localStorage.getItem('allDetailTables_copy_detailPage')
        if(!allDetailTables_localStorage) {
          // 缓存中没有
        }else {
          // 缓存中有   用缓存中的替换
          this.allDetailTables_copy = JSON.parse(allDetailTables_localStorage)
        }
        debugger
        // console.log("this.detailTables_copy  和 this.allDetailTables_copy-------", this.detailTables_copy, this.allDetailTables_copy)
        for( let i =0,length=this.detailTables_copy.length;i<length;i++ ){
          let item = this.detailTables_copy[i]
          for( let j=0,len=this.allDetailTables_copy.length;j<len;j++ ){
            let item1 = this.allDetailTables_copy[j]
            if( item.MainTableCode === item1.MainTableCode && item.DetailTableCode === item1.DetailTableCode ){
              // 主表和明细表code 都相同  替换 allDetailTables_copy 中的该 明细表对象
              item1.Values = item.Values
              break
            }else {
              if( j === this.allDetailTables_copy.length -1 ){
                console.log(`-----【${item.mainName}-${item.MainTableCode}】下-【${item.DetailTableCode}-${item.Name}】------在最初的所有明细表对象JSON.stringify(${this.allDetailTables_copy})中没有找到对应的明细表--------`)
              }
            }
          }
        }
        // console.log("------最终处理过的-allDetailTables_copy对象allDetailTables_copy-------", this.allDetailTables_copy)
        // 将最终的处理过的最新的 allDetailTables_copy 对象 存在localStorage中 
        localStorage.setItem('allDetailTables_copy_detailPage', JSON.stringify(this.allDetailTables_copy))
        // console.log("打印最终处理后的缓存中的所有明细表对象",JSON.parse(localStorage.getItem('allDetailTables_copy_detailPage')))
        debugger
      },

      // 全选行/取消全选行
      clickAllChecked() {
        debugger
        this.isAllChecked = !this.isAllChecked
        if(this.isAllChecked){
          this.currentDetailTableObj.Values.forEach((item, key) => {
            if(item[0].checked_set){
              item[0].checked_set = true
            }else {
              this.$set(item[0], 'checked_set', true)
            }
          })
          this.alreadyCheckedNum = this.currentDetailTableObj.Values.length
        }else {
          this.currentDetailTableObj.Values.forEach((item, key) => {
            if(item[0].checked_set){
              item[0].checked_set = false
            }else {
              this.$set(item[0], 'checked_set', false)
            }
          })
          this.alreadyCheckedNum = 0
        }
      },
      // 批量选中行
      checkedDetailLine (trObj, index) {
        debugger
        // 将该行对象中的第一列的数据添加一个 checked_set 的属性
        if(trObj[0].checked_set){
          trObj[0].checked_set = !trObj[0].checked_set
          if( this.alreadyCheckedNum > 0){
            this.alreadyCheckedNum -= 1 
          }
          if( this.alreadyCheckedNum === 0 ){
            this.isAllChecked = false
          }
        }else {
          this.$set(trObj[0], 'checked_set', true)
          this.alreadyCheckedNum += 1 
          if(this.alreadyCheckedNum>0){
            this.isAllChecked = true
          }
        }
      },
      // 批量删除已经勾选的行
      batchDeleteDetailLine () {
        debugger
        this.$confirm(`确认批量删除已勾选的[${this.alreadyCheckedNum}]行配置吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.currentDetailTableObj.Values = this.currentDetailTableObj.Values.filter((item, key) => {
            return !item[0].checked_set
          })
          this.currentDetailTableObj.Values.forEach((item, i) => {
            if(item[0].checked_set){
              item[0].checked_set = false
            }
          })
          this.alreadyCheckedNum = 0
          this.isAllChecked = false
        }).catch(() => {

        })
      },      
      // 删除明细表单行
      handleDelDetail (index) {
        this.$confirm('确认删除此行配置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let newObj_localStorage = localStorage.getItem("allDetailTables_copy_detailPage")
          if( newObj_localStorage ){
            // 缓存中有 所有主表下的所有明细表集合
            this.allDetailTables_copy = JSON.parse(newObj_localStorage)
          }else {
            // 缓存中没有
          }

          this.currentDetailTableObj.Values.splice(index, 1)
          // 删除行后
          this.detailTables_copy.forEach((item, key) => {
            if(item.DetailTableCode === this.currentDetailTableObj.DetailTableCode){
              item.Values = JSON.parse(JSON.stringify(this.detailTables_copy.Values))
            }
          })
          // 删除行后 
          this.allDetailTables_copy.forEach((item, key) => {
            if(item.DetailTableCode === this.currentDetailTableObj.DetailTableCode && item.MainTableCode === this.currentDetailTableObj.MainTableCode){
              item.Values = JSON.parse(JSON.stringify(this.detailTables_copy.Values))
            }
          })
          // 将 this.allDetailTables_copy 处理后 存入 localStorage
          localStorage.setItem("allDetailTables_copy_detailPage", this.allDetailTables_copy)
          console.log("删除行后，打印存入 缓存中的allDetailTables_copy ", this.allDetailTables_copy)

        }).catch(() => {

        })
      },
      // 取消
      handleClickCancel () {
        // 将当前主表下的所有明细表替换  缓存中的所有主表对应 主表名下的所有明细表
        let newObj_allDetailTables_localStorage = JSON.parse(localStorage.getItem("allDetailTables_copy_detailPage"))   
        if( newObj_allDetailTables_localStorage ){
          let length_allDetailTables = newObj_allDetailTables_localStorage.length
          if(this.detailTables_copy.length){
            this.detailTables_copy.forEach((item,key) => {
              for(let j=0;j<length_allDetailTables;j++){
                let item1 = newObj_allDetailTables_localStorage[j]
                if(item.MainTableCode === item1.MainTableCode && item.DetailTableCode === item1.DetailTableCode){
                  item1.Values = item.Values
                  break
                }
              }
            })
          }else {
            // 缓存中 没有所有明细表的数据 
            console.log("缓存中 没有所有明细表的数据 ")            
          } 
        }   
        // 将最新的数据存入 到缓存中
        localStorage.setItem("allDetailTables_copy_detailPage", JSON.stringify(newObj_allDetailTables_localStorage))        
        // this.allDetailTables = this.allDetailTables_copy
        this.$emit('detailTableCancel', newObj_allDetailTables_localStorage)
      },
      // 确定
      handleClickSure () {
        debugger
        // 将当前主表下的所有明细表替换  缓存中的所有主表对应 主表名下的所有明细表
        let newObj_allDetailTables_localStorage = JSON.parse(localStorage.getItem("allDetailTables_copy_detailPage"))   
        if( newObj_allDetailTables_localStorage ){
          let length_allDetailTables = newObj_allDetailTables_localStorage.length
          if(this.detailTables_copy.length){
            this.detailTables_copy.forEach((item,key) => {
              for(let j=0;j<length_allDetailTables;j++){
                let item1 = newObj_allDetailTables_localStorage[j]
                if(item.MainTableCode === item1.MainTableCode && item.DetailTableCode === item1.DetailTableCode){
                  item1.Values = item.Values
                  break
                }
              }
            })
          }  
        }else {
          // 缓存中 没有所有明细表的数据 
          console.log("缓存中 没有所有明细表的数据 ")
        }   
        
        // 将最新的数据存入 到缓存中
        localStorage.setItem("allDetailTables_copy_detailPage", JSON.stringify(newObj_allDetailTables_localStorage))
      
        let result = []
        if (this.detailTableList && this.detailTableList.length) {
          this.detailTableList.forEach(item => {
            result.push(this.checkFormArray(`detailForm${item.DetailTableCode}`))
          })
        }
        Promise.all(result).then(() => {
          // this.allDetailTables = this.allDetailTables_copy
          this.$emit('detailTableSure', newObj_allDetailTables_localStorage)
        }).catch(() => {
          this.$message.error('验证失败,请检查明细表中必填项是否填写完全')
        })
      },
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      },
      changeOrgDetailCmp (prop) {
        this.$refs[`detailForm${this.currentDetailTableCode}`].validateField(prop)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .detail-table-dialog /deep/
    .border-card
      .el-scrollbar__wrap
        margin-bottom: 0!important
        .el-form-item
          margin-bottom: 0!important
  table {
    border: 1px solid #dfe4ed;
    tbody {
      .trBox {
        .tdDelete {
          min-width 50px
          text-align center
        }
        .tdOnlyCode {
          min-width 30px
          text-align center
        }
        .tdBox {
          .componentBox {
            position relative
            .notCanEdit {
              position absolute
              top 0
              left 0
              right 0
              bottom 0
              margin 0 auto
              width 100%
              height 100%
              background-color rgba(0,0,0,.02)
              &:hover {
                cursor pointer
              }
            }
          }
        }
      }
    }
  }

  table tr th {
    padding 10px 0
    border 1px solid #dfe4ed
    border-top 2px solid #3b8be3
  }

  table tr td {
    min-width 300px
    padding 5px 10px
    border: 1px solid #dfe4ed;
  }

  table {
    border-collapse: collapse
  }

</style>
