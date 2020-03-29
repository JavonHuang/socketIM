import mutationType from './mutationType';
const pageJumpStoreModule={
  state:{
    friendInfo:{},
    friendTag:[],
    tag:{},
    addFriendInfo:{},
    homeChosenIndex:0,
    homeInfo:{}
  },
  mutations: {
    [mutationType.FRIENDLIST_CM_FRIENDIFO](state,n){
      state.friendInfo=n;
    },
    [mutationType.USERINFO_CM_FRIEND_TAG](state,n){
      state.friendTag=n;
    },
    [mutationType.TAG_CM_TAG](state,n){
      state.tag=n;
    },
    [mutationType.ADDFRIEND_CM_INFO](state,n){
      state.addFriendInfo=n;
    },
    [mutationType.HOME_CM_INDEX](state,n){
      state.homeChosenIndex=n;
    },
    [mutationType.HOME_CM_INFO](state,n){
      state.homeInfo=n;
    }
  }
}

export default pageJumpStoreModule;