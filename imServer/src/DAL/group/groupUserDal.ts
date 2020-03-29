import * as dbUnity from '../../DBunity/DBfactory';
import {groupUser } from './../../model/group/group';

/**
 * 获取群内所前9个成员资料
 * @param homeid 
 */
const getGroupUserImg=async(homeid:number)=>{
  try{
    let sql=`SELECT
    b.* 
  FROM
    ( SELECT * FROM group_user WHERE homeid = ? ORDER BY createtime LIMIT 0, 9 ) a
    LEFT JOIN user_info b ON a.userid = b.userid`;
    let result=await dbUnity.query(sql,[homeid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 获取群内所有群成员
 * @param userid
 * @param homeid 
 */
const getGroupUserList=async(userid:number,homeid:number)=>{
  try{
    let sql=`SELECT
    b.*,
    c.notenickname 
  FROM
    group_user a
    LEFT JOIN user_info b ON a.userid = b.userid
    LEFT JOIN ( SELECT * FROM friend_note WHERE userid = ? ) c ON c.friendid = a.userid 
  WHERE
    a.homeid = ?`;
    let result=await dbUnity.query(sql,[userid,homeid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 添加群成员
 * @param clsGroupUser 
 * @param db 
 */
const addGroupUser=async(clsGroupUser:groupUser,db:dbUnity.transaction)=>{
  try{
    let sql=`insert group_user (homeid,userid,inviter,unread,createtime) values (?,?,?,?,now())`;
    let result=await db.query(sql,[clsGroupUser.homeid,clsGroupUser.userid,clsGroupUser.inviter,clsGroupUser.unread]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 
 * @param clsGroupUser 删除群成员
 */
const delGroupUser=async(clsGroupUser:groupUser,db:dbUnity.transaction)=>{
  try{
    let sql=`delete from group_user where homeid=? and userid=?`;
    let result=await db.query(sql,[clsGroupUser.homeid,clsGroupUser.userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 
 * @param homeid 删除群成员-根据homeid
 */
const delGroupUserByHome=async(homeid:number,db:dbUnity.transaction)=>{
  try{
    let sql=`delete from group_user where homeid=?`;
    let result=await dbUnity.query(sql,[homeid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 增加未读消息
 * @param homeid 
 * @param userid 
 * @param db 
 */
const increaseUnread=async(homeid:number,userid:number,db:dbUnity.transaction)=>{
  try{
    let sql=`update group_user set unread=unread+1 where homeid=? and userid <>?`;
    let result=await db.query(sql,[homeid,userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 减少未读信息
 * @param homeid 
 * @param userid 
 * @param unread 
 */
const reduceUnread=async(homeid:number,userid:number,unread:number)=>{
  try{
    let sql=`update group_user set unread=? where homeid=? and userid =?`;
    let result=await dbUnity.query(sql,[unread,homeid,userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

export{
  getGroupUserList,
  addGroupUser,
  delGroupUser,
  delGroupUserByHome,
  increaseUnread,
  reduceUnread,
  getGroupUserImg
}