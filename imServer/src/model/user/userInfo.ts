
class userInfo{
  userid:string;
  nickname:string;
  img:string;
  sex:number;
  age:number;
  signature:string;
  createdate:number;
  updatetime:number;
  constructor(userid:string,nickname:string,img:string,sex:number,age:number,signature:string,createdate:number,updatetime:number){
    this.userid=userid;
    this.nickname=nickname;
    this.img=img;
    this.sex=sex;
    this.age=age;
    this.signature=signature;
    this.createdate=createdate;
    this.updatetime=updatetime;
  }
}

export {userInfo};