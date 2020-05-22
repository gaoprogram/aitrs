<!--
  User: gaol
  Date: 2019/6/12
  功能： 节点设置——基础设置——同步——执行顺序排序页面
-->

<template>
      <el-dialog
        title="接口执行顺序"
        width="500px"
        :append-to-body="true"
        :close-on-click-modal="false"
        :show-close="false"
        :visible="true" 
      >
        <!-- <div class="showTit">提示：不建议改变领域名，会影响相关数据。即使更改也请保持同原业务领域类别保持一致，仅对名称进行重命名。</div> -->
        <div class="containerBox" v-loading="sortLoading">
          <div class="TipBox">
            <span class="sortTipTit">拖拽排序</span>
          </div>
          <!-- {{tableData_dialog}} -->
          <vuedraggable class="wrapper" v-model="tableData_dialog"  :options = "{animation:500}">
              <transition-group>
                <div  v-for="(obj, index) in tableData_dialog" :key="index+1" class="itemBox">
                      <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                      >
                        <el-menu-item index="2">
                          <i class="el-icon-menu"></i>
                          <span slot="title">{{obj.Interface || '暂无'}}</span>
                        </el-menu-item>
                      </el-menu>
                  <!-- <el-input 
                    v-show=" editTeamNameIndex!=-1 && index == editTeamNameIndex"
                    class="sort-cart-item"
                    v-model="rename"
                  >
                  </el-input> -->
                  <!-- <div class="editAndDelet">
                    <span class="edit" v-show="(index != editTeamNameIndex)" @click="handleEditTeam(index)">编辑</span>
                    <span class=" EditCancel" v-show="(index == editTeamNameIndex)" @click="editTeamNameIndex = -1">取消</span>
                    <span class=" EditSave" v-show="(index == editTeamNameIndex)" @click="handleSaveTeamName">保存</span>
                  </div> -->
                </div>
              </transition-group>              
          </vuedraggable>

          <div class="dialog-footer" style="display: block; padding: 10px 0; text-align: center">
            <el-button @click.native="cancelSort()">取 消</el-button>
            <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" type="primary" @click.native="SaveSortNode()">保存</el-button>
          </div>
        </div>
      </el-dialog>  
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    saveSyncSetting
  } from '@/api/approve'
  import Vuedraggable from 'vuedraggable'
  export default {
    props: {
      tableData: {
        type: Array,
        default: () => {
          return []
        }
      },
      sortDialogShow: {
        type: Boolean,
        default: false
      },
      nodeId: {
        type: '',
        default: ''
      }
    },
    data () {
      return {
        tableData_dialog: this.tableData,
        sortDialogShow_dialog: this.sortDialogShow,
        sortLoading: false
      }
    },
    created () {
    },
    mounted () {

    },
    updated () {
      // this.$emit('update:tableData', this.tableData)
    },
    components: {
      Vuedraggable
    },
    computed: {

    },
    watch: {
      sortDialogShow_dialog: {
        handler (newValue, oldValue) {
          // 父组件通过.sync 传值，数据变化时进行数据的双向绑定
          this.$emit('update:sortDialogShow', newValue)
        },
        deep: true
      },
      tableData_dialog: {
        handler (newValue, oldValue) {
          // 父组件通过.sync 传值，数据变化时进行数据的双向绑定
          this.$emit('update:tableData', newValue)
        },
        deep: true
      }
    },
    methods: {
      _saveSyncField () {
        return new Promise((resolve, reject) => {
          return saveSyncSetting(this.nodeId, JSON.stringify(this.tableData_dialog)).then(res => {
            debugger
            this.sortLoading = false
            if (res && res.data.State === REQ_OK) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            }
            resolve()
          }).catch(() => {
            this.sortLoading = false
            this.$message({
              type: 'error',
              message: '保存失败err,请重试'
            })
            reject()
          })
        })
      },
      // 节点拖拽排序保存
      SaveSortNode () {
        debugger
        // 修改 拖拽后，当前tableData 中item 的step 的值
        // this.tableData.forEach((item, idx) => {
        //   item.step = ++idx
        // })
        this.sortLoading = false

        this._saveSyncField().then(res => {
          debugger
          this.sortDialogShow_dialog = false
        })
      },
      cancelSort () {
        // 因为 watch 中坚挺了 dialogSortNode_dialog 的变化，触发父组件中对应的数据双向更新
        this.sortDialogShow_dialog = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-dialog__body
  padding 10px 20px !important
  .el-loading-mask
    top -50px !important
</style>
