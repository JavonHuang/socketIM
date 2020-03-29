<template>
  <div class="messagelist">
    <div class="messagelist-header">
      <div class="header-left">
        <img v-on:click="goBack()" class="header-icon" src='./../../assets/img/right.svg'/>
        <span>选择群聊</span>
      </div>
      <!-- <span class="header-save-active" v-on:click="createHome()">确定</span> -->
    </div>
    <div>
      <div class="list-item" v-for="item in homeList" v-bind:key="item.homeid" v-on:click="handleGroupChat(item)">
        <div class="list-photo" v-if="item.userList.length==9||item.userList.length==8||item.userList.length==7">
          <img class="user-photo-9" v-for="_item in item.userList" v-bind:key="_item.userid" v-bind:src="_item.img!=null?_item.img:require('./../../assets/img/my.jpg')">
        </div>
        <div class="list-photo" v-if="item.userList.length==5||item.userList.length==6">
          <div class="user-row2">
            <img class="user-photo-56" v-for="_item in item.userList" v-bind:key="_item.userid" v-bind:src="_item.img!=null?_item.img:require('./../../assets/img/my.jpg')">
          </div>
        </div>
        <div class="list-photo" v-if="item.userList.length==4||item.userList.length==3">
          <img class="user-photo-34" v-for="_item in item.userList" v-bind:key="_item.userid" v-bind:src="_item.img!=null?_item.img:require('./../../assets/img/my.jpg')">
        </div>
        <!-- <img class="msg-num-img" v-show="item.unread>99" src="./../../assets/img/more_num.svg">
        <span class="msg-num" v-show="item.unread>0&&item.unread<99">{{item.unread}}</span> -->
        <div class="list-contain">
          <span>{{item.homename}}({{item.count}})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import groupMutationType from './../../store/groupStoreModule/mutationType';
import pageJumpMutationType from './../../store/pageJumpStoreModule/mutationType';
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState({
      homeList:state=>state.groupStoreModule.homeList,
      userInfo:state=>state.loginStoreModule.userInfo
    })
  },
  data(){
    return{
    }
  },
  mounted(){
    let that=this;
    that.getGroupHomeList();
  },
  methods:{
    goBack(){
      let that=this;
      that.$router.go(-1);
    },
    getGroupHomeList(){
      let that=this;
      that.$store.dispatch(groupMutationType.AC_GET_GROUP_HOME_LIST,null);
    },
    handleGroupChat(e){
      let that=this;
      that.$store.dispatch(groupMutationType.AC_GET_GROUP_HOME_MS,{homeid:e.homeid});
      // that.$store.dispatch(chatMutationType.AC_GET_SINGLE_CHAT_MSG_LIST,{chatid:e.chatid});
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
  .messagelist-header{
    height: 80px;
    line-height: 80px;
    background: $backgroundColor01;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    font-weight: 700;
    font-size: 30px;
    .header-left{
      display: flex;
      height: 100%;
      .header-icon{
        height: 40px;
        width: 40px;
        margin: auto 10px;
      }
    }
    .header-save{
      display: block;
      height: 40px;
      line-height: 40px;
      background: $backgroundColor03;
      color: $fontColor01;
      padding: 4px 8px;
      margin: auto 0;
      border-radius: 4px;
      font-weight: normal;
    }
    .header-save-active{
      display: block;
      height: 40px;
      line-height: 40px;
      background: $backgroundColor04;
      color: $fontColor04;
      padding: 4px 8px;
      margin: auto 0;
      border-radius: 4px;
      font-weight: normal;
    }
  }
  .list-item{
    height: 120px;
    padding-left:20px;
    display: flex;
    box-sizing:border-box;
    position: relative;
    .list-photo{
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
      width:100%;
      border-bottom: 1px solid $borderColor02;
      display: flex;
      span{
        margin: auto 0;
        text-align: left;
        display: inline-block;
        width: 100%;
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