import * as errmsgDal from '../DAL/errMgs/errmsgDal';
import {errMgsInfo} from '../model/errMgs/errMgsInfo';
/**
 * 逻辑层数据返回统一格式
 */
class messageResult{
  public code:number;
  public success:boolean;
  public message:any;
  public data:any;
  public msg(e?:any){
    if(this.code==200){
      this.message='ok';
      return this;
    }
    if(this.code==100){
      this.message=e;
      return this;
    }
  };
  public async getMsg(e?:any):Promise<any>{
    if(this.code==200){
      if(e==null||e==''){
        this.message='ok';
        return this;
      }else{
        this.message=e;
        return this;
      }
    }
    if(this.code==100){
      this.message=e;
      return this;
    }
    let resutl:any=await errmsgDal.getErrMsg(this.code);
    if(resutl.length>0){
      let msgInfo:errMgsInfo=resutl[0];
      this.message=msgInfo.msg;
    }else{
      this.message="code undefined"
    }
    return this;
  }  
  /**
   * 逻辑层结果返回
   * @param {number} code 返回状态码 0:操作失败,1:操作成功
   * @param {boolean} success 
   * @param {string} message 返回信息
   * @param {object} data 返回数据对象
   */
  constructor(code: number,success:boolean, data:any) { 
    this.code=code;
    this.success=success;
    this.data=data;
  }
}

export {messageResult}