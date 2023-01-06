import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import client from '../graphql/apollo-client-storefront'
import GetProducts from '../graphql/queries/GetProducts'
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  Product,
} from '../graphql/types'
import IndexPage from '../components/index/IndexPage'

export default IndexPage

export interface ProductWithCursor extends Product {
  cursor: string
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const { data } = await client.query<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProducts,
    variables: { first: 15 },
  })

  const products = data.products.edges.map((edge) => ({
    ...edge.node,
    cursor: edge.cursor,
  }))

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products: products,
      revalidate: 10,
    },
  }
}
