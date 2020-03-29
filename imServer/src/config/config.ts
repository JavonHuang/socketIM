// 数据库配置
const config = {
  port: 3000,
  database: {
    DATABASE: 'im', //数据库
    USERNAME: 'root', //用户
    PASSWORD: '123456', //密码
    PORT: '3306', //端口
    HOST: 'localhost', //服务ip地址
    CHARSET:'utf8mb4',
    multipleStatements: true//允许多条sql同时执行
  }
}
//token秘钥
const jwtKey={
  secret:'cY-!I8aQY0(;Pz/@Slove#3/2018',//秘钥
  hour:24//token有效时长hour
}

export {config,jwtKey};