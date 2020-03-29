export default [{
  path:'/chat',
  name: 'chat',
  component: resolve => require(['./../../views/chat/chat.vue'], resolve),
  meta: {
    title: '聊天',
    iscache: false
  },
}]