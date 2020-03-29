<template>
  <div class="userdetail">
    <div class="userdetail-photo">
      <img class="photo" v-bind:src="friendInfo.img!=null?friendInfo.img:require('./../../assets/img/my.jpg')">
      <div class="userdetail-name">
        <span>{{friendInfo.notenickname!=null?friendInfo.notenickname:friendInfo.nickname}}</span>
        <span v-show="friendInfo.notenickname!=null">昵称:{{friendInfo.nickname}}</span>
        <span>账号:{{friendInfo.friendid}}</span>
      </div>
    </div>
    <div class="list-space">
    </div>
    <div class="list-cell" v-on:click="editUser()">
      <span>标签</span>
      <div class="cell-tag">
        <span class="tag" v-for="item in tagList" v-bind:key="item.tagid">{{item.tag}}</span>
      </div>
      <img class="left-icon" src="./../../assets/img/left.svg"/>
    </div>
    <div class="list-cell">
      <span>年龄</span>
      <span>{{friendInfo.age}}</span>
    </div>
    <div class="list-cell">
      <span>性别</span>
      <span>{{friendInfo.sex==0?'不限':friendInfo.sex==1?'男':'女'}}</span>
    </div>
    <div class="list-cell">
      <span>个性签名</span>
      <div class="signature">
        <div>{{friendInfo.signature}}</div>
      </div>
    </div>
    <div class="list-space">
    </div>
    <div class="list-cell">
      <div class="send" v-on:click="goChat()">
        <img class="send-icon" src="./../../assets/img/home_message_active.svg"/>
        <span class="span-send">发消息</span>
      </div>
    </div>
    <div class="list-cell" v-on:click="delFriend()">
     <span class="del">删除</span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import API from './../../utils/API';
import pageJumpMutationType from './../../store/pageJumpStoreModule/mutationType';
export default {
  computed:{
    ...mapState({
      friendInfo:state=>state.pageJumpStoreModule.friendInfo,
      userInfo:state=>state.loginStoreModule.userInfo
    })
  },
  data(){
    return{
      tagList:[]
    }
  },
  mounted(){
    let that=this;
    that.getFriendTag();
  },
  methods:{
    getFriendTag(){
      let that=this;
      that.$axios.post(API.GET_FRIEND_TAG, {userid:that.userInfo.userid,friendid:that.friendInfo.friendid}, false,false).then(res => {
        if (res.data.code ==200) {
          that.tagList=res.data.data;
          that.tagList.forEach(item=>{
            item["chosen"]=true;
          })
          that.$store.commit(pageJumpMutationType.USERINFO_CM_FRIEND_TAG,that.tagList);
        } 
      });
    },
    editUser(){
      let that=this;
      that.$router.push('/userInfo');
    },
    delFriend(){
      let that=this;
      that.$axios.post(API.DEL_FRIENDBY_CHATID, {chatid:that.friendInfo.chatid,friendid:that.friendInfo.friendid}, false,false).then(res => {
        if (res.data.code ==200) {
          that.$router.push('/friendList');
        } 
      });
    },
    goChat(){
      let that=this;
      that.$router.push('/chat');
    }
  }
}
</script>

<style lang="scss" scoped>
.userdetail{
  height: 100%;
  padding-bottom: 200px;
  background: $backgroundColor02;
  .userdetail-photo{
    height: 220px;
    padding-left:20px;
    display: flex;
    box-sizing:border-box;
    background:#fff;
    .photo{
      width: 80px;
      height: 80px;
      margin: auto 0;
      margin-right:20px;
    }
    .userdetail-name{
      position: relative;
      height: 80px;
      line-height: 45px;
      margin: auto 0;
      display: flex;
      width: 100%;
      flex-flow: column;
      text-align: left;
      span:nth-of-type(1){
        font-weight: 700;
        font-size: 30px;
      }
      span:nth-of-type(2),:nth-of-type(3){
        font-weight:normal;
        font-size: 26px;
        color: $fontColor02;
      }
    }
  }
  .list-space{
    background: $backgroundColor02;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: $fontColor02;
    text-align: left;
    padding: 0px 20px;
  }
  .list-cell{
    background:#fff;
    position: relative;
    min-height: 100px;
    line-height: 100px;
    border-bottom: 1px solid $borderColor02;
    display: flex;
    .signature{
      width: 100%;
      display: flex;
      div{
        line-height: 1.2;
        text-align: left;
        color: $fontColor02;
        margin: auto 0;
        // display:inline-block;
        padding-right:50px!important;
        // width: 100%;
        font-size: 28px;
      }
    }
    span{
      height: 100px;
      display:inline-block;
      padding: 0px 20px;
      padding-right: 50px;
      &:nth-of-type(1){
        width: 200px;
        text-align: left;
        font-size: 30px;
      }
      &:nth-of-type(2){
        width: 100%;
        text-align: left;
        color: $fontColor02;
        font-size: 28px;
      }
    }
    .cell-tag{
      line-height:1!important;
      text-align: left;
      padding: 20px;
      width: 100%;
      padding-left: 0px;
      padding-right: 30px;
    }
    .tag{
      width: auto!important;
      height: 45px;
      line-height: 45px;
      border: 1px solid $borderColor03;
      padding: 2px 15px;
      border-radius: 20px;
      font-size: 28px;
      margin: 5px;
      color: $fontColor05!important;
    }
    .left-icon{
      top:50%;
      transform: translateY(-50%);
    }
    .send{
      height: 100px;
      line-height: 100px;
      display: flex;
      width: 100%;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
      .send-icon{
        height: 36px;
        width:36px;
        margin: auto 0;
        margin-right: 10px;
      }
      .span-send{
        font-size: 28px;
        color: $fontColor03;
        padding: 0px!important;
        width: auto!important;
      }
    }
  }
  .left-icon{
    width: 26px;
    height: 26px;
    position: absolute;
    right: 20px;
    bottom: 0;
  }
  .del{
    width:100%!important;
    text-align: center!important;
    color: red;
    padding: 0px!important;
  }
}
</style>