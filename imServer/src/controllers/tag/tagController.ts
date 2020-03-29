import * as Koa from 'koa';
import { Controller,Before,Middleware, Get, Ctx, Post, } from 'koa-controllers';
import {Authenticate} from './../Authenticate';
import {messageResult} from './../../unitls/messageResult';
import  {validator} from './../verifyData/proxyVerify';
import {tag} from './../../model/tag/tag';
import * as tagVerify from './../verifyData/tag/friendTagVerify';

import  * as tagBll from '../../BLL/tag/tagBll';

@Controller
export default class tagController {
  /**
  * 
  * @param ctx 获取标签成员
  */
 @Post('/tag/getTagFriendList')
 @Before(Authenticate)
 public async getTagFriendList(@Ctx ctx: Koa.BaseContext) {
   try{
     let req:any=ctx;
     let reqBody:any=req.request.body;
     if(typeof reqBody.userid !="number"||reqBody.userid==null||reqBody.userid==''||reqBody.userid.toString().length!=8){
       throw new Error("verify:请输入8位数字账号");
     }
     if(typeof reqBody.tagid !="number"||reqBody.tagid==null||reqBody.tagid==''||reqBody.tagid.toString().length!=10){
       throw new Error("verify:请输入10位数字账号");
     }
     ctx.body =await tagBll.getTagFriendList(reqBody.userid,reqBody.tagid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
 }
  /**
  * 
  * @param ctx 根据用户账号获取对应好友的标签
  */
  @Post('/tag/getFriendTag')
  @Before(Authenticate)
  public async getFriendTag(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.userid !="number"||reqBody.userid==null||reqBody.userid==''||reqBody.userid.toString().length!=8){
        throw new Error("verify:请输入8位数字账号");
      }
      if(typeof reqBody.friendid !="number"||reqBody.friendid==null||reqBody.friendid==''||reqBody.friendid.toString().length!=8){
        throw new Error("verify:请输入8位数字账号");
      }
      ctx.body =await tagBll.getFriendTag(reqBody.userid,reqBody.friendid);
     }catch(e){
       ctx.body=await new messageResult(100,false,null).getMsg(e.message);
     }
  }
  /**
  * 
  * @param ctx 根据用户账号获取所有标签
  */
  @Post('/tag/getAllFriendTag')
  @Before(Authenticate)
  public async getAllFriendTag(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.userid !="number"||reqBody.userid==null||reqBody.userid==''||reqBody.userid.toString().length!=8){
        throw new Error("verify:请输入8位数字账号");
      }
      ctx.body =await tagBll.getAllFriendTag(reqBody.userid);
      }catch(e){
        ctx.body=await new messageResult(100,false,null).getMsg(e.message);
      }
  }
  /**
  * 
  * @param ctx 将好友移出标签
  */
 @Post('/tag/delFriendTag')
 @Before(Authenticate)
 public async delFriendTag(@Ctx ctx: Koa.BaseContext) {
    try{
     let req:any=ctx;
     let reqBody:any=req.request.body;
     if(!Array.isArray(reqBody)||reqBody.length==0){
      throw new Error("verify:请输入Array格式");
    }

    for(let i=0;i<reqBody.length;i++){
      reqBody[i]
      let vali:tag = validator({}, tagVerify.frinde_tag_verify_role, reqBody[i]);
      let validatorNext =tagVerify.frinde_tag_verify_role.validatorNext;
      let _validator=validatorNext(vali,reqBody[i]);
      _validator.next();
      !vali.userid || _validator.next();
      !vali.friendid || _validator.next();
      !vali.tagid || _validator.next();
    }

    ctx.body =await tagBll.delFriendTag(reqBody);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
 }
  /**
  * 
  * @param ctx 更新好友标签
  */
  @Post('/tag/updateTag')
  @Before(Authenticate)
  public async updateTag(@Ctx ctx: Koa.BaseContext) {
   try{
    let req:any=ctx;
    let reqBody:any=req.request.body;
    if(typeof reqBody.userid !="number"||reqBody.userid==null||reqBody.userid==''||reqBody.userid.toString().length!=8){
      throw new Error("verify:请输入8位数字账号");
    }
    if(typeof reqBody.friendid !="number"||reqBody.friendid==null||reqBody.friendid==''||reqBody.friendid.toString().length!=8){
      throw new Error("verify:请输入8位数字账号");
    }
    if(!Array.isArray(reqBody.addtagid)){
      throw new Error("verify:addtagid 数据类型错误");
    }
    if(!Array.isArray(reqBody.newtagid)){
      throw new Error("verify:newtagid 数据类型错误");
    }
    ctx.body =await tagBll.updateTag(reqBody.userid,reqBody.friendid,reqBody.addtagid,reqBody.newtagid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }

  /**
  * 
  * @param ctx 修改标签名称
  */
  @Post('/tag/setTag')
  @Before(Authenticate)
  public async setTag(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:tag=req.request.body;
      let vali:tag = validator({}, tagVerify.frinde_tag_verify_role, reqBody);
      let validatorNext =tagVerify.frinde_tag_verify_role.validatorNext;
      let _validator=validatorNext(vali,reqBody);
      _validator.next();
      !vali.userid || _validator.next();
      !vali.tagid || _validator.next();
      !vali.tag || _validator.next();
      
      ctx.body =await tagBll.setTag(reqBody);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }

  /**
  * 
  * @param ctx 删除标签
  */
 @Post('/tag/delTag')
 @Before(Authenticate)
 public async delTag(@Ctx ctx: Koa.BaseContext) {
  try{
    let req:any=ctx;
    let reqBody=req.request.body;
    
    if(typeof reqBody.tagid !="number"||reqBody.tagid==null||reqBody.tagid==''||reqBody.tagid.toString().length!=10){
      throw new Error("verify:请输入8位数字账号");
    }
      ctx.body =await tagBll.delTag(req.loginUser.userid,reqBody.tagid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
  * 
  * @param ctx 设置标签的成员
  */
 @Post('/tag/updateTagItem')
 @Before(Authenticate)
 public async updateTagItem(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody=req.request.body;
      if(!Array.isArray(reqBody.friendList)||reqBody.friendList.length==0){
        throw new Error("verify:请输入好友列表");
      }
      if(typeof reqBody.tagid !="number"||reqBody.tagid==null||reqBody.tagid==''||reqBody.tagid.toString().length!=10){
        throw new Error("verify:请输入8位数字账号");
      }
      ctx.body =await tagBll.updateTagItem(reqBody.friendList,req.loginUser.userid,reqBody.tagid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
}