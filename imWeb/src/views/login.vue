<template>
  <div class="login">
    <div class="login-form">
      <div class="form-item">
        <img class="user-icon" src="./../assets/img/login_user.svg"/>
        <input placeholder="请输入账号" v-model="loginInfo.userid">
      </div>
      <div class="form-item">
        <img class="user-icon" src="./../assets/img/login_password.svg"/>
        <input type="password" placeholder="请输入密码" v-model="loginInfo.password">
      </div>
      <div class="form-login">
        <button v-on:click="systemLogin()">登录</button>
        <div class="form-foot">
          <span v-on:click="registered()">注册</span>
          <span>忘记密码</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import API from './../utils/API';
import loginMutationType from './../store/loginStoreModule/mutationType'
import pageJumpMutationType from './../store/pageJumpStoreModule/mutationType';
import chatMutationType from './../store/chatStoreModule/mutationType';
export default {
   name: "home",
   data() {
    return {
      loginInfo: {
        userid:'10000001',
        password: '123456'
      }
    };
  },
  methods: {
     systemLogin() {
      let that = this;
      that.$axios.post(API.LOGIN, that.loginInfo, false,true).then(res => {
        if(res.data.code ==200) {
          that.$config.setUserInfo(res.data.data);
          that.$store.commit(loginMutationType.SAVE_USERINFO,res.data.data.userInfo);
          that.$store.commit(pageJumpMutationType.HOME_CM_INDEX,0);
          that.$socket.login();
          that.$router.push('/messageList');
        } else {
          that.loginInfo.password = '';
        }
      });
    },
    registered(){
      let that=this;
      that.$router.push('/registered');
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-image: url('./../assets/img/login_bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  .login-form{
    margin: auto;
    width:580px;
    height:500px;
    position: relative;
    .form-item{
      border-bottom: 1px solid $borderColor01;
      display: flex;
      margin:40px;
      input{
        background: transparent;
        border: none;
        color: $fontColor01;
        font-size: 28px;
        height: 40px;
        padding: 0px 8px;
        padding-top: 20px;
        &::-webkit-input-placeholder {
          color: $fontColor01;
        }
      }
      .user-icon{
        height: 46px;
        width: 46px;
        margin: auto 0;
      }
    }
    .form-login{
      position: absolute;
      bottom:0px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      button{
        height: 80px;
        width: 100%;
        border: 1px solid $borderColor01;
        background: transparent;
        border-radius:20px;
        color:$fontColor01 ;
        font-size: 30px;
        margin: 40px;
        margin-bottom: 18px;
      }
      .form-foot{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0px 40px;
        font-size: 28px;
        span{
          color:$fontColor01;
        }
      }
    }
  }
}
</style>