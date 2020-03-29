import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRoute from './home';
import editUserRoute from './editUser';
import chatRoute from './chat';
import userDetailRoute from './userDetail';
import tagRoute from './tag';
import friendRoute from './friend';
import groupRoute from './group';
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: resolve => require(['./../views/login'], resolve),
    meta: {
      title:'登录',
      iscache:false
    },
  },
  {
    path: '/registered',
    component: resolve => require(['./../views/registered.vue'], resolve),
    meta: {
      title:'注册',
      iscache:false,
      auth:true
    },
  },
  {
    path: '/registerFinish',
    component: resolve => require(['./../views/registerFinish.vue'], resolve),
    meta: {
      title:'注册成功',
      iscache:false
    },
  },
  { 
    path: '*',
    name: 'error',
    redirect: '/error/error',
    component: resolve => require(['./../views/error/error'], resolve),
    meta: { 
      title:'异常页',
      iscache:false
    },
  },
  ...homeRoute,
  ...editUserRoute,
  ...chatRoute,
  ...userDetailRoute,
  ...tagRoute,
  ...friendRoute,
  ...groupRoute
]

export default new VueRouter({
  routes
})