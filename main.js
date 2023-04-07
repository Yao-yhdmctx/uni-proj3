import App from './App'
// 导入网络请求包
import {$http} from '@escook/request-miniprogram'
import store from './store/store.js'
// 封装请求
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
// 请求拦截器
$http.beforeRequest = function(option){
	uni.showLoading({
		title:'数据加载中。。。。'
	})
}
// // 响应单拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}
// //封装弹窗方法
uni.$showMsg = function(title = '数据请求失败',duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif