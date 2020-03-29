/**
 * 好友备注验证
 */
const friend_Verify_role={
  id(value:number){
    if(typeof value =="number"){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入正确id'
      }
    }
  },
  fromuserid(value:number){
    if(value==null||value.toString().length==8){
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
  touserid(value:number){
    if(value==null||value.toString().length==8){
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
  status(value:number){
    if(value==0||value==1||value==2){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入0-2位以内数字'
      }
    }
  },
  /**
   * 验证步骤
   * @param vali 验证对象
   * @param reqBody 验证值
   */
  validatorNext:function*(vali:any,reqBody:any) {
    yield vali.id = reqBody.id
    yield vali.fromuserid = reqBody.fromuserid
    yield vali.touserid = reqBody.touserid
    yield vali.status = reqBody.status
  }
}

export {
  friend_Verify_role
}