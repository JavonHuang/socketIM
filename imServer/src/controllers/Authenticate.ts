import { Controller, Before, Get, Middleware } from 'koa-controllers';
import * as token from './../unitls/token';

class Authenticate implements Middleware {
  public middleware = async (ctx: any, next: any) => {
      let req:any=ctx;
      let result=token.verifyToken(req.request.header.token);
      if(!result.success){
        ctx.body=result;
      }else{
        ctx.loginUser=result.data.data;
        await next();  
      } 
  }
}

export{
  Authenticate
}