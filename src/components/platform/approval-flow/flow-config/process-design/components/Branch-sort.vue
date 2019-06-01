<!--
  User: gaol
  Date: 2019/5/28
  功能： 流程设计——简洁设计——分支排序   ruleObj.Branches
-->

<template>
  <el-dialog
    title="分支排序"
    width="600px"
    :visible="true"
    custom-class="dialog-item"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
  >
    <div v-loading="loading">
      <!-- objList: {{objList}} -->
      <!-- branchesList: {{branchesList}} -->
      <div class="textTip">拖拽排序</div>
      <vuedraggable class="wrapper" v-model="branchesList"  :options = "{animation:500}">
        <transition-group>
          <div  v-for="(obj, index) in branchesList" :key="index+1" class="inputItemBox">

            <!-- <el-tag type="success" v-show="index != editTeamNameIndex">{{team.TeamName}}—— {{team.Fields.length}}</el-tag> -->
                <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                >
                  <!-- <el-submenu index="1"> -->
                    <!-- <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>{{team.TeamName}}({{team.Fields.length}})</span>
                    </template> -->
                    <el-menu-item index="2">
                      <i class="el-icon-menu"></i>
                      <span slot="title">{{obj.Condition.Name}}</span>
                    </el-menu-item>

                      <!-- <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                      </el-menu-item-group>
                      <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                      </el-submenu> -->

                    <!-- </el-submenu> -->
                </el-menu>

            <!-- <el-input 
              v-show=" editTeamNameIndex!=-1 && index == editTeamNameIndex"
              class="sort-cart-item"
              v-model="rename"
            >
              <i class="el-icon-s-unfold"></i>
            </el-input>

            <div class="editAndDelet">
              <span class="edit" v-show="(index != editTeamNameIndex)" @click="handleEditTeam(index)">编辑</span>
              <span class="delet" v-show="(index != editTeamNameIndex)" @click="handleDelTeam(team.TeamCode)">删除</span>
              <span class=" EditCancel" v-show="(index == editTeamNameIndex)" @click="editTeamNameIndex = -1">取消</span>
              <span class=" EditSave" v-show="(index == editTeamNameIndex)" @click="handleSaveTeamName">保存</span>
            </div> -->
            
          </div>
        </transition-group>              
      </vuedraggable>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cacelSort()">取消</el-button>
        <el-button @click="saveSort()" type="primary">保存</el-button>
      </div>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import Vuedraggable from 'vuedraggable'

  import {
    saveFlowStarter
  } from '@/api/approve'

  export default {
    props: {
      objList: {
        type: Array,
        default: () => {
          return []
        }
      },
      sortBranchShow: {
        type: Boolean,
        default: false
      }
    },
    components: {
      SaveFooter,
      Vuedraggable
    },
    data () {
      return {
        loading: false,
        branchesList: this.objList
      }
    },
    created () {
    },
    mounted () {

    },
    computed: {
      // branchesList () {
      //   return this.objList
      // }
    },
    methods: {
      // 取消
      cacelSort () {
        // 双向数据绑定时（父组件传值时，要用 .sync 来修饰） 可以用这种方法来触发父组件 更新数据
        this.$emit('update:sortBranchShow', false)
      },
      // 保存排序
      saveSort () {
        // debugger
        this.branchesList.forEach((item, i) => {
          item.PRI = ++i 
        })
        this.$emit('saveSort', this.branchesList)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
