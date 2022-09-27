import { boot } from 'quasar/wrappers'
import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apollo: ApolloClient<NormalizedCacheObject>
  }
}

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql'
})

// Cache implementation
const cache = new InMemoryCache()

const getNewMiddlewareLink = () => {
  return new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
    return forward(operation)
  })
}

const getNewApolloCLient = () => {
  return new ApolloClient({
    link: concat(getNewMiddlewareLink(), httpLink),
    cache
  })
}

// Create the apollo client
const apolloClient: ApolloClient<NormalizedCacheObject> = getNewApolloCLient()

const renewApolloToken = () => {
  apolloClient.setLink(concat(getNewMiddlewareLink(), httpLink))
}

export default boot(({ app }) => {
  app.provide(DefaultApolloClient, getNewApolloCLient())
  app.config.globalProperties.$apollo = getNewApolloCLient()
})

export { apolloClient, renewApolloToken }
