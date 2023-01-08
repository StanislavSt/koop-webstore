import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import GetProducts from '../../graphql/queries/GetProducts'
import Layout from '../layout/Layout'
import { ProductCard } from './ProductCard'
import {
  GetProductsQuery,
  GetProductsQueryVariables,
} from '../../graphql/types'
import {
  createProductGrid,
  ProductWithAnimation,
} from '../../utils/createProductGrid'
import { ProductWithCursor } from '../../pages'
import { Spinner } from '../common/Spinner'

const ProductColumn = ({ column }: { column: ProductWithAnimation[] }) => (
  <div className="flex flex-col">
    {column.map((product) => (
      <div key={product.id} className="pt-5">
        <ProductCard product={product} />
      </div>
    ))}
  </div>
)

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
            {items && (
              <>
                {' '}
                <ProductColumn column={items.col1} />
                <ProductColumn column={items.col2} />
                <ProductColumn column={items.col3} />
                <ProductColumn column={items.col4} />
              </>
            )}
          </div>
          <div className="flex flex-col items-center md:hidden">
            {products &&
              products.map((product) => (
                <div key={product.id} className="pt-5">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
          <div className="flex justify-center items-center mt-10 w-full h-[50px]">
            {loading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              cursor && (
                <span
                  className="cursor-pointer text-[50px]"
                  onClick={() => {
                    loadMore()
                  }}
                >
                  +
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
