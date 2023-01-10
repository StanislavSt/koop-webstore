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
      {products &&
        products.data?.productRecommendations?.map((product) => {
          return (
            <>
              <Link href={`/product/${product.handle}`}>
                <Image
                  width="221"
                  height="278"
                  alt={product.featuredImage?.altText || product.title}
                  src={product.featuredImage?.url}
                  className="rounded cursor-pointer"
                ></Image>
              </Link>
            </>
          )
        })}
    </>
  )
}

export default RecommendedProducts
