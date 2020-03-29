import {config} from './../config/config';
const mysql = require("mysql");
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password:config.database.PASSWORD,
  charset:config.database.CHARSET,
  database: config.database.DATABASE
});


  /**
   * 
 * @param sql 要执行的语句
 * @param values－{Array}，要应用到查询占位符的值
  */
const query = async (sql:string,values:any):Promise<any> => {
  return new Promise((resolve, reject) => {
    try{
      pool.getConnection(function(err:any, connection:any) {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (err:any, rows:any) => {
            connection.release();
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        }
      });
    } catch(e){
      reject(e);
    }
  });
}

class transaction{
  private connection:any;
  constructor(){
    
  };
  /**
   * 创建数据库连接
   */
  private async createConection():Promise<any>{
    return new Promise((resolve, reject)=>{
      try{
        pool.getConnection((err:any, connection:any)=> {
          if (err) {
            reject(err);
          } else {
            this.connection=connection;
            resolve();
          }
        });
      }catch(e){
        throw e;
      }
    })
  };
  /**
   * 开始事务
   */
  public async beginTransaction():Promise<any>{
    await this.createConection();
    return new Promise((resolve, reject)=>{
      try{
        this.connection.beginTransaction((err:any)=> {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }catch(e){
        throw e;
      }
    })
  }
  /**
   * 回滚数据
   */
  public async rollBack(){
    return new Promise((resolve, reject)=>{
      try{
        this.connection.rollback(()=>{
          this.connection.release();
          resolve();
        });
      }catch(e){
        reject(e);
      }
    });
  };
  /**
   * 提交事务
   */
  public async commit():Promise<any>{
    return new Promise((resolve, reject)=>{
      try{
        this.connection.commit((err:any, info:any)=> {
          if(err){
            reject(err);
          }else{
            this.connection.release();
            resolve(info);
          }
        });
      }catch(e){
        reject(e);
      }
    });
  };
  /**
   * 执行事务
   * @param sql 
   * @param values 
   */
  public async query(sql:string, values:any):Promise<any>{
    return new Promise((resolve, reject)=>{
      try{
        this.connection.query(sql, values, (err:any, rows:any) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      }catch(e){
        reject(e);
      }
    });
  }
}

export {
  query,
  transaction
};