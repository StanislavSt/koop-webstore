import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useQuery, useReactiveVar } from '@apollo/client/react/hooks'

import {
  GetProductsByTagQuery,
  GetProductsByTagQueryVariables,
  ImageEdge,
  Product,
  ProductVariant,
  ProductVariantEdge,
} from '../../graphql/types'
import Layout from '../layout/Layout'
import { CartItem, cartItemsVar } from '../../graphql/cache'
import { Button } from '../common'
import { getArtists } from '../../utils/getArtist'
import RecommendedProducts from '../recommendedProducts/RecommendedProducts'
import ProductOptions from '../productOptions/ProductOptions'
import GetProductsByTag from '../../graphql/queries/GetProductsByTag'
import { calculateImageHeight } from '../../utils/calculateImageHeight'

interface IImage extends ImageEdge {
  blurDataUrl: string
}

type ProductWithBlurUrl = Product & {
  images: IImage[]
}

const ProductPage = ({ product }: { product: ProductWithBlurUrl }) => {
  const { t, i18n } = useTranslation()

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

  const artists = getArtists(product)

  /**
   * Getting recommended products for this item using Storefront API
   */
  const recommendedProducts = useQuery<
    GetProductsByTagQuery,
    GetProductsByTagQueryVariables
  >(GetProductsByTag, {
    variables: {
      first: 25,
      productType: product.productType,
    },
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
          image: product?.images[0].node,
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
            image: product?.images[0].node,
          },
        ])
  }

  return (
    <Layout title={`${product.title} | TheKopyShop`}>
      <div className="min-h-[100vh] bg-white lg:px-[12px]">
        <div className="gap-y-10 px-[9px] md:grid md:grid-cols-1 md:gap-x-6 lg:grid-cols-3 lg:px-0 xl:grid-cols-3 xl:gap-x-8">
          <div className="flex flex-col gap-1 lg:hidden">
            <span className="text-[24px] uppercase">{product?.title}</span>
            {artists &&
              artists.map((artist) => (
                <div key={artist.id}>
                  <Link href={`/artist/${artist.handle}`}>
                    <a>
                      <Button className="h-[30px] bg-black text-[20px] uppercase">
                        {artist.title}
                      </Button>
                    </a>
                  </Link>
                </div>
              ))}
            {product && (
              <ProductOptions product={product} setSelected={setSelected} />
            )}
            <div className="text-[24px]">
              {i18n.language === 'en' && (
                <span className="uppercase">{t('bgn')}</span>
              )}{' '}
              {Number(price).toFixed(2)} {i18n.language === 'bg' && t('bgn')}
            </div>

            {product.availableForSale ? (
              <div>
                <Button
                  className="h-20px min-w-32 flex items-center bg-[#1E90FF] p-3 text-[16px] uppercase"
                  onClick={addToCart}
                >
                  {t('Add to Cart')}
                </Button>
              </div>
            ) : (
              <div>
                <button className=" h-20px pointer-events-none min-w-[160px] rounded-[4px] bg-[#BFBFBF] p-[0.10rem] pl-2 text-left text-[16px]  uppercase text-white">
                  {t('sold out')}
                </button>
              </div>
            )}
            <hr className="my-[15px] h-px border-0 bg-black dark:bg-gray-700" />
          </div>

          <div className="col-span-2 flex w-full flex-col items-center gap-[18px] pb-[20px] lg:gap-3">
            {product &&
              product?.images.map((image) => (
                <Image
                  key={image.node.id}
                  className="rounded py-5 px-5"
                  src={image.node.url}
                  alt={image.node.altText || ''}
                  height={calculateImageHeight(
                    image.node.width ?? 0,
                    image.node.height ?? 0,
                    1000
                  )}
                  quality={90}
                  objectFit="contain"
                  width={1000}
                  blurDataURL={image.blurDataUrl}
                  placeholder={image.blurDataUrl ? 'blur' : 'empty'}
                />
              ))}
          </div>

          <div className="sticky top-2 self-start pb-2">
            <div className="hidden lg:block">
              <span className="text-[24px] uppercase">{product?.title}</span>
              {artists &&
                artists.map((artist) => (
                  <div key={artist.id}>
                    <Link href={`/artist/${artist.handle}`}>
                      <a>
                        <Button className="h-[30px] bg-black text-[24px] uppercase">
                          {artist.title}
                        </Button>
                      </a>
                    </Link>
                  </div>
                ))}
              {product && (
                <ProductOptions
                  product={product}
                  setSelected={(_: Record<string, string>) => setSelected(_)}
                />
              )}
              <div className="text-[24px]">
                {' '}
                {i18n.language === 'en' && (
                  <span className="uppercase">{t('bgn')}</span>
                )}{' '}
                {Number(price).toFixed(2)} {i18n.language === 'bg' && t('bgn')}
              </div>

              {product.availableForSale ? (
                <Button
                  className="h-20px min-w-32 bg-[#1E90FF] text-[16px] uppercase"
                  onClick={addToCart}
                >
                  {t('Add to Cart')}
                </Button>
              ) : (
                <button className=" h-20px pointer-events-none min-w-[160px] rounded-[4px] bg-[#BFBFBF] p-[0.10rem] pl-2 text-left text-[16px]  uppercase text-white">
                  {t('sold out')}
                </button>
              )}
            </div>

            {product.descriptionHtml && (
              <>
                <hr className="my-[10px] h-px border-0 bg-black dark:bg-gray-700 lg:my-[20px]" />
                <div className="font-[HelenBgLight]">
                  <div
                    className="description"
                    style={{ fontFamily: 'HelenBgLight', fontSize: 'initial' }}
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                </div>
              </>
            )}
            <hr className="mt-[10px] h-px border-0 bg-black dark:bg-gray-700" />
            {recommendedProducts.data && (
              <RecommendedProducts
                products={recommendedProducts.data}
                currentProductId={product.id}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default ProductPage
