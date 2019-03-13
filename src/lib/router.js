//导入vue
import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入组件
import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'
import roles from '../components/roles.vue'
import rights from '../components/rights.vue'
import goods from '../components/goods.vue' 
import params from '../components/params.vue'
import categories from '../components/categories.vue'
import orders from '../components/orders.vue'
import reports from '../components/reports.vue'

//路由规则
let routes = [
    {
        path:'/login',
        component: login
    },
    {
        path:'/',
        component: index,
        children:[
            {
                path:'users',
                component: users
            },
            {
                path:'roles',
                component: roles
            },
            {
                path:'rights',
                component: rights
            },
            {
                path:'goods',
                component: goods
            },
            {
                path:'params',
                component: params
            },
            {
                path:'categories',
                component: categories
            },
            {
                path:'orders',
                component: orders
            },
            {
                path:'reports',
                component: reports
            },
        ]
    }
]

//实例路由
let router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.path == '/login'){
        //直接放过去
        next()
    }else{
        if(window.sessionStorage.getItem('token')){
            next()
        }else{
            //提示用户 this 不是Vue实例,无法访问$massage
            //router.jsthis.$message.warning('请先登录')
            Vue.prototype.$message.warning('请先登录')
            next('/login')
        }
    }
  })

//暴露导出
export default router;