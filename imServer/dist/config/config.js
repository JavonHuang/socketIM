"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 数据库配置
var config = {
    port: 3000,
    database: {
        DATABASE: 'im',
        USERNAME: 'root',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: 'localhost',
        multipleStatements: true //允许多条sql同时执行
    }
};
exports.config = config;
//token秘钥
var jwtKey = {
    secret: 'cY-!I8aQY0(;Pz/@Slove#3/2018',
    hour: 24 //token有效时长hour
};
exports.jwtKey = jwtKey;
//# sourceMappingURL=config.js.map