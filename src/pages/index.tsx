import { GetStaticProps } from 'next'
import client from '../graphql/apollo-client'
import Products from '../graphql/queries/Products'
import { ProductsQuery } from '../graphql/types'

// import {
//   createPreviewClient,
//   // usePreviewSubscription,
//   // PortableText,
// } from '../../lib/sanity'

// import { groq } from 'next-sanity'

import IndexPage from '../components/index/IndexPage'

export default IndexPage

// const query = groq`
// *[_type == "product"]
// `

export const getStaticProps: GetStaticProps = async () =>
  // {
  //   // params,
  //   // preview = false,
  // }
  {
    const { data } = await client.query<ProductsQuery>({
      query: Products,
    })

    //
    // const post = await createPreviewClient(preview).fetch(query)
    //

    return {
      props: {
        products: data.products,
      },
    }
  }
