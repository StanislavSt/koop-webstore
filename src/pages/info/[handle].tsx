import { GetStaticPaths } from 'next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoPage from '../../components/info/InfoPage'
import client from '../../graphql/apollo-client-storefront'
import GetArtists from '../../graphql/queries/GetArtists'
import GetPage from '../../graphql/queries/GetPage'
import {
  GetArtistsQuery,
  GetArtistsQueryVariables,
  GetPageQuery,
  GetPageQueryVariables,
  LanguageCode,
} from '../../graphql/types'

export default InfoPage

export const getStaticPaths: GetStaticPaths = async () => {
  const handles = ['how-to-order']

  const paths = handles.map((handle) => ({
    params: { handle },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: { handle: string }
  locale: 'bg' | 'en'
}) => {
  const page = await client.query<GetPageQuery, GetPageQueryVariables>({
    query: GetPage,
    variables: {
      handle: params.handle,
      language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
    },
  })

  const collections = await client.query<
    GetArtistsQuery,
    GetArtistsQueryVariables
  >({
    query: GetArtists,
    variables: {
      first: 100,
      language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
    },
  })

  const artists = collections.data.collections.edges.filter((edge) =>
    edge.node.metafields.find(
      (metafield) => metafield?.key === 'artist' && metafield?.value === 'true'
    )
  )

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      page: page.data.page,
      artists: artists,
    },
    revalidate: 10,
  }
}
