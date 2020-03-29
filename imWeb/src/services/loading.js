/*!
 * name:loading.js
 * version:v1.0.0
 * author:Javon Huang
 * release:2019-08-21
 * company:jianxun
 */
import { Toast } from 'vant';

class loading{
  /**
   * 加载持续时间
   * @param {number} time 加载持续时间
   */
  constructor(time){
    this.time=time;
    this.timer=null;
    this.loading=null;
    this.openLoading=(d=true)=>{
      if(d){
        this.loading = Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中'
        });    
        this.timer = setTimeout(() => {
          this.loading.clear();
        }, time);
      }
    };
    this.closeLoading=()=>{
      if(this.loading!==null){
        this.loading.clear();
        clearTimeout(this.timer);
      }
    };
    this.showcode=(code,message,showMsg)=>{
      if(code!==200){
        Toast(message);
      }else if(showMsg){
        Toast.success(message);
      }
    }
  }
}

export default loading;