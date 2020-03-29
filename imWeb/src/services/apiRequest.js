/*!
 * name:apiRequest.js
 * version:v1.0.0
 * author:Javon Huang
 * release:2019-08-15
 * company:jianxun
 */
import axios from 'axios'
import jxConfig from "./config";
import loading from './loading'

const apiInstance = axios.create({
  baseURL: jxConfig.serviceUrl, 
  timeout: jxConfig.timeout,
  withCredentials:true,
  // headers:{
  //   'platform': 'wx-h5'
  // },  
});

apiInstance.interceptors.request.use(request=>{
    request.headers["token"] =jxConfig.userInfo() === null ? "" : jxConfig.userInfo().token;
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(response=>{
    if(response.config.url === response.config.baseURL + jxConfig.loginUrl) {
      jxConfig.setUserInfo(response.data.data);
    }
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = jxConfig.responseStatus._400;
          break;
        case 401:
          err.message = jxConfig.responseStatus._401;
          break;
        case 403:
          err.message = jxConfig.responseStatus._403;
          break;
        case 404:
          err.message = jxConfig.responseStatus._404;
          break;
        case 405:
          err.message = jxConfig.responseStatus._405;
          break;
        case 408:
          err.message = jxConfig.responseStatus._408;
          break;
        case 500:
          err.message = jxConfig.responseStatus._500;
          break;
        case 501:
          err.message = jxConfig.responseStatus._501;
          break;
        case 502:
          err.message = jxConfig.responseStatus._502;
          break;
        case 503:
          err.message = jxConfig.responseStatus._503;
          break;
        case 504:
          err.message = jxConfig.responseStatus._504;
          break;
        case 505:
          err.message = jxConfig.responseStatus._505;
          break;
        default:
          err.message = `连接错误${err.response.status}`;
      }
    } else {
      err.message;
    }
    return Promise.resolve({
      data: {
        data: null,
        code: -1,
        message: err.message
      }
    });
  }
);

/**
 * 系统api调用
 * @param {string} url 系统API
 * @param {object} param 参数
 * @param {boolean} showcode msg提示
 * @param {boolean} layout 加载层
 */
const apiPost=(url, param, showcode = false, layout = false)=>{
  let load=new loading(jxConfig.timeout);
  load.openLoading(layout)

  return new Promise((resolve, reject) => {
    apiInstance({
      method: "post",
      url: url,
      data: param,
    }).then(res=>{
      load.closeLoading();
      load.showcode(res.data.code,res.data.message,showcode)
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  })
}
/**
 * 获取二进制文件流
 * @param {string} url 系统API
 * @param {object} param 参数
 * @param {boolean} showcode msg提示
 * @param {boolean} layout 加载层
 */
const buffer=(url, param, showcode = false, layout = false)=>{
  let load=new loading(jxConfig.timeout);
  load.openLoading(layout)

  return new Promise((resolve, reject) => {
    apiInstance({
      method: "post",
      url: url,
      data: param,
      responseType: "arraybuffer"
    }).then(res=>{
      if (res.headers["content-type"] === "application/json;charset=UTF-8") {
        let uint8 = new Uint8Array(res.data); // 提取uint8Array
        let resToString = JSON.parse(
          decodeURIComponent(escape(String.fromCharCode(...uint8)))
        ); // 解决乱码
        load.closeLoading();
        load.showcode(resToString.code,resToString.message,showcode)
        resolve(res);
      } else {
        reject(res);
      }
    }).catch(err=>{
      reject(err);
    })
  })
}

export{
  apiPost,
  buffer
}