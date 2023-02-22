import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider'

import client from '../graphql/apollo-client-storefront'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default appWithTranslation(MyApp)
