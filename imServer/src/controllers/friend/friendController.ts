import * as Koa from 'koa';
import { Controller,Before,Middleware, Get, Ctx, Post, } from 'koa-controllers';
import {Authenticate} from './../Authenticate';
import {messageResult} from './../../unitls/messageResult';
import  {validator} from './../verifyData/proxyVerify';
import {friendNote} from './../../model/friend/friend';
import {friendVerify} from './../../model/friend/friendVerify';
import * as friendNoteVerify from './../verifyData/friend/friendNoteVerify';
import {friend_Verify_role} from './../verifyData/friend/friendVerify';

import  * as friendBll from '../../BLL/friend/friendBll';
import  * as friendVerifyBll from '../../BLL/friend/friendVerifyBll';

@Controller
export default class friendController {
  /**
  * 
  * @param ctx 设置好友备注
  */
  @Post('/friend/setFriendNoteNickName')
  @Before(Authenticate)
  public async setFriendNoteNickName(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:friendNote=req.request.body;

      let vali:friendNote = validator({}, friendNoteVerify.frinde_note_verify_role,reqBody);
      let validatorNext =friendNoteVerify.frinde_note_verify_role.validatorNext;
      let _validator=validatorNext(vali,reqBody);
      _validator.next();
      !vali.userid || _validator.next();
      !vali.friendid || _validator.next();
      !vali.notenickname || _validator.next();

      ctx.body =await friendBll.setFriendNoteNickName(reqBody);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
  * 
  * @param ctx 根据用户账号获取好友列表
  */
  @Post('/friend/getUserFriendById')
  @Before(Authenticate)
  public async getUserFriendById(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.userid !="number"||reqBody.userid==null||reqBody.userid==''||reqBody.userid.toString().length!=8){
        throw new Error("verify:请输入8位数字账号");
      }
      ctx.body =await friendBll.getUserFriendById(reqBody.userid);
     }catch(e){
       ctx.body=await new messageResult(100,false,null).getMsg(e.message);
     }
  }
  /**
  * 
  * @param ctx 根据单聊房号删除好友
  */
  @Post('/friend/delFriendByChatId')
  @Before(Authenticate)
  public async delFriendByChatId(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.chatid !="number"||reqBody.chatid.toString().length!=10){
        throw new Error("verify:请输入10位数字账号");
      }
      if(typeof reqBody.friendid !="number"||reqBody.friendid.toString().length!=8){
        throw new Error("verify:请输入8位数字账号");
      }
      ctx.body =await friendBll.delFriendByChatId(reqBody.chatid,req.loginUser.userid,reqBody.friendid);
      }catch(e){
        ctx.body=await new messageResult(100,false,null).getMsg(e.message);
      }
  }

  /**
  * 
  * @param ctx 添加好友请求
  */
  @Post('/friend/addFriendVerify')
  @Before(Authenticate)
  public async addFriendVerify(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.userid !="number"||reqBody.userid.toString().length!=8){
        throw new Error("verify:请输入8位数字账号");
      }
      if(reqBody.userid==req.loginUser.userid){
        throw new Error("verify:放过自己吧");
      }
      let clsFriendVerify:friendVerify=new friendVerify(null,req.loginUser.userid,reqBody.userid,0,reqBody.verify);
      ctx.body =await friendVerifyBll.addFriendVerify(clsFriendVerify);
      }catch(e){
        ctx.body=await new messageResult(100,false,null).getMsg(e.message);
      }
  }
  /**
  * 
  * @param ctx 获取所有好友请求
  */
  @Post('/friend/getFriendVerifyList')
  @Before(Authenticate)
  public async getFriendVerifyList(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      ctx.body =await friendVerifyBll.getFriendVerifyList(req.loginUser.userid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
  * 
  * @param ctx 更新好友请求状态
  */
  @Post('/friend/updateFriendVerify')
  @Before(Authenticate)
  public async updateFriendVerify(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:friendVerify=req.request.body;

      let vali:friendVerify = validator({}, friend_Verify_role,reqBody);
      let validatorNext =friend_Verify_role.validatorNext;
      let _validator=validatorNext(vali,reqBody);
      _validator.next();
      !vali.id || _validator.next();
      !vali.fromuserid || _validator.next();
      !vali.status || _validator.next();
      reqBody.touserid=req.loginUser.userid;

      ctx.body =await friendVerifyBll.updateFriendVerify(reqBody);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
}