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
                v-model="queryObj.key"
                placeholder="姓名、组织、职务、职位、编码"
            ></el-input>
        </div>

        <div class="item u-f-ac u-f-jsb marginL10">
            <span class="u-f0 marginR5">事件名称</span>
            <el-select 
                clearable
                v-model="queryObj.businessType"
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
import {
    GetAreaList 
} from '@/api/systemManage'
export default {
    components: {

    },
    data(){
        return { 
           dateRange: [], 
           queryObj: {
            key: '', //关键词
            Province: '', // 省id
            City: '', //城市id
            Area: '', // 区id
            businessType: '', // 行业
            companyScope:'', // 人员规模
            natureType: '', // 企业性质
            startDate: '', //开始日期
            endDate: '', // 结束日期
            state: '', // 状态，0冻结 1激活 默认-1全部
            pageSize: 10,
            pageNum: 1,                        
           },
           ProvinceList:[],
           CityList:[],
           AreaList: [],
           eventNameOptions: []
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
        // 获取省
        this._GetAreaList('').then(res => {
            this.ProvinceList = res
        }).catch((error) => {
            console.log(error)
        })     
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
                this.queryObj.startDate = this.dateRange[0].toLocaleDateString()
                this.queryObj.endDate = this.dateRange[1].toLocaleDateString()
            } else {
                this.queryObj.startDate = ''
                this.queryObj.endDate = ''
            }            
        }
    }
}
</script>