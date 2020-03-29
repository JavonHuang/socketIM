"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = function (target, validator, obj) {
    return new Proxy(target, {
        set: function (target, key, value, proxy) {
            var va = validator[key](value);
            if (va.result) {
                return Reflect.set(target, key, value, proxy);
            }
            else {
                throw new Error(va.msg);
                return target[key] = false;
            }
        }
    });
};
exports.validator = validator;
//# sourceMappingURL=proxyVerify.js.map