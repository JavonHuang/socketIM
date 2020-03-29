export default [{
  path:'/userdetail',
  name: 'userdetail',
  component: resolve => require(['./../../views/userDetail/userDetail.vue'], resolve),
  meta: {
    title: '备注信息',
    iscache: false
  }
},{
  path:'/userInfo',
  name: 'userInfo',
  component: resolve => require(['./../../views/userDetail/userInfo.vue'], resolve),
  meta: {
    title: '编辑好友备注信息',
    iscache: false
  },
}]