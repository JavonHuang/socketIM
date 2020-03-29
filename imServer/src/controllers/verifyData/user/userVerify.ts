/**
 * 登录接口表单验证规则
 */
const user_login_verify_role={
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
  password(value:string){
    if(value==null||value.length==6){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入6位密码'
      }
    }
  },
  /**
   * 验证步骤
   * @param vali 验证对象
   * @param reqBody 验证值
   */
  validatorNext:function*(vali:any,reqBody:any) {
    yield vali.password = reqBody.password
  }
}

/**
 * 用户修改密码接口表单验证规则
 */
const updatePassword_verify_role={
  userid(value:number){
    if(value.toString().length==8){
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
  password(value:string){
    if(value.length==6){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入6位新密密码'
      }
    }
  },
  oldpassword(value:string){
    if(value.length==6){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入6位旧密码'
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
    yield vali.password = reqBody.password
    yield vali.oldpassword = reqBody.oldpassword
  }
}

export {
  user_login_verify_role,
  updatePassword_verify_role
}