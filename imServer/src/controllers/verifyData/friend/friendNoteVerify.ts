/**
 * 好友备注验证
 */
const frinde_note_verify_role={
  userid(value:number){
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
  friendid(value:number){
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
  notenickname(value:string){
    if(value==null||value==''||value.length<6){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入6位以内昵称'
      }
    }
  },
  /**
   * 验证步骤
   * @param vali 验证对象
   * @param reqBody 验证值
   */
  validatorNext:function*(vali:any,reqBody:any) {
    yield vali.userid = reqBody.userid
    yield vali.friendid = reqBody.friendid
    yield vali.notenickname = reqBody.notenickname
  }
}

export {
  frinde_note_verify_role
}