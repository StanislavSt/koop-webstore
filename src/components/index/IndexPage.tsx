import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Layout from '../layout/Layout'
import { ProductsQuery } from '../../graphql/types'

const IndexPage = ({ products }: ProductsQuery) => {
  const { locale } = useRouter()

  return (
    <Layout title="Home Page">
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.edges.map(({ node: product }) => (
              <a key={product.id} className="group">
                <div>
                  <Image
                    className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 group-hover:opacity-75"
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText ?? ''}
                    width={250}
                    height={350}
                    objectFit="cover"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  {locale === 'bg'
                    ? product.bg[0] && product.bg[0].value
                    : product.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.priceRangeV2.minVariantPrice.amount}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
