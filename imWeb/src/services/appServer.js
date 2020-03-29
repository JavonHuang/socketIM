
/*!
 * name:appServer.js
 * version:v1.0.0
 * author:Javon Huang
 * release:2019-08-21
 * company:jianxun
 */
import Vue from "vue";
import jxConfig from "./config";
import store from './../store/appStore'
import {apiPost,buffer} from './apiRequest';
import VConsole from 'vconsole'
if (jxConfig.debug) {
  let vConsole = new VConsole();
}

const api={
  /**
   * 系统api调用
   * @param {string} url 系统API
   * @param {object} param 参数
   * @param {boolean} showcode msg提示
   * @param {boolean} layout 加载层
   */
  post(url, param, showcode = false, layout = false){
    return apiPost(url, param, showcode, layout)
  },
  /**
   * 获取二进制文件流
   * @param {string} url 系统API
   * @param {object} param 参数
   * @param {boolean} showcode msg提示
   * @param {boolean} layout 加载层
   */
  buffer(url, param, showcode = false, layout = false){
    return buffer(url, param, showcode, layout)
  },
  /**
   * 退出系统清空登录信息
   */
  loginOut(){
    jxConfig.setUserInfo(null)
  }
}
export default api;
Vue.prototype.$axios = api;
