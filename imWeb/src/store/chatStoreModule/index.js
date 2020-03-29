import mutationType from './mutationType';
import axios from '../../services/appServer';
import API from '../../utils/API';
import config from './../../services/config';
const chatStoreModule={
  state:{
    chatList:[],
    unread:0,
    singleChatMsgList:[]
  },
  mutations:{
    [mutationType.CM_GET_CHAT_LIST](state,n=[]){
      state.chatList=n;
    },
    [mutationType.CM_ADD_CHAT_ITEM](state,n){
      state.singleChatMsgList.push(n);
    },
    [mutationType.CM_UNREAD](state,n=[]){
      state.unread=n;
    },
    [mutationType.CM_ADD_UNREAD](state,n){
      state.chatList.forEach(item=>{
        if(item.chatid==n.chatid){
          item.unread++;
          item.text=n.text;
          item.sendtime=n.sendtime;
        }
      });
      state.unread++;
      state.singleChatMsgList.push(n);
    },
    [mutationType.CM_GET_SINGLE_CHAT_MSG_LIST](state,n=[]){
      state.singleChatMsgList=n;
    }
  },
  actions: {
    //根据用户账号获取聊天用户列表
    [mutationType.AC_GET_CHAT_LIST]({ dispatch,commit, state }, n){
      let userInfo=config.userInfo().userInfo;
      axios.post(API.GET_SINGLE_CHAT_BY_USERID,{userid:userInfo.userid},false,false).then(res=>{
        if(res.data.code==200){
          commit(mutationType.CM_GET_CHAT_LIST,res.data.data);
          let num=0;
          res.data.data.forEach(item => {
            num+=item.unread;
          });
          commit(mutationType.CM_UNREAD,num);
        }
      });
    },
    //根据单聊房号获取和好友的聊天信息列表
    [mutationType.AC_GET_SINGLE_CHAT_MSG_LIST]({ dispatch,commit, state }, n){
      axios.post(API.GET_SINGLE_CHAT_MSG_LIST,{chatid:n.chatid},false,false).then(res=>{
        if(res.data.code==200){
          commit(mutationType.CM_GET_SINGLE_CHAT_MSG_LIST,res.data.data);
          dispatch(mutationType.AC_UPDATE_SINGLE_READ,{chatid:n.chatid});
        }else{
          commit(mutationType.CM_GET_SINGLE_CHAT_MSG_LIST,[]);
        }
      });
    },
    //根据单聊房号和用户账号更新所有消息已读
    [mutationType.AC_UPDATE_SINGLE_READ]({ dispatch,commit, state }, n){
      let userInfo=config.userInfo().userInfo;
      axios.post(API.UPDATE_SINGLE_READ,{userid:userInfo.userid,chatid:n.chatid},false,false).then(res=>{
        if(res.data.code==200){
        }
      });
    }
  }
}

export default chatStoreModule