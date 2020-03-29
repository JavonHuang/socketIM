import * as redis from './../unitls/redis';
import * as tokenBll from './../unitls/token';
import * as chatBll from './../BLL/chat/chatBll';
import * as groupBll from './../BLL/group/groupBll';
import  * as sendSingleMsgVerify from './verifyData/chat/sendSingleMsgVerify';
import  {validator} from './verifyData/proxyVerify';
import {sendSingleMsg,msType} from './../model/chat/sendSingleMsg';
import {messageResult} from './../unitls/messageResult';

const websocket=async (server:any)=>{
  try{
    const io = require("socket.io")(server);
    io.on("connection", (socket:any) => {
      socket.on("/user/login", async (token:any,callback:any) => {
        try{
          let result:any=tokenBll.verifyToken(token).data;
          await redis.updatehCache('socketId', result.data.userid, socket.id);
          await redis.updatehCache('socketIdToken',socket.id, token);
          //建立所有群的监听
          let homelist:any=await groupBll.getGroupHomeList(result.data.userid);
          if(homelist.data.length>0){
            homelist.data.forEach((item:any) => {
              socket.join(item.homeid);
            });
          }
          callback(result);
        }catch(e){
          throw new Error(e);
        }
      });
      
      //断开连接,将redis中的socketid移除
      socket.on("disconnect", async () => {
        try{
          let userToken:any = await redis.gethCacheById('socketIdToken',socket.id);
          let tokenInfo:any=tokenBll.verifyToken(userToken).data;
          await redis.delhCacheById('socketIdToken',socket.id);
          await redis.delhCacheById('socketId',tokenInfo.data.userid);
          socket.leave()
        }catch(e){
          throw new Error(e);
        }
      });

      //监听用户发布聊天内容
      socket.on('/chat/sendMessage', async (msgInfo:sendSingleMsg,callback:any) => {
        try{
        let userToken:any = await redis.gethCacheById('socketIdToken',socket.id);
        let tokenInfo:any=tokenBll.verifyToken(userToken).data;
        msgInfo.read=0;
        msgInfo.fromuserid=tokenInfo.data.userid;
        let vali1:sendSingleMsg = validator({}, sendSingleMsgVerify.sendSingleMsgVerify_role, msgInfo);
        let validatorNext1 =sendSingleMsgVerify.sendSingleMsgVerify_role.validatorNext;
        let _validator1=validatorNext1(vali1,msgInfo);
        _validator1.next();
        !vali1.chatid || _validator1.next();
        !vali1.fromuserid || _validator1.next();
        !vali1.touserid || _validator1.next();
        !vali1.type || _validator1.next();
        !vali1.text || _validator1.next();

        let result:messageResult= await chatBll.sendSingleChat(msgInfo);
        let acceptBySocketId = await redis.gethCacheById('socketId',msgInfo.touserid);
        if(acceptBySocketId!==null){
          msgInfo.sendtime=new Date();
          socket.to(acceptBySocketId).emit('/chat/onMessage', await new messageResult(200,false,msgInfo).getMsg());
        }
        if(result.success){
          callback(await new messageResult(200,false,msgInfo).getMsg());
        }else{
          callback(result);
        }
        }catch(e){
          callback(await new messageResult(100,false,msgInfo).getMsg(e.message));
        }
      });

      //监听用户发布的群聊内容-广播出去
      socket.on('/group/sendMessage', async (groupMessage:any,callback:any) => {
        let userToken:any = await redis.gethCacheById('socketIdToken',socket.id);
        let tokenInfo:any=tokenBll.verifyToken(userToken).data;
        groupMessage.fromuserid=tokenInfo.data.userid;
        groupMessage.img=tokenInfo.data.img;
        groupMessage.nickname=tokenInfo.data.nickname;
        groupMessage.notenickname=null;
        groupMessage.sendtime=new Date();
        groupMessage.sex=null;
        groupMessage.signature=null;
        await groupBll.addGroupMessage(groupMessage);
        io.to(groupMessage.homeid).emit('/group/groupOnMessage',await new messageResult(200,false,groupMessage).getMsg());
      })

      //退出群聊房间
      socket.on("roomout", (user:any) => {
        console.log("socket loginout!");
      });
    });
  }catch(e){
    throw new Error(e);
  }
}

export {
  websocket
};