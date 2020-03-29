
const group_message_verify_role={
  homeid(value:number){
    if(typeof value=="number"&&value.toString().length==10){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入10位群聊账号'
      }
    }
  },
  fromuserid(value:number){
    if(typeof value=="number"&&value.toString().length==8){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入8位账号'
      }
    }
  },
  type(value:number){
    if(typeof value=="number"&&value>=0&&value<=2){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入10位账号'
      }
    }
  },
  text(value:string){
    if(value!=null&&value!=''&&value.length<255){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入255位以内文字'
      }
    }
  },
  /**
   * 验证步骤
   * @param vali 验证对象
   * @param reqBody 验证值
   */
  validatorNext:function*(vali:any,reqBody:any) {
    yield vali.homeid = reqBody.homeid
    yield vali.fromuserid = reqBody.fromuserid
    yield vali.type = reqBody.type
    yield vali.text = reqBody.text
  }
}

export {
  group_message_verify_role
}