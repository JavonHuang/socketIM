export default [{
    path:'/home',
    name: 'home',
    component: resolve => require(['./../../views/home/home.vue'], resolve),
    meta: {
      title: '主页',
      iscache: false
    },
    children:[
      {
        path:'/messageList',
        name: 'messageList',
        component: resolve => require(['./../../views/home/messageList.vue'], resolve),
        meta: {
          title: '消息',
          iscache: false
        },
      },
      {
        path:'/friendList',
        name: 'friendList',
        component: resolve => require(['./../../views/home/friendList.vue'], resolve),
        meta: {
          title: '通讯录',
          iscache: false
        },
      },
      {
        path:'/person',
        name: 'person',
        component: resolve => require(['./../../views/home/person.vue'], resolve),
        meta: {
          title: '我',
          iscache: false
        },
      },
      {
        path:'/discovery',
        name:'discovery',
        component:resolve=>require(['./../../views/home/discovery.vue'],resolve),
        meta: {
          title: '发现',
          iscache: false
        },
      }
    ]
  }
]
