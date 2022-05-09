import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.SHOPIFY_STOREFRONT_API_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': token ? `${token}` : '',
    },
  }
})
const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
