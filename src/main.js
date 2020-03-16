import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from "./store";

//  0.---------------------------------------------------------------------
// 使用图片懒加载,看完去看DoodsListItem.vue文件中 第4  第6 行代码怎么用
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})


//  1.---------------------------------------------------------------------
import toast from "components/common/toast/index.js"

// 安装我们自定义的插件,这步完后 去看 components/common/toast/index.js 文件
Vue.use(toast)

//  2.----------------------------------------------------------------------

// 导入fastclick 解决移动端延迟300ms问题
// 就导入一下，然后使用就行了
import FlastClick from 'fastclick'

FlastClick.attach(document.body)


//  3.----------------------------------------------------------------------

// new 一个Vue实例是可以作为一个事件的总线的
Vue.prototype.$bus = new Vue()

//  4.----------------------------------------------------------------------

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
