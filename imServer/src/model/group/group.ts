/**
 * 群聊用户
 */
class groupUser{
  homeid:number;
  userid:number;
  inviter:number;
  unread:number;
  createtime:number|undefined;
  /**
   * 
   * @param homeid 群聊房间号
   * @param userid 用户账号
   * @param inviter 邀请人
   * @param unread 未读消息
   */
  constructor(homeid: number,userid:number,inviter:number=0,unread:number=0) { 
    this.homeid=homeid;
    this.userid=userid;
    this.inviter=inviter;
    this.unread=unread;
  }
}

/**
 * 群聊房间信息
 */
class groupHome{
  homeid:number;
  createby:number;
  createtime:number|undefined;
  max:number;
  homename:string;
  notice:string|undefined;
  userList:Array<string>|undefined;
  lastMsg:groupMessage|undefined;
  /**
   * 
   * @param homeid 群聊房间号
   * @param createby 创建人账号
   * @param createtime 创建时间
   * @param max 人数上限
   * @param homename 房间名称
   * @param notice 公告
   */
  constructor(homeid: number,createby:number,max:number,homename:string,createtime:number=0,notice:string='') { 
    this.homeid=homeid;
    this.createby=createby;
    this.max=max;
    this.homename=homename;
    this.createtime=createtime;
    this.notice=notice;
  }
}

/**
 * 群聊消息
 */
class groupMessage{
  id:number;
  homeid:number;
  fromuserid:number;
  type:number;
  text:string;
  createtime:string;
  /**
   * 
   * @param id 消息流水号
   * @param homeid 群聊房间号
   * @param fromuserid 发送方账号
   * @param type 0:文本；1:图片;2:文件;
   * @param text 消息文本
   * @param createtime 发送时间
   */
  constructor(id: number,homeid:number,fromuserid:number,type:number,text:string,createtime:string) { 
    this.id=id;
    this.homeid=homeid;
    this.fromuserid=fromuserid;
    this.type=type;
    this.text=text;
    this.createtime=createtime;
  }
}

export {
  groupUser,
  groupHome,
  groupMessage
}