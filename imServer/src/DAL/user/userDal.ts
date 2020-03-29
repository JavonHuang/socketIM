import * as dbUnity from '../../DBunity/DBfactory';
import { user,updateUser } from 'model/user/user';

/**
 * 获取登录用户信息
 * @param userId
 */
const insertUser = async (user:user,db:dbUnity.transaction):Promise<any> => {
  let result=await db.query('INSERT `USER` (USERID,PASSWORD,CREATETIME) VALUES(?,?,now())',[user.userid,user.password]);
  return result;
};
/**
 * 获取登录用户信息
 * @param userId
 */
const getUser = async (userId:number):Promise<any> => {
  let result=await dbUnity.query('SELECT USER_INFO.* FROM USER_INFO INNER JOIN `USER` ON `USER`.USERID=USER_INFO.USERID WHERE `USER`.USERID=?',[userId]);
  return result;
};

/**
 * 验证旧密码
 * @param updateUser 
 */
const verifyOldPassword=async(updateUser:updateUser):Promise<any>=>{
  let result=await dbUnity.query('SELECT COUNT(*) AS count FROM `USER` WHERE USERID=? AND PASSWORD=?',[updateUser.userid,updateUser.oldpassword]);
  return result;
}

/**
 * 更新用户密码
 * @param class updateUser
 }
 */
const updatePassword=async(updateUser:updateUser):Promise<any>=>{
  let result=await dbUnity.query('UPDATE `USER` SET PASSWORD=? WHERE USERID=?',[updateUser.password,updateUser.userid]);
  return result;
}
export {
  insertUser,
  getUser,
  verifyOldPassword,
  updatePassword
};