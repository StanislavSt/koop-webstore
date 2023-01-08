import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import GetProducts from '../../graphql/queries/GetProducts'
import Layout from '../layout/Layout'
import { ProductCard } from './ProductCard'
import {
  GetProductsQuery,
  GetProductsQueryVariables,
} from '../../graphql/types'
import { createProductGrid } from '../../utils/createProductGrid'
import { ProductWithCursor } from '../../pages'
import { Spinner } from '../common/Spinner'

const IndexPage = ({
  products: initialProducts,
}: {
  products: ProductWithCursor[]
}) => {
  const [products, setProducts] = useState(initialProducts)
  const [
    productLengthOfLastLoadMoreBatch,
    setProductLengthOfLastLoadMoreBatch,
  ] = useState(products.length)
  const [cursor, setCursor] = useState(initialProducts.slice(-1)[0]?.cursor)

  const { data, loading } = useQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >(GetProducts, {
    variables: { first: 15, after: cursor },
  })

  const loadMore = async () => {
    if (!cursor) return
    if (!data) return

    const productsWithCursor = await Promise.all(
      data.products.edges.map(async (edge) => {
        const blurDataURL = await fetch('/api/getBase64', {
          method: 'POST',
          body: JSON.stringify({
            url: edge.node.images.edges[0].node.placeholder,
          }),
        })

        return {
          ...edge.node,
          cursor: edge.cursor,
          blurDataUrl: await blurDataURL.json(),
        }
      })
    )

    setProductLengthOfLastLoadMoreBatch(productsWithCursor.length)
    setProducts([...products, ...productsWithCursor])

    if (productsWithCursor.length < 15) setCursor('')
    else setCursor(productsWithCursor?.slice(-1)[0]?.cursor)
  }

  const [items, setItems] = useState<ReturnType<typeof createProductGrid>>()

  useEffect(() => {
    const productGrid = createProductGrid(
      products,
      productLengthOfLastLoadMoreBatch
    )
    !loading && setItems(productGrid)
  }, [products, loading, productLengthOfLastLoadMoreBatch])

  return (
    <Layout title="Home Page">
      <div className="bg-white">
        <div className="py-10 px-3">
          <h2 className="sr-only">Products</h2>
          <div className="hidden gap-10 md:flex">
            <div className="flex flex-col">
              {items &&
                items.col1.map((product) => (
                  <div key={product.id} className="pt-5">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
            <div className="flex flex-col">
              {items &&
                items.col2.map((product) => (
                  <div key={product.id} className="pt-5">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
            <div className="flex flex-col">
              {items &&
                items.col3.map((product) => (
                  <div key={product.id} className="pt-5">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
            <div className="flex flex-col">
              {items &&
                items.col4.map((product) => (
                  <div key={product.id} className="pt-5">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center md:hidden">
            {products &&
              products.map((product) => (
                <div key={product.id} className="pt-5">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>

          {cursor && (
            <div className="flex justify-center items-center pt-10 w-full h-10 cursor-pointer text-[50px]">
              {loading ? (
                <Spinner />
              ) : (
                cursor && (
                  <span
                    onClick={() => {
                      loadMore()
                    }}
                  >
                    +
                  </span>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
