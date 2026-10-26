import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
    {
      path: '/playground',
      name: 'playground',
      component: () => import('@/playground/PlaygroundIndex.vue'),
    },
    {
      path: '/playground/:component',
      name: 'playground-component',
      component: () => import('@/playground/PlaygroundPage.vue'),
    },
  ],
})

export default router
