import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/global.css';
import request from "@/utils/request";
//http.js文件内容
// main.js 文件
// require("./mock");
import axios from 'axios' //引入axios
import qs from 'qs'        //引入qs
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.$qs = qs           //全局注册，使用方法为:this.$qs
require('./mock/index.js')  //引入 mock 入口文件

// import './mock/index'
// Vue.use(mock);
Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false

Vue.prototype.request = request

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
