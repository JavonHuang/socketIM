
import store from './../store/appStore'
import jxConfig from './config'
import jxrouter from './../router/index'
/***路由检查卫士跳转处理***/
export default {
  /**
   * api交互
   * @param to 即将跳转路由
   * @param from 跳转前路由
   * @param next 确认跳转路由
   */
  routerPath(to, from, next) {
    //检查是否已登录，跳转登录页面
    if(jxConfig.userInfo() === null&&to.path!=='/'&&to.auth){
      jxrouter.push("/");
      return false;
    }
    next(); 
  }
};
