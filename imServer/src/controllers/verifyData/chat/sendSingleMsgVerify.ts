/**
 * 消息验证
 */
const sendSingleMsgVerify_role={
  chatid(value:number){
    if(value!=null&&value.toString().length==10){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:chatid请输入10位单聊账号'
      }
    }
  },
  fromuserid(value:number){
    if(value!=null&&value.toString().length==8){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:fromuserid请输入8位账号'
      }
    }
  },
  touserid(value:number){
    if(value!=null&&value.toString().length==8){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:touserid请输入8位账号'
      }
    }
  },
  type(value:number){
    if(0<=value&&value<=2){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:type请输入0-2'
      }
    }
  },
  text(value:string){
    if(value.length<255){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:text请输入<255字符'
      }
    }
  },
  read(value:number){
    if(0<=value&&value<=1){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:read请输入0-1'
      }
    }
  },
  /**
   * 
   * @param vali 
   * @param reqBody 
   */
  validatorNext:function*(vali:any,reqBody:any) {
    yield vali.chatid = reqBody.chatid
    yield vali.fromuserid = reqBody.fromuserid
    yield vali.touserid = reqBody.touserid
    yield vali.type = reqBody.type
    yield vali.text = reqBody.text
    yield vali.read = reqBody.read
  }
}

export {
  sendSingleMsgVerify_role
}