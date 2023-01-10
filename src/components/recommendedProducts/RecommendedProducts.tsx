import { QueryResult } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Exact, GetProductRecommendationsQuery } from '../../graphql/types'

const RecommendedProducts = ({
  products,
}: {
  products: QueryResult<
    GetProductRecommendationsQuery,
    Exact<{ productId: string }>
  >
}) => {
  return (
    <>
      <p className="font-bold tracking-wide text-[30px] leading-[27px]">...</p>
      <div className="flex gap-5">
        {products &&
          products.data?.productRecommendations?.map((product) => {
            return (
              <>
                <Link href={`/product/${product.handle}`}>
                  <div className="relative h-[220px] w-[45%] lg:h-[278px] lg:w-[221px]">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      alt={product.featuredImage?.altText || product.title}
                      src={product.featuredImage?.url}
                      className="rounded cursor-pointer"
                    ></Image>
                  </div>
                </Link>
              </>
            )
          })}
      </div>
    </>
  )
}

export default RecommendedProducts
