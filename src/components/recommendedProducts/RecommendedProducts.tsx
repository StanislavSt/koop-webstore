import React, { useMemo } from 'react'

import {
  GetProductRecommendationsQuery,
  GetProductsByTagQueryResult,
} from '../../graphql/types'
import { shuffle } from '../../utils/shuffleArray'
import { ProductCard } from '../index/ProductCard'

type RecommendedProduct = NonNullable<
  GetProductRecommendationsQuery['productRecommendations']
>[number]

const RecommendedProducts = ({
  products,
  currentProductId,
}: {
  products: GetProductsByTagQueryResult['data']
  currentProductId: string
}) => {
  const recommendedProducts = products?.collection?.products.edges
    .map((edge) => edge.node)
    .filter(
      (product) =>
        product.id !== currentProductId && product.availableForSale === true
    )

  const shuffledRecommendedProducts = useMemo(() => {
    if (!recommendedProducts) return

    return shuffle<RecommendedProduct>(recommendedProducts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <p className="text-[30px] font-bold leading-[27px] tracking-wide">...</p>
      <div className="flex gap-5">
        <>
          {shuffledRecommendedProducts &&
            shuffledRecommendedProducts.slice(0, 2).map((product) => (
              <ProductCard
                key={product.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                product={product as any}
                isRecommendedProduct={true}
              />
            ))}
        </>
      </div>
    </>
  )
}

export default RecommendedProducts
