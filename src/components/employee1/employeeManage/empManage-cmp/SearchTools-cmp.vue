<!--
  User: gaol
  Date: 2019/8/9
  功能： 员工-在职员工、待入职员工、离职员工页面的 搜索组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

   
</style>
<template>
  <div class="searchTools-cmp">
      <div class="searchCoditions">
          <el-button>精确搜索</el-button>
          <el-button>模糊搜索</el-button>
          <div class="tip">最多可以选择三个</div>
      </div>

      <div class="main">
        <el-card>
            <el-form :label-position="labelPosition" label-width="80px" :model="formSearchObj">
                <el-form-item label="员工号">
                    <el-input v-model="formSearchObj.empNo"></el-input>
                </el-form-item>
                <el-form-item label="中文姓名">
                    <el-input v-model="formSearchObj.name"></el-input>
                </el-form-item>
                <el-form-item label="组织">
                    <el-input v-model="formSearchObj.org"></el-input>
                </el-form-item>
                <el-form-item label="岗位">
                    <el-input v-model="formSearchObj.position"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="formSearchObj.type" placeholder="请选择员工类型">
                            <el-option label="正式员工" value="zhengshi"></el-option>
                        <el-option label="合同用工" value="hetong"></el-option>
                        <el-option label="临时用工" value="linshi"></el-option>
                    </el-select>
                </el-form-item>     
                <el-form-item label="状态">
                    <el-select v-model="formSearchObj.status" placeholder="请选择员工状态">
                        <el-option label="在职" value="zaizhi"></el-option>
                        <el-option label="离职" value="lizhi"></el-option>
                    </el-select>
                </el-form-item>     

                <div class="more" v-if="showMoreSearch && showMoreSearch.length">
                    <el-link icon="el-icon-edit" @click.native="handlerShowMoreSearch">{{isShowMoreConditions ? '展开更多': '收起更多'}}</el-link>
                    <!-- <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link> -->
                    <div class="moreList" v-show="isShowMoreConditions">
                        <el-input v-for="(item,key) in showMoreSearch" :key="key" :value="item">{{item.label}}</el-input>
                    </div>
                </div>                              
            </el-form>      
        </el-card>       
      </div>

      <div>
        <save-footer @cacel="cacelSearch" @save="saveSearch"></save-footer>  
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    export default {
        components: {
            SaveFooter
        },
        props: {
            showMoreSearch: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data(){
            return {
                labelPosition: 'right',
                formSearchObj: {
                    empNo: '',   
                    name:'',
                    org: '',
                    position: '',
                    type: '',
                    status: ''
                },
                isShowMoreConditions: false, // 跟多搜索条件 list 的显示/隐藏
            }
        },
        created() {

        },
        methods: {
            // 点击展开跟多搜索条件
            handlerShowMoreSearch() {
                this.isShowMoreConditions = !this.isShowMoreConditions
            },
            cacelSearch() {

            },
            saveSearch(){

            }
        }
    }
</script>
