<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：地点
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <el-input disabled style="width: 250px" size="mini" v-model="obj.FieldValue.LocationName" placeholder="请选择地点"></el-input>
    <el-button type="primary" class="selecetMapBtn" size="small" icon="el-icon-plus" @click.native="showMap = true"></el-button>
    <!--引用百度地图的组件---start-->
    <map-cmp v-if="showMap" @cancelLocation="showMap = false" @saveLocaltion="handleSaveLocaltion" :obj="obj.FieldValue"></map-cmp>
    <!--引用百度地图的组件---end-->
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import MapCmp from '../Map-cmp/dialog-map'
  export default {
    props: {
      prop: {
        type: String,
        default: ''
      },
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {

        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && (!this.obj.FieldValue.LocationName)) {
              callback(new Error('请选择' + this.obj.FieldName))
            } else {
              callback()
            } 
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && (!this.obj.FieldValue.LocationName)) {
            callback(new Error('请选择' + this.obj.FieldName))
          } else {
            callback()
          }
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          type: 'array',
          validator: validatePass,
          trigger: ['change']
        },
        showMap: false
      }
    },
    created () {
    },
    methods: {
      handleSaveLocaltion (localtion) {
        console.log(localtion)
        this.showMap = false
        this.obj.FieldValue = localtion
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    },
    components: {
      MapCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .base-input-container
    display: flex;
    align-items: center;
    width: 300px;
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-input
      width 200px
</style>
