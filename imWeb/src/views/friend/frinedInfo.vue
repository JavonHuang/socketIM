<template>
  <div class="frinedinfo">
    <div class="frinedinfo-photo">
      <img class="photo" v-bind:src="addFriendInfo.img!=null?addFriendInfo.img:require('./../../assets/img/my.jpg')">
      <div class="frinedinfo-name">
        <span>{{addFriendInfo.nickname}}</span>
        <span>账号:{{addFriendInfo.userid}}</span>
      </div>
    </div>
    <div class="list-space">
    </div>
    <div class="list-cell">
      <span>性别</span>
      <span>{{addFriendInfo.sex==0?'不限':addFriendInfo.sex==2?'女':'男'}}</span>
    </div>
    <div class="list-cell">
      <span>年龄</span>
      <span>{{addFriendInfo.age}}</span>
    </div>
    <div class="list-cell">
      <span>个性签名</span>
      <div class="signature">
        <div>{{addFriendInfo.signature}}</div>
      </div>
    </div>
    <div v-show="!isVerify" class="list-cell">
      <span>验证信息</span>
      <input v-model="verify" placeholder="请输入验证信息"/>
    </div>
    <div v-show="isVerify" class="list-cell">
      <span>验证信息</span>
      <span>{{addFriendInfo.verify}}</span>
    </div>
    <div class="list-space">
    </div>
    <div v-show="!isVerify" class="list-cell" v-on:click="addFriendVerify()">
     <span class="logout">添加</span>
    </div>
    <div v-show="isVerify&&addFriendInfo.status!=1" class="list-cell" v-on:click="updateFriendVerify(1)">
     <span class="logout">通过验证</span>
    </div>
    <div v-show="isVerify&&addFriendInfo.status!=1" class="list-cell" v-on:click="updateFriendVerify(2)">
     <span class="reject">拒绝</span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import API from './../../utils/API';
export default {
  computed:{
    ...mapState({
      addFriendInfo:state=>state.pageJumpStoreModule.addFriendInfo
    }),
    isVerify(){
      let that=this;
      if(typeof that.addFriendInfo.status =="undefined"){
        return false;
      }else{
        return true;
      }
    }
  },
  data(){
    return{
      verify:null
    }
  },
  methods:{
    addFriendVerify(){
      let that=this;
      that.$axios.post(API.ADD_FRIEND_VERIFY, {userid:that.addFriendInfo.userid,verify:that.verify}, false,false).then(res => {
        if (res.data.code ==200) {
          that.$router.go(-1);
        }
      });
    },
    updateFriendVerify(e){
      let that=this;
      that.$axios.post(API.UPDATE_FRIEND_VERIFY, {id:that.addFriendInfo.id,fromuserid:that.addFriendInfo.userid,status:e}, false,false).then(res => {
        if (res.data.code ==200) {
          that.$router.go(-1);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.frinedinfo{
  height: 100%;
  background: $backgroundColor02;
  .frinedinfo-photo{
    height: 180px;
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
    .frinedinfo-name{
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
      span:nth-of-type(2){
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
    font-size: 26px;
    color: $fontColor02;
    text-align: left;
    padding: 0px 20px;
  }
  .list-cell{
    background:#fff;
    position: relative;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid $borderColor02;
    display: flex;
    .signature{
      width: 100%;
      display: flex;
      div{
        line-height: 1.2;
        text-align: right;
        color: $fontColor02;
        margin: auto 0;
        // display:inline-block;
        padding-right:50px!important;
        // width: 100%;
        font-size: 28px;
      }
    }
    input,textarea{
      font-size: 28px;
      padding: 8px 4px;
      border: none;
      background: $backgroundColor05;
      width: 100%;
      height: 40px;
      margin: auto;
      margin-right:20px;
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
        text-align: right;
        color: $fontColor02;
        font-size: 28px;
      }
    }
  }
  .logout{
    width:100%!important;
    text-align: center!important;
    color:#fff;
    background: $backgroundColor04;
  }
  .reject{
    width:100%!important;
    text-align: center!important;
    color:#fff;
    background:#ff5757;
  }
}
</style>