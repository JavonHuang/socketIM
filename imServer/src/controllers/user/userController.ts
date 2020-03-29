import * as Koa from 'koa';
import { Controller,Before,Middleware, Get, Ctx, Post, } from 'koa-controllers';
import {Authenticate} from './../Authenticate';
import {messageResult} from './../../unitls/messageResult';
import  {validator} from './../verifyData/proxyVerify';
import  * as userVerify from './../verifyData/user/userVerify';
import  * as userInfoVerify from './../verifyData/user/userInfoVerify';
import  * as userBLL from '../../BLL/user/userBll';
import  * as userInfoBll from '../../BLL/user/userInfoBll';
import  * as userModel from '../../model/user/user';
import  {userInfo} from '../../model/user/userInfo';

@Controller
export default class userController {
  /**
  * 
  * @param ctx 用户注册
  */
 @Post('/user/userRegistered')
 public async userRegistered(@Ctx ctx: Koa.BaseContext) {
   try{
    let req:any=ctx;
    let reqBody1:userInfo=req.request.body;
    let reqBody2:userModel.user=req.request.body;

    let vali1:userInfo = validator({}, userInfoVerify.updateUserInfo_Role, reqBody1);
    let validatorNext1 =userInfoVerify.updateUserInfo_Role.validatorNext;
    let _validator1=validatorNext1(vali1,reqBody1);
    _validator1.next();
    // !vali1.userid || _validator1.next();
    !vali1.nickname || _validator1.next();
    !vali1.img || _validator1.next();
    !vali1.sex || _validator1.next();
    !vali1.age || _validator1.next();
    !vali1.signature || _validator1.next();

    let vali2:userModel.user = validator({}, userVerify.user_login_verify_role, reqBody2);
    let validatorNext2 =userVerify.user_login_verify_role.validatorNext;
    let _validator2=validatorNext2(vali2,reqBody2);
    _validator2.next();
    // !vali2.userid || _validator2.next();
    !vali2.password || _validator2.next();

     ctx.body =await userBLL.userRegistered(reqBody2,reqBody1);
   }catch(e){
     ctx.body=await new messageResult(100,false,null).getMsg(e.message);
   }
 }
  /**
  * 
  * @param ctx 根据用户账号更新用户信息
  */
 @Post('/user/updateUserInfoByUserId')
 @Before(Authenticate)
 public async updateUserInfoByUserId(@Ctx ctx: Koa.BaseContext) {
   try{
    let req:any=ctx;
    let reqBody:userInfo=req.request.body;

    let vali:userInfo = validator({}, userInfoVerify.updateUserInfo_Role, reqBody);
    let validatorNext =userInfoVerify.updateUserInfo_Role.validatorNext;
    let _validator=validatorNext(vali,reqBody);
    _validator.next();
    !vali.userid || _validator.next();
    !vali.nickname || _validator.next();
    !vali.img || _validator.next();
    !vali.sex || _validator.next();
    !vali.age || _validator.next();
    !vali.signature || _validator.next();

     ctx.body =await userInfoBll.updateUserInfoByUserId(reqBody);
   }catch(e){
     ctx.body=await new messageResult(100,false,null).getMsg(e.message);
   }
 }
  /**
  * 
  * @param ctx 根据用户账号获取用户信息
  */
 @Post('/user/getUserInfoByUserId')
 @Before(Authenticate)
 public async getUserInfoByUserId(@Ctx ctx: Koa.BaseContext) {
   try{
     let req:any=ctx;
     let reqBody:any=req.request.body;
     if(reqBody.userid==null||reqBody.userid==''){
       throw new Error('verify:userid can’t null or ""');
     }
     ctx.body =await userInfoBll.getUserInfoByUserId(reqBody.userid);
   }catch(e){
     ctx.body=await new messageResult(100,false,null).getMsg(e.message);
   }
 }
 /**
  * 
  * @param ctx 用户修改密码
  */
  @Post('/user/updatePassword')
  @Before(Authenticate)
  public async updatePassword(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;

      let vali = validator({}, userVerify.updatePassword_verify_role, reqBody);
      let validatorNext =userVerify.updatePassword_verify_role.validatorNext;
      let _validator=validatorNext(vali,reqBody);
      _validator.next();
      !vali.userid || _validator.next();
      !vali.password || _validator.next();
      !vali.oldpassword || _validator.next();

      let queryInf:userModel.updateUser=new userModel.updateUser(reqBody.userid,reqBody.password,reqBody.oldpassword);
      ctx.body =await userBLL.updatePassword(queryInf);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 用户登录
   * @param ctx 
   */
  @Post('/user/login')
  public async login(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      
      let vali = validator({}, userVerify.user_login_verify_role, reqBody);
      let validatorNext =userVerify.user_login_verify_role.validatorNext;
      let _validator=validatorNext(vali,reqBody);
      _validator.next();
      !vali.userid || _validator.next();
      !vali.password || _validator.next();
  
      let queryInf:userModel.user=new userModel.user(reqBody.userid,reqBody.password);
      ctx.body =await userBLL.getUser(queryInf);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
  /**
   * 根据用户账号或昵称搜索用户
   * @param ctx 
   */
  @Post('/user/seachByUserId')
  @Before(Authenticate)
  public async seachByUserId(@Ctx ctx: Koa.BaseContext) {
    try{
      let req:any=ctx;
      let reqBody:any=req.request.body;
      if(reqBody.seachVal==null||reqBody.seachVal==''){
        throw new Error('verify:seachVal can’t null or ""');
      }
      ctx.body =await userInfoBll.seachByUserId(reqBody.seachVal);
    }catch(e){
      ctx.body=await new messageResult(100,false,null).getMsg(e.message);
    }
  }
}