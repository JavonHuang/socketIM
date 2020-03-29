
import Vue from 'vue';
import Vuex from 'vuex';
import vuexAlong from  'vuex-along';
import loginStoreModule from './loginStoreModule/index';
import friendStoreModule from './friendStoreModule/index';
import chatStoreModule from './chatStoreModule/index';
import groupStoreModule from './groupStoreModule/index';
import pageJumpStoreModule from './pageJumpStoreModule/index';

Vue.use(Vuex);
vuexAlong.watchSession([],true);

const store=new Vuex.Store({
    modules:{
      loginStoreModule,
      friendStoreModule,
      chatStoreModule,
      pageJumpStoreModule,
      groupStoreModule
    },
    plugins: [vuexAlong]
});

export default store;