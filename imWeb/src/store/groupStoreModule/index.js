import mutationType from './mutationType';
import axios from '../../services/appServer';
import API from '../../utils/API';
const groupStoreModule={
  state:{
    homeList:null,
    msgList:[],
    unread:0
  },
  mutations: {
    [mutationType.CM_HOME_LIST](state,n){
      state.homeList=n;
    },
    [mutationType.CM_GET_GROUP_HOME_MS](state,n){
      state.msgList=n;
    },
    [mutationType.CM_ADD_GROUP_MS](state,n){
      state.unread=state.unread+1;
      state.homeList.forEach(item=>{
        if(item.homeid==n.homeid){
          item.unread++;
          item.lastMsg.text=n.text;
          item.lastMsg.sendtime=n.sendtime;
        }
      });
      state.msgList.push(n);
    },
    [mutationType.CM_ADD_GROUP_HOME_MS](state,n){
      state.msgList.push(n);
    },
    [mutationType.CM_GROUP_UNREAD](state,n=[]){
      state.unread=n;
    },
  },
  actions: {
    //根据用户账号获取聊天用户列表
    [mutationType.AC_GET_GROUP_HOME_LIST]({ dispatch,commit, state }, n){
      axios.post(API.GET_GROUP_HOME_LIST,{},false,false).then(res=>{
        if(res.data.code==200){
          commit(mutationType.CM_HOME_LIST,res.data.data);
          let num=0;
          res.data.data.forEach(item => {
            num+=item.unread;
          });
          commit(mutationType.CM_GROUP_UNREAD,num);
        }
      });
    },
    //获取群聊消息列表
    [mutationType.AC_GET_GROUP_HOME_MS]({ dispatch,commit, state }, n){
      axios.post(API.GET_GROUP_MESSAGE_LIST,n,false,false).then(res=>{
        if(res.data.code==200){
          commit(mutationType.CM_GET_GROUP_HOME_MS,res.data.data);
        }
      });
    },
    //群未读消息置零
    [mutationType.AC_REDUCEUNREAD]({ dispatch,commit, state }, n){
      axios.post(API.REDUCEUNREAD,n,false,false).then(res=>{
        if(res.data.code==200){
        }
      });
    },
  }
}

export default groupStoreModule;