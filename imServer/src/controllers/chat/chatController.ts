import * as Koa from 'koa';
import { Controller,Before,Middleware, Get, Ctx, Post, } from 'koa-controllers';
import {Authenticate} from './../Authenticate';
import {messageResult} from './../../unitls/messageResult';
import  {validator} from './../verifyData/proxyVerify';
import  * as sendSingleMsgVerify from './../verifyData/chat/sendSingleMsgVerify';
import  * as chatBll from '../../BLL/chat/chatBll';
import {sendSingleMsg,msType} from './../../model/chat/sendSingleMsg';

@Controller
export default class chatController {
  /**
  * 
  * @param ctx 发送聊天信息
  */
 @Post('/chat/sendSingleChat')
 @Before(Authenticate)
 public async sendSingleChat(@Ctx ctx: Koa.BaseContext) {
    try{
     let req:any=ctx;
     let reqBody:sendSingleMsg=req.request.body;

      reqBody.fromuserid=req.loginUser.userid;
      reqBody.read=0;
      let vali1:sendSingleMsg = validator({}, sendSingleMsgVerify.sendSingleMsgVerify_role, reqBody);
      let validatorNext1 =sendSingleMsgVerify.sendSingleMsgVerify_role.validatorNext;
      let _validator1=validatorNext1(vali1,reqBody);
      _validator1.next();
      !vali1.chatid || _validator1.next();
      !vali1.fromuserid || _validator1.next();
      !vali1.touserid || _validator1.next();
      !vali1.type || _validator1.next();
      !vali1.text || _validator1.next();
      // !vali1.read || _validator1.next();

     ctx.body =await chatBll.sendSingleChat(reqBody);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }

  /**
  * 
  * @param ctx 根据用户账号获取聊天用户列表
  */
  @Post('/chat/getSingleChatFriend')
  @Before(Authenticate)
  public async getSingleChatFriend(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.userid !="number"||reqBody.userid==null||reqBody.userid==''||reqBody.userid.toString().length!=8){
        throw new Error("verify:请输入8位数字账号");
      }
      ctx.body =await chatBll.getSingleChatFriend(reqBody.userid);
     }catch(e){
       ctx.body=await new messageResult(100,false,null).getMsg(e.message);
     }
  }
  
  /**
  * 根据单聊房号获取和好友的聊天信息列表
  */
 @Post('/chat/getSingleChatMsgList')
 @Before(Authenticate)
 public async getSingleChatMsgList(@Ctx ctx: Koa.BaseContext) {
   try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.chatid !="number"||reqBody.chatid==null||reqBody.chatid==''||reqBody.chatid.toString().length!=10){
        throw new Error("verify:请输入10位数字账号");
      }
      ctx.body =await chatBll.getSingleChatMsgList(reqBody.chatid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }

  /**
  * 根据单聊房号更新所有消息已读
  */
  @Post('/chat/updateSingleRead')
  @Before(Authenticate)
  public async updateSingleRead(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.chatid !="number"||reqBody.chatid==null||reqBody.chatid==''||reqBody.chatid.toString().length!=10){
        throw new Error("verify:请输入10位数字账号");   
      }
      if(typeof reqBody.userid !="number"||reqBody.userid==null||reqBody.userid==''||reqBody.userid.toString().length!=8){
        throw new Error("verify:请输入8位数字账号");   
      }
      ctx.body =await chatBll.updateSingleRead(reqBody.chatid,reqBody.userid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
}