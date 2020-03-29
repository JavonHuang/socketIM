<template>
  <div class="seachinput">
    <img src="./../assets/img/seach.svg"/>
    <input ref="myinput" @input="changeInputValue($event)"/>
    <img v-show="!isNull" v-on:click="clearInput()" src="./../assets/img/cloase.svg"/>
    <span v-on:click="cancel()">取消</span>
  </div>
</template>

<script>
export default {
  data(){
    return{
      timer:null,
      isNull:true
    }
  },
  methods:{
    focus(){
      let that=this;
      // that.$refs.myinput.$el.focus();
    },
    cancel(){
      let that=this;
      that.$emit('input',null);
      that.$emit('seach',null);
    },
    clearInput(){
      let that=this;
      that.$refs.myinput.value=null;
      that.$emit('input',null);
      that.$emit('seach',null);
      that.isNull=true;
    },
    changeInputValue(e){
      let that=this;
      clearTimeout(that.timer);
      that.timer=setTimeout(()=>{
        that.$emit('input',e.target.value.trim());
        if(e.target.value.trim()!=''&&e.target.value.trim()!=null){
          that.isNull=false;
          that.$emit('seach',e.target.value.trim());
        }else{
          that.isNull=true;
          that.$emit('seach',null);
        }
      },500)
    }
  }
}
</script>

<style lang="scss" scoped>
.seachinput{
  height: 80px;
  line-height: 80px;
  background: $backgroundColor01;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  font-weight: 700;
  font-size: 30px;
  position: relative;
  span{
    display: block;
    width: 100px;
    color: $fontColor03;
  }
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
  img:nth-of-type(2){
    position: absolute;
    width: 36px;
    height: 36px;
    top:50%;
    right: 115px;
    transform: translateY(-50%);
    margin-left: 4px;
  }
}
</style>