import ProductPage from '../../components/product/ProductPage'
import GetProducts from '../../graphql/queries/GetProducts'
import GetProduct from '../../graphql/queries/GetProduct'
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  GetProductQuery,
  GetProductQueryVariables,
} from '../../graphql/types'
import client from '../../graphql/apollo-client'
import { GetStaticPaths } from 'next/types'

export default ProductPage

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProducts,
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
