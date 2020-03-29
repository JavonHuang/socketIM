<template>
  <div class="edittag">
    <div class="edittag-header">
      <div class="header-left">
        <img v-on:click="goBack()" class="header-icon" src='./../../assets/img/right.svg'/>
        <span>群信息</span>
      </div>
      <span class="edittag-save" v-show="userInfo.userid==homeInfo.createby" v-on:click="saveEdit()">保存</span>
    </div>
    <div class="edittag-main">
      <div class="list-space">
        群昵称
      </div>
      <div class="list-cell">
        <input :disabled="userInfo.userid!=homeInfo.createby" v-model="homeInfo.homename" placeholder="例如：家人，朋友"/>
      </div>
      <div class="list-space">
        群公告
      </div>
      <div class="list-cell">
        <input :disabled="userInfo.userid!=homeInfo.createby" v-model="homeInfo.notice" placeholder="例如：禁止发广告"/>
      </div>
      <div class="list-space">
        成员
      </div>
      <div class="tag-friend">
        <div class="item-friend" v-for="(item,index) in groupUserList" v-bind:key="item.friendid" v-on:click="addDel(item,index)">
          <img v-bind:src="item.img!=null?item.img:require('./../../assets/img/my.jpg')"/>
          <img v-show="isDel" class="del-tag" src="./../../assets/img/edit_tag_del.svg"/>
          <span>{{item.notenickname!=null?item.notenickname:item.nickname}}</span>
        </div>
        <div v-show="!isDel" class="item-friend" v-on:click="handleAdd()">
          <img class="img-icon" src="./../../assets/img/edittag_add.svg"/>
        </div>
        <div v-show="!isDel&&userInfo.userid==homeInfo.createby" v-on:click="handleDel()" class="item-friend">
          <img class="img-icon" src="./../../assets/img/edittag_del.svg"/>
        </div>
      </div>
      <div class="edittag-del">
        <span v-on:click="logoutGroup()">退出群</span>
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
      homeInfo:state=>state.pageJumpStoreModule.homeInfo,
      userInfo:state=>state.loginStoreModule.userInfo
    })
  },
  data(){
    return{
      isDel:false,
      groupUserList:[],
      delList:[]
    }
  },
  mounted(){
    let that=this;
    that.getGroupUserList();
  },
  methods:{
    getGroupUserList(){
      let that=this;
      that.$axios.post(API.GET_GROUP_USER_LIST, {homeid:that.homeInfo.homeid}, false,false).then(res => {
         if (res.data.code ==200) {
           that.groupUserList=res.data.data;
         }
      });
    },
    handleDel(){
      let that=this;
      that.isDel=true;
    },
    addDel(e,i){
      let that=this;
      if(!that.isDel){
        return false;
      }
      that.delList.push(e);
      that.groupUserList.splice(i,1);
    },
    saveEdit(){
      let that=this;
      let PromiseList=new Array();
      if(that.delList.length>0){
        let list=new Array();
        that.delList.forEach(item=>{
          list.push(item.userid);
        });
        PromiseList.push(that.$axios.post(API.DEL_GROUP_USER, {homeid:that.homeInfo.homeid,useridList:list}, false,false));
      }
      PromiseList.push(that.$axios.post(API.UPDATE_GROUP_HOME, that.homeInfo, false,false));
      Promise.all(PromiseList).then(res=>{
        that.$router.go(-1);
      });
    },
    logoutGroup(){
      let that=this;
      that.$axios.post(API.DEL_GROUP_USER,{homeid:that.homeInfo.homeid,useridList:[that.userInfo.userid]}, false,false).then(res=>{
        if(res.data.code==200){
          that.$router.replace("/group/homeList");
        }
      })
    },
    handleAdd(){
      let that=this;
      that.$router.push('/group/addGroupUser');
    },
    goBack(){
      let that=this;
      that.$router.go(-1);
    },
  }
}
</script>

<style lang="scss" scoped>
.edittag{
  height: 100%; 
  padding-bottom: 80px;
  box-sizing: border-box;
  background: $backgroundColor02;
  .edittag-header{
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
    .edittag-save{
      height: 50px;
      line-height: 50px;
      margin: auto 0px;
      background: $backgroundColor04;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 28px;
      font-weight:normal;
    }
  }
  .edittag-main{
    height: 100%;
    overflow-y: auto;
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
        margin: auto 10px;
        padding: 2px 15px;
        border-radius: 20px;
        font-size: 24px;
        // box-sizing: border-box;
        color: $fontColor05;
      }
      input{
        font-size: 28px;
        padding: 8px 4px;
        border: none;
        display: inline-block;
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
    .tag-friend{
      background:#fff;
      padding: 20px 20px;
      height: auto;
      min-height: 100px;
      display: flex;
      flex-wrap: wrap;
      .item-friend{
        display: flex;
        flex-direction: column;
        position: relative;
        width: 110px;
        // height: 100px;
        img{
          width: 80px;
          height: 80px;
          margin: 10px 15px;
          border-radius: 8px;
        }
        span{
          text-align: center;
          font-size: 20px;
          color: $fontColor02;
          display: block;
          width: 100%;
          display: block;
          // word-break: keep-all;
          text-overflow: -o-ellipsis-lastline;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 1;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
        .img-icon{
          border: 4px dotted #cdcdcd;
          border-radius: 8px;
        }
        .del-tag{
          height: 40px;
          width: 40px;
          position: absolute;
          top:-5px;
          left: -5px;
        }
      }
    }
    .edittag-del{
      padding: 20px 20px;
      span{
        background: #ff5757;
        color:$fontColor04;
        height: 80px;
        width: 100%;
        display: inline-block;
        line-height: 80px;
        font-size: 30px;
      }
    }
  }
}
</style>