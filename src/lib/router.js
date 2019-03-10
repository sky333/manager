//导入vue
import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入组件
import login from '../components/login.vue'

//路由规则
let routes = [
    {
        path:'/login',
        component: login
    }
]

//实例路由
let router = new VueRouter({
    routes
})

//暴露导出
export default router;