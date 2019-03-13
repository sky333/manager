import Vue from 'vue'
import App from './App.vue'

//导入路由
import router from './lib/router'
//导入饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入抽取的axios
import http from './lib/http'
Vue.use(http)

//全局导入 面包屑组件 并注册
import mianbaoxie from './components/mianbaoxie.vue'
Vue.component('mianbaoxie',mianbaoxie)//注册

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
