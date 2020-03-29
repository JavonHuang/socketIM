export default [{
  path:'/editInput',
  name: 'editInput',
  component: resolve => require(['./../../views/editUser/editInput.vue'], resolve),
  meta: {
    title: '修改',
    iscache: false
  },
}]