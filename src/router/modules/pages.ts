const pages = {
  path: '/pages',
  redirect: '/pages/home/index',
  component: () => import(/* webpackChunkName: "page-home" */ '@/pages/index.vue'),
  children: [
    {
      path: 'home/index',
      component: () => import(/* webpackChunkName: "page-home" */ '@/pages/home/index.vue')
    },
    {
      path: 'my/index',
      component: () => import(/* webpackChunkName: "page-my" */ '@/pages/my/index.vue')
    },
    {
      path: 'search/index',
      component: () => import(/* webpackChunkName: "page-search" */ '@/pages/search/index.vue')
    }
  ]
}

export default pages
