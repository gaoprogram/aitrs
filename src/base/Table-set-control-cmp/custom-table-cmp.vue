<!--
  User: xxxxxxx
  Date: 2019/1/8
  功能：系统字典表配置dialog弹框 被 sys-table-cmp 组件引用  （table-config中  单选下拉框基础组件设置部分中 点击“字典表配置”按钮后的自定义字典表弹框）
-->

<template>
  <div class="custom-table-cmp">
    <el-dialog
      title="自定义字典表"
      :visible.sync="dialogCustomTable"
      width="800px"
      :show-close="false"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-button type="primary" size="mini" @click.native="handleBatchSet" style="margin-bottom: 10px">配置</el-button>

      <el-table
        border
        ref="multipleTable"
        :data="optList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="State"
          label="选中"
          width="50"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.State"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          prop="index"
          width="50">
        </el-table-column>
        <el-table-column
          width="150"
          prop="Name"
          label="字典项">
        </el-table-column>
        <el-table-column
          prop="CheckState"
          label="默认选中"
          width="50"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.CheckState"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="Child"
          label="子类型"
        >
          <template slot-scope="scope">
            <span v-for="(row, index) in scope.row.Child" :key="row.Code">{{row.Name}}
              <span v-if="index !== scope.row.Child.length - 1">,</span>
            </span>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="currentChildSet = scope.row.Child; dialogChildSet = true"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <save-footer
        :isCancel="true"
        saveText="确认"
        @cancel="hanldeClickCancelCustomTable"
        @save="handleClickSaveCustomTable">
      </save-footer>
    </el-dialog>

    <!---自定义字典表中，点击了【配置】按钮后的dialog弹框---start-->
    <el-dialog
      title="批量设置字典项"
      :visible.sync="dialogBatchSet"
      width="600px"
      :show-close="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      custom-class="dialogBatchSet"
    >
      <div class="batch-set-container">
        <!---左边字典项类型部分---->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>字典项类型</span>
            <span style="font-size:10px;color:silver">双击可编辑名称</span>
          </div>

          <!-- <div class="tags">
            <el-tag
              :key="tag.Code"
              v-for="(tag, index) in optList"
              closable
              :type="currentIndex === index ? '' : 'info'"
              :disable-transitions="false"
              @click.native="handleClickTag(tag.Child, index)"
              @dblclick.native="dblclick(tag.Child, index)"
              @close="handleClose(index)">
              {{tag.Name}}
            </el-tag>

            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button  size="small" @click="showInput" class="button-new-tag">+ 新增字典项</el-button>
          </div> -->


          <!---gaoladd---start-->       
          <div class="tags">
            <el-tag
              :key="tag.Code"
              v-for="(tag, index) in optList"
              :type="currentIndex === index ? '' : 'info'"
              :disable-transitions="false"
              @click.native="handleClickTag(tag.Child, index)"
              @dblclick.native="dblclick(tag.Child, index)"
              @close="handleClose(index)">
              {{tag.Name}}
            </el-tag>

            <!--编辑字典项大类的input框 start--->
              <el-input
                class="editInput"
                v-show="editInputVisible"
                v-model="editInputValue"
                ref="editInput"
                :placeholder="currentEditTagName"
                size="small"
                @keyup.enter.native="editInputConfirm"
              >
              </el-input>
            <!--编辑字典项大类的input框 end--->

            <!--添加的input框start-->
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <!--添加的input框end-->

            <el-button  v-else size="small" @click="showInput" class="button-new-tag">+ 新增字典项</el-button>
          </div>   
          <!---gaoladd---end-->       
        </el-card>

        <!--右边字典项子类型部分--->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>字典项子类型</span>
            <span style="font-size:10px;color:silver">单击可编辑名称</span>
          </div>
          <div class="tags">
            <el-tag
              :key="tag.Code"
              v-for="(tag, index) in currentTagChild"
              type="info"
              :disable-transitions="false"
              @click.native="handleClickTagChild(tag.Child, index)"
              @close="handleCloseChild(index)">
              {{tag.Name}}
            </el-tag>

            <!--编辑字典项子类的input框 start--->
              <el-input
                class="editInput"
                v-show="editInputVisible_child"
                v-model="editInputValue_child"
                ref="editInput_child"
                :placeholder="currentEditTagName_child"
                size="small"
                @keyup.enter.native="editInputConfirmChild"
              >
              </el-input>
            <!--编辑字典项子类的input框 end--->            

            <el-input
              class="input-new-tag"
              v-if="inputVisibleChild"
              v-model="inputValueChild"
              ref="saveChildTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirmChild"
              @blur="handleInputConfirmChild"
            >
            </el-input>
            <el-button v-else size="small" @click="showChildInput" class="button-new-tag" :disabled="currentIndex !== null? false : true">+ 新增子类型</el-button>
          </div>
        </el-card>

      </div>

      <save-footer
        :isCancel="false"
        saveText="关闭"
        @save="dialogBatchSet = false">
      </save-footer>

    </el-dialog>
    <!---自定义字典表中，点击了【配置】按钮后的弹框---end-->

    <!---自定义字典表中，设置字典表 子类型的 弹框---start-->
    <el-dialog
      title="设置子类型"
      :visible.sync="dialogChildSet"
      width="300px"
      :show-close="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      custom-class="dialogBatchSet"
    >
      <div class="batch-set-container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>字典项子类型</span>
          </div>
          <div class="tags">
            <el-tag
              :key="tag.Code"
              v-for="(tag, index) in currentChildSet"
              type="info"
              :disable-transitions="false"
              @close="handleCloseChild(index)">
              {{tag.Name}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisibleChildSet"
              v-model="inputValueChildSet"
              ref="saveSetChildTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirmChildSet"
              @blur="handleInputConfirmChildSet"
            >
            </el-input>
            <el-button v-else size="small" @click="showSetChildInput" class="button-new-tag">+ 新增子类型</el-button>
          </div>
        </el-card>
      </div>

      <!---引用的通用的 底部 关闭-按钮组件-->
      <save-footer
        :isCancel="false"
        saveText="关闭"
        @save="dialogChildSet = false">
      </save-footer>

    </el-dialog>
    <!---自定义字典表中，设置字典表 子类型的 弹框---start-->
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      customSetObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      isMul: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        dialogCustomTable: true,
        dialogBatchSet: false,
        inputVisible: false,    // 控制 tag新增input 框的显示、隐藏
        inputVisibleChild: false,
        inputValue: '',    // 添加字典大类input的内容
        inputValueChild: '', // 添加字典子类 input的内容
        currentIndex: null,
        currentTagChild: [],
        dialogChildSet: false,
        currentChildSet: [],
        inputVisibleChildSet: false,
        inputValueChildSet: '',
        optList: [],
        editInputVisible: false, // 控制字典大类中编辑input框的显示隐藏
        editInputValue: '', // 控制字典大类中的编辑 input 框的value
        editInputIndex: -1, // 编辑的字典大类 tag 的index
        currentEditTagName: '', // 正在编辑的字典大类tag的名称
        editInputVisible_child: false, // 控制字典子类中编辑input框的显示隐藏
        editInputValue_child: '', // 控制字典子类中的编辑 input 框的value
        editInputIndex_child: -1, // 编辑的字典子类 tag 的index
        currentEditTagName_child: '' // 正在编辑的字典子类tag的名称
      }
    },
    created () {
      console.log('第一次', this.customSetObj, this.isMul)
      this.optList = JSON.parse(JSON.stringify(this.customSetObj.Ext.Opt))
    },
    methods: {
      // 表格切换选中
      handleSelectionChange () {
      },
      // 保存自定义字典表
      handleClickSaveCustomTable () {
        if (this.optList.length) {
          this.customSetObj.Ext.LimitOpt = []
          this.customSetObj.Ext.DefaultOpt = []
          this.optList.forEach(item => {
            console.log(item)
            if (item.State) {
              this.customSetObj.Ext.LimitOpt.push(item.Code)
            }
            if (item.CheckState) {
              this.customSetObj.Ext.DefaultOpt.push(item.Code)
            }
          })
          this.customSetObj.Ext.Opt = this.optList
        }
        if (!this.isMul && this.customSetObj.Ext.DefaultOpt.length > 1) return this.$message.warning('此控件默认选中有且只能选中1个')
        this.$emit('cancel')
      },
      // 取消
      hanldeClickCancelCustomTable () {
        debugger
        this.$emit('cancel')
      },
      // 点击设置按钮
      handleBatchSet () {
        this.dialogBatchSet = true
      },
      // 点击字典项大类tag
      handleClickTag (tag, index) {
        debugger
        console.log(tag, index)
        this.currentTagChild = tag
        this.currentIndex = index

        // // 控制编辑框的显示、隐藏
        // this.editInputVisible = true
        // // this.$message('被单击了')
        // // 将点击的index 复制给editInputIndex
        // this.editInputIndex = index
        // // 将点击的 tag 的名称赋值给 currentEditTagName
        // this.currentEditTagName = this.optList[this.editInputIndex].Name
      },

      // 点击字典项子类tag
      handleClickTagChild (tag, index) {
        debugger
        console.log(tag, index)
        // this.currentTagChild = tag
        this.currentIndex_child = index

        // 控制编辑框的显示、隐藏
        this.editInputVisible_child = true
        // this.$message('被单击了')
        // 将点击的index 复制给editInputIndex
        this.editInputIndex_child = index
        // 将点击的 tag 的名称赋值给 currentEditTagName
        this.currentEditTagName_child = this.currentTagChild[this.editInputIndex_child].Name
      },
      // 双击字典父类tag 进行编辑
      dblclick (tag, index) {
        debugger
        console.log(tag, index)
        this.currentTagChild = tag
        this.currentIndex = index

        // 控制编辑框的显示、隐藏
        this.editInputVisible = true
        // this.$message('被双击了')
        // 将点击的index 复制给editInputIndex
        this.editInputIndex = index
        // 将点击的 tag 的名称赋值给 currentEditTagName
        this.currentEditTagName = this.optList[this.editInputIndex].Name
      },
      // 保存批量设置
      handleClickSaveBatchSet () {
      },
      // 删除字典项tag
      handleClose (index) {
        this.optList.splice(index, 1)
      },
      // 删除字典项子类型tag
      handleCloseChild (index) {
        this.currentTagChild.splice(index, 1)
      },
      // 点击新增字典项
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 点击新增字典项子类型
      showChildInput () {
        this.inputVisibleChild = true
        this.$nextTick(_ => {
          this.$refs.saveChildTagInput.$refs.input.focus()
        })
      },
      showSetChildInput () {
        this.inputVisibleChildSet = true
        this.$nextTick(_ => {
          this.$refs.saveSetChildTagInput.$refs.input.focus()
        })
      },
      // 保存编辑字典大类tag名称（按下 enter键）
      editInputConfirm () {
        debugger
        // this.editInputVisible = false
        // 修改this.optList 中对应tag 的Name

        console.log('编辑的名称-----》', this.optList[this.editInputIndex]['Name'])
        console.log('需要修改成为-----》', this.editInputValue)
        try {
          this.optList[this.editInputIndex]['Name'] = this.editInputValue
        } catch (error) {
  
        }
        // this.currentEditTagName = this.editInputValue
        // 隐藏编辑input框
        this.editInputVisible = false
        this.editInputIndex = -1
        this.editInputValue = ''
      },
      // 保存编辑字典子类tag名称（按下 enter键）
      editInputConfirmChild () {
        debugger
        // this.editInputVisible = false
        // 修改this.optList 中对应tag 的Name

        console.log('编辑的名称-----》', this.currentTagChild[this.editInputIndex_child]['Name'])
        console.log('需要修改成为-----》', this.editInputValue_child)
        try {
          this.currentTagChild[this.editInputIndex_child]['Name'] = this.editInputValue_child
        } catch (error) {
  
        }
        // this.currentEditTagName = this.editInputValue
        // 隐藏编辑input框
        this.editInputVisible_child = false
        this.editInputIndex_child = -1
        this.editInputValue_child = ''
      },

      // 新增tag时，input框 失焦或者 按下enter键后
      handleInputConfirm () {
        debugger
        let inputValue = this.inputValue
        if (inputValue) {
          let code = this.setCode(this.optList)
          this.optList.push({
            Code: code,
            Name: inputValue,
            State: true,
            CheckState: false,
            SortId: 1,
            Child: []
          })
        }
        // 隐藏添加的input框
        this.inputVisible = false
        this.inputValue = ''
      },
      handleInputConfirmChild () {
        let inputValueChild = this.inputValueChild
        if (inputValueChild) {
          this.currentTagChild.push({
            Code: this.setCode(this.currentTagChild),
            Name: inputValueChild,
            State: true,
            CheckState: false,
            SortId: 1
          })
        }
        this.inputVisibleChild = false
        this.inputValueChild = ''
      },
      handleInputConfirmChildSet () {
        let inputValueChildSet = this.inputValueChildSet
        if (inputValueChildSet) {
          this.currentChildSet.push({
            Code: this.setCode(this.currentChildSet),
            Name: inputValueChildSet,
            State: true,
            CheckState: false,
            SortId: 1
          })
        }
        this.inputVisibleChildSet = false
        this.inputValueChildSet = ''
      },
      setCode (arr) {
        let code
        if (arr.length) {
          code = parseInt(arr[arr.length - 1].Code) + 1
        } else {
          // 为了避免code重复，从父code+00开始
          code = parseInt(this.currentIndex + 1 + '00')
        }
        return code.toString()
      }
    },
    watch: {
      customSetObj: {
        handler (newValue, oldValue) {
          console.log('自定义', newValue)
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:customSetObj', newValue)
        },
        deep: true
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dialogBatchSet
    .batch-set-container
      display flex
      .el-card
        flex 1
        >>>.el-card__body
            position relative !important
            .tags
              display flex
              flex-direction column
              width 150px
              .el-tag
                margin-bottom 6px
              .el-tag--info
                background-color: #ffffff
              .editInput
                position absolute
                top 20px
                right 0
                width 100px
</style>
