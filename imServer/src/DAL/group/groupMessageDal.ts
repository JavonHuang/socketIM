import * as dbUnity from '../../DBunity/DBfactory';
import {groupMessage} from '../../model/group/group';

/**
 * 获取最近一条群聊信息
 * @param homeid 
 */
const getLastMsg=async(homeid:number)=>{
  try{
    let sql=`SELECT
    b.fromuserid,
    b.type,
    b.text,
    b.createtime sendtime,
    a.id,
    a.homeid 
  FROM
    ( SELECT homeid, MAX( id ) AS id FROM group_message WHERE homeid = ? ) a
    LEFT JOIN group_message b ON a.id = b.id`;
    let result=await dbUnity.query(sql,[homeid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 获取群聊消息列表
 * @param homeid 
 */
const getGroupMessageList=async(homeid:number)=>{
  try{
    let sql=`SELECT
    a.id as messageid,
    a.homeid,
    a.createtime AS sendtime,
    a.type,
    a.text,
    a.fromuserid,
    b.img,
    b.nickname,
    b.sex,
    b.signature,
    c.notenickname
  FROM
    group_message a
    LEFT JOIN user_info b ON a.fromuserid = b.userid
    LEFT JOIN friend_note c on a.fromuserid=c.friendid
    WHERE a.homeid=? ORDER BY a.id`;
    let result=await dbUnity.query(sql,[homeid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 添加群聊信息
 * @param clsGroupMessage
 * @param db 
 */
const addGroupMessage=async(clsGroupMessage:groupMessage,db:dbUnity.transaction)=>{
  try{
    let sql=`insert group_message (id,homeid,fromuserid,type,text,createtime) values (?,?,?,?,?,now())`;
    let result=await db.query(sql,[clsGroupMessage.id,clsGroupMessage.homeid,clsGroupMessage.fromuserid,clsGroupMessage.type,clsGroupMessage.text]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
export{
  getGroupMessageList,
  addGroupMessage,
  getLastMsg
}