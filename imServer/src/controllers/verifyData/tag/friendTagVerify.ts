/**
 * 将好友移出标签-接口表单验证规则
 */
const frinde_tag_verify_role={
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
  tagid(value:number){
    if(value==null||value.toString().length==10){
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
  tag(value:string){
    if(value!=null&&value!=''&&value.length<10){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入10位以内标签'
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
    yield vali.tagid = reqBody.tagid
  }
}

export {
  frinde_tag_verify_role
}