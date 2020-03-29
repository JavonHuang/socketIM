import {messageResult} from '../../unitls/messageResult';
import * as DBfactory from '../../DBunity/DBfactory';
import * as friendDal from './../../DAL/friend/friendDal';
import * as friendVerifyDal from './../../DAL/friend/friendVerifyDal';
import * as friendModel from './../../model/friend/friend';

/**
 * 设置好友备注
 * @param friendNote 
 */
const setFriendNoteNickName=async (friendNote:friendModel.friendNote)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    let checkResult=await friendDal.checkFriendNoteNickName(friendNote,db);
    if(checkResult.length>0){
      await friendDal.setFriendNoteNickName(friendNote,db);
      await db.commit();
      return await new messageResult(200,true,null).getMsg();
    }else{
      await friendDal.insertFriendNoteNickName(friendNote,db);
      await db.commit();
      return await new messageResult(200,true,null).getMsg();
    }
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 根据单聊房号删除好友
 * @param chatid
 * @param userid
 */
const delFriendByChatId=async (chatid:number,userid:number,friendid:number)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    db=new DBfactory.transaction();
    await db.beginTransaction();
    await friendVerifyDal.delFriendVerify(userid,friendid,db);
    await friendDal.delFriendByChatId(chatid,userid,db);
    db.commit();
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 根据用户账号获取用户的好友信息
 * @param userid 用户账号
 */
const getUserFriendById=async (userid:number)=>{
  try{
    let result:any=await friendDal.getUserFriendById(userid);
    return await new messageResult(200,true,result).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

export {
  getUserFriendById,
  delFriendByChatId,
  setFriendNoteNickName
};