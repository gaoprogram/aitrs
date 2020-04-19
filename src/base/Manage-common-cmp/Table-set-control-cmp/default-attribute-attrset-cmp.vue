<!--
  User: gaol
  Date: 2019/7/23
  功能：table-config页面中 右边组件设置区域的 默认属性设置项 点击 数据联动后的弹框设置基础组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .default-attributeSet-cmp
    min-height 200px
    padding 20px !important
    .relativeData /deep/
      display flex
      justify-content flex-start
      align-items center  
      .el-form-item
        width 100%
        .el-select
          width 70% !important     
    .middleValueBox /deep/
      display flex
      justify-content flex-start
      align-items center 
      .el-form-item
        margin 15px 5px 0 10px
      .middleTit
        line-height 16px
        margin 15px 5px 0 0 
      .addAndDelBox
        .add
          font-size 20px
          margin-top 15px
          color rgba(76,164,255,1)
          &:hover 
            cursor pointer
            color rgba(76,164,255,0.3)
        .delete
          font-size 20px
          margin-top 15px
          color rgba(76,164,255,1)
          &:hover
            cursor pointer
            color rgba(76,164,255,0.3)
    .bottomValueBox /deep/
      display flex
      justify-content flex-start
      align-items center 
      .el-form-item
        margin 15px 5px 0 10px
      .bottomTit
        line-height 16px
        margin 15px 5px 0 0 
</style>

<template>
    <div class="default-attributeSet-cmp">
        <el-form ref="form"  label-position="left"  :model="relationAttrSetObj" label-width="100px" size="mini">
            <div class="relativeData">
                <el-form-item label="数据关联表">
                    <el-select v-model="relationAttrSetObj">
                        <el-option label="" value="武汉">

                        </el-option>
                    </el-select>
                </el-form-item>
            </div>

            <div 
              class="middleValueBox" 
              v-for="(middleItem,index) in middleData"
            >
                <el-form-item label-width="0">
                    <el-select v-model="relationAttrSetObj">
                        <el-option label="" value="武汉">

                        </el-option>
                    </el-select>
                    <span class="middleTit">值等于</span>
                </el-form-item>  

                <el-form-item label-width="0">
                  <el-select v-model="relationAttrSetObj">
                      <el-option label="" value="武汉">

                      </el-option>
                  </el-select>
                  <span class="middleTit">的值时</span>  
                </el-form-item>                  

                <span class="addAndDelBox">
                  <i class="el-icon-circle-plus-outline add" 
                    v-if="index === middleData.length-1"
                    @click="addMiddleData">
                  </i>
                  <i class="el-icon-remove-outline delete"
                     v-if="middleData.length>1"
                     @click="deleteMiddleData(index)">
                  </i>
                </span>       
            </div>

            <div class="bottomValueBox">
              <el-form-item label-width="0">
                <el-select v-model="relationAttrSetObj">
                  <el-option label="" value="shanghai">

                  </el-option>
                </el-select>
                <span class="bottomTit">联动显示为</span>
              </el-form-item>

              <el-form-item label-width="0">
                <el-select v-model="relationAttrSetObj">
                  <el-option label="" value="shanghai">

                  </el-option>
                </el-select>
                <span class="bottomTit">的对应值</span>              
              </el-form-item>
            </div>
        </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicCollection } from '@/api/permission'
  import { getParentDic, getDicWithConfig } from '@/api/common-dic'

  import { mapGetters } from 'vuex'
  export default {
    props: {
      relationAttrSetObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {

    },      
    data () {
      return {
        middleData: [
          {

          },
        ]
      }
    },
    computed: {
      ...mapGetters([
        'currentFieldStore',
        'currentFieldsStore'
      ]),

    },
    watch: {
      relationAttrSetObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:relationAttrSetObj', newValue)
        },
        deep: true
      }
    },  
    created () {

    },
    methods: {
      // 添加
      addMiddleData() {
        this.middleData.push({

        })
      },
      // delete
      deleteMiddleData (idx) {
        this.middleData.splice(idx,1)
      }
    }
  }
</script>

