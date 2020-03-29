import * as Koa from 'koa';
import { Controller,Before,Middleware, Get, Ctx, Post, } from 'koa-controllers';
import {Authenticate} from './../Authenticate';
import {messageResult} from './../../unitls/messageResult';
import  {validator} from './../verifyData/proxyVerify';
import  * as groupMessageVerify from './../verifyData/group/groupMessageVerify';
import  * as groupHomeVerify from './../verifyData/group/groupHomeVerify';
import * as groupBll from './../../BLL/group/groupBll';
import  * as group from '../../model/group/group';

@Controller
export default class groupController {
  /**
   * 群未读消息置零
   * @param ctx 
   */
  @Post('/group/reduceUnread')
  @Before(Authenticate)
  public async reduceUnread(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.homeid !="number"||reqBody.homeid.toString().length!=10){
        throw new Error("verify:请输入10位群聊账号");
      }
      ctx.body =await groupBll.reduceUnread(reqBody.homeid,req.loginUser.userid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 更新群信息
   * @param ctx 
   */
  @Post('/group/updateGroupHome')
  @Before(Authenticate)
  public async updateGroupHome(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:group.groupHome=req.request.body;
      reqBody.createby=req.loginUser.userid;
      let vali:group.groupHome = validator({}, groupHomeVerify.group_home_verify_role,reqBody);
      let validatorNext =groupHomeVerify.group_home_verify_role.validatorNext;
      let _validator=validatorNext(vali,reqBody);
      _validator.next();
      !vali.homeid || _validator.next();
      !vali.createby || _validator.next();
      !vali.homename || _validator.next();
      !vali.max || _validator.next();
      !vali.notice || _validator.next();
      ctx.body =await groupBll.updateGroupHome(reqBody);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 获取群内所有群成员
   * @param ctx 
   */
  @Post('/group/getGroupUserList')
  @Before(Authenticate)
  public async getGroupUserList(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.homeid !="number"||reqBody.homeid.toString().length!=10){
        throw new Error("verify:请输入10位群聊账号");
      }
      ctx.body =await groupBll.getGroupUserList(req.loginUser.userid,reqBody.homeid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 添加群聊房间
   * @param ctx 
   */
  @Post('/group/addGroupHome')
  @Before(Authenticate)
  public async addGroupHome(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(!Array.isArray(reqBody.userList)||reqBody.userList.length==0){
        throw new Error("verify:请输入群聊成员账号");
      }
      ctx.body =await groupBll.addGroupHome(req.loginUser.userid,reqBody.userList);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 获取群聊消息列表
   * @param ctx 
   */
  @Post('/group/getGroupMessageList')
  @Before(Authenticate)
  public async getGroupMessageList(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(typeof reqBody.homeid !="number"||reqBody.homeid.toString().length!=10){
        throw new Error("verify:请输入10位群聊账号");
      }
      ctx.body =await groupBll.getGroupMessageList(reqBody.homeid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 获取用户所在的群房间
   * @param ctx 
   */
  @Post('/group/getGroupHomeList')
  @Before(Authenticate)
  public async getGroupHomeList(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      ctx.body =await groupBll.getGroupHomeList(req.loginUser.userid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 删除群成员
   * @param ctx 
   */
  @Post('/group/delGroupUser')
  @Before(Authenticate)
  public async delGroupUser(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(!Array.isArray(reqBody.useridList)||reqBody.useridList.length==0){
        throw new Error("verify:请输入8位数字账号");
      }
      if(typeof reqBody.homeid !="number"||reqBody.homeid.toString().length!=10){
        throw new Error("verify:请输入10位群聊账号");
      }
      ctx.body =await groupBll.delGroupUser(reqBody.useridList,reqBody.homeid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 添加群成员
   * @param ctx 
   */
  @Post('/group/addGroupUser')
  @Before(Authenticate)
  public async addGroupUser(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(!Array.isArray(reqBody.useridList)||reqBody.useridList.length==0){
        throw new Error("verify:请输入8位数字账号");
      }
      if(typeof reqBody.homeid !="number"||reqBody.homeid.toString().length!=10){
        throw new Error("verify:请输入10位群聊账号");
      }
      ctx.body =await groupBll.addGroupUser(reqBody.useridList,reqBody.homeid,req.loginUser.userid);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 添加群聊信息
   * @param ctx 
   */
  @Post('/group/addGroupMessage')
  @Before(Authenticate)
  public async addGroupMessage(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:group.groupMessage=req.request.body;
      reqBody.fromuserid=req.loginUser.userid;
      let vali:group.groupMessage = validator({}, groupMessageVerify.group_message_verify_role, reqBody);
      let validatorNext1 =groupMessageVerify.group_message_verify_role.validatorNext;
      let _validator=validatorNext1(vali,reqBody);
      _validator.next();
      !vali.homeid || _validator.next();
      !vali.fromuserid || _validator.next();
      !vali.type || _validator.next();
      !vali.text || _validator.next();
      ctx.body =await groupBll.addGroupMessage(reqBody);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
}
