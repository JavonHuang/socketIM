import {messageResult} from '../../unitls/messageResult';
import {userInfo} from '../../model/user/userInfo';
import * as token from '../../unitls/token';
import * as userModel from '../../model/user/user';
import * as redis from './../../unitls/redis';
import * as userDal from '../../DAL/user/userDal';
import * as userInfoDal from '../../DAL/user/userInfoDal';
import * as DBfactory from '../../DBunity/DBfactory';
/**
 * 用户登录验证
 * @param queryInfo 用户登录信息
 */
const getUser =async (queryInfo:userModel.user):Promise<messageResult> => {
  try{
    let result:any=await userDal.getUser(queryInfo.userid);
    if(result.length>0){
      let tokenStr=token.generateToken(result[0]);
      let obj={
        userInfo:result[0],
        token:tokenStr.data
      };
      return await new messageResult(200,true,obj).getMsg();
    }else{
      return await new messageResult(10000,false,null).getMsg();
    }
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
};

/**
 * 修改密码
 * @param updateUser
 */
const updatePassword = async(updateUser:userModel.updateUser):Promise<any>=>{
  try{
    let count:any=await userDal.verifyOldPassword(updateUser);
    if(count.length>0&&count[0].count>0){
      let result:any=await userDal.updatePassword(updateUser);
      return await new messageResult(200,true,null).getMsg();
    }else{
      return await new messageResult(10001,false,null).getMsg();
    }
  }catch(e){
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}
/**
 * 用户注册
 * @param user 
 * @param userInfo 
 */
const userRegistered=async(user:userModel.user,userInfo:userInfo):Promise<any>=>{
  let db:any;
  try{
    db=new DBfactory.transaction();
    let userId:any=await redis.getNumberByKey('userid',10000000);
    user.userid=userId;
    userInfo.userid=userId;
    await db.beginTransaction();
    await userDal.insertUser(user,db);
    await userInfoDal.insertUserInfo(userInfo,db);
    await db.commit();
    return await new messageResult(200,true,userInfo).getMsg()

  }catch(e){
    await db.rollBack();
    return await new messageResult(100,false,null).getMsg(e.message);
  }
}

export {
  getUser,
  updatePassword,
  userRegistered
}