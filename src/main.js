// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui' // element组件
// import 'element-ui/lib/theme-chalk/index.css'  // 引入element样式
import '../theme/index.css'  // 引入 自定义主题样式
import { Message, Notify } from 'element-ui'
import vueQuillEditor from 'vue-quill-editor' // vue 富文本组件
import App from './App'
import * as filters from './filters/index' // 全局 filter
import router from './router' // vue-router 路由
import store from './store' // vuex 状态管理
import './icons' // 字体图标
import './permission' // 权限
import './directives' // 全局自定义指令
import './authority-directives.js' // 全局自定义指令
import './authority-directives1.js' // 全局自定义指令
import VueDND from 'awe-dnd'  // 拖拽
import BaiduMap from 'vue-baidu-map'  // 百度地图
// import toExcel from '@/utils/exportExcel' // 导入封装好 导出excel的方法
import eGuideLayer from '@/utils/guide/e-guide-layer.umd'  // 引导组件
import './utils/guide/e-guide-layer.css'

// 全局的 抽屉组件
import AtrisDrawer from '@/base/Drawer/drawer'
Vue.component('AtrisDrawerCmp', AtrisDrawer)

// 引入 富文本编辑器的 css 样式
require('quill/dist/quill.snow.css')
require('quill/dist/quill.bubble.css')
require('quill/dist/quill.core.css')
// 使用 引导组件
Vue.use(eGuideLayer)

Vue.config.productionTip = false
Vue.use(ElementUI)
// 使用 富文本编辑器
Vue.use(vueQuillEditor)
Vue.use(require('vue-wechat-title'))
// 使用 引用的 拖拽 组件
Vue.use(VueDND)
// 使用 百度地图
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'r5sYINXMCnEFGnSqhfCF9CRsflDccEjN'
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$bus = new Vue()
// 将导出excel 的方法挂入 vue 的原型中
Vue.prototype.$isArray = function (data) {
  return Object.prototype.toString.apply(data) === '[object Array]'? true: false 
}
// Vue.prototype.$toExcel = toExcel
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    // 监测网络(pc端)
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  },
  methods: {
    // 网络变化
    updateOnlineStatus (e) {
      const { type } = e  // type 有两个值：offline 和 online
      console.log("----网络状态---", type) 
      if( type === 'offline' ){
        // 离线
        Notify({
          title: '警告',
          message: '网络走神了,请检查网络',
          type: 'warning'
        })
        Message.warning("网络走神了,请检查网络")
      }else if( type === 'online' ){
        // 在线
        // Message.success("网络恢复正常")
        Notify({
          title: '成功',
          message: '网络恢复正常',
          type: 'success'
        })
      }
      // 将网络状态存在全局中
      store.dispatch("netWorkChangeStatus", type)
    }     
  },
}).$mount("#app")
