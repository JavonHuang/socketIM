/**
 * 用户信息模型
 */
class user{
  userid:number;
  password:string;
  /**
   * 
   * @param userid 用户账号
   * @param password 用户密码
   */
  constructor(userid: number,password:string) { 
    this.userid=userid;
    this.password=password;
  }
}

/**
 * 用户更新密码模型
 */
class updateUser{
  userid:number;
  password:string;
  oldpassword:string;
  /**
   * 
   * @param userid 用户账号
   * @param password 用户密码
   * @param oldpassword 旧密码
   */
  constructor(userid: number,password:string,oldpassword:string) { 
    this.userid=userid;
    this.password=password;
    this.oldpassword=oldpassword;
  }
}
export {user,updateUser}