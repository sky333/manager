//导入axios
import axios from 'axios'
//设置基地址
axios.defaults.baseURL= 'http://localhost:8888/api/private/v1/'

//实现install方法
//把axios设置到Vue.原型上
//暴露出去
export default{
    install(Vue){
        Vue.prototype.$http = axios
    }
}