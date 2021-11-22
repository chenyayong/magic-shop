const pages = {
  path: '/pages',
  redirect: '/pages/home/index',
  component: () => import('@/pages/index.vue'),
  children: [
    {
      path: 'home/index',
      component: () => import('@/pages/home/index.vue')
    },
    {
      path: 'my/index',
      component: () => import('@/pages/my/index.vue')
    },
    {
      path: 'login/index',
      component: () => import('@/pages/login/index.vue')
    },
    {
      path: 'register/index',
      component: () => import('@/pages/register/index.vue')
    },
    {
      path: 'orders/index',
      component: () => import('@/pages/orders/index.vue')
    },
    {
      path: 'shopping-card/index',
      component: () => import('@/pages/shopping-card/index.vue')
    },
    {
      path: 'search/index',
      component: () => import('@/pages/search/index.vue')
    }
  ]
}

export default pages
