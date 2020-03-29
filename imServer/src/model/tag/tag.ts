/**
 * 标签信息模型
 */
class tag{
  tagid:number;
  userid:number;
  friendid:number;
  tag:string;
  /**
   * 
   * @param tagid 标签自增流水号
   * @param userid 用户账号
   * @param friendid 好友账号
   * @param tag 标签名称
   */
  constructor(tagid: number,userid:number,friendid:number,tag:string) { 
    this.tagid=tagid;
    this.userid=userid;
    this.friendid=friendid;
    this.tag=tag;
  }
}

export {tag}