import mutationType from './mutationType';
import axios from '../../services/appServer';
import API from '../../utils/API';
const friendStoreModule={
  state:{
    friendList:[]
  },
  mutations:{
    [mutationType.CM_GET_FRIEND_LIST](state,n=[]){
      state.friendList=n;
    }
  },
  actions: {
    [mutationType.AC_GET_FRIEND_LIST]({ commit, state }, n){
      return new Promise((resolve, reject) => {
        axios.post(API.GET_USER_FRIEND_BYID,n,false,false).then(res=>{
          if(res.data.code==200){
            commit(mutationType.CM_GET_FRIEND_LIST,res.data.data);
            resolve(res);
          }
        }).catch(e=>{
          reject(e);
        });
      })
    }
  }
}

export default friendStoreModule