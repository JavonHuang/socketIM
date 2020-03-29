// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//Vue脚手架
import Vue from 'vue'
import App from './App'
import jxrouter from './router/index'
import styles from './assets/scss/common.scss'
//第三方插件样式
import 'vant/lib/index.css'

//第三方插件js
let lodash = require('lodash');
import qs from 'qs'
import Vant from 'vant'
import "babel-polyfill";

//简讯内部封装
import store from './store/appStore'
import appServer from './services/appServer'
import common from './services/common'
import jxConfig from './services/config';
import jxroute from './services/jxroute';
import socketIO from './utils/socket';

Vue.config.productionTip = false

//第三方插件全局注册
Vue.prototype.$lodash = lodash;
Vue.prototype.$qs = qs;
Vue.prototype.$styles=styles;
Vue.prototype.$socket=new socketIO();
//检查是否已登录，跳转登录页面
if(jxConfig.userInfo() === null ){
	jxrouter.push("/");
}

Vue.use(Vant);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:jxrouter,
	store:store,
  components: { App },
  template: '<App/>'
})
//路由守卫
jxrouter.beforeEach((to, from, next) => {
	jxroute.routerPath(to, from, next);
});