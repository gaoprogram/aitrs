<!--
  User: gaol
  Date: 2019/11/11
  功能：平台系统设置——系统配置--菜单管理中的 排序组件
-->

<template>
    <div class="sortBox">
        <p style="color:red; font-size: 12px">注：拖动进行排序</p>
        <vuedraggable 
            class="wrapper" 
            v-model="draggerData"  
            v-bind="dragOptions"
        >
            <transition-group>
                <div 
                    v-for="(item, index) in draggerData"
                    :key="index+1"
                >
                    <el-menu class="el-menu-vertical-demo">
                        <el-menu-item>
                          <i class="el-icon-menu"></i>
                          <span slot="title">{{item.Title}}</span>
                        </el-menu-item>                        
                    </el-menu>
                </div>
            </transition-group>
        </vuedraggable>

      <save-footer @save="saveSort" @cancel="cancelSort"></save-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vuedraggable from 'vuedraggable'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    export default {
    components: {
       Vuedraggable,
       SaveFooter
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    computed:{
      dragOptions() {
        return {
          animation: 500,
          // group: "description",
          disabled: false,
          // ghostClass: "ghost"
        }
      }        
    },  
    created(){
        this.draggerData = JSON.parse(JSON.stringify(this.data))
    },   
    data(){
        return {
           draggerData: [], 
        }
    },
    methods: {
        saveSort(){
            debugger
            this.$emit("saveSort", this.draggerData)
        },
        cancelSort(){
            this.$emit("cancelSort", this.draggerData)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
