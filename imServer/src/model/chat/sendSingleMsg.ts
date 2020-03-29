
enum msType {text=0, img=1, file=2}

/**
 * 单聊消息模型
 */
class sendSingleMsg{
  chatid:number;
  fromuserid:number;
  touserid:number;
  type:msType;
  text:string;
  read:number;
  sendtime:any|undefined;
  /**
   * 
   * @param chatid 单聊房号
   * @param fromuserid 发送方账号
   * @param touserid 接收方账号
   * @param type 0:文本；1:图片;2:文件;
   * @param text 消息文本
   * @param read 0:未读;1:已读;
   */
  constructor(chatid:number,fromuserid:number,touserid:number,type:msType,text:string,read:number) { 
    this.chatid=chatid;
    this.fromuserid=fromuserid;
    this.touserid=touserid;
    this.type=type;
    this.text=text;
    this.read=read;
  }
}

export {sendSingleMsg,msType}