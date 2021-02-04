/**
 *  基础控件公共部分
 */
import { validateViewAuth } from '@/utils/validate'
import { fieldEventObj } from '@/utils/fieldEvent'
import {
  getEventResult
} from '@/api/systemManage.js'
export const commonFiledsViewFns = {
    props: {
      //是否需要disable
      disableFlag: {
        type: Boolean,
        default: false  // 默认不disable
      },
      // 是否需要 触发其他字段的事件
      fieldEventFlag: {
        type: Boolean,
        default: true  // 默认触发       
      }
    },
    data(){
      return {
        copyObj: {},
        dataSource: [],
        // control1: 字段1完成或者符合逻辑条件值,跳转到字段6,中间字段隐藏
        // control2: 字段1符合逻辑条件值，字段6只能选择A1,A2
        // control3: 字段1 符合逻辑条件值，跳转到字段6, 中间字段隐藏
        // control4: 字段1符合逻辑条件值，字段6赋值为Y
        resAuth: {
          "addViewShow": 1,  // 新增视图是否   1 和 0 区分
          "editViewShow": 1,  // 编辑视图是否可见   1 和 0 区分    
          "scanViewShow": 1,  // 查看视图是否可见   1 和 0 区分  
          "addorEditViewEdit": 1,  // 新增/编辑视图是否可编辑   1 和 0 区分                          
          "scanViewEncry": 0,  // 查看视图是否加密   1 和 0 区分
        },         
        RequiredSvg: 'require',
        eventTypeResult: [], // 字段配置的事件规则数据信息(一个字段配置的可以影响多个字段)
        beforeConvalue: this.obj.convalue,  
        // beforeDataSource: JSON.parse(JSON.stringify(this.dataSource)),  
        beforeDataSource: [],  
        // beforeHasShow: JSON.parse(JSON.stringify(this.isShowField)),  
        beforeHasShow: 1,  
        fieldEventOnInfo: [  // 存储每次响应字段事件后的所有对象信息
          // {
          //   triggertype,  
          //   conditions,
          //   conditionValue,
          //   unicode,
          //   resultcondition,
          //   resultValue,
          //   para,  
          //   resultcode,
          //   targetUnicode,  // 目标code
          //   calculateInfoObj, 
          //   calculateDoway,   // 操作方式 1 隐藏  2 数据源修改  3 修改值
          //   calculateRelation_sign,   // 计算关系            
          //   hasConvalueChanged: false, // 此次事件是否已经触发convalue值改变了
          //   hasHide: false, //  此次事件是否已经触发隐藏了   
          //   hasDataSourceChanged: false, //  此次事件是否已经触发 数据源datasource改变了
          //   beforeConvalue: '',    //     此次事件 触发前的convalue值
          //   afterConvalue: '',  // 此次事件 触发后的convalue值
          //   beforeDataSource: '',    //     此次事件 触发前的dataSource值
          //   afterDataSource: '',    //     此次事件 触发后的dataSource值
          //   beforeHasShow: '',    //     此次事件 触发前的hasHide值
          //   afterHasHide: '',    //     此次事件 触发后的hasHide值
          // }
        ], 
        fieldEventEmitInfo: [  // 存储每次触发字段事件后的相关信息
          // {
          //   from:unicode,
          //   to: targetUnicode,
          //   calculateDoway: calculateDoway,
          //   triggertype,  
          //   conditions,
          //   conditionValue,
          //   unicode,
          //   resultcondition,
          //   resultValue,
          //   para,  
          //   resultcode 
          // }          
        ]
      }
    },    
    computed: {
        // label 的样式
        fieldLabelStyle(){
          // return `color: ${this.lablestyle.color}; width: ${this.lablestyle.width}px`
          if(this.isTitle){
            return 'width: 100px'
          }else {
            return 'width: 0'
          }
        },
        // 控件的样式
        fieldValueWrapStyle(){
          // if(this.obj.showstyle.width){
          //   return `${this.obj.showstyle.width}px`
          // }else {
          //   return `width: calc(100% - ${this.obj.lablestyle.width}px)`
          // }
          if(this.isTitle){
            return `width: calc(100% - 100px)`
          }else {
            return `width: 100%`
          }
        },
        // 是否显示字段
        isShowField(){
          // {
          //   "addViewShow": str.split("")[0],  // 新增视图是否   1 和 0 区分          
          //   "editViewShow": str.split("")[1],  // 编辑视图是否可见   1 和 0 区分
          //   "scanViewShow": str.split("")[2],  // 查看视图是否可见   1 和 0 区分
          //   "addorEditViewEdit": str.split("")[3],  // 新增/编辑视图是否可编辑   1 和 0 区分
          //   "scanViewEncry": str.split("")[4],  // 查看视图是否加密   1 和 0 区分
          // }
  
          // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
          switch(this.viewType){
            case 'View-TM':  //查看页面 
            case 'View-SH':
            case  '3001':
              // this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))            
              return true
            case  'Add-TM':  // 新增页面
            case  'Add-SH':  
            case  '3002':
              if(this.obj.Vr) {
                // 视图的 显示编辑权限
                // this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))
                return this.resAuth.addViewShow == 1 ? true: false
              } 
            case  'Edit-TM': // 编辑页面
            case  'Edit-SH': 
            case  '3003': 
            case  '3005': 
              if(this.obj.Vr) {
                // 视图的 显示编辑权限
                // this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))
                // debugger
                // alert(222222)
                return this.resAuth.addViewShow == 1 ? true: false
              } 
            default:
              // 默认情况下 都显示字段
              return true
          }
        }, 
        // 是否加密显示字段
        isPassWordField(){
          // return this.resAuth.scanViewEncry == 1 ? true: false
          return false
        }, 
        // 是否 disable的显示
        isDisabledField(){
          return (this.disableFlag || this.obj.Readonly || (this.resAuth.addorEditViewEdit == 1 ? false : true))
        },
        linkEventUnicode(){
          return this.obj.linkevent ? (this.obj.linkevent.split(",")) : false
        }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去，利用的是数据的双向绑定，父组件通过 .sync 向子组件传值，此方法会实现数据的双向绑定
          this.$emit('update:obj', newValue)
        },
        deep: true,
        // immediate: true,
      },
      // 监听 值的变化 然后进行 触发相应的字段事件
      'obj.convalue': {
        handler(newValue, oldValue){
          debugger
          // 值变化就去 进行触发变动事件  值变化的时候 触发分为两种 一种是触发变动 一种是还原变动
          if(this.fieldEventFlag){
            if(this.eventTypeResult && this.eventTypeResult.length){
              // 先看是否达标
              let controlType = this.obj.controltype
              let newObj = null
              switch(controlType){
                case '5':
                case 5:
                case '6':
                case 6:
                  newObj = this.copyObj
                  break
                default: 
                  newObj = this.obj
              }
              this.commonFieldEventEmit(this, this.eventTypeResult, newObj)
            }
          }
        },
        // immediate: true
      }
    },
    created(){
      this.$nextTick(() => {
        if(this.copyPropObjFlag){
          // 下拉框控件等  保存时需要将convalue 进行字符串转化 所以此类控件需要进行 obj的复制 给控件绑定 然后值变化后 将原始的obj的值进行修改
          this.initCopyPropObjData()
        }   
        if(this.fieldEventFlag){
          // 获取该控件是否配置有事件
          this.commonFieldfnInit()      
          this.beforeHasShow = this.isShowField        
          this.beforeDataSource = this.dataSource || []   
          // 注册接收 字段的eventbus事件(改变 和 还原的 事件)
          this.commonFieldEventOn()      
        }
      })   
    },
    beforeDestroy(){
      if(this.fieldEventFlag) {
        this.commonFieldOff()
      }
    },
    methods: {
      changeContent(){

      },
      initCopyPropObjData(){
        // 下拉框控件等  保存时需要将convalue 进行字符串转化 所以此类控件需要进行 obj的复制 给控件绑定 然后值变化后 将原始的obj的值进行修改
        this.copyObj = JSON.parse(JSON.stringify(this.obj))
      },
      copyObjConvalueChange(){
        debugger
        try {
          this.obj.convalue = JSON.stringify(this.copyObj.convalue)
        } catch (error) {
          
        }
      },
      commonFieldfnInit(){
        // 判断是否有配置事件
        this.isHasEvent().then(res => {
          if(res){
            // 调用事件的接口 获取 事件的配置规则及要触发影响的目标字段等信息
            let params = {
              unicode: this.obj.unicode,
            }
            this.getEventResult(params)
          }
        })
      },
      // 响应 字段变化事件
      commonFieldEventOn(){
        // 改变的事件
        this.$bus.$on(`fieldEventChange_${this.obj.unicode}`, (currentEventResultObj) => {
          debugger
          fieldEventObj.excuteChangeEvent(this, currentEventResultObj, this.obj)
        })
        // 恢复的事件
        this.$bus.$on(`fieldEventBack_${this.obj.unicode}`, (currentEventResultObj, calculateDoway) => {
          debugger
          fieldEventObj.excuteBackEvent(this, currentEventResultObj, calculateDoway, this.obj)
        })  
      },
      // 触发 其他字段变化事件
      commonFieldEventEmit(vueObj, totalEventResult, controlObj){
        fieldEventObj.emitChangeEvent(vueObj, totalEventResult, controlObj)
      },
      // 销毁字段 eventbus事件
      commonFieldOff(){
        this.$bus.$off(`fieldEventChange_${this.obj.unicode}`)
        this.$bus.$off(`fieldEventBack_${this.obj.unicode}`)
      },
      // 获取事件规则及要影响的目标字段等具体信息    
      getEventResult(params){
        getEventResult(params).then(res => {
          console.log(`-------获取${this.obj.conname}字段事件详情配置结果----------`, res.data.Data)
          this.eventTypeResult = res.data.Data
          // 触发变动事件
          if(this.eventTypeResult && this.eventTypeResult.length){
            this.commonFieldEventEmit(this, this.eventTypeResult, this.obj)
          }
        })
      },
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      },  
      // 判断当前控件中是含有事件
      isHasEvent(){
        return new Promise((resolve, reject) => {
          resolve(this.obj.linkevent ? true : false)
        })
      },
    }
}