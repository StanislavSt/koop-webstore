import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPlaiceholder } from 'plaiceholder'

import client from '../graphql/apollo-client-storefront'
import GetProducts from '../graphql/queries/GetProducts'
import {
  GetAnnouncementQuery,
  GetAnnouncementQueryVariables,
  GetProductsQuery,
  GetProductsQueryVariables,
  LanguageCode,
} from '../graphql/types'
import IndexPage from '../components/index/IndexPage'
import GetAnnouncement from '../graphql/queries/GetAnnouncement'

export default IndexPage

export const numberOfProductsToQuery = 15

export type ProductWithCursor = NonNullable<
  GetProductsQuery['collection']
>['products']['edges'][0]['node'] & {
  cursor: string
  blurDataUrl: string
  availableForSale: boolean
  productType: string
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const announcement = await client.query<
    GetAnnouncementQuery,
    GetAnnouncementQueryVariables
  >({
    query: GetAnnouncement,
    variables: {
      collectionId: 'gid://shopify/Collection/434676531479',
      language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
    },
  })

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

  const products =
    data.collection &&
    (await Promise.all(
      data.collection.products.edges.map(async (edge) => {
        const blurDataURL = await (
          await getPlaiceholder(edge.node.images.edges[0].node.placeholder)
        ).base64
        return {
          ...edge.node,
          cursor: edge.cursor,
          blurDataUrl: blurDataURL,
        }
      })
    ))

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products,
      announcement: announcement.data.collection,
    },
    revalidate: 10,
  }
}
