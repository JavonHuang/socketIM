
import Vue from 'vue'
const IP = {
  local: 'http://localhost:8090',
  dev: '',
  qas: '',
  uat: '',
  prod: '',
}
const config = {
  serviceUrl: IP[process.env.NODE_ENV],//服务器IP地址
  timeout: 10000,//请求时效
  debug:false,
  setUserInfo (d) {
    sessionStorage.setItem('GeorgeuserInfo', JSON.stringify(d));
  },//设置本系统token信息
  userInfo () {
    return sessionStorage.getItem('GeorgeuserInfo') !== null ? JSON.parse(sessionStorage.getItem('GeorgeuserInfo')) : null
  },//获取本系统token信息
  responseStatus: {
    _400: '账号已在另一设备登录',
    _401: '未授权，请重新登录',
    _403: '拒绝访问',
    _404: '请求错误,未找到该资源',
    _405: '请求方法未允许',
    _408: '请求超时',
    _500: '服务器端出错',
    _501: '网络未实现',
    _502: '网络错误',
    _503: '服务不可用',
    _504: '网络超时',
    _505: 'http版本不支持该请求',
  }
}
Vue.prototype.$config = config;
export default config;