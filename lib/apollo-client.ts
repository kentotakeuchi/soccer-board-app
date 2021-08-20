import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({ uri: '/api/graphql', fetch: fetch as any }),
  cache: new InMemoryCache()
})

export { client }
