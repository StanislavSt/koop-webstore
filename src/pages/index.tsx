import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import probe, { ProbeResult } from 'probe-image-size'

import client from '../graphql/apollo-client'
import GetProducts from '../graphql/queries/GetProducts'
import { GetProductsQuery, GetProductsQueryVariables } from '../graphql/types'
import IndexPage from '../components/index/IndexPage'

export default IndexPage

export type ProductWithCoverImage =
  GetProductsQuery['products']['edges'][0]['node'] & {
    coverImage: {
      size: ProbeResult
      __typename: 'Image' | undefined
      altText: string | null | undefined
      url: string
    }
  }

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const { data } = await client.query<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProducts,
    variables: { first: 15 },
  })

  const products = await Promise.all(
    data.products.edges.map(async (edge) => {
      const imageWithSize = {
        ...edge.node.images.edges[0].node,
        size: {},
      }
      imageWithSize.size = await probe(edge.node.images.edges[0].node.url)
      return { ...edge.node, coverImage: imageWithSize }
    })
  )

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products: products,
      revalidate: 10,
    },
  }
}
