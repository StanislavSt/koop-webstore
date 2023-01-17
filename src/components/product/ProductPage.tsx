import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useQuery, useReactiveVar } from '@apollo/client'
import Link from 'next/link'
import { Maybe } from 'graphql/jsutils/Maybe'
import {
  Collection,
  GetProductRecommendationsQuery,
  GetProductRecommendationsQueryVariables,
  Metafield,
  Product,
  ProductVariant,
  ProductVariantEdge,
} from '../../graphql/types'
import Layout from '../layout/Layout'
import { CartItem, cartItemsVar } from '../../graphql/cache'
import { Button } from '../common'
import { getArtist } from '../../utils/getArtist'
import { getMaterial } from '../../utils/getMaterial'
import GetProductRecommendations from '../../graphql/queries/GetProductRecommendations'
import RecommendedProducts from '../recommendedProducts/RecommendedProducts'
import ProductOptions from '../productOptions/ProductOptions'

const ProductPage = ({ product }: { product: Product }) => {
  const selectedInit: { [key: string]: string } = {}
  const [selectedOptions, setSelected] = useState(selectedInit)
  const [selectedVariantId, setVariantId] = useState<string | null | undefined>(
    null
  )
  const [selectedVariant, setVariant] = useState<
    ProductVariant | null | undefined
  >(null)
  const [price, setPrice] = useState(
    product.variants.edges[0].node.price.amount
  )

  // TODO get rid of useEffect
  useEffect(() => {
    chooseVariant()
  })

  const artist: Collection | undefined = getArtist(product)
  const material: Maybe<Metafield> | null = getMaterial(product)

  /**
   * Getting recommended products for this item using Storefront API
   */
  const recommendedProducts = useQuery<
    GetProductRecommendationsQuery,
    GetProductRecommendationsQueryVariables
  >(GetProductRecommendations, {
    variables: { productId: product?.id },
  })

  /**
   *
   * @param variant
   * @returns the product variant, which matches the options selected by the user
   */
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
      setPrice(variant[0].node.price.amount)
    } else {
      setVariant(product.variants.edges[0].node)
      setVariantId(product.variants.edges[0].node.id)
      setPrice(product.variants.edges[0].node.price.amount)
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
          price: selectedVariant?.price.amount,
          title: product?.title,
          selectedOptions: selectedOptions,
        },
      ])
    )
  }

  const addToCart = () => {
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
            price: selectedVariant?.price.amount,
            title: product?.title,
            selectedOptions: selectedOptions,
          },
        ])
  }

  return (
    <Layout title="Product page">
      <div className="bg-white lg:px-[12px]">
        <div className="gap-y-10 md:grid md:grid-cols-1 md:gap-x-6 lg:grid-cols-3 lg:px-0 xl:grid-cols-3 xl:gap-x-8 px-[9px]">
          <div className="flex flex-col lg:hidden">
            <h1 className="uppercase text-[24px]">{product?.title}</h1>
            {artist && (
              <div>
                <Link href={`/artist/${artist?.handle}`}>
                  <Button className="uppercase bg-black text-[24px] h-[30px]">
                    {artist?.title}
                  </Button>
                </Link>
              </div>
            )}
            <ProductOptions
              product={product}
              setSelectedOptions={setSelected}
            />
            <h1 className="text-[24px]">{price}</h1>

            <Button
              className="w-32 h-20px bg-[#1E90FF] text-[16px] uppercase"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
            <hr className="h-px bg-black border-0 dark:bg-gray-700 my-[15px]" />
          </div>

          <div className="flex flex-col col-span-2 items-center lg:gap-3 lg:py-5 gap-[18px] pb-[20px]">
            {product &&
              product?.images.edges.map((imageEdge) => (
                <Image
                  key={imageEdge.node.id}
                  className="py-5 px-5 rounded"
                  src={imageEdge.node.url}
                  alt={imageEdge.node.altText || ''}
                  height={imageEdge.node.height ?? 0}
                  width={imageEdge.node.width ?? 0}
                />
              ))}
          </div>

          <div className="pb-2">
            <div className="hidden lg:block">
              <h1 className="pt-5 uppercase text-[24px]">{product?.title}</h1>
              {artist && (
                <div>
                  <Link href={`/artist/${artist?.handle}`}>
                    <Button className="uppercase bg-black text-[24px] h-[30px]">
                      {artist?.title}
                    </Button>
                  </Link>
                </div>
              )}
              <ProductOptions
                product={product}
                setSelectedOptions={setSelected}
              />
              <h1 className="text-[24px]">{price}</h1>

              <Button
                className="w-32 h-20px bg-[#1E90FF] text-[16px] uppercase"
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </div>

            <hr className="h-px bg-black border-0 dark:bg-gray-700 my-[10px] lg:my-[20px]" />
            {material && (
              <>
                <div>
                  <p>{material.value}</p>
                </div>
                <hr className="h-px bg-black border-0 dark:bg-gray-700 my-[10px]" />
              </>
            )}
            {product && (
              <div
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}
            <hr className="h-px bg-black border-0 dark:bg-gray-700 mt-[20px]" />
            {recommendedProducts && (
              <RecommendedProducts
                products={recommendedProducts}
              ></RecommendedProducts>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default ProductPage
