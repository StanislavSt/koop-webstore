import { useQuery, useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'

import client from '../../graphql/apollo-client-storefront'
import { filtersVar } from '../../graphql/cache'
import GetProductsByTag from '../../graphql/queries/GetProductsByTag'
import {
  GetProductsByTagQuery,
  GetProductsByTagQueryVariables,
} from '../../graphql/types'
import { numberOfProductsToQuery, ProductWithCursor } from '../../pages'
import { createProductGrid } from '../../utils/createProductGrid'
import { formatProductsQueryByFilters } from '../../utils/formatProductsQueryByFilters'
import mapProducts from '../../utils/mapProducts'
import { Spinner } from '../common/Spinner'
import { ProductCard } from './ProductCard'
import { ProductColumn } from './ProductColumn'

const FilteredProductsGrid = () => {
  const filters = useReactiveVar(filtersVar)

  const [products, setProducts] = useState<ProductWithCursor[]>([])
  const [cursor, setCursor] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const queryTag = formatProductsQueryByFilters(filters)

  useEffect(() => {
    setCursor('')
  }, [filters])

  useQuery<GetProductsByTagQuery, GetProductsByTagQueryVariables>(
    GetProductsByTag,
    {
      variables: {
        first: numberOfProductsToQuery,
        query: queryTag,
      },
      onCompleted: async (data) => {
        const mappedProducts = await mapProducts(data.products)
        setProducts(mappedProducts)
        mappedProducts.length >= numberOfProductsToQuery &&
          setCursor(mappedProducts.slice(-1)[0]?.cursor)
      },
    }
  )

  const items = createProductGrid(products, products.length)

  const loadMore = async () => {
    if (!cursor) return

    setShowLoader(true)
    const { data } = await client.query<
      GetProductsByTagQuery,
      GetProductsByTagQueryVariables
    >({
      query: GetProductsByTag,
      variables: {
        first: numberOfProductsToQuery,
        query: queryTag,
        after: cursor,
      },
    })

    const productsWithCursor = await mapProducts(data.products)
    setShowLoader(false)

    setProducts([...products, ...productsWithCursor])

    productsWithCursor.length < numberOfProductsToQuery
      ? setCursor('')
      : setCursor(productsWithCursor?.slice(-1)[0]?.cursor)
  }

  return (
    <>
      {/* Desktop view */}
      <div className="hidden gap-10 w-full md:flex">
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

export default FilteredProductsGrid
