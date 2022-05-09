import { GetStaticProps } from 'next'
import client from '../graphql/apollo-client'
import Products from '../graphql/queries/Products'
import { ProductsQuery } from '../graphql/types'

import IndexPage from '../components/index/IndexPage'

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<ProductsQuery>({
    query: Products,
  })

  return {
    props: {
      products: data.products,
    },
  }
}
