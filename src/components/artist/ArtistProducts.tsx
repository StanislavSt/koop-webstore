import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react/hooks/useQuery'
import dynamic from 'next/dynamic'

import GetArtist from '../../graphql/queries/GetArtist'
import { GetArtistQuery, GetArtistQueryVariables } from '../../graphql/types'
import { numberOfProductsToQuery, ProductWithCursor } from '../../pages'
import { createProductGrid } from '../../utils/createProductGrid'
import mapProducts from '../../utils/mapProducts'
import { Spinner } from '../common/Spinner'
import { ProductColumn } from '../index/ProductColumn'

const ProductCard = dynamic(() => import('../index/ProductCard'), {
  ssr: false,
})

const ArtistProducts = ({
  products: initialProducts,
  artistHandle,
}: {
  products: ProductWithCursor[]
  artistHandle: string
}) => {
  const [products, setProducts] = useState(initialProducts)
  const [cursor, setCursor] = useState(
    initialProducts.length < numberOfProductsToQuery
      ? ''
      : initialProducts.slice(-1)[0]?.cursor
  )
  const [
    productLengthOfLastLoadMoreBatch,
    setProductLengthOfLastLoadMoreBatch,
  ] = useState(initialProducts.length)

  // We want to reset the states, if the language has changed
  useEffect(() => {
    const resetStates = () => {
      setProducts(initialProducts)
      setProductLengthOfLastLoadMoreBatch(initialProducts.length)
      setCursor(
        initialProducts.length < numberOfProductsToQuery
          ? ''
          : initialProducts.slice(-1)[0]?.cursor
      )
    }
    resetStates()
  }, [initialProducts])

  const { data, loading } = useQuery<GetArtistQuery, GetArtistQueryVariables>(
    GetArtist,
    {
      variables: {
        artistHandle,
        numberOfProductsToQuery,
        after: cursor,
      },
      fetchPolicy: 'cache-and-network',
    }
  )

  const loadMore = async () => {
    if (!cursor) return
    if (!data) return

    const productsWithCursor = data.collectionByHandle?.products
      ? await mapProducts(data.collectionByHandle?.products)
      : []

    if (productsWithCursor.length > 0) {
      setProductLengthOfLastLoadMoreBatch(productsWithCursor.length)
      setProducts([...products, ...(productsWithCursor as ProductWithCursor[])])
    }

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
      <div className="flex flex-col items-center p-3 md:hidden">
        {products &&
          products.map((product) => (
            <div key={product.id} className="pt-5">
              <ProductCard product={product} />
            </div>
          ))}
      </div>
      <div className="mt-10 flex h-[50px] w-full items-center justify-center">
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

export default ArtistProducts
