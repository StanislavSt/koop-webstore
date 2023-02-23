import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useQuery, useReactiveVar } from '@apollo/client/react/hooks'
import dynamic from 'next/dynamic'

import client from '../../graphql/apollo-client-storefront'
import { filtersVar } from '../../graphql/cache'
import GetProductsByTag from '../../graphql/queries/GetProductsByTag'
import {
  GetProductsByTagQuery,
  GetProductsByTagQueryVariables,
  LanguageCode,
} from '../../graphql/types'
import { numberOfProductsToQuery, ProductWithCursor } from '../../pages'
import { createProductGrid } from '../../utils/createProductGrid'
import mapProducts from '../../utils/mapProducts'
import { Spinner } from '../common/Spinner'
import { ProductColumn } from './ProductColumn'

const ProductCard = dynamic(() => import('../index/ProductCard'), {
  ssr: false,
})

const FilteredProductsGrid = () => {
  const { t } = useTranslation()
  const filters = useReactiveVar(filtersVar)

  const { locale } = useRouter()
  const [products, setProducts] = useState<ProductWithCursor[]>([])
  const [cursor, setCursor] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setCursor('')
  }, [filters])

  const { loading, data } = useQuery<
    GetProductsByTagQuery,
    GetProductsByTagQueryVariables
  >(GetProductsByTag, {
    variables: {
      first: numberOfProductsToQuery,
      productType: filters.format,
      tag: filters.technique || undefined,
      language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      if (!data.collection) return
      const mappedProducts = await mapProducts(data.collection?.products)
      setProducts(mappedProducts as ProductWithCursor[])
      mappedProducts.length >= numberOfProductsToQuery &&
        setCursor(mappedProducts.slice(-1)[0]?.cursor)
    },
  })

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
        after: cursor,
        productType: filters.format,
        tag: filters.technique || undefined,
        language: locale === 'bg' ? LanguageCode.Bg : LanguageCode.En,
      },
    })

    if (!data.collection) return
    const productsWithCursor = await mapProducts(data.collection?.products)
    setShowLoader(false)

    setProducts([...products, ...(productsWithCursor as ProductWithCursor[])])

    productsWithCursor.length < numberOfProductsToQuery
      ? setCursor('')
      : setCursor(productsWithCursor?.slice(-1)[0]?.cursor)
  }
  if (
    products.length === 0 &&
    !loading &&
    data?.collection?.products.edges.length === 0
  )
    return (
      <span className="text-[17px]">
        {t('No products were found for this filter')}.
      </span>
    )

  return (
    <>
      {/* Desktop view */}
      <div className="hidden w-full gap-10 md:flex">
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
        {showLoader || loading ? (
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
