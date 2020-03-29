/**
 * 好友验证
 */
class friendVerify{
  id:any;
  fromuserid:number;
  touserid:number;
  status:number;
  verify:string;
  /**
   * 
   * @param id 标签自增流水号
   * @param userid 发起人账号
   * @param touserid 接收人账号
   * @param status 验证状态
   * @param verify 验证信息
   */
  constructor(id:any,fromuserid:number,touserid:number,status:number,verify:string) { 
    this.id=id;
    this.fromuserid=fromuserid;
    this.touserid=touserid;
    this.verify=verify;
    this.status=status;
  }
}

export {friendVerify}