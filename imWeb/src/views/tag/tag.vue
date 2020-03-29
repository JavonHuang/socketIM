<template>
  <div class="tag">
    <div class="tag-header">
      <div class="header-left">
        <img v-on:click="goBack()" class="header-icon" src='./../../assets/img/right.svg'/>
        <span>所有标签</span>
      </div>
    </div>
    <div class="list-context">
      <div class="list-cell" v-for="item in tagList" v-bind:key="item.tagid" v-on:click="handleEditTag(item)">
        <span>{{item.tag}}({{item.count}})</span>
      </div>
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
    that.getAllFriendTag();
  },
  methods:{
    goBack(){
      let that=this;
       that.$store.commit(pageJumpMutationType.HOME_CM_INDEX,1);
      that.$router.push('/friendList');
    },
    getAllFriendTag(){
      let that=this;
      that.$axios.post(API.GET_ALL_FRIEND_TAG, {userid:that.userInfo.userid}, false,false).then(res => {
         if (res.data.code ==200) {
           that.tagList=res.data.data;
         }
      });
    },
    handleEditTag(e){
      let that=this;
      that.$store.commit(pageJumpMutationType.TAG_CM_TAG,e);
      that.$router.push('/editTag');
    }
  }
}
</script>

<style lang="scss" scoped>
.tag{
  height: 100%;
  padding-bottom: 80px;
  box-sizing: border-box;
  .tag-header{
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
  }
  .list-context{
    height: 100%;
    overflow-y: auto;
    .list-cell{
      background:#fff;
      position: relative;
      height: 100px;
      line-height: 100px;
      border-bottom: 1px solid $borderColor02;
      display: flex;
      span{
        height: 80px;
        display:inline-block;
        padding: 0px 20px;
        padding-right: 50px;
        text-align: left;
        font-size: 30px;
      }
    }
  }
}
</style>