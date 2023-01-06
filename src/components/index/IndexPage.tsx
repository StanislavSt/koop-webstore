import React, { useState } from 'react'

import GetProducts from '../../graphql/queries/GetProducts'
import { ProductWithCoverImage } from '../../pages'
import Layout from '../layout/Layout'
import { ProductCard } from './ProductCard'
import client from '../../graphql/apollo-client-storefront'
import { ProductEdge } from '../../graphql/types'

const IndexPage = ({
  products: initialProducts,
}: {
  products: ProductWithCoverImage[]
}) => {
  const [products, setProducts] = useState(initialProducts)
  const [cursor, setCursor] = useState(initialProducts.slice(-1)[0].cursor)

  const loadMore = async () => {
    if (!cursor) return
    const { data } = await client.query({
      query: GetProducts,
      variables: { first: 10, after: cursor },
    })

    const x = data.products.edges.map((edge: ProductEdge) => {
      const imageWithSize = {
        ...edge.node.images.edges[0].node,
        size: {},
      }
      imageWithSize.size = {
        width: edge.node.images.edges[0].node.width,
        height: edge.node.images.edges[0].node.height,
      }
      return { ...edge.node, coverImage: imageWithSize, cursor: edge.cursor }
    })

    setProducts([...products, ...x])

    if (x.length < 10) setCursor('')
    else setCursor(x?.slice(-1)[0]?.cursor)
  }

  return (
    <Layout title="Home Page">
      <div className="bg-white">
        <div className="py-10 px-3">
          <h2 className="sr-only">Products</h2>
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4">
            {products &&
              products.map((product) => (
                <div
                  key={product.id}
                  className="pt-5 break-inside-avoid-column"
                >
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
          {cursor && (
            <div
              className="w-full text-center cursor-pointer text-[50px]"
              onClick={() => {
                loadMore()
              }}
            >
              +
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
