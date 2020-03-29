"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var config_1 = require("./../config/config");
var messageResult_1 = require("./messageResult");
/**
 * 生成token
 * @param {string} userId 用户编码
 */
var generateToken = function (userId) {
    var jwtStr = jwt.sign({
        data: userId,
        // 设置 token 过期时间
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * config_1.jwtKey.hour // 60 seconds * 60 minutes = 1 hour
    }, config_1.jwtKey.secret);
    return new messageResult_1.messageResult(200, true, jwtStr);
};
exports.generateToken = generateToken;
/**
* 验证token
* @param token
*/
var verifyToken = function (token) {
    try {
        var tokenInfo = jwt.verify(token, config_1.jwtKey.secret); // 解密，获取payload
        return new messageResult_1.messageResult(200, true, tokenInfo);
    }
    catch (error) {
        return new messageResult_1.messageResult(300, false, "token invalid");
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map