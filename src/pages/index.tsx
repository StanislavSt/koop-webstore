import { GetStaticProps } from 'next'
import client from '../graphql/apollo-client'
import GetProducts from '../graphql/queries/GetProducts'
import { GetProductsQuery, GetProductsQueryVariables } from '../graphql/types'

import IndexPage from '../components/index/IndexPage'

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProducts,
    variables: { first: 15 },
  })

  return {
    props: {
      products: data.products,
    },
  }
}
