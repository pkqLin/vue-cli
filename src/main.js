import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/global.css';
import request from "@/utils/request";

Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false

Vue.prototype.request = request

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
