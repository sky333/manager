import Vue from 'vue'
import App from './App.vue'

//导入路由
import router from './lib/router'
//导入饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
