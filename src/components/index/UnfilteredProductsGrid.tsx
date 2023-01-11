import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import GetProducts from '../../graphql/queries/GetProducts'
import { ProductCard } from './ProductCard'
import {
  GetProductsQuery,
  GetProductsQueryVariables,
} from '../../graphql/types'
import { createProductGrid } from '../../utils/createProductGrid'
import { numberOfProductsToQuery, ProductWithCursor } from '../../pages'
import { Spinner } from '../common/Spinner'
import { ProductColumn } from './ProductColumn'
import mapProducts from '../../utils/mapProducts'

const UnfilteredProductsGrid = ({
  products: initialProducts,
}: {
  products: ProductWithCursor[]
}) => {
  const [products, setProducts] = useState(initialProducts)
  const [
    productLengthOfLastLoadMoreBatch,
    setProductLengthOfLastLoadMoreBatch,
  ] = useState(initialProducts.length)
  const [cursor, setCursor] = useState(initialProducts.slice(-1)[0]?.cursor)

  const { data, loading } = useQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >(GetProducts, {
    variables: { first: numberOfProductsToQuery, after: cursor },
  })

  const loadMore = async () => {
    if (!cursor) return
    if (!data) return

    const productsWithCursor = await mapProducts(data)

    setProductLengthOfLastLoadMoreBatch(productsWithCursor.length)
    setProducts([...products, ...productsWithCursor])

    if (productsWithCursor.length < numberOfProductsToQuery) setCursor('')
    else setCursor(productsWithCursor?.slice(-1)[0]?.cursor)
  }

  const items = createProductGrid(products, productLengthOfLastLoadMoreBatch)

  return (
    <>
      {/* Desktop view */}
      <div className="hidden gap-10 md:flex">
        {items ? (
          <>
            <ProductColumn column={items.col1} />
            <ProductColumn column={items.col2} />
            <ProductColumn column={items.col3} />
            <ProductColumn column={items.col4} />
          </>
        ) : (
          <div className="h-[80vh]"> </div>
        )}
      </div>
      {/* Mobile View */}
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
    </>
  )
}

export default UnfilteredProductsGrid
