const jwt = require('jsonwebtoken');
import {jwtKey} from './../config/config';
import {messageResult} from './messageResult';
/**
 * 生成token
 * @param {string} userId 用户编码
 */
const generateToken = (userId:any):messageResult => {
  let jwtStr= jwt.sign(
    {
      data: userId,
      // 设置 token 过期时间
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * jwtKey.hour // 60 seconds * 60 minutes = 1 hour
    },
    jwtKey.secret
  );
  return new messageResult(200,true,jwtStr);
};

/**
* 验证token
* @param token 
*/
const verifyToken=(token:string):messageResult=>{
  try {
    let tokenInfo = jwt.verify(token,jwtKey.secret) // 解密，获取payload
    return new messageResult(200,true,tokenInfo);
  } catch (error) {
    return new messageResult(300,false,"token invalid");
  }
}
export {generateToken,verifyToken};