import {messageResult} from '../../unitls/messageResult';
import * as group from '../../model/group/group';
import * as DBfactory from '../../DBunity/DBfactory';
import * as groupHomeDal from './../../DAL/group/groupHomeDal';
import * as groupMessageDal from './../../DAL/group/groupMessageDal';
import * as groupUserDal from './../../DAL/group/groupUserDal';
import * as redis from './../../unitls/redis';

/**
 * 获取群聊消息列表
 * @param homeid 
 */
const getGroupMessageList=async(homeid:number)=>{
  try{
    let result:any=await groupMessageDal.getGroupMessageList(homeid);
    if(Array.isArray(result)){
      return await new messageResult(200,true,result).getMsg();
    }
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 群未读消息置零
 * @param homeid 
 * @param userid 
 */
const reduceUnread=async(homeid:number,userid:number)=>{
  try{
    await groupUserDal.reduceUnread(homeid,userid,0);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 更新群信息
 * @param clsGroupHome 
 */
const updateGroupHome=async(clsGroupHome:group.groupHome)=>{
  try{
    await groupHomeDal.updateGroupHome(clsGroupHome);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 获取群内所有群成员
 * @param userid
 * @param homeid 
 */
const getGroupUserList=async(userid:number,homeid:number)=>{
  try{
    let result:any=await groupUserDal.getGroupUserList(userid,homeid);
    if(Array.isArray(result)){
      return await new messageResult(200,true,result).getMsg();
    }
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 添加群聊房间
 * @param createby 创建人
 * @param userList 群成员
 */
const addGroupHome=async(createby:number,userList:Array<number>)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    let homeid:any=await redis.getNumberByKey('homeid',1000000000);
    let clsGroupHome:group.groupHome=new group.groupHome(homeid,createby,100,"群聊");
    clsGroupHome.homeid=homeid;
    await groupHomeDal.addGroupHome(clsGroupHome,db);

    userList.push(createby);
    for(let i=0;i<userList.length;i++){
      let clsGroupUser:group.groupUser=new group.groupUser(homeid,userList[i],createby);
      await groupUserDal.addGroupUser(clsGroupUser,db);
    }
    await db.commit();
    return await new messageResult(200,true,clsGroupHome).getMsg();
  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 获取用户所在的群房间
 * @param userid 
 */
const getGroupHomeList=async(userid:number)=>{
  try{
    let result:Array<group.groupHome>=await groupHomeDal.getGroupHomeList(userid);
    if(Array.isArray(result)){
      for(let i=0;i<result.length;i++){
        let userList=await groupUserDal.getGroupUserImg(result[i].homeid);
        result[i].userList=userList;
        let msgList:Array<group.groupMessage>=await groupMessageDal.getLastMsg(result[i].homeid);
        if(msgList.length>0){
          result[i].lastMsg=msgList[0];
        }
      }
      return await new messageResult(200,true,result).getMsg();
    }
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 删除群成员
 * @param userid 
 * @param homeid 
 */
const delGroupUser=async(useridList:Array<number>,homeid:number)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    for(let i=0;i<useridList.length;i++){
      let clsGroupUser:group.groupUser=new group.groupUser(homeid,useridList[i]);
      await groupUserDal.delGroupUser(clsGroupUser,db);
    }
    await db.commit();
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 添加群成员
 * @param userid 
 * @param homeid 
 * @param inviter 
 */
const addGroupUser=async(useridList:Array<number>,homeid:number,inviter:number)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    for(let i=0;i<useridList.length;i++){
      let clsGroupUser:group.groupUser=new group.groupUser(homeid,useridList[i],inviter);
      await groupUserDal.addGroupUser(clsGroupUser,db);
    }
    await db.commit();
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 添加群聊信息
 * @param clsGroupMessage 
 */
const addGroupMessage=async(clsGroupMessage:group.groupMessage)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    await groupMessageDal.addGroupMessage(clsGroupMessage,db);
    await groupUserDal.increaseUnread(clsGroupMessage.homeid,clsGroupMessage.fromuserid,db);
    await db.commit();
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

export{
  getGroupMessageList,
  reduceUnread,
  updateGroupHome,
  getGroupUserList,
  addGroupHome,
  getGroupHomeList,
  delGroupUser,
  addGroupUser,
  addGroupMessage
}