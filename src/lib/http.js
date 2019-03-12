//导入axios
import axios from 'axios'
//导入Vue
import Vue from 'vue'

//设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

//设置请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  //console.log(config);
  //判断除了登录页,都添加token
  if (config.url.indexOf("/login") == -1) {
    config.headers.Authorization = window.sessionStorage.getItem("token")
  }
  //console.log(config);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//设置响应式拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(1111);
  // console.log(response);
  // let flag = false;
  // res.forEach(v=>{
  //     if ( v == response.data.meta.status) {
  //         flag = true
  //     }
  // })
  let res = [200, 201, 204]
  let flag = res.some(v => v === response.data.meta.status)
  if (flag) {
    Vue.prototype.$message.success(response.data.meta.msg)
  } else {
    Vue.prototype.$message.warning(response.data.meta.msg)
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

//实现install方法
//把axios设置到Vue.原型上
//暴露出去
export default {
  install(Vue) {
    Vue.prototype.$http = axios
  }
}