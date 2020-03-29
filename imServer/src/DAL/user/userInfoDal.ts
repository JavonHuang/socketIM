import * as dbUnity from '../../DBunity/DBfactory';
import {userInfo} from './../../model/user/userInfo';

/**
 * 根据用户账号或昵称搜索用户
 * @param seachVal 搜索关键字
 */
const seachByUserId=async (seachVal:any)=>{
  try{
    let result=await dbUnity.query(`SELECT * FROM USER_INFO WHERE USERID LIKE CONCAT('%',?,'%') or nickname LIKE CONCAT('%',?,'%')`,[seachVal,seachVal]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 根据用户账号获取用户信息
 * @param userid 用户账号
 */
const getUserInfoByUserId=async (userid:number)=>{
  try{
    let result=await dbUnity.query('SELECT * FROM USER_INFO WHERE USER_INFO.USERID=?',[userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 根据用户账号更新用户信息
 * @param userInfo 用户信息
 */
const updateUserInfoByUserId=async (userInfo:userInfo)=>{
  try{
    let result=await dbUnity.query('UPDATE USER_INFO SET NICKNAME=?,IMG=?,SEX=?,AGE=?,SIGNATURE=? WHERE USER_INFO.USERID=?',[userInfo.nickname,userInfo.img,userInfo.sex,userInfo.age,userInfo.signature,userInfo.userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 新增用户信息
 * @param userInfo 用户信息
 */
const insertUserInfo=async (userInfo:userInfo,db:dbUnity.transaction)=>{
  try{
    let result=await db.query('INSERT USER_INFO (NICKNAME,IMG,SEX,AGE,SIGNATURE,USERID,CREATETIME) VALUES (?,?,?,?,?,?,NOW())',[userInfo.nickname,userInfo.img,userInfo.sex,userInfo.age,userInfo.signature,userInfo.userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
export{
  seachByUserId,
  getUserInfoByUserId,
  updateUserInfoByUserId,
  insertUserInfo
}