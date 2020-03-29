import Koa = require('koa');
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
import {useControllers} from 'koa-controllers';
const cors = require('koa2-cors');
import * as io from './controllers/socket';
let controllersPath:string='/controllers/*.js';
if(process.env.NODE_ENV=='dev'||process.env.NODE_ENV=='development'){
  controllersPath='/controllers/**/*.ts'
}
const app = new Koa();
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
//跨域处理
app.use(cors({
  credentials: true
}));

useControllers(app, __dirname + controllersPath, {
  multipart: {
    dest: './uploads'
  }
});

const server = require('http').createServer(app.callback())
io.websocket(server);
server.listen(8090);

console.log("env:",process.env.NODE_ENV);
console.log('Server is runing !!')
console.log('click url to:http://localhost:3000')
process.on ('SIGTERM', ()=>{
  console.log('Server is exit !!')
  process.exit();
});  
process.on ('SIGINT', ()=>{
  console.log('Server is exit !!')
  process.exit();
});  