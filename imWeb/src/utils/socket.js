import io from 'socket.io-client';
import config from './../services/config';
import store from './../store/appStore';
import chatMutationType from './../store/chatStoreModule/mutationType';
import groupMutationType from './../store/groupStoreModule/mutationType';

class socketIO{
  constructor(){
    this.token=null;
    this.socket=null;
    this.initSocket();
    if(config.userInfo()){
      this.token=config.userInfo().token;
      this.login();
    }
  }
  initSocket=()=>{
    this.socket=io.connect(`http://localhost:8090`);
  };
  reconnect_attempt(){
    this.socket.on('reconnect_attempt',()=>{
      this.login();
    });
  }
  /**
   * IM用户登录
   * @param {object} param
   * @param {boolean} async
   * @param {Function} callback 
   */
  login=()=>{
    if(this.socket&&config.userInfo()){
      this.token=config.userInfo().token;
      this.socket.open();
      this.chatOnMessage();
      this.groupOnMessage();
    }else{
      console.log('error:socket-login');
    }
    return new Promise((resolve, reject) => {
      this.socket.emit("/user/login",this.token,function(res){
        resolve(res);
      });
    });
  };
  /**
   * 退出IM
   */
  logout=()=>{
    if(this.socket)
    this.socket.close();
  };
  /**
   * 发送信息
   * @param {*} msgInfo 
   */
  chatMessage=(msgInfo)=>{
    return new Promise((resolve, reject) => {
      this.socket.emit("/chat/sendMessage",msgInfo,function(res){
        console.log("send",res)
        resolve(res);
      });
    });
  };
  /**
   *接收信息
  */
  chatOnMessage=()=>{
    this.socket.on("/chat/onMessage",function(res){
      console.log("accept",res);
      store.commit(chatMutationType.CM_ADD_UNREAD,res.data);
    });
  };  
  /**
   * 发送群聊信息
   * @param {*} msgInfo 
   */
  groupMessage=(msgInfo)=>{
    return new Promise((resolve, reject) => {
      this.socket.emit("/group/sendMessage",msgInfo,function(res){
        console.log("groupsend",res)
        resolve(res);
      });
    });
  };
  /**
   *接收群聊信息
  */
 groupOnMessage=()=>{
    this.socket.on("/group/groupOnMessage",function(res){
      console.log("GroupAccept",res);
      store.commit(groupMutationType.CM_ADD_GROUP_MS,res.data);
    });
  };
}


export default socketIO;