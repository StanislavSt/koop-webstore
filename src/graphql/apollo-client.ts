import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
  return {
    headers: {
      ...headers,
      'X-Shopify-Access-Token': token ? `${token}` : '',
    },
  }
})
const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
