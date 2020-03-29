import * as dbUnity from '../../DBunity/DBfactory';
import { tag } from './../../model/tag/tag';

/**
 * 获取标签成员
 * @param userid 
 * @param tagid 
 */
const getTagFriendList=async(userid:number,tagid:number)=>{
  try{
    let sql=`SELECT
    a.tagid,
    a.userid,
    a.friendid,
    b.age,
    b.img,
    b.nickname,
    b.sex,
    b.signature,
    c.notenickname 
  FROM
    friend_tag a
    LEFT JOIN user_info b ON a.friendid = b.userid
    LEFT JOIN friend_note c ON c.friendid = a.friendid 
  WHERE
    a.tagid = ? 
    AND a.userid = ?`;
    let result=await dbUnity.query(sql,[tagid,userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 根据用户账号获取对应好友的标签
 * @param userid 用户账号
 * @param userid 好友账号
 */
const getFriendTag=async (userid:number,friendid:number)=>{
  try{
    let sql=`SELECT
    a.tagid,
    b.tag 
  FROM
    friend_tag a
    LEFT JOIN tag b ON a.tagid = b.tagid 
  WHERE
    a.userid = ? 
    AND a.friendid = ? `;
    let result=await dbUnity.query(sql,[userid,friendid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 根据用户账号获取所有标签
 * @param userid 用户账号
 */
const getAllFriendTag=async (userid:number)=>{
  try{
    let sql=`SELECT
    a.tagid,
    tag,
    COALESCE ( b.count, 0 ) AS count 
  FROM
    tag a
    LEFT JOIN ( SELECT tagid, COUNT(*) AS count FROM friend_tag WHERE userid = ? GROUP BY tagid ) AS b ON a.tagid = b.tagid 
  WHERE
    a.userid = ?`;
    let result=await dbUnity.query(sql,[userid,userid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 
 * @param tagid 删除该好友所有标签
 * @param db 
 */
const delTagById=async (userid:number,friendid:number,db:dbUnity.transaction)=>{
  try{
    let sql=`delete from friend_tag where userid =? and friendid=?`;
    let result=await db.query(sql,[userid,friendid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 将好友移出标签
 * @param userid 
 * @param friendid 
 * @param tagid 
 */
const delFriendTag=async (clsTag:tag,db:dbUnity.transaction)=>{
  try{
    let sql=`delete from friend_tag where userid=? and friendid=? and tagid =?`;
    let result=await db.query(sql,[clsTag.userid,clsTag.friendid,clsTag.tagid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 将该标签内的好友全部移除
 * @param userid 
 * @param friendid 
 * @param tagid 
 */
const delFriendTagByTagId=async (userid:number,tagid:number,db:dbUnity.transaction)=>{
  try{
    let sql=`delete from friend_tag where userid=? and tagid =?`;
    let result=await db.query(sql,[userid,tagid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 
 * @param tag 设置好友标签
 * @param db 
 */
const addTagById=async (clsTagid:tag,db:dbUnity.transaction)=>{
  try{
    let sql=`insert friend_tag (userid,friendid,tagid) values(?,?,?)`;
    let result=await db.query(sql,[clsTagid.userid,clsTagid.friendid,clsTagid.tagid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 
 * @param tag 添加标签
 * @param db 
 */
const addTag=async (clsTagid:tag,db:dbUnity.transaction)=>{
  try{
    let sql=`insert tag (userid,tagid,tag) values(?,?,?)`;
    let result=await db.query(sql,[clsTagid.userid,clsTagid.tagid,clsTagid.tag]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 检查标签tagid是否合法
 * @param tagid 
 * @param db 
 */
const checkTagId=async (tagid:number,db:dbUnity.transaction)=>{
  try{
    let sql=`select * from tag where tagid=?`;
    let result=await db.query(sql,[tagid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
/**
 * 修改标签名称
 * @param clsTag 
 * @param db 
 */
const setTag=async (clsTag:tag)=>{
  try{
    let sql=`update tag set tag=? where tagid=?`;
    let result=await dbUnity.query(sql,[clsTag.tag,clsTag.tagid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}

/**
 * 
 * @param tag 删除标签
 * @param db 
 */
const delTag=async (tagid:number,db:dbUnity.transaction)=>{
  try{
    let sql=`delete from tag where tagid=?`;
    let result=await db.query(sql,[tagid]);
    return result;
  }catch(e){
    throw new Error(e);
  }
}
export {
  getFriendTag,
  getAllFriendTag,
  delTagById,
  addTagById,
  addTag,
  checkTagId,
  getTagFriendList,
  delFriendTag,
  setTag,
  delTag,
  delFriendTagByTagId
};