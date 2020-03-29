<template>
  <div class="createhome">
    <div class="createhome-header">
      <div class="header-left">
        <img v-on:click="goBack()" class="header-icon" src='./../../assets/img/right.svg'/>
        <span>发起群聊</span>
      </div>
      <span class="header-save-active" v-on:click="createHome()">确定</span>
    </div>
    <div class="list-item" v-on:click="handleHomeList()">
      <div class="list-contain">
        <span>选择一个群</span>
      </div>
    </div>
    <div class="list-space">
      我的朋友
    </div>
    <div>
      <div class="list-item" v-for="item in friendList" v-bind:key="item.userid" v-on:click="handleChosen(item)">
        <img v-show="item.chosen" class="check-icon" src="./../../assets/img/check_active.svg"/>
        <img v-show="!item.chosen" class="check-icon" src="./../../assets/img/check.svg"/>
        <img class="list-photo" v-bind:src="item.img!=null?item.img:require('./../../assets/img/my.jpg')">
        <div class="list-contain">
          <span>{{item.notenickname!=null?item.notenickname:item.nickname}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import friendMutationType from './../../store/friendStoreModule/mutationType';
import pageJumpMutationType from './../../store/pageJumpStoreModule/mutationType';
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
      friendList:[]
    }
  },
  created(){
    let that=this;
    that.getFriendList();
  },
  methods:{
    handleChosen(e){
      let that=this;
      e.chosen=!e.chosen;
    },
    getFriendList(){
      let that=this;
      that.$store.dispatch(friendMutationType.AC_GET_FRIEND_LIST,{userid:that.userInfo.userid}).then(res=>{
        if(res.data.code==200){
          let list=Object.merge([],res.data.data);
          list.forEach(item => {
            item["chosen"]=false;
          });
          that.friendList=Object.merge([],list);
        }
      });
    },
    createHome(){
      let that=this;
      let userList=new Array();
      that.friendList.forEach(item=>{
        if(item.chosen){
          userList.push(item.friendid);
        }
      });
      that.$axios.post(API.ADD_GROUP_HOME, {userList:userList}, false,false).then(res => {
        if(res.data.code ==200){
          
        } 
      });
    },
    handleHomeList(){
      let that=this;
      that.$router.push('/group/homeList');
    },
    goBack(){
      let that=this;
      that.$router.push('/messageList');
    }
  }
}
</script>

<style lang="scss" scoped>
.createhome{
  height: auto;
  padding-bottom: 200px;
  .createhome-header{
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
    .check-icon{
      width: 36px;
      height: 36px;
      margin: auto 0;
      margin-right: 20px;
    }
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
}
</style>