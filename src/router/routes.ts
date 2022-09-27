import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        components: {
          default: () => import('pages/IndexPage.vue'),
          header: () => import('components/Layout/MainToolbar.vue')
        }
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/auth/LoginPage.vue'),
    meta: {
      public: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
