import mutationType from './mutationType';
const loginStoreModule={
  state:{
    userInfo:null
  },
  mutations: {
    [mutationType.SAVE_USERINFO](state,n){
      state.userInfo=n;
    }
  }
}

export default loginStoreModule;