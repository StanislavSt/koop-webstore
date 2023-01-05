import ProductPage from '../../components/product/ProductPage'
import GetProduct from '../../graphql/queries/GetProduct'
import {
  GetProductQuery,
  GetProductQueryVariables,
  GetProductHandlesQuery,
  GetProductHandlesQueryVariables,
} from '../../graphql/types'
import client from '../../graphql/apollo-client'
import { GetStaticPaths } from 'next/types'
import GetProductHandles from '../../graphql/queries/GetProductHandles'

export default ProductPage

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<
    GetProductHandlesQuery,
    GetProductHandlesQueryVariables
  >({
    query: GetProductHandles,
    variables: { first: 100 },
  })
  const paths = data.products.edges.map((edge) => ({
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
  const { data } = await client.query<
    GetProductQuery,
    GetProductQueryVariables
  >({
    query: GetProduct,
    variables: { productHandle: params.handle },
  })

  return {
    props: {
      product: data.productByHandle,
    },
    revalidate: 10,
  }
}
