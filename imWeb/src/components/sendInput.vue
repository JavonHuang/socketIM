<template>
<div class="msg">
  <div class="msg-foot">
    <textarea @focus="hideEmoji()" v-model="sendMsg"/>
    <img class="send-emoji" src="./../assets/img/send_emoji.svg" v-on:click="handleEmoji()"/>
    <span class="send-btn" v-on:click="handleSend()">发送</span>
  </div>
  <div v-bind:class="[isEmoji?'msg-emoji-active':'msg-emoji']">
    <span v-for="(item,index) in emojiList" v-bind:key="index" v-on:click="addEmoji(item)">{{item}}</span>
  </div>
  <div v-show="isEmoji" v-on:click="isEmoji=false" class="layout">
  </div>
</div>
</template>

<script>
import emoji from './../utils/emoji';
export default {
  data(){
    return{
      isEmoji:false,
      sendMsg:"",
      emojiList:[]
    }
  },
  created(){
    let that=this;
    that.emojiList=emoji;
  },
  methods:{
    handleEmoji(){
      let that=this;
      that.isEmoji=!that.isEmoji;
    },
    addEmoji(e){
      let that=this;
      that.sendMsg+=e;
    },
    hideEmoji(){
      let that=this;
      that.isEmoji=false;
    },
    handleSend(){
      let that=this;
      if(that.sendMsg==""){
        return false;
      }
      that.$emit("send",{
        type:0,
        text:that.sendMsg
      });
      that.sendMsg="";
    }
  }
}
</script>

<style lang="scss" scoped>
.msg{
  position: fixed;
  bottom: 0;
  width: 100%;
  .msg-foot{
    padding: 0px 10px;
    box-sizing: border-box;
    height: 120px;
    line-height: 120px;
    background: #f9f9f9;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    .send-emoji{
      height: 50px;
      width: 50px;
      margin: auto 10px;
    }
    textarea{
      background: #fff;
      height: 80px;
      line-height: 1.3;
      display: block;
      margin: auto 0;
      width: 100%;
      border: none;
      box-sizing: border-box;
      caret-color:$fontColor03;
      border-radius: 8px;
    }
    .send-btn{
      width: 100px;
      height: 60px;
      margin: auto 0;
      line-height: 60px;
      border-radius: 4px;
      color: #fff;;
      text-align: center;
      background: $backgroundColor04;
    }
  }
  .msg-emoji{
    background: #fff;
    text-align: left;
    height: 0px;
    // transition: height 0.5s;
    // -moz-transition: height 0.5s;	/* Firefox 4 */
    // -webkit-transition: height 0.5s;	/* Safari 和 Chrome */
    // -o-transition: height 0.5s;	/* Opera */
    overflow-y: auto;
    span{
      font-size: 40px;
      margin: 5px;
    }
  }
  .msg-emoji-active{
    background: #fff;
    height: 500px;
    overflow-y: auto;
    text-align: left;
    transition: height 0.5s;
    -moz-transition: height 0.5s;	/* Firefox 4 */
    -webkit-transition: height 0.5s;	/* Safari 和 Chrome */
    -o-transition: height 0.5s;	/* Opera */
    span{
      font-size: 40px;
      margin: 5px;
    }
  }
  .layout{
    position: fixed;
    top:0;
    width: 100%;
    background: transparent;
    bottom: 600px;
  }
}
</style>