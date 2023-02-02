import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { QueryResult } from '@apollo/client'

import { Exact, GetProductRecommendationsQuery } from '../../graphql/types'
import { shuffle } from '../../utils/shuffleArray'

type RecommendedProduct = NonNullable<
  GetProductRecommendationsQuery['productRecommendations']
>[number]

const RecommendedProducts = ({
  products,
}: {
  products: QueryResult<
    GetProductRecommendationsQuery,
    Exact<{ productId: string }>
  >
}) => {
  const recommendedProducts = products.data?.productRecommendations

  const shuffledRecommendedProducts = useMemo(() => {
    if (!recommendedProducts) return

    return shuffle<RecommendedProduct>(recommendedProducts)
  }, [recommendedProducts])

  return (
    <>
      <p className="font-bold tracking-wide text-[30px] leading-[27px]">...</p>
      <div className="flex gap-5">
        <>
          {shuffledRecommendedProducts &&
            shuffledRecommendedProducts.slice(0, 2).map((product) => (
              <Link key={product.id} href={`/product/${product.handle}`}>
                <div className="relative h-[260px] w-[55%] lg:h-[278px] lg:w-[221px]">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    alt={product.featuredImage?.altText || product.title}
                    src={product.featuredImage?.url}
                    className="rounded cursor-pointer"
                  ></Image>
                </div>
              </Link>
            ))}
        </>
      </div>
    </>
  )
}

export default RecommendedProducts
