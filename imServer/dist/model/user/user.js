"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户信息模型
 */
var user = /** @class */ (function () {
    /**
     *
     * @param userid 用户账号
     * @param password 用户密码
     */
    function user(userid, password) {
        this.userid = userid;
        this.password = password;
    }
    return user;
}());
exports.user = user;
/**
 * 用户更新密码模型
 */
var updateUser = /** @class */ (function () {
    /**
     *
     * @param userid 用户账号
     * @param password 用户密码
     * @param oldpassword 旧密码
     */
    function updateUser(userid, password, oldpassword) {
        this.userid = userid;
        this.password = password;
        this.oldpassword = oldpassword;
    }
    return updateUser;
}());
exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map