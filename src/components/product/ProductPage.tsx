/* eslint-disable @next/next/no-img-element */
import {
  Collection,
  Metafield,
  Product,
  ProductVariant,
  ProductVariantEdge,
} from '../../graphql/types'
import Layout from '../layout/Layout'
import { cartItemsVar } from '../../graphql/cache'
import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Button } from '../common'
import Link from 'next/link'
import { getArtist } from '../../utils/getArtist'
import { getMaterial } from '../../utils/getMaterial'
const ProductPage = ({ product }: { product: Product }) => {
  const selectedInit: { [key: string]: string } = {}
  const [selectedOptions, setSelected] = useState(selectedInit)
  const [selectedVariantId, setVariantId] = useState<string | null | undefined>(
    null
  )
  const [selectedVariant, setVariant] = useState<
    ProductVariant | null | undefined
  >(null)

  useEffect(() => {
    chooseVariant()
  })

  const artist: Collection | undefined = getArtist(product.collections)?.node
  const material: Metafield | undefined = getMaterial(product)

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
    if (variant) {
      setVariant(variant[0]?.node)
      setVariantId(variant && variant[0] && variant[0].node.id)
    }
  }

  // const isOptionAvailable = (option: ProductOption, product: Product) => {
  //   // if variants with specific option are !availableForSale
  // }

  const CartItemsVar = useReactiveVar(cartItemsVar)

  return (
    <Layout title="Product page">
      <div className="bg-white">
        <div className="max-w-xs mx-auto py-5 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-15"></div>
        <div className="px-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
          <div className="py-5">
            {product &&
              product?.images.edges.map((imageEdge) => (
                <img
                  key={imageEdge.node?.id}
                  className="px-5 py-5"
                  src={imageEdge.node?.url}
                  alt={imageEdge.node?.altText || ''}
                />
              ))}
          </div>
          <div className="pb-2">
            <h1 className="uppercase pt-10">{product?.title}</h1>
            {artist && (
              <div>
                <Link href={`/artist/${artist?.handle}`}>
                  <Button>{artist?.title}</Button>
                </Link>
              </div>
            )}
            {material && (
              <div>
                <p className="text-sm">{material.value}</p>
              </div>
            )}
            <div className="flex pt-6">
              {product &&
                product.options.map((option) => (
                  <div key={option.id}>
                    <ul className="flex-1 w-60">
                      {option.values.map((value) => (
                        <li key={value}>
                          <Button
                            key={value + 'but'}
                            disabled={true}
                            className="hover:bg-cyan-500 w-32"
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
            {selectedVariant ? (
              <h1>{selectedVariant.price}</h1>
            ) : (
              <h1>{product.priceRangeV2.minVariantPrice.amount}</h1>
            )}
            <Button
              className="bg-cyan-500 w-32"
              onClick={() => {
                if (!product || !selectedVariantId) return
                cartItemsVar([
                  ...CartItemsVar,
                  { variantId: selectedVariantId, quantity: 1 },
                ])
              }}
            >
              Add to Cart
            </Button>
            <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default ProductPage
