<template>
  <div class="messagelist">
    <div>
      <div class="list-item" v-for="item in chatList" v-bind:key="item.chatid" v-on:click="handleChat(item)">
        <img class="list-photo" v-bind:src="item.img!=null?item.img:require('./../../assets/img/my.jpg')">
        <img class="msg-num-img" v-show="item.unread>99" src="./../../assets/img/more_num.svg">
        <span class="msg-num" v-show="item.unread>0&&item.unread<99">{{item.unread}}</span>
        <div class="list-contain">
          <span>{{item.notenickname!=null?item.notenickname:item.nickname}}</span>
          <span>{{item.text}}</span>
        </div>
        <div class="list-tips">
          <span>{{Object.JXmonent('HH:mm',item.sendtime)}}</span>
        </div>
      </div>

      <div class="list-item" v-for="item in homeList" v-bind:key="item.chatid" v-on:click="handleGroupChat(item)">
        <!-- <img class="list-photo" v-bind:src="item.img!=null?item.img:require('./../../assets/img/my.jpg')"> -->

        <div class="list-photo-user" v-if="item.userList.length==9||item.userList.length==8||item.userList.length==7">
          <img class="user-photo-9" v-for="_item in item.userList" v-bind:key="_item.userid" v-bind:src="_item.img!=null?_item.img:require('./../../assets/img/my.jpg')">
        </div>
        <div class="list-photo-user" v-if="item.userList.length==5||item.userList.length==6">
          <div class="user-row2">
            <img class="user-photo-56" v-for="_item in item.userList" v-bind:key="_item.userid" v-bind:src="_item.img!=null?_item.img:require('./../../assets/img/my.jpg')">
          </div>
        </div>
        <div class="list-photo-user" v-if="item.userList.length==4||item.userList.length==3">
          <img class="user-photo-34" v-for="_item in item.userList" v-bind:key="_item.userid" v-bind:src="_item.img!=null?_item.img:require('./../../assets/img/my.jpg')">
        </div>

        <img class="msg-num-img" v-show="item.unread>99" src="./../../assets/img/more_num.svg">
        <span class="msg-num" v-show="item.unread>0&&item.unread<99">{{item.unread}}</span>
        <div class="list-contain">
          <span>{{item.homename}}</span>
          <span v-if="item.lastMsg">{{item.lastMsg.text}}</span>
        </div>
        <div class="list-tips">
          <span>{{Object.JXmonent('HH:mm',item.sendtime)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import groupMutationType from './../../store/groupStoreModule/mutationType';
import chatMutationType from './../../store/chatStoreModule/mutationType';
import pageJumpMutationType from './../../store/pageJumpStoreModule/mutationType';
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState({
      homeList:state=>state.groupStoreModule.homeList,
      chatList:state=>state.chatStoreModule.chatList,
      userInfo:state=>state.loginStoreModule.userInfo
    })
  },
  data(){
    return{
    }
  },
  mounted(){
    let that=this;
    that.getChatList();
  },
  methods:{
    getChatList(){
      let that=this;
      that.$store.dispatch(chatMutationType.AC_GET_CHAT_LIST,null);
      that.$store.dispatch(groupMutationType.AC_GET_GROUP_HOME_LIST,null);
    },
    handleChat(e){
      let that=this;
      // that.$store.dispatch(chatMutationType.AC_UPDATE_SINGLE_READ,{chatid:e.chatid});
      that.$store.dispatch(chatMutationType.AC_GET_SINGLE_CHAT_MSG_LIST,{chatid:e.chatid});
      that.$store.commit(pageJumpMutationType.FRIENDLIST_CM_FRIENDIFO,e);
      that.$router.push("/chat");
    },
    handleGroupChat(e){
      let that=this;
      that.$store.dispatch(groupMutationType.AC_GET_GROUP_HOME_MS,{homeid:e.homeid});
      that.$store.commit(pageJumpMutationType.HOME_CM_INFO,e);
      that.$router.push("/group/groupChat");
    }
  }
}
</script>

<style lang="scss" scoped>
.messagelist{
  height: auto;
  padding-bottom: 200px;
  .list-item{
    height: 120px;
    padding-left:20px;
    display: flex;
    box-sizing:border-box;
    position: relative;
    .list-photo{
      width: 80px;
      height: 80px;
      margin: auto 0;
      margin-right:20px;
      border-radius: 8px;
    }
    .list-photo-user{
      width: 80px;
      height: 80px;
      margin: auto 0;;
      margin-right:20px;
      background: $backgroundColor03;
      border-radius: 8px;
      padding: 1px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .user-photo-9{
        width: 18px;
        height: 18px;
        margin: 1px;
      }
      .user-row2{
        height: 60px;
        margin: auto 0;
      }
      .user-photo-56{
        width: 18px;
        height: 18px;
        margin: 1px;
      }
      .user-photo-34{
        width: 29px;
        height: 29px;
        margin: 1px;
      }
    }
    .list-contain{
      padding-top:20px;
      width:100%;
      border-bottom: 1px solid $borderColor02;
      span{
        text-align: left;
        display: inline-block;
        width: 100%;
        // word-break: keep-all;
        text-overflow: -o-ellipsis-lastline;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
      span:nth-of-type(1){
        font-weight: 700;
        font-size: 28px;
      }
      span:nth-of-type(2){
        font-weight:normal;
        font-size: 24px;
        color: $fontColor02;
      }
    }
    .list-tips{
      padding: 0px 20px;
      padding-top:20px;
      width:60px;
      position: absolute;
      right: 0;
      span:nth-of-type(1){
        color: $fontColor02;
        font-size: 20px;
      }
    }
    .msg-num{
      background: red;
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 30px;
      border-radius: 50%;
      color: #fff;
      position: absolute;
      top:10px;
      left: 80px;
    }
    .msg-num-img{
      position: absolute;
      width: 30px;
      // height: 30px;
      top:10px;
      left: 80px;
    }
  }
}
</style>