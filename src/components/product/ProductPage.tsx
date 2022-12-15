/* eslint-disable @next/next/no-img-element */
import {
  Collection,
  Metafield,
  Product,
  ProductVariant,
  ProductVariantEdge,
} from '../../graphql/types'
import Layout from '../layout/Layout'
import { CartItem, cartItemsVar } from '../../graphql/cache'
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
  const [price, setPrice] = useState(product.variants.edges[0].node.price)

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
    if (variant.length == 1) {
      setVariant(variant[0]?.node)
      setVariantId(variant && variant[0] && variant[0].node.id)
      setPrice(variant[0].node.price)
    } else {
      setVariant(product.variants.edges[0].node)
      setVariantId(product.variants.edges[0].node.id)
      setPrice(product.variants.edges[0].node.price)
    }
  }

  // const isOptionAvailable = (option: ProductOption, product: Product) => {
  //   // if variants with specific option are !availableForSale
  // }

  const CartItemsVar = useReactiveVar(cartItemsVar)

  const updateCartItemQuantity = (cartItem: CartItem) => {
    const currentQuantity = cartItem.quantity

    const filteredCartItems = CartItemsVar.filter(
      (x) => x.variantId !== cartItem.variantId
    )
    return (
      selectedVariantId &&
      cartItemsVar([
        ...filteredCartItems,
        {
          variantId: selectedVariantId,
          quantity: currentQuantity + 1,
          price: selectedVariant?.price,
          title: product?.title,
          selectedOptions: selectedOptions,
        },
      ])
    )
  }

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
            <div className="flex flex-col pt-6">
              {product &&
                product.options.length > 1 &&
                product.options.map((option) => (
                  <div key={option.id}>
                    <span className="text-cyan-600">{option.name}</span>
                    <ul className="flex">
                      {option.values.map((value) => (
                        <li key={value} className="pr-2">
                          <Button
                            key={value + 'but'}
                            disabled={
                              !!product.variants.edges.find((variant) => {
                                variant.node.displayName.includes(value) &&
                                  variant.node.availableForSale === false
                              })
                            }
                            className="bg-white text-black border border-black w-32 focus:bg-black focus:text-white"
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
            <h1>{price}</h1>

            <Button
              className="bg-cyan-500 w-32"
              onClick={() => {
                if (!product || !selectedVariantId) return

                const cartItemExists = CartItemsVar.find(
                  (cartItem) => cartItem.variantId === selectedVariantId
                )
                cartItemExists
                  ? updateCartItemQuantity(cartItemExists)
                  : cartItemsVar([
                      ...CartItemsVar,
                      {
                        variantId: selectedVariantId,
                        quantity: 1,
                        price: selectedVariant?.price,
                        title: product?.title,
                        selectedOptions: selectedOptions,
                      },
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
