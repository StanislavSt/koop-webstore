import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPlaiceholder } from 'plaiceholder'

import client from '../graphql/apollo-client-storefront'
import GetProducts from '../graphql/queries/GetProducts'
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  LanguageCode,
} from '../graphql/types'
import IndexPage from '../components/index/IndexPage'

export default IndexPage

export const numberOfProductsToQuery = 20

export type ProductWithCursor =
  GetProductsQuery['products']['edges'][0]['node'] & {
    cursor: string
    blurDataUrl: string
  }

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const { data } = await client.query<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProducts,
    variables: {
      first: numberOfProductsToQuery,
      language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
    },
  })

  const products = await Promise.all(
    data.products.edges.map(async (edge) => {
      const blurDataURL = await (
        await getPlaiceholder(edge.node.images.edges[0].node.placeholder)
      ).base64
      return {
        ...edge.node,
        cursor: edge.cursor,
        blurDataUrl: blurDataURL,
      }
    })
  )

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products: products,
      data: data,
    },
    revalidate: 10,
  }
}
