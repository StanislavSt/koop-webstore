/* eslint-disable @next/next/no-img-element */
import { Collection, CollectionEdge, Product, ProductOption, ProductVariantEdge } from '../../graphql/types'
import Layout from '../layout/Layout'
import { cartItemsVar } from '../../graphql/cache'
import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Cart } from '../cart/CartComponent'
import { Button } from '../common'
import Link from 'next/link'
import { getArtist } from '../../utils/getArtist'
const ProductPage = ({ product }: { product: Product }) => {
  const selectedInit: { [key: string]: string } = {}
  const [selectedOptions, setSelected] = useState(selectedInit)
  const [selectedVariant, setVariant] = useState<string | null | undefined>(
    null
  )
  useEffect(() => {
    chooseVariant()
  })
  
  const artist: Collection | undefined = getArtist(product.collections).node

  const compare = (variant: ProductVariantEdge) => {
    if (!product) return
    const matching: { [key: string]: boolean } = {}
    Object.keys(selectedOptions).forEach((prop) => {
      variant.node.selectedOptions.forEach(
        (option: { [key: string]: string }) => {
          if (option.name == prop)
            matching[prop] = option.value == selectedOptions[prop]
        }
      )
    })

    return (
      Object.values(matching).length === Object.keys(product.options).length &&
      Object.values(matching).every((v) => v === true)
    )
  }

  const chooseVariant = () => {
    const variant = product?.variants.edges.filter((variant) => {
      return compare(variant)
    })
    setVariant(variant && variant[0] && variant[0].node.id)
  }

  const isOptionAvailable = (option: ProductOption, product: Product) => {
    // if variants with specific option are !availableForSale
  }

  const CartItemsVar = useReactiveVar(cartItemsVar)
  const firstImage = product?.images.edges[0].node

  return (
    <Layout title="Product page">
      <div className="bg-white">
        <div className="max-w-xs mx-auto py-5 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-15"></div>
        <div className="px-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
          <div className="py-5">
            {product &&
              product?.images.edges.map(imageEdge => (
                <img
                  key={imageEdge.node?.id}
                  className="px-5 py-5"
                  src={imageEdge.node?.url}
                  alt={imageEdge.node?.altText || ''}
                />
              )
              )}
          </div>
          <div >
            <h1 className="uppercase pt-10">{product?.title}</h1>
            <div>
              <Link href={`/artist/${artist?.handle}`}>
                <Button >
                  {artist?.title}
                </Button>
              </Link>
            </div>
            <Button
              onClick={() => {
                if (!product || !selectedVariant) return
                cartItemsVar([
                  ...CartItemsVar,
                  { variantId: selectedVariant, quantity: 1 },
                ])
              }}
            >
              Add to Cart
            </Button>
            <div className="flex pt-6">
              {product &&
                product.options.map((option) => (
                  <div key={option.id}>
                    <ul className='flex-1 w-60'>
                      {option.values.map((value) => (
                        <li key={value}>
                          <Button
                            key={value + 1}
                            disabled={true}
                            className="hover:bg-sky-700 "
                            onClick={() => {
                              setSelected({
                                ...selectedOptions,
                                [option.name]: value,
                              })
                            }}
                          >
                            {value}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default ProductPage
