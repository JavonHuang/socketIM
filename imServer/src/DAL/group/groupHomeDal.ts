import * as dbUnity from '../../DBunity/DBfactory';
import {groupHome } from '../../model/group/group';

/**
 * 修改群信息
 * @param clsGroupHome
 */
const updateGroupHome=async(clsGroupHome:groupHome)=>{
  try{
    let sql=`update group_home set max=?,homename=?,notice=? where homeid=? and createby=?`;
    let result=await dbUnity.query(sql,[clsGroupHome.max,clsGroupHome.homename,clsGroupHome.notice,clsGroupHome.homeid,clsGroupHome.createby]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 添加群聊房间
 * @param clsGroupHome
 * @param db 
 */
const addGroupHome=async(clsGroupHome:groupHome,db:dbUnity.transaction)=>{
  try{
    let sql=`insert group_home (homeid,createby,max,homename,notice,createtime) values (?,?,?,?,?,now())`;
    let result=await db.query(sql,[clsGroupHome.homeid,clsGroupHome.createby,clsGroupHome.max,clsGroupHome.homename,clsGroupHome.notice]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 
 * @param homeid 删除群成员-根据homeid
 */
const delGroupHome=async(homeid:number,db:dbUnity.transaction)=>{
  try{
    let sql=`delete from group_home where homeid=?`;
    let result=await dbUnity.query(sql,[homeid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 
 * @param userid 根据用户账号获取用户相关群
 */
const getGroupHomeList=async(userid:number)=>{
  try{
    let sql=`SELECT
    b.*,
    a.unread,
    c.count 
  FROM
    group_user a
    LEFT JOIN group_home b ON a.homeid = b.homeid
    LEFT JOIN ( SELECT homeid, COUNT(*) AS count FROM group_user GROUP BY homeid ) c ON c.homeid = a.homeid 
  WHERE
    a.userid =?`;
    let result=await dbUnity.query(sql,[userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

export{
  updateGroupHome,
  addGroupHome,
  delGroupHome,
  getGroupHomeList
}