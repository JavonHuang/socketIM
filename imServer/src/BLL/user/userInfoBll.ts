import {messageResult} from '../../unitls/messageResult';
import {userInfo} from './../../model/user/userInfo';
import * as userInfoDal from '../../DAL/user/userInfoDal';

/**
 * 根据用户账号或昵称搜索用户
 * @param seachVal 搜索关键字
 */
const seachByUserId= async(seachVal:any):Promise<any>=>{
  try{
    let result:any=await userInfoDal.seachByUserId(seachVal);
    return await new messageResult(200,true,result).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 根据用户账号获取用户信息
 * @param userid 用户账号
 */
const getUserInfoByUserId= async(userid:number):Promise<any>=>{
  try{
    let result:any=await userInfoDal.getUserInfoByUserId(userid);
    if(result.length>0){
      return await new messageResult(200,true,result[0]).getMsg();
    }else{
      return await new messageResult(10002,false,null).getMsg();
    }
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 根据用户账号更新用户信息
 * @param userid 用户账号
 */
const updateUserInfoByUserId= async(userInfo:userInfo):Promise<any>=>{
  try{
    await userInfoDal.updateUserInfoByUserId(userInfo);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
export {
  seachByUserId,
  getUserInfoByUserId,
  updateUserInfoByUserId
};