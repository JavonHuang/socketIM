<template>
  <div class="chat">
    <div class="chat-header">
      <div class="header-left">
        <img v-on:click="goBack()" class="header-icon" src='./../../assets/img/right.svg'/>
        <span>{{friendInfo.notenickname!=null?friendInfo.notenickname:friendInfo.nickname}}</span>
      </div>
    </div>
    <div class="chat-contain" ref="chatcontain">
      <div v-for="item in singleChatMsgList" v-bind:key="item.messageid">
        <div v-if="item.fromuserid!=userInfo.userid" class="list-item left">
          <img class="list-photo photo-left" v-bind:src="friendInfo.img!=null?friendInfo.img:require('./../../assets/img/my.jpg')"/>
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
import chatMutationType from './../../store/chatStoreModule/mutationType';
import sendInput from './../../components/sendInput';
import {mapState} from 'vuex';
export default {
  components:{
    sendInput
  },
  computed:{
    ...mapState({
      singleChatMsgList:state=>state.chatStoreModule.singleChatMsgList,
      friendInfo:state=>state.pageJumpStoreModule.friendInfo,
      userInfo:state=>state.loginStoreModule.userInfo
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
      that.$refs.chatcontain.scrollTop = that.$refs.chatcontain.scrollHeight;
    });
  },
  methods:{
    hanldeSend(e){
      let that=this;
      that.$socket.chatMessage({
        "chatid": that.friendInfo.chatid,
        "touserid": that.friendInfo.friendid,
        ...e
      }).then(res=>{
        if(res.code==200){
          that.$store.commit(chatMutationType.CM_ADD_CHAT_ITEM,res.data);
          that.$nextTick(()=>{
            that.$refs.chatcontain.scrollTop = that.$refs.chatcontain.scrollHeight;
          });
        }
      });
    },
    goBack(){
      let that=this;
      that.$router.push("/messageList");
    }
  },
  beforeDestroy(){
    let that=this;
    that.$store.dispatch(chatMutationType.AC_UPDATE_SINGLE_READ,{chatid:that.friendInfo.chatid});
  },
  watch:{
    singleChatMsgList(val,oldval){
      let that=this;
      that.$nextTick(()=>{
        that.$refs.chatcontain.scrollTop = that.$refs.chatcontain.scrollHeight;
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