import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/demo',
      component: () => import('@/views/Demo.vue'),
    },
    {
      path: '/contact',
      component: () => import('@/views/Contact.vue'),
    },
    {
      path: "/:catchAll(.*)",
      component: Home,
    }
  ],
})
