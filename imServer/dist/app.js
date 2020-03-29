"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var koa_controllers_1 = require("koa-controllers");
var cors = require('koa2-cors');
var controllersPath = '/controllers/*.js';
if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'development') {
    controllersPath = '/controllers/**/*.ts';
}
var app = new Koa();
koa_controllers_1.useControllers(app, __dirname + controllersPath, {
    multipart: {
        dest: './uploads'
    }
});
//跨域处理
app.use(cors());
app.listen(3000);
console.log("env:", process.env.NODE_ENV);
console.log('Server is runing !!');
console.log('click url to:http://localhost:3000');
process.on('SIGTERM', function () {
    console.log('Server is exit !!');
    process.exit();
});
process.on('SIGINT', function () {
    console.log('Server is exit !!');
    process.exit();
});
//# sourceMappingURL=app.js.map