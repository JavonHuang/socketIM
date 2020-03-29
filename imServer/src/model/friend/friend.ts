/**
 * 用户备注
 */
class friendNote{
  userid:number;
  friendid:number;
  notenickname:string;
  /**
   * 
   * @param userid 用户账号
   * @param friendid 好友账号
   * @param notenickname 用户备注
   */
  constructor(userid:number,friendid:number,notenickname:string) { 
    this.userid=userid;
    this.friendid=friendid;
    this.notenickname=notenickname;
  }
}

/**
 * 用户好友
 */
class userFriend{
  userid:number;
  friendid:number;
  chatid:number;
  createtime:any;
  /**
   * 
   * @param userid 标签自增流水号
   * @param friendid 用户账号
   * @param chatid 好友账号
   * @param createtime 添加时间
   */
  constructor(userid:number,friendid:number,chatid:number) { 
    this.userid=userid;
    this.friendid=friendid;
    this.chatid=chatid;
  }
}
export {
  friendNote,
  userFriend
}