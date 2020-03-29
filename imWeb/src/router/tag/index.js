export default [{
  path:'/tag',
  name: 'tag',
  component: resolve => require(['./../../views/tag/tag.vue'], resolve),
  meta: {
    title: '所有标签',
    iscache: false
  }
},{
  path:'/editTag',
  name: 'editTag',
  component: resolve => require(['./../../views/tag/editTag.vue'], resolve),
  meta: {
    title: '编辑标签',
    iscache: false
  }
},{
  path:'/addTag',
  name: 'addTag',
  component: resolve => require(['./../../views/tag/addTag.vue'], resolve),
  meta: {
    title: '添加标签',
    iscache: false
  }
}]