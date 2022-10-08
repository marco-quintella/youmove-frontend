import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { LocalStorage } from 'quasar'
import { AuthTokens } from '../types/auth'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:3000/v1/', withCredentials: true })

export default boot(({ app, router }) => {
  api.interceptors.request.use(
    async config => {
      const tokens = LocalStorage.getItem('tokens') as AuthTokens
      if (tokens && tokens.access && tokens.refresh) {
        config.headers.Authorization = `Bearer ${tokens.access.token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    res => res,
    async error => {
      const accessToken = LocalStorage.getItem('tokens') as AuthTokens
      if (error.response.status === 401 && accessToken && accessToken.refresh && error.request.responseURL.indexOf('refresh-tokens') === -1) {
        try {
          const response = await authService.refreshTokens(accessToken.refresh.token)
          LocalStorage.set('tokens', response.data)
          error.config.headers.Authorization = `Bearer ${response.data.access?.token}`
          return api.request(error.config)
        } catch (e) {
          LocalStorage.remove('tokens')
          LocalStorage.remove('user')
          router.push('/login')
        }
      } else {
        LocalStorage.remove('tokens')
        LocalStorage.remove('user')
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
