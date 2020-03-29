import * as dbUnity from '../../DBunity/DBfactory';
import {friendVerify} from './../../model/friend/friendVerify';

/**
 * 删除验证请求
 * @param userid 
 * @param fromuserid 
 */
const delFriendVerify=async(userid:number,fromuserid:number,db:dbUnity.transaction)=>{
  try{
    let sql='delete from friend_verify where touserid=? and fromuserid=?';
    let result=await db.query(sql,[userid,fromuserid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 添加好友请求
 * @param friendVerify 
 */
const addFriendVerify=async(friendVerify:friendVerify)=>{
  try{
    let sql='insert friend_verify (fromuserid,touserid,status,verify,createtime) values(?,?,?,?,now())';
    let result=await dbUnity.query(sql,[friendVerify.fromuserid,friendVerify.touserid,friendVerify.status,friendVerify.verify]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 更新验证信息状态
 * @param friendVerify 
 */
const updateFriendVerify=async(friendVerify:friendVerify,db:dbUnity.transaction)=>{
  try{
    let sql='update friend_verify set status=? where id=? ';
    let result=await db.query(sql,[friendVerify.status,friendVerify.id]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 获取所有好友请求
 * @param userid 
 */
const getFriendVerifyList=async(userid:number)=>{
  try{
    let sql=`SELECT
    b.userid,
    a.id,
    a.status,
    a.verify,
    a.createtime,
    b.age,
    b.img,
    b.nickname,
    b.sex,
    b.signature 
  FROM
    friend_verify a
    LEFT JOIN user_info b ON b.userid = a.fromuserid 
  WHERE
    a.touserid = ?`;
    let result=await dbUnity.query(sql,[userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

export {
  delFriendVerify,
  addFriendVerify,
  updateFriendVerify,
  getFriendVerifyList
}