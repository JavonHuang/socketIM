import * as dbUnity from '../../DBunity/DBfactory';
import {sendSingleMsg,msType} from './../../model/chat/sendSingleMsg';

/**
 * 添加聊天记录
 * @param msgInfo 
 */
const sendSingleChat=async(msgInfo:sendSingleMsg)=>{
  try{
    let sql="insert chat_message (chatid,fromuserid,touserid,type,text,`read`,createtime) values(?,?,?,?,?,?,now())";
    let result=await dbUnity.query(sql,[msgInfo.chatid,msgInfo.fromuserid,msgInfo.touserid,msgInfo.type,msgInfo.text,msgInfo.read]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 删除聊天记录
 * @param chatid 
 */
const delSingleChat=async(chatid:number)=>{
  try{
    
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 根据用户账号获取聊天用户列表
 * @param userid 用户账号
 */
const getSingleChatFriend=async (userid:number)=>{
  try{
    let sql=`select
    j.*,
    i.type,
    i.text,
    i.createtime as sendtime,
    i.fromuserid,
    i.touserid 
  from
    (
    select
      c.*,
      coalesce ( d.num, 0 ) as unread,
      e.notenickname 
    from
      (
      select
        b.userid as friendid,
        b.nickname,
        b.img,
        b.sex,
        b.age,
        b.signature,
        a.createtime,
        a.chatid 
      from
        user_friend a
        left join user_info b on a.friendid = b.userid 
      where
        a.userid = ? 
      ) c
      left join ( select count(*) as num, f.chatid from chat_message f where f.touserid = ? and f.read = 0 group by f.chatid ) d on d.chatid = c.chatid
      left join ( select * from friend_note where userid = ? ) e on e.friendid = c.friendid 
    ) as j
    left join (
    select
      e.* 
    from
      (
      select
        g.chatid,
        max( g.messageid ) as messageid 
      from
        chat_message g 
      where
        g.chatid in ( select h.chatid from user_friend h where userid = ?) 
      group by
        g.chatid 
      ) as f
      left join chat_message as e on f.chatid = e.chatid 
    and f.messageid = e.messageid 
    ) as i on i.chatid = j.chatid`;
    let result=await dbUnity.query(sql,[userid,userid,userid,userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 根据单聊房号获取和好友的聊天信息列表
 * @param chatid 单聊房号
 */
const getSingleChatMsgList=async(chatid:number)=>{
  try{
    let sql=`SELECT
    a.messageid,
    a.chatid,
    a.fromuserid,
    a.touserid,
    a.type,
    a.text,
    a.createtime AS sendtime 
  FROM
    chat_message a 
  WHERE
    a.chatid = ?`;
    let result=await dbUnity.query(sql,[chatid]);
    return result;
  }catch(e){
    throw e;
  }
}

/**
 * 根据单聊房号更新所有消息已读
 * @param chatid 单聊房号
 */
const updateSingleRead=async(chatid:number,userid:number)=>{
  try{
    let sql="update chat_message set `read`=1 where chatid=? and touserid=?";
    let result=await dbUnity.query(sql,[chatid,userid]);
    return result;
  }catch(e){
    throw e;
  }
}

export {
  getSingleChatFriend,
  getSingleChatMsgList,
  updateSingleRead,
  delSingleChat,
  sendSingleChat
};