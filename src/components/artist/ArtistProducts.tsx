import { useQuery } from '@apollo/client'
import { useState } from 'react'
import GetArtist from '../../graphql/queries/GetArtist'
import { GetArtistQuery, GetArtistQueryVariables } from '../../graphql/types'
import { numberOfProductsToQuery, ProductWithCursor } from '../../pages'
import { createProductGrid } from '../../utils/createProductGrid'
import mapProducts from '../../utils/mapProducts'
import { Spinner } from '../common/Spinner'
import { ProductCard } from '../index/ProductCard'
import { ProductColumn } from '../index/ProductColumn'

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

  const { data, loading } = useQuery<GetArtistQuery, GetArtistQueryVariables>(
    GetArtist,
    {
      variables: {
        artistHandle,
        numberOfProductsToQuery,
        after: cursor,
      },
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
      setProducts([...products, ...productsWithCursor])
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

export default ArtistProducts
