import * as dbUnity from '../../DBunity/DBfactory';

const getErrMsg = async (code:number):Promise<any> => {
  let result=await dbUnity.query('select * from errmsg where code=?',[code]);
  return result;
};

export {getErrMsg};