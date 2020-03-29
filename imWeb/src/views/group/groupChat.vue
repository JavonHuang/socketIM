<template>
  <div class="chat">
    <div class="chat-header">
      <div class="header-left">
        <img v-on:click="goBack()" class="header-icon" src='./../../assets/img/right.svg'/>
        <span>{{homeInfo.homename}}</span>
      </div>
      <img v-on:click="setGroupInfo()" class="header-icon" src='./../../assets/img/group_more.svg'/>
    </div>
    <div class="chat-contain" ref="gchatcontain">
      <div v-for="(item,index) in msgList" v-bind:key="index">
        <div v-if="item.fromuserid!=userInfo.userid" class="list-item left">
          <img class="list-photo photo-left" v-bind:src="item.img!=null?item.img:require('./../../assets/img/my.jpg')"/>
          <div class="list-text">
            {{item.text}}
          </div>
          <span class="triangular-left"></span>
        </div>
        <div v-else class="list-item right">
          <div class="list-text">
            {{item.text}}
          </div>
          <img class="list-photo photo-right" v-bind:src="userInfo.img!=null?userInfo.img:require('./../../assets/img/my.jpg')"/>
          <span class="triangular-right"></span>
        </div>   
      </div>
    </div>
    <sendInput v-on:send="hanldeSend($event)"></sendInput>
  </div>
</template>

<script>
import groupMutationType from './../../store/groupStoreModule/mutationType';
import sendInput from './../../components/sendInput';
import {mapState} from 'vuex';
export default {
  components:{
    sendInput
  },
  computed:{
    ...mapState({
      msgList:state=>state.groupStoreModule.msgList,
      userInfo:state=>state.loginStoreModule.userInfo,
      homeInfo:state=>state.pageJumpStoreModule.homeInfo,
      chosenIndex:state=>state.pageJumpStoreModule.homeChosenIndex
    })
  },
  data(){
    return{
    }
  },
  created(){
    let that=this;
  },
  mounted(){
    let that=this;
    that.$nextTick(()=>{
      that.$refs.gchatcontain.scrollTop = that.$refs.gchatcontain.scrollHeight;
    });
  },
  methods:{
    hanldeSend(e){
      let that=this;
      that.$socket.groupMessage({
        "homeid": that.homeInfo.homeid,
        ...e
      });
    },
    goBack(){
      let that=this;
      if(that.chosenIndex==0){
        that.$router.push("/messageList");
      }else{
        that.$router.push("/friendList");
      }
    },
    setGroupInfo(){
      let that=this;
      that.$router.push("/group/groupInfo");
    }
  },
  beforeDestroy(){
    let that=this;
    that.$store.dispatch(groupMutationType.AC_REDUCEUNREAD,{homeid:that.homeInfo.homeid});
  },
  watch:{
    msgList(val,oldval){
      let that=this;
      that.$nextTick(()=>{
        that.$refs.gchatcontain.scrollTop = that.$refs.gchatcontain.scrollHeight;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.chat{
  height: 100%;
  background: $backgroundColor02;
  .chat-header{
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
  .chat-contain{
    height: 100%;
    padding-bottom: 200px;
    box-sizing: border-box;
    overflow-y: auto;
    .left{
      padding-right: 120px!important;
      justify-content:flex-start;
      text-align: left;
    }
    .right{
      padding-left: 120px!important;
      justify-content: flex-end;
      text-align: left;
    }
    .list-item{
      padding: 20px;
      display: flex;
      box-sizing: border-box;
      position: relative;
      .list-photo{
        width: 80px;
        height: 80px;
      }
      .photo-right{
        margin-left:20px;
      }
      .photo-left{
        margin-right:20px;
      }
      .list-text{
        background: #fff;
        border-radius: 8px;
        padding: 10px;
        white-space:normal; 
        word-break:break-all;
        overflow:hidden;
        font-size: 30px;
      }
    }
  }
  .triangular-right{
    width: 0;
    height: 0;
    position: absolute;
    right: 90px;
    top:45px;
    border-top: 15px solid transparent;
    border-left: 15px solid #fff;
    border-right: 15px solid transparent;
    border-bottom: 15px solid transparent
  }
  .triangular-left{
    width: 0;
    height: 0;
    position: absolute;
    left: 90px;
    top:45px;
    border-top: 15px solid transparent;
    border-left: 15px solid transparent;
    border-right: 15px solid #fff;
    border-bottom: 15px solid transparent
  }
}
</style>