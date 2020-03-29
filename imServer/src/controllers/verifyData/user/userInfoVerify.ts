import {userInfo} from './../../../model/user/userInfo';
const updateUserInfo_Role={
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
  nickname(value:string){
    if(value==null||value.length<=10){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入10位以内昵称'
      }
    }
  },
  img(value:string){
    return{
      result:true,
      msg:'ok'
    }
  },
  sex(value:number){
    if(value<=2&&value>=0){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入0-2的整数'
      }
    }
  },
  age(value:number){
    if(value<=200&&value>=0){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入0-200的整数'
      }
    }
  },
  signature(value:string){
    if(value.length<=50){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入50位以内字符串'
      }
    }
  },
  /**
   * 验证步骤
   * @param vali 验证对象
   * @param reqBody 验证值
   */
  validatorNext:function*(vali:userInfo,reqBody:userInfo) {
    yield vali.nickname = reqBody.nickname
    yield vali.img = reqBody.img
    yield vali.sex = reqBody.sex
    yield vali.age = reqBody.age
    yield vali.signature = reqBody.signature
  }
}

export {
  updateUserInfo_Role
}