"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 逻辑层数据返回统一格式
 */
var messageResult = /** @class */ (function () {
    /**
     * 逻辑层结果返回
     * @param {number} code 返回状态码 0:操作失败,1:操作成功
     * @param {boolean} success
     * @param {string} message 返回信息
     * @param {object} data 返回数据对象
     */
    function messageResult(code, success, message, data) {
        this.code = code;
        this.success = success;
        this.message = message;
        this.data = data;
    }
    return messageResult;
}());
exports.messageResult = messageResult;
//# sourceMappingURL=messageResult.js.map