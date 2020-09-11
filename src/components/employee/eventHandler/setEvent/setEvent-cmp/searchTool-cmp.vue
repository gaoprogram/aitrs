<!--
  User: gaol
  Date: 2019/11/14
  功能： 员工——事件处理器——执行事件  搜索栏组件  
-->
<style lang="stylus" ref="stylesheet/stylus" scope>

</style>
<template>
    <div class="searchBox u-f-ac">
        <div class="item u-f-ac u-f-jsb">
            <span class="u-f0 marginR5">关键词</span>
            <el-input 
                clearable
                v-model="queryObj.KeyWord"
                placeholder="姓名、组织、职务、职位、编码"
            ></el-input>
        </div>

        <!-- queryObj:{{queryObj}} -->
        <!-- <div class="item u-f-ac u-f-jsb marginL10">
            <span class="u-f0 marginR5">省</span>
            <el-select clearable v-model="queryObj.Province">
                <el-option 
                    v-for="(province, key) in ProvinceList"
                    :key="key"
                    :label="province.Name"
                    :value="province.Id"
                    >
                </el-option>
            </el-select>
        </div>  

        <div class="item u-f-ac u-f-jsb marginL10">
            <span class="u-f0 marginR5">市</span>
            <el-select clearable v-model="queryObj.City">
                <el-option 
                    v-for="(city, key) in CityList"
                    :key="key"
                    :label="city.Name"
                    :value="city.Id"
                    >
                </el-option>
            </el-select>
        </div>  

        <div class="item u-f-ac u-f-jsb marginL10">
            <span class="u-f0 marginR5">区/县</span>
            <el-select clearable v-model="queryObj.Area">
                <el-option 
                    v-for="(area, key) in AreaList"
                    :key="key"
                    :label="area.Name"
                    :value="area.Id"
                    >
                </el-option>
            </el-select>
        </div>                   -->

        <div class="item u-f-ac u-f-jsb marginL10">
            <!-- eventNameOptions: {{eventNameOptions}} -->
            <span class="u-f0 marginR5">事件名称</span>
            <el-select 
                clearable
                v-model="queryObj.EventCode"
                placeholder="事件名"
            >
                <el-option 
                    v-for="(item, key) in eventNameOptions"
                    :key="key"
                    :value="item.EventCode"
                    :label="item.EventName"
                >
                    
                </el-option>            
            </el-select>
        </div>  


        <!-- <div class="item u-f-ac u-f-jsb marginL10">
            <span class="u-f0 marginR5">规模</span>
            <el-input 
                clearable
                v-model="queryObj.companyScope"
                placeholder="规模"
            ></el-input>
        </div>   

        <div class="item u-f-ac u-f-jsb marginL10">
            <span class="u-f0 marginR5">企业性质</span>
            <el-input 
                clearable
                v-model="queryObj.natureType"
                placeholder="企业性质"
            ></el-input>
        </div>    -->

        

        <div class="item u-f-ac u-f-jsb marginL10">
            <span class="u-f0 marginR5">创建日期</span>
            <el-date-picker
                @change="changeDateRange()"
                v-model="dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>    

        <div class="item u-f-ac u-f-jsb marginL10">
            <span class="u-f0 marginR5">状态</span>
            <el-select 
                v-model="queryObj.State">
                <el-option
                    v-for="(item, key) in stateOptions"
                    :key="key"
                    :value="item.Value"
                    :label="item.label"
                >
                </el-option>
            </el-select>
        </div>                 

        <div class="item marginL10">
            <el-button 
                type="primary" 
                @click.native="handlerSearch"
            >搜索</el-button>
        </div>                
    </div>
</template>

<script type="text/ecmascript-6">
import { REQ_OK } from '@/api/config'
// import {
//     GetAreaList 
// } from '@/api/systemManage'
import { 
    getEventDisposeList 
} from '@/api/employee'
export default {
    components: {

    },
    data(){
        return { 
           dateRange: [], 
           queryObj: {
            KeyWord: '',  //关键词
            EventCode: '', // 事件码
            OPDateFrom: '', // 起始操作时间
            OPDateTo: '', // 结束操作时间
            OP: '', // 操作人
            State: 1, // 状态，多选 0未执行 1已执行 -1执行失败
            pageSize: 10,
            pageNum: 1,                        
           },
           ProvinceList:[],
           CityList:[],
           AreaList: [],
           eventNameOptions: [],
           stateOptions: [
               {
                   value: 0, 
                   label: '未执行'
               },
               {
                   value: 1, 
                   label: '已执行'                   
               },
               {
                   value: -1, 
                   label: '执行失败'                      
               }
           ]
        }
    },
    watch: {
        'queryObj.Province': {
            handler(newValue, oldValue){
                // 清空 市  区 
                this.queryObj.City = ''
                this.queryObj.Area = ''
                this._GetAreaList(newValue).then(res => {
                    this.CityList = res
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        'queryObj.City':{
            handler(newValue, oldValue){
                //清空 区
                this.queryObj.Area = ''
                this._GetAreaList(newValue).then(res => {
                    this.AreaList = res
                }).catch(error => {
                    console.log(error)
                })
            }            
        }        
    },
    mounted(){
        // // 获取省
        // this._GetAreaList('').then(res => {
        //     this.ProvinceList = res
        // }).catch((error) => {
        //     console.log(error)
        // })     
    },
    created(){
        // 获取搜索事件名的下拉数据源
        this._getEventDisposeList()
    },
    methods: {
        // 获取省市
        _GetAreaList(ParentId){
            return new Promise((resolve, reject) => {
                GetAreaList(this.companyCode, this.token, this.userCode, ParentId).then(res => {
                    if(res && res.data.State === REQ_OK){
                        resolve (res.data.Data)
                    }else {
                        this.$message.error(`获取省市区数据源失败,${res.data.Error}`)
                        reject(`获取省市区数据源失败,${res.data.Error}`)
                    }
                })
            })
        },     
        // 获取事件名
        _getEventDisposeList(){
            getEventDisposeList(65533, 1).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.eventNameOptions = res.data.Data
                }else {
                    this.$message.error(`获取事件名称下拉源数据失败,${res.data.Error}`)
                }
            })
        },
        _getComTables(){
            
        },
        // 搜索
        handlerSearch(){
            debugger
            this.$emit("clickSearchBtn", this.queryObj)
        },
        changeDateRange(){
            debugger
            if (this.dateRange && this.dateRange.length) {
                this.queryObj.OPDateFrom = this.dateRange[0].toLocaleDateString()
                this.queryObj.OPDateTo = this.dateRange[1].toLocaleDateString()
            } else {
                this.queryObj.startDate = ''
                this.queryObj.endDate = ''
            }            
        }
    }
}
</script>