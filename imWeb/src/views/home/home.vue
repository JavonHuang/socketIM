<template>
  <div class="home">
    <div v-show="isShowMenu" v-on:click="isShowMenu=false" class="layout"></div>
    <div class="home-header" v-show="chosenIndex!=3&&chosenIndex!=2">
      <span>{{chosenIndex==0?'消息('+(unread1+unread2)+')':'通讯录'}}</span>
      <div class="header-right">
        <img v-on:click="isShowMenu=true" class="header-icon" src="./../../assets/img/home_add.svg">
      </div>
      <div v-show="isShowMenu" class="home-header-menu">
        <span class="drown-up"></span>
        <div class="menu-item" v-on:click="addGroupChat()">
          <img class="header-icon" src="./../../assets/img/home_menu_chat.svg">
          <div class="menu-name">
            <span>发起群聊</span>
          </div>
        </div>
        <div class="menu-item" v-on:click="addFriend()">
          <img class="header-icon" src="./../../assets/img/home_menu_addf.svg">
          <div class="menu-name">
            <span>添加朋友</span>
          </div>
        </div>
      </div>
    </div>
    <div v-bind:class="['home-contain',chosenIndex==3?'home-contain-person':'']">
      <router-view ref="mylou"></router-view>
    </div>
    <div class="home-foot">
      <div class="foot-item" v-on:click="handleIndex(0)">
        <img v-show="chosenIndex==0" src="./../../assets/img/home_message_active.svg"/>
        <img v-show="chosenIndex!=0" src="./../../assets/img/home_message.svg"/>
        <span v-bind:class="[chosenIndex==0?'span-selected':'']">信息</span>
      </div>
      <div class="foot-item" v-on:click="handleIndex(1)">
        <img v-show="chosenIndex==1" src="./../../assets/img/home_friend_active.svg"/>
        <img v-show="chosenIndex!=1" src="./../../assets/img/home_friend.svg"/>
        <span v-bind:class="[chosenIndex==1?'span-selected':'']">通讯录</span>
      </div>
      <div class="foot-item" v-on:click="handleIndex(2)">
        <img v-show="chosenIndex==2" src="./../../assets/img/home_find_active.svg"/>
        <img v-show="chosenIndex!=2" src="./../../assets/img/home_find.svg"/>
        <span v-bind:class="[chosenIndex==2?'span-selected':'']">发现</span>
      </div>
      <div class="foot-item" v-on:click="handleIndex(3)">
        <img v-show="chosenIndex==3" src="./../../assets/img/home_me_active.svg"/>
        <img v-show="chosenIndex!=3" src="./../../assets/img/home_me.svg"/>
        <span v-bind:class="[chosenIndex==3?'span-selected':'']">我</span>
      </div>
    </div>
  </div>
</template>

<script>
import pageJumpMutationType from './../../store/pageJumpStoreModule/mutationType';
import seachInput from './../../components/seachInput';
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState({
      unread1:state=>state.chatStoreModule.unread,
      unread2:state=>state.groupStoreModule.unread,
      chosenIndex:state=>state.pageJumpStoreModule.homeChosenIndex
    })
  },
  components:{
    seachInput
  },
  data(){
    return{
      isShowMenu:false
    }
  },
  created(){
    let that=this;
    // that.$router.push('/messageList');
  },
  methods:{
    handleIndex(e){
      let that=this;
      switch(e){
        case 0:
          that.$store.commit(pageJumpMutationType.HOME_CM_INDEX,0);
          that.$router.push('/messageList');
          break;
        case 1:
          that.$store.commit(pageJumpMutationType.HOME_CM_INDEX,1);
          that.$router.push('/friendList');
          break;
        case 2:
          that.$store.commit(pageJumpMutationType.HOME_CM_INDEX,2);
          that.$router.push('/discovery');
          break;
        case 3:
          that.$store.commit(pageJumpMutationType.HOME_CM_INDEX,3);
          that.$router.push('/person');
          break;
      }
    },
    addGroupChat(){
      let that=this;
      that.isShowMenu=false;
      that.$router.push('/group/createHome');
    },
    addFriend(){
      let that=this;
      that.isShowMenu=false;
      that.$store.commit(pageJumpMutationType.HOME_CM_INDEX,2);
      that.$router.push('/discovery');
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
  position: relative;
  .home-header{
    height: 80px;
    line-height: 80px;
    background: $backgroundColor01;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    font-weight: 700;
    font-size: 30px;
    position: relative;
    .header-right{
      display: flex;
      height: 100%;
      .header-icon{
        height: 40px;
        width: 40px;
        margin: auto 10px;
      }
    }
    .home-header-menu{
      z-index: 2;
      position: absolute;
      right: 20px;
      top:80px;
      background: #848282;
      color: #fff;
      line-height: normal;
      width: 220px;
      padding: 20px 0px;
      border-radius: 8px;
      text-align: left;
      .drown-up{
        height: 0;
        width: 0;
        top:-28px;
        right: 15px;
        position: absolute;
        border-top:15px solid transparent;
        border-left:15px solid transparent;
        border-bottom:15px solid #848282;
        border-right:15px solid transparent;
      }
      .menu-item{
        display: flex;
        img{
          height: 40px;
          width:40px;
          margin:auto 20px;
        }
        .menu-name{
          border-bottom: 1px solid $borderColor01;
          padding: 10px 0px;
          padding-right: 20px;
          width: 100%;
          span{
            font-size: 26px;
            height: 40px;
            line-height: 40px;
            margin:auto 0; 
          }
        }
      }
    }
  }
  .home-contain{
    overflow-y: auto;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    padding-bottom: 80px;
  }
  .home-contain-person{
    background: $backgroundColor02;
  }
  .home-foot{
    height: 100px;
    background: $backgroundColor01;
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .foot-item{
      display: flex;
      flex-flow: column;
      margin:auto;
      img{
        height: 46px;
        width:46px;
        margin: 0 auto;
      }
      span{
        font-size:24px;
        // color:$fontColor02;
      }
      .span-selected{
        color: $fontColor03;
      }
    }
  }
}
.layout{
  position: fixed;
  height: 100%;
  width: 100%;
  background: transparent;
  bottom: 0;
  right: 0;
  z-index: 1;
}
</style>