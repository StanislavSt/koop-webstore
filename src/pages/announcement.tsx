import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next/types'
import AnnouncementPage from '../components/announcement/AnnouncementPage'
import client from '../graphql/apollo-client-storefront'
import GetAnnouncement from '../graphql/queries/GetAnnouncement'
import {
  GetAnnouncementQuery,
  GetAnnouncementQueryVariables,
  LanguageCode,
} from '../graphql/types'
import { getPlaiceholder } from 'plaiceholder'

export default AnnouncementPage

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const { data } = await client.query<
    GetAnnouncementQuery,
    GetAnnouncementQueryVariables
  >({
    query: GetAnnouncement,
    variables: {
      collectionId: 'gid://shopify/Collection/434676531479',
      language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
    },
  })
  const productsWithCursor =
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
      announcement: data.collection,
      products: productsWithCursor,
    },
    revalidate: 10,
  }
}
