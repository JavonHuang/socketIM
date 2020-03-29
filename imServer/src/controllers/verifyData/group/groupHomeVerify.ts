
const group_home_verify_role={
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
  createby(value:number){
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
  max(value:number){
    if(typeof value=="number"&&value>2&&value<=100){
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
  homename(value:string){
    if(value!=null&&value!=''&&value.length<=10){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入10位名字'
      }
    }
  },
  notice(value:string){
    if(value!=null&&value!=''&&value.length<=50){
      return{
        result:true,
        msg:'ok'
      }
    }else{
      return{
        result:false,
        msg:'verify:请输入50位以内公告'
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
    yield vali.max = reqBody.max
    yield vali.notice = reqBody.notice
    yield vali.homename = reqBody.homename
  }
}

export {
  group_home_verify_role
}