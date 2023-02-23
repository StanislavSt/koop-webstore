import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import client from '../../graphql/apollo-client-storefront'
import GetProducts from '../../graphql/queries/GetProducts'
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  LanguageCode,
} from '../../graphql/types'
import { createProductGrid } from '../../utils/createProductGrid'
import { numberOfProductsToQuery, ProductWithCursor } from '../../pages'
import { Spinner } from '../common/Spinner'
import { ProductColumn } from './ProductColumn'
import mapProducts from '../../utils/mapProducts'

const ProductCard = dynamic(() => import('../index/ProductCard'), {
  ssr: false,
})

const UnfilteredProductsGrid = ({
  products: initialProducts,
}: {
  products: ProductWithCursor[]
}) => {
  const { locale } = useRouter()
  const [products, setProducts] = useState(initialProducts)

  const [
    productLengthOfLastLoadMoreBatch,
    setProductLengthOfLastLoadMoreBatch,
  ] = useState(initialProducts.length)
  const [cursor, setCursor] = useState(initialProducts.slice(-1)[0]?.cursor)
  const [showLoader, setShowLoader] = useState(false)

  // We want to reset the states, if the language has changed
  useEffect(() => {
    const resetStates = () => {
      setProducts(initialProducts)
      setProductLengthOfLastLoadMoreBatch(initialProducts.length)
      setCursor(initialProducts.slice(-1)[0]?.cursor)
    }
    resetStates()
  }, [initialProducts])

  const loadMore = async () => {
    if (!cursor) return

    setShowLoader(true)
    const { data } = await client.query<
      GetProductsQuery,
      GetProductsQueryVariables
    >({
      query: GetProducts,
      variables: {
        first: numberOfProductsToQuery,
        after: cursor,
        language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
      },
    })

    if (!data.collection?.products) return

    const productsWithCursor = await mapProducts(data.collection.products)
    setShowLoader(false)
    if (productsWithCursor.length === 0) {
      setCursor('')
      return
    }

    setProductLengthOfLastLoadMoreBatch(productsWithCursor.length)
    setProducts([...products, ...(productsWithCursor as ProductWithCursor[])])

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
      <div className="mt-10 flex h-[50px] w-full items-center justify-center">
        {showLoader ? (
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
