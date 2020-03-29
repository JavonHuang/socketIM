<template>
  <div class="registered">
    <div class="list-space"></div>
    <div class="list-cell">
      <span>昵称</span>
      <input v-model="userRegInfo.nickname"/>
    </div>
    <div class="list-cell">
      <span>年龄</span>
      <input v-model="userRegInfo.age"/>
    </div>
    <div class="list-cell">
      <span>性别</span>
      <div class="sex">
        <label>女</label>
        <img v-show="userRegInfo.sex==2" class="check-icon" src="./../assets/img/check_active.svg"/>
        <img  v-show="userRegInfo.sex!=2" v-on:click="userRegInfo.sex=2" class="check-icon" src="./../assets/img/check.svg"/>
        <label>男</label>
        <img v-show="userRegInfo.sex==1" class="check-icon" src="./../assets/img/check_active.svg"/>
        <img v-show="userRegInfo.sex!=1" v-on:click="userRegInfo.sex=1" class="check-icon" src="./../assets/img/check.svg"/>
      </div>
    </div>
    <div class="list-cell">
      <span>密码</span>
      <input type="password" v-model="userRegInfo.password"/>
    </div>
    <div class="list-cell">
      <span>确认密码</span>
      <input type="password" v-model="userRegInfo.surepassword"/>
    </div>
    <div class="list-space"></div>
    <div class="list-cell signature">
      <span>个性签名</span>
      <textarea maxlength="50" type="password" v-model="userRegInfo.signature"/>
    </div>
    <div class="list-space"></div>
    <div class="list-cell" style="padding:0px;" v-on:click="registered()">
     <span class="registered-btn">注册</span>
    </div>
  </div>
</template>

<script>
import API from './../utils/API';
export default {
  data(){
    return{
      userRegInfo:{
        surepassword:null,
        password:null,
        nickname:null,
        img:null,
        sex:0,
        age:1,
        signature:null
      }
    }
  },
  methods:{
    registered(){
      let that=this;
      that.$axios.post(API.USERREGISTERED, that.userRegInfo, false,true).then(res => {
        if (res.data.code ==200) {
          that.$router.replace({
            path:'/registerFinish',
            query: res.data.data
          });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.registered{
  height: 100%;
  background: $backgroundColor02;
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
    .registered-btn{
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