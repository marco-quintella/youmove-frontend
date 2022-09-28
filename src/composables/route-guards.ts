import { useAuthStore } from 'src/stores/auth'

export default function useRouteGuard () {
  const router = useRouter()
  const authStore = useAuthStore()

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.public)) {
      next()
    } else {
      authStore.isAuthenticated ? next() : next('/login')
    }
  })
}
