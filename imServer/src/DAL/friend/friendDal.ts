import * as dbUnity from '../../DBunity/DBfactory';
import * as friendModel from './../../model/friend/friend';

/**
 * 检查是否已存在备注
 * @param friendNote 
 */
const checkFriendNoteNickName=async (friendNote:friendModel.friendNote,db:dbUnity.transaction)=>{
  try{
    let sql=`select * from friend_note where userid=? and friendid=?`;
    let result=await db.query(sql,[friendNote.userid,friendNote.friendid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 插入备注
 * @param friendNote 
 */
const insertFriendNoteNickName=async (friendNote:friendModel.friendNote,db:dbUnity.transaction)=>{
  try{
    let sql=`insert friend_note (userid,friendid,notenickname) values(?,?,?)`;
    let result=await db.query(sql,[friendNote.userid,friendNote.friendid,friendNote.notenickname]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 设置好友备注
 * @param friendNote 
 */
const setFriendNoteNickName=async (friendNote:friendModel.friendNote,db:dbUnity.transaction)=>{
  try{
    let sql=`update friend_note set notenickname=? where userid=? and friendid=?`;
    let result=await db.query(sql,[friendNote.notenickname,friendNote.userid,friendNote.friendid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 根据单聊房号删除好友
 * @param chatid
 * @param userid
 */
const delFriendByChatId=async(chatid:number,userid:number,db:dbUnity.transaction)=>{
  try{
    let sql=`DELETE 
    FROM
      user_friend 
    WHERE chatid =? and userid=?`;
    let result=await db.query(sql,[chatid,userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 根据用户账号获取用户的好友信息
 * @param userid 用户账号
 */
const getUserFriendById=async (userid:number)=>{
  try{
    let sql=`SELECT
    c.*,
    d.notenickname 
  FROM
    (
    SELECT
      a.chatid,
      a.friendid,
      b.nickname,
      b.img,
      b.sex,
      b.age,
      b.signature 
    FROM
      user_friend a
      LEFT JOIN user_info b ON a.friendid = b.userid 
    WHERE
      a.userid = ? 
    ) AS c
    LEFT JOIN friend_note d ON d.friendid = c.friendid `;
    let result=await dbUnity.query(sql,[userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 添加好友
 * @param userFriend 
 * @param db 
 */
const AddFriend=async(userFriend:friendModel.userFriend,db:dbUnity.transaction)=>{
  try{
    let sql=`insert user_friend (chatid,userid,friendid,createtime) values (?,?,?,now())`;
    let result=await db.query(sql,[userFriend.chatid,userFriend.userid,userFriend.friendid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 检查朋友关系是否已存在
 * @param userFriend 
 * @param db 
 */
const checkFriendExit=async(userFriend:friendModel.userFriend,db:dbUnity.transaction)=>{
  try{
    let sql=`select * from user_friend where userid=? and friendid=?`;
    let result=await db.query(sql,[userFriend.userid,userFriend.friendid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

export {
  getUserFriendById,
  delFriendByChatId,
  setFriendNoteNickName,
  checkFriendNoteNickName,
  insertFriendNoteNickName,
  AddFriend,
  checkFriendExit
};