<template>
  <div class="registerfinish">
    <div class="succes-icon">
      <img src="./../assets/img/regFnish.svg"/>
      <span>注册成功！</span>
      <span>账号：<label>{{userInfo.userid}}</label></span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userInfo:{}
    }
  },
  created(){
    let that=this;
    that.userInfo=that.$route.query;
  }
}
</script>

<style lang="scss" scoped>
.registerfinish{
  height: 100%;
  .succes-icon{
    display: flex;
    flex-flow: column;
    margin-top: 40%;
    img{
      width: 160px;
      height: 160px;
      margin:0 auto;
      margin-bottom: 80px;
    }
    span{
      display: block;
      font-size: 30px;
      margin-bottom: 20px;
      label{
        font-weight: 700;
        color: $fontColor03;
      }
    }
  }
}
</style>