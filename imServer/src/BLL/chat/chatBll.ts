import {messageResult} from '../../unitls/messageResult';
import {sendSingleMsg} from './../../model/chat/sendSingleMsg';
import * as chatDal from './../../DAL/chat/chatDal';

/**
 * 添加聊天记录
 * @param msgInfo 
 */
const sendSingleChat=async(msgInfo:sendSingleMsg)=>{
  try{
    await chatDal.sendSingleChat(msgInfo);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 根据用户账号获取聊天用户列表
 * @param userid 用户账号
 */
const getSingleChatFriend=async (userid:number)=>{
  try{
    let result:any=await chatDal.getSingleChatFriend(userid);
    return await new messageResult(200,true,result).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 根据单聊房号获取和好友的聊天信息列表
 * @param chatid 单聊房号
 */
const getSingleChatMsgList=async (chatid:number)=>{
  try{
    let result:any=await chatDal.getSingleChatMsgList(chatid);
    return await new messageResult(200,true,result).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 根据单聊房号更新所有消息已读
 * @param chatid 单聊房号
 */
const updateSingleRead=async (chatid:number,userid:number)=>{
  try{
    await chatDal.updateSingleRead(chatid,userid);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
export {
  getSingleChatFriend,
  getSingleChatMsgList,
  updateSingleRead,
  sendSingleChat
};