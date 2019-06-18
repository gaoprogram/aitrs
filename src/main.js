// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import vueQuillEditor from 'vue-quill-editor' // vue富文本组件
import ElementUI from 'element-ui' // element组件
import './element-theme/index.css' // element样式
import App from './App'
import * as filters from './filters/index' // 全局filter
import router from './router' // vue-router 路由
import store from './store' // vuex状态管理
import './icons' // 字体图标
import './permission' // 权限
import VueDND from 'awe-dnd'  // 拖拽
import BaiduMap from 'vue-baidu-map'  // 百度地图
// 引入 富文本编辑器的 css 样式
require('quill/dist/quill.snow.css')
require('quill/dist/quill.bubble.css')
require('quill/dist/quill.core.css')

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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
