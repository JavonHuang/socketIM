import {messageResult} from '../../unitls/messageResult';
import * as DBfactory from '../../DBunity/DBfactory';
import * as friendVerifyDal from './../../DAL/friend/friendVerifyDal';
import * as friendDal from './../../DAL/friend/friendDal';
import {friendVerify} from './../../model/friend/friendVerify';
import {userFriend} from './../../model/friend/friend';
import * as redis from './../../unitls/redis';

/**
 * 添加好友请求
 * @param friendVerify 
 */
const addFriendVerify=async (friendVerify:friendVerify)=>{
  try{
    await friendVerifyDal.addFriendVerify(friendVerify);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 更新验证信息状态
 * @param friendVerify 
 */
const updateFriendVerify=async (friendVerify:friendVerify)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    await friendVerifyDal.updateFriendVerify(friendVerify,db);
    if(friendVerify.status==1){
      let chatid:any=null;
      let fromCls=new userFriend(friendVerify.fromuserid,friendVerify.touserid,0);
      let toCls=new userFriend(friendVerify.touserid,friendVerify.fromuserid,0);
      
      let checkFrom=await friendDal.checkFriendExit(fromCls,db);
      if(checkFrom.length>0){
        chatid=checkFrom[0].chatid;
      }
      let checkTo=await friendDal.checkFriendExit(toCls,db);
      if(checkTo.length>0){
        chatid=checkFrom[0].chatid;
      }

      if(chatid==null){
        chatid=await redis.getNumberByKey('chatid',1000000000);
      }

      if(checkFrom.length==0){
        fromCls.chatid=chatid;
        await friendDal.AddFriend(fromCls,db);
      }
      if(checkTo.length==0){
        toCls.chatid=chatid;
        await friendDal.AddFriend(toCls,db);
      }
    }
    db.commit();
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 获取所有好友请求
 * @param userid 
 */
const getFriendVerifyList=async (userid:number)=>{
  try{
    let result:any=await friendVerifyDal.getFriendVerifyList(userid);
    return await new messageResult(200,true,result).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

export {
  addFriendVerify,
  getFriendVerifyList,
  updateFriendVerify
}