<template>
  <div class="person">
    <div class="person-photo" v-on:click="editUser('更改昵称')">
      <img class="photo" v-bind:src="userInfo.img!=null?userInfo.img:require('./../../assets/img/my.jpg')">
      <div class="person-name">
        <span>{{userInfo.nickname}}</span>
        <span>账号:{{userInfo.userid}}</span>
        <img class="left-icon" src="./../../assets/img/left.svg"/>
      </div>
    </div>
    <div class="list-space">
    </div>
    <div class="list-cell" v-on:click="editUser('修改性别')">
      <span>性别</span>
      <span>{{userInfo.sex==0?'不限':userInfo.sex==2?'女':'男'}}</span>
      <img class="left-icon" src="./../../assets/img/left.svg"/>
    </div>
    <div class="list-cell" v-on:click="editUser('修改年龄')">
      <span>年龄</span>
      <span>{{userInfo.age}}</span>
      <img class="left-icon" src="./../../assets/img/left.svg"/>
    </div>
    <div class="list-cell" v-on:click="editUser('修改个性签名')">
      <span>个性签名</span>
      <div class="signature">
        <div>{{userInfo.signature}}</div>
      </div>
      <img class="left-icon" src="./../../assets/img/left.svg"/>
    </div>
    <div class="list-space">
    </div>
    <div class="list-cell" v-on:click="logout()">
     <span class="logout">退出</span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState({
      userInfo:state=>state.loginStoreModule.userInfo
    })
  },
  data(){
    return{

    }
  },
  methods:{
    editUser(e){
      let that=this;
      that.$router.push({
        name:'editInput',
         params:{
          title:e
        }
      });
    },
    logout(){
      let that=this;
      that.$config.setUserInfo(null);
      that.$socket.logout();
      that.$router.replace('/');
    }
  }
}
</script>

<style lang="scss" scoped>
.person{
  height: 100%;
  // padding-bottom: 200px;
  background: $backgroundColor02;
  .person-photo{
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
    .person-name{
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
    span{
      height: 80px;
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
    .left-icon{
      top:50%;
      transform: translateY(-50%);
    }
  }
  .left-icon{
    width: 26px;
    height: 26px;
    position: absolute;
    right: 20px;
    bottom: 0;
  }
  .logout{
    width:100%!important;
    text-align: center!important;
    color: red;
  }
}
</style>