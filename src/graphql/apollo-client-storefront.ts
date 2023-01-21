import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { CustomInMemoryCache } from './cache'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': token ? `${token}` : '',
    },
  }
})
const storefrontClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(httpLink),
  cache: CustomInMemoryCache,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

export default storefrontClient
