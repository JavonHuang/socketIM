const redis = require("redis"),
    client = redis.createClient('6379','127.0.0.1',{auth_pass:null,db:1});

client.on("error", function (err:any) {
    console.log("redis: " + err);
    process.exit();
});
/**
 * 记录自增量
 * @param key 自增key;mgsId:消息编码;conversationId:会话编码;groupId:群组编码;id:系统用户编码
 */
const inrcCache=(key:string)=> {
    return new Promise((resolve, reject) => {
      try{
        client.incr(key, (err:any, res:any) => {
          resolve(1);
      });
    }catch(e){
      reject(e);
    }
  })
}

/**
 * 根据key 获取自增量,自增key;mgsId:消息编码;conversationId:会话编码;groupId:群组编码;id:系统用户编码
 * @param key 
 * @returns value
 */
const getCacheById=(key:string)=> {
    return new Promise((resolve, reject) => {
      try{
        client.get(key, (err:any, reply:any) => {
          resolve(reply);
        });
      }catch(e){
        reject(e);
      }
    })
    
}

/**
 * 根据key 删除自增量
 * @param key redis key
 */
const deleteCacheById=(key:string)=> {
    return new Promise((resolve, reject) => {
      try{
        client.del(key, (err:any, reply:any) => {
          resolve(1);
        });
      }catch(e){
        reject(e);
      }
    })
}
/**
 * 根据key 重置自增量
 * @param key redis key
 */
const resetCacheById=(key:string)=> {
    return new Promise((resolve, reject) => {
      try{
        client.getset(key, 0, (err:any, reply:any) => {
          resolve(1);
        });
      }catch(e){
        reject(e);
      }
    })
}

/**
 * 根据id和key更新value
 * @param id redis id 名称
 * @param userid 对应的key值 
 * @param socketid 对应的value值 
 */
const updatehCache=(id:string, userid:string, socketid:string)=> {
    return new Promise((resolve, reject) => {
      try{
        client.hset(id, userid, socketid,  (err:any, res:any) => {
          resolve(1);
        });
      }catch(e){
        reject(e);
      }
    })
}

/**
 * 根据id和key获取value
 * @param id redis id
 * @param key 对应的key值 
 * @returns value
 */
const gethCacheById=(id:string, key:number)=> {
  return new Promise((resolve, reject) => {
    try{
      client.hmget(id, key, (err:any, res:any) => {
        resolve(res[0]);
      });
    }catch(e){
      reject(e);
    }
  })
}

/**
 * 根据id和key所有缓存key
 * @param id redis id
 * @returns key array
 */
const gethAllCache=(id:string)=> {
  return new Promise((resolve, reject) => {
    try{
      client.hkeys(id, (err:any, res:any) => {
        resolve(res);
      });
    }catch(e){
      reject(e);
    }
  })
}
/**
 * 根据key获取流水号
 * @param key 自增key;userid:消息编码;conversationId-C:会话编码;groupId-G:群组编码;gmgsId-M:群组消息编码;id:系统用户编码-U
 * @param prefix 序号前缀
 */
const getNumberByKey= async(key:string,prefix:number):Promise<any>=>{
  return new Promise( async(resolve, reject) => {
    let a= inrcCache(key);
    let b= getCacheById(key);
    Promise.all([a,b]).then((value)=>{
      let result:any=prefix+Number(value[1]);
      resolve(result);
    })
  })
}

/**
 * 根据id和key更新value
 * @param id redis id 名称
 * @param socketid 对应的value值 
 */
const delhCacheById=(id:string, socketid:string)=>{
  return new Promise((resolve, reject) => {
    try{
      client.hdel(id, socketid, (err:any, res:any) => {
        resolve(res[0]);
      });
    }catch(e){
      reject(e);
    }
  })
}

export{
  getNumberByKey,
  updatehCache,
  delhCacheById,
  gethCacheById
}
