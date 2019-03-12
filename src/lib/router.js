//导入vue
import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入组件
import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'

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
            }
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