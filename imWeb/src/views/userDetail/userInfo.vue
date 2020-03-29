<template>
  <div class="userinfo">
    <div class="userinfo-header">
      <div class="header-left">
        <img v-on:click="goBack()" class="header-icon" src='./../../assets/img/right.svg'/>
        <span>设置备注和标签</span>
      </div>
      <span class="header-save-active" v-on:click="saveEdit()">完成</span>
    </div>
    <div class="list-space">
      备注
    </div>
    <div class="list-cell">
      <input v-model="notenickname"/>
    </div>
    <div class="list-space">
      标签
    </div>
    <div class="list-cell">
      <span class="span-tag" v-show="item.chosen" v-on:click="handleDelTag(item,index)" v-for="(item,index) in friendTag" v-bind:key="item.tagid">{{item.tag}}</span>
      <input class="tag-input" v-model="newTag" @keyup="enterInput($event)" placeholder="添加标签"/>
    </div>
    <div class="list-space">
      所有标签
    </div>
    <div class="list-tag">
      <span class="span-tag" v-show="!item.chosen" v-on:click="handleAddTag(item)" v-for="item in tagList" v-bind:key="item.tagid">{{item.tag}}</span>
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
      friendInfo:state=>state.pageJumpStoreModule.friendInfo,
      userInfo:state=>state.loginStoreModule.userInfo,
      friendTag:state=>state.pageJumpStoreModule.friendTag
    })
  },
  data(){
    return{
      tagList:[],
      newTag:null,
      notenickname:null
    }
  },
  mounted(){
    let that=this;
    that.notenickname=that.friendInfo.notenickname;
    that.getAllFriendTag();
  },
  methods:{
    getAllFriendTag(){
      let that=this;
      that.$axios.post(API.GET_ALL_FRIEND_TAG, {userid:that.userInfo.userid}, false,false).then(res => {
        if (res.data.code ==200) {
          let list=res.data.data;
          that.friendTag.forEach(item => {
            let index=list.findIndex(_item=>{
              return item.tagid==_item.tagid;
            });
            if(index>-1){
              list[index]["chosen"]=true;
            }else{
              list[index]["chosen"]=false;
            }
          });
          that.tagList=list;
        } 
      });
    },
    handleAddTag(e){
      let that=this;
      e.chosen=!e.chosen;
      let copyList=Object.merge([],that.friendTag);
      let index=copyList.findIndex(item=>{
        return item.tagid==e.tagid;
      });
      if(index>-1){
        copyList[index].chosen=true;
      }else{ 
        copyList.push({
          tagid:e.tagid,
          tag:e.tag,
          chosen:true
        });
      }
      that.$store.commit(pageJumpMutationType.USERINFO_CM_FRIEND_TAG,copyList);
    },
    handleDelTag(e,i){
      let that=this;
      if(e.tagid==null){
        let copyList=Object.merge([],that.friendTag);
        copyList.splice(i,1);
        that.$store.commit(pageJumpMutationType.USERINFO_CM_FRIEND_TAG,copyList);
        return false;
      }
      e.chosen=!e.chosen;
      let index=that.tagList.findIndex(item=>{
        return item.tagid==e.tagid;
      });
      if(index>-1){
        that.tagList[index].chosen=false;
      }else{
        that.tagList[index].chosen=true;
      }
    },
    enterInput(e){
      let that=this;
      if(e.keyCode==13){
        if(that.newTag.trim().length>0){
          let copyList1=Object.merge([],that.friendTag);
          copyList1.push({
            tagid:null,
            tag:that.newTag,
            chosen:true
          });
          that.$store.commit(pageJumpMutationType.USERINFO_CM_FRIEND_TAG,copyList1);
          that.newTag=null;
        }
      }
      if(e.keyCode==8){
        let that=this;
        let copyList2=Object.merge([],that.friendTag);
        if(that.newTag==''||that.newTag==null){
          if(copyList2[copyList2.length-1].tagid==null){
            copyList2.splice(copyList2.length-1,1);
            that.$store.commit(pageJumpMutationType.USERINFO_CM_FRIEND_TAG,copyList2);
          }else{
            let list=new Array();
            copyList2.forEach((item,index)=>{
              if(item.chosen){
                list.push(index);
              }
            });
            if(list.length>0){
              copyList2[list[list.length-1]].chosen=false;
              that.$store.commit(pageJumpMutationType.USERINFO_CM_FRIEND_TAG,copyList2);
              let index=that.tagList.findIndex(item=>{
                return item.tagid==copyList2[list[list.length-1]].tagid;
              });
              that.tagList[index].chosen=false;
            }
          }
        }
      }
    },
    updateTag(){
      let that=this;
      let addtagid=new Array();
      let newtagid=new Array();
      that.friendTag.forEach(item=>{
        if(item.tagid==null){
          newtagid.push(item.tag);
        }else{
          if(item.chosen){
            addtagid.push(item.tagid);
          }
        }
      })
      return that.$axios.post(API.UPDATE_TAG, {userid:that.userInfo.userid,friendid:that.friendInfo.friendid,addtagid:addtagid,newtagid:newtagid}, false,false);
    },
    setFriendNoteNickName(){
      let that=this;
      return that.$axios.post(API.SET_FRIEND_NOTENICKNAME, {userid:that.userInfo.userid,friendid:that.friendInfo.friendid,notenickname:that.notenickname}, false,false);
    },
    saveEdit(){
      let that=this;
      let promiseList=new Array();
      promiseList.push(that.updateTag());
      promiseList.push(that.setFriendNoteNickName());

      Promise.all(promiseList).then(values=>{
        that.friendInfo.notenickname=that.notenickname;
        that.$router.go(-1);
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
.userinfo{
  height: 100%;
  background: $backgroundColor02;
  .userinfo-header{
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
    min-height: 100px;
    border-bottom: 1px solid $borderColor02;
    display: flex;
    padding: 20px 20px;
    flex-wrap: wrap;
    box-sizing: border-box;
    .span-tag{
      display: block;
      border: 1px solid $borderColor03;
      margin:10px;
      padding: 2px 15px;
      border-radius: 20px;
      font-size: 28px;
      // box-sizing: border-box;
      color: $fontColor05;
      height: 40px;
      line-height: 45px;
    }
    input{
      font-size: 28px;
      padding: 8px 4px;
      border: none;
      display: inline-block;
      width: 100%;
    }
    .tag-input{
      display: inline-block;
      font-size: 28px;
      padding: 8px 10px;
      border: none;
      background: $backgroundColor02;
      height: 40px;
      margin: 10px;
      width: auto;
    }
  }
  .list-tag{
    background:#fff;
    position: relative;
    min-height: 100px;
    border-bottom: 1px solid $borderColor02;
    display: flex;
    padding: 20px 20px;
    flex-wrap: wrap;
    box-sizing: border-box;
    .span-tag{
      display: block;
      border: 1px solid $borderColor03;
      margin: 10px;
      padding: 2px 15px;
      border-radius: 20px;
      font-size: 28px;
      // box-sizing: border-box;
      color: $fontColor05;
      height: 45px;
      line-height: 45px;
    }
  }    
}
</style>