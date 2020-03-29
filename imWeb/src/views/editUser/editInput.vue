<template>
  <div class="editInput">
    <div class="editinput-header">
      <div class="header-left">
        <img v-on:click="goBack()" class="header-icon" src='./../../assets/img/right.svg'/>
        <span>更改资料</span>
      </div>
    </div>
    <div class="list-cell">
      <span>昵称</span>
      <input v-model="editUserInfo.nickname"/>
    </div>
    <div class="list-cell">
      <span>头像</span>
      <input v-model="editUserInfo.img"/>
    </div>
    <div class="list-cell">
      <span>年龄</span>
      <input v-model="editUserInfo.age"/>
    </div>
    <div class="list-cell">
      <span>性别</span>
      <div class="sex">
        <label>女</label>
        <img v-show="editUserInfo.sex==2" class="check-icon" src="./../../assets/img/check_active.svg"/>
        <img  v-show="editUserInfo.sex!=2" v-on:click="editUserInfo.sex=2" class="check-icon" src="./../../assets/img/check.svg"/>
        <label>男</label>
        <img v-show="editUserInfo.sex==1" class="check-icon" src="./../../assets/img/check_active.svg"/>
        <img v-show="editUserInfo.sex!=1" v-on:click="editUserInfo.sex=1" class="check-icon" src="./../../assets/img/check.svg"/>
      </div>
    </div>
    <!-- <div class="list-cell">
      <span>密码</span>
      <input type="password" v-model="editUserInfo.password"/>
    </div>
    <div class="list-cell">
      <span>确认密码</span>
      <input type="password" v-model="editUserInfo.surepassword"/>
    </div> -->
    <div class="list-space"></div>
    <div class="list-cell signature">
      <span>个性签名</span>
      <textarea maxlength="50" type="password" v-model="editUserInfo.signature"/>
    </div>
    <div class="list-space"></div>
    <div class="list-cell" style="padding:0px;" v-on:click="editInput()">
     <span class="editInput-btn">保存</span>
    </div>
  </div>
</template>

<script>
import loginMutationType from './../../store/loginStoreModule/mutationType';
import API from './../../utils/API';
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState({
      userInfo:state=>state.loginStoreModule.userInfo
    })
  },
  data(){
    return{
      editUserInfo:{
        userid:null,
        nickname:null,
        img:null,
        age:0,
        sex:0,
        signature:0
      }
    }
  },
  created(){
    let that=this;
    that.editUserInfo.userid=that.userInfo.userid;
    that.editUserInfo.nickname=that.userInfo.nickname;
    that.editUserInfo.img=that.userInfo.img;
    that.editUserInfo.age=that.userInfo.age;
    that.editUserInfo.sex=that.userInfo.sex;
    that.editUserInfo.signature=that.userInfo.signature;
  },
  methods:{
    editInput(){
      let that=this;
      that.$axios.post(API.UPDATE_USER_INFO_BY_USERID, that.editUserInfo, true,true).then(res => {
        if (res.data.code ==200) {
          that.$store.commit(loginMutationType.SAVE_USERINFO,that.editUserInfo);
          that.$router.go(-1);
        }
      });
    },
    goBack(){
      let that=this;
      that.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.editInput{
  height: 100%;
  background: $backgroundColor02;
  .editinput-header{
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
    border-bottom: 1px solid $borderColor02;
    display: flex;
    padding: 0px 20px;
    span{
      height: 100px;
      line-height: 100px;
      display:inline-block;
      &:nth-of-type(1){
        width: 200px;
        text-align: left;
        font-size: 30px;
      }
    }
    .check-icon{
      width: 36px;
      height: 36px;
      margin: auto 0;
      margin-right: 80px;
    }
    input,textarea{
      font-size: 28px;
      padding: 8px 4px;
      border: none;
      background: $backgroundColor05;
      width: 100%;
      height: 40px;
      margin: auto;
    }
    .editInput-btn{
      width:100%!important;
      text-align: center!important;
      background: $backgroundColor04;
      color: $fontColor04;
      padding: 0px!important;
    }
  }    
  .sex{
    width: 100%;
    display: flex;
    label{
      line-height: 100px;
      margin-right: 10px;
    }
  }
  .signature{
    height: auto;
    textarea{
      height: 120px;
    }
  }
}
</style>