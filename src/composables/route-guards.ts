import { LocalStorage } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

export default function useRouteGuard () {
  const router = useRouter()
  const authStore = useAuthStore()

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.public)) {
      next()
    } else {
      authStore.fetchLocalStorage()
      if (LocalStorage.getItem('tokens')) {
        next()
      } else {
        next('/login')
      }
    }
  })
}
