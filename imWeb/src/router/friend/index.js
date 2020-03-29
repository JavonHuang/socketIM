export default [{
  path:'/frinedInfo',
  name: 'frinedInfo',
  component: resolve => require(['./../../views/friend/frinedInfo.vue'], resolve),
  meta: {
    title: '用户资料',
    iscache: false
  },
}]