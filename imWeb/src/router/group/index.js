export default [{
  path:'/group/createHome',
  name: 'createHome',
  component: resolve => require(['./../../views/group/createHome.vue'], resolve),
  meta: {
    title: '选择群聊',
    iscache: false
  },
},{
  path:'/group/homeList',
  name: 'homeList',
  component: resolve => require(['./../../views/group/homeList.vue'], resolve),
  meta: {
    title: '群聊列表',
    iscache: false
  },
},{
  path:'/group/groupChat',
  name: 'groupChat',
  component: resolve => require(['./../../views/group/groupChat.vue'], resolve),
  meta: {
    title: '群聊',
    iscache: false
  },
},{
  path:'/group/groupInfo',
  name: 'groupInfo',
  component: resolve => require(['./../../views/group/groupInfo.vue'], resolve),
  meta: {
    title: '群信息设置',
    iscache: false
  },
},{
  path:'/group/addGroupUser',
  name: 'addGroupUser',
  component: resolve => require(['./../../views/group/addGroupUser.vue'], resolve),
  meta: {
    title: '添加群成员',
    iscache: false
  },
}]