import ArtistPage from '../../components/artist/ArtistPage'
import GetArtist from '../../graphql/queries/GetArtist'
import {
  GetCollectionsQuery,
  GetCollectionsQueryVariables,
  GetArtistQuery,
  GetArtistQueryVariables,
  LanguageCode,
} from '../../graphql/types'
import client from '../../graphql/apollo-client-storefront'
import { GetStaticPaths } from 'next/types'
import GetCollections from '../../graphql/queries/GetCollections'
import { numberOfProductsToQuery } from '..'
import { getPlaiceholder } from 'plaiceholder'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default ArtistPage

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<
    GetCollectionsQuery,
    GetCollectionsQueryVariables
  >({
    query: GetCollections,
    variables: { first: 10 },
  })

  const paths = data.collections.edges.map((edge) => ({
    params: { handle: edge.node.handle },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({
  params,
  locale = 'en',
}: {
  params: { handle: string }
  locale: 'en' | 'bg'
}) => {
  const { data } = await client.query<GetArtistQuery, GetArtistQueryVariables>({
    query: GetArtist,
    variables: {
      artistHandle: params.handle,
      numberOfProductsToQuery,
      language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
    },
  })

  const productsWithCursor =
    data.collectionByHandle &&
    (await Promise.all(
      data.collectionByHandle.products.edges.map(async (edge) => {
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
      artist: data.collectionByHandle,
      products: productsWithCursor,
    },
    revalidate: 10,
  }
}
