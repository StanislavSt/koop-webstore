import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Layout from '../layout/Layout'
import { GetProductsQuery } from '../../graphql/types'
import Link from 'next/link'
import { Cart } from '../cart/CartComponent'
import CreateCheckout from '../../graphql/queries/CreateCheckout'
import storefrontClient from '../../graphql/apollo-client-storefront'

const IndexPage = ({ products }: GetProductsQuery) => {
  const { locale } = useRouter()
  async function createCheckout() {
    const variables = {
      input: {
        lineItems: [
          {
            variantId: 'gid://shopify/ProductVariant/40326411059336',
            quantity: 1,
          },
          {
            variantId: 'gid://shopify/ProductVariant/40326412435592',
            quantity: 1,
          },
        ],
      },
    }

    const { data } = await storefrontClient.mutate({
      mutation: CreateCheckout,
      variables,
    })
    const { webUrl } = data.checkoutCreate.checkout
    window.location.href = webUrl
  }
  return (
    <Layout title="Home Page">
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <Cart />
          <h2 className="sr-only">Products</h2>
          <button
            onClick={() => {
              createCheckout()
            }}
            title="Go to checkout"
          >
            Go to checkout
          </button>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.edges.map(({ node: product }) => (
              <Link href={`product/${product.handle}`} key={product.id}>
                <a className="group">
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
