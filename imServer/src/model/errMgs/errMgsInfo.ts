/**
 * 系统错误信息模型
 */
class errMgsInfo{
  code:number;
  msg:string;
  /**
   * 
   * @param code 错误码
   * @param msg 错误信息
   */
  constructor(code: number,msg:string) { 
    this.code=code;
    this.msg=msg;
  }
}

export {errMgsInfo}