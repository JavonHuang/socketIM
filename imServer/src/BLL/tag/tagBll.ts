import {messageResult} from '../../unitls/messageResult';
import {tag} from './../../model/tag/tag';
import * as DBfactory from '../../DBunity/DBfactory';
import * as tagDal from './../../DAL/tag/tagDal';
import * as redis from './../../unitls/redis';

/**
 * 获取标签成员
 * @param userid 
 * @param tagid 
 */
const getTagFriendList=async(userid:number,tagid:number)=>{
  try{
    let result:any=await tagDal.getTagFriendList(userid,tagid);
    return await new messageResult(200,true,result).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 根据用户账号获取对应好友的标签
 * @param userid 用户账号
 * @param friendid 好友账号
 */
const getFriendTag=async (userid:number,friendid:number)=>{
  try{
    let result:any=await tagDal.getFriendTag(userid,friendid);
    return await new messageResult(200,true,result).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 根据用户账号获取所有标签
 * @param userid 用户账号
 */
const getAllFriendTag=async (userid:number)=>{
  try{
    let result:any=await tagDal.getAllFriendTag(userid);
    return await new messageResult(200,true,result).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 更新好友标签
 * @param userid 
 * @param friendid 
 * @param deltagid 需删除标签
 * @param addtagid 新增的标签
 */
const updateTag=async(userid:number,friendid:number,addtagid:Array<number>,newtagid:Array<string>)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    let a= await tagDal.delTagById(userid,friendid,db);
    if(addtagid.length==0&&newtagid.length==0){
      await db.commit();
      return new messageResult(200,true,null).getMsg();
    }
    for(let i=0;i<addtagid.length;i++){
      let chackResut=await tagDal.checkTagId(addtagid[i],db);
      if(chackResut.length==0){
        await db.rollBack();
        return await new messageResult(30001,false,null).getMsg();
      }
    }
    for(let i=0;i<addtagid.length;i++){
      let claTag:tag=new tag(addtagid[i],userid,friendid,'');
      await tagDal.addTagById(claTag,db);
      return new messageResult(200,true,null).getMsg();
    }

    for(let i=0;i<newtagid.length;i++){
      let tagid:any=await redis.getNumberByKey('tagid',1000000000);
      let claTag:tag=new tag(tagid,userid,friendid,newtagid[i]);
      await tagDal.addTagById(claTag,db);
      await tagDal.addTag(claTag,db);
    }
    await db.commit();
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 将好友移出标签
 * @param userid 
 * @param friendid 
 * @param tagid 
 */
const delFriendTag=async (tagList:Array<tag>)=>{
  let db:any;
  db=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    for(let i=0;i<tagList.length;i++){
      await tagDal.delFriendTag(tagList[i],db);
    }
    await db.commit();
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 设置好友标签
 * @param clsTagid 
 * @param db 
 */
const addTagById=async(clsTagid:tag,db:DBfactory.transaction)=>{
  try{
    await tagDal.addTagById(clsTagid,db);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 
 * @param tag 添加标签
 * @param db 
 */
const addTag=async(clsTagid:tag,db:DBfactory.transaction)=>{
  try{
    await tagDal.addTag(clsTagid,db);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 
 * @param tag 添加标签
 * @param db 
 */
const setTag=async(clsTag:tag)=>{
  try{
    await tagDal.setTag(clsTag);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

/**
 * 
 * @param userid 删除标签
 * @param tagid 
 */
const delTag=async(userid:number,tagid:number)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    await tagDal.delTag(tagid,db);
    await tagDal.delFriendTagByTagId(userid,tagid,db);
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

const updateTagItem=async (friendList:Array<number>,userid:number,tagid:number)=>{
  let db:DBfactory.transaction=new DBfactory.transaction();
  try{
    await db.beginTransaction();
    await tagDal.delFriendTagByTagId(userid,tagid,db);
    for(let i=0;i<friendList.length;i++){
      let clsFriendTag:tag=new tag(tagid,userid,friendList[i],'');
      let addResut=await tagDal.addTagById(clsFriendTag,db);
      if(addResut.warningCount!=0){
        await db.rollBack();
        return await new messageResult(30004,false,null).getMsg();
      }
    }
    await db.commit();
    return await new messageResult(200,true,null).getMsg();
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
export {
  getFriendTag,
  getAllFriendTag,
  updateTag,
  addTagById,
  addTag,
  getTagFriendList,
  delFriendTag,
  setTag,
  delTag,
  updateTagItem
};