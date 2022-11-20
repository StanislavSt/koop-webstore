import ArtistPage from '../../components/artist/ArtistPage'
import GetArtist from '../../graphql/queries/GetArtist'
import {
  GetCollectionsQuery,
  GetCollectionsQueryVariables,
  GetArtistQuery,
  GetArtistQueryVariables,
} from '../../graphql/types'
import client from '../../graphql/apollo-client'
import { GetStaticPaths } from 'next/types'
import GetCollections from '../../graphql/queries/GetCollections'

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
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { handle: string }
}) => {
  const { data } = await client.query<GetArtistQuery, GetArtistQueryVariables>({
    query: GetArtist,
    variables: { artistHandle: params.handle },
  })

  return {
    props: {
      artist: data.collectionByHandle,
    },
  }
}
