<template>
  <div class="friendlist">
    <div class="list-item" v-show="!isSeach" v-on:click="addFriend()">
      <img class="list-photo" src="./../../assets/img/friend_new.svg">
      <div class="list-contain">
        <span>新的朋友</span>
      </div>
    </div>
    <div class="list-item" v-show="!isSeach" v-on:click="handleHomeList()">
      <img class="list-photo" src="./../../assets/img/friend_chat.svg">
      <div class="list-contain">
        <span>群聊</span>
      </div>
    </div>
    <div class="list-item" v-show="!isSeach" v-on:click="handleTag()">
      <img class="list-photo" src="./../../assets/img/friend_tag.svg">
      <div class="list-contain">
        <span>标签</span>
      </div>
    </div>
    <div class="list-space" v-show="!isSeach">
      我的朋友
    </div>
    <div v-show="!isSeach">
      <div class="list-item" v-for="item in friendList" v-bind:key="item.userid" v-on:click="handleChat(item)">
        <img class="list-photo" v-bind:src="item.img!=null?item.img:require('./../../assets/img/my.jpg')">
        <div class="list-contain">
          <span>{{item.notenickname!=null?item.notenickname:item.nickname}}</span>
        </div>
      </div>
    </div>
    <div v-show="isSeach">
      <div class="list-item" v-for="index in 20" v-bind:key="index" v-on:click="handleChat(item)">
        <img class="list-photo" src="./../../assets/img/my.jpg">
        <div class="list-contain">
          <span>群聊({{index}})搜索结果</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import friendMutationType from './../../store/friendStoreModule/mutationType';
import pageJumpMutationType from './../../store/pageJumpStoreModule/mutationType';

import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState({
      friendList:state=>state.friendStoreModule.friendList,
      userInfo:state=>state.loginStoreModule.userInfo
    })
  },
  data(){
    return{
      isSeach:false
    }
  },
  created(){
    let that=this;
    that.getFriendList();
  },
  methods:{
    getFriendList(){
      let that=this;
      that.$store.dispatch(friendMutationType.AC_GET_FRIEND_LIST,{userid:that.userInfo.userid});
    },
    seachList(e){
      let that=this;
      if(e==null){
        that.isSeach=false;
      }else{
        that.isSeach=true;
      };
    },
    handleChat(e){
      let that=this;
      that.$store.commit(pageJumpMutationType.FRIENDLIST_CM_FRIENDIFO,e);
      that.$router.push('/userDetail');
    },
    handleTag(){
      let that=this;
      that.$router.push('/tag');
    },
    addFriend(){
      let that=this;
      that.$parent.addFriend();
    },
    handleHomeList(){
      let that=this;
      that.$router.push('/group/homeList');
    }
  }
}
</script>

<style lang="scss" scoped>
.friendlist{
  height: auto;
  padding-bottom: 200px;
  .list-item{
    height: 120px;
    padding-left:20px;
    display: flex;
    box-sizing:border-box;
    .list-photo{
      width: 80px;
      height: 80px;
      margin: auto 0;
      margin-right:20px;
    }
    .list-contain{
      width: 100%;
      border-bottom: 1px solid $borderColor02;
      display: flex;
      span{
        margin: auto 0;
        font-weight: 700;
        font-size: 28px;
      }
    }
  }
  .list-space{
    background: $backgroundColor02;
    height: 60px;
    line-height: 60px;
    font-size: 26px;
    color: $fontColor02;
    text-align: left;
    padding: 0px 20px;
  }
}
</style>