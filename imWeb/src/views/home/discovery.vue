<template>
  <div class="discovery">
    <div class="seachinput">
      <img src="./../../assets/img/seach.svg"/>
      <input v-model="seachVal" placeholder="请输入讯聊号" @keyup="enterInput($event)"/>
    </div>
    <div v-show="isShow==0" class="tips-main">
      <empty></empty>
    </div>
    <div v-show="isShow==1" class="tips-main">
      <seach></seach>
    </div>
    <div class="list-main">
      <div v-show="isShow=2" class="list-item" v-for="item in userList" v-bind:key="item.userid" v-on:click="handleUserInfo(item)">
        <img class="list-photo" v-bind:src="item.img!=null?item.img:require('./../../assets/img/my.jpg')">
        <div class="list-contain">
          <span>{{item.nickname}}</span>
        </div>
      </div>
      <div v-show="isShow==3" class="list-item" v-for="item in friendVerifyList" v-bind:key="item.userid" v-on:click="handleUserInfo(item)">
        <img class="list-photo" v-bind:src="item.img!=null?item.img:require('./../../assets/img/my.jpg')">
        <div class="list-verify-contain">
          <span>{{item.nickname}}</span>
          <span>{{item.verify}}</span>
          <span class="status">{{item.status==0?'未通过':item.status==1?'已添加':'已拒绝'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import empty from './../../components/empty';
import seach from './../../components/seach';
import API from './../../utils/API';
import pageJumpMutationType from './../../store/pageJumpStoreModule/mutationType';
export default {
  components:{
    empty,
    seach
  },
  data(){
    return{
      seachVal:null,
      userList:[],
      friendVerifyList:[],
      isShow:3
    }
  },
  mounted(){
    let that=this;
    that.getFriendVerifyList();
  },
  methods:{
    enterInput(e){
      let that=this;
      if(e.keyCode==13){
        if(that.seachVal==null||that.seachVal==''){
          that.userList=[];
          if(that.friendVerifyList.length==0){
            that.isShow=1;
            return false;
          }else{
            that.isShow=3;
            return false;
          }
        }
        that.seachByUserId();
      }
    },
    seachByUserId(){
      let that=this;
      that.$axios.post(API.SEACH_BYUSERID, {seachVal:that.seachVal}, false,false).then(res => {
        if (res.data.code ==200) {
          that.userList=res.data.data;
          if(that.userList.length==0){
            that.isShow=0;
          }else{
            that.isShow=2;
          }
        }
      });
    },
    getFriendVerifyList(){
      let that=this;
      that.$axios.post(API.GET_FRIEND_VERIFY_LIST, {}, false,false).then(res => {
        if (res.data.code ==200) {
          that.friendVerifyList=res.data.data;
        }
      });
    },
    handleUserInfo(e){
      let that=this;
      that.$store.commit(pageJumpMutationType.ADDFRIEND_CM_INFO,e);
      that.$router.push('/frinedInfo');
    }
  }
}
</script>

<style lang="scss" scoped>
.discovery{
  height: auto;
  padding-bottom: 100px;
  .seachinput{
    height: 80px;
    line-height: 80px;
    background: $backgroundColor01;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    font-weight: 700;
    font-size: 30px;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    input{
      background: #fff;
      height: 60px;
      padding: 8px 44px;
      display: block;
      margin: auto 0;
      width: 100%;
      border: none;
      box-sizing: border-box;
      caret-color:$fontColor03;
    }
    img:nth-of-type(1){
      position: absolute;
      width: 36px;
      height: 36px;
      top:50%;
      transform: translateY(-50%);
      margin-left: 4px;
    }
  }
  .tips-main{
    min-height: 700px;
    display: flex;
  }
  .list-main{
    padding-top: 100px;
    .list-item{
      height: 120px;
      padding-left:20px;
      display: flex;
      box-sizing:border-box;
      .list-photo{
        width: 80px;
        height: 80px;
        margin: auto 0;
        margin-right:20px;
      }
      .list-contain{
        width: 100%;
        border-bottom: 1px solid $borderColor02;
        display: flex;
        span{
          margin: auto 0;
          font-weight: 700;
          font-size: 28px;
        }
      }
      .list-verify-contain{
        position: relative;
        width: 100%;
        border-bottom: 1px solid $borderColor02;
        display: flex;
        flex-flow: column;
        text-align: left;
        span:nth-of-type(1){
          display: block;
          margin-top: 20px;
          font-weight: 700;
          font-size: 28px;
        }
        .status{
          position: absolute;
          top:50%;
          transform: translateY(-50%);
          right: 20px;
          color:$fontColor02;
        }
      }
    }
  }
}
</style>